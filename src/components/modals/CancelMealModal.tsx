import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { XCircle, Calendar, AlertTriangle, X, Check, Utensils } from 'lucide-react';

export const CancelMealModal: React.FC = () => {
  const {
    activeModal,
    closeModal,
    bookings,
    currentStudent,
    cancelMeal,
    todayMenu,
    tomorrowMenu,
  } = useMess();

  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  if (activeModal !== 'cancel_meal') return null;

  const studentBookings = bookings.filter(
    (b) =>
      b.studentId === currentStudent.id &&
      (b.isoDate === todayMenu.isoDate || b.isoDate === tomorrowMenu.isoDate) &&
      b.status === 'Booked'
  );

  const handleCancel = (bookingId: string) => {
    const res = cancelMeal(bookingId);
    if (res.success) {
      setCancelFeedback(res.message);
      setTimeout(() => {
        setCancelFeedback(null);
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cancel A Meal</h3>
            <p className="text-xs text-slate-500">
              Manage and cancel upcoming meal bookings to prevent food waste
            </p>
          </div>
        </div>

        {cancelFeedback && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{cancelFeedback}</span>
          </div>
        )}

        {/* Cancellation Notice Policy */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 mb-5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Cancellation Deadlines:</p>
            <p className="text-amber-800 mt-0.5">
              • Breakfast: By 10:00 PM previous night <br />
              • Lunch: By 09:00 AM same day <br />
              • Dinner: By 04:00 PM same day
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {studentBookings.length === 0 ? (
            <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Utensils className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No active bookings found</p>
              <p className="text-xs text-slate-500 mt-1">
                You do not have any upcoming meals booked for today or tomorrow.
              </p>
            </div>
          ) : (
            studentBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      {b.mealType === 'breakfast' ? '☕ Breakfast' : b.mealType === 'lunch' ? '🍲 Lunch' : '🍛 Dinner'}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                      {b.dateStr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    Token: <span className="font-bold text-slate-700">{b.token}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleCancel(b.id)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
