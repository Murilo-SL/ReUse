// esqueceu_a_senha.js - Versão com EmailJS (GRATUITO)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const userEmailSpan = document.getElementById('userEmail');
    const errorMessageSpan = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    // Configuração do EmailJS - SUBSTITUA COM SUAS CREDENCIAIS
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_5qs7vse',      // Obtenha no dashboard do EmailJS
        TEMPLATE_ID: 'template_awqyr46',    // Obtenha no dashboard do EmailJS
        PUBLIC_KEY: 'MX-3_5EU7mhKa_Gt2'       // Obtenha no dashboard do EmailJS
    };

    // Inicializar EmailJS
    (function() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS inicializado com sucesso');
        } else {
            console.error('EmailJS não carregado');
        }
    })();

    // Função para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Função para mostrar loading
    function showLoading() {
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
    }

    // Função para esconder loading
    function hideLoading() {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }

    // Event listener para validação em tempo real
    emailInput.addEventListener('input', function() {
        const email = emailInput.value.trim();
        if (email === '') {
            emailError.textContent = '';
            emailInput.style.borderColor = '';
            return;
        }

        if (!validateEmail(email)) {
            emailError.textContent = 'Por favor, insira um email válido.';
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#00cc99';
        }
    });

    // Event listener para envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        let isValid = true;
        
        // Validar email
        if (!email) {
            emailError.textContent = 'Por favor, insira seu email.';
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else if (!validateEmail(email)) {
            emailError.textContent = 'Por favor, insira um email válido.';
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '';
        }
        
        // Se o formulário for válido, enviar email
        if (isValid) {
            await sendRecoveryEmail(email);
        }
    });

    // Função principal para enviar email de recuperação com EmailJS
    async function sendRecoveryEmail(userEmail) {
        showLoading();
        
        try {
            console.log('Iniciando envio de email para:', userEmail);
            
            // Verificar se EmailJS está carregado
            if (typeof emailjs === 'undefined') {
                throw new Error('Serviço de email não disponível no momento');
            }

            // Gerar token único para recuperação
            const recoveryToken = generateRecoveryToken(userEmail);
            const recoveryLink = generateRecoveryLink(userEmail, recoveryToken);
            
            // Preparar dados do template
            const templateParams = {
                to_email: userEmail,
                to_name: getUserNameFromEmail(userEmail),
                from_name: 'Equipe ReUse',
                recovery_link: recoveryLink,
                site_name: 'ReUse',
                current_year: new Date().getFullYear(),
                support_email: 'suporte@reuse.com',
                user_email: userEmail
            };

            console.log('Enviando email com parâmetros:', templateParams);

            // Enviar email via EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );

            console.log('Resposta do EmailJS:', response);

            if (response.status === 200) {
                // Sucesso - email enviado
                console.log('Email enviado com sucesso para:', userEmail);
                
                // Salvar token no localStorage (simulação)
                saveRecoveryToken(userEmail, recoveryToken);
                
                // Mostrar modal de sucesso
                userEmailSpan.textContent = userEmail;
                successModal.style.display = 'flex';
                createConfetti();
                
                // Limpar formulário
                form.reset();
                
                // Rastrear conversão (opcional)
                trackRecoveryRequest(userEmail);
                
            } else {
                throw new Error(`Erro no envio: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            
            // Mensagem de erro amigável
            let userFriendlyError = 'Erro ao enviar email de recuperação. ';
            
            if (error.message.includes('serviço de email não disponível')) {
                userFriendlyError += 'Serviço temporariamente indisponível.';
            } else if (error.message.includes('Network Error')) {
                userFriendlyError += 'Problema de conexão. Verifique sua internet.';
            } else {
                userFriendlyError += 'Tente novamente em alguns minutos.';
            }
            
            errorMessageSpan.textContent = userFriendlyError;
            errorModal.style.display = 'flex';
            
        } finally {
            hideLoading();
        }
    }

    // Função para gerar token único de recuperação
    function generateRecoveryToken(email) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        const token = btoa(`${email}:${timestamp}:${random}`)
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        
        return token;
    }

    // Função para gerar link de recuperação
    function generateRecoveryLink(email, token) {
        const baseUrl = window.location.origin;
        return `${baseUrl}/redefinir-senha.html?token=${token}&email=${encodeURIComponent(email)}`;
    }

    // Função para simular obtenção do nome do usuário
    function getUserNameFromEmail(email) {
        const username = email.split('@')[0];
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    // Função para salvar token (simulação)
    function saveRecoveryToken(email, token) {
        const recoveryData = {
            email: email,
            token: token,
            expires: Date.now() + (60 * 60 * 1000) // Expira em 1 hora
        };
        
        localStorage.setItem(`recovery_${email}`, JSON.stringify(recoveryData));
        console.log('Token salvo para:', email);
    }

    // Função para rastrear solicitação (opcional)
    function trackRecoveryRequest(email) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'password_recovery_request', {
                'event_category': 'authentication',
                'event_label': email
            });
        }
        
        console.log(`Solicitação de recuperação rastreada: ${email}`);
    }

    // Criar efeito de confetti
    function createConfetti() {
        const confettiContainer = document.querySelector('.particles-container');
        const colors = ['#0066cc', '#00cc99', '#6a5acd', '#ff6b6b', '#ffb400'];
        
        // Limpar confetti anterior
        const existingConfetti = confettiContainer.querySelectorAll('.confetti');
        existingConfetti.forEach(confetti => confetti.remove());
        
        for (let i = 0; i < 25; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'particle confetti';
            confetti.style.width = `${Math.random() * 12 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.animationDuration = `${Math.random() * 4 + 3}s`;
            confetti.style.animationDelay = `${Math.random() * 1}s`;
            confetti.style.opacity = '0.8';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : 
                Math.random() > 0.5 ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '30% 70% 60% 40% / 50% 40% 60% 50%';
            
            confettiContainer.appendChild(confetti);
            
            // Remover após a animação
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 5000);
        }
    }

    // Prevenir múltiplos envios
    let isSubmitting = false;
    
    form.addEventListener('submit', async function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        setTimeout(() => { isSubmitting = false; }, 3000);
    });

    // Melhorar acessibilidade
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Foco automático no campo de email
    setTimeout(() => {
        emailInput.focus();
    }, 500);
});

// Função para fechar o modal de sucesso
function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';
    
    // Efeito de fade out
    successModal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        successModal.style.animation = '';
    }, 300);
    
    // Redirecionar para a página de login após 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html?recovery=success';
    }, 2000);
}

// Função para fechar o modal de erro
function closeErrorModal() {
    const errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'none';
    
    // Efeito de fade out
    errorModal.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        errorModal.style.animation = '';
    }, 300);
    
    // Focar novamente no campo de email
    const emailInput = document.getElementById('email');
    setTimeout(() => {
        emailInput.focus();
    }, 100);
}

// Inicializar quando a página carregar
window.addEventListener('load', function() {
    // Adicionar classe loaded para transições suaves
    document.body.classList.add('loaded');
});