<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Criar uma tarefa
Route::post('/create', [TaskController::class, 'store']);

//Listar todas as tarefas
Route::get('/list', [TaskController::class, 'index']);

//Listar uma tarefa específica
Route::get('/list/{id}', [TaskController::class, 'show']);

//Atualizar uma tarefa
Route::put('/update/{id}', [TaskController::class, 'update']);

//Excluir uma tarefa
Route::delete('/delete/{id}', [TaskController::class, 'destroy']);

