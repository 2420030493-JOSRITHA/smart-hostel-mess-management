import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { Megaphone, Send, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AnnouncementModal: React.FC = () => {
  const { activeModal, closeModal, sendAnnouncement } = useMess();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState<'all' | 'student' | 'staff'>('all');
  const [sent, setSent] = useState(false);

  if (activeModal !== 'send_announcement') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    sendAnnouncement(title, message, targetRole);
    setSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const resetAndClose = () => {
    setSent(false);
    setTitle('');
    setMessage('');
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

        {sent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Announcement Broadcasted!</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Notification successfully delivered to student portals and mess displays.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 my-5 text-left text-xs text-amber-900">
              <strong className="block font-bold mb-1">{title}</strong>
              <p>{message}</p>
            </div>
            <button
              onClick={resetAndClose}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md shadow-amber-500/20"
            >
              Back to Admin Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Send Mess Announcement</h3>
                <p className="text-xs text-slate-500">
                  Broadcast instant notification to hostel residents & mess team
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Target Audience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'All Users' },
                    { id: 'student', label: 'Students Only' },
                    { id: 'staff', label: 'Staff Only' },
                  ].map((aud) => (
                    <button
                      type="button"
                      key={aud.id}
                      onClick={() => setTargetRole(aud.id as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        targetRole === aud.id
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Announcement Header / Subject
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Special Feast on Friday Night! / Maintenance Notice"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Announcement Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the message that will pop up in student dashboards..."
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
                id="send-broadcast-btn"
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Broadcast Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
