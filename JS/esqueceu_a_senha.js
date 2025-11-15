        // Script específico para a página de recuperação de senha
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos da página
            const emailOption = document.getElementById('email-option');
            const phoneOption = document.getElementById('phone-option');
            const emailForm = document.getElementById('email-form');
            const phoneForm = document.getElementById('phone-form');
            const codeForm = document.getElementById('code-form');
            const emailRecoveryForm = document.getElementById('emailRecoveryForm');
            const phoneRecoveryForm = document.getElementById('phoneRecoveryForm');
            const codeVerificationForm = document.getElementById('codeVerificationForm');
            const successOverlay = document.getElementById('successOverlay');
            const successText = document.getElementById('successText');
            const successMethod = document.getElementById('successMethod');
            const successDestination = document.getElementById('successDestination');
            const successTime = document.getElementById('successTime');
            const countdownElement = document.getElementById('countdown');
            const resendLink = document.getElementById('resend-link');
            const timerElement = document.getElementById('timer');
            const codeInputs = document.querySelectorAll('.code-input');
            const newPasswordInput = document.getElementById('new-password');
            const newPasswordStrength = document.getElementById('new-password-strength');
            
            // Variáveis de controle
            let currentMethod = 'email';
            let timerInterval;
            let countdown = 60;
            let redirectCountdown = 5;
            
            // Função para verificar força da senha (MESMA DO CADASTRO)
            function checkPasswordStrength(password) {
                let strength = 0;
                
                if (password.length >= 8) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;
                
                return strength;
            }
            
            // Função para exibir força da senha (MESMA DO CADASTRO)
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
            
            // Alternar entre email e telefone
            emailOption.addEventListener('click', function() {
                if (!this.classList.contains('active')) {
                    emailOption.classList.add('active');
                    phoneOption.classList.remove('active');
                    emailForm.classList.add('active');
                    phoneForm.classList.remove('active');
                    currentMethod = 'email';
                }
            });
            
            phoneOption.addEventListener('click', function() {
                if (!this.classList.contains('active')) {
                    phoneOption.classList.add('active');
                    emailOption.classList.remove('active');
                    phoneForm.classList.add('active');
                    emailForm.classList.remove('active');
                    currentMethod = 'phone';
                }
            });
            
            // Formulário de recuperação por email
            emailRecoveryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('recovery-email').value;
                const emailError = document.getElementById('email-error');
                
                // Validação básica de email
                if (!validateEmail(email)) {
                    emailError.textContent = 'Por favor, insira um email válido.';
                    return;
                }
                
                // Simular envio do código
                simulateCodeSending('email', email);
            });
            
            // Formulário de recuperação por telefone
            phoneRecoveryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const phone = document.getElementById('recovery-phone').value;
                const phoneError = document.getElementById('phone-error');
                
                // Validação básica de telefone
                if (!validatePhone(phone)) {
                    phoneError.textContent = 'Por favor, insira um telefone válido.';
                    return;
                }
                
                // Simular envio do código
                simulateCodeSending('phone', phone);
            });
            
            // Formulário de verificação de código
            codeVerificationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const code = Array.from(codeInputs).map(input => input.value).join('');
                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                const codeError = document.getElementById('code-error');
                const newPasswordError = document.getElementById('new-password-error');
                const confirmPasswordError = document.getElementById('confirm-password-error');
                
                // Resetar mensagens de erro
                codeError.textContent = '';
                newPasswordError.textContent = '';
                confirmPasswordError.textContent = '';
                
                // Validar código
                if (code.length !== 6) {
                    codeError.textContent = 'Por favor, preencha todos os dígitos do código.';
                    return;
                }
                
                // Validação da senha (MESMA DO CADASTRO)
                if (!newPassword) {
                    newPasswordError.textContent = '* A senha é obrigatória';
                    isValid = false;
                } else if (newPassword.length < 6) {
                    newPasswordError.textContent = '* A senha deve ter pelo menos 6 caracteres';
                    isValid = false;
                } else {
                    const strength = checkPasswordStrength(newPassword);
                    if (strength <= 2) {
                        newPasswordError.textContent = '* A senha é muito fraca. Use letras maiúsculas, minúsculas, números e símbolos';
                        isValid = false;
                    } else {
                        newPasswordError.textContent = '';
                    }
                }
                
                // Validar confirmação de senha
                if (!confirmPassword) {
                    confirmPasswordError.textContent = '* Confirme sua senha';
                    isValid = false;
                } else if (newPassword !== confirmPassword) {
                    confirmPasswordError.textContent = '* As senhas não coincidem';
                    isValid = false;
                } else {
                    confirmPasswordError.textContent = '';
                }
                
                // Se o formulário for válido, enviar
                if (isValid) {
                    // Simular redefinição de senha
                    simulatePasswordReset();
                }
            });
            
            // Reenviar código
            resendLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Verificar se o timer já expirou
                if (countdown <= 0) {
                    // Simular reenvio do código
                    simulateCodeSending(currentMethod, '');
                    startTimer();
                }
            });
            
            // Função para simular envio do código
            function simulateCodeSending(method, contact) {
                // Esconder formulário atual e mostrar formulário de código
                if (method === 'email') {
                    emailForm.classList.remove('active');
                } else {
                    phoneForm.classList.remove('active');
                }
                
                codeForm.classList.add('active');
                
                // Iniciar timer para reenvio
                startTimer();
                
                // Focar no primeiro campo de código
                setTimeout(() => {
                    codeInputs[0].focus();
                }, 500);
            }
            
            // Função para simular redefinição de senha
            function simulatePasswordReset() {
                // Configurar mensagem de sucesso
                successMethod.textContent = currentMethod === 'email' ? 'Email' : 'Telefone';
                successDestination.textContent = currentMethod === 'email' ? 
                    document.getElementById('recovery-email').value : 
                    document.getElementById('recovery-phone').value;
                
                const now = new Date();
                successTime.textContent = now.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                // Mostrar overlay de sucesso
                successOverlay.classList.add('active');
                
                // Criar efeito de confetti
                createConfetti();
                
                // Iniciar contagem regressiva para redirecionamento
                redirectCountdown = 5;
                countdownElement.textContent = redirectCountdown;
                
                const redirectInterval = setInterval(() => {
                    redirectCountdown--;
                    countdownElement.textContent = redirectCountdown;
                    
                    if (redirectCountdown <= 0) {
                        clearInterval(redirectInterval);
                        window.location.href = 'login.html';
                    }
                }, 1000);
            }
            
            // Função para criar efeito de confetti
            function createConfetti() {
                const colors = ['#0066cc', '#00cc99', '#ff6b6b', '#ffd93d', '#6bcf7f'];
                const overlay = document.getElementById('successOverlay');
                
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-10px';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                    
                    overlay.appendChild(confetti);
                    
                    // Animação do confetti
                    setTimeout(() => {
                        confetti.style.transition = 'all 1s ease-out';
                        confetti.style.opacity = '1';
                        confetti.style.top = '100%';
                        confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() * 40 - 20)) + '%';
                        
                        // Remover confetti após animação
                        setTimeout(() => {
                            if (confetti.parentNode) {
                                confetti.parentNode.removeChild(confetti);
                            }
                        }, 1000);
                    }, i * 100);
                }
            }
            
            // Função para iniciar o timer de reenvio
            function startTimer() {
                countdown = 60;
                resendLink.style.pointerEvents = 'none';
                resendLink.style.opacity = '0.5';
                
                updateTimerDisplay();
                
                timerInterval = setInterval(() => {
                    countdown--;
                    updateTimerDisplay();
                    
                    if (countdown <= 0) {
                        clearInterval(timerInterval);
                        resendLink.style.pointerEvents = 'auto';
                        resendLink.style.opacity = '1';
                        timerElement.textContent = '';
                    }
                }, 1000);
            }
            
            // Função para atualizar a exibição do timer
            function updateTimerDisplay() {
                timerElement.textContent = ` (${countdown}s)`;
            }
            
            // Função para validar email
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            // Função para validar telefone
            function validatePhone(phone) {
                // Remover caracteres não numéricos
                const cleaned = phone.replace(/\D/g, '');
                // Verificar se tem entre 10 e 11 dígitos
                return cleaned.length >= 10 && cleaned.length <= 11;
            }
            
            // Verificação de força da senha em tempo real (MESMA DO CADASTRO)
            newPasswordInput.addEventListener('input', (e) => {
                displayPasswordStrength(e.target.value, newPasswordStrength);
            });
            
            // Formatação automática do telefone
            document.getElementById('recovery-phone').addEventListener('input', function(e) {
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
            
            // Navegação entre campos de código
            codeInputs.forEach((input, index) => {
                input.addEventListener('input', function(e) {
                    // Mover para o próximo campo se o atual estiver preenchido
                    if (e.target.value.length === 1 && index < codeInputs.length - 1) {
                        codeInputs[index + 1].focus();
                    }
                    
                    // Verificar se todos os campos estão preenchidos
                    const allFilled = Array.from(codeInputs).every(input => input.value.length === 1);
                    if (allFilled) {
                        document.getElementById('new-password').focus();
                    }
                });
                
                input.addEventListener('keydown', function(e) {
                    // Voltar para o campo anterior ao pressionar Backspace em um campo vazio
                    if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                        codeInputs[index - 1].focus();
                    }
                });
            });
            
            // Alternar visibilidade da senha
            document.querySelectorAll('.toggle-password').forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const passwordInput = this.parentElement.querySelector('input');
                    const icon = this.querySelector('i');
                    
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        icon.className = 'fas fa-eye-slash';
                        this.classList.add('active');
                    } else {
                        passwordInput.type = 'password';
                        icon.className = 'fas fa-eye';
                        this.classList.remove('active');
                    }
                });
            });
            
            // Limpar mensagens de erro ao digitar
            document.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', function() {
                    const errorElement = this.parentElement.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                });
            });
        });