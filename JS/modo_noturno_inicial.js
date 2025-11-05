// modo_noturno_inicial.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Aplicar tema salvo
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'bi bi-sun';
    }
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'bi bi-sun';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'bi bi-moon';
        }
        
        // Disparar evento customizado para componentes que precisam se atualizar
        window.dispatchEvent(new Event('themeChanged'));
    });
    
    // Atualizar breadcrumbs quando o tema mudar
    window.addEventListener('themeChanged', function() {
        if (window.unifiedBreadcrumbs) {
            setTimeout(() => {
                window.unifiedBreadcrumbs.render();
            }, 100);
        }
    });
});