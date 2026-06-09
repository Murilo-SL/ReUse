// cart-menu.js - Gerenciamento do menu do carrinho

class CartMenu {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
        this.SHIPPING_FEE = 0; // Frete grátis
        this.isExternalEventsSetup = false; // Flag para evitar duplicação
        this.usuario = JSON.parse(localStorage.getItem("usuario"));
        
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.loadCartFromApi();
        this.setupExternalAddToCartButtons();
    }

    initializeComponents() {
        // Elementos do menu do carrinho
        this.cartMenu = document.getElementById('cartMenu');
        this.cartBody = document.getElementById('cartBody');
        this.cartBtn = document.getElementById('cartBtn');
        this.closeCart = document.getElementById('closeCart');
        this.clearCart = document.getElementById('clearCart');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        this.cartSubtotal = document.getElementById('cartSubtotal');
        this.cartTotal = document.getElementById('cartTotal');
        
        // Estado do carrinho
        this.cartItems = [];
        this.cartCount = 0;
    }

    setupEventListeners() {
        // Abrir menu do carrinho
        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.openMenu());
        }

        // Fechar menu
        if (this.closeCart) {
            this.closeCart.addEventListener('click', () => this.closeMenu());
        }

        // Limpar carrinho
        if (this.clearCart) {
            this.clearCart.addEventListener('click', () => this.clearAllItems());
        }

        // Finalizar compra
        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.checkout());
        }

        // Fechar menu ao clicar no overlay
        if (this.cartMenu) {
            this.cartMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart-overlay')) {
                    this.closeMenu();
                }
            });
        }

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartMenu && this.cartMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    setupExternalAddToCartButtons() {
        // Usar delegação de eventos para capturar cliques em botões adicionados dinamicamente
        document.addEventListener('click', (e) => {
            // Verificar se o clique foi em um botão "Adicionar ao Carrinho" ou similar
            const addToCartBtn = e.target.closest('.add-to-cart, #addToCartBtn');
            
            if (addToCartBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                // Tentar obter dados dos atributos data-* primeiro
                let productData = {
                    id: addToCartBtn.getAttribute('data-id'),
                    title: addToCartBtn.getAttribute('data-name'),
                    price: parseFloat(addToCartBtn.getAttribute('data-price')),
                    image: addToCartBtn.getAttribute('data-image'),
                    badge: addToCartBtn.getAttribute('data-badge') || ''
                };
                
                // Se não tiver data-id, tenta obter do contêiner do produto
                if (!productData.id) {
                    const productCard = addToCartBtn.closest('.product-item, .product-card');
                    if (productCard) {
                        productData.id = productCard.getAttribute('data-product-id') || 
                                        productCard.querySelector('[data-product-id]')?.getAttribute('data-product-id');
                        
                        // Tentar obter informações visíveis no card
                        const titleEl = productCard.querySelector('.product-title, h3');
                        const priceEl = productCard.querySelector('.product-price, .price-main');
                        const imageEl = productCard.querySelector('img');
                        const badgeEl = productCard.querySelector('.product-badge');
                        
                        if (titleEl) productData.title = titleEl.textContent.trim();
                        if (priceEl) {
                            const priceText = priceEl.textContent.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
                            productData.price = parseFloat(priceText) || 0;
                        }
                        if (imageEl) productData.image = imageEl.getAttribute('src') || '';
                        if (badgeEl) productData.badge = badgeEl.textContent.trim();
                    }
                }
                
                // Se for da página de detalhes do produto (product_detail.js)
                if (!productData.id || !productData.title) {
                    const mainImage = document.getElementById('productMainImage');
                    const productTitle = document.getElementById('productTitle');
                    const productPrice = document.getElementById('productPrice');
                    
                    // Obter ID da URL
                    const urlParams = new URLSearchParams(window.location.search);
                    const urlId = urlParams.get('id');
                    
                    if (mainImage) productData.image = mainImage.getAttribute('src') || '';
                    if (productTitle) productData.title = productTitle.textContent.trim();
                    if (productPrice) {
                        const priceText = productPrice.textContent.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
                        productData.price = parseFloat(priceText) || 0;
                    }
                    if (urlId) productData.id = urlId;
                }
                
                // Verificar se temos dados suficientes
                if (productData.id && productData.title && productData.price) {
                    // Obter quantidade se houver um seletor de quantidade
                    const quantityInput = document.getElementById('productQuantity');
                    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                    
                    this.addItem(productData, quantity);
                }
            }
        });
        
        this.isExternalEventsSetup = true;
    }
    
async loadCartFromApi() {

    if (!this.usuario || !this.usuario.id) {
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:3600/cart/user/${this.usuario.id}`
        );

        const result = await response.json();

        this.cartItems = result.data || [];

        this.updateCartCount();

        if (this.cartMenu && this.cartMenu.classList.contains("active")) {
            this.renderCart();
        }

    } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
    }
}

    updateCartCount() {
        this.cartCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        
        // Atualizar badge no botão do carrinho
        if (this.cartBtn) {
            this.cartBtn.setAttribute('data-count', this.cartCount);
            
            // Criar ou atualizar badge visual
            let badge = this.cartBtn.querySelector('.cart-count-badge');
            if (!badge && this.cartCount > 0) {
                badge = document.createElement('span');
                badge.className = 'cart-count-badge';
                this.cartBtn.appendChild(badge);
            }
            
            if (badge) {
                badge.textContent = this.cartCount;
                badge.style.display = this.cartCount > 0 ? 'flex' : 'none';
            }
        }
    }

    openMenu() {
        if (!this.cartMenu) return;
        this.cartMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCart();
    }

    closeMenu() {
        if (!this.cartMenu) return;
        this.cartMenu.classList.add('closing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.cartMenu.classList.remove('active', 'closing');
        }, 300);
    }

    renderCart() {
        if (!this.cartBody) return;
        
        if (this.cartItems.length === 0) {
            this.showEmptyCart();
            this.updateSummary();
            return;
        }

        let html = '<div class="cart-items">';
        
        this.cartItems.forEach((item, index) => {
html += `
    <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
            <img
                src="${item.image_url ? `http://localhost:3600/${item.image_url}` : 'IMG/no-image.png'}"
                alt="${item.name}"
            >
        </div>

        <div class="cart-item-info">
            <h3 class="cart-item-title">${item.name}</h3>

            <div class="cart-item-price">
                R$ ${Number(item.price).toFixed(2).replace('.', ',')}
            </div>

            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button
                        class="quantity-btn minus"
                        data-index="${index}"
                        ${item.quantity <= 1 ? 'disabled' : ''}
                    >
                        <i class="bi bi-dash"></i>
                    </button>

                    <span class="quantity-display">${item.quantity}</span>

                    <button
                        class="quantity-btn plus"
                        data-index="${index}"
                    >
                        <i class="bi bi-plus"></i>
                    </button>
                </div>

                <div class="cart-item-actions">
                    <button
                        class="cart-item-action-btn remove"
                        data-index="${index}"
                    >
                        <i class="bi bi-trash"></i> Remover
                    </button>
                </div>
            </div>
        </div>
    </div>
`;
        });
        
        html += '</div>';
        this.cartBody.innerHTML = html;
        
        // Adicionar eventos aos controles
        this.setupCartItemControls();
        
        // Atualizar resumo
        this.updateSummary();
    }

    setupCartItemControls() {
        if (!this.cartBody) return;
        
        // Botões de aumentar quantidade
        this.cartBody.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                this.increaseQuantity(index);
            });
        });
        
        // Botões de diminuir quantidade
        this.cartBody.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                this.decreaseQuantity(index);
            });
        });
        
        // Botões de remover
        this.cartBody.querySelectorAll('.cart-item-action-btn.remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                this.removeItem(index);
            });
        });
    }

    showEmptyCart() {
        if (!this.cartBody) return;
        this.cartBody.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">
                    <i class="bi bi-cart"></i>
                </div>
                <h4>Carrinho vazio</h4>
                <p>Adicione produtos ao carrinho para vê-los aqui</p>
            </div>
        `;
    }

    updateSummary() {
        const subtotal = this.cartItems.reduce((total, item) => {
            return total + (Number(item.price) * item.quantity);
        }, 0);
        
        const total = subtotal + this.SHIPPING_FEE;
        
        if (this.cartSubtotal) {
            this.cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        }
        if (this.cartTotal) {
            this.cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

async addItem(product, quantity = 1) {

    if (!this.usuario || !this.usuario.id) {
        this.showNotification("Usuário não encontrado.", "error");
        return false;
    }

    try {
        const response = await fetch(
            "http://localhost:3600/cart",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.usuario.id,
                    product_id: product.id,
                    quantity
                })
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao adicionar ao carrinho");
        }

        await this.loadCartFromApi();

        this.showNotification(
            `${product.title || product.name} adicionado ao carrinho!`,
            "success"
        );

        if (this.cartBtn) {
            this.cartBtn.classList.add("pulse");
            setTimeout(() => {
                this.cartBtn.classList.remove("pulse");
            }, 1000);
        }

        return true;

    } catch (error) {
        console.error("Erro ao adicionar carrinho:", error);
        this.showNotification("Erro ao adicionar ao carrinho.", "error");
        return false;
    }
}

async increaseQuantity(index) {

    const item = this.cartItems[index];

    if (!item) return;

    const newQuantity = item.quantity + 1;

    await fetch(`http://localhost:3600/cart/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: newQuantity
        })
    });

    await this.loadCartFromApi();

    this.showNotification(
        `Quantidade aumentada para ${newQuantity}`,
        "info"
    );
}

async decreaseQuantity(index) {

    const item = this.cartItems[index];

    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    await fetch(`http://localhost:3600/cart/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: newQuantity
        })
    });

    await this.loadCartFromApi();

    this.showNotification(
        `Quantidade diminuída para ${newQuantity}`,
        "info"
    );
}

async removeItem(index) {

    const item = this.cartItems[index];

    if (!item || !this.usuario || !this.usuario.id) return;

    await fetch(
        `http://localhost:3600/cart/${this.usuario.id}/${item.product_id}`,
        {
            method: "DELETE"
        }
    );

    await this.loadCartFromApi();

    this.showNotification(
        `${item.name} removido do carrinho`,
        "info"
    );
}

async clearAllItems() {

    if (this.cartItems.length === 0) return;

    if (!confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        return;
    }

    await fetch(
        `http://localhost:3600/cart/user/${this.usuario.id}`,
        {
            method: "DELETE"
        }
    );

    await this.loadCartFromApi();

    this.showEmptyCart();
    this.updateSummary();

    this.showNotification(
        "Carrinho limpo com sucesso!",
        "info"
    );
}

    checkout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Adicione produtos ao carrinho antes de finalizar a compra', 'warning');
            return;
        }
        
        const total = this.cartItems.reduce(
    (sum, item) => sum + (Number(item.price) * item.quantity),
    0
);
        
        this.showNotification(`Redirecionando para checkout - Total: R$ ${total.toFixed(2).replace('.', ',')}`, 'success');
        this.closeMenu();
    }

    getCartTotal() {
        return this.cartItems.reduce((total, item) => {
            return total + (Number(item.price) * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.cartCount;
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
    window.cartMenu = new CartMenu();
});