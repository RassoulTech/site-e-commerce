// Gestion du panier avec localStorage
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.updateCartSummary();
    }

    // Charger le panier depuis localStorage
    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    // Sauvegarder le panier dans localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Ajouter un produit au panier
    addToCart(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const product = getProductById(productId);
            if (product) {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartSummary();
        this.showNotification('Produit ajouté au panier !');
    }

    // Supprimer un produit du panier
    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartSummary();
        this.showNotification('Produit supprimé du panier !');
    }

    // Mettre à jour la quantité d'un produit
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartSummary();
        }
    }

    // Vider le panier
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartSummary();
    }

    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Obtenir le sous-total
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtenir les frais de livraison
    getShipping() {
        const subtotal = this.getSubtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= 100) return 0; // Livraison gratuite au-dessus de 100€
        return 9.99;
    }

    // Obtenir le total
    getTotal() {
        return this.getSubtotal() + this.getShipping();
    }

    // Mettre à jour l'affichage du nombre d'articles dans la navbar
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        
        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.innerHTML = '';
            if (emptyCart) emptyCart.classList.remove('hidden');
            return;
        }

        if (emptyCart) emptyCart.classList.add('hidden');

        cartItems.innerHTML = this.items.map(item => `
            <div class="flex items-center space-x-4 py-4 border-b border-gray-200">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg">${item.name}</h3>
                    <p class="text-gray-600">${item.price.toFixed(2)} €</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})" 
                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                        <i class="fas fa-minus text-sm"></i>
                    </button>
                    <span class="w-12 text-center font-semibold">${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})" 
                            class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
                <div class="text-right">
                    <p class="font-semibold">${(item.price * item.quantity).toFixed(2)} €</p>
                    <button onclick="cart.removeFromCart(${item.id})" 
                            class="text-red-500 hover:text-red-700 transition mt-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Mettre à jour le résumé du panier
    updateCartSummary() {
        const subtotal = document.getElementById('subtotal');
        const shipping = document.getElementById('shipping');
        const total = document.getElementById('total');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (subtotal) subtotal.textContent = this.getSubtotal().toFixed(2) + ' €';
        if (shipping) shipping.textContent = this.getShipping().toFixed(2) + ' €';
        if (total) total.textContent = this.getTotal().toFixed(2) + ' €';
        
        if (checkoutBtn) {
            checkoutBtn.disabled = this.items.length === 0;
        }
    }

    // Afficher une notification
    showNotification(message) {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
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

    // Passer la commande
    checkout() {
        if (this.items.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        
        alert('Merci pour votre commande ! Votre commande a été enregistrée.');
        this.clearCart();
    }
}

// Initialiser le panier
let cart;

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    cart = new Cart();
    
    // Gestion du bouton de commande
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => cart.checkout());
    }
    
    // Gestion du menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}); 