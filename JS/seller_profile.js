// seller_profile.js
// Script para a página de perfil do vendedor (visualização do cliente)

document.addEventListener('DOMContentLoaded', function() {
    loadSellerProfile();
    setupTabs();
    setupFollowButton();
    setupContactButton();
});

// Carregar dados do vendedor baseado no parâmetro da URL
function loadSellerProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const sellerDataParam = urlParams.get('sellerData');
    
    let sellerData;
    
    if (sellerDataParam) {
        // Se veio dados do vendedor do produto
        try {
            sellerData = JSON.parse(decodeURIComponent(sellerDataParam));
        } catch (e) {
            console.error('Erro ao parsear dados do vendedor:', e);
            sellerData = getDefaultSellerData();
        }
    } else if (productId && window.sellers && window.sellers[productId]) {
        // Se veio apenas o productId, buscar do objeto sellers
        sellerData = window.sellers[productId];
    } else {
        // Dados padrão para demonstração
        sellerData = getDefaultSellerData();
    }
    
    updateSellerUI(sellerData);
    loadSellerProducts(productId);
    loadSellerReviews(sellerData);
}

// Dados padrão para demonstração
function getDefaultSellerData() {
    return {
        name: "Loja Esportiva XYZ",
        rating: 4.8,
        totalSales: 152,
        joined: "2023",
        description: "Loja especializada em artigos esportivos novos e seminovos. Todos os produtos passam por rigorosa inspeção de qualidade antes de serem anunciados. Nosso compromisso é oferecer produtos de qualidade com preços justos e atendimento excepcional.",
        location: "São Paulo, SP",
        products_count: 15,
        verified: true,
        premium: false,
        achievements: [
            { icon: "bi-shield-check", text: "Identidade verificada" },
            { icon: "bi-truck", text: "Entrega rápida" },
            { icon: "bi-chat-heart", text: "Ótimo atendimento" },
            { icon: "bi-award", text: "Top vendedor 2024" }
        ]
    };
}

// Atualizar interface com dados do vendedor
function updateSellerUI(seller) {
    // Atualizar título da página
    document.title = `${seller.name} | Perfil do Vendedor | ReUse`;
    
    // Breadcrumb
    document.getElementById('sellerNameBreadcrumb').textContent = seller.name;
    
    // Nome do vendedor
    document.getElementById('sellerName').textContent = seller.name;
    
    // Localização
    const locationEl = document.getElementById('sellerLocation');
    if (locationEl) {
        locationEl.querySelector('span').textContent = seller.location || 'Brasil';
    }
    
    // Membro desde
    const sinceEl = document.getElementById('sellerSince');
    if (sinceEl) {
        sinceEl.innerHTML = `<i class="bi bi-calendar-check"></i> Membro desde ${seller.joined || '2024'}`;
    }
    
    // Avaliação
    document.getElementById('sellerRating').textContent = seller.rating || '4.5';
    
    // Total de vendas
    document.getElementById('sellerTotalSales').textContent = seller.totalSales || '0';
    
    // Quantidade de produtos
    document.getElementById('sellerProductsCount').textContent = seller.products_count || '0';
    
    // Descrição
    document.getElementById('sellerDescription').textContent = seller.description || 'Este vendedor ainda não adicionou uma descrição.';
    
    // Selos e conquistas
    if (seller.achievements) {
        const achievementsGrid = document.getElementById('sellerAchievements');
        achievementsGrid.innerHTML = '';
        
        seller.achievements.forEach(achievement => {
            const item = document.createElement('div');
            item.className = 'achievement-item';
            item.innerHTML = `
                <i class="bi ${achievement.icon}"></i>
                <span>${achievement.text}</span>
            `;
            achievementsGrid.appendChild(item);
        });
    }
    
    // Badge premium (se aplicável)
    if (seller.premium) {
        document.getElementById('premiumBadge').style.display = 'inline-flex';
    }
    
    // Informações da loja (aba informações)
    const shopName = document.getElementById('shopName');
    if (shopName) shopName.textContent = seller.name;
    
    const shopLocation = document.getElementById('shopLocation');
    if (shopLocation) shopLocation.textContent = seller.location || 'Brasil';
    
    // Estrelas de avaliação
    updateRatingStars(seller.rating || 4.5);
    
    // Total de avaliações
    document.getElementById('totalReviews').textContent = `(${seller.totalSales || 0} avaliações)`;
}

// Atualizar estrelas de avaliação
function updateRatingStars(rating) {
    const starsContainer = document.getElementById('averageStars');
    if (!starsContainer) return;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    starsContainer.innerHTML = '';
    
    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
        starsContainer.innerHTML += '<i class="bi bi-star-fill"></i>';
    }
    
    // Meia estrela
    if (hasHalfStar) {
        starsContainer.innerHTML += '<i class="bi bi-star-half"></i>';
    }
    
    // Estrelas vazias
    for (let i = 0; i < emptyStars; i++) {
        starsContainer.innerHTML += '<i class="bi bi-star"></i>';
    }
}

// Carregar produtos do vendedor
function loadSellerProducts(productId) {
    const productsGrid = document.getElementById('sellerProducts');
    
    if (!productsGrid) return;
    
    // Se não temos produtos do vendedor, mostrar mensagem
    if (!window.products) {
        productsGrid.innerHTML = '<div class="empty-state">Nenhum produto encontrado</div>';
        return;
    }
    
    // Filtrar produtos do vendedor (se tivesse um campo sellerId nos produtos)
    // Como não temos, vamos mostrar produtos relacionados ao produto atual ou todos
    let sellerProducts = [];
    
    if (productId && window.products[productId]) {
        // Produtos da mesma categoria
        const currentProduct = window.products[productId];
        sellerProducts = Object.values(window.products)
            .filter(p => p.category === currentProduct.category)
            .slice(0, 8);
    } else {
        // Se não tem produto específico, mostrar alguns produtos
        sellerProducts = Object.values(window.products).slice(0, 8);
    }
    
    if (sellerProducts.length === 0) {
        productsGrid.innerHTML = '<div class="empty-state">Nenhum produto disponível no momento</div>';
        return;
    }
    
    productsGrid.innerHTML = '';
    
    sellerProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                <div class="product-badge">${product.condition || 'Semi-novo'}</div>
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
                    <button class="btn btn-outline add-to-cart-small" data-product-id="${product.id}">
                        <i class="bi bi-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Adicionar eventos aos botões de carrinho
    document.querySelectorAll('.add-to-cart-small').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const product = window.products[productId];
            if (product && window.addToCart) {
                window.addToCart(product, 1);
                
                // Feedback visual
                const originalHtml = this.innerHTML;
                this.innerHTML = '<i class="bi bi-check-lg"></i>';
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    this.innerHTML = originalHtml;
                    this.classList.remove('btn-success');
                }, 1500);
            }
        });
    });
}

// Carregar avaliações do vendedor
function loadSellerReviews(seller) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    // Simular algumas avaliações
    const mockReviews = [
        {
            user: "Maria Silva",
            rating: 5,
            date: "15/03/2025",
            comment: "Produto excelente, entrega super rápida! O vendedor foi muito atencioso.",
            product: "Tênis Nike Air Max"
        },
        {
            user: "João Santos",
            rating: 4,
            date: "10/03/2025",
            comment: "Tudo conforme anunciado. Recomendo!",
            product: "Camiseta Polo"
        },
        {
            user: "Ana Oliveira",
            rating: 5,
            date: "05/03/2025",
            comment: "Ótima comunicação, produto bem embalado. Voltarei a comprar!",
            product: "Bolsa de couro"
        },
        {
            user: "Carlos Lima",
            rating: 4,
            date: "28/02/2025",
            comment: "Bom produto, entrega dentro do prazo.",
            product: "Relógio Esportivo"
        }
    ];
    
    reviewsList.innerHTML = '';
    
    mockReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        <i class="bi bi-person-circle"></i>
                    </div>
                    <div>
                        <strong>${review.user}</strong>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${getStarRating(review.rating)}
                </div>
            </div>
            <div class="review-product">
                <small>Produto: ${review.product}</small>
            </div>
            <p class="review-comment">"${review.comment}"</p>
        `;
        reviewsList.appendChild(reviewCard);
    });
}

// Função auxiliar para estrelas de avaliação
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

// Configurar abas de navegação
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos os botões e panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Adicionar active no botão clicado
            this.classList.add('active');
            
            // Mostrar a aba correspondente
            const tabId = this.dataset.tab;
            document.getElementById(tabId + 'Tab').classList.add('active');
        });
    });
}

// Configurar botão de seguir
function setupFollowButton() {
    const followBtn = document.getElementById('followSellerBtn');
    if (!followBtn) return;
    
    followBtn.addEventListener('click', function() {
        const isFollowing = this.classList.contains('following');
        
        if (isFollowing) {
            // Deixar de seguir
            this.innerHTML = '<i class="bi bi-person-plus"></i> Seguir Vendedor';
            this.classList.remove('following', 'btn-success');
            this.classList.add('btn-primary');
        } else {
            // Seguir
            this.innerHTML = '<i class="bi bi-person-check"></i> Seguindo';
            this.classList.add('following', 'btn-success');
            this.classList.remove('btn-primary');
            
            // Feedback visual
            showNotification('Agora você está seguindo este vendedor!', 'success');
        }
    });
}

// Configurar botão de contato
function setupContactButton() {
    const contactBtn = document.getElementById('contactSellerBtn');
    if (!contactBtn) return;
    
    contactBtn.addEventListener('click', function() {
        const sellerName = document.getElementById('sellerName').textContent;
        
        // Aqui você pode abrir um modal de contato ou redirecionar para o chat
        if (confirm(`Deseja iniciar uma conversa com ${sellerName}?`)) {
            // Redirecionar para página de mensagens
            // window.location.href = 'mensagens.html?vendedor=' + encodeURIComponent(sellerName);
            showNotification('Funcionalidade de chat será implementada em breve!', 'info');
        }
    });
}

// Função para formatar moeda
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Verificar se já existe uma notificação
    let notification = document.querySelector('.notification-toast');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification-toast';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.className = `notification-toast ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}