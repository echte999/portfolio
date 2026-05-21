# Repositionnement portfolio — Développeur IA spécialisé e-commerce

**Date** : 2026-05-21
**Objectif** : Repositionner le portfolio de "développeur en formation, autodidacte" à "développeur IA spécialisé e-commerce" (Claude Code + n8n), avec une évolution douce de la direction artistique.

## Contexte

Le site actuel positionne Jared comme un "développeur en formation" autodidacte. La proposition de valeur est générique (pipelines intelligents, agents IA) et la palette tech (vert + bleu) ne se différencie pas. Le contenu (rapports hebdomadaires "Formations") renforce un signal d'apprenant peu compatible avec une démarche commerciale auprès d'e-commerçants.

Le repositionnement vise à assumer une expertise spécialisée e-commerce tout en conservant les fondations techniques du site (HTML statique, mobile-first, pas de build system).

## Décisions de cadrage (brainstorming)

1. **Positionnement** : spécialiste e-commerce assumé. Drop total du "en formation".
2. **DA** : évolution douce du tech sombre actuel. Pas de refonte radicale.
3. **Section Rapports IA** : renommée "Veille IA / Ressources". Contenu PDF conservé, framing expert.
4. **Section Projets** : projets conservés, descriptions et intros recadrées vers la transposabilité e-commerce.
5. **Promesse** : trois piliers égaux (temps opérationnel, croissance via IA, sur-mesure vs SaaS rigides).
6. **Stack affichée** : Claude Code, n8n, Shopify (uniquement — pas de WooCommerce ni autre). Shopify n'apparaît qu'en pill, jamais nommé dans la prose du hero.
7. **Accent visuel** : orange ambre cuivré (`#ff8a3d`) en accent unique, drop du bleu.

## Périmètre

### Fichiers modifiés

- `index.html` : hero, nav, intros sections, contact, meta tags, styles `<style>` inline
- `assets/css/style.css` : variables couleur, ajustements grille/orbes/typo
- `data/projects.json` : descriptions ajustées si nécessaire pour signal e-commerce (à évaluer projet par projet)

### Fichiers NON modifiés

- `assets/js/main.js` (aucun changement de logique)
- Les PDFs des rapports (titres, contenus, dates inchangés)
- Le toggle thème, copy email, anti-flash thème
- L'ordre et la structure HTML des sections
- Les images de projets

## Spécification détaillée

### 1. Discours & contenu

#### Hero

- **Eyebrow** : `Développeur IA · Spécialisé e-commerce` (remplace `Disponible pour missions`)
- **H1** : `Jared` / dim: `Développeur IA pour e-commerçants` (remplace `Développeur en formation`)
- **Sub** :
  > "Je conçois et déploie des **solutions sur mesure** propulsées par **Claude Code** et **n8n** : automatisations qui libèrent du temps opérationnel, agents IA qui boostent vos ventes, intégrations parfaitement adaptées à votre stack."
- **CTA primary** : `Voir mes réalisations` (remplace `Voir mes projets`)
- **CTA ghost** : `Discuter de votre projet` (remplace `Me contacter`)
- **Pills** : `Claude Code` · `n8n` · `Shopify` · `IA sur mesure` (remplace `n8n` + `Claude Code` seuls)

#### Nav

- `Réalisations` (remplace `Projets`)
- `Veille IA` (remplace `Rapports IA`)
- `Contact` (inchangé)

#### Section "Réalisations" (ex-Projets)

- Section-label : `02 — Réalisations`
- Titre H2 : `Ce que je construis` (présent, pas passé)
- Intros (remplacent les deux phrases actuelles) :
  > "Chaque projet illustre une logique directement réutilisable pour les e-commerçants : scraping concurrents, agents IA contextuels, génération de contenu automatisée, pipelines de données."
- Cartes projets : structure inchangée. Les descriptions individuelles dans `data/projects.json` peuvent être ajustées au moment de l'implémentation si une formulation suggère trop fortement un usage "apprentissage" — à évaluer projet par projet.

#### Section "Veille IA" (ex-Rapports IA)

- Section-label : `03 — Veille IA`
- Titre H2 : `Ressources & analyses` (remplace `Formations hebdomadaires`)
- Intros (remplacent les deux phrases actuelles) :
  > "Une série d'analyses sur les LLMs, l'automatisation par IA et les usages concrets — pour comprendre ce qui change vraiment et comment l'appliquer."
  > "Veille technique structurée à partir de NotebookLM et de la pratique terrain."
- Liste des rapports : aucune modification (numéros, titres, dates, descriptions, tags, PDFs).

#### Section Contact

- Section-label : `04 — Contact` (inchangé)
- Titre H2 : `Travaillons ensemble` (inchangé)
- Paragraphes (remplacent les deux actuels) :
  > "Je conçois des solutions IA et automatisations sur mesure pour e-commerçants : agents conversationnels, pipelines de données, intégrations Shopify, génération de contenu, scraping concurrents."
  > "Vous avez un besoin spécifique, un workflow à automatiser ou une idée que les outils SaaS ne couvrent pas ? Écrivez-moi, on en discute."
- Bouton mail : inchangé.

#### Footer

- `© 2026 Jared` : inchangé
- `Construit avec Claude Code` : conservé (preuve par l'exemple)
- Lien GitHub : conservé

#### Meta & SEO

- `<title>` : `Jared — Développeur IA pour e-commerçants`
- `<meta name="description">` : `Solutions IA et automatisations sur mesure pour e-commerçants. Claude Code, n8n, Shopify — par Jared, développeur IA spécialisé.`
- `og:title` : identique au `<title>`
- `og:description` : identique à la meta description
- `og:image` : inchangé (`assets/img/project-crypto.png`)
- `lang="fr"` : inchangé
- Aria-label nav `Jared, retour en haut de page` : inchangé (toujours valide)

### 2. Direction artistique

#### Variables CSS — mode dark

Modifications dans `:root` (et dans le `<style>` inline du `<head>` qui contient un sous-ensemble) :

- `--accent: #00d4a0` → `--accent: #ff8a3d` (orange ambre cuivré)
- `--accent2: #0087ff` → **supprimée** (variable retirée car plus utilisée)

Tous les usages de `var(--accent2)` dans `style.css` doivent être remplacés :
- Soit par `var(--accent)` si l'élément doit garder un accent
- Soit par `var(--text)` ou `var(--muted)` si l'élément peut être désaccentué

À auditer pendant l'implémentation. Les usages connus à ce stade :
- `.glow-orb.b` (utilise rgba bleu en dur dans le `<style>` inline) → à passer en orange atténué OU à supprimer (voir point grille/orbes ci-dessous)
- Toutes les autres occurrences à grepper dans `assets/css/style.css`

#### Variables CSS — mode light (`[data-theme="light"]`)

- `--accent: #0b7d61` → `--accent: #c45a14` (orange ambre plus profond, contraste AA sur fond clair)
- `--accent2: #005fcc` → supprimée (idem)

#### Bouton primary (`.btn-primary`)

Actuellement : `background: var(--accent)` + `color: #04201a` (texte vert très foncé sur fond vert).

Avec l'orange : on passe à `color: #2a1408` (brun très foncé) pour le contraste sur fond orange. Le `:hover` actuel `background: #00edb4` devient `background: #ffa166` (orange plus clair).

En light mode : le bouton garde sa logique (fond accent, texte foncé). Avec `--accent: #c45a14`, le texte `#2a1408` reste lisible.

#### Badges projets

`badge-ai` (vert), `badge-auto` (bleu), `badge-tool` (violet) : **inchangés**. Ils ont leur propre rôle de typologie projet et conservent leur lisibilité indépendante. Décorréler la palette badges de la palette principale est volontaire.

#### Background

Dans le `<style>` inline du `<head>` :
- `body::after` (grille) : `opacity: .4` → `opacity: .2`, `background-size: 60px 60px` → `80px 80px`
- `.glow-orb.a` : `rgba(0,212,160,.08)` → `rgba(255,138,61,.08)` (orange, même intensité)
- `.glow-orb.b` : actuellement bleu `rgba(0,135,255,.06)` → on **garde un second orb** mais en orange plus discret `rgba(255,138,61,.04)` pour conserver l'équilibre visuel (sinon on perd la profondeur du fond)
- `body::before` (bruit) : inchangé

Note : le `<style>` inline du `<head>` (lignes 16-64 d'`index.html`) contient des duplications de variables et de règles du `style.css`. Les modifications doivent être appliquées **aux deux endroits** pour éviter le FOUC anti-flash. À auditer pendant l'implémentation.

#### Typographie

Dans le `<style>` inline ou `style.css` (selon où la règle existe) :
- `h1` : `font-size: clamp(40px, 7vw, 72px)` → `clamp(44px, 8vw, 84px)` ; `letter-spacing: -.03em` → `-.035em`
- `h1 .dim` : `font-weight: 300` → `font-weight: 400`

Polices Space Grotesk + JetBrains Mono : inchangées.

#### Eyebrow et pills

Inchangés visuellement (mono, uppercase, lettrage espacé). Ils utilisent `var(--accent)` qui passera automatiquement à l'orange.

### 3. Comportements

Aucune modification du comportement JS :
- Toggle thème : fonctionne identiquement
- Copy email : inchangé
- Chargement projets via `fetch()` : inchangé
- Anti-flash thème : inchangé
- Animations fade-up : inchangées

## Critères de réussite

1. Le hero communique immédiatement : "développeur IA pour e-commerçants, Claude Code + n8n".
2. Aucune occurrence des termes "en formation", "autodidacte", "j'apprends", "formation" (dans le sens apprentissage) dans le HTML rendu — sauf dans les titres de PDFs des rapports qui restent inchangés.
3. La palette ne contient plus de bleu : ni `#0087ff`, ni `#005fcc`, ni dérivés rgba dans le rendu final.
4. Mode dark et mode light tous deux cohérents avec la nouvelle palette orange (toggle fonctionnel, contraste AA conservé).
5. Mobile-first respecté : aucun media query `max-width` ajouté.
6. Les classes CSS, variables JS et attributs HTML restent en anglais. Tout le contenu visible est en français.
7. Le site reste statique (pas de nouveau fichier CSS/JS, pas de dépendance ajoutée).
8. Le portfolio reste accessible : structure landmark inchangée, contrastes vérifiés sur les deux thèmes, skip-link conservé.

## Hors périmètre (ne pas faire)

- Refonte complète de la structure HTML
- Ajout de sections (témoignages, services détaillés, tarifs, FAQ) — peuvent faire l'objet d'un spec ultérieur
- Modification des PDFs ou de leurs métadonnées
- Refonte de `data/projects.json` (structure JSON) ; seules les valeurs textuelles peuvent être ajustées
- Ajout de fichiers CSS / JS supplémentaires
- Modifications du système de build / déploiement / CI

## Risques et points d'attention

1. **Duplication des styles** : `index.html` contient un `<style>` inline (anti-flash) qui duplique des règles de `style.css`. Toute modification de variables couleur ou de règles `body::after`/`glow-orb` doit être appliquée aux deux endroits, sinon FOUC ou désynchronisation visuelle au chargement.

2. **Contraste orange sur fond clair** : `#c45a14` doit être vérifié visuellement en mode light, notamment pour le texte sur les `.btn-primary` et les liens `.theme-toggle:hover`. Si contraste insuffisant, ajuster vers `#a8480f` ou similaire.

3. **Audit `var(--accent2)`** : tous les usages dans `style.css` doivent être identifiés et remappés cas par cas. Risque d'oublier un endroit et de laisser une variable inexistante (rendu CSS cassé silencieusement).

4. **Cohérence projets vs e-commerce** : les projets actuels (newsletter Telegram crypto, etc.) ne sont pas directement e-commerce. L'intro de section recadre, mais si certaines descriptions de cartes projets dissonent trop (ex: mentions explicites d'apprentissage), elles seront ajustées au moment de l'implémentation. Décision projet par projet, pas en bloc.

5. **OG image** : conservée par défaut, mais elle représente un projet crypto. Hors périmètre de la remplacer ici, mais à noter pour itération future si SEO/social devient prioritaire.
