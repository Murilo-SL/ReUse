// ============ SISTEMA DE MENU ATIVO ============

// Função para atualizar o menu ativo baseado na página atual
function atualizarMenuAtivo() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.sidebar-nav a');
    
    // Remover classe active de todos os itens
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Encontrar e ativar o item correspondente à página atual
    const currentItem = document.querySelector(`.sidebar-nav a[href="${currentPage}"]`);
    if (currentItem) {
        currentItem.classList.add('active');
    } else {
        // Fallback: verificar por correspondência parcial
        menuItems.forEach(item => {
            if (currentPage.includes(item.getAttribute('href').replace('.html', ''))) {
                item.classList.add('active');
            }
        });
    }
}

// Função para verificar e corrigir o menu ativo no carregamento
function verificarMenuAtivo() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Página atual:', currentPage);
    
    const activeItem = document.querySelector('.sidebar-nav a.active');
    if (activeItem) {
        console.log('Item ativo atual:', activeItem.getAttribute('href'));
    }
    
    // Forçar a atualização do menu
    atualizarMenuAtivo();
}