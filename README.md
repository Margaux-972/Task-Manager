# Application de gestion de tâches

## Présentation

Application frontend de gestion de tâches développée en TypeScript. Elle permet de créer, modifier et supprimer des tâches, de suivre leur avancement et de les organiser selon leur priorité.

Les données sont persistées dans le navigateur grâce à localStorage, sans backend ni base de données.

## Fonctionnalités

- Gestion des tâches : création, affichage, modification et suppression.
- Suivi de progression : gestion des statuts À faire, En cours et Terminée.
- Gestion des priorités : définition du niveau d'importance des tâches.
- Filtres : filtrage des tâches par statut et par priorité.
- Persistance des données : conservation des tâches entre les sessions grâce à localStorage.

## Organisation du code

Le projet vise à séparer les responsabilités afin de faciliter la maintenance et les évolutions futures :

- Composants UI : affichage des tâches et interactions avec l'utilisateur.
- Logique métier : création, modification, suppression et gestion des statuts.
- Gestion des états : mise à jour de l'interface en fonction des modifications.
- Persistance : sauvegarde et récupération des tâches via localStorage.
  Cette organisation permet de conserver un code lisible et évolutif.

# Technologies

- TypeScript
- HTML / CSS
- localStorage

## Installation

Prérequis

- Node.js
- npm
  Étapes
  Cloner le dépôt :
  git clone https://github.com/Margaux-972/Task-Manager

Accéder au projet :
cd Task-Manager

Installer les dépendances :
npm install

Lancer le serveur de développement :
npm run dev

## Améliorations futures

Ajouter des catégories ou des projets pour regrouper les tâches.
Mettre en place une base de données pour centraliser la sauvegarde des données.
