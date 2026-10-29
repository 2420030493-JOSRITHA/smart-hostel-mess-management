export type Role = 'student' | 'admin' | 'staff';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  rollNo?: string;
  roomNo?: string;
  hostelBlock?: string;
  title?: string;
  phone?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MenuItem {
  id: string;
  name: string;
  category?: string;
}

export interface DayMenu {
  dateStr: string; // e.g. "Aug 12, 2024" or current date
  isoDate: string; // YYYY-MM-DD
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  roomNo: string;
  hostelBlock: string;
  email: string;
  phone: string;
  dietPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain';
}

export interface MealBooking {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  roomNo: string;
  hostelBlock: string;
  dateStr: string;
  isoDate: string;
  mealType: MealType;
  status: 'Booked' | 'Cancelled' | 'Consumed';
  token: string;
  bookedAt: string;
  qrCodeValue?: string;
}

export type ComplaintStatus = 'Pending' | 'In Review' | 'Resolved';
export type ComplaintCategory = 'Food Quality' | 'Taste' | 'Quantity' | 'Hygiene' | 'Timing' | 'Staff Behavior' | 'Other';

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  roomNo: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  resolvedAt?: string;
  adminResponse?: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface MealFeedback {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  dateStr: string;
  mealType: MealType;
  foodQuality: number; // 1-5
  taste: number; // 1-5
  quantity: number; // 1-5
  overallRating: number;
  comments: string;
  submittedAt: string;
}

export type NotificationType = 'menu_update' | 'announcement' | 'reminder' | 'complaint_update';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  type: NotificationType;
  read: boolean;
  targetRole?: 'all' | 'student' | 'admin' | 'staff';
}

export type PrepStatusValue = 'Not Started' | 'Preparing' | 'Ready to Serve' | 'Completed';

export interface FoodPrepStatus {
  breakfast: PrepStatusValue;
  lunch: PrepStatusValue;
  dinner: PrepStatusValue;
}
