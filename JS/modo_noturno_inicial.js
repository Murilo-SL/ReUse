    // Alternância de Modo Claro/Escuro
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Verificar preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Aplicar tema salvo
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('bi-moon');
            themeIcon.classList.add('bi-sun');
        }
        
        // Alternar tema
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('bi-moon');
                themeIcon.classList.add('bi-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('bi-sun');
                themeIcon.classList.add('bi-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Contador animado para a seção de impacto
        const statNumbers = document.querySelectorAll('.stat-number');
        
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        }
        
        // Observador para animar contadores quando visíveis
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    });