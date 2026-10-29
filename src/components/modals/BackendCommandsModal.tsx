import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Server, Cpu, Copy, Check, ExternalLink, X } from 'lucide-react';
import { MessApiClient } from '../../services/apiClient';

interface BackendCommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendCommandsModal: React.FC<BackendCommandsModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    if (isOpen) {
      setBackendStatus('checking');
      MessApiClient.checkHealth().then((res) => {
        setBackendStatus(res.online ? 'online' : 'offline');
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const frontendCommands = [
    {
      label: 'Install Frontend Dependencies',
      cmd: 'npm install',
      desc: 'Installs all React 19, Vite, and Tailwind CSS packages',
    },
    {
      label: 'Start Frontend Dev Server',
      cmd: 'npm run dev',
      desc: 'Starts Vite development server on port 3000 with API proxy',
    },
    {
      label: 'Build for Production',
      cmd: 'npm run build',
      desc: 'Compiles and minifies frontend bundle to /dist',
    },
    {
      label: 'Run TypeScript & ESLint Checks',
      cmd: 'npm run lint',
      desc: 'Validates types across all React components and contexts',
    },
  ];

  const backendCommands = [
    {
      label: 'Install Python Dependencies',
      cmd: 'pip install -r requirements.txt',
      desc: 'Installs Flask 3.0, Flask-CORS, and required packages',
    },
    {
      label: 'Run Flask Backend Server',
      cmd: 'python3 app.py',
      desc: 'Starts the Flask REST API on http://0.0.0.0:5000',
    },
    {
      label: 'Alternative: Run with Flask CLI',
      cmd: 'export FLASK_APP=app.py && flask run --port=5000',
      desc: 'Launches Flask in standard development mode',
    },
    {
      label: 'Run Both Concurrently (Via npm)',
      cmd: 'npm run backend',
      desc: 'Convenient npm shortcut to launch the Python backend',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Terminal className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900">Run Commands & Architecture</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                npm + Flask
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Frontend uses <code className="text-blue-700 font-bold">npm</code> and backend uses <code className="text-emerald-700 font-bold">Flask (Python)</code>
            </p>
          </div>
        </div>

        {/* System Architecture Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-xs border border-blue-100">
              <Server className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Flask Backend Status: /api/health</p>
              <p className="text-[11px] text-slate-600">
                {backendStatus === 'online' ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Flask REST API is live & reachable on port 5000
                  </span>
                ) : backendStatus === 'checking' ? (
                  <span className="text-amber-600 font-medium">Probing http://127.0.0.1:5000/api/health...</span>
                ) : (
                  <span className="text-slate-600 font-medium">
                    Run <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono text-slate-800">python3 app.py</code> in a terminal to launch the live REST API (auto-synced with frontend).
                  </span>
                )}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
            backendStatus === 'online'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-100 text-slate-700 border border-slate-300'
          }`}>
            {backendStatus === 'online' ? 'Active' : 'Offline / Standby'}
          </span>
        </div>

        {/* Section 1: Frontend npm Commands */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              1. Frontend Commands (Node.js & npm)
            </h3>
          </div>
          <div className="space-y-2.5">
            {frontendCommands.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 text-slate-100 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-3 font-mono text-xs shadow-inner"
              >
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-400 font-sans font-bold mb-0.5">
                    {item.label} — <span className="text-slate-400 font-normal">{item.desc}</span>
                  </div>
                  <div className="text-cyan-300 font-bold truncate">$ {item.cmd}</div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(item.cmd, idx)}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-sans font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-sans font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Backend Flask Commands */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              2. Backend Commands (Python & Flask)
            </h3>
          </div>
          <div className="space-y-2.5">
            {backendCommands.map((item, idx) => {
              const globalIdx = idx + 10;
              return (
                <div
                  key={globalIdx}
                  className="bg-slate-900 text-slate-100 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-3 font-mono text-xs shadow-inner"
                >
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-slate-400 font-sans font-bold mb-0.5">
                      {item.label} — <span className="text-slate-400 font-normal">{item.desc}</span>
                    </div>
                    <div className="text-emerald-300 font-bold truncate">$ {item.cmd}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.cmd, globalIdx)}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {copiedIndex === globalIdx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-sans font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-sans font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* API Routes Overview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-black text-slate-800 mb-2">Flask REST Endpoints in <code className="text-blue-700">app.py</code>:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-emerald-700">GET /api/menus/today</strong>: Daily meal spread
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-blue-700">POST /api/bookings</strong>: Book meal token pass
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-rose-700">DELETE /api/bookings/&lt;id&gt;</strong>: Skip / Cancel meal
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <strong className="text-purple-700">POST /api/complaints</strong>: Grievance submission
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-black text-xs transition-all cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
