// modo_noturno_inicial.js - Versão Universal para Todas as Páginas
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Se não encontrar o botão de tema, sair (para páginas que não têm modo noturno)
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Elementos da logo - busca mais flexível para funcionar em todas as páginas
    const logoImg = document.getElementById('siteLogo') || 
                   document.querySelector('.logo-container img') ||
                   document.querySelector('img[alt*="ReUse"]');
    
    const logoText = document.getElementById('siteLogoText') || 
                    document.querySelector('.logo-container span') ||
                    document.querySelector('.logo-container .logo-text');
    
    // Verificar preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplicar tema salvo
    if (savedTheme === 'dark') {
        applyDarkMode();
    } else {
        applyLightMode();
    }
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            applyLightMode();
        } else {
            applyDarkMode();
        }
        
        // Disparar evento customizado para componentes que precisam se atualizar
        window.dispatchEvent(new Event('themeChanged'));
    });
    
    // Função para aplicar modo noturno
    function applyDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
            themeIcon.className = 'bi bi-sun';
            themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        }
        
        // Atualizar logo
        updateLogoForDarkMode();
        
        // Animar estatísticas quando em modo escuro (apenas se existirem)
        if (document.querySelector('.stat-number')) {
            animateStats();
        }
        
        // Mostrar notificação
        showThemeNotification('dark');
    }
    
    // Função para aplicar modo claro
    function applyLightMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'bi bi-moon';
            themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        }
        
        // Atualizar logo
        updateLogoForLightMode();
        
        // Animar estatísticas quando em modo claro (apenas se existirem)
        if (document.querySelector('.stat-number')) {
            animateStats();
        }
        
        // Mostrar notificação
        showThemeNotification('light');
    }
    
    // Função para atualizar a logo para o modo noturno
    function updateLogoForDarkMode() {
        if (logoImg && logoImg.src) {
            // Verifica se já não está usando a logo noturna
            const currentSrc = logoImg.src;
            if (!currentSrc.includes('reuse_logo_noturna')) {
                logoImg.src = "IMG/reuse_logo_noturna.svg";
                logoImg.alt = "ReUse Logo - Modo Noturno";
                // Adicionar classe de loading temporariamente
                logoImg.classList.add('loading');
                logoImg.onload = function() {
                    logoImg.classList.remove('loading');
                };
                
                // Tratamento de erro
                logoImg.onerror = function() {
                    console.warn('Erro ao carregar logo noturna, usando fallback de texto');
                    logoImg.style.display = 'none';
                    if (logoText) {
                        logoText.style.marginLeft = '0';
                    }
                };
            }
        }
        
        if (logoText) {
            logoText.style.background = 'linear-gradient(135deg, #5AC8FA 0%, #66FF99 100%)';
            logoText.style.webkitBackgroundClip = 'text';
            logoText.style.backgroundClip = 'text';
            logoText.style.webkitTextFillColor = 'transparent';
            logoText.style.color = 'transparent';
        }
    }
    
    // Função para atualizar a logo para o modo claro
    function updateLogoForLightMode() {
        if (logoImg && logoImg.src) {
            // Verifica se já não está usando a logo clara
            const currentSrc = logoImg.src;
            if (!currentSrc.includes('reuse-logo-(2)')) {
                logoImg.src = "IMG/reuse-logo-(2).svg";
                logoImg.alt = "ReUse Logo";
                // Adicionar classe de loading temporariamente
                logoImg.classList.add('loading');
                logoImg.onload = function() {
                    logoImg.classList.remove('loading');
                };
                
                // Tratamento de erro
                logoImg.onerror = function() {
                    console.warn('Erro ao carregar logo clara, usando fallback de texto');
                    logoImg.style.display = 'none';
                    if (logoText) {
                        logoText.style.marginLeft = '0';
                    }
                };
            }
        }
        
        if (logoText) {
            // Verifica em qual página estamos para aplicar o gradiente correto
            const isParticiparPage = window.location.pathname.includes('participar');
            
            if (isParticiparPage) {
                // Gradiente para a página participar (mais claro - como no CSS original)
                logoText.style.background = 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)';
            } else {
                // Gradiente para a página inicial (original)
                logoText.style.background = 'linear-gradient(135deg, #002244 0%, #0088ff 100%)';
            }
            
            logoText.style.webkitBackgroundClip = 'text';
            logoText.style.backgroundClip = 'text';
            logoText.style.webkitTextFillColor = 'transparent';
            logoText.style.color = 'transparent';
        }
    }
    
    // Função para animar as estatísticas (apenas na página inicial)
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent.replace(/\D/g, ''));
            if (!target) return;
            
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            // Limpar conteúdo atual
            stat.textContent = '0';
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }
    
    // Sistema de notificação para tema
    function showThemeNotification(theme) {
        // Apenas mostrar notificação se for uma interação do usuário
        if (!themeToggle) return;
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${theme === 'dark' ? '#333' : '#fff'};
            color: ${theme === 'dark' ? '#fff' : '#333'};
            padding: 10px 20px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 14px;
        `;
        notification.textContent = `Modo ${theme === 'dark' ? 'noturno' : 'claro'} ativado`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    // Inicializar animação das estatísticas (apenas se existirem)
    setTimeout(() => {
        if (document.querySelector('.stat-number')) {
            animateStats();
        }
    }, 1000);
    
    // Adicionar eventos aos botões de impacto (apenas se existirem)
    const shareBtn = document.querySelector('.share-btn');
    const storyBtn = document.querySelector('.story-btn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'ReUse - Economia Circular',
                    text: 'Junte-se à ReUse e faça parte da economia circular!',
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback para copiar link
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copiado para a área de transferência!');
                });
            }
        });
    }
    
    if (storyBtn) {
        storyBtn.addEventListener('click', function() {
            alert('Em breve: Histórias inspiradoras da nossa comunidade!');
        });
    }
    
    // Adicionar efeitos de hover às estatísticas (apenas se existirem)
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adicionar animação aos botões CTA (apenas se existirem)
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adicionar efeito de digitação ao título principal (apenas na página inicial)
    const mainTitle = document.querySelector('.intro-content h1');
    if (mainTitle && !sessionStorage.getItem('typingEffectCompleted') && !window.location.pathname.includes('participar')) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                sessionStorage.setItem('typingEffectCompleted', 'true');
            }
        }
        
        // Iniciar efeito de digitação após um delay
        setTimeout(typeWriter, 500);
    }
    
    // Adicionar parallax effect às ondas (apenas se existirem)
    const waves = document.querySelectorAll('.wave');
    
    if (waves.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            waves.forEach((wave, index) => {
                const speed = 0.5 + (index * 0.1);
                wave.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
            });
        });
    }
    
    // Inicializar partículas (apenas se existirem)
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posição e tamanho aleatórios
            const size = Math.random() * 8 + 2;
            const posX = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Atualizar breadcrumbs quando o tema mudar (apenas se existirem)
    window.addEventListener('themeChanged', function() {
        if (window.unifiedBreadcrumbs) {
            setTimeout(() => {
                window.unifiedBreadcrumbs.render();
            }, 100);
        }
    });
    
    // Adicionar funcionalidade de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Adicionar observador de interseção para animações on-scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação (apenas se existirem)
    document.querySelectorAll('.intro-card, .stat-item, .cta-button, .feature, .option-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Preload das imagens da logo para transição suave
    function preloadLogos() {
        const lightLogo = new Image();
        const darkLogo = new Image();
        
        lightLogo.src = "IMG/reuse-logo-(2).svg";
        darkLogo.src = "IMG/reuse_logo_noturna.svg";
        
        lightLogo.onload = function() {
            console.log('Logo clara pré-carregada');
        };
        
        darkLogo.onload = function() {
            console.log('Logo noturna pré-carregada');
        };
        
        lightLogo.onerror = function() {
            console.warn('Erro ao carregar logo clara');
        };
        
        darkLogo.onerror = function() {
            console.warn('Erro ao carregar logo noturna');
        };
    }
    
    // Verificar se as imagens existem antes do preload
    preloadLogos();
    
    // Adicionar tratamento de erro para imagens
    if (logoImg) {
        logoImg.addEventListener('error', function() {
            console.error('Erro ao carregar imagem da logo');
            // Fallback para texto
            this.style.display = 'none';
            if (logoText) {
                logoText.style.marginLeft = '0';
            }
        });
    }
    
    // Inicializar tooltips para ícones (apenas se existirem)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0,0,0,0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
                
                this.tooltipElement = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this.tooltipElement) {
                    document.body.removeChild(this.tooltipElement);
                    this.tooltipElement = null;
                }
            });
        });
    }
    
    initTooltips();
    
    console.log('Modo noturno inicializado com sucesso para a página:', window.location.pathname);
});