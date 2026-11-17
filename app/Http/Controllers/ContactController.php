<?php

namespace App\Http\Controllers;

use App\Mail\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'type' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        try {
            $recipient = config('mail.contact_recipient', env('MAIL_CONTACT_ADDRESS', 'contact@ezhl-logistics.com'));
            Mail::to($recipient)->send(new ContactRequest($validated));

            return back()->with('success', 'Votre message a été envoyé avec succès.');
        } catch (\Exception $e) {
            Log::error('Mail Error: ' . $e->getMessage());

            return back()->withErrors([
                'mail' => "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ultérieurement.",
            ]);
        }
    }
}
