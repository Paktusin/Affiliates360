<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Project;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@test',
            'password' => bcrypt('test'),
        ]);
        User::create([
            'id' => 2,
            'name' => 'Second User',
            'email' => 'test2@test2',
            'password' => bcrypt('test2')
        ]);

        for ($i = 1; $i < 5; $i++) {
            Project::create([
                'id' => $i,
                'name' => "Project #{$i}"
            ]);
            for ($j = 1; $j < 10; $j++) {
                Todo::create([
                    'user_id' => !($j & 1) ? 1 : 2,
                    'project_id' => $j,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                ]);
            }
        }
    }
}
