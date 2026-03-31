---
description: Checklist de pré-déploiement pour sites web statiques. Utilisé automatiquement quand le sujet du déploiement est abordé.
argument-hint: "[check|fix]"
---

# Checklist de déploiement - Site statique

Quand l'utilisateur invoque cette commande ou parle de déploiement, applique cette checklist :

## Si $ARGUMENTS contient "check" ou est vide - Mode audit

Vérifie chaque point et produis un rapport OK/KO :

### Fichiers
- [ ] index.html existe à la racine
- [ ] Tous les chemins de fichiers sont relatifs (pas de chemins absolus)
- [ ] Pas de fichiers temporaires (.DS_Store, Thumbs.db, node_modules)

### HTML
- [ ] Doctype HTML5 déclaré
- [ ] Attribut lang défini
- [ ] Meta charset UTF-8
- [ ] Meta viewport pour mobile
- [ ] Title défini et descriptif
- [ ] Meta description présente
- [ ] Favicon configuré

### CSS
- [ ] Pas de !important inutiles
- [ ] Media queries fonctionnelles (mobile, tablette, desktop)
- [ ] Pas de règles CSS inutilisées

### JavaScript
- [ ] Pas d'erreurs dans la console
- [ ] Pas de console.log() oublié en production
- [ ] Scripts chargés avec defer ou en fin de body

### Performance
- [ ] Images optimisées (pas de fichiers > 500KB)
- [ ] CSS minifiable
- [ ] JavaScript minifiable

### Accessibilité
- [ ] Score du subagent accessibility-checker > 7/10

## Si $ARGUMENTS contient "fix" - Mode correction

Corrige automatiquement tous les points KO de la checklist.
