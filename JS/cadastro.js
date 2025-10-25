        document.addEventListener('DOMContentLoaded', () => {
            // Elementos dos botões de seleção
            const customerButton = document.getElementById('customer-button');
            const sellerButton = document.getElementById('seller-button');
            const institutionButton = document.getElementById('institution-button');

            // Formulários
            const customerForm = document.getElementById('customer-form');
            const sellerForm = document.getElementById('seller-form');
            const institutionForm = document.getElementById('institution-form');

            // Mensagem de sucesso
            const successMessage = document.getElementById('successMessage');
            const countdownElement = document.getElementById('countdown');

            // Função para mostrar mensagem de sucesso
            function showSuccessMessage() {
                successMessage.classList.add('active');
                
                let seconds = 3;
                countdownElement.textContent = `Redirecionando em ${seconds} segundos...`;
                
                const countdownInterval = setInterval(() => {
                    seconds--;
                    if (seconds > 0) {
                        countdownElement.textContent = `Redirecionando em ${seconds} segundo${seconds > 1 ? 's' : ''}...`;
                    } else {
                        countdownElement.textContent = 'Redirecionando agora...';
                        clearInterval(countdownInterval);
                        
                        // Redirecionar para a página de login após 1 segundo
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1000);
                    }
                }, 1000);
            }

            // Função para trocar entre formulários com animação
            function switchForm(activeButton, activeForm, direction) {
                // Remover classe active de todos os botões
                customerButton.classList.remove('active');
                sellerButton.classList.remove('active');
                institutionButton.classList.remove('active');
                
                // Adicionar classe active ao botão clicado
                activeButton.classList.add('active');
                
                // Remover todas as animações do card-header
                const cardHeader = document.querySelector('.card-header');
                cardHeader.classList.remove('waves-animation', 'particles-animation', 'molecules-animation');
                
                // Adicionar animação específica baseada no tipo de login
                if (activeButton === customerButton) {
                    cardHeader.classList.add('waves-animation');
                } else if (activeButton === sellerButton) {
                    cardHeader.classList.add('particles-animation');
                } else if (activeButton === institutionButton) {
                    cardHeader.classList.add('molecules-animation');
                }
                
                // Encontrar o formulário ativo atual
                const currentActiveForm = document.querySelector('.form-container.active');
                
                if (currentActiveForm && currentActiveForm !== activeForm) {
                    // Determinar animações baseadas na direção
                    const currentIndex = Array.from([customerForm, sellerForm, institutionForm]).indexOf(currentActiveForm);
                    const newIndex = Array.from([customerForm, sellerForm, institutionForm]).indexOf(activeForm);
                    
                    const currentAnimation = newIndex > currentIndex ? 'slide-out-left' : 'slide-out-right';
                    const newAnimation = newIndex > currentIndex ? 'slide-in-right' : 'slide-in-left';
                    
                    // Aplicar animação de saída
                    currentActiveForm.classList.add(currentAnimation);
                    
                    // Remover classe active do formulário atual
                    setTimeout(() => {
                        currentActiveForm.classList.remove('active');
                        currentActiveForm.classList.remove(currentAnimation);
                        
                        // Adicionar classe active e animação de entrada ao novo formulário
                        activeForm.classList.add(newAnimation);
                        activeForm.classList.add('active');
                        
                        // Remover animação após a transição
                        setTimeout(() => {
                            activeForm.classList.remove(newAnimation);
                        }, 400);
                    }, 400);
                } else {
                    // Primeira vez ou mesmo formulário
                    document.querySelectorAll('.form-container').forEach(form => {
                        form.classList.remove('active');
                    });
                    activeForm.classList.add('active');
                }
            }

            // Event listeners para os botões
            customerButton.addEventListener('click', () => {
                switchForm(customerButton, customerForm, 'left');
            });

            sellerButton.addEventListener('click', () => {
                switchForm(sellerButton, sellerForm, 'middle');
            });

            institutionButton.addEventListener('click', () => {
                switchForm(institutionButton, institutionForm, 'right');
            });

            // Função para verificar força da senha
            function checkPasswordStrength(password) {
                let strength = 0;
                
                if (password.length >= 8) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;
                
                return strength;
            }

            // Função para exibir força da senha
            function displayPasswordStrength(password, strengthElement) {
                const strength = checkPasswordStrength(password);
                
                if (password.length === 0) {
                    strengthElement.textContent = '';
                    return;
                }
                
                if (strength <= 2) {
                    strengthElement.textContent = 'Senha fraca';
                    strengthElement.className = 'password-strength strength-weak';
                } else if (strength <= 4) {
                    strengthElement.textContent = 'Senha média';
                    strengthElement.className = 'password-strength strength-medium';
                } else {
                    strengthElement.textContent = 'Senha forte';
                    strengthElement.className = 'password-strength strength-strong';
                }
            }

            // Validação do formulário de cliente
            const customerSignupForm = document.getElementById('customerSignupForm');

            customerSignupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // Validação do nome
                const firstName = document.getElementById('customer-first-name');
                if (!firstName.value.trim()) {
                    const firstNameError = document.getElementById('customer-first-name-error');
                    firstNameError.textContent = '* O nome é obrigatório';
                    isValid = false;
                } else {
                    const firstNameError = document.getElementById('customer-first-name-error');
                    firstNameError.textContent = '';
                }

                // Validação do sobrenome
                const lastName = document.getElementById('customer-last-name');
                if (!lastName.value.trim()) {
                    const lastNameError = document.getElementById('customer-last-name-error');
                    lastNameError.textContent = '* O sobrenome é obrigatório';
                    isValid = false;
                } else {
                    const lastNameError = document.getElementById('customer-last-name-error');
                    lastNameError.textContent = '';
                }

                // Validação do email
                const email = document.getElementById('customer-email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim()) {
                    const emailError = document.getElementById('customer-email-error');
                    emailError.textContent = '* O email é obrigatório';
                    isValid = false;
                } else if (!emailRegex.test(email.value)) {
                    const emailError = document.getElementById('customer-email-error');
                    emailError.textContent = '* Digite um email válido';
                    isValid = false;
                } else {
                    const emailError = document.getElementById('customer-email-error');
                    emailError.textContent = '';
                }

                // Validação do telefone
                const phone = document.getElementById('customer-phone');
                const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
                if (!phone.value.trim()) {
                    const phoneError = document.getElementById('customer-phone-error');
                    phoneError.textContent = '* O telefone é obrigatório';
                    isValid = false;
                } else if (!phoneRegex.test(phone.value)) {
                    const phoneError = document.getElementById('customer-phone-error');
                    phoneError.textContent = '* Digite um telefone válido';
                    isValid = false;
                } else {
                    const phoneError = document.getElementById('customer-phone-error');
                    phoneError.textContent = '';
                }

                // Validação da senha
                const password = document.getElementById('customer-password');
                if (!password.value) {
                    const passwordError = document.getElementById('customer-password-error');
                    passwordError.textContent = '* A senha é obrigatória';
                    isValid = false;
                } else if (password.value.length < 6) {
                    const passwordError = document.getElementById('customer-password-error');
                    passwordError.textContent = '* A senha deve ter pelo menos 6 caracteres';
                    isValid = false;
                } else {
                    const passwordError = document.getElementById('customer-password-error');
                    passwordError.textContent = '';
                }

                // Validação da confirmação de senha
                const confirmPassword = document.getElementById('customer-confirm-password');
                if (!confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('customer-confirm-password-error');
                    confirmPasswordError.textContent = '* Confirme sua senha';
                    isValid = false;
                } else if (password.value !== confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('customer-confirm-password-error');
                    confirmPasswordError.textContent = '* As senhas não coincidem';
                    isValid = false;
                } else {
                    const confirmPasswordError = document.getElementById('customer-confirm-password-error');
                    confirmPasswordError.textContent = '';
                }

                // Validação dos termos
                const terms = document.getElementById('customer-terms');
                if (!terms.checked) {
                    const termsError = document.getElementById('customer-terms-error');
                    termsError.textContent = '* Você deve aceitar os termos e condições';
                    isValid = false;
                } else {
                    const termsError = document.getElementById('customer-terms-error');
                    termsError.textContent = '';
                }

                // Se o formulário for válido, enviar
                if (isValid) {
                    // Aqui você faria a requisição para o backend
                    // Após o sucesso, mostrar a mensagem de sucesso
                    showSuccessMessage();
                }
            });

            // Validação do formulário de vendedor
            const sellerSignupForm = document.getElementById('sellerSignupForm');

            sellerSignupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // Validação do nome da empresa
                const businessName = document.getElementById('seller-business-name');
                if (!businessName.value.trim()) {
                    const businessNameError = document.getElementById('seller-business-name-error');
                    businessNameError.textContent = '* O nome da empresa é obrigatório';
                    isValid = false;
                } else {
                    const businessNameError = document.getElementById('seller-business-name-error');
                    businessNameError.textContent = '';
                }

                // Validação do email
                const email = document.getElementById('seller-email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim()) {
                    const emailError = document.getElementById('seller-email-error');
                    emailError.textContent = '* O email é obrigatório';
                    isValid = false;
                } else if (!emailRegex.test(email.value)) {
                    const emailError = document.getElementById('seller-email-error');
                    emailError.textContent = '* Digite um email válido';
                    isValid = false;
                } else {
                    const emailError = document.getElementById('seller-email-error');
                    emailError.textContent = '';
                }

                // Validação do telefone
                const phone = document.getElementById('seller-phone');
                const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
                if (!phone.value.trim()) {
                    const phoneError = document.getElementById('seller-phone-error');
                    phoneError.textContent = '* O telefone é obrigatório';
                    isValid = false;
                } else if (!phoneRegex.test(phone.value)) {
                    const phoneError = document.getElementById('seller-phone-error');
                    phoneError.textContent = '* Digite um telefone válido';
                    isValid = false;
                } else {
                    const phoneError = document.getElementById('seller-phone-error');
                    phoneError.textContent = '';
                }

                // Validação do endereço
                const address = document.getElementById('seller-address');
                if (!address.value.trim()) {
                    const addressError = document.getElementById('seller-address-error');
                    addressError.textContent = '* O endereço é obrigatório';
                    isValid = false;
                } else {
                    const addressError = document.getElementById('seller-address-error');
                    addressError.textContent = '';
                }

                // Validação da senha
                const password = document.getElementById('seller-password');
                if (!password.value) {
                    const passwordError = document.getElementById('seller-password-error');
                    passwordError.textContent = '* A senha é obrigatória';
                    isValid = false;
                } else if (password.value.length < 6) {
                    const passwordError = document.getElementById('seller-password-error');
                    passwordError.textContent = '* A senha deve ter pelo menos 6 caracteres';
                    isValid = false;
                } else {
                    const passwordError = document.getElementById('seller-password-error');
                    passwordError.textContent = '';
                }

                // Validação da confirmação de senha
                const confirmPassword = document.getElementById('seller-confirm-password');
                if (!confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('seller-confirm-password-error');
                    confirmPasswordError.textContent = '* Confirme sua senha';
                    isValid = false;
                } else if (password.value !== confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('seller-confirm-password-error');
                    confirmPasswordError.textContent = '* As senhas não coincidem';
                    isValid = false;
                } else {
                    const confirmPasswordError = document.getElementById('seller-confirm-password-error');
                    confirmPasswordError.textContent = '';
                }

                // Validação dos termos
                const terms = document.getElementById('seller-terms');
                if (!terms.checked) {
                    const termsError = document.getElementById('seller-terms-error');
                    termsError.textContent = '* Você deve aceitar os termos e condições';
                    isValid = false;
                } else {
                    const termsError = document.getElementById('seller-terms-error');
                    termsError.textContent = '';
                }

                // Se o formulário for válido, enviar
                if (isValid) {
                    // Aqui você faria a requisição para o backend
                    // Após o sucesso, mostrar a mensagem de sucesso
                    showSuccessMessage();
                }
            });

            // Validação do formulário de instituição
            const institutionSignupForm = document.getElementById('institutionSignupForm');

            institutionSignupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                // Validação do nome da instituição
                const institutionName = document.getElementById('institution-name');
                if (!institutionName.value.trim()) {
                    const institutionNameError = document.getElementById('institution-name-error');
                    institutionNameError.textContent = '* O nome da instituição é obrigatório';
                    isValid = false;
                } else {
                    const institutionNameError = document.getElementById('institution-name-error');
                    institutionNameError.textContent = '';
                }

                // Validação do CNPJ
                const cnpj = document.getElementById('institution-cnpj');
                const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
                if (!cnpj.value.trim()) {
                    const cnpjError = document.getElementById('institution-cnpj-error');
                    cnpjError.textContent = '* O CNPJ é obrigatório';
                    isValid = false;
                } else if (!cnpjRegex.test(cnpj.value)) {
                    const cnpjError = document.getElementById('institution-cnpj-error');
                    cnpjError.textContent = '* CNPJ deve estar no formato 00.000.000/0000-00';
                    isValid = false;
                } else {
                    const cnpjError = document.getElementById('institution-cnpj-error');
                    cnpjError.textContent = '';
                }

                // Validação do email
                const email = document.getElementById('institution-email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim()) {
                    const emailError = document.getElementById('institution-email-error');
                    emailError.textContent = '* O email é obrigatório';
                    isValid = false;
                } else if (!emailRegex.test(email.value)) {
                    const emailError = document.getElementById('institution-email-error');
                    emailError.textContent = '* Digite um email válido';
                    isValid = false;
                } else {
                    const emailError = document.getElementById('institution-email-error');
                    emailError.textContent = '';
                }

                // Validação do telefone
                const phone = document.getElementById('institution-phone');
                const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
                if (!phone.value.trim()) {
                    const phoneError = document.getElementById('institution-phone-error');
                    phoneError.textContent = '* O telefone é obrigatório';
                    isValid = false;
                } else if (!phoneRegex.test(phone.value)) {
                    const phoneError = document.getElementById('institution-phone-error');
                    phoneError.textContent = '* Digite um telefone válido';
                    isValid = false;
                } else {
                    const phoneError = document.getElementById('institution-phone-error');
                    phoneError.textContent = '';
                }

                // Validação do endereço
                const address = document.getElementById('institution-address');
                if (!address.value.trim()) {
                    const addressError = document.getElementById('institution-address-error');
                    addressError.textContent = '* O endereço é obrigatório';
                    isValid = false;
                } else {
                    const addressError = document.getElementById('institution-address-error');
                    addressError.textContent = '';
                }

                // Validação da descrição
                const description = document.getElementById('institution-description');
                if (!description.value.trim()) {
                    const descriptionError = document.getElementById('institution-description-error');
                    descriptionError.textContent = '* A descrição é obrigatória';
                    isValid = false;
                } else if (description.value.trim().length < 10) {
                    const descriptionError = document.getElementById('institution-description-error');
                    descriptionError.textContent = '* A descrição deve ter pelo menos 10 caracteres';
                    isValid = false;
                } else {
                    const descriptionError = document.getElementById('institution-description-error');
                    descriptionError.textContent = '';
                }

                // Validação da senha
                const password = document.getElementById('institution-password');
                if (!password.value) {
                    const passwordError = document.getElementById('institution-password-error');
                    passwordError.textContent = '* A senha é obrigatória';
                    isValid = false;
                } else if (password.value.length < 6) {
                    const passwordError = document.getElementById('institution-password-error');
                    passwordError.textContent = '* A senha deve ter pelo menos 6 caracteres';
                    isValid = false;
                } else {
                    const passwordError = document.getElementById('institution-password-error');
                    passwordError.textContent = '';
                }

                // Validação da confirmação de senha
                const confirmPassword = document.getElementById('institution-confirm-password');
                if (!confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('institution-confirm-password-error');
                    confirmPasswordError.textContent = '* Confirme sua senha';
                    isValid = false;
                } else if (password.value !== confirmPassword.value) {
                    const confirmPasswordError = document.getElementById('institution-confirm-password-error');
                    confirmPasswordError.textContent = '* As senhas não coincidem';
                    isValid = false;
                } else {
                    const confirmPasswordError = document.getElementById('institution-confirm-password-error');
                    confirmPasswordError.textContent = '';
                }

                // Validação dos termos
                const terms = document.getElementById('institution-terms');
                if (!terms.checked) {
                    const termsError = document.getElementById('institution-terms-error');
                    termsError.textContent = '* Você deve aceitar os termos e condições';
                    isValid = false;
                } else {
                    const termsError = document.getElementById('institution-terms-error');
                    termsError.textContent = '';
                }

                // Se o formulário for válido, enviar
                if (isValid) {
                    // Aqui você faria a requisição para o backend
                    // Após o sucesso, mostrar a mensagem de sucesso
                    showSuccessMessage();
                }
            });

            // Formatação do CNPJ
            const cnpjInput = document.getElementById('institution-cnpj');
            cnpjInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');

                // Limita a 14 caracteres (números)
                if (value.length > 14) {
                    value = value.substring(0, 14);
                }

                // Aplica a formatação apenas se tiver dígitos suficientes
                if (value.length > 0) {
                    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
                    if (value.length > 3) value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                    if (value.length > 7) value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
                    if (value.length > 12) value = value.replace(/(\d{4})(\d)/, '$1-$2');
                }

                e.target.value = value;
            });

            // Adiciona validação para garantir que não ultrapasse 14 dígitos
            cnpjInput.addEventListener('keydown', (e) => {
                const currentValue = e.target.value.replace(/\D/g, '');
                if (currentValue.length >= 14 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                }
            });

            // Formatação do telefone
            const phoneInputs = document.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    
                    if (value.length > 11) {
                        value = value.substring(0, 11);
                    }
                    
                    if (value.length > 0) {
                        if (value.length <= 2) {
                            value = `(${value}`;
                        } else if (value.length <= 6) {
                            value = `(${value.substring(0,2)}) ${value.substring(2)}`;
                        } else if (value.length <= 10) {
                            value = `(${value.substring(0,2)}) ${value.substring(2,6)}-${value.substring(6)}`;
                        } else {
                            value = `(${value.substring(0,2)}) ${value.substring(2,7)}-${value.substring(7)}`;
                        }
                    }
                    
                    e.target.value = value;
                });
            });

            // Verificação de força da senha
            const passwordInputs = document.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                if (input.id.includes('password') && !input.id.includes('confirm')) {
                    input.addEventListener('input', (e) => {
                        const strengthElement = document.getElementById(`${input.id}-strength`);
                        if (strengthElement) {
                            displayPasswordStrength(e.target.value, strengthElement);
                        }
                    });
                }
            });

            // Toggle password visibility for all password fields
            document.querySelectorAll('.toggle-password').forEach(button => {
                button.addEventListener('click', function() {
                    const passwordInput = this.parentElement.querySelector('input');
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    
                    // Toggle icon
                    this.querySelector('i').classList.toggle('fa-eye');
                    this.querySelector('i').classList.toggle('fa-eye-slash');
                });
            });
        });