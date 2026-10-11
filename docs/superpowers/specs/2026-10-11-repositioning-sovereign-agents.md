# Repositionnement portfolio : agents et harnais souverains

**Date** : 2026-10-11
**Remplace** : `2026-05-21-repositioning-ecommerce-design.md`
**Objectif** : passer de « consultant automatisation e-commerce » à « déploiement d'agents souverains et de harnais souverains ».

## Cible

Organisations qui veulent déployer des agents IA sans dépendre d'un seul fournisseur : elles gardent le contrôle de leurs données, de leur modèle et de leur fournisseur.

## Promesse

Un harnais d'agents qu'on peut déplacer d'un modèle à l'autre, mesuré par un banc, sans dépendre d'un seul fournisseur.

Trois preuves, une par carte principale :

1. **Portabilité** : instructions neutres dans `AGENTS.md`, logique dans des fichiers markdown et des scripts, dossiers d'outil réduits à des pointeurs.
2. **Mesure** : un banc d'épreuves scellées qui accepte un paramètre de modèle.
3. **Propriété des données** : un vault interrogeable, trois couches de propriété, mémoire versionnée dans git.

## Ton

- Tout le contenu du site en anglais (textes, labels, boutons, `alt`).
- Factuel, direct. Aucune promesse chiffrée non vérifiable.
- Les limites sont dites : le banc n'a pas encore tourné sur un second harnais, et la carte le dit.
- Le site parle du travail, pas de la vie personnelle.

## Structure des sections

Ordre : Hero → `#about` → `#timeline` → `#projects` → `#reports` → `#contact`.

| Section | Label | Titre | Contenu |
|---|---|---|---|
| Hero | eyebrow `Sovereign AI agents · Portable harnesses` | `Jared` / `Agent harnesses that move between models` | sous-titre, 2 boutons, pills |
| `#about` | `01 — About` | `Sovereign by design` | 3 paragraphes : le problème, la méthode, la mesure |
| `#timeline` | `02` | géré par l'agent A | les 3 anciens projets y passent |
| `#projects` | `03 — Work` | `What I build` | 4 cartes depuis `data/projects.json` |
| `#reports` | `04 — AI Notes` | `Resources & deep dives` | 9 rapports PDF inchangés, intro réécrite |
| `#contact` | `05 — Contact` | `Let's work together` | texte réécrit, copie d'email inchangée |

`#about` est une section nouvelle : elle n'utilise que des classes existantes (`wrap`, `section-label`, `reports-intro`), sans CSS ajouté.

### Accroches

1. `Agent harnesses that move between models` (appliquée)
2. `Your agents, your data, your choice of model`
3. `Deploy AI agents without betting on a single vendor`

### Meta

- `<title>` et `og:title` : `Jared — Sovereign AI agents and portable harnesses`
- `description` et `og:description` : `AI agent harnesses built to move from one model to another, with an evaluation bench to measure the swap. You keep control of your data, model and vendor.`

## Projets retenus

| # | Titre | Badge | `lastUpdated` |
|---|---|---|---|
| 1 | Second Brain | Tool (`badge-tool`) | 2026-10-09 |
| 2 | Modular Multi-Agent Harness | AI (`badge-ai`) | 2026-09-08 |
| 3 | Model-Swap Evaluation Bench | Auto (`badge-auto`) | 2026-10-09 |
| 4 | C Learning Skills | AI (`badge-ai`) | 2026-10-05 |

Aucune carte n'a de `timeSaved`, d'`image` ni de `github_url` : pas de chiffre mesuré, pas de dépôt public. `links` reste un tableau vide.

Projets retirés des cartes, déplacés dans la timeline : Shopify Store Duplicator, Shopify Product Page Optimizer, Automated Market Newsletter. Leurs fichiers `.pdf` et `.json` restent à la racine.

## Périmètre

Modifiés : `index.html` (textes et section `#about`), `data/projects.json`, cette spec.

Non modifiés : `assets/css/style.css`, `assets/js/main.js`, `CLAUDE.md`, `data/timeline.json`, les PDF, les images.

## Confidentialité

Ce dépôt est déployé en entier par GitHub Pages : cette spec est publique. Aucune donnée personnelle dans `index.html`, `data/projects.json` ni ici. Aucun lien vers un dépôt non public.

Les quatre skills C sont décrites par leur rôle (lesson, debug, explain, statement), sans leur nom de commande.

## Critères de réussite

1. Le hero dit en une lecture : harnais portable, mesuré, sans fournisseur unique.
2. Aucun texte visible en français.
3. Aucune donnée personnelle dans `index.html` ni `data/projects.json`.
4. La carte du banc porte la mention de sa limite actuelle.
5. La CI passe : `index.html` présent, JS, CSS et HTML valides.
