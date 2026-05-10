<?php

namespace App\Http\Controllers;

use App\Mail\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'type' => 'required|string',
            'message' => 'required|string',
        ]);

        try {
            Mail::to('easyhandling.drc@gmail.com')->send(new ContactRequest($validated));
            return back()->with('success', 'Email sent successfully!');
        } catch (\Exception $e) {
            Log::error('Mail Error: ' . $e->getMessage());
            return back()->with('error', 'Failed to send email.');
        }
    }
}
