// vendedor-inicio.js - Gerenciamento principal da página inicial do vendedor

class VendedorInicio {
    constructor() {
        this.NOTIFICATION_DURATION = 3000; // 3 segundos
        this.init();
    }

    init() {
        this.restoreDarkMode();
        this.initializeComponents();
        this.setupEventListeners();
        this.loadInitialData();
    }

    initializeComponents() {
        // Elementos principais da página
        this.sellerMenuBtns = document.querySelectorAll('.seller-menu-btn');
        this.searchInput = document.querySelector('.search-input');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        
        // Modal de logout
        this.logoutModal = document.getElementById('logoutModal');
        this.closeModal = document.getElementById('closeModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogoutBtn = document.getElementById('confirmLogout');
        
        // Estado
        this.isDarkMode = localStorage.getItem('reuse_dark_mode') === 'true';
    }

    setupEventListeners() {
        // Menu do vendedor
        this.sellerMenuBtns.forEach(button => {
            button.addEventListener('click', () => this.handleMenuClick(button));
        });

        // Barra de pesquisa
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => this.handleSearch(e));
        }

        // Modo noturno - NÃO gerenciar aqui, deixar para legal-vendedor.js ou página específica
        // if (this.darkModeBtn) {
        //     this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        // }

        // Modal de logout
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

        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.logoutModal.classList.contains('active')) {
                this.closeLogoutModal();
            }
        });
    }

    loadInitialData() {
        // Carregar dados iniciais se necessário
        this.updateDashboardStats();
    }

    handleMenuClick(button) {
        // Remover active de todos os botões
        this.sellerMenuBtns.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        button.classList.add('active');
        
        // Mostrar feedback
        const menuItem = button.textContent.trim();
        this.showNotification(`Abrindo: ${menuItem}`, 'info');
        
        // Aqui você pode adicionar lógica para carregar conteúdo específico
        this.loadMenuContent(menuItem);
    }

    handleSearch(e) {
        if (e.key === 'Enter') {
            const query = this.searchInput.value.trim();
            if (query) {
                this.showNotification(`Pesquisando por: "${query}"`, 'info');
                // Lógica de pesquisa específica do vendedor
                this.performSellerSearch(query);
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

    openAccessibilityMenu() {
        // Acessibilidade gerenciada pelo accessibility-menu.js
        if (window.accessibilityMenu) {
            window.accessibilityMenu.openMenu();
        }
    }

    closeAccessibilityMenu() {
        // Acessibilidade gerenciada pelo accessibility-menu.js
        if (window.accessibilityMenu) {
            window.accessibilityMenu.closeMenu();
        }
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
        // Limpar dados da sessão do vendedor
        localStorage.removeItem('seller_session');
        sessionStorage.clear();
        
        // Fechar modal
        this.closeLogoutModal();
        
        // Redirecionar para página de login do vendedor
        setTimeout(() => {
            window.location.href = 'cadastro-vendedor.html';
        }, 300);
    }

    loadMenuContent(menuItem) {
        // Simulação de carregamento de conteúdo
        switch(menuItem.toLowerCase()) {
            case 'dashboard':
                this.showNotification('Carregando dashboard...', 'info');
                 window.location.href = 'vendedor-inicio.html';
                break;
            case 'meus produtos':
                this.showNotification('Carregando lista de produtos...', 'info');
                 window.location.href = 'vendedor-produtos.html';
                break;
            case 'estatísticas':
                this.showNotification('Carregando estatísticas...', 'info');
                window.location.href = 'vendedor-estatisticas.html';
                break;
            case 'doações':
                this.showNotification('Carregando doações...', 'info');
                window.location.href = 'vendedor-doacoes.html';
                break;
            case 'configurações':
                this.showNotification('Carregando configurações...', 'info');
                window.location.href = 'vendedor-configuracoes.html';
                break;
        }
    }

    performSellerSearch(query) {
        // Lógica de pesquisa específica para vendedor
        console.log('Pesquisando no sistema do vendedor:', query);
        // Implementar busca em produtos, vendas, clientes, etc.
    }

    updateDashboardStats() {
        // Simulação de atualização de dados do dashboard
        setTimeout(() => {
            // Aqui você faria uma requisição AJAX para obter dados reais
            console.log('Atualizando estatísticas do dashboard...');
        }, 1000);
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

    // Integração com botões existentes
    setupIntegration() {
        // Botão de logout no dropdown
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
                
                // Abrir modal de logout
                this.openLogoutModal();
            });
        }
        
        // Botão de logout no menu expandido
        const profileLogout = document.querySelector('.profile-nav-item.logout');
        if (profileLogout) {
            profileLogout.addEventListener('click', () => {
                if (window.profileMenu) {
                    window.profileMenu.closeMenu();
                }
                this.openLogoutModal();
            });
        }
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
        
        /* Estilos de acessibilidade */
        .high-contrast {
            --text-dark: #000000;
            --text-medium: #333333;
            --text-light: #666666;
            --card-bg: #ffffff;
            --light-gray-2: #dddddd;
            filter: contrast(1.2);
        }
        
        .large-text {
            font-size: 1.2em;
        }
        
        .large-text * {
            font-size: inherit;
        }
        
        .colorblind-mode {
            filter: grayscale(0.5) contrast(1.1);
        }
        
        .screen-reader .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        body.dark-mode .high-contrast {
            --text-dark: #ffffff;
            --text-medium: #cccccc;
            --text-light: #999999;
            --card-bg: #000000;
            --light-gray-2: #333333;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Inicializar a aplicação do vendedor
    window.vendedorInicio = new VendedorInicio();
    window.vendedorInicio.setupIntegration();
});