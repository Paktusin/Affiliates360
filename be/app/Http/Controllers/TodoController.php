<?php

namespace App\Http\Controllers;

use App\Models\Todo;
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
        return Todo::find($id);
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
