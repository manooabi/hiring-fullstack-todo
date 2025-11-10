# Full-Stack TODO App

This is a **Full-Stack TODO Application** built using **React.js** for the frontend and **Laravel** for the backend.  
It allows users to manage their tasks efficiently with features like creating, updating, marking as done, and deleting TODOs.

---

## Features

- ✅ User login (email/password) → returns token + user
- ✅ View TODOs
- ✅ Create a TODO (title + optional description)
- ✅ Edit TODO
- ✅ Mark as Done/Undone
- ✅ Delete TODO
- ✅ Protected API routes using Laravel Sanctum (middleware `auth:sanctum`)
- ✅ Clean and responsive React UI
- ✅ Loading and error handling states

---

## Tech Stack

- **Frontend:** React.js, Fetch API for HTTP requests, CSS for styling
- **Backend:** Laravel (PHP 8+), MySQL/SQLite
- **Authentication:** Laravel Sanctum (token-based)
- **Database:** MySQL or SQLite
- **Tools:** VSCode, Postman (for API testing)

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd server
Install PHP dependencies: composer install

Copy .env.example to .env and configure database:
cp .env.example .env

Generate Laravel app key:
  php artisan key:generate

Run database migrations:
  php artisan migrate

Start the backend server:
 php artisan serve
Frontend

 Navigate to the frontend folder:

cd client


Install dependencies:

npm install


Start the React development server:

npm start
# Runs on http://localhost:3000

Authentication

Login: POST /api/login → returns { user, token }

Authenticated Requests: Include the token in the Authorization header:

Authorization: Bearer <token>


Logout: POST /api/logout → invalidates the token

Middleware auth:sanctum protects all /api/todos endpoints.

API Endpoints
Method	Endpoint	Description
GET	/api/todos	List all todos
POST	/api/todos	Create a new todo
PUT	/api/todos/:id	Update title/description
PATCH	/api/todos/:id/done	Toggle done/undone
DELETE	/api/todos/:id	Delete a todo
Notes

No role-based access control implemented; all authenticated users can manage their todos.

CORS must be configured if frontend runs on a different port/domain.

Proper HTTP status codes and JSON responses are returned by the backend.