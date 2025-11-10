## 🚀 Description

This PR implements a **Full-Stack TODO Application** with the following features:

- User login with email and password → returns a token + user object
- View all TODOs for the logged-in user
- Create a new TODO (title + optional description)
- Edit a TODO (update title or description)
- Mark a TODO as done/undone
- Delete a TODO
- Once the Task is mark as Done ,cannot edit or delete.You need to undone to edit or delete
- Protected API routes using Laravel Sanctum (`auth:sanctum` middleware)
- Responsive React frontend with loading and error handling states
- LocalStorage is used to persist user session token

> Implementation Details:
> - Frontend uses **React.js** with **fetch API** for HTTP requests
> - Backend is built in **Laravel**, using **Sanctum** for token-based authentication
> - No role-based access; all authenticated users can manage their todos
> - Proper JSON responses and HTTP status codes are returned by backend
> - UI displays completed tasks with strikethrough

---

## 💡 Solution Rationale & User Value

- **Frontend/Backend Separation:** Clean separation allows easy maintenance and scalability
- **Token-based Auth:** Ensures secure access to TODO data
- **Fetch API:** Lightweight approach without adding extra dependencies like Axios
- **Optimized UX:** Loading and error states improve user experience
- **Sanctum Middleware:** Protects API routes and simplifies authentication

This approach ensures a **secure, user-friendly, and maintainable application** that allows users to efficiently manage their tasks.

---

## 🎥 Demo Video

> Demo of the app in action:  
> [Loom Video Link Placeholder]  
> Shows login, adding TODOs, editing, marking as done/undone, and deleting tasks

---

## 🛠️ Setup Instructions (if different from README)

**Backend (Laravel)**

```bash
cd server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
**Front end (React)**
cd client
npm install
npm start

Authentication Notes:

Login endpoint: POST /api/login → returns { user, token }

Include token in Authorization: Bearer <token> for all authenticated requests

Logout endpoint: POST /api/logout invalidates the token


📌 Known Limitations / Assumptions

No role-based access implemented; all authenticated users have full CRUD access to todos

CORS needs proper configuration if frontend runs on a different port/domain

No advanced UI animations; basic responsive UI only

Demo video link needs to be added before PR submission


✅ Checklist

 ✅Frontend built using React

 ✅ Backend built using Laravel

 ✅ Database (MySQL/SQLite) connected and persists data

 ✅ Tasks can be viewed

 ✅ Tasks can be created

 ✅ Tasks can be edited

 ✅ Tasks can be marked as done/undone

 ✅ Tasks can be deleted

✅ API endpoints match the specification

✅ Demo video included

 ✅ Solution rationale & user value explained