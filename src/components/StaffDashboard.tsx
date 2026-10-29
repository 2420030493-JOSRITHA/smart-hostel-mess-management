import React, { useState } from 'react';
import { useMess } from '../context/MessContext';
import { MealType, PrepStatusValue } from '../types';
import {
  ChefHat,
  User,
  Calendar,
  Coffee,
  Soup,
  UtensilsCrossed,
  Edit3,
  Trash2,
  Clock,
  CheckCircle2,
  Flame,
  ScanLine,
  Check,
  AlertCircle,
  Plus,
  Sparkles,
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const {
    todayMenu,
    bookingCounts,
    prepStatus,
    updatePrepStatus,
    deleteMenuItem,
    openModal,
    checkInStudentMeal,
  } = useMess();

  const [scanInput, setScanInput] = useState('');
  const [scanMeal, setScanMeal] = useState<MealType>('breakfast');
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const res = checkInStudentMeal(scanInput, scanMeal);
    setScanResult(res);
    if (res.success) {
      setScanInput('');
    }
    setTimeout(() => {
      setScanResult(null);
    }, 3500);
  };

  const getStatusBadge = (status: PrepStatusValue) => {
    switch (status) {
      case 'Preparing':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xs animate-pulse';
      case 'Ready to Serve':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs';
      case 'Completed':
        return 'bg-slate-700 text-white';
      default:
        return 'bg-amber-100 text-amber-900 border border-amber-300';
    }
  };

  const cycleStatus = (meal: MealType) => {
    const sequence: PrepStatusValue[] = ['Not Started', 'Preparing', 'Ready to Serve', 'Completed'];
    const currentIdx = sequence.indexOf(prepStatus[meal]);
    const nextIdx = (currentIdx + 1) % sequence.length;
    updatePrepStatus(meal, sequence[nextIdx]);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-xl hover:shadow-2xl border border-purple-200/80 flex flex-col h-full transition-all relative overflow-hidden">
      {/* Subtle top color highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />

      {/* Top Header Card */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md shadow-purple-500/25 ring-2 ring-purple-100">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">3) Mess Staff Portal</h2>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Kitchen Ops & Food Quality Team
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openModal('login')}
            className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all active:scale-95"
            title="Staff Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Today's Meals Headcount Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Expected Meal Headcounts</span>
          </div>
          <span className="text-[11px] font-black text-purple-900 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200 shadow-2xs">
            {todayMenu.dateStr}
          </span>
        </div>

        {/* 3 Count Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Breakfast Card */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/70 border border-amber-200/90 rounded-2xl p-3.5 text-center flex flex-col items-center shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs mb-1">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black text-amber-950 uppercase">Breakfast</span>
            <span className="text-2xl font-black text-amber-950 mt-0.5">
              {bookingCounts.breakfast}
            </span>
            <span className="text-[10px] text-amber-700 font-bold mt-0.5">Portions</span>
          </div>

          {/* Lunch Card */}
          <div className="bg-gradient-to-b from-emerald-50 to-teal-50/70 border border-emerald-200/90 rounded-2xl p-3.5 text-center flex flex-col items-center shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs mb-1">
              <Soup className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black text-emerald-950 uppercase">Lunch</span>
            <span className="text-2xl font-black text-emerald-950 mt-0.5">
              {bookingCounts.lunch}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold mt-0.5">Portions</span>
          </div>

          {/* Dinner Card */}
          <div className="bg-gradient-to-b from-purple-50 to-pink-50/70 border border-purple-200/90 rounded-2xl p-3.5 text-center flex flex-col items-center shadow-2xs hover:shadow-xs transition-all">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs mb-1">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-black text-purple-950 uppercase">Dinner</span>
            <span className="text-2xl font-black text-purple-950 mt-0.5">
              {bookingCounts.dinner}
            </span>
            <span className="text-[10px] text-purple-700 font-bold mt-0.5">Portions</span>
          </div>
        </div>
      </div>

      {/* Menu Management Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wide">
            <UtensilsCrossed className="w-4 h-4 text-purple-600" />
            <span>Today's Active Spread</span>
          </div>
          <button
            id="staff-edit-menu-btn"
            onClick={() => openModal('edit_menu')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-xs font-black transition-all shadow-sm shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Menu</span>
          </button>
        </div>

        {/* Table of items with Edit and Delete options */}
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100 text-xs">
            {/* Breakfast */}
            <div className="p-3 flex items-center justify-between gap-2 hover:bg-amber-50/30 transition-colors">
              <div className="flex-1">
                <span className="font-black text-amber-900 mr-2 bg-amber-100/70 px-2 py-0.5 rounded-md border border-amber-200 text-[10px]">
                  Breakfast
                </span>
                <span className="text-slate-700 font-medium">{todayMenu.breakfast}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openModal('edit_menu', { day: 'today', mealType: 'breakfast' })}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMenuItem('today', 'breakfast')}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Lunch */}
            <div className="p-3 flex items-center justify-between gap-2 hover:bg-emerald-50/30 transition-colors">
              <div className="flex-1">
                <span className="font-black text-emerald-900 mr-2 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                  Lunch
                </span>
                <span className="text-slate-700 font-medium">{todayMenu.lunch}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openModal('edit_menu', { day: 'today', mealType: 'lunch' })}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMenuItem('today', 'lunch')}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Dinner */}
            <div className="p-3 flex items-center justify-between gap-2 hover:bg-purple-50/30 transition-colors">
              <div className="flex-1">
                <span className="font-black text-purple-900 mr-2 bg-purple-100/70 px-2 py-0.5 rounded-md border border-purple-200 text-[10px]">
                  Dinner
                </span>
                <span className="text-slate-700 font-medium">{todayMenu.dinner}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openModal('edit_menu', { day: 'today', mealType: 'dinner' })}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMenuItem('today', 'dinner')}
                  className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-[11px] cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Preparation Status Section */}
      <div className="bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-yellow-50/50 border border-amber-200/80 rounded-2xl p-4 mb-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-black text-amber-950 uppercase tracking-wide">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Kitchen Preparation Workflow</span>
          </div>
          <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
            Tap card to update stage
          </span>
        </div>

        {/* 3 Status Cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Breakfast */}
          <button
            onClick={() => cycleStatus('breakfast')}
            className="p-3 bg-white/90 border border-amber-200/80 rounded-xl text-center flex flex-col items-center hover:shadow-md transition-all cursor-pointer"
          >
            <Coffee className="w-4 h-4 text-amber-600 mb-1" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">Breakfast</span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full mt-1 ${getStatusBadge(prepStatus.breakfast)}`}>
              {prepStatus.breakfast}
            </span>
          </button>

          {/* Lunch */}
          <button
            onClick={() => cycleStatus('lunch')}
            className="p-3 bg-white/90 border border-amber-200/80 rounded-xl text-center flex flex-col items-center hover:shadow-md transition-all cursor-pointer"
          >
            <Soup className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">Lunch</span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full mt-1 ${getStatusBadge(prepStatus.lunch)}`}>
              {prepStatus.lunch}
            </span>
          </button>

          {/* Dinner */}
          <button
            onClick={() => cycleStatus('dinner')}
            className="p-3 bg-white/90 border border-amber-200/80 rounded-xl text-center flex flex-col items-center hover:shadow-md transition-all cursor-pointer"
          >
            <UtensilsCrossed className="w-4 h-4 text-purple-600 mb-1" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">Dinner</span>
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-full mt-1 ${getStatusBadge(prepStatus.dinner)}`}>
              {prepStatus.dinner}
            </span>
          </button>
        </div>
      </div>

      {/* Serving Counter QR / Roll Verification Scanner */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <form onSubmit={handleScanSubmit} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <ScanLine className="w-3.5 h-3.5 text-purple-600" />
              Serving Counter Check-In
            </span>
            <select
              value={scanMeal}
              onChange={(e) => setScanMeal(e.target.value as MealType)}
              className="text-[11px] font-black text-purple-900 bg-purple-100/80 border border-purple-200 rounded-lg px-2.5 py-1 focus:outline-hidden cursor-pointer"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Enter student Roll No (e.g. 21CS1084) or Token..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-2xs"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              Verify
            </button>
          </div>

          {scanResult && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs ${
                scanResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {scanResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{scanResult.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

