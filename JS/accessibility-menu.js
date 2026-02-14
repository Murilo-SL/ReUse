/**
 * accessibility-menu.js
 * Sistema completo de acessibilidade visual para daltonismo e necessidades especiais
 * Versão: 3.0.0
 */

class AccessibilityMenu {
    constructor() {
        this.isOpen = false;
        this.currentMode = 'normal';
        this.isInitialized = false;
        this.modes = {
            'normal': {
                name: 'Cores Normais',
                description: 'Cores padrão do sistema',
                filter: 'none',
                icon: 'bi-palette',
                color: '#0066cc'
            },
            'protanopia': {
                name: 'Protanopia',
                description: 'Dificuldade com tons vermelhos',
                filter: 'url(#protanopia-filter)',
                icon: 'bi-eye-slash',
                color: '#cc3333'
            },
            'deuteranopia': {
                name: 'Deuteranopia',
                description: 'Dificuldade com tons verdes',
                filter: 'url(#deuteranopia-filter)',
                icon: 'bi-eye-slash',
                color: '#33cc33'
            },
            'tritanopia': {
                name: 'Tritanopia',
                description: 'Dificuldade com tons azuis',
                filter: 'url(#tritanopia-filter)',
                icon: 'bi-eye-slash',
                color: '#3333cc'
            },
            'achromatopsia': {
                name: 'Acromatopsia',
                description: 'Visão em preto e branco',
                filter: 'grayscale(100%)',
                icon: 'bi-circle-half',
                color: '#666666'
            },
            'high-contrast': {
                name: 'Alto Contraste',
                description: 'Cores com maior contraste',
                filter: 'contrast(200%) brightness(110%)',
                icon: 'bi-circle-fill',
                color: '#000000'
            },
            'inverted': {
                name: 'Invertido',
                description: 'Cores invertidas',
                filter: 'invert(100%) hue-rotate(180deg)',
                icon: 'bi-arrow-left-right',
                color: '#9933cc'
            },
            'sepia': {
                name: 'Modo Sepia',
                description: 'Tons sépia para leitura',
                filter: 'sepia(100%)',
                icon: 'bi-book',
                color: '#704214'
            },
            'night-read': {
                name: 'Leitura Noturna',
                description: 'Cores quentes para leitura',
                filter: 'brightness(90%) hue-rotate(180deg) saturate(80%)',
                icon: 'bi-moon',
                color: '#ff9900'
            }
        };
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            // Verificar se o DOM está pronto
            if (!document.body) {
                console.warn('DOM não está pronto. AccessibilityMenu não será inicializado.');
                return;
            }

            // Criar o menu de acessibilidade
            this.createMenu();
            
            // Configurar o botão do header
            this.setupHeaderButton();
            
            // Adicionar filtros SVG para daltonismo
            this.addSVGFilters();
            
            // Carregar preferência salva
            this.loadSavedPreference();
            
            // Configurar integração com dark mode
            this.setupDarkModeIntegration();
            
            // Configurar teclas de atalho
            this.setupKeyboardShortcuts();
            
            // Verificar preferências do sistema
            this.checkSystemPreferences();
            
            this.isInitialized = true;
            console.log('AccessibilityMenu inicializado com sucesso');
            
        } catch (error) {
            console.error('Erro ao inicializar AccessibilityMenu:', error);
        }
    }

    createMenu() {
        // Criar elemento aside para o menu
        this.menu = document.createElement('aside');
        this.menu.id = 'accessibilityMenu';
        this.menu.className = 'accessibility-menu';
        this.menu.setAttribute('aria-label', 'Menu de Acessibilidade Visual');
        this.menu.setAttribute('role', 'dialog');
        this.menu.setAttribute('aria-modal', 'true');
        this.menu.setAttribute('aria-hidden', 'true');

        // Conteúdo do menu
        this.menu.innerHTML = `
            <div class="accessibility-header">
                <div class="header-content">
                    <i class="bi bi-universal-access"></i>
                    <div class="header-text">
                        <h3 id="accessibilityMenuTitle">Acessibilidade Visual</h3>
                        <p class="header-subtitle">Ajuste as cores para sua necessidade</p>
                    </div>
                </div>
                <button class="close-menu" id="closeAccessibility" aria-label="Fechar menu de acessibilidade">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            
            <div class="accessibility-body">
                <div class="menu-section">
                    <h4 class="section-title">
                        <i class="bi bi-eye"></i>
                        Modos Visuais
                    </h4>
                    <p class="menu-description">
                        Selecione um modo visual para melhorar sua experiência:
                    </p>
                    
                    <div class="accessibility-options" role="radiogroup" aria-labelledby="accessibilityMenuTitle">
                        ${this.generateOptionsHTML()}
                    </div>
                </div>
                
                <div class="menu-section">
                    <h4 class="section-title">
                        <i class="bi bi-sliders"></i>
                        Ajustes Adicionais
                    </h4>
                    
                    <div class="additional-settings">
                        <div class="setting-item">
                            <label class="setting-label">
                                <i class="bi bi-brightness-high"></i>
                                Aumentar Contraste
                            </label>
                            <div class="setting-control">
                                <input type="range" 
                                       id="contrastSlider" 
                                       min="100" 
                                       max="300" 
                                       value="100"
                                       class="contrast-slider">
                                <span class="setting-value" id="contrastValue">100%</span>
                            </div>
                        </div>
                        
                        <div class="setting-item">
                            <label class="setting-label">
                                <i class="bi bi-text-left"></i>
                                Tamanho do Texto
                            </label>
                            <div class="setting-control">
                                <input type="range" 
                                       id="textSizeSlider" 
                                       min="80" 
                                       max="200" 
                                       value="100"
                                       class="text-size-slider">
                                <span class="setting-value" id="textSizeValue">100%</span>
                            </div>
                        </div>
                        
                        <div class="setting-item">
                            <label class="setting-label">
                                <i class="bi bi-fonts"></i>
                                Fonte Legível
                            </label>
                            <div class="setting-control">
                                <button class="toggle-btn" id="toggleReadableFont" aria-pressed="false">
                                    <span class="toggle-state">Desativado</span>
                                    <i class="bi bi-toggle-off"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="accessibility-info">
                    <div class="info-icon">
                        <i class="bi bi-info-circle"></i>
                    </div>
                    <div class="info-content">
                        <h5>Como funciona?</h5>
                        <p>
                            Esses ajustes afetam apenas a exibição de cores e não alteram o conteúdo da página.
                            Sua preferência será lembrada na próxima visita. Recomendamos testar diferentes modos.
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="accessibility-footer">
                <button class="btn-reset" id="resetAccessibility">
                    <i class="bi bi-arrow-clockwise"></i>
                    Redefinir Tudo
                </button>
                <button class="btn-close" id="closeAndSave">
                    <i class="bi bi-check-lg"></i>
                    Aplicar Ajustes
                </button>
            </div>
        `;

        // Adicionar ao body
        document.body.appendChild(this.menu);

        // Adicionar eventos
        this.addEventListeners();
        
        // Adicionar estilo CSS dinâmico
        this.addStyles();
        
        // Inicializar controles deslizantes
        this.initSliders();
    }

    addSVGFilters() {
        // Criar SVG com filtros para daltonismo
        if (!document.body) return;
        
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.style.position = 'absolute';
        svg.style.width = '0';
        svg.style.height = '0';
        svg.style.overflow = 'hidden';
        
        const defs = document.createElementNS(svgNS, "defs");
        
        // Filtro Protanopia
        const protanopia = document.createElementNS(svgNS, "filter");
        protanopia.setAttribute("id", "protanopia-filter");
        protanopia.setAttribute("color-interpolation-filters", "sRGB");
        
        const protanopiaMatrix = document.createElementNS(svgNS, "feColorMatrix");
        protanopiaMatrix.setAttribute("type", "matrix");
        protanopiaMatrix.setAttribute("values", "0.567, 0.433, 0, 0, 0 0.558, 0.442, 0, 0, 0 0, 0.242, 0.758, 0, 0 0, 0, 0, 1, 0");
        protanopia.appendChild(protanopiaMatrix);
        
        // Filtro Deuteranopia
        const deuteranopia = document.createElementNS(svgNS, "filter");
        deuteranopia.setAttribute("id", "deuteranopia-filter");
        deuteranopia.setAttribute("color-interpolation-filters", "sRGB");
        
        const deuteranopiaMatrix = document.createElementNS(svgNS, "feColorMatrix");
        deuteranopiaMatrix.setAttribute("type", "matrix");
        deuteranopiaMatrix.setAttribute("values", "0.625, 0.375, 0, 0, 0 0.7, 0.3, 0, 0, 0 0, 0.3, 0.7, 0, 0 0, 0, 0, 1, 0");
        deuteranopia.appendChild(deuteranopiaMatrix);
        
        // Filtro Tritanopia
        const tritanopia = document.createElementNS(svgNS, "filter");
        tritanopia.setAttribute("id", "tritanopia-filter");
        tritanopia.setAttribute("color-interpolation-filters", "sRGB");
        
        const tritanopiaMatrix = document.createElementNS(svgNS, "feColorMatrix");
        tritanopiaMatrix.setAttribute("type", "matrix");
        tritanopiaMatrix.setAttribute("values", "0.95, 0.05, 0, 0, 0 0, 0.433, 0.567, 0, 0 0, 0.475, 0.525, 0, 0 0, 0, 0, 1, 0");
        tritanopia.appendChild(tritanopiaMatrix);
        
        defs.appendChild(protanopia);
        defs.appendChild(deuteranopia);
        defs.appendChild(tritanopia);
        svg.appendChild(defs);
        
        document.body.appendChild(svg);
    }

    generateOptionsHTML() {
        let html = '';
        for (const [key, mode] of Object.entries(this.modes)) {
            const isActive = key === this.currentMode;
            html += `
                <div class="accessibility-option ${isActive ? 'active' : ''}" 
                     data-mode="${key}"
                     role="radio"
                     tabindex="${isActive ? '0' : '-1'}"
                     aria-checked="${isActive}"
                     aria-label="${mode.name} - ${mode.description}">
                    
                    <div class="option-icon" style="background: ${mode.color}">
                        <i class="bi ${mode.icon}"></i>
                    </div>
                    
                    <div class="option-content">
                        <h4>${mode.name}</h4>
                        <p>${mode.description}</p>
                    </div>
                    
                    <div class="option-check">
                        ${isActive ? 
                            '<i class="bi bi-check-circle-fill"></i>' : 
                            '<i class="bi bi-circle"></i>'
                        }
                    </div>
                    
                    <div class="option-preview" style="background: ${mode.color}"></div>
                </div>
            `;
        }
        return html;
    }

    setupHeaderButton() {
        // Encontrar ou criar o botão no header
        let colorblindBtn = document.getElementById('colorblindBtn');
        
        if (!colorblindBtn) {
            // Criar botão se não existir
            const userActions = document.querySelector('.user-actions');
            if (userActions) {
                colorblindBtn = document.createElement('button');
                colorblindBtn.className = 'action-btn';
                colorblindBtn.id = 'colorblindBtn';
                colorblindBtn.title = 'Acessibilidade Visual';
                colorblindBtn.setAttribute('aria-label', 'Abrir menu de acessibilidade visual');
                colorblindBtn.innerHTML = '<i class="bi bi-universal-access"></i>';
                userActions.insertBefore(colorblindBtn, userActions.firstChild);
            } else {
                console.warn('Elemento .user-actions não encontrado. Botão de acessibilidade não foi criado.');
                return;
            }
        }
        
        // Adicionar evento de clique
        if (colorblindBtn) {
            colorblindBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
            this.colorblindBtn = colorblindBtn;
        }
    }

    addEventListeners() {
        // Fechar menu
        document.getElementById('closeAccessibility').addEventListener('click', () => this.closeMenu());
        
        // Redefinir tudo
        document.getElementById('resetAccessibility').addEventListener('click', () => this.resetAllSettings());
        
        // Aplicar e fechar
        document.getElementById('closeAndSave').addEventListener('click', () => {
            this.saveAllPreferences();
            this.closeMenu();
        });

        // Selecionar opção
        this.menu.querySelectorAll('.accessibility-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = option.dataset.mode;
                this.selectMode(mode);
            });

            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const mode = option.dataset.mode;
                    this.selectMode(mode);
                }
                
                // Navegação com teclado
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateOptions(e.key);
                }
            });
        });

        // Controle de contraste
        const contrastSlider = document.getElementById('contrastSlider');
        if (contrastSlider) {
            contrastSlider.addEventListener('input', (e) => {
                this.adjustContrast(e.target.value);
                document.getElementById('contrastValue').textContent = `${e.target.value}%`;
            });
        }

        // Controle de tamanho do texto
        const textSizeSlider = document.getElementById('textSizeSlider');
        if (textSizeSlider) {
            textSizeSlider.addEventListener('input', (e) => {
                this.adjustTextSize(e.target.value);
                document.getElementById('textSizeValue').textContent = `${e.target.value}%`;
            });
        }

        // Botão de fonte legível
        const toggleFontBtn = document.getElementById('toggleReadableFont');
        if (toggleFontBtn) {
            toggleFontBtn.addEventListener('click', () => this.toggleReadableFont());
        }

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.menu.contains(e.target) && 
                !this.colorblindBtn?.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (this.isOpen && e.key === 'Escape') {
                this.closeMenu();
            }
        });

        // Prevenir scroll quando menu aberto
        this.menu.addEventListener('wheel', (e) => {
            if (!e.currentTarget.contains(e.target)) return;
            e.preventDefault();
        }, { passive: false });
    }

    initSliders() {
        // Carregar valores salvos dos sliders
        const savedContrast = localStorage.getItem('accessibility_contrast') || 100;
        const savedTextSize = localStorage.getItem('accessibility_textSize') || 100;
        
        const contrastSlider = document.getElementById('contrastSlider');
        const textSizeSlider = document.getElementById('textSizeSlider');
        
        if (contrastSlider) {
            contrastSlider.value = savedContrast;
            document.getElementById('contrastValue').textContent = `${savedContrast}%`;
            this.adjustContrast(savedContrast, false);
        }
        
        if (textSizeSlider) {
            textSizeSlider.value = savedTextSize;
            document.getElementById('textSizeValue').textContent = `${savedTextSize}%`;
            this.adjustTextSize(savedTextSize, false);
        }
        
        // Carregar estado da fonte legível
        const savedReadableFont = localStorage.getItem('accessibility_readableFont') === 'true';
        if (savedReadableFont) {
            this.enableReadableFont(false);
        }
    }

    selectMode(mode) {
        // Remover classe ativa anterior
        const previousActive = this.menu.querySelector('.accessibility-option.active');
        if (previousActive) {
            previousActive.classList.remove('active');
            previousActive.setAttribute('aria-checked', 'false');
            previousActive.setAttribute('tabindex', '-1');
            previousActive.querySelector('.option-check').innerHTML = '<i class="bi bi-circle"></i>';
        }

        // Ativar nova opção
        const newActive = this.menu.querySelector(`[data-mode="${mode}"]`);
        newActive.classList.add('active');
        newActive.setAttribute('aria-checked', 'true');
        newActive.setAttribute('tabindex', '0');
        newActive.querySelector('.option-check').innerHTML = '<i class="bi bi-check-circle-fill"></i>';

        // Aplicar filtro
        this.applyFilter(mode);
        this.currentMode = mode;

        // Atualizar ícone do botão no header
        this.updateHeaderButtonIcon();

        // Focar na opção selecionada
        newActive.focus();
        
        // Animar preview
        this.animatePreview(newActive);
        
        // Salvar seleção
        localStorage.setItem('accessibility_mode', mode);
    }

    navigateOptions(direction) {
        const options = Array.from(this.menu.querySelectorAll('.accessibility-option'));
        const currentIndex = options.findIndex(opt => opt.classList.contains('active'));
        let newIndex;
        
        if (direction === 'ArrowDown') {
            newIndex = (currentIndex + 1) % options.length;
        } else if (direction === 'ArrowUp') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }
        
        if (newIndex !== undefined) {
            const mode = options[newIndex].dataset.mode;
            this.selectMode(mode);
        }
    }

    animatePreview(option) {
        const preview = option.querySelector('.option-preview');
        if (preview) {
            preview.classList.add('pulse');
            setTimeout(() => preview.classList.remove('pulse'), 600);
        }
    }

    applyFilter(mode) {
        const styleId = 'accessibility-filter';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }

        const filter = this.modes[mode].filter;
        
        if (mode === 'normal') {
            styleElement.innerHTML = '';
            document.body.classList.remove('accessibility-filter-applied');
        } else {
            styleElement.innerHTML = `
                html {
                    filter: ${filter} !important;
                    -webkit-filter: ${filter} !important;
                }
                
                /* Exceções para elementos que não devem ser filtrados */
                .cliente-inicio img,
                .cliente-inicio video,
                .cliente-inicio canvas,
                .cliente-inicio svg,
                .product-image img,
                .ong-logo img,
                .profile-avatar img,
                .logo-container img {
                    filter: none !important;
                    -webkit-filter: none !important;
                }
                
                /* Ajustes específicos para cada modo */
                ${mode === 'high-contrast' ? `
                    .cliente-inicio {
                        --primary-blue: #0000ff !important;
                        --primary-green: #00ff00 !important;
                        --primary-red: #ff0000 !important;
                        --text-dark: #000000 !important;
                        --text-light: #ffffff !important;
                        --card-bg: #ffffff !important;
                        --card-bg-hover: #f0f0f0 !important;
                    }
                    
                    body.dark-mode .cliente-inicio {
                        --text-dark: #ffffff !important;
                        --text-light: #000000 !important;
                        --card-bg: #000000 !important;
                        --card-bg-hover: #333333 !important;
                    }
                ` : ''}
                
                ${mode === 'night-read' ? `
                    .cliente-inicio {
                        background-color: #1a1a1a !important;
                        color: #f5deb3 !important;
                    }
                    
                    .cliente-inicio .card-bg {
                        background-color: #2a2a2a !important;
                    }
                ` : ''}
            `;
            document.body.classList.add('accessibility-filter-applied');
        }
        
        // Notificar mudança para outros componentes
        this.dispatchAccessibilityChange(mode);
    }

    adjustContrast(value, save = true) {
        const styleId = 'accessibility-contrast';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        if (parseInt(value) === 100) {
            styleElement.innerHTML = '';
        } else {
            styleElement.innerHTML = `
                .cliente-inicio {
                    filter: contrast(${value}%) !important;
                    -webkit-filter: contrast(${value}%) !important;
                }
                
                .cliente-inicio img,
                .cliente-inicio video,
                .cliente-inicio canvas,
                .cliente-inicio svg {
                    filter: contrast(100%) !important;
                    -webkit-filter: contrast(100%) !important;
                }
            `;
        }
        
        if (save) {
            localStorage.setItem('accessibility_contrast', value);
        }
    }

    adjustTextSize(value, save = true) {
        const styleId = 'accessibility-text-size';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        const percentage = parseInt(value) / 100;
        
        styleElement.innerHTML = `
            .cliente-inicio {
                font-size: calc(16px * ${percentage}) !important;
            }
            
            .cliente-inicio h1 {
                font-size: calc(2.5rem * ${percentage}) !important;
            }
            
            .cliente-inicio h2 {
                font-size: calc(2rem * ${percentage}) !important;
            }
            
            .cliente-inicio h3 {
                font-size: calc(1.5rem * ${percentage}) !important;
            }
            
            .cliente-inicio .btn,
            .cliente-inicio .action-btn {
                font-size: calc(0.9rem * ${percentage}) !important;
                padding: calc(0.875rem * ${percentage}) calc(1rem * ${percentage}) !important;
            }
            
            /* Ajustar ícones proporcionalmente */
            .cliente-inicio i {
                font-size: calc(1em * ${percentage}) !important;
            }
        `;
        
        if (save) {
            localStorage.setItem('accessibility_textSize', value);
        }
    }

    toggleReadableFont() {
        const toggleBtn = document.getElementById('toggleReadableFont');
        const isEnabled = toggleBtn.getAttribute('aria-pressed') === 'true';
        
        if (isEnabled) {
            this.disableReadableFont();
        } else {
            this.enableReadableFont();
        }
    }

    enableReadableFont(save = true) {
        const styleId = 'accessibility-readable-font';
        let styleElement = document.getElementById(styleId);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        styleElement.innerHTML = `
            .cliente-inicio {
                font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif !important;
                letter-spacing: 0.5px !important;
                line-height: 1.8 !important;
            }
            
            .cliente-inicio h1,
            .cliente-inicio h2,
            .cliente-inicio h3,
            .cliente-inicio h4,
            .cliente-inicio h5,
            .cliente-inicio h6 {
                font-weight: 600 !important;
                letter-spacing: 0.3px !important;
            }
            
            .cliente-inicio p {
                line-height: 1.8 !important;
            }
        `;
        
        const toggleBtn = document.getElementById('toggleReadableFont');
        toggleBtn.setAttribute('aria-pressed', 'true');
        toggleBtn.innerHTML = '<span class="toggle-state">Ativado</span><i class="bi bi-toggle-on"></i>';
        
        if (save) {
            localStorage.setItem('accessibility_readableFont', 'true');
        }
    }

    disableReadableFont() {
        const styleElement = document.getElementById('accessibility-readable-font');
        if (styleElement) {
            styleElement.innerHTML = '';
        }
        
        const toggleBtn = document.getElementById('toggleReadableFont');
        toggleBtn.setAttribute('aria-pressed', 'false');
        toggleBtn.innerHTML = '<span class="toggle-state">Desativado</span><i class="bi bi-toggle-off"></i>';
        
        localStorage.setItem('accessibility_readableFont', 'false');
    }

    updateHeaderButtonIcon() {
        if (!this.colorblindBtn) return;
        
        const icon = this.colorblindBtn.querySelector('i');
        if (!icon) return;
        
        if (this.currentMode === 'normal') {
            // Modo normal: ícone padrão
            icon.className = 'bi bi-universal-access';
            this.colorblindBtn.title = 'Acessibilidade Visual';
            this.colorblindBtn.classList.remove('active-accessibility');
            this.colorblindBtn.removeAttribute('aria-pressed');
        } else {
            // Modo ativo: ícone personalizado
            const mode = this.modes[this.currentMode];
            icon.className = `bi ${mode.icon}`;
            icon.style.color = mode.color;
            this.colorblindBtn.title = `Modo ativo: ${mode.name}`;
            this.colorblindBtn.classList.add('active-accessibility');
            this.colorblindBtn.setAttribute('aria-pressed', 'true');
            
            // Adicionar indicador visual
            if (!this.colorblindBtn.querySelector('.accessibility-indicator')) {
                const indicator = document.createElement('span');
                indicator.className = 'accessibility-indicator';
                indicator.innerHTML = `<i class="bi bi-circle-fill" style="color: ${mode.color}"></i>`;
                this.colorblindBtn.appendChild(indicator);
            }
        }
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        if (!this.menu) return;
        
        this.menu.setAttribute('aria-hidden', 'false');
        this.menu.classList.add('open');
        this.isOpen = true;
        
        // Desativar scroll da página
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
        
        // Focar no menu
        setTimeout(() => {
            this.menu.focus();
            
            // Se houver opção ativa, focar nela
            const activeOption = this.menu.querySelector('.accessibility-option.active');
            if (activeOption) {
                activeOption.focus();
            }
        }, 100);
        
        // Notificar abertura
        this.dispatchMenuStateChange(true);
    }

    closeMenu() {
        if (!this.menu) return;
        
        this.menu.classList.remove('open');
        
        setTimeout(() => {
            this.menu.setAttribute('aria-hidden', 'true');
            this.isOpen = false;
            
            // Reativar scroll da página
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Focar no botão que abriu o menu
            if (this.colorblindBtn) {
                this.colorblindBtn.focus();
            }
        }, 300);
        
        // Notificar fechamento
        this.dispatchMenuStateChange(false);
    }

    getScrollbarWidth() {
        // Calcular largura da scrollbar
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        outer.appendChild(inner);
        
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        
        return scrollbarWidth;
    }

    resetAllSettings() {
        // Resetar modo
        this.selectMode('normal');
        
        // Resetar sliders
        const contrastSlider = document.getElementById('contrastSlider');
        const textSizeSlider = document.getElementById('textSizeSlider');
        
        if (contrastSlider) {
            contrastSlider.value = 100;
            this.adjustContrast(100);
            document.getElementById('contrastValue').textContent = '100%';
        }
        
        if (textSizeSlider) {
            textSizeSlider.value = 100;
            this.adjustTextSize(100);
            document.getElementById('textSizeValue').textContent = '100%';
        }
        
        // Resetar fonte legível
        this.disableReadableFont();
        
        // Limpar localStorage
        localStorage.removeItem('accessibility_mode');
        localStorage.removeItem('accessibility_contrast');
        localStorage.removeItem('accessibility_textSize');
        localStorage.removeItem('accessibility_readableFont');
        
        // Mostrar notificação
        this.showNotification('Todas as configurações de acessibilidade foram redefinidas', 'success');
    }

    saveAllPreferences() {
        // Já estamos salvando individualmente, apenas confirma
        this.showNotification('Preferências de acessibilidade salvas', 'success');
    }

    loadSavedPreference() {
        const savedMode = localStorage.getItem('accessibility_mode');
        if (savedMode && this.modes[savedMode]) {
            this.selectMode(savedMode);
        }
    }

    setupDarkModeIntegration() {
        // Observar mudanças no dark mode
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    // Reaplicar filtro quando dark mode mudar
                    if (this.currentMode !== 'normal') {
                        setTimeout(() => {
                            this.applyFilter(this.currentMode);
                        }, 100);
                    }
                }
            });
        });
        
        if (document.body) {
            observer.observe(document.body, { attributes: true });
        }
        
        // Integração com botão de dark mode
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                // Pequeno delay para garantir que o dark mode foi aplicado
                setTimeout(() => {
                    if (this.currentMode !== 'normal') {
                        this.applyFilter(this.currentMode);
                    }
                }, 150);
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Alt + A para abrir/fechar menu
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleMenu();
            }
            
            // Ctrl + Alt + R para resetar
            if (e.ctrlKey && e.altKey && e.key === 'r') {
                e.preventDefault();
                this.resetAllSettings();
            }
            
            // Ctrl + Alt + 1-9 para selecionar modos rapidamente
            if (e.ctrlKey && e.altKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                const modes = Object.keys(this.modes);
                if (modes[index]) {
                    this.selectMode(modes[index]);
                }
            }
        });
    }

    checkSystemPreferences() {
        // Verificar preferências do sistema operacional
        if (window.matchMedia) {
            // Preferência de alto contraste do sistema
            const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
            if (highContrastQuery.matches && !localStorage.getItem('accessibility_mode')) {
                this.selectMode('high-contrast');
            }
            
            // Preferência de cores reduzidas
            const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (reducedMotionQuery.matches) {
                this.reduceAnimations();
            }
            
            // Escutar mudanças
            highContrastQuery.addEventListener('change', (e) => {
                if (e.matches && !localStorage.getItem('accessibility_mode')) {
                    this.selectMode('high-contrast');
                }
            });
            
            reducedMotionQuery.addEventListener('change', (e) => {
                if (e.matches) {
                    this.reduceAnimations();
                } else {
                    this.restoreAnimations();
                }
            });
        }
    }

    reduceAnimations() {
        document.body.classList.add('reduced-motion');
    }

    restoreAnimations() {
        document.body.classList.remove('reduced-motion');
    }

    showNotification(message, type = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.accessibility-notification').forEach(n => n.remove());
        
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `accessibility-notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        const icons = {
            'success': 'bi-check-circle-fill',
            'error': 'bi-exclamation-circle-fill',
            'warning': 'bi-exclamation-triangle-fill',
            'info': 'bi-info-circle-fill'
        };
        
        notification.innerHTML = `
            <i class="bi ${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Fechar notificação">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Estilos dinâmicos
        const colors = {
            'success': '#00cc99',
            'error': '#ff4757',
            'warning': '#ffa502',
            'info': '#0066cc'
        };
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            max-width: 400px;
            animation: slideInUp 0.3s ease forwards;
        `;
        
        // Fechar botão
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    dispatchAccessibilityChange(mode) {
        const event = new CustomEvent('accessibilityChange', {
            detail: {
                mode: mode,
                modeName: this.modes[mode]?.name,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }

    dispatchMenuStateChange(isOpen) {
        const event = new CustomEvent('accessibilityMenuStateChange', {
            detail: { isOpen }
        });
        document.dispatchEvent(event);
    }

    addStyles() {
        const styleId = 'accessibility-menu-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            /* Menu de Acessibilidade */
            .accessibility-menu {
                position: fixed;
                top: 0;
                right: -420px;
                width: 400px;
                height: 100vh;
                background: var(--card-bg);
                box-shadow: var(--shadow-xl);
                z-index: 2001;
                transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                flex-direction: column;
                border-left: 4px solid var(--primary-blue);
                overflow: hidden;
            }

            .accessibility-menu.open {
                right: 0;
            }

            /* Header */
            .accessibility-header {
                padding: 1.5rem;
                background: linear-gradient(135deg, var(--primary-blue), var(--primary-purple));
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-shrink: 0;
            }

            .header-content {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                flex: 1;
            }

            .header-content i {
                font-size: 2rem;
                margin-top: 0.25rem;
            }

            .header-text h3 {
                margin: 0 0 0.25rem;
                font-size: 1.3rem;
                font-weight: 700;
            }

            .header-subtitle {
                margin: 0;
                font-size: 0.9rem;
                opacity: 0.9;
            }

            .close-menu {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: var(--border-radius-round);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-fast);
                font-size: 1.2rem;
                flex-shrink: 0;
                margin-left: 1rem;
            }

            .close-menu:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            /* Body */
            .accessibility-body {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem;
            }

            .menu-section {
                margin-bottom: 2rem;
            }

            .section-title {
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-dark);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .menu-description {
                color: var(--text-light);
                margin-bottom: 1.5rem;
                font-size: 0.95rem;
                line-height: 1.5;
            }

            /* Options */
            .accessibility-options {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 2rem;
            }

            .accessibility-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--light-gray-2);
                border: 2px solid transparent;
                border-radius: var(--border-radius-md);
                cursor: pointer;
                transition: all var(--transition-fast);
                position: relative;
                overflow: hidden;
            }

            .accessibility-option:hover {
                background: var(--light-gray-3);
                transform: translateX(4px);
                border-color: var(--primary-blue-light);
            }

            .accessibility-option.active {
                background: rgba(0, 102, 204, 0.1);
                border-color: var(--primary-blue);
                box-shadow: 0 4px 12px rgba(0, 102, 204, 0.15);
            }

            .accessibility-option:focus {
                outline: 2px solid var(--primary-blue);
                outline-offset: 2px;
            }

            .option-icon {
                width: 48px;
                height: 48px;
                background: var(--primary-blue);
                border-radius: var(--border-radius-round);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;
                color: white;
                flex-shrink: 0;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .accessibility-option.active .option-icon {
                transform: scale(1.1);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            }

            .option-content {
                flex: 1;
                min-width: 0;
            }

            .option-content h4 {
                margin: 0 0 0.25rem;
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-dark);
            }

            .option-content p {
                margin: 0;
                font-size: 0.85rem;
                color: var(--text-light);
                line-height: 1.4;
            }

            .option-check {
                font-size: 1.2rem;
                color: var(--text-lighter);
                flex-shrink: 0;
                transition: color 0.3s ease;
            }

            .accessibility-option.active .option-check {
                color: var(--primary-green);
                animation: checkIn 0.3s ease;
            }

            .option-preview {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .accessibility-option.active .option-preview {
                opacity: 1;
            }

            .option-preview.pulse {
                animation: previewPulse 0.6s ease;
            }

            /* Additional Settings */
            .additional-settings {
                background: var(--light-gray-2);
                border-radius: var(--border-radius-md);
                padding: 1.5rem;
            }

            .setting-item {
                margin-bottom: 1.5rem;
            }

            .setting-item:last-child {
                margin-bottom: 0;
            }

            .setting-label {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 600;
                color: var(--text-dark);
                margin-bottom: 0.75rem;
                font-size: 0.95rem;
            }

            .setting-label i {
                font-size: 1.2rem;
                color: var(--primary-blue);
            }

            .setting-control {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .contrast-slider,
            .text-size-slider {
                flex: 1;
                -webkit-appearance: none;
                height: 6px;
                background: linear-gradient(to right, var(--primary-blue), var(--primary-green));
                border-radius: 3px;
                outline: none;
            }

            .contrast-slider::-webkit-slider-thumb,
            .text-size-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 20px;
                height: 20px;
                background: var(--primary-blue);
                border-radius: 50%;
                cursor: pointer;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }

            .contrast-slider::-webkit-slider-thumb:hover,
            .text-size-slider::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                background: var(--primary-blue-light);
            }

            .setting-value {
                min-width: 50px;
                text-align: right;
                font-weight: 700;
                color: var(--primary-blue);
                font-size: 0.9rem;
            }

            .toggle-btn {
                background: var(--light-gray-3);
                border: 2px solid var(--medium-gray);
                color: var(--text-dark);
                padding: 0.5rem 1rem;
                border-radius: var(--border-radius-md);
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s ease;
                font-size: 0.9rem;
            }

            .toggle-btn:hover {
                background: var(--medium-gray);
                border-color: var(--primary-green);
            }

            .toggle-btn[aria-pressed="true"] {
                background: var(--primary-green);
                border-color: var(--primary-green);
                color: white;
            }

            .toggle-btn i {
                font-size: 1.2rem;
            }

            /* Info Section */
            .accessibility-info {
                display: flex;
                gap: 1rem;
                padding: 1.25rem;
                background: rgba(0, 204, 153, 0.05);
                border-radius: var(--border-radius-md);
                border-left: 4px solid var(--primary-green);
                margin-top: 2rem;
            }

            .info-icon {
                color: var(--primary-green);
                font-size: 1.5rem;
                flex-shrink: 0;
                margin-top: 0.25rem;
            }

            .info-content h5 {
                margin: 0 0 0.5rem;
                font-size: 1rem;
                color: var(--text-dark);
                font-weight: 600;
            }

            .info-content p {
                margin: 0;
                font-size: 0.85rem;
                color: var(--text-light);
                line-height: 1.5;
            }

            /* Footer */
            .accessibility-footer {
                padding: 1.5rem;
                background: var(--light-gray-2);
                border-top: 1px solid var(--light-gray-3);
                display: flex;
                gap: 1rem;
                flex-shrink: 0;
            }

            .btn-reset, .btn-close {
                flex: 1;
                padding: 0.875rem 1rem;
                border: none;
                border-radius: var(--border-radius-md);
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-normal);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }

            .btn-reset {
                background: var(--light-gray-3);
                color: var(--text-dark);
            }

            .btn-reset:hover {
                background: var(--medium-gray);
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }

            .btn-close {
                background: var(--primary-green);
                color: white;
                box-shadow: 0 4px 12px rgba(0, 204, 153, 0.2);
            }

            .btn-close:hover {
                background: var(--primary-green-light);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 204, 153, 0.3);
            }

            /* Botão ativo no header */
            .action-btn.active-accessibility {
                background: var(--card-bg-hover);
                border-color: var(--primary-green);
                color: var(--primary-green);
                position: relative;
                animation: buttonPulse 2s infinite;
            }

            .action-btn.active-accessibility:hover {
                background: var(--card-bg-hover);
                border-color: var(--primary-green-light);
                color: var(--primary-green-light);
            }

            .accessibility-indicator {
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 0.7rem;
                animation: indicatorPulse 2s infinite;
                filter: drop-shadow(0 0 2px currentColor);
            }

            /* Notificações */
            .accessibility-notification {
                animation: slideInUp 0.3s ease forwards;
            }

            /* Animações */
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes checkIn {
                0% {
                    transform: scale(0.5);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes previewPulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
            }

            @keyframes buttonPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(0, 204, 153, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(0, 204, 153, 0); }
            }

            @keyframes indicatorPulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
            }

            /* Dark mode support */
            body.dark-mode .accessibility-menu {
                background: var(--card-bg);
                border-left-color: var(--primary-blue-light);
            }

            body.dark-mode .accessibility-header {
                background: linear-gradient(135deg, var(--primary-blue-dark), var(--primary-purple-dark));
            }

            body.dark-mode .accessibility-option {
                background: var(--light-gray-2);
            }

            body.dark-mode .accessibility-option:hover {
                background: var(--light-gray-3);
            }

            body.dark-mode .accessibility-option.active {
                background: rgba(0, 102, 204, 0.2);
                border-color: var(--primary-blue-light);
            }

            body.dark-mode .additional-settings {
                background: var(--light-gray-3);
            }

            body.dark-mode .setting-label {
                color: var(--text-light);
            }

            body.dark-mode .toggle-btn {
                background: var(--medium-gray);
                border-color: var(--light-gray-3);
                color: var(--text-light);
            }

            body.dark-mode .toggle-btn[aria-pressed="true"] {
                background: var(--primary-green);
                color: var(--dark-gray-3);
            }

            body.dark-mode .accessibility-info {
                background: rgba(0, 204, 153, 0.1);
            }

            body.dark-mode .accessibility-footer {
                background: var(--light-gray-3);
                border-color: var(--medium-gray);
            }

            body.dark-mode .btn-reset {
                background: var(--medium-gray);
                color: var(--text-light);
            }

            body.dark-mode .btn-reset:hover {
                background: var(--light-gray-3);
            }

            body.dark-mode .action-btn.active-accessibility {
                background: var(--light-gray-3);
                border-color: var(--primary-green);
                color: var(--primary-green);
            }

            /* Reduced motion */
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            /* Responsividade */
            @media (max-width: 768px) {
                .accessibility-menu {
                    width: 100%;
                    right: -100%;
                    border-left-width: 3px;
                }
                
                .accessibility-header {
                    padding: 1.25rem;
                }
                
                .accessibility-body {
                    padding: 1.25rem;
                }
                
                .accessibility-footer {
                    padding: 1.25rem;
                }
                
                .accessibility-option {
                    padding: 0.875rem;
                }
                
                .option-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 1.2rem;
                }
            }

            @media (max-width: 480px) {
                .accessibility-header {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .header-content {
                    width: 100%;
                }
                
                .close-menu {
                    align-self: flex-end;
                }
                
                .accessibility-footer {
                    flex-direction: column;
                }
                
                .setting-control {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 0.5rem;
                }
                
                .setting-value {
                    text-align: left;
                }
            }

            /* Scrollbar personalizada */
            .accessibility-body::-webkit-scrollbar {
                width: 8px;
            }

            .accessibility-body::-webkit-scrollbar-track {
                background: var(--light-gray-2);
                border-radius: 4px;
            }

            .accessibility-body::-webkit-scrollbar-thumb {
                background: var(--primary-blue);
                border-radius: 4px;
                border: 2px solid var(--light-gray-2);
            }

            .accessibility-body::-webkit-scrollbar-thumb:hover {
                background: var(--primary-blue-light);
            }

            body.dark-mode .accessibility-body::-webkit-scrollbar-track {
                background: var(--light-gray-3);
            }

            body.dark-mode .accessibility-body::-webkit-scrollbar-thumb {
                border-color: var(--light-gray-3);
            }
        `;

        document.head.appendChild(style);
    }

    // Métodos públicos para API
    getCurrentMode() {
        return {
            mode: this.currentMode,
            name: this.modes[this.currentMode]?.name,
            config: this.modes[this.currentMode]
        };
    }

    setMode(mode) {
        if (this.modes[mode]) {
            this.selectMode(mode);
            return true;
        }
        return false;
    }

    isActive() {
        return this.currentMode !== 'normal';
    }

    getSettings() {
        return {
            mode: this.currentMode,
            contrast: localStorage.getItem('accessibility_contrast') || 100,
            textSize: localStorage.getItem('accessibility_textSize') || 100,
            readableFont: localStorage.getItem('accessibility_readableFont') === 'true'
        };
    }

    destroy() {
        // Limpar todos os estilos
        ['accessibility-filter', 'accessibility-contrast', 'accessibility-text-size', 'accessibility-readable-font']
            .forEach(id => {
                const element = document.getElementById(id);
                if (element) element.remove();
            });
        
        // Remover menu
        if (this.menu) {
            this.menu.remove();
        }
        
        // Remover botão do header
        if (this.colorblindBtn && this.colorblindBtn.parentNode) {
            this.colorblindBtn.remove();
        }
        
        // Remover estilos
        const styles = document.getElementById('accessibility-menu-styles');
        if (styles) styles.remove();
        
        // Resetar variáveis
        this.isInitialized = false;
        this.isOpen = false;
        this.currentMode = 'normal';
        
        console.log('AccessibilityMenu destruído');
    }
}

// Inicializar quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccessibilityMenu);
} else {
    initializeAccessibilityMenu();
}

function initializeAccessibilityMenu() {
    try {
        const accessibilityMenu = new AccessibilityMenu();
        
        // Adicionar ao escopo global
        window.AccessibilityMenu = accessibilityMenu;
        
        // Exportar para módulos
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = accessibilityMenu;
        }
        
        console.log('AccessibilityMenu carregado com sucesso');
        
    } catch (error) {
        console.error('Falha ao inicializar AccessibilityMenu:', error);
        
        // Fallback básico
        const fallbackBtn = document.getElementById('colorblindBtn');
        if (fallbackBtn) {
            fallbackBtn.addEventListener('click', () => {
                alert('O menu de acessibilidade não está disponível no momento. Por favor, tente recarregar a página.');
            });
        }
    }
}

// Suporte para recarregamento dinâmico
if (typeof module !== 'undefined' && module.hot) {
    module.hot.accept();
}