import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { ComplaintCategory } from '../../types';
import { MessageSquareWarning, Send, X, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SubmitComplaintModal: React.FC = () => {
  const { activeModal, closeModal, submitComplaint, currentStudent } = useMess();
  const [category, setCategory] = useState<ComplaintCategory>('Food Quality');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'submit_complaint') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    submitComplaint({
      category,
      title,
      description,
      priority,
    });
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setTitle('');
    setDescription('');
    closeModal();
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
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Complaint Submitted</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Your grievance has been securely logged with the Hostel Mess Committee and Warden.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-5 text-left text-xs text-slate-700 space-y-1">
              <p><strong className="text-slate-900">Category:</strong> {category}</p>
              <p><strong className="text-slate-900">Subject:</strong> {title}</p>
              <p><strong className="text-slate-900">Status:</strong> <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold">Pending Review</span></p>
            </div>
            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md shadow-purple-500/20"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <MessageSquareWarning className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Submit a Complaint</h3>
                <p className="text-xs text-slate-500">
                  Student: {currentStudent.name} • Room {currentStudent.roomNo} ({currentStudent.hostelBlock})
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Food Quality">Food Quality (Raw, stale, hygiene)</option>
                  <option value="Taste">Taste & Spicing</option>
                  <option value="Quantity">Quantity / Refill Shortage</option>
                  <option value="Hygiene">Hygiene & Cleanliness</option>
                  <option value="Timing">Serving Timing Delay</option>
                  <option value="Staff Behavior">Staff Behavior & Counter Conduct</option>
                  <option value="Other">Other Issues</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setPriority(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        priority === lvl
                          ? lvl === 'High'
                            ? 'bg-rose-50 border-rose-500 text-rose-700'
                            : lvl === 'Medium'
                            ? 'bg-amber-50 border-amber-500 text-amber-700'
                            : 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Complaint Subject
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sambar was cold during breakfast"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the meal, time of incident, counter number, and exact issue..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500 resize-none"
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
                id="submit-complaint-btn"
                className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Submit Grievance
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
