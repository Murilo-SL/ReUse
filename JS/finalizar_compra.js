// Finalizar_Compra.js - Código corrigido e otimizado
document.addEventListener('DOMContentLoaded', function() {
    // Carrega os itens do carrinho do localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Elementos da página
    const orderItemsContainer = document.querySelector('.order-items');
    const orderSummary = document.querySelector('.order-summary-calculation');
    const cartBadge = document.querySelector('.order-summary-badge span');
    const checkoutButton = document.getElementById('finalizar');
    const pixValueElement = document.querySelector('#pix-form .form-row p strong');
    const installmentsSelect = document.getElementById('card-installments');
    
    // Atualiza o resumo do pedido
    function updateOrderSummary() {
        if (!orderSummary) return;
        
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = calculateShipping();
        const total = subtotal + shipping;
        
        orderSummary.innerHTML = `
            <div class="calculation-row">
                <span>Subtotal</span>
                <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="calculation-row">
                <span>Frete</span>
                <span>R$ ${shipping.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="calculation-row">
                <span>Desconto</span>
                <span>-R$ 0,00</span>
            </div>
            <div class="calculation-row total">
                <span>Total</span>
                <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        // Atualiza o valor do PIX
        if (pixValueElement) {
            const pixValueText = pixValueElement.nextSibling;
            if (pixValueText) {
                pixValueText.textContent = ` R$ ${total.toFixed(2).replace('.', ',')}`;
            }
        }

        // Atualiza as parcelas do cartão de crédito
        if (installmentsSelect && total > 0) {
            installmentsSelect.innerHTML = '';
            const maxInstallments = Math.min(6, Math.floor(total / 20)); // Mínimo de R$20 por parcela
            for (let i = 1; i <= maxInstallments; i++) {
                const installmentValue = total / i;
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i}x de R$ ${installmentValue.toFixed(2).replace('.', ',')} ${i === 1 ? '(sem juros)' : ''}`;
                installmentsSelect.appendChild(option);
            }
        }
    }

    // Calcula o valor do frete
    function calculateShipping() {
        return cartItems.length > 0 ? 10.00 : 0;
    }
    
    // Renderiza os itens do pedido
    function renderOrderItems() {
        if (!orderItemsContainer) return;
        
        orderItemsContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            orderItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio</p>';
            return;
        }
        
        cartItems.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-details">
                    <span class="item-quantity">${item.quantity}x</span>
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-category">${item.category || item.description || ''}</span>
                    </div>
                </div>
                <span class="item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
    }
    
    // Atualiza o badge do carrinho no header
    function updateCartBadge() {
        if (!cartBadge) return;
        
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        cartBadge.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'} | R$ ${totalAmount.toFixed(2).replace('.', ',')}`;
    }
    
    // Salva o pedido no histórico e cria notificação
    function saveOrder() {
        if (cartItems.length === 0) return null;

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...cartItems],
            status: 'Em processamento',
            total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + calculateShipping(),
            trackingNumber: 'RU' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
        };

        orders.unshift(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Cria notificação do novo pedido
        createOrderNotification(newOrder);
        
        return newOrder;
    }
    
    // Cria notificação para o novo pedido
    function createOrderNotification(order) {
        const itemsCount = order.items.reduce((total, item) => total + item.quantity, 0);
        const notification = {
            id: Date.now(),
            title: 'Novo pedido realizado!',
            message: `Seu pedido #${order.trackingNumber} foi confirmado com sucesso. ${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'} no total de R$ ${order.total.toFixed(2).replace('.', ',')}.`,
            icon: 'bi bi-bag-check',
            date: new Date().toISOString(),
            read: false,
            type: 'order',
            orderId: order.id
        };
        
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.unshift(notification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        updateNotificationBadge();
    }
    
    // Atualiza o badge de notificações
    function updateNotificationBadge() {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const unreadCount = notifications.filter(n => !n.read).length;
        const badgeElement = document.querySelector('.notification-badge');
        
        if (badgeElement) {
            badgeElement.textContent = unreadCount > 0 ? unreadCount : '';
            badgeElement.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }

    // Funções para aplicar máscaras
    function formatCPF(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return value.substring(0, 14);
    }

    function formatTelefone(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        return value;
    }

    function formatCEP(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 8) value = value.substring(0, 8);
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        return value;
    }

    // Aplicar máscaras aos campos
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            this.value = formatCPF(this.value);
            validateCPFField(this);
        });
        
        cpfInput.addEventListener('blur', function() {
            validateCPFField(this);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            this.value = formatTelefone(this.value);
            validatePhoneField(this);
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            this.value = formatCEP(this.value);
            validateCEPField(this);
        });
    }

    // Validação do CPF - Versão corrigida
    function validateCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais (CPF inválido)
        if (/^(\d)\1+$/.test(cpf)) return false;
        
        let sum = 0;
        let remainder;
        
        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        
        // Validação do segundo dígito verificador
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }

    // Função auxiliar para validar e mostrar feedback visual do CPF
    function validateCPFField(cpfField) {
        const cpfValue = cpfField.value.replace(/\D/g, '');
        
        if (cpfValue.length === 0) {
            cpfField.classList.remove('valid', 'invalid');
            removeFieldError(cpfField);
            return false;
        }
        
        if (cpfValue.length < 11) {
            cpfField.classList.add('invalid');
            cpfField.classList.remove('valid');
            showFieldError(cpfField, '* CPF deve conter 11 dígitos');
            return false;
        }
        
        const isValid = validateCPF(cpfField.value);
        
        if (isValid) {
            cpfField.classList.add('valid');
            cpfField.classList.remove('invalid');
            removeFieldError(cpfField);
        } else {
            cpfField.classList.add('invalid');
            cpfField.classList.remove('valid');
            showFieldError(cpfField, '* CPF inválido');
        }
        
        return isValid;
    }

    // Função auxiliar para validar telefone
    function validatePhoneField(phoneField) {
        const phoneValue = phoneField.value.replace(/\D/g, '');
        
        if (phoneValue.length === 0) {
            phoneField.classList.remove('valid', 'invalid');
            removeFieldError(phoneField);
            return false;
        }
        
        if (phoneValue.length < 10) {
            phoneField.classList.add('invalid');
            phoneField.classList.remove('valid');
            showFieldError(phoneField, '* Telefone deve conter pelo menos 10 dígitos');
            return false;
        }
        
        phoneField.classList.add('valid');
        phoneField.classList.remove('invalid');
        removeFieldError(phoneField);
        return true;
    }

    // Função auxiliar para validar email
    function validateEmailField(emailField) {
        const emailValue = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue.length === 0) {
            emailField.classList.remove('valid', 'invalid');
            removeFieldError(emailField);
            return false;
        }
        
        if (!emailRegex.test(emailValue)) {
            emailField.classList.add('invalid');
            emailField.classList.remove('valid');
            showFieldError(emailField, '* Digite um email válido');
            return false;
        }
        
        emailField.classList.add('valid');
        emailField.classList.remove('invalid');
        removeFieldError(emailField);
        return true;
    }

    // Função auxiliar para validar CEP
    function validateCEPField(cepField) {
        const cepValue = cepField.value.replace(/\D/g, '');
        
        if (cepValue.length === 0) {
            cepField.classList.remove('valid', 'invalid');
            removeFieldError(cepField);
            return false;
        }
        
        if (cepValue.length < 8) {
            cepField.classList.add('invalid');
            cepField.classList.remove('valid');
            showFieldError(cepField, '* CEP deve conter 8 dígitos');
            return false;
        }
        
        cepField.classList.add('valid');
        cepField.classList.remove('invalid');
        removeFieldError(cepField);
        return true;
    }

    // Função auxiliar para validar campo de texto genérico
    function validateTextField(textField, fieldName) {
        const value = textField.value.trim();
        
        if (value.length === 0) {
            textField.classList.remove('valid', 'invalid');
            removeFieldError(textField);
            return false;
        }
        
        if (value.length < 2) {
            textField.classList.add('invalid');
            textField.classList.remove('valid');
            showFieldError(textField, `* ${fieldName} deve ter pelo menos 2 caracteres`);
            return false;
        }
        
        textField.classList.add('valid');
        textField.classList.remove('invalid');
        removeFieldError(textField);
        return true;
    }

    // Função auxiliar para validar campo numérico
    function validateNumberField(numberField, fieldName) {
        const value = numberField.value.trim();
        
        if (value.length === 0) {
            numberField.classList.remove('valid', 'invalid');
            removeFieldError(numberField);
            return false;
        }
        
        if (!/^\d+$/.test(value)) {
            numberField.classList.add('invalid');
            numberField.classList.remove('valid');
            showFieldError(numberField, `* ${fieldName} deve conter apenas números`);
            return false;
        }
        
        numberField.classList.add('valid');
        numberField.classList.remove('invalid');
        removeFieldError(numberField);
        return true;
    }

    // Função auxiliar para validar campo de seleção (select)
    function validateSelectField(selectField, fieldName) {
        const value = selectField.value;
        
        if (!value) {
            selectField.classList.add('invalid');
            selectField.classList.remove('valid');
            showFieldError(selectField, `* ${fieldName} é obrigatório`);
            return false;
        }
        
        selectField.classList.add('valid');
        selectField.classList.remove('invalid');
        removeFieldError(selectField);
        return true;
    }

    // Funções para mostrar/remover erros de campo (estilo login.js)
    function showFieldError(field, message) {
        // Remove erro anterior se existir
        removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'custom-error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.textAlign = 'left';
        
        field.parentNode.appendChild(errorDiv);
    }

    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.custom-error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Validação de abas do formulário
    function validateFormTab(tabId) {
        const requiredFields = document.getElementById(tabId).querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
                field.classList.remove('valid');
                showFieldError(field, '* Este campo é obrigatório');
            } else {
                field.classList.remove('invalid');
                
                // Validações específicas para cada tipo de campo
                if (field.id === 'cpf') {
                    if (!validateCPFField(field)) {
                        isValid = false;
                    }
                } else if (field.id === 'telefone') {
                    if (!validatePhoneField(field)) {
                        isValid = false;
                    }
                } else if (field.id === 'email') {
                    if (!validateEmailField(field)) {
                        isValid = false;
                    }
                } else if (field.id === 'cep') {
                    if (!validateCEPField(field)) {
                        isValid = false;
                    }
                } else if (field.id === 'nome') {
                    if (!validateTextField(field, 'Nome completo')) {
                        isValid = false;
                    }
                } else if (field.id === 'endereco') {
                    if (!validateTextField(field, 'Endereço')) {
                        isValid = false;
                    }
                } else if (field.id === 'numero') {
                    if (!validateNumberField(field, 'Número')) {
                        isValid = false;
                    }
                } else if (field.id === 'bairro') {
                    if (!validateTextField(field, 'Bairro')) {
                        isValid = false;
                    }
                } else if (field.id === 'cidade') {
                    if (!validateTextField(field, 'Cidade')) {
                        isValid = false;
                    }
                } else if (field.id === 'estado') {
                    if (!validateSelectField(field, 'Estado')) {
                        isValid = false;
                    }
                } else if (field.id === 'card-number' || field.id === 'debit-card-number') {
                    const cleanValue = field.value.replace(/\D/g, '');
                    if (cleanValue.length < 16) {
                        isValid = false;
                        field.classList.add('invalid');
                        showFieldError(field, '* Número do cartão deve ter 16 dígitos');
                    } else {
                        field.classList.add('valid');
                        removeFieldError(field);
                    }
                } else if (field.id === 'card-expiry' || field.id === 'debit-card-expiry') {
                    const cleanValue = field.value.replace(/\D/g, '');
                    if (cleanValue.length < 4) {
                        isValid = false;
                        field.classList.add('invalid');
                        showFieldError(field, '* Validade deve ter 4 dígitos');
                    } else {
                        field.classList.add('valid');
                        removeFieldError(field);
                    }
                } else if (field.id === 'card-cvv' || field.id === 'debit-card-cvv') {
                    const cleanValue = field.value.replace(/\D/g, '');
                    if (cleanValue.length < 3) {
                        isValid = false;
                        field.classList.add('invalid');
                        showFieldError(field, '* CVC deve ter 3 dígitos');
                    } else {
                        field.classList.add('valid');
                        removeFieldError(field);
                    }
                } else if (field.id === 'card-name' || field.id === 'debit-card-name') {
                    if (!validateTextField(field, 'Nome no cartão')) {
                        isValid = false;
                    }
                } else if (field.id === 'card-installments' || field.id === 'debit-card-bank') {
                    if (!validateSelectField(field, field.id.includes('installments') ? 'Parcelas' : 'Banco emissor')) {
                        isValid = false;
                    }
                } else {
                    // Validação padrão para outros campos
                    field.classList.add('valid');
                    removeFieldError(field);
                }
            }
        });

        return isValid;
    }

    // Navegação entre abas do formulário
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.progress-step');

    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-disabled')) return;
            
            const currentTab = this.closest('.form-tab').id.replace('-form', '');
            const nextStep = this.getAttribute('data-next');

            if (!validateFormTab(`${currentTab}-form`)) {
                showCustomError('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }

            document.querySelectorAll('.form-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            document.getElementById(`${nextStep}-form`).classList.add('active');

            progressSteps.forEach(step => {
                step.classList.remove('active');
                if (step.getAttribute('data-step') === nextStep) {
                    step.classList.add('active');
                }
            });
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');

            document.querySelectorAll('.form-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            document.getElementById(`${prevStep}-form`).classList.add('active');

            progressSteps.forEach(step => {
                step.classList.remove('active');
                if (step.getAttribute('data-step') === prevStep) {
                    step.classList.add('active');
                }
            });
        });
    });

    // Verificação dinâmica dos campos
    function checkFormValid(formId, buttonId) {
        const formTab = document.getElementById(formId);
        const button = document.getElementById(buttonId);
        if (!formTab || !button) return;

        const requiredFields = formTab.querySelectorAll('[required]');
        let allFilled = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFilled = false;
            } else {
                // Validações específicas
                if (field.id === 'cpf' && !validateCPFField(field)) {
                    allFilled = false;
                } else if (field.id === 'telefone' && !validatePhoneField(field)) {
                    allFilled = false;
                } else if (field.id === 'email' && !validateEmailField(field)) {
                    allFilled = false;
                } else if (field.id === 'cep' && !validateCEPField(field)) {
                    allFilled = false;
                } else if (field.id === 'nome' && !validateTextField(field, 'Nome completo')) {
                    allFilled = false;
                } else if (field.id === 'endereco' && !validateTextField(field, 'Endereço')) {
                    allFilled = false;
                } else if (field.id === 'numero' && !validateNumberField(field, 'Número')) {
                    allFilled = false;
                } else if (field.id === 'bairro' && !validateTextField(field, 'Bairro')) {
                    allFilled = false;
                } else if (field.id === 'cidade' && !validateTextField(field, 'Cidade')) {
                    allFilled = false;
                } else if (field.id === 'estado' && !validateSelectField(field, 'Estado')) {
                    allFilled = false;
                }
            }
        });

        if (allFilled) {
            button.classList.remove('btn-disabled');
        } else {
            button.classList.add('btn-disabled');
        }

        return allFilled;
    }

    // Monitorar mudanças nos campos - Dados Pessoais
    const personalInputs = document.querySelectorAll('#personal-form [required]');
    personalInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Validação em tempo real para cada campo
            if (input.id === 'nome') {
                validateTextField(input, 'Nome completo');
            } else if (input.id === 'email') {
                validateEmailField(input);
            } else if (input.id === 'cpf') {
                validateCPFField(input);
            } else if (input.id === 'telefone') {
                validatePhoneField(input);
            }
            checkFormValid('personal-form', 'btn-to-address');
        });

        input.addEventListener('blur', () => {
            // Validação quando o campo perde o foco
            if (input.id === 'nome') {
                validateTextField(input, 'Nome completo');
            } else if (input.id === 'email') {
                validateEmailField(input);
            } else if (input.id === 'cpf') {
                validateCPFField(input);
            } else if (input.id === 'telefone') {
                validatePhoneField(input);
            }
        });
    });

    // Monitorar mudanças nos campos - Endereço
    const addressInputs = document.querySelectorAll('#address-form [required]');
    addressInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Validação em tempo real para cada campo
            if (input.id === 'cep') {
                validateCEPField(input);
            } else if (input.id === 'endereco') {
                validateTextField(input, 'Endereço');
            } else if (input.id === 'numero') {
                validateNumberField(input, 'Número');
            } else if (input.id === 'bairro') {
                validateTextField(input, 'Bairro');
            } else if (input.id === 'cidade') {
                validateTextField(input, 'Cidade');
            } else if (input.id === 'estado') {
                validateSelectField(input, 'Estado');
            }
            checkFormValid('address-form', 'btn-to-payment');
        });

        input.addEventListener('blur', () => {
            // Validação quando o campo perde o foco
            if (input.id === 'cep') {
                validateCEPField(input);
            } else if (input.id === 'endereco') {
                validateTextField(input, 'Endereço');
            } else if (input.id === 'numero') {
                validateNumberField(input, 'Número');
            } else if (input.id === 'bairro') {
                validateTextField(input, 'Bairro');
            } else if (input.id === 'cidade') {
                validateTextField(input, 'Cidade');
            } else if (input.id === 'estado') {
                validateSelectField(input, 'Estado');
            }
        });
    });

    // Busca de CEP
    const buscarCepBtn = document.getElementById('buscar-cep');
    if (buscarCepBtn) {
        buscarCepBtn.addEventListener('click', async function() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length !== 8) {
                showCustomError('Por favor, digite um CEP válido com 8 dígitos.');
                document.getElementById('cep').classList.add('invalid');
                showFieldError(document.getElementById('cep'), '* CEP deve conter 8 dígitos');
                return;
            }

            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-arrow-repeat"></i> Buscando...';
            btn.disabled = true;

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }

                document.getElementById('endereco').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                document.getElementById('numero').focus();

                // Valida automaticamente os campos preenchidos
                validateTextField(document.getElementById('endereco'), 'Endereço');
                validateTextField(document.getElementById('bairro'), 'Bairro');
                validateTextField(document.getElementById('cidade'), 'Cidade');
                validateSelectField(document.getElementById('estado'), 'Estado');

                document.getElementById('cep').classList.remove('invalid');
                document.getElementById('cep').classList.add('valid');
                removeFieldError(document.getElementById('cep'));
                checkFormValid('address-form', 'btn-to-payment');
            } catch (error) {
                showCustomError('CEP não encontrado. Verifique o número e tente novamente.');
                document.getElementById('cep').classList.add('invalid');
                document.getElementById('cep').classList.remove('valid');
                showFieldError(document.getElementById('cep'), '* CEP não encontrado');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // Formatação para campos de cartão
    const formatCardNumber = (input) => {
        input.value = input.value.replace(/\D/g, '')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .substring(0, 19);
    };

    const formatCardExpiry = (input) => {
        input.value = input.value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .substring(0, 5);
    };

    const formatCardCvv = (input) => {
        input.value = input.value.replace(/\D/g, '').substring(0, 3);
    };

    // Aplicar formatação aos campos de cartão
    const cardInputs = [
        { id: 'card-number', format: formatCardNumber },
        { id: 'debit-card-number', format: formatCardNumber },
        { id: 'card-expiry', format: formatCardExpiry },
        { id: 'debit-card-expiry', format: formatCardExpiry },
        { id: 'card-cvv', format: formatCardCvv },
        { id: 'debit-card-cvv', format: formatCardCvv }
    ];

    cardInputs.forEach(cardInput => {
        const element = document.getElementById(cardInput.id);
        if (element) {
            element.addEventListener('input', function() {
                cardInput.format(this);
                // Validação básica em tempo real
                const cleanValue = this.value.replace(/\D/g, '');
                const isValid = this.id.includes('cvv') ? cleanValue.length >= 3 : 
                               this.id.includes('expiry') ? cleanValue.length >= 4 : 
                               cleanValue.length >= 16;
                
                if (isValid) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                    removeFieldError(this);
                } else {
                    this.classList.remove('valid');
                    if (cleanValue.length > 0) {
                        const errorMsg = this.id.includes('cvv') ? '* CVC deve ter 3 dígitos' :
                                       this.id.includes('expiry') ? '* Validade deve ter 4 dígitos' :
                                       '* Número do cartão deve ter 16 dígitos';
                        showFieldError(this, errorMsg);
                    }
                }
            });

            // Validação quando o campo perde o foco
            element.addEventListener('blur', function() {
                const cleanValue = this.value.replace(/\D/g, '');
                if (cleanValue.length > 0) {
                    const isValid = this.id.includes('cvv') ? cleanValue.length >= 3 : 
                                   this.id.includes('expiry') ? cleanValue.length >= 4 : 
                                   cleanValue.length >= 16;
                    
                    if (!isValid) {
                        const errorMsg = this.id.includes('cvv') ? '* CVC deve ter 3 dígitos' :
                                       this.id.includes('expiry') ? '* Validade deve ter 4 dígitos' :
                                       '* Número do cartão deve ter 16 dígitos';
                        showFieldError(this, errorMsg);
                    }
                }
            });
        }
    });

    // Validação em tempo real para campos de texto dos cartões
    const cardNameInputs = ['card-name', 'debit-card-name'];
    cardNameInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('input', function() {
                validateTextField(this, 'Nome no cartão');
            });
            element.addEventListener('blur', function() {
                validateTextField(this, 'Nome no cartão');
            });
        }
    });

    // Validação em tempo real para selects dos cartões
    const cardSelects = ['card-installments', 'debit-card-bank'];
    cardSelects.forEach(selectId => {
        const element = document.getElementById(selectId);
        if (element) {
            element.addEventListener('change', function() {
                validateSelectField(this, selectId.includes('installments') ? 'Parcelas' : 'Banco emissor');
            });
        }
    });

    // Configuração dos métodos de pagamento
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const debitCardForm = document.getElementById('debit-card-form');
    const pixForm = document.getElementById('pix-form');

    function showPaymentForm() {
        if (creditCardForm) creditCardForm.style.display = 'none';
        if (debitCardForm) debitCardForm.style.display = 'none';
        if (pixForm) pixForm.style.display = 'none';

        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!selectedPayment) return;

        if (selectedPayment.id === 'credit-card' && creditCardForm) {
            creditCardForm.style.display = 'block';
        } else if (selectedPayment.id === 'debit-card' && debitCardForm) {
            debitCardForm.style.display = 'block';
        } else if (selectedPayment.id === 'pix' && pixForm) {
            pixForm.style.display = 'block';
        }
    }

    paymentOptions.forEach(option => {
        option.addEventListener('change', showPaymentForm);
    });

    // Inicializar formulário de pagamento
    showPaymentForm();

    // Finalização do pedido
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Verifica se há itens no carrinho
            if (cartItems.length === 0) {
                showCustomError('Seu carrinho está vazio. Adicione produtos antes de finalizar.');
                return;
            }

            // Validação dos campos de pagamento
            let paymentValid = true;
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            
            if (!selectedPayment) {
                showCustomError('Por favor, selecione um método de pagamento.');
                return;
            }

            if (selectedPayment.id === 'credit-card') {
                const creditCardFields = document.querySelectorAll('#credit-card-form [required]');
                creditCardFields.forEach(field => {
                    const cleanValue = field.value.replace(/\D/g, '');
                    let isValid = true;
                    
                    if (!field.value.trim()) {
                        isValid = false;
                        showFieldError(field, '* Este campo é obrigatório');
                    } else if (field.id.includes('number') && cleanValue.length < 16) {
                        isValid = false;
                        showFieldError(field, '* Número do cartão deve ter 16 dígitos');
                    } else if (field.id.includes('expiry') && cleanValue.length < 4) {
                        isValid = false;
                        showFieldError(field, '* Validade deve ter 4 dígitos');
                    } else if (field.id.includes('cvv') && cleanValue.length < 3) {
                        isValid = false;
                        showFieldError(field, '* CVC deve ter 3 dígitos');
                    } else if (field.id.includes('name') && field.value.trim().length < 2) {
                        isValid = false;
                        showFieldError(field, '* Nome no cartão deve ter pelo menos 2 caracteres');
                    } else {
                        removeFieldError(field);
                    }
                    
                    if (!isValid) {
                        field.classList.add('invalid');
                        paymentValid = false;
                    } else {
                        field.classList.remove('invalid');
                        field.classList.add('valid');
                    }
                });
            } else if (selectedPayment.id === 'debit-card') {
                const debitCardFields = document.querySelectorAll('#debit-card-form [required]');
                debitCardFields.forEach(field => {
                    const cleanValue = field.value.replace(/\D/g, '');
                    let isValid = true;
                    
                    if (!field.value.trim()) {
                        isValid = false;
                        showFieldError(field, '* Este campo é obrigatório');
                    } else if (field.id.includes('number') && cleanValue.length < 16) {
                        isValid = false;
                        showFieldError(field, '* Número do cartão deve ter 16 dígitos');
                    } else if (field.id.includes('expiry') && cleanValue.length < 4) {
                        isValid = false;
                        showFieldError(field, '* Validade deve ter 4 dígitos');
                    } else if (field.id.includes('cvv') && cleanValue.length < 3) {
                        isValid = false;
                        showFieldError(field, '* CVC deve ter 3 dígitos');
                    } else if (field.id.includes('name') && field.value.trim().length < 2) {
                        isValid = false;
                        showFieldError(field, '* Nome no cartão deve ter pelo menos 2 caracteres');
                    } else {
                        removeFieldError(field);
                    }
                    
                    if (!isValid) {
                        field.classList.add('invalid');
                        paymentValid = false;
                    } else {
                        field.classList.remove('invalid');
                        field.classList.add('valid');
                    }
                });
            }

            if (!paymentValid) {
                showCustomError('Por favor, preencha todos os campos de pagamento obrigatórios.');
                return;
            }

            // Simulação de processamento
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-arrow-repeat"></i> Processando...';
            this.disabled = true;

            setTimeout(() => {
                // Salva o pedido e cria notificação
                const newOrder = saveOrder();
                
                // Mostra mensagem de sucesso
                const successOverlay = document.getElementById('success-overlay');
                const successMessage = document.getElementById('success-message');
                
                if (successOverlay) successOverlay.style.display = 'block';
                if (successMessage) successMessage.style.display = 'block';
                
                // Exibe detalhes do pedido na mensagem de sucesso
                if (newOrder) {
                    const successDetails = document.querySelector('#success-message p');
                    if (successDetails) {
                        successDetails.innerHTML = `Obrigado por sua compra! Número do pedido: <strong>#${newOrder.trackingNumber}</strong>. Você receberá um e-mail com os detalhes do pedido.`;
                    }
                }

                // Limpa o carrinho
                localStorage.removeItem('cart');
                updateCartBadge();

                // Redireciona após 5 segundos
                setTimeout(() => {
                    window.location.href = 'pedidos.html';
                }, 5000);
            }, 2000);
        });
    }

    // Função para mostrar erros personalizados (estilo login.js)
    function showCustomError(message) {
        // Remove mensagem de erro anterior se existir
        const existingError = document.querySelector('.custom-error-message-global');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'custom-error-message custom-error-message-global';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.backgroundColor = '#fdf2f2';
        errorDiv.style.border = '1px solid #f8d7da';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.padding = '12px';
        errorDiv.style.margin = '15px 0';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.fontSize = '0.9rem';
        
        // Adiciona animação de shake
        errorDiv.classList.add('shake');
        setTimeout(() => {
            errorDiv.classList.remove('shake');
        }, 500);
        
        // Insere a mensagem antes do botão de finalizar compra
        const checkoutContainer = document.querySelector('.checkout-button-container');
        if (checkoutContainer) {
            checkoutContainer.insertBefore(errorDiv, checkoutButton);
        } else {
            // Fallback: insere no início do main
            const main = document.querySelector('main');
            if (main) {
                main.insertBefore(errorDiv, main.firstChild);
            }
        }
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Inicialização da página
    renderOrderItems();
    updateOrderSummary();
    updateCartBadge();
    checkFormValid('personal-form', 'btn-to-address');
    updateNotificationBadge();
});