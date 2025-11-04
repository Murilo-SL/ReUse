// JS/categoria.js - ATUALIZADO COM SISTEMA DE FAVORITOS

// Dados dos produtos por categoria
const productsData = {
    'masculino': {
        title: 'Produtos Masculinos',
        description: 'Encontre roupas, calçados e acessórios masculinos com ótimos preços',
        products: [
            { id: 1, name: 'Camiseta Polo', price: 39.90, category: 'Masculino', subcategory: 'roupas', image: 'IMG/camiseta-polo.jpg', link: 'produto.html?id=1', condition: 'semi-new' },
            { id: 5, name: 'Calça Jeans Masculina', price: 79.90, category: 'Masculino', subcategory: 'roupas', image: 'IMG/calca_j.jpg', link: 'produto.html?id=5', condition: 'used' },
            { id: 6, name: 'Tênis Casual', price: 129.90, category: 'Masculino', subcategory: 'calcados', image: 'IMG/tenis_c.jpg', link: 'produto.html?id=6', condition: 'new' },
            { id: 7, name: 'Relógio Esportivo', price: 89.90, category: 'Masculino', subcategory: 'acessorios', image: 'IMG/relogio_s_n.jpg', link: 'produto.html?id=7', condition: 'semi-new' },
            { id: 8, name: 'Jaqueta de Couro', price: 199.90, category: 'Masculino', subcategory: 'roupas', image: 'IMG/jaqueta_c_u.jpg', link: 'produto.html?id=8', condition: 'used' }
        ]
    },
    'feminino': {
        title: 'Produtos Femininos',
        description: 'Descubra roupas, calçados e acessórios femininos incríveis',
        products: [
            { id: 4, name: 'Vestido Floral', price: 65.00, category: 'Feminino', subcategory: 'roupas', image: 'IMG/vestido-floral.jpg', link: 'produto.html?id=4', condition: 'new' },
            { id: 9, name: 'Blusa de Seda', price: 45.00, category: 'Feminino', subcategory: 'roupas', image: 'IMG/blusa_s_s.jpg', link: 'produto.html?id=9', condition: 'semi-new' },
            { id: 10, name: 'Salto Alto', price: 89.90, category: 'Feminino', subcategory: 'calcados', image: 'IMG/salto_a_u.jpg', link: 'produto.html?id=10', condition: 'used' },
            { id: 11, name: 'Bolsa de Couro', price: 120.00, category: 'Feminino', subcategory: 'acessorios', image: 'IMG/bolsa_c_s.jpg', link: 'produto.html?id=11', condition: 'semi-new' },
            { id: 12, name: 'Saia Midi', price: 55.00, category: 'Feminino', subcategory: 'roupas', image: 'IMG/saia_m_n.jpg', link: 'produto.html?id=12', condition: 'new' }
        ]
    },
    'infantil': {
        title: 'Produtos Infantis',
        description: 'Roupas, calçados e brinquedos para crianças de todas as idades',
        products: [
            { id: 13, name: 'Conjunto Infantil', price: 49.90, category: 'Infantil', subcategory: 'roupas', image: 'IMG/conjunto_i_s.jpg', link: 'produto.html?id=13', condition: 'semi-new' },
            { id: 14, name: 'Tênis Infantil', price: 39.90, category: 'Infantil', subcategory: 'calcados', image: 'IMG/tenis_i_n.jpg', link: 'produto.html?id=14', condition: 'new' },
            { id: 15, name: 'Carrinho de Brinquedo', price: 25.00, category: 'Infantil', subcategory: 'outros', image: 'IMG/carrinho_b_u.jpg', link: 'produto.html?id=15', condition: 'used' },
            { id: 16, name: 'Vestido Infantil', price: 35.00, category: 'Infantil', subcategory: 'roupas', image: 'IMG/vestido_i_s.jpg', link: 'produto.html?id=16', condition: 'semi-new' }
        ]
    },
    'esportivo': {
        title: 'Produtos Esportivos',
        description: 'Equipamentos e roupas para suas atividades físicas',
        products: [
            { id: 3, name: 'Tênis Nike', price: 199.99, category: 'Esportivo', subcategory: 'calcados', image: 'IMG/tenis-nike.avif', link: 'produto.html?id=3', condition: 'new' },
            { id: 17, name: 'Camiseta Dry Fit', price: 49.90, category: 'Esportivo', subcategory: 'roupas', image: 'IMG/camiseta_d_f_s.jpg', link: 'produto.html?id=17', condition: 'semi-new' },
            { id: 18, name: 'Shorts de Corrida', price: 35.00, category: 'Esportivo', subcategory: 'roupas', image: 'IMG/short_c_u.jpg', link: 'produto.html?id=18', condition: 'used' },
            { id: 19, name: 'Garrafa Térmica', price: 29.90, category: 'Esportivo', subcategory: 'outros', image: 'IMG/garrafa_t_n.jpg', link: 'produto.html?id=19', condition: 'new' }
        ]
    },
    'casa-cozinha': {
        title: 'Casa e Cozinha',
        description: 'Eletrodomésticos, móveis e utensílios para seu lar',
        products: [
            { id: 2, name: 'Liquidificador Philips', price: 89.90, category: 'Casa/Cozinha', subcategory: 'eletrodomesticos', image: 'IMG/liquidificador-phill.jpg', link: 'produto.html?id=2', condition: 'semi-new' },
            { id: 20, name: 'Panela de Pressão', price: 65.00, category: 'Casa/Cozinha', subcategory: 'utensilios', image: 'IMG/panela_p_u.jpg', link: 'produto.html?id=20', condition: 'used' },
            { id: 21, name: 'Cadeira de Escritório', price: 150.00, category: 'Casa/Cozinha', subcategory: 'moveis', image: 'IMG/cadeira_e_s.jpg', link: 'produto.html?id=21', condition: 'semi-new' },
            { id: 22, name: 'Jogo de Panelas', price: 120.00, category: 'Casa/Cozinha', subcategory: 'utensilios', image: 'IMG/panela_n.jpg', link: 'produto.html?id=22', condition: 'new' }
        ]
    }
};

// Mapeamento de categorias para nomes amigáveis
const categoryNames = {
    'masculino': 'Masculino',
    'feminino': 'Feminino',
    'infantil': 'Infantil',
    'esportivo': 'Esportivo',
    'casa-cozinha': 'Casa/Cozinha'
};

// Mapeamento de subcategorias para nomes amigáveis
const subcategoryNames = {
    'roupas': 'Roupas',
    'calcados': 'Calçados',
    'acessorios': 'Acessórios',
    'outros': 'Outros',
    'eletrodomesticos': 'Eletrodomésticos',
    'moveis': 'Móveis',
    'utensilios': 'Utensílios'
};

// Variáveis globais
let currentProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 8;

// FUNÇÕES DE FAVORITOS
function getFavorites() {
    const savedFavorites = localStorage.getItem('userFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function toggleFavorite(productId, button) {
    let favorites = getFavorites();
    
    if (favorites.includes(productId.toString())) {
        // Remover dos favoritos
        favorites = favorites.filter(id => id !== productId.toString());
        button.classList.remove('active');
        button.innerHTML = '<i class="bi bi-heart"></i>';
        showNotification('Produto removido dos favoritos', 'info');
    } else {
        // Adicionar aos favoritos
        favorites.push(productId.toString());
        button.classList.add('active');
        button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        showNotification('Produto adicionado aos favoritos');
    }
    
    saveFavorites(favorites);
}

function setupFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-id');
            toggleFavorite(productId, this);
        });
        
        // Verificar estado inicial do favorito
        const productId = button.getAttribute('data-id');
        const favorites = getFavorites();
        if (favorites.includes(productId)) {
            button.classList.add('active');
            button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        } else {
            button.classList.remove('active');
            button.innerHTML = '<i class="bi bi-heart"></i>';
        }
    });
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    const subcategory = urlParams.get('sub');
    
    // Carregar produtos da categoria
    loadCategoryProducts(category, subcategory);
    
    // Configurar eventos dos filtros
    setupFilters();
});

// Carregar produtos da categoria
function loadCategoryProducts(category, subcategory) {
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');
    const currentCategoryElement = document.getElementById('current-category');
    const currentSubcategoryElement = document.getElementById('current-subcategory');
    
    // Verificar se a categoria existe
    if (!category || !productsData[category]) {
        // Categoria não encontrada, redirecionar para página inicial
        window.location.href = 'cliente.html';
        return;
    }
    
    // Atualizar informações da categoria
    const categoryData = productsData[category];
    categoryTitle.textContent = categoryData.title;
    categoryDescription.textContent = categoryData.description;
    currentCategoryElement.textContent = categoryNames[category];
    
    // Filtrar produtos por subcategoria se especificada
    if (subcategory) {
        currentProducts = categoryData.products.filter(product => 
            product.subcategory === subcategory
        );
        currentSubcategoryElement.textContent = ' > ' + subcategoryNames[subcategory];
    } else {
        currentProducts = [...categoryData.products];
        currentSubcategoryElement.textContent = '';
    }
    
    // Aplicar filtros iniciais
    applyFilters();
}

// Configurar eventos dos filtros
function setupFilters() {
    const sortSelect = document.getElementById('sort-select');
    const conditionFilter = document.getElementById('condition-filter');
    const priceFilter = document.getElementById('price-filter');
    
    sortSelect.addEventListener('change', applyFilters);
    conditionFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
}

// Aplicar filtros aos produtos
function applyFilters() {
    const sortSelect = document.getElementById('sort-select');
    const conditionFilter = document.getElementById('condition-filter');
    const priceFilter = document.getElementById('price-filter');
    
    // Filtrar por condição
    let tempProducts = [...currentProducts];
    
    if (conditionFilter.value !== 'all') {
        tempProducts = tempProducts.filter(product => 
            product.condition === conditionFilter.value
        );
    }
    
    // Filtrar por preço
    if (priceFilter.value !== 'all') {
        tempProducts = tempProducts.filter(product => {
            const price = product.price;
            switch(priceFilter.value) {
                case '0-50': return price <= 50;
                case '50-100': return price > 50 && price <= 100;
                case '100-200': return price > 100 && price <= 200;
                case '200+': return price > 200;
                default: return true;
            }
        });
    }
    
    // Ordenar produtos
    switch(sortSelect.value) {
        case 'price-low':
            tempProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            tempProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            // Simulação de ordenação por popularidade
            tempProducts.sort((a, b) => b.id - a.id);
            break;
        case 'recent':
        default:
            // Manter ordenação original (mais recentes primeiro)
            break;
    }
    
    filteredProducts = tempProducts;
    currentPage = 1;
    displayProducts();
}

// Exibir produtos na página
function displayProducts() {
    const productsGrid = document.getElementById('category-products');
    const emptyCategory = document.getElementById('emptyCategory');
    const productsCount = document.getElementById('products-count');
    const pagination = document.getElementById('pagination');
    
    // Atualizar contador de produtos
    productsCount.textContent = filteredProducts.length;
    
    // Verificar se há produtos
    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        emptyCategory.style.display = 'block';
        pagination.style.display = 'none';
        return;
    }
    
    productsGrid.style.display = 'grid';
    emptyCategory.style.display = 'none';
    pagination.style.display = 'flex';
    
    // Calcular produtos para a página atual
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    // Limpar grade de produtos
    productsGrid.innerHTML = '';
    
    // Adicionar produtos à grade
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Configurar botões de favorito
    setupFavoriteButtons();
    
    // Atualizar paginação
    updatePagination();
}

// Criar card de produto
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-id', product.id);
    
    // Verificar se o produto está nos favoritos
    const favorites = getFavorites();
    const isFavorite = favorites.includes(product.id.toString());
    const heartIcon = isFavorite ? 'bi-heart-fill' : 'bi-heart';
    const favoriteClass = isFavorite ? 'active' : '';
    
    productCard.innerHTML = `
        <a href="${product.link}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
        </a>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-condition">${getConditionText(product.condition)}</div>
            <!-- Botão de favorito -->
            <button class="favorite-btn ${favoriteClass}" data-id="${product.id}">
                <i class="bi ${heartIcon}"></i>
            </button>
        </div>
    `;
    
    return productCard;
}

// Obter texto amigável para condição do produto
function getConditionText(condition) {
    switch(condition) {
        case 'new': return 'Novo';
        case 'semi-new': return 'Semi-novo';
        case 'used': return 'Usado';
        default: return '';
    }
}

// Atualizar paginação
function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    
    // Atualizar estado dos botões
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    
    // Atualizar números da paginação
    paginationNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayProducts();
        });
        paginationNumbers.appendChild(pageButton);
    }
    
    // Configurar eventos dos botões
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
        }
    };
    
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
        }
    };
}