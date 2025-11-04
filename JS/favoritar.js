// favoritar.js - Sistema unificado de favoritos
document.addEventListener('DOMContentLoaded', function() {
    initializeFavorites();
    // Se estiver na página de favoritos, carregar os itens
    if (window.location.pathname.includes('favoritos.html')) {
        loadFavoritesPage();
    }
});

function initializeFavorites() {
    // Atualizar ícones com base nos favoritos existentes
    updateAllFavoriteIcons();
    
    // Configurar event delegation para todos os botões de favorito
    document.addEventListener('click', function(e) {
        const favoriteBtn = e.target.closest('.favorite-btn, .favorite-btn-bottom, .remove-favorite');
        if (favoriteBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = favoriteBtn.getAttribute('data-id');
            if (productId) {
                if (favoriteBtn.classList.contains('remove-favorite')) {
                    // Remoção específica da página de favoritos
                    removeFavoriteFromPage(productId);
                } else {
                    // Toggle normal
                    toggleFavorite(productId, favoriteBtn);
                }
            }
        }
    });
}

// Função específica para carregar a página de favoritos
function loadFavoritesPage() {
    const favorites = getFavorites();
    const emptyFavoritesDiv = document.querySelector('.empty-favorites');
    const favoritesGrid = document.querySelector('.favorites-grid');
    
    if (!emptyFavoritesDiv || !favoritesGrid) return;
    
    if (favorites.length === 0) {
        emptyFavoritesDiv.style.display = 'block';
        favoritesGrid.style.display = 'none';
        return;
    }
    
    emptyFavoritesDiv.style.display = 'none';
    favoritesGrid.style.display = 'grid';
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(productId => {
        const productData = getProductDataById(productId);
        if (productData) {
            const favoriteItem = createFavoriteItem(productId, productData);
            favoritesGrid.appendChild(favoriteItem);
        }
    });
}

// Criar item de favorito para a página de favoritos
function createFavoriteItem(productId, productData) {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = 'favorite-item';
    favoriteItem.setAttribute('data-id', productId);
    
    favoriteItem.innerHTML = `
        <div class="favorite-image">
            <a href="${productData.link}">
                <img src="${productData.image}" alt="${productData.name}" loading="lazy">
            </a>
            <button class="favorite-btn active" data-id="${productId}" aria-label="Remover dos favoritos">
                <i class="bi bi-heart-fill"></i>
            </button>
        </div>
        <div class="favorite-info">
            <div class="favorite-name">
                <a href="${productData.link}">${productData.name}</a>
            </div>
            <div class="favorite-price">R$ ${productData.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-category">${productData.category}</div>
            <div class="favorite-actions">
                <a href="${productData.link}" class="btn btn-primary btn-small">
                    <i class="bi bi-eye"></i> Ver Detalhes
                </a>
                <button class="btn btn-danger btn-small remove-favorite" data-id="${productId}">
                    <i class="bi bi-trash"></i> Remover
                </button>
            </div>
        </div>
    `;
    
    return favoriteItem;
}

// Função para obter favoritos do localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Função para salvar favoritos no localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Função para verificar se um produto é favorito
function isFavorite(productId) {
    const favorites = getFavorites();
    return favorites.includes(productId.toString());
}

// Função para adicionar produto aos favoritos
function addToFavorites(productId) {
    const favorites = getFavorites();
    if (!favorites.includes(productId.toString())) {
        favorites.push(productId.toString());
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Função para remover produto dos favoritos
function removeFromFavorites(productId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(productId.toString());
    if (index > -1) {
        favorites.splice(index, 1);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Função principal para alternar favorito
function toggleFavorite(productId, button) {
    const wasFavorite = isFavorite(productId);
    let success;
    
    if (wasFavorite) {
        success = removeFromFavorites(productId);
        if (success) {
            updateFavoriteButtonState(productId, false);
            showFavoriteFeedback(false);
            
            // Se estiver na página de favoritos, remover o item
            if (window.location.pathname.includes('favoritos.html')) {
                removeFavoriteFromPage(productId);
            }
        }
    } else {
        success = addToFavorites(productId);
        if (success) {
            updateFavoriteButtonState(productId, true);
            showFavoriteFeedback(true);
        }
    }
    
    return success;
}

// Função para remover favorito da página de favoritos
function removeFavoriteFromPage(productId) {
    const favoriteItem = document.querySelector(`.favorite-item[data-id="${productId}"]`);
    if (favoriteItem) {
        favoriteItem.remove();
    }
    
    // Verificar se ainda há favoritos
    const favorites = getFavorites();
    const emptyFavoritesDiv = document.querySelector('.empty-favorites');
    const favoritesGrid = document.querySelector('.favorites-grid');
    
    if (favorites.length === 0 && emptyFavoritesDiv && favoritesGrid) {
        emptyFavoritesDiv.style.display = 'block';
        favoritesGrid.style.display = 'none';
    }
}

// Função para atualizar o estado visual de todos os botões de favorito
function updateAllFavoriteIcons() {
    const favorites = getFavorites();
    
    document.querySelectorAll('.favorite-btn, .favorite-btn-bottom').forEach(btn => {
        const productId = btn.getAttribute('data-id');
        if (productId && favorites.includes(productId)) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            }
            
            // Atualizar texto do botão inferior se existir
            if (btn.classList.contains('favorite-btn-bottom')) {
                btn.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
            }
        } else {
            btn.classList.remove('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
            
            // Atualizar texto do botão inferior se existir
            if (btn.classList.contains('favorite-btn-bottom')) {
                btn.innerHTML = '<i class="bi bi-heart"></i> Favoritar';
            }
        }
    });
}

// Função para atualizar o estado visual de um botão específico
function updateFavoriteButtonState(productId, isFavorite) {
    document.querySelectorAll(`[data-id="${productId}"]`).forEach(btn => {
        if (isFavorite) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            }
            
            // Atualizar texto do botão inferior se existir
            if (btn.classList.contains('favorite-btn-bottom')) {
                btn.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
            }
        } else {
            btn.classList.remove('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
            
            // Atualizar texto do botão inferior se existir
            if (btn.classList.contains('favorite-btn-bottom')) {
                btn.innerHTML = '<i class="bi bi-heart"></i> Favoritar';
            }
        }
    });
}

// Função para mostrar feedback visual
function showFavoriteFeedback(isAdded) {
    // Remove feedback anterior se existir
    const existingFeedback = document.querySelector('.favorite-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Cria o elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = `favorite-feedback ${isAdded ? 'added' : 'removed'}`;
    
    // Define o conteúdo do feedback
    feedback.innerHTML = `
        <i class="bi ${isAdded ? 'bi-heart-fill' : 'bi-heart'}"></i>
        ${isAdded ? 'Adicionado aos favoritos' : 'Removido dos favoritos'}
    `;
    
    // Adiciona ao corpo do documento
    document.body.appendChild(feedback);
    
    // Remove após 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Função para obter dados do produto (compatível com outras páginas)
function getProductDataById(productId) {
    const products = {
        '1': { name: 'Camiseta Polo', price: 39.90, category: 'Masculino', image: 'IMG/camiseta-polo.jpg', link: 'produto.html?id=1' },
        '2': { name: 'Liquidificador Philips', price: 89.90, category: 'Casa/Cozinha', image: 'IMG/liquidificador-phill.jpg', link: 'produto.html?id=2' },
        '3': { name: 'Tênis Nike', price: 199.99, category: 'Esportivo', image: 'IMG/tenis-nike.avif', link: 'produto.html?id=3' },
        '4': { name: 'Vestido Floral', price: 65.00, category: 'Feminino', image: 'IMG/vestido-floral.jpg', link: 'produto.html?id=4' },
        '5': { name: 'Calça Jeans Masculina', price: 79.90, category: 'Masculino', image: 'IMG/calca_j.jpg', link: 'produto.html?id=5' },
        '6': { name: 'Tênis Casual', price: 129.90, category: 'Masculino', image: 'IMG/tenis_c.jpg', link: 'produto.html?id=6' },
        '7': { name: 'Relógio Esportivo', price: 89.90, category: 'Masculino', image: 'IMG/relogio_s_n.jpg', link: 'produto.html?id=7' },
        '8': { name: 'Jaqueta de Couro', price: 199.90, category: 'Masculino', image: 'IMG/jaqueta_c_u.jpg', link: 'produto.html?id=8' },
        '9': { name: 'Blusa de Seda', price: 45.00, category: 'Feminino', image: 'IMG/blusa_s_s.jpg', link: 'produto.html?id=9' },
        '10': { name: 'Salto Alto', price: 89.90, category: 'Feminino', image: 'IMG/salto_a_u.jpg', link: 'produto.html?id=10' },
        '11': { name: 'Bolsa de Couro', price: 120.00, category: 'Feminino', image: 'IMG/bolsa_c_s.jpg', link: 'produto.html?id=11' },
        '12': { name: 'Saia Midi', price: 55.00, category: 'Feminino', image: 'IMG/saia_m_n.jpg', link: 'produto.html?id=12' },
        '13': { name: 'Conjunto Infantil', price: 49.90, category: 'Infantil', image: 'IMG/conjunto_i_s.jpg', link: 'produto.html?id=13' },
        '14': { name: 'Tênis Infantil', price: 39.90, category: 'Infantil', image: 'IMG/tenis_i_n.jpg', link: 'produto.html?id=14' },
        '15': { name: 'Carrinho de Brinquedo', price: 25.00, category: 'Infantil', image: 'IMG/carrinho_b_u.jpg', link: 'produto.html?id=15' },
        '16': { name: 'Vestido Infantil', price: 35.00, category: 'Infantil', image: 'IMG/vestido_i_s.jpg', link: 'produto.html?id=16' },
        '17': { name: 'Camiseta Dry Fit', price: 49.90, category: 'Esportivo', image: 'IMG/camiseta_d_f_s.jpg', link: 'produto.html?id=17' },
        '18': { name: 'Shorts de Corrida', price: 35.00, category: 'Esportivo', image: 'IMG/short_c_u.jpg', link: 'produto.html?id=18' },
        '19': { name: 'Garrafa Térmica', price: 29.90, category: 'Esportivo', image: 'IMG/garrafa_t_n.jpg', link: 'produto.html?id=19' },
        '20': { name: 'Panela de Pressão', price: 65.00, category: 'Casa/Cozinha', image: 'IMG/panela_p_u.jpg', link: 'produto.html?id=20' },
        '21': { name: 'Cadeira de Escritório', price: 150.00, category: 'Casa/Cozinha', image: 'IMG/cadeira_e_s.jpg', link: 'produto.html?id=21' },
        '22': { name: 'Jogo de Panelas', price: 120.00, category: 'Casa/Cozinha', image: 'IMG/panela_n.jpg', link: 'produto.html?id=22' }
    };
    
    return products[productId] || null;
}

// Adicionar estilos CSS para o feedback
if (!document.querySelector('#favorite-styles')) {
    const style = document.createElement('style');
    style.id = 'favorite-styles';
    style.textContent = `
        .favorite-feedback {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            color: white;
            font-weight: 500;
        }
        
        .favorite-feedback.added {
            background: #4CAF50;
        }
        
        .favorite-feedback.removed {
            background: #e74c3c;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
        
        .favorite-btn, .favorite-btn-bottom {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .favorite-btn.active, .favorite-btn-bottom.active {
            color: #e74c3c;
        }
        
        .favorite-btn:hover, .favorite-btn-bottom:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}