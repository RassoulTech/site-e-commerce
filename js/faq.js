// Script pour la page FAQ
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le panier
    initCart();
    
    // Initialiser les fonctionnalités FAQ
    initFAQ();
    
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

// Initialiser les fonctionnalités FAQ
function initFAQ() {
    // Gestion des questions/réponses (accordéon)
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Fermer toutes les autres réponses
            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.classList.add('hidden');
                    ans.previousElementSibling.querySelector('i').classList.remove('rotate-180');
                }
            });
            
            // Basculer la réponse actuelle
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
    
    // Fonctionnalité de recherche
    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    // Ouvrir automatiquement les questions qui correspondent
                    if (searchTerm.length > 2) {
                        item.querySelector('.faq-answer').classList.remove('hidden');
                        item.querySelector('.faq-question i').classList.add('rotate-180');
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Afficher/masquer les catégories vides
            const categories = document.querySelectorAll('.faq-category');
            categories.forEach(category => {
                const visibleItems = category.querySelectorAll('.faq-item[style="display: block"]');
                if (visibleItems.length === 0 && searchTerm.length > 0) {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                }
            });
        });
    }
    
    // Animation d'apparition des éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        observer.observe(item);
    });
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
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .rotate-180 {
        transform: rotate(180deg);
    }
    
    .faq-question i {
        transition: transform 0.3s ease;
    }
    
    .faq-answer {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style); 