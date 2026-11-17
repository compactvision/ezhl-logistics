<?php

namespace Tests\Feature;

use App\Mail\ContactRequest;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function test_contact_form_sends_email_to_contact_address(): void
    {
        Mail::fake();

        $response = $this->post('/contact', [
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@example.com',
            'phone' => '+243851000000',
            'type' => 'fret',
            'message' => 'Demande de cotation pour conteneur 40 pieds.',
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertSessionHas('success');

        Mail::assertSent(ContactRequest::class, function (ContactRequest $mail) {
            return $mail->hasTo('contact@ezhl-logistics.com')
                && $mail->hasReplyTo('jean.dupont@example.com')
                && $mail->data['name'] === 'Jean Dupont';
        });
    }

    public function test_contact_form_validates_required_fields(): void
    {
        Mail::fake();

        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'type', 'message']);
        Mail::assertNothingSent();
    }
}
