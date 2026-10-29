import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { MealType } from '../../types';
import { Utensils, Save, Trash2, X, Plus, Calendar, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EditMenuModal: React.FC = () => {
  const { activeModal, modalPayload, closeModal, todayMenu, tomorrowMenu, updateMenu, deleteMenuItem } = useMess();

  const initialDay = modalPayload?.day || 'today';
  const initialMeal: MealType = modalPayload?.mealType || 'breakfast';

  const [targetDay, setTargetDay] = useState<'today' | 'tomorrow'>(initialDay);
  const [targetMeal, setTargetMeal] = useState<MealType>(initialMeal);
  
  // Current values
  const currentText =
    targetDay === 'today'
      ? todayMenu[targetMeal]
      : tomorrowMenu[targetMeal];

  const [menuItemsText, setMenuItemsText] = useState(currentText);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if tabs change
  React.useEffect(() => {
    const val = targetDay === 'today' ? todayMenu[targetMeal] : tomorrowMenu[targetMeal];
    setMenuItemsText(val);
    setSavedSuccess(false);
  }, [targetDay, targetMeal, todayMenu, tomorrowMenu]);

  if (activeModal !== 'edit_menu') return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuItemsText.trim()) return;

    updateMenu(targetDay, targetMeal, menuItemsText.trim());
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handleDelete = () => {
    deleteMenuItem(targetDay, targetMeal);
    setMenuItemsText('Menu to be announced');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const quickSuggestions: Record<MealType, string[]> = {
    breakfast: [
      'Idli, Sambar, Coconut Chutney, Tea',
      'Poha, Roasted Peanuts, Masala Chai',
      'Masala Dosa, Tomato Chutney, Filter Coffee',
      'Aloo Paratha, Fresh Curd, Pickle, Tea',
      'Upma, Kesari Bath, Chutney, Coffee',
    ],
    lunch: [
      'Steamed Rice, Sambar, Rasam, Papad, Curd, Veg Poriyal',
      'Rice, Rajma Masala, Roti, Cucumber Salad, Gulab Jamun',
      'Jeera Rice, Dal Tadka, Mix Veg Curry, Chapati, Boondi Raita',
      'Lemon Rice, Curd Rice, Potato Fry, Pickle, Sweet Pongal',
    ],
    dinner: [
      'Soft Chapatis, Paneer Butter Masala, Veg Pulao, Dal Fry',
      'Phulka, Aloo Gobi Matar, Rice, Rasam, Moong Dal Halwa',
      'Vegetable Biryani, Mirchi Ka Salan, Onion Raita, Sevaiyan',
      'Rotis, Kadai Mushroom, Steamed Rice, Yellow Dal, Fruit Custard',
    ],
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
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Mess Menu Management</h3>
            <p className="text-xs text-slate-500">
              Update daily meal items • Changes notify all students immediately
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Menu saved & notification sent to students!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Day selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Day
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setTargetDay('today')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  targetDay === 'today' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Today ({todayMenu.dateStr})
              </button>
              <button
                type="button"
                onClick={() => setTargetDay('tomorrow')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  targetDay === 'tomorrow' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                Tomorrow ({tomorrowMenu.dateStr})
              </button>
            </div>
          </div>

          {/* Meal Type selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Meal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setTargetMeal(m)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                    targetMeal === m
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Editor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Menu Dishes / Items (Comma separated)
            </label>
            <input
              type="text"
              required
              value={menuItemsText}
              onChange={(e) => setMenuItemsText(e.target.value)}
              placeholder="e.g. Masala Dosa, Sambar, Coconut Chutney, Tea"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Quick preset templates */}
          <div>
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickSuggestions[targetMeal].slice(0, 3).map((sug, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setMenuItemsText(sug)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-600 rounded-lg text-[11px] font-medium transition-colors text-left"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-3">
            <button
              type="button"
              onClick={handleDelete}
              title="Clear/Delete Menu"
              className="p-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="save-menu-changes-btn"
              className="flex-1 py-3 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Save & Notify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
