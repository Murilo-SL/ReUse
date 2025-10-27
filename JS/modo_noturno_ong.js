// modo_noturno_ong.js - Baseado no modo noturno do vendedor

class DarkModeONG {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('ong-theme') || 'light';
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        this.watchSystemTheme();
    }

    applyTheme(theme) {
        const body = document.body;
        
        if (theme === 'dark') {
            body.classList.add('night-mode');
            this.themeIcon.className = 'bi bi-moon-fill';
            this.themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        } else {
            body.classList.remove('night-mode');
            this.themeIcon.className = 'bi bi-sun-fill';
            this.themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        }
        
        localStorage.setItem('ong-theme', theme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (!localStorage.getItem('ong-theme')) {
            this.currentTheme = mediaQuery.matches ? 'dark' : 'light';
            this.applyTheme(this.currentTheme);
        }

        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('ong-theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    window.ongDarkMode = new DarkModeONG();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ongDarkMode = new DarkModeONG();
    });
} else {
    window.ongDarkMode = new DarkModeONG();
}