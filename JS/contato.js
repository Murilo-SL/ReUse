       // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Criar elementos para mensagens de erro
        const nameError = document.createElement('div');
        nameError.className = 'error-message';
        nameInput.parentNode.appendChild(nameError);

        const emailError = document.createElement('div');
        emailError.className = 'error-message';
        emailInput.parentNode.appendChild(emailError);

        const messageError = document.createElement('div');
        messageError.className = 'error-message';
        messageInput.parentNode.appendChild(messageError);

        // Validação em tempo real para o campo de nome
        nameInput.addEventListener('input', function() {
            if (this.value.trim()) {
                nameError.textContent = '';
                this.style.borderColor = '#e1e5e9';
            }
        });

        // Validação em tempo real para o campo de email
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() && emailRegex.test(this.value)) {
                emailError.textContent = '';
                this.style.borderColor = '#e1e5e9';
            }
        });

        // Validação em tempo real para a mensagem
        messageInput.addEventListener('input', function() {
            if (this.value.trim()) {
                messageError.textContent = '';
                this.style.borderColor = '#e1e5e9';
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validação do nome
            if (!nameInput.value.trim()) {
                nameError.textContent = '* O nome é obrigatório';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                nameError.textContent = '';
                nameInput.style.borderColor = '#e1e5e9';
            }
            
            // Validação do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = '* O email é obrigatório';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = '* Digite um email válido';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                emailError.textContent = '';
                emailInput.style.borderColor = '#e1e5e9';
            }
            
            // Validação da mensagem
            if (!messageInput.value.trim()) {
                messageError.textContent = '* A mensagem é obrigatória';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = '* A mensagem deve ter pelo menos 10 caracteres';
                messageInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                messageError.textContent = '';
                messageInput.style.borderColor = '#e1e5e9';
            }
            
            if (isValid) {
                // Mostrar overlay e mensagem de sucesso
                document.getElementById('overlay').classList.add('active');
                document.getElementById('successMessage').classList.add('active');
                
                // Criar efeito de confete
                createConfetti();
                
                // Limpar formulário
                contactForm.reset();
            }
        });
        
        document.getElementById('closeSuccess').addEventListener('click', function() {
            document.getElementById('overlay').classList.remove('active');
            document.getElementById('successMessage').classList.remove('active');
        });
        
        // Fechar ao clicar no overlay
        document.getElementById('overlay').addEventListener('click', function() {
            document.getElementById('overlay').classList.remove('active');
            document.getElementById('successMessage').classList.remove('active');
        });
        
        // Menu responsivo
        document.addEventListener('DOMContentLoaded', function() {
            const botaoMenu = document.getElementById('botaoMenu');
            const navMenu = document.getElementById('navMenu');
            
            if (botaoMenu && navMenu) {
                botaoMenu.addEventListener('click', function() {
                    navMenu.classList.toggle('mostrar');
                });
            }
        });

        function createConfetti() {
            const colors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0'];
            const container = document.body;
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                container.appendChild(confetti);
                
                // Animação do confete
                const animation = confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 2000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                    delay: Math.random() * 500
                });
                
                // Remover confete após animação
                animation.onfinish = () => confetti.remove();
            }
        }