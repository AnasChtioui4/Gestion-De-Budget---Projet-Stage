# Gestion De Budget

Une application web de gestion de budget développée dans le cadre d'un stage à **Attijariwafa Bank**. L'application permet de créer des projets, de leur assigner un budget, d'ajouter des ressources avec leur coût individuel, et de suivre le budget restant en temps réel avec des indicateurs de statut automatiques.

> 🎓 Projet de stage — BTS DAI, développé par **Anas Chtioui**
> Encadré par **Mr. El Jilani**

---

## 📋 Aperçu

**Gestion De Budget** permet de suivre les budgets de projets en offrant la possibilité de :
- Créer un projet avec un nom et un budget total
- Ajouter des ressources individuelles, chacune avec son propre coût
- Voir le budget restant et le statut se mettre à jour en temps réel à mesure que des ressources sont ajoutées
- Visualiser tous les projets sur un tableau de bord unique avec recherche et tri

L'interface est en français, conformément au contexte de l'outil interne pour lequel elle a été développée.

---

## ✨ Fonctionnalités

- **Création de projets** avec un nom, un budget total, et une liste dynamique de ressources
- **Calcul du budget en direct** — le budget restant et le statut se mettent à jour instantanément à chaque ajout ou modification de ressource, sans rechargement de page
- **Détection automatique du statut** — chaque projet est marqué comme :
  - 🟢 **Bien !** — budget sain
  - 🟠 **Attention** — budget restant inférieur à 20%
  - 🔴 **Dépassé !** — budget dépassé
- **Barre de progression visuelle** montrant l'utilisation du budget par projet
- **Modale de confirmation de suppression** pour éviter les pertes de données accidentelles
- **Tableau de bord responsive** sous forme de cartes affichant tous les projets en un coup d'œil
- **Recherche et tri** *(en cours de développement)*

---

## 🛠️ Stack Technique

Actuellement développé avec :
- **HTML5**
- **CSS3** (variables CSS personnalisées, sélecteurs imbriqués)
- **JavaScript natif** (manipulation du DOM, sans framework pour l'instant)

### Migration prévue
Ce projet est en cours de reconstruction progressive avec :
- **React** — frontend
- **Java** — backend

La version en JavaScript natif sert de prototype fonctionnel pour valider la logique et l'UI/UX avant la réécriture en React + Java, conformément au périmètre technique demandé par le stage.

---

## 📁 Structure du Projet

```
├── index.html          # Page principale du tableau de bord
├── style.css             # Styles globaux, variables de thème, styles des modales
├── script.js               # Logique de l'application : état, affichage, calculs
└── assets/
    ├── images/            # Logo et images statiques
    └── fonts/               # Fichiers de police Poppins & Inter
```

---

## 🚀 Démarrage

Aucun outil de build ni dépendance requis — il s'agit d'un site statique.

1. Cloner le dépôt
   ```bash
   git clone https://github.com/votre-nom-utilisateur/gestion-de-budget.git
   ```
2. Ouvrir `index.html` directement dans un navigateur, ou le servir avec un serveur local (ex. l'extension Live Server sur VS Code)

---

## 🗺️ Feuille de Route

- [x] Formulaire de création de projet avec calcul de budget en direct
- [x] Liste de ressources dynamique (ajout/suppression)
- [x] Badges de statut (Bien! / Attention / Dépassé!)
- [x] Modale de confirmation de suppression
- [x] Fonctionnalité de recherche
- [x] Menu de tri (A-Z, Z-A, Budget)
- [ ] Modification des projets existants
- [ ] Persistance des données (localStorage)
- [ ] Migration vers React (frontend)
- [ ] Migration vers Java (backend)

---

## 👤 Auteur

**Anas Chtioui**
BTS DAI (Développement des Applications Informatiques) — Lycée Qualifiant AlKendi, Casablanca
Stagiaire chez Attijariwafa Bank

---

## 📄 Licence

Ce projet a été développé à des fins de stage interne chez Attijariwafa Bank.
