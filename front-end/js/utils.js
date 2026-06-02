// Função para adicionar toggle de senha
export function addPasswordToggle(Documento) {
        const passwordInputs = Documento.querySelectorAll('input[type="password"]');
        
        passwordInputs.forEach(input => {
            // Verificar se já existe um toggle button
            if (input.parentNode.querySelector('.password-toggle')) {
                return;
            }
            
            // Criar wrapper se não existir
            if (!input.parentNode.classList.contains('password-wrapper')) {
                const wrapper = Documento.createElement('div');
                wrapper.className = 'password-wrapper';
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
            }
            
            // Criar botão de toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle';
            toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
            toggleBtn.setAttribute('aria-label', 'Mostrar senha');
            
            // Adicionar evento de clique
            toggleBtn.addEventListener('click', function() {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                
                // Atualizar ícone
                const icon = this.querySelector('i');
                icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
                this.setAttribute('aria-label', type === 'password' ? 'Mostrar senha' : 'Ocultar senha');
            });
            
            // Adicionar botão após o input
            input.parentNode.appendChild(toggleBtn);
        });
    }