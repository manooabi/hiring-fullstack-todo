<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
//Route::post('/login', [AuthController::class, 'login']);
// In api.php routes
Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware('verify_csrf_token');

// Route::get('/todos', [TodoController::class, 'index']);
// Route::post('/todos', [TodoController::class, 'store']);
// Route::put('/todos/{id}', [TodoController::class, 'update']);
// Route::patch('/todos/{id}/done', [TodoController::class, 'toggleDone']);
// Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']); // optional logout

    // TODO routes
    Route::get('/todos', [TodoController::class, 'index']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::patch('/todos/{id}/done', [TodoController::class, 'toggleDone']);
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});