# PrepTrack AI

AI-powered Productivity & Career Management Platform built using the MERN Stack.

PrepTrack AI helps students and job seekers organize their productivity, manage career goals, track preparation progress, and leverage AI-powered assistance for placement and career growth.

---

## 🚀 Features

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing

### Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* Task Priorities (Low, Medium, High)
* Task Status Tracking (Todo, In Progress, Completed)
* Due Dates
* Search Tasks
* Filter by Priority and Status

### Dashboard

* Personalized Dashboard
* Responsive Layout
* Dark Mode Support
* Sidebar Navigation

### Database

* MongoDB Atlas Integration
* User-specific Task Storage
* Secure Data Access

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### Development Tools

* Git
* GitHub
* Nodemon
* ESLint

---

## 📂 Project Structure

```text
PrepTrack-AI/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/soum-yaa/PrepTrack-AI.git
cd PrepTrack-AI
```

### Install Dependencies

```bash
npm install
npm install --prefix client
npm install --prefix server
```

---

## 🔐 Environment Variables

### Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Client (.env.local)

```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Run Application

Run frontend and backend together:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

Run individually:

```bash
npm run client
npm run server
```

---

## 📌 Current Progress

### Completed

* Authentication System
* JWT Authorization
* MongoDB Atlas Integration
* Task Management CRUD
* Responsive Dashboard Layout
* Protected Routes
* Dark Mode

### In Development

* Dashboard Analytics
* Productivity Metrics
* Placement Tracker
* Application Tracker
* AI Resume Analyzer
* AI Interview Preparation
* AI Study Planner

---

## 🎯 Vision

PrepTrack AI aims to become an all-in-one platform for students and professionals by combining:

* Productivity Management
* Career Planning
* Placement Preparation
* AI-powered Guidance
* Progress Tracking

into a single intelligent dashboard.

---

## 👩‍💻 Author

**Soumya Verma**

B.Tech Electronics & Communication Engineering
MMMUT Gorakhpur

GitHub: https://github.com/soum-yaa

---

## 📄 License

This project is licensed under the MIT License.
