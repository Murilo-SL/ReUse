
// favorites-menu.js - Gerenciamento do menu de favoritos

class FavoritesMenu {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
this.favorites = [];
this.usuario = JSON.parse(localStorage.getItem("usuario"));
        this.isProcessing = false; // Flag para evitar processamento duplo
        
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupFavoriteButtons();
this.loadFavoritesFromApi();
    }

    initializeComponents() {
        // Elementos do menu de favoritos
        this.favoritesMenu = document.getElementById('favoritesMenu');
        this.favoritesBody = document.getElementById('favoritesBody');
        this.favoritesBtn = document.getElementById('favoritesBtn');
        this.closeFavorites = document.getElementById('closeFavorites');
        this.clearFavorites = document.getElementById('clearFavorites');
        this.viewAllFavorites = document.getElementById('viewAllFavorites');
    }

    setupEventListeners() {
        // Abrir menu de favoritos
        if (this.favoritesBtn) {
            this.favoritesBtn.addEventListener('click', () => this.openMenu());
        }

        // Fechar menu
        if (this.closeFavorites) {
            this.closeFavorites.addEventListener('click', () => this.closeMenu());
        }

        // Limpar todos os favoritos
        if (this.clearFavorites) {
            this.clearFavorites.addEventListener('click', () => this.clearAllFavorites());
        }

        // Ver todos os favoritos
        if (this.viewAllFavorites) {
            this.viewAllFavorites.addEventListener('click', () => this.viewAllFavoritesPage());
        }

        // Fechar menu ao clicar no overlay
        if (this.favoritesMenu) {
            this.favoritesMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('favorites-overlay')) {
                    this.closeMenu();
                }
            });
        }

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.favoritesMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    setupFavoriteButtons() {
        // Usar event delegation para capturar cliques nos botões de favorito
        document.addEventListener('click', (e) => {
            this.handleFavoriteButtonClick(e);
        });
    }

    handleFavoriteButtonClick(e) {
        // Botões de favorito nos produtos
        const heartBtn = e.target.closest('.btn-outline');
        if (heartBtn && (heartBtn.querySelector('i.bi-heart') || heartBtn.querySelector('i.bi-heart-fill'))) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = heartBtn.closest('.product-card');
            if (productCard) {
                this.toggleProductFavorite(productCard, heartBtn);
            }
        }
        
        // Botões de remover no menu de favoritos
        const removeBtn = e.target.closest('.favorite-item-action-btn.remove');
        if (removeBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const favoriteItem = removeBtn.closest('.favorite-item');
            if (favoriteItem) {
                const index = parseInt(removeBtn.getAttribute('data-index'));
                this.removeFavoriteItem(index);
            }
        }
        
        // Botões de comprar no menu de favoritos
        const buyBtn = e.target.closest('.favorite-item-action-btn.buy');
        if (buyBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const favoriteItem = buyBtn.closest('.favorite-item');
            if (favoriteItem) {
                const index = parseInt(buyBtn.getAttribute('data-index'));
                this.buyFavoriteItem(index);
            }
        }
    }

    extractProductInfo(productCard) {
        const title = productCard.querySelector('.product-title')?.textContent || 'Produto sem nome';
        const priceText = productCard.querySelector('.product-price')?.textContent || 'R$ 0,00';
        const price = parseFloat(priceText.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
        const image = productCard.querySelector('.product-image img')?.src || '';
        const description = productCard.querySelector('.product-description')?.textContent || '';
        const badge = productCard.querySelector('.product-badge')?.textContent || '';
        
        // Gerar ID único
       const id =
    productCard
        .closest(".product-item")
        ?.dataset.productId ||
    productCard.dataset.id;
        
return {
    id: Number(id),
    title,
    price,
    image,
    description,
    badge,
    addedAt: new Date().toISOString()
};
    }

async toggleProductFavorite(productCard, heartBtn) {
        // Prevenir múltiplos cliques rápidos
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        setTimeout(() => {
            this.isProcessing = false;
        }, 300);
        
        const icon = heartBtn.querySelector('i');
        const isCurrentlyFavorited = icon.classList.contains('bi-heart-fill');
        
        if (!isCurrentlyFavorited) {
            // Adicionar aos favoritos
            const product = this.extractProductInfo(productCard);
            const added = await this.addToFavorites(product);
            
            if (added) {
                this.updateHeartIcon(heartBtn, true);
                this.showNotification(`${product.title} foi adicionado aos favoritos!`, 'success');
            }
        } else {
            // Remover dos favoritos
            const productId = this.extractProductInfo(productCard).id;
            const index = this.favorites.findIndex(
    item => Number(item.product_id) === Number(productId)
);
            
            if (index !== -1) {
                const removedItem = this.favorites[index];
                await this.removeFavorite(index);
                this.updateHeartIcon(heartBtn, false);
                this.showNotification(`${removedItem.name} foi removido dos favoritos`, 'info');
            }
        }
    }

async addToFavorites(product) {

    if (!this.usuario || !this.usuario.id) {
        this.showNotification(
            "Usuário não encontrado.",
            "error"
        );
        return false;
    }

    try {

        const response = await fetch(
            "http://localhost:3600/favorites",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.usuario.id,
                    product_id: product.id
                })
            }
        );

        if (!response.ok) {
            return false;
        }

        await this.loadFavoritesFromApi();

        if (this.favoritesMenu.classList.contains("active")) {
            this.renderFavorites();
        }

        return true;

    } catch (error) {

        console.error(
            "Erro ao adicionar favorito:",
            error
        );

        return false;
    }
}

async removeFavorite(index) {

    const item = this.favorites[index];

    if (!item || !this.usuario || !this.usuario.id) {
        return;
    }

    try {

        await fetch(
            `http://localhost:3600/favorites/${this.usuario.id}/${item.product_id}`,
            {
                method: "DELETE"
            }
        );

        await this.loadFavoritesFromApi();

        if (this.favoritesMenu.classList.contains("active")) {
            if (this.favorites.length === 0) {
                this.showEmptyFavorites();
            } else {
                this.renderFavorites();
            }
        }

    } catch (error) {

        console.error(
            "Erro ao remover favorito:",
            error
        );
    }
}

async loadFavoritesFromApi() {

    if (!this.usuario || !this.usuario.id) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3600/favorites/user/${this.usuario.id}`
        );

        const result = await response.json();

        this.favorites = result.data || [];

        this.updateFavoritesCount();
        this.updateProductFavoriteIcons();

    } catch (error) {

        console.error(
            "Erro ao carregar favoritos:",
            error
        );
    }
}

async removeFavoriteItem(index) {

    const removedItem = this.favorites[index];

    if (!removedItem) return;

    await this.removeFavorite(index);

    this.showNotification(
        `${removedItem.name} foi removido dos favoritos`,
        "info"
    );
}



    updateFavoritesCount() {
        const count = this.favorites.length;
        
        // Criar ou atualizar badge
        let badge = this.favoritesBtn.querySelector('.favorites-count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'favorites-count-badge';
            this.favoritesBtn.appendChild(badge);
        }
        
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
        
        // Animar se houver mudanças
        if (count > 0) {
            badge.classList.add('pulse');
            setTimeout(() => {
                badge.classList.remove('pulse');
            }, 1000);
        }
    }

    updateHeartIcon(heartButton, isFavorited) {
        const icon = heartButton.querySelector('i');
        if (isFavorited) {
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
            heartButton.style.color = '#dc3545';
            heartButton.style.borderColor = '#dc3545';
        } else {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
            heartButton.style.color = '';
            heartButton.style.borderColor = '';
        }
        
        // Animar o botão
        heartButton.classList.add('pulse');
        setTimeout(() => {
            heartButton.classList.remove('pulse');
        }, 600);
    }

isProductFavorited(productId) {
    return this.favorites.some(
        item => Number(item.product_id) === Number(productId)
    );
}

    openMenu() {
        this.favoritesMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderFavorites();
    }

    closeMenu() {
        this.favoritesMenu.classList.add('closing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.favoritesMenu.classList.remove('active', 'closing');
        }, 300);
    }

    renderFavorites() {
        if (this.favorites.length === 0) {
            this.showEmptyFavorites();
            return;
        }

        let html = '<div class="favorites-items">';
        
        // Ordenar por data (mais recentes primeiro)
        const sortedFavorites = [...this.favorites].sort((a, b) => 
            new Date(b.addedAt) - new Date(a.addedAt)
        );
        
        sortedFavorites.forEach((item, index) => {
            const originalIndex = this.favorites.findIndex(
    fav => Number(fav.product_id) === Number(item.product_id)
);
            
html += `
    <div class="favorite-item" data-id="${item.product_id}">
        <div class="favorite-item-image">
            <img
                src="${item.image_url ? `http://localhost:3600/${item.image_url}` : 'IMG/no-image.png'}"
                alt="${item.name}"
            >
        </div>

        <div class="favorite-item-info">
            <h3 class="favorite-item-title">${item.name}</h3>

            <p class="favorite-item-description">
                ${item.description || ""}
            </p>

            <div class="favorite-item-price">
                R$ ${Number(item.price).toFixed(2).replace(".", ",")}
            </div>

            <div class="favorite-item-actions">
                <button
                    class="favorite-item-action-btn buy"
                    data-index="${originalIndex}"
                >
                    <i class="bi bi-cart-plus"></i> Comprar
                </button>

                <button
                    class="favorite-item-action-btn remove"
                    data-index="${originalIndex}"
                >
                    <i class="bi bi-trash"></i> Remover
                </button>
            </div>
        </div>
    </div>
`;
        });
        
        html += '</div>';
        this.favoritesBody.innerHTML = html;
    }

    showEmptyFavorites() {
        this.favoritesBody.innerHTML = `
            <div class="empty-favorites">
                <div class="empty-icon">
                    <i class="bi bi-heart"></i>
                </div>
                <h4>Nenhum favorito ainda</h4>
                <p>Adicione produtos aos favoritos para vê-los aqui</p>
            </div>
        `;
    }

    buyFavoriteItem(index) {
        if (index >= 0 && index < this.favorites.length) {
            const item = this.favorites[index];
            
            // Usar o sistema de carrinho se disponível
            if (window.cartMenu) {
                window.cartMenu.addItem(item, 1);
                this.showNotification(`${item.name} foi adicionado ao carrinho!`, 'success');
            } else {
                this.showNotification(`Redirecionando para compra: ${item.name}`, 'info');
            }
        }
    }

async clearAllFavorites() {

    if (this.favorites.length === 0) return;

    if (!confirm("Tem certeza que deseja remover todos os favoritos?")) {
        return;
    }

    for (const item of this.favorites) {
        await fetch(
            `http://localhost:3600/favorites/${this.usuario.id}/${item.product_id}`,
            {
                method: "DELETE"
            }
        );
    }

    await this.loadFavoritesFromApi();

    this.showEmptyFavorites();

    this.showNotification(
        "Todos os favoritos foram removidos",
        "info"
    );
}

    viewAllFavoritesPage() {
        this.closeMenu();
        this.showNotification('Redirecionando para página completa de favoritos...', 'info');
        // window.location.href = 'favoritos.html';
    }


updateProductFavoriteIcons() {

    document.querySelectorAll(".product-card").forEach(productCard => {

        const heartBtn =
            productCard.querySelector(".btn-outline");

        if (!heartBtn) return;

        const productId =
            heartBtn.dataset.id;

        const isFavorited =
            this.isProductFavorited(productId);

        this.updateHeartIcon(
            heartBtn,
            isFavorited
        );
    });
}

    getFavoritesCount() {
        return this.favorites.length;
    }

    getFavorites() {
        return [...this.favorites]; // Retorna cópia para evitar mutação direta
    }

    showNotification(message, type = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Ícone baseado no tipo
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        if (type === 'warning') iconClass = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : 
                       type === 'warning' ? '#ffa502' : '#0066cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            animation: 'slideInRight 1.5s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
        });
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 1.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.NOTIFICATION_DURATION);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesMenu = new FavoritesMenu();
});

// Polyfill para Element.closest (para navegadores antigos)
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
