<?php

namespace Tests\Feature;

use App\Mail\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_saves_to_database_and_sends_email(): void
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
        $response->assertSessionHas('contact_success');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@example.com',
            'type' => 'fret',
            'status' => 'sent',
        ]);

        Mail::assertSent(ContactRequest::class, function (ContactRequest $mail) {
            return $mail->hasTo('contact@ezhl-logistics.com')
                && $mail->hasReplyTo('jean.dupont@example.com')
                && $mail->data['name'] === 'Jean Dupont';
        });
    }

    public function test_contact_form_saves_message_even_if_mail_transport_fails(): void
    {
        Mail::shouldReceive('to')
            ->once()
            ->with('contact@ezhl-logistics.com')
            ->andReturnSelf();

        Mail::shouldReceive('send')
            ->once()
            ->andThrow(new \Exception('SMTP Connection timeout'));

        $response = $this->post('/contact', [
            'name' => 'Alain Mukendi',
            'email' => 'alain@example.com',
            'phone' => '+243990000000',
            'type' => 'douane',
            'message' => 'Besoin d aide pour dedouanement Kinshasa aeroport.',
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertSessionHas('contact_success');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Alain Mukendi',
            'status' => 'failed_email',
        ]);
    }

    public function test_contact_form_validates_required_fields(): void
    {
        Mail::fake();

        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'type', 'message']);
        Mail::assertNothingSent();
    }
}
