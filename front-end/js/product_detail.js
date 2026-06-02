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
    },
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

// Dados dos vendedores
const sellers = {
    1: { // Vendedor do produto 1 (Tênis Nike)
        name: "Loja Esportiva XYZ",
        rating: 4.8,
        totalSales: 152,
        joined: "2023",
        response_rate: "98%",
        description: "Especializada em artigos esportivos novos e seminovos. Qualidade e confiança desde 2023.",
        location: "São Paulo, SP",
        products_count: 15
    },
    2: { // Vendedor do produto 2 (Vestido Floral)
        name: "Moda Feminina",
        rating: 4.7,
        totalSales: 89,
        joined: "2024",
        response_rate: "95%",
        description: "Moda feminina sustentável. Roupas seminovas em ótimo estado para todos os estilos.",
        location: "Rio de Janeiro, RJ",
        products_count: 23
    },
    3: { // Vendedor do produto 3 (Liquidificador)
        name: "EletroHouse",
        rating: 4.9,
        totalSales: 234,
        joined: "2022",
        response_rate: "99%",
        description: "Eletrodomésticos e eletrônicos revisados com garantia. Os melhores preços da categoria.",
        location: "Belo Horizonte, MG",
        products_count: 42
    },
    4: { // Vendedor do produto 4 (Camiseta Polo)
        name: "Street Wear",
        rating: 4.6,
        totalSales: 67,
        joined: "2024",
        response_rate: "92%",
        description: "Streetwear e moda casual. Roupas autênticas para o dia a dia.",
        location: "Curitiba, PR",
        products_count: 18
    },
    5: { // Vendedor do produto 5 (Bolsa)
        name: "Acessórios & Cia",
        rating: 4.8,
        totalSales: 112,
        joined: "2023",
        response_rate: "97%",
        description: "Bolsas, mochilas e acessórios de qualidade. Produtos revisados e prontos para uso.",
        location: "Porto Alegre, RS",
        products_count: 31
    },
    6: { // Vendedor do produto 6 (Relógio)
        name: "Tech Sports",
        rating: 4.5,
        totalSales: 45,
        joined: "2024",
        response_rate: "90%",
        description: "Tecnologia e esporte. Relógios e acessórios esportivos com garantia.",
        location: "Brasília, DF",
        products_count: 12
    },
    7: { // Vendedor do produto 7 (Fone)
        name: "Digital Store",
        rating: 4.7,
        totalSales: 178,
        joined: "2022",
        response_rate: "96%",
        description: "Eletrônicos e gadgets. Produtos revisados e testados por especialistas.",
        location: "Salvador, BA",
        products_count: 27
    },
    8: { // Vendedor do produto 8 (Caneca)
        name: "Casa & Presentes",
        rating: 4.9,
        totalSales: 67,
        joined: "2023",
        response_rate: "100%",
        description: "Artigos para casa e presentes exclusivos. Peças únicas e personalizadas.",
        location: "Fortaleza, CE",
        products_count: 34
    }
};

// Tornar disponível globalmente para outras páginas/scripts
window.products = products;
window.sellers = sellers;

// Carrinho global
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Favoritos global
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
    
    // Carregar informações do vendedor
    loadSellerInfo(productId);
    
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

// Carregar informações do vendedor
function loadSellerInfo(productId) {
    const seller = sellers[productId] || {
        name: "Vendedor ReUse",
        rating: 4.5,
        totalSales: 50,
        joined: "2024",
        response_rate: "95%",
        description: "Vendedor parceiro da plataforma ReUse. Produtos de qualidade e atendimento garantido.",
        location: "Brasil",
        products_count: 10
    };
    
    const sellerNameLink = document.getElementById('sellerNameLink');
    if (sellerNameLink) {
        sellerNameLink.textContent = seller.name;
        // Passar todos os dados do vendedor na URL
        const sellerData = encodeURIComponent(JSON.stringify({
            name: seller.name,
            rating: seller.rating,
            totalSales: seller.totalSales,
            joined: seller.joined,
            description: seller.description,
            location: seller.location,
            products_count: seller.products_count
        }));
        sellerNameLink.href = `perfil-vendedor.html?productId=${productId}&sellerData=${sellerData}`;
    }
    
    const sellerRating = document.getElementById('sellerRating');
    if (sellerRating) {
        sellerRating.textContent = seller.rating;
    }
    
    const sellerSales = document.getElementById('sellerSales');
    if (sellerSales) {
        sellerSales.textContent = `(${seller.totalSales} vendas)`;
    }
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
        const seller = sellers[product.id] || { name: "Vendedor ReUse" };
        
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
                <div class="product-seller-small">
                    <i class="bi bi-shop"></i>
                    <span>${seller.name}</span>
                </div>
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
    
    // Remover event listeners antigos (se houver)
    const newAddToCartBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
    
    const newAddToFavoritesBtn = addToFavoritesBtn.cloneNode(true);
    addToFavoritesBtn.parentNode.replaceChild(newAddToFavoritesBtn, addToFavoritesBtn);
    
    // Adicionar ao carrinho
    newAddToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(product, quantity);
        
        // Feedback visual
        const originalText = newAddToCartBtn.innerHTML;
        newAddToCartBtn.innerHTML = '<i class="bi bi-check-lg"></i> Adicionado!';
        newAddToCartBtn.style.background = '#28a745';
        newAddToCartBtn.style.borderColor = '#28a745';
        
        setTimeout(() => {
            newAddToCartBtn.innerHTML = originalText;
            newAddToCartBtn.style.background = '';
            newAddToCartBtn.style.borderColor = '';
        }, 2000);
    });
    
    // Adicionar aos favoritos
    newAddToFavoritesBtn.addEventListener('click', () => {
        toggleFavorite(product);
        
        // Atualizar ícone e texto
        if (isFavorite(product.id)) {
            newAddToFavoritesBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
            newAddToFavoritesBtn.classList.add('active');
        } else {
            newAddToFavoritesBtn.innerHTML = '<i class="bi bi-heart"></i> Favoritar';
            newAddToFavoritesBtn.classList.remove('active');
        }
    });
    
    // Verificar se produto já está favoritado
    if (isFavorite(product.id)) {
        newAddToFavoritesBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Favoritado';
        newAddToFavoritesBtn.classList.add('active');
    }
    
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
    
    // Validar entrada manual
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
        }
    });
}

// Funções do carrinho
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, 10);
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: quantity,
            seller: sellers[product.id]?.name || "Vendedor ReUse"
        });
    }
    
    // Salvar no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Atualizar contador do carrinho se a função existir
    if (window.cartMenu && typeof window.cartMenu.updateCount === 'function') {
        window.cartMenu.updateCount();
    }
    
    console.log(`Adicionado ao carrinho: ${product.title}, Quantidade: ${quantity}`);
}

// Funções de favoritos
function toggleFavorite(product) {
    const index = favorites.findIndex(item => item.id === product.id);
    
    if (index === -1) {
        favorites.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            seller: sellers[product.id]?.name || "Vendedor ReUse"
        });
    } else {
        favorites.splice(index, 1);
    }
    
    // Salvar no localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Atualizar menu de favoritos se existir
    if (window.favoritesMenu && typeof window.favoritesMenu.updateFavorites === 'function') {
        window.favoritesMenu.updateFavorites();
    }
    
    console.log(`Favoritos atualizados: ${favorites.length} itens`);
}

function isFavorite(productId) {
    return favorites.some(item => item.id === productId);
}

// Funções auxiliares
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    
    // Verificar se o elemento do vendedor existe no HTML
    const sellerSection = document.querySelector('.seller-info-card');
    if (!sellerSection) {
        console.warn('Elemento .seller-info-card não encontrado. Verifique se o HTML foi atualizado.');
    }
});

// Exportar funções para uso global
window.addToCart = addToCart;
window.toggleFavorite = toggleFavorite;
window.isFavorite = isFavorite;
window.formatCurrency = formatCurrency;