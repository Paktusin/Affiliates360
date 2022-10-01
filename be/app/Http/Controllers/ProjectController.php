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
        error_log(implode("", $fields));
        $newProject = Project::create($fields);
        return $newProject;
    }

    function list(Request $request)
    {
        return Project::all();
    }
}
