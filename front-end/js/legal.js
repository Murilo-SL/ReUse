        // JavaScript específico para a página legal
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos da barra de categorias
            const categoryButtons = document.querySelectorAll('.legal-category-btn');
            const sections = document.querySelectorAll('.legal-section');
            const sectionIndicator = document.getElementById('sectionIndicator');
            const sectionDots = document.querySelectorAll('.section-dot');
            const backToTop = document.getElementById('backToTop');
            
            // Função para rolar até uma seção
            function scrollToSection(sectionId) {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar categoria ativa
                    updateActiveCategory(sectionId);
                }
            }
            
            // Função para atualizar categoria ativa
            function updateActiveCategory(activeId) {
                categoryButtons.forEach(button => {
                    const section = button.getAttribute('data-section');
                    if (section === activeId) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
                
                // Atualizar indicadores de seção
                sectionDots.forEach(dot => {
                    if (dot.getAttribute('onclick').includes(activeId)) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Configurar botões de categoria
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const sectionId = this.getAttribute('data-section');
                    scrollToSection(sectionId);
                });
            });
            
            // Atualizar categoria ativa ao scroll
            window.addEventListener('scroll', function() {
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollY >= (sectionTop - 100)) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                if (currentSection) {
                    updateActiveCategory(currentSection);
                }
                
                // Mostrar/ocultar botão "voltar ao topo"
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            // Botão de voltar ao topo
            backToTop.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Download PDF (funcionalidade simulada)
            document.getElementById('downloadPDF').addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Esta funcionalidade estará disponível em breve! Enquanto isso, você pode usar a opção de impressão do navegador.', 'info');
            });
            
            // Sistema de notificações
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                
                let iconClass = 'bi-info-circle';
                if (type === 'success') iconClass = 'bi-check-circle';
                if (type === 'error') iconClass = 'bi-x-circle';
                if (type === 'warning') iconClass = 'bi-exclamation-circle';
                
                notification.innerHTML = `
                    <i class="bi ${iconClass}"></i>
                    <span>${message}</span>
                `;
                
                Object.assign(notification.style, {
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: type === 'success' ? '#00cc99' : 
                               type === 'error' ? '#ff4757' : 
                               type === 'warning' ? '#ffa502' : '#0066cc',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: 'var(--border-radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: 'var(--shadow-xl)',
                    zIndex: '10000',
                    animation: 'slideInRight 0.3s ease',
                    fontWeight: '500',
                    maxWidth: '400px',
                    wordBreak: 'break-word'
                });
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }, 3000);
            }
            
            // Adicionar estilos de animação para notificações
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            // Busca dentro da página
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const query = this.value.trim().toLowerCase();
                        if (query) {
                            let foundSection = null;
                            
                            sections.forEach(section => {
                                const text = section.textContent.toLowerCase();
                                if (text.includes(query) && !foundSection) {
                                    foundSection = section;
                                    
                                    // Rolar até a seção
                                    window.scrollTo({
                                        top: section.offsetTop - 100,
                                        behavior: 'smooth'
                                    });
                                    
                                    // Destacar seção
                                    section.style.boxShadow = '0 0 0 3px var(--primary-green)';
                                    setTimeout(() => {
                                        section.style.boxShadow = '';
                                    }, 2000);
                                    
                                    // Atualizar categoria ativa
                                    updateActiveCategory(section.id);
                                }
                            });
                            
                            if (!foundSection) {
                                showNotification('Termo não encontrado nas políticas.', 'info');
                            }
                        }
                    }
                });
            }
            
            // Inicializar seção ativa baseada na URL
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                setTimeout(() => {
                    scrollToSection(hash);
                }, 100);
            }
        });