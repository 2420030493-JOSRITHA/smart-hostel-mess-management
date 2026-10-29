import React, { useState } from 'react';
import { useMess } from '../../context/MessContext';
import { MealType } from '../../types';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  X,
  Coffee,
  Soup,
  UtensilsCrossed,
  Filter,
  Download,
  Check,
} from 'lucide-react';

export const ViewStudentsModal: React.FC = () => {
  const { activeModal, modalPayload, closeModal, bookings, todayMenu, checkInStudentMeal } = useMess();
  const initialMeal: MealType = modalPayload?.mealType || 'breakfast';
  const [selectedMeal, setSelectedMeal] = useState<MealType>(initialMeal);
  const [searchTerm, setSearchTerm] = useState('');
  const [blockFilter, setBlockFilter] = useState('All');
  const [markedMessage, setMarkedMessage] = useState<string | null>(null);

  if (activeModal !== 'view_students') return null;

  // Filter bookings for today and selected meal
  const todayMealBookings = bookings.filter(
    (b) => b.isoDate === todayMenu.isoDate && b.mealType === selectedMeal && b.status !== 'Cancelled'
  );

  // Generate extended mock list for the 420 / 460 / 390 count representation so it displays a full roster
  const sampleStudents = [
    { name: 'Rahul Sharma', rollNo: '21CS1084', roomNo: 'B-304', block: 'Aryabhatta Block', token: 'BK-1084', status: 'Booked' },
    { name: 'Ananya Verma', rollNo: '21CS1092', roomNo: 'A-102', block: 'Gargi Block', token: 'BK-1092', status: 'Booked' },
    { name: 'Vikramaditya Rao', rollNo: '22ME2045', roomNo: 'B-210', block: 'Aryabhatta Block', token: 'BK-2045', status: 'Consumed' },
    { name: 'Pooja Iyer', rollNo: '22EE1019', roomNo: 'A-205', block: 'Gargi Block', token: 'BK-1019', status: 'Booked' },
    { name: 'Sneha Patel', rollNo: '23EC3011', roomNo: 'A-312', block: 'Gargi Block', token: 'BK-3011', status: 'Booked' },
    { name: 'Karthik Raja', rollNo: '21CS1033', roomNo: 'C-104', block: 'Bose Block', token: 'BK-1033', status: 'Consumed' },
    { name: 'Rohan Gupta', rollNo: '22IT2090', roomNo: 'B-408', block: 'Aryabhatta Block', token: 'BK-2090', status: 'Booked' },
    { name: 'Divya Nair', rollNo: '23CE1052', roomNo: 'A-118', block: 'Gargi Block', token: 'BK-1052', status: 'Booked' },
    { name: 'Manish Kumar', rollNo: '22ME2061', roomNo: 'C-215', block: 'Bose Block', token: 'BK-2061', status: 'Booked' },
    { name: 'Tanvi Deshmukh', rollNo: '21CS1055', roomNo: 'A-402', block: 'Gargi Block', token: 'BK-1055', status: 'Booked' },
    { name: 'Arjun Das', rollNo: '21ME1022', roomNo: 'B-108', block: 'Aryabhatta Block', token: 'BK-1022', status: 'Booked' },
    { name: 'Kavita Sundaram', rollNo: '22CS3044', roomNo: 'A-220', block: 'Gargi Block', token: 'BK-3044', status: 'Consumed' },
    { name: 'Siddharth Sen', rollNo: '23IT1015', roomNo: 'C-302', block: 'Bose Block', token: 'BK-1015', status: 'Booked' },
    { name: 'Megha Reddy', rollNo: '22EC2078', roomNo: 'A-309', block: 'Gargi Block', token: 'BK-2078', status: 'Booked' },
    { name: 'Deepak Chawla', rollNo: '21EE1099', roomNo: 'B-401', block: 'Aryabhatta Block', token: 'BK-1099', status: 'Booked' },
  ];

  // Merge real state with representation
  const combinedList = [...todayMealBookings.map(b => ({
    name: b.studentName,
    rollNo: b.rollNo,
    roomNo: b.roomNo,
    block: b.hostelBlock || 'Aryabhatta Block',
    token: b.token,
    status: b.status,
  }))];

  // Append sample students if not already present
  sampleStudents.forEach(s => {
    if (!combinedList.some(c => c.rollNo === s.rollNo)) {
      combinedList.push(s);
    }
  });

  const filteredList = combinedList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.token.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBlock = blockFilter === 'All' || item.block.includes(blockFilter);

    return matchesSearch && matchesBlock;
  });

  const countDisplay =
    selectedMeal === 'breakfast' ? 420 : selectedMeal === 'lunch' ? 460 : 390;

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
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Registered Students Meal List</h3>
            <p className="text-xs text-slate-500">
              Date: <span className="font-semibold text-slate-700">{todayMenu.dateStr}</span> • Live Attendance & Roster
            </p>
          </div>
        </div>

        {/* Meal Switcher Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-1.5 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setSelectedMeal('breakfast')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              selectedMeal === 'breakfast'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Breakfast</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] rounded-full">
              420
            </span>
          </button>

          <button
            onClick={() => setSelectedMeal('lunch')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              selectedMeal === 'lunch'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Soup className="w-4 h-4" />
            <span>Lunch</span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] rounded-full">
              460
            </span>
          </button>

          <button
            onClick={() => setSelectedMeal('dinner')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              selectedMeal === 'dinner'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Dinner</span>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[11px] rounded-full">
              390
            </span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, roll number, room, or token..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={blockFilter}
              onChange={(e) => setBlockFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Hostel Blocks</option>
              <option value="Aryabhatta">Aryabhatta Block</option>
              <option value="Gargi">Gargi Block</option>
              <option value="Bose">Bose Block</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 sticky top-0 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Student & Roll No</th>
                <th className="px-3 py-3">Room & Block</th>
                <th className="px-3 py-3">Token</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Counter Check-In</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No matching student bookings found.
                  </td>
                </tr>
              ) : (
                filteredList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{item.rollNo}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-slate-800">{item.roomNo}</div>
                      <div className="text-[10px] text-slate-500">{item.block}</div>
                    </td>
                    <td className="px-3 py-3 font-mono font-bold text-slate-600">
                      {item.token}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Consumed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {item.status === 'Consumed' ? 'Served' : 'Booked'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          const res = checkInStudentMeal(item.rollNo, selectedMeal);
                          setMarkedMessage(res.message);
                          setTimeout(() => setMarkedMessage(null), 2500);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded-lg text-[11px] font-semibold transition-colors"
                      >
                        {item.status === 'Consumed' ? 'Served ✓' : 'Mark Served'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info & stats */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-800">{filteredList.length}</strong> of{' '}
            <strong className="text-slate-800">{countDisplay} total booked students</strong> for {selectedMeal.toUpperCase()}
          </div>
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs"
          >
            Close List
          </button>
        </div>
      </div>
    </div>
  );
};
