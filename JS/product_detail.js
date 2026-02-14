// Dados dos produtos
const products = {
    1: {
        id: 1,
        title: "Tênis Nike Air Max",
        description: "Tênis esportivo em ótimo estado, tamanho 42. Conforto excepcional com tecnologia Air Max. Ideal para atividades físicas e uso casual.",
        price: 199.90,
        images: [
            "img/tenis-nike.avif",
            "img/tenis-nike-2.jpg",
            "img/tenis-nike-3.jpg"
        ],
        category: "Calçados Esportivos",
        condition: "Semi-novo",
        brand: "Nike",
        size: "42",
        color: "Branco/Vermelho",
        material: "Couro sintético e malha",
        rating: 4.5,
        reviews: 128
    },
    2: {
        id: 2,
        title: "Vestido Floral",
        description: "Vestido floral estampado, tamanho M. Tecido leve e confortável, perfeito para verão e ocasiões especiais.",
        price: 89.90,
        images: [
            "img/vestido-floral.jpg",
            "img/vestido-floral-2.jpg",
            "img/vestido-floral-3.jpg"
        ],
        category: "Vestidos",
        condition: "Novo com etiqueta",
        brand: "Marca A",
        size: "M",
        color: "Floral multicolor",
        material: "Viscose",
        rating: 4.2,
        reviews: 56
    },
    3: {
        id: 3,
        title: "Liquidificador",
        description: "Liquidificador 6 velocidades, pouco uso. Potente e eficiente para diversas receitas na cozinha.",
        price: 129.90,
        images: [
            "img/liquidificador-phill.jpg",
            "img/liquidificador-2.jpg",
            "img/liquidificador-3.jpg"
        ],
        category: "Eletrodomésticos",
        condition: "Pouco usado",
        brand: "Philips",
        power: "500W",
        capacity: "2L",
        color: "Vermelho",
        rating: 4.7,
        reviews: 89
    },
    4: {
        id: 4,
        title: "Camiseta Polo",
        description: "Camiseta polo azul marinho, tamanho G. Tecido de alta qualidade, durável e confortável para uso diário.",
        price: 59.90,
        images: [
            "img/camiseta-polo.jpg",
            "img/camiseta-polo-2.jpg",
            "img/camiseta-polo-3.jpg"
        ],
        category: "Camisetas",
        condition: "Novo",
        brand: "Marca B",
        size: "G",
        color: "Azul Marinho",
        material: "Algodão penteado",
        rating: 4.0,
        reviews: 42
    }
    ,
    5: {
        id: 5,
        title: "Bolsa de couro",
        description: "Bolsa tote em lona resistente, ideal para uso diário e compras. Alças reforçadas e amplo espaço interno.",
        price: 79.90,
        images: [
            "img/bolsa_c_s.jpg"
        ],
        category: "Acessórios",
        condition: "Novo",
        brand: "Marca C",
        color: "Bege",
        material: "Lona",
        rating: 4.3,
        reviews: 21
    },
    6: {
        id: 6,
        title: "Relógio Esportivo",
        description: "Relógio com monitor de batimentos e cronômetro. Resistente à água e com pulseira ajustável.",
        price: 149.90,
        images: [
            "img/relogio_s_n.jpg"
        ],
        category: "Acessórios",
        condition: "Semi-novo",
        brand: "Marca D",
        color: "Preto",
        material: "Borracha",
        rating: 4.1,
        reviews: 34
    },
    7: {
        id: 7,
        title: "Fone de Ouvido Bluetooth",
        description: "Fone sem fio com cancelamento passivo de ruído, até 8 horas de bateria e carregamento rápido.",
        price: 129.90,
        images: [
            "img/fones-bluetooh.jpg"
        ],
        category: "Eletrônicos",
        condition: "Novo",
        brand: "Marca E",
        color: "Branco",
        rating: 4.6,
        reviews: 58
    },
    8: {
        id: 8,
        title: "Caneca Estampada",
        description: "Caneca cerâmica 300ml com estampa exclusiva. Perfeita para presentes e uso diário.",
        price: 29.90,
        images: [
            "img/caneca-estampa.jpg"
        ],
        category: "Casa",
        condition: "Novo",
        brand: "Marca F",
        color: "Branco",
        material: "Cerâmica",
        rating: 4.0,
        reviews: 12
    }
};

// Tornar disponível globalmente para outras páginas/scripts
window.products = products;

// Carregar produto baseado no ID da URL
function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';
    const product = products[productId];
    
    if (!product) {
        // Redirecionar para página inicial se produto não existe
        window.location.href = 'cliente-inicio.html';
        return;
    }
    
    // Atualizar informações do produto
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productTitleBreadcrumb').textContent = product.title;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = formatCurrency(product.price);
    document.getElementById('productInstallment').textContent = `Em até 10x de ${formatCurrency(product.price / 10)} sem juros`;
    
    // Carregar imagens
    const mainImage = document.getElementById('productMainImage');
    mainImage.src = product.images[0];
    mainImage.alt = product.title;
    
    // Criar miniaturas
    const thumbnailsContainer = document.getElementById('imageThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${product.title} - Imagem ${index + 1}">`;
        
        thumbnail.addEventListener('click', () => {
            // Atualizar imagem principal
            mainImage.src = image;
            
            // Atualizar miniaturas ativas
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Adicionar especificações
    const specsContainer = document.getElementById('productSpecs');
    specsContainer.innerHTML = '';
    
    const specs = {
        'Categoria': product.category,
        'Condição': product.condition,
        'Marca': product.brand,
        'Tamanho': product.size,
        'Cor': product.color,
        'Material': product.material,
        'Potência': product.power,
        'Capacidade': product.capacity
    };
    
    Object.entries(specs).forEach(([label, value]) => {
        if (value) {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${label}:</span>
                <span class="spec-value">${value}</span>
            `;
            specsContainer.appendChild(specItem);
        }
    });
    
    // Carregar produtos relacionados
    loadRelatedProducts(productId);
    
    // Configurar botões de ação
    setupActionButtons(product);
}

// Carregar produtos relacionados
function loadRelatedProducts(currentProductId) {
    const relatedProductsContainer = document.getElementById('relatedProducts');
    relatedProductsContainer.innerHTML = '';
    
    // Filtrar produtos excluindo o atual
    const relatedProducts = Object.values(products)
        .filter(product => product.id != currentProductId)
        .slice(0, 4);
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}">
                <div class="product-badge">Relacionado</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description.substring(0, 60)}...</p>
                <div class="product-price">${formatCurrency(product.price)}</div>
                <div class="product-actions">
                    <a href="produto.html?id=${product.id}" class="btn btn-primary">
                        <i class="bi bi-eye"></i>
                        Ver Detalhes
                    </a>
                </div>
            </div>
        `;
        relatedProductsContainer.appendChild(productCard);
    });
}

// Configurar botões de ação
function setupActionButtons(product) {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    const increaseBtn = document.getElementById('increaseQuantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const quantityInput = document.getElementById('productQuantity');
    
    // Adicionar ao carrinho
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product.id, quantity);
        
        // Feedback visual
        const originalText = addToCartBtn.innerHTML;
        addToCartBtn.innerHTML = '<i class="bi bi-check-lg"></i> Adicionado!';
        addToCartBtn.classList.add('btn-success');
        
        setTimeout(() => {
            addToCartBtn.innerHTML = originalText;
            addToCartBtn.classList.remove('btn-success');
        }, 2000);
    });
    
    // Adicionar aos favoritos
    addToFavoritesBtn.addEventListener('click', () => {
        toggleFavorite(product.id);
        
        // Feedback visual
        if (addToFavoritesBtn.classList.contains('active')) {
            addToFavoritesBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
        } else {
            addToFavoritesBtn.innerHTML = '<i class="bi bi-heart"></i> Favoritar';
        }
    });
    
    // Verificar se produto já está favoritado
    updateFavoriteButton(product.id);
    
    // Controle de quantidade
    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
}

// Funções auxiliares
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function addToCart(productId, quantity = 1) {
    // Implementar lógica de carrinho
    console.log(`Adicionado ao carrinho: Produto ${productId}, Quantidade: ${quantity}`);
}

function toggleFavorite(productId) {
    // Implementar lógica de favoritos
    const button = document.getElementById('addToFavoritesBtn');
    button.classList.toggle('active');
    console.log(`Favorito alterado: Produto ${productId}`);
}

function updateFavoriteButton(productId) {
    // Verificar se produto está nos favoritos
    const button = document.getElementById('addToFavoritesBtn');
    // Aqui você implementaria a verificação real
    const isFavorite = false; // Placeholder
    if (isFavorite) {
        button.classList.add('active');
        button.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
});