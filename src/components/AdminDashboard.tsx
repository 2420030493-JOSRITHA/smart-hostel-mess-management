import React from 'react';
import { useMess } from '../context/MessContext';
import { MealType } from '../types';
import {
  ShieldCheck,
  User,
  Users,
  Calendar,
  Coffee,
  Soup,
  UtensilsCrossed,
  AlertTriangle,
  MessageSquareWarning,
  UserCog,
  Utensils,
  Star,
  Megaphone,
  ArrowRight,
  TrendingUp,
  Activity,
  Award,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    totalStudentsCount,
    bookingCounts,
    pendingComplaintsCount,
    totalComplaintsCount,
    openModal,
  } = useMess();

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-xl hover:shadow-2xl border border-emerald-200/80 flex flex-col h-full transition-all relative overflow-hidden">
      {/* Subtle top color highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600" />

      {/* Top Header Card */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 ring-2 ring-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">2) Admin Portal</h2>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Chief Warden & Mess Supervisor
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openModal('login')}
            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-95"
            title="Admin Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total Students Card with rich gradient banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl p-4 sm:p-5 mb-5 flex items-center justify-between shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-100 uppercase tracking-wide">
              Total Enrolled Students
            </span>
            <div className="text-2xl sm:text-3xl font-black leading-tight">
              {totalStudentsCount}
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-blue-100">
          <span className="font-bold flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
            <Activity className="w-3.5 h-3.5 text-emerald-300" />
            98.2% Active Rate
          </span>
        </div>
      </div>

      {/* Today's Meal Bookings Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wide mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Today's Meal Headcount</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium lowercase">click below to view student names</span>
        </div>

        {/* 3 Meal Cards: Breakfast, Lunch, Dinner */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Breakfast Card */}
          <div className="bg-gradient-to-b from-amber-50/90 to-orange-50/70 border border-amber-200/90 rounded-2xl p-3.5 text-center flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs mb-1">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black text-amber-950 uppercase">Breakfast</span>
              <span className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
                {bookingCounts.breakfast}
              </span>
            </div>
            <button
              id="admin-view-breakfast-list"
              onClick={() => openModal('view_students', { mealType: 'breakfast' })}
              className="mt-2 text-[11px] text-amber-800 font-extrabold hover:underline flex items-center justify-center gap-1 bg-amber-100/80 py-1 rounded-lg border border-amber-200 cursor-pointer"
            >
              <span>View List</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Lunch Card */}
          <div className="bg-gradient-to-b from-emerald-50/90 to-teal-50/70 border border-emerald-200/90 rounded-2xl p-3.5 text-center flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs mb-1">
                <Soup className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black text-emerald-950 uppercase">Lunch</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                {bookingCounts.lunch}
              </span>
            </div>
            <button
              id="admin-view-lunch-list"
              onClick={() => openModal('view_students', { mealType: 'lunch' })}
              className="mt-2 text-[11px] text-emerald-800 font-extrabold hover:underline flex items-center justify-center gap-1 bg-emerald-100/80 py-1 rounded-lg border border-emerald-200 cursor-pointer"
            >
              <span>View List</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Dinner Card */}
          <div className="bg-gradient-to-b from-purple-50/90 to-indigo-50/70 border border-purple-200/90 rounded-2xl p-3.5 text-center flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs mb-1">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black text-purple-950 uppercase">Dinner</span>
              <span className="text-xl sm:text-2xl font-black text-purple-950 mt-1">
                {bookingCounts.dinner}
              </span>
            </div>
            <button
              id="admin-view-dinner-list"
              onClick={() => openModal('view_students', { mealType: 'dinner' })}
              className="mt-2 text-[11px] text-purple-800 font-extrabold hover:underline flex items-center justify-center gap-1 bg-purple-100/80 py-1 rounded-lg border border-purple-200 cursor-pointer"
            >
              <span>View List</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Pending Complaints Card */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50/80 border border-rose-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xs font-black text-rose-950 uppercase tracking-wide">
                Pending Grievances
              </span>
              <div className="text-2xl font-black text-rose-900">{pendingComplaintsCount}</div>
            </div>
          </div>
          <button
            id="admin-view-pending-complaints"
            onClick={() => openModal('view_complaints', { tab: 'pending' })}
            className="mt-3 text-xs text-rose-700 font-black hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Resolve Complaints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Complaints Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-sky-50/80 border border-indigo-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquareWarning className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xs font-black text-indigo-950 uppercase tracking-wide">
                Total Filed Complaints
              </span>
              <div className="text-2xl font-black text-indigo-900">{totalComplaintsCount}</div>
            </div>
          </div>
          <button
            id="admin-view-total-complaints"
            onClick={() => openModal('view_complaints', { tab: 'all' })}
            className="mt-3 text-xs text-indigo-700 font-black hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Actions with vibrant styling */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <span className="block text-xs font-black text-slate-800 uppercase tracking-wide mb-3">
          Admin Operations
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Manage Students */}
          <button
            id="admin-manage-students-btn"
            onClick={() => openModal('manage_students')}
            className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-950 border border-blue-200 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Manage Students</span>
          </button>

          {/* Manage Menu */}
          <button
            id="admin-manage-menu-btn"
            onClick={() => openModal('edit_menu')}
            className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-950 border border-emerald-200 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Manage Menu</span>
          </button>

          {/* View Feedbacks */}
          <button
            id="admin-view-feedbacks-btn"
            onClick={() => openModal('view_feedbacks')}
            className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-950 border border-purple-200 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Star className="w-4 h-4 text-purple-600" />
            <span>View Feedbacks</span>
          </button>

          {/* Send Announcement */}
          <button
            id="admin-send-announcement-btn"
            onClick={() => openModal('send_announcement')}
            className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-950 border border-amber-200 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95 cursor-pointer"
          >
            <Megaphone className="w-4 h-4 text-amber-600" />
            <span>Broadcast Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

