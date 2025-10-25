document.addEventListener('DOMContentLoaded', () => {
    // Elementos dos botões de seleção
    const customerButton = document.getElementById('customer-button');
    const sellerButton = document.getElementById('seller-button');
    const institutionButton = document.getElementById('institution-button');

    // Formulários
    const customerForm = document.getElementById('customer-form');
    const sellerForm = document.getElementById('seller-form');
    const institutionForm = document.getElementById('institution-form');

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


// Validação do formulário de cliente
const customerLoginForm = document.getElementById('customerLoginForm');

customerLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

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

    // Validação da senha
    const password = document.getElementById('customer-password');
    if (!password.value) {
        const passwordError = document.getElementById('customer-password-error');
        passwordError.textContent = '* A senha é obrigatória';
        isValid = false;
    } else {
        const passwordError = document.getElementById('customer-password-error');
        passwordError.textContent = '';
    }

    // Se o formulário for válido, enviar (qualquer email e senha válidos)
    if (isValid) {
        window.location.href = 'cliente.html';
    }
});

    // Validação do formulário de vendedor 
    const sellerLoginForm = document.getElementById('sellerLoginForm');

    sellerLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validação do código de verificação
        const verificationCode = document.getElementById('verification-code');
        const verificationCodeError = document.getElementById('verification-code-error');
        const verificationCodeRegex = /^[A-Za-z0-9]{3}$/;
        if (!verificationCode.value.trim()) {
            verificationCodeError.textContent = '* O código de verificação é obrigatório';
            isValid = false;
        } else if (!verificationCodeRegex.test(verificationCode.value)) {
            verificationCodeError.textContent = '* O código deve conter exatamente 3 caracteres (letras ou números)';
            isValid = false;
        } else {
            verificationCodeError.textContent = '';
        }

        // Validação da senha
        const password = document.getElementById('seller-password');
        const passwordError = document.getElementById('password-error');
        if (!password.value) {
            passwordError.textContent = '* A senha é obrigatória';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (isValid) {
            // Verificação dos valores específicos
            if (verificationCode.value.toLowerCase() === 'xcz' && password.value === 'Senha#123') {
                window.location.href = 'vendedor.html'; // Página do vendedor
            } else {
                // Exibir mensagem de erro estilizada
                const errorDiv = document.createElement('div');
                errorDiv.className = 'custom-error-message';
                errorDiv.textContent = 'Usuário ou senha incorretos';
                
                // Remover mensagem de erro anterior se existir
                const existingError = sellerLoginForm.querySelector('.custom-error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Inserir a mensagem de erro antes do botão de submit
                const submitBtn = sellerLoginForm.querySelector('.submit-btn');
                sellerLoginForm.insertBefore(errorDiv, submitBtn);
                
                // Adicionar animação de shake ao formulário
                sellerLoginForm.classList.add('shake');
                setTimeout(() => {
                    sellerLoginForm.classList.remove('shake');
                }, 500);
            }
        }
    });

    // Validação do formulário de instituição 
    const institutionLoginForm = document.getElementById('institutionLoginForm');

    institutionLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validação do CNPJ
        const cnpj = document.getElementById('institution-cnpj');
        const cnpjError = document.getElementById('cnpj-error');
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!cnpj.value.trim()) {
            cnpjError.textContent = '* O CNPJ é obrigatório';
            isValid = false;
        } else if (!cnpjRegex.test(cnpj.value)) {
            cnpjError.textContent = '* CNPJ deve estar no formato 00.000.000/0000-00';
            isValid = false;
        } else {
            cnpjError.textContent = '';
        }

        // Validação da senha
        const password = document.getElementById('institution-password');
        const passwordError = document.getElementById('institution-password-error');
        if (!password.value) {
            passwordError.textContent = '* A senha é obrigatória';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (isValid) {
            // Verificação dos valores específicos
            if (cnpj.value === '12.123.123/1234-12' && password.value === '1235') {
                window.location.href = 'ong-2.html'; // Página especial
            } else if (cnpj.value === '25.456.456/4567-25' && password.value === '1234567') {
                window.location.href = 'ong.html'; // Página específica
            } else {
                // Exibir mensagem de erro estilizada
                const errorDiv = document.createElement('div');
                errorDiv.className = 'custom-error-message';
                errorDiv.textContent = 'Usuário ou senha incorretos';
                
                // Remover mensagem de erro anterior se existir
                const existingError = institutionLoginForm.querySelector('.custom-error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Inserir a mensagem de erro antes do botão de submit
                const submitBtn = institutionLoginForm.querySelector('.submit-btn');
                institutionLoginForm.insertBefore(errorDiv, submitBtn);
                
                // Adicionar animação de shake ao formulário
                institutionLoginForm.classList.add('shake');
                setTimeout(() => {
                    institutionLoginForm.classList.remove('shake');
                }, 500);
            }
        }
    });

    // Validação do código de verificação
    const verificationCodeInput = document.getElementById('verification-code');
    verificationCodeInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^A-Za-z0-9]/g, '');
        if (value.length > 3) value = value.substring(0, 3);
        e.target.value = value.toUpperCase();
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

    // Toggle password visibility for all password fields
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('i');
            const input = this.parentElement.querySelector('input');

            // Toggle between password and text type
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            // Toggle eye icon
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');

            // Toggle active class for styling if needed
            this.classList.toggle('active');
        });
    });
});