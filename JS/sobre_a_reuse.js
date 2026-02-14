        // Navegação suave para as seções
        document.addEventListener('DOMContentLoaded', function() {
            // Configurar links da barra de categorias
            const categoryLinks = document.querySelectorAll('.categories-bar .category-btn');
            categoryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
            
            // Adicionar classe ativa aos botões de categoria ao rolar
            const sections = document.querySelectorAll('.sobre-section');
            const navLinks = document.querySelectorAll('.categories-bar .category-btn');
            
            function updateActiveNavLink() {
                let currentSectionId = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    const sectionHeight = section.offsetHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSectionId = section.id;
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.includes(currentSectionId)) {
                        link.classList.add('active');
                    }
                });
                
                // Manter "Sobre a ReUse" ativo quando no topo
                if (window.scrollY < 100) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    document.querySelector('.categories-bar .category-btn.active')?.classList.add('active');
                }
            }
            
            window.addEventListener('scroll', updateActiveNavLink);
            updateActiveNavLink();
            
            // Animações de entrada
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observar elementos para animação
            document.querySelectorAll('.sobre-section, .stat-item, .sustentabilidade-card, .blog-card, .vaga-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
            
            // Botões de candidatura
            document.querySelectorAll('.vaga-card .btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Esta funcionalidade está em desenvolvimento. Em breve você poderá se candidatar às nossas vagas!');
                });
            });
            
            // Botão de contato
            document.querySelector('.btn-primary[style*="padding: 1rem 3rem"]').addEventListener('click', function() {
                alert('Funcionalidade de contato em desenvolvimento. Em breve você poderá entrar em contato conosco!');
            });
        });