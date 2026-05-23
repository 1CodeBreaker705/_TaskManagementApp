# 🚀 Taskin - Personal Task Management App 

Taskin is a full-stack productivity web application built with React, Node.js, Express, and MongoDB. It evolved from a simple multi-user task app into a more complete productivity platform with rich text support, analytics, reminders, advanced task organization, and an improved user experience.

## ✨ Features

### 🎨 UI/UX & Navigation
- Complete UI redesign with improved color scheme, typography, animations, and effects
- New landing page
- Responsive navbar with hamburger menu
- Redesigned navigation experience
- Scroll-to-top button

### 📝 Task Management
- Create, update, delete, and manage tasks
- Rich text support for better task editing and viewing
- Task priorities:
  - High
  - Medium
  - Low
- Task creation date
- Optional due date
- Enhanced task details page
- Improved Add Task page

### ⏰ Reminders
- Reminder system for tasks due today

### 🔍 Search, Sort & Filter
- Search tasks easily
- Sort tasks by:
  - Newest
  - Oldest
  - Due date
- Filter tasks based on:
  - Priority
  - Task status

### 📊 Analytics Dashboard
Get a complete overview of productivity with:

- Total tasks
- Completed tasks
- Pending tasks
- Task completion tracking
- Productivity insights

### 🔐 Authentication
- User registration and login
- Multi-user support
- Secure authentication system

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router
- React Quill

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone <repository-url>
cd _TaskManagementApp
```

---

# Frontend Setup

Go to frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Before running locally:

Open:

```bash
Frontend/src/utils/axiosClient.js
```

Update the backend base URL:


Run frontend:

```bash
npm run dev
```

---

# Backend Setup

Go to backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
```

Start backend server:

```bash
node app.js
```

---

## 📁 Project Structure

```text
_TaskManagementApp
│
├── Backend
│   ├── src
│   ├── package.json
│   └── package-lock.json
│
├── Frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---


## 👨‍💻 Author

Ranjan Singh
