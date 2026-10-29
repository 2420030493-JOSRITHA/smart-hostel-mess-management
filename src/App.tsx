import React, { useState } from 'react';
import { MessProvider, useMess } from './context/MessContext';
import { Header } from './components/Header';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { CreativeBackground, BackgroundTheme } from './components/CreativeBackground';
import { LoginPage } from './components/LoginPage';

// Modals
import { BookMealModal } from './components/modals/BookMealModal';
import { CancelMealModal } from './components/modals/CancelMealModal';
import { SubmitComplaintModal } from './components/modals/SubmitComplaintModal';
import { FeedbackModal } from './components/modals/FeedbackModal';
import { ViewStudentsModal } from './components/modals/ViewStudentsModal';
import { ComplaintsModal } from './components/modals/ComplaintsModal';
import { AnnouncementModal } from './components/modals/AnnouncementModal';
import { EditMenuModal } from './components/modals/EditMenuModal';
import { FeedbacksListModal } from './components/modals/FeedbacksListModal';
import { ManageStudentsModal } from './components/modals/ManageStudentsModal';
import { LoginModal } from './components/modals/LoginModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { BackendCommandsModal } from './components/modals/BackendCommandsModal';
import { SwitchPortalConfirmModal } from './components/modals/SwitchPortalConfirmModal';

import { UtensilsCrossed, LogOut } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentRole, isAuthenticated, activeModal, closeModal, openModal, logout } = useMess();

  // When not signed in: show the login page (which includes role cards & credentials)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col relative text-slate-800 selection:bg-blue-600 selection:text-white">
        <CreativeBackground />
        <LoginPage />
        <BackendCommandsModal
          isOpen={activeModal === 'commands'}
          onClose={closeModal}
        />
      </div>
    );
  }

  // When signed in: ONLY display the signed-in active portal dashboard!
  // The "Select Active Operational Role" hero is completely REMOVED.
  // To enter another portal, user must sign out first.
  return (
    <div className="min-h-screen flex flex-col relative text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* Creative Dynamic Background Canvas */}
      <CreativeBackground />

      {/* Top Navbar with role-locked status */}
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Active Portal Header Banner */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {currentRole === 'student' && 'Student Portal • Meal Scheduling & Dining Pass'}
              {currentRole === 'admin' && 'Admin Portal • Warden Supervision & Headcounts'}
              {currentRole === 'staff' && 'Mess Staff Portal • Kitchen Operations & Daily Menus'}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-800 text-[11px] font-black rounded-full border border-emerald-300/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Portal Session
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Direct Sign Out to Switch Portal */}
            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-2xs active:scale-95"
              title="Sign out to enter another portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out to Switch Portal</span>
            </button>
          </div>
        </div>

        {/* Dedicated Single Portal View (The only portal rendered when signed in) */}
        <div className="max-w-5xl mx-auto">
          {currentRole === 'student' && <StudentDashboard isFullPage={true} />}
          {currentRole === 'admin' && <AdminDashboard />}
          {currentRole === 'staff' && <StaffDashboard />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/85 backdrop-blur-md py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-800">
              Cloud-Native Smart Hostel Mess Management System
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Frontend: <strong className="text-blue-700 font-bold">npm (React 19 + Vite)</strong> • Backend: <strong className="text-emerald-700 font-bold">Flask (Python)</strong></span>
          </div>
        </div>
      </footer>

      {/* Application Modals */}
      <BookMealModal />
      <CancelMealModal />
      <SubmitComplaintModal />
      <FeedbackModal />
      <ViewStudentsModal />
      <ComplaintsModal />
      <AnnouncementModal />
      <EditMenuModal />
      <FeedbacksListModal />
      <ManageStudentsModal />
      <LoginModal />
      <NotificationsModal />
      <SwitchPortalConfirmModal />
      <BackendCommandsModal
        isOpen={activeModal === 'commands'}
        onClose={closeModal}
      />
    </div>
  );
};

export function App() {
  return (
    <MessProvider>
      <MainLayout />
    </MessProvider>
  );
}

export default App;
