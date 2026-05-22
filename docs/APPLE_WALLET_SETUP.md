# Apple Wallet Setup (CHEZMISS)

Cette fonctionnalite ajoute un bouton "Ajouter a Apple Wallet" dans la page staff.

## Comportement

- Le front envoie les donnees carte vers `POST /api/wallet/apple-pass`.
- La route construit un payload PassKit riche (theme, couleurs, champs, QR vCard).
- La route appelle un service externe de signature PassKit.
- Si la route ne peut pas fournir un `.pkpass`, le front fait un fallback en `.vcf` (contact).

## Variables d'environnement requises

- `APPLE_WALLET_PASS_URL`: URL du service externe qui signe et retourne un `.pkpass`.
- `APPLE_WALLET_PASS_TYPE_IDENTIFIER`: ex. `pass.com.chezmiss.businesscard`.
- `APPLE_WALLET_TEAM_IDENTIFIER`: Team ID Apple Developer.

## Variables optionnelles

- `APPLE_WALLET_PASS_TOKEN`: bearer token pour proteger le service externe.
- `APPLE_WALLET_ORGANIZATION_NAME`: nom affiche dans Wallet (defaut: `CHEZMISS`).
- `APPLE_WALLET_WEB_SERVICE_URL`: URL web service PassKit (updates/push).
- `APPLE_WALLET_AUTH_TOKEN`: token PassKit pour `webServiceURL`.

## Contrat attendu du service externe

- Methode: `POST`
- Entree: JSON contenant une cle `pass` avec structure PassKit (fournie par la route).
- Sortie: fichier binaire `.pkpass`
- Header attendu: `Content-Type: application/vnd.apple.pkpass`

## Notes importantes

- Le `.pkpass` doit etre signe avec les certificats Apple Wallet valides.
- Sans signature valide, iOS refusera l'ajout au Wallet.
- Le fallback `.vcf` reste disponible pour ne jamais bloquer l'utilisateur final.
