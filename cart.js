// ========================================
// SYSTÈME DE GESTION DU PANIER
// ========================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Ouvrir/fermer le panier
        const cartButton = document.getElementById('cartButton');
        const closeCart = document.getElementById('closeCart');
        const overlay = document.getElementById('cartOverlay');

        if (cartButton) {
            cartButton.addEventListener('click', () => this.openCart());
        }

        if (closeCart) {
            closeCart.addEventListener('click', () => this.closeCart());
        }

        if (overlay) {
            overlay.addEventListener('click', () => this.closeCart());
        }

        // Bouton commander
        const checkoutButton = document.getElementById('checkoutButton');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => this.checkout());
        }
    }

    loadCart() {
        try {
            const saved = localStorage.getItem('mainCoonCart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Erreur chargement panier:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('mainCoonCart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Erreur sauvegarde panier:', error);
        }
    }

    addItem(product, quantity = 1) {
        // Vérifier si le produit existe déjà
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            // Augmenter la quantité si stock disponible
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity <= product.stock) {
                existingItem.quantity = newQuantity;
                this.showNotification(`✅ Quantité mise à jour : ${product.name}`, 'success');
            } else {
                this.showNotification(`⚠️ Stock insuffisant pour ${product.name}`, 'warning');
                return false;
            }
        } else {
            // Ajouter nouveau produit
            if (quantity <= product.stock) {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    stone: product.stone,
                    price: product.price,
                    image: product.images[0],
                    quantity: quantity,
                    stock: product.stock
                });
                this.showNotification(`✨ ${product.name} ajouté au panier`, 'success');
            } else {
                this.showNotification(`⚠️ Stock insuffisant`, 'warning');
                return false;
            }
        }

        this.saveCart();
        this.updateCartUI();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('🗑️ Produit retiré du panier', 'info');
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);

        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else if (newQuantity <= item.stock) {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
            } else {
                this.showNotification('⚠️ Stock insuffisant', 'warning');
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartUI() {
        // Mettre à jour le compteur
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        // Mettre à jour le contenu du panier
        const cartItems = document.getElementById('cartItems');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartTotal = document.getElementById('cartTotal');

        if (this.items.length === 0) {
            if (cartItems) cartItems.style.display = 'none';
            if (cartEmpty) cartEmpty.style.display = 'block';
        } else {
            if (cartItems) {
                cartItems.style.display = 'block';
                cartItems.innerHTML = this.items.map(item => this.renderCartItem(item)).join('');
                this.attachCartItemListeners();
            }
            if (cartEmpty) cartEmpty.style.display = 'none';
        }

        // Mettre à jour le total
        if (cartTotal) {
            cartTotal.textContent = this.formatPrice(this.getTotal());
        }
    }

    renderCartItem(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-stone">
                        <i class="fas fa-gem"></i> ${item.stone}
                    </div>
                    <div class="cart-item-price">${this.formatPrice(item.price * item.quantity)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    attachCartItemListeners() {
        // Boutons quantité
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity + 1);
                }
            });
        });

        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                const item = this.items.find(item => item.id === id);
                if (item) {
                    this.updateQuantity(id, item.quantity - 1);
                }
            });
        });

        // Boutons supprimer
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.removeItem(id);
            });
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    openCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');

        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
    }

    closeCart() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');

        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Créer une notification toast
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Ajouter les styles si pas déjà présents
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    animation: slideIn 0.3s ease;
                    max-width: 350px;
                }
                .notification-success {
                    border-left: 4px solid #6b8e69;
                }
                .notification-warning {
                    border-left: 4px solid #c9896b;
                }
                .notification-info {
                    border-left: 4px solid #d4a574;
                }
                .notification button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #999;
                    font-size: 1.2rem;
                }
                .notification button:hover {
                    color: #333;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-suppression après 4 secondes
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    checkout() {
        if (this.items.length === 0) {
            this.showNotification('⚠️ Votre panier est vide', 'warning');
            return;
        }

        // TODO: Intégrer un vrai système de paiement (Stripe, PayPal, etc.)
        const total = this.getTotal();
        const itemCount = this.getItemCount();

        const confirmation = confirm(
            `🛍️ Commande\n\n` +
            `Articles : ${itemCount}\n` +
            `Total : ${this.formatPrice(total)}\n\n` +
            `Voulez-vous procéder au paiement ?\n\n` +
            `(Pour l'instant, ceci est une démo. L'intégration du paiement sera ajoutée prochainement)`
        );

        if (confirmation) {
            // Simuler une commande réussie
            this.showNotification('✅ Commande enregistrée ! Vous serez contacté pour le paiement.', 'success');

            // Sauvegarder la commande dans localStorage (temporaire)
            const order = {
                id: Date.now(),
                date: new Date().toISOString(),
                items: this.items,
                total: total,
                status: 'En attente de paiement'
            };

            const orders = JSON.parse(localStorage.getItem('mainCoonOrders') || '[]');
            orders.push(order);
            localStorage.setItem('mainCoonOrders', JSON.stringify(orders));

            // Vider le panier
            this.items = [];
            this.saveCart();
            this.updateCartUI();
            this.closeCart();

            // Redirection vers une page de confirmation (à créer)
            setTimeout(() => {
                alert('📧 Un email de confirmation vous sera envoyé.\n\nMerci pour votre commande ! 💚');
            }, 1000);
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
}

// Initialiser le panier au chargement de la page
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
