// Seletor de Idioma
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
                'title': 'ReUse - Compre, Venda e Doe Itens Usados de Forma Sustentável',
                'description': 'Plataforma sustentável para compra, venda e doação de itens usados. Economize dinheiro, ajude o meio ambiente e faça parte da economia circular.',
                
                // Botões e controles
                'toggle_theme': 'Alternar modo claro/escuro',
                'select_language': 'Selecionar idioma',
                
                // Seção Unificada
                'main_heading': 'Dê uma nova vida aos itens que você não usa mais',
                'intro_subtitle': 'Junte-se à <span class="highlight">ReUse</span> e faça parte da economia circular que transforma o consumo em uma experiência sustentável',
                
                // Cards de Benefícios
                'for_buyers': 'Para Compradores',
                'buyers_description': 'Encontre produtos de qualidade com preços acessíveis, economizando até 70% em comparação com produtos novos.',
                'save_money': 'Economize Dinheiro',
                'sustainable_consumption': 'Consumo Sustentável',
                
                'for_sellers': 'Para Vendedores',
                'sellers_description': 'Transforme itens parados em dinheiro extra, com uma plataforma simples e segura para suas vendas.',
                'circular_economy': 'Economia Circular',
                'active_community': 'Comunidade Ativa',
                
                'for_donors': 'Para Doadores',
                'donors_description': 'Faça a diferença na vida de pessoas e instituições, doando itens que não usa mais para quem precisa.',
                'solidarity': 'Solidariedade',
                'environmental_impact': 'Impacto Ambiental',
                
                // Seção de Impacto
                'impact_title': 'Juntos Estamos Fazendo a Diferença',
                'impact_subtitle': 'Nossa comunidade já alcançou resultados incríveis que impactam positivamente o planeta e a sociedade',
                
                'items_reused': 'Itens Reutilizados',
                'items_description': 'Evitando que produtos úteis se tornem resíduos',
                
                'donations_made': 'Doações Realizadas',
                'donations_description': 'Apoiando pessoas e instituições que precisam',
                
                'co2_saved': 'Toneladas de CO² Economizadas',
                'co2_description': 'Equivalente ao plantio de 1.250 árvores',
                
                'active_members': 'Membros Ativos',
                'members_description': 'Pessoas engajadas na economia circular',
                
                'impact_quote': 'Cada item reutilizado é uma vitória para o nosso planeta',
                'share_impact': 'Compartilhar Impacto',
                'view_stories': 'Ver Histórias',
                
                // Seção CTA
                'cta_ready': 'Pronto para Fazer Parte Dessa Mudança?',
                'cta_subtitle': 'Junte-se a milhares de pessoas que já estão transformando o consumo e fazendo a diferença no planeta',
                
                'benefit_1': 'Economize até 70% em produtos de qualidade',
                'benefit_2': 'Ganhe dinheiro extra com itens que não usa mais',
                'benefit_3': 'Ajude o meio ambiente e pessoas que precisam',
                
                'join_now': 'Quero Participar Agora',
                'learn_more': 'Saiba Mais',
                
                'secure_platform': 'Plataforma Segura',
                'fast_registration': 'Cadastro Rápido',
                'members_count': '+5.000 Membros'
            },
            'en': {
                // Meta tags
                'title': 'ReUse - Buy, Sell and Donate Used Items Sustainably',
                'description': 'Sustainable platform for buying, selling and donating used items. Save money, help the environment and be part of the circular economy.',
                
                // Botões e controles
                'toggle_theme': 'Toggle light/dark mode',
                'select_language': 'Select language',
                
                // Seção Unificada
                'main_heading': 'Give new life to items you no longer use',
                'intro_subtitle': 'Join <span class="highlight">ReUse</span> and be part of the circular economy that transforms consumption into a sustainable experience',
                
                // Cards de Benefícios
                'for_buyers': 'For Buyers',
                'buyers_description': 'Find quality products at affordable prices, saving up to 70% compared to new products.',
                'save_money': 'Save Money',
                'sustainable_consumption': 'Sustainable Consumption',
                
                'for_sellers': 'For Sellers',
                'sellers_description': 'Turn unused items into extra money with a simple and secure platform for your sales.',
                'circular_economy': 'Circular Economy',
                'active_community': 'Active Community',
                
                'for_donors': 'For Donors',
                'donors_description': 'Make a difference in people\'s lives and institutions by donating items you no longer use to those in need.',
                'solidarity': 'Solidarity',
                'environmental_impact': 'Environmental Impact',
                
                // Seção de Impacto
                'impact_title': 'Together We Are Making a Difference',
                'impact_subtitle': 'Our community has already achieved incredible results that positively impact the planet and society',
                
                'items_reused': 'Items Reused',
                'items_description': 'Preventing useful products from becoming waste',
                
                'donations_made': 'Donations Made',
                'donations_description': 'Supporting people and institutions in need',
                
                'co2_saved': 'Tons of CO² Saved',
                'co2_description': 'Equivalent to planting 1,250 trees',
                
                'active_members': 'Active Members',
                'members_description': 'People engaged in the circular economy',
                
                'impact_quote': 'Every reused item is a victory for our planet',
                'share_impact': 'Share Impact',
                'view_stories': 'View Stories',
                
                // Seção CTA
                'cta_ready': 'Ready to Be Part of This Change?',
                'cta_subtitle': 'Join thousands of people who are already transforming consumption and making a difference on the planet',
                
                'benefit_1': 'Save up to 70% on quality products',
                'benefit_2': 'Earn extra money with items you no longer use',
                'benefit_3': 'Help the environment and people in need',
                
                'join_now': 'Join Now',
                'learn_more': 'Learn More',
                
                'secure_platform': 'Secure Platform',
                'fast_registration': 'Fast Registration',
                'members_count': '+5,000 Members'
            },
            'es': {
                // Meta tags
                'title': 'ReUse - Compra, Vende y Dona Artículos Usados de Forma Sostenible',
                'description': 'Plataforma sostenible para comprar, vender y donar artículos usados. Ahorra dinero, ayuda al medio ambiente y forma parte de la economía circular.',
                
                // Botões e controles
                'toggle_theme': 'Alternar modo claro/oscuro',
                'select_language': 'Seleccionar idioma',
                
                // Seção Unificada
                'main_heading': 'Dale nueva vida a los artículos que ya no usas',
                'intro_subtitle': 'Únete a <span class="highlight">ReUse</span> y forma parte de la economía circular que transforma el consumo en una experiencia sostenible',
                
                // Cards de Benefícios
                'for_buyers': 'Para Compradores',
                'buyers_description': 'Encuentra productos de calidad a precios asequibles, ahorrando hasta un 70% en comparación con productos nuevos.',
                'save_money': 'Ahorra Dinero',
                'sustainable_consumption': 'Consumo Sostenible',
                
                'for_sellers': 'Para Vendedores',
                'sellers_description': 'Convierte artículos sin usar en dinero extra con una plataforma simple y segura para tus ventas.',
                'circular_economy': 'Economía Circular',
                'active_community': 'Comunidad Activa',
                
                'for_donors': 'Para Donantes',
                'donors_description': 'Marca la diferencia en la vida de las personas e instituciones donando artículos que ya no usas a quienes los necesitan.',
                'solidarity': 'Solidaridad',
                'environmental_impact': 'Impacto Ambiental',
                
                // Seção de Impacto
                'impact_title': 'Juntos Estamos Marcando la Diferencia',
                'impact_subtitle': 'Nuestra comunidad ya ha logrado resultados increíbles que impactan positivamente al planeta y la sociedad',
                
                'items_reused': 'Artículos Reutilizados',
                'items_description': 'Evitando que productos útiles se conviertan en residuos',
                
                'donations_made': 'Donaciones Realizadas',
                'donations_description': 'Apoyando a personas e instituciones que lo necesitan',
                
                'co2_saved': 'Toneladas de CO² Ahorradas',
                'co2_description': 'Equivalente a plantar 1.250 árboles',
                
                'active_members': 'Miembros Activos',
                'members_description': 'Personas comprometidas con la economía circular',
                
                'impact_quote': 'Cada artículo reutilizado es una victoria para nuestro planeta',
                'share_impact': 'Compartir Impacto',
                'view_stories': 'Ver Historias',
                
                // Seção CTA
                'cta_ready': '¿Listo para Ser Parte de Este Cambio?',
                'cta_subtitle': 'Únete a miles de personas que ya están transformando el consumo y marcando la diferencia en el planeta',
                
                'benefit_1': 'Ahorra hasta un 70% en productos de calidad',
                'benefit_2': 'Gana dinero extra con artículos que ya no usas',
                'benefit_3': 'Ayuda al medio ambiente y a personas necesitadas',
                
                'join_now': 'Quiero Participar Ahora',
                'learn_more': 'Saber Más',
                
                'secure_platform': 'Plataforma Segura',
                'fast_registration': 'Registro Rápido',
                'members_count': '+5.000 Miembros'
            },
            'fr': {
                // Meta tags
                'title': 'ReUse - Achetez, Vendez et Donnez des Articles Usagés de Manière Durable',
                'description': 'Plateforme durable pour acheter, vendre et donner des articles usagés. Économisez de l\'argent, aidez l\'environnement et faites partie de l\'économie circulaire.',
                
                // Botões e controles
                'toggle_theme': 'Basculer mode clair/sombre',
                'select_language': 'Sélectionner la langue',
                
                // Seção Unificada
                'main_heading': 'Donnez une nouvelle vie aux articles que vous n\'utilisez plus',
                'intro_subtitle': 'Rejoignez <span class="highlight">ReUse</span> et faites partie de l\'économie circulaire qui transforme la consommation en une expérience durable',
                
                // Cards de Benefícios
                'for_buyers': 'Pour les Acheteurs',
                'buyers_description': 'Trouvez des produits de qualité à des prix abordables, économisant jusqu\'à 70% par rapport aux produits neufs.',
                'save_money': 'Économiser de l\'Argent',
                'sustainable_consumption': 'Consommation Durable',
                
                'for_sellers': 'Pour les Vendeurs',
                'sellers_description': 'Transformez les articles inutilisés en argent supplémentaire avec une plateforme simple et sécurisée pour vos ventes.',
                'circular_economy': 'Économie Circulaire',
                'active_community': 'Communauté Active',
                
                'for_donors': 'Pour les Donateurs',
                'donors_description': 'Faites une différence dans la vie des personnes et des institutions en donnant des articles que vous n\'utilisez plus à ceux qui en ont besoin.',
                'solidarity': 'Solidarité',
                'environmental_impact': 'Impact Environnemental',
                
                // Seção de Impacto
                'impact_title': 'Ensemble Nous Faisons la Différence',
                'impact_subtitle': 'Notre communauté a déjà obtenu des résultats incroyables qui impactent positivement la planète et la société',
                
                'items_reused': 'Articles Réutilisés',
                'items_description': 'Empêcher les produits utiles de devenir des déchets',
                
                'donations_made': 'Dons Réalisés',
                'donations_description': 'Soutenir les personnes et les institutions dans le besoin',
                
                'co2_saved': 'Tonnes de CO² Économisées',
                'co2_description': 'Équivalent à la plantation de 1 250 arbres',
                
                'active_members': 'Membres Actifs',
                'members_description': 'Personnes engagées dans l\'économie circulaire',
                
                'impact_quote': 'Chaque article réutilisé est une victoire pour notre planète',
                'share_impact': 'Partager l\'Impact',
                'view_stories': 'Voir les Histoires',
                
                // Seção CTA
                'cta_ready': 'Prêt à Faire Partie de Ce Changement ?',
                'cta_subtitle': 'Rejoignez des milliers de personnes qui transforment déjà la consommation et font la différence sur la planète',
                
                'benefit_1': 'Économisez jusqu\'à 70% sur des produits de qualité',
                'benefit_2': 'Gagnez un revenu supplémentaire avec des articles que vous n\'utilisez plus',
                'benefit_3': 'Aidez l\'environnement et les personnes dans le besoin',
                
                'join_now': 'Je veux Participer Maintenant',
                'learn_more': 'En Savoir Plus',
                
                'secure_platform': 'Plateforme Sécurisée',
                'fast_registration': 'Inscription Rapide',
                'members_count': '+5 000 Membres'
            }
        };

        // Aplicar traduções
        if (translations[lang]) {
            const translation = translations[lang];
            
            // Atualizar meta tags
            document.title = translation.title;
            document.querySelector('meta[name="description"]').setAttribute('content', translation.description);
            
            // Atualizar todos os elementos com data-translate
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translation[key]) {
                    if (element.tagName === 'META' || element.tagName === 'TITLE') {
                        // Meta tags e title são tratados separadamente
                        return;
                    }
                    
                    if (element.hasAttribute('aria-label')) {
                        element.setAttribute('aria-label', translation[key]);
                    } else if (element.hasAttribute('placeholder')) {
                        element.setAttribute('placeholder', translation[key]);
                    } else {
                        // Para elementos com HTML interno (como o subtítulo com span)
                        if (key === 'intro_subtitle') {
                            element.innerHTML = translation[key];
                        } else {
                            element.textContent = translation[key];
                        }
                    }
                }
            });
            
            // Atualizar elementos específicos que não usam data-translate
            updateSpecificElements(translation);
            
            // Atualizar o atributo lang do html
            document.documentElement.lang = lang;
            document.body.setAttribute('data-lang', lang);
        }
    }

    // Função para atualizar elementos específicos
    function updateSpecificElements(translation) {
        // Seção Unificada
        const mainHeading = document.querySelector('.intro-content h1');
        if (mainHeading) mainHeading.textContent = translation.main_heading;
        
        const introSubtitle = document.querySelector('.intro-subtitle');
        if (introSubtitle) introSubtitle.innerHTML = translation.intro_subtitle;
        
        // Cards de Benefícios
        updateCardContent('.buyer-card h3', translation.for_buyers);
        updateCardContent('.buyer-card p', translation.buyers_description);
        updateCardContent('.buyer-card .value-item:nth-child(1) span', translation.save_money);
        updateCardContent('.buyer-card .value-item:nth-child(2) span', translation.sustainable_consumption);
        
        updateCardContent('.seller-card h3', translation.for_sellers);
        updateCardContent('.seller-card p', translation.sellers_description);
        updateCardContent('.seller-card .value-item:nth-child(1) span', translation.circular_economy);
        updateCardContent('.seller-card .value-item:nth-child(2) span', translation.active_community);
        
        updateCardContent('.donor-card h3', translation.for_donors);
        updateCardContent('.donor-card p', translation.donors_description);
        updateCardContent('.donor-card .value-item:nth-child(1) span', translation.solidarity);
        updateCardContent('.donor-card .value-item:nth-child(2) span', translation.environmental_impact);
        
        // Seção de Impacto
        updateCardContent('.impact-title', translation.impact_title);
        updateCardContent('.impact-subtitle', translation.impact_subtitle);
        
        updateCardContent('.stat-item:nth-child(1) .stat-label', translation.items_reused);
        updateCardContent('.stat-item:nth-child(1) .stat-description', translation.items_description);
        
        updateCardContent('.stat-item:nth-child(2) .stat-label', translation.donations_made);
        updateCardContent('.stat-item:nth-child(2) .stat-description', translation.donations_description);
        
        updateCardContent('.stat-item:nth-child(3) .stat-label', translation.co2_saved);
        updateCardContent('.stat-item:nth-child(3) .stat-description', translation.co2_description);
        
        updateCardContent('.stat-item:nth-child(4) .stat-label', translation.active_members);
        updateCardContent('.stat-item:nth-child(4) .stat-description', translation.members_description);
        
        updateCardContent('.impact-quote p', translation.impact_quote);
        updateCardContent('.share-btn', translation.share_impact);
        updateCardContent('.story-btn', translation.view_stories);
        
        // Seção CTA
        updateCardContent('.cta-content h2', translation.cta_ready);
        updateCardContent('.cta-subtitle', translation.cta_subtitle);
        
        updateCardContent('.benefit-item:nth-child(1) span', translation.benefit_1);
        updateCardContent('.benefit-item:nth-child(2) span', translation.benefit_2);
        updateCardContent('.benefit-item:nth-child(3) span', translation.benefit_3);
        
        updateCardContent('.cta-button.primary span', translation.join_now);
        updateCardContent('.cta-button.secondary span', translation.learn_more);
        
        updateCardContent('.badge:nth-child(1) span', translation.secure_platform);
        updateCardContent('.badge:nth-child(2) span', translation.fast_registration);
        updateCardContent('.badge:nth-child(3) span', translation.members_count);
    }

    // Função auxiliar para atualizar conteúdo dos cards
    function updateCardContent(selector, text) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }
});