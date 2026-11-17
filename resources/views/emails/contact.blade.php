<x-mail::message>
# Nouvelle demande de contact — EZHL Logistics

Vous avez reçu une nouvelle demande via le formulaire du site web **EZHL Logistics**.

<x-mail::panel>
**Détails de l'expéditeur :**
- **Nom complet :** {{ $data['name'] }}
- **Email :** {{ $data['email'] }}
- **Téléphone :** {{ !empty($data['phone']) ? $data['phone'] : 'Non renseigné' }}
- **Type de flux / service :** {{ $data['type'] }}
</x-mail::panel>

**Message :**
<x-mail::panel>
{!! nl2br(e($data['message'])) !!}
</x-mail::panel>

<x-mail::button :url="'mailto:' . $data['email']">
Répondre directement à {{ $data['name'] }}
</x-mail::button>

Cordialement,<br>
**{{ config('app.name', 'EZHL Logistics') }}**
</x-mail::message>
