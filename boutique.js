// ========================================
// SYSTÈME DE GESTION DE LA BOUTIQUE
// ========================================

class BoutiqueManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilters = {
            search: '',
            category: 'all',
            stone: 'all',
            sort: 'featured'
        };
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.populateFilters();
        this.attachEventListeners();
        this.applyFilters();
    }

    async loadProducts() {
        try {
            const response = await fetch('products.json');
            const data = await response.json();
            this.products = data.products;
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Erreur chargement produits:', error);
            this.showError();
        }
    }

    populateFilters() {
        // Extraire toutes les pierres uniques
        const stones = [...new Set(this.products.map(p => p.stone))];
        const stoneFilter = document.getElementById('stoneFilter');

        if (stoneFilter) {
            stones.sort().forEach(stone => {
                const option = document.createElement('option');
                option.value = stone.toLowerCase();
                option.textContent = stone.charAt(0).toUpperCase() + stone.slice(1);
                stoneFilter.appendChild(option);
            });
        }
    }

    attachEventListeners() {
        // Recherche
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Filtres
        const categoryFilter = document.getElementById('categoryFilter');
        const stoneFilter = document.getElementById('stoneFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        if (stoneFilter) {
            stoneFilter.addEventListener('change', (e) => {
                this.currentFilters.stone = e.target.value;
                this.applyFilters();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentFilters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // Reset
        const resetButton = document.getElementById('resetFilters');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetFilters());
        }
    }

    applyFilters() {
        let filtered = [...this.products];

        // Recherche
        if (this.currentFilters.search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(this.currentFilters.search) ||
                product.stone.toLowerCase().includes(this.currentFilters.search) ||
                product.description.toLowerCase().includes(this.currentFilters.search)
            );
        }

        // Catégorie
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(product =>
                product.category === this.currentFilters.category
            );
        }

        // Pierre
        if (this.currentFilters.stone !== 'all') {
            filtered = filtered.filter(product =>
                product.stone.toLowerCase() === this.currentFilters.stone
            );
        }

        // Tri
        filtered = this.sortProducts(filtered, this.currentFilters.sort);

        this.filteredProducts = filtered;
        this.renderProducts();
    }

    sortProducts(products, sortBy) {
        const sorted = [...products];

        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'featured':
            default:
                return sorted.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                });
        }
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');

        if (!grid) return;

        if (this.filteredProducts.length === 0) {
            grid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            if (noResults) noResults.style.display = 'none';

            grid.innerHTML = this.filteredProducts.map(product =>
                this.renderProductCard(product)
            ).join('');

            this.attachProductListeners();
        }
    }

    renderProductCard(product) {
        const stockClass = product.stock <= 3 ? 'low-stock' : '';
        const stockText = product.stock <= 3 ? `⚠️ Plus que ${product.stock} en stock` : `${product.stock} en stock`;

        return `
            <div class="product-card" data-id="${product.id}">
                ${product.featured ? '<div class="product-badge">⭐ Coup de cœur</div>' : ''}
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${this.getCategoryLabel(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-stone">
                        <i class="fas fa-gem"></i> ${product.stone}
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${this.formatPrice(product.price)}</span>
                        <span class="product-stock ${stockClass}">${stockText}</span>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-bag"></i>
                        ${product.stock === 0 ? 'Épuisé' : 'Ajouter au panier'}
                    </button>
                </div>
            </div>
        `;
    }

    attachProductListeners() {
        // Clic sur carte = ouvrir modal
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Ne pas ouvrir si on clique sur le bouton
                if (!e.target.closest('.add-to-cart-btn')) {
                    const id = parseInt(card.dataset.id);
                    this.openProductModal(id);
                }
            });
        });

        // Boutons "Ajouter au panier"
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                const product = this.products.find(p => p.id === id);
                if (product && cart) {
                    cart.addItem(product);
                }
            });
        });
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const modalBody = document.getElementById('modalBody');

        if (!modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="modal-product-grid">
                <div class="modal-images">
                    <img src="${product.images[0]}" alt="${product.name}" class="modal-main-image" id="mainImage">
                    <div class="modal-thumbnails">
                        ${product.images.map((img, index) => `
                            <img src="${img}" 
                                 alt="${product.name} ${index + 1}" 
                                 class="modal-thumbnail ${index === 0 ? 'active' : ''}"
                                 data-image="${img}">
                        `).join('')}
                    </div>
                </div>
                <div class="modal-details">
                    <div class="product-category">${this.getCategoryLabel(product.category)}</div>
                    <h2>${product.name}</h2>
                    <div class="modal-stone">
                        <i class="fas fa-gem"></i> Pierre : ${product.stone}
                    </div>
                    <div class="modal-price">${this.formatPrice(product.price)}</div>
                    <p class="modal-description">${product.description}</p>
                    <div class="product-stock ${product.stock <= 3 ? 'low-stock' : ''}">
                        ${product.stock <= 3 ? '⚠️ ' : ''}${product.stock} en stock
                    </div>
                    <button class="modal-add-cart" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-bag"></i>
                        ${product.stock === 0 ? 'Épuisé' : 'Ajouter au panier'}
                    </button>
                </div>
            </div>
        `;

        // Gestionnaire de miniatures
        modalBody.querySelectorAll('.modal-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const mainImage = document.getElementById('mainImage');
                if (mainImage) {
                    mainImage.src = e.target.dataset.image;
                }
                modalBody.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Bouton ajouter au panier
        const addBtn = modalBody.querySelector('.modal-add-cart');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (cart && cart.addItem(product)) {
                    modal.classList.remove('active');
                }
            });
        }

        modal.classList.add('active');

        // Fermer la modal
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    getCategoryLabel(category) {
        const labels = {
            'bracelet': '🔗 Bracelet',
            'collier': '📿 Collier',
            'boucles': '💎 Boucles d\'oreilles'
        };
        return labels[category] || category;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    resetFilters() {
        this.currentFilters = {
            search: '',
            category: 'all',
            stone: 'all',
            sort: 'featured'
        };

        // Réinitialiser les inputs
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const stoneFilter = document.getElementById('stoneFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (stoneFilter) stoneFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'featured';

        this.applyFilters();
    }

    showError() {
        const grid = document.getElementById('productsGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="loading">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erreur de chargement des produits</p>
                    <button onclick="location.reload()" style="
                        margin-top: 20px;
                        padding: 12px 30px;
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: 25px;
                        cursor: pointer;
                        font-size: 1rem;
                    ">
                        Réessayer
                    </button>
                </div>
            `;
        }
    }
}

// Initialiser la boutique au chargement
let boutiqueManager;
document.addEventListener('DOMContentLoaded', () => {
    boutiqueManager = new BoutiqueManager();
});
