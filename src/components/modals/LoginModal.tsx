import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { Role } from '../../types';
import { LogIn, GraduationCap, ShieldCheck, ChefHat, UserCheck, X, Check, LogOut, AlertTriangle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { activeModal, closeModal, currentRole, login, logout, currentStudent, currentUser, isAuthenticated } = useMess();
  const [selectedRole, setSelectedRole] = useState<Role>(currentRole);
  const [userIdInput, setUserIdInput] = useState('rahul.sharma@hostel.edu');
  const [passwordInput, setPasswordInput] = useState('password123');
  const [success, setSuccess] = useState(false);

  if (activeModal !== 'login') return null;

  const handleRoleSwitch = (role: Role) => {
    setSelectedRole(role);
    if (role === 'student') {
      setUserIdInput('rahul.sharma@hostel.edu');
    } else if (role === 'admin') {
      setUserIdInput('admin.warden@hostel.edu');
    } else {
      setUserIdInput('chef.murthy@mess.hostel.edu');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, { identifier: userIdInput, password: passwordInput });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      closeModal();
    }, 500);
  };

  const handleSignOut = () => {
    closeModal();
    logout();
  };

  // If already authenticated, show the active profile with a prominent Sign Out option to enter another portal
  if (isAuthenticated) {
    const roleTitles: Record<Role, { name: string; badge: string; color: string; icon: React.ElementType }> = {
      student: { name: currentStudent.name, badge: 'Student Page', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: GraduationCap },
      admin: { name: currentUser?.name || 'Dr. Arvind Swaminathan', badge: 'Admin Portal', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: ShieldCheck },
      staff: { name: currentUser?.name || 'Chef K. Murthy', badge: 'Mess Staff Portal', color: 'text-purple-700 bg-purple-50 border-purple-200', icon: ChefHat },
    };

    const info = roleTitles[currentRole];
    const RoleIcon = info.icon;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Active User Profile</h3>
              <p className="text-xs text-slate-500">Currently signed in to {info.badge}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                {info.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{info.name}</h4>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border mt-0.5 ${info.color}`}>
                  <RoleIcon className="w-3 h-3" />
                  <span>{info.badge}</span>
                </span>
              </div>
            </div>

            {currentRole === 'student' && (
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60 text-slate-600 font-medium">
                <div>Roll No: <strong className="text-slate-800 font-bold">{currentStudent.rollNo}</strong></div>
                <div>Block: <strong className="text-slate-800 font-bold">{currentStudent.hostelBlock}</strong></div>
                <div>Room: <strong className="text-slate-800 font-bold">{currentStudent.roomNo}</strong></div>
                <div>Email: <strong className="text-slate-800 font-bold truncate block">{currentStudent.email}</strong></div>
              </div>
            )}
          </div>

          {/* Portal Switch Rule Notice */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/90 text-amber-900 text-xs mb-5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Portal Access Isolation:</span> To enter or access another portal, you must sign out first.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex-1 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out to Switch</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <LogIn className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Hostel Mess Portal Login</h3>
            <p className="text-xs text-slate-500">Sign in to your authorized operational portal</p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-900">Authenticated successfully!</p>
            <p className="text-xs text-slate-500 mt-1">Entering {selectedRole} portal view...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('student')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold ring-1 ring-blue-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 mb-1 text-blue-600" />
                  <span className="text-xs">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSwitch('admin')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold ring-1 ring-emerald-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mb-1 text-emerald-600" />
                  <span className="text-xs">Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSwitch('staff')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    selectedRole === 'staff'
                      ? 'bg-purple-50 border-purple-600 text-purple-900 font-bold ring-1 ring-purple-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ChefHat className="w-5 h-5 mb-1 text-purple-600" />
                  <span className="text-xs">Mess Staff</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email / Roll No
              </label>
              <input
                type="text"
                required
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hostel PIN / Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="login-submit-btn"
                className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Login & Enter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
