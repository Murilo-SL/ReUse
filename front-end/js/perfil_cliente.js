// perfil-cliente.js - Gerenciamento completo e otimizado da página de perfil

class PerfilCliente {
    constructor() {
        this.currentSection = null;
        this.notificationDuration = 4000;
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        this.isTouch = 'ontouchstart' in window;
        this.userData = null;
        this.modalQueue = [];
        this.isSubmitting = false;
        this.elements = {};
        this.init();
    }

    async init() {
        try {
            await this.cacheElements();
            this.setupObservers();
            this.bindEvents();
            await this.loadUserData();
            this.setupSectionNavigation();
            this.setupFormHandlers();
            this.setupModalSystem();
            this.setupImageHandling();
            this.setupPerformanceOptimizations();
            this.setupAccessibility();
            this.showWelcomeMessage();
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.showNotification('Erro ao carregar perfil', 'error');
        }
    }

    async cacheElements() {
        // Cache principal de elementos
        this.elements = {
            // Header
            profileHeader: document.querySelector('.profile-header-section'),
            profileCover: document.querySelector('.profile-cover'),
            profileAvatar: document.querySelector('.profile-avatar-large'),
            avatarEditBtn: document.getElementById('editAvatarBtn'),
            profileName: document.querySelector('.profile-name'),
            profileEmail: document.querySelector('.profile-email'),
            
            // Navegação
            navItems: document.querySelectorAll('.nav-item'),
            profileSections: document.querySelectorAll('.profile-section'),
            
            // Formulários
            personalDataForm: document.getElementById('personalDataForm'),
            passwordForm: document.getElementById('passwordForm'),
            newCardForm: document.getElementById('newCardForm'),
            addressForm: document.getElementById('addressForm'),
            
            // Botões
            addCardBtn: document.getElementById('addCardBtn'),
            addAddressBtn: document.getElementById('addAddressBtn'),
            helpBtn: document.getElementById('helpBtn'),
            cancelPersonalBtn: document.getElementById('cancelPersonalBtn'),
            
            // Modais
            confirmationModal: document.getElementById('confirmationModal'),
            confirmationTitle: document.getElementById('confirmationTitle'),
            confirmationMessage: document.getElementById('confirmationMessage'),
            closeConfirmationModal: document.getElementById('closeConfirmationModal'),
            cancelAction: document.getElementById('cancelAction'),
            confirmAction: document.getElementById('confirmAction'),
            
            // Seções específicas
            changePasswordForm: document.getElementById('changePasswordForm'),
            addCardForm: document.getElementById('addCardForm'),
            addressFormContainer: document.getElementById('addressFormContainer'),
            
            // Preferências
            themeOptions: document.querySelectorAll('.theme-option'),
            configureColorblindBtn: document.getElementById('configureColorblind'),
            exportDataBtn: document.getElementById('exportDataBtn'),
            deleteAccountBtn: document.getElementById('deleteAccountBtn'),
            
            // Estatísticas
            statsCards: document.querySelectorAll('.stat-card')
        };

        // Garantir que elementos críticos existam
        this.ensureCriticalElements();
    }

    ensureCriticalElements() {
        // Garantir que a imagem do perfil sempre exista e seja visível
        if (!this.elements.profileAvatar) {
            const avatarHtml = `
                <div class="profile-avatar-large" style="display: flex !important; visibility: visible !important; opacity: 1 !important;">
                    <span>${this.getInitials()}</span>
                    <button class="avatar-edit-btn" id="editAvatarBtn" title="Alterar foto">
                        <i class="bi bi-camera"></i>
                    </button>
                </div>
            `;
            
            const overlay = document.querySelector('.profile-info-overlay');
            if (overlay) {
                overlay.insertAdjacentHTML('afterbegin', avatarHtml);
                this.elements.profileAvatar = overlay.querySelector('.profile-avatar-large');
                this.elements.avatarEditBtn = overlay.querySelector('#editAvatarBtn');
            }
        }

        // Forçar visibilidade do avatar
        if (this.elements.profileAvatar) {
            this.elements.profileAvatar.style.display = 'flex';
            this.elements.profileAvatar.style.visibility = 'visible';
            this.elements.profileAvatar.style.opacity = '1';
            this.elements.profileAvatar.style.position = 'relative';
            this.elements.profileAvatar.style.zIndex = '1000';
        }
    }

    setupObservers() {
        // Observer para mudanças no DOM
        this.domObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Verificar se o avatar foi removido
                    if (mutation.removedNodes.length > 0) {
                        mutation.removedNodes.forEach(node => {
                            if (node.classList && node.classList.contains('profile-avatar-large')) {
                                this.ensureCriticalElements();
                            }
                        });
                    }
                }
            });
        });

        // Observar o container do avatar
        const avatarContainer = this.elements.profileAvatar?.parentElement;
        if (avatarContainer) {
            this.domObserver.observe(avatarContainer, { childList: true, subtree: true });
        }

        // Intersection Observer para lazy loading
        if ('IntersectionObserver' in window) {
            this.lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        this.lazyObserver.unobserve(img);
                    }
                });
            }, { threshold: 0.1, rootMargin: '100px' });

            // Observar todas as imagens
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.lazyObserver.observe(img);
            });
        }

        // Observer para mudanças de preferências do sistema
        if (window.matchMedia) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeMediaQuery.addEventListener('change', (e) => {
                const theme = document.querySelector('.theme-option.active')?.dataset.theme;
                if (theme === 'auto') {
                    this.applyTheme('auto');
                }
            });
        }
    }

    bindEvents() {
        // Event delegation para melhor performance
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('submit', this.handleGlobalSubmit.bind(this));
        document.addEventListener('input', this.handleGlobalInput.bind(this));
        document.addEventListener('change', this.handleGlobalChange.bind(this));
        
        // Eventos específicos
        if (this.elements.avatarEditBtn) {
            this.elements.avatarEditBtn.addEventListener('click', this.handleAvatarEdit.bind(this));
        }

        if (this.elements.cancelPersonalBtn) {
            this.elements.cancelPersonalBtn.addEventListener('click', this.resetPersonalDataForm.bind(this));
        }

        if (this.elements.helpBtn) {
            this.elements.helpBtn.addEventListener('click', this.handleHelpClick.bind(this));
        }

        if (this.elements.exportDataBtn) {
            this.elements.exportDataBtn.addEventListener('click', this.exportUserData.bind(this));
        }

        if (this.elements.deleteAccountBtn) {
            this.elements.deleteAccountBtn.addEventListener('click', this.handleDeleteAccount.bind(this));
        }

        if (this.elements.configureColorblindBtn) {
            this.elements.configureColorblindBtn.addEventListener('click', this.configureColorblind.bind(this));
        }

        // Eventos de teclado
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Eventos de resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Eventos de touch
        if (this.isTouch) {
            this.setupTouchEvents();
        }

        // Eventos de foco para acessibilidade
        this.setupFocusEvents();
    }

    handleGlobalClick(e) {
        const target = e.target;
        
        // Navegação
        if (target.closest('.nav-item')) {
            e.preventDefault();
            const item = target.closest('.nav-item');
            this.switchSection(item.dataset.section);
            return;
        }

        // Botões de ação
        if (target.closest('.security-action')) {
            const action = target.closest('.security-action');
            this.handleSecurityAction(action.dataset.action);
            return;
        }

        if (target.closest('.address-action')) {
            const action = target.closest('.address-action');
            this.handleAddressAction(action);
            return;
        }

        if (target.closest('.card-action')) {
            const action = target.closest('.card-action');
            this.handleCardAction(action);
            return;
        }

        // Botões de formulário
        if (target.closest('.add-card-btn')) {
            e.preventDefault();
            this.toggleForm('addCardForm');
            return;
        }

        if (target.closest('.add-address-btn')) {
            e.preventDefault();
            this.toggleForm('addressFormContainer');
            return;
        }

        // Botões de cancelar
        if (target.closest('.cancel-password')) {
            e.preventDefault();
            this.toggleForm('changePasswordForm', false);
            return;
        }

        if (target.closest('.cancel-add-card')) {
            e.preventDefault();
            this.toggleForm('addCardForm', false);
            return;
        }

        if (target.closest('.cancel-address')) {
            e.preventDefault();
            this.toggleForm('addressFormContainer', false);
            return;
        }

        // Tema
        if (target.closest('.theme-option')) {
            const option = target.closest('.theme-option');
            this.selectTheme(option.dataset.theme);
            return;
        }

        // Switch toggles
        if (target.closest('.switch input[type="checkbox"]')) {
            const checkbox = target.closest('.switch input[type="checkbox"]');
            this.handleToggleChange(checkbox);
            return;
        }
    }

    handleGlobalSubmit(e) {
        e.preventDefault();
        const form = e.target;
        
        if (this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;

        try {
            switch (form.id) {
                case 'personalDataForm':
                    this.handlePersonalDataSubmit(form);
                    break;
                case 'passwordForm':
                    this.handlePasswordChange(form);
                    break;
                case 'newCardForm':
                    this.handleNewCardSubmit(form);
                    break;
                case 'addressForm':
                    this.handleAddressSubmit(form);
                    break;
                default:
                    console.warn('Formulário não reconhecido:', form.id);
            }
        } catch (error) {
            console.error('Erro ao processar formulário:', error);
            this.showNotification('Erro ao processar formulário', 'error');
        } finally {
            setTimeout(() => {
                this.isSubmitting = false;
            }, 1000);
        }
    }

    handleGlobalInput(e) {
        const target = e.target;
        
        // Validação em tempo real
        if (target.matches('#newPassword, #confirmPassword')) {
            this.updatePasswordStrength();
        }

        if (target.matches('#cardNumber')) {
            this.formatCardNumber(target);
        }

        if (target.matches('#expiryDate')) {
            this.formatExpiryDate(target);
        }

        if (target.matches('#zipCode')) {
            this.formatZipCode(target);
        }

        if (target.matches('#telefone, #addressPhone')) {
            this.formatPhoneNumber(target);
        }
    }

    handleGlobalChange(e) {
        const target = e.target;
        
        // Atualizar preferências
        if (target.matches('#language, #currency, #timezone, #itemsPerPage, #sortPreference')) {
            this.updatePreference(target.id, target.value);
        }
    }

    async loadUserData() {
        try {
            // Tentar carregar do localStorage
            const storedData = localStorage.getItem('reuse_user_data');
            
            if (storedData) {
                this.userData = JSON.parse(storedData);
            } else {
                // Carregar dados padrão
                this.userData = await this.fetchDefaultUserData();
                localStorage.setItem('reuse_user_data', JSON.stringify(this.userData));
            }

            // Atualizar interface
            this.updateProfileDisplay();
            this.populateForms();
            this.loadPreferences();
            
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            this.userData = this.getDefaultUserData();
            this.updateProfileDisplay();
        }
    }

    async fetchDefaultUserData() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    nome: 'João Silva',
                    email: 'joao.silva@email.com',
                    telefone: '(11) 99999-8888',
                    dataNascimento: '1990-05-15',
                    genero: 'masculino',
                    cpf: '123.456.789-00',
                    enderecos: [
                        {
                            id: 1,
                            addressName: 'Casa',
                            street: 'Rua das Flores',
                            number: '123',
                            complement: 'Apto 45',
                            neighborhood: 'Centro',
                            city: 'São Paulo',
                            state: 'SP',
                            zipCode: '01234-567',
                            addressPhone: '(11) 99999-8888',
                            principal: true
                        },
                        {
                            id: 2,
                            addressName: 'Trabalho',
                            street: 'Av. Paulista',
                            number: '1000',
                            complement: '10º andar',
                            neighborhood: 'Bela Vista',
                            city: 'São Paulo',
                            state: 'SP',
                            zipCode: '01310-100',
                            addressPhone: '(11) 3333-4444',
                            principal: false
                        }
                    ],
                    cartoes: [
                        {
                            id: 1,
                            cardNumber: '4321',
                            cardHolder: 'JOÃO SILVA',
                            expiryDate: '12/25',
                            cvv: '123',
                            cardType: 'visa',
                            principal: true
                        },
                        {
                            id: 2,
                            cardNumber: '8765',
                            cardHolder: 'JOÃO SILVA',
                            expiryDate: '08/24',
                            cvv: '456',
                            cardType: 'mastercard',
                            principal: false
                        }
                    ],
                    compras: 15,
                    favoritos: 8,
                    doacoes: 42,
                    preferencias: {
                        tema: 'auto',
                        language: 'pt-br',
                        currency: 'BRL',
                        timezone: 'America/Sao_Paulo',
                        itemsPerPage: '24',
                        sortPreference: 'price_desc'
                    },
                    configuracoes: {
                        perfilPublico: true,
                        mostrarCompras: false,
                        mostrarDoacoes: true,
                        permitirMensagens: false,
                        mostrarLocalizacao: false,
                        recomendacoes: true,
                        autenticacao2Fatores: true,
                        leitorTela: true,
                        reduzirAnimações: false
                    }
                });
            }, 100);
        });
    }

    getDefaultUserData() {
        return {
            nome: 'Usuário',
            email: 'usuario@email.com',
            telefone: '',
            dataNascimento: '',
            genero: '',
            cpf: '',
            enderecos: [],
            cartoes: [],
            compras: 0,
            favoritos: 0,
            doacoes: 0,
            preferencias: {},
            configuracoes: {}
        };
    }

    getInitials() {
        if (!this.userData?.nome) return 'US';
        return this.userData.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    updateProfileDisplay() {
        if (!this.userData) return;

        // Atualizar avatar
        if (this.elements.profileAvatar) {
            const initialsSpan = this.elements.profileAvatar.querySelector('span');
            if (initialsSpan) {
                initialsSpan.textContent = this.getInitials();
            }
        }

        // Atualizar nome
        if (this.elements.profileName) {
            this.elements.profileName.textContent = this.userData.nome;
        }

        // Atualizar email
        if (this.elements.profileEmail) {
            this.elements.profileEmail.textContent = this.userData.email;
        }

        // Atualizar outras partes da interface
        this.updateStats();
        this.updateAddressList();
        this.updateCardsList();
        this.updateSettings();
    }

    populateForms() {
        if (!this.userData) return;

        // Dados pessoais
        if (this.elements.personalDataForm) {
            const fields = {
                'nomeCompleto': this.userData.nome,
                'email': this.userData.email,
                'telefone': this.userData.telefone,
                'dataNascimento': this.userData.dataNascimento,
                'genero': this.userData.genero,
                'cpf': this.userData.cpf
            };

            Object.entries(fields).forEach(([id, value]) => {
                const field = document.getElementById(id);
                if (field && value) {
                    field.value = value;
                }
            });
        }
    }

    loadPreferences() {
        if (!this.userData?.preferencias) return;

        // Tema
        const theme = this.userData.preferencias.tema || 'auto';
        this.selectTheme(theme);

        // Outras preferências
        Object.entries(this.userData.preferencias).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element && value) {
                element.value = value;
            }
        });

        // Configurações (toggles)
        if (this.userData.configuracoes) {
            Object.entries(this.userData.configuracoes).forEach(([key, value]) => {
                const element = document.querySelector(`input[name="${key}"]`);
                if (element) {
                    element.checked = value;
                }
            });
        }
    }

    setupSectionNavigation() {
        // Verificar hash da URL
        const hash = window.location.hash.substring(1);
        const validSections = [
            'dados-pessoais', 'seguranca', 'cartoes', 
            'enderecos', 'privacidade', 'notificacoes', 'preferencias'
        ];

        if (hash && validSections.includes(hash)) {
            this.switchSection(hash);
        } else {
            this.switchSection('dados-pessoais');
        }

        // Adicionar listener para hash changes
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.substring(1);
            if (validSections.includes(newHash)) {
                this.switchSection(newHash);
            }
        });
    }

    switchSection(sectionId) {
        if (this.currentSection === sectionId) return;

        // Animar transição
        const currentSection = this.currentSection 
            ? document.getElementById(this.currentSection) 
            : null;
        const targetSection = document.getElementById(sectionId);
        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);

        if (!targetSection || !targetNavItem) return;

        // Esconder seção atual
        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('fading-out');
            
            setTimeout(() => {
                currentSection.classList.remove('fading-out');
            }, 300);
        }

        // Atualizar navegação
        this.elements.navItems.forEach(item => item.classList.remove('active'));
        targetNavItem.classList.add('active');
        targetNavItem.focus();

        // Atualizar URL sem recarregar a página
        history.pushState(null, '', `#${sectionId}`);

        // Mostrar nova seção
        setTimeout(() => {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Scroll para a seção
            if (!this.isMobile) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: targetSection.offsetTop - 20, behavior: 'smooth' });
            }

            // Fechar formulários abertos em mobile
            if (this.isMobile) {
                this.closeAllForms();
            }
        }, 50);
    }

    setupFormHandlers() {
        // Prevenir múltiplas submissões
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (this.isSubmitting) {
                    e.preventDefault();
                    return;
                }
            });
        });

        // Configurar máscaras
        this.setupInputMasks();
    }

    setupInputMasks() {
        // Máscara para CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.substring(0, 11);
                
                if (value.length > 9) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
                }
                
                e.target.value = value;
            });
        }

        // Máscara para CEP
        const zipCodeInput = document.getElementById('zipCode');
        if (zipCodeInput) {
            zipCodeInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 8) value = value.substring(0, 8);
                
                if (value.length > 5) {
                    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                }
                
                e.target.value = value;
            });
        }
    }

    async handlePersonalDataSubmit(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validatePersonalData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Salvando...';
            submitBtn.disabled = true;

            // Atualizar dados
            this.userData = { ...this.userData, ...data };
            
            // Salvar
            await this.saveUserData();
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Atualizar display
            this.updateProfileDisplay();
            
            // Notificar sucesso
            this.showNotification('Dados pessoais atualizados com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            this.showNotification('Erro ao salvar dados', 'error');
            
            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Salvar Alterações';
            submitBtn.disabled = false;
        }
    }

    validatePersonalData(data) {
        const errors = [];

        if (!data.nome || data.nome.trim().length < 3) {
            errors.push('Nome deve ter pelo menos 3 caracteres');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push('Por favor, insira um e-mail válido');
        }

        if (data.telefone) {
            const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            if (!phoneRegex.test(data.telefone)) {
                errors.push('Formato de telefone inválido. Use (99) 99999-9999');
            }
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    resetPersonalDataForm() {
        if (this.elements.personalDataForm) {
            this.elements.personalDataForm.reset();
            this.populateForms();
            this.showNotification('Alterações canceladas', 'info');
        }
    }

    async handlePasswordChange(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validatePasswordData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Alterando...';
            submitBtn.disabled = true;

            // Simular alteração
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Fechar formulário
            this.toggleForm('changePasswordForm', false);
            form.reset();
            
            // Notificar sucesso
            this.showNotification('Senha alterada com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            this.showNotification('Erro ao alterar senha', 'error');
            
            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Atualizar Senha';
            submitBtn.disabled = false;
        }
    }

    validatePasswordData(data) {
        const errors = [];

        if (!data.currentPassword) {
            errors.push('Digite sua senha atual');
        }

        if (!data.newPassword || data.newPassword.length < 8) {
            errors.push('A nova senha deve ter pelo menos 8 caracteres');
        }

        if (data.newPassword !== data.confirmPassword) {
            errors.push('As senhas não coincidem');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    updatePasswordStrength() {
        const password = document.getElementById('newPassword')?.value || '';
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text strong');
        
        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let color = '#ff4757';
        let text = 'Fraca';

        // Verificar comprimento
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        
        // Verificar complexidade
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        // Ajustar para máximo 100%
        strength = Math.min(strength, 100);

        // Determinar cor e texto
        if (strength >= 75) {
            color = '#00cc99';
            text = 'Forte';
        } else if (strength >= 50) {
            color = '#ffa502';
            text = 'Média';
        } else if (strength >= 25) {
            color = '#ffa502';
            text = 'Média';
        }

        // Atualizar display
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    handleSecurityAction(action) {
        switch (action) {
            case 'change-password':
                this.toggleForm('changePasswordForm');
                break;
            case 'manage-sessions':
                this.manageActiveSessions();
                break;
            case 'view-login-history':
                this.viewLoginHistory();
                break;
            default:
                console.warn('Ação de segurança desconhecida:', action);
        }
    }

    manageActiveSessions() {
        this.showNotification('Funcionalidade em desenvolvimento', 'info');
    }

    viewLoginHistory() {
        this.showNotification('Funcionalidade em desenvolvimento', 'info');
    }

    async handleNewCardSubmit(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validateCardData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Adicionando...';
            submitBtn.disabled = true;

            // Adicionar cartão
            if (!this.userData.cartoes) this.userData.cartoes = [];
            
            const novoCartao = {
                id: Date.now(),
                ...data,
                numeroMascarado: '**** **** **** ' + data.cardNumber.slice(-4),
                principal: data.setAsPrimary === 'on'
            };

            this.userData.cartoes.push(novoCartao);
            
            // Salvar
            await this.saveUserData();
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Fechar formulário
            this.toggleForm('addCardForm', false);
            form.reset();
            
            // Atualizar lista
            this.updateCardsList();
            
            // Notificar sucesso
            this.showNotification('Cartão adicionado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao adicionar cartão:', error);
            this.showNotification('Erro ao adicionar cartão', 'error');
            
            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Adicionar Cartão';
            submitBtn.disabled = false;
        }
    }

    validateCardData(data) {
        const errors = [];

        // Validar número do cartão
        const cardNumber = data.cardNumber.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumber)) {
            errors.push('Número do cartão inválido (16 dígitos necessários)');
        }

        // Validar nome
        if (!data.cardHolder || data.cardHolder.trim().length < 3) {
            errors.push('Nome no cartão muito curto');
        }

        // Validar validade
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(data.expiryDate)) {
            errors.push('Data de validade inválida. Use MM/AA');
        }

        // Validar CVV
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(data.cvv)) {
            errors.push('CVV inválido (3 ou 4 dígitos)');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 16) value = value.substring(0, 16);
        
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = value;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substring(0, 4);
        
        if (value.length >= 2) {
            value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
        }
        
        input.value = value;
    }

    async handleAddressSubmit(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validateAddressData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Salvando...';
            submitBtn.disabled = true;

            // Adicionar endereço
            if (!this.userData.enderecos) this.userData.enderecos = [];
            
            const novoEndereco = {
                id: Date.now(),
                ...data,
                principal: data.setAsPrimaryAddress === 'on'
            };

            this.userData.enderecos.push(novoEndereco);
            
            // Salvar
            await this.saveUserData();
            
            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Fechar formulário
            this.toggleForm('addressFormContainer', false);
            form.reset();
            
            // Atualizar lista
            this.updateAddressList();
            
            // Notificar sucesso
            this.showNotification('Endereço salvo com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao salvar endereço:', error);
            this.showNotification('Erro ao salvar endereço', 'error');
            
            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Salvar Endereço';
            submitBtn.disabled = false;
        }
    }

    validateAddressData(data) {
        const errors = [];

        if (!data.street || data.street.trim().length < 3) {
            errors.push('Rua/Avenida é obrigatória');
        }

        if (!data.number) {
            errors.push('Número é obrigatório');
        }

        if (!data.city || data.city.trim().length < 3) {
            errors.push('Cidade é obrigatória');
        }

        if (data.zipCode) {
            const zipCodeRegex = /^[0-9]{5}-?[0-9]{3}$/;
            if (!zipCodeRegex.test(data.zipCode)) {
                errors.push('CEP inválido. Use 00000-000');
            }
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    formatZipCode(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 8) value = value.substring(0, 8);
        
        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        
        input.value = value;
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/(\d{2})/, '($1) ');
        }
        
        input.value = value;
    }

    toggleForm(formId, show = null) {
        const form = document.getElementById(formId);
        if (!form) return;

        const shouldShow = show !== null ? show : form.style.display === 'none';
        
        if (shouldShow) {
            form.style.display = 'block';
            setTimeout(() => {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Focar no primeiro campo
                const firstInput = form.querySelector('input, select, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        } else {
            form.style.display = 'none';
        }
    }

    closeAllForms() {
        const forms = [
            'changePasswordForm',
            'addCardForm',
            'addressFormContainer'
        ];

        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.style.display = 'none';
            }
        });
    }

    handleAddressAction(button) {
        const action = button.dataset.action;
        const addressCard = button.closest('.address-card');
        const addressId = addressCard?.dataset?.id;

        switch (action) {
            case 'edit':
                this.editAddress(addressId);
                break;
            case 'remove':
                this.removeAddress(addressId, addressCard);
                break;
            case 'set-primary':
                this.setPrimaryAddress(addressId);
                break;
        }
    }

    async editAddress(addressId) {
        const endereco = this.userData.enderecos?.find(a => a.id == addressId);
        if (!endereco) return;

        // Preencher formulário
        Object.entries(endereco).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });

        // Mostrar formulário
        this.toggleForm('addressFormContainer', true);
    }

    async removeAddress(addressId, addressCard) {
        this.showConfirmationModal(
            'Remover Endereço',
            'Tem certeza que deseja remover este endereço? Esta ação não pode ser desfeita.',
            async () => {
                try {
                    // Remover do array
                    this.userData.enderecos = this.userData.enderecos?.filter(a => a.id != addressId) || [];
                    
                    // Salvar
                    await this.saveUserData();
                    
                    // Remover do DOM
                    if (addressCard) {
                        addressCard.remove();
                    }
                    
                    // Notificar sucesso
                    this.showNotification('Endereço removido com sucesso!', 'success');
                    
                } catch (error) {
                    console.error('Erro ao remover endereço:', error);
                    this.showNotification('Erro ao remover endereço', 'error');
                }
            }
        );
    }

    async setPrimaryAddress(addressId) {
        try {
            // Marcar todos como não principais
            this.userData.enderecos?.forEach(endereco => {
                endereco.principal = endereco.id == addressId;
            });

            // Salvar
            await this.saveUserData();
            
            // Atualizar interface
            this.updateAddressList();
            
            // Notificar sucesso
            this.showNotification('Endereço definido como principal!', 'success');
            
        } catch (error) {
            console.error('Erro ao definir endereço principal:', error);
            this.showNotification('Erro ao definir endereço principal', 'error');
        }
    }

    handleCardAction(button) {
        const cardItem = button.closest('.card-item');
        const cardId = cardItem?.dataset?.id;
        const isRemove = button.querySelector('.bi-trash');

        if (isRemove) {
            this.removeCard(cardId, cardItem);
        } else {
            this.editCard(cardId);
        }
    }

    async removeCard(cardId, cardItem) {
        this.showConfirmationModal(
            'Remover Cartão',
            'Tem certeza que deseja remover este cartão? Esta ação não pode ser desfeita.',
            async () => {
                try {
                    // Remover do array
                    this.userData.cartoes = this.userData.cartoes?.filter(c => c.id != cardId) || [];
                    
                    // Salvar
                    await this.saveUserData();
                    
                    // Remover do DOM
                    if (cardItem) {
                        cardItem.remove();
                    }
                    
                    // Notificar sucesso
                    this.showNotification('Cartão removido com sucesso!', 'success');
                    
                } catch (error) {
                    console.error('Erro ao remover cartão:', error);
                    this.showNotification('Erro ao remover cartão', 'error');
                }
            }
        );
    }

    editCard(cardId) {
        const cartao = this.userData.cartoes?.find(c => c.id == cardId);
        if (!cartao) return;

        // Preencher formulário
        Object.entries(cartao).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });

        // Mostrar formulário
        this.toggleForm('addCardForm', true);
    }

    updateAddressList() {
        const addressesList = document.querySelector('.addresses-list');
        if (!addressesList || !this.userData?.enderecos) return;

        // Limpar lista existente
        addressesList.innerHTML = '';

        // Adicionar endereços
        this.userData.enderecos.forEach(endereco => {
            const addressCard = document.createElement('div');
            addressCard.className = `address-card ${endereco.principal ? 'primary' : ''}`;
            addressCard.dataset.id = endereco.id;

            addressCard.innerHTML = `
                <div class="address-header">
                    <h3><i class="bi ${endereco.principal ? 'bi-house-check' : 'bi-building'}"></i> ${endereco.addressName}</h3>
                    ${endereco.principal ? '<span class="address-tag">Principal</span>' : ''}
                </div>
                <div class="address-body">
                    <p class="address-line">${endereco.street}, ${endereco.number}</p>
                    <p class="address-line">${endereco.complement}</p>
                    <p class="address-line">${endereco.neighborhood}</p>
                    <p class="address-line">${endereco.city} - ${endereco.state}</p>
                    <p class="address-line">CEP: ${endereco.zipCode}</p>
                    <p class="address-contact">Telefone: ${endereco.addressPhone}</p>
                </div>
                <div class="address-actions">
                    ${!endereco.principal ? `
                        <button class="address-action" data-action="set-primary">
                            <i class="bi bi-star"></i>
                            Tornar Principal
                        </button>
                    ` : ''}
                    <button class="address-action" data-action="edit">
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>
                    <button class="address-action" data-action="remove">
                        <i class="bi bi-trash"></i>
                        Remover
                    </button>
                </div>
            `;

            addressesList.appendChild(addressCard);
        });

        // Adicionar botão de adicionar endereço
        const addButton = document.querySelector('.add-address-btn');
        if (addButton) {
            addressesList.appendChild(addButton.cloneNode(true));
            const newButton = addressesList.querySelector('.add-address-btn:last-child');
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForm('addressFormContainer');
            });
        }
    }

    updateCardsList() {
        const cardsList = document.querySelector('.cards-list');
        if (!cardsList || !this.userData?.cartoes) return;

        // Limpar lista existente
        cardsList.innerHTML = '';

        // Adicionar cartões
        this.userData.cartoes.forEach(cartao => {
            const cardItem = document.createElement('div');
            cardItem.className = `card-item ${cartao.principal ? 'primary' : ''}`;
            cardItem.dataset.id = cartao.id;

            cardItem.innerHTML = `
                <div class="card-icon">
                    <i class="bi bi-credit-card${cartao.principal ? '-2-front' : ''}"></i>
                </div>
                <div class="card-details">
                    <h3>Cartão ${cartao.principal ? 'Principal' : 'Secundário'}</h3>
                    <p class="card-number">${cartao.numeroMascarado || '**** **** **** ' + cartao.cardNumber.slice(-4)}</p>
                    <p class="card-info">${this.getCardTypeName(cartao.cardType)} • Válido até ${cartao.expiryDate}</p>
                </div>
                <div class="card-actions">
                    <button class="card-action" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="card-action" title="Remover">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;

            cardsList.appendChild(cardItem);
        });

        // Adicionar botão de adicionar cartão
        const addButton = document.querySelector('.add-card-btn');
        if (addButton) {
            cardsList.appendChild(addButton.cloneNode(true));
            const newButton = cardsList.querySelector('.add-card-btn:last-child');
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForm('addCardForm');
            });
        }
    }

    getCardTypeName(type) {
        const types = {
            'visa': 'Visa',
            'mastercard': 'Mastercard',
            'amex': 'American Express',
            'elo': 'Elo'
        };
        return types[type] || type;
    }

    async selectTheme(theme) {
        try {
            // Atualizar opções
            this.elements.themeOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.theme === theme);
            });

            // Aplicar tema
            this.applyTheme(theme);

            // Salvar preferência
            if (!this.userData.preferencias) this.userData.preferencias = {};
            this.userData.preferencias.tema = theme;
            await this.saveUserData();

            // Notificar
            this.showNotification(`Tema ${this.getThemeName(theme)} aplicado!`, 'success');
            
        } catch (error) {
            console.error('Erro ao aplicar tema:', error);
            this.showNotification('Erro ao aplicar tema', 'error');
        }
    }

    applyTheme(theme) {
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark-mode', prefersDark);
        } else {
            document.body.classList.toggle('dark-mode', theme === 'dark');
        }
    }

    getThemeName(theme) {
        const themes = {
            'light': 'Claro',
            'dark': 'Escuro',
            'auto': 'Automático'
        };
        return themes[theme] || theme;
    }

    updatePreference(key, value) {
        if (!this.userData.preferencias) this.userData.preferencias = {};
        this.userData.preferencias[key] = value;
        this.saveUserData();
    }

    handleToggleChange(checkbox) {
        const name = checkbox.name || checkbox.id;
        const value = checkbox.checked;
        
        if (!this.userData.configuracoes) this.userData.configuracoes = {};
        this.userData.configuracoes[name] = value;
        
        this.saveUserData();
        
        // Feedback visual
        const settingName = this.getSettingName(name);
        const status = value ? 'ativada' : 'desativada';
        this.showNotification(`${settingName} ${status}`, 'info');
    }

    getSettingName(name) {
        const settings = {
            'perfilPublico': 'Perfil público',
            'mostrarCompras': 'Histórico de compras',
            'mostrarDoacoes': 'Doações realizadas',
            'permitirMensagens': 'Mensagens de estranhos',
            'mostrarLocalizacao': 'Localização',
            'recomendacoes': 'Recomendações personalizadas',
            'autenticacao2Fatores': 'Autenticação de dois fatores',
            'leitorTela': 'Otimização para leitor de tela',
            'reduzirAnimações': 'Redução de animações'
        };
        return settings[name] || name;
    }

    handleAvatarEdit() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                // Validar arquivo
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error('A imagem deve ter no máximo 5MB');
                }

                if (!file.type.startsWith('image/')) {
                    throw new Error('Por favor, selecione uma imagem válida');
                }

                // Mostrar indicador de carregamento
                this.showNotification('Enviando imagem...', 'info');

                // Simular upload
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Atualizar avatar (em produção, você faria upload para servidor)
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Em produção, você salvaria a URL da imagem
                    this.showNotification('Foto de perfil atualizada com sucesso!', 'success');
                    
                    // Aqui você atualizaria a imagem real
                    // this.elements.profileAvatar.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);

            } catch (error) {
                this.showNotification(error.message, 'error');
            }
        };

        document.body.appendChild(input);
        input.click();
        setTimeout(() => document.body.removeChild(input), 100);
    }

    handleHelpClick() {
        this.showNotification('Em breve você poderá falar com nosso suporte!', 'info');
    }

    async exportUserData() {
        try {
            this.showNotification('Preparando seus dados para exportação...', 'info');
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Criar blob com os dados
            const dataStr = JSON.stringify(this.userData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            // Criar link para download
            const downloadUrl = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `reuse-dados-${Date.now()}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(downloadUrl);
            
            this.showNotification('Dados exportados com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.showNotification('Erro ao exportar dados', 'error');
        }
    }

    handleDeleteAccount() {
        this.showConfirmationModal(
            'Excluir Conta',
            'Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão permanentemente removidos.',
            async () => {
                try {
                    this.showNotification('Solicitação de exclusão enviada!', 'success');
                    // Em produção, você faria uma requisição para a API
                } catch (error) {
                    console.error('Erro ao solicitar exclusão:', error);
                    this.showNotification('Erro ao solicitar exclusão', 'error');
                }
            }
        );
    }

    configureColorblind() {
        this.showNotification('Configurações de daltonismo em desenvolvimento!', 'info');
    }

    setupModalSystem() {
        if (!this.elements.confirmationModal) return;

        // Fechar modal
        const closeModal = () => {
            this.elements.confirmationModal.classList.remove('active');
            this.modalQueue.shift();
            this.processNextModal();
        };

        // Event listeners
        if (this.elements.closeConfirmationModal) {
            this.elements.closeConfirmationModal.onclick = closeModal;
        }

        if (this.elements.cancelAction) {
            this.elements.cancelAction.onclick = closeModal;
        }

        // Fechar ao clicar fora
        this.elements.confirmationModal.onclick = (e) => {
            if (e.target === this.elements.confirmationModal) {
                closeModal();
            }
        };

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.confirmationModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    showConfirmationModal(title, message, onConfirm) {
        this.modalQueue.push({ title, message, onConfirm });
        this.processNextModal();
    }

    processNextModal() {
        if (this.modalQueue.length === 0 || !this.elements.confirmationModal) return;

        const modal = this.modalQueue[0];
        const isActive = this.elements.confirmationModal.classList.contains('active');

        if (!isActive) {
            // Atualizar conteúdo
            if (this.elements.confirmationTitle) {
                this.elements.confirmationTitle.textContent = modal.title;
            }

            if (this.elements.confirmationMessage) {
                this.elements.confirmationMessage.textContent = modal.message;
            }

            // Configurar botão de confirmação
            if (this.elements.confirmAction) {
                const confirmHandler = () => {
                    modal.onConfirm();
                    this.elements.confirmationModal.classList.remove('active');
                    this.modalQueue.shift();
                    this.elements.confirmAction.onclick = null;
                    this.processNextModal();
                };

                this.elements.confirmAction.onclick = confirmHandler;
            }

            // Mostrar modal
            this.elements.confirmationModal.classList.add('active');
            this.elements.confirmAction.focus();
        }
    }

    showNotification(message, type = 'info') {
        // Remover notificações antigas
        const oldNotifications = document.querySelectorAll('.profile-notification');
        oldNotifications.forEach(n => n.remove());

        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `profile-notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        // Ícone
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-circle-fill',
            info: 'bi-info-circle-fill'
        };

        notification.innerHTML = `
            <i class="bi ${icons[type] || icons.info}" aria-hidden="true"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Fechar notificação">
                <i class="bi bi-x" aria-hidden="true"></i>
            </button>
        `;

        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: this.isMobile ? '10px' : '20px',
            right: this.isMobile ? '10px' : '20px',
            left: this.isMobile ? '10px' : 'auto',
            background: this.getNotificationColor(type),
            color: 'white',
            padding: this.isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            maxWidth: this.isMobile ? 'calc(100% - 20px)' : '400px',
            wordBreak: 'break-word'
        });

        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.onclick = () => {
            notification.remove();
        };

        // Adicionar ao DOM
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        document.body.appendChild(notification);

        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });

        // Auto-remover
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, this.notificationDuration);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#00cc99',
            error: '#ff4757',
            warning: '#ff9500',
            info: '#0066cc'
        };
        return colors[type] || colors.info;
    }

    updateStats() {
        if (!this.elements.statsCards || !this.userData) return;

        const stats = [
            { value: this.userData.compras || 15, label: 'Compras' },
            { value: this.userData.favoritos || 8, label: 'Favoritos' },
            { value: this.userData.doacoes || 42, label: 'Doações' }
        ];

        this.elements.statsCards.forEach((card, index) => {
            const stat = stats[index];
            if (stat) {
                const h4 = card.querySelector('h4');
                const p = card.querySelector('p');
                if (h4) h4.textContent = stat.value;
                if (p) p.textContent = stat.label;
            }
        });
    }

    updateSettings() {
        // Atualizar configurações baseadas nos dados do usuário
        if (!this.userData?.configuracoes) return;

        Object.entries(this.userData.configuracoes).forEach(([key, value]) => {
            const checkbox = document.querySelector(`input[name="${key}"]`);
            if (checkbox) {
                checkbox.checked = value;
            }
        });
    }

    async saveUserData() {
        try {
            localStorage.setItem('reuse_user_data', JSON.stringify(this.userData));
            
            // Disparar evento customizado
            window.dispatchEvent(new CustomEvent('userDataUpdated', { 
                detail: this.userData 
            }));
            
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            throw error;
        }
    }

    setupPerformanceOptimizations() {
        // Debounce para eventos pesados
        this.debouncedFunctions = new Map();

        // Otimizar animações
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.preloadAssets();
            });
        }

        // Usar requestAnimationFrame para animações
        this.animationFrame = null;
    }

    preloadAssets() {
        // Precarregar assets importantes
        const assets = [
            // Ícones, imagens, etc.
        ];

        assets.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    setupTouchEvents() {
        // Melhorar experiência touch
        document.querySelectorAll('button, .nav-item, .card-action, .address-action').forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
        });

        // Prevenir zoom em inputs
        document.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                e.target.style.fontSize = '16px';
            }
        }, { passive: true });

        // Melhorar scroll em mobile
        if (this.isMobile) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    setupAccessibility() {
        // Adicionar labels ARIA
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.setAttribute('aria-label', `Navegar para ${item.textContent.trim()}`);
            item.setAttribute('aria-current', item.classList.contains('active') ? 'page' : 'false');
        });

        // Melhorar navegação por teclado
        document.querySelectorAll('button, input, select, textarea').forEach(el => {
            el.setAttribute('tabindex', '0');
        });

        // Adicionar skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ir para o conteúdo principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            z-index: 10000;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }

    setupFocusEvents() {
        // Melhorar foco para acessibilidade
        document.addEventListener('focusin', (e) => {
            const target = e.target;
            if (target.matches('.nav-item, .btn-primary, .btn-secondary, .security-action')) {
                target.style.outline = '2px solid var(--primary-blue)';
                target.style.outlineOffset = '2px';
            }
        });

        document.addEventListener('focusout', (e) => {
            const target = e.target;
            if (target.matches('.nav-item, .btn-primary, .btn-secondary, .security-action')) {
                target.style.outline = 'none';
            }
        });
    }

    handleResize() {
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        // Ajustar layout baseado no tamanho da tela
        if (this.isMobile) {
            this.closeAllForms();
        }
    }

    handleKeyboard(e) {
        // Navegação por teclado
        if (e.key === 'Escape') {
            this.closeAllForms();
            if (this.elements.confirmationModal?.classList.contains('active')) {
                this.elements.confirmationModal.classList.remove('active');
            }
        }

        // Atalhos
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const activeForm = document.querySelector('form:not([style*="display: none"])');
            if (activeForm) {
                activeForm.requestSubmit();
            }
        }

        // Navegação entre seções com teclado
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeNav = document.querySelector('.nav-item.active');
            if (activeNav) {
                const allNavs = Array.from(this.elements.navItems);
                const currentIndex = allNavs.indexOf(activeNav);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % allNavs.length;
                } else {
                    nextIndex = (currentIndex - 1 + allNavs.length) % allNavs.length;
                }
                
                allNavs[nextIndex].click();
                allNavs[nextIndex].focus();
                e.preventDefault();
            }
        }
    }

    showWelcomeMessage() {
        // Mostrar mensagem de boas-vindas apenas na primeira visita
        const hasSeenWelcome = sessionStorage.getItem('hasSeenProfileWelcome');
        
        if (!hasSeenWelcome && this.userData?.nome) {
            setTimeout(() => {
                const firstName = this.userData.nome.split(' ')[0];
                this.showNotification(`Bem-vindo de volta, ${firstName}!`, 'info');
                sessionStorage.setItem('hasSeenProfileWelcome', 'true');
            }, 1000);
        }
    }

    setupImageHandling() {
        // Garantir que o avatar nunca desapareça
        const ensureAvatarVisibility = () => {
            const avatar = document.querySelector('.profile-avatar-large');
            if (avatar) {
                avatar.style.display = 'flex';
                avatar.style.visibility = 'visible';
                avatar.style.opacity = '1';
                avatar.style.position = 'relative';
                avatar.style.zIndex = '1000';
            }
        };

        // Verificar periodicamente
        setInterval(ensureAvatarVisibility, 1000);
        
        // Verificar inicialmente
        ensureAvatarVisibility();
    }

    // Métodos utilitários
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Getters e setters
    getUserData() {
        return { ...this.userData };
    }

    setUserData(data) {
        this.userData = { ...this.userData, ...data };
        this.updateProfileDisplay();
        this.saveUserData();
    }

    // Cleanup
    destroy() {
        // Remover observers
        if (this.domObserver) {
            this.domObserver.disconnect();
        }

        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }

        // Remover event listeners
        document.removeEventListener('click', this.handleGlobalClick);
        document.removeEventListener('submit', this.handleGlobalSubmit);
        document.removeEventListener('input', this.handleGlobalInput);
        document.removeEventListener('change', this.handleGlobalChange);
        document.removeEventListener('keydown', this.handleKeyboard);
        window.removeEventListener('resize', this.debounce(this.handleResize, 250));

        // Limpar timeouts e intervals
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos dinâmicos
    const styles = document.createElement('style');
    styles.textContent = `
        .profile-notification {
            animation: notificationSlideIn 0.3s ease;
        }
        
        @keyframes notificationSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .profile-notification .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .profile-notification .notification-close:hover {
            opacity: 1;
        }
        
        .fading-out {
            animation: fadeOut 0.3s ease;
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(10px);
            }
        }
        
        /* Garantir que o avatar nunca desapareça */
        .profile-avatar-large {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1000 !important;
        }
        
        /* Estados de carregamento */
        .loading {
            position: relative;
            opacity: 0.7;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Melhorias para acessibilidade */
        .nav-item:focus,
        .btn-primary:focus,
        .btn-secondary:focus,
        .security-action:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
        
        /* Responsividade adicional */
        @media (max-width: 768px) {
            .profile-avatar-large {
                width: 100px !important;
                height: 100px !important;
                font-size: 2.2rem !important;
            }
            
            .profile-notification {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .profile-avatar-large {
                width: 80px !important;
                height: 80px !important;
                font-size: 1.8rem !important;
            }
        }
    `;
    document.head.appendChild(styles);

    // Inicializar
    try {
        window.perfilCliente = new PerfilCliente();
    } catch (error) {
        console.error('Erro ao inicializar PerfilCliente:', error);
        // Fallback básico
        const fallbackInit = () => {
            const avatar = document.querySelector('.profile-avatar-large');
            if (avatar) {
                avatar.style.display = 'flex';
                avatar.style.visibility = 'visible';
                avatar.style.opacity = '1';
            }
            
            // Garantir navegação básica
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function() {
                    const sectionId = this.dataset.section;
                    document.querySelectorAll('.profile-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-item').forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        this.classList.add('active');
                    }
                });
            });
        };
        fallbackInit();
    }

    // Integração com outros módulos
    setupProfileIntegration();
});

function setupProfileIntegration() {
    // Atualizar dados em outros lugares da aplicação
    const updateGlobalUserData = (data) => {
        // Atualizar header
        const headerElements = {
            '.user-details h4': data?.nome,
            '.user-details p': data?.email
        };

        Object.entries(headerElements).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element && value) {
                element.textContent = value;
            }
        });

        // Atualizar iniciais
        if (data?.nome) {
            const initials = data.nome
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);

            document.querySelectorAll('.profile-avatar span').forEach(el => {
                el.textContent = initials;
            });
        }
    };

    // Escutar mudanças
    window.addEventListener('userDataUpdated', (e) => {
        updateGlobalUserData(e.detail);
    });

    // Carregar dados iniciais
    const savedData = localStorage.getItem('reuse_user_data');
    if (savedData) {
        try {
            updateGlobalUserData(JSON.parse(savedData));
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerfilCliente;
}