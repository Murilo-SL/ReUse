// ferramentas.js - Gerenciamento completo da página de ferramentas do vendedor

class FerramentasManager {
    constructor() {
        this.currentSection = null;
        this.tooltipTimeout = null;
        this.modals = new Map();
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupTooltips();
        this.setupNavigation();
        this.setupModals();
        this.checkPremiumStatus();
        this.setupSectionObserver();
    }

    cacheElements() {
        // Elementos principais
        this.quickHelpBtn = document.getElementById('quickHelpBtn');
        this.refreshToolsBtn = document.getElementById('refreshToolsBtn');
        this.toolButtons = document.querySelectorAll('.ferramenta-card-footer .btn');
        this.sectionLinks = document.querySelectorAll('a[href^="#"]');
        this.premiumCards = document.querySelectorAll('.ferramenta-card.premium');
        
        // Seções
        this.sections = {
            analises: document.getElementById('analises'),
            promocoes: document.getElementById('promocoes'),
            logistica: document.getElementById('logistica'),
            financeiro: document.getElementById('financeiro')
        };
        
        // Estado da aplicação
        this.state = {
            isRefreshing: false,
            activeTool: null,
            premiumUser: localStorage.getItem('reuse_premium_user') === 'true',
            visitedSections: new Set()
        };
    }

    setupEventListeners() {
        // Botões de ação rápida
        if (this.quickHelpBtn) {
            this.quickHelpBtn.addEventListener('click', () => this.showQuickHelp());
        }
        
        if (this.refreshToolsBtn) {
            this.refreshToolsBtn.addEventListener('click', () => this.refreshToolsData());
        }
        
        // Botões das ferramentas
        this.toolButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleToolButtonClick(e));
        });
        
        // Links de navegação interna
        this.sectionLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSectionNavigation(e));
        });
        
        // Teclas de atalho
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Atualizar dados quando a página ganha foco
        window.addEventListener('focus', () => this.handlePageFocus());
    }

    setupTooltips() {
        this.premiumCards.forEach(card => {
            this.createTooltip(card);
            this.setupCardHoverEffects(card);
        });
    }

    setupNavigation() {
        // Adicionar indicadores de progresso
        this.setupProgressIndicators();
        
        // Configurar menu ativo baseado na seção visível
        this.setupActiveMenuTracking();
    }

    setupModals() {
        // Pré-carregar modais comuns
        this.preloadModal('help', this.createHelpModalContent());
        this.preloadModal('premium', this.createPremiumModalContent());
    }

    setupSectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.handleSectionVisibility(sectionId, true);
                }
            });
        }, options);

        // Observar todas as seções principais
        Object.values(this.sections).forEach(section => {
            if (section) observer.observe(section);
        });
    }

    setupProgressIndicators() {
        const progressBar = document.createElement('div');
        progressBar.className = 'tools-progress-bar';
        progressBar.innerHTML = `
            <div class="progress-steps">
                ${Object.keys(this.sections).map(section => `
                    <div class="progress-step" data-section="${section}">
                        <span class="step-icon"></span>
                        <span class="step-label">${this.getSectionName(section)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="progress-line">
                <div class="progress-fill"></div>
            </div>
        `;
        
        const header = document.querySelector('.ferramentas-header');
        if (header) {
            header.insertAdjacentElement('afterend', progressBar);
        }
    }

    setupActiveMenuTracking() {
        const menuButtons = document.querySelectorAll('.seller-menu-btn');
        menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const href = button.getAttribute('href');
                if (href && href.includes('#')) {
                    const sectionId = href.split('#')[1];
                    this.updateProgressBar(sectionId);
                }
            });
        });
    }

    createTooltip(card) {
        const tooltip = document.createElement('div');
        tooltip.className = 'premium-tooltip';
        tooltip.innerHTML = `
            <i class="bi bi-star-fill"></i>
            <span>${this.state.premiumUser ? 'Ferramenta Premium' : 'Upgrade para acessar'}</span>
        `;
        card.appendChild(tooltip);
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = setTimeout(() => {
                tooltip.classList.add('visible');
            }, 300);
        });
        
        card.addEventListener('mouseleave', () => {
            clearTimeout(this.tooltipTimeout);
            tooltip.classList.remove('visible');
        });
    }

    setupCardHoverEffects(card) {
        card.addEventListener('mouseenter', () => {
            if (!this.state.premiumUser) {
                card.classList.add('premium-hover');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('premium-hover');
        });
    }

    handleToolButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.currentTarget;
        const toolCard = button.closest('.ferramenta-card');
        const toolName = toolCard.querySelector('h3').textContent;
        const isPremium = toolCard.classList.contains('premium');
        
        // Registrar analytics
        this.trackToolInteraction(toolName);
        
        if (isPremium && !this.state.premiumUser) {
            this.showPremiumModal(toolName, toolCard);
            return;
        }
        
        // Processar abertura da ferramenta
        this.openTool({
            name: toolName,
            element: toolCard,
            button: button,
            isPremium: isPremium
        });
    }

    async openTool(toolInfo) {
        try {
            // Mostrar estado de carregamento
            this.showLoadingState(toolInfo.button);
            
            // Salvar ferramenta ativa
            this.state.activeTool = toolInfo.name;
            
            // Simular API call
            await this.simulateApiCall(1000);
            
            // Executar ação baseada no tipo de ferramenta
            const action = this.getToolAction(toolInfo);
            await action();
            
            // Atualizar estatísticas
            this.updateToolUsage(toolInfo.name);
            
        } catch (error) {
            console.error('Erro ao abrir ferramenta:', error);
            this.showNotification(`Erro ao abrir ${toolInfo.name}`, 'error');
        } finally {
            this.removeLoadingState(toolInfo.button);
        }
    }

    getToolAction(toolInfo) {
        const toolType = toolInfo.button.textContent.trim().toLowerCase();
        const actions = {
            'acessar': () => this.openAnalyticsDashboard(toolInfo),
            'analisar': () => this.openCustomerAnalysis(toolInfo),
            'ver produtos': () => this.openProductPerformance(toolInfo),
            'criar cupom': () => this.openCouponCreator(toolInfo),
            'configurar': () => this.openEmailMarketing(toolInfo),
            'criar anúncio': () => this.openSponsoredAds(toolInfo),
            'calcular frete': () => this.openShippingCalculator(toolInfo),
            'gerenciar': () => this.openInventoryManagement(toolInfo),
            'rastrear envios': () => this.openTrackingDashboard(toolInfo),
            'visualizar': () => this.openReceivables(toolInfo),
            'gerar relatório': () => this.openFiscalReports(toolInfo),
            'definir meta': () => this.openProfitGoals(toolInfo)
        };
        
        return actions[toolType] || (() => this.defaultToolAction(toolInfo));
    }

    async openAnalyticsDashboard(toolInfo) {
        this.showNotification('Abrindo dashboard de análises...', 'info');
        // Simulação de redirecionamento ou modal
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const modalContent = `
            <div class="analytics-preview">
                <h3><i class="bi bi-speedometer2"></i> ${toolInfo.name}</h3>
                <div class="preview-charts">
                    <div class="chart-placeholder">
                        <i class="bi bi-bar-chart-line"></i>
                        <p>Gráfico de conversão</p>
                    </div>
                    <div class="chart-placeholder">
                        <i class="bi bi-pie-chart"></i>
                        <p>Análise de canais</p>
                    </div>
                </div>
                <div class="preview-actions">
                    <button class="btn btn-primary" onclick="ferramentasManager.launchFullAnalytics()">
                        <i class="bi bi-arrows-fullscreen"></i>
                        Abrir em Tela Cheia
                    </button>
                </div>
            </div>
        `;
        
        this.showToolModal(toolInfo.name, modalContent);
    }

    async openCustomerAnalysis(toolInfo) {
        this.showNotification('Carregando análise de clientes...', 'info');
        // Implementação específica
    }

    async openProductPerformance(toolInfo) {
        this.showNotification('Abrindo desempenho de produtos...', 'info');
        // Implementação específica
    }

    async openCouponCreator(toolInfo) {
        this.showNotification('Abrindo criador de cupons...', 'info');
        // Implementação específica
    }

    async openEmailMarketing(toolInfo) {
        this.showNotification('Configurando email marketing...', 'info');
        // Implementação específica
    }

    async openSponsoredAds(toolInfo) {
        this.showNotification('Abrindo gerenciador de anúncios...', 'info');
        // Implementação específica
    }

    async openShippingCalculator(toolInfo) {
        this.showNotification('Calculando fretes...', 'info');
        // Implementação específica
    }

    async openInventoryManagement(toolInfo) {
        this.showNotification('Abrindo gestão de estoque...', 'info');
        // Implementação específica
    }

    async openTrackingDashboard(toolInfo) {
        this.showNotification('Carregando rastreamento...', 'info');
        // Implementação específica
    }

    async openReceivables(toolInfo) {
        this.showNotification('Abrindo contas a receber...', 'info');
        // Implementação específica
    }

    async openFiscalReports(toolInfo) {
        this.showNotification('Gerando relatórios fiscais...', 'info');
        // Implementação específica
    }

    async openProfitGoals(toolInfo) {
        this.showNotification('Configurando metas de lucro...', 'info');
        // Implementação específica
    }

    defaultToolAction(toolInfo) {
        return new Promise(resolve => {
            this.showNotification(`Ferramenta "${toolInfo.name}" em desenvolvimento`, 'info');
            setTimeout(resolve, 1000);
        });
    }

    showToolModal(title, content) {
        const modalId = 'tool-modal-' + Date.now();
        const modal = document.createElement('div');
        modal.className = 'modal active tool-modal';
        modal.id = modalId;
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="ferramentasManager.closeModal('${modalId}')">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="ferramentasManager.closeModal('${modalId}')">
                        Fechar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modals.set(modalId, modal);
        
        // Fechar com ESC
        const closeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modalId);
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);
        
        // Fechar clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modalId);
            }
        });
    }

    closeModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                this.modals.delete(modalId);
            }, 300);
        }
    }

    handleSectionNavigation(e) {
        e.preventDefault();
        const link = e.currentTarget;
        const targetId = link.getAttribute('href').substring(1);
        
        if (this.sections[targetId]) {
            this.scrollToSection(targetId);
            this.trackSectionVisit(targetId);
        }
    }

    scrollToSection(sectionId) {
        const section = this.sections[sectionId];
        if (!section) return;
        
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const menuHeight = document.querySelector('.seller-menu-bar').offsetHeight;
        const offset = headerHeight + menuHeight + 30;
        
        window.scrollTo({
            top: section.offsetTop - offset,
            behavior: 'smooth'
        });
        
        // Atualizar barra de progresso
        this.updateProgressBar(sectionId);
        
        // Destacar seção
        this.highlightSection(section);
    }

    highlightSection(section) {
        section.classList.add('active-section');
        
        // Remover destaque após animação
        setTimeout(() => {
            section.classList.remove('active-section');
        }, 2000);
    }

    handleSectionVisibility(sectionId, isVisible) {
        if (isVisible) {
            this.currentSection = sectionId;
            this.state.visitedSections.add(sectionId);
            
            // Atualizar UI
            this.updateActiveSectionUI(sectionId);
            this.updateProgressBar(sectionId);
            
            // Mostrar dica se primeira visita
            if (this.state.visitedSections.size === 1) {
                setTimeout(() => {
                    this.showSectionTip(sectionId);
                }, 1000);
            }
        }
    }

    updateActiveSectionUI(sectionId) {
        // Atualizar menu ativo
        const menuButtons = document.querySelectorAll('.seller-menu-btn');
        menuButtons.forEach(button => {
            const href = button.getAttribute('href');
            if (href && href.includes(sectionId)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    updateProgressBar(sectionId) {
        const steps = document.querySelectorAll('.progress-step');
        const progressFill = document.querySelector('.progress-fill');
        
        if (!steps.length || !progressFill) return;
        
        const sectionOrder = ['analises', 'promocoes', 'logistica', 'financeiro'];
        const currentIndex = sectionOrder.indexOf(sectionId);
        
        if (currentIndex === -1) return;
        
        const progressPercentage = (currentIndex / (sectionOrder.length - 1)) * 100;
        
        // Atualizar visual
        steps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentIndex);
            step.classList.toggle('visited', index < currentIndex);
        });
        
        progressFill.style.width = `${progressPercentage}%`;
    }

    showSectionTip(sectionId) {
        const tips = {
            analises: 'Dica: Verifique suas análises toda semana para acompanhar tendências.',
            promocoes: 'Dica: Crie promoções em datas comemorativas para aumentar vendas.',
            logistica: 'Dica: Configure frete grátis acima de um valor mínimo para estimular compras.',
            financeiro: 'Dica: Monitore seu fluxo de caixa diariamente para manter saúde financeira.'
        };
        
        if (tips[sectionId]) {
            this.showNotification(tips[sectionId], 'info', 5000);
        }
    }

    showQuickHelp() {
        this.showModal('help');
    }

    showPremiumModal(toolName, toolCard) {
        const modalContent = this.createPremiumModalContent(toolName);
        const modalId = 'premium-modal-' + Date.now();
        
        const modal = document.createElement('div');
        modal.className = 'modal active premium-modal';
        modal.id = modalId;
        modal.innerHTML = modalContent;
        
        document.body.appendChild(modal);
        this.modals.set(modalId, modal);
        
        // Configurar eventos do modal premium
        this.setupPremiumModalEvents(modalId, toolName, toolCard);
    }

    createPremiumModalContent(toolName = '') {
        return `
            <div class="modal-content">
                <div class="modal-header premium-header">
                    <div class="premium-title">
                        <i class="bi bi-gem"></i>
                        <h3 class="modal-title">Recurso Premium</h3>
                    </div>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="premium-content">
                        <div class="premium-icon-animated">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                            <i class="bi bi-star-half"></i>
                        </div>
                        <h4>${toolName ? `Desbloqueie: ${toolName}` : 'Upgrade para Premium'}</h4>
                        <p>Acesso completo a todas as ferramentas avançadas e recursos exclusivos.</p>
                        
                        <div class="premium-features-grid">
                            <div class="premium-feature">
                                <i class="bi bi-lightning-charge"></i>
                                <span>Ferramentas Avançadas</span>
                            </div>
                            <div class="premium-feature">
                                <i class="bi bi-graph-up-arrow"></i>
                                <span>Relatórios Detalhados</span>
                            </div>
                            <div class="premium-feature">
                                <i class="bi bi-headset"></i>
                                <span>Suporte Prioritário</span>
                            </div>
                            <div class="premium-feature">
                                <i class="bi bi-shield-check"></i>
                                <span>Segurança Avançada</span>
                            </div>
                        </div>
                        
                        <div class="premium-plan-selector">
                            <div class="plan-option active" data-plan="monthly">
                                <h5>Plano Mensal</h5>
                                <div class="plan-price">
                                    <span class="currency">R$</span>
                                    <span class="amount">49,90</span>
                                    <span class="period">/mês</span>
                                </div>
                                <button class="btn btn-premium-sm" data-action="subscribe-monthly">
                                    Assinar
                                </button>
                            </div>
                            <div class="plan-option recommended" data-plan="yearly">
                                <div class="badge-recommended">Economize 20%</div>
                                <h5>Plano Anual</h5>
                                <div class="plan-price">
                                    <span class="currency">R$</span>
                                    <span class="amount">479,90</span>
                                    <span class="period">/ano</span>
                                </div>
                                <button class="btn btn-premium-sm" data-action="subscribe-yearly">
                                    Assinar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-action="cancel">
                        Talvez Depois
                    </button>
                    <button class="btn btn-premium" data-action="try-premium">
                        <i class="bi bi-rocket-takeoff"></i>
                        Experimentar 7 Dias Grátis
                    </button>
                </div>
            </div>
        `;
    }

    setupPremiumModalEvents(modalId, toolName, toolCard) {
        const modal = this.modals.get(modalId);
        if (!modal) return;
        
        const closeModal = () => this.closeModal(modalId);
        
        // Fechar modal
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
        // Ações dos botões
        modal.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            
            switch(action) {
                case 'cancel':
                    closeModal();
                    break;
                    
                case 'try-premium':
                    this.startFreeTrial(toolName);
                    closeModal();
                    break;
                    
                case 'subscribe-monthly':
                    this.subscribeToPlan('monthly', toolName);
                    closeModal();
                    break;
                    
                case 'subscribe-yearly':
                    this.subscribeToPlan('yearly', toolName);
                    closeModal();
                    break;
            }
        });
        
        // Trocar plano
        modal.querySelectorAll('.plan-option').forEach(option => {
            option.addEventListener('click', () => {
                modal.querySelectorAll('.plan-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });
        
        // Fechar clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Fechar com ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    async startFreeTrial(toolName) {
        try {
            this.showNotification('Iniciando período de teste gratuito...', 'info');
            
            // Simular API call
            await this.simulateApiCall(1500);
            
            // Atualizar estado
            this.state.premiumUser = true;
            localStorage.setItem('reuse_premium_user', 'true');
            
            // Atualizar UI
            this.updatePremiumUI();
            
            this.showNotification('Período de teste ativado! Agora você pode acessar todas as ferramentas Premium.', 'success');
            
            // Registrar analytics
            this.trackEvent('free_trial_started', { tool: toolName });
            
        } catch (error) {
            console.error('Erro ao iniciar teste gratuito:', error);
            this.showNotification('Erro ao ativar teste gratuito. Tente novamente.', 'error');
        }
    }

    async subscribeToPlan(planType, toolName) {
        try {
            this.showNotification(`Processando assinatura ${planType}...`, 'info');
            
            // Simular API call
            await this.simulateApiCall(2000);
            
            // Em produção, aqui você redirecionaria para o checkout
            this.showNotification(`Redirecionando para checkout do plano ${planType}...`, 'info');
            
            // Registrar analytics
            this.trackEvent('subscription_started', {
                plan: planType,
                tool: toolName
            });
            
        } catch (error) {
            console.error('Erro na assinatura:', error);
            this.showNotification('Erro no processamento da assinatura.', 'error');
        }
    }

    updatePremiumUI() {
        // Atualizar cards premium
        this.premiumCards.forEach(card => {
            card.classList.remove('premium-locked');
            card.classList.add('premium-unlocked');
            
            // Atualizar tooltip
            const tooltip = card.querySelector('.premium-tooltip');
            if (tooltip) {
                tooltip.innerHTML = '<i class="bi bi-star-fill"></i><span>Ferramenta Premium</span>';
            }
        });
        
        // Atualizar notificações
        this.showNotification('Conta Premium ativada com sucesso!', 'success');
    }

    async refreshToolsData() {
        if (this.state.isRefreshing) return;
        
        try {
            this.state.isRefreshing = true;
            
            // Atualizar estado do botão
            this.showLoadingState(this.refreshToolsBtn);
            this.refreshToolsBtn.disabled = true;
            
            // Simular atualização de dados
            await this.simulateApiCall(2000);
            
            // Atualizar cards
            await this.updateToolCards();
            
            // Mostrar sucesso
            this.showNotification('Dados das ferramentas atualizados com sucesso!', 'success');
            
            // Registrar analytics
            this.trackEvent('tools_refreshed', {
                sections: Array.from(this.state.visitedSections)
            });
            
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            this.showNotification('Erro ao atualizar dados. Tente novamente.', 'error');
        } finally {
            this.state.isRefreshing = false;
            this.removeLoadingState(this.refreshToolsBtn);
            this.refreshToolsBtn.disabled = false;
        }
    }

    async updateToolCards() {
        // Simular atualização de dados nos cards
        const cards = document.querySelectorAll('.ferramenta-card');
        
        cards.forEach((card, index) => {
            // Adicionar efeito de atualização
            card.classList.add('updating');
            
            // Simular novo conteúdo
            setTimeout(() => {
                const valueElement = card.querySelector('.summary-value');
                if (valueElement && index % 3 === 0) {
                    const currentValue = parseFloat(valueElement.textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
                    const newValue = (currentValue * (1 + Math.random() * 0.1)).toFixed(2);
                    valueElement.textContent = `R$ ${newValue.replace('.', ',')}`;
                }
                
                card.classList.remove('updating');
                card.classList.add('updated');
                
                setTimeout(() => {
                    card.classList.remove('updated');
                }, 1000);
                
            }, index * 200);
        });
    }

    showLoadingState(button) {
        if (!button) return;
        
        const originalHTML = button.innerHTML;
        button.dataset.originalHtml = originalHTML;
        button.innerHTML = `
            <i class="bi bi-arrow-clockwise spinning"></i>
            <span>Carregando...</span>
        `;
        button.disabled = true;
    }

    removeLoadingState(button) {
        if (!button) return;
        
        const originalHTML = button.dataset.originalHtml;
        if (originalHTML) {
            button.innerHTML = originalHTML;
        }
        button.disabled = false;
    }

    handleKeyboardShortcuts(e) {
        // Ignorar se estiver em input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Ctrl + H = Ajuda
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            this.showQuickHelp();
        }
        
        // Ctrl + R = Atualizar
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            this.refreshToolsData();
        }
        
        // Navegação por números
        if (e.key >= '1' && e.key <= '4' && e.ctrlKey) {
            e.preventDefault();
            const sections = ['analises', 'promocoes', 'logistica', 'financeiro'];
            const index = parseInt(e.key) - 1;
            if (sections[index]) {
                this.scrollToSection(sections[index]);
            }
        }
    }

    handlePageFocus() {
        // Atualizar dados se a página ficou inativa por mais de 5 minutos
        const lastUpdate = localStorage.getItem('last_tools_update');
        const now = Date.now();
        
        if (lastUpdate && (now - parseInt(lastUpdate)) > 5 * 60 * 1000) {
            this.refreshToolsData();
        }
        
        localStorage.setItem('last_tools_update', now.toString());
    }

    checkPremiumStatus() {
        if (!this.state.premiumUser) {
            this.premiumCards.forEach(card => {
                card.classList.add('premium-locked');
            });
            
            // Mostrar banner de upgrade se nunca viu
            const hasSeenBanner = localStorage.getItem('has_seen_premium_banner');
            if (!hasSeenBanner) {
                setTimeout(() => this.showUpgradeBanner(), 3000);
            }
        }
    }

    showUpgradeBanner() {
        const banner = document.createElement('div');
        banner.className = 'upgrade-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <i class="bi bi-gem"></i>
                <div class="banner-text">
                    <h4>Desbloqueie o Potencial Completo</h4>
                    <p>Upgrade para Premium e acesse todas as ferramentas avançadas</p>
                </div>
                <div class="banner-actions">
                    <button class="btn btn-premium-sm" onclick="ferramentasManager.showPremiumModal()">
                        Ver Planos
                    </button>
                    <button class="btn-close-banner" onclick="this.closest('.upgrade-banner').remove()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.querySelector('.main-content').insertAdjacentElement('afterbegin', banner);
        
        localStorage.setItem('has_seen_premium_banner', 'true');
        
        // Auto-remover após 15 segundos
        setTimeout(() => {
            if (banner.parentNode) {
                banner.classList.add('fade-out');
                setTimeout(() => banner.remove(), 500);
            }
        }, 15000);
    }

    // Métodos utilitários
    simulateApiCall(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    getSectionName(sectionId) {
        const names = {
            analises: 'Análises',
            promocoes: 'Promoções',
            logistica: 'Logística',
            financeiro: 'Financeiro'
        };
        return names[sectionId] || sectionId;
    }

    trackToolInteraction(toolName) {
        console.log('Ferramenta usada:', toolName);
        // Implementar analytics real aqui
    }

    trackSectionVisit(sectionId) {
        console.log('Seção visitada:', sectionId);
        // Implementar analytics real aqui
    }

    trackEvent(eventName, data = {}) {
        console.log('Evento:', eventName, data);
        // Implementar analytics real aqui
    }

    updateToolUsage(toolName) {
        const usage = JSON.parse(localStorage.getItem('tools_usage') || '{}');
        usage[toolName] = (usage[toolName] || 0) + 1;
        localStorage.setItem('tools_usage', JSON.stringify(usage));
    }

    showNotification(message, type = 'info', duration = 3000) {
        if (window.vendedorInicio && window.vendedorInicio.showNotification) {
            window.vendedorInicio.showNotification(message, type, duration);
        } else {
            // Fallback básico
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem;
                background: ${type === 'success' ? '#00cc99' : 
                           type === 'error' ? '#ff4757' : 
                           type === 'warning' ? '#ffa502' : '#0066cc'};
                color: white;
                border-radius: var(--border-radius-md);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    launchFullAnalytics() {
        this.showNotification('Abrindo dashboard completo de análises...', 'info');
        // Implementar abertura da ferramenta em tela cheia
        window.open('/analytics-dashboard', '_blank');
    }

    preloadModal(name, content) {
        this.modals.set(name + '-template', content);
    }

    showModal(name) {
        const template = this.modals.get(name + '-template');
        if (template) {
            const modalId = name + '-' + Date.now();
            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.id = modalId;
            modal.innerHTML = template;
            
            document.body.appendChild(modal);
            this.modals.set(modalId, modal);
            
            // Configurar fechamento
            modal.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal(modalId));
        }
    }

    createHelpModalContent() {
        return `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="bi bi-question-circle"></i>
                        Ajuda Rápida - Ferramentas
                    </h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="help-accordion">
                        <div class="help-item">
                            <button class="help-question">
                                <i class="bi bi-graph-up"></i>
                                Como usar as ferramentas de análise?
                            </button>
                            <div class="help-answer">
                                As ferramentas de análise permitem monitorar o desempenho da sua loja em tempo real. Use os gráficos interativos para identificar tendências e oportunidades de crescimento.
                            </div>
                        </div>
                        <div class="help-item">
                            <button class="help-question">
                                <i class="bi bi-megaphone"></i>
                                Como criar promoções eficientes?
                            </button>
                            <div class="help-answer">
                                Utilize o criador de cupons para oferecer descontos segmentados. Recomendamos criar promoções sazonais e usar anúncios patrocinados para maior alcance.
                            </div>
                        </div>
                        <div class="help-item">
                            <button class="help-question">
                                <i class="bi bi-truck"></i>
                                Como otimizar a logística?
                            </button>
                            <div class="help-answer">
                                Configure corretamente os valores de frete por região e use o rastreamento em tempo real para acompanhar as entregas. Mantenha seu estoque sempre atualizado.
                            </div>
                        </div>
                        <div class="help-item">
                            <button class="help-question">
                                <i class="bi bi-cash-coin"></i>
                                Como gerenciar o financeiro?
                            </button>
                            <div class="help-answer">
                                Acompanhe diariamente suas contas a receber, use os relatórios fiscais automatizados e defina metas realistas de lucro.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary close-help">Fechar</button>
                    <button class="btn btn-primary" onclick="window.open('/ajuda-completa', '_blank')">
                        <i class="bi bi-book"></i>
                        Ver Guia Completo
                    </button>
                </div>
            </div>
        `;
    }
}

// Adicionar estilos CSS dinâmicos
const ferramentasStyles = document.createElement('style');
ferramentasStyles.textContent = `
    .tools-progress-bar {
        position: sticky;
        top: 80px;
        background: var(--card-bg);
        border-radius: var(--border-radius-lg);
        padding: 1rem 1.5rem;
        margin: 1rem 0 2rem;
        border: 1px solid var(--light-gray-2);
        box-shadow: var(--shadow-sm);
        z-index: 100;
    }
    
    .progress-steps {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 2;
    }
    
    .progress-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        position: relative;
    }
    
    .step-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--light-gray-2);
        border: 3px solid var(--card-bg);
        transition: all 0.3s ease;
    }
    
    .progress-step.active .step-icon {
        background: var(--seller-blue);
        transform: scale(1.2);
    }
    
    .progress-step.visited .step-icon {
        background: var(--seller-green);
    }
    
    .step-label {
        font-size: 0.85rem;
        color: var(--text-light);
        font-weight: 600;
        text-align: center;
        transition: color 0.3s ease;
    }
    
    .progress-step.active .step-label {
        color: var(--seller-blue);
    }
    
    .progress-line {
        position: absolute;
        top: 36px;
        left: 50px;
        right: 50px;
        height: 3px;
        background: var(--light-gray-2);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, var(--seller-blue), var(--seller-green));
        transition: width 0.5s ease;
    }
    
    .premium-tooltip {
        position: absolute;
        top: -45px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
        padding: 0.5rem 0.75rem;
        border-radius: var(--border-radius-md);
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .premium-tooltip.visible {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
    
    .premium-tooltip::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #ffd700;
    }
    
    .premium-locked {
        position: relative;
        filter: grayscale(0.3);
        opacity: 0.8;
    }
    
    .premium-locked::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(0,0,0,0.1) 0%, 
            rgba(0,0,0,0.05) 50%, 
            rgba(0,0,0,0.1) 100%);
        z-index: 1;
        pointer-events: none;
    }
    
    .premium-hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
    }
    
    .premium-unlocked {
        animation: unlockAnimation 1s ease;
    }
    
    @keyframes unlockAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .spinning {
        animation: spin 1s linear infinite;
        display: inline-block;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .updating {
        animation: pulseUpdate 1s ease infinite;
    }
    
    @keyframes pulseUpdate {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .updated {
        animation: highlightUpdate 1s ease;
    }
    
    @keyframes highlightUpdate {
        0% { background: var(--seller-green-light); }
        100% { background: var(--card-bg); }
    }
    
    .active-section {
        animation: highlightSection 2s ease;
    }
    
    @keyframes highlightSection {
        0% { background: rgba(0, 102, 204, 0.1); }
        100% { background: transparent; }
    }
    
    .tool-modal .modal-content {
        max-width: 800px;
    }
    
    .analytics-preview {
        padding: 1rem;
    }
    
    .preview-charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .chart-placeholder {
        background: var(--light-gray-2);
        border-radius: var(--border-radius-md);
        padding: 2rem;
        text-align: center;
        color: var(--text-light);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }
    
    .chart-placeholder i {
        font-size: 2rem;
        color: var(--seller-blue);
    }
    
    .preview-actions {
        display: flex;
        justify-content: center;
        margin-top: 1.5rem;
    }
    
    .premium-modal .modal-content {
        max-width: 600px;
    }
    
    .premium-header {
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
    }
    
    .premium-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .premium-icon-animated {
        position: relative;
        height: 60px;
        margin: 1rem auto;
    }
    
    .premium-icon-animated i {
        position: absolute;
        font-size: 2.5rem;
        color: #ffd700;
        animation: starFloat 3s ease-in-out infinite;
    }
    
    .premium-icon-animated i:nth-child(2) {
        left: 40%;
        animation-delay: 0.5s;
    }
    
    .premium-icon-animated i:nth-child(3) {
        left: 60%;
        animation-delay: 1s;
    }
    
    @keyframes starFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(10deg); }
    }
    
    .premium-features-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .premium-feature {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--light-gray-2);
        border-radius: var(--border-radius-md);
    }
    
    .premium-feature i {
        color: #ffd700;
        font-size: 1.2rem;
    }
    
    .premium-plan-selector {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .plan-option {
        position: relative;
        padding: 1.5rem;
        border: 2px solid var(--light-gray-2);
        border-radius: var(--border-radius-lg);
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .plan-option:hover {
        border-color: var(--seller-blue);
        transform: translateY(-2px);
    }
    
    .plan-option.active {
        border-color: #ffd700;
        background: rgba(255, 215, 0, 0.05);
    }
    
    .plan-option.recommended {
        border-color: var(--seller-green);
    }
    
    .badge-recommended {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--seller-green);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: var(--border-radius-round);
        font-size: 0.75rem;
        font-weight: 700;
    }
    
    .plan-price {
        margin: 1rem 0;
        font-weight: 700;
    }
    
    .plan-price .amount {
        font-size: 2rem;
        color: var(--text-dark);
    }
    
    .plan-price .currency {
        font-size: 1rem;
        color: var(--text-light);
    }
    
    .btn-premium, .btn-premium-sm {
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
        border: none;
        font-weight: 700;
        transition: all 0.3s ease;
    }
    
    .btn-premium:hover, .btn-premium-sm:hover {
        background: linear-gradient(135deg, #ffed4e, #fff9c4);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    }
    
    .btn-premium-sm {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    .help-accordion {
        max-width: 600px;
        margin: 0 auto;
    }
    
    .help-item {
        margin-bottom: 0.5rem;
        border: 1px solid var(--light-gray-2);
        border-radius: var(--border-radius-md);
        overflow: hidden;
    }
    
    .help-question {
        width: 100%;
        padding: 1rem 1.5rem;
        background: var(--light-gray-2);
        border: none;
        text-align: left;
        font-weight: 600;
        color: var(--text-dark);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: background 0.3s ease;
    }
    
    .help-question:hover {
        background: var(--light-gray-3);
    }
    
    .help-question i {
        color: var(--seller-blue);
    }
    
    .help-answer {
        padding: 1rem 1.5rem;
        background: var(--card-bg);
        color: var(--text-medium);
        font-size: 0.95rem;
        line-height: 1.5;
        display: none;
    }
    
    .help-item.active .help-answer {
        display: block;
    }
    
    .upgrade-banner {
        position: sticky;
        top: 120px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-lg);
        margin-bottom: 2rem;
        box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
        z-index: 99;
        animation: slideDown 0.5s ease;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .fade-out {
        animation: fadeOut 0.5s ease forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    .banner-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .banner-content i {
        font-size: 1.8rem;
        color: #333;
    }
    
    .banner-text {
        flex: 1;
    }
    
    .banner-text h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1.1rem;
    }
    
    .banner-text p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .banner-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .btn-close-banner {
        background: none;
        border: none;
        color: #333;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: var(--border-radius-round);
        transition: background 0.3s ease;
    }
    
    .btn-close-banner:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    
    /* Responsividade */
    @media (max-width: 768px) {
        .tools-progress-bar {
            padding: 0.75rem 1rem;
            top: 70px;
        }
        
        .step-label {
            font-size: 0.75rem;
        }
        
        .premium-plan-selector,
        .premium-features-grid,
        .preview-charts {
            grid-template-columns: 1fr;
        }
        
        .banner-content {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
        }
        
        .banner-actions {
            width: 100%;
            justify-content: center;
        }
    }
    
    @media (max-width: 480px) {
        .progress-step {
            flex: 0 0 auto;
        }
        
        .step-label {
            display: none;
        }
    }
`;

document.head.appendChild(ferramentasStyles);

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.ferramentasManager = new FerramentasManager();
    
    // Exportar métodos globais
    window.launchFullAnalytics = () => window.ferramentasManager?.launchFullAnalytics();
    window.closeModal = (modalId) => window.ferramentasManager?.closeModal(modalId);
});