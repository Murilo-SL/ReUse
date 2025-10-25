// modo_noturno_vendedor.js - Funcionalidades para modo noturno do vendedor

/**
 * Alterna entre modo claro e escuro
 */
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeToggle = document.getElementById('themeToggle');
    
    // Adicionar animação de rotação
    themeToggle.style.pointerEvents = 'none';
    themeIcon.style.transform = 'rotate(360deg)';
    themeIcon.style.opacity = '0.7';
    
    setTimeout(() => {
        if (body.classList.contains('night-mode')) {
            // Mudar para modo claro
            body.classList.remove('night-mode');
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            localStorage.setItem('vendedor-theme', 'light');
        } else {
            // Mudar para modo escuro
            body.classList.add('night-mode');
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            localStorage.setItem('vendedor-theme', 'dark');
        }
        
        // Resetar animação
        themeIcon.style.transform = 'rotate(0deg)';
        themeIcon.style.opacity = '1';
        
        setTimeout(() => {
            themeToggle.style.pointerEvents = 'auto';
        }, 300);
    }, 300);
}

/**
 * Carrega o tema salvo
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('vendedor-theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('night-mode');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }
}

/**
 * Inicializa todas as funcionalidades do modo noturno
 */
function initializeNightMode() {
    // Carregar tema
    loadTheme();
    
    // Configurar botão de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Inicializar quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNightMode);
} else {
    initializeNightMode();
}

// Torna as funções disponíveis globalmente se necessário
window.VendedorNightMode = {
    toggleTheme,
    loadTheme
};