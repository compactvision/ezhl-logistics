<x-mail::message>
# Nouvelle demande de contact

Vous avez reçu une nouvelle demande via le site web EZHL.

**Détails du contact :**
- **Nom :** {{ $data['name'] }}
- **Email :** {{ $data['email'] }}
- **Téléphone :** {{ $data['phone'] ?? 'N/A' }}
- **Type de flux :** {{ $data['type'] }}

**Message :**
{{ $data['message'] }}

Cordialement,<br>
L'équipe {{ config('app.name') }}
</x-mail::message>
