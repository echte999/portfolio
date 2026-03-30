# Log des corrections accessibilité — 30 mars 2026

Corrections appliquées suite à l'audit WCAG 2.1. Problèmes couverts : tous les niveaux "Critique" et "Important".

---

## assets/css/style.css

### Contrastes de couleurs (critiques)

- **`--muted2` mode sombre** : `#3d4a57` → `#6a7888` (ratio 2.6:1 → ~5.0:1 sur `--bg`). Affecte footer, tags, dates de projets. [WCAG 1.4.3 AA]
- **`--muted2` mode clair** : `#8a9ab0` → `#4a5a6e` (ratio 2.2:1 → ~5.5:1 sur `--bg2`). [WCAG 1.4.3 AA]
- **`--accent` mode clair** : `#0d9373` → `#0b7d61` (ratio 4.25:1 → ~4.7:1 sur `--bg`). [WCAG 1.4.3 AA]
- **`--accent2` mode clair** : `#0087ff` → `#005fcc` (ratio 3.2:1 → ~5.0:1 sur `--bg`). [WCAG 1.4.3 AA]
- **Badges `.badge-auto` / `.badge-tool`** : couleurs codées en dur (`#4da6ff`, `#b47aff`) remplacées par variables `--badge-auto-color` et `--badge-tool-color`. En mode sombre : valeurs inchangées. En mode clair : `--badge-auto-color: #004aaa`, `--badge-tool-color: #6b21e8` (~6:1 sur `--bg2`). [WCAG 1.4.3 AA]
- **`.btn-dl-json`** : idem, remplacé par `var(--badge-auto-color)`. [WCAG 1.4.3 AA]

### Composants d'interface (important)

- **`.theme-toggle`** : bordure passée de `var(--border)` à `var(--border-h)` pour améliorer la visibilité du composant. [WCAG 1.4.11 AA]
- **`footer p`** : couleur passée de `var(--muted2)` à `var(--muted)` pour atteindre le ratio requis. [WCAG 1.4.3 AA]
- **`.footer-gh-link`** : nouveau sélecteur CSS remplaçant le style inline du lien GitHub footer (couleur `var(--muted)`, hover `var(--accent)`).

### Navigation clavier et focus (critiques)

- **`:focus-visible`** : ajout de styles globaux pour `a`, `button`, `[data-action]` — outline `2px solid var(--accent)`, offset `3px`. [WCAG 2.4.7 AA]
- **`.skip-link`** : nouveau composant visuellement caché, visible au focus, avec `top: 0` au focus. [WCAG 2.4.1 A]
- **`.sr-only`** : classe utilitaire pour contenu accessible uniquement aux technologies d'assistance.

### Animations (critique)

- **`prefers-reduced-motion`** : ajout de la media query désactivant toutes les animations et transitions pour les utilisateurs qui ont activé cette préférence système. [bonnes pratiques / WCAG 2.3.3]

---

## index.html

### Structure sémantique (critiques / importants)

- **Skip link** : `<a href="#hero" class="skip-link">Aller au contenu principal</a>` ajouté en premier enfant de `<body>`. [WCAG 2.4.1 A]
- **Logo nav** : `<span class="logo">` → `<a href="#hero" class="logo" aria-label="Jared, retour en haut de page">`. Lien fonctionnel, ancré sur `#hero`. [WCAG 1.3.1 A]
- **`#projects`** : ajout `aria-labelledby="projects-title"` sur `<section>`, `id="projects-title"` sur `<h2>`, `aria-hidden="true"` sur `.section-label`. Correction du `</div>` manquant avant `</section>`. [WCAG 1.3.1 A]
- **`#reports`** : ajout `aria-labelledby="reports-title"` + `id="reports-title"` + `aria-hidden` sur `.section-label`. [WCAG 1.3.1 A]
- **`#contact`** : ajout `aria-labelledby="contact-title"` + `id="contact-title"` + `aria-hidden` sur `.section-label`. [WCAG 1.3.1 A]

### Bouton email (critique)

- Ajout `aria-label="Copier l'adresse e-mail"` sur le `<button>`. [WCAG 2.1.1 A]
- Ajout `aria-hidden="true"` sur `<span class="arrow">`. [WCAG 2.1.1 A]
- Déplacement de `aria-live="polite"` hors du `<button>` vers `<p id="copy-status" class="sr-only" aria-live="polite">`. [WCAG 1.3.1 A]

### Chargement dynamique des projets (importants)

- **`#project-grid`** : ajout `aria-live="polite"` + `aria-label="Liste des projets"`. [WCAG 4.1.3 AA]
- **`#project-error`** : ajout `role="alert"`. [WCAG 4.1.3 AA]

### Footer GitHub link (important)

- Suppression des `onmouseover` / `onmouseout` inline (gestion CSS via `.footer-gh-link`).
- Ajout `aria-label="Voir le code source sur GitHub (s'ouvre dans un nouvel onglet)"`. [WCAG 2.4.4 A]

### Variables CSS (inline `<style>`)

- Bloc `:root` et `[data-theme="light"]` inline mis à jour pour correspondre aux valeurs corrigées dans `style.css`.
- Ajout de `prefers-reduced-motion` dans le bloc inline pour couvrir les animations hero (`fadeUp`) avant le chargement de `style.css`.

---

## assets/js/main.js

### Bouton thème (important)

- Mise à jour dynamique de `aria-label` lors du toggle : "Activer le thème clair" / "Activer le thème sombre". [WCAG 4.1.2 A]

### Feedback copie email (important)

- Cible remplacée par `#copy-status` (élément externe au bouton) au lieu de `.copy-label` interne. [WCAG 1.3.1 A]

### Liens projet externes (important)

- Ajout `<span class="sr-only"> (s'ouvre dans un nouvel onglet)</span>` dans le titre lien de chaque carte projet. [WCAG 2.4.4 A]

---

## Problèmes non corrigés (mineurs — hors scope)

- **1.2** : `.section-label` sans relation sémantique → `aria-hidden` ajouté, mais non convertie en liste sémantique.
- **1.6** : Tags `.tag-row` non convertis en `<ul>/<li>` (impact mineur, changement structurel important).
- **4.3** : `.report-list` non convertie en `<ol>` (idem).
- **5.2** : `og:image` pointe vers une image potentiellement manquante (hors WCAG).
