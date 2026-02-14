
// cart-menu.js - Gerenciamento do menu do carrinho

class CartMenu {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
        this.SHIPPING_FEE = 0; // Frete grátis
        this.isExternalEventsSetup = false; // Flag para evitar duplicação
        
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.loadCartFromStorage();
        this.updateCartCount();
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
        this.cartItems = JSON.parse(localStorage.getItem('reuse_cart')) || [];
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
            if (e.key === 'Escape' && this.cartMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    // Resto dos métodos permanecem iguais...
    // [Mantive os métodos principais iguais para economizar espaço]
    
    loadCartFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('reuse_cart')) || [];
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('reuse_cart', JSON.stringify(this.cartItems));
        this.updateCartCount();
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
        this.cartMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCart();
    }

    closeMenu() {
        this.cartMenu.classList.add('closing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.cartMenu.classList.remove('active', 'closing');
        }, 300);
    }

    renderCart() {
        if (this.cartItems.length === 0) {
            this.showEmptyCart();
            this.updateSummary();
            return;
        }

        let html = '<div class="cart-items">';
        
        this.cartItems.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}" 
                             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlOWVjZWYiLz48cGF0aCBkPSJNMzUgNDBoMzB2MjBIMzV6IiBmaWxsPSIjYWRiNWJkIi8+PHBhdGggZD0iTTQwIDM1aDIwdjMwSDQweiIgZmlsbD0iIzZjNzU3ZCIvPjwvc3ZnPg=='">
                        ${item.badge ? `<span class="cart-item-badge">${item.badge}</span>` : ''}
                    </div>
                    <div class="cart-item-info">
                        <h3 class="cart-item-title">${item.title}</h3>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-index="${index}" ${item.quantity <= 1 ? 'disabled' : ''}>
                                    <i class="bi bi-dash"></i>
                                </button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn plus" data-index="${index}">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                            <div class="cart-item-actions">
                                <button class="cart-item-action-btn remove" data-index="${index}">
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
            return total + (item.price * item.quantity);
        }, 0);
        
        const total = subtotal + this.SHIPPING_FEE;
        
        this.cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        this.cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    addItem(product, quantity = 1) {
        // Verificar se o produto já está no carrinho
        const existingIndex = this.cartItems.findIndex(item => item.id === product.id);
        
        if (existingIndex !== -1) {
            // Se já existe, aumenta a quantidade
            this.cartItems[existingIndex].quantity += quantity;
        } else {
            // Se não existe, adiciona novo item
            this.cartItems.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.title} adicionado ao carrinho!`, 'success');
        
        // Animar botão do carrinho
        if (this.cartBtn) {
            this.cartBtn.classList.add('pulse');
            setTimeout(() => {
                this.cartBtn.classList.remove('pulse');
            }, 1000);
        }
        
        return true;
    }

    increaseQuantity(index) {
        if (index >= 0 && index < this.cartItems.length) {
            this.cartItems[index].quantity += 1;
            this.saveCart();
            this.renderCart();
            this.showNotification(`Quantidade aumentada para ${this.cartItems[index].quantity}`, 'info');
        }
    }

    decreaseQuantity(index) {
        if (index >= 0 && index < this.cartItems.length) {
            if (this.cartItems[index].quantity > 1) {
                this.cartItems[index].quantity -= 1;
                this.saveCart();
                this.renderCart();
                this.showNotification(`Quantidade diminuída para ${this.cartItems[index].quantity}`, 'info');
            }
        }
    }

    removeItem(index) {
        if (index >= 0 && index < this.cartItems.length) {
            const removedItem = this.cartItems.splice(index, 1)[0];
            this.saveCart();
            
            if (this.cartMenu.classList.contains('active')) {
                if (this.cartItems.length === 0) {
                    this.showEmptyCart();
                } else {
                    this.renderCart();
                }
            }
            
            this.showNotification(`${removedItem.title} removido do carrinho`, 'info');
        }
    }

    clearAllItems() {
        if (this.cartItems.length === 0) return;
        
        if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
            this.cartItems = [];
            this.saveCart();
            
            if (this.cartMenu.classList.contains('active')) {
                this.showEmptyCart();
                this.updateSummary();
            }
            
            this.showNotification('Carrinho limpo com sucesso!', 'info');
        }
    }

    checkout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Adicione produtos ao carrinho antes de finalizar a compra', 'warning');
            return;
        }
        
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        this.showNotification(`Redirecionando para checkout - Total: R$ ${total.toFixed(2).replace('.', ',')}`, 'success');
        this.closeMenu();
    }

    getCartTotal() {
        return this.cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
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
