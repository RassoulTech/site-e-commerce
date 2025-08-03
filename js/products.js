// Données des produits pour le panier
const productsData = {
    1: { id: 1, name: "T-shirt Premium", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop" },
    2: { id: 2, name: "Jeans Slim Fit", price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop" },
    3: { id: 3, name: "Sneakers Urban", price: 89.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop" },
    4: { id: 4, name: "Veste en Cuir", price: 199.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop" },
    5: { id: 5, name: "Smartphone Pro", price: 699.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop" },
    6: { id: 6, name: "Casque Audio", price: 149.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
    7: { id: 7, name: "Ordinateur Portable", price: 899.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" },
    8: { id: 8, name: "Montre Connectée", price: 299.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" },
    9: { id: 9, name: "Lampe de Bureau", price: 49.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop" },
    10: { id: 10, name: "Coussin Décoratif", price: 24.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop" },
    11: { id: 11, name: "Vase en Céramique", price: 34.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" },
    12: { id: 12, name: "Tapis Moderne", price: 89.99, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" }
};

// Obtenir un produit par ID
function getProductById(id) {
    return productsData[id] || null;
}

// Obtenir tous les produits (pour compatibilité)
function getAllProducts() {
    return Object.values(productsData);
}

// Obtenir les produits populaires (pour compatibilité)
function getPopularProducts() {
    return [productsData[5], productsData[2], productsData[6], productsData[11]];
} 