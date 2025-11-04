// JS/favoritos.js - VERSÃO COMPLETA ATUALIZADA

// Dados dos produtos
const produtos = {
    "1": {
        id: "1",
        nome: "Camiseta Polo",
        precoVista: 39.90,
        precoParcelado: 39.90,
        parcelas: 1,
        imagem: "IMG/camiseta-polo.jpg",
        link: "produto.html?id=1",
        condicao: "semi-new",
        categoria: "Masculino"
    },
    "2": {
        id: "2",
        nome: "Liquidificador Philips",
        precoVista: 89.90,
        precoParcelado: 89.90 / 3,
        parcelas: 3,
        imagem: "IMG/liquidificador-phill.jpg",
        link: "produto.html?id=2",
        condicao: "semi-new",
        categoria: "Casa/Cozinha"
    },
    "3": {
        id: "3",
        nome: "Tênis Nike",
        precoVista: 199.99,
        precoParcelado: 199.99 / 10,
        parcelas: 10,
        imagem: "IMG/tenis-nike.avif",
        link: "produto.html?id=3",
        condicao: "new",
        categoria: "Esportivo"
    },
    "4": {
        id: "4",
        nome: "Vestido Floral",
        precoVista: 65.00,
        precoParcelado: 65.00 / 2,
        parcelas: 2,
        imagem: "IMG/vestido-floral.jpg",
        link: "produto.html?id=4",
        condicao: "new",
        categoria: "Feminino"
    },
    "5": {
        id: "5",
        nome: "Calça Jeans Masculina",
        precoVista: 79.90,
        precoParcelado: 79.90 / 2,
        parcelas: 2,
        imagem: "IMG/calca_j.jpg",
        link: "produto.html?id=5",
        condicao: "used",
        categoria: "Masculino"
    },
    "6": {
        id: "6",
        nome: "Tênis Casual",
        precoVista: 129.90,
        precoParcelado: 129.90 / 3,
        parcelas: 3,
        imagem: "IMG/tenis_c.jpg",
        link: "produto.html?id=6",
        condicao: "new",
        categoria: "Masculino"
    },
    "7": {
        id: "7",
        nome: "Relógio Esportivo",
        precoVista: 89.90,
        precoParcelado: 89.90 / 2,
        parcelas: 2,
        imagem: "IMG/relogio_s_n.jpg",
        link: "produto.html?id=7",
        condicao: "semi-new",
        categoria: "Feminino"
    },
    "8": {
        id: "8",
        nome: "Jaqueta de Couro",
        precoVista: 199.90,
        precoParcelado: 199.90 / 4,
        parcelas: 4,
        imagem: "IMG/jaqueta_c_u.jpg",
        link: "produto.html?id=8",
        condicao: "used",
        categoria: "Masculino"
    },
    "9": {
        id: "9",
        nome: "Blusa de Seda",
        precoVista: 45.00,
        precoParcelado: 45.00,
        parcelas: 1,
        imagem: "IMG/blusa_s_s.jpg",
        link: "produto.html?id=9",
        condicao: "semi-new",
        categoria: "Feminino"
    },
    "10": {
        id: "10",
        nome: "Salto Alto",
        precoVista: 89.90,
        precoParcelado: 89.90 / 2,
        parcelas: 2,
        imagem: "IMG/salto_a_u.jpg",
        link: "produto.html?id=10",
        condicao: "used",
        categoria: "Feminino"
    },
    "11": {
        id: "11",
        nome: "Bolsa de Couro",
        precoVista: 120.00,
        precoParcelado: 120.00 / 3,
        parcelas: 3,
        imagem: "IMG/bolsa_c_s.jpg",
        link: "produto.html?id=11",
        condicao: "semi-new",
        categoria: "Feminino"
    },
    "12": {
        id: "12",
        nome: "Saia Midi",
        precoVista: 55.00,
        precoParcelado: 55.00,
        parcelas: 1,
        imagem: "IMG/saia_m_n.jpg",
        link: "produto.html?id=12",
        condicao: "new",
        categoria: "Feminino"
    },
    "13": {
        id: "13",
        nome: "Conjunto Infantil",
        precoVista: 49.90,
        precoParcelado: 49.90,
        parcelas: 1,
        imagem: "IMG/conjunto_i_s.jpg",
        link: "produto.html?id=13",
        condicao: "semi-new",
        categoria: "Infantil"
    },
    "14": {
        id: "14",
        nome: "Tênis Infantil",
        precoVista: 39.90,
        precoParcelado: 39.90,
        parcelas: 1,
        imagem: "IMG/tenis_i_n.jpg",
        link: "produto.html?id=14",
        condicao: "new",
        categoria: "Infantil"
    },
    "15": {
        id: "15",
        nome: "Carrinho de Brinquedo",
        precoVista: 25.00,
        precoParcelado: 25.00,
        parcelas: 1,
        imagem: "IMG/carrinho_b_u.jpg",
        link: "produto.html?id=15",
        condicao: "used",
        categoria: "Infantil"
    },
    "16": {
        id: "16",
        nome: "Vestido Infantil",
        precoVista: 35.00,
        precoParcelado: 35.00,
        parcelas: 1,
        imagem: "IMG/vestido_i_s.jpg",
        link: "produto.html?id=16",
        condicao: "semi-new",
        categoria: "Infantil"
    },
    "17": {
        id: "17",
        nome: "Camiseta Dry Fit",
        precoVista: 49.90,
        precoParcelado: 49.90,
        parcelas: 1,
        imagem: "IMG/camiseta_d_f_s.jpg",
        link: "produto.html?id=17",
        condicao: "semi-new",
        categoria: "Esportivo"
    },
    "18": {
        id: "18",
        nome: "Shorts de Corrida",
        precoVista: 35.00,
        precoParcelado: 35.00,
        parcelas: 1,
        imagem: "IMG/short_c_u.jpg",
        link: "produto.html?id=18",
        condicao: "used",
        categoria: "Esportivo"
    },
    "19": {
        id: "19",
        nome: "Garrafa Térmica",
        precoVista: 29.90,
        precoParcelado: 29.90,
        parcelas: 1,
        imagem: "IMG/garrafa_t_n.jpg",
        link: "produto.html?id=19",
        condicao: "new",
        categoria: "Casa/Cozinha"
    },
    "20": {
        id: "20",
        nome: "Panela de Pressão",
        precoVista: 65.00,
        precoParcelado: 65.00,
        parcelas: 1,
        imagem: "IMG/panela_p_u.jpg",
        link: "produto.html?id=20",
        condicao: "used",
        categoria: "Casa/Cozinha"
    },
    "21": {
        id: "21",
        nome: "Cadeira de Escritório",
        precoVista: 150.00,
        precoParcelado: 150.00 / 3,
        parcelas: 3,
        imagem: "IMG/cadeira_e_s.jpg",
        link: "produto.html?id=21",
        condicao: "semi-new",
        categoria: "Casa/Cozinha"
    },
    "22": {
        id: "22",
        nome: "Jogo de Panelas",
        precoVista: 120.00,
        precoParcelado: 120.00 / 3,
        parcelas: 3,
        imagem: "IMG/panela_n.jpg",
        link: "produto.html?id=22",
        condicao: "new",
        categoria: "Casa/Cozinha"
    }
};

// Variáveis globais
let favoritos = [];
let filteredFavoritos = [];
let currentPage = 1;
const productsPerPage = 8;
let notificationQueue = [];
let isShowingNotification = false;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Injetar estilos das notificações
    injectNotificationStyles();
    
    // Carregar favoritos do localStorage
    loadFavorites();
    
    // Configurar eventos dos filtros
    setupFilters();
    
    // Configurar evento do botão limpar todos
    setupClearAllButton();
    
    // Configurar eventos de paginação
    setupPaginationEvents();
});

// Carregar favoritos do localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
        favoritos = JSON.parse(savedFavorites);
    }
    
    // Aplicar filtros iniciais
    applyFilters();
}

// Configurar eventos dos filtros
function setupFilters() {
    const sortSelect = document.getElementById('sort-favoritos');
    const categoryFilter = document.getElementById('category-favoritos');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

// Configurar evento do botão limpar todos
function setupClearAllButton() {
    const clearAllBtn = document.getElementById('btn-clear-all');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            if (favoritos.length > 0) {
                if (confirm('Tem certeza que deseja remover todos os produtos dos favoritos?')) {
                    favoritos = [];
                    localStorage.setItem('userFavorites', JSON.stringify(favoritos));
                    applyFilters();
                    
                    // Mostrar notificação de sucesso
                    showNotification('Todos os produtos removidos dos favoritos', 'success');
                }
            } else {
                showNotification('Não há produtos para remover', 'info');
            }
        });
    }
}

// Configurar eventos de paginação
function setupPaginationEvents() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (prevButton) {
        prevButton.addEventListener('click', goToPreviousPage);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextPage);
    }
}

// Aplicar filtros aos favoritos
function applyFilters() {
    const sortSelect = document.getElementById('sort-favoritos');
    const categoryFilter = document.getElementById('category-favoritos');
    
    // Filtrar por categoria
    let tempFavoritos = [...favoritos];
    
    if (categoryFilter && categoryFilter.value !== 'all') {
        tempFavoritos = tempFavoritos.filter(productId => {
            const produto = produtos[productId];
            return produto && produto.categoria.toLowerCase().includes(categoryFilter.value.toLowerCase());
        });
    }
    
    // Ordenar favoritos
    if (sortSelect) {
        switch(sortSelect.value) {
            case 'price-low':
                tempFavoritos.sort((a, b) => {
                    const produtoA = produtos[a];
                    const produtoB = produtos[b];
                    return (produtoA?.precoVista || 0) - (produtoB?.precoVista || 0);
                });
                break;
            case 'price-high':
                tempFavoritos.sort((a, b) => {
                    const produtoA = produtos[a];
                    const produtoB = produtos[b];
                    return (produtoB?.precoVista || 0) - (produtoA?.precoVista || 0);
                });
                break;
            case 'category':
                tempFavoritos.sort((a, b) => {
                    const produtoA = produtos[a];
                    const produtoB = produtos[b];
                    return (produtoA?.categoria || '').localeCompare(produtoB?.categoria || '');
                });
                break;
            case 'recent':
            default:
                // Manter ordenação original (mais recentes primeiro)
                break;
        }
    }
    
    filteredFavoritos = tempFavoritos;
    currentPage = 1;
    renderFavorites();
}

// Renderizar favoritos na página
function renderFavorites() {
    const favoritosGrid = document.getElementById('favoritos-grid');
    const emptyFavoritos = document.getElementById('emptyFavoritos');
    const favoritosCount = document.getElementById('favoritos-count');
    const pagination = document.getElementById('pagination');
    
    // Atualizar contador
    if (favoritosCount) {
        favoritosCount.textContent = filteredFavoritos.length;
    }
    
    // Verificar se há favoritos
    if (filteredFavoritos.length === 0) {
        if (favoritosGrid) favoritosGrid.style.display = 'none';
        if (emptyFavoritos) emptyFavoritos.style.display = 'block';
        if (pagination) pagination.style.display = 'none';
        return;
    }
    
    // Mostrar grade de produtos
    if (favoritosGrid) {
        favoritosGrid.style.display = 'grid';
        favoritosGrid.innerHTML = '';
    }
    if (emptyFavoritos) emptyFavoritos.style.display = 'none';
    if (pagination) pagination.style.display = 'flex';
    
    // Calcular produtos para a página atual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredFavoritos.length);
    const currentProducts = filteredFavoritos.slice(startIndex, endIndex);
    
    // Adicionar produtos à grade
    currentProducts.forEach(productId => {
        const produto = produtos[productId];
        if (produto && favoritosGrid) {
            const productCard = createProductCard(produto);
            favoritosGrid.appendChild(productCard);
        }
    });
    
    // Atualizar paginação
    updatePagination();
}

// Criar card de produto
function createProductCard(produto) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            <button class="remove-favorite" data-id="${produto.id}" aria-label="Remover dos favoritos">
                <i class="bi bi-heart-fill"></i>
            </button>
            ${produto.condicao === 'new' ? '<span class="condition-badge new">Novo</span>' : 
              produto.condicao === 'semi-new' ? '<span class="condition-badge semi-new">Semi-novo</span>' : 
              '<span class="condition-badge used">Usado</span>'}
        </div>
        <div class="product-info">
            <h3 class="product-name">${produto.nome}</h3>
            <p class="product-category">${produto.categoria}</p>
            <div class="product-prices">
                <span class="price-vista">R$ ${produto.precoVista.toFixed(2)}</span>
                <span class="price-parcelado">ou ${produto.parcelas}x de R$ ${produto.precoParcelado.toFixed(2)}</span>
            </div>
            <div class="product-actions">
                <a href="${produto.link}" class="btn btn-primary">Ver Produto</a>
                <button class="btn btn-secondary add-to-cart" data-id="${produto.id}">
                    <i class="bi bi-cart-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Adicionar evento para remover dos favoritos
    const removeButton = productCard.querySelector('.remove-favorite');
    if (removeButton) {
        removeButton.addEventListener('click', function(e) {
            e.preventDefault();
            removeFromFavorites(produto.id);
        });
    }
    
    // Adicionar evento para adicionar ao carrinho
    const addToCartButton = productCard.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(produto.id);
        });
    }
    
    return productCard;
}

// Remover produto dos favoritos
function removeFromFavorites(productId) {
    const index = favoritos.indexOf(productId);
    if (index !== -1) {
        const produto = produtos[productId];
        favoritos.splice(index, 1);
        localStorage.setItem('userFavorites', JSON.stringify(favoritos));
        applyFilters();
        
        // Mostrar notificação com nome do produto
        showNotification(`"${produto.nome}" removido dos favoritos`, 'success');
    }
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const produto = produtos[productId];
    
    // Simular adição ao carrinho
    showNotification(`"${produto.nome}" adicionado ao carrinho`, 'success');
    
    // Atualizar contador do carrinho
    updateCartCount();
}

// Atualizar contador do carrinho
function updateCartCount() {
    // Implementar lógica para atualizar contador do carrinho
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Atualizar paginação
function updatePagination() {
    const totalPages = Math.ceil(filteredFavoritos.length / productsPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    
    // Atualizar estado dos botões
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
    }
    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
    }
    
    // Atualizar números da paginação
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        // Mostrar até 5 números de página
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // Ajustar se não houver páginas suficientes no início
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageNumber = document.createElement('button');
            pageNumber.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
            pageNumber.textContent = i;
            pageNumber.addEventListener('click', () => {
                currentPage = i;
                renderFavorites();
            });
            paginationNumbers.appendChild(pageNumber);
        }
    }
}

// Navegação entre páginas
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderFavorites();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredFavoritos.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderFavorites();
    }
}

// SISTEMA DE NOTIFICAÇÕES EM LINHA
function showNotification(message, type = 'success') {
    notificationQueue.push({ message, type });
    
    if (!isShowingNotification) {
        processNotificationQueue();
    }
}

function processNotificationQueue() {
    if (notificationQueue.length === 0) {
        isShowingNotification = false;
        return;
    }
    
    isShowingNotification = true;
    const { message, type } = notificationQueue.shift();
    showSingleNotification(message, type);
}

function showSingleNotification(message, type = 'success') {
    // Criar elemento de notificação em linha
    const notification = document.createElement('div');
    notification.className = `notification-line notification-${type}`;
    
    // Ícones para diferentes tipos de notificação
    const icons = {
        success: 'bi bi-check-circle',
        error: 'bi bi-x-circle',
        warning: 'bi bi-exclamation-circle',
        info: 'bi bi-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-line-content">
            <i class="${icons[type]}"></i>
            <span class="notification-line-text">${message}</span>
        </div>
        <button class="notification-line-close" aria-label="Fechar notificação">
            <i class="bi bi-x"></i>
        </button>
        <div class="notification-line-progress"></div>
    `;
    
    // Estilização da notificação em linha
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transform: translateX(400px) translateY(100px);
        opacity: 0;
        max-width: 400px;
        width: auto;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        font-family: inherit;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0) translateY(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Configurar botão de fechar
    const closeButton = notification.querySelector('.notification-line-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeNotification(notification);
        });
    }
    
    // Fechar automaticamente após 4 segundos
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 4000);
    
    // Pausar progresso ao passar o mouse
    notification.addEventListener('mouseenter', () => {
        const progress = notification.querySelector('.notification-line-progress');
        if (progress) progress.style.animationPlayState = 'paused';
    });
    
    notification.addEventListener('mouseleave', () => {
        const progress = notification.querySelector('.notification-line-progress');
        if (progress) progress.style.animationPlayState = 'running';
    });
    
    function closeNotification(notif) {
        clearTimeout(autoClose);
        notif.style.transform = 'translateX(400px) translateY(100px)';
        notif.style.opacity = '0';
        setTimeout(() => {
            if (notif.parentNode) {
                document.body.removeChild(notif);
            }
            // Processar próxima notificação na fila
            setTimeout(processNotificationQueue, 300);
        }, 300);
    }
}

// Cores para diferentes tipos de notificação
function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        error: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        warning: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        info: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
    };
    return colors[type] || colors.success;
}

function getNotificationBorderColor(type) {
    const colors = {
        success: '#2E7D32',
        error: '#C62828',
        warning: '#EF6C00',
        info: '#1565C0'
    };
    return colors[type] || colors.success;
}

// Injetar estilos para notificações em linha
function injectNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification-line {
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .notification-line-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
            font-size: 14px;
            font-weight: 500;
        }
        
        .notification-line-content i {
            font-size: 16px;
            opacity: 0.9;
            flex-shrink: 0;
        }
        
        .notification-line-text {
            line-height: 1.4;
            flex: 1;
        }
        
        .notification-line-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: white;
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .notification-line-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .notification-line-progress {
            position: absolute;
            bottom: 0;
            left: 4px;
            right: 4px;
            height: 2px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 1px;
            transform-origin: left;
            animation: line-progress 4s linear forwards;
        }
        
        @keyframes line-progress {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
        
        /* Efeito de brilho sutil na parte superior */
        .notification-line::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        }
        
        /* Responsividade */
        @media (max-width: 480px) {
            .notification-line {
                bottom: 15px;
                right: 15px;
                left: 15px;
                max-width: none;
                min-width: auto;
                transform: translateY(100px);
            }
            
            .notification-line-content {
                font-size: 13px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para demonstrar diferentes tipos de notificação (para testes)
function demoNotifications() {
    showNotification('Produto adicionado aos favoritos', 'success');
    setTimeout(() => showNotification('Erro ao processar solicitação', 'error'), 1500);
    setTimeout(() => showNotification('Carrinho atualizado com sucesso', 'success'), 3000);
    setTimeout(() => showNotification('Promoção termina em 2 horas', 'warning'), 4500);
}

// Descomente a linha abaixo para testar as notificações
// demoNotifications();