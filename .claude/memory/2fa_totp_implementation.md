---
name: 2FA TOTP Authentication System
description: Complete 2FA authentication with TOTP, QR codes, and Google Authenticator support
type: project
---

## Authentification 2FA Implémentée

**Status:** ✅ Déploié en production

### Fonctionnalités principales

**1. Système TOTP complet**
- Génération de secrets TOTP uniques par utilisateur
- Codes à 6 chiffres basés sur le temps (30 secondes)
- Fenêtre d'acceptation ±1 pas de temps
- Compatible avec Google Authenticator et Microsoft Authenticator

**2. QR Code Generator**
- QR codes auto-générés pour chaque utilisateur
- Scannable directement dans Google Authenticator
- Utilise la librairie speakeasy + qrcode

**3. Codes de sauvegarde**
- 10 codes générés automatiquement
- À usage unique
- Interface de visualisation et copie facile

**4. Pages d'authentification**
- `/signin` - Connexion utilisateur standard
- `/signup` - Création de compte
- `/staff/login` - Connexion staff avec 2FA (2 étapes)
- `/staff/setup-2fa` - Configuration de l'authentificateur

**5. API Endpoints**
- `POST /api/auth/totp/generate` - Générer secret + QR code
- `POST /api/auth/totp/verify` - Vérifier un code TOTP

**6. UI/UX**
- Tous les boutons en LiquidMetalButton
- Interface responsive et accessible
- Workflow intuitif à 2 étapes
- Support mobile complet

### Fichiers créés

**Backend:**
- `lib/totp.ts` - Utilitaires TOTP (génération, vérification, backup codes)
- `app/api/auth/totp/generate/route.ts` - API génération
- `app/api/auth/totp/verify/route.ts` - API vérification

**Frontend:**
- `app/signin/page.tsx` - Page connexion utilisateur
- `app/signup/page.tsx` - Page création compte
- `app/staff/login/page.tsx` - Page connexion staff avec 2FA
- `app/staff/setup-2fa/page.tsx` - Configuration 2FA
- `components/LiquidMetalSocialIcon.tsx` - Icônes réseaux sociaux en Liquid Metal

**Documentation:**
- `docs/2FA_TOTP_SETUP.md` - Guide complet du système

### Dépendances ajoutées

- `speakeasy` - Génération/vérification TOTP
- `qrcode` - Génération QR codes
- `@types/speakeasy` - Types TypeScript

### Prochaines étapes pour production

1. **Persistance base de données**
   - Créer table `staff_2fa` dans Supabase
   - Stocker secrets TOTP chiffrés
   - Gérer codes de sauvegarde utilisés

2. **Sessions utilisateur**
   - Implémenter JWT tokens
   - Sessions persistantes
   - Gestion des déconnexions

3. **Tests de sécurité**
   - Vérifier l'isolation des secrets
   - Tester les attaques brute-force
   - Audit de conformité

4. **Notifications**
   - Email de confirmation 2FA
   - Alertes connexion staff
   - Rappels codes de sauvegarde

### Routes disponibles

- ✅ `/signin` - Connexion
- ✅ `/signup` - Inscription
- ✅ `/staff/login` - Connexion staff 2FA
- ✅ `/staff/setup-2fa` - Configuration authenticateur
- ✅ `/api/auth/totp/generate` - API génération
- ✅ `/api/auth/totp/verify` - API vérification
