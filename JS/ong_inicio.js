// ong-inicio.js - Gerenciamento principal da página inicial da ONG

class OngInicio {
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
        this.actionCards = document.querySelectorAll('.action-card');
        this.searchInput = document.querySelector('.search-input');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.colorblindBtn = document.getElementById('colorblindBtn');
        this.campanhasBtn = document.getElementById('campanhasBtn');
        this.doacoesBtn = document.getElementById('doacoesBtn');
        
        // Modal de logout
        this.logoutModal = document.getElementById('logoutModal');
        this.closeModal = document.getElementById('closeModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogoutBtn = document.getElementById('confirmLogout');
        
        // Modal de campanha
        this.novaCampanhaModal = document.getElementById('novaCampanhaModal');
        this.closeCampanhaModal = document.getElementById('closeCampanhaModal');
        this.cancelCampanha = document.getElementById('cancelCampanha');
        this.criarCampanhaBtn = document.getElementById('criarCampanha');
        
        // Tabs de doações
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.doacoesPendentes = document.getElementById('doacoesPendentes');
        
        // Estado
        this.isDarkMode = localStorage.getItem('reuse_dark_mode') === 'true';
    }

    setupEventListeners() {
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

        // Botões de ação
        if (this.campanhasBtn) {
            this.campanhasBtn.addEventListener('click', () => this.showCampanhas());
        }

        if (this.doacoesBtn) {
            this.doacoesBtn.addEventListener('click', () => this.showDoacoes());
        }

        // Botão de criar campanha
        const btnCriarCampanha = document.querySelector('.btn-criar-campanha');
        if (btnCriarCampanha) {
            btnCriarCampanha.addEventListener('click', () => this.openNovaCampanhaModal());
        }

        // Tabs de doações
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleTabClick(btn));
        });

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

        // Fechar modal de logout ao clicar fora
        if (this.logoutModal) {
            this.logoutModal.addEventListener('click', (e) => {
                if (e.target === this.logoutModal) {
                    this.closeLogoutModal();
                }
            });
        }

        // Modal de campanha
        if (this.closeCampanhaModal) {
            this.closeCampanhaModal.addEventListener('click', () => this.closeNovaCampanhaModal());
        }

        if (this.cancelCampanha) {
            this.cancelCampanha.addEventListener('click', () => this.closeNovaCampanhaModal());
        }

        if (this.criarCampanhaBtn) {
            this.criarCampanhaBtn.addEventListener('click', () => this.criarCampanha());
        }

        // Fechar modal de campanha ao clicar fora
        if (this.novaCampanhaModal) {
            this.novaCampanhaModal.addEventListener('click', (e) => {
                if (e.target === this.novaCampanhaModal) {
                    this.closeNovaCampanhaModal();
                }
            });
        }

        // Upload de imagem na campanha
        const uploadArea = document.getElementById('campanhaImageUpload');
        const fileInput = document.getElementById('campanhaImagem');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0]);
                }
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--primary-purple)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = 'var(--light-gray-2)';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--light-gray-2)';
                
                if (e.dataTransfer.files.length > 0) {
                    this.handleImageUpload(e.dataTransfer.files[0]);
                }
            });
        }
    }

    setupGlobalEventListeners() {
        document.addEventListener('click', (e) => {
            // Modo daltonismo
            if (e.target.closest('#colorblindBtn')) {
                this.handleColorblindMode();
            }

            // Detalhes da doação
            if (e.target.closest('.btn-outline') && e.target.closest('.doacao-item')) {
                const doacaoItem = e.target.closest('.doacao-item');
                this.openDetalhesDoacao(doacaoItem);
            }
        });
    }

    loadInitialData() {
        this.loadOngData();
        this.updateMetrics();
    }

    loadOngData() {
        // Simular carregamento de dados da ONG
        console.log('Carregando dados da ONG...');
        
        // Atualizar contador de doações
        const doacoesCount = document.querySelector('#doacoesBtn');
        if (doacoesCount) {
            doacoesCount.setAttribute('data-count', '5');
        }
    }

    updateMetrics() {
        // Simular atualização das métricas
        // Em produção, isso viria de uma API
    }

    handleActionCardClick(card) {
        const action = card.querySelector('h3').textContent.toLowerCase();
        
        switch(action) {
            case 'criar campanha':
                this.openNovaCampanhaModal();
                break;
                
            case 'gerenciar doações':
                this.showDoacoes();
                this.showNotification('Carregando doações...', 'info');
                break;
                
            case 'relatórios':
                this.showNotification('Abrindo relatórios...', 'info');
                setTimeout(() => {
                    window.location.href = 'ong-relatorios.html';
                }, 2000);
                break;
                
            case 'produtos':
                this.showNotification('Abrindo produtos da ONG...', 'info');
                if (window.profileMenu) {
                    setTimeout(() => {
                        window.location.href = 'ong-produtos.html';
                    }, 2000);
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
        document.body.classList.toggle('colorblind-mode');
        const isActive = document.body.classList.contains('colorblind-mode');
        
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

    handleTabClick(btn) {
        // Remover active de todas as tabs
        this.tabButtons.forEach(b => b.classList.remove('active'));
        
        // Adicionar active à tab clicada
        btn.classList.add('active');
        
        const tab = btn.getAttribute('data-tab');
        this.showNotification(`Mostrando doações ${tab}`, 'info');
        
        // Em produção, isso carregaria as doações correspondentes
        this.loadDoacoesByTab(tab);
    }

    loadDoacoesByTab(tab) {
        console.log(`Carregando doações ${tab}...`);
        // Simular carregamento de doações por tipo
    }

    showCampanhas() {
        const campanhasSection = document.querySelector('.campanhas-section');
        if (campanhasSection) {
            campanhasSection.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Campanhas ativas', 'info');
        }
    }

    showDoacoes() {
        const doacoesSection = document.querySelector('.doacoes-recentes-section');
        if (doacoesSection) {
            doacoesSection.scrollIntoView({ behavior: 'smooth' });
            this.showNotification('Doações recentes', 'info');
        }
    }

    openNovaCampanhaModal() {
        if (this.novaCampanhaModal) {
            this.novaCampanhaModal.classList.add('active');
        }
    }

    closeNovaCampanhaModal() {
        if (this.novaCampanhaModal) {
            this.novaCampanhaModal.classList.remove('active');
            this.resetCampanhaForm();
        }
    }

    resetCampanhaForm() {
        const form = document.getElementById('campanhaForm');
        if (form) {
            form.reset();
        }

        const uploadArea = document.getElementById('campanhaImageUpload');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <div class="image-upload-icon">
                    <i class="bi bi-cloud-arrow-up"></i>
                </div>
                <div class="image-upload-text">
                    <h4>Arraste uma imagem aqui</h4>
                    <p>ou clique para selecionar</p>
                </div>
            `;
        }
    }

    criarCampanha() {
        // Validar formulário
        const titulo = document.getElementById('campanhaTitulo');
        const descricao = document.getElementById('campanhaDescricao');
        const tipo = document.getElementById('campanhaTipo');
        const meta = document.getElementById('campanhaMeta');
        const dataInicio = document.getElementById('campanhaDataInicio');
        const dataFim = document.getElementById('campanhaDataFim');
        const termos = document.getElementById('campanhaTermos');

        if (!titulo.value || !descricao.value || !tipo.value || !meta.value || !dataInicio.value || !dataFim.value) {
            this.showNotification('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        if (!termos.checked) {
            this.showNotification('Você precisa aceitar os termos para criar a campanha', 'error');
            return;
        }

        // Simular criação de campanha
        this.showNotification('Campanha criada com sucesso! Aguardando aprovação.', 'success');
        this.closeNovaCampanhaModal();

        // Em produção, isso enviaria os dados para a API
        setTimeout(() => {
            // Recarregar lista de campanhas
            location.reload();
        }, 2000);
    }

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecione uma imagem válida', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            this.showNotification('A imagem deve ter no máximo 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadArea = document.getElementById('campanhaImageUpload');
            if (uploadArea) {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: var(--border-radius-md);">
                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-light);">
                        ${file.name} (${(file.size / 1024).toFixed(1)} KB)
                    </p>
                `;
            }
        };
        reader.readAsDataURL(file);
    }

    openDetalhesDoacao(doacaoItem) {
        const modal = document.getElementById('detalhesDoacaoModal');
        if (modal) {
            modal.classList.add('active');

            // Preencher dados da doação (em produção, isso viria de uma API)
            const closeBtn = document.getElementById('closeDetalhesModal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeDetalhesDoacao());
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeDetalhesDoacao();
                }
            });
        }
    }

    closeDetalhesDoacao() {
        const modal = document.getElementById('detalhesDoacaoModal');
        if (modal) {
            modal.classList.remove('active');
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
        localStorage.removeItem('user_session');
        sessionStorage.clear();
        
        this.closeLogoutModal();
        
        setTimeout(() => {
            window.location.href = 'cadastro-ong.html';
        }, 300);
    }

    showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        if (type === 'warning') iconClass = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : 
                       type === 'warning' ? '#ffa502' : '#9933cc',
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.NOTIFICATION_DURATION);
    }

    // Métodos utilitários
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
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
    
    // Inicializar a aplicação principal da ONG
    window.ongInicio = new OngInicio();
    
    // Configurar integração entre módulos
    setupModuleIntegration();
});

// Função para integrar os módulos
function setupModuleIntegration() {
    // Configurar botão de logout no dropdown
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
            
            if (window.ongInicio) {
                window.ongInicio.openLogoutModal();
            }
        });
    }
    
    // Configurar dropdown toggle
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileMenu');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Configurar botões do dropdown
    document.addEventListener('click', (e) => {
        const dropdownItem = e.target.closest('.dropdown-item');
        if (dropdownItem && !dropdownItem.classList.contains('logout')) {
            e.preventDefault();
            e.stopPropagation();
            
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
            
            if (dropdownItem.querySelector('i.bi-building')) {
                // Perfil da ONG
                if (window.profileMenu) {
                    window.profileMenu.openMenu();
                }
            } else if (dropdownItem.querySelector('i.bi-megaphone')) {
                // Campanhas
                if (window.ongInicio) {
                    window.ongInicio.showCampanhas();
                }
            } else if (dropdownItem.querySelector('i.bi-gift')) {
                // Doações
                if (window.ongInicio) {
                    window.ongInicio.showDoacoes();
                }
            } else if (dropdownItem.querySelector('i.bi-bar-chart')) {
                // Relatórios
                window.location.href = 'ong-relatorios.html';
            } else if (dropdownItem.querySelector('i.bi-gear')) {
                // Configurações
                window.location.href = 'ong-configuracoes.html';
            }
        }
    });
}

// Polyfill para Element.closest
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
window.showOngNotification = function(message, type = 'info') {
    if (window.ongInicio) {
        window.ongInicio.showNotification(message, type);
    }
};

window.refreshOngData = function() {
    if (window.ongInicio) {
        window.ongInicio.loadOngData();
    }
};