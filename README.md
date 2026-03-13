 Guide de Lancement du Projet Deal Template

1. Le Backend (FastAPI + MongoDB)

Le backend gère la logique de l'Adapter et la connexion à la base de données.

Installation des dépendances

Ouvre un terminal dans le dossier `backend` :

powershell taper: python -m pip install "fastapi[all]" uvicorn pymongo

Initialisation de la base de données

Avant de lancer l'API, remplissez votre MongoDB avec les données de test (Deals et Templates) :

powershell taper: python db.py

Lancement du serveur

Démarrez le serveur avec le rechargement automatique activé :

powershell taper: python -m uvicorn main:app --reload

API URL : `http://localhost:8000/`
Swagger UI :`http://localhost:8000/docs`

2. Le Frontend (React + Vite)

L'interface utilisateur moderne pour visualiser les différents templates.

Installation et Configuration**

Ouvre un nouveau terminal dans le dossier `frontend` :

powershell taper:  npm install react-router-dom axios

Installez toutes les autres dépendances du package.json

npm install

Lancement de l'interface

powershell taper: npm run dev

Local URL : `http://localhost:5173/`
