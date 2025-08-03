// Script pour la page boutique
document.addEventListener('DOMContentLoaded', function() {
    // Charger tous les produits
    loadProducts();
    
    // Initialiser le panier
    initCart();
    
    // Initialiser les filtres
    initFilters();
    
    // Initialiser la recherche
    initSearch();
    
    // Initialiser le tri
    initSorting();
    
    // Initialiser les vues
    initViewToggle();
    
    // Gestion du menu mobile
    initMobileMenu();
});

// Variables globales
let currentProducts = [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'default';
let currentView = 'grid';

// Charger les produits
function loadProducts(category = 'all', searchTerm = '', sortBy = 'default') {
    const productsGrid = document.getElementById('products-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    const noResults = document.getElementById('no-results');
    
    if (!productsGrid) return;

    // Afficher le spinner
    loadingSpinner.classList.remove('hidden');
    productsGrid.classList.add('hidden');
    noResults.classList.add('hidden');

    // Simuler un délai de chargement
    setTimeout(() => {
        // Récupérer tous les produits HTML
        const productCards = productsGrid.querySelectorAll('.product-card');
        let visibleProducts = [];
        
        // Filtrer les produits selon les critères
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardName = card.getAttribute('data-name');
            const cardPrice = parseFloat(card.getAttribute('data-price'));
            
            // Vérifier la catégorie
            const categoryMatch = category === 'all' || cardCategory === category;
            
            // Vérifier la recherche
            const searchMatch = !searchTerm || 
                cardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.querySelector('p').textContent.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (categoryMatch && searchMatch) {
                visibleProducts.push({
                    element: card,
                    name: cardName,
                    price: cardPrice,
                    category: cardCategory
                });
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Trier les produits
        visibleProducts = sortProducts(visibleProducts, sortBy);
        
        // Réorganiser les éléments dans le DOM selon le tri
        visibleProducts.forEach(product => {
            productsGrid.appendChild(product.element);
        });
        
        // Mettre à jour le compteur
        updateResultsCount(visibleProducts.length);
        
        // Afficher les résultats
        if (visibleProducts.length === 0) {
            noResults.classList.remove('hidden');
            productsGrid.classList.add('hidden');
        } else {
            productsGrid.classList.remove('hidden');
        }
        
        loadingSpinner.classList.add('hidden');
        currentProducts = visibleProducts;
    }, 300);
}

// Trier les produits
function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return products;
    }
}

// Mettre à jour le compteur de résultats
function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = count;
    }
}

// Initialiser le panier
function initCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Initialiser les filtres
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-white', 'text-blue-600', 'shadow-lg');
                btn.classList.add('bg-white', 'bg-opacity-20', 'text-white');
            });
            
            // Ajouter la classe active au bouton cliqué
            this.classList.remove('bg-white', 'bg-opacity-20', 'text-white');
            this.classList.add('bg-white', 'text-blue-600', 'shadow-lg');
            
            // Charger les produits filtrés
            const category = this.getAttribute('data-category');
            currentCategory = category;
            loadProducts(category, currentSearch, currentSort);
        });
    });
}

// Initialiser la recherche
function initSearch() {
    const searchInput = document.getElementById('product-search');
    let searchTimeout;
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.trim();
            currentSearch = searchTerm;
            
            searchTimeout = setTimeout(() => {
                loadProducts(currentCategory, searchTerm, currentSort);
            }, 300);
        });
    }
}

// Initialiser le tri
function initSorting() {
    const sortSelect = document.getElementById('sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            currentSort = sortBy;
            loadProducts(currentCategory, currentSearch, sortBy);
        });
    }
}

// Initialiser les vues
function initViewToggle() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');
    
    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.addEventListener('click', function() {
            currentView = 'grid';
            updateViewButtons();
            updateProductsView();
        });
        
        listViewBtn.addEventListener('click', function() {
            currentView = 'list';
            updateViewButtons();
            updateProductsView();
        });
    }
}

// Mettre à jour les boutons de vue
function updateViewButtons() {
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    
    if (currentView === 'grid') {
        gridViewBtn.classList.add('bg-blue-600', 'text-white');
        gridViewBtn.classList.remove('bg-gray-200', 'text-gray-600');
        listViewBtn.classList.remove('bg-blue-600', 'text-white');
        listViewBtn.classList.add('bg-gray-200', 'text-gray-600');
    } else {
        listViewBtn.classList.add('bg-blue-600', 'text-white');
        listViewBtn.classList.remove('bg-gray-200', 'text-gray-600');
        gridViewBtn.classList.remove('bg-blue-600', 'text-white');
        gridViewBtn.classList.add('bg-gray-200', 'text-gray-600');
    }
}

// Mettre à jour la vue des produits
function updateProductsView() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid && currentProducts.length > 0) {
        // Appliquer les classes de vue aux éléments existants
        currentProducts.forEach(product => {
            const card = product.element;
            if (currentView === 'list') {
                card.classList.add('md:flex', 'md:items-center');
                const img = card.querySelector('img');
                if (img) {
                    img.classList.remove('w-full', 'h-48');
                    img.classList.add('md:w-32', 'md:h-32');
                }
            } else {
                card.classList.remove('md:flex', 'md:items-center');
                const img = card.querySelector('img');
                if (img) {
                    img.classList.remove('md:w-32', 'md:h-32');
                    img.classList.add('w-full', 'h-48');
                }
            }
        });
    }
}

// Réinitialiser les filtres
function resetFilters() {
    currentCategory = 'all';
    currentSearch = '';
    currentSort = 'default';
    
    // Réinitialiser l'interface
    document.getElementById('product-search').value = '';
    document.getElementById('sort-select').value = 'default';
    
    // Réinitialiser les boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn, index) => {
        if (index === 0) {
            btn.classList.add('bg-white', 'text-blue-600', 'shadow-lg');
            btn.classList.remove('bg-white', 'bg-opacity-20', 'text-white');
        } else {
            btn.classList.remove('bg-white', 'text-blue-600', 'shadow-lg');
            btn.classList.add('bg-white', 'bg-opacity-20', 'text-white');
        }
    });
    
    loadProducts();
}

// Basculer les favoris
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        showNotification('Produit retiré des favoris', 'warning');
    } else {
        favorites.push(productId);
        showNotification('Produit ajouté aux favoris', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Ajouter au panier
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = getProductById(productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mettre à jour l'affichage du panier
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Afficher une notification
    showNotification('Produit ajouté au panier !');
}

// Afficher une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
    const icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialiser le menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
} 