import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { MealType } from '../../types';
import { Utensils, Calendar, CheckCircle2, Clock, Info, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookMealModal: React.FC = () => {
  const { activeModal, closeModal, todayMenu, tomorrowMenu, bookMeal, currentStudent } = useMess();
  const [dateChoice, setDateChoice] = useState<'today' | 'tomorrow'>('tomorrow');
  const [selectedMeals, setSelectedMeals] = useState<MealType[]>(['breakfast', 'lunch', 'dinner']);
  const [specialNote, setSpecialNote] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<{ message: string; tokens: string[] } | null>(null);

  if (activeModal !== 'book_meal') return null;

  const targetMenu = dateChoice === 'today' ? todayMenu : tomorrowMenu;

  const toggleMeal = (meal: MealType) => {
    if (selectedMeals.includes(meal)) {
      if (selectedMeals.length === 1) return; // keep at least one
      setSelectedMeals(selectedMeals.filter((m) => m !== meal));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };

  const handleBooking = () => {
    const res = bookMeal(selectedMeals, dateChoice, specialNote);
    if (res.success) {
      setBookingSuccess({
        message: res.message,
        tokens: res.tokens || [],
      });
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          id="close-book-meal-modal"
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingSuccess ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Booking Confirmed!</h3>
            <p className="text-sm text-slate-600 mt-2">{bookingSuccess.message}</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 my-5 text-left">
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                Your Digital Meal Pass Tokens
              </p>
              <div className="flex flex-wrap gap-2">
                {bookingSuccess.tokens.map((token) => (
                  <span
                    key={token}
                    className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-900 font-mono font-bold text-sm rounded-xl shadow-xs"
                  >
                    {token}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-emerald-700 mt-3 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                Show this token or QR pass at the mess serving counter.
              </p>
            </div>

            <button
              onClick={closeModal}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all"
            >
              Done & View Passes
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Book A Meal</h3>
                <p className="text-xs text-slate-500">
                  Reserving for: <span className="font-semibold text-slate-700">{currentStudent.name}</span> ({currentStudent.rollNo})
                </p>
              </div>
            </div>

            {/* Date Choice Tabs */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDateChoice('today')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    dateChoice === 'today'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Today ({todayMenu.dateStr})
                </button>
                <button
                  type="button"
                  onClick={() => setDateChoice('tomorrow')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    dateChoice === 'tomorrow'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Tomorrow ({tomorrowMenu.dateStr})
                </button>
              </div>
            </div>

            {/* Meal Types Selection with Live Menu Preview */}
            <div className="space-y-2.5 mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Meals
              </label>

              {/* Breakfast */}
              <div
                onClick={() => toggleMeal('breakfast')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedMeals.includes('breakfast')
                    ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/30'
                    : 'border-slate-200 bg-slate-50 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase">☕ Breakfast</span>
                    <span className="text-[11px] text-slate-500">07:30 AM - 09:30 AM</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 font-medium">{targetMenu.breakfast}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedMeals.includes('breakfast')
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedMeals.includes('breakfast') && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              {/* Lunch */}
              <div
                onClick={() => toggleMeal('lunch')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedMeals.includes('lunch')
                    ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/30'
                    : 'border-slate-200 bg-slate-50 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase">🍲 Lunch</span>
                    <span className="text-[11px] text-slate-500">12:30 PM - 02:30 PM</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 font-medium">{targetMenu.lunch}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedMeals.includes('lunch')
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedMeals.includes('lunch') && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>

              {/* Dinner */}
              <div
                onClick={() => toggleMeal('dinner')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedMeals.includes('dinner')
                    ? 'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500/30'
                    : 'border-slate-200 bg-slate-50 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 uppercase">🍛 Dinner</span>
                    <span className="text-[11px] text-slate-500">07:30 PM - 09:45 PM</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 font-medium">{targetMenu.dinner}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedMeals.includes('dinner')
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedMeals.includes('dinner') && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            </div>

            {/* Optional Dietary / Allergy Note */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Dietary Note (Optional)
              </label>
              <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Less spicy, Jain prep, no dairy..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                id="confirm-meal-booking-btn"
                onClick={handleBooking}
                disabled={selectedMeals.length === 0}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Confirm Booking ({selectedMeals.length})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
