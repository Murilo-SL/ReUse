// dark-mode.js - Gerenciador global de Dark Mode
// Deve ser carregado como o primeiro script

class DarkModeManager {
    constructor() {
        this.STORAGE_KEY = 'reuse_dark_mode';
        this.init();
    }

    init() {
        // Restaurar dark mode ao carregar a página
        this.restoreDarkMode();
        
        // Aguardar DOM estar pronto para configurar botão
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupButton());
        } else {
            this.setupButton();
        }
    }

    restoreDarkMode() {
        const isDarkMode = localStorage.getItem(this.STORAGE_KEY) === 'true';
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
    }

    setupButton() {
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (!darkModeBtn) return;

        // Sincronizar ícone com estado atual
        this.updateButtonIcon(darkModeBtn);

        // Adicionar listener
        darkModeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDarkMode();
        });
    }

    toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        
        localStorage.setItem(this.STORAGE_KEY, isDarkMode.toString());

        // Atualizar ícone
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            this.updateButtonIcon(darkModeBtn);
        }

        console.log(`Dark Mode: ${isDarkMode ? 'ON' : 'OFF'}`);
    }

    updateButtonIcon(button) {
        const icon = button.querySelector('i');
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (icon) {
            if (isDarkMode) {
                icon.classList.remove('bi-moon');
                icon.classList.add('bi-sun');
                button.title = 'Modo Claro';
            } else {
                icon.classList.remove('bi-sun');
                icon.classList.add('bi-moon');
                button.title = 'Modo Noturno';
            }
        }
    }
}

// Inicializar gerenciador de dark mode
window.darkModeManager = new DarkModeManager();
