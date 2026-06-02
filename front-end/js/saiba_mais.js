// Script para FAQ, Sistema de Acessibilidade e Tradução
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FAQ
    initFAQ();
    
    // Inicializar partículas
    createParticles();
    
    // Inicializar sistema de acessibilidade
    AccessibilityState.init();
    
    // Inicializar efeitos da equipe
    initTeamEffects();
});

// Sistema de FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar o item atual
            item.classList.toggle('active');
        });
    });
}

// Animação de partículas interativas
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 5 + 2;
        
        // Cor aleatória
        const colors = ['#00b894', '#0984e3', '#fd79a8', '#fdcb6e'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Aplicar estilos
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0.7';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        // Animação
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        container.appendChild(particle);
    }
    
    // Adicionar a animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.7;
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                opacity: 0.9;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                opacity: 0.5;
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                opacity: 0.8;
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// Efeitos para a seção da equipe
function initTeamEffects() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Efeito de parallax suave no hover
        member.addEventListener('mousemove', (e) => {
            const rect = member.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            member.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Sistema de Tradução
const TranslationManager = {
    translations: {
        pt: {
            // Header
            pageTitle: "Saiba Mais",
            pageSubtitle: "Descubra nossa missão, valores e como estamos transformando o consumo através da economia circular",
            
            // Seções
            aboutTitle: "Sobre a ReUse",
            aboutContent1: "A <strong>ReUse</strong> nasceu da necessidade de criar uma solução prática e eficiente para o consumo consciente. Em um mundo onde o descarte de produtos ainda em bom estado se tornou comum, percebemos a oportunidade de conectar pessoas que desejam dar um novo propósito a itens que não usam mais com aqueles que procuram alternativas sustentáveis e acessíveis.",
            aboutContent2: "Nossa plataforma é mais do que um simples marketplace de itens usados. É uma comunidade engajada em promover a economia circular, reduzir o desperdício e criar um impacto positivo no meio ambiente e na sociedade.",
            aboutContent3: "Acreditamos que cada item reutilizado é uma vitória para o planeta, e cada transação realizada em nossa plataforma representa um passo em direção a um futuro mais sustentável.",
            
            valuesTitle: "Nossos Valores",
            sustainability: "Sustentabilidade",
            sustainabilityDesc: "Promovemos a reutilização como forma de reduzir o consumo de recursos naturais e minimizar o impacto ambiental.",
            community: "Comunidade",
            communityDesc: "Acreditamos no poder das conexões humanas para criar um impacto coletivo positivo.",
            transparency: "Transparência",
            transparencyDesc: "Valorizamos a honestidade em todas as interações e transações realizadas em nossa plataforma.",
            innovation: "Inovação",
            innovationDesc: "Buscamos constantemente novas formas de melhorar a experiência do usuário e ampliar nosso impacto.",
            
            howItWorksTitle: "Como Funciona",
            step1: "Cadastro",
            step1Desc: "Crie sua conta na ReUse de forma rápida e gratuita. Você precisará fornecer informações básicas e confirmar seu e-mail.",
            step2: "Explore ou Anuncie",
            step2Desc: "Navegue pelos itens disponíveis ou publique seus próprios produtos para venda ou doação. Utilize filtros para encontrar exatamente o que procura.",
            step3: "Conecte-se",
            step3Desc: "Entre em contato com outros usuários através do nosso sistema de mensagens para negociar preços, combinar entregas ou obter mais informações sobre os produtos.",
            step4: "Finalize a Transação",
            step4Desc: "Combine a forma de pagamento (para vendas) e o método de entrega. Para doações, combine diretamente com o receptor.",
            step5: "Avalie a Experiência",
            step5Desc: "Após a conclusão da transação, avalie o outro usuário. Isso ajuda a construir uma comunidade confiável e transparente.",
            
            teamTitle: "Nossa Equipe",
            teamSubtitle: "Conheça os talentosos profissionais por trás do projeto ReUse",
            
            faqTitle: "Perguntas Frequentes",
            faq1: "A ReUse cobra alguma taxa pelos anúncios?",
            faq1Answer: "Não! A ReUse é completamente gratuita para usuários comuns. Você pode anunciar, comprar e doar itens sem pagar nenhuma taxa. Nossa missão é promover a economia circular, não o lucro.",
            faq2: "Como garanto a segurança nas transações?",
            faq2Answer: "Recomendamos que todas as transações sejam realizadas pessoalmente em locais públicos. Para pagamentos, sugerimos métodos seguros como PIX com comprovante. Além disso, nosso sistema de avaliações ajuda a identificar usuários confiáveis.",
            faq3: "Quais tipos de itens posso anunciar?",
            faq3Answer: "Você pode anunciar praticamente qualquer item em bom estado: roupas, eletrônicos, móveis, livros, utensílios domésticos, equipamentos esportivos, etc. Apenas não permitimos a venda de produtos ilegais, perigosos ou que violem nossos termos de uso.",
            faq4: "Como funciona o sistema de doações?",
            faq4Answer: "O sistema de doações é simples: você anuncia o item como 'para doação' em vez de 'para venda'. Pessoas interessadas entrarão em contato com você, e você poderá escolher para quem doar com base em suas preferências.",
            
            backButton: "Voltar para a Página Inicial",
            
            // Acessibilidade
            darkMode: "Modo Escuro",
            lightMode: "Modo Claro",
            colorblindMode: "Modo Daltonismo",
            language: "Idioma"
        },
        
        en: {
            // Header
            pageTitle: "Learn More",
            pageSubtitle: "Discover our mission, values and how we're transforming consumption through the circular economy",
            
            // Seções
            aboutTitle: "About ReUse",
            aboutContent1: "<strong>ReUse</strong> was born from the need to create a practical and efficient solution for conscious consumption. In a world where discarding products that are still in good condition has become common, we saw the opportunity to connect people who want to give new purpose to items they no longer use with those looking for sustainable and affordable alternatives.",
            aboutContent2: "Our platform is more than just a marketplace for used items. It's a community engaged in promoting the circular economy, reducing waste and creating a positive impact on the environment and society.",
            aboutContent3: "We believe that every reused item is a victory for the planet, and every transaction made on our platform represents a step towards a more sustainable future.",
            
            valuesTitle: "Our Values",
            sustainability: "Sustainability",
            sustainabilityDesc: "We promote reuse as a way to reduce the consumption of natural resources and minimize environmental impact.",
            community: "Community",
            communityDesc: "We believe in the power of human connections to create positive collective impact.",
            transparency: "Transparency",
            transparencyDesc: "We value honesty in all interactions and transactions conducted on our platform.",
            innovation: "Innovation",
            innovationDesc: "We constantly seek new ways to improve user experience and expand our impact.",
            
            howItWorksTitle: "How It Works",
            step1: "Registration",
            step1Desc: "Create your ReUse account quickly and free of charge. You'll need to provide basic information and confirm your email.",
            step2: "Explore or Advertise",
            step2Desc: "Browse available items or publish your own products for sale or donation. Use filters to find exactly what you're looking for.",
            step3: "Connect",
            step3Desc: "Contact other users through our messaging system to negotiate prices, arrange deliveries or get more information about products.",
            step4: "Complete Transaction",
            step4Desc: "Agree on payment method (for sales) and delivery method. For donations, arrange directly with the recipient.",
            step5: "Rate Experience",
            step5Desc: "After completing the transaction, rate the other user. This helps build a trustworthy and transparent community.",
            
            teamTitle: "Our Team",
            teamSubtitle: "Meet the talented professionals behind the ReUse project",
            
            faqTitle: "Frequently Asked Questions",
            faq1: "Does ReUse charge any fees for listings?",
            faq1Answer: "No! ReUse is completely free for regular users. You can list, buy and donate items without paying any fees. Our mission is to promote the circular economy, not profit.",
            faq2: "How do I ensure transaction security?",
            faq2Answer: "We recommend that all transactions be conducted in person in public places. For payments, we suggest secure methods like PIX with receipt. Additionally, our rating system helps identify trustworthy users.",
            faq3: "What types of items can I list?",
            faq3Answer: "You can list almost any item in good condition: clothing, electronics, furniture, books, household utensils, sports equipment, etc. We only prohibit the sale of illegal, dangerous products or those that violate our terms of use.",
            faq4: "How does the donation system work?",
            faq4Answer: "The donation system is simple: you list the item as 'for donation' instead of 'for sale'. Interested people will contact you, and you can choose who to donate to based on your preferences.",
            
            backButton: "Back to Homepage",
            
            // Acessibilidade
            darkMode: "Dark Mode",
            lightMode: "Light Mode",
            colorblindMode: "Colorblind Mode",
            language: "Language"
        },
        
        es: {
            // Header
            pageTitle: "Saber Más",
            pageSubtitle: "Descubre nuestra misión, valores y cómo estamos transformando el consumo a través de la economía circular",
            
            // Secciones
            aboutTitle: "Sobre ReUse",
            aboutContent1: "<strong>ReUse</strong> nació de la necesidad de crear una solución práctica y eficiente para el consumo consciente. En un mundo donde desechar productos que aún están en buen estado se ha vuelto común, vimos la oportunidad de conectar a personas que desean dar un nuevo propósito a artículos que ya no usan con aquellos que buscan alternativas sostenibles y asequibles.",
            aboutContent2: "Nuestra plataforma es más que un simple mercado de artículos usados. Es una comunidad comprometida en promover la economía circular, reducir el desperdicio y crear un impacto positivo en el medio ambiente y la sociedad.",
            aboutContent3: "Creemos que cada artículo reutilizado es una victoria para el planeta, y cada transacción realizada en nuestra plataforma representa un paso hacia un futuro más sostenible.",
            
            valuesTitle: "Nuestros Valores",
            sustainability: "Sostenibilidad",
            sustainabilityDesc: "Promovemos la reutilización como forma de reducir el consumo de recursos naturales y minimizar el impacto ambiental.",
            community: "Comunidad",
            communityDesc: "Creemos en el poder de las conexiones humanas para crear un impacto colectivo positivo.",
            transparency: "Transparencia",
            transparencyDesc: "Valoramos la honestidad en todas las interacciones y transacciones realizadas en nuestra plataforma.",
            innovation: "Innovación",
            innovationDesc: "Buscamos constantemente nuevas formas de mejorar la experiencia del usuario y ampliar nuestro impacto.",
            
            howItWorksTitle: "Cómo Funciona",
            step1: "Registro",
            step1Desc: "Crea tu cuenta en ReUse de forma rápida y gratuita. Necesitarás proporcionar información básica y confirmar tu correo electrónico.",
            step2: "Explora o Anuncia",
            step2Desc: "Navega por los artículos disponibles o publica tus propios productos para venta o donación. Utiliza filtros para encontrar exactamente lo que buscas.",
            step3: "Conéctate",
            step3Desc: "Ponte en contacto con otros usuarios a través de nuestro sistema de mensajes para negociar precios, coordinar entregas u obtener más información sobre los productos.",
            step4: "Finaliza Transacción",
            step4Desc: "Acuerda la forma de pago (para ventas) y el método de entrega. Para donaciones, coordina directamente con el receptor.",
            step5: "Evalúa Experiencia",
            step5Desc: "Después de completar la transacción, evalúa al otro usuario. Esto ayuda a construir una comunidad confiable y transparente.",
            
            teamTitle: "Nuestro Equipo",
            teamSubtitle: "Conoce a los talentosos profesionales detrás del proyecto ReUse",
            
            faqTitle: "Preguntas Frecuentes",
            faq1: "¿ReUse cobra alguna tarifa por los anuncios?",
            faq1Answer: "¡No! ReUse es completamente gratuito para usuarios regulares. Puedes anunciar, comprar y donar artículos sin pagar ninguna tarifa. Nuestra misión es promover la economía circular, no el lucro.",
            faq2: "¿Cómo garantizo la seguridad en las transacciones?",
            faq2Answer: "Recomendamos que todas las transacciones se realicen en persona en lugares públicos. Para pagos, sugerimos métodos seguros como PIX con comprobante. Además, nuestro sistema de calificaciones ayuda a identificar usuarios confiables.",
            faq3: "¿Qué tipos de artículos puedo anunciar?",
            faq3Answer: "Puedes anunciar prácticamente cualquier artículo en buen estado: ropa, electrónicos, muebles, libros, utensilios domésticos, equipos deportivos, etc. Solo prohibimos la venta de productos ilegales, peligrosos o que violen nuestros términos de uso.",
            faq4: "¿Cómo funciona el sistema de donaciones?",
            faq4Answer: "El sistema de donaciones es simple: anuncias el artículo como 'para donación' en lugar de 'para venta'. Las personas interesadas se pondrán en contacto contigo y podrás elegir a quién donar según tus preferencias.",
            
            backButton: "Volver a la Página Principal",
            
            // Accesibilidad
            darkMode: "Modo Oscuro",
            lightMode: "Modo Claro",
            colorblindMode: "Modo Daltonismo",
            language: "Idioma"
        }
    },

    applyTranslation(lang) {
        const t = this.translations[lang];
        if (!t) return;

        // Aplicar traduções aos elementos
        document.querySelector('.page-title').textContent = t.pageTitle;
        document.querySelector('.page-subtitle').textContent = t.pageSubtitle;

        // Sobre
        const aboutSection = document.querySelector('.section:nth-child(1)');
        aboutSection.querySelector('.section-title').innerHTML = `<i class="fas fa-info-circle"></i> ${t.aboutTitle}`;
        const aboutContent = aboutSection.querySelector('.section-content');
        aboutContent.innerHTML = `
            <p>${t.aboutContent1}</p>
            <p>${t.aboutContent2}</p>
            <p>${t.aboutContent3}</p>
        `;

        // Valores
        const valuesSection = document.querySelector('.section:nth-child(2)');
        valuesSection.querySelector('.section-title').innerHTML = `<i class="fas fa-heart"></i> ${t.valuesTitle}`;
        const valueCards = valuesSection.querySelectorAll('.value-card');
        valueCards[0].querySelector('.value-title').textContent = t.sustainability;
        valueCards[0].querySelector('p').textContent = t.sustainabilityDesc;
        valueCards[1].querySelector('.value-title').textContent = t.community;
        valueCards[1].querySelector('p').textContent = t.communityDesc;
        valueCards[2].querySelector('.value-title').textContent = t.transparency;
        valueCards[2].querySelector('p').textContent = t.transparencyDesc;
        valueCards[3].querySelector('.value-title').textContent = t.innovation;
        valueCards[3].querySelector('p').textContent = t.innovationDesc;

        // Como Funciona
        const howItWorksSection = document.querySelector('.section:nth-child(3)');
        howItWorksSection.querySelector('.section-title').innerHTML = `<i class="fas fa-cogs"></i> ${t.howItWorksTitle}`;
        const steps = howItWorksSection.querySelectorAll('.process-step');
        steps[0].querySelector('.step-title').textContent = t.step1;
        steps[0].querySelector('p').textContent = t.step1Desc;
        steps[1].querySelector('.step-title').textContent = t.step2;
        steps[1].querySelector('p').textContent = t.step2Desc;
        steps[2].querySelector('.step-title').textContent = t.step3;
        steps[2].querySelector('p').textContent = t.step3Desc;
        steps[3].querySelector('.step-title').textContent = t.step4;
        steps[3].querySelector('p').textContent = t.step4Desc;
        steps[4].querySelector('.step-title').textContent = t.step5;
        steps[4].querySelector('p').textContent = t.step5Desc;

        // Equipe
        const teamSection = document.querySelector('.team-section');
        teamSection.querySelector('.section-title').innerHTML = `<i class="fas fa-users"></i> ${t.teamTitle}`;
        teamSection.querySelector('.page-subtitle').textContent = t.teamSubtitle;

        // FAQ
        const faqSection = document.querySelector('.section:nth-child(5)');
        faqSection.querySelector('.section-title').innerHTML = `<i class="fas fa-question-circle"></i> ${t.faqTitle}`;
        const faqItems = faqSection.querySelectorAll('.faq-item');
        faqItems[0].querySelector('.faq-question span').textContent = t.faq1;
        faqItems[0].querySelector('.faq-answer p').textContent = t.faq1Answer;
        faqItems[1].querySelector('.faq-question span').textContent = t.faq2;
        faqItems[1].querySelector('.faq-answer p').textContent = t.faq2Answer;
        faqItems[2].querySelector('.faq-question span').textContent = t.faq3;
        faqItems[2].querySelector('.faq-answer p').textContent = t.faq3Answer;
        faqItems[3].querySelector('.faq-question span').textContent = t.faq4;
        faqItems[3].querySelector('.faq-answer p').textContent = t.faq4Answer;

        // Botão Voltar
        document.querySelector('.back-btn').innerHTML = `<i class="fas fa-arrow-left"></i> ${t.backButton}`;

        // Atualizar atributos de acessibilidade
        document.getElementById('darkModeToggle').setAttribute('title', 
            AccessibilityState.currentMode === 'light' ? t.lightMode : t.darkMode);
        document.getElementById('colorblindToggle').setAttribute('title', t.colorblindMode);
        document.getElementById('languageToggle').setAttribute('title', t.language);
    }
};

// Sistema de Gerenciamento de Estado para Acessibilidade
const AccessibilityState = {
    currentMode: 'dark',
    colorblindMode: null,
    currentLanguage: 'pt',
    
    init() {
        this.loadFromStorage();
        this.applyCurrentState();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    },
    
    loadFromStorage() {
        this.currentMode = localStorage.getItem('currentMode') || 'dark';
        this.colorblindMode = localStorage.getItem('colorblindMode');
        this.currentLanguage = localStorage.getItem('language') || 'pt';
    },
    
    saveToStorage() {
        localStorage.setItem('currentMode', this.currentMode);
        localStorage.setItem('colorblindMode', this.colorblindMode);
        localStorage.setItem('language', this.currentLanguage);
    },
    
    applyCurrentState() {
        // Aplicar modo de tema
        this.applyThemeMode(this.currentMode);
        
        // Aplicar modo daltonismo
        if (this.colorblindMode) {
            this.applyColorblindMode(this.colorblindMode);
        }
        
        // Aplicar idioma
        this.applyLanguage(this.currentLanguage);
        
        this.updateAccessibilityLabels();
    },
    
    setupEventListeners() {
        // Modo de Tema
        const themeToggle = document.getElementById('darkModeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleThemeMode();
            });
        }
        
        // Menu Daltonismo
        const colorblindToggle = document.getElementById('colorblindToggle');
        if (colorblindToggle) {
            colorblindToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('colorblindDropdown').classList.toggle('show');
            });
        }
        
        // Opções de Daltonismo
        document.querySelectorAll('.colorblind-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setColorblindMode(mode);
                document.getElementById('colorblindDropdown').classList.remove('show');
            });
        });
        
        // Reset Daltonismo
        const colorblindReset = document.getElementById('colorblindReset');
        if (colorblindReset) {
            colorblindReset.addEventListener('click', () => {
                this.removeColorblindMode();
                document.getElementById('colorblindDropdown').classList.remove('show');
            });
        }
        
        // Menu de Idioma
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('languageDropdown').classList.toggle('show');
            });
        }
        
        // Opções de Idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.changeLanguage(lang);
                document.getElementById('languageDropdown').classList.remove('show');
            });
        });
        
        // Fechar menus ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.colorblind-menu')) {
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
            if (!e.target.closest('.language-menu')) {
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        });
    },
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Alt+D para daltonismo
            if (e.ctrlKey && e.altKey && e.key === 'd') {
                e.preventDefault();
                document.getElementById('colorblindDropdown').classList.toggle('show');
            }
            
            // Ctrl+Alt+L para idioma
            if (e.ctrlKey && e.altKey && e.key === 'l') {
                e.preventDefault();
                document.getElementById('languageDropdown').classList.toggle('show');
            }
            
            // Ctrl+Alt+N para alternar tema
            if (e.ctrlKey && e.altKey && e.key === 'n') {
                e.preventDefault();
                this.toggleThemeMode();
            }
        });
    },
    
    toggleThemeMode() {
        // Alternar entre dark e light
        this.currentMode = this.currentMode === 'dark' ? 'light' : 'dark';
        
        this.applyThemeMode(this.currentMode);
        
        const modeNames = {
            'dark': 'Modo Escuro',
            'light': 'Modo Claro'
        };
        
        this.showIndicator(`${modeNames[this.currentMode]} Ativado`);
        this.saveToStorage();
    },
    
    applyThemeMode(mode) {
        // Remover classes anteriores
        document.body.classList.remove('dark-mode', 'light-mode');
        
        // Aplicar nova classe
        document.body.classList.add(`${mode}-mode`);
        
        this.updateThemeIcon();
        
        // Atualizar tradução do título do botão
        const t = TranslationManager.translations[this.currentLanguage];
        if (t) {
            document.getElementById('darkModeToggle').setAttribute('title', 
                mode === 'light' ? t.lightMode : t.darkMode);
        }
    },
    
    updateThemeIcon() {
        const icon = document.getElementById('darkModeToggle').querySelector('i');
        if (icon) {
            if (this.currentMode === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    },
    
    setColorblindMode(mode) {
        // Remover modos anteriores
        this.removeColorblindMode();
        
        this.colorblindMode = mode;
        this.applyColorblindMode(mode);
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
        this.showIndicator('Filtro Daltonismo Removido');
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
    },
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.applyLanguage(lang);
        this.showIndicator(`Idioma alterado para: ${this.getLanguageName(lang)}`);
        this.saveToStorage();
    },
    
    applyLanguage(lang) {
        // Aplicar tradução
        TranslationManager.applyTranslation(lang);
        
        // Atualizar menu de idioma
        this.updateLanguageMenu();
        
        // Atualizar atributo lang do HTML
        document.documentElement.lang = lang;
    },
    
    getLanguageName(lang) {
        const names = { pt: 'Português', en: 'English', es: 'Español' };
        return names[lang] || lang;
    },
    
    updateLanguageMenu() {
        // Remover classe active de todas as opções
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Adicionar classe active na opção atual
        const activeOption = document.querySelector(`[data-lang="${this.currentLanguage}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    },
    
    updateAccessibilityLabels() {
        // Atualizar titles dos botões de acessibilidade
        const t = TranslationManager.translations[this.currentLanguage];
        if (!t) return;
        
        const darkModeBtn = document.getElementById('darkModeToggle');
        const colorblindBtn = document.getElementById('colorblindToggle');
        const languageBtn = document.getElementById('languageToggle');
        
        if (darkModeBtn) darkModeBtn.setAttribute('title', 
            this.currentMode === 'light' ? t.lightMode : t.darkMode);
        if (colorblindBtn) colorblindBtn.setAttribute('title', t.colorblindMode);
        if (languageBtn) languageBtn.setAttribute('title', t.language);
    },
    
    showIndicator(message) {
        const indicator = document.getElementById('modeIndicator');
        if (!indicator) return;
        
        indicator.textContent = message;
        indicator.classList.add('show');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 3000);
    }
};