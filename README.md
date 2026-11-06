# Auchan
Brief
# 🛒 Tchouri — Marketplace du Tchad et du Sahel

Tchouri est une application e-commerce **front-end** qui propose des produits du Tchad et du Sahel, complétés par des produits connus dans le monde entier. Elle fonctionne sans serveur : le catalogue est chargé depuis un fichier JSON local et le panier est conservé dans le navigateur.

Projet réalisé dans le cadre du **Sprint II (Brief 2 : « Auchan & Co 2026 »)** de la formation YouCode.

> Les produits, les prix, les adresses et les coordonnées affichés sur le site sont **fictifs** et servent uniquement à la démonstration.

## 🔗 Liens

- **Démo en ligne :** _à compléter (lien Vercel ou GitHub Pages)_
- **Tableau de planification :** _à compléter (lien du GitHub Project « Auchan & Co 2026 »)_

![Aperçu du site](assets/img/screenshot.png)
<!-- Ajoute une capture d'écran du site à cet emplacement, puis supprime ce commentaire. -->

## ✨ Fonctionnalités

<!-- Supprime les lignes des fonctionnalités qui ne sont pas terminées. Le README doit décrire ce qui marche vraiment. -->

- **Catalogue dynamique** : 50 produits répartis en 8 catégories, chargés avec `fetch()` depuis `data/data.json`.
- **Affichage Liste / Grille** : bascule instantanée grâce aux classes utilitaires de Tailwind.
- **Recherche** : filtrage instantané des produits par nom.
- **Filtres par catégorie** : combinables avec la recherche.
- **Pagination** : 8 produits maximum par page.
- **Panier en Drag & Drop** : on glisse un produit vers la zone panier.
- **Gestion intelligente du panier** : détection des doublons, modification des quantités, suppression d'une ligne, total calculé en FCFA.
- **Persistance** : le panier est sauvegardé dans le `localStorage` et restauré au rechargement de la page.
- **Page « Contactez-nous »** : formulaire sécurisé par des vérifications Regex sur tous les champs.
- **Design Mobile-First** : interface responsive (mobile, tablette, ordinateur).

## 🧰 Technologies

| Domaine | Outils |
|---|---|
| Structure et style | HTML5, Tailwind CSS v4 (CDN) |
| Logique | JavaScript Vanilla ES6+ (modules, `async/await`, `map`, `filter`, `find`, `some`, `reduce`, `slice`) |
| Données | Fichier JSON, API Fetch, `localStorage` |
| Versionnement | Git, GitHub (branches, Pull Requests) |
| Planification | GitHub Projects (tableau Kanban, milestones) |
| Déploiement | _Vercel ou GitHub Pages (à compléter)_ |

## 📁 Structure du projet

```
auchan/
├── index.html            # Page principale (catalogue et panier)
├── contact.html          # Page « Contactez-nous »
├── assets/
│   └── img/
│       ├── Tchouri-Logo.png
│       └── products/     # Images des produits
├── css/
│   └── style.css
├── data/
│   └── data.json         # Catalogue initial (base de données locale)
└── js/
    ├── main.js           # Point d'entrée : orchestre les modules
    ├── api.js            # Chargement du catalogue avec fetch()
    ├── products.js       # Recherche, filtres, pagination
    ├── cart.js           # Logique du panier (doublons, quantités, total)
    ├── dragDrop.js       # Événements du Drag & Drop
    ├── storage.js        # Sauvegarde et lecture dans le localStorage
    ├── ui.js             # Affichage dans le DOM (cartes, panier)
    └── validation.js     # Vérifications Regex du formulaire
```
<!-- Adapte cet arbre à ce que contient réellement ton dépôt (par exemple categorie.html si tu l'utilises). -->

## 🧩 Architecture JavaScript

Le code est découpé en **modules ES6** (`import` / `export`) pour séparer les responsabilités :

- `api.js` ne s'occupe que de récupérer les données.
- `products.js` et `cart.js` contiennent la logique métier, sans toucher au DOM.
- `ui.js` est le seul module qui écrit dans le DOM.
- `storage.js` isole tout ce qui touche au `localStorage`.

## 🗂️ Format des données

`data/data.json` est un objet contenant un tableau `products` :

```json
{
  "products": [
    {
      "id": 1,
      "name": "Mil décortiqué du Sahel",
      "category": "Épicerie & Alimentation",
      "price": 2500,
      "image": "assets/img/products/product-01.jpg",
      "description": "Céréale appréciée dans plusieurs cuisines sahéliennes.",
      "origin": "Tchad"
    }
  ]
}
```

Les prix sont exprimés en **FCFA** et stockés sous forme de nombres.

## ▶️ Lancer le projet en local

L'application utilise `fetch()` et les modules ES6 : elle **ne fonctionne pas en ouvrant `index.html` directement** (protocole `file://`). Il faut un serveur local.

**Avec VS Code :**
1. Installer l'extension **Live Server**.
2. Clic droit sur `index.html`, puis **Open with Live Server**.

**Avec Python :**
```bash
python -m http.server 5500
```
Puis ouvrir `http://127.0.0.1:5500`.

## 🌿 Organisation du travail

- **Branches :** `main` (version stable), `develop` (intégration), une branche `features/...` par fonctionnalité.
- **Pull Requests :** chaque fonctionnalité est fusionnée dans `develop` via une PR qui référence l'issue (`Closes #n`).
- **Commits :** format Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `chore:`).
- **Planification :** un milestone par challenge (C1 à C8) et un tableau Kanban GitHub Projects avec priorité, taille et estimation pour chaque issue.

## 📚 Concepts du Sprint II

Modules ES6, API Fetch et asynchronisme, méthodes de tableaux (`map`, `filter`, `find`, `some`, `reduce`, `slice`), Drag & Drop (`dataTransfer`), sérialisation JSON et `localStorage`, expressions régulières.

La documentation détaillée est disponible ici : _à compléter (lien vers ton fichier de concepts)_.

## 🚧 Difficultés rencontrées et pistes d'amélioration

<!-- Section utile pour la soutenance : note 2 ou 3 vrais obstacles rencontrés et comment tu les as résolus, puis 2 ou 3 améliorations possibles. -->

- _À compléter._

## 👤 Auteur

**Mahamat** — [@Mous-ab](https://github.com/Mous-ab)