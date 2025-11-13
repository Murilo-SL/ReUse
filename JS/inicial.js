document.addEventListener('DOMContentLoaded', function () {
    // Container de ondas com espectro de cores
    const waveContainer = document.createElement('div');
    waveContainer.className = 'wave-container';

    // Criar 4 ondas com cores diferentes
    for (let i = 0; i < 4; i++) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        waveContainer.appendChild(wave);
    }

    document.body.appendChild(waveContainer);

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

    // Adicione ao arquivo inicial.js
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação para o título do CTA
    const ctaTitle = document.querySelector('.cta-section h2');
    if (ctaTitle) {
        const originalText = ctaTitle.textContent;
        ctaTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                ctaTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar animação quando a seção estiver visível
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    ctaObserver.unobserve(entry.target);
                }
            });
        });
        
        ctaObserver.observe(ctaTitle);
    }
    
    // Efeitos de hover para os botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animações para os benefícios
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate__animated', 'animate__fadeInLeft');
    });
});

});