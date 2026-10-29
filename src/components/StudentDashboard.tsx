import React from 'react';
import { useMess } from '../context/MessContext';
import {
  GraduationCap,
  Bell,
  User,
  Calendar,
  Coffee,
  Soup,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  MessageSquareWarning,
  Star,
  QrCode,
  Sparkles,
  ArrowRight,
  Clock,
  Flame,
  Ticket,
} from 'lucide-react';

interface StudentDashboardProps {
  isFullPage?: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ isFullPage = false }) => {
  const {
    currentStudent,
    allStudents,
    switchStudent,
    todayMenu,
    tomorrowMenu,
    notifications,
    unreadNotifsCount,
    openModal,
    getStudentBookingsForToday,
  } = useMess();

  const todayBookings = getStudentBookingsForToday(currentStudent.id);

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 shadow-xl hover:shadow-2xl border border-blue-200/80 flex flex-col h-full transition-all relative overflow-hidden">
      {/* Subtle top color highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600" />

      {/* Top Header Card */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25 ring-2 ring-blue-100">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">1) Student Page</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                Resident Portal
              </span>
            </div>
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Room {currentStudent.roomNo}</span>
              <span>•</span>
              <span>Roll No: {currentStudent.rollNo}</span>
              <span>•</span>
              <span className="text-slate-700">{currentStudent.hostelBlock}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('notifications')}
            className="relative p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-95"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => openModal('login')}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-black text-xs transition-all border border-blue-200 cursor-pointer"
            title="View Student Profile / Sign Out"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{currentStudent.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      {/* Student Welcome Banner with Full Name Display & Profile Details */}
      <div className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 sm:p-6 rounded-3xl shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 skew-x-12 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black ring-2 ring-white/40 shadow-lg shrink-0">
              {currentStudent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Welcome, {currentStudent.name}! 👋
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400/20 text-emerald-200 border border-emerald-300/40">
                  Meal Plan Active
                </span>
              </div>
              <div className="text-xs text-blue-100 mt-1.5 font-medium flex items-center gap-3 flex-wrap">
                <span>Roll No: <strong className="text-white font-black">{currentStudent.rollNo}</strong></span>
                <span>•</span>
                <span>Room: <strong className="text-white font-black">{currentStudent.roomNo}</strong></span>
                <span>•</span>
                <span>Hostel: <strong className="text-white font-black">{currentStudent.hostelBlock}</strong></span>
                <span>•</span>
                <span>Diet: <strong className="text-white font-black">{currentStudent.dietPreference}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap md:flex-col md:items-end">
            <span className="text-xs font-black text-amber-200 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/40 shadow-2xs flex items-center gap-1.5">
              <span>🔥 14-Day Attendance Streak</span>
            </span>
            <span className="text-[11px] text-blue-200 font-mono font-bold">
              Token ID: #MES-{currentStudent.rollNo.slice(-4)}
            </span>
          </div>
        </div>

        {/* Quick Student Switcher for Judges */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-bold text-blue-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Switch Student Profile (For Evaluators):</span>
          </span>
          {allStudents.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => switchStudent(s.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentStudent.id === s.id
                  ? 'bg-white text-blue-900 font-black shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {s.name} ({s.rollNo})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: 2 Columns if FullPage, 1 Column if Side-by-Side */}
      <div className={isFullPage ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" : "space-y-4"}>
        {/* Column 1: Today's Menu & Tomorrow's Menu */}
        <div className={isFullPage ? "lg:col-span-7 space-y-4" : "space-y-4"}>
          {/* Today's Menu Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span className="text-xs font-black uppercase tracking-wide">
                  Today's Dining Menu
                </span>
              </div>
              <span className="text-[11px] font-black bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/30 text-white">
                {todayMenu.dateStr}
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-2.5 w-32">Meal</th>
                  <th className="px-4 py-2.5">Chef's Daily Spread</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-amber-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-800 border border-amber-200 text-xs font-black">
                      <span>☕</span>
                      <span>Breakfast</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 text-xs sm:text-sm">{todayMenu.breakfast}</td>
                </tr>
                <tr className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-emerald-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 border border-emerald-200 text-xs font-black">
                      <span>🍲</span>
                      <span>Lunch</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 text-xs sm:text-sm">{todayMenu.lunch}</td>
                </tr>
                <tr className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-purple-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-100/80 text-purple-800 border border-purple-200 text-xs font-black">
                      <span>🍛</span>
                      <span>Dinner</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 text-xs sm:text-sm">{todayMenu.dinner}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tomorrow's Menu Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="bg-gradient-to-r from-slate-800 to-indigo-900 px-4 py-2.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-black uppercase tracking-wide">
                  Tomorrow's Advance Menu
                </span>
              </div>
              <span className="text-[11px] font-black bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/30 text-white">
                {tomorrowMenu.dateStr}
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-2.5 w-32">Meal</th>
                  <th className="px-4 py-2.5">Planned Spread</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-4 py-3 font-bold text-amber-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-bold">
                      <span>☕</span>
                      <span>Breakfast</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600 text-xs sm:text-sm">{tomorrowMenu.breakfast}</td>
                </tr>
                <tr className="hover:bg-emerald-50/20 transition-colors">
                  <td className="px-4 py-3 font-bold text-emerald-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold">
                      <span>🍲</span>
                      <span>Lunch</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600 text-xs sm:text-sm">{tomorrowMenu.lunch}</td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-4 py-3 font-bold text-purple-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60 text-xs font-bold">
                      <span>🍛</span>
                      <span>Dinner</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600 text-xs sm:text-sm">{tomorrowMenu.dinner}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Active Digital Passes Summary */}
          {todayBookings.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/90 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-blue-600" />
                  Active Meal Pass Tokens (Today)
                </span>
                <span className="text-[10px] text-white font-black bg-blue-600 px-2.5 py-0.5 rounded-full shadow-2xs">
                  {todayBookings.length} Ready
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {todayBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white border border-blue-200 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 shadow-xs hover:border-blue-400 transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 uppercase text-xs">{b.mealType}</span>
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                      {b.token}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {b.status === 'Consumed' ? 'Served' : 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column 2: 4 Actions + Bulletins */}
        <div className={isFullPage ? "lg:col-span-5 space-y-4" : "space-y-4"}>
          {/* 4 Main Action Buttons with rich colorful aesthetic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Book a Meal Button (Vibrant Emerald) */}
            <button
              id="student-book-meal-btn"
              onClick={() => openModal('book_meal')}
              className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/25 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Meal</span>
            </button>

            {/* Cancel a Meal Button (Vibrant Rose/Coral) */}
            <button
              id="student-cancel-meal-btn"
              onClick={() => openModal('cancel_meal')}
              className="w-full py-4 px-4 bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:from-rose-600 hover:to-red-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/25 active:scale-95 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel / Skip Meal</span>
            </button>

            {/* Submit Complaint Button (Vibrant Purple/Indigo) */}
            <button
              id="student-submit-complaint-btn"
              onClick={() => openModal('submit_complaint')}
              className="w-full py-4 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/25 active:scale-95 cursor-pointer"
            >
              <MessageSquareWarning className="w-4 h-4" />
              <span>Submit Complaint</span>
            </button>

            {/* Give Feedback Button (Vibrant Amber/Gold) */}
            <button
              id="student-give-feedback-btn"
              onClick={() => openModal('give_feedback')}
              className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/25 active:scale-95 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Give Meal Feedback</span>
            </button>
          </div>

          {/* Digital QR Meal Pass Card for Rahul/Active Student */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-black uppercase tracking-wider text-cyan-200">
                  Digital Meal Pass
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Verified Resident
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 mb-4">
              <div>
                <p className="text-[11px] text-slate-300">Pass Holder Name</p>
                <p className="text-sm font-black text-white">{currentStudent.name}</p>
                <p className="text-[11px] text-cyan-300 font-mono font-bold">
                  Roll: {currentStudent.rollNo} • Room: {currentStudent.roomNo}
                </p>
              </div>
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-md flex items-center justify-center shrink-0">
                <QrCode className="w-14 h-14 text-slate-900" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Show this digital pass at the Mess Scanning Counter or present token code. Reusable for all meals.
            </p>
          </div>

          {/* Notifications Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide">
                <Bell className="w-4 h-4 text-blue-600" />
                <span>Hostel Mess Bulletins</span>
              </div>
              <button
                onClick={() => openModal('notifications')}
                className="text-xs text-blue-600 font-extrabold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => openModal('notifications')}
                  className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between text-xs gap-2"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="text-base">{notif.type === 'menu_update' ? '🍲' : '📢'}</span>
                    <span className="font-bold text-slate-800 truncate">{notif.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-mono font-bold">{notif.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

