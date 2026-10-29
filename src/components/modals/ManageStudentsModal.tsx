import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { Users, Search, X, CheckCircle, Shield } from 'lucide-react';

export const ManageStudentsModal: React.FC = () => {
  const { activeModal, closeModal, allStudents, totalStudentsCount } = useMess();
  const [searchTerm, setSearchTerm] = useState('');
  const [blockFilter, setBlockFilter] = useState('All');

  if (activeModal !== 'manage_students') return null;

  const filteredStudents = allStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roomNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = blockFilter === 'All' || s.hostelBlock.includes(blockFilter);
    return matchesSearch && matchesBlock;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative flex flex-col max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Hostel Mess Student Directory</h3>
            <p className="text-xs text-slate-500">
              Total Enrolled Students: <strong className="text-slate-800">{totalStudentsCount}</strong> • Active Boarders
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, roll number, room..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={blockFilter}
            onChange={(e) => setBlockFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Blocks</option>
            <option value="Aryabhatta">Aryabhatta Block</option>
            <option value="Gargi">Gargi Block</option>
            <option value="Bose">Bose Block</option>
          </select>
        </div>

        {/* Students Table */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 sticky top-0 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-3 py-3">Roll Number</th>
                <th className="px-3 py-3">Room & Block</th>
                <th className="px-3 py-3">Diet Preference</th>
                <th className="px-4 py-3 text-right">Mess Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{s.name}</td>
                  <td className="px-3 py-3 font-mono text-slate-600">{s.rollNo}</td>
                  <td className="px-3 py-3">
                    <span className="font-semibold text-slate-800">{s.roomNo}</span>
                    <span className="text-slate-400 text-[11px] block">{s.hostelBlock}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.dietPreference === 'Vegetarian'
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.dietPreference === 'Jain'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {s.dietPreference}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold">
                      Active Member
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Hostel Central Mess Database</span>
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
