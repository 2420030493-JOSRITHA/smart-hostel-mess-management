"""
Hostel Mess Management System - Flask Backend API
Provides complete REST endpoints for Student, Admin, and Mess Staff portals.
"""

from flask import Flask, jsonify, request
try:
    from flask_cors import CORS
    has_flask_cors = True
except ImportError:
    has_flask_cors = False

import datetime
import uuid
import os

app = Flask(__name__)

if has_flask_cors:
    CORS(app, resources={r"/api/*": {"origins": "*"}})
else:
    # Fallback standard CORS headers
    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

# In-Memory Database with Mock/Initial Data
STUDENTS = [
    {
        "id": "std-1",
        "name": "Rahul Sharma",
        "rollNo": "21CS1084",
        "roomNo": "B-304",
        "hostelBlock": "Block-A (Boys)",
        "email": "rahul.sharma@hostel.edu",
        "phone": "+91 98765 43210",
        "dietPreference": "Vegetarian",
        "activePlan": "Standard Monthly",
    },
    {
        "id": "std-2",
        "name": "Ananya Verma",
        "rollNo": "21CS1092",
        "roomNo": "G-102",
        "hostelBlock": "Block-C (Girls)",
        "email": "ananya.verma@hostel.edu",
        "phone": "+91 98765 43211",
        "dietPreference": "Non-Vegetarian",
        "activePlan": "Standard Monthly",
    },
    {
        "id": "std-3",
        "name": "Vikramaditya Rao",
        "rollNo": "22ME2045",
        "roomNo": "B-215",
        "hostelBlock": "Block-B (Boys)",
        "email": "vikram.rao@hostel.edu",
        "phone": "+91 98765 43212",
        "dietPreference": "Vegetarian",
        "activePlan": "Standard Monthly",
    },
]

TODAY_MENU = {
    "dateStr": datetime.date.today().strftime("%A, %d %B %Y"),
    "breakfast": "Masala Dosa, Idli Sambar, Coconut Chutney, Filter Coffee / Tea",
    "lunch": "Paneer Butter Masala, Dal Tadka, Steamed Basmati Rice, Phulkas, Fresh Curd, Papad",
    "dinner": "Vegetable Biryani / Chicken Biryani, Mirchi Ka Salan, Raita, Gulab Jamun",
}

TOMORROW_MENU = {
    "dateStr": (datetime.date.today() + datetime.timedelta(days=1)).strftime("%A, %d %B %Y"),
    "breakfast": "Aloo Paratha with Curd, Mint Chutney, Poha, Fresh Milk / Masala Chai",
    "lunch": "Rajma Masala, Jeera Rice, Chapati, Mixed Vegetable Curry, Boondi Raita",
    "dinner": "Chole Bhature, Yellow Moong Dal, Steamed Rice, Green Salad, Rasmalai",
}

BOOKINGS = [
    {
        "id": "bk-1",
        "studentId": "std-1",
        "studentName": "Rahul Sharma",
        "rollNo": "21CS1084",
        "mealType": "Breakfast",
        "date": datetime.date.today().isoformat(),
        "token": "TKN-BRK-1084",
        "status": "Booked",
        "timestamp": "07:30 AM",
    },
    {
        "id": "bk-2",
        "studentId": "std-1",
        "studentName": "Rahul Sharma",
        "rollNo": "21CS1084",
        "mealType": "Lunch",
        "date": datetime.date.today().isoformat(),
        "token": "TKN-LNC-1084",
        "status": "Booked",
        "timestamp": "08:15 AM",
    },
    {
        "id": "bk-3",
        "studentId": "std-1",
        "studentName": "Rahul Sharma",
        "rollNo": "21CS1084",
        "mealType": "Dinner",
        "date": datetime.date.today().isoformat(),
        "token": "TKN-DIN-1084",
        "status": "Booked",
        "timestamp": "08:15 AM",
    },
]

COMPLAINTS = [
    {
        "id": "cmp-1",
        "studentId": "std-1",
        "studentName": "Rahul Sharma",
        "category": "Food Quality",
        "description": "Sambar was lukewarm during breakfast rush hour.",
        "priority": "Medium",
        "status": "Resolved",
        "resolvedBy": "Chief Warden Swaminathan",
        "createdAt": "Yesterday, 09:15 AM",
    }
]

FEEDBACK = [
    {
        "id": "fb-1",
        "studentId": "std-1",
        "studentName": "Rahul Sharma",
        "mealType": "Dinner",
        "rating": 5,
        "comment": "Gulab Jamun and Biryani were exceptionally fresh and well cooked!",
        "date": datetime.date.today().isoformat(),
    }
]

PREP_STATUS = {
    "breakfast": "Served",
    "lunch": "Ready to Serve",
    "dinner": "In Preparation (Stage 2: Gravy & Rice Steaming)",
    "lastUpdated": datetime.datetime.now().strftime("%I:%M %p"),
}


# ==========================================
# API ROUTES
# ==========================================

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "Hostel Mess Management Flask API",
        "timestamp": datetime.datetime.now().isoformat(),
        "version": "1.0.0"
    })

# --- Menus ---
@app.route("/api/menus/today", methods=["GET"])
def get_today_menu():
    return jsonify(TODAY_MENU)

@app.route("/api/menus/tomorrow", methods=["GET"])
def get_tomorrow_menu():
    return jsonify(TOMORROW_MENU)

@app.route("/api/menus/today", methods=["PUT"])
def update_today_menu():
    data = request.json or {}
    for key in ["breakfast", "lunch", "dinner"]:
        if key in data:
            TODAY_MENU[key] = data[key]
    return jsonify({"success": True, "menu": TODAY_MENU})

# --- Students ---
@app.route("/api/students", methods=["GET"])
def get_students():
    return jsonify(STUDENTS)

@app.route("/api/students/<identifier>", methods=["GET"])
def get_student(identifier):
    student = next(
        (s for s in STUDENTS if s["id"] == identifier or s["rollNo"].lower() == identifier.lower()),
        None
    )
    if student:
        return jsonify(student)
    return jsonify({"error": "Student not found"}), 404

# --- Bookings ---
@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    student_id = request.args.get("student_id")
    date = request.args.get("date")
    filtered = BOOKINGS
    if student_id:
        filtered = [b for b in filtered if b.get("studentId") == student_id]
    if date:
        filtered = [b for b in filtered if b.get("date") == date]
    return jsonify(filtered)

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.json or {}
    student_id = data.get("studentId", "std-1")
    meal_type = data.get("mealType", "Lunch")
    date = data.get("date", datetime.date.today().isoformat())
    
    # Check if already booked
    existing = next(
        (b for b in BOOKINGS if b["studentId"] == student_id and b["mealType"] == meal_type and b["date"] == date),
        None
    )
    if existing:
        return jsonify({"success": False, "message": f"{meal_type} is already booked for this date"}), 400

    student = next((s for s in STUDENTS if s["id"] == student_id), STUDENTS[0])
    token_code = f"TKN-{meal_type[:3].upper()}-{student['rollNo'][-4:]}-{str(uuid.uuid4())[:4].upper()}"

    new_booking = {
        "id": f"bk-{uuid.uuid4().hex[:6]}",
        "studentId": student["id"],
        "studentName": student["name"],
        "rollNo": student["rollNo"],
        "mealType": meal_type,
        "date": date,
        "token": token_code,
        "status": "Booked",
        "timestamp": datetime.datetime.now().strftime("%I:%M %p"),
    }
    BOOKINGS.append(new_booking)
    return jsonify({"success": True, "booking": new_booking}), 201

@app.route("/api/bookings/<booking_id>", methods=["DELETE"])
def cancel_booking(booking_id):
    global BOOKINGS
    booking = next((b for b in BOOKINGS if b["id"] == booking_id), None)
    if not booking:
        return jsonify({"error": "Booking not found"}), 404
    BOOKINGS = [b for b in BOOKINGS if b["id"] != booking_id]
    return jsonify({"success": True, "message": f"Meal booking {booking['token']} cancelled successfully"})

# --- Complaints ---
@app.route("/api/complaints", methods=["GET"])
def get_complaints():
    return jsonify(COMPLAINTS)

@app.route("/api/complaints", methods=["POST"])
def submit_complaint():
    data = request.json or {}
    new_cmp = {
        "id": f"cmp-{uuid.uuid4().hex[:6]}",
        "studentId": data.get("studentId", "std-1"),
        "studentName": data.get("studentName", "Rahul Sharma"),
        "category": data.get("category", "General"),
        "description": data.get("description", ""),
        "priority": data.get("priority", "Medium"),
        "status": "Pending Warden Review",
        "resolvedBy": None,
        "createdAt": datetime.datetime.now().strftime("%d %b, %I:%M %p"),
    }
    COMPLAINTS.append(new_cmp)
    return jsonify({"success": True, "complaint": new_cmp}), 201

# --- Feedback ---
@app.route("/api/feedback", methods=["GET"])
def get_feedback():
    return jsonify(FEEDBACK)

@app.route("/api/feedback", methods=["POST"])
def submit_feedback():
    data = request.json or {}
    new_fb = {
        "id": f"fb-{uuid.uuid4().hex[:6]}",
        "studentId": data.get("studentId", "std-1"),
        "studentName": data.get("studentName", "Rahul Sharma"),
        "mealType": data.get("mealType", "Lunch"),
        "rating": int(data.get("rating", 5)),
        "comment": data.get("comment", ""),
        "date": datetime.date.today().isoformat(),
    }
    FEEDBACK.append(new_fb)
    return jsonify({"success": True, "feedback": new_fb}), 201

# --- Kitchen Prep Status ---
@app.route("/api/prep-status", methods=["GET"])
def get_prep_status():
    return jsonify(PREP_STATUS)

@app.route("/api/prep-status", methods=["PUT"])
def update_prep_status():
    data = request.json or {}
    for key in ["breakfast", "lunch", "dinner"]:
        if key in data:
            PREP_STATUS[key] = data[key]
    PREP_STATUS["lastUpdated"] = datetime.datetime.now().strftime("%I:%M %p")
    return jsonify({"success": True, "prepStatus": PREP_STATUS})

# --- Warden & Mess Staff Analytics ---
@app.route("/api/analytics", methods=["GET"])
def get_analytics():
    return jsonify({
        "totalResidents": 450,
        "todayHeadcounts": {
            "breakfast": 380,
            "lunch": 412,
            "dinner": 395,
        },
        "foodWastedKgToday": 4.2,
        "foodWasteSavedKg": 38.6,
        "satisfactionScore": 4.6,
        "activeComplaints": len([c for c in COMPLAINTS if c.get("status") != "Resolved"]),
        "activeBookingsCount": len(BOOKINGS),
    })


if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT", 5000))
    print(f"🚀 Hostel Mess Management Flask API starting on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
