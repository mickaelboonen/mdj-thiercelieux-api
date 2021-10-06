# CAHIER DES CHARGES

// WIP

## PRESENTATION DU PROJET

Toi aussi t'es toujours le Maître du Jeu quand tu joues aux Loups-Garous de Thiercelieux ? T'aimerais bien incarner la Sorcière, un Loup ou même un Simple Villageois mais personne à part toi ne peut faire le Maître du Jeu ? Alors cette appli va enfin changer la donne ! Grace au Guide 100% interactif du MdJ, n'importe qui peut maintenant remplir le rôle de MdJ sans risquer de faire foirer les parties et te permettre de profiter pleinement du jeu. Il n'y a qu'à se laisser bercer par l'application qui guidera vos pas tout au long de la partie sans risque de fausse note. Plus besoin de se soucier du côté technique, le seul job sera de trouver les mots justes pour installer une ambiance propice au jeu, au bluff et à la trahison.

## MVP

### Profil

- Création de profil
- Affichage du profil
- Edition du profil
- Suppression du profil
- Accéder au profil d'un joueur pour voir ses statistiques
- Envoyer des MP à d'autres joueurs
- Personnalisation d'une partie :

  - rajout de carte nouvelle lune
  - changement de l'ordre de jeu
  - enregistrement des préférences d'ordre
  - rajout de role (possible évolution)

### Partie

- Lancement d'une partie de Loup-Garou
- Possibilité d'ajouter des joueurs non inscrits à la partie (pas d'enregistrement des stats)
- POssibilité d'ajouter des joueurs inscrits à la partie
- Possibilité de choisir la configuration classique ou sa préférence
- Possibilité de choisir la ou les extensions à rajouter
- Attribution des roles manuellement mais aussi aléatoirement par l'appli
- Déroulement du jeu avec les phases nocturnes et diurnes avec enregistrement de toutes les actions
- Enregistrement des statistiques des joueurs  à la fin de la partie

### Recherche de partie (Évolution)

- Possibilité de créer une annonce pour une partie à venir pour trouver des joueurs dans sa ville
- Géolocalisation de l'annonce
- Possibilité de rechercher les parties qui se jouent dans sa ville
- Possibilité de supprimer une annonce
- Possibilité de valider / archiver une annonce

### Informations

- Page explicative des rôles
- Page explicative des extensions
- Affichage des quelques rôles aléatoirement sur la home
- Affichage de la team dans une page Qui sommes-nous ?
- Affichage du principe du site sur la home

### Backoffice

- Gestion des utilisateurs (CRUD)
- Gestion des New Moon (CRUD)
- Gestion des Rôles (CRUD)
- Gestion du Village (CRUD)

## CIBLES ET TECHNOS

### Cible

Pour les connaisseurs du jeu mais aussi les novices, l'appli permet de prendre le jeu en main avec facilité. Pensé mobile first, l'application accompagne le MdJ pendant ses parties de LGT pour qu'il puisse garder sa mobilité. Mode tablette important aussi.

### Technologies

#### Front

React - React Router - Redux - React Redux - Redux Persist - React Leaflet - Axios - React Form

#### Api

NodeJS - Express.JS - MySQL

#### BackOffice

PHP - Bootstrap

### Navigateurs compatibles

Les principaux

## ROUTES

### front

- "/" : accueil
- "/signin" :
- "/signup" :
- "/user/:id" :
- "/community" : Page qui affiche la liste d'amis et la possibilité de rechercher un utilisateur avec son pseudo
- "/the-game/expansions" :
- "/the-game/expansions/:slug" :
- "/the-game/roles" :
- "/the-game/roles/:slug" :
- "/game-configuration?step=:id" : Pages de configuration de la partie
- "/game-launching" : Page d'animation CSS qui lance le jeu
- "/game" : page du jeu
- "/who-are-we" : Page qui sommes-nous ?
- Évolution
  - "/games" : Affiche la map et les différentes parties programmées + la liste + la possibilité de lancer le processus de création de partie
  - "/games/create-game" : Création d'une annonce de partie

### back

- "/admin/" = Dashboard admin
- "/admin/login" = Page de connexion
- "/admin/users/" : Liste des utilisateur
- "/admin/users/add" :  Ajout d'un utilisateur
- "/admin/users/edit" : Modification d'un utilisateur
- "/admin/users/delete" : Suppression d'un utilisateur
- "/admin/new-moon-cards/" : Liste des cartes Nouvelle Lune
- "/admin/new-moon-cards/add" :  Ajout de carte Nouvelle Lune
- "/admin/new-moon-cards/edit" : Modification de carte Nouvelle Lune
- "/admin/new-moon-cards/delete" : Suppression de carte Nouvelle Lune
- "/admin/roles/" : Liste des rôles
- "/admin/roles/add" :  Ajout de rôle
- "/admin/roles/edit" : Modification de rôle
- "/admin/roles/delete" : Suppression de rôle
- "/admin/village/" : Liste des bâtiments du village
- "/admin/village/add" :  Ajout d'un bâtiment du village
- "/admin/village/edit" : Modification d'un bâtiment du village
- "/admin/village/delete" : Suppression d'un bâtiment du village
- "/admin/expansions/" : Liste des extensions
- "/admin/expansions/add" :  Ajout d'une extension
- "/admin/expansions/edit" : Modification d'une extension
- "/admin/expansions/delete" : Suppression d'une extension
- Évolution
  - "/admin/games/" : Liste des parties
  - "/admin/games/add" :  Ajout d'une partie
  - "/admin/games/edit" : Modification d'une partie
  - "/admin/games/delete" : Suppression d'une partie

### api

- GET :
  - ""

- POST :
  - ""

- PATCH :
  - ""

- PUT :
  - ""

- DELETE :
  - ""

## ROLES

### Agile

Product Owner : Micka

### Utilisateurs

- GameManager : Peut CRUD tout ce qui a rapport au jeu (roles, cartes, etc)
- Admin : GameManager + Peut CRUD les users

## MCD

[exemple](https://docs.google.com/drawings/d/1ZJECrhMYz1Ghb2-GynS9jD3vJugE_2JgyMir6o-CtIk/edit)

## GITHUB

[github](https://github.com/mickaelboonen/mdj-thiercelieux)

## USER STORIES

[lien du trello](https://trello.com/invite/b/RFmwat5S/e90842d86bde297f23ab6be8640a755f/mdj-de-thiercelieux)

## WIREFRAMES

[WF mobile first](https://whimsical.com/mobile-first-BpneGmNqjyFqCPRJ6BFAGR)
