<?php

namespace App\Http\Controllers;

use App\Models\Rep;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class RepController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('rep/index', [
            'reps' => Rep::with('user:id,name')->orderby('name', 'asc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|max:256', 'status' => 'required|in:active,inactive']);
        $request->user()->reps()->create($data);
        return redirect()->back()->with('success', "Saved successfully");
    }

    public function update(Request $request, Rep $rep)
    {
        $data = $request->validate(['name' => 'required|max:256', 'status' => 'required|in:active,inactive']);
        $rep->update($data);
        return redirect()->back()->with('success', "Updated successfully");
    }

    public function destroy(Rep $rep): RedirectResponse
    {
        try {
            $rep->delete();
            return redirect()->back()->with('success', 'deleted successfully.');
        } catch (\Exception $e) {
            // If deletion fails (likely due to foreign key constraint with items)
            return redirect()->back()->with('error', 'Cannot delete this rep as it is being used by one or more items.');
        }
    }
}