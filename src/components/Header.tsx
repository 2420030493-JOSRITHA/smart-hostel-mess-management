import React, { useState } from 'react';
import { useMess } from '../context/MessContext';
import {
  UtensilsCrossed,
  Bell,
  User,
  ShieldCheck,
  ChefHat,
  GraduationCap,
  LogOut,
  CheckCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Role } from '../types';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentStudent,
    currentUser,
    logout,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    markAllNotificationsRead,
    openModal,
  } = useMess();

  const [showNotifsDropdown, setShowNotifsDropdown] = useState(false);

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'student':
        return {
          label: 'Student Portal',
          icon: GraduationCap,
          bg: 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200/80 shadow-xs',
          dot: 'bg-blue-600',
        };
      case 'admin':
        return {
          label: 'Admin Portal',
          icon: ShieldCheck,
          bg: 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200/80 shadow-xs',
          dot: 'bg-emerald-600',
        };
      case 'staff':
        return {
          label: 'Mess Staff Portal',
          icon: ChefHat,
          bg: 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200/80 shadow-xs',
          dot: 'bg-purple-600',
        };
    }
  };

  const currentBadge = getRoleBadge(currentRole);
  const BadgeIcon = currentBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs relative">
      {/* Rainbow Vibrant Top Accent Border */}
      <div className="h-1 w-full rainbow-gradient-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Website Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-100 hover:rotate-6 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
                  Smart Hostel Mess
                </h1>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-800 border border-amber-300/60">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  Cloud v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Meal Scheduling • Waste Reduction • Live Headcounts
              </p>
            </div>
          </div>

          {/* Right Action Icons & Profile / Sign Out */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Active Role Pill */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${currentBadge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${currentBadge.dot} animate-pulse`} />
              <BadgeIcon className="w-4 h-4" />
              <span>{currentBadge.label}</span>
            </div>

            {/* Notification Bell with Badge & Dropdown */}
            <div className="relative">
              <button
                id="header-notifications-btn"
                onClick={() => setShowNotifsDropdown(!showNotifsDropdown)}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all active:scale-95 cursor-pointer"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifsDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Bell className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-800">Notifications</h3>
                      {unreadNotifsCount > 0 && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black rounded-full">
                          {unreadNotifsCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {unreadNotifsCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs text-blue-600 hover:text-blue-700 font-semibold px-2 py-1 hover:bg-blue-50 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifsDropdown(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-6">No notifications yet.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3 rounded-xl text-xs transition-colors cursor-pointer border ${
                            !notif.read
                              ? 'bg-blue-50/80 border-blue-200 text-slate-900 font-medium shadow-2xs'
                              : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-bold text-slate-900 flex items-center gap-1.5">
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
                              )}
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Hostel Mess Alerts</span>
                    <button
                      onClick={() => {
                        setShowNotifsDropdown(false);
                        openModal('notifications');
                      }}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All History
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Account Pill */}
            <button
              id="header-profile-btn"
              onClick={() => openModal('login')}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border border-slate-200"
              title="Click to view profile or sign out"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                {(currentRole === 'student' ? currentStudent.name : (currentUser?.name || currentRole)).charAt(0)}
              </div>
              <span className="hidden sm:inline font-black">
                {currentRole === 'student' ? currentStudent.name : (currentUser?.name || currentRole.toUpperCase())}
              </span>
              {currentRole === 'student' && (
                <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-blue-100/90 text-blue-800 text-[10px] font-black border border-blue-200 font-mono">
                  {currentStudent.rollNo}
                </span>
              )}
            </button>

            {/* Logout Button */}
            <button
              id="header-logout-btn"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-xl font-black text-xs transition-all active:scale-95 cursor-pointer shadow-2xs"
              title="Sign out to go to another portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
