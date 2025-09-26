       // Adicionar efeitos de partículas
        document.addEventListener('DOMContentLoaded', function() {
            // Container de partículas
            const particlesContainer = document.querySelector('.particles');
            
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 6 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.bottom = `-${size}px`;
                particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                // Alternar entre partículas azuis e verdes
                if (i % 2 === 0) {
                    particle.style.background = `rgba(0, 102, 204, ${Math.random() * 0.4 + 0.2})`;
                } else {
                    particle.style.background = `rgba(0, 204, 153, ${Math.random() * 0.4 + 0.2})`;
                }
                
                particlesContainer.appendChild(particle);
            }
        });