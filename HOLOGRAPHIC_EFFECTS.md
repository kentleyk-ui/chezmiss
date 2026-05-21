# Effets Holographiques 3D — Guide de Déploiement

## 📋 Fichiers Créés

### Composants
- **`ui-lib/components/holographic-card.tsx`** — Conteneur pour effet tilt 3D avec mouse-tracking
- **`ui-lib/components/holographic-product-card.tsx`** — Carte produit avec tous les effets holographiques

### Pages de Démonstration (NON DÉPLOYÉES)
- **`app/a-propos/page-holographic.tsx`** — Version holographique de la page À Propos
- **`app/boutique/page-holographic.tsx`** — Version holographique de la page Boutique

## ✨ Effets Implémentés

### 1. **Tilt 3D (Mouse Tracking)**
- Détection du mouvement de la souris
- Rotation 3D sur les axes X et Y
- Animation fluide avec Framer Motion (spring physics)
- Intensité configurable par carte

### 2. **Double Scanline Animée**
- Deux couches de scanlines avec vitesses différentes (2.5s et 1.8s)
- Visible au hover uniquement
- Couleurs: gold (#B79A5B) et rose (#f0c9e1)

### 3. **Corner Brackets L-Shape**
- 4 coins avec bordures L-shape
- Opacité 60% par défaut
- Augmentation d'opacité au hover
- Couleur gold

### 4. **Icône Centrale Holographique**
- Icône Zap au centre avec pulsation
- Deux cercles concentriques animés avec pulsations inversées
- Animations continues de glow et scaling

### 5. **Brackets Holographiques Autour de l'Icône**
- Cercle extérieur (opacité 50%, scale 0.95-1.05)
- Cercle intérieur (opacité 60%, scale inverse)
- Timing décalé pour effet dynamique

### 6. **Effets Supplémentaires**
- Glow holographique pulsant au hover
- Grid background animé en arrière-plan
- Animations de prix avec changement de couleur
- Tags produits avec pulsation de glow
- Fades de contour progressive

## 🚀 Comment Utiliser

### Pour activer la version holographique (Boutique):

1. Renommer le fichier:
```bash
mv app/boutique/page-holographic.tsx app/boutique/page.tsx
mv app/boutique/page.tsx app/boutique/page-original.tsx
```

2. Importer le composant `HolographicProductCard` dans le nouveau `page.tsx`

### Pour activer la version holographique (À Propos):

1. Renommer le fichier:
```bash
mv app/a-propos/page-holographic.tsx app/a-propos/page.tsx
mv app/a-propos/page.tsx app/a-propos/page-original.tsx
```

## 📊 Détails Techniques

### HolographicCard Props
```typescript
interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;  // 0-1, défaut 1
}
```

### Performance
- Utilise CSS transforms pour performance GPU
- Animations frame-based avec Framer Motion
- Pas de re-renders inutiles
- Optimisé pour 60 FPS

## 🎨 Customisation

### Couleurs
- Gold: `#B79A5B`
- Rose: `#f0c9e1`
- Background sombre: `#080508`

### Timing des Animations
- Tilt spring: `stiffness: 300, damping: 30`
- Scanlines: 2.5s et 1.8s
- Glow pulse: 2s-3s cycles
- Grid background: 10s-15s

### Intensité du Tilt
- Par défaut: 1.0 (full effect)
- Cards produits: 0.8 (tilt réduit)
- Cards À Propos: 0.6 (subtle effect)

## ⚠️ État de Production

**CES FICHIERS NE SONT PAS DÉPLOYÉS.**

Les versions originales restent actives:
- `app/boutique/page.tsx` — Version actuelle
- `app/a-propos/page.tsx` — Version actuelle

Pour switcher en production, utiliser les commandes de renommage ci-dessus.

## 🔧 Dépannage

### Si le tilt ne fonctionne pas
- Vérifier que `perspective: 1000px` est appliqué
- S'assurer que Framer Motion est installé

### Si les scanlines ne s'affichent pas
- Vérifier que `group-hover` est actif
- Augmenter l'opacité des gradients

### Si les performances baissent
- Réduire `intensity` des cartes
- Diminuer la durée des animations
- Limiter le nombre de cartes affichées

## 📝 Notes

- Tous les effets utilisent Framer Motion pour l'animation
- Compatible avec Tailwind CSS et CSS personnalisé
- Responsive design inclus
- Accessible (préfère-réduit-mouvement peut être ajouté)
