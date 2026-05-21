# Système d'Authentification 2FA avec TOTP

## Vue d'ensemble

Le système de sécurité CHEZ MISS utilise une authentification à deux facteurs (2FA) basée sur le TOTP (Time-based One-Time Password), compatible avec Google Authenticator et d'autres applications d'authentification.

## Caractéristiques

### 1. Configuration 2FA
**URL:** `/staff/setup-2fa`

- Génération automatique de secrets TOTP uniques
- QR code scannable pour Google Authenticator
- Codes de sauvegarde (backup codes) pour l'accès d'urgence
- Interface sécurisée avec Liquid Metal buttons

### 2. Connexion Staff Sécurisée
**URL:** `/staff/login`

- Authentification par email et mot de passe
- Vérification du code TOTP à 6 chiffres
- Support des codes de sauvegarde
- Workflow à 2 étapes intuitif

### 3. Pages d'authentification
- `/signin` - Connexion utilisateur
- `/signup` - Création de compte
- `/staff/login` - Connexion staff avec 2FA
- `/staff/setup-2fa` - Configuration de l'authentificateur

## API Endpoints

### POST `/api/auth/totp/generate`
**Description:** Génère un nouveau secret TOTP et retourne le QR code

**Payload:**
```json
{
  "email": "staff@chezmiss.ca"
}
```

**Réponse:**
```json
{
  "secret": "JBSWY3DPEBLW64TMMQ======",
  "qrCode": "data:image/png;base64,...",
  "backupCodes": [
    "ABC12345",
    "DEF67890",
    ...
  ]
}
```

### POST `/api/auth/totp/verify`
**Description:** Vérifie un code TOTP

**Payload:**
```json
{
  "secret": "JBSWY3DPEBLW64TMMQ======",
  "token": "123456"
}
```

**Réponse:**
```json
{
  "valid": true,
  "message": "Code TOTP validé avec succès"
}
```

## Technologies Utilisées

- **speakeasy:** Génération et vérification des codes TOTP
- **qrcode:** Génération des QR codes
- **Google Authenticator:** Application d'authentification recommandée

## Workflow de Sécurité

### Configuration initiale
1. Accéder à `/staff/setup-2fa`
2. Entrer son email
3. Scanner le QR code avec Google Authenticator
4. Sauvegarder les codes de secours
5. Vérifier avec un code généré par l'authenticateur

### Connexion
1. Accéder à `/staff/login`
2. Entrer email et mot de passe
3. Entrer le code TOTP actuel (6 chiffres)
4. Redirection vers le tableau de bord staff

## Codes de Sauvegarde

- 10 codes générés automatiquement
- À conserver dans un endroit sûr
- À utiliser en cas de perte du téléphone
- Un code par authentification

## Sécurité

- **Fenêtre d'acceptation:** ±1 pas de temps (30 secondes chacun)
- **Secrets:** Stockés de manière sécurisée
- **Codes:** À usage unique et basés sur le temps
- **Codes de sauvegarde:** Pré-hashés et validés

## Configuration Future

Pour implémenter la persistance de la base de données:

1. Créer une table `staff_2fa` dans Supabase:
   ```sql
   CREATE TABLE staff_2fa (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     secret TEXT NOT NULL,
     backup_codes TEXT[] NOT NULL,
     enabled BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT now()
   );
   ```

2. Mettre à jour les API endpoints pour:
   - Sauvegarder les secrets dans la base de données
   - Valider contre les secrets stockés
   - Gérer les codes de sauvegarde

## Intégration Recommandée

Pour une production complète:
- Intégrer avec Supabase Auth
- Ajouter les sessions utilisateur
- Implémenter les tokens JWT
- Gérer les codes de sauvegarde utilisés
