<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request)
    {
        $fileds = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);
        $user = User::create([
            'name' => $fileds['name'],
            'email' => $fileds['email'],
            'password' => bcrypt($fileds['password'])
        ]);

        return $this->returnToken($user);
    }

    function login(Request $request)
    {
        $fileds = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fileds['email'])->first();

        if (!$user || !Hash::check($fileds['password'], $user->password_hash)) {
            return response(['message' => 'invaalid creds!'], 401);
        }

        return $this->returnToken($user);
    }

    function returnToken(User $user)
    {
        $token = $user->createToken('some')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }
}
