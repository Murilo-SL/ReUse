// vendedor-configuracoes.js - Gerenciamento completo da página de configurações do vendedor

class VendedorConfiguracoes {
    constructor() {
        this.NOTIFICATION_DURATION = 3000;
        this.API_BASE_URL = 'https://api.reuse.com/v1'; // Simulado
        this.STORAGE_KEYS = {
            SETTINGS: 'reuse_seller_settings',
            PROGRESS: 'reuse_seller_progress',
            THEME: 'reuse_dark_mode'
        };
        
        // Dados simulados do vendedor
        this.sellerData = {
            id: 'seller_123456',
            name: 'Vendedor Loja',
            email: 'vendedor@email.com',
            storeName: 'ReUse Vendedor Oficial',
            cnpj: '12.345.678/0001-90',
            ie: '123.456.789.012',
            phone: '(11) 99999-9999',
            website: 'www.minhaloja.com',
            since: '2024-01-15',
            verificationLevel: 'verified'
        };

        // Configurações padrão
        this.defaultSettings = {
            store: {
                name: 'ReUse Vendedor Oficial',
                cnpj: '12.345.678/0001-90',
                ie: '123.456.789.012',
                phone: '(11) 99999-9999',
                email: 'contato@minhaloja.com',
                website: 'www.minhaloja.com',
                description: 'Loja especializada em produtos sustentáveis',
                categories: ['Moda Feminina', 'Moda Masculina', 'Eletrônicos', 'Casa e Decoração', 'Esportes']
            },
            address: {
                street: 'Rua das Flores, 123',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                zipcode: '01234-567',
                complement: 'Sala 45'
            },
            schedule: {
                monday_friday: { open: '09:00', close: '18:00', closed: false },
                saturday: { open: '09:00', close: '13:00', closed: false },
                sunday: { closed: true },
                holidays: { closed: true }
            },
            payments: {
                methods: [
                    { id: 'credit_card', name: 'Cartão de Crédito', active: true, brands: ['visa', 'mastercard', 'elo', 'amex'] },
                    { id: 'boleto', name: 'Boleto Bancário', active: true, days: 3 },
                    { id: 'pix', name: 'PIX', active: false, instant: true },
                    { id: 'cash', name: 'Dinheiro', active: false }
                ],
                bank: {
                    bank: 'Banco do Brasil',
                    agency: '1234-5',
                    account: '12345-6',
                    holder: 'Vendedor Loja',
                    document: '12.345.678/0001-90',
                    verified: true
                }
            },
            shipping: {
                methods: [
                    { id: 'pac', name: 'PAC', carrier: 'Correios', price: 25.90, days: '7-15', active: true },
                    { id: 'sedex', name: 'Sedex', carrier: 'Correios', price: 45.90, days: '2-5', active: true },
                    { id: 'local', name: 'Entrega Local', price: 15.90, days: '1', active: false },
                    { id: 'pickup', name: 'Retirada no Local', price: 0, active: true }
                ],
                freeShipping: {
                    enabled: false,
                    minValue: 199.00,
                    regions: ['SP', 'RJ']
                },
                pickupLocations: [
                    {
                        id: 'loc1',
                        name: 'Loja Principal',
                        address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
                        schedule: 'Segunda a Sexta: 09h às 18h | Sábado: 09h às 13h',
                        active: true
                    },
                    {
                        id: 'loc2',
                        name: 'Ponto de Apoio',
                        address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
                        schedule: 'Segunda a Sexta: 10h às 19h',
                        active: true
                    }
                ]
            },
            notifications: {
                email: {
                    new_order: true,
                    payment_confirmed: true,
                    order_shipped: true,
                    low_stock: true,
                    new_review: false,
                    weekly_report: false
                },
                push: {
                    enabled: true,
                    promotions: false,
                    messages: true
                },
                limits: {
                    low_stock_threshold: 5,
                    report_frequency: 'weekly',
                    quiet_hours_start: '22:00',
                    quiet_hours_end: '09:00'
                }
            },
            security: {
                twoFactorEnabled: false,
                trustedDevices: [
                    {
                        id: 'dev1',
                        type: 'laptop',
                        browser: 'Chrome',
                        os: 'Windows',
                        lastAccess: '2025-05-15T14:32:00',
                        current: true
                    },
                    {
                        id: 'dev2',
                        type: 'phone',
                        browser: 'Safari',
                        os: 'iOS',
                        lastAccess: '2025-05-14T09:15:00',
                        current: false
                    }
                ],
                activeSessions: [
                    {
                        id: 'sess1',
                        device: 'Chrome - Windows',
                        location: 'São Paulo, SP',
                        lastActive: '2025-05-15T14:32:00',
                        current: true
                    },
                    {
                        id: 'sess2',
                        device: 'Safari - iOS',
                        location: 'Rio de Janeiro, RJ',
                        lastActive: '2025-05-14T09:15:00',
                        current: false
                    }
                ]
            },
            integrations: {
                facebook: { connected: true, shopId: 'fb_123456', active: true },
                instagram: { connected: false, pending: true },
                google: { connected: true, merchantId: 'gmc_789012', active: true },
                whatsapp: { connected: true, phone: '+5511999999999', active: true },
                amazon: { connected: false },
                shopify: { connected: false }
            },
            webhooks: [
                {
                    id: 'web1',
                    name: 'Notificações de pedidos',
                    url: 'https://api.minhaloja.com/webhooks/pedidos',
                    events: ['order.created', 'order.paid', 'order.shipped'],
                    active: true
                },
                {
                    id: 'web2',
                    name: 'Atualização de estoque',
                    url: 'https://api.minhaloja.com/webhooks/estoque',
                    events: ['product.updated', 'inventory.low'],
                    active: true
                }
            ],
            apiKeys: [
                {
                    id: 'key1',
                    name: 'Chave de Produção',
                    key: 'reuse_prod_••••••••••••••••••••••••',
                    active: true,
                    createdAt: '2025-01-15',
                    lastUsed: '2025-05-14'
                },
                {
                    id: 'key2',
                    name: 'Chave de Teste',
                    key: 'reuse_test_••••••••••••••••••••••••',
                    active: false,
                    createdAt: '2025-01-15',
                    lastUsed: '2025-04-30'
                }
            ]
        };

        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.loadSettingsData();
        this.loadTabFromUrl();
        this.checkSetupProgress();
        this.initializeFormValidations();
    }

    initializeComponents() {
        // Elementos principais
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.saveAllBtn = document.getElementById('saveAllBtn');
        
        // Toggles
        this.toggleSwitches = document.querySelectorAll('.toggle-switch');
        
        // Botões de ação
        this.editButtons = document.querySelectorAll('.btn-edit, .btn-add, .btn-link');
        
        // Formulários
        this.passwordForm = document.querySelector('.password-form');
        this.formInputs = document.querySelectorAll('.form-input, .form-select');
        
        // Estado
        this.currentTab = 'loja';
        this.unsavedChanges = false;
        this.autoSaveTimer = null;
        
        // Modais
        this.modals = {};
        
        // Cache de elementos
        this.cacheElements();
    }

    cacheElements() {
        // Cache de elementos frequentemente acessados
        this.elements = {
            progressBar: document.querySelector('.progress-bar'),
            progressPercentage: document.querySelector('.progress-percentage'),
            categoriesList: document.querySelector('.categories-list'),
            paymentMethods: document.querySelector('.payment-methods'),
            shippingMethods: document.querySelector('.shipping-methods'),
            pickupLocations: document.querySelector('.pickup-locations'),
            notificationsList: document.querySelectorAll('.notifications-list'),
            apiKeysList: document.querySelector('.api-keys'),
            webhooksList: document.querySelector('.webhooks-list'),
            integrationsList: document.querySelector('.integrations-list')
        };
    }

    setupEventListeners() {
        // Navegação por abas
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleTabClick(e, button));
        });

        // Toggle switches
        this.initializeToggles();

        // Botão salvar todas
        if (this.saveAllBtn) {
            this.saveAllBtn.addEventListener('click', () => this.saveAllSettings());
        }

        // Botões de edição e adição
        this.initializeActionButtons();

        // Formulário de senha
        if (this.passwordForm) {
            this.passwordForm.addEventListener('submit', (e) => this.handlePasswordChange(e));
            
            // Validação em tempo real
            const passwordInputs = this.passwordForm.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                input.addEventListener('input', () => this.validatePasswordStrength());
                input.addEventListener('input', () => this.checkPasswordMatch());
            });
        }

        // Inputs de formulário - auto-save
        this.formInputs.forEach(input => {
            input.addEventListener('change', () => this.handleInputChange());
            input.addEventListener('keyup', () => this.debounceAutoSave());
        });

        // Prevenir navegação com alterações não salvas
        window.addEventListener('beforeunload', (e) => {
            if (this.unsavedChanges) {
                e.preventDefault();
                e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
            }
        });

        // Tecla ESC para fechar modais
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Clique fora para fechar modais
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Botões de remover categoria (delegação de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-category')) {
                this.removeCategory(e);
            }
        });
    }

    initializeToggles() {
        this.toggleSwitches.forEach(toggle => {
            // Remover event listeners antigos
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('click', (e) => this.handleToggle(e, newToggle));
        });
        
        // Atualizar referência
        this.toggleSwitches = document.querySelectorAll('.toggle-switch');
    }

    initializeActionButtons() {
        // Editar informações básicas
        const editBasicInfo = document.querySelector('[onclick="editSection(\'basic-info\')"]');
        if (editBasicInfo) {
            editBasicInfo.removeAttribute('onclick');
            editBasicInfo.addEventListener('click', () => this.openEditModal('basic-info'));
        }

        // Editar endereço
        const editAddress = document.querySelector('[onclick="editSection(\'address\')"]');
        if (editAddress) {
            editAddress.removeAttribute('onclick');
            editAddress.addEventListener('click', () => this.openEditModal('address'));
        }

        // Editar horário
        const editSchedule = document.querySelector('[onclick="editSection(\'schedule\')"]');
        if (editSchedule) {
            editSchedule.removeAttribute('onclick');
            editSchedule.addEventListener('click', () => this.openEditModal('schedule'));
        }

        // Editar dados bancários
        const editBank = document.querySelector('[onclick="editSection(\'bank\')"]');
        if (editBank) {
            editBank.removeAttribute('onclick');
            editBank.addEventListener('click', () => this.openEditModal('bank'));
        }

        // Botões de adicionar categoria
        const addCategoryBtn = document.querySelector('[onclick="addCategory()"]');
        if (addCategoryBtn) {
            addCategoryBtn.removeAttribute('onclick');
            addCategoryBtn.addEventListener('click', () => this.addCategory());
        }

        // Botões de adicionar método de pagamento
        const addPaymentBtn = document.querySelector('[onclick="addPaymentMethod()"]');
        if (addPaymentBtn) {
            addPaymentBtn.removeAttribute('onclick');
            addPaymentBtn.addEventListener('click', () => this.addPaymentMethod());
        }

        // Botões de adicionar método de entrega
        const addShippingBtn = document.querySelector('[onclick="addShippingMethod()"]');
        if (addShippingBtn) {
            addShippingBtn.removeAttribute('onclick');
            addShippingBtn.addEventListener('click', () => this.addShippingMethod());
        }

        // Botões de adicionar ponto de retirada
        const addPickupBtn = document.querySelector('[onclick="addPickupLocation()"]');
        if (addPickupBtn) {
            addPickupBtn.removeAttribute('onclick');
            addPickupBtn.addEventListener('click', () => this.addPickupLocation());
        }

        // Botões de adicionar webhook
        const addWebhookBtn = document.querySelector('[onclick="addWebhook()"]');
        if (addWebhookBtn) {
            addWebhookBtn.removeAttribute('onclick');
            addWebhookBtn.addEventListener('click', () => this.addWebhook());
        }

        // Botões de gerar chave API
        const generateApiKeyBtn = document.querySelector('[onclick="generateApiKey()"]');
        if (generateApiKeyBtn) {
            generateApiKeyBtn.removeAttribute('onclick');
            generateApiKeyBtn.addEventListener('click', () => this.generateApiKey());
        }

        // Botões de toggle password
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', (e) => this.togglePasswordVisibility(e));
        });
    }

    initializeFormValidations() {
        // Validação de CNPJ
        const cnpjInput = document.querySelector('input[placeholder*="CNPJ"]');
        if (cnpjInput) {
            cnpjInput.addEventListener('input', (e) => this.formatCNPJ(e));
            cnpjInput.addEventListener('blur', (e) => this.validateCNPJ(e));
        }

        // Validação de CEP
        const cepInput = document.querySelector('input[placeholder*="CEP"]');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => this.formatCEP(e));
            cepInput.addEventListener('blur', (e) => this.fetchAddressByCEP(e));
        }

        // Validação de telefone
        const phoneInput = document.querySelector('input[placeholder*="Telefone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhone(e));
        }

        // Validação de e-mail
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', (e) => this.validateEmail(e));
        }
    }

    // ============= GERENCIAMENTO DE CONFIGURAÇÕES =============

    loadSettings() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
            if (saved) {
                return { ...this.defaultSettings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('Erro ao carregar configurações:', error);
        }
        return this.defaultSettings;
    }

    saveSettings() {
        try {
            localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
            this.updateProgress();
            return true;
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            this.showNotification('Erro ao salvar configurações', 'error');
            return false;
        }
    }

    async saveToServer() {
        // Simular salvamento no servidor
        this.showNotification('Sincronizando com o servidor...', 'info');
        
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular sucesso
                this.showNotification('Configurações sincronizadas!', 'success');
                this.unsavedChanges = false;
                resolve(true);
            }, 1500);
        });
    }

    // ============= GERENCIAMENTO DE ABAS =============

    handleTabClick(e, button) {
        e.preventDefault();
        
        // Remover active de todas as abas
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Ativar aba clicada
        button.classList.add('active');
        const tabId = button.dataset.tab;
        const targetPane = document.getElementById(`tab-${tabId}`);
        
        if (targetPane) {
            targetPane.classList.add('active');
            this.currentTab = tabId;
            
            // Atualizar URL sem recarregar
            const url = new URL(window.location);
            url.searchParams.set('tab', tabId);
            window.history.pushState({}, '', url);
            
            // Carregar dados da aba
            this.loadTabData(tabId);
        }
    }

    loadTabData(tabId) {
        switch(tabId) {
            case 'loja':
                this.loadStoreData();
                break;
            case 'pagamentos':
                this.loadPaymentData();
                break;
            case 'entrega':
                this.loadShippingData();
                break;
            case 'notificacoes':
                this.loadNotificationData();
                break;
            case 'seguranca':
                this.loadSecurityData();
                break;
            case 'integracao':
                this.loadIntegrationData();
                break;
        }
    }

    loadStoreData() {
        // Carregar dados da loja
        const store = this.settings.store;
        
        // Atualizar informações exibidas
        this.updateElementText('.info-item:contains("Nome da Loja") p', store.name);
        this.updateElementText('.info-item:contains("CNPJ") p', store.cnpj);
        this.updateElementText('.info-item:contains("Inscrição Estadual") p', store.ie);
        this.updateElementText('.info-item:contains("Telefone") p', store.phone);
        this.updateElementText('.info-item:contains("E-mail") p', store.email);
        this.updateElementText('.info-item:contains("Website") p', store.website);
        
        // Carregar categorias
        this.loadCategories();
        
        // Carregar endereço
        this.loadAddress();
        
        // Carregar horários
        this.loadSchedule();
    }

    loadPaymentData() {
        // Carregar métodos de pagamento
        this.loadPaymentMethods();
        
        // Carregar dados bancários
        this.loadBankData();
        
        // Carregar histórico
        this.loadPaymentHistory();
    }

    loadShippingData() {
        // Carregar métodos de entrega
        this.loadShippingMethods();
        
        // Carregar configuração de frete grátis
        this.loadFreeShippingConfig();
        
        // Carregar pontos de retirada
        this.loadPickupLocations();
    }

    loadNotificationData() {
        // Carregar configurações de notificação
        this.loadNotificationSettings();
    }

    loadSecurityData() {
        // Carregar status de segurança
        this.loadSecuritySettings();
        
        // Carregar dispositivos
        this.loadTrustedDevices();
        
        // Carregar sessões
        this.loadActiveSessions();
    }

    loadIntegrationData() {
        // Carregar integrações
        this.loadIntegrations();
        
        // Carregar webhooks
        this.loadWebhooks();
        
        // Carregar chaves de API
        this.loadApiKeys();
    }

    // ============= FUNÇÕES DE CARREGAMENTO =============

    loadCategories() {
        const container = this.elements.categoriesList;
        if (!container) return;
        
        container.innerHTML = '';
        this.settings.store.categories.forEach(category => {
            const tag = this.createCategoryTag(category);
            container.appendChild(tag);
        });
    }

    loadAddress() {
        const address = this.settings.address;
        
        this.updateElementText('.info-item:contains("Logradouro") p', address.street);
        this.updateElementText('.info-item:contains("Bairro") p', address.neighborhood);
        this.updateElementText('.info-item:contains("Cidade") p', `${address.city} - ${address.state}`);
        this.updateElementText('.info-item:contains("CEP") p', address.zipcode);
        this.updateElementText('.info-item:contains("Complemento") p', address.complement);
    }

    loadSchedule() {
        const schedule = this.settings.schedule;
        const scheduleItems = document.querySelectorAll('.schedule-item');
        
        scheduleItems.forEach(item => {
            const day = item.querySelector('.day').textContent;
            const hoursEl = item.querySelector('.hours');
            
            if (day.includes('Segunda - Sexta')) {
                hoursEl.textContent = schedule.monday_friday.closed ? 'Fechado' : 
                    `${schedule.monday_friday.open} - ${schedule.monday_friday.close}`;
                hoursEl.classList.toggle('closed', schedule.monday_friday.closed);
            } else if (day.includes('Sábado')) {
                hoursEl.textContent = schedule.saturday.closed ? 'Fechado' : 
                    `${schedule.saturday.open} - ${schedule.saturday.close}`;
                hoursEl.classList.toggle('closed', schedule.saturday.closed);
            } else if (day.includes('Domingo')) {
                hoursEl.textContent = schedule.sunday.closed ? 'Fechado' : 'Aberto';
                hoursEl.classList.toggle('closed', schedule.sunday.closed);
            } else if (day.includes('Feriados')) {
                hoursEl.textContent = schedule.holidays.closed ? 'Fechado' : 'Aberto';
                hoursEl.classList.toggle('closed', schedule.holidays.closed);
            }
        });
    }

    loadPaymentMethods() {
        const container = this.elements.paymentMethods;
        if (!container) return;
        
        container.innerHTML = '';
        this.settings.payments.methods.forEach(method => {
            const methodEl = this.createPaymentMethodElement(method);
            container.appendChild(methodEl);
        });
    }

    loadBankData() {
        const bank = this.settings.payments.bank;
        
        const bankNameEl = document.querySelector('.bank-details h4');
        if (bankNameEl) bankNameEl.textContent = bank.bank;
        
        const bankDetailsEl = document.querySelector('.bank-details p');
        if (bankDetailsEl) {
            bankDetailsEl.textContent = `Agência: ${bank.agency} | Conta: ${bank.account}`;
        }
        
        const holderEl = document.querySelectorAll('.bank-details p')[1];
        if (holderEl) holderEl.textContent = `Titular: ${bank.holder}`;
        
        const docEl = document.querySelectorAll('.bank-details p')[2];
        if (docEl) docEl.textContent = `CPF/CNPJ: ${bank.document}`;
        
        const verificationEl = document.querySelector('.bank-verification');
        if (verificationEl) {
            if (bank.verified) {
                verificationEl.classList.add('verified');
                verificationEl.innerHTML = `
                    <i class="bi bi-check-circle-fill"></i>
                    <span>Conta verificada</span>
                `;
            } else {
                verificationEl.classList.remove('verified');
                verificationEl.innerHTML = `
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span>Aguardando verificação</span>
                `;
            }
        }
    }

    loadPaymentHistory() {
        // Simular histórico de pagamentos
        const historyContainer = document.querySelector('.payment-history');
        if (!historyContainer) return;
        
        const payments = [
            { date: '15/05/2025', value: 1250.00, status: 'completed' },
            { date: '08/05/2025', value: 980.00, status: 'completed' },
            { date: '01/05/2025', value: 1450.00, status: 'completed' },
            { date: '24/04/2025', value: 870.00, status: 'completed' }
        ];
        
        historyContainer.innerHTML = '';
        payments.forEach(payment => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-date">${payment.date}</div>
                <div class="history-value">R$ ${payment.value.toFixed(2)}</div>
                <span class="status-badge completed">Pago</span>
            `;
            historyContainer.appendChild(item);
        });
    }

    loadShippingMethods() {
        const container = this.elements.shippingMethods;
        if (!container) return;
        
        container.innerHTML = '';
        this.settings.shipping.methods.forEach(method => {
            const methodEl = this.createShippingMethodElement(method);
            container.appendChild(methodEl);
        });
    }

    loadFreeShippingConfig() {
        const config = this.settings.shipping.freeShipping;
        
        // Ativar/desativar toggle
        const toggle = document.querySelector('.free-shipping-config .toggle-switch');
        if (toggle) {
            toggle.classList.toggle('active', config.enabled);
        }
        
        // Valor mínimo
        const minValueInput = document.querySelector('input[value="199"]');
        if (minValueInput) {
            minValueInput.value = config.minValue;
        }
        
        // Regiões
        const regionsSelect = document.querySelector('.regions-select select');
        if (regionsSelect) {
            Array.from(regionsSelect.options).forEach(option => {
                const state = option.textContent.split(' - ')[1];
                option.selected = config.regions.includes(state);
            });
        }
    }

    loadPickupLocations() {
        const container = this.elements.pickupLocations;
        if (!container) return;
        
        container.innerHTML = '';
        this.settings.shipping.pickupLocations.forEach(location => {
            const locationEl = this.createPickupLocationElement(location);
            container.appendChild(locationEl);
        });
    }

    loadNotificationSettings() {
        const notifications = this.settings.notifications;
        
        // Notificações por e-mail
        Object.entries(notifications.email).forEach(([key, value]) => {
            const item = Array.from(document.querySelectorAll('.notification-item')).find(
                el => el.querySelector('h4')?.textContent.toLowerCase().includes(key.replace('_', ' '))
            );
            
            if (item) {
                const toggle = item.querySelector('.toggle-switch');
                if (toggle) {
                    toggle.classList.toggle('active', value);
                }
            }
        });
        
        // Notificações push
        Object.entries(notifications.push).forEach(([key, value]) => {
            if (key === 'enabled') {
                const toggle = document.querySelector('.notification-item:contains("Notificações push") .toggle-switch');
                if (toggle) toggle.classList.toggle('active', value);
            } else if (key === 'promotions') {
                const toggle = document.querySelector('.notification-item:contains("Alertas de promoções") .toggle-switch');
                if (toggle) toggle.classList.toggle('active', value);
            } else if (key === 'messages') {
                const toggle = document.querySelector('.notification-item:contains("Mensagens de compradores") .toggle-switch');
                if (toggle) toggle.classList.toggle('active', value);
            }
        });
        
        // Limites
        const thresholdInput = document.querySelector('input[value="5"]');
        if (thresholdInput) thresholdInput.value = notifications.limits.low_stock_threshold;
        
        const frequencySelect = document.querySelector('select option[selected]')?.parentElement;
        if (frequencySelect) {
            frequencySelect.value = notifications.limits.report_frequency;
        }
        
        const timeInputs = document.querySelectorAll('input[type="time"]');
        if (timeInputs.length >= 2) {
            timeInputs[0].value = notifications.limits.quiet_hours_start;
            timeInputs[1].value = notifications.limits.quiet_hours_end;
        }
    }

    loadSecuritySettings() {
        const security = this.settings.security;
        
        // Status 2FA
        const twoFactorStatus = document.querySelector('.security-status');
        if (twoFactorStatus) {
            const statusIcon = twoFactorStatus.querySelector('.status-icon');
            const statusTitle = twoFactorStatus.querySelector('h4');
            const statusDesc = twoFactorStatus.querySelector('p');
            
            if (security.twoFactorEnabled) {
                statusIcon.className = 'status-icon verified';
                statusIcon.innerHTML = '<i class="bi bi-shield-check"></i>';
                statusTitle.textContent = 'Autenticação em duas etapas está ativa';
                statusDesc.textContent = 'Sua conta está protegida com 2FA';
                
                const button = twoFactorStatus.nextElementSibling;
                if (button && button.classList.contains('btn')) {
                    button.innerHTML = '<i class="bi bi-shield-slash"></i> Desativar Autenticação';
                }
            } else {
                statusIcon.className = 'status-icon disabled';
                statusIcon.innerHTML = '<i class="bi bi-shield-exclamation"></i>';
                statusTitle.textContent = 'Autenticação em duas etapas está desativada';
                statusDesc.textContent = 'Adicione uma camada extra de segurança à sua conta';
                
                const button = twoFactorStatus.nextElementSibling;
                if (button && button.classList.contains('btn')) {
                    button.innerHTML = '<i class="bi bi-shield-plus"></i> Ativar Autenticação';
                }
            }
        }
    }

    loadTrustedDevices() {
        const devicesContainer = document.querySelector('.security-devices');
        if (!devicesContainer) return;
        
        const devicesList = devicesContainer.querySelector('.device-list') || document.createElement('div');
        devicesList.className = 'device-list';
        
        devicesList.innerHTML = '<h5>Dispositivos confiáveis</h5>';
        
        this.settings.security.trustedDevices.forEach(device => {
            const deviceEl = document.createElement('div');
            deviceEl.className = 'device-item';
            
            const icon = device.type === 'laptop' ? 'bi-laptop' : 
                        device.type === 'phone' ? 'bi-phone' : 'bi-tablet';
            
            deviceEl.innerHTML = `
                <i class="bi ${icon}"></i>
                <div>
                    <p>${device.browser} - ${device.os} ${device.current ? '<span class="device-badge">Este dispositivo</span>' : ''}</p>
                    <small>Último acesso: ${this.formatDate(device.lastAccess)}</small>
                </div>
                ${!device.current ? '<button class="btn-sm btn-text" onclick="window.vendedorConfiguracoes.removeDevice(\'' + device.id + '\')">Remover</button>' : ''}
            `;
            
            devicesList.appendChild(deviceEl);
        });
        
        devicesContainer.appendChild(devicesList);
    }

    loadActiveSessions() {
        const sessionsContainer = document.querySelector('.sessions-list');
        if (!sessionsContainer) return;
        
        sessionsContainer.innerHTML = '';
        
        this.settings.security.activeSessions.forEach(session => {
            const sessionEl = document.createElement('div');
            sessionEl.className = `session-item ${session.current ? 'current' : ''}`;
            
            sessionEl.innerHTML = `
                <i class="bi bi-laptop"></i>
                <div>
                    <p>${session.device} ${session.current ? '<span class="session-badge">Atual</span>' : ''}</p>
                    <small>${session.location} • ${this.formatDate(session.lastActive)}</small>
                </div>
                ${!session.current ? '<button class="btn-sm btn-text" onclick="window.vendedorConfiguracoes.terminateSession(\'' + session.id + '\')">Encerrar</button>' : ''}
            `;
            
            sessionsContainer.appendChild(sessionEl);
        });
    }

    loadIntegrations() {
        const container = this.elements.integrationsList;
        if (!container) return;
        
        container.innerHTML = '';
        
        const integrations = [
            { id: 'facebook', name: 'Facebook Shop', icon: 'bi-facebook', status: this.settings.integrations.facebook },
            { id: 'instagram', name: 'Instagram Shopping', icon: 'bi-instagram', status: this.settings.integrations.instagram },
            { id: 'google', name: 'Google Shopping', icon: 'bi-google', status: this.settings.integrations.google },
            { id: 'whatsapp', name: 'WhatsApp Business', icon: 'bi-whatsapp', status: this.settings.integrations.whatsapp },
            { id: 'amazon', name: 'Amazon', icon: 'bi-amazon', status: this.settings.integrations.amazon },
            { id: 'shopify', name: 'Shopify', icon: 'bi-shop-window', status: this.settings.integrations.shopify }
        ];
        
        integrations.forEach(integration => {
            const item = this.createIntegrationElement(integration);
            container.appendChild(item);
        });
    }

    loadWebhooks() {
        const container = this.elements.webhooksList;
        if (!container) return;
        
        container.innerHTML = '';
        
        this.settings.webhooks.forEach(webhook => {
            const item = this.createWebhookElement(webhook);
            container.appendChild(item);
        });
    }

    loadApiKeys() {
        const container = this.elements.apiKeysList;
        if (!container) return;
        
        container.innerHTML = '';
        
        this.settings.apiKeys.forEach(key => {
            const item = this.createApiKeyElement(key);
            container.appendChild(item);
        });
    }

    // ============= CRIAÇÃO DE ELEMENTOS =============

    createCategoryTag(category) {
        const tag = document.createElement('div');
        tag.className = 'category-tag';
        tag.innerHTML = `
            ${category}
            <button class="remove-category" data-category="${category}">
                <i class="bi bi-x"></i>
            </button>
        `;
        return tag;
    }

    createPaymentMethodElement(method) {
        const div = document.createElement('div');
        div.className = `payment-method ${method.active ? 'active' : ''}`;
        div.dataset.methodId = method.id;
        
        let icons = {
            credit_card: 'bi-credit-card-2-front',
            boleto: 'bi-bank',
            pix: 'bi-wallet2',
            cash: 'bi-currency-dollar'
        };
        
        let descriptions = {
            credit_card: 'Visa, Mastercard, Elo, American Express',
            boleto: `Pagamento em até ${method.days || 3} dias úteis`,
            pix: 'Pagamento instantâneo',
            cash: 'Retirada no local'
        };
        
        div.innerHTML = `
            <div class="method-info">
                <i class="bi ${icons[method.id] || 'bi-credit-card'}"></i>
                <div>
                    <h4>${method.name}</h4>
                    <p>${descriptions[method.id] || ''}</p>
                </div>
            </div>
            <div class="method-actions">
                <span class="status-badge ${method.active ? 'active' : 'inactive'}">
                    ${method.active ? 'Ativo' : 'Inativo'}
                </span>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.togglePaymentMethod('${method.id}')">
                    <i class="bi bi-three-dots"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    createShippingMethodElement(method) {
        const div = document.createElement('div');
        div.className = 'shipping-method';
        div.dataset.methodId = method.id;
        
        let icons = {
            pac: 'bi-truck',
            sedex: 'bi-airplane',
            local: 'bi-bicycle',
            pickup: 'bi-shop'
        };
        
        div.innerHTML = `
            <div class="method-info">
                <i class="bi ${icons[method.id] || 'bi-truck'}"></i>
                <div>
                    <h4>${method.name}</h4>
                    <p>${method.carrier || ''} ${method.days ? `- ${method.days} dias úteis` : ''}</p>
                </div>
            </div>
            <div class="method-price">
                <span>${method.price === 0 ? 'Grátis' : `R$ ${method.price.toFixed(2)}`}</span>
                <div class="toggle-switch ${method.active ? 'active' : ''}" 
                     onclick="window.vendedorConfiguracoes.toggleShippingMethod('${method.id}')">
                </div>
            </div>
        `;
        
        return div;
    }

    createPickupLocationElement(location) {
        const div = document.createElement('div');
        div.className = 'pickup-location';
        div.dataset.locationId = location.id;
        
        div.innerHTML = `
            <div class="location-header">
                <i class="bi bi-shop"></i>
                <h4>${location.name}</h4>
                <span class="status-badge ${location.active ? 'active' : 'inactive'}">
                    ${location.active ? 'Ativo' : 'Inativo'}
                </span>
            </div>
            <p>${location.address}</p>
            <p class="location-schedule">${location.schedule}</p>
            <div class="location-actions">
                <button class="btn-sm btn-outline" onclick="window.vendedorConfiguracoes.editPickupLocation('${location.id}')">
                    Editar
                </button>
                <button class="btn-sm btn-outline" onclick="window.vendedorConfiguracoes.togglePickupLocation('${location.id}')">
                    ${location.active ? 'Desativar' : 'Ativar'}
                </button>
                <button class="btn-sm btn-text" onclick="window.vendedorConfiguracoes.deletePickupLocation('${location.id}')">
                    Excluir
                </button>
            </div>
        `;
        
        return div;
    }

    createIntegrationElement(integration) {
        const div = document.createElement('div');
        div.className = 'integration-item';
        div.dataset.integrationId = integration.id;
        
        let statusClass = '';
        let statusText = '';
        let buttonText = '';
        let buttonClass = '';
        
        if (integration.status.connected) {
            statusClass = 'active';
            statusText = 'Conectado';
            buttonText = 'Configurar';
            buttonClass = 'btn-outline';
        } else if (integration.status.pending) {
            statusClass = 'pending';
            statusText = 'Pendente';
            buttonText = 'Conectar';
            buttonClass = 'btn-primary';
        } else {
            statusClass = 'inactive';
            statusText = 'Desconectado';
            buttonText = 'Conectar';
            buttonClass = 'btn-primary';
        }
        
        div.innerHTML = `
            <div class="integration-logo">
                <i class="bi ${integration.icon}"></i>
            </div>
            <div class="integration-info">
                <h4>${integration.name}</h4>
                <p>${this.getIntegrationDescription(integration.id)}</p>
                <span class="integration-status ${statusClass}">${statusText}</span>
            </div>
            <button class="btn-sm ${buttonClass}" onclick="window.vendedorConfiguracoes.toggleIntegration('${integration.id}')">
                ${buttonText}
            </button>
        `;
        
        return div;
    }

    getIntegrationDescription(integrationId) {
        const descriptions = {
            facebook: 'Sincronize seus produtos com o Facebook',
            instagram: 'Venda diretamente pelo Instagram',
            google: 'Anuncie no Google',
            whatsapp: 'Atenda clientes via WhatsApp',
            amazon: 'Venda seus produtos na Amazon',
            shopify: 'Integre com sua loja Shopify'
        };
        
        return descriptions[integrationId] || '';
    }

    createWebhookElement(webhook) {
        const div = document.createElement('div');
        div.className = 'webhook-item';
        div.dataset.webhookId = webhook.id;
        
        div.innerHTML = `
            <div class="webhook-info">
                <h4>${webhook.name}</h4>
                <p>${webhook.url}</p>
            </div>
            <div class="webhook-events">
                ${webhook.events.map(event => `<span class="event-tag">${event}</span>`).join('')}
            </div>
            <div class="webhook-actions">
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.testWebhook('${webhook.id}')" title="Testar">
                    <i class="bi bi-play-circle"></i>
                </button>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.editWebhook('${webhook.id}')" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.toggleWebhook('${webhook.id}')" title="${webhook.active ? 'Desativar' : 'Ativar'}">
                    <i class="bi bi-power"></i>
                </button>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.deleteWebhook('${webhook.id}')" title="Excluir">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    createApiKeyElement(key) {
        const div = document.createElement('div');
        div.className = 'api-key-item';
        div.dataset.keyId = key.id;
        
        div.innerHTML = `
            <div>
                <h4>${key.name}</h4>
                <p>${key.key}</p>
                <small>Criada em: ${key.createdAt} | Último uso: ${key.lastUsed || 'Nunca'}</small>
            </div>
            <div>
                <span class="status-badge ${key.active ? 'active' : 'inactive'}">
                    ${key.active ? 'Ativa' : 'Inativa'}
                </span>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.toggleApiKey('${key.id}')">
                    <i class="bi bi-power"></i>
                </button>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.regenerateApiKey('${key.id}')">
                    <i class="bi bi-arrow-repeat"></i>
                </button>
                <button class="btn-icon" onclick="window.vendedorConfiguracoes.deleteApiKey('${key.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    // ============= AÇÕES DE CONFIGURAÇÃO =============

    handleToggle(e, toggle) {
        e.stopPropagation();
        toggle.classList.toggle('active');
        
        const isActive = toggle.classList.contains('active');
        const settingName = this.getSettingName(toggle);
        const settingPath = this.getSettingPath(toggle);
        
        if (settingPath) {
            this.updateSetting(settingPath, isActive);
        }
        
        this.unsavedChanges = true;
        this.debounceAutoSave();
        
        this.showNotification(
            `${settingName} ${isActive ? 'ativado' : 'desativado'}`,
            'info'
        );
    }

    togglePaymentMethod(methodId) {
        const method = this.settings.payments.methods.find(m => m.id === methodId);
        if (method) {
            method.active = !method.active;
            
            // Atualizar UI
            const methodEl = document.querySelector(`.payment-method[data-method-id="${methodId}"]`);
            if (methodEl) {
                methodEl.classList.toggle('active', method.active);
                const badge = methodEl.querySelector('.status-badge');
                if (badge) {
                    badge.className = `status-badge ${method.active ? 'active' : 'inactive'}`;
                    badge.textContent = method.active ? 'Ativo' : 'Inativo';
                }
            }
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(
                `Método de pagamento ${method.name} ${method.active ? 'ativado' : 'desativado'}`,
                'success'
            );
        }
    }

    toggleShippingMethod(methodId) {
        const method = this.settings.shipping.methods.find(m => m.id === methodId);
        if (method) {
            method.active = !method.active;
            
            // Atualizar UI
            const methodEl = document.querySelector(`.shipping-method[data-method-id="${methodId}"]`);
            if (methodEl) {
                const toggle = methodEl.querySelector('.toggle-switch');
                if (toggle) {
                    toggle.classList.toggle('active', method.active);
                }
            }
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(
                `Método de entrega ${method.name} ${method.active ? 'ativado' : 'desativado'}`,
                'success'
            );
        }
    }

    togglePickupLocation(locationId) {
        const location = this.settings.shipping.pickupLocations.find(l => l.id === locationId);
        if (location) {
            location.active = !location.active;
            this.loadPickupLocations();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(
                `Ponto de retirada ${location.name} ${location.active ? 'ativado' : 'desativado'}`,
                'success'
            );
        }
    }

    editPickupLocation(locationId) {
        const location = this.settings.shipping.pickupLocations.find(l => l.id === locationId);
        if (location) {
            this.openEditModal('pickup-location', location);
        }
    }

    deletePickupLocation(locationId) {
        if (confirm('Tem certeza que deseja excluir este ponto de retirada?')) {
            this.settings.shipping.pickupLocations = this.settings.shipping.pickupLocations.filter(
                l => l.id !== locationId
            );
            this.loadPickupLocations();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Ponto de retirada excluído com sucesso', 'success');
        }
    }

    toggleIntegration(integrationId) {
        const integration = this.settings.integrations[integrationId];
        if (integration) {
            if (!integration.connected && !integration.pending) {
                // Simular conexão
                integration.connected = true;
                integration.active = true;
                this.showNotification(`Conectando com ${this.getIntegrationName(integrationId)}...`, 'info');
                
                setTimeout(() => {
                    this.loadIntegrations();
                    this.showNotification(`${this.getIntegrationName(integrationId)} conectado com sucesso!`, 'success');
                    this.unsavedChanges = true;
                    this.debounceAutoSave();
                }, 1500);
            } else if (integration.connected) {
                // Abrir configuração
                this.openIntegrationConfig(integrationId);
            }
        }
    }

    getIntegrationName(integrationId) {
        const names = {
            facebook: 'Facebook Shop',
            instagram: 'Instagram Shopping',
            google: 'Google Shopping',
            whatsapp: 'WhatsApp Business',
            amazon: 'Amazon',
            shopify: 'Shopify'
        };
        
        return names[integrationId] || integrationId;
    }

    openIntegrationConfig(integrationId) {
        this.showNotification(`Abrindo configurações do ${this.getIntegrationName(integrationId)}`, 'info');
        // Aqui você abriria um modal de configuração específico
    }

    testWebhook(webhookId) {
        const webhook = this.settings.webhooks.find(w => w.id === webhookId);
        if (webhook) {
            this.showNotification(`Testando webhook: ${webhook.url}...`, 'info');
            
            setTimeout(() => {
                this.showNotification('Webhook testado com sucesso! Resposta: 200 OK', 'success');
            }, 1000);
        }
    }

    editWebhook(webhookId) {
        const webhook = this.settings.webhooks.find(w => w.id === webhookId);
        if (webhook) {
            this.openEditModal('webhook', webhook);
        }
    }

    toggleWebhook(webhookId) {
        const webhook = this.settings.webhooks.find(w => w.id === webhookId);
        if (webhook) {
            webhook.active = !webhook.active;
            this.loadWebhooks();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(
                `Webhook ${webhook.name} ${webhook.active ? 'ativado' : 'desativado'}`,
                'success'
            );
        }
    }

    deleteWebhook(webhookId) {
        if (confirm('Tem certeza que deseja excluir este webhook?')) {
            this.settings.webhooks = this.settings.webhooks.filter(w => w.id !== webhookId);
            this.loadWebhooks();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Webhook excluído com sucesso', 'success');
        }
    }

    toggleApiKey(keyId) {
        const key = this.settings.apiKeys.find(k => k.id === keyId);
        if (key) {
            key.active = !key.active;
            this.loadApiKeys();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(
                `Chave de API ${key.name} ${key.active ? 'ativada' : 'desativada'}`,
                'success'
            );
        }
    }

    regenerateApiKey(keyId) {
        if (confirm('Tem certeza que deseja regenerar esta chave de API? A chave antiga não funcionará mais.')) {
            const key = this.settings.apiKeys.find(k => k.id === keyId);
            if (key) {
                key.key = this.generateRandomKey();
                key.lastUsed = null;
                this.loadApiKeys();
                
                this.unsavedChanges = true;
                this.debounceAutoSave();
                
                this.showNotification('Chave de API regenerada com sucesso!', 'success');
                this.showNotification('ATENÇÃO: Salve a nova chave imediatamente!', 'warning');
            }
        }
    }

    deleteApiKey(keyId) {
        if (confirm('Tem certeza que deseja excluir esta chave de API? Esta ação não pode ser desfeita.')) {
            this.settings.apiKeys = this.settings.apiKeys.filter(k => k.id !== keyId);
            this.loadApiKeys();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Chave de API excluída com sucesso', 'success');
        }
    }

    removeDevice(deviceId) {
        if (confirm('Remover este dispositivo confiável?')) {
            this.settings.security.trustedDevices = this.settings.security.trustedDevices.filter(
                d => d.id !== deviceId
            );
            this.loadTrustedDevices();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Dispositivo removido com sucesso', 'success');
        }
    }

    terminateSession(sessionId) {
        if (confirm('Encerrar esta sessão?')) {
            this.settings.security.activeSessions = this.settings.security.activeSessions.filter(
                s => s.id !== sessionId
            );
            this.loadActiveSessions();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Sessão encerrada com sucesso', 'success');
        }
    }

    // ============= ADIÇÃO DE NOVOS ITENS =============

    addCategory() {
        const modal = this.createModal('Nova Categoria', `
            <div class="form-group">
                <label>Nome da categoria</label>
                <input type="text" class="form-input" id="newCategoryName" placeholder="Ex: Moda Feminina">
            </div>
        `, 'Adicionar', () => {
            const input = document.getElementById('newCategoryName');
            const categoryName = input?.value.trim();
            
            if (categoryName) {
                if (this.settings.store.categories.includes(categoryName)) {
                    this.showNotification('Esta categoria já existe', 'error');
                    return false;
                }
                
                this.settings.store.categories.push(categoryName);
                this.loadCategories();
                
                this.unsavedChanges = true;
                this.debounceAutoSave();
                
                this.showNotification(`Categoria "${categoryName}" adicionada!`, 'success');
                return true;
            } else {
                this.showNotification('Digite um nome para a categoria', 'error');
                return false;
            }
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    addPaymentMethod() {
        const modal = this.createModal('Adicionar Método de Pagamento', `
            <div class="form-group">
                <label>Método de pagamento</label>
                <select class="form-select" id="newPaymentMethod">
                    <option value="pix">PIX</option>
                    <option value="cash">Dinheiro</option>
                    <option value="transfer">Transferência Bancária</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
            <div class="form-group">
                <label>Taxa (opcional)</label>
                <div class="input-group">
                    <span class="input-prefix">R$</span>
                    <input type="number" class="form-input" id="paymentFee" step="0.01" min="0" placeholder="0.00">
                </div>
            </div>
        `, 'Adicionar', () => {
            const select = document.getElementById('newPaymentMethod');
            const fee = document.getElementById('paymentFee')?.value || 0;
            const methodId = select.value;
            
            let methodName = select.options[select.selectedIndex].text;
            let methodConfig = {
                id: methodId,
                name: methodName,
                active: true
            };
            
            if (methodId === 'pix') {
                methodConfig.instant = true;
            }
            
            this.settings.payments.methods.push(methodConfig);
            this.loadPaymentMethods();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(`Método de pagamento ${methodName} adicionado!`, 'success');
            return true;
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    addShippingMethod() {
        const modal = this.createModal('Adicionar Método de Entrega', `
            <div class="form-group">
                <label>Nome do método</label>
                <input type="text" class="form-input" id="shippingName" placeholder="Ex: Entrega Expressa">
            </div>
            <div class="form-group">
                <label>Transportadora</label>
                <input type="text" class="form-input" id="shippingCarrier" placeholder="Ex: Correios, Jadlog...">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Preço (R$)</label>
                    <input type="number" class="form-input" id="shippingPrice" step="0.01" min="0" placeholder="0.00">
                </div>
                <div class="form-group">
                    <label>Prazo (dias)</label>
                    <input type="text" class="form-input" id="shippingDays" placeholder="Ex: 3-5">
                </div>
            </div>
        `, 'Adicionar', () => {
            const name = document.getElementById('shippingName')?.value.trim();
            const carrier = document.getElementById('shippingCarrier')?.value.trim();
            const price = parseFloat(document.getElementById('shippingPrice')?.value) || 0;
            const days = document.getElementById('shippingDays')?.value.trim();
            
            if (!name) {
                this.showNotification('Digite o nome do método de entrega', 'error');
                return false;
            }
            
            const newMethod = {
                id: `method_${Date.now()}`,
                name: name,
                carrier: carrier || 'Própria',
                price: price,
                days: days || '5-10',
                active: true
            };
            
            this.settings.shipping.methods.push(newMethod);
            this.loadShippingMethods();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(`Método de entrega ${name} adicionado!`, 'success');
            return true;
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    addPickupLocation() {
        const modal = this.createModal('Adicionar Ponto de Retirada', `
            <div class="form-group">
                <label>Nome do local</label>
                <input type="text" class="form-input" id="locationName" placeholder="Ex: Loja Principal">
            </div>
            <div class="form-group">
                <label>Endereço completo</label>
                <input type="text" class="form-input" id="locationAddress" placeholder="Rua, número, bairro, cidade...">
            </div>
            <div class="form-group">
                <label>Horário de funcionamento</label>
                <input type="text" class="form-input" id="locationSchedule" placeholder="Ex: Seg a Sex: 09h-18h">
            </div>
        `, 'Adicionar', () => {
            const name = document.getElementById('locationName')?.value.trim();
            const address = document.getElementById('locationAddress')?.value.trim();
            const schedule = document.getElementById('locationSchedule')?.value.trim();
            
            if (!name || !address) {
                this.showNotification('Preencha todos os campos obrigatórios', 'error');
                return false;
            }
            
            const newLocation = {
                id: `loc_${Date.now()}`,
                name: name,
                address: address,
                schedule: schedule || 'Segunda a Sexta: 09h às 18h',
                active: true
            };
            
            this.settings.shipping.pickupLocations.push(newLocation);
            this.loadPickupLocations();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification(`Ponto de retirada ${name} adicionado!`, 'success');
            return true;
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    addWebhook() {
        const modal = this.createModal('Criar Webhook', `
            <div class="form-group">
                <label>Nome do webhook</label>
                <input type="text" class="form-input" id="webhookName" placeholder="Ex: Notificações de pedidos">
            </div>
            <div class="form-group">
                <label>URL de destino</label>
                <input type="url" class="form-input" id="webhookUrl" placeholder="https://api.exemplo.com/webhook">
            </div>
            <div class="form-group">
                <label>Eventos</label>
                <select class="form-select" id="webhookEvents" multiple size="4">
                    <option value="order.created">Pedido criado</option>
                    <option value="order.paid">Pagamento confirmado</option>
                    <option value="order.shipped">Pedido enviado</option>
                    <option value="product.updated">Produto atualizado</option>
                    <option value="inventory.low">Estoque baixo</option>
                </select>
                <p class="field-help">Use Ctrl+Click para selecionar múltiplos</p>
            </div>
        `, 'Criar', () => {
            const name = document.getElementById('webhookName')?.value.trim();
            const url = document.getElementById('webhookUrl')?.value.trim();
            const eventsSelect = document.getElementById('webhookEvents');
            const events = Array.from(eventsSelect.selectedOptions).map(opt => opt.value);
            
            if (!name || !url || events.length === 0) {
                this.showNotification('Preencha todos os campos', 'error');
                return false;
            }
            
            if (!this.isValidUrl(url)) {
                this.showNotification('URL inválida', 'error');
                return false;
            }
            
            const newWebhook = {
                id: `web_${Date.now()}`,
                name: name,
                url: url,
                events: events,
                active: true
            };
            
            this.settings.webhooks.push(newWebhook);
            this.loadWebhooks();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Webhook criado com sucesso!', 'success');
            return true;
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    generateApiKey() {
        const modal = this.createModal('Gerar Nova Chave de API', `
            <div class="form-group">
                <label>Nome da chave</label>
                <input type="text" class="form-input" id="keyName" placeholder="Ex: Chave de Produção">
            </div>
            <div class="form-group">
                <label>Tipo de chave</label>
                <select class="form-select" id="keyType">
                    <option value="production">Produção</option>
                    <option value="test">Teste</option>
                </select>
            </div>
            <div class="api-info" style="margin-top: 1rem;">
                <i class="bi bi-shield-lock"></i>
                <p>A chave será exibida apenas uma vez. Certifique-se de salvá-la em local seguro.</p>
            </div>
        `, 'Gerar', () => {
            const name = document.getElementById('keyName')?.value.trim() || 
                        (document.getElementById('keyType')?.value === 'production' ? 'Chave de Produção' : 'Chave de Teste');
            const type = document.getElementById('keyType')?.value;
            
            const newKey = {
                id: `key_${Date.now()}`,
                name: name,
                key: this.generateRandomKey(),
                active: true,
                createdAt: new Date().toISOString().split('T')[0],
                lastUsed: null
            };
            
            this.settings.apiKeys.push(newKey);
            this.loadApiKeys();
            
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            // Mostrar a chave gerada
            this.showNotification(`Chave gerada: ${newKey.key}`, 'success', 10000);
            return true;
        });
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    // ============= EDIÇÃO DE SEÇÕES =============

    openEditModal(section, data = null) {
        let title = '';
        let content = '';
        let onSave = null;
        
        switch(section) {
            case 'basic-info':
                title = 'Editar Informações Básicas';
                content = this.getBasicInfoForm();
                onSave = () => this.saveBasicInfo();
                break;
            case 'address':
                title = 'Editar Endereço';
                content = this.getAddressForm();
                onSave = () => this.saveAddress();
                break;
            case 'schedule':
                title = 'Editar Horário de Funcionamento';
                content = this.getScheduleForm();
                onSave = () => this.saveSchedule();
                break;
            case 'bank':
                title = 'Editar Dados Bancários';
                content = this.getBankForm();
                onSave = () => this.saveBankData();
                break;
            case 'pickup-location':
                title = 'Editar Ponto de Retirada';
                content = this.getPickupLocationForm(data);
                onSave = () => this.savePickupLocation(data?.id);
                break;
            case 'webhook':
                title = 'Editar Webhook';
                content = this.getWebhookForm(data);
                onSave = () => this.saveWebhook(data?.id);
                break;
            default:
                this.showNotification(`Edição de ${section} não implementada`, 'info');
                return;
        }
        
        const modal = this.createModal(title, content, 'Salvar', onSave);
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
    }

    getBasicInfoForm() {
        const store = this.settings.store;
        return `
            <div class="form-group">
                <label>Nome da Loja</label>
                <input type="text" class="form-input" id="storeName" value="${store.name || ''}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>CNPJ</label>
                    <input type="text" class="form-input" id="storeCnpj" value="${store.cnpj || ''}" placeholder="00.000.000/0000-00">
                </div>
                <div class="form-group">
                    <label>Inscrição Estadual</label>
                    <input type="text" class="form-input" id="storeIe" value="${store.ie || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Telefone</label>
                    <input type="text" class="form-input" id="storePhone" value="${store.phone || ''}" placeholder="(11) 99999-9999">
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" class="form-input" id="storeEmail" value="${store.email || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Website</label>
                <input type="url" class="form-input" id="storeWebsite" value="${store.website || ''}" placeholder="www.minhaloja.com">
            </div>
            <div class="form-group">
                <label>Descrição da Loja</label>
                <textarea class="form-input" id="storeDescription" rows="4" placeholder="Descreva sua loja...">${store.description || ''}</textarea>
            </div>
        `;
    }

    getAddressForm() {
        const address = this.settings.address;
        return `
            <div class="form-group">
                <label>CEP</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" class="form-input" id="addressZipcode" value="${address.zipcode || ''}" placeholder="00000-000">
                    <button type="button" class="btn btn-outline" onclick="window.vendedorConfiguracoes.fetchAddressByCEP(event, true)">
                        <i class="bi bi-search"></i>
                        Buscar
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label>Logradouro</label>
                <input type="text" class="form-input" id="addressStreet" value="${address.street || ''}">
            </div>
            <div class="form-group">
                <label>Número</label>
                <input type="text" class="form-input" id="addressNumber" value="${address.number || ''}">
            </div>
            <div class="form-group">
                <label>Complemento</label>
                <input type="text" class="form-input" id="addressComplement" value="${address.complement || ''}">
            </div>
            <div class="form-group">
                <label>Bairro</label>
                <input type="text" class="form-input" id="addressNeighborhood" value="${address.neighborhood || ''}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Cidade</label>
                    <input type="text" class="form-input" id="addressCity" value="${address.city || ''}">
                </div>
                <div class="form-group">
                    <label>UF</label>
                    <select class="form-select" id="addressState">
                        <option value="AC" ${address.state === 'AC' ? 'selected' : ''}>AC</option>
                        <option value="AL" ${address.state === 'AL' ? 'selected' : ''}>AL</option>
                        <option value="AP" ${address.state === 'AP' ? 'selected' : ''}>AP</option>
                        <option value="AM" ${address.state === 'AM' ? 'selected' : ''}>AM</option>
                        <option value="BA" ${address.state === 'BA' ? 'selected' : ''}>BA</option>
                        <option value="CE" ${address.state === 'CE' ? 'selected' : ''}>CE</option>
                        <option value="DF" ${address.state === 'DF' ? 'selected' : ''}>DF</option>
                        <option value="ES" ${address.state === 'ES' ? 'selected' : ''}>ES</option>
                        <option value="GO" ${address.state === 'GO' ? 'selected' : ''}>GO</option>
                        <option value="MA" ${address.state === 'MA' ? 'selected' : ''}>MA</option>
                        <option value="MT" ${address.state === 'MT' ? 'selected' : ''}>MT</option>
                        <option value="MS" ${address.state === 'MS' ? 'selected' : ''}>MS</option>
                        <option value="MG" ${address.state === 'MG' ? 'selected' : ''}>MG</option>
                        <option value="PA" ${address.state === 'PA' ? 'selected' : ''}>PA</option>
                        <option value="PB" ${address.state === 'PB' ? 'selected' : ''}>PB</option>
                        <option value="PR" ${address.state === 'PR' ? 'selected' : ''}>PR</option>
                        <option value="PE" ${address.state === 'PE' ? 'selected' : ''}>PE</option>
                        <option value="PI" ${address.state === 'PI' ? 'selected' : ''}>PI</option>
                        <option value="RJ" ${address.state === 'RJ' ? 'selected' : ''}>RJ</option>
                        <option value="RN" ${address.state === 'RN' ? 'selected' : ''}>RN</option>
                        <option value="RS" ${address.state === 'RS' ? 'selected' : ''}>RS</option>
                        <option value="RO" ${address.state === 'RO' ? 'selected' : ''}>RO</option>
                        <option value="RR" ${address.state === 'RR' ? 'selected' : ''}>RR</option>
                        <option value="SC" ${address.state === 'SC' ? 'selected' : ''}>SC</option>
                        <option value="SP" ${address.state === 'SP' ? 'selected' : ''}>SP</option>
                        <option value="SE" ${address.state === 'SE' ? 'selected' : ''}>SE</option>
                        <option value="TO" ${address.state === 'TO' ? 'selected' : ''}>TO</option>
                    </select>
                </div>
            </div>
        `;
    }

    getScheduleForm() {
        const schedule = this.settings.schedule;
        return `
            <div class="schedule-edit">
                <div class="form-group">
                    <label>Segunda a Sexta</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="time" class="form-input" id="scheduleMonFriOpen" value="${schedule.monday_friday.open || '09:00'}" ${schedule.monday_friday.closed ? 'disabled' : ''}>
                        <span>às</span>
                        <input type="time" class="form-input" id="scheduleMonFriClose" value="${schedule.monday_friday.close || '18:00'}" ${schedule.monday_friday.closed ? 'disabled' : ''}>
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-left: 1rem;">
                            <input type="checkbox" id="scheduleMonFriClosed" ${schedule.monday_friday.closed ? 'checked' : ''}>
                            Fechado
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Sábado</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <input type="time" class="form-input" id="scheduleSatOpen" value="${schedule.saturday.open || '09:00'}" ${schedule.saturday.closed ? 'disabled' : ''}>
                        <span>às</span>
                        <input type="time" class="form-input" id="scheduleSatClose" value="${schedule.saturday.close || '13:00'}" ${schedule.saturday.closed ? 'disabled' : ''}>
                        <label style="display: flex; align-items: center; gap: 0.5rem; margin-left: 1rem;">
                            <input type="checkbox" id="scheduleSatClosed" ${schedule.saturday.closed ? 'checked' : ''}>
                            Fechado
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Domingo</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="scheduleSunClosed" ${schedule.sunday.closed ? 'checked' : ''}>
                            Fechado
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Feriados</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <label style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" id="scheduleHolidaysClosed" ${schedule.holidays.closed ? 'checked' : ''}>
                            Fechado
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    getBankForm() {
        const bank = this.settings.payments.bank;
        return `
            <div class="form-group">
                <label>Banco</label>
                <select class="form-select" id="bankName">
                    <option value="Banco do Brasil" ${bank.bank === 'Banco do Brasil' ? 'selected' : ''}>Banco do Brasil</option>
                    <option value="Caixa Econômica" ${bank.bank === 'Caixa Econômica' ? 'selected' : ''}>Caixa Econômica</option>
                    <option value="Bradesco" ${bank.bank === 'Bradesco' ? 'selected' : ''}>Bradesco</option>
                    <option value="Itaú" ${bank.bank === 'Itaú' ? 'selected' : ''}>Itaú</option>
                    <option value="Santander" ${bank.bank === 'Santander' ? 'selected' : ''}>Santander</option>
                    <option value="Sicoob" ${bank.bank === 'Sicoob' ? 'selected' : ''}>Sicoob</option>
                    <option value="Sicredi" ${bank.bank === 'Sicredi' ? 'selected' : ''}>Sicredi</option>
                    <option value="Inter" ${bank.bank === 'Inter' ? 'selected' : ''}>Inter</option>
                    <option value="Nubank" ${bank.bank === 'Nubank' ? 'selected' : ''}>Nubank</option>
                    <option value="C6" ${bank.bank === 'C6' ? 'selected' : ''}>C6</option>
                    <option value="Outro" ${!['Banco do Brasil', 'Caixa Econômica', 'Bradesco', 'Itaú', 'Santander', 'Sicoob', 'Sicredi', 'Inter', 'Nubank', 'C6'].includes(bank.bank) ? 'selected' : ''}>Outro</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Agência</label>
                    <input type="text" class="form-input" id="bankAgency" value="${bank.agency || ''}" placeholder="0000-0">
                </div>
                <div class="form-group">
                    <label>Conta</label>
                    <input type="text" class="form-input" id="bankAccount" value="${bank.account || ''}" placeholder="00000-0">
                </div>
            </div>
            <div class="form-group">
                <label>Titular da conta</label>
                <input type="text" class="form-input" id="bankHolder" value="${bank.holder || ''}">
            </div>
            <div class="form-group">
                <label>CPF/CNPJ do titular</label>
                <input type="text" class="form-input" id="bankDocument" value="${bank.document || ''}">
            </div>
            <div class="form-group">
                <label>Tipo de conta</label>
                <select class="form-select" id="bankAccountType">
                    <option value="corrente" ${bank.accountType === 'corrente' ? 'selected' : ''}>Conta Corrente</option>
                    <option value="poupanca" ${bank.accountType === 'poupanca' ? 'selected' : ''}>Conta Poupança</option>
                    <option value="pagamento" ${bank.accountType === 'pagamento' ? 'selected' : ''}>Conta de Pagamento</option>
                </select>
            </div>
        `;
    }

    getPickupLocationForm(location) {
        if (!location) return '';
        
        return `
            <div class="form-group">
                <label>Nome do local</label>
                <input type="text" class="form-input" id="locationName" value="${location.name || ''}">
            </div>
            <div class="form-group">
                <label>Endereço completo</label>
                <textarea class="form-input" id="locationAddress" rows="2">${location.address || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Horário de funcionamento</label>
                <input type="text" class="form-input" id="locationSchedule" value="${location.schedule || ''}">
            </div>
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="locationActive" ${location.active ? 'checked' : ''}>
                    Local ativo
                </label>
            </div>
        `;
    }

    getWebhookForm(webhook) {
        if (!webhook) return '';
        
        const allEvents = ['order.created', 'order.paid', 'order.shipped', 'product.updated', 'inventory.low'];
        
        return `
            <div class="form-group">
                <label>Nome do webhook</label>
                <input type="text" class="form-input" id="webhookName" value="${webhook.name || ''}">
            </div>
            <div class="form-group">
                <label>URL de destino</label>
                <input type="url" class="form-input" id="webhookUrl" value="${webhook.url || ''}">
            </div>
            <div class="form-group">
                <label>Eventos</label>
                <select class="form-select" id="webhookEvents" multiple size="4">
                    ${allEvents.map(event => `
                        <option value="${event}" ${webhook.events?.includes(event) ? 'selected' : ''}>
                            ${this.formatEventName(event)}
                        </option>
                    `).join('')}
                </select>
                <p class="field-help">Use Ctrl+Click para selecionar múltiplos</p>
            </div>
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="webhookActive" ${webhook.active ? 'checked' : ''}>
                    Webhook ativo
                </label>
            </div>
        `;
    }

    formatEventName(event) {
        const names = {
            'order.created': 'Pedido criado',
            'order.paid': 'Pagamento confirmado',
            'order.shipped': 'Pedido enviado',
            'product.updated': 'Produto atualizado',
            'inventory.low': 'Estoque baixo'
        };
        
        return names[event] || event;
    }

    // ============= SALVAMENTO DE EDIÇÕES =============

    saveBasicInfo() {
        const store = this.settings.store;
        
        store.name = document.getElementById('storeName')?.value || store.name;
        store.cnpj = document.getElementById('storeCnpj')?.value || store.cnpj;
        store.ie = document.getElementById('storeIe')?.value || store.ie;
        store.phone = document.getElementById('storePhone')?.value || store.phone;
        store.email = document.getElementById('storeEmail')?.value || store.email;
        store.website = document.getElementById('storeWebsite')?.value || store.website;
        store.description = document.getElementById('storeDescription')?.value || store.description;
        
        this.loadStoreData();
        this.unsavedChanges = true;
        this.debounceAutoSave();
        
        this.showNotification('Informações básicas atualizadas!', 'success');
        return true;
    }

    saveAddress() {
        const address = this.settings.address;
        
        address.zipcode = document.getElementById('addressZipcode')?.value || address.zipcode;
        address.street = document.getElementById('addressStreet')?.value || address.street;
        address.number = document.getElementById('addressNumber')?.value || address.number;
        address.complement = document.getElementById('addressComplement')?.value || address.complement;
        address.neighborhood = document.getElementById('addressNeighborhood')?.value || address.neighborhood;
        address.city = document.getElementById('addressCity')?.value || address.city;
        address.state = document.getElementById('addressState')?.value || address.state;
        
        // Reconstruir logradouro completo
        address.street = `${address.street || ''}${address.number ? `, ${address.number}` : ''}`;
        
        this.loadAddress();
        this.unsavedChanges = true;
        this.debounceAutoSave();
        
        this.showNotification('Endereço atualizado!', 'success');
        return true;
    }

    saveSchedule() {
        const schedule = this.settings.schedule;
        
        // Segunda a Sexta
        const monFriClosed = document.getElementById('scheduleMonFriClosed')?.checked || false;
        schedule.monday_friday.closed = monFriClosed;
        if (!monFriClosed) {
            schedule.monday_friday.open = document.getElementById('scheduleMonFriOpen')?.value || '09:00';
            schedule.monday_friday.close = document.getElementById('scheduleMonFriClose')?.value || '18:00';
        }
        
        // Sábado
        const satClosed = document.getElementById('scheduleSatClosed')?.checked || false;
        schedule.saturday.closed = satClosed;
        if (!satClosed) {
            schedule.saturday.open = document.getElementById('scheduleSatOpen')?.value || '09:00';
            schedule.saturday.close = document.getElementById('scheduleSatClose')?.value || '13:00';
        }
        
        // Domingo
        schedule.sunday.closed = document.getElementById('scheduleSunClosed')?.checked || true;
        
        // Feriados
        schedule.holidays.closed = document.getElementById('scheduleHolidaysClosed')?.checked || true;
        
        this.loadSchedule();
        this.unsavedChanges = true;
        this.debounceAutoSave();
        
        this.showNotification('Horário de funcionamento atualizado!', 'success');
        return true;
    }

    saveBankData() {
        const bank = this.settings.payments.bank;
        
        bank.bank = document.getElementById('bankName')?.value || bank.bank;
        bank.agency = document.getElementById('bankAgency')?.value || bank.agency;
        bank.account = document.getElementById('bankAccount')?.value || bank.account;
        bank.holder = document.getElementById('bankHolder')?.value || bank.holder;
        bank.document = document.getElementById('bankDocument')?.value || bank.document;
        bank.accountType = document.getElementById('bankAccountType')?.value || 'corrente';
        
        this.loadBankData();
        this.unsavedChanges = true;
        this.debounceAutoSave();
        
        this.showNotification('Dados bancários atualizados!', 'success');
        return true;
    }

    savePickupLocation(locationId) {
        const location = this.settings.shipping.pickupLocations.find(l => l.id === locationId);
        if (location) {
            location.name = document.getElementById('locationName')?.value || location.name;
            location.address = document.getElementById('locationAddress')?.value || location.address;
            location.schedule = document.getElementById('locationSchedule')?.value || location.schedule;
            location.active = document.getElementById('locationActive')?.checked || false;
            
            this.loadPickupLocations();
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Ponto de retirada atualizado!', 'success');
            return true;
        }
        return false;
    }

    saveWebhook(webhookId) {
        const webhook = this.settings.webhooks.find(w => w.id === webhookId);
        if (webhook) {
            webhook.name = document.getElementById('webhookName')?.value || webhook.name;
            webhook.url = document.getElementById('webhookUrl')?.value || webhook.url;
            
            const eventsSelect = document.getElementById('webhookEvents');
            if (eventsSelect) {
                webhook.events = Array.from(eventsSelect.selectedOptions).map(opt => opt.value);
            }
            
            webhook.active = document.getElementById('webhookActive')?.checked || false;
            
            this.loadWebhooks();
            this.unsavedChanges = true;
            this.debounceAutoSave();
            
            this.showNotification('Webhook atualizado!', 'success');
            return true;
        }
        return false;
    }

    // ============= FUNÇÕES DE UTILIDADE =============

    createModal(title, content, confirmText, onConfirm) {
        const modalId = `modal_${Date.now()}`;
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = modalId;
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="document.getElementById('${modalId}').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="document.getElementById('${modalId}').remove()">Cancelar</button>
                    <button class="btn btn-primary" id="confirmBtn_${modalId}">${confirmText}</button>
                </div>
            </div>
        `;
        
        // Adicionar event listener ao botão de confirmar
        setTimeout(() => {
            const confirmBtn = document.getElementById(`confirmBtn_${modalId}`);
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    if (onConfirm()) {
                        modal.remove();
                    }
                });
            }
            
            // Configurar checkboxes de horário
            this.setupScheduleCheckboxes(modal);
        }, 10);
        
        return modal;
    }

    setupScheduleCheckboxes(modal) {
        // Segunda a Sexta
        const monFriCheckbox = modal.querySelector('#scheduleMonFriClosed');
        if (monFriCheckbox) {
            monFriCheckbox.addEventListener('change', function() {
                const openInput = modal.querySelector('#scheduleMonFriOpen');
                const closeInput = modal.querySelector('#scheduleMonFriClose');
                if (openInput && closeInput) {
                    openInput.disabled = this.checked;
                    closeInput.disabled = this.checked;
                }
            });
        }
        
        // Sábado
        const satCheckbox = modal.querySelector('#scheduleSatClosed');
        if (satCheckbox) {
            satCheckbox.addEventListener('change', function() {
                const openInput = modal.querySelector('#scheduleSatOpen');
                const closeInput = modal.querySelector('#scheduleSatClose');
                if (openInput && closeInput) {
                    openInput.disabled = this.checked;
                    closeInput.disabled = this.checked;
                }
            });
        }
    }

    handleInputChange() {
        this.unsavedChanges = true;
    }

    debounceAutoSave() {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setTimeout(() => {
            if (this.unsavedChanges) {
                this.autoSave();
            }
        }, 3000);
    }

    autoSave() {
        if (this.saveSettings()) {
            this.showNotification('Alterações salvas automaticamente', 'info');
        }
    }

    saveAllSettings() {
        this.showNotification('Salvando todas as configurações...', 'info');
        
        setTimeout(() => {
            if (this.saveSettings()) {
                this.saveToServer().then(() => {
                    this.showNotification('Todas as configurações foram salvas e sincronizadas!', 'success');
                    this.unsavedChanges = false;
                });
            }
        }, 800);
    }

    updateProgress() {
        const progressBar = this.elements.progressBar;
        const progressPercentage = this.elements.progressPercentage;
        
        if (progressBar && progressPercentage) {
            // Calcular progresso baseado em configurações preenchidas
            let completedSteps = 0;
            let totalSteps = 0;
            
            // Verificar informações básicas
            if (this.settings.store.name && this.settings.store.cnpj) completedSteps++;
            totalSteps++;
            
            // Verificar endereço
            if (this.settings.address.zipcode && this.settings.address.city) completedSteps++;
            totalSteps++;
            
            // Verificar pagamentos
            if (this.settings.payments.bank.verified) completedSteps++;
            totalSteps++;
            
            // Verificar métodos de entrega ativos
            if (this.settings.shipping.methods.some(m => m.active)) completedSteps++;
            totalSteps++;
            
            // Verificar notificações configuradas
            if (Object.values(this.settings.notifications.email).some(v => v === true)) completedSteps++;
            totalSteps++;
            
            const progress = Math.round((completedSteps / totalSteps) * 100);
            
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;
            
            // Atualizar steps
            const steps = document.querySelectorAll('.step');
            if (steps.length >= 5) {
                steps[0].classList.add('completed');
                steps[1].classList.add('completed');
                
                if (completedSteps >= 3) steps[2].classList.add('active');
                if (completedSteps >= 4) steps[3].classList.add('active');
                if (completedSteps >= 5) steps[4].classList.add('active');
            }
            
            // Salvar progresso
            localStorage.setItem(this.STORAGE_KEYS.PROGRESS, progress.toString());
        }
    }

    updateElementText(selector, text) {
        // Função simples para atualizar texto por seletor
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    }

    getSettingName(element) {
        // Tentar encontrar o nome da configuração baseado no contexto
        const parent = element.closest('.notification-item, .config-item, .shipping-method, .payment-method');
        
        if (parent) {
            const title = parent.querySelector('h4, .day, .method-info h4');
            if (title) {
                return title.textContent.trim();
            }
        }
        
        return 'Configuração';
    }

    getSettingPath(element) {
        // Determinar o caminho da configuração para atualizar no objeto settings
        const parent = element.closest('[data-setting-path]');
        return parent?.dataset.settingPath || null;
    }

    updateSetting(path, value) {
        // Atualizar configuração por caminho (ex: 'notifications.email.new_order')
        const parts = path.split('.');
        let current = this.settings;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (current[parts[i]] === undefined) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        
        const lastPart = parts[parts.length - 1];
        current[lastPart] = value;
    }

    // ============= VALIDAÇÕES E FORMATAÇÕES =============

    validatePasswordStrength() {
        const passwordInputs = this.passwordForm?.querySelectorAll('input[type="password"]');
        if (!passwordInputs || passwordInputs.length < 2) return;
        
        const password = passwordInputs[1].value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;
        
        let strength = 0;
        let strengthClass = 'weak';
        let strengthLabel = 'Fraca';
        
        // Verificar comprimento
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        
        // Verificar caracteres
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Determinar força
        if (strength >= 4) {
            strengthClass = 'strong';
            strengthLabel = 'Forte';
        } else if (strength >= 2) {
            strengthClass = 'medium';
            strengthLabel = 'Média';
        }
        
        strengthBar.className = `strength-fill ${strengthClass}`;
        strengthBar.style.width = `${(strength / 5) * 100}%`;
        strengthText.textContent = `Força ${strengthLabel.toLowerCase()}`;
        
        // Atualizar requisitos
        const requirements = document.querySelectorAll('.password-requirements li');
        if (requirements.length >= 4) {
            requirements[0].classList.toggle('met', password.length >= 8);
            requirements[1].classList.toggle('met', /[A-Z]/.test(password));
            requirements[2].classList.toggle('met', /[0-9]/.test(password));
            requirements[3].classList.toggle('met', /[^A-Za-z0-9]/.test(password));
        }
    }

    checkPasswordMatch() {
        const passwordInputs = this.passwordForm?.querySelectorAll('input[type="password"]');
        if (!passwordInputs || passwordInputs.length < 3) return;
        
        const newPassword = passwordInputs[1].value;
        const confirmPassword = passwordInputs[2].value;
        
        if (confirmPassword) {
            if (newPassword === confirmPassword) {
                passwordInputs[2].style.borderColor = 'var(--seller-green)';
            } else {
                passwordInputs[2].style.borderColor = 'var(--status-error)';
            }
        }
    }

    handlePasswordChange(e) {
        e.preventDefault();
        
        const passwordInputs = e.target.querySelectorAll('input[type="password"]');
        const currentPassword = passwordInputs[0]?.value;
        const newPassword = passwordInputs[1]?.value;
        const confirmPassword = passwordInputs[2]?.value;
        
        if (!currentPassword) {
            this.showNotification('Digite sua senha atual', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            this.showNotification('As senhas não coincidem', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            this.showNotification('A senha deve ter no mínimo 8 caracteres', 'error');
            return;
        }
        
        // Simular verificação de senha atual
        if (currentPassword !== '12345678') {
            this.showNotification('Senha atual incorreta', 'error');
            return;
        }
        
        this.showNotification('Senha atualizada com sucesso!', 'success');
        e.target.reset();
        this.unsavedChanges = false;
    }

    formatCNPJ(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 14) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = value;
        }
    }

    validateCNPJ(e) {
        const cnpj = e.target.value.replace(/\D/g, '');
        
        if (cnpj.length !== 14) {
            this.showNotification('CNPJ inválido', 'error');
            e.target.style.borderColor = 'var(--status-error)';
            return false;
        }
        
        // Validação simples de dígitos repetidos
        if (/^(\d)\1+$/.test(cnpj)) {
            this.showNotification('CNPJ inválido', 'error');
            e.target.style.borderColor = 'var(--status-error)';
            return false;
        }
        
        e.target.style.borderColor = 'var(--seller-green)';
        return true;
    }

    formatCEP(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        }
    }

    async fetchAddressByCEP(e, isManual = false) {
        const input = e.target?.closest?.('.form-group')?.querySelector('input') || 
                     document.getElementById('addressZipcode');
        
        if (!input) return;
        
        const cep = input.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            if (isManual) {
                this.showNotification('CEP deve ter 8 dígitos', 'error');
            }
            return;
        }
        
        if (isManual) {
            this.showNotification('Buscando endereço...', 'info');
        }
        
        // Simular busca de CEP
        setTimeout(() => {
            const addressData = {
                '01234567': {
                    street: 'Rua das Flores',
                    neighborhood: 'Centro',
                    city: 'São Paulo',
                    state: 'SP'
                }
            };
            
            const mockAddress = addressData[cep] || {
                street: 'Rua Exemplo',
                neighborhood: 'Bairro Exemplo',
                city: 'Cidade Exemplo',
                state: 'SP'
            };
            
            const streetInput = document.getElementById('addressStreet');
            const neighborhoodInput = document.getElementById('addressNeighborhood');
            const cityInput = document.getElementById('addressCity');
            const stateSelect = document.getElementById('addressState');
            
            if (streetInput) streetInput.value = mockAddress.street;
            if (neighborhoodInput) neighborhoodInput.value = mockAddress.neighborhood;
            if (cityInput) cityInput.value = mockAddress.city;
            if (stateSelect) stateSelect.value = mockAddress.state;
            
            if (isManual) {
                this.showNotification('Endereço encontrado!', 'success');
            }
        }, 800);
    }

    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            }
            if (value.length > 10) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        }
    }

    validateEmail(e) {
        const email = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!regex.test(email)) {
            this.showNotification('E-mail inválido', 'error');
            e.target.style.borderColor = 'var(--status-error)';
            return false;
        }
        
        e.target.style.borderColor = 'var(--seller-green)';
        return true;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    generateRandomKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = 'reuse_';
        for (let i = 0; i < 32; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // ============= TOGGLE PASSWORD =============

    togglePasswordVisibility(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const input = button.previousElementSibling;
        
        if (input && input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else if (input) {
            input.type = 'password';
            button.innerHTML = '<i class="bi bi-eye"></i>';
        }
    }

    // ============= NOTIFICAÇÕES =============

    showNotification(message, type = 'info', duration = null) {
        // Remover notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        if (type === 'warning') iconClass = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : 
                       type === 'warning' ? '#ffa502' : '#0066cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500',
            maxWidth: '400px'
        });
        
        // Estilo do botão fechar
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.style.background = 'rgba(255,255,255,0.2)';
            closeBtn.style.border = 'none';
            closeBtn.style.color = 'white';
            closeBtn.style.width = '24px';
            closeBtn.style.height = '24px';
            closeBtn.style.borderRadius = '50%';
            closeBtn.style.display = 'flex';
            closeBtn.style.alignItems = 'center';
            closeBtn.style.justifyContent = 'center';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.marginLeft = 'auto';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration || this.NOTIFICATION_DURATION);
    }

    // ============= FECHAMENTO DE MODAIS =============

    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    // ============= CARREGAMENTO INICIAL =============

    loadSettingsData() {
        this.loadTabFromUrl();
        this.checkSetupProgress();
        this.loadStoreData();
        this.loadPaymentData();
        this.loadShippingData();
        this.loadNotificationData();
        this.loadSecurityData();
        this.loadIntegrationData();
    }

    loadTabFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        
        if (tabParam) {
            const targetButton = Array.from(this.tabButtons).find(
                btn => btn.dataset.tab === tabParam
            );
            
            if (targetButton) {
                setTimeout(() => {
                    targetButton.click();
                }, 100);
            }
        }
    }

    checkSetupProgress() {
        this.updateProgress();
    }

    // ============= INTEGRAÇÃO COM LOGOUT =============

    setupIntegration() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.vendedorInicio) {
                    window.vendedorInicio.openLogoutModal();
                }
            });
        }
    }
}

// ============= INICIALIZAÇÃO =============

document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos de animação se não existirem
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
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
            
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 9999;
                align-items: center;
                justify-content: center;
            }
            
            .modal.active {
                display: flex;
            }
            
            .modal-content {
                background: var(--card-bg);
                border-radius: var(--border-radius-lg);
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideInUp 0.3s ease;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--light-gray-2);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid var(--light-gray-2);
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-close {
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.3) !important;
                transform: scale(1.1);
            }
            
            @media (max-width: 768px) {
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .modal-content {
                    width: 95%;
                    margin: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar configurações
    window.vendedorConfiguracoes = new VendedorConfiguracoes();
    window.vendedorConfiguracoes.setupIntegration();
});

// ============= FUNÇÕES GLOBAIS =============

window.editSection = function(section) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.openEditModal(section);
    }
};

window.addCategory = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.addCategory();
    }
};

window.addPaymentMethod = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.addPaymentMethod();
    }
};

window.addShippingMethod = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.addShippingMethod();
    }
};

window.addPickupLocation = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.addPickupLocation();
    }
};

window.addWebhook = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.addWebhook();
    }
};

window.generateApiKey = function() {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.generateApiKey();
    }
};

window.togglePassword = function(button) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.togglePasswordVisibility({ currentTarget: button });
    }
};

// Sobrescrever funções específicas para garantir que usem a instância
window.vendedorConfiguracoes.togglePaymentMethod = function(methodId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.togglePaymentMethod(methodId);
    }
};

window.vendedorConfiguracoes.toggleShippingMethod = function(methodId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.toggleShippingMethod(methodId);
    }
};

window.vendedorConfiguracoes.editPickupLocation = function(locationId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.editPickupLocation(locationId);
    }
};

window.vendedorConfiguracoes.togglePickupLocation = function(locationId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.togglePickupLocation(locationId);
    }
};

window.vendedorConfiguracoes.deletePickupLocation = function(locationId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.deletePickupLocation(locationId);
    }
};

window.vendedorConfiguracoes.toggleIntegration = function(integrationId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.toggleIntegration(integrationId);
    }
};

window.vendedorConfiguracoes.testWebhook = function(webhookId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.testWebhook(webhookId);
    }
};

window.vendedorConfiguracoes.editWebhook = function(webhookId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.editWebhook(webhookId);
    }
};

window.vendedorConfiguracoes.toggleWebhook = function(webhookId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.toggleWebhook(webhookId);
    }
};

window.vendedorConfiguracoes.deleteWebhook = function(webhookId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.deleteWebhook(webhookId);
    }
};

window.vendedorConfiguracoes.toggleApiKey = function(keyId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.toggleApiKey(keyId);
    }
};

window.vendedorConfiguracoes.regenerateApiKey = function(keyId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.regenerateApiKey(keyId);
    }
};

window.vendedorConfiguracoes.deleteApiKey = function(keyId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.deleteApiKey(keyId);
    }
};

window.vendedorConfiguracoes.removeDevice = function(deviceId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.removeDevice(deviceId);
    }
};

window.vendedorConfiguracoes.terminateSession = function(sessionId) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.terminateSession(sessionId);
    }
};

window.vendedorConfiguracoes.fetchAddressByCEP = function(e, isManual) {
    if (window.vendedorConfiguracoes) {
        window.vendedorConfiguracoes.fetchAddressByCEP(e, isManual);
    }
};