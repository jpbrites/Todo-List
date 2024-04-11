<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    //Retornar todas as tarefas
    public function index()
    {
        return Task::all();
    }

    //Criar uma nova tarefa
    public function store(Request $request)
    {
        if (Task::create($request->all())) {
            return response()->json([
                'message' => 'Tarefa cadastrada com sucesso'
            ], 201);
        }
        return response()->json([
            'message' => 'Erro ao cadastrar tarefa'
        ], 404);
    }

    //Retornar uma tarefa específica
    public function show(string $id)
    {
        $task = Task::find($id);
        if($task) {
            return $task;
        }
        return response()->json([
            'message' => 'Erro ao encontrar tarefa'
        ], 404);
    }

    //Atualizar uma tarefa
    public function update(Request $request, string $id)
    {
        $task = Task::find($id);
        if($task){
            $task->update($request->all());
            return $task;
        }
        return response()->json([
            'message' => 'Erro ao atualizar tarefa'
        ], 404);

    }

    //Remover uma tarefa
    public function destroy(string $id)
    {
        if(Task::destroy($id)){
            return response()->json([
                'message' => 'Tarefa excluída com sucesso'
            ], 201);
        }
        return response()->json([
            'message' => 'Erro ao excluir tarefa'
        ], 404);
    }
}
