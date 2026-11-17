<x-mail::message>
# Demande de contact [{{ $data['reference'] ?? 'EZHL' }}]

Vous avez reçu une nouvelle demande via le portail web **EZHL Logistics**.

<x-mail::panel>
**Détails du dossier :**
- **Référence :** `{{ $data['reference'] ?? 'N/A' }}`
- **Nom complet :** {{ $data['name'] }}
- **Email :** {{ $data['email'] }}
- **Téléphone :** {{ !empty($data['phone']) ? $data['phone'] : 'Non renseigné' }}
- **Type de prestation :** {{ $data['type'] }}
- **Date de réception :** {{ now()->format('d/m/Y H:i') }}
</x-mail::panel>

**Message :**
<x-mail::panel>
{!! nl2br(e($data['message'])) !!}
</x-mail::panel>

<x-mail::button :url="'mailto:' . $data['email'] . '?subject=Re: [' . ($data['reference'] ?? 'EZHL') . '] Votre demande EZHL Logistics'">
Répondre directement à {{ $data['name'] }}
</x-mail::button>

Cordialement,<br>
**{{ config('app.name', 'EZHL Logistics') }}**
</x-mail::message>
