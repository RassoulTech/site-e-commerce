// Script pour la page Services
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le panier
    initCart();
    
    // Initialiser les animations des services
    initServiceAnimations();
    
    // Initialiser les interactions des boutons
    initServiceButtons();
    
    // Gestion du menu mobile
    initMobileMenu();
});

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

// Initialiser les animations des services
function initServiceAnimations() {
    // Animation d'apparition des cartes de services
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les cartes de services
    document.querySelectorAll('.bg-white.rounded-xl').forEach(card => {
        observer.observe(card);
    });
    
    // Animation des icônes au survol
    document.querySelectorAll('.bg-white.rounded-xl').forEach(card => {
        const icon = card.querySelector('i');
        if (icon) {
            card.addEventListener('mouseenter', function() {
                icon.classList.add('animate-bounce');
            });
            
            card.addEventListener('mouseleave', function() {
                icon.classList.remove('animate-bounce');
            });
        }
    });
}

// Initialiser les interactions des boutons
function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.bg-white.rounded-xl button');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceCard = this.closest('.bg-white.rounded-xl');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const servicePrice = serviceCard.querySelector('.text-2xl').textContent;
            
            // Afficher une modal de confirmation
            showServiceModal(serviceName, servicePrice);
        });
    });
}

// Afficher une modal de service
function showServiceModal(serviceName, servicePrice) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
            <div class="text-center">
                <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-2xl text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Service ajouté au panier</h3>
                <p class="text-gray-600 mb-6">Le service <strong>${serviceName}</strong> (${servicePrice}) a été ajouté à votre panier.</p>
                <div class="flex space-x-4">
                    <button class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition" onclick="closeServiceModal()">
                        Continuer
                    </button>
                    <a href="cart.html" class="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition text-center">
                        Voir le panier
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animation d'entrée
    setTimeout(() => {
        modal.querySelector('.bg-white').classList.add('scale-100');
    }, 100);
    
    // Fermer la modal en cliquant à l'extérieur
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
}

// Fermer la modal de service
function closeServiceModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.querySelector('.bg-white').classList.remove('scale-100');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
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

// Ajouter des styles CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .bg-white.rounded-xl {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .bg-white.rounded-xl.animate-fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
    
    .bg-white.rounded-xl button {
        transition: all 0.3s ease;
    }
    
    .bg-white.rounded-xl:hover button {
        transform: scale(1.05);
    }
    
    .fixed.inset-0 .bg-white {
        transform: scale(95%);
        transition: transform 0.3s ease;
    }
    
    .fixed.inset-0 .bg-white.scale-100 {
        transform: scale(100%);
    }
    
    .animate-bounce {
        animation: bounce 0.6s ease-in-out;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);

// Rendre la fonction closeServiceModal globale
window.closeServiceModal = closeServiceModal; 