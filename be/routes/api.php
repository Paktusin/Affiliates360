<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [UserController::class, 'user']);

    Route::get('/project', [ProjectController::class, 'list']);
    Route::post('/project', [ProjectController::class, 'save']);
    Route::delete('/project/{id}', [ProjectController::class, 'delete']);

    Route::get('/todo/{id}', [TodoController::class, 'find']);
    Route::post('/todo', [TodoController::class, 'save']);
    Route::get('/todo', [TodoController::class, 'list']);
    Route::get('/todo/{id}/view', [TodoController::class, 'view']);
    Route::get('/todo/{id}/done', [TodoController::class, 'done']);
    Route::delete('/todo/{id}', [TodoController::class, 'delete']);
});
