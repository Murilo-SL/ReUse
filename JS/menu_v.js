// Controle do menu hamburguer - Versão Corrigida
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Função para abrir o menu
    function openMenu() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    // Função para fechar o menu
    function closeMenu() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Alternar menu - Botão Hamburguer
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            openMenu();
        });
    }

    // Fechar menu - Botão X
    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Fechar menu ao clicar no overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // Fechar menu ao clicar em um link do menu
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1080) {
                closeMenu();
            }
        });
    });

    // Fechar menu ao redimensionar acima de 1080px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1080) {
            closeMenu();
        }
    });

    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Fechar menu ao clicar fora (em telas maiores)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1080 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuToggle) {
            closeMenu();
        }
    });
});