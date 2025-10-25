// Perfil.js - Gerenciamento completo do perfil do usuário

class ProfileManager {
    constructor() {
        this.initProfilePicture();
        this.profileNavigation = new ProfileNavigation();
        this.passwordManager = new PasswordManager();
        this.addressManager = new AddressManager();
        this.securityManager = new SecurityManager();
        this.paymentsManager = new PaymentsManager();
        this.initEditButtons();
        this.initFormSubmissions();
    }

    initProfilePicture() {
        const profilePicInput = document.getElementById('profile-picture-input');
        if (profilePicInput) {
            profilePicInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        document.getElementById('profile-picture').src = e.target.result;
                        this.showAlert('Foto de perfil atualizada com sucesso!', 'success');
                    }.bind(this);
                    reader.readAsDataURL(file);
                }
            }.bind(this));
        }
    }

    initEditButtons() {
        // Adiciona funcionalidade aos botões de edição nas informações pessoais
        const editButtons = document.querySelectorAll('.info-item .edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const infoItem = e.target.closest('.info-item');
                this.toggleEditMode(infoItem);
            });
        });
    }

    toggleEditMode(infoItem) {
        const label = infoItem.querySelector('label').textContent.replace(':', '');
        const valueElement = infoItem.querySelector('.info-value');
        const currentValue = valueElement.textContent;
        
        // Se já está em modo de edição, salva as alterações
        if (infoItem.classList.contains('editing')) {
            const input = infoItem.querySelector('input');
            const newValue = input.value;
            
            // Validação básica
            if (newValue.trim() === '') {
                this.showAlert(`${label} não pode estar vazio`, 'error');
                return;
            }
            
            // Simulação de salvamento
            setTimeout(() => {
                valueElement.textContent = newValue;
                infoItem.classList.remove('editing');
                this.showAlert(`${label} atualizado com sucesso!`, 'success');
            }, 1000);
        } else {
            // Entra no modo de edição
            valueElement.style.display = 'none';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.className = 'edit-input';
            
            // Adiciona validação específica para email
            if (label.toLowerCase().includes('email')) {
                input.type = 'email';
            }
            
            // Adiciona validação específica para telefone
            if (label.toLowerCase().includes('telefone')) {
                input.type = 'tel';
                input.pattern = '^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$';
                input.placeholder = '(00) 00000-0000';
            }
            
            infoItem.appendChild(input);
            infoItem.classList.add('editing');
            input.focus();
            
            // Permite salvar pressionando Enter
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.toggleEditMode(infoItem);
                }
            });
        }
    }

    initFormSubmissions() {
        // Botão Salvar Alterações nas informações pessoais
        const saveBtn = document.querySelector('.info-actions .btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Salva todas as informações em modo de edição
                const editingItems = document.querySelectorAll('.info-item.editing');
                if (editingItems.length > 0) {
                    editingItems.forEach(item => {
                        this.toggleEditMode(item);
                    });
                } else {
                    this.showAlert('Nenhuma alteração para salvar', 'warning');
                }
            });
        }

        // Botão Cancelar nas informações pessoais
        const cancelBtn = document.querySelector('.info-actions .btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                // Cancela todas as edições em andamento
                const editingItems = document.querySelectorAll('.info-item.editing');
                editingItems.forEach(item => {
                    const valueElement = item.querySelector('.info-value');
                    const input = item.querySelector('input');
                    valueElement.style.display = 'block';
                    input.remove();
                    item.classList.remove('editing');
                });
                this.showAlert('Alterações canceladas', 'warning');
            });
        }
    }

    showAlert(message, type) {
        // Remove alertas existentes
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(alertBox);
        
        // Estilo para o alerta
        alertBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            opacity: 1;
            transition: opacity 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
        `;
        
        if (type === 'success') {
            alertBox.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            alertBox.style.backgroundColor = '#f44336';
        } else if (type === 'warning') {
            alertBox.style.backgroundColor = '#ff9800';
        }
        
        alertBox.querySelector('.close-alert').addEventListener('click', () => {
            alertBox.remove();
        });
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 5000);
    }
}

class ProfileNavigation {
    constructor() {
        this.currentSection = 'personal-info';
        this.initElements();
        this.setupEventListeners();
        this.showInitialSection();
    }

    initElements() {
        this.menuLinks = document.querySelectorAll('.profile-menu a');
        this.sections = document.querySelectorAll('.profile-section');
    }

    setupEventListeners() {
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
            });
        });
    }

    showInitialSection() {
        const activeLink = document.querySelector('.profile-menu a.active');
        const initialSection = activeLink ? activeLink.getAttribute('data-section') : 'personal-info';
        this.showSection(initialSection);
    }

    showSection(sectionId) {
        // Atualiza o menu ativo
        this.menuLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });

        // Atualiza a seção visível
        this.sections.forEach(section => {
            const isActive = section.id === `${sectionId}-section`;
            section.classList.toggle('active', isActive);
            section.style.display = isActive ? 'block' : 'none';
        });

        this.currentSection = sectionId;
        
        // Rola suavemente para o topo da seção
        const activeSection = document.getElementById(`${sectionId}-section`);
        if (activeSection) {
            activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

class PasswordManager {
    constructor() {
        this.isEditing = false;
        this.initElements();
        this.setupEventListeners();
    }

    initElements() {
        this.passwordInput = document.getElementById('user-password-input');
        this.editButton = document.getElementById('edit-password-btn');
        this.toggleBtn = document.querySelector('.toggle-password');
        this.saveBtn = document.querySelector('.info-actions .btn-save');
        this.cancelBtn = document.querySelector('.info-actions .btn-cancel');
    }

    setupEventListeners() {
        if (this.editButton) {
            this.editButton.addEventListener('click', () => this.togglePasswordEdit());
        }

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePasswordVisibility());
        }

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.savePassword());
        }

        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.cancelEditing());
        }
    }

    togglePasswordEdit() {
        if (this.isEditing) {
            this.savePassword();
        } else {
            this.startEditing();
        }
    }

    startEditing() {
        this.isEditing = true;
        this.passwordInput.disabled = false;
        this.passwordInput.value = '';
        this.passwordInput.type = 'password';
        this.passwordInput.focus();
        
        if (this.editButton) {
            this.editButton.innerHTML = '<i class="bi bi-save"></i> Salvar';
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.style.display = 'block';
        }
        
        document.querySelector('.info-actions').style.display = 'flex';
    }

    togglePasswordVisibility() {
        if (!this.isEditing) return;
        
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            if (this.toggleBtn) {
                this.toggleBtn.innerHTML = '<i class="bi bi-eye-slash"></i>';
            }
        } else {
            this.passwordInput.type = 'password';
            if (this.toggleBtn) {
                this.toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
            }
        }
    }

    savePassword() {
        const newPassword = this.passwordInput.value;
        
        if (!this.validatePassword(newPassword)) {
            return;
        }
        
        // Simulação de envio para o servidor
        setTimeout(() => {
            this.showAlert('Senha alterada com sucesso!', 'success');
            this.exitEditing();
        }, 1000);
    }

    validatePassword(password) {
        if (password.length < 8) {
            this.showAlert('A senha deve ter pelo menos 8 caracteres', 'error');
            return false;
        }
        
        if (!/[A-Z]/.test(password)) {
            this.showAlert('A senha deve conter pelo menos uma letra maiúscula', 'error');
            return false;
        }
        
        if (!/[0-9]/.test(password)) {
            this.showAlert('A senha deve conter pelo menos um número', 'error');
            return false;
        }
        
        if (!/[!@#$%^&*]/.test(password)) {
            this.showAlert('A senha deve conter pelo menos um símbolo (!@#$%^&*)', 'error');
            return false;
        }
        
        return true;
    }

    cancelEditing() {
        this.exitEditing();
        this.showAlert('Alterações não salvas', 'warning');
    }

    exitEditing() {
        this.isEditing = false;
        this.passwordInput.disabled = true;
        this.passwordInput.value = '••••••••';
        this.passwordInput.type = 'password';
        
        if (this.editButton) {
            this.editButton.innerHTML = '<i class="bi bi-pencil"></i> Alterar';
        }
        
        if (this.toggleBtn) {
            this.toggleBtn.style.display = 'none';
        }
        
        document.querySelector('.info-actions').style.display = 'none';
    }

    showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(alertBox);
        
        alertBox.querySelector('.close-alert').addEventListener('click', () => {
            alertBox.remove();
        });
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 5000);
    }
}

class AddressManager {
    constructor() {
        this.initElements();
        this.setupEventListeners();
        this.setupCEPValidation();
    }

    initElements() {
        this.addressList = document.querySelector('.address-list');
        this.addressForm = document.querySelector('.address-form');
        this.btnAddAddress = document.querySelector('.btn-add-address');
        this.btnSaveAddress = this.addressForm?.querySelector('.btn-save');
        this.btnCancelAddress = this.addressForm?.querySelector('.btn-cancel');
    }

    setupEventListeners() {
        if (this.btnAddAddress) {
            this.btnAddAddress.addEventListener('click', () => this.showAddressForm());
        }

        if (this.btnCancelAddress) {
            this.btnCancelAddress.addEventListener('click', () => this.hideAddressForm());
        }

        if (this.btnSaveAddress) {
            this.btnSaveAddress.addEventListener('click', () => this.saveAddress());
        }

        // Event delegation for edit and delete buttons
        if (this.addressList) {
            this.addressList.addEventListener('click', (e) => {
                if (e.target.closest('.edit-btn')) {
                    this.editAddress(e.target.closest('.address-card'));
                } else if (e.target.closest('.delete-btn')) {
                    this.deleteAddress(e.target.closest('.address-card'));
                }
            });
        }
    }

    setupCEPValidation() {
        const cepInput = document.getElementById('address-cep');
        if (cepInput) {
            cepInput.addEventListener('blur', () => {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    this.fetchAddressByCEP(cep);
                }
            });
        }
    }

    fetchAddressByCEP(cep) {
        // Simulação de busca de endereço por CEP
        // Em uma implementação real, você faria uma requisição para uma API como ViaCEP
        console.log(`Buscando endereço para CEP: ${cep}`);
        
        // Simulação de resposta da API
        setTimeout(() => {
            // Dados fictícios para exemplo
            const addressData = {
                logradouro: 'Rua das Flores',
                bairro: 'Centro',
                localidade: 'Araraquara',
                uf: 'SP'
            };
            
            document.getElementById('address-street').value = addressData.logradouro;
            document.getElementById('address-city').value = addressData.localidade;
            document.getElementById('address-state').value = addressData.uf;
        }, 1000);
    }

    showAddressForm() {
        this.addressForm.style.display = 'block';
        this.btnAddAddress.style.display = 'none';
    }

    hideAddressForm() {
        this.addressForm.style.display = 'none';
        this.btnAddAddress.style.display = 'block';
        this.resetForm();
    }

    saveAddress() {
        // Validação básica
        const cep = document.getElementById('address-cep').value;
        const street = document.getElementById('address-street').value;
        const number = document.getElementById('address-number').value;
        const city = document.getElementById('address-city').value;
        const state = document.getElementById('address-state').value;
        
        if (!cep || !street || !number || !city || !state) {
            this.showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Simulação de salvamento
        setTimeout(() => {
            this.showAlert('Endereço salvo com sucesso!', 'success');
            this.hideAddressForm();
        }, 1000);
    }

    resetForm() {
        const form = document.querySelector('.address-form');
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.id !== 'address-country') {
                input.value = '';
            }
        });
    }

    editAddress(addressCard) {
        // Preenche o formulário com os dados do endereço
        const addressDetails = addressCard.querySelector('.address-details');
        const paragraphs = addressDetails.querySelectorAll('p');
        
        // Extrai dados do endereço (em uma implementação real, você teria esses dados em variáveis)
        document.getElementById('address-name').value = 'Casa'; // Exemplo
        document.getElementById('address-cep').value = '14800-000';
        document.getElementById('address-street').value = 'Rua das Flores';
        document.getElementById('address-number').value = '123';
        document.getElementById('address-city').value = 'Araraquara';
        document.getElementById('address-state').value = 'SP';
        document.getElementById('address-phone').value = '(16) 99713-9654';
        
        this.showAddressForm();
        
        // Remove o endereço antigo após edição (em uma implementação real, você atualizaria no servidor)
        this.btnSaveAddress.onclick = () => {
            addressCard.remove();
            this.saveAddress();
        };
    }

    deleteAddress(addressCard) {
        if (confirm('Tem certeza que deseja excluir este endereço?')) {
            addressCard.remove();
            this.showAlert('Endereço excluído com sucesso.', 'success');
        }
    }

    showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 5000);
    }
}

class SecurityManager {
    constructor() {
        this.initElements();
        this.setupEventListeners();
    }

    initElements() {
        this.twoFactorToggle = document.getElementById('two-factor-toggle');
        this.btnChangePassword = document.querySelector('.btn-change-password');
        this.btnLogoutAll = document.querySelector('.btn-logout-all');
        this.btnDeleteAccount = document.querySelector('.btn-delete-account');
        this.btnLogoutDevice = document.querySelectorAll('.btn-logout-device');
    }

    setupEventListeners() {
        if (this.twoFactorToggle) {
            this.twoFactorToggle.addEventListener('change', (e) => {
                this.toggleTwoFactor(e.target.checked);
            });
        }

        if (this.btnChangePassword) {
            this.btnChangePassword.addEventListener('click', () => {
                this.changePassword();
            });
        }

        if (this.btnLogoutAll) {
            this.btnLogoutAll.addEventListener('click', () => {
                this.logoutAllDevices();
            });
        }

        if (this.btnDeleteAccount) {
            this.btnDeleteAccount.addEventListener('click', () => {
                this.deleteAccount();
            });
        }

        // Event delegation for device logout buttons
        this.btnLogoutDevice.forEach(button => {
            button.addEventListener('click', (e) => {
                this.logoutDevice(e.target.closest('.device-item'));
            });
        });
    }

    toggleTwoFactor(enabled) {
        if (enabled) {
            this.showAlert('Autenticação de dois fatores ativada. Você receberá um código por email para confirmar.', 'success');
        } else {
            this.showAlert('Autenticação de dois fatores desativada.', 'warning');
        }
    }

    changePassword() {
        // Redireciona para a seção de informações pessoais onde a senha pode ser alterada
        document.querySelector('.profile-menu a[data-section="personal-info"]').click();
        setTimeout(() => {
            document.getElementById('edit-password-btn').click();
        }, 300);
    }

    logoutDevice(deviceItem) {
        if (confirm('Tem certeza que deseja desconectar este dispositivo?')) {
            deviceItem.remove();
            this.showAlert('Dispositivo desconectado com sucesso.', 'success');
        }
    }

    logoutAllDevices() {
        if (confirm('Tem certeza que deseja desconectar todos os dispositivos?')) {
            document.querySelectorAll('.device-item').forEach(device => {
                device.remove();
            });
            this.showAlert('Todos os dispositivos foram desconectados com sucesso.', 'success');
        }
    }

    deleteAccount() {
        if (confirm('ATENÇÃO: Esta ação é irreversível. Tem certeza que deseja excluir sua conta permanentemente?')) {
            // Simulação de exclusão de conta
            setTimeout(() => {
                this.showAlert('Sua conta será excluída. Você receberá um email de confirmação.', 'warning');
                // Em uma implementação real, você redirecionaria para a página de login
                // window.location.href = 'login.html';
            }, 1000);
        }
    }

    showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 5000);
    }
}

class PaymentsManager {
    constructor() {
        this.initElements();
        this.setupEventListeners();
    }

    initElements() {
        this.paymentMethods = document.querySelector('.payment-methods');
        this.paymentForm = document.querySelector('.payment-form');
        this.btnAddPayment = document.querySelector('.btn-add-payment');
        this.paymentTypes = document.querySelectorAll('.payment-type');
        this.creditCardForm = document.getElementById('credit-card-form');
        this.btnSavePayment = this.paymentForm?.querySelector('.btn-save');
        this.btnCancelPayment = this.paymentForm?.querySelector('.btn-cancel');
    }

    setupEventListeners() {
        if (this.btnAddPayment) {
            this.btnAddPayment.addEventListener('click', () => this.showPaymentForm());
        }

        if (this.paymentTypes) {
            this.paymentTypes.forEach(type => {
                type.addEventListener('click', (e) => {
                    this.selectPaymentType(e.target);
                });
            });
        }

        if (this.btnSavePayment) {
            this.btnSavePayment.addEventListener('click', () => this.savePaymentMethod());
        }

        if (this.btnCancelPayment) {
            this.btnCancelPayment.addEventListener('click', () => this.hidePaymentForm());
        }

        // Event delegation for edit and delete buttons
        if (this.paymentMethods) {
            this.paymentMethods.addEventListener('click', (e) => {
                if (e.target.closest('.edit-btn')) {
                    this.editPaymentMethod(e.target.closest('.payment-method'));
                } else if (e.target.closest('.delete-btn')) {
                    this.deletePaymentMethod(e.target.closest('.payment-method'));
                }
            });
        }

        // Formatação do número do cartão
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                e.target.value = value.substring(0, 19);
            });
        }

        // Formatação da validade do cartão
        const cardExpiryInput = document.getElementById('card-expiry');
        if (cardExpiryInput) {
            cardExpiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value.substring(0, 5);
            });
        }
    }

    showPaymentForm() {
        this.paymentForm.style.display = 'block';
        this.btnAddPayment.style.display = 'none';
    }

    hidePaymentForm() {
        this.paymentForm.style.display = 'none';
        this.btnAddPayment.style.display = 'block';
        this.resetForm();
    }

    selectPaymentType(element) {
        this.paymentTypes.forEach(type => type.classList.remove('active'));
        element.classList.add('active');
        
        // Mostra o formulário específico para o tipo de pagamento selecionado
        const paymentType = element.getAttribute('data-type');
        
        // Esconde todos os formulários primeiro
        document.querySelectorAll('[id$="-form"]').forEach(form => {
            form.style.display = 'none';
        });
        
        // Mostra o formulário correspondente
        if (paymentType === 'credit' || paymentType === 'debit') {
            document.getElementById('credit-card-form').style.display = 'block';
        } else if (paymentType === 'boleto') {
            // Em uma implementação real, você mostraria informações sobre boleto
        } else if (paymentType === 'pix') {
            // Em uma implementação real, você mostraria informações sobre PIX
        }
    }

    savePaymentMethod() {
        const activePaymentType = document.querySelector('.payment-type.active').getAttribute('data-type');
        
        if (activePaymentType === 'credit' || activePaymentType === 'debit') {
            // Validação do cartão
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCVV = document.getElementById('card-cvv').value;
            
            if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
                this.showAlert('Por favor, preencha todos os campos do cartão.', 'error');
                return;
            }
            
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                this.showAlert('Número do cartão inválido.', 'error');
                return;
            }
        }
        
        // Simulação de salvamento
        setTimeout(() => {
            this.showAlert('Método de pagamento adicionado com sucesso!', 'success');
            this.hidePaymentForm();
            
            // Em uma implementação real, você adicionaria o novo método à lista
        }, 1000);
    }

    resetForm() {
        const form = document.querySelector('.payment-form');
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
        });
        
        // Reseta o tipo de pagamento para cartão de crédito
        this.paymentTypes.forEach(type => type.classList.remove('active'));
        this.paymentTypes[0].classList.add('active');
        this.selectPaymentType(this.paymentTypes[0]);
    }

    editPaymentMethod(paymentMethod) {
        // Preenche o formulário com os dados do método de pagamento
        const cardInfo = paymentMethod.querySelector('.card-info');
        const cardType = cardInfo.querySelector('h4').textContent;
        
        if (cardType.includes('Cartão de Crédito')) {
            document.querySelector('.payment-type[data-type="credit"]').click();
            // Em uma implementação real, você preencheria os campos com os dados do cartão
        }
        
        this.showPaymentForm();
        
        // Remove o método antigo após edição (em uma implementação real, você atualizaria no servidor)
        this.btnSavePayment.onclick = () => {
            paymentMethod.remove();
            this.savePaymentMethod();
        };
    }

    deletePaymentMethod(paymentMethod) {
        if (confirm('Tem certeza que deseja excluir este método de pagamento?')) {
            paymentMethod.remove();
            this.showAlert('Método de pagamento excluído com sucesso.', 'success');
        }
    }

    showAlert(message, type) {
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert ${type}`;
        alertBox.innerHTML = `
            <span>${message}</span>
            <button class="close-alert">&times;</button>
        `;
        
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add('fade-out');
            setTimeout(() => alertBox.remove(), 500);
        }, 5000);
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const profileManager = new ProfileManager();
});