
            document.addEventListener('DOMContentLoaded', function () {
                // Container de ondas
                const waveContainer = document.createElement('div');
                waveContainer.className = 'wave-container';

                // Criar 4 ondas (como no estilo XMBwave)
                for (let i = 0; i < 4; i++) {
                    const wave = document.createElement('div');
                    wave.className = 'wave';
                    waveContainer.appendChild(wave);
                }

                // Container de partículas
                const particlesContainer = document.createElement('div');
                particlesContainer.className = 'particles';

                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';

                    const size = Math.random() * 6 + 2;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.bottom = `${Math.random() * 10}%`;
                    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
                    particle.style.animationDelay = `${Math.random() * 5}s`;

                    // Alternar entre partículas azuis e verdes
                    if (i % 2 === 0) {
                        particle.style.background = `rgba(0, 102, 204, ${Math.random() * 0.15 + 0.1})`;
                    } else {
                        particle.style.background = `rgba(0, 204, 153, ${Math.random() * 0.15 + 0.1})`;
                    }

                    particlesContainer.appendChild(particle);
                }

                document.body.appendChild(particlesContainer);
                document.body.appendChild(waveContainer);

                // Animação de contagem para as estatísticas
                const statNumbers = document.querySelectorAll('.stat-number');
                
                const options = {
                    threshold: 0.5,
                    rootMargin: '0px 0px -50px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const target = parseInt(entry.target.getAttribute('data-target'));
                            animateCounter(entry.target, target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, options);
                
                statNumbers.forEach(stat => {
                    observer.observe(stat);
                });
                
                function animateCounter(element, target) {
                    let current = 0;
                    const increment = target / 100;
                    const duration = 2000;
                    const stepTime = duration / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        element.textContent = Math.floor(current).toLocaleString() + '+';
                    }, stepTime);
                }

                // Efeitos de hover para os cartões de estatísticas
                const statItems = document.querySelectorAll('.stat-item');
                statItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.transform = 'translateY(-5px) scale(1.02)';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                });

                // Botões de ação
                const shareBtn = document.querySelector('.share-btn');
                const storyBtn = document.querySelector('.story-btn');
                
                shareBtn.addEventListener('click', function() {
                    if (navigator.share) {
                        navigator.share({
                            title: 'ReUse - Impacto Sustentável',
                            text: 'Confira o impacto positivo que estamos gerando juntos!',
                            url: window.location.href
                        });
                    } else {
                        alert('Compartilhe nosso impacto nas suas redes sociais!');
                    }
                });
                
                storyBtn.addEventListener('click', function() {
                    alert('Em breve: histórias inspiradoras da nossa comunidade!');
                });
            });