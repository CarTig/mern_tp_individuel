
RESTITUTION DU TRAVAIL PRATIQUE 

INTRODUCTION
Comment installer et lancer le projet
* le front
initialisation du projet en react
  npm create vite@latest front -- --template react
* le back
création de l'architecture

ROADMAP DU TD

1. Système d'authentification
   ✅ Inscription + validation des données + redirection home ==> Fonctionnel
   ✅ Connexion ==> Fonctionnel (ajouter la redirection vers ads quand la partie ads sera finie)
   ✅ Update + delete + afficher utilisateur ==> Fonctionnel

2. Pages obligatoires
   ✅ Page inscription ==>  Fonctionnel
   ✅ Page de connexion ==> Fonctionnel


3. CRUD sur les annonces
   ✅ Voir toutes les annonces  ==> Fonctionnel
   ✅ Ajouter, modifier  ==> Fonctionnel
   ⌛ ❌ ou supprimer des annonces  ==> non Fonctionnel


LES TECHNO
stack MERN axios



CLONNAGE DU PROJET

Cloner le dépôt : https://github.com/CarTig/mern_tp_individuel.git

git clone 
Installer les dépendances :
Dans le dossier racine du projet :

cd backend
npm install
Puis dans le dossier frontend :

cd frontend
npm install
Configuration : Dans votre dossier backend, créez un fichier .env et ajoutez les variables d'environnement suivantes :

Dans le .env
JWT_SECRET=sLeZHsP333***

Démarrage
Démarrer le serveur :
Dans le dossier backend du projet :

npm run dev
Démarrer le client : Dans le dossier frontend du projet :

npm run dev
Accéder à l'application : Le frontend sera disponible sur http://localhost:5175