document.addEventListener('DOMContentLoaded', function () {
    // Carrega os favoritos do localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Elementos da página
    const emptyFavoritesDiv = document.querySelector('.empty-favorites');
    const favoritesGrid = document.querySelector('.favorites-grid');
    
    // Verifica se há favoritos
    if (favorites.length > 0) {
        // Esconde a mensagem de lista vazia
        if (emptyFavoritesDiv) emptyFavoritesDiv.style.display = 'none';
        
        // Mostra o grid de favoritos
        if (favoritesGrid) {
            favoritesGrid.style.display = 'grid';
            favoritesGrid.innerHTML = ''; // Limpa o grid existente
        }
        
        // Adiciona cada favorito ao grid
        favorites.forEach(productId => {
            const favoriteItem = createFavoriteItem(productId);
            if (favoriteItem && favoritesGrid) {
                favoritesGrid.appendChild(favoriteItem);
            }
        });
    } else {
        // Mostra a mensagem de lista vazia
        if (emptyFavoritesDiv) emptyFavoritesDiv.style.display = 'block';
        if (favoritesGrid) favoritesGrid.style.display = 'none';
    }
    
    // Função para criar um item de favorito
    function createFavoriteItem(productId) {
        // Obtém os dados do produto pelo ID
        const productData = getProductDataById(productId);
        
        if (!productData) {
            console.error('Produto não encontrado para ID:', productId);
            return null;
        }
        
        // Cria o elemento do item de favorito
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.dataset.id = productId;
        
        // HTML do item de favorito
        favoriteItem.innerHTML = `
            <div class="favorite-image">
                <img src="${productData.imagem}" alt="${productData.nome}" loading="lazy">
                <button class="favorite-btn active" data-id="${productId}" aria-label="Remover dos favoritos">
                    <i class="bi bi-heart-fill"></i>
                </button>
            </div>
            <div class="favorite-info">
                <div class="favorite-name">${productData.nome}</div>
                <div class="favorite-price">R$ ${productData.precoVista.toFixed(2).replace('.', ',')}</div>
                <div class="product-category">${getProductCategory(productId)}</div>
                <div class="product-condition">${productData.condicao}</div>
                <div class="favorite-actions">
                    <a href="produto.html?id=${productId}" class="btn btn-secondary btn-small">
                        <i class="bi bi-eye"></i> Ver Detalhes
                    </a>
                    <button class="btn btn-primary btn-small add-to-cart" data-id="${productId}">
                        <i class="bi bi-cart-plus"></i> Adicionar
                    </button>
                    <button class="btn btn-danger btn-small remove-favorite" data-id="${productId}">
                        <i class="bi bi-trash"></i> Remover
                    </button>
                </div>
            </div>
        `;
        
        // Adiciona evento de clique para remover o favorito
        const removeBtn = favoriteItem.querySelector('.remove-favorite');
        removeBtn.addEventListener('click', function() {
            removeFavorite(productId, favoriteItem);
        });
        
        // Adiciona evento de clique para o ícone de coração
        const heartIcon = favoriteItem.querySelector('.favorite-btn');
        heartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            removeFavorite(productId, favoriteItem);
        });
        
        // Adiciona evento de clique na imagem para ir para a página do produto
        const productImage = favoriteItem.querySelector('.favorite-image img');
        productImage.addEventListener('click', function() {
            window.location.href = 'produto.html?id=' + productId;
        });
        
        // Adiciona evento de clique no nome para ir para a página do produto
        const productName = favoriteItem.querySelector('.favorite-name');
        productName.addEventListener('click', function() {
            window.location.href = 'produto.html?id=' + productId;
        });
        
        // Adiciona evento de clique no botão "Adicionar ao Carrinho"
        const addToCartBtn = favoriteItem.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addToCartFromFavorites(productData);
        });
        
        return favoriteItem;
    }
    
    // Função para remover um favorito
    function removeFavorite(productId, favoriteItem) {
        // Remove do array de favoritos
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(id => id !== productId);
        
        // Atualiza o localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Remove o item da tela
        favoriteItem.remove();
        
        // Atualiza também na página principal usando a função existente
        if (typeof updateMainPageFavorites === 'function') {
            updateMainPageFavorites(productId, false);
        }
        
        // Se não houver mais favoritos, mostra a mensagem de lista vazia
        if (favorites.length === 0) {
            if (emptyFavoritesDiv) emptyFavoritesDiv.style.display = 'block';
            if (favoritesGrid) favoritesGrid.style.display = 'none';
        }
        
        // Mostra feedback de remoção
        showFavoriteFeedback(false);
    }
    
    // Função para adicionar ao carrinho a partir dos favoritos
    function addToCartFromFavorites(productData) {
        // Usa a função addToCart do produto.js se disponível
        if (typeof window.addToCart === 'function') {
            window.addToCart(
                productData.nome,
                productData.precoVista,
                productData.imagem,
                productData.descricao,
                productData.id
            );
        } else {
            // Fallback caso a função não esteja disponível
            const cartCount = document.querySelector('.cart-count');
            let itemsInCart = parseInt(cartCount.textContent) || 0;
            itemsInCart++;
            cartCount.textContent = itemsInCart;
            
            // Mostra mensagem de confirmação
            showCartMessage('Produto adicionado ao carrinho!');
        }
    }
    
    // Função para mostrar mensagem do carrinho
    function showCartMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'cart-message';
        messageElement.textContent = message;

        Object.assign(messageElement.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: '1000',
            transition: 'opacity 0.5s, transform 0.5s',
            opacity: '0',
            transform: 'translateY(-20px)'
        });

        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 3000);
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
    
    // Função auxiliar para obter dados do produto pelo ID
    function getProductDataById(productId) {
        // Busca os dados completos do produto do produto.js
        if (typeof produtos !== 'undefined' && produtos[productId]) {
            return produtos[productId];
        }
        
        // Fallback com dados completos dos 22 produtos
        const products = {
            "1": {
                id: "1",
                nome: "Camiseta Polo",
                precoVista: 39.90,
                precoParcelado: 39.90,
                parcelas: 1,
                imagem: "IMG/camiseta-polo.jpg",
                descricao: "Camiseta polo usada em bom estado, perfeita para o dia a dia.",
                medidas: ["Tamanho: M"],
                vendedor: "Brechó Elegante",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Algodão", "Cor: Azul", "Marca: Lacoste", "Estado: Bom (pequenos sinais de uso)"],
                condicao: "Usado - Bom estado"
            },
            "2": {
                id: "2",
                nome: "Liquidificador Philips",
                precoVista: 89.90,
                precoParcelado: 89.90 / 3,
                parcelas: 3,
                imagem: "IMG/liquidificador-phill.jpg",
                descricao: "Liquidificador em perfeito estado, pouco uso.",
                medidas: ["Altura: 30cm", "Largura: 15cm"],
                vendedor: "Casa Usada",
                vendedorLink: "perfilVendedor.html",
                informacoes: ["Potência: 500W", "Cor: Vermelho", "Acessórios: 2 copos medidores", "Estado: Excelente"],
                condicao: "Usado - Excelente estado"
            },
            "3": {
                id: "3",
                nome: "Tênis Nike",
                precoVista: 199.99,
                precoParcelado: 199.99 / 10,
                parcelas: 10,
                imagem: "IMG/tenis-nike.avif",
                descricao: "Tênis Nike usado em ótimo estado, ideal para quem busca qualidade e economia.",
                medidas: ["Tamanho do Calçado: 42"],
                vendedor: "Brechó Sustentável",
                vendedorLink: "Perfilvendedor.html",
                informacoes: ["Material: mistura de couro, tecido, espuma e borracha", "Cor: Azul marinho e Branco", "Origem: EUA"],
                condicao: "Usado - Excelente estado"
            },
            "4": {
                id: "4",
                nome: "Vestido Floral",
                precoVista: 65.00,
                precoParcelado: 65.00 / 2,
                parcelas: 2,
                imagem: "IMG/vestido-floral.jpg",
                descricao: "Vestido floral usado poucas vezes, em perfeito estado.",
                medidas: ["Tamanho: 38", "Comprimento: 90cm"],
                vendedor: "Moda Circular",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Viscose", "Cor: Floral (rosa, verde e branco)", "Estação: Verão", "Estado: Como novo"],
                condicao: "Usado - Como novo"
            },
            "5": {
                id: "5",
                nome: "Calça Jeans Masculina",
                precoVista: 79.90,
                precoParcelado: 79.90 / 2,
                parcelas: 2,
                imagem: "IMG/calca_j.jpg",
                descricao: "Calça jeans masculina em ótimo estado, perfeita para o dia a dia.",
                medidas: ["Tamanho: 42", "Comprimento: 100cm"],
                vendedor: "Brechó Masculino",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Jeans", "Cor: Azul escuro", "Marca: Levi's", "Estado: Usado - Bom estado"],
                condicao: "Usado - Bom estado"
            },
            "6": {
                id: "6",
                nome: "Tênis Casual",
                precoVista: 129.90,
                precoParcelado: 129.90 / 3,
                parcelas: 3,
                imagem: "IMG/tenis_c.jpg",
                descricao: "Tênis casual novo, ideal para looks despojados.",
                medidas: ["Tamanho: 41"],
                vendedor: "Calçados & Cia",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Couro sintético", "Cor: Preto", "Marca: Olympikus", "Estado: Novo"],
                condicao: "Novo"
            },
            "7": {
                id: "7",
                nome: "Relógio Esportivo",
                precoVista: 89.90,
                precoParcelado: 89.90 / 2,
                parcelas: 2,
                imagem: "IMG/relogio_s_n.jpg",
                descricao: "Relógio esportivo semi-novo com cronômetro e resistente à água.",
                medidas: ["Pulseira: 22cm"],
                vendedor: "Acessórios Premium",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Silicone", "Cor: Preto e vermelho", "Funções: Cronômetro, calendário", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "8": {
                id: "8",
                nome: "Jaqueta de Couro",
                precoVista: 199.90,
                precoParcelado: 199.90 / 4,
                parcelas: 4,
                imagem: "IMG/jaqueta_c_u.jpg",
                descricao: "Jaqueta de couro legítimo, usada mas em bom estado.",
                medidas: ["Tamanho: G", "Comprimento: 70cm"],
                vendedor: "Moda Masculina",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Couro legítimo", "Cor: Marrom", "Forro: Algodão", "Estado: Usado - Bom estado"],
                condicao: "Usado - Bom estado"
            },
            "9": {
                id: "9",
                nome: "Blusa de Seda",
                precoVista: 45.00,
                precoParcelado: 45.00,
                parcelas: 1,
                imagem: "IMG/blusa_s_s.jpg",
                descricao: "Blusa de seda semi-nova, muito elegante e confortável.",
                medidas: ["Tamanho: P", "Comprimento: 60cm"],
                vendedor: "Moda Feminina",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Seda 100%", "Cor: Verde água", "Lavagem: Limpeza a seco", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "10": {
                id: "10",
                nome: "Salto Alto",
                precoVista: 89.90,
                precoParcelado: 89.90 / 2,
                parcelas: 2,
                imagem: "IMG/salto_a_u.jpg",
                descricao: "Salto alto usado, ainda em bom estado para ocasiões especiais.",
                medidas: ["Tamanho: 36", "Altura do salto: 10cm"],
                vendedor: "Sapatos Elegantes",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Couro sintético", "Cor: Preto", "Altura do salto: 10cm", "Estado: Usado - Bom estado"],
                condicao: "Usado - Bom estado"
            },
            "11": {
                id: "11",
                nome: "Bolsa de Couro",
                precoVista: 120.00,
                precoParcelado: 120.00 / 3,
                parcelas: 3,
                imagem: "IMG/bolsa_c_s.jpg",
                descricao: "Bolsa de couro semi-nova, espaçosa e elegante.",
                medidas: ["Largura: 35cm", "Altura: 25cm"],
                vendedor: "Acessórios Femininos",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Couro legítimo", "Cor: Marrom", "Compartimentos: 3", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "12": {
                id: "12",
                nome: "Saia Midi",
                precoVista: 55.00,
                precoParcelado: 55.00,
                parcelas: 1,
                imagem: "IMG/saia_m_n.jpg",
                descricao: "Saia midi nova, perfeita para o trabalho ou eventos.",
                medidas: ["Tamanho: M", "Comprimento: 75cm"],
                vendedor: "Moda Atual",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Viscose", "Cor: Azul marinho", "Estilo: Midi", "Estado: Novo"],
                condicao: "Novo"
            },
            "13": {
                id: "13",
                nome: "Conjunto Infantil",
                precoVista: 49.90,
                precoParcelado: 49.90,
                parcelas: 1,
                imagem: "IMG/conjunto_i_s.jpg",
                descricao: "Conjunto infantil semi-novo, muito fofo e confortável.",
                medidas: ["Tamanho: 6 anos"],
                vendedor: "Moda Infantil",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Algodão", "Cor: Rosa e branco", "Idade: 5-7 anos", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "14": {
                id: "14",
                nome: "Tênis Infantil",
                precoVista: 39.90,
                precoParcelado: 39.90,
                parcelas: 1,
                imagem: "IMG/tenis_i_n.jpg",
                descricao: "Tênis infantil novo, com luzes LED divertidas.",
                medidas: ["Tamanho: 28"],
                vendedor: "Calçados Kids",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Têxtil e sintético", "Cor: Azul e verde", "Luzes LED: Sim", "Estado: Novo"],
                condicao: "Novo"
            },
            "15": {
                id: "15",
                nome: "Carrinho de Brinquedo",
                precoVista: 25.00,
                precoParcelado: 25.00,
                parcelas: 1,
                imagem: "IMG/carrinho_b_u.jpg",
                descricao: "Carrinho de brinquedo usado, mas ainda funcional e divertido.",
                medidas: ["Comprimento: 20cm", "Largura: 10cm"],
                vendedor: "Brinquedos Usados",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Plástico", "Cor: Vermelho", "Idade: 3+ anos", "Estado: Usado"],
                condicao: "Usado"
            },
            "16": {
                id: "16",
                nome: "Vestido Infantil",
                precoVista: 35.00,
                precoParcelado: 35.00,
                parcelas: 1,
                imagem: "IMG/vestido_i_s.jpg",
                descricao: "Vestido infantil semi-novo, perfeito para festas.",
                medidas: ["Tamanho: 4 anos"],
                vendedor: "Moda Kids",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Tule e algodão", "Cor: Rosa", "Detalhes: Laços e rendas", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "17": {
                id: "17",
                nome: "Camiseta Dry Fit",
                precoVista: 49.90,
                precoParcelado: 49.90,
                parcelas: 1,
                imagem: "IMG/camiseta_d_f_s.jpg",
                descricao: "Camiseta dry fit semi-nova, ideal para atividades físicas.",
                medidas: ["Tamanho: G"],
                vendedor: "Esportes & Ação",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Dry Fit", "Cor: Cinza", "Tecnologia: Secagem rápida", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "18": {
                id: "18",
                nome: "Shorts de Corrida",
                precoVista: 35.00,
                precoParcelado: 35.00,
                parcelas: 1,
                imagem: "IMG/short_c_u.jpg",
                descricao: "Shorts de corrida usado, ainda em bom estado.",
                medidas: ["Tamanho: M"],
                vendedor: "Corrida Livre",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Poliéster", "Cor: Preto", "Bolsos: 2", "Estado: Usado - Bom estado"],
                condicao: "Usado - Bom estado"
            },
            "19": {
                id: "19",
                nome: "Garrafa Térmica",
                precoVista: 29.90,
                precoParcelado: 29.90,
                parcelas: 1,
                imagem: "IMG/garrafa_t_n.jpg",
                descricao: "Garrafa térmica nova, mantém líquidos quentes ou frios por horas.",
                medidas: ["Capacidade: 750ml"],
                vendedor: "Casa & Utilidades",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Aço inoxidável", "Cor: Azul", "Manutenção de temperatura: 12h", "Estado: Novo"],
                condicao: "Novo"
            },
            "20": {
                id: "20",
                nome: "Panela de Pressão",
                precoVista: 65.00,
                precoParcelado: 65.00,
                parcelas: 1,
                imagem: "IMG/panela_p_u.jpg",
                descricao: "Panela de pressão usada, ainda funcional e segura.",
                medidas: ["Capacidade: 4,5L"],
                vendedor: "Utensílios Domésticos",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Alumínio", "Cor: Prata", "Válvula de segurança: Sim", "Estado: Usado - Bom estado"],
                condicao: "Usado - Bom estado"
            },
            "21": {
                id: "21",
                nome: "Cadeira de Escritório",
                precoVista: 150.00,
                precoParcelado: 150.00 / 3,
                parcelas: 3,
                imagem: "IMG/cadeira_e_s.jpg",
                descricao: "Cadeira de escritório semi-nova, ergonômica e confortável.",
                medidas: ["Altura: 80-100cm", "Largura: 60cm"],
                vendedor: "Móveis & Escritório",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Couro sintético", "Cor: Preto", "Ajustes: Altura e inclinação", "Estado: Semi-novo"],
                condicao: "Semi-novo"
            },
            "22": {
                id: "22",
                nome: "Jogo de Panelas",
                precoVista: 120.00,
                precoParcelado: 120.00 / 3,
                parcelas: 3,
                imagem: "IMG/panela_n.jpg",
                descricao: "Jogo de panelas novo, antiaderente e durável.",
                medidas: ["5 peças"],
                vendedor: "Cozinha Completa",
                vendedorLink: "perfilvendedor.html",
                informacoes: ["Material: Alumínio com antiaderente", "Cor: Preto", "Peças: 5", "Estado: Novo"],
                condicao: "Novo"
            }
        };
        
        return products[productId] || null;
    }
    
    // Função auxiliar para obter a categoria do produto
    function getProductCategory(productId) {
        const categoryMap = {
            '1': 'Masculino', '5': 'Masculino', '6': 'Masculino', '7': 'Masculino', '8': 'Masculino',
            '4': 'Feminino', '9': 'Feminino', '10': 'Feminino', '11': 'Feminino', '12': 'Feminino',
            '13': 'Infantil', '14': 'Infantil', '15': 'Infantil', '16': 'Infantil',
            '3': 'Esportivo', '17': 'Esportivo', '18': 'Esportivo', '19': 'Esportivo',
            '2': 'Casa/Cozinha', '20': 'Casa/Cozinha', '21': 'Casa/Cozinha', '22': 'Casa/Cozinha'
        };
        
        return categoryMap[productId] || 'Geral';
    }
});