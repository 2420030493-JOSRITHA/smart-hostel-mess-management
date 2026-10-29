import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Role,
  MealType,
  DayMenu,
  MealBooking,
  Complaint,
  MealFeedback,
  NotificationItem,
  FoodPrepStatus,
  Student,
  PrepStatusValue,
  ComplaintCategory,
  ComplaintStatus,
  UserSession,
} from '../types';
import {
  INITIAL_STUDENT,
  INITIAL_STUDENTS_LIST,
  INITIAL_TODAY_MENU,
  INITIAL_TOMORROW_MENU,
  INITIAL_PREP_STATUS,
  INITIAL_BOOKINGS,
  INITIAL_COMPLAINTS,
  INITIAL_FEEDBACKS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';
import { MessApiClient } from '../services/apiClient';

interface MessContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentStudent: Student;
  allStudents: Student[];
  todayMenu: DayMenu;
  tomorrowMenu: DayMenu;
  prepStatus: FoodPrepStatus;
  bookings: MealBooking[];
  complaints: Complaint[];
  feedbacks: MealFeedback[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  totalStudentsCount: number;
  
  // Auth states and methods
  isAuthenticated: boolean;
  currentUser: UserSession | null;
  login: (role: Role, credentials?: { identifier?: string; password?: string }) => { success: boolean; message?: string };
  logout: () => void;
  switchStudent: (studentIdOrRoll: string) => void;
  openPortalInNewTab: (role: Role) => void;
  
  // Counts
  bookingCounts: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  pendingComplaintsCount: number;
  totalComplaintsCount: number;

  // Active Modals state
  activeModal: string | null;
  modalPayload: any;
  openModal: (modalName: string, payload?: any) => void;
  closeModal: () => void;

  // Actions
  bookMeal: (mealTypes: MealType[], dateChoice: 'today' | 'tomorrow', notes?: string) => { success: boolean; message: string; tokens?: string[] };
  cancelMeal: (bookingId: string) => { success: boolean; message: string };
  submitComplaint: (data: { category: ComplaintCategory; title: string; description: string; priority: 'Low' | 'Medium' | 'High' }) => void;
  resolveComplaint: (id: string, response: string, newStatus?: ComplaintStatus) => void;
  submitFeedback: (data: { mealType: MealType; foodQuality: number; taste: number; quantity: number; comments: string }) => void;
  sendAnnouncement: (title: string, message: string, targetRole?: 'all' | 'student' | 'admin' | 'staff') => void;
  updateMenu: (day: 'today' | 'tomorrow', mealType: MealType, items: string) => void;
  deleteMenuItem: (day: 'today' | 'tomorrow', mealType: MealType) => void;
  updatePrepStatus: (mealType: MealType, status: PrepStatusValue) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  checkInStudentMeal: (tokenOrRoll: string, mealType: MealType) => { success: boolean; studentName?: string; message: string };
  getStudentBookingsForToday: (studentId: string) => MealBooking[];
  getStudentBookingsForTomorrow: (studentId: string) => MealBooking[];
}

const MessContext = createContext<MessContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cloud_hostel_mess_data_v1';

export const MessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check if opened with a role parameter in URL e.g. ?portal=student or ?portal=admin or ?portal=staff
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlPortal = searchParams ? (searchParams.get('portal') as Role | null) : null;
  const initialRoleFromUrl = (urlPortal === 'student' || urlPortal === 'admin' || urlPortal === 'staff') ? urlPortal : null;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // If opened directly as a specific portal page via URL, immediately authenticate into that portal
    if (initialRoleFromUrl) {
      return true;
    }
    // Starts at the Login Page whenever the website is opened in a session
    const sessionActive = sessionStorage.getItem(`${LOCAL_STORAGE_KEY}_session_active`);
    return sessionActive === 'true';
  });

  const [currentRole, setCurrentRole] = useState<Role>(() => {
    if (initialRoleFromUrl) {
      return initialRoleFromUrl;
    }
    const savedRole = localStorage.getItem(`${LOCAL_STORAGE_KEY}_role`);
    if (savedRole === 'student' || savedRole === 'admin' || savedRole === 'staff') {
      return savedRole;
    }
    return 'student';
  });

  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_currentUser`);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // ignore
      }
    }
    return null;
  });

  const [currentStudent, setCurrentStudent] = useState<Student>(INITIAL_STUDENT);
  const [allStudents, setAllStudents] = useState<Student[]>(INITIAL_STUDENTS_LIST);
  
  const [todayMenu, setTodayMenu] = useState<DayMenu>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_todayMenu`);
    return saved ? JSON.parse(saved) : INITIAL_TODAY_MENU;
  });

  const [tomorrowMenu, setTomorrowMenu] = useState<DayMenu>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tomorrowMenu`);
    return saved ? JSON.parse(saved) : INITIAL_TOMORROW_MENU;
  });

  const [prepStatus, setPrepStatus] = useState<FoodPrepStatus>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_prepStatus`);
    return saved ? JSON.parse(saved) : INITIAL_PREP_STATUS;
  });

  const [bookings, setBookings] = useState<MealBooking[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_complaints`);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [feedbacks, setFeedbacks] = useState<MealFeedback[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_feedbacks`);
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACKS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalPayload, setModalPayload] = useState<any>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_todayMenu`, JSON.stringify(todayMenu));
  }, [todayMenu]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tomorrowMenu`, JSON.stringify(tomorrowMenu));
  }, [tomorrowMenu]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_prepStatus`, JSON.stringify(prepStatus));
  }, [prepStatus]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_complaints`, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_feedbacks`, JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  // Modal helpers
  const openModal = (modalName: string, payload: any = null) => {
    setActiveModal(modalName);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  // Base booking counts matching reference screenshot: 420 Breakfast, 460 Lunch, 390 Dinner
  // Dynamic offset depending on active bookings vs initial for student
  const studentActiveToday = bookings.filter(
    (b) => b.studentId === currentStudent.id && b.isoDate === todayMenu.isoDate && b.status === 'Booked'
  );
  
  const hasStudentBooked = (meal: MealType) =>
    studentActiveToday.some((b) => b.mealType === meal);

  const bookingCounts = {
    breakfast: 420 + (hasStudentBooked('breakfast') ? 0 : -1),
    lunch: 460 + (hasStudentBooked('lunch') ? 0 : -1),
    dinner: 390 + (hasStudentBooked('dinner') ? 0 : -1),
  };

  const totalStudentsCount = 500;
  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Pending').length;
  const totalComplaintsCount = complaints.length;
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const getStudentBookingsForToday = (studentId: string) => {
    return bookings.filter(
      (b) => b.studentId === studentId && b.isoDate === todayMenu.isoDate && b.status !== 'Cancelled'
    );
  };

  const getStudentBookingsForTomorrow = (studentId: string) => {
    return bookings.filter(
      (b) => b.studentId === studentId && b.isoDate === tomorrowMenu.isoDate && b.status !== 'Cancelled'
    );
  };

  // 1. Book Meal Action
  const bookMeal = (mealTypes: MealType[], dateChoice: 'today' | 'tomorrow', notes?: string) => {
    const targetDate = dateChoice === 'today' ? todayMenu : tomorrowMenu;
    const now = new Date();
    const bookedTimeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newBookings: MealBooking[] = [];
    const generatedTokens: string[] = [];

    mealTypes.forEach((meal) => {
      // Check if already booked
      const existing = bookings.find(
        (b) =>
          b.studentId === currentStudent.id &&
          b.isoDate === targetDate.isoDate &&
          b.mealType === meal &&
          b.status === 'Booked'
      );

      if (!existing) {
        const tokenPrefix = meal.charAt(0).toUpperCase();
        const randToken = `BK-${currentStudent.rollNo.slice(-4)}-${tokenPrefix}-${Math.floor(100 + Math.random() * 900)}`;
        generatedTokens.push(randToken);

        const newBk: MealBooking = {
          id: `bk-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          studentId: currentStudent.id,
          studentName: currentStudent.name,
          rollNo: currentStudent.rollNo,
          roomNo: currentStudent.roomNo,
          hostelBlock: currentStudent.hostelBlock,
          dateStr: targetDate.dateStr,
          isoDate: targetDate.isoDate,
          mealType: meal,
          status: 'Booked',
          token: randToken,
          bookedAt: bookedTimeStr,
          qrCodeValue: `HMMS:${currentStudent.rollNo}:${meal}:${targetDate.isoDate}:${randToken}`,
        };
        newBookings.push(newBk);
      }
    });

    if (newBookings.length > 0) {
      setBookings((prev) => [...prev, ...newBookings]);

      // Fire asynchronous background sync to Flask REST backend
      newBookings.forEach((b) => {
        MessApiClient.createBooking({
          studentId: b.studentId,
          mealType: b.mealType,
          date: b.isoDate,
        });
      });
      
      // Push confirmation notification
      const mealNames = mealTypes.map((m) => m.toUpperCase()).join(', ');
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Meal Booking Confirmed!`,
        message: `Your booking for ${mealNames} on ${targetDate.dateStr} is confirmed. Tokens: ${generatedTokens.join(', ')}`,
        timestamp: 'Just now',
        timeAgo: 'Just now',
        type: 'reminder',
        read: false,
        targetRole: 'student',
      };
      setNotifications((prev) => [newNotif, ...prev]);

      return {
        success: true,
        message: `Successfully booked ${newBookings.length} meal(s) for ${targetDate.dateStr}!`,
        tokens: generatedTokens,
      };
    }

    return {
      success: false,
      message: `Selected meals are already booked for this date.`,
    };
  };

  // 2. Cancel Meal Action
  const cancelMeal = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      return { success: false, message: 'Booking not found.' };
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );

    // Sync deletion / cancellation to Flask backend
    MessApiClient.cancelBooking(bookingId);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Meal Booking Cancelled`,
      message: `Cancelled ${booking.mealType.toUpperCase()} on ${booking.dateStr}. Saved from food waste.`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'reminder',
      read: false,
      targetRole: 'student',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return { success: true, message: `Successfully cancelled ${booking.mealType} for ${booking.dateStr}.` };
  };

  // 3. Submit Complaint
  const submitComplaint = (data: {
    category: ComplaintCategory;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newComplaint: Complaint = {
      id: `cmp-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      rollNo: currentStudent.rollNo,
      roomNo: currentStudent.roomNo,
      category: data.category,
      title: data.title,
      description: data.description,
      status: 'Pending',
      createdAt: timeStr,
      priority: data.priority,
    };

    setComplaints((prev) => [newComplaint, ...prev]);

    // Async sync to Flask backend
    MessApiClient.submitComplaint({
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      category: data.category,
      description: `${data.title}: ${data.description}`,
      priority: data.priority,
    });

    // Notify student and admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Complaint Logged (#${newComplaint.id.slice(-4)})`,
      message: `Your complaint regarding "${data.title}" has been registered. Admin will review shortly.`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'complaint_update',
      read: false,
      targetRole: 'all',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 4. Resolve Complaint
  const resolveComplaint = (id: string, response: string, newStatus: ComplaintStatus = 'Resolved') => {
    const now = new Date();
    const resolvedTimeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              adminResponse: response,
              resolvedAt: newStatus === 'Resolved' ? resolvedTimeStr : c.resolvedAt,
            }
          : c
      )
    );

    const targetComplaint = complaints.find((c) => c.id === id);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Complaint Status Updated: ${newStatus}`,
      message: `Ticket "${targetComplaint?.title || id}": ${response}`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'complaint_update',
      read: false,
      targetRole: 'all',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 5. Submit Feedback
  const submitFeedback = (data: {
    mealType: MealType;
    foodQuality: number;
    taste: number;
    quantity: number;
    comments: string;
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const avg = Number(((data.foodQuality + data.taste + data.quantity) / 3).toFixed(1));

    const newFb: MealFeedback = {
      id: `fb-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      rollNo: currentStudent.rollNo,
      dateStr: todayMenu.dateStr,
      mealType: data.mealType,
      foodQuality: data.foodQuality,
      taste: data.taste,
      quantity: data.quantity,
      overallRating: avg,
      comments: data.comments,
      submittedAt: timeStr,
    };

    setFeedbacks((prev) => [newFb, ...prev]);

    // Async sync to Flask backend
    MessApiClient.submitFeedback({
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      mealType: data.mealType,
      rating: Math.round(avg),
      comment: data.comments,
    });

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Feedback Received`,
      message: `Thank you for rating today's ${data.mealType} (${avg} ⭐). Your feedback helps improve mess quality!`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'reminder',
      read: false,
      targetRole: 'student',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 6. Send Announcement
  const sendAnnouncement = (title: string, message: string, targetRole: 'all' | 'student' | 'admin' | 'staff' = 'all') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: timeStr,
      timeAgo: 'Just now',
      type: 'announcement',
      read: false,
      targetRole,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 7. Update Menu
  const updateMenu = (day: 'today' | 'tomorrow', mealType: MealType, items: string) => {
    if (day === 'today') {
      setTodayMenu((prev) => ({
        ...prev,
        [mealType]: items,
      }));
    } else {
      setTomorrowMenu((prev) => ({
        ...prev,
        [mealType]: items,
      }));
    }

    const dayLabel = day === 'today' ? "Today's" : "Tomorrow's";
    const mealLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

    // Notify students that menu is updated as required!
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `${dayLabel} menu has been updated!`,
      message: `${mealLabel} menu updated to: "${items}". Check student dashboard for details.`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'menu_update',
      read: false,
      targetRole: 'all',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 8. Delete Menu Item / Clear
  const deleteMenuItem = (day: 'today' | 'tomorrow', mealType: MealType) => {
    if (day === 'today') {
      setTodayMenu((prev) => ({
        ...prev,
        [mealType]: 'Menu to be announced',
      }));
    } else {
      setTomorrowMenu((prev) => ({
        ...prev,
        [mealType]: 'Menu to be announced',
      }));
    }

    const dayLabel = day === 'today' ? "Today's" : "Tomorrow's";
    const mealLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `${dayLabel} ${mealLabel} menu cleared`,
      message: `Menu for ${mealLabel} was removed by Mess Staff. Replacement will be posted shortly.`,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      type: 'menu_update',
      read: false,
      targetRole: 'all',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 9. Update Prep Status
  const updatePrepStatus = (mealType: MealType, status: PrepStatusValue) => {
    setPrepStatus((prev) => ({
      ...prev,
      [mealType]: status,
    }));

    // Async sync to Flask backend
    MessApiClient.updatePrepStatus({
      [mealType]: status,
    });
  };

  // 10. Notifications Read
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // 11. Check-in student meal (QR / Roll scan in Mess Staff dashboard)
  const checkInStudentMeal = (tokenOrRoll: string, mealType: MealType) => {
    const cleanQuery = tokenOrRoll.trim().toUpperCase();
    const booking = bookings.find(
      (b) =>
        (b.token.toUpperCase() === cleanQuery || b.rollNo.toUpperCase() === cleanQuery) &&
        b.mealType === mealType &&
        b.isoDate === todayMenu.isoDate &&
        b.status === 'Booked'
    );

    if (booking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: 'Consumed' as const } : b))
      );
      return {
        success: true,
        studentName: booking.studentName,
        message: `Verified! ${booking.studentName} (${booking.rollNo}) marked as Served for ${mealType.toUpperCase()}.`,
      };
    }

    return {
      success: false,
      message: `No active booking found for Token/Roll "${tokenOrRoll}" for today's ${mealType}.`,
    };
  };

  // 12. Authentication Login/Logout Handlers
  const login = (role: Role, credentials?: { identifier?: string; password?: string }) => {
    const rawId = (credentials?.identifier || '').trim();

    let sessionUser: UserSession;
    if (role === 'student') {
      let matchedStudent = allStudents.find(
        (s) =>
          (rawId && s.email.toLowerCase() === rawId.toLowerCase()) ||
          (rawId && s.rollNo.toLowerCase() === rawId.toLowerCase())
      );
      if (!matchedStudent) {
        matchedStudent = INITIAL_STUDENT;
      }
      setCurrentStudent(matchedStudent);
      sessionUser = {
        id: matchedStudent.id,
        name: matchedStudent.name,
        email: matchedStudent.email,
        role: 'student',
        rollNo: matchedStudent.rollNo,
        roomNo: matchedStudent.roomNo,
        hostelBlock: matchedStudent.hostelBlock,
        title: 'Hostel Resident Scholar',
        phone: matchedStudent.phone,
      };
    } else if (role === 'admin') {
      sessionUser = {
        id: 'adm-001',
        name: 'Dr. Arvind Swaminathan',
        email: rawId || 'admin.warden@hostel.edu',
        role: 'admin',
        title: 'Chief Hostel Warden & Administrator',
        hostelBlock: 'Administrative Ward',
      };
    } else {
      sessionUser = {
        id: 'stf-001',
        name: 'Chef K. Murthy',
        email: rawId || 'chef.murthy@mess.hostel.edu',
        role: 'staff',
        title: 'Executive Head Chef & Kitchen Lead',
        hostelBlock: 'Central Dining Facility',
      };
    }

    setCurrentRole(role);
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    sessionStorage.setItem(`${LOCAL_STORAGE_KEY}_session_active`, 'true');
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'true');
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, role);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_currentUser`, JSON.stringify(sessionUser));

    return {
      success: true,
      message: `Welcome ${sessionUser.name}! Logged in to ${role.toUpperCase()} Portal.`,
    };
  };

  const switchStudent = (studentIdOrRoll: string) => {
    const target = allStudents.find(
      (s) =>
        s.id === studentIdOrRoll ||
        s.rollNo.toLowerCase() === studentIdOrRoll.toLowerCase() ||
        s.name.toLowerCase().includes(studentIdOrRoll.toLowerCase())
    );
    if (target) {
      setCurrentStudent(target);
      if (currentRole === 'student') {
        const sessionUser: UserSession = {
          id: target.id,
          name: target.name,
          email: target.email,
          role: 'student',
          rollNo: target.rollNo,
          roomNo: target.roomNo,
          hostelBlock: target.hostelBlock,
          title: 'Hostel Resident Scholar',
          phone: target.phone,
        };
        setCurrentUser(sessionUser);
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_currentUser`, JSON.stringify(sessionUser));
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem(`${LOCAL_STORAGE_KEY}_session_active`);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'false');
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_currentUser`);
  };

  // Open the portal in a separate dedicated web page / browser tab
  const openPortalInNewTab = (role: Role) => {
    // Also set current active role locally in case user views here
    login(role);

    // Compute URL with ?portal=<role>
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('portal', role);
      // Attempt window.open with fallback to state update if popup blocked in iframe
      try {
        const opened = window.open(url.toString(), '_blank');
        if (!opened) {
          // If popup is blocked by iframe or browser policy, switch current tab cleanly
          setCurrentRole(role);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setCurrentRole(role);
        setIsAuthenticated(true);
      }
    }
  };

  return (
    <MessContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentStudent,
        allStudents,
        switchStudent,
        todayMenu,
        tomorrowMenu,
        prepStatus,
        bookings,
        complaints,
        feedbacks,
        notifications,
        unreadNotifsCount,
        totalStudentsCount,
        bookingCounts,
        pendingComplaintsCount,
        totalComplaintsCount,
        isAuthenticated,
        currentUser,
        login,
        logout,
        openPortalInNewTab,
        activeModal,
        modalPayload,
        openModal,
        closeModal,
        bookMeal,
        cancelMeal,
        submitComplaint,
        resolveComplaint,
        submitFeedback,
        sendAnnouncement,
        updateMenu,
        deleteMenuItem,
        updatePrepStatus,
        markNotificationRead,
        markAllNotificationsRead,
        checkInStudentMeal,
        getStudentBookingsForToday,
        getStudentBookingsForTomorrow,
      }}
    >
      {children}
    </MessContext.Provider>
  );
};

export const useMess = () => {
  const context = useContext(MessContext);
  if (!context) {
    throw new Error('useMess must be used within a MessProvider');
  }
  return context;
};
