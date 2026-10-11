# CLAUDE.md

## Aperçu

Site portfolio statique une seule page — Jared, agents IA souverains et harnais portables.

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
- **Langue du contenu :** textes, labels, boutons, attributs `alt` → **anglais uniquement**.
- **INTERDIT** d'ajouter des commentaires évidents ou de la prose dans le code.

## Architecture

```
index.html           ← structure uniquement, ordre des sections immuable :
                        Hero → #timeline → #projects → #reports → #contact
                        (#projects = schéma d'architecture du harnais, écrit en HTML)
assets/css/style.css ← tous les styles, aucun style inline dans le HTML
assets/js/main.js    ← JS minimal, ne gérer que ce qui est demandé
assets/img/          ← images des projets
data/timeline.json   ← données de la timeline (seul fichier à modifier pour
                        ajouter un jalon) — chargé via fetch()
```

⚠️ `fetch()` nécessite un serveur local — ne pas ouvrir `index.html` directement.

Fichiers téléchargeables (`.pdf`, `.json` n8n) → servis depuis la racine.

**INTERDIT** de créer de nouveaux fichiers CSS ou JS sans demande explicite.

## Variables CSS (ne pas modifier sans raison)

```css
--bg: #12100e    --bg2: #1a1714    --bg3: #231f1b
--accent: #ff8205 (orange)    --accent2: #e10500 (rouge)
--c1: #ffd800  --c2: #ffaf00  --c3: #ff8205  --c4: #fa500f  --c5: #e10500 (les 5 bandes Mistral)
--accent-hover: #ffaf00    --on-accent: #1a0d00 (texte posé sur l'accent)
--text: #fffaeb    --muted: #a39a8b    --muted2: #9a9082
--border: rgba(255,250,235,0.08)    --border-h: rgba(255,250,235,0.16)
--nav-bg: rgba(18,16,14,0.85)
--mono: 'JetBrains Mono'    --sans: 'Space Grotesk'
```

Ces variables existent en double : dans `assets/css/style.css` et dans le CSS critique du `<head>` de `index.html`. Modifier les deux.

Le sélecteur `[data-theme="light"]` surcharge toutes ces variables — ne pas toucher sans raison.

## Système de design

- Arrière-plan : `.glow-orb.a` (orange, haut-gauche) + `.glow-orb.b` (rouge, bas-droite), animés par `drift` + `body::before` (bruit) + `body::after` (grille).
- Animations hero : `.fade-up` + `.delay-1` à `.delay-4`.
- Schéma d'architecture : `.arch` > `.arch-layer` (une couleur `--c1` à `--c5` par couche) > `.arch-node` (bouton) + `.arch-panel` (détail).
- Apparition au scroll : classe `.reveal`, posée par `revealOnScroll()`.
- Barre de progression : `.scroll-progress` dans la nav, pilotée par la variable `--scroll`.
- Bouton `.theme-toggle` avec icônes moon/sun.
- **INTERDIT** d'utiliser d'autres polices que Space Grotesk et JetBrains Mono.

## Fonctionnalités JS (main.js)

- **Toggle thème** : bouton `data-action="toggle-theme"`, persistance `localStorage`, script anti-flash dans `<head>` pour appliquer le thème avant le rendu.
- **Copy email** : bouton `data-action="copy-email"`, feedback visuel 2s.
- **Timeline** : `loadTimeline()` fetch `data/timeline.json`. En cas d'erreur, affiche `#timeline-error`.
- **Schéma d'architecture** : `initArchitecture()` ouvre le panneau du bloc cliqué et ferme les autres.
- **Défilement** : `initScrollProgress()` (barre), `initNavSpy()` (lien actif, `aria-current`), `revealOnScroll()`.
