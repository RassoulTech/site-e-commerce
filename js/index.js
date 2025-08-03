// Script pour la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le panier
    initCart();
    
    // Gestion du menu mobile
    initMobileMenu();
    
    // Initialiser les animations des statistiques
    initStatsAnimation();
});

// Initialiser les animations des statistiques
function initStatsAnimation() {
    const statsNumbers = document.querySelectorAll('.stats-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateNumber(target, 0, numericValue, finalValue);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => observer.observe(stat));
}

// Animer un nombre
function animateNumber(element, start, end, finalText) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = finalText.replace(/\d+/, current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = finalText;
        }
    }
    
    requestAnimationFrame(updateNumber);
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
function showNotification(message) {
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