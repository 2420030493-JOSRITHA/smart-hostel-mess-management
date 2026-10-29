import React from 'react';
import { useMess } from '../../context/MessContext';
import { Bell, CheckCheck, X, Sparkles, Utensils, MessageSquareWarning, Megaphone } from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const { activeModal, closeModal, notifications, markAllNotificationsRead } = useMess();

  if (activeModal !== 'notifications') return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'menu_update':
        return <Utensils className="w-4 h-4 text-emerald-600" />;
      case 'complaint_update':
        return <MessageSquareWarning className="w-4 h-4 text-purple-600" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative flex flex-col max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between gap-3 mb-4 pr-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">All Notifications & Alerts</h3>
              <p className="text-xs text-slate-500">Live feed of menu updates and dining announcements</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 text-xs">
          <span className="text-slate-500 font-medium">Total: {notifications.length} notifications</span>
          <button
            onClick={markAllNotificationsRead}
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-colors ${
                !n.read
                  ? 'bg-blue-50/60 border-blue-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center shrink-0">
                    {getIcon(n.type)}
                  </div>
                  <span className="font-bold text-xs text-slate-900">{n.title}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 ml-9 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
