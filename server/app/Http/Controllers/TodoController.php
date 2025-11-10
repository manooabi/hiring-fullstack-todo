<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Todo::orderByDesc('created_at')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
              'done' => 'boolean'
        ]);

        $todo = Todo::create($validated);
        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
      public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->only(['title', 'description']));
        return response()->json($todo);
    }

      public function toggleDone($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->done = !$todo->done;
        $todo->save();
        return response()->json($todo);
    }
    /**
     * Remove the specified resource from storage.
     */
   public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
