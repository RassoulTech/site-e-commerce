# E-Shop - Site E-commerce

Un site e-commerce complet développé avec HTML, Tailwind CSS et JavaScript vanilla.

## 🚀 Fonctionnalités

### Pages disponibles
- **Page d'accueil** (`index.html`) : Bannière hero animée, section "À propos", catégories de produits, produits populaires
- **Page boutique** (`shop.html`) : Grille de produits avec filtres par catégorie
- **Page panier** (`cart.html`) : Gestion du panier avec modification des quantités et calcul du total
- **Page contact** (`contact.html`) : Formulaire de contact avec validation
- **Page FAQ** (`faq.html`) : Questions fréquentes avec recherche et accordéon
- **Page Services** (`services.html`) : Services proposés avec animations et modales

## Fonctionnalités JavaScript

### Générales
- **Gestion du panier** : Ajout, suppression et modification des quantités
- **Stockage local** : Persistance des données du panier dans localStorage
- **Menu mobile** : Navigation responsive avec menu hamburger
- **Notifications** : Messages de confirmation pour les actions utilisateur

### Boutique
- **Recherche** : Barre de recherche en temps réel pour trouver rapidement les produits
- **Filtres** : Cliquez sur les boutons de catégorie pour filtrer les produits
- **Tri** : Options de tri par prix, nom et pertinence
- **Vues** : Basculement entre vue grille et vue liste
- **Favoris** : Ajout/retrait des produits aux favoris
- **Ajout au panier** : Cliquez sur "Ajouter" pour ajouter un produit au panier
- **Notifications** : Confirmation visuelle lors de l'ajout au panier
- **Compteur de résultats** : Affichage du nombre de produits trouvés
- **Produits HTML** : Tous les produits sont maintenant directement en HTML pour de meilleures performances

### Panier
- **Affichage dynamique** : Liste des produits ajoutés avec images et détails
- **Modification des quantités** : Boutons +/- pour ajuster les quantités
- **Suppression** : Bouton pour retirer un produit du panier
- **Calcul automatique** : Total mis à jour en temps réel
- **Vide panier** : Option pour supprimer tous les produits

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **Tailwind CSS** : Framework CSS utilitaire (via CDN)
- **JavaScript Vanilla** : Logique métier et interactions
- **Font Awesome** : Icônes (via CDN)
- **Unsplash** : Images de produits (via API)

## 📁 Structure du projet

```
site-e-commerce/
├── index.html          # Page d'accueil
├── shop.html           # Page boutique
├── cart.html           # Page panier
├── contact.html        # Page contact
├── faq.html            # Page FAQ
├── services.html       # Page Services
├── js/
│   ├── products.js     # Données des produits
│   ├── cart.js         # Gestion du panier
│   ├── index.js        # Script page d'accueil
│   ├── shop.js         # Script page boutique
│   ├── contact.js      # Script page contact
│   ├── faq.js          # Script page FAQ
│   └── services.js     # Script page Services
├── css/
│   └── styles.css      # Styles globaux et animations
└── README.md           # Ce fichier
```

## 🚀 Comment lancer le site

### Méthode 1 : Serveur local simple
1. Ouvrez un terminal dans le dossier `site-e-commerce`
2. Lancez un serveur HTTP local :

**Avec Python :**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Avec Node.js :**
```bash
# Installer serve globalement
npm install -g serve

# Lancer le serveur
serve -p 8000
```

**Avec PHP :**
```bash
php -S localhost:8000
```

3. Ouvrez votre navigateur et allez à `http://localhost:8000`
### Méthode 2 : Extension Live Server (VS Code)
1. Installez l'extension "Live Server" dans VS Code
2. Clic droit sur `index.html`
3. Sélectionnez "Open with Live Server"

### Méthode 3 : Double-clic (non recommandé)
Vous pouvez ouvrir directement `index.html` dans votre navigateur, mais certaines fonctionnalités peuvent ne pas fonctionner correctement à cause des restrictions CORS.

## 🛍️ Utilisation du site

### Navigation
- **Navbar** : Navigation entre les pages avec compteur du panier
- **Menu mobile** : Version responsive pour les petits écrans

### Boutique
- **Recherche** : Barre de recherche en temps réel pour trouver rapidement les produits
- **Filtres** : Cliquez sur les boutons de catégorie pour filtrer les produits
- **Tri** : Options de tri par prix, nom et pertinence
- **Vues** : Basculement entre vue grille et vue liste
- **Favoris** : Ajout/retrait des produits aux favoris
- **Ajout au panier** : Cliquez sur "Ajouter" pour ajouter un produit au panier
- **Notifications** : Confirmation visuelle lors de l'ajout au panier
- **Compteur de résultats** : Affichage du nombre de produits trouvés

### Panier
- **Modification des quantités** : Utilisez les boutons +/- pour ajuster les quantités
- **Suppression** : Cliquez sur l'icône poubelle pour supprimer un article
- **Calcul automatique** : Le total se met à jour automatiquement
- **Livraison gratuite** : Au-dessus de 100€ d'achat

### Contact
- **Validation** : Le formulaire valide les champs en temps réel
- **Messages d'erreur** : Affichage des erreurs de validation
- **Compteur de caractères** : Suivi en temps réel de la longueur du message
- **Validation téléphone** : Vérification du format du numéro de téléphone
- **Newsletter** : Option d'inscription à la newsletter
- **Historique** : Sauvegarde des derniers contacts dans localStorage
- **Confirmation** : Message de succès détaillé après envoi
- **Animations** : Effets visuels et transitions fluides

### FAQ
- **Recherche** : Barre de recherche pour trouver rapidement les questions
- **Accordéon** : Cliquez sur les questions pour voir les réponses
- **Catégories** : Questions organisées par thème

### Services
- **Animations** : Effets visuels au survol des cartes de services
- **Modales** : Fenêtres popup pour confirmer les commandes de services
- **Interactions** : Boutons avec animations et feedback visuel

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à tous les écrans :
- **Desktop** : Navigation complète avec grille de produits
- **Tablet** : Adaptation de la grille et du menu
- **Mobile** : Menu hamburger et grille en colonne unique

## 🎨 Design

- **Couleurs** : Palette bleue moderne avec accents
- **Typographie** : Police système avec hiérarchie claire
- **Animations** : Transitions fluides et micro-interactions
- **Icônes** : Font Awesome pour une cohérence visuelle

## 🔧 Personnalisation

### Ajouter des produits
Modifiez le fichier `js/products.js` pour ajouter, modifier ou supprimer des produits.

### Changer les couleurs
Modifiez les classes Tailwind CSS dans les fichiers HTML pour changer la palette de couleurs.

### Modifier les fonctionnalités
Chaque page a son propre fichier JavaScript pour une maintenance facile.

## 🌐 Compatibilité

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📝 Notes

- Les images proviennent d'Unsplash et sont optimisées pour le web
- Le panier est stocké dans le localStorage du navigateur
- Le formulaire de contact simule l'envoi (pas de backend réel)
- Tous les prix sont en euros (fr)

## 🤝 Contribution

Ce projet est un exemple d'e-commerce fonctionnel. Vous pouvez :
- Ajouter de nouvelles fonctionnalités
- Améliorer le design
- Optimiser les performances
- Ajouter des tests

---

**Développé avec ❤️ en HTML, CSS et JavaScript vanilla** 