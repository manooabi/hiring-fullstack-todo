# TODO App — Frontend (React)

**Tech:** React, React Router, Fetch API, plain CSS  
**Backend:** Laravel API (Token-based Auth) — separate server

---

## Features Implemented

- ✅ User Login (email/password) → receives `{ user, token }` from backend  
- ✅ Stores token & user in `localStorage`  
- ✅ Protected Dashboard (redirects to login if not authenticated)  
- ✅ Display TODOs in a table (GET `/api/todos`)  
- ✅ Add TODO (title required, description optional) — modal form (POST `/api/todos`)  
- ✅ Edit TODO — modal pre-filled with data (PUT `/api/todos/:id`)  
- ✅ Toggle Done / Undone (PATCH `/api/todos/:id/done`)  
- ✅ Delete TODO with confirmation modal (DELETE `/api/todos/:id`)  
- ✅ Loading and error states shown in UI  
- ✅ Basic, modern CSS: responsive layout, modals, toggles, animations


---

## Setup
- Open a terminal and go to the client folder:
-cd client
-Install dependies ->npm install
-Start development server: npm start

## API endpoints USED
Method	Endpoint	Description
POST	/api/login	Login user → returns token
POST	/api/logout	Logout user (optional)
GET	     /api/todos	 List all todos
POST	/api/todos	Create a todo
PUT	/api/todos/:id	Update title/description
PATCH	/api/todos/:id/done	Toggle done status
DELETE	/api/todos/:id	Delete a todo

## UI Behavior
- Login Form: Sends credentials; on success stores token & user, then navigates to /dashboard.

- Dashboard: Reads token from localStorage and fetches todos. Invalid/expired token → show error and redirect to login.

- Add Todo: Opens modal with title + description + done toggle.

- Edit Todo: Opens modal pre-filled. Done toggle hidden during edit.

- Toggle Done: PATCH endpoint; disables Edit/Delete buttons for completed todos.

- Delete Todo: Opens confirmation modal; on confirm, sends DELETE request.