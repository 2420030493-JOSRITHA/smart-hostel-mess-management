import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { ComplaintStatus, ComplaintCategory } from '../../types';
import {
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  Filter,
  X,
  Send,
  AlertCircle,
  Check,
} from 'lucide-react';

export const ComplaintsModal: React.FC = () => {
  const {
    activeModal,
    modalPayload,
    closeModal,
    complaints,
    resolveComplaint,
    pendingComplaintsCount,
    totalComplaintsCount,
  } = useMess();

  const initialTab = modalPayload?.tab === 'pending' ? 'Pending' : 'All';
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Resolved'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (activeModal !== 'view_complaints') return null;

  const filteredComplaints = complaints.filter((c) => {
    const matchesTab = activeTab === 'All' || c.status === activeTab;
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesTab && matchesCat;
  });

  const handleResolve = (id: string) => {
    if (!replyText.trim()) {
      resolveComplaint(id, 'Issue reviewed and addressed by the Mess Management.');
    } else {
      resolveComplaint(id, replyText.trim());
    }
    setReplyingId(null);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <MessageSquareWarning className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Hostel Mess Complaints & Grievances</h3>
            <p className="text-xs text-slate-500">
              Admin Grievance Portal • Monitor, investigate, and resolve student food quality tickets
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('All')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'All' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Total Complaints</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full">
                {totalComplaintsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('Pending')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'Pending' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Pending</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] rounded-full">
                {pendingComplaintsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('Resolved')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'Resolved' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Resolved</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full">
                {totalComplaintsCount - pendingComplaintsCount}
              </span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            >
              <option value="All">All Categories</option>
              <option value="Food Quality">Food Quality</option>
              <option value="Taste">Taste</option>
              <option value="Quantity">Quantity</option>
              <option value="Hygiene">Hygiene</option>
              <option value="Timing">Timing</option>
              <option value="Staff Behavior">Staff Behavior</option>
            </select>
          </div>
        </div>

        {/* Complaints Stream List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No complaints matching filter</p>
              <p className="text-xs text-slate-500 mt-1">All issues have been resolved or no tickets found.</p>
            </div>
          ) : (
            filteredComplaints.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.status === 'Pending'
                    ? 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        item.status === 'Pending'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">#{item.id}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.createdAt}</span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>
                    Reported by: <strong className="text-slate-700">{item.studentName}</strong> (Room {item.roomNo})
                  </span>

                  {item.status === 'Pending' ? (
                    <button
                      onClick={() => setReplyingId(replyingId === item.id ? null : item.id)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                    >
                      Resolve Grievance
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                    </span>
                  )}
                </div>

                {/* Response Note if resolved */}
                {item.adminResponse && (
                  <div className="mt-2.5 p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                    <strong className="font-bold text-emerald-950">Warden/Admin Action:</strong> {item.adminResponse}
                  </div>
                )}

                {/* Reply Form */}
                {replyingId === item.id && (
                  <div className="mt-3 p-3 bg-white border border-rose-200 rounded-xl space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      Admin Action & Response to Student:
                    </label>
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="e.g. Discussed with head chef, temperature sensors checked, extra refills added."
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setReplyingId(null)}
                        className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Pending tickets require resolution within 24 hours per hostel mess policy.
          </span>
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
