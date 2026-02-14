// cliente-inicio.js - Gerenciamento principal da página inicial do cliente

class ClienteInicio {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.restoreDarkMode();
        this.setupGlobalEventListeners();
        this.loadInitialData();
    }

    initializeComponents() {
        // Elementos principais da página
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.actionCards = document.querySelectorAll('.action-card');
        this.searchInput = document.querySelector('.search-input');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.colorblindBtn = document.getElementById('colorblindBtn');
        
        // Modal de logout
        this.logoutModal = document.getElementById('logoutModal');
        this.closeModal = document.getElementById('closeModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogoutBtn = document.getElementById('confirmLogout');
        
        // Estado
        this.isDarkMode = localStorage.getItem('reuse_dark_mode') === 'true';
    }

    setupEventListeners() {
        // Categorias
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', () => this.handleCategoryClick(button));
        });

        // Cards de ação
        this.actionCards.forEach(card => {
            card.addEventListener('click', () => this.handleActionCardClick(card));
        });

        // Barra de pesquisa
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => this.handleSearch(e));
        }

        // Modo noturno
        if (this.darkModeBtn) {
            this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        }

        // Logout modal
        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeLogoutModal());
        }

        if (this.cancelLogout) {
            this.cancelLogout.addEventListener('click', () => this.closeLogoutModal());
        }

        if (this.confirmLogoutBtn) {
            this.confirmLogoutBtn.addEventListener('click', () => this.performLogout());
        }

        // Fechar modal ao clicar fora
        if (this.logoutModal) {
            this.logoutModal.addEventListener('click', (e) => {
                if (e.target === this.logoutModal) {
                    this.closeLogoutModal();
                }
            });
        }
    }

    setupGlobalEventListeners() {
        // Event listeners globais que não conflitam com outros módulos
        document.addEventListener('click', (e) => {
            // Modo daltonismo
            if (e.target.closest('#colorblindBtn')) {
                this.handleColorblindMode();
            }
        });
    }

    loadInitialData() {
        // Carregar dados iniciais se necessário
        this.checkAndLoadImages();
    }

    handleCategoryClick(button) {
        // Remover active de todos os botões
        this.categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        button.classList.add('active');
        
        // Mostrar feedback
        const category = button.textContent.trim();
        this.showNotification(`Filtrando por: ${category}`, 'info');
        
        // Aqui você pode adicionar lógica para filtrar produtos
        // Exemplo: this.filterProductsByCategory(category);
    }

    handleActionCardClick(card) {
        const action = card.querySelector('h3').textContent.toLowerCase();
        
        switch(action) {
            case 'comprar':
                this.showNotification('Redirecionando para todos os produtos...', 'info');
                // Redirecionar para página de todos os produtos
                setTimeout(() => {
                    window.location.href = 'todos-produtos.html';
                }, 500);
                break;
                
            case 'vender':
                this.showNotification('Redirecionando para cadastro de vendedor...', 'info');
                // Redirecionar para cadastro de vendedor
                setTimeout(() => {
                    window.location.href = 'cadastro-vendedor.html';
                }, 500);
                break;
                
            case 'doar':
                this.showNotification('Abrindo formulário de doação...', 'info');
                // Abrir modal de doação usando o sistema do donationModal.js
                if (window.donationModal) {
                    setTimeout(() => {
                        window.donationModal.open();
                    }, 300);
                } else {
                    this.showNotification('Erro: Sistema de doação não disponível', 'error');
                }
                break;
                
            case 'ver perfil':
                // Usar o sistema de perfil se disponível
                if (window.profileMenu) {
                    window.profileMenu.openMenu();
                } else {
                    this.showNotification('Redirecionando para perfil...', 'info');
                    // window.location.href = 'perfil.html';
                }
                break;
                
            default:
                this.showNotification(`Ação: ${action}`, 'info');
        }
    }

    handleSearch(e) {
        if (e.key === 'Enter') {
            const query = this.searchInput.value.trim();
            if (query) {
                this.showNotification(`Pesquisando por: "${query}"`, 'info');
                // Aqui você pode adicionar a lógica de pesquisa
                // Exemplo: this.performSearch(query);
            }
        }
    }

    toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('reuse_dark_mode', isDarkMode.toString());
        
        const icon = this.darkModeBtn.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
            this.darkModeBtn.title = 'Modo Claro';
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
            this.darkModeBtn.title = 'Modo Noturno';
        }
        
        this.showNotification(`Modo ${isDarkMode ? 'Escuro' : 'Claro'} ativado`, 'info');
    }

    restoreDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            const icon = this.darkModeBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-moon');
                icon.classList.add('bi-sun');
                this.darkModeBtn.title = 'Modo Claro';
            }
        }
    }

    handleColorblindMode() {
        // Alternar classe de acessibilidade
        document.body.classList.toggle('colorblind-mode');
        const isActive = document.body.classList.contains('colorblind-mode');
        
        // Atualizar ícone
        const icon = this.colorblindBtn?.querySelector('i');
        if (icon) {
            if (isActive) {
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-fill');
                this.colorblindBtn.title = 'Modo Daltonismo: Ativo';
            } else {
                icon.classList.remove('bi-eye-fill');
                icon.classList.add('bi-eye');
                this.colorblindBtn.title = 'Modo Daltonismo';
            }
        }
        
        this.showNotification(`Modo Daltonismo ${isActive ? 'ativado' : 'desativado'}`, 'info');
    }

    openLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.add('active');
        }
    }

    closeLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.remove('active');
        }
    }

    performLogout() {
        // Limpar dados da sessão
        localStorage.removeItem('user_session');
        sessionStorage.clear();
        
        // Fechar modal
        this.closeLogoutModal();
        
        // Redirecionar para página de login
        setTimeout(() => {
            window.location.href = 'cadastro-cliente.html';
        }, 300);
    }

    checkAndLoadImages() {
        // Gerenciar imagens das ONGs
        this.loadOngImages();
        
        // Pré-carregar imagens
        this.preloadImages();
    }

    loadOngImages() {
        const ongImages = document.querySelectorAll('.ong-logo img');
        
        ongImages.forEach(img => {
            if (img.complete) {
                if (img.naturalHeight === 0) {
                    img.classList.add('error');
                }
            } else {
                img.addEventListener('load', function() {
                    this.classList.remove('error');
                });
                
                img.addEventListener('error', function() {
                    this.classList.add('error');
                });
            }
        });
    }

    preloadImages() {
        const images = [
            'img/sos-felino.jpg',
            'img/patas-concientes.jpg',
            'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            'img/tenis-nike.avif',
            'img/vestido-floral.jpg',
            'img/liquidificador-phill.jpg',
            'img/camiseta-polo.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
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
            animation: 'slideInRight 3s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
        });
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.NOTIFICATION_DURATION);
    }

    // Função auxiliar para mostrar notificação de sucesso de doação
    showDonationSuccess() {
        this.showNotification('Doação registrada com sucesso! Entraremos em contato para agendar a coleta.', 'success');
    }

    // Função auxiliar para mostrar erro de doação
    showDonationError(message) {
        this.showNotification(message || 'Erro ao registrar doação. Tente novamente.', 'error');
    }

    // Métodos utilitários
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos de animação para notificações
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Inicializar a aplicação principal
    window.clienteInicio = new ClienteInicio();
    
    // Configurar integração entre módulos
    setupModuleIntegration();
});

// Função para integrar os módulos
function setupModuleIntegration() {
    // Configurar botão de logout no dropdown para usar o sistema unificado
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Fechar dropdown se estiver aberto
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
            
            // Usar o sistema de logout principal
            if (window.clienteInicio) {
                window.clienteInicio.openLogoutModal();
            }
        });
    }
    
    // Configurar botões do dropdown para usar os sistemas correspondentes
    document.addEventListener('click', (e) => {
        const dropdownItem = e.target.closest('.dropdown-item');
        if (dropdownItem && !dropdownItem.classList.contains('logout')) {
            e.preventDefault();
            e.stopPropagation();
            
            // Fechar dropdown
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
            
            // Redirecionar para o sistema correspondente
            if (dropdownItem.querySelector('i.bi-person')) {
                // Meu Perfil
                if (window.profileMenu) {
                    window.profileMenu.navigateToProfile();
                }
            } else if (dropdownItem.querySelector('i.bi-gear')) {
                // Configurações
                if (window.profileMenu) {
                    window.profileMenu.navigateToSettings();
                }
            } else if (dropdownItem.querySelector('i.bi-box-arrow-right')) {
                // Meus Pedidos
                if (window.profileMenu) {
                    window.profileMenu.navigateToOrders();
                }
            } else if (dropdownItem.querySelector('i.bi-heart')) {
                // Favoritos
                if (window.favoritesMenu) {
                    window.favoritesMenu.openMenu();
                }
            }
        }
    });
    
    // Configurar dropdown toggle básico (apenas para UI)
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileMenu');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
}

// Adicionar evento de clique aos produtos
document.addEventListener('DOMContentLoaded', function() {
    // Envolver cada produto-card em um link
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        const link = document.createElement('a');
        link.href = `produto.html?id=${index + 1}`;
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';
        
        // Envolver o conteúdo do card com o link
        card.parentNode.insertBefore(link, card);
        link.appendChild(card);
    });
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

// Expor funções para outros módulos
window.showDonationSuccessNotification = function() {
    if (window.clienteInicio) {
        window.clienteInicio.showDonationSuccess();
    }
};

window.showDonationErrorNotification = function(message) {
    if (window.clienteInicio) {
        window.clienteInicio.showDonationError(message);
    }
};