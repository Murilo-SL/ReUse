
// finalizar_compra.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const progressSteps = document.querySelectorAll('.progress-step');
    const formTabs = document.querySelectorAll('.form-tab');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const finalizarButton = document.getElementById('finalizar');
    
    // Elementos de mensagens
    const successOverlay = document.getElementById('success-overlay');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Estado atual do formulário
    let currentStep = 'personal';

    // Inicialização
    initFormValidation();
    initPaymentMethods();
    initCEPValidation();
    initCardValidation();
    initCharacterLimits();

    // Função para mostrar mensagens de erro
    function showError(message) {
        if (errorText && errorMessage) {
            errorText.textContent = message;
            errorMessage.style.display = 'flex';
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Função para mostrar sucesso personalizado
    function showSuccess() {
        if (!successOverlay || !successMessage) return;
        
        const personalizedMessage = createPersonalizedSuccessMessage();
        successMessage.innerHTML = personalizedMessage;
        successOverlay.style.display = 'block';
        successMessage.style.display = 'block';
        startCountdown();
    }

    function createPersonalizedSuccessMessage() {
        const nome = document.getElementById('nome')?.value.split(' ')[0] || 'Cliente';
        const produtoElement = document.querySelector('.item-name');
        const produto = produtoElement ? produtoElement.textContent : 'seu produto';
        const totalElement = document.querySelector('.calculation-row.total span:last-child');
        const total = totalElement ? totalElement.textContent : 'R$ 244,99';
        
        return `
            <div class="success-content">
                <i class="bi bi-check-circle-fill"></i>
                <h3>Parabéns, ${nome}!</h3>
                <p>Seu pedido foi confirmado com sucesso!</p>
                <div class="order-details">
                    <div class="detail-item">
                        <span class="label">Produto:</span>
                        <span class="value">${produto}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Total:</span>
                        <span class="value">${total}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Previsão de entrega:</span>
                        <span class="value">5-7 dias úteis</span>
                    </div>
                </div>
                <div class="success-footer">
                    <p>Você será redirecionado para seus pedidos em <span id="countdown">3</span> segundos...</p>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // VALIDAÇÕES COM APIS REAIS

    // API para validação de email
    async function validarEmailComAPI(email) {
        try {
            // API gratuita para validação de email
            const response = await fetch(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(email)}`);
            const data = await response.json();
            
            return data.data.valid_format && data.data.deliverable;
        } catch (error) {
            console.error('Erro na validação de email:', error);
            // Fallback para validação local
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // API para busca de CEP (ViaCEP)
    async function buscarCEPViaAPI(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            
            return {
                logradouro: data.logradouro,
                bairro: data.bairro,
                localidade: data.localidade,
                uf: data.uf
            };
        } catch (error) {
            console.error('Erro na busca do CEP:', error);
            throw new Error('CEP não encontrado');
        }
    }

    // API para validação de cartão de crédito (Binlist)
    async function validarCartaoComAPI(numeroCartao) {
        try {
            const bin = numeroCartao.substring(0, 6);
            const response = await fetch(`https://lookup.binlist.net/${bin}`, {
                headers: {
                    'Accept-Version': '3'
                }
            });
            
            if (!response.ok) {
                throw new Error('Bandeira não identificada');
            }
            
            const data = await response.json();
            return {
                bandeira: data.scheme ? data.scheme.toLowerCase() : 'desconhecida',
                banco: data.bank ? data.bank.name : 'Desconhecido',
                tipo: data.type || 'desconhecido',
                valido: true
            };
        } catch (error) {
            console.error('Erro na validação do cartão:', error);
            // Fallback para validação local
            return {
                bandeira: identificarBandeiraLocal(numeroCartao),
                valido: validarAlgoritmoLuhn(numeroCartao)
            };
        }
    }

    // VALIDAÇÃO DO CPF - ACEITA QUALQUER CPF
    async function validarCPFComAPI(cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');
        
        // Verifica apenas se tem 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }
        
        // Aceita qualquer CPF que tenha 11 dígitos
        return true;
    }

    // Funções de fallback local
    function identificarBandeiraLocal(numero) {
        const prefixos = {
            'visa': /^4/,
            'mastercard': /^(5[1-5]|2[2-7])/,
            'amex': /^3[47]/,
            'elo': /^(4011|4312|4389|4514|4576|5041|5067|509|6277|6362|6363|650[0-9]|6516|6550)/,
            'hipercard': /^(606282|3841)/
        };
        
        for (const [bandeira, regex] of Object.entries(prefixos)) {
            if (regex.test(numero)) {
                return bandeira;
            }
        }
        return 'desconhecida';
    }

    function validarAlgoritmoLuhn(numero) {
        let soma = 0;
        let deveDobrar = false;
        
        for (let i = numero.length - 1; i >= 0; i--) {
            let digito = parseInt(numero.charAt(i));
            
            if (deveDobrar) {
                digito *= 2;
                if (digito > 9) digito -= 9;
            }
            
            soma += digito;
            deveDobrar = !deveDobrar;
        }
        
        return soma % 10 === 0;
    }

    // VALIDAÇÕES ATUALIZADAS COM APIS

    async function validateEmail() {
        const emailInput = document.getElementById('email');
        if (!emailInput) return false;

        const email = emailInput.value.trim();
        const isValid = await validarEmailComAPI(email);
        
        updateFieldValidation('email', isValid, 'Email inválido ou não entregável');
        return isValid;
    }

    async function validateCPF() {
        const cpfInput = document.getElementById('cpf');
        if (!cpfInput) return false;

        const cpf = cpfInput.value.replace(/\D/g, '');
        const isValid = await validarCPFComAPI(cpf);
        
        updateFieldValidation('cpf', isValid, 'CPF deve ter 11 dígitos');
        return isValid;
    }

    async function validateCreditCard() {
        const cardNumber = document.getElementById('card-number')?.value.replace(/\s/g, '') || '';
        const cardName = document.getElementById('card-name')?.value.trim() || '';
        const cardExpiry = document.getElementById('card-expiry')?.value || '';
        const cardCVV = document.getElementById('card-cvv')?.value || '';
        
        if (cardNumber.length < 13) {
            updateFieldValidation('card-number', false, 'Número do cartão incompleto');
            return false;
        }

        // Validar cartão com API
        const validacaoCartao = await validarCartaoComAPI(cardNumber);
        
        const validations = [
            { field: 'card-number', valid: validacaoCartao.valido, message: 'Número do cartão inválido' },
            { field: 'card-name', valid: cardName.length >= 2, message: 'Nome no cartão é obrigatório' },
            { field: 'card-expiry', valid: validarDataValidade(cardExpiry), message: 'Data de validade inválida' },
            { field: 'card-cvv', valid: /^\d{3,4}$/.test(cardCVV), message: 'CVV inválido' }
        ];
        
        let isValid = true;
        validations.forEach(validation => {
            if (!validation.valid) {
                updateFieldValidation(validation.field, false, validation.message);
                isValid = false;
            } else {
                updateFieldValidation(validation.field, true, '');
            }
        });

        // Selecionar bandeira automaticamente se válida
        if (validacaoCartao.valido && validacaoCartao.bandeira !== 'desconhecida') {
            selecionarBandeiraAutomaticamente(validacaoCartao.bandeira, 'credit');
        }
        
        return isValid;
    }

    async function validateDebitCard() {
        const cardNumber = document.getElementById('debit-card-number')?.value.replace(/\s/g, '') || '';
        const cardName = document.getElementById('debit-card-name')?.value.trim() || '';
        const cardExpiry = document.getElementById('debit-card-expiry')?.value || '';
        const cardCVV = document.getElementById('debit-card-cvv')?.value || '';
        const bank = document.getElementById('debit-card-bank')?.value || '';
        
        if (cardNumber.length < 13) {
            updateFieldValidation('debit-card-number', false, 'Número do cartão incompleto');
            return false;
        }

        // Validar cartão com API
        const validacaoCartao = await validarCartaoComAPI(cardNumber);
        
        const validations = [
            { field: 'debit-card-number', valid: validacaoCartao.valido, message: 'Número do cartão inválido' },
            { field: 'debit-card-name', valid: cardName.length >= 2, message: 'Nome no cartão é obrigatório' },
            { field: 'debit-card-expiry', valid: validarDataValidade(cardExpiry), message: 'Data de validade inválida' },
            { field: 'debit-card-cvv', valid: /^\d{3,4}$/.test(cardCVV), message: 'CVV inválido' },
            { field: 'debit-card-bank', valid: bank !== '', message: 'Selecione o banco emissor' }
        ];
        
        let isValid = true;
        validations.forEach(validation => {
            if (!validation.valid) {
                updateFieldValidation(validation.field, false, validation.message);
                isValid = false;
            } else {
                updateFieldValidation(validation.field, true, '');
            }
        });

        // Selecionar bandeira automaticamente se válida
        if (validacaoCartao.valido && validacaoCartao.bandeira !== 'desconhecida') {
            selecionarBandeiraAutomaticamente(validacaoCartao.bandeira, 'debit');
        }
        
        return isValid;
    }

    function selecionarBandeiraAutomaticamente(bandeira, tipo) {
        const prefixo = tipo === 'debit' ? 'debit-' : '';
        const radioId = `${prefixo}${bandeira}`;
        const radioElement = document.getElementById(radioId);
        
        if (radioElement) {
            radioElement.checked = true;
            // Disparar evento change para mostrar o formulário correto
            radioElement.dispatchEvent(new Event('change'));
        }
    }

    // FUNÇÕES RESTANTES (mantidas do código anterior com pequenas adaptações)

    function initCharacterLimits() {
        const fieldLimits = {
            'nome': 100, 'cpf': 14, 'telefone': 15, 'email': 100, 'cep': 9,
            'endereco': 150, 'numero': 10, 'complemento': 50, 'bairro': 50, 'cidade': 50,
            'card-number': 19, 'card-name': 50, 'card-expiry': 5, 'card-cvv': 4,
            'debit-card-number': 19, 'debit-card-name': 50, 'debit-card-expiry': 5, 'debit-card-cvv': 4
        };

        Object.keys(fieldLimits).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.setAttribute('maxlength', fieldLimits[fieldId]);
                if (fieldLimits[fieldId] > 30) {
                    addCharacterCounter(field, fieldLimits[fieldId]);
                }
            }
        });
    }

    function addCharacterCounter(field, maxLength) {
        const formGroup = field.closest('.form-group') || field.closest('.form-row');
        if (!formGroup) return;

        let counter = formGroup.querySelector('.character-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'character-counter';
            formGroup.appendChild(counter);
        }
        
        function updateCounter() {
            const currentLength = field.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            counter.style.color = currentLength > maxLength * 0.8 ? 'var(--warning-color)' : 'var(--text-light)';
        }
        
        field.addEventListener('input', updateCounter);
        updateCounter();
    }

    function setupRealTimeValidation() {
        const inputs = {
            'nome': validateNome,
            'cpf': validateCPF,
            'telefone': validateTelefone,
            'email': validateEmail,
            'cep': validateCEP,
            'endereco': validateRequiredField,
            'numero': validateRequiredField,
            'bairro': validateRequiredField,
            'cidade': validateRequiredField,
            'estado': validateRequiredField
        };

        Object.entries(inputs).forEach(([id, validator]) => {
            const input = document.getElementById(id);
            if (input) input.addEventListener('blur', validator);
        });

        // Formatação automática
        document.getElementById('cpf')?.addEventListener('input', formatCPF);
        document.getElementById('telefone')?.addEventListener('input', formatTelefone);
        document.getElementById('cep')?.addEventListener('input', formatCEP);
    }

    function validateNome() {
        const nome = document.getElementById('nome')?.value.trim() || '';
        const isValid = nome.length >= 2 && nome.split(' ').length >= 2;
        updateFieldValidation('nome', isValid, 'Nome completo é obrigatório (mínimo 2 palavras)');
        return isValid;
    }

    function validateTelefone() {
        const telefone = document.getElementById('telefone')?.value.replace(/\D/g, '') || '';
        const isValid = telefone.length >= 10 && telefone.length <= 11;
        updateFieldValidation('telefone', isValid, 'Telefone inválido (10 ou 11 dígitos)');
        return isValid;
    }

    function validateCEP() {
        const cep = document.getElementById('cep')?.value.replace(/\D/g, '') || '';
        const isValid = cep.length === 8;
        updateFieldValidation('cep', isValid, 'CEP inválido (8 dígitos)');
        return isValid;
    }

    function validateRequiredField(event) {
        const field = event.target;
        const isValid = field.value.trim() !== '';
        updateFieldValidation(field.id, isValid, 'Este campo é obrigatório');
        return isValid;
    }

    async function validateCurrentStep() {
        switch (currentStep) {
            case 'personal':
                return await validatePersonalData();
            case 'address':
                return validateAddressData();
            case 'payment':
                return await validatePaymentData();
            default:
                return false;
        }
    }

    async function validatePersonalData() {
        const nomeValido = validateNome();
        const cpfValido = await validateCPF();
        const telefoneValido = validateTelefone();
        const emailValido = await validateEmail();
        
        return nomeValido && cpfValido && telefoneValido && emailValido;
    }

    function validateAddressData() {
        const requiredFields = ['endereco', 'numero', 'bairro', 'cidade', 'estado'];
        let isValid = validateCEP();
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && field.value.trim() === '') {
                updateFieldValidation(fieldId, false, 'Este campo é obrigatório');
                isValid = false;
            } else if (field) {
                updateFieldValidation(fieldId, true, '');
            }
        });
        
        return isValid;
    }

    async function validatePaymentData() {
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            showError('Selecione uma forma de pagamento');
            return false;
        }
        
        switch (paymentMethod.id) {
            case 'credit-card':
                return await validateCreditCard();
            case 'debit-card':
                return await validateDebitCard();
            case 'pix':
                return true;
            default:
                showError('Selecione uma forma de pagamento');
                return false;
        }
    }

    async function validateAllSteps() {
        const steps = ['personal', 'address', 'payment'];
        
        for (let step of steps) {
            navigateToStep(step);
            const isValid = await validateCurrentStep();
            if (!isValid) {
                showError(`Por favor, complete corretamente a etapa de ${getStepName(step)}`);
                return false;
            }
        }
        
        return true;
    }

    function initCEPValidation() {
        const buscarCEPButton = document.getElementById('buscar-cep');
        
        if (buscarCEPButton) {
            buscarCEPButton.addEventListener('click', async function() {
                const cep = document.getElementById('cep')?.value.replace(/\D/g, '') || '';
                
                if (cep.length !== 8) {
                    showError('CEP inválido');
                    return;
                }
                
                buscarCEPButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Buscando...';
                buscarCEPButton.disabled = true;
                
                try {
                    const endereco = await buscarCEPViaAPI(cep);
                    preencherEndereco(endereco);
                } catch (error) {
                    showError('CEP não encontrado');
                } finally {
                    buscarCEPButton.innerHTML = '<i class="bi bi-search"></i> Buscar CEP';
                    buscarCEPButton.disabled = false;
                }
            });
        }
    }

    function preencherEndereco(dados) {
        const campos = {
            'endereco': dados.logradouro,
            'bairro': dados.bairro,
            'cidade': dados.localidade,
            'estado': dados.uf
        };
        
        Object.entries(campos).forEach(([id, valor]) => {
            const campo = document.getElementById(id);
            if (campo && valor) campo.value = valor;
        });
        
        validateAddressData();
    }

    // ... (outras funções de formatação e navegação mantidas)

    function formatCPF(event) {
        let cpf = event.target.value.replace(/\D/g, '').substring(0, 11);
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        event.target.value = cpf;
    }

    function formatTelefone(event) {
        let telefone = event.target.value.replace(/\D/g, '').substring(0, 11);
        if (telefone.length <= 10) {
            telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
            telefone = telefone.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
            telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
        }
        event.target.value = telefone;
    }

    function formatCEP(event) {
        let cep = event.target.value.replace(/\D/g, '').substring(0, 8);
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
        event.target.value = cep;
    }

    function validarDataValidade(data) {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(data)) return false;
        
        const [mes, ano] = data.split('/');
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear() % 100;
        const mesAtual = dataAtual.getMonth() + 1;
        
        const anoInt = parseInt(ano);
        const mesInt = parseInt(mes);
        
        if (anoInt < anoAtual) return false;
        if (anoInt === anoAtual && mesInt < mesAtual) return false;
        
        return true;
    }

    function updateFieldValidation(fieldId, isValid, errorMessage) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        const formGroup = field.closest('.form-group') || field.closest('.form-row');
        
        field.classList.remove('valid', 'invalid');
        field.classList.add(isValid ? 'valid' : 'invalid');
        
        const existingError = formGroup?.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        if (!isValid && formGroup && errorMessage) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = 'var(--error-color)';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        }
    }

    function navigateToStep(step) {
        currentStep = step;

        progressSteps.forEach(stepElement => {
            stepElement.classList.toggle('active', stepElement.getAttribute('data-step') === step);
        });

        formTabs.forEach(tab => {
            tab.classList.toggle('active', tab.id === `${step}-form`);
        });

        updateNavigationButtons();
    }

    async function updateNavigationButtons() {
        const currentTab = document.getElementById(`${currentStep}-form`);
        if (!currentTab) return;

        const nextButton = currentTab.querySelector('.btn-next');
        if (nextButton) {
            const isValid = await validateCurrentStep();
            nextButton.classList.toggle('btn-disabled', !isValid);
        }
    }

    function setupFormNavigation() {
        nextButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const nextStep = this.getAttribute('data-next');
                if (await validateCurrentStep() && nextStep) {
                    navigateToStep(nextStep);
                }
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStep = this.getAttribute('data-prev');
                if (prevStep) navigateToStep(prevStep);
            });
        });
    }

    function setupFinalizarButton() {
        if (finalizarButton) {
            finalizarButton.addEventListener('click', async function(e) {
                e.preventDefault();
                if (await validateAllSteps()) {
                    processPayment();
                }
            });
        }
    }

    function processPayment() {
        if (!finalizarButton) return;

        finalizarButton.disabled = true;
        finalizarButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
        
        setTimeout(() => {
            showSuccess();
        }, 2000);
    }

    function startCountdown() {
        let seconds = 3;
        const countdownElement = document.getElementById('countdown');
        const progressBar = document.querySelector('.loading-progress');
        
        const countdownInterval = setInterval(() => {
            seconds--;
            if (countdownElement) countdownElement.textContent = seconds;
            if (progressBar) progressBar.style.width = `${((3 - seconds) / 3) * 100}%`;
            
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                window.location.href = 'pedidos.html';
            }
        }, 1000);
    }

    function initPaymentMethods() {
        document.querySelectorAll('input[name="payment"]').forEach(option => {
            option.addEventListener('change', function() {
                document.querySelectorAll('.payment-detail-form').forEach(form => {
                    form.style.display = 'none';
                });
                
                const formToShow = document.getElementById(`${this.id}-form`);
                if (formToShow) formToShow.style.display = 'block';
            });
        });
    }

    function initCardValidation() {
        document.querySelectorAll('input[id*="card-number"]').forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s/g, '');
                value = value.replace(/(\d{4})/g, '$1 ').trim();
                e.target.value = value.substring(0, 19);
            });
        });
        
        document.querySelectorAll('input[id*="expiry"]').forEach(input => {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.substring(0, 5);
            });
        });
    }

    function getStepName(step) {
        const steps = {
            'personal': 'Dados Pessoais',
            'address': 'Endereço',
            'payment': 'Pagamento'
        };
        return steps[step] || step;
    }

    function initFormValidation() {
        setupRealTimeValidation();
        setupFormNavigation();
        setupFinalizarButton();
    }

    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .field-error { color: var(--error-color) !important; font-size: 0.8rem !important; margin-top: 5px !important; }
        input.valid { border-color: var(--success-color) !important; background-color: rgba(46, 204, 113, 0.05) !important; }
        input.invalid { border-color: var(--error-color) !important; background-color: rgba(231, 76, 60, 0.05) !important; }
        .character-counter { font-size: 0.75rem !important; color: var(--text-light) !important; text-align: right !important; margin-top: 5px !important; }
        .success-content { text-align: center; color: white; }
        .success-content i { font-size: 4rem; color: white; margin-bottom: 1rem; }
        .success-content h3 { color: white; margin-bottom: 1rem; font-size: 1.8rem; }
        .order-details { background: rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 1rem; margin: 1rem 0; }
        .detail-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .detail-item:last-child { margin-bottom: 0; }
        .label { font-weight: 600; }
        .value { font-weight: normal; }
        .success-footer { margin-top: 1.5rem; }
        .loading-bar { width: 100%; height: 4px; background: rgba(255, 255, 255, 0.3); border-radius: 2px; margin-top: 0.5rem; overflow: hidden; }
        .loading-progress { height: 100%; background: white; width: 0%; transition: width 1s linear; border-radius: 2px; }
        #countdown { font-weight: bold; font-size: 1.1em; }
    `;
    document.head.appendChild(style);

    // Event listeners para fechar mensagens
    successOverlay?.addEventListener('click', function() {
        this.style.display = 'none';
        successMessage.style.display = 'none';
    });

    errorMessage?.addEventListener('click', function() {
        this.style.display = 'none';
    });
});
