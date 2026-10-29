import React from 'react';

export type BackgroundTheme = 'aurora' | 'warm-bistro' | 'eco-emerald' | 'twilight';

interface CreativeBackgroundProps {
  theme?: BackgroundTheme;
}

export const CreativeBackground: React.FC<CreativeBackgroundProps> = ({ theme = 'aurora' }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-700">
      {/* 1. Base Gradient Canvas with Rich Multi-Stop Colors */}
      {theme === 'aurora' && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-purple-50/70" />
      )}
      {theme === 'warm-bistro' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-rose-50/60" />
      )}
      {theme === 'eco-emerald' && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-cyan-50/60" />
      )}
      {theme === 'twilight' && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/90 via-indigo-50/80 to-purple-100/60" />
      )}

      {/* 2. Architectural Dot Matrix Grid with Colored Hue */}
      <div className="absolute inset-0 creative-dot-grid opacity-85" />

      {/* 3. Subtle Isometric Grid Lines for depth */}
      <div className="absolute inset-0 creative-iso-lines opacity-75" />

      {/* 4. Vibrant Floating Atmospheric Gradient Mesh Orbs */}
      {/* Top Left Radiant Glow */}
      <div
        className={`absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse-soft mix-blend-multiply ${
          theme === 'aurora'
            ? 'bg-gradient-to-tr from-blue-400/40 via-cyan-300/35 to-indigo-400/30'
            : theme === 'warm-bistro'
            ? 'bg-gradient-to-tr from-amber-400/45 via-orange-300/40 to-yellow-300/35'
            : theme === 'eco-emerald'
            ? 'bg-gradient-to-tr from-emerald-400/45 via-teal-300/40 to-green-300/35'
            : 'bg-gradient-to-tr from-indigo-500/40 via-purple-400/35 to-blue-400/30'
        }`}
      />

      {/* Top Right Radiant Glow */}
      <div
        className={`absolute -top-20 -right-20 w-[34rem] h-[34rem] rounded-full blur-3xl animate-float-slow mix-blend-multiply ${
          theme === 'aurora'
            ? 'bg-gradient-to-bl from-purple-400/35 via-pink-300/30 to-blue-300/35'
            : theme === 'warm-bistro'
            ? 'bg-gradient-to-bl from-rose-400/40 via-red-300/30 to-amber-300/35'
            : theme === 'eco-emerald'
            ? 'bg-gradient-to-bl from-teal-400/40 via-cyan-300/35 to-emerald-300/30'
            : 'bg-gradient-to-bl from-violet-500/40 via-fuchsia-400/30 to-indigo-400/35'
        }`}
      />

      {/* Center Ambient Orb */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full blur-3xl animate-pulse-gentle mix-blend-multiply ${
          theme === 'aurora'
            ? 'bg-gradient-to-r from-blue-300/25 via-emerald-200/25 to-indigo-300/25'
            : theme === 'warm-bistro'
            ? 'bg-gradient-to-r from-amber-300/30 via-orange-200/30 to-yellow-200/30'
            : theme === 'eco-emerald'
            ? 'bg-gradient-to-r from-emerald-300/30 via-lime-200/25 to-teal-300/30'
            : 'bg-gradient-to-r from-indigo-300/30 via-purple-200/25 to-blue-300/30'
        }`}
      />

      {/* Bottom Floating Orbs */}
      <div
        className={`absolute -bottom-36 left-1/6 w-[30rem] h-[30rem] rounded-full blur-3xl animate-float-reverse mix-blend-multiply ${
          theme === 'aurora'
            ? 'bg-gradient-to-tr from-cyan-400/30 via-sky-300/25 to-blue-400/30'
            : theme === 'warm-bistro'
            ? 'bg-gradient-to-tr from-pink-400/30 via-rose-300/30 to-amber-300/30'
            : theme === 'eco-emerald'
            ? 'bg-gradient-to-tr from-cyan-400/30 via-emerald-300/30 to-teal-400/30'
            : 'bg-gradient-to-tr from-blue-400/30 via-indigo-400/30 to-purple-400/30'
        }`}
      />
      <div
        className={`absolute -bottom-24 right-1/6 w-[28rem] h-[28rem] rounded-full blur-3xl animate-float-slow mix-blend-multiply ${
          theme === 'aurora'
            ? 'bg-gradient-to-tl from-emerald-400/30 via-teal-300/25 to-indigo-400/30'
            : theme === 'warm-bistro'
            ? 'bg-gradient-to-tl from-amber-400/35 via-yellow-300/30 to-orange-400/30'
            : theme === 'eco-emerald'
            ? 'bg-gradient-to-tl from-green-400/35 via-emerald-300/30 to-lime-300/25'
            : 'bg-gradient-to-tl from-purple-400/35 via-violet-300/30 to-pink-400/25'
        }`}
      />

      {/* 5. Colorful Floating Geometric & Organic Decorative Shapes */}
      {/* Circle Ring Constellation 1 */}
      <svg
        className="absolute top-16 left-12 w-64 h-64 text-blue-500/15 animate-float-slow"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7" />
        <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
        <circle cx="100" cy="15" r="5" fill="currentColor" />
        <circle cx="185" cy="100" r="4" fill="currentColor" />
        <circle cx="100" cy="185" r="5" fill="currentColor" />
        <circle cx="15" cy="100" r="4" fill="currentColor" />
      </svg>

      {/* Steam Curve Ribbon Wave Art */}
      <svg
        className="absolute top-44 right-14 w-72 h-72 text-emerald-500/15 animate-float-reverse"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30,160 C70,130 70,80 110,60 C150,40 150,10 180,20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M50,180 C90,150 90,100 130,80 C170,60 170,30 195,40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 6"
        />
        <rect x="25" y="25" width="150" height="150" rx="42" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="6" fill="currentColor" />
      </svg>

      {/* Dynamic Polygon Shield */}
      <svg
        className="absolute bottom-32 left-1/4 w-80 h-80 text-amber-500/15 animate-pulse-gentle"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="150,20 280,260 20,260"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <circle cx="150" cy="160" r="75" stroke="currentColor" strokeWidth="2" />
        <circle cx="150" cy="160" r="10" fill="currentColor" />
      </svg>

      {/* Purple Floral Geometry */}
      <svg
        className="absolute bottom-24 right-1/4 w-60 h-60 text-purple-500/15 animate-float-slow"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="30" y="30" width="140" height="140" rx="35" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* 6. Colorful Floating Micro Particles */}
      <div className="absolute top-1/4 left-1/5 w-3 h-3 rounded-full bg-blue-500/30 animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-2/3 right-1/5 w-3.5 h-3.5 rounded-full bg-amber-500/30 animate-ping" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-emerald-500/30 animate-ping" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 rounded-full bg-purple-500/30 animate-ping" style={{ animationDuration: '4.5s' }} />
    </div>
  );
};
