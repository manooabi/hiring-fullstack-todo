# TODO App — Backend (Laravel)

**Tech:** Laravel 10, PHP 8+, MySQL/SQLite (or any DB supported by Laravel)  
**Frontend:** React (client connects via API)  
**Authentication:** Laravel Sanctum (token-based API authentication)  

---

## Features Implemented

- ✅ User login (email/password) → returns token + user  
- ✅ User logout (token invalidation)  
- ✅ CRUD TODO API endpoints:
  - GET `/api/todos` → List all todos  
  - POST `/api/todos` → Create a new todo  
  - PUT `/api/todos/:id` → Update title/description  
  - PATCH `/api/todos/:id/done` → Toggle done/undone  
  - DELETE `/api/todos/:id` → Delete a todo  
- ✅ Middleware:
  - `auth:sanctum` → Protect routes, ensures only authenticated users can access TODOs  
- ✅ Role-based access is **not implemented**; all authenticated users can manage their todos  
- ✅ Proper API error handling & HTTP status codes  

> No client management, job management, or complex RBAC is implemented — only what is required for the TODO app.

---
## Setup & Run (Development)
- Clone the repository and navigate to backend folder: 
  - cd server
- install dependencies:
 - composer install
- Copy .env.example to .env and configure
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db
DB_USERNAME=root
DB_PASSWORD=
- Generate application key:
 - php artisan key:generate
- Run migrations:
 - php artisan migrate
- Start Laravel server:
 - php artisan serve


## Middleware Explanation

**Why Middleware?**  
Middleware allows you to filter HTTP requests entering your app. In this project:

- **`auth:sanctum`**:
  - Protects API routes from unauthorized access.
  - Ensures users must provide a valid token in the `Authorization` header.
  - Advantages:
    - Security: prevents access to private resources.
    - Centralized control: can modify requests/responses consistently.
    - Reusable: same middleware can protect multiple routes.

**Where it is used:**  
All `/api/todos` endpoints require the `auth:sanctum` middleware in `api.php`.

```php
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::patch('/todos/{id}/done', [TodoController::class, 'toggleDone']);
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});

```

## Authentication Flow

- Login → POST /api/login
  - Request: { email, password }
  - Response: { user, token }

- Authenticated requests → Include token in Authorization header:
  - Authorization: Bearer <token>
- Logout → POST /api/logout
  - Invalidates the token.