# CLAUDE.md

## Aperçu

Site portfolio statique une seule page — Jared, consultant automatisation & IA.

**INTERDIT :** système de build, bundler, framework JS, gestionnaire de paquets, fichiers supplémentaires non demandés.

## Développement

Ouvrir `index.html` directement dans un navigateur. Pour le rechargement automatique :

```bash
npx serve .
# ou
python -m http.server 8080
```

## Règles de code

- **Mobile-first obligatoire :** CSS petits écrans d'abord, `min-width: 640px` pour agrandir. **INTERDIT** d'écrire des media queries `max-width`.
- **Langue du code :** classes CSS, variables JS, attributs HTML → **anglais uniquement**.
- **Langue du contenu :** textes, labels, boutons, attributs `alt` → **français uniquement**.
- **INTERDIT** d'ajouter des commentaires évidents ou de la prose dans le code.

## Architecture

```
index.html           ← structure uniquement, ordre des sections immuable :
                        Hero → #about → #projects → #reports → #contact
assets/css/style.css ← tous les styles, aucun style inline dans le HTML
assets/js/main.js    ← JS minimal, ne gérer que ce qui est demandé
assets/img/          ← images des projets
data/projects.json   ← données des projets (seul fichier à modifier pour
                        ajouter/modifier un projet) — chargé via fetch()
```

⚠️ `fetch()` nécessite un serveur local — ne pas ouvrir `index.html` directement.

Fichiers téléchargeables (`.pdf`, `.json` n8n) → servis depuis la racine.

**INTERDIT** de créer de nouveaux fichiers CSS ou JS sans demande explicite.

## Variables CSS (ne pas modifier sans raison)

```css
--bg: #080c10    --bg2: #0d1117    --bg3: #111820
--accent: #00d4a0 (vert)    --accent2: #0087ff (bleu)
--text: #e8edf2    --muted: #6b7a8d    --muted2: #3d4a57
--border: rgba(255,255,255,0.07)    --border-h: rgba(255,255,255,0.13)
--nav-bg: rgba(8,12,16,0.85)
--mono: 'JetBrains Mono'    --sans: 'Space Grotesk'
```

Le sélecteur `[data-theme="light"]` surcharge toutes ces variables — ne pas toucher sans raison.

## Système de design

- Arrière-plan : `.glow-orb.a` (vert, haut-gauche) + `.glow-orb.b` (bleu, bas-droite) + `body::before` (bruit) + `body::after` (grille).
- Animations hero : `.fade-up` + `.delay-1` à `.delay-4`.
- Badges projets : `.badge-ai` (vert) / `.badge-auto` (bleu) / `.badge-tool` (violet).
- Bouton `.theme-toggle` avec icônes moon/sun.
- **INTERDIT** d'utiliser d'autres polices que Space Grotesk et JetBrains Mono.

## Fonctionnalités JS (main.js)

- **Toggle thème** : bouton `data-action="toggle-theme"`, persistance `localStorage`, script anti-flash dans `<head>` pour appliquer le thème avant le rendu.
- **Copy email** : bouton `data-action="copy-email"`, feedback visuel 2s.
- **Chargement projets** : `loadProjects()` fetch `data/projects.json`, génère les cartes via `buildProjectCard()` et les insère dans `#project-grid`. En cas d'erreur, affiche `#project-error`.
