// Traduções específicas para a página Participar
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('languageSelector');
    const languageBtn = languageSelector.querySelector('.language-btn');
    const languageOptions = languageSelector.querySelectorAll('.language-option');
    const currentLangText = languageBtn.querySelector('span');

    // Abrir/fechar dropdown
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageSelector.classList.toggle('active');
    });

    // Selecionar idioma
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remover classe active de todas as opções
            languageOptions.forEach(opt => opt.classList.remove('active'));
            // Adicionar classe active à opção selecionada
            this.classList.add('active');
            
            // Atualizar texto do botão
            const langText = this.querySelector('span').textContent;
            currentLangText.textContent = langText;
            
            // Fechar dropdown
            languageSelector.classList.remove('active');
            
            // Salvar preferência no localStorage
            localStorage.setItem('preferred-language', lang);
            
            // Mudar o conteúdo do site
            changeLanguage(lang);
        });
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        languageSelector.classList.remove('active');
    });

    // Prevenir fechamento ao clicar dentro do dropdown
    languageSelector.querySelector('.language-dropdown').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Carregar idioma salvo
    const savedLang = localStorage.getItem('preferred-language') || 'pt';
    const savedOption = languageSelector.querySelector(`[data-lang="${savedLang}"]`);
    if (savedOption) {
        savedOption.click();
    }

    // Função para mudar o idioma
    function changeLanguage(lang) {
        const translations = {
            'pt': {
                // Meta tags
                'title': 'Participar - ReUse',
                'description': 'Faça login ou cadastre-se na ReUse para começar a comprar, vender ou doar itens usados.',
                
                // Breadcrumbs
                'home': 'Início',
                'current_page': 'Participar',
                
                // Botões e controles
                'toggle_theme': 'Alternar modo claro/escuro',
                'select_language': 'Selecionar idioma',
                'accessibility': 'Opções de acessibilidade',
                
                // Seção Principal
                'main_heading': 'Bem-vindo de volta!',
                'main_subtitle': 'Escolha como você quer acessar a plataforma ReUse',
                
                // Card Login
                'login_title': 'Já tenho conta',
                'login_description': 'Acesse sua conta existente para continuar comprando, vendendo ou fazendo doações.',
                'login_benefit1': 'Acesso rápido e seguro',
                'login_benefit2': 'Histórico de atividades',
                'login_benefit3': 'Configurações salvas',
                'login_button': 'Fazer Login',
                
                // Card Cadastro
                'register_title': 'Quero me cadastrar',
                'register_description': 'Crie sua conta agora e comece a fazer parte da economia circular da ReUse.',
                'register_benefit1': 'Cadastro rápido e simples',
                'register_benefit2': 'Acesso a todas as funcionalidades',
                'register_benefit3': 'Comunidade sustentável',
                'register_button': 'Criar Conta',
                
                // Seção Informações Adicionais
                'info1_title': 'Plataforma Segura',
                'info1_description': 'Todas as transações são protegidas e verificadas para sua segurança.',
                
                'info2_title': '+5.000 Membros',
                'info2_description': 'Junte-se a milhares de pessoas que já fazem parte da nossa comunidade.',
                
                'info3_title': 'Impacto Positivo',
                'info3_description': 'Cada ação na ReUse contribui para um planeta mais sustentável.',
                
                // Menu Acessibilidade
                'accessibility_menu': 'Acessibilidade',
                'normal_vision': 'Visão Normal',
                'protanopia': 'Protanopia (Vermelho)',
                'protanomalia': 'Protanomalia (Vermelho Leve)',
                'deuteranopia': 'Deuteranopia (Verde)',
                'deuteranomalia': 'Deuteranomalia (Verde Leve)',
                'tritanopia': 'Tritanopia (Azul)',
                'tritanomalia': 'Tritanomalia (Azul Leve)',
                'acromatomia': 'Acromatomia (Monocromático)',
                'acromatopsia': 'Acromatopsia (Total)'
            },
            'en': {
                // Meta tags
                'title': 'Join - ReUse',
                'description': 'Login or register on ReUse to start buying, selling or donating used items.',
                
                // Breadcrumbs
                'home': 'Home',
                'current_page': 'Join',
                
                // Botões e controles
                'toggle_theme': 'Toggle light/dark mode',
                'select_language': 'Select language',
                'accessibility': 'Accessibility options',
                
                // Seção Principal
                'main_heading': 'Welcome back!',
                'main_subtitle': 'Choose how you want to access the ReUse platform',
                
                // Card Login
                'login_title': 'I already have an account',
                'login_description': 'Access your existing account to continue buying, selling or making donations.',
                'login_benefit1': 'Fast and secure access',
                'login_benefit2': 'Activity history',
                'login_benefit3': 'Saved settings',
                'login_button': 'Login',
                
                // Card Cadastro
                'register_title': 'I want to register',
                'register_description': 'Create your account now and start being part of ReUse\'s circular economy.',
                'register_benefit1': 'Quick and simple registration',
                'register_benefit2': 'Access to all features',
                'register_benefit3': 'Sustainable community',
                'register_button': 'Create Account',
                
                // Seção Informações Adicionais
                'info1_title': 'Secure Platform',
                'info1_description': 'All transactions are protected and verified for your security.',
                
                'info2_title': '+5,000 Members',
                'info2_description': 'Join thousands of people who are already part of our community.',
                
                'info3_title': 'Positive Impact',
                'info3_description': 'Every action on ReUse contributes to a more sustainable planet.',
                
                // Menu Acessibilidade
                'accessibility_menu': 'Accessibility',
                'normal_vision': 'Normal Vision',
                'protanopia': 'Protanopia (Red)',
                'protanomalia': 'Protanomaly (Mild Red)',
                'deuteranopia': 'Deuteranopia (Green)',
                'deuteranomalia': 'Deuteranomaly (Mild Green)',
                'tritanopia': 'Tritanopia (Blue)',
                'tritanomalia': 'Tritanomaly (Mild Blue)',
                'acromatomia': 'Acromatomy (Monochrome)',
                'acromatopsia': 'Achromatopsia (Total)'
            },
            'es': {
                // Meta tags
                'title': 'Participar - ReUse',
                'description': 'Inicia sesión o regístrate en ReUse para comenzar a comprar, vender o donar artículos usados.',
                
                // Breadcrumbs
                'home': 'Inicio',
                'current_page': 'Participar',
                
                // Botões e controles
                'toggle_theme': 'Alternar modo claro/oscuro',
                'select_language': 'Seleccionar idioma',
                'accessibility': 'Opciones de accesibilidad',
                
                // Seção Principal
                'main_heading': '¡Bienvenido de nuevo!',
                'main_subtitle': 'Elige cómo quieres acceder a la plataforma ReUse',
                
                // Card Login
                'login_title': 'Ya tengo cuenta',
                'login_description': 'Accede a tu cuenta existente para seguir comprando, vendiendo o haciendo donaciones.',
                'login_benefit1': 'Acceso rápido y seguro',
                'login_benefit2': 'Historial de actividades',
                'login_benefit3': 'Configuraciones guardadas',
                'login_button': 'Iniciar Sesión',
                
                // Card Cadastro
                'register_title': 'Quiero registrarme',
                'register_description': 'Crea tu cuenta ahora y comienza a ser parte de la economía circular de ReUse.',
                'register_benefit1': 'Registro rápido y simple',
                'register_benefit2': 'Acceso a todas las funcionalidades',
                'register_benefit3': 'Comunidad sostenible',
                'register_button': 'Crear Cuenta',
                
                // Seção Informações Adicionais
                'info1_title': 'Plataforma Segura',
                'info1_description': 'Todas las transacciones están protegidas y verificadas para tu seguridad.',
                
                'info2_title': '+5.000 Miembros',
                'info2_description': 'Únete a miles de personas que ya son parte de nuestra comunidad.',
                
                'info3_title': 'Impacto Positivo',
                'info3_description': 'Cada acción en ReUse contribuye a un planeta más sostenible.',
                
                // Menu Acessibilidade
                'accessibility_menu': 'Accesibilidad',
                'normal_vision': 'Visión Normal',
                'protanopia': 'Protanopia (Rojo)',
                'protanomalia': 'Protanomalía (Rojo Leve)',
                'deuteranopia': 'Deuteranopia (Verde)',
                'deuteranomalia': 'Deuteranomalía (Verde Leve)',
                'tritanopia': 'Tritanopia (Azul)',
                'tritanomalia': 'Tritanomalía (Azul Leve)',
                'acromatomia': 'Acromatoma (Monocromático)',
                'acromatopsia': 'Acromatopsia (Total)'
            },
            'fr': {
                // Meta tags
                'title': 'Participer - ReUse',
                'description': 'Connectez-vous ou inscrivez-vous sur ReUse pour commencer à acheter, vendre ou donner des articles usagés.',
                
                // Breadcrumbs
                'home': 'Accueil',
                'current_page': 'Participer',
                
                // Botões e controles
                'toggle_theme': 'Basculer mode clair/sombre',
                'select_language': 'Sélectionner la langue',
                'accessibility': 'Options d\'accessibilité',
                
                // Seção Principal
                'main_heading': 'Bon retour parmi nous !',
                'main_subtitle': 'Choisissez comment vous souhaitez accéder à la plateforme ReUse',
                
                // Card Login
                'login_title': 'J\'ai déjà un compte',
                'login_description': 'Accédez à votre compte existant pour continuer à acheter, vendre ou faire des dons.',
                'login_benefit1': 'Accès rapide et sécurisé',
                'login_benefit2': 'Historique des activités',
                'login_benefit3': 'Paramètres sauvegardés',
                'login_button': 'Se Connecter',
                
                // Card Cadastro
                'register_title': 'Je veux m\'inscrire',
                'register_description': 'Créez votre compte maintenant et commencez à faire partie de l\'économie circulaire de ReUse.',
                'register_benefit1': 'Inscription rapide et simple',
                'register_benefit2': 'Accès à toutes les fonctionnalités',
                'register_benefit3': 'Communauté durable',
                'register_button': 'Créer un Compte',
                
                // Seção Informações Adicionais
                'info1_title': 'Plateforme Sécurisée',
                'info1_description': 'Toutes les transactions sont protégées et vérifiées pour votre sécurité.',
                
                'info2_title': '+5 000 Membres',
                'info2_description': 'Rejoignez des milliers de personnes qui font déjà partie de notre communauté.',
                
                'info3_title': 'Impact Positif',
                'info3_description': 'Chaque action sur ReUse contribue à une planète plus durable.',
                
                // Menu Acessibilidade
                'accessibility_menu': 'Accessibilité',
                'normal_vision': 'Vision Normale',
                'protanopia': 'Protanopie (Rouge)',
                'protanomalia': 'Protanomalie (Rouge Léger)',
                'deuteranopia': 'Deutéranopie (Vert)',
                'deuteranomalia': 'Deutéranomalie (Vert Léger)',
                'tritanopia': 'Tritanopie (Bleu)',
                'tritanomalia': 'Tritanomalie (Bleu Léger)',
                'acromatomia': 'Acromatomie (Monochrome)',
                'acromatopsia': 'Achromatopsie (Total)'
            }
        };

        // Aplicar traduções
        if (translations[lang]) {
            const translation = translations[lang];
            
            // Atualizar meta tags
            document.title = translation.title;
            document.querySelector('meta[name="description"]').setAttribute('content', translation.description);
            
            // Atualizar breadcrumbs
            updateBreadcrumbs(translation);
            
            // Atualizar elementos específicos
            updateSpecificElements(translation);
            
            // Atualizar menu de acessibilidade
            updateAccessibilityMenu(translation);
            
            // Atualizar o atributo lang do html
            document.documentElement.lang = lang;
            document.body.setAttribute('data-lang', lang);
        }
    }

    // Função para atualizar breadcrumbs
    function updateBreadcrumbs(translation) {
        const breadcrumbHome = document.querySelector('.smart-breadcrumbs a');
        const breadcrumbCurrent = document.querySelector('.smart-breadcrumbs .current-page');
        
        if (breadcrumbHome) breadcrumbHome.textContent = translation.home;
        if (breadcrumbCurrent) breadcrumbCurrent.textContent = translation.current_page;
    }

    // Função para atualizar elementos específicos
    function updateSpecificElements(translation) {
        // Seção Principal
        const mainHeading = document.querySelector('.participation-header h1');
        if (mainHeading) mainHeading.textContent = translation.main_heading;
        
        const mainSubtitle = document.querySelector('.participation-subtitle');
        if (mainSubtitle) mainSubtitle.textContent = translation.main_subtitle;
        
        // Card Login
        updateCardContent('.login-option h3', translation.login_title);
        updateCardContent('.login-option p', translation.login_description);
        updateCardContent('.login-option .benefit:nth-child(1) span', translation.login_benefit1);
        updateCardContent('.login-option .benefit:nth-child(2) span', translation.login_benefit2);
        updateCardContent('.login-option .benefit:nth-child(3) span', translation.login_benefit3);
        updateCardContent('.login-btn span', translation.login_button);
        
        // Card Cadastro
        updateCardContent('.register-option h3', translation.register_title);
        updateCardContent('.register-option p', translation.register_description);
        updateCardContent('.register-option .benefit:nth-child(1) span', translation.register_benefit1);
        updateCardContent('.register-option .benefit:nth-child(2) span', translation.register_benefit2);
        updateCardContent('.register-option .benefit:nth-child(3) span', translation.register_benefit3);
        updateCardContent('.register-btn span', translation.register_button);
        
        // Informações Adicionais
        updateCardContent('.info-card:nth-child(1) h4', translation.info1_title);
        updateCardContent('.info-card:nth-child(1) p', translation.info1_description);
        updateCardContent('.info-card:nth-child(2) h4', translation.info2_title);
        updateCardContent('.info-card:nth-child(2) p', translation.info2_description);
        updateCardContent('.info-card:nth-child(3) h4', translation.info3_title);
        updateCardContent('.info-card:nth-child(3) p', translation.info3_description);
        
        // Atualizar atributos aria-label
        const themeToggle = document.getElementById('themeToggle');
        const accessibilityToggle = document.getElementById('accessibilityToggle');
        const languageBtn = document.querySelector('.language-btn');
        
        if (themeToggle) themeToggle.setAttribute('aria-label', translation.toggle_theme);
        if (accessibilityToggle) accessibilityToggle.setAttribute('aria-label', translation.accessibility);
        if (languageBtn) languageBtn.setAttribute('aria-label', translation.select_language);
    }

    // Função para atualizar menu de acessibilidade
    function updateAccessibilityMenu(translation) {
        const accessibilityMenu = document.getElementById('accessibilityMenu');
        if (accessibilityMenu) {
            const menuTitle = accessibilityMenu.querySelector('h3');
            if (menuTitle) menuTitle.textContent = translation.accessibility_menu;
            
            // Atualizar opções de acessibilidade
            const options = accessibilityMenu.querySelectorAll('.accessibility-option');
            options.forEach((option, index) => {
                const span = option.querySelector('span');
                if (span) {
                    switch(index) {
                        case 0: span.textContent = translation.normal_vision; break;
                        case 1: span.textContent = translation.protanopia; break;
                        case 2: span.textContent = translation.protanomalia; break;
                        case 3: span.textContent = translation.deuteranopia; break;
                        case 4: span.textContent = translation.deuteranomalia; break;
                        case 5: span.textContent = translation.tritanopia; break;
                        case 6: span.textContent = translation.tritanomalia; break;
                        case 7: span.textContent = translation.acromatomia; break;
                        case 8: span.textContent = translation.acromatopsia; break;
                    }
                }
            });
        }
    }

    // Função auxiliar para atualizar conteúdo dos elementos
    function updateCardContent(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    // Adicionar suporte para elementos com data-translate (para compatibilidade futura)
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translations[lang][key]);
            } else if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
});