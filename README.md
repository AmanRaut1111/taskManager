# 🚀 Task Management API

A Node.js backend REST API for managing tasks with JWT authentication, MongoDB, and user-based access control.  
This project is built as part of a Node.js Backend Practical Assessment and deployed on AWS EC2 using NGINX and PM2.

---

## 📌 Features

- User Registration & Login
- JWT-based Authentication
- Task CRUD Operations
- Tasks linked to logged-in users
- Filtering by status & priority
- Sorting by creation date
- Pagination support
- Password hashing using bcrypt
- Unit test for Register API using Jest
- Production deployment using AWS EC2 + NGINX

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- PM2
- NGINX
- Jest (Unit Testing)

---

### Live API Base URL
```
http://3.109.213.66
```

## 📂 Project Structure

```
task-management-api/
│
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── task.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   └── tests/
│       └── register.test.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## ▶️ Run Project Locally

```bash
npm install
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

## 🔐 Authentication APIs

### ➤ Register User
**POST** `/api/auth/register`

```json
{
  "name": "Aman",
  "email": "aman@test.com",
  "password": "password123"
}
```

---

### ➤ Login User
**POST** `/api/auth/login`

```json
{
  "email": "aman@test.com",
  "password": "password123"
}
```

**Response**
```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🧾 Task APIs (Protected)

All task routes require this header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### ➤ Create Task
**POST** `/api/tasks`

```json
{
  "title": "Finish backend assignment",
  "description": "Complete API task",
  "priority": "High",
  "status": "Pending"
}
```

---

### ➤ Get All Tasks
**GET** `/api/tasks`

Query params:
```
/api/tasks?status=Pending
/api/tasks?priority=High
/api/tasks?page=1&limit=10
```

---

### ➤ Get Single Task
**GET** `/api/tasks/:id`

---

### ➤ Update Task
**PUT** `/api/tasks/:id`

```json
{
  "status": "Done",
  "priority": "Medium"
}
```

---

### ➤ Delete Task
**DELETE** `/api/tasks/:id`

---

## 🧪 Unit Testing

Simple unit test added for Register API using Jest.

Run tests:
```bash
npm test
```

---

## ☁️ Deployment (AWS EC2 + NGINX)

- Application deployed on Ubuntu EC2
- PM2 used for process management
- NGINX configured as reverse proxy
- API accessible via public IP on port 80





## 👤 Author

Aman  
Node.js Backend Developer

---


