# medicing_enterprises

A simple full-stack application built with:

Frontend: React (Vite)

Backend: Node.js + Express + SQLite

📁 Project Structure

medicine-student-portal/
├── backend/
│   ├── server.js
│   ├── students.sqlite
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
⚙️ Prerequisites
Make sure you have the following installed:

Node.js (v16+ recommended)

npm (comes with Node.js)

🚀 Getting Started
🔌 Backend Setup
Open terminal and navigate to the backend/ folder:

cd backend

npm install

node server.js

Backend will run at: http://localhost:3000

🌐 Frontend Setup
Open a new terminal and navigate to the frontend/ folder:

cd frontend

npm install

npm run dev
Frontend will run at: http://localhost:5173

🔁 API Endpoints (Backend)
Method	Endpoint	Description
GET	/api/students	Get list of all students
GET	/api/students/pdf	Generate PDF (WIP)
POST /api/students	Add student data


