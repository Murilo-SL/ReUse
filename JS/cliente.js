// JS/cliente.js

// Variáveis globais
let allProducts = [];
let allInstitutions = [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Função auxiliar para mostrar notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
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
    
    // Remover notificação após 3 segundos
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

// Função para obter favoritos do localStorage
function getFavorites() {
    const savedFavorites = localStorage.getItem('userFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

// Função para salvar favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
}

// Função para atualizar contador de favoritos
function updateFavoritesCount() {
    const favorites = getFavorites();
    const favoritesCount = document.querySelector('.favorites-count');
    
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
        // Mostrar/ocultar contador baseado no número de favoritos
        favoritesCount.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
}

// Função para configurar botões de favorito
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

// Função para alternar favorito
function toggleFavorite(productId, button) {
    let favorites = getFavorites();
    
    if (favorites.includes(productId)) {
        // Remover dos favoritos
        favorites = favorites.filter(id => id !== productId);
        button.classList.remove('active');
        button.innerHTML = '<i class="bi bi-heart"></i>';
        showNotification('Produto removido dos favoritos', 'info');
    } else {
        // Adicionar aos favoritos
        favorites.push(productId);
        button.classList.add('active');
        button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        showNotification('Produto adicionado aos favoritos');
    }
    
    // Salvar no localStorage
    saveFavorites(favorites);
    
    // Atualizar contador de favoritos
    updateFavoritesCount();
}

// Função para configurar dados de pesquisa
function setupSearchData() {
    allProducts = [
        { 
            id: 1,
            name: 'Camiseta Polo', 
            category: 'Masculino',
            price: 'R$ 39,90',
            dateAdded: new Date('2025-01-15')
        },
        { 
            id: 2,
            name: 'Liquidificador Philips', 
            category: 'Casa/Cozinha',
            price: 'R$ 89,90',
            dateAdded: new Date('2025-02-20')
        },
        { 
            id: 3,
            name: 'Tênis Nike', 
            category: 'Esportivo',
            price: 'R$ 199,99',
            dateAdded: new Date('2025-03-10')
        },
        { 
            id: 4,
            name: 'Vestido Floral', 
            category: 'Feminino',
            price: 'R$ 65,00',
            dateAdded: new Date('2025-04-05')
        }
    ];

    allInstitutions = [
        {
            id: 1,
            name: 'Patas Conscientes',
            category: 'Resgate Animal',
            description: 'Aceita doações de itens pet'
        },
        {
            id: 2,
            name: 'Centro Educacional Novo Amanhã',
            category: 'Educação',
            description: 'Aceita doações de livros'
        },
        {
            id: 3,
            name: 'Lar dos Idosos São Vicente',
            category: 'Assistência ao Idoso',
            description: 'Aceita doações de móveis'
        },
        {
            id: 4,
            name: 'SOS Felino',
            category: 'Resgate Animal',
            description: 'Aceita doações de itens pet'
        }
    ];
}

// Função para aplicar filtros (simplificada)
function applyFilters(searchTerm, filterValue) {
    let matchedProducts = [...allProducts];
    let matchedInstitutions = [...allInstitutions];

    // Aplicar termo de pesquisa se existir
    if (searchTerm && searchTerm.length > 0) {
        const term = searchTerm.toLowerCase();
        matchedProducts = matchedProducts.filter(item => 
            item.name.toLowerCase().includes(term) || 
            item.category.toLowerCase().includes(term)
        );
        
        matchedInstitutions = matchedInstitutions.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term)
        );
    }

    return { matchedProducts, matchedInstitutions };
}

// Função para configurar a barra de pesquisa
function setupSearchBar() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Criar elemento de sugestões se não existir
    const searchContainer = document.querySelector('.search-input');
    if (searchContainer && !document.getElementById('searchSuggestions')) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'searchSuggestions';
        suggestionsDiv.className = 'search-suggestions-container';
        suggestionsDiv.style.display = 'none';
        searchContainer.appendChild(suggestionsDiv);
    }

    // Evento de input na barra de pesquisa
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            if (searchTerm.length === 0) {
                const suggestions = document.getElementById('searchSuggestions');
                if (suggestions) {
                    suggestions.style.display = 'none';
                }
                return;
            }

            const { matchedProducts, matchedInstitutions } = applyFilters(searchTerm, '');
            displaySuggestions(matchedProducts, matchedInstitutions, searchTerm);
        });

        // Fechar sugestões quando clicar fora
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                const suggestions = document.getElementById('searchSuggestions');
                if (suggestions) {
                    suggestions.style.display = 'none';
                }
            }
        });
    }

    // Função para exibir sugestões
    function displaySuggestions(products, institutions, searchTerm) {
        const searchSuggestions = document.getElementById('searchSuggestions');
        if (!searchSuggestions) return;
        
        if (products.length === 0 && institutions.length === 0) {
            searchSuggestions.style.display = 'none';
            return;
        }

        searchSuggestions.innerHTML = '';
        
        if (products.length > 0) {
            const productsHeader = document.createElement('div');
            productsHeader.className = 'search-suggestion-header';
            productsHeader.textContent = 'Produtos';
            searchSuggestions.appendChild(productsHeader);

            products.slice(0, 5).forEach(product => {
                const suggestion = createSuggestionElement(product.name, product.category, 'product', product.id);
                searchSuggestions.appendChild(suggestion);
            });
        }

        if (institutions.length > 0) {
            const institutionsHeader = document.createElement('div');
            institutionsHeader.className = 'search-suggestion-header';
            institutionsHeader.textContent = 'Instituições';
            searchSuggestions.appendChild(institutionsHeader);

            institutions.slice(0, 3).forEach(institution => {
                const suggestion = createSuggestionElement(institution.name, institution.category, 'institution', institution.id);
                searchSuggestions.appendChild(suggestion);
            });
        }

        searchSuggestions.style.display = 'block';
    }

    function createSuggestionElement(name, category, type, id) {
        const suggestion = document.createElement('div');
        suggestion.className = 'search-suggestion';
        suggestion.dataset.type = type;
        suggestion.dataset.id = id;
        
        const nameElement = document.createElement('div');
        nameElement.textContent = name;
        nameElement.style.fontWeight = '500';
        
        const categoryElement = document.createElement('div');
        categoryElement.textContent = category;
        categoryElement.style.fontSize = '12px';
        categoryElement.style.color = '#666';
        
        suggestion.appendChild(nameElement);
        suggestion.appendChild(categoryElement);
        
        suggestion.addEventListener('mousedown', function(e) {
            e.preventDefault();
            if (searchInput) {
                searchInput.value = name;
            }
            const suggestions = document.getElementById('searchSuggestions');
            if (suggestions) {
                suggestions.style.display = 'none';
            }
            redirectToItem(type, id);
        });
        
        return suggestion;
    }

    // Função para redirecionar
    function redirectToItem(type, id) {
        if (type === 'product') {
            window.location.href = 'produto.html?id=' + id;
        } else if (type === 'institution') {
            // Redirecionar para página da instituição
            window.location.href = 'pagina_ong_usuario.html?id=' + id;
        }
    }

    // Configurar eventos de pesquisa
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchInput) {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    const { matchedProducts, matchedInstitutions } = applyFilters(searchTerm, '');
                    if (matchedProducts.length > 0) {
                        redirectToItem('product', matchedProducts[0].id);
                    } else if (matchedInstitutions.length > 0) {
                        redirectToItem('institution', matchedInstitutions[0].id);
                    } else {
                        showNotification('Nenhum resultado encontrado.', 'info');
                    }
                }
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (searchButton) {
                    searchButton.click();
                }
            }
        });
    }
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        // Mostrar/ocultar contador baseado no número de itens
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }
}

// Função para adicionar produto ao carrinho
function addToCart(productId, productName, productPrice, productImage) {
    // Verificar se o produto já está no carrinho
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    // Salvar no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Atualizar contador
    updateCartCount();
    
    // Mostrar notificação
    showNotification('Produto adicionado ao carrinho!');
}

// Função para configurar botões de adicionar ao carrinho
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = this.getAttribute('data-id');
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name')?.textContent || 'Produto';
            const productPrice = productCard.querySelector('.product-price')?.textContent || '0';
            const productImage = productCard.querySelector('img')?.src || '';
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
}

// Função para configurar redirecionamento para cards de produtos
function setupProductCardRedirects() {
    document.querySelectorAll('.product-card').forEach(card => {
        // Evitar redirecionamento quando clicar em botões específicos
        card.addEventListener('click', function(e) {
            if (e.target.closest('a') || 
                e.target.closest('.favorite-btn') || 
                e.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            const productId = this.getAttribute('data-id');
            if (productId) {
                window.location.href = 'produto.html?id=' + productId;
            }
        });
    });
}

// Função para configurar ações principais (COMPRAR, VENDER, DOAR)
function setupMainActions() {
    // Botão COMPRAR - redireciona para categorias
    const buyButton = document.querySelector('.action-button.buy');
    if (buyButton) {
        buyButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Rolagem suave para a seção de produtos
            const productsSection = document.querySelector('.section-title');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Botão VENDER - já está com link para login.html
    // Botão DOAR - já está com modal configurado
}

// Função para inicializar todos os componentes
function initializePage() {
    setupSearchData();
    setupFavoriteButtons();
    setupSearchBar();
    setupAddToCartButtons();
    setupProductCardRedirects();
    setupMainActions();
    updateCartCount();
    updateFavoritesCount();
    
    // Configurar estado inicial dos favoritos
    initializeFavoritesState();
}

// Função para inicializar estado dos favoritos
function initializeFavoritesState() {
    const favorites = getFavorites();
    
    // Atualizar todos os botões de favorito na página
    document.querySelectorAll('.favorite-btn').forEach(button => {
        const productId = button.getAttribute('data-id');
        if (favorites.includes(productId)) {
            button.classList.add('active');
            button.innerHTML = '<i class="bi bi-heart-fill"></i>';
        } else {
            button.classList.remove('active');
            button.innerHTML = '<i class="bi bi-heart"></i>';
        }
    });
}

// Event Listeners para funcionalidades globais
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    // Configurar eventos de teclado para acessibilidade
    document.addEventListener('keydown', function(e) {
        // Fechar sugestões de pesquisa com ESC
        if (e.key === 'Escape') {
            const suggestions = document.getElementById('searchSuggestions');
            if (suggestions) {
                suggestions.style.display = 'none';
            }
        }
    });
});

// Exportar funções para uso em outros arquivos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getFavorites,
        saveFavorites,
        updateFavoritesCount,
        toggleFavorite,
        addToCart,
        updateCartCount,
        showNotification
    };
}