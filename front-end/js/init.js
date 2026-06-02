// Sistema de Tradução
const translations = {
    pt: {
        // Hero Section
        heroTitle1: "Dê uma nova vida aos",
        heroTitle2: "itens que você não usa mais",
        heroSubtitle: "Junte-se à ReUse e faça parte da economia circular que transforma o consumo em uma experiência sustentável",
        
        // Stats
        members: "Membros",
        itemsReused: "Itens Reutilizados",
        donations: "Doações",
        learnMore: "Saiba Mais",
        
        // Options Section
        sectionTitle: "Escolha Sua Jornada Sustentável",
        sectionSubtitle: "Participe da comunidade de formas diferentes e faça a diferença",
        
        // Client Card
        clientTitle: "Para Clientes",
        clientSubtitle: "Compre com Consciência, Doe com Propósito",
        clientDescription: "Encontre produtos de qualidade com preços acessíveis e faça doações para causas que você apoia.",
        clientBenefits: [
            "Economize até 70% em compras sustentáveis",
            "Doe para instituições verificadas e confiáveis",
            "Compras 100% seguras com garantia ReUse",
            "Entregas sustentáveis em toda região"
        ],
        clientButton: "Entrar como Cliente",
        clientNote: "Grátis • Cadastro em 2 minutos",
        
        // Seller Card
        sellerTitle: "Para Vendedores",
        sellerSubtitle: "Transforme Itens em Oportunidades",
        sellerDescription: "Venda seus itens usados ou produtos de brechó. Ideal para vendedores autônomos e pequenos negócios.",
        sellerBenefits: [
            "Ganhe dinheiro extra com itens parados",
            "Alcance milhares de clientes conscientes",
            "Baixo custo operacional e alta rentabilidade",
            "Sistema de reputação e avaliações"
        ],
        sellerButton: "Começar a Vender",
        sellerNote: "Taxa de apenas 10% • Suporte gratuito",
        
        // Institution Card
        institutionTitle: "Para Instituições",
        institutionSubtitle: "Amplie Seu Impacto Social",
        institutionDescription: "Cadastre sua instituição para receber doações e vender produtos, aumentando sua arrecadação.",
        institutionBenefits: [
            "Receba doações diretas da comunidade",
            "Venda produtos para arrecadar fundos",
            "Divulgue sua causa para milhares de pessoas",
            "Certificado de instituição verificada"
        ],
        institutionButton: "Cadastrar Instituição",
        institutionNote: "Verificação gratuita • Sem taxas",
        
        // Impact Section
        impactTitle: "Juntos Estamos Fazendo a Diferença",
        impactSubtitle: "Nossa comunidade já alcançou resultados incríveis que impactam positivamente o planeta e a sociedade",
        
        // Stats
        stats: [
            { number: "10000", label: "Itens Reutilizados", description: "Evitando que produtos úteis se tornem resíduos" },
            { number: "2500", label: "Doações Realizadas", description: "Apoiando pessoas e instituições que precisam" },
            { number: "50", label: "Toneladas de CO² Economizadas", description: "Equivalente ao plantio de 1.250 árvores" },
            { number: "5000", label: "Membros Ativos", description: "Pessoas engajadas na economia circular" }
        ],
        
        // Impact Footer
        quoteText: "\"Cada item reutilizado é uma vitória para o nosso planeta. Juntos, estamos construindo um futuro mais sustentável.\"",
        quoteAuthor: "— Comunidade ReUse",
        shareImpact: "Compartilhar Impacto",
        seeStories: "Ver Histórias",
        
        // Badges
        popular: "Mais Popular",
        entrepreneurs: "Para Empreendedores",
        socialCauses: "Para Causas Sociais",
        
        // Accessibility
        darkMode: "Modo Noturno",
        colorblindMode: "Modo Daltonismo",
        language: "Idioma",
        removeFilter: "Remover Filtro",
        nightModeOn: "Modo Noturno Ativado",
        nightModeOff: "Modo Noturno Desativado",
        filterRemoved: "Filtro Daltonismo Removido",
        
        // Auth Pages
        backToHome: "Voltar para a página inicial",
        email: "E-mail",
        password: "Senha",
        confirmPassword: "Confirmar Senha",
        rememberMe: "Lembrar-me",
        forgotPassword: "Esqueci minha senha",
        login: "Entrar",
        register: "Cadastrar",
        orLoginWith: "ou entre com",
        
        // Form Fields
        name: "Nome",
        surname: "Sobrenome",
        age: "Idade",
        phone: "Telefone",
        address: "Endereço",
        storeName: "Nome da Loja",
        institutionName: "Nome da Instituição",
        institutionType: "Tipo de Instituição",
        cnpj: "CNPJ",
        description: "Descrição",
        website: "Site",
        causes: "Causas Apoiadas"
    },
    
    en: {
        heroTitle1: "Give new life to",
        heroTitle2: "items you no longer use",
        heroSubtitle: "Join ReUse and be part of the circular economy that transforms consumption into a sustainable experience",
        
        // Stats
        members: "Members",
        itemsReused: "Items Reused",
        donations: "Donations",
        learnMore: "Learn More",
        
        sectionTitle: "Choose Your Sustainable Journey",
        sectionSubtitle: "Participate in the community in different ways and make a difference",
        
        clientTitle: "For Customers",
        clientSubtitle: "Shop Consciously, Donate with Purpose",
        clientDescription: "Find quality products at affordable prices and make donations to causes you support.",
        clientBenefits: [
            "Save up to 70% on sustainable purchases",
            "Donate to verified and reliable institutions",
            "100% secure shopping with ReUse guarantee",
            "Sustainable deliveries throughout the region"
        ],
        clientButton: "Join as Customer",
        clientNote: "Free • 2-minute registration",
        
        sellerTitle: "For Sellers",
        sellerSubtitle: "Transform Items into Opportunities",
        sellerDescription: "Sell your used items or thrift store products. Ideal for independent sellers and small businesses.",
        sellerBenefits: [
            "Earn extra money with unused items",
            "Reach thousands of conscious customers",
            "Low operational cost and high profitability",
            "Reputation and rating system"
        ],
        sellerButton: "Start Selling",
        sellerNote: "Only 10% fee • Free support",
        
        institutionTitle: "For Institutions",
        institutionSubtitle: "Amplify Your Social Impact",
        institutionDescription: "Register your institution to receive donations and sell products, increasing your fundraising.",
        institutionBenefits: [
            "Receive direct donations from the community",
            "Sell products to raise funds",
            "Promote your cause to thousands of people",
            "Verified institution certificate"
        ],
        institutionButton: "Register Institution",
        institutionNote: "Free verification • No fees",
        
        impactTitle: "Together We're Making a Difference",
        impactSubtitle: "Our community has already achieved incredible results that positively impact the planet and society",
        
        stats: [
            { number: "10000", label: "Items Reused", description: "Preventing useful products from becoming waste" },
            { number: "2500", label: "Donations Made", description: "Supporting people and institutions in need" },
            { number: "50", label: "Tons of CO² Saved", description: "Equivalent to planting 1,250 trees" },
            { number: "5000", label: "Active Members", description: "People engaged in the circular economy" }
        ],
        
        quoteText: "\"Every reused item is a victory for our planet. Together, we're building a more sustainable future.\"",
        quoteAuthor: "— ReUse Community",
        shareImpact: "Share Impact",
        seeStories: "See Stories",
        
        popular: "Most Popular",
        entrepreneurs: "For Entrepreneurs",
        socialCauses: "For Social Causes",
        
        // Accessibility
        darkMode: "Dark Mode",
        colorblindMode: "Colorblind Mode",
        language: "Language",
        removeFilter: "Remove Filter",
        nightModeOn: "Dark Mode Enabled",
        nightModeOff: "Dark Mode Disabled",
        filterRemoved: "Color Filter Removed",
        
        // Auth Pages
        backToHome: "Back to home page",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password",
        login: "Login",
        register: "Register",
        orLoginWith: "or login with",
        
        // Form Fields
        name: "Name",
        surname: "Surname",
        age: "Age",
        phone: "Phone",
        address: "Address",
        storeName: "Store Name",
        institutionName: "Institution Name",
        institutionType: "Institution Type",
        cnpj: "CNPJ",
        description: "Description",
        website: "Website",
        causes: "Supported Causes"
    },
    
    es: {
        heroTitle1: "Dale nueva vida a los",
        heroTitle2: "artículos que ya no usas",
        heroSubtitle: "Únete a ReUse y sé parte de la economía circular que transforma el consumo en una experiencia sostenible",
        
        // Stats
        members: "Miembros",
        itemsReused: "Artículos Reutilizados",
        donations: "Donaciones",
        learnMore: "Saber Más",
        
        sectionTitle: "Elige Tu Camino Sostenible",
        sectionSubtitle: "Participa en la comunidad de diferentes formas y marca la diferencia",
        
        clientTitle: "Para Clientes",
        clientSubtitle: "Compra con Conciencia, Dona con Propósito",
        clientDescription: "Encuentra productos de calidad a precios accesibles y haz donaciones a causas que apoyas.",
        clientBenefits: [
            "Ahorra hasta 70% en compras sostenibles",
            "Dona a instituciones verificadas y confiables",
            "Compras 100% seguras con garantía ReUse",
            "Entregas sostenibles en toda la región"
        ],
        clientButton: "Ingresar como Cliente",
        clientNote: "Gratis • Registro en 2 minutos",
        
        sellerTitle: "Para Vendedores",
        sellerSubtitle: "Transforma Artículos en Oportunidades",
        sellerDescription: "Vende tus artículos usados o productos de segunda mano. Ideal para vendedores independientes y pequeños negocios.",
        sellerBenefits: [
            "Gana dinero extra con artículos sin usar",
            "Alcanza miles de clientes conscientes",
            "Bajo costo operacional y alta rentabilidad",
            "Sistema de reputación y calificaciones"
        ],
        sellerButton: "Comenzar a Vender",
        sellerNote: "Solo 10% de comisión • Soporte gratuito",
        
        institutionTitle: "Para Instituciones",
        institutionSubtitle: "Amplifica Tu Impacto Social",
        institutionDescription: "Registra tu institución para recibir donaciones y vender productos, aumentando tu recaudación de fondos.",
        institutionBenefits: [
            "Recibe donaciones directas de la comunidad",
            "Vende productos para recaudar fondos",
            "Promociona tu causa a miles de personas",
            "Certificado de institución verificada"
        ],
        institutionButton: "Registrar Institución",
        institutionNote: "Verificación gratuita • Sin tarifas",
        
        impactTitle: "Juntos Estamos Marcando la Diferencia",
        impactSubtitle: "Nuestra comunidad ya ha logrado resultados increíbles que impactan positivamente al planeta y la sociedad",
        
        stats: [
            { number: "10000", label: "Artículos Reutilizados", description: "Evitando que productos útiles se conviertan en residuos" },
            { number: "2500", label: "Donaciones Realizadas", description: "Apoyando a personas e instituciones que lo necesitan" },
            { number: "50", label: "Toneladas de CO² Ahorradas", description: "Equivalente a plantar 1.250 árboles" },
            { number: "5000", label: "Miembros Activos", description: "Personas comprometidas con la economía circular" }
        ],
        
        quoteText: "\"Cada artículo reutilizado es una victoria para nuestro planeta. Juntos, estamos construyendo un futuro más sostenible.\"",
        quoteAuthor: "— Comunidad ReUse",
        shareImpact: "Compartir Impacto",
        seeStories: "Ver Historias",
        
        popular: "Más Popular",
        entrepreneurs: "Para Emprendedores",
        socialCauses: "Para Causas Sociales",
        
        // Accessibility
        darkMode: "Modo Nocturno",
        colorblindMode: "Modo Daltonismo",
        language: "Idioma",
        removeFilter: "Quitar Filtro",
        nightModeOn: "Modo Nocturno Activado",
        nightModeOff: "Modo Nocturno Desactivado",
        filterRemoved: "Filtro de Color Removido",
        
        // Auth Pages
        backToHome: "Volver a la página principal",
        email: "Correo electrónico",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        rememberMe: "Recordarme",
        forgotPassword: "Olvidé mi contraseña",
        login: "Iniciar Sesión",
        register: "Registrarse",
        orLoginWith: "o inicia sesión con",
        
        // Form Fields
        name: "Nombre",
        surname: "Apellido",
        age: "Edad",
        phone: "Teléfono",
        address: "Dirección",
        storeName: "Nombre de la Tienda",
        institutionName: "Nombre de la Institución",
        institutionType: "Tipo de Institución",
        cnpj: "CNPJ",
        description: "Descripción",
        website: "Sitio Web",
        causes: "Causas Apoyadas"
    }
};

// Sistema de Gerenciamento de Estado
const AppState = {
    darkMode: false,
    colorblindMode: null,
    currentLanguage: 'pt',
    isInitialized: false,
    
    init() {
        if (this.isInitialized) return;
        
        this.loadFromStorage();
        this.applyCurrentState();
        this.setupEventListeners();
        this.setupStatsAnimation();
        this.setupKeyboardShortcuts();
        this.setupImpactButtons();
        
        this.isInitialized = true;
        console.log('AppState initialized successfully');
    },
    
    loadFromStorage() {
        try {
            this.darkMode = localStorage.getItem('darkMode') === 'true';
            this.colorblindMode = localStorage.getItem('colorblindMode');
            this.currentLanguage = localStorage.getItem('language') || 'pt';
        } catch (error) {
            console.warn('Error loading from storage:', error);
            this.resetToDefaults();
        }
    },
    
    resetToDefaults() {
        this.darkMode = false;
        this.colorblindMode = null;
        this.currentLanguage = 'pt';
    },
    
    saveToStorage() {
        try {
            localStorage.setItem('darkMode', this.darkMode);
            localStorage.setItem('colorblindMode', this.colorblindMode);
            localStorage.setItem('language', this.currentLanguage);
        } catch (error) {
            console.warn('Error saving to storage:', error);
        }
    },
    
    applyCurrentState() {
        // Aplicar modo noturno
        this.applyDarkMode();
        
        // Aplicar modo daltonismo
        if (this.colorblindMode) {
            this.applyColorblindMode(this.colorblindMode);
        }
        
        // Aplicar idioma
        this.translatePage();
        this.updateAccessibilityLabels();
    },
    
    applyDarkMode() {
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
            this.updateDarkModeIcon();
        } else {
            document.body.classList.remove('dark-mode');
            this.updateDarkModeIcon();
        }
    },
    
    updateDarkModeIcon() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.className = this.darkMode ? 'bi bi-sun' : 'bi bi-moon';
            }
            darkModeToggle.setAttribute('title', this.getTranslation('darkMode'));
        }
    },
    
    setupEventListeners() {
        // Modo Noturno
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
        
        // Menu Daltonismo
        const colorblindToggle = document.getElementById('colorblindToggle');
        if (colorblindToggle) {
            colorblindToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                    this.closeOtherMenus('colorblind');
                }
            });
        }
        
        // Opções de Daltonismo
        document.querySelectorAll('.colorblind-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setColorblindMode(mode);
                this.closeAllMenus();
            });
        });
        
        // Reset Daltonismo
        const colorblindReset = document.getElementById('colorblindReset');
        if (colorblindReset) {
            colorblindReset.addEventListener('click', () => {
                this.removeColorblindMode();
                this.closeAllMenus();
            });
        }
        
        // Menu de Idioma
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                    this.closeOtherMenus('language');
                }
            });
        }
        
        // Opções de Idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.changeLanguage(lang);
                this.closeAllMenus();
            });
        });
        
        // Fechar menus ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.colorblind-menu')) {
                this.closeMenu('colorblindDropdown');
            }
            if (!e.target.closest('.language-menu')) {
                this.closeMenu('languageDropdown');
            }
        });
        
        // Tecla Escape para fechar menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllMenus();
            }
        });
    },
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+D para daltonismo
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                    this.closeOtherMenus('colorblind');
                }
            }
            
            // Ctrl+Shift+L para idioma
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('show');
                    this.closeOtherMenus('language');
                }
            }
            
            // Ctrl+Shift+N para modo noturno
            if (e.ctrlKey && e.shiftKey && e.key === 'N') {
                e.preventDefault();
                this.toggleDarkMode();
            }
            
            // Números para modos de daltonismo rápidos (1-4)
            if (e.ctrlKey && e.shiftKey && e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const modes = ['protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia'];
                const modeIndex = parseInt(e.key) - 1;
                if (modes[modeIndex]) {
                    this.setColorblindMode(modes[modeIndex]);
                }
            }
            
            // Números para idiomas rápidos (5-7)
            if (e.ctrlKey && e.shiftKey && e.key >= '5' && e.key <= '7') {
                e.preventDefault();
                const languages = ['pt', 'en', 'es'];
                const langIndex = parseInt(e.key) - 5;
                if (languages[langIndex]) {
                    this.changeLanguage(languages[langIndex]);
                }
            }
        });
    },
    
    setupImpactButtons() {
        const shareBtn = document.querySelector('.share-impact');
        const storiesBtn = document.querySelector('.see-stories');

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareImpact();
            });
        }

        if (storiesBtn) {
            storiesBtn.addEventListener('click', () => {
                this.showStories();
            });
        }
    },
    
    shareImpact() {
        if (navigator.share) {
            navigator.share({
                title: 'ReUse - Impacto Sustentável',
                text: 'Conheça os incríveis resultados da comunidade ReUse!',
                url: window.location.href
            }).catch(error => {
                console.log('Error sharing:', error);
                this.showIndicator('Compartilhe nosso impacto nas redes sociais!');
            });
        } else {
            this.showIndicator('Compartilhe nosso impacto nas redes sociais! Em breve esta funcionalidade estará disponível.');
        }
    },
    
    showStories() {
        this.showIndicator('Conheça as histórias inspiradoras da nossa comunidade! Em breve esta funcionalidade estará disponível.');
    },
    
    setupStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    },
    
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString(this.currentLanguage);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString(this.currentLanguage);
            }
        }, 16);
    },
    
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.applyDarkMode();
        
        const message = this.darkMode ? this.getTranslation('nightModeOn') : this.getTranslation('nightModeOff');
        this.showIndicator(message);
        this.saveToStorage();
    },
    
    setColorblindMode(mode) {
        // Remover modos anteriores
        this.removeColorblindMode();
        
        this.colorblindMode = mode;
        this.applyColorblindMode(mode);
        
        // Atualizar estado visual dos botões
        this.updateColorblindMenu();
        
        const modeNames = {
            protanopia: 'Protanopia (Vermelho/Verde)',
            deuteranopia: 'Deuteranopia (Vermelho/Verde)',
            tritanopia: 'Tritanopia (Azul/Amarelo)',
            achromatopsia: 'Acromatopsia (Preto e Branco)'
        };
        
        this.showIndicator(`Modo Daltonismo: ${modeNames[mode]}`);
        this.saveToStorage();
    },
    
    applyColorblindMode(mode) {
        document.body.classList.add(`colorblind-${mode}`);
    },
    
    removeColorblindMode() {
        // Remover todas as classes de daltonismo
        const classes = document.body.className.split(' ').filter(className => 
            !className.startsWith('colorblind-')
        );
        document.body.className = classes.join(' ');
        
        this.colorblindMode = null;
        this.updateColorblindMenu();
        this.showIndicator(this.getTranslation('filterRemoved'));
        this.saveToStorage();
    },
    
    updateColorblindMenu() {
        // Remover classe active de todas as opções
        document.querySelectorAll('.colorblind-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Adicionar classe active na opção atual
        if (this.colorblindMode) {
            const activeOption = document.querySelector(`[data-mode="${this.colorblindMode}"]`);
            if (activeOption) {
                activeOption.classList.add('active');
            }
        }
        
        // Atualizar texto do botão de reset
        const resetBtn = document.getElementById('colorblindReset');
        if (resetBtn) {
            resetBtn.innerHTML = `<i class="bi bi-x-circle"></i> ${this.getTranslation('removeFilter')}`;
        }
    },
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.translatePage();
        this.updateAccessibilityLabels();
        this.showIndicator(`${this.getTranslation('language')}: ${this.getLanguageName(lang)}`);
        this.saveToStorage();
    },
    
    getLanguageName(lang) {
        const names = { 
            pt: 'Português', 
            en: 'English', 
            es: 'Español' 
        };
        return names[lang] || lang;
    },
    
    getTranslation(key) {
        const t = translations[this.currentLanguage];
        return t && t[key] ? t[key] : translations.pt[key] || key;
    },
    
    updateAccessibilityLabels() {
        // Atualizar titles dos botões de acessibilidade
        const darkModeToggle = document.getElementById('darkModeToggle');
        const colorblindToggle = document.getElementById('colorblindToggle');
        const languageToggle = document.getElementById('languageToggle');
        
        if (darkModeToggle) darkModeToggle.setAttribute('title', this.getTranslation('darkMode'));
        if (colorblindToggle) colorblindToggle.setAttribute('title', this.getTranslation('colorblindMode'));
        if (languageToggle) languageToggle.setAttribute('title', this.getTranslation('language'));
    },
    
    translatePage() {
        const t = translations[this.currentLanguage];
        
        if (!t) return;
        
        // Hero Section
        this.translateHeroSection(t);
        
        // Options Section
        this.translateOptionsSection(t);
        
        // Impact Section
        this.translateImpactSection(t);
        
        // Auth Pages
        this.translateAuthPages(t);
        
        // Atualizar menu de daltonismo
        this.updateColorblindMenu();
        
        // Atualizar contadores de estatísticas
        this.updateStatsNumbers(t);
    },
    
    translateHeroSection(t) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `<span class="title-line">${t.heroTitle1}</span>
                                  <span class="title-line highlight">${t.heroTitle2}</span>`;
        }
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.innerHTML = t.heroSubtitle
                .replace('ReUse', '<span class="highlight-text">ReUse</span>')
                .replace('economia circular', '<span class="eco-text">economia circular</span>');
        }
        
        // Hero Stats
        const miniStats = document.querySelectorAll('.mini-label');
        if (miniStats.length >= 3) {
            miniStats[0].textContent = t.members;
            miniStats[1].textContent = t.itemsReused;
            miniStats[2].textContent = t.donations;
        }
        
        // Hero Button
        const learnMoreBtn = document.querySelector('.learn-more-btn span');
        if (learnMoreBtn) {
            learnMoreBtn.textContent = t.learnMore;
        }
    },
    
    translateOptionsSection(t) {
        const optionsTitle = document.querySelector('.options-section .section-title');
        const optionsSubtitle = document.querySelector('.options-section .section-subtitle');
        if (optionsTitle) optionsTitle.textContent = t.sectionTitle;
        if (optionsSubtitle) optionsSubtitle.textContent = t.sectionSubtitle;
        
        // Client Card
        this.translateCard('.client-card', t, 'client');
        const clientBadge = document.querySelector('.client-card .card-badge');
        if (clientBadge) clientBadge.textContent = t.popular;
        
        // Seller Card
        this.translateCard('.seller-card', t, 'seller');
        const sellerBadge = document.querySelector('.seller-card .card-badge');
        if (sellerBadge) sellerBadge.textContent = t.entrepreneurs;
        
        // Institution Card
        this.translateCard('.institution-card', t, 'institution');
        const institutionBadge = document.querySelector('.institution-card .card-badge');
        if (institutionBadge) institutionBadge.textContent = t.socialCauses;
    },
    
    translateImpactSection(t) {
        const impactTitle = document.querySelector('.impact-section .section-title');
        const impactSubtitle = document.querySelector('.impact-section .section-subtitle');
        if (impactTitle) impactTitle.textContent = t.impactTitle;
        if (impactSubtitle) impactSubtitle.textContent = t.impactSubtitle;
        
        // Stats
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const stat = t.stats[index];
            if (stat) {
                const labelEl = card.querySelector('.stat-label');
                const descEl = card.querySelector('.stat-description');
                
                if (labelEl) labelEl.textContent = stat.label;
                if (descEl) descEl.textContent = stat.description;
            }
        });
        
        // Impact Footer
        const quoteText = document.querySelector('.quote-text');
        const quoteAuthor = document.querySelector('.quote-author');
        const shareImpact = document.querySelector('.share-impact');
        const seeStories = document.querySelector('.see-stories');
        
        if (quoteText) quoteText.textContent = t.quoteText;
        if (quoteAuthor) quoteAuthor.textContent = t.quoteAuthor;
        if (shareImpact) shareImpact.innerHTML = `<i class="bi bi-share-fill"></i> ${t.shareImpact}`;
        if (seeStories) seeStories.innerHTML = `<i class="bi bi-journal-text"></i> ${t.seeStories}`;
    },
    
    translateAuthPages(t) {
        // Back links
        const backLinks = document.querySelectorAll('.back-link');
        backLinks.forEach(link => {
            const icon = link.querySelector('i');
            const text = link.querySelector('.back-link-text') || document.createTextNode('');
            if (text.nodeType === Node.TEXT_NODE) {
                link.innerHTML = `<i class="bi bi-arrow-left"></i> ${t.backToHome}`;
            } else {
                text.textContent = t.backToHome;
            }
        });
        
        // Form placeholders e labels
        const formElements = {
            'loginEmail': t.email,
            'loginSenha': t.password,
            'email': t.email,
            'senha': t.password,
            'confirmarSenha': t.confirmPassword,
            'nome': t.name,
            'sobrenome': t.surname,
            'idade': t.age,
            'telefone': t.phone,
            'endereco': t.address,
            'nomeLoja': t.storeName,
            'nomeInstituicao': t.institutionName,
            'descricao': t.description,
            'site': t.website
        };
        
        Object.keys(formElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.placeholder = formElements[id];
            }
        });
        
        // Checkboxes e labels
        const rememberMe = document.querySelector('.remember-me label');
        if (rememberMe) rememberMe.textContent = t.rememberMe;
        
        const forgotPassword = document.querySelector('.forgot-password');
        if (forgotPassword) forgotPassword.textContent = t.forgotPassword;
        
        // Botões de submit
        const submitButtons = document.querySelectorAll('.submit-btn');
        submitButtons.forEach(btn => {
            const text = btn.textContent.trim();
            if (text.includes('Entrar') || text.includes('Login')) {
                btn.innerHTML = btn.innerHTML.replace(/Entrar|Login/, t.login);
            } else if (text.includes('Cadastrar') || text.includes('Register')) {
                btn.innerHTML = btn.innerHTML.replace(/Cadastrar|Register/, t.register);
            }
        });
        
        // Social login
        const divider = document.querySelector('.divider span');
        if (divider) divider.textContent = t.orLoginWith;
    },
    
    updateStatsNumbers(t) {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            const stat = t.stats[index];
            if (stat) {
                const numberEl = card.querySelector('.stat-number');
                if (numberEl) {
                    const currentValue = parseInt(numberEl.textContent.replace(/\D/g, ''));
                    const targetValue = parseInt(stat.number);
                    if (currentValue !== targetValue) {
                        numberEl.textContent = '0';
                        numberEl.setAttribute('data-count', stat.number);
                    }
                }
            }
        });
    },
    
    translateCard(selector, t, type) {
        const card = document.querySelector(selector);
        if (!card) return;
        
        const titleEl = card.querySelector('.card-title');
        const subtitleEl = card.querySelector('.card-subtitle');
        const descEl = card.querySelector('.card-description');
        const buttonEl = card.querySelector('.action-btn span');
        const noteEl = card.querySelector('.card-note');
        
        if (titleEl) titleEl.textContent = t[`${type}Title`];
        if (subtitleEl) subtitleEl.textContent = t[`${type}Subtitle`];
        if (descEl) descEl.textContent = t[`${type}Description`];
        if (buttonEl) buttonEl.textContent = t[`${type}Button`];
        if (noteEl) noteEl.textContent = t[`${type}Note`];
        
        const benefits = card.querySelectorAll('.benefit-item .benefit-text');
        const benefitsList = t[`${type}Benefits`];
        if (benefitsList) {
            benefitsList.forEach((benefit, index) => {
                if (benefits[index]) {
                    benefits[index].textContent = benefit;
                }
            });
        }
    },
    
    closeMenu(menuId) {
        const menu = document.getElementById(menuId);
        if (menu) {
            menu.classList.remove('show');
        }
    },
    
    closeOtherMenus(currentMenu) {
        const menus = {
            colorblind: 'languageDropdown',
            language: 'colorblindDropdown'
        };
        
        if (menus[currentMenu]) {
            this.closeMenu(menus[currentMenu]);
        }
    },
    
    closeAllMenus() {
        this.closeMenu('colorblindDropdown');
        this.closeMenu('languageDropdown');
    },
    
    showIndicator(message) {
        let indicator = document.getElementById('modeIndicator');
        
        // Criar indicator se não existir
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'modeIndicator';
            indicator.className = 'mode-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = message;
        indicator.classList.add('show');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 3000);
    }
};

// Efeito de parallax para o background
function initParallax() {
    const backgroundElements = document.querySelectorAll('.eco-circle, .floating-leaf, .particle');
    if (backgroundElements.length === 0) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let rafId = null;
    
    const updateParallax = () => {
        backgroundElements.forEach((element, index) => {
            const speed = 0.02 + (index * 0.01);
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        rafId = requestAnimationFrame(updateParallax);
    };
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        if (!rafId) {
            rafId = requestAnimationFrame(updateParallax);
        }
    });
    
    // Parar animação quando não estiver visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }
    });
}

// Efeitos de hover para cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.option-card, .stat-card');
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Apenas em desktop
                this.style.transform = this.classList.contains('option-card') 
                    ? 'translateY(-12px) scale(1.02)' 
                    : 'translateY(-8px) scale(1.03)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Adicionar efeito de foco para acessibilidade
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efeito de digitação no título
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalHTML = heroTitle.innerHTML;
    heroTitle.style.visibility = 'hidden';
    
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            heroTitle.style.visibility = 'visible';
            heroTitle.classList.add('typing-effect');
            
            setTimeout(() => {
                heroTitle.classList.remove('typing-effect');
            }, 2000);
            
            heroObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.3 });
    
    heroObserver.observe(document.querySelector('.hero-section'));
}

// Preloader e transições suaves
function initPageTransitions() {
    // Remover classe de carregamento inicial
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
    
    // Adicionar classe loading inicial
    document.body.classList.add('loading');
}

// Sistema de notificações
function initNotificationSystem() {
    // Pode ser expandido para mostrar notificações do sistema
    console.log('Notification system ready');
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de estado
    AppState.init();
    
    // Inicializar efeitos visuais
    initParallax();
    initCardHoverEffects();
    initTypewriterEffect();
    initPageTransitions();
    initNotificationSystem();
    
    // Adicionar classe loaded para animações
    document.body.classList.add('loaded');
    
    console.log('ReUse platform initialized successfully');
});

// Prevenir erros em navegadores antigos
if (typeof window !== 'undefined') {
    // Polyfill para requestAnimationFrame
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                     window.mozRequestAnimationFrame || 
                                     function(callback) { 
                                         return window.setTimeout(callback, 1000 / 60); 
                                     };
    }
    
    // Polyfill para cancelAnimationFrame
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = window.webkitCancelAnimationFrame || 
                                    window.mozCancelAnimationFrame || 
                                    function(id) { 
                                        clearTimeout(id); 
                                    };
    }
}

// Exportar para uso global (se necessário)
if (typeof window !== 'undefined') {
    window.AppState = AppState;
    window.ReUse = {
        init: AppState.init.bind(AppState),
        changeLanguage: AppState.changeLanguage.bind(AppState),
        toggleDarkMode: AppState.toggleDarkMode.bind(AppState)
    };
}