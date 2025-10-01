// Finalizar_Compra.js - Código atualizado e otimizado
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
                        <span class="item-category">${item.description || ''}</span>
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
            icon: 'fas fa-shopping-bag',
            date: new Date().toISOString(),
            read: false,
            action: {
                text: 'Acompanhar pedido',
                url: 'pedidos.html'
            }
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

    // Validação do CPF - Versão corrigida e otimizada
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
            return false;
        }
        
        if (cpfValue.length < 11) {
            cpfField.classList.add('invalid');
            cpfField.classList.remove('valid');
            return false;
        }
        
        const isValid = validateCPF(cpfField.value);
        
        if (isValid) {
            cpfField.classList.add('valid');
            cpfField.classList.remove('invalid');
        } else {
            cpfField.classList.add('invalid');
            cpfField.classList.remove('valid');
        }
        
        return isValid;
    }

    // Função auxiliar para validar telefone
    function validatePhoneField(phoneField) {
        const phoneValue = phoneField.value.replace(/\D/g, '');
        
        if (phoneValue.length === 0) {
            phoneField.classList.remove('valid', 'invalid');
            return false;
        }
        
        if (phoneValue.length < 10) {
            phoneField.classList.add('invalid');
            phoneField.classList.remove('valid');
            return false;
        }
        
        phoneField.classList.add('valid');
        phoneField.classList.remove('invalid');
        return true;
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
            } else {
                field.classList.remove('invalid');
                
                // Validação específica para CPF
                if (field.id === 'cpf') {
                    if (!validateCPFField(field)) {
                        isValid = false;
                    }
                }
                
                // Validação específica para telefone
                if (field.id === 'telefone') {
                    if (!validatePhoneField(field)) {
                        isValid = false;
                    }
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
            const currentTab = this.closest('.form-tab').id.replace('-form', '');
            const nextStep = this.getAttribute('data-next');

            if (!validateFormTab(`${currentTab}-form`)) {
                showError('Por favor, preencha todos os campos obrigatórios corretamente.');
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
                }
                if (field.id === 'telefone' && !validatePhoneField(field)) {
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

    // Monitorar mudanças nos campos
    const personalInputs = document.querySelectorAll('#personal-form [required]');
    personalInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkFormValid('personal-form', 'btn-to-address');
        });
    });

    const addressInputs = document.querySelectorAll('#address-form [required]');
    addressInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkFormValid('address-form', 'btn-to-payment');
        });
    });

    // Busca de CEP
    const buscarCepBtn = document.getElementById('buscar-cep');
    if (buscarCepBtn) {
        buscarCepBtn.addEventListener('click', async function() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep.length !== 8) {
                showError('Por favor, digite um CEP válido com 8 dígitos.');
                document.getElementById('cep').classList.add('invalid');
                return;
            }

            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
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

                document.getElementById('cep').classList.remove('invalid');
                document.getElementById('cep').classList.add('valid');
                checkFormValid('address-form', 'btn-to-payment');
            } catch (error) {
                showError('CEP não encontrado. Verifique o número e tente novamente.');
                document.getElementById('cep').classList.add('invalid');
                document.getElementById('cep').classList.remove('valid');
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
                if (this.value.replace(/\D/g, '').length >= (this.id.includes('cvv') ? 3 : (this.id.includes('expiry') ? 4 : 16))) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.remove('valid');
                }
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
                showError('Seu carrinho está vazio. Adicione produtos antes de finalizar.');
                return;
            }

            // Validação dos campos de pagamento
            let paymentValid = true;
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            
            if (!selectedPayment) {
                showError('Por favor, selecione um método de pagamento.');
                return;
            }

            if (selectedPayment.id === 'credit-card') {
                const creditCardFields = document.querySelectorAll('#credit-card-form [required]');
                creditCardFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('invalid');
                        paymentValid = false;
                    } else {
                        field.classList.remove('invalid');
                        // Validação básica de campos de cartão
                        const cleanValue = field.value.replace(/\D/g, '');
                        if ((field.id.includes('number') && cleanValue.length < 16) ||
                            (field.id.includes('expiry') && cleanValue.length < 4) ||
                            (field.id.includes('cvv') && cleanValue.length < 3)) {
                            field.classList.add('invalid');
                            paymentValid = false;
                        } else {
                            field.classList.add('valid');
                        }
                    }
                });
            } else if (selectedPayment.id === 'debit-card') {
                const debitCardFields = document.querySelectorAll('#debit-card-form [required]');
                debitCardFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('invalid');
                        paymentValid = false;
                    } else {
                        field.classList.remove('invalid');
                        // Validação básica de campos de cartão
                        const cleanValue = field.value.replace(/\D/g, '');
                        if ((field.id.includes('number') && cleanValue.length < 16) ||
                            (field.id.includes('expiry') && cleanValue.length < 4) ||
                            (field.id.includes('cvv') && cleanValue.length < 3)) {
                            field.classList.add('invalid');
                            paymentValid = false;
                        } else {
                            field.classList.add('valid');
                        }
                    }
                });
            }

            if (!paymentValid) {
                showError('Por favor, preencha todos os campos de pagamento obrigatórios.');
                return;
            }

            // Simulação de processamento
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
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
                    const successDetails = document.getElementById('success-details');
                    if (successDetails) {
                        successDetails.innerHTML = `
                            <p>Número do pedido: <strong>#${newOrder.trackingNumber}</strong></p>
                            <p>Total: <strong>R$ ${newOrder.total.toFixed(2).replace('.', ',')}</strong></p>
                            <p>Status: <strong>${newOrder.status}</strong></p>
                        `;
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

    // Função para criar notificação de novo pedido (adicione no finalizar_compra.js)
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

    // Função para mostrar erros
    function showError(message) {
        const errorElement = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        if (errorElement && errorText) {
            errorText.textContent = message;
            errorElement.style.display = 'flex';

            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        } else {
            // Fallback caso os elementos de erro não existam
            alert(message);
        }
    }

    // Inicialização da página
    renderOrderItems();
    updateOrderSummary();
    updateCartBadge();
    checkFormValid('personal-form', 'btn-to-address');
    updateNotificationBadge();
});