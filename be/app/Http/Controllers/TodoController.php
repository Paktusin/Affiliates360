<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    function save(Request $request)
    {
        $fields = $request->validate([
            'description' => 'string|required',
            'project_id' => 'required',
            'user_id' => 'required'
        ]);
        $newProject = Todo::create($fields);
        return $newProject;
    }

    function list(Request $request)
    {
        return Todo::where('project_id', $request->query('project_id', ''))->get();
    }

    function find($id)
    {
        $todo = Todo::find($id);
        $user = User::find($todo->user_id);
        if ($user) {
            $todo->userName = $user->name;
        }
        return $todo;
    }


    function done($id, Request $request)
    {
        $todo = Todo::find($id);
        $todo->done = filter_var($request->query('done'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        $todo->save();
        return $todo;
    }

    function view($id)
    {
        $todo = Todo::find($id);
        $todo->viewed++;
        $todo->save();
        return $todo;
    }

    function delete($id)
    {
        return Todo::destroy($id);
    }
}
