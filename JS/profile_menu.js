
// profile-menu.js - Gerenciamento do menu de perfil expandido

class ProfileMenu {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupProfileIntegration();
    }

    initializeComponents() {
        // Elementos do menu de perfil
        this.profileMenuExpanded = document.getElementById('profileMenuExpanded');
        this.closeProfile = document.getElementById('closeProfile');
        this.profileMyProfile = document.getElementById('profileMyProfile');
        this.profileSettings = document.getElementById('profileSettings');
        this.profileMyOrders = document.getElementById('profileMyOrders');
        this.profileLogout = document.getElementById('profileLogout');
        
        // Elementos do header
        this.profileToggle = document.getElementById('profileToggle');
        this.profileDropdown = document.getElementById('profileMenu');
    }

    setupEventListeners() {
        // Abrir menu de perfil expandido
        if (this.profileToggle) {
            this.profileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openMenu();
            });
        }

        // Fechar menu
        if (this.closeProfile) {
            this.closeProfile.addEventListener('click', () => this.closeMenu());
        }

        // Navegação do menu
        if (this.profileMyProfile) {
            this.profileMyProfile.addEventListener('click', () => this.navigateToProfile());
        }

        if (this.profileSettings) {
            this.profileSettings.addEventListener('click', () => this.navigateToSettings());
        }

        if (this.profileMyOrders) {
            this.profileMyOrders.addEventListener('click', () => this.navigateToOrders());
        }

        if (this.profileLogout) {
            this.profileLogout.addEventListener('click', () => this.openLogoutModal());
        }

        // Fechar menu ao clicar no overlay
        if (this.profileMenuExpanded) {
            this.profileMenuExpanded.addEventListener('click', (e) => {
                if (e.target.classList.contains('profile-overlay')) {
                    this.closeMenu();
                }
            });
        }

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.profileMenuExpanded.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    setupProfileIntegration() {
        // Integração com o dropdown do header
        document.addEventListener('click', (e) => {
            const dropdownItem = e.target.closest('.dropdown-item');
            
            // Tratar logout
            if (dropdownItem && dropdownItem.classList.contains('logout')) {
                e.preventDefault();
                e.stopPropagation();
                this.openLogoutModal();
                
                // Fechar dropdown
                if (this.profileDropdown) {
                    this.profileDropdown.classList.remove('active');
                }
                return;
            }
            
            // Prevenir conflito com outros itens do dropdown
            if (dropdownItem) {
                e.preventDefault();
                e.stopPropagation();
                
                if (dropdownItem.querySelector('i.bi-person')) {
                    this.navigateToProfile();
                } else if (dropdownItem.querySelector('i.bi-gear')) {
                    this.navigateToSettings();
                } else if (dropdownItem.querySelector('i.bi-box-arrow-right')) {
                    this.navigateToOrders();
                } else if (dropdownItem.querySelector('i.bi-heart')) {
                    this.navigateToFavorites();
                }
                
                // Fechar dropdown se estiver aberto
                if (this.profileDropdown) {
                    this.profileDropdown.classList.remove('active');
                }
            }
        });
    }

    openMenu() {
        // Fechar dropdown se estiver aberto
        if (this.profileDropdown) {
            this.profileDropdown.classList.remove('active');
        }
        
        this.profileMenuExpanded.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.profileMenuExpanded.classList.add('closing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.profileMenuExpanded.classList.remove('active', 'closing');
        }, 300);
    }

    navigateToProfile() {
        this.closeMenu();
        this.showNotification('Redirecionando para Meu Perfil...', 'info');
        window.location.href = 'perfil.html';
    }

    navigateToSettings() {
        this.closeMenu();
        this.showNotification('Redirecionando para Configurações...', 'info');
        window.location.href = 'configuracoes.html';
    }

    navigateToOrders() {
        this.closeMenu();
        this.showNotification('Redirecionando para Meus Pedidos...', 'info');
        // window.location.href = 'pedidos.html';
    }

    navigateToFavorites() {
        this.closeMenu();
        if (window.favoritesMenu) {
            window.favoritesMenu.openMenu();
        } else {
            this.showNotification('Redirecionando para Favoritos...', 'info');
            // window.location.href = 'favoritos.html';
        }
    }

    openLogoutModal() {
        this.closeMenu();
        
        // Usar o modal de logout existente
        if (window.clienteInicio && typeof window.clienteInicio.openLogoutModal === 'function') {
            window.clienteInicio.openLogoutModal();
        } else {
            // Fallback caso o clienteInicio não esteja disponível
            const logoutModal = document.getElementById('logoutModal');
            if (logoutModal) {
                logoutModal.classList.add('active');
            } else {
                this.showNotification('Função de logout não disponível', 'warning');
            }
        }
    }

    showNotification(message, type = 'info') {
        // Remover notificações existentes deste módulo
        document.querySelectorAll('.pm-notification').forEach(n => n.remove());
        
        // Criar notificação (namespace: pm-notification)
        const notification = document.createElement('div');
        notification.className = `notification pm-notification ${type}`;
        
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
            animation: 'vp-slideInRight 1.5s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
        });
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'vp-slideOutRight 1.5s ease forwards';
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
    window.profileMenu = new ProfileMenu();
});
