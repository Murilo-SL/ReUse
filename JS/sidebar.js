// JS/sidebar-active.js

document.addEventListener('DOMContentLoaded', function() {
    // Função para definir o item ativo no sidebar baseado na página atual
    function setActiveSidebarItem() {
        // Obter o caminho atual da página
        const currentPage = window.location.pathname.split('/').pop() || 'vendedor.html';
        
        // Selecionar todos os links do sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        
        // Remover a classe 'active' de todos os links
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Adicionar a classe 'active' ao link correspondente à página atual
        sidebarLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });
        
        // Caso especial: se estiver na página inicial (vendedor.html)
        if (currentPage === 'vendedor.html' || currentPage === '') {
            const inicioLink = document.querySelector('.sidebar-nav a[href="vendedor.html"]');
            if (inicioLink) {
                inicioLink.classList.add('active');
            }
        }
    }
    
    // Executar a função quando a página carregar
    setActiveSidebarItem();
});