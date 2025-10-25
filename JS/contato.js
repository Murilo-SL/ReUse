       // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos antes de enviar.');
                return;
            }
            
            // Mostrar overlay e mensagem de sucesso
            document.getElementById('overlay').classList.add('active');
            document.getElementById('successMessage').classList.add('active');
            
            // Criar efeito de confete
            createConfetti();
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