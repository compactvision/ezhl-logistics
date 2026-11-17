<?php

namespace App\Http\Controllers;

use App\Mail\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'type' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
        ], [
            'name.required' => 'Veuillez renseigner votre nom complet.',
            'name.min' => 'Le nom doit comporter au moins 2 caractères.',
            'email.required' => 'Votre adresse e-mail est requise.',
            'email.email' => 'Veuillez saisir une adresse e-mail valide (ex: contact@domaine.com).',
            'type.required' => 'Veuillez sélectionner le type de prestation ou de flux.',
            'message.required' => 'Veuillez détailler votre demande ou besoin.',
            'message.min' => 'Votre message doit contenir au moins 10 caractères pour nous permettre de vous répondre efficacement.',
        ]);

        $reference = 'EZHL-' . strtoupper(Str::random(6));

        // 1. Sauvegarde systématique dans la base de données
        $contactMessage = ContactMessage::create([
            'reference' => $reference,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'type' => $validated['type'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'status' => 'pending',
        ]);

        // 2. Envoi de l'e-mail de notification
        $mailSent = false;
        try {
            $recipient = config('mail.contact_recipient', env('MAIL_CONTACT_ADDRESS', 'contact@ezhl-logistics.com'));
            Mail::to($recipient)->send(new ContactRequest($validated, $reference));

            $contactMessage->update(['status' => 'sent']);
            $mailSent = true;
        } catch (\Throwable $e) {
            Log::error("Erreur lors de l'envoi de l'e-mail de contact : " . $e->getMessage(), [
                'reference' => $reference,
                'email' => $validated['email'],
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            $contactMessage->update([
                'status' => 'failed_email',
                'mail_error' => $e->getMessage(),
            ]);
        }

        return back()->with('contact_success', [
            'reference' => $reference,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'type' => $validated['type'],
            'mail_sent' => $mailSent,
        ]);
    }
}
