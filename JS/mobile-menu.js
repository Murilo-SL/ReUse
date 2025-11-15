// mobile-menu.js - Controle do Menu Hamburguer para Mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const controlButtonsContainer = document.getElementById('controlButtonsContainer');
    
    if (!mobileMenuToggle || !controlButtonsContainer) return;
    
    // Alternar menu mobile
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        controlButtonsContainer.classList.toggle('active');
        
        // Fechar outros menus abertos
        closeAllMenusExcept(controlButtonsContainer);
        
        // Atualizar aria-label
        const isExpanded = controlButtonsContainer.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        mobileMenuToggle.setAttribute('aria-label', isExpanded ? 'Fechar menu' : 'Abrir menu');
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!controlButtonsContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            controlButtonsContainer.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menu');
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            controlButtonsContainer.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menu');
        }
    });
    
    // Função para fechar todos os menus exceto o especificado
    function closeAllMenusExcept(exceptMenu) {
        const allMenus = document.querySelectorAll('.control-buttons-container, .accessibility-menu, .language-selector.active');
        
        allMenus.forEach(menu => {
            if (menu !== exceptMenu && !menu.contains(exceptMenu)) {
                menu.classList.remove('active');
                
                // Atualizar estados dos botões
                if (menu.classList.contains('language-selector')) {
                    menu.classList.remove('active');
                }
            }
        });
    }
    
    // Fechar menu mobile quando um botão for clicado (opcional)
    const controlButtons = controlButtonsContainer.querySelectorAll('button, .language-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Não fechar o menu se for o botão do seletor de idioma
            if (!this.classList.contains('language-btn')) {
                setTimeout(() => {
                    controlButtonsContainer.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'Abrir menu');
                }, 300);
            }
        });
    });
    
    console.log('Menu mobile inicializado');
});