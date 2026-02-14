// vendedor-reuse.js - Gerenciamento completo da página da Central do Vendedor

class VendedorReuse {
    constructor() {
        this.currentGuideCategory = 'all';
        this.currentNewsFilter = 'all';
        this.currentNewsView = 'grid';
        this.savedGuides = new Set();
        this.faqData = this.initializeFaqData();
        this.isDarkMode = localStorage.getItem('reuse_dark_mode') === 'true';
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupIntegration();
        this.loadSavedGuides();
        this.setupFAQ();
        this.applyDarkModeStyles();
    }

    initializeComponents() {
        // Elementos principais
        this.categoryTabs = document.querySelectorAll('.category-tab');
        this.guideCards = document.querySelectorAll('.guide-card');
        this.newsFilters = document.querySelectorAll('.news-filter');
        this.viewBtns = document.querySelectorAll('.view-btn');
        this.newsCards = document.querySelectorAll('.news-card');
        
        // Buscas
        this.centralSearchBtn = document.getElementById('centralSearchBtn');
        this.centralSearchInput = document.querySelector('.search-input');
        this.guideSearch = document.getElementById('guideSearch');
        this.faqSearch = document.getElementById('faqSearch');
        
        // Botões de ação
        this.tourBtn = document.getElementById('tourBtn');
        this.showAllToolsBtn = document.getElementById('showAllTools');
        this.startLearningPathBtn = document.getElementById('startLearningPath');
        this.subscribeNewsBtn = document.getElementById('subscribeNews');
        this.reportIssueBtn = document.getElementById('reportIssue');
        
        // Modais
        this.faqModal = document.getElementById('faqModal');
        this.openFaqBtn = document.getElementById('openFaq');
        this.closeFaqModal = document.getElementById('closeFaqModal');
        this.contactSupportBtn = document.getElementById('contactSupport');
        
        this.reportModal = document.getElementById('reportModal');
        this.closeReportModal = document.getElementById('closeReportModal');
        this.cancelReportBtn = document.getElementById('cancelReport');
        this.submitReportBtn = document.getElementById('submitReport');
        
        // Suporte
        this.supportBtns = document.querySelectorAll('.support-btn');
        
        // Navegação
        this.scrollToBtns = document.querySelectorAll('.scroll-to');
        
        // Ordenação
        this.sortGuidesSelect = document.getElementById('sortGuides');
        
        // Paginação
        this.paginationBtns = document.querySelectorAll('.pagination-btn');
        this.paginationNumbers = document.querySelectorAll('.pagination-number');
        
        // Modo noturno
        this.darkModeBtn = document.getElementById('darkModeBtn');
    }

    setupEventListeners() {
        // Busca na central
        if (this.centralSearchBtn) {
            this.centralSearchBtn.addEventListener('click', () => this.handleCentralSearch());
        }
        
        if (this.centralSearchInput) {
            this.centralSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleCentralSearch();
            });
        }

        // Filtros de categorias do guia
        this.categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => this.handleCategoryTab(tab));
        });

        // Busca em guias
        if (this.guideSearch) {
            this.guideSearch.addEventListener('input', (e) => this.handleGuideSearch(e));
        }

        // Ordenação de guias
        if (this.sortGuidesSelect) {
            this.sortGuidesSelect.addEventListener('change', (e) => this.handleSortGuides(e));
        }

        // Filtros de notícias
        this.newsFilters.forEach(filter => {
            filter.addEventListener('click', () => this.handleNewsFilter(filter));
        });

        // Visualização de notícias
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleViewChange(btn));
        });

        // Botões de ação
        if (this.tourBtn) {
            this.tourBtn.addEventListener('click', () => this.startTour());
        }

        if (this.showAllToolsBtn) {
            this.showAllToolsBtn.addEventListener('click', () => this.showAllTools());
        }

        if (this.startLearningPathBtn) {
            this.startLearningPathBtn.addEventListener('click', () => this.startLearningPath());
        }

        if (this.subscribeNewsBtn) {
            this.subscribeNewsBtn.addEventListener('click', () => this.subscribeToNews());
        }

        if (this.reportIssueBtn) {
            this.reportIssueBtn.addEventListener('click', () => this.openReportModal());
        }

        // Modal FAQ
        if (this.openFaqBtn) {
            this.openFaqBtn.addEventListener('click', () => this.openFaqModal());
        }

        if (this.closeFaqModal) {
            this.closeFaqModal.addEventListener('click', () => this.closeFaqModalHandler());
        }

        if (this.contactSupportBtn) {
            this.contactSupportBtn.addEventListener('click', () => this.contactSupport());
        }

        // Modal Reportar Problema
        if (this.closeReportModal) {
            this.closeReportModal.addEventListener('click', () => this.closeReportModalHandler());
        }

        if (this.cancelReportBtn) {
            this.cancelReportBtn.addEventListener('click', () => this.closeReportModalHandler());
        }

        if (this.submitReportBtn) {
            this.submitReportBtn.addEventListener('click', () => this.submitReport());
        }

        // Botões de suporte
        this.supportBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSupportClick(e, btn));
        });

        // Navegação por scroll
        this.scrollToBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });

        // Salvar guias
        document.querySelectorAll('.guide-save').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSaveGuide(e, btn));
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => this.toggleFaqAnswer(question));
        });

        // Paginação
        this.paginationBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handlePagination(btn));
        });

        this.paginationNumbers.forEach(number => {
            number.addEventListener('click', () => this.handlePageNumber(number));
        });

        // Modo noturno
        if (this.darkModeBtn) {
            this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        }

        // Fechar modais com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.faqModal && this.faqModal.classList.contains('active')) {
                    this.closeFaqModalHandler();
                }
                if (this.reportModal && this.reportModal.classList.contains('active')) {
                    this.closeReportModalHandler();
                }
            }
        });

        // Fechar modais clicando fora
        [this.faqModal, this.reportModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        if (modal.id === 'faqModal') this.closeFaqModalHandler();
                        if (modal.id === 'reportModal') this.closeReportModalHandler();
                    }
                });
            }
        });

        // Escutar mudanças no modo escuro
        document.addEventListener('darkModeChanged', (e) => {
            this.isDarkMode = e.detail.isDarkMode;
            this.applyDarkModeStyles();
        });
    }

    setupIntegration() {
        // Verificar se a classe VendedorInicio está disponível
        if (window.vendedorInicio) {
            // Sincronizar estado do modo escuro
            this.isDarkMode = window.vendedorInicio.isDarkMode;
            this.applyDarkModeStyles();
            
            // Configurar botão de logout
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.vendedorInicio.openLogoutModal();
                });
            }

            // Configurar botão de acessibilidade
            const accessibilityBtn = document.getElementById('accessibilityBtn');
            if (accessibilityBtn && window.accessibilityMenu) {
                accessibilityBtn.addEventListener('click', () => {
                    window.accessibilityMenu.openMenu();
                });
            }
        }
    }

    setupFAQ() {
        // Carregar dados do FAQ
        this.populateFAQ();
        
        // Configurar busca no FAQ
        if (this.faqSearch) {
            this.faqSearch.addEventListener('input', (e) => this.searchFAQ(e.target.value));
        }
        
        // Configurar categorias do FAQ
        document.querySelectorAll('.faq-category').forEach(category => {
            category.addEventListener('click', () => this.filterFAQByCategory(category));
        });
    }

    // === MODO NOTURNO ===
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('reuse_dark_mode', this.isDarkMode.toString());
        
        // Aplicar classe ao body
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Atualizar ícone do botão
        this.updateDarkModeIcon();
        
        // Aplicar estilos específicos
        this.applyDarkModeStyles();
        
        // Mostrar notificação
        this.showNotification(`Modo ${this.isDarkMode ? 'Escuro' : 'Claro'} ativado`, 'info');
        
        // Sincronizar com vendedor-inicio se disponível
        if (window.vendedorInicio) {
            window.vendedorInicio.isDarkMode = this.isDarkMode;
            localStorage.setItem('reuse_dark_mode', this.isDarkMode.toString());
        }
        
        // Disparar evento customizado
        document.dispatchEvent(new CustomEvent('darkModeChanged', {
            detail: { isDarkMode: this.isDarkMode }
        }));
    }

    updateDarkModeIcon() {
        if (this.darkModeBtn) {
            const icon = this.darkModeBtn.querySelector('i');
            if (icon) {
                if (this.isDarkMode) {
                    icon.classList.remove('bi-moon');
                    icon.classList.add('bi-sun');
                    this.darkModeBtn.title = 'Modo Claro';
                } else {
                    icon.classList.remove('bi-sun');
                    icon.classList.add('bi-moon');
                    this.darkModeBtn.title = 'Modo Noturno';
                }
            }
        }
    }

    applyDarkModeStyles() {
        // Aplicar estilos dinâmicos que não podem ser feitos apenas com CSS
        if (this.isDarkMode) {
            this.applyDarkColors();
        } else {
            this.applyLightColors();
        }
        
        // Ajustar imagens e elementos visuais
        this.adjustImagesForDarkMode();
        this.adjustModalForDarkMode();
    }

    applyDarkColors() {
        // Ajustar cores de elementos específicos que precisam de JS
        const elementsToAdjust = [
            '.seller-menu-btn',
            '.resource-card',
            '.guide-card',
            '.support-card',
            '.news-card',
            '.issue-item'
        ];
        
        elementsToAdjust.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.transition = 'all 0.3s ease';
            });
        });
        
        // Ajustar cores de texto específicas
        const textElements = document.querySelectorAll('.guide-title, .resource-title, .support-title, .news-title');
        textElements.forEach(element => {
            element.style.color = '';
        });
        
        // Ajustar inputs e textareas
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (this.isDarkMode) {
                input.style.backgroundColor = '#2d2d2d';
                input.style.color = '#e0e0e0';
                input.style.borderColor = '#444';
            } else {
                input.style.backgroundColor = '';
                input.style.color = '';
                input.style.borderColor = '';
            }
        });
    }

    applyLightColors() {
        // Restaurar cores claras
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.color = '';
            input.style.borderColor = '';
        });
    }

    adjustImagesForDarkMode() {
        // Reduzir brilho de imagens no modo escuro
        const images = document.querySelectorAll('.product-image img, .guide-thumbnail i, .news-image i');
        images.forEach(img => {
            if (this.isDarkMode) {
                img.style.filter = 'brightness(0.8)';
            } else {
                img.style.filter = '';
            }
        });
    }

    adjustModalForDarkMode() {
        // Ajustar modais para modo escuro
        const modals = [this.faqModal, this.reportModal];
        modals.forEach(modal => {
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    if (this.isDarkMode) {
                        modalContent.style.backgroundColor = '#2d2d2d';
                        modalContent.style.color = '#e0e0e0';
                    } else {
                        modalContent.style.backgroundColor = '';
                        modalContent.style.color = '';
                    }
                }
            }
        });
    }

    // === MÉTODOS EXISTENTES ===
    initializeFaqData() {
        return {
            'sales': [
                {
                    question: 'Como alterar o status de um pedido?',
                    answer: '<p>Para alterar o status de um pedido:</p><ol><li>Acesse a seção "Pedidos" no seu dashboard</li><li>Clique no pedido desejado</li><li>No canto superior direito, clique em "Alterar Status"</li><li>Selecione o novo status e confirme</li></ol>'
                },
                {
                    question: 'Como emitir uma nota fiscal?',
                    answer: '<p>A emissão de nota fiscal é automática para pedidos acima de R$ 79,90. Para valores menores, você pode emitir manualmente na seção "Financeiro".</p>'
                }
            ],
            'finance': [
                {
                    question: 'Quando recebo o dinheiro das minhas vendas?',
                    answer: '<p>O pagamento é realizado em até 14 dias úteis após a confirmação de entrega pelo cliente.</p>'
                }
            ],
            'products': [
                {
                    question: 'Quantas imagens posso adicionar por produto?',
                    answer: '<p>Você pode adicionar até 10 imagens por produto. Recomendamos pelo menos 3 imagens de diferentes ângulos.</p>'
                }
            ],
            'technical': [
                {
                    question: 'O site está muito lento, o que fazer?',
                    answer: '<p>Limpe o cache do seu navegador e verifique sua conexão com a internet. Se o problema persistir, entre em contato com o suporte técnico.</p>'
                }
            ],
            'account': [
                {
                    question: 'Como alterar meu e-mail de cadastro?',
                    answer: '<p>Acesse "Configurações da Conta" → "Informações Pessoais" → "Alterar E-mail". Você receberá um e-mail de confirmação.</p>'
                }
            ]
        };
    }

    populateFAQ() {
        const faqContent = document.querySelector('.faq-content');
        if (!faqContent) return;

        let html = '';
        
        for (const [category, items] of Object.entries(this.faqData)) {
            const categoryName = this.getCategoryName(category);
            html += `
                <div class="faq-section" data-category="${category}">
                    <h4>${categoryName}</h4>
            `;
            
            items.forEach((item, index) => {
                html += `
                    <div class="faq-item">
                        <button class="faq-question">
                            ${item.question}
                            <i class="bi bi-chevron-down"></i>
                        </button>
                        <div class="faq-answer">
                            ${item.answer}
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        faqContent.innerHTML = html;
        
        // Reconfigurar listeners para os novos elementos
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => this.toggleFaqAnswer(question));
        });
    }

    getCategoryName(categoryKey) {
        const categories = {
            'sales': 'Vendas e Pedidos',
            'finance': 'Financeiro',
            'products': 'Produtos',
            'technical': 'Técnico',
            'account': 'Conta'
        };
        return categories[categoryKey] || categoryKey;
    }

    handleCentralSearch() {
        const query = this.centralSearchInput.value.trim();
        if (!query) return;
        
        this.showNotification(`Buscando por: "${query}" na Central do Vendedor`, 'info');
        
        // Simular busca
        setTimeout(() => {
            const results = [
                { title: 'Ferramenta de Análises', section: 'central-vendedor' },
                { title: 'Guia de Fotografia', section: 'guia-vendas' },
                { title: 'Suporte por Chat', section: 'suporte-vendedor' }
            ];
            
            this.showSearchResults(query, results);
        }, 1000);
    }

    handleCategoryTab(clickedTab) {
        // Remover active de todas as tabs
        this.categoryTabs.forEach(tab => tab.classList.remove('active'));
        
        // Adicionar active à tab clicada
        clickedTab.classList.add('active');
        
        // Atualizar categoria atual
        this.currentGuideCategory = clickedTab.dataset.category;
        
        // Filtrar guias
        this.filterGuides();
    }

    filterGuides() {
        const searchTerm = this.guideSearch ? this.guideSearch.value.toLowerCase() : '';
        
        this.guideCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('.guide-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.guide-excerpt').textContent.toLowerCase();
            
            const matchesCategory = this.currentGuideCategory === 'all' || 
                                   category.includes(this.currentGuideCategory);
            const matchesSearch = !searchTerm || 
                                 title.includes(searchTerm) || 
                                 excerpt.includes(searchTerm);
            
            card.style.display = matchesCategory && matchesSearch ? 'flex' : 'none';
        });
        
        // Mostrar contagem
        const visibleCount = Array.from(this.guideCards).filter(card => 
            card.style.display !== 'none'
        ).length;
        
        this.updateGuideCount(visibleCount);
    }

    handleGuideSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.filterGuides();
        
        // Destacar termos da busca
        if (searchTerm) {
            this.highlightSearchTerms(searchTerm);
        }
    }

    highlightSearchTerms(searchTerm) {
        this.guideCards.forEach(card => {
            const title = card.querySelector('.guide-title');
            const excerpt = card.querySelector('.guide-excerpt');
            
            this.highlightText(title, searchTerm);
            this.highlightText(excerpt, searchTerm);
        });
    }

    highlightText(element, searchTerm) {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlighted = text.replace(regex, '<mark>$1</mark>');
        element.innerHTML = highlighted;
    }

    handleSortGuides(e) {
        const sortBy = e.target.value;
        const cards = Array.from(this.guideCards);
        
        cards.sort((a, b) => {
            switch(sortBy) {
                case 'recent':
                    return 0;
                case 'popular':
                    const viewsA = parseInt(a.querySelector('.guide-views')?.textContent) || 0;
                    const viewsB = parseInt(b.querySelector('.guide-views')?.textContent) || 0;
                    return viewsB - viewsA;
                case 'duration':
                    const durationA = parseInt(a.dataset.duration) || 0;
                    const durationB = parseInt(b.dataset.duration) || 0;
                    return durationA - durationB;
                case 'difficulty':
                    const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                    const diffA = difficultyOrder[a.dataset.difficulty] || 0;
                    const diffB = difficultyOrder[b.dataset.difficulty] || 0;
                    return diffA - diffB;
                default:
                    return 0;
            }
        });
        
        // Reordenar no DOM
        const container = document.querySelector('.guides-grid');
        if (container) {
            cards.forEach(card => container.appendChild(card));
        }
    }

    handleNewsFilter(clickedFilter) {
        // Remover active de todos os filtros
        this.newsFilters.forEach(filter => filter.classList.remove('active'));
        
        // Adicionar active ao filtro clicado
        clickedFilter.classList.add('active');
        
        // Atualizar filtro atual
        this.currentNewsFilter = clickedFilter.dataset.filter;
        
        // Filtrar notícias
        this.filterNews();
    }

    filterNews() {
        this.newsCards.forEach(card => {
            const category = card.dataset.category;
            const matchesFilter = this.currentNewsFilter === 'all' || 
                                 category === this.currentNewsFilter;
            
            card.style.display = matchesFilter ? 'flex' : 'none';
        });
        
        // Atualizar contagem
        this.updateNewsCount();
    }

    handleViewChange(clickedBtn) {
        // Remover active de todos os botões
        this.viewBtns.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        clickedBtn.classList.add('active');
        
        // Atualizar visualização atual
        this.currentNewsView = clickedBtn.dataset.view;
        
        // Aplicar visualização
        const newsContainer = document.getElementById('newsContainer');
        if (newsContainer) {
            if (this.currentNewsView === 'list') {
                newsContainer.classList.add('list-view');
            } else {
                newsContainer.classList.remove('list-view');
            }
        }
    }

    startTour() {
        this.showNotification('Iniciando tour pela Central do Vendedor...', 'info');
        
        // Simular tour
        const steps = [
            { section: 'central-vendedor', message: 'Aqui estão as ferramentas principais para gerenciar seu negócio' },
            { section: 'guia-vendas', message: 'Aprenda técnicas para aumentar suas vendas' },
            { section: 'suporte-vendedor', message: 'Precisa de ajuda? Aqui estão todas as opções de suporte' },
            { section: 'novidades', message: 'Fique por dentro das últimas atualizações da plataforma' }
        ];
        
        let currentStep = 0;
        
        const showStep = () => {
            if (currentStep >= steps.length) {
                this.showNotification('Tour concluído!', 'success');
                return;
            }
            
            const step = steps[currentStep];
            this.scrollToSection(`#${step.section}`);
            this.showNotification(step.message, 'info');
            currentStep++;
            
            setTimeout(showStep, 3000);
        };
        
        showStep();
    }

    showAllTools() {
        this.showNotification('Carregando todas as ferramentas disponíveis...', 'info');
        
        // Simular carregamento
        setTimeout(() => {
            this.showNotification('10 ferramentas adicionais carregadas', 'success');
        }, 1500);
    }

    startLearningPath() {
        this.showNotification('Iniciando trilha de aprendizado personalizada...', 'info');
        
        // Determinar nível do vendedor
        const completedGuides = document.querySelectorAll('.guide-completed').length;
        let level = 'beginner';
        
        if (completedGuides > 5) level = 'intermediate';
        if (completedGuides > 10) level = 'advanced';
        
        // Mostrar trilha recomendada
        const paths = {
            beginner: ['Fotografia', 'Descrições', 'Precificação Básica'],
            intermediate: ['Otimização SEO', 'Análise de Mercado', 'Estratégias de Venda'],
            advanced: ['Automação', 'Análise Avançada', 'Expansão de Negócio']
        };
        
        const message = `Trilha recomendada para nível ${level}: ${paths[level].join(', ')}`;
        this.showNotification(message, 'success');
    }

    subscribeToNews() {
        const email = prompt('Digite seu e-mail para receber atualizações:');
        if (email) {
            // Validar e-mail simples
            if (email.includes('@') && email.includes('.')) {
                this.showNotification(`Inscrição realizada com sucesso! Você receberá nossas novidades em ${email}`, 'success');
                
                // Simular envio para backend
                setTimeout(() => {
                    console.log('E-mail cadastrado para newsletter:', email);
                }, 500);
            } else {
                this.showNotification('Por favor, insira um e-mail válido.', 'error');
            }
        }
    }

    openReportModal() {
        if (this.reportModal) {
            this.reportModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.adjustModalForDarkMode();
        }
    }

    closeReportModalHandler() {
        if (this.reportModal) {
            this.reportModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Limpar formulário
            const form = document.getElementById('reportForm');
            if (form) form.reset();
        }
    }

    submitReport() {
        const issueType = document.getElementById('issueType')?.value;
        const description = document.getElementById('issueDescription')?.value;
        const email = document.getElementById('contactEmail')?.value;
        
        if (!issueType || !description || !email) {
            this.showNotification('Preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Simular envio do relatório
        this.showNotification('Enviando relatório de problema...', 'info');
        
        setTimeout(() => {
            this.showNotification('Relatório enviado com sucesso! Entraremos em contato em até 24h.', 'success');
            this.closeReportModalHandler();
        }, 1500);
    }

    openFaqModal() {
        if (this.faqModal) {
            this.faqModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.adjustModalForDarkMode();
            
            // Focar no campo de busca
            setTimeout(() => {
                if (this.faqSearch) {
                    this.faqSearch.focus();
                }
            }, 300);
        }
    }

    closeFaqModalHandler() {
        if (this.faqModal) {
            this.faqModal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Limpar busca
            if (this.faqSearch) {
                this.faqSearch.value = '';
                this.searchFAQ('');
            }
            
            // Resetar categorias
            document.querySelectorAll('.faq-category').forEach(cat => {
                cat.classList.remove('active');
            });
            const allCategory = document.querySelector('.faq-category[data-category="all"]');
            if (allCategory) allCategory.classList.add('active');
            
            // Fechar todas as respostas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    }

    contactSupport() {
        this.closeFaqModalHandler();
        setTimeout(() => {
            this.showNotification('Redirecionando para o suporte...', 'info');
        }, 300);
    }

    handleSupportClick(e, btn) {
        e.preventDefault();
        
        const supportType = btn.dataset.support;
        
        switch(supportType) {
            case 'chat':
                this.openChatSupport();
                break;
            case 'email':
                window.location.href = 'mailto:vendedores@reuse.com?subject=Suporte Vendedor ReUse';
                break;
            case 'faq':
                this.openFaqModal();
                break;
            case 'phone':
                this.callSupport();
                break;
        }
    }

    openChatSupport() {
        this.showNotification('Conectando com nosso suporte...', 'info');
        
        setTimeout(() => {
            this.showNotification('Chat iniciado! Um atendente já está disponível.', 'success');
        }, 1500);
    }

    callSupport() {
        this.showNotification('Ligando para (11) 4004-5588...', 'info');
    }

    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Adicionar destaque temporário
            section.style.boxShadow = '0 0 0 3px rgba(26, 86, 219, 0.3)';
            setTimeout(() => {
                section.style.boxShadow = '';
            }, 2000);
        }
    }

    handleSaveGuide(e, btn) {
        e.stopPropagation();
        
        const guideCard = btn.closest('.guide-card');
        const guideId = guideCard.querySelector('.guide-title').textContent;
        
        if (this.savedGuides.has(guideId)) {
            this.savedGuides.delete(guideId);
            btn.innerHTML = '<i class="bi bi-bookmark"></i>';
            this.showNotification('Guia removido dos salvos', 'info');
        } else {
            this.savedGuides.add(guideId);
            btn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
            this.showNotification('Guia salvo para ler depois', 'success');
        }
        
        this.saveGuidesToStorage();
    }

    loadSavedGuides() {
        const saved = localStorage.getItem('vendedorReuse_savedGuides');
        if (saved) {
            this.savedGuides = new Set(JSON.parse(saved));
            
            // Atualizar ícones
            this.guideCards.forEach(card => {
                const title = card.querySelector('.guide-title').textContent;
                const saveBtn = card.querySelector('.guide-save');
                if (this.savedGuides.has(title) && saveBtn) {
                    saveBtn.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
                }
            });
        }
    }

    saveGuidesToStorage() {
        localStorage.setItem('vendedorReuse_savedGuides', 
            JSON.stringify(Array.from(this.savedGuides))
        );
    }

    toggleFaqAnswer(question) {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todos os outros
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Alternar o atual
        faqItem.classList.toggle('active', !isActive);
    }

    searchFAQ(searchTerm) {
        const sections = document.querySelectorAll('.faq-section');
        let foundAny = false;
        
        sections.forEach(section => {
            const questions = section.querySelectorAll('.faq-question');
            let sectionHasResults = false;
            
            questions.forEach(question => {
                const text = question.textContent.toLowerCase();
                const item = question.closest('.faq-item');
                
                if (searchTerm === '' || text.includes(searchTerm.toLowerCase())) {
                    item.style.display = '';
                    sectionHasResults = true;
                    foundAny = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Mostrar/ocultar seção baseado nos resultados
            section.style.display = sectionHasResults ? 'block' : 'none';
        });
        
        // Mostrar mensagem se não encontrou resultados
        if (!foundAny && searchTerm !== '') {
            let noResults = document.getElementById('faqNoResults');
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.id = 'faqNoResults';
                noResults.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: ${this.isDarkMode ? '#aaaaaa' : '#666'};">
                        <i class="bi bi-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Nenhum resultado encontrado</h3>
                        <p>Tente usar palavras-chave diferentes ou entre em contato com o suporte.</p>
                    </div>
                `;
                document.querySelector('.faq-content').appendChild(noResults);
            }
        } else {
            const noResults = document.getElementById('faqNoResults');
            if (noResults) noResults.remove();
        }
    }

    filterFAQByCategory(categoryBtn) {
        // Atualizar botões ativos
        document.querySelectorAll('.faq-category').forEach(btn => {
            btn.classList.remove('active');
        });
        categoryBtn.classList.add('active');
        
        const category = categoryBtn.dataset.category;
        const sections = document.querySelectorAll('.faq-section');
        
        sections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.style.display = 'block';
                section.querySelectorAll('.faq-item').forEach(item => {
                    item.style.display = '';
                });
            } else {
                section.style.display = 'none';
            }
        });
    }

    handlePagination(btn) {
        const direction = btn.textContent.includes('Anterior') ? 'prev' : 'next';
        const activeNumber = document.querySelector('.pagination-number.active');
        if (!activeNumber) return;
        
        const currentPage = parseInt(activeNumber.textContent);
        
        let newPage = currentPage;
        if (direction === 'prev' && currentPage > 1) {
            newPage = currentPage - 1;
        } else if (direction === 'next' && currentPage < 8) {
            newPage = currentPage + 1;
        }
        
        if (newPage !== currentPage) {
            this.changePage(newPage);
        }
    }

    handlePageNumber(numberBtn) {
        const page = parseInt(numberBtn.textContent);
        if (!isNaN(page)) {
            this.changePage(page);
        }
    }

    changePage(page) {
        // Atualizar números ativos
        document.querySelectorAll('.pagination-number').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.textContent) === page);
        });
        
        // Atualizar estado dos botões de navegação
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');
        
        if (prevBtn) prevBtn.disabled = page === 1;
        if (nextBtn) nextBtn.disabled = page === 8;
        
        // Simular carregamento de nova página
        this.showNotification(`Carregando página ${page}...`, 'info');
        
        setTimeout(() => {
            this.showNotification(`Página ${page} carregada`, 'success');
        }, 1000);
    }

    updateGuideCount(count) {
        let counter = document.querySelector('.guides-count');
        if (!counter) {
            // Criar contador se não existir
            const container = document.querySelector('.guides-filter');
            if (container) {
                counter = document.createElement('div');
                counter.className = 'guides-count';
                counter.style.cssText = `
                    background: ${this.isDarkMode ? '#2d2d2d' : 'var(--central-blue)'};
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-round);
                    font-weight: 600;
                    font-size: 0.9rem;
                `;
                container.appendChild(counter);
            }
        }
        
        if (counter) {
            counter.textContent = `${count} guias encontrados`;
        }
    }

    updateNewsCount() {
        const visibleCount = Array.from(this.newsCards).filter(card => 
            card.style.display !== 'none'
        ).length;
        
        let counter = document.querySelector('.news-count');
        if (!counter) {
            const header = document.querySelector('.section-header-right');
            if (header) {
                counter = document.createElement('div');
                counter.className = 'news-count';
                counter.style.cssText = `
                    background: ${this.isDarkMode ? '#2d2d2d' : 'var(--light-gray-2)'};
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-md);
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: ${this.isDarkMode ? '#e0e0e0' : 'var(--text-medium)'};
                `;
                header.appendChild(counter);
            }
        }
        
        if (counter) {
            counter.textContent = `${visibleCount} notícias`;
        }
    }

    showSearchResults(query, results) {
        // Criar overlay de resultados
        const overlay = document.createElement('div');
        overlay.className = 'search-results-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const resultsHtml = results.map(result => `
            <div class="search-result-item" onclick="window.vendedorReuse.navigateToResult('${result.section}')">
                <h4>${result.title}</h4>
                <p>Na seção: ${this.getSectionName(result.section)}</p>
            </div>
        `).join('');
        
        overlay.innerHTML = `
            <div class="search-results-modal" style="
                background: ${this.isDarkMode ? '#2d2d2d' : 'white'};
                color: ${this.isDarkMode ? '#e0e0e0' : 'inherit'};
                padding: 2rem;
                border-radius: var(--border-radius-lg);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0; color: ${this.isDarkMode ? '#e0e0e0' : 'inherit'};">Resultados para "${query}"</h3>
                    <button onclick="this.closest('.search-results-overlay').remove()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: ${this.isDarkMode ? '#aaaaaa' : 'var(--text-light)'};
                    ">&times;</button>
                </div>
                <div class="search-results-list">
                    ${resultsHtml}
                </div>
                <div style="margin-top: 1.5rem; text-align: center;">
                    <button onclick="this.closest('.search-results-overlay').remove()" style="
                        padding: 0.75rem 2rem;
                        background: var(--central-blue);
                        color: white;
                        border: none;
                        border-radius: var(--border-radius-md);
                        cursor: pointer;
                        font-weight: 600;
                    ">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Estilizar itens de resultado
        setTimeout(() => {
            const items = overlay.querySelectorAll('.search-result-item');
            items.forEach(item => {
                item.style.cssText = `
                    padding: 1rem;
                    border: 1px solid ${this.isDarkMode ? '#444' : 'var(--light-gray-2)'};
                    border-radius: var(--border-radius-md);
                    margin-bottom: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: ${this.isDarkMode ? '#1e1e1e' : 'var(--light-gray-2)'};
                `;
                item.addEventListener('mouseenter', () => {
                    item.style.borderColor = 'var(--central-blue)';
                    item.style.backgroundColor = 'rgba(26, 86, 219, 0.1)';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.borderColor = this.isDarkMode ? '#444' : 'var(--light-gray-2)';
                    item.style.backgroundColor = this.isDarkMode ? '#1e1e1e' : 'var(--light-gray-2)';
                });
                
                // Estilizar conteúdo
                const h4 = item.querySelector('h4');
                if (h4) {
                    h4.style.color = this.isDarkMode ? '#e0e0e0' : 'var(--text-dark)';
                    h4.style.margin = '0 0 0.5rem 0';
                }
                
                const p = item.querySelector('p');
                if (p) {
                    p.style.color = this.isDarkMode ? '#aaaaaa' : 'var(--text-light)';
                    p.style.margin = '0';
                    p.style.fontSize = '0.9rem';
                }
            });
        }, 10);
    }
    
    getSectionName(sectionId) {
        const sections = {
            'central-vendedor': 'Central do Vendedor',
            'guia-vendas': 'Guia de Vendas',
            'suporte-vendedor': 'Suporte do Vendedor',
            'novidades': 'Novidades'
        };
        return sections[sectionId] || sectionId;
    }
    
    navigateToResult(sectionId) {
        const overlay = document.querySelector('.search-results-overlay');
        if (overlay) overlay.remove();
        
        this.scrollToSection(`#${sectionId}`);
        this.showNotification(`Navegando para ${this.getSectionName(sectionId)}`, 'info');
    }

    showNotification(message, type = 'info') {
        // Usar a função de notificação do vendedor-inicio se disponível
        if (window.vendedorInicio && window.vendedorInicio.showNotification) {
            window.vendedorInicio.showNotification(message, type);
        } else {
            // Fallback simples com ajuste para modo escuro
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Cores baseadas no tipo e modo
            let bgColor, textColor;
            if (this.isDarkMode) {
                textColor = '#e0e0e0';
                switch(type) {
                    case 'success': bgColor = '#0e9f6e'; break;
                    case 'error': bgColor = '#dc2626'; break;
                    case 'warning': bgColor = '#d97706'; break;
                    default: bgColor = '#1e40af'; break;
                }
            } else {
                textColor = 'white';
                switch(type) {
                    case 'success': bgColor = '#00cc99'; break;
                    case 'error': bgColor = '#ff4757'; break;
                    case 'warning': bgColor = '#ffa502'; break;
                    default: bgColor = '#0066cc'; break;
                }
            }
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${bgColor};
                color: ${textColor};
                padding: 1rem 1.5rem;
                border-radius: 8px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
                font-weight: 500;
                max-width: 400px;
                word-break: break-word;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.vendedorReuse = new VendedorReuse();
    
    // Adicionar estilos dinâmicos
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        mark {
            background-color: ${localStorage.getItem('reuse_dark_mode') === 'true' ? '#4a5568' : '#fff3cd'};
            padding: 0.1rem 0.3rem;
            border-radius: 0.2rem;
            color: ${localStorage.getItem('reuse_dark_mode') === 'true' ? '#e0e0e0' : 'inherit'};
        }
        
        .seller-menu-btn.scroll-to {
            cursor: pointer;
        }
        
        /* Transições suaves para modo escuro */
        body.dark-mode {
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        body.dark-mode .seller-menu-btn,
        body.dark-mode .resource-card,
        body.dark-mode .guide-card,
        body.dark-mode .support-card,
        body.dark-mode .news-card,
        body.dark-mode .issue-item {
            transition: background-color 0.3s ease, 
                       border-color 0.3s ease, 
                       color 0.3s ease,
                       box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(dynamicStyles);
    
    // Aplicar modo escuro imediatamente se necessário
    if (localStorage.getItem('reuse_dark_mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});