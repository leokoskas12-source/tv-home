# tv-home

Ecran d'accueil personnalise pour TV Samsung Tizen, sous forme de module TizenBrew (type `app`).

## Installation
Sur la TV : TizenBrew -> Module Manager -> ajouter le module GitHub `UTILISATEUR/tv-home`.

## Personnalisation
Edite `app/config.js` : tuiles (modules TizenBrew, menu des sources), image de fond (`bg.jpg` placee dans `app/`).

## Version native (dossier `wgt/`)
App Tizen signee, avec acces a l'API Tizen (lancement d'apps, source). A signer avec ton propre profil
Samsung puis installer : `tizen package -t wgt -s <profil> -- wgt` puis `tizen install -n <fichier>.wgt -t <tv>`.
