/**
 * API service for communicating with Flask Backend (/api/*)
 * Falls back gracefully to local state if the Flask server is not yet running.
 */

const API_BASE = '/api';

export const MessApiClient = {
  // Check backend status
  async checkHealth(): Promise<{ status: string; online: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET', credentials: 'omit' });
      if (res.ok) {
        const data = await res.json();
        return { status: data.status, online: true };
      }
      return { status: 'offline', online: false };
    } catch {
      return { status: 'offline', online: false };
    }
  },

  // Today's menu
  async getTodayMenu() {
    try {
      const res = await fetch(`${API_BASE}/menus/today`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for getTodayMenu, using local context');
    }
    return null;
  },

  // Bookings
  async getBookings(studentId?: string) {
    try {
      const url = studentId ? `${API_BASE}/bookings?student_id=${studentId}` : `${API_BASE}/bookings`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for getBookings');
    }
    return null;
  },

  async createBooking(payload: { studentId: string; mealType: string; date?: string }) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for createBooking');
    }
    return null;
  },

  async cancelBooking(bookingId: string) {
    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for cancelBooking');
    }
    return null;
  },

  // Complaints
  async submitComplaint(payload: {
    studentId: string;
    studentName: string;
    category: string;
    description: string;
    priority: string;
  }) {
    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for submitComplaint');
    }
    return null;
  },

  // Feedback
  async submitFeedback(payload: {
    studentId: string;
    studentName: string;
    mealType: string;
    rating: number;
    comment: string;
  }) {
    try {
      const res = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for submitFeedback');
    }
    return null;
  },

  // Prep Status
  async updatePrepStatus(statusData: Record<string, string>) {
    try {
      const res = await fetch(`${API_BASE}/prep-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statusData),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Flask backend not responding for updatePrepStatus');
    }
    return null;
  },
};
