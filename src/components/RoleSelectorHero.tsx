import React from 'react';
import { useMess } from '../context/MessContext';
import { GraduationCap, ShieldCheck, ChefHat, UserCheck, ArrowRight, Sparkles, CheckCircle2, ExternalLink, LogIn } from 'lucide-react';
import { Role } from '../types';

export const RoleSelectorHero: React.FC = () => {
  const { currentRole, openPortalInNewTab, login, openModal } = useMess();

  const roles: {
    id: Role;
    label: string;
    description: string;
    icon: React.ElementType;
    badge: string;
    bg: string;
    border: string;
    activeBorder: string;
    textColor: string;
    iconBg: string;
    shadowGlow: string;
    features: string[];
  }[] = [
    {
      id: 'student',
      label: '1) Student Page',
      description: 'Book / cancel meals, view menus, submit complaints & give feedback',
      icon: GraduationCap,
      badge: 'Portal 1',
      bg: 'bg-gradient-to-b from-blue-50/90 via-sky-50/50 to-white hover:from-blue-100/80',
      border: 'border-blue-200/90',
      activeBorder: 'border-blue-600 ring-4 ring-blue-500/20 bg-gradient-to-b from-blue-100/90 to-sky-50/90 shadow-color-blue',
      textColor: 'text-blue-950',
      iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100',
      shadowGlow: 'hover:shadow-blue-500/20',
      features: ['Meal Pass QR', 'Skip & Rebate', 'Menu Feedback'],
    },
    {
      id: 'admin',
      label: '2) Admin Portal',
      description: 'Track bookings, monitor student attendance, resolve complaints & broadcasts',
      icon: ShieldCheck,
      badge: 'Portal 2',
      bg: 'bg-gradient-to-b from-emerald-50/90 via-teal-50/50 to-white hover:from-emerald-100/80',
      border: 'border-emerald-200/90',
      activeBorder: 'border-emerald-600 ring-4 ring-emerald-500/20 bg-gradient-to-b from-emerald-100/90 to-teal-50/90 shadow-color-emerald',
      textColor: 'text-emerald-950',
      iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-100',
      shadowGlow: 'hover:shadow-emerald-500/20',
      features: ['Live Headcounts', 'Waste Analytics', 'Notice Broadcast'],
    },
    {
      id: 'staff',
      label: '3) Mess Staff Portal',
      description: 'View live meal counts, edit daily menus, update cooking prep status',
      icon: ChefHat,
      badge: 'Portal 3',
      bg: 'bg-gradient-to-b from-purple-50/90 via-fuchsia-50/50 to-white hover:from-purple-100/80',
      border: 'border-purple-200/90',
      activeBorder: 'border-purple-600 ring-4 ring-purple-500/20 bg-gradient-to-b from-purple-100/90 to-fuchsia-50/90 shadow-color-purple',
      textColor: 'text-purple-950',
      iconBg: 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 ring-4 ring-purple-100',
      shadowGlow: 'hover:shadow-purple-500/20',
      features: ['Kitchen Prep Stages', 'Menu Publishing', 'Barcode Verification'],
    },
  ];

  const handleRoleSelect = (roleId: Role) => {
    login(roleId);
  };

  return (
    <section className="mb-8 pt-4">
      {/* Title & Tagline Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 border border-indigo-200/60 text-xs font-bold text-indigo-900 mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Unified Smart Dining Ecosystem</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Hostel Mess Management
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium flex items-center justify-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-xs sm:text-sm">
            ⚡ Smart Meal Planning
          </span>
          <span className="text-slate-300">•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-xs sm:text-sm">
            🌱 40% Less Food Waste
          </span>
          <span className="text-slate-300">•</span>
          <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold text-xs sm:text-sm">
            🍽️ 5-Star Dining Experience
          </span>
        </p>
      </div>

      {/* Role Selection Container */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 transition-all">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mb-2 shadow-md shadow-indigo-500/25">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Select Active Operational Role</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Sign in to enter your assigned hostel mess operational portal
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;

            return (
              <button
                key={role.id}
                id={`role-select-${role.id}`}
                onClick={() => handleRoleSelect(role.id)}
                className={`relative group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  isActive ? role.activeBorder : `${role.border} ${role.bg}`
                } hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Top Badge */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-slate-200/80 text-slate-600 shadow-2xs">
                    {role.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-blue-600">
                    <LogIn className="w-3 h-3" />
                    <span>Sign In</span>
                  </span>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl ${role.iconBg} flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-1.5 font-black text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  <span>{role.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                  {role.description}
                </p>

                {/* Feature Mini Chips */}
                <div className="mt-3 pt-3 border-t border-slate-200/60 w-full flex flex-wrap justify-center gap-1.5 mb-3">
                  {role.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Open in Dedicated Page Button */}
                <div className="w-full mt-auto pt-1 flex items-center gap-2">
                  <a
                    href={`/?portal=${role.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-full py-1.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-black flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow cursor-pointer"
                    title={`Open ${role.label} in a separate new browser tab / web page`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Open in New Web Page</span>
                  </a>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
