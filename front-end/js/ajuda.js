// ajuda.js - Script completo e atualizado para a página de ajuda

document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIÁVEIS GLOBAIS =====
    let isFormSubmitting = false;
    let currentActiveSection = null;
    const SCROLL_OFFSET = 120;
    
    // ===== INICIALIZAÇÃO =====
    function initAll() {
        console.log('🚀 Inicializando página de ajuda ReUse...');
        
        // Adicionar animações CSS dinâmicas
        addDynamicStyles();
        
        // Inicializar componentes
        initSmoothNavigation();
        initContactForm();
        initFAQInteractions();
        initScrollAnimations();
        initHelpSearch();
        initStatsAnimation();
        initChatOnline();
        initThemeListeners();
        
        // Configurar eventos globais
        setupGlobalEvents();
        
        // Inicializar animações
        initAnimations();
        
        console.log('✅ Página de ajuda inicializada com sucesso!');
    }
    
    // ===== ANIMAÇÕES CSS DINÂMICAS =====
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.id = 'dynamic-help-styles';
        style.textContent = `
            /* Animações dinâmicas */
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.8;
                }
            }
            
            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                33% {
                    transform: translateY(-10px) rotate(5deg);
                }
                66% {
                    transform: translateY(5px) rotate(-5deg);
                }
            }
            
            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 5px rgba(0, 102, 204, 0.3);
                }
                50% {
                    box-shadow: 0 0 20px rgba(0, 102, 204, 0.6);
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
            
            @keyframes typing {
                from { width: 0 }
                to { width: 100% }
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .animate-fade-in {
                animation: fadeIn 0.6s ease forwards;
            }
            
            .animate-slide-up {
                animation: slideInUp 0.6s ease forwards;
            }
            
            .animate-slide-down {
                animation: slideInDown 0.6s ease forwards;
            }
            
            .animate-slide-left {
                animation: slideInLeft 0.6s ease forwards;
            }
            
            .animate-slide-right {
                animation: slideInRight 0.6s ease forwards;
            }
            
            .animate-pulse {
                animation: pulse 2s infinite;
            }
            
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            
            .animate-bounce {
                animation: bounce 2s infinite;
            }
            
            .animate-glow {
                animation: glow 3s infinite;
            }
            
            .search-highlight {
                background: linear-gradient(120deg, #fff3cd 0%, #ffeaa7 100%);
                color: #856404;
                padding: 0.1rem 0.3rem;
                border-radius: 4px;
                font-weight: 600;
                box-shadow: 0 2px 4px rgba(133, 100, 4, 0.1);
                transition: all 0.3s ease;
            }
            
            body.dark-mode .search-highlight {
                background: linear-gradient(120deg, #ffd54f 0%, #ffca28 100%);
                color: #212529;
            }
            
            .ripple-effect {
                position: relative;
                overflow: hidden;
            }
            
            .ripple-effect::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.5);
                opacity: 0;
                border-radius: 100%;
                transform: scale(1, 1) translate(-50%);
                transform-origin: 50% 50%;
            }
            
            .ripple-effect:focus:not(:active)::after {
                animation: ripple 1s ease-out;
            }
            
            .typing-effect {
                overflow: hidden;
                white-space: nowrap;
                animation: typing 3.5s steps(40, end);
            }
            
            .blink-effect {
                animation: blink 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== NAVEGAÇÃO SUAVE =====
    function initSmoothNavigation() {
        // Navegação por categoria
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Atualizar categoria ativa
                    updateActiveCategory(this);
                    
                    // Scroll suave
                    smoothScrollTo(targetElement);
                    
                    // Adicionar efeito visual
                    this.classList.add('clicked');
                    setTimeout(() => this.classList.remove('clicked'), 300);
                }
            });
        });
        
        // Navegação do footer
        document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    smoothScrollTo(targetElement);
                    
                    // Atualizar categoria correspondente
                    const correspondingCategory = document.querySelector(`.category-btn[href="${targetId}"]`);
                    if (correspondingCategory) {
                        updateActiveCategory(correspondingCategory);
                    }
                }
            });
        });
    }
    
    function updateActiveCategory(activeBtn) {
        // Remover classe active de todos os botões
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'translateY(0)';
        });
        
        // Adicionar classe active ao botão clicado
        activeBtn.classList.add('active');
        activeBtn.style.transform = 'translateY(-3px)';
        
        // Efeito visual
        activeBtn.style.boxShadow = 'var(--shadow-lg), 0 0 20px rgba(0, 102, 204, 0.4)';
        
        // Atualizar seção ativa
        currentActiveSection = activeBtn.getAttribute('href').substring(1);
    }
    
    function smoothScrollTo(element) {
        const targetPosition = element.offsetTop - SCROLL_OFFSET;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        // Cancelar scroll anterior se existir
        if (window.scrollAnimation) {
            cancelAnimationFrame(window.scrollAnimation);
        }
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function personalizada
            const ease = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                window.scrollAnimation = requestAnimationFrame(animation);
            } else {
                window.scrollAnimation = null;
            }
        }
        
        window.scrollAnimation = requestAnimationFrame(animation);
    }
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // ===== FORMULÁRIO DE CONTATO =====
    function initContactForm() {
        const formContato = document.getElementById('formContato');
        if (!formContato) return;
        
        // Elementos do formulário
        const formElements = {
            nome: document.getElementById('nome'),
            email: document.getElementById('email'),
            assunto: document.getElementById('assunto'),
            mensagem: document.getElementById('mensagem'),
            submitBtn: formContato.querySelector('.btn-submit')
        };
        
        // Elementos de erro
        const errorElements = {
            nome: document.getElementById('nomeError'),
            email: document.getElementById('emailError'),
            assunto: document.getElementById('assuntoError'),
            mensagem: document.getElementById('mensagemError')
        };
        
        // Configurações de validação
        const validationRules = {
            nome: {
                required: true,
                minLength: 3,
                maxLength: 100,
                pattern: /^[A-Za-zÀ-ÿ\s']+$/,
                messages: {
                    required: 'Por favor, digite seu nome completo',
                    minLength: 'O nome deve ter pelo menos 3 caracteres',
                    maxLength: 'O nome não pode exceder 100 caracteres',
                    pattern: 'O nome deve conter apenas letras e espaços'
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                messages: {
                    required: 'Por favor, digite seu e-mail',
                    pattern: 'Por favor, digite um e-mail válido (exemplo: nome@email.com)'
                }
            },
            assunto: {
                required: true,
                messages: {
                    required: 'Por favor, selecione um assunto'
                }
            },
            mensagem: {
                required: true,
                minLength: 20,
                maxLength: 2000,
                messages: {
                    required: 'Por favor, digite sua mensagem',
                    minLength: 'A mensagem deve ter pelo menos 20 caracteres',
                    maxLength: 'A mensagem não pode exceder 2000 caracteres'
                }
            }
        };
        
        // Inicializar contador de caracteres
        initCharCounter(formElements.mensagem);
        
        // Configurar validação em tempo real
        setupRealTimeValidation(formElements, errorElements, validationRules);
        
        // Configurar auto-salvamento
        setupAutoSave(formElements);
        
        // Evento de envio do formulário
        formContato.addEventListener('submit', async function(e) {
            e.preventDefault();
            await handleFormSubmission(formElements, errorElements, validationRules);
        });
        
        // Limpar formulário com Ctrl+Shift+C
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                clearForm(formElements, errorElements);
                showNotification('Formulário limpo com sucesso!', 'info');
            }
        });
    }
    
    function initCharCounter(textarea) {
        if (!textarea) return;
        
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.textContent = '0/2000';
        counter.style.marginTop = '0.5rem';
        counter.style.fontSize = '0.85rem';
        counter.style.color = 'var(--text-lighter)';
        counter.style.transition = 'color 0.3s ease';
        
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/2000`;
            
            // Atualizar cores baseado no comprimento
            counter.classList.remove('warning', 'error', 'success');
            
            if (length === 0) {
                counter.style.color = 'var(--text-lighter)';
            } else if (length < 20) {
                counter.style.color = 'var(--primary-red)';
                counter.classList.add('error');
            } else if (length < 100) {
                counter.style.color = 'var(--primary-orange)';
                counter.classList.add('warning');
            } else if (length >= 100 && length < 1800) {
                counter.style.color = 'var(--primary-green)';
                counter.classList.add('success');
            } else if (length >= 1800) {
                counter.style.color = 'var(--primary-red)';
                counter.classList.add('error');
            }
        });
        
        // Inicializar contador
        textarea.dispatchEvent(new Event('input'));
    }
    
    function setupRealTimeValidation(elements, errors, rules) {
        Object.keys(elements).forEach(key => {
            if (elements[key] && elements[key].tagName !== 'BUTTON') {
                // Validação on blur
                elements[key].addEventListener('blur', function() {
                    validateField(key, elements[key], errors[key], rules[key]);
                });
                
                // Feedback visual on input
                elements[key].addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.add('touched');
                    }
                    
                    // Limpar erro quando o usuário começa a digitar
                    if (errors[key]) {
                        errors[key].classList.remove('show');
                        this.classList.remove('error');
                    }
                });
            }
        });
    }
    
    function setupAutoSave(elements) {
        const STORAGE_KEY = 'ajuda_form_draft';
        
        // Carregar rascunho salvo
        const savedDraft = localStorage.getItem(STORAGE_KEY);
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                Object.keys(elements).forEach(key => {
                    if (elements[key] && draft[key]) {
                        elements[key].value = draft[key];
                        
                        // Disparar evento input para atualizar contadores
                        elements[key].dispatchEvent(new Event('input'));
                    }
                });
                
                // Mostrar notificação de rascunho carregado
                setTimeout(() => {
                    showNotification('Rascunho anterior carregado. Continue de onde parou!', 'info');
                }, 1000);
            } catch (e) {
                console.warn('Não foi possível carregar o rascunho:', e);
            }
        }
        
        // Salvar rascunho automaticamente
        const saveDraft = debounce(function() {
            const draft = {};
            Object.keys(elements).forEach(key => {
                if (elements[key] && elements[key].tagName !== 'BUTTON') {
                    draft[key] = elements[key].value;
                }
            });
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        }, 1000);
        
        // Adicionar eventos de salvamento
        Object.keys(elements).forEach(key => {
            if (elements[key] && elements[key].tagName !== 'BUTTON') {
                elements[key].addEventListener('input', saveDraft);
            }
        });
    }
    
    function validateField(fieldName, input, errorElement, rules) {
        if (!rules) return true;
        
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Verificar campo obrigatório
        if (rules.required && !value) {
            isValid = false;
            errorMessage = rules.messages.required;
        }
        
        // Verificar comprimento mínimo
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.messages.minLength;
        }
        
        // Verificar comprimento máximo
        if (isValid && rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = rules.messages.maxLength;
        }
        
        // Verificar padrão (regex)
        if (isValid && rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.messages.pattern;
        }
        
        // Aplicar feedback visual
        if (isValid) {
            showFieldSuccess(input, errorElement);
        } else {
            showFieldError(input, errorElement, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(input, errorElement, message) {
        // Remover estados anteriores
        input.classList.remove('valid', 'success');
        input.classList.add('error');
        
        // Adicionar efeito shake
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.5s ease';
        }, 10);
        
        // Mostrar mensagem de erro
        if (errorElement) {
            errorElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${message}`;
            errorElement.classList.add('show');
            
            // Animar entrada da mensagem
            errorElement.style.animation = 'slideInDown 0.3s ease';
        }
    }
    
    function showFieldSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid', 'success');
        
        // Efeito visual
        input.style.boxShadow = '0 0 0 3px rgba(0, 204, 153, 0.1)';
        
        // Limpar mensagem de erro
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    async function handleFormSubmission(elements, errors, rules) {
        if (isFormSubmitting) {
            showNotification('Aguarde, já estamos processando seu envio...', 'warning');
            return;
        }
        
        // Validar todos os campos
        const validations = Object.keys(elements)
            .filter(key => elements[key].tagName !== 'BUTTON')
            .map(key => validateField(key, elements[key], errors[key], rules[key]));
        
        const allValid = validations.every(valid => valid === true);
        
        if (!allValid) {
            showNotification('Por favor, corrija os erros destacados no formulário.', 'error');
            
            // Rolar para o primeiro erro
            const firstErrorField = Object.keys(elements).find(key => 
                elements[key].classList.contains('error')
            );
            if (firstErrorField && elements[firstErrorField]) {
                elements[firstErrorField].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                elements[firstErrorField].focus();
            }
            
            return;
        }
        
        // Preparar dados para envio
        const formData = {
            nome: elements.nome.value.trim(),
            email: elements.email.value.trim(),
            assunto: elements.assunto.value,
            mensagem: elements.mensagem.value.trim(),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            pageUrl: window.location.href
        };
        
        // Iniciar processo de envio
        isFormSubmitting = true;
        setFormSubmittingState(elements.submitBtn, true);
        
        try {
            // Simular envio para API
            const response = await simulateApiSubmit(formData);
            
            if (response.success) {
                // Sucesso!
                showFormSuccessAnimation();
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Limpar rascunho salvo
                localStorage.removeItem('ajuda_form_draft');
                
                // Resetar formulário após delay
                setTimeout(() => {
                    clearForm(elements, errors);
                    showConfettiEffect();
                    
                    // Atualizar estatísticas
                    updateHelpStats();
                    
                    isFormSubmitting = false;
                    setFormSubmittingState(elements.submitBtn, false);
                }, 2000);
            } else {
                throw new Error(response.message || 'Erro ao processar sua mensagem');
            }
        } catch (error) {
            console.error('Erro no envio:', error);
            
            // Tentar novamente
            const shouldRetry = confirm('Não foi possível enviar sua mensagem. Deseja tentar novamente?');
            
            if (shouldRetry) {
                setTimeout(() => {
                    handleFormSubmission(elements, errors, rules);
                }, 1000);
            } else {
                showNotification('Mensagem salva como rascunho. Você pode tentar novamente mais tarde.', 'warning');
                isFormSubmitting = false;
                setFormSubmittingState(elements.submitBtn, false);
            }
        }
    }
    
    function setFormSubmittingState(button, isSubmitting) {
        if (!button) return;
        
        if (isSubmitting) {
            button.disabled = true;
            button.classList.add('processing');
            button.innerHTML = `
                <span class="spinner">
                    <i class="bi bi-arrow-clockwise"></i>
                </span>
                Enviando sua mensagem...
            `;
            
            // Efeito de progresso
            const progressBar = document.createElement('div');
            progressBar.className = 'submit-progress';
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--primary-green);
                width: 0%;
                border-radius: 0 0 var(--border-radius-xl) var(--border-radius-xl);
                transition: width 2s ease;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(progressBar);
            
            // Animar barra de progresso
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 100);
            
        } else {
            button.disabled = false;
            button.classList.remove('processing');
            button.innerHTML = '<i class="bi bi-send"></i> Enviar Mensagem';
            
            // Remover barra de progresso
            const progressBar = button.querySelector('.submit-progress');
            if (progressBar) progressBar.remove();
        }
    }
    
    async function simulateApiSubmit(formData) {
        return new Promise((resolve, reject) => {
            // Simular latência de rede
            const latency = 500 + Math.random() * 1000;
            
            setTimeout(() => {
                // Simular 95% de chance de sucesso
                const shouldSucceed = Math.random() > 0.05;
                
                if (shouldSucceed) {
                    resolve({
                        success: true,
                        message: 'Mensagem recebida com sucesso',
                        id: `MSG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        timestamp: new Date().toISOString(),
                        estimatedResponseTime: '24 horas'
                    });
                } else {
                    // Simular diferentes tipos de erro
                    const errors = [
                        'Falha na conexão com o servidor',
                        'Tempo limite excedido',
                        'Erro de validação no servidor',
                        'Serviço temporariamente indisponível'
                    ];
                    reject(new Error(errors[Math.floor(Math.random() * errors.length)]));
                }
            }, latency);
        });
    }
    
    function showFormSuccessAnimation() {
        const formContato = document.getElementById('formContato');
        if (!formContato) return;
        
        // Criar overlay de sucesso
        const successOverlay = document.createElement('div');
        successOverlay.className = 'form-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-checkmark">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>
            <div class="success-message">
                <h3><i class="bi bi-check-circle-fill"></i> Mensagem Enviada!</h3>
                <p>Sua mensagem foi enviada com sucesso. Entraremos em contato em até 24 horas úteis.</p>
                <p class="success-id">ID do envio: <span>MSG_${Date.now()}</span></p>
            </div>
        `;
        
        // Estilos dinâmicos
        Object.assign(successOverlay.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--border-radius-xl)',
            zIndex: '10',
            opacity: '0',
            transform: 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Adicionar ao formulário
        formContato.style.position = 'relative';
        formContato.appendChild(successOverlay);
        
        // Animar entrada
        setTimeout(() => {
            successOverlay.style.opacity = '1';
            successOverlay.style.transform = 'scale(1)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            successOverlay.style.opacity = '0';
            successOverlay.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (successOverlay.parentNode) {
                    successOverlay.parentNode.removeChild(successOverlay);
                }
            }, 500);
        }, 3000);
    }
    
    function clearForm(elements, errors) {
        Object.keys(elements).forEach(key => {
            if (elements[key] && elements[key].tagName !== 'BUTTON') {
                elements[key].value = '';
                elements[key].classList.remove('error', 'valid', 'success', 'touched');
                
                // Disparar evento input para resetar contadores
                elements[key].dispatchEvent(new Event('input'));
            }
        });
        
        // Limpar mensagens de erro
        Object.keys(errors).forEach(key => {
            if (errors[key]) {
                errors[key].textContent = '';
                errors[key].classList.remove('show');
            }
        });
        
        // Resetar select
        const assuntoSelect = document.getElementById('assunto');
        if (assuntoSelect) {
            assuntoSelect.selectedIndex = 0;
        }
    }
    
    // ===== INTERAÇÕES FAQ =====
    function initFAQInteractions() {
        document.querySelectorAll('.faq-item').forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta');
            const resposta = item.querySelector('.faq-resposta');
            
            if (!pergunta || !resposta) return;
            
            // Expandir/colapsar ao clicar
            pergunta.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros
                document.querySelectorAll('.faq-item.active').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-resposta').style.maxHeight = '0';
                    }
                });
                
                // Alternar estado atual
                if (!isActive) {
                    item.classList.add('active');
                    resposta.style.maxHeight = resposta.scrollHeight + 'px';
                    
                    // Efeito visual
                    item.style.transform = 'translateY(-5px) scale(1.02)';
                    setTimeout(() => {
                        item.style.transform = 'translateY(-10px) scale(1.02)';
                    }, 50);
                } else {
                    item.classList.remove('active');
                    resposta.style.maxHeight = '0';
                    item.style.transform = 'translateY(0) scale(1)';
                }
                
                // Animar ícone
                const icon = pergunta.querySelector('i');
                if (icon) {
                    icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(45deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            // Efeito hover
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Expandir primeira FAQ por padrão
        const firstFaq = document.querySelector('.faq-item');
        if (firstFaq) {
            setTimeout(() => {
                firstFaq.classList.add('active');
                const resposta = firstFaq.querySelector('.faq-resposta');
                if (resposta) {
                    resposta.style.maxHeight = resposta.scrollHeight + 'px';
                }
            }, 1000);
        }
    }
    
    // ===== ANIMAÇÕES DE SCROLL =====
    function initScrollAnimations() {
        // Observer para elementos com data-animate
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Adicionar delay baseado na posição
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    
                    // Parar de observar após animação
                    animateObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observer para cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Aplicar observadores
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            animateObserver.observe(el);
        });
        
        document.querySelectorAll('.faq-item, .contato-card, .processo-card, .dica-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            cardObserver.observe(el);
        });
        
        // Atualizar categoria ativa ao rolar
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveCategoryOnScroll, 150);
        });
    }
    
    function updateActiveCategoryOnScroll() {
        const sections = document.querySelectorAll('.secao-ajuda');
        const scrollPosition = window.scrollY + SCROLL_OFFSET;
        
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        if (currentSection && currentSection !== currentActiveSection) {
            const correspondingBtn = document.querySelector(`.category-btn[href="#${currentSection}"]`);
            if (correspondingBtn) {
                updateActiveCategory(correspondingBtn);
            }
        }
    }
    
    // ===== BUSCA NA AJUDA =====
    function initHelpSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;
        
        // Placeholder animado
        const placeholders = [
            'Como criar uma conta?',
            'Política de devolução',
            'Prazo de entrega',
            'Formas de pagamento',
            'Como vender produtos?'
        ];
        
        let placeholderIndex = 0;
        
        function rotatePlaceholder() {
            searchInput.placeholder = `Pesquisar: ${placeholders[placeholderIndex]}...`;
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
        }
        
        // Rotação automática a cada 3 segundos
        setInterval(rotatePlaceholder, 3000);
        rotatePlaceholder();
        
        // Busca em tempo real
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.trim().toLowerCase();
            
            if (searchTerm.length === 0) {
                resetSearch();
                return;
            }
            
            // Mostrar indicador de busca
            showSearchIndicator(searchTerm);
            
            // Realizar busca
            performSearch(searchTerm);
        }, 300));
        
        // Atalhos de teclado
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                resetSearch();
                this.value = '';
                this.blur();
            }
            
            if (e.key === 'Enter' && this.value.trim()) {
                e.preventDefault();
                performSearch(this.value.trim().toLowerCase());
            }
            
            // Ctrl+K para focar na busca
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.focus();
                this.select();
            }
        });
        
        // Foco automático em telas grandes
        if (window.innerWidth > 768) {
            setTimeout(() => {
                searchInput.focus();
            }, 1000);
        }
    }
    
    function showSearchIndicator(term) {
        // Remover indicador anterior
        const existingIndicator = document.querySelector('.search-indicator');
        if (existingIndicator) existingIndicator.remove();
        
        // Criar indicador
        const indicator = document.createElement('div');
        indicator.className = 'search-indicator';
        indicator.innerHTML = `
            <div class="indicator-content">
                <i class="bi bi-search"></i>
                <span>Buscando por: <strong>"${term}"</strong></span>
                <div class="spinner"></div>
            </div>
        `;
        
        // Estilos
        Object.assign(indicator.style, {
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--card-bg)',
            border: '1px solid var(--light-gray-2)',
            borderRadius: 'var(--border-radius-lg)',
            padding: '0.75rem 1.5rem',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: '0',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(indicator);
        
        // Animar entrada
        setTimeout(() => {
            indicator.style.opacity = '1';
            indicator.style.top = '100px';
        }, 10);
        
        // Remover após 2 segundos
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }, 2000);
    }
    
    function performSearch(term) {
        if (term.length < 2) return;
        
        // Elementos pesquisáveis
        const searchableElements = [
            ...document.querySelectorAll('.faq-pergunta, .faq-resposta, .processo-card h3, .processo-card p, .dica-card h4, .dica-card p')
        ];
        
        let hasResults = false;
        let resultCount = 0;
        
        // Resetar highlights anteriores
        resetSearchHighlights();
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            const parent = element.closest('.faq-item, .processo-card, .dica-card, .secao-ajuda');
            
            if (text.includes(term)) {
                highlightMatch(element, term);
                
                if (parent) {
                    parent.style.display = 'block';
                    parent.classList.add('search-match');
                    
                    // Animar resultado
                    parent.style.animation = 'highlightPulse 1.5s ease';
                    
                    // Garantir que a seção pai esteja visível
                    const section = parent.closest('.secao-ajuda');
                    if (section) {
                        section.style.display = 'block';
                    }
                }
                
                hasResults = true;
                resultCount++;
            } else if (parent && !parent.querySelector('.search-highlight')) {
                parent.style.display = 'none';
            }
        });
        
        // Mostrar resultados
        showSearchResults(hasResults, term, resultCount);
        
        // Atualizar URL com termo de busca
        updateSearchURL(term);
    }
    
    function highlightMatch(element, term) {
        const text = element.textContent;
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const highlighted = text.replace(regex, '<mark class="search-highlight">$1</mark>');
        
        element.innerHTML = highlighted;
        
        // Adicionar efeito aos highlights
        element.querySelectorAll('.search-highlight').forEach(highlight => {
            highlight.style.transition = 'all 0.3s ease';
            highlight.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
            });
            
            highlight.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 2px 4px rgba(133, 100, 4, 0.1)';
            });
        });
    }
    
    function resetSearchHighlights() {
        document.querySelectorAll('.search-highlight').forEach(highlight => {
            const parent = highlight.parentNode;
            parent.textContent = parent.textContent;
        });
        
        document.querySelectorAll('.search-match').forEach(el => {
            el.classList.remove('search-match');
            el.style.animation = '';
        });
    }
    
    function showSearchResults(hasResults, term, count) {
        // Remover mensagem anterior
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) existingMessage.remove();
        
        if (!hasResults) {
            const message = document.createElement('div');
            message.className = 'search-results-message';
            message.innerHTML = `
                <div class="results-icon">
                    <i class="bi bi-search"></i>
                </div>
                <div class="results-content">
                    <h4>Nenhum resultado encontrado</h4>
                    <p>Não encontramos resultados para "<strong>${term}</strong>"</p>
                    <div class="results-suggestions">
                        <p>Sugestões:</p>
                        <ul>
                            <li>Verifique a ortografia</li>
                            <li>Tente palavras-chave diferentes</li>
                            <li>Use termos mais genéricos</li>
                            <li>Entre em contato com nosso suporte</li>
                        </ul>
                    </div>
                </div>
            `;
            
            // Estilos dinâmicos
            Object.assign(message.style, {
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--light-gray-2)',
                borderRadius: 'var(--border-radius-lg)',
                margin: '2rem 0',
                boxShadow: 'var(--shadow-md)',
                animation: 'slideInUp 0.5s ease'
            });
            
            const ajudaContainer = document.querySelector('.ajuda-container');
            if (ajudaContainer) {
                ajudaContainer.appendChild(message);
            }
        } else {
            // Mostrar contador de resultados
            const resultsCount = document.createElement('div');
            resultsCount.className = 'search-results-count';
            resultsCount.innerHTML = `
                <i class="bi bi-check-circle"></i>
                <span>Encontramos <strong>${count}</strong> resultado${count !== 1 ? 's' : ''} para "<strong>${term}</strong>"</span>
            `;
            
            Object.assign(resultsCount.style, {
                position: 'fixed',
                top: '80px',
                right: '20px',
                background: 'var(--primary-green)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: '9998',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                animation: 'slideInRight 0.5s ease'
            });
            
            document.body.appendChild(resultsCount);
            
            // Remover após 3 segundos
            setTimeout(() => {
                resultsCount.style.animation = 'slideOutRight 0.5s ease forwards';
                setTimeout(() => {
                    if (resultsCount.parentNode) {
                        resultsCount.parentNode.removeChild(resultsCount);
                    }
                }, 500);
            }, 3000);
        }
    }
    
    function resetSearch() {
        resetSearchHighlights();
        
        // Mostrar todos os elementos
        document.querySelectorAll('.faq-item, .processo-card, .dica-card, .secao-ajuda').forEach(el => {
            el.style.display = 'block';
            el.style.animation = '';
        });
        
        // Remover mensagens de resultados
        const message = document.querySelector('.search-results-message');
        if (message) message.remove();
        
        // Remover contador
        const count = document.querySelector('.search-results-count');
        if (count) count.remove();
        
        // Limpar URL
        updateSearchURL('');
    }
    
    function updateSearchURL(term) {
        const url = new URL(window.location);
        
        if (term) {
            url.searchParams.set('q', term);
        } else {
            url.searchParams.delete('q');
        }
        
        window.history.replaceState({}, '', url);
    }
    
    // ===== ESTATÍSTICAS ANIMADAS =====
    function initStatsAnimation() {
        const stats = document.querySelectorAll('.stat-item');
        if (!stats.length) return;
        
        let animated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        const statsContainer = document.querySelector('.ajuda-header');
        if (statsContainer) {
            observer.observe(statsContainer);
        }
    }
    
    function animateStats() {
        const stats = document.querySelectorAll('.stat-item');
        
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
                
                // Efeito no ícone
                const icon = stat.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(0)';
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        icon.style.transform = 'scale(1) rotate(360deg)';
                    }, 300);
                }
            }, index * 200);
        });
    }
    
    // ===== CHAT ONLINE =====
    function initChatOnline() {
        const chatBtn = document.getElementById('chatOnline');
        if (!chatBtn) return;
        
        chatBtn.addEventListener('click', function() {
            if (!window.chatWidget) {
                showNotification('O chat online estará disponível em breve!', 'info');
                
                // Simular abertura de chat
                this.innerHTML = '<i class="bi bi-hourglass-split"></i> Conectando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = '<i class="bi bi-chat-dots"></i> Chat Online';
                    this.disabled = false;
                    showNotification('Chat temporariamente indisponível. Use WhatsApp ou e-mail.', 'warning');
                }, 2000);
            }
        });
        
        // Mostrar disponibilidade do chat
        updateChatAvailability();
    }
    
    function updateChatAvailability() {
        const now = new Date();
        const hour = now.getHours();
        const isAvailable = hour >= 9 && hour < 18 && now.getDay() >= 1 && now.getDay() <= 5;
        
        const chatBtn = document.getElementById('chatOnline');
        if (!chatBtn) return;
        
        if (isAvailable) {
            chatBtn.innerHTML = '<i class="bi bi-chat-dots"></i> Chat Online';
            chatBtn.classList.add('available');
            chatBtn.title = 'Chat disponível agora (9h-18h)';
        } else {
            chatBtn.innerHTML = '<i class="bi bi-clock"></i> Chat (9h-18h)';
            chatBtn.classList.remove('available');
            chatBtn.title = 'Chat disponível de segunda a sexta, das 9h às 18h';
        }
    }
    
    // ===== NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        // Configurações por tipo
        const config = {
            success: {
                icon: 'bi-check-circle-fill',
                title: 'Sucesso!',
                color: '#00cc99',
                bgColor: 'rgba(0, 204, 153, 0.1)'
            },
            error: {
                icon: 'bi-x-circle-fill',
                title: 'Erro!',
                color: '#ff4757',
                bgColor: 'rgba(255, 71, 87, 0.1)'
            },
            warning: {
                icon: 'bi-exclamation-circle-fill',
                title: 'Atenção!',
                color: '#ffa502',
                bgColor: 'rgba(255, 165, 2, 0.1)'
            },
            info: {
                icon: 'bi-info-circle-fill',
                title: 'Informação',
                color: '#0066cc',
                bgColor: 'rgba(0, 102, 204, 0.1)'
            }
        }[type] || {
            icon: 'bi-info-circle-fill',
            title: 'Informação',
            color: '#0066cc',
            bgColor: 'rgba(0, 102, 204, 0.1)'
        };
        
        // Remover notificações antigas
        removeOldNotifications();
        
        // Criar notificação
        const notification = createNotification(message, type, config);
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        animateNotificationIn(notification);
        
        // Configurar remoção
        setupNotificationRemoval(notification);
        
        return notification;
    }
    
    function createNotification(message, type, config) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="bi ${config.icon}"></i>
            </div>
            <div class="notification-content">
                <span class="notification-title">${config.title}</span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close" aria-label="Fechar notificação">
                <i class="bi bi-x"></i>
            </button>
            <div class="notification-progress"></div>
        `;
        
        return notification;
    }
    
    function animateNotificationIn(notification) {
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border-left: 4px solid ${config.color};
            padding: 1.25rem 1.5rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 320px;
            max-width: 400px;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            opacity: 0;
        `;
        
        // Forçar reflow e animar
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
    }
    
    function setupNotificationRemoval(notification) {
        const closeBtn = notification.querySelector('.notification-close');
        let autoRemoveTimeout;
        
        // Progress bar
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: ${config.color};
                width: 100%;
                transform: scaleX(1);
                transform-origin: left;
                transition: transform 5s linear;
                border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
            `;
            
            // Animar progress bar
            setTimeout(() => {
                progressBar.style.transform = 'scaleX(0)';
            }, 10);
        }
        
        // Fechar ao clicar no botão
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
        
        // Fechar ao clicar na notificação
        notification.addEventListener('click', (e) => {
            if (!e.target.closest('.notification-close')) {
                removeNotification(notification);
            }
        });
        
        // Fechar automaticamente após 5 segundos
        autoRemoveTimeout = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Pausar quando hover
        notification.addEventListener('mouseenter', () => {
            clearTimeout(autoRemoveTimeout);
            if (progressBar) {
                progressBar.style.transition = 'none';
                progressBar.style.width = progressBar.offsetWidth + 'px';
            }
        });
        
        notification.addEventListener('mouseleave', () => {
            if (progressBar) {
                const remainingWidth = progressBar.offsetWidth;
                const totalWidth = notification.offsetWidth;
                const remainingTime = (remainingWidth / totalWidth) * 5000;
                
                progressBar.style.transition = `transform ${remainingTime}ms linear`;
                progressBar.style.transform = 'scaleX(0)';
                
                autoRemoveTimeout = setTimeout(() => {
                    removeNotification(notification);
                }, remainingTime);
            } else {
                autoRemoveTimeout = setTimeout(() => {
                    removeNotification(notification);
                }, 2000);
            }
        });
    }
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(120%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
    
    function removeOldNotifications() {
        document.querySelectorAll('.notification').forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
    
    // ===== ANIMAÇÕES GERAIS =====
    function initAnimations() {
        // Animar elementos de entrada
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
        
        // Animar ícones
        animateIcons();
        
        // Efeito de confete no carregamento
        setTimeout(() => {
            showWelcomeEffect();
        }, 500);
    }
    
    function animateIcons() {
        const icons = document.querySelectorAll('.secao-titulo i, .contato-icon i');
        
        icons.forEach((icon, index) => {
            icon.style.transform = 'scale(0) rotate(0deg)';
            
            setTimeout(() => {
                icon.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                icon.style.transform = 'scale(1) rotate(360deg)';
            }, 500 + (index * 100));
        });
    }
    
    function showWelcomeEffect() {
        // Criar efeito de boas-vindas
        const welcome = document.createElement('div');
        welcome.className = 'welcome-effect';
        welcome.innerHTML = `
            <div class="welcome-content">
                <i class="bi bi-question-circle-fill"></i>
                <h3>Bem-vindo à Central de Ajuda!</h3>
                <p>Como podemos ajudá-lo hoje?</p>
            </div>
        `;
        
        Object.assign(welcome.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            background: 'var(--card-bg)',
            padding: '2rem 3rem',
            borderRadius: 'var(--border-radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            textAlign: 'center',
            zIndex: '10001',
            opacity: '0',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        document.body.appendChild(welcome);
        
        // Animar entrada
        setTimeout(() => {
            welcome.style.opacity = '1';
            welcome.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        // Remover após 2 segundos
        setTimeout(() => {
            welcome.style.opacity = '0';
            welcome.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                if (welcome.parentNode) {
                    welcome.parentNode.removeChild(welcome);
                }
            }, 500);
        }, 2000);
    }
    
    function showConfettiEffect() {
        const colors = ['#0066cc', '#00cc99', '#9933cc', '#ff4757', '#ffa502'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 2px;
                top: -20px;
                left: ${Math.random() * 100}vw;
                z-index: 10000;
                opacity: 0.8;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            // Animar confetti
            const animation = confetti.animate([
                { 
                    transform: `translateY(0) rotate(0deg)`,
                    opacity: 1 
                },
                { 
                    transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            };
        }
    }
    
    function updateHelpStats() {
        // Simular atualização de estatísticas
        const stats = document.querySelectorAll('.stat-item span');
        if (stats.length > 2) {
            // Incrementar número de atendimentos
            const currentRating = stats[2].textContent;
            const newRating = (parseFloat(currentRating) + 0.1).toFixed(1);
            stats[2].textContent = `${newRating}/5`;
            
            // Animar mudança
            stats[2].style.color = 'var(--primary-green)';
            stats[2].style.transform = 'scale(1.2)';
            stats[2].style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                stats[2].style.color = '';
                stats[2].style.transform = '';
            }, 1000);
        }
    }
    
    // ===== TEMA E ACESSIBILIDADE =====
    function initThemeListeners() {
        // Sincronizar com o tema da aplicação principal
        const darkModeBtn = document.getElementById('darkModeBtn');
        const colorblindBtn = document.getElementById('colorblindBtn');
        
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('helpDarkMode', document.body.classList.contains('dark-mode'));
            });
        }
        
        if (colorblindBtn) {
            colorblindBtn.addEventListener('click', () => {
                document.body.classList.toggle('colorblind-mode');
                localStorage.setItem('helpColorblindMode', document.body.classList.contains('colorblind-mode'));
            });
        }
        
        // Carregar preferências salvas
        if (localStorage.getItem('helpDarkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        if (localStorage.getItem('helpColorblindMode') === 'true') {
            document.body.classList.add('colorblind-mode');
        }
    }
    
    // ===== EVENTOS GLOBAIS =====
    function setupGlobalEvents() {
        // Atalhos de teclado
        document.addEventListener('keydown', function(e) {
            // Ctrl+Alt+H - Rolar para o topo
            if (e.ctrlKey && e.altKey && e.key === 'h') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Ctrl+Shift+S - Focar na busca
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
            
            // Escape - Fechar notificações
            if (e.key === 'Escape') {
                removeOldNotifications();
            }
        });
        
        // Atualizar disponibilidade do chat periodicamente
        setInterval(updateChatAvailability, 60000); // A cada minuto
        
        // Salvar posição de scroll
        window.addEventListener('beforeunload', function() {
            localStorage.setItem('helpScrollPosition', window.scrollY);
        });
        
        // Restaurar posição de scroll
        const savedPosition = localStorage.getItem('helpScrollPosition');
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition));
                localStorage.removeItem('helpScrollPosition');
            }, 100);
        }
        
        // Detectar impressão
        window.addEventListener('beforeprint', function() {
            document.body.classList.add('printing');
        });
        
        window.addEventListener('afterprint', function() {
            document.body.classList.remove('printing');
        });
    }
    
    // ===== UTILITÁRIOS =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // ===== INICIALIZAR APLICAÇÃO =====
    initAll();
    
    // ===== API PÚBLICA (para integração) =====
    window.ajudaAPI = {
        // Métodos públicos
        showNotification: showNotification,
        search: (term) => {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = term;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        },
        scrollToSection: (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                smoothScrollTo(element);
                
                // Atualizar categoria
                const btn = document.querySelector(`.category-btn[href="#${sectionId}"]`);
                if (btn) updateActiveCategory(btn);
            }
        },
        openContactForm: () => {
            scrollToSection('fale-conosco');
            setTimeout(() => {
                const nomeInput = document.getElementById('nome');
                if (nomeInput) nomeInput.focus();
            }, 500);
        },
        // Debug
        debug: {
            getFormData: () => {
                const form = document.getElementById('formContato');
                if (!form) return null;
                
                const data = {};
                ['nome', 'email', 'assunto', 'mensagem'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) data[id] = el.value;
                });
                return data;
            },
            simulateError: () => {
                showNotification('Este é um erro simulado para testes.', 'error');
            },
            simulateSuccess: () => {
                showNotification('Esta é uma mensagem de sucesso simulada.', 'success');
            }
        }
    };
    
    // Log de inicialização
    console.log('🔧 Ajuda API disponível em window.ajudaAPI');
});