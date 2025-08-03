// Script pour la page contact
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le panier
    initCart();
    
    // Initialiser le formulaire de contact
    initContactForm();
    
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

// Initialiser le formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Compteur de caractères
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length}/1000`;
            
            if (length > 900) {
                charCount.classList.add('text-red-500');
            } else if (length > 800) {
                charCount.classList.add('text-yellow-500');
            } else {
                charCount.classList.remove('text-red-500', 'text-yellow-500');
            }
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const newsletter = formData.get('newsletter');
        
        // Valider les champs
        if (!validateForm(name, email, message, phone)) {
            return;
        }
        
        // Simuler l'envoi du formulaire
        submitForm(name, email, phone, subject, message, newsletter);
    });
}

// Valider le formulaire
function validateForm(name, email, message, phone) {
    let isValid = true;
    
    // Valider le nom
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    } else {
        clearFieldError('name');
    }
    
    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Veuillez entrer une adresse email valide');
        isValid = false;
    } else {
        clearFieldError('email');
    }
    
    // Valider le téléphone (optionnel mais doit être valide si fourni)
    if (phone && phone.trim() !== '') {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showFieldError('phone', 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
        } else {
            clearFieldError('phone');
        }
    }
    
    // Valider le message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else if (message.length > 1000) {
        showFieldError('message', 'Le message ne peut pas dépasser 1000 caractères');
        isValid = false;
    } else {
        clearFieldError('message');
    }
    
    return isValid;
}

// Afficher une erreur de champ
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    // Supprimer l'ancienne erreur s'il y en a une
    clearFieldError(fieldName);
    
    // Ajouter la classe d'erreur au champ
    field.classList.add('border-red-500');
    
    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    errorDiv.id = `${fieldName}-error`;
    
    // Insérer le message d'erreur après le champ
    field.parentNode.appendChild(errorDiv);
}

// Supprimer l'erreur d'un champ
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorDiv = document.getElementById(`${fieldName}-error`);
    
    if (field) {
        field.classList.remove('border-red-500');
    }
    
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Soumettre le formulaire
function submitForm(name, email, phone, subject, message, newsletter) {
    // Afficher un indicateur de chargement
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Réinitialiser le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Afficher un message de succès avec les détails
        showSuccessMessage(name, email, newsletter);
        
        // Réinitialiser le formulaire
        document.getElementById('contact-form').reset();
        document.getElementById('char-count').textContent = '0/1000';
        
        // Sauvegarder dans localStorage pour l'historique
        saveContactHistory(name, email, phone, subject, message, newsletter);
        
    }, 2000);
}

// Sauvegarder l'historique des contacts
function saveContactHistory(name, email, phone, subject, message, newsletter) {
    const contactHistory = JSON.parse(localStorage.getItem('contactHistory')) || [];
    const newContact = {
        id: Date.now(),
        name,
        email,
        phone,
        subject,
        message: message.substring(0, 100) + '...', // Tronquer le message
        newsletter,
        date: new Date().toISOString()
    };
    
    contactHistory.unshift(newContact);
    
    // Garder seulement les 10 derniers contacts
    if (contactHistory.length > 10) {
        contactHistory.splice(10);
    }
    
    localStorage.setItem('contactHistory', JSON.stringify(contactHistory));
}

// Afficher un message de succès
function showSuccessMessage(name, email, newsletter) {
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 max-w-md';
    
    const newsletterText = newsletter ? 
        `<p class="text-sm mt-2">Vous recevrez bientôt notre newsletter !</p>` : '';
    
    successMessage.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-check-circle mr-3 text-xl mt-1"></i>
            <div>
                <h4 class="font-semibold">Message envoyé avec succès !</h4>
                <p class="text-sm mt-1">Merci ${name}, nous vous répondrons à ${email} dans les plus brefs délais.</p>
                ${newsletterText}
            </div>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Animer l'entrée
    setTimeout(() => {
        successMessage.classList.remove('translate-x-full');
    }, 100);
    
    // Supprimer après 6 secondes
    setTimeout(() => {
        successMessage.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 6000);
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