# MCD

// Work in progress 

## Entities

<!-- TAble utilisateur -->
### User

- pseudo
- email
- password
- avatar
- favorite_role
- description

<!-- Statistiques des joueurs -->
<!-- Entrée qui se crée en même temps qu'un utilisateur -->
### Stats

- player_id
- hosted_parties
- played_parties
- won_parties
- won_as_village
- won_as_werewolf
- won_as_solo
- won_as_lovers
- death_by_werewolf
- death_by_hunter
- death_by_witch
- death_by_vote
- captain
- (Tous les roles)

<!-- Messages entre utilisateurs-->
### Message

- body
- user_id
- created_at

<!-- Partie en cours -->
### Game

- id
- description
- link
- address
- active
- open
- number players
- max_number_players
- configuration

<!-- Cartes crées par les utilisateurs -->
### User_creations

- id
- name (nom de la carte)
- description
- category_id
- user_id

<!-- Catégories des cartes -->
### Card_category

- id
- name

### A VENIR
