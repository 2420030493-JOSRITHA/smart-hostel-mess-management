import React, { useState } from 'react';
import { useMess } from '../context/MessContext';
import { Role } from '../types';
import {
  UtensilsCrossed,
  GraduationCap,
  ShieldCheck,
  ChefHat,
  Lock,
  User,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Leaf,
  ExternalLink,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, allStudents, openModal } = useMess();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [identifier, setIdentifier] = useState('21CS1084');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccessRole, setLoginSuccessRole] = useState<string | null>(null);

  // Switch role handler with auto-filled helper credentials
  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setErrorMsg(null);
    if (role === 'student') {
      setIdentifier('21CS1084');
      setPassword('password123');
    } else if (role === 'admin') {
      setIdentifier('admin.warden@hostel.edu');
      setPassword('admin123');
    } else {
      setIdentifier('chef.murthy@mess.hostel.edu');
      setPassword('staff123');
    }
  };

  // Quick 1-click demo login
  const handleQuickLogin = (role: Role, demoId: string) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    setLoginSuccessRole(role);
    setTimeout(() => {
      login(role, { identifier: demoId, password: 'demo' });
      setIsSubmitting(false);
    }, 450);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your Institutional Roll No or Email');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your account password or PIN');
      return;
    }

    setIsSubmitting(true);
    setLoginSuccessRole(selectedRole);

    setTimeout(() => {
      const res = login(selectedRole, { identifier, password });
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMsg(res.message || 'Login failed. Please verify credentials.');
        setLoginSuccessRole(null);
      }
    }, 450);
  };

  const getRoleConfig = (role: Role) => {
    switch (role) {
      case 'student':
        return {
          portalNumber: '1)',
          title: 'Student Page',
          subtitle: 'Book meals, view token QR passes & submit dining feedback',
          icon: GraduationCap,
          color: 'blue',
          accentGradient: 'from-blue-600 to-cyan-600',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
          ringClass: 'ring-blue-500 border-blue-600 bg-blue-50/70',
          btnGradient: 'from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25',
          placeholder: 'Roll No (e.g. 21CS1084) or Student Email',
          helperText: 'Valid roll nos: 21CS1084 (Rahul Sharma), 21CS1092, 22ME2045',
          demoLabel: 'Rahul Sharma (Roll: 21CS1084)',
        };
      case 'admin':
        return {
          portalNumber: '2)',
          title: 'Admin Portal',
          subtitle: 'Audit meal headcounts, resolve complaints & issue notices',
          icon: ShieldCheck,
          color: 'emerald',
          accentGradient: 'from-emerald-600 to-teal-600',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          ringClass: 'ring-emerald-500 border-emerald-600 bg-emerald-50/70',
          btnGradient: 'from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-500/25',
          placeholder: 'Admin Email (e.g. admin.warden@hostel.edu)',
          helperText: 'Default: admin.warden@hostel.edu / admin',
          demoLabel: 'Dr. Arvind Swaminathan (Chief Warden)',
        };
      case 'staff':
        return {
          portalNumber: '3)',
          title: 'Mess Staff Portal',
          subtitle: 'Track live portion counts, update prep stage & scan tokens',
          icon: ChefHat,
          color: 'purple',
          accentGradient: 'from-purple-600 to-pink-600',
          badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
          ringClass: 'ring-purple-500 border-purple-600 bg-purple-50/70',
          btnGradient: 'from-purple-600 via-pink-600 to-indigo-700 hover:from-purple-700 hover:to-pink-800 shadow-purple-500/25',
          placeholder: 'Mess Staff ID (e.g. chef.murthy@mess.hostel.edu)',
          helperText: 'Default: chef.murthy@mess.hostel.edu / staff',
          demoLabel: 'Chef K. Murthy (Kitchen Lead)',
        };
    }
  };

  const activeConfig = getRoleConfig(selectedRole);
  const ActiveIcon = activeConfig.icon;

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 relative selection:bg-blue-600 selection:text-white">
      {/* Top Navbar / Branding Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 ring-2 ring-white">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Smart Hostel Mess
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs">
                Cloud Portal v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Centralized Authentication for Students, Administration & Kitchen Operations
            </p>
          </div>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-4">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          {/* Rainbow Accent Strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-purple-600" />

          <div className="p-6 sm:p-10">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Smart Hostel Mess Portal Access
              </h1>
              <p className="text-sm text-slate-600 mt-1.5 font-medium">
                Select from the three separate portals below to access meal bookings, warden oversight, or kitchen operations.
              </p>
            </div>

            {/* 3 Separate Portal Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* 1) Student Page Card */}
              <div
                id="login-role-student-btn"
                onClick={() => handleRoleChange('student')}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  selectedRole === 'student'
                    ? 'border-blue-600 bg-gradient-to-b from-blue-50/90 to-sky-50/50 shadow-lg shadow-blue-500/15 ring-2 ring-blue-400/30'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {selectedRole === 'student' && (
                  <div className="absolute top-3 right-3 text-blue-600">
                    <CheckCircle2 className="w-5 h-5 fill-blue-600 text-white" />
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      Page 1
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                    <span>1) Student Page</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Book & skip meals, dynamic token QR pass, star ratings & complaints.
                  </p>
                  <div className="mt-2 text-[11px] font-bold text-blue-700 bg-blue-50/80 px-2 py-1 rounded-lg border border-blue-100">
                    👤 Default: Rahul Sharma (21CS1084)
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLogin('student', '21CS1084');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Open Student Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="/?portal=student"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Open Student Page in a new browser tab / window"
                  >
                    <ExternalLink className="w-3 h-3 text-blue-600" />
                    <span>Open in New Web Page</span>
                  </a>
                </div>
              </div>

              {/* 2) Admin Portal Card */}
              <div
                id="login-role-admin-btn"
                onClick={() => handleRoleChange('admin')}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'border-emerald-600 bg-gradient-to-b from-emerald-50/90 to-teal-50/50 shadow-lg shadow-emerald-500/15 ring-2 ring-emerald-400/30'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {selectedRole === 'admin' && (
                  <div className="absolute top-3 right-3 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Page 2
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                    <span>2) Admin Portal</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Live meal headcount audit, 38kg waste prevention & official notices.
                  </p>
                  <div className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-100">
                    🛡️ Chief Warden: Dr. Arvind Swaminathan
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLogin('admin', 'admin.warden@hostel.edu');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Open Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="/?portal=admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Open Admin Portal in a new browser tab / window"
                  >
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                    <span>Open in New Web Page</span>
                  </a>
                </div>
              </div>

              {/* 3) Mess Staff Portal Card */}
              <div
                id="login-role-staff-btn"
                onClick={() => handleRoleChange('staff')}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                  selectedRole === 'staff'
                    ? 'border-purple-600 bg-gradient-to-b from-purple-50/90 to-pink-50/50 shadow-lg shadow-purple-500/15 ring-2 ring-purple-400/30'
                    : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {selectedRole === 'staff' && (
                  <div className="absolute top-3 right-3 text-purple-600">
                    <CheckCircle2 className="w-5 h-5 fill-purple-600 text-white" />
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-purple-500/25">
                      <ChefHat className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      Page 3
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                    <span>3) Mess Staff Portal</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Commercial kitchen portion tracker, food prep pipeline & token scanner.
                  </p>
                  <div className="mt-2 text-[11px] font-bold text-purple-700 bg-purple-50/80 px-2 py-1 rounded-lg border border-purple-100">
                    👨‍🍳 Head Chef: Chef K. Murthy
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickLogin('staff', 'chef.murthy@mess.hostel.edu');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Open Mess Staff Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="/?portal=staff"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Open Mess Staff Portal in a new browser tab / window"
                  >
                    <ExternalLink className="w-3 h-3 text-purple-600" />
                    <span>Open in New Web Page</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>
                    {selectedRole === 'student'
                      ? 'Student Roll Number or Email'
                      : selectedRole === 'admin'
                      ? 'Institutional Admin Email / Username'
                      : 'Mess Staff ID / Email'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 lowercase">{activeConfig.helperText}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="login-identifier-input"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={activeConfig.placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
                  />
                </div>
                {selectedRole === 'student' && (
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-400">Quick Pick Student:</span>
                    {allStudents.slice(0, 3).map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setIdentifier(st.rollNo)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                          identifier === st.rollNo
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'
                        }`}
                      >
                        {st.name} ({st.rollNo})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Security Password / Hostel PIN</span>
                  <span className="text-[11px] text-slate-400 font-normal">Any password accepted for testing</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Note */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Encrypted Session
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="login-submit-btn"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-2xl text-white font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 bg-gradient-to-r ${activeConfig.btnGradient}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating {loginSuccessRole?.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <ActiveIcon className="w-4 h-4" />
                    <span>Sign In to {activeConfig.title}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Security Banner */}
          <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Campus Single Sign-On (SSO) • Roll Number Authentication</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Green Mess Initiative: Preventing Campus Food Wastage</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto py-2 text-center text-xs text-slate-500">
        Cloud-Native Smart Hostel Mess Management System • Secure Role-Based Access Control
      </footer>
    </div>
  );
};
