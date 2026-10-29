import React from 'react';
import { useMess } from '../../context/MessContext';
import { Role } from '../../types';
import {
  LogOut,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  ChefHat,
  X,
  ArrowRight,
} from 'lucide-react';

export const SwitchPortalConfirmModal: React.FC = () => {
  const { activeModal, closeModal, modalPayload, currentRole, logout, login } = useMess();

  if (activeModal !== 'switch_portal_confirm') return null;

  const targetRole: Role = modalPayload?.targetRole || 'student';

  const roleMeta: Record<Role, { name: string; color: string; icon: React.ElementType; badge: string; bg: string }> = {
    student: {
      name: '1) Student Page',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: GraduationCap,
      badge: 'Student Account',
      bg: 'from-blue-600 to-indigo-600',
    },
    admin: {
      name: '2) Admin Portal',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: ShieldCheck,
      badge: 'Admin Warden Account',
      bg: 'from-emerald-600 to-teal-600',
    },
    staff: {
      name: '3) Mess Staff Portal',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      icon: ChefHat,
      badge: 'Kitchen Staff Account',
      bg: 'from-purple-600 to-pink-600',
    },
  };

  const currentInfo = roleMeta[currentRole];
  const targetInfo = roleMeta[targetRole];
  const CurrentIcon = currentInfo.icon;
  const TargetIcon = targetInfo.icon;

  const handleSignOutAndSwitch = () => {
    // Perform secure sign out first
    logout();
    closeModal();
    // After sign out, login directly into target role
    login(targetRole);
  };

  const handleSignOutToLogin = () => {
    logout();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon & Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 shadow-inner">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Sign Out Required to Switch</h3>
            <p className="text-xs text-slate-500 font-medium">
              You must sign out before accessing another operational portal
            </p>
          </div>
        </div>

        {/* Transition Visual Graphic */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Portal Session Transition:
          </div>
          <div className="flex items-center justify-between gap-2">
            {/* Current Active Portal */}
            <div className="flex-1 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 mx-auto flex items-center justify-center mb-1">
                <CurrentIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Current</span>
              <span className="text-xs font-black text-slate-800 line-clamp-1">{currentInfo.name}</span>
            </div>

            <div className="flex flex-col items-center justify-center px-1">
              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full border border-rose-200 mb-0.5">
                Sign Out
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* Target Portal */}
            <div className="flex-1 p-2.5 rounded-xl bg-white border border-blue-200 shadow-2xs text-center ring-1 ring-blue-100">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${targetInfo.bg} text-white mx-auto flex items-center justify-center mb-1 shadow-2xs`}>
                <TargetIcon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">Requested</span>
              <span className="text-xs font-black text-slate-900 line-clamp-1">{targetInfo.name}</span>
            </div>
          </div>

          <div className="mt-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <span className="font-bold">Security & Role Isolation Notice:</span> To prevent cross-role data leaks and maintain strict role boundaries, you must sign out of your current session first.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="w-full sm:flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer text-center"
          >
            Stay in {currentInfo.name}
          </button>
          <button
            type="button"
            onClick={handleSignOutAndSwitch}
            className="w-full sm:flex-1 py-2.5 px-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl text-xs font-black shadow-md shadow-rose-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Enter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
