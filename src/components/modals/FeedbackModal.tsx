import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { MealType } from '../../types';
import { Star, MessageSquareHeart, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeedbackModal: React.FC = () => {
  const { activeModal, closeModal, submitFeedback, currentStudent, todayMenu } = useMess();
  const [mealType, setMealType] = useState<MealType>('lunch');
  const [foodQuality, setFoodQuality] = useState<number>(4);
  const [taste, setTaste] = useState<number>(3);
  const [quantity, setQuantity] = useState<number>(4);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'give_feedback') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      mealType,
      foodQuality,
      taste,
      quantity,
      comments: comments.trim() || 'Good quality meal overall.',
    });
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setComments('');
    closeModal();
  };

  const StarRatingRow: React.FC<{
    label: string;
    value: number;
    onChange: (val: number) => void;
    helperText?: string;
  }> = ({ label, value, onChange, helperText }) => {
    return (
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{label}</span>
          <span className="text-xs font-mono font-bold text-amber-600">{value} / 5</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => onChange(star)}
              className="p-1 text-slate-300 hover:text-amber-400 focus:outline-hidden transition-transform active:scale-125"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                }`}
              />
            </button>
          ))}
          {helperText && <span className="text-[11px] text-slate-500 ml-2">{helperText}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Thank You For Your Feedback!</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Your ratings directly influence weekly menu ratings and mess chef incentives.
            </p>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 my-5 text-left text-xs space-y-1 text-amber-900 font-medium">
              <p>🍽️ <strong>Meal:</strong> {mealType.toUpperCase()} ({todayMenu.dateStr})</p>
              <p>⭐ <strong>Food Quality:</strong> {foodQuality} / 5</p>
              <p>⭐ <strong>Taste:</strong> {taste} / 5</p>
              <p>⭐ <strong>Quantity:</strong> {quantity} / 5</p>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md shadow-amber-500/20"
            >
              Back to Student Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Rate Today's Meal</h3>
                <p className="text-xs text-slate-500">
                  Student: {currentStudent.name} • {todayMenu.dateStr}
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* Meal Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Which Meal Are You Rating?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMealType(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                        mealType === m
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Explicit Ratings requested by user prompt: Food Quality, Taste, Quantity */}
              <StarRatingRow
                label="Food Quality"
                value={foodQuality}
                onChange={setFoodQuality}
                helperText="(Freshness, temperature, hygiene)"
              />

              <StarRatingRow
                label="Taste"
                value={taste}
                onChange={setTaste}
                helperText="(Flavor, seasoning, texture)"
              />

              <StarRatingRow
                label="Quantity"
                value={quantity}
                onChange={setQuantity}
                helperText="(Portion size & refills)"
              />

              {/* Optional comments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Comments & Chef Suggestions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Sambar was excellent today, dal needed a pinch less salt..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={resetAndClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-feedback-btn"
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Star className="w-4 h-4 fill-white" />
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
