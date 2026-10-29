import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { Star, MessageSquareHeart, X, TrendingUp, ThumbsUp, Filter } from 'lucide-react';

export const FeedbacksListModal: React.FC = () => {
  const { activeModal, closeModal, feedbacks, todayMenu } = useMess();
  const [selectedMeal, setSelectedMeal] = useState<string>('All');

  if (activeModal !== 'view_feedbacks') return null;

  // Calculate average scores
  const total = feedbacks.length;
  const avgQuality = (
    feedbacks.reduce((acc, f) => acc + f.foodQuality, 0) / (total || 1)
  ).toFixed(1);
  const avgTaste = (
    feedbacks.reduce((acc, f) => acc + f.taste, 0) / (total || 1)
  ).toFixed(1);
  const avgQuantity = (
    feedbacks.reduce((acc, f) => acc + f.quantity, 0) / (total || 1)
  ).toFixed(1);
  const avgOverall = (
    feedbacks.reduce((acc, f) => acc + f.overallRating, 0) / (total || 1)
  ).toFixed(1);

  const filteredFeedbacks = feedbacks.filter(
    (f) => selectedMeal === 'All' || f.mealType === selectedMeal
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative flex flex-col max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Star className="w-5 h-5 fill-amber-600 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Student Meal Feedbacks & Ratings</h3>
            <p className="text-xs text-slate-500">
              Aggregated food taste, quality, and portion reviews submitted by hostel students
            </p>
          </div>
        </div>

        {/* Aggregate Ratings Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Overall Score
            </span>
            <div className="text-xl font-black text-amber-900 mt-0.5 flex items-center justify-center gap-1">
              <span>{avgOverall}</span>
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-[10px] text-amber-700">{total} reviews</span>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              Food Quality
            </span>
            <div className="text-xl font-black text-blue-900 mt-0.5 flex items-center justify-center gap-1">
              <span>{avgQuality}</span>
              <span className="text-xs font-normal text-blue-600">/ 5</span>
            </div>
            <span className="text-[10px] text-blue-700">⭐⭐⭐⭐☆</span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Taste & Flavor
            </span>
            <div className="text-xl font-black text-emerald-900 mt-0.5 flex items-center justify-center gap-1">
              <span>{avgTaste}</span>
              <span className="text-xs font-normal text-emerald-600">/ 5</span>
            </div>
            <span className="text-[10px] text-emerald-700">⭐⭐⭐☆☆</span>
          </div>

          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
              Quantity / Refill
            </span>
            <div className="text-xl font-black text-purple-900 mt-0.5 flex items-center justify-center gap-1">
              <span>{avgQuantity}</span>
              <span className="text-xs font-normal text-purple-600">/ 5</span>
            </div>
            <span className="text-[10px] text-purple-700">⭐⭐⭐⭐☆</span>
          </div>
        </div>

        {/* Meal Filter Tabs */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['All', 'breakfast', 'lunch', 'dinner'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMeal(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedMeal === m ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredFeedbacks.length} comments
          </span>
        </div>

        {/* Feedback comments list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{fb.studentName}</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full capitalize">
                    {fb.mealType}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">({fb.rollNo})</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <span>{fb.overallRating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-2 font-medium">
                "{fb.comments}"
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span>Quality: <strong className="text-slate-700">{fb.foodQuality}/5</strong></span>
                  <span>Taste: <strong className="text-slate-700">{fb.taste}/5</strong></span>
                  <span>Quantity: <strong className="text-slate-700">{fb.quantity}/5</strong></span>
                </div>
                <span>{fb.submittedAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs"
          >
            Close Feedbacks
          </button>
        </div>
      </div>
    </div>
  );
};
