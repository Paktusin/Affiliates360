<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    function save(Request $request)
    {
        $fields = $request->validate([
            'id' => 'number',
            'name' => 'string|required'
        ]);
        $newProject = Project::create($fields);
        return $newProject;
    }

    function list(Request $request)
    {
        return Project::all();
    }

    function delete($id)
    {
        return Project::destroy($id);
    }
}
