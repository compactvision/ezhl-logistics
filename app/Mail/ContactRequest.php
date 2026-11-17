<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactRequest extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var array<string, mixed>
     */
    public array $data;

    public string $reference;

    /**
     * Create a new message instance.
     *
     * @param array<string, mixed> $data
     * @param string $reference
     */
    public function __construct(array $data, string $reference = '')
    {
        $this->data = $data;
        $this->reference = $reference ?: ('EZHL-' . strtoupper(substr(uniqid(), -6)));
        $this->data['reference'] = $this->reference;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $senderName = (string) ($this->data['name'] ?? 'Client EZHL');
        $senderEmail = (string) ($this->data['email'] ?? '');

        return new Envelope(
            subject: "[{$this->reference}] Nouvelle demande de contact — {$senderName}",
            replyTo: !empty($senderEmail) ? [new Address($senderEmail, $senderName)] : [],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
