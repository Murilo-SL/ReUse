// Script para funcionalidades das páginas de autenticação
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar toggle de senha primeiro
    addPasswordToggle();
    
    // Alternar entre login e cadastro
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Atualizar tabs ativas
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar formulário correto
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Alternar entre tipos de vendedor
    const tipoOptions = document.querySelectorAll('.tipo-option');
    if (tipoOptions.length > 0) {
        // Selecionar primeiro tipo por padrão
        if (tipoOptions[0]) {
            tipoOptions[0].click();
        }
        
        tipoOptions.forEach(option => {
            option.addEventListener('click', function() {
                tipoOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                document.getElementById('tipoVendedor').value = this.getAttribute('data-tipo');
                
                // Mostrar/ocultar campo CNPJ
                const cnpjField = document.getElementById('cnpjField');
                if (this.getAttribute('data-tipo') === 'brecho') {
                    cnpjField.style.display = 'block';
                } else {
                    cnpjField.style.display = 'none';
                }
            });
        });
    }
    
    // Máscaras para campos
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    });
    
    const cnpjInputs = document.querySelectorAll('input[id="cnpj"]');
    cnpjInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 14) {
                value = value.replace(/(\d{2})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
                e.target.value = value;
            }
        });
    });
    
    // Validação de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpar erros anteriores
            clearErrors(form);
            
            // Validar formulário
            if (validateForm(form)) {
                // Simulação de envio bem-sucedido
                const formType = form.id === 'loginForm' ? 'Login' : 'Cadastro';
                showNotification(`${formType} realizado com sucesso!`, 'success');
                
                // Determinar tipo de usuário e redirecionar
                const isClientPage = window.location.pathname.includes('cadastro-cliente') || 
                                   window.location.pathname.includes('cliente');
                const isSellerPage = window.location.pathname.includes('cadastro-vendedor') || 
                                   window.location.pathname.includes('vendedor');
                const isOngPage = window.location.pathname.includes('cadastro-instituicao') || 
                                   window.location.pathname.includes('ong');
                
                // Redirecionar após sucesso
                setTimeout(() => {
                    if (form.id === 'loginForm') {
                        // Login bem-sucedido
                        if (isClientPage) {
                            // Redirecionar para página inicial do cliente
                            window.location.href = 'cliente-inicio.html';
                        } else if (isOngPage) {
                            // Redirecionar para página inicial da ONG
                            window.location.href = 'ong-inicio.html';
                        } else if (isSellerPage) {
                            // Redirecionar para dashboard do vendedor
                            window.location.href = 'vendedor-inicio.html';
                        } else {
                            // Página genérica - redirecionar baseado no contexto
                            const userType = detectUserType(form);
                            if (userType === 'client') {
                                window.location.href = 'cliente-inicio.html';
                            } else if (userType === 'ong') {
                                window.location.href = 'ong-inicio.html';
                            } else {
                                window.location.href = 'vendedor-inicio.html';
                            }
                        }
                    } else {
                        // Cadastro bem-sucedido
                        if (isClientPage) {
                            // Mostrar mensagem e voltar para login
                            showNotification('Cadastro realizado! Faça login para acessar sua conta.', 'success');
                            const activeTab = document.querySelector('.tab-btn.active');
                            if (activeTab && activeTab.getAttribute('data-tab') === 'cadastro') {
                                document.querySelector('[data-tab="login"]').click();
                            }
                        } else if (isSellerPage) {
                            // Mostrar mensagem e voltar para login
                            showNotification('Cadastro realizado! Faça login para acessar seu painel.', 'success');
                            const activeTab = document.querySelector('.tab-btn.active');
                            if (activeTab && activeTab.getAttribute('data-tab') === 'cadastro') {
                                document.querySelector('[data-tab="login"]').click();
                            }
                        }
                    }
                }, 1500);
            }
        });
    });
    
    // Login social
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showNotification(`Login com ${provider} em desenvolvimento...`, 'info');
        });
    });
    
    // Função para detectar tipo de usuário baseado no formulário
    function detectUserType(form) {
        // Verificar se estamos na página de cliente
        if (window.location.pathname.includes('cadastro-cliente') || 
            window.location.pathname.includes('cliente')) {
            return 'client';
        }

        // Verificar se estamos na página de ONG
        if (window.location.pathname.includes('cadastro-instituicao') || 
            window.location.pathname.includes('ong')) {
            return 'ong';
        }
        
        // Verificar se estamos na página de vendedor
        if (window.location.pathname.includes('cadastro-vendedor') || 
            window.location.pathname.includes('vendedor')) {
            return 'seller';
        }
        
        // Tentar detectar pelo conteúdo do formulário
        const hasSellerFields = form.querySelector('#nomeLoja, #tipoVendedor, #cnpj');
        const hasInstitutionFields = form.querySelector('#nomeInstituicao');
        const hasClientFields = form.querySelector('#idade, #sobrenome');
        
        if (hasSellerFields) {
            return 'seller';
        } else if (hasInstitutionFields) {
            return 'ong';
        } else if (hasClientFields) {
            return 'client';
        }
        
        // Padrão: cliente
        return 'client';
    }
    
    // Função para adicionar toggle de senha
    function addPasswordToggle() {
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        
        passwordInputs.forEach(input => {
            // Verificar se já existe um toggle button
            if (input.parentNode.querySelector('.password-toggle')) {
                return;
            }
            
            // Criar wrapper se não existir
            if (!input.parentNode.classList.contains('password-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'password-wrapper';
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
            }
            
            // Criar botão de toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle';
            toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
            toggleBtn.setAttribute('aria-label', 'Mostrar senha');
            
            // Adicionar evento de clique
            toggleBtn.addEventListener('click', function() {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                
                // Atualizar ícone
                const icon = this.querySelector('i');
                icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
                this.setAttribute('aria-label', type === 'password' ? 'Mostrar senha' : 'Ocultar senha');
            });
            
            // Adicionar botão após o input
            input.parentNode.appendChild(toggleBtn);
        });
    }
    
    // Função para validar formulário
    function validateForm(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            // Pular campos hidden e botões
            if (field.type === 'hidden' || field.type === 'submit' || field.type === 'button') {
                return;
            }
            
            let fieldValid = true;
            let errorMessage = '';
            
            // Validações específicas por tipo de campo
            switch (field.type) {
                case 'email':
                    if (field.value.trim()) {
                        fieldValid = validateEmail(field.value);
                        errorMessage = 'Por favor, insira um e-mail válido';
                    }
                    break;
                    
                case 'password':
                    if (field.value.trim()) {
                        if (field.id === 'senha' || field.id === 'loginSenha') {
                            fieldValid = field.value.length >= 6;
                            errorMessage = 'A senha deve ter pelo menos 6 caracteres';
                        } else if (field.id === 'confirmarSenha') {
                            const senha = document.getElementById('senha') || document.getElementById('loginSenha');
                            fieldValid = field.value === senha.value;
                            errorMessage = 'As senhas não coincidem';
                        }
                    }
                    break;
                    
                case 'tel':
                    if (field.value.trim()) {
                        fieldValid = validatePhone(field.value);
                        errorMessage = 'Por favor, insira um telefone válido';
                    }
                    break;
                    
                case 'text':
                    if (field.id === 'cnpj' && field.value.trim()) {
                        fieldValid = validateCNPJ(field.value);
                        errorMessage = 'Por favor, insira um CNPJ válido';
                    } else if ((field.name === 'nomeInstituicao' || field.id === 'nome' || field.id === 'sobrenome' || field.id === 'nomeLoja') && field.value.trim()) {
                        fieldValid = field.value.trim().length >= 2;
                        errorMessage = 'Este campo deve ter pelo menos 2 caracteres';
                    }
                    break;
                    
                case 'number':
                    if (field.id === 'idade' && field.value) {
                        fieldValid = field.value >= 16;
                        errorMessage = 'Você deve ter pelo menos 16 anos';
                    }
                    break;
                    
                case 'url':
                    if (field.value.trim()) {
                        fieldValid = validateURL(field.value);
                        errorMessage = 'Por favor, insira uma URL válida';
                    }
                    break;
                    
                case 'checkbox':
                    if (field.id === 'termos' && !field.checked) {
                        fieldValid = false;
                        errorMessage = 'Você deve aceitar os termos e condições';
                    }
                    break;
            }
            
            // Validação de campo obrigatório
            const optionalFields = ['site', 'cnpj', 'nomeLoja', 'sobrenome'];
            const isOptional = optionalFields.includes(field.id) || 
                             (field.name === 'causas' && field.type === 'checkbox');
            
            if (!isOptional && field.type !== 'checkbox' && field.value.trim() === '') {
                fieldValid = false;
                errorMessage = 'Este campo é obrigatório';
            } else if (field.tagName === 'SELECT' && field.value === '' && !isOptional) {
                fieldValid = false;
                errorMessage = 'Este campo é obrigatório';
            }
            
            // Campo CNPJ só é obrigatório para brechó
            if (field.id === 'cnpj') {
                const tipoVendedor = document.getElementById('tipoVendedor');
                if (tipoVendedor && tipoVendedor.value === 'brecho' && !field.value.trim()) {
                    fieldValid = false;
                    errorMessage = 'CNPJ é obrigatório para brechós/lojas';
                }
            }
            
            if (!fieldValid) {
                isValid = false;
                showError(field, errorMessage);
            }
        });
        
        return isValid;
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar telefone
    function validatePhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    }
    
    // Função para validar CNPJ
    function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        
        if (cnpj === '') return false;
        if (cnpj.length !== 14) return false;
        
        // Elimina CNPJs inválidos conhecidos
        const invalidCNPJs = [
            "00000000000000", "11111111111111", "22222222222222",
            "33333333333333", "44444444444444", "55555555555555",
            "66666666666666", "77777777777777", "88888888888888", "99999999999999"
        ];
        
        if (invalidCNPJs.includes(cnpj)) return false;
            
        // Valida DVs
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;
        
        return true;
    }
    
    // Função para validar URL
    function validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    // Função para mostrar erro
    function showError(field, message) {
        // Remover erro anterior se existir
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adicionar classe de erro ao campo
        field.classList.add('error');
        
        // Criar elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <i class="bi bi-exclamation-circle"></i>
            ${message}
        `;
        
        // Inserir após o campo
        field.parentNode.appendChild(errorElement);
        
        // Focar no campo com erro
        field.focus();
    }
    
    // Função para limpar erros
    function clearErrors(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Remover erro quando usuário começar a digitar
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, select, textarea')) {
            e.target.classList.remove('error');
            const errorMessage = e.target.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    });
    
    // Função de notificação
    function showNotification(message, type = 'info') {
        // Remover notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificação
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remover notificação após 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle-fill',
            error: 'exclamation-circle-fill',
            info: 'info-circle-fill',
            warning: 'exclamation-triangle-fill'
        };
        return icons[type] || 'info-circle-fill';
    }

    // Controles de acessibilidade
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Atualizar ícone
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'bi bi-sun';
                this.setAttribute('title', 'Modo Claro');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.className = 'bi bi-moon';
                this.setAttribute('title', 'Modo Noturno');
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.className = 'bi bi-sun';
            darkModeToggle.setAttribute('title', 'Modo Claro');
        }
    }

    // Menu dropdown para acessibilidade
    const colorblindToggle = document.getElementById('colorblindToggle');
    const colorblindDropdown = document.getElementById('colorblindDropdown');
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (colorblindToggle && colorblindDropdown) {
        colorblindToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            colorblindDropdown.style.display = colorblindDropdown.style.display === 'block' ? 'none' : 'block';
            if (languageDropdown) languageDropdown.style.display = 'none';
        });
    }
    
    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
            if (colorblindDropdown) colorblindDropdown.style.display = 'none';
        });
    }
    
    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', function() {
        if (colorblindDropdown) colorblindDropdown.style.display = 'none';
        if (languageDropdown) languageDropdown.style.display = 'none';
    });

    // Modos para daltonismo
    const colorblindOptions = document.querySelectorAll('.colorblind-option');
    const colorblindReset = document.getElementById('colorblindReset');
    
    colorblindOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            applyColorblindMode(mode);
        });
    });
    
    if (colorblindReset) {
        colorblindReset.addEventListener('click', function() {
            removeColorblindMode();
        });
    }
    
    function applyColorblindMode(mode) {
        // Remover modos anteriores
        removeColorblindMode();
        
        // Aplicar novo modo
        document.body.classList.add(`colorblind-${mode}`);
        localStorage.setItem('colorblindMode', mode);
        showNotification(`Modo daltonismo ${mode} ativado`, 'info');
    }
    
    function removeColorblindMode() {
        // Remover todas as classes de daltonismo
        document.body.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia', 'colorblind-achromatopsia');
        localStorage.removeItem('colorblindMode');
        showNotification('Modo daltonismo desativado', 'info');
    }
    
    // Aplicar modo salvo ao carregar a página
    const savedColorblindMode = localStorage.getItem('colorblindMode');
    if (savedColorblindMode) {
        applyColorblindMode(savedColorblindMode);
    }

    // Seleção de idioma
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    function changeLanguage(lang) {
        // Aqui você implementaria a lógica de tradução
        // Por enquanto, apenas uma notificação
        const languages = {
            'pt': 'Português',
            'en': 'Inglês',
            'es': 'Espanhol'
        };
        
        showNotification(`Idioma alterado para ${languages[lang]}`, 'info');
        localStorage.setItem('preferredLanguage', lang);
        
        // Em uma implementação real, você chamaria uma função de tradução
        // translatePage(lang);
    }
    
    // Aplicar idioma salvo ao carregar a página
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
});

// Adicione este CSS para as notificações e mensagens de erro
const notificationCSS = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-left: 4px solid #0066cc;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10000;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-success {
    border-left-color: var(--primary-green);
}

.notification-error {
    border-left-color: #dc3545;
}

.notification-info {
    border-left-color: var(--primary-blue);
}

.notification-warning {
    border-left-color: #ffc107;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.notification-content i {
    font-size: 1.2rem;
}

.notification-success i {
    color: var(--primary-green);
}

.notification-error i {
    color: #dc3545;
}

.notification-info i {
    color: var(--primary-blue);
}

.notification-warning i {
    color: #ffc107;
}

/* Estilos para mensagens de erro */
.error-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(220, 53, 69, 0.1);
    border-radius: 6px;
    border-left: 3px solid #dc3545;
}

.error-message i {
    font-size: 0.9rem;
}

.form-control.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
}

body.dark-mode .notification {
    background: var(--card-bg);
    color: var(--text-dark);
}

body.dark-mode .error-message {
    background: rgba(220, 53, 69, 0.15);
    color: #ff6b7a;
}

body.dark-mode .form-control.error {
    border-color: #ff6b7a;
    box-shadow: 0 0 0 4px rgba(255, 107, 122, 0.1);
}

/* Estilos para modos de daltonismo */
body.colorblind-protanopia {
    filter: hue-rotate(45deg) saturate(0.8);
}

body.colorblind-deuteranopia {
    filter: hue-rotate(90deg) saturate(0.7);
}

body.colorblind-tritanopia {
    filter: hue-rotate(180deg) saturate(0.6);
}

body.colorblind-achromatopsia {
    filter: grayscale(1);
}
`;

// Adicionar CSS das notificações e erros dinamicamente
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);