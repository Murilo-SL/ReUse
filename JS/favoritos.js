// ================ SISTEMA UNIFICADO DE FAVORITOS ================

// Banco de dados de produtos (comum a todas as páginas)
const produtos = {
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
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Elegante",
        informacoes: [
            "Material: Algodão",
            "Cor: Azul",
            "Marca: Lacoste",
            "Estado: Bom (pequenos sinais de uso)"
        ],
        condicao: "Usado - Bom estado",
        categoria: "masculino"
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
        vendedorLink: "perfilvendedor.html?vendedor=Casa Usada",
        informacoes: [
            "Potência: 500W",
            "Cor: Vermelho",
            "Acessórios: 2 copos medidores",
            "Estado: Excelente"
        ],
        condicao: "Usado - Excelente estado",
        categoria: "casa-cozinha"
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
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: mistura de couro, tecido, espuma e borracha",
            "Cor: Azul marinho e Branco",
            "Origem: EUA"
        ],
        condicao: "Usado - Excelente estado",
        categoria: "esportivo"
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
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Viscose",
            "Cor: Floral (rosa, verde e branco)",
            "Estação: Verão",
            "Estado: Como novo"
        ],
        condicao: "Usado - Como novo",
        categoria: "feminino"
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
        vendedor: "Brechó Elegante",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Elegante",
        informacoes: [
            "Material: Jeans",
            "Cor: Azul escuro",
            "Marca: Levi's",
            "Estado: Usado - Bom estado"
        ],
        condicao: "Usado - Bom estado",
        categoria: "masculino"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Couro sintético",
            "Cor: Preto",
            "Marca: Olympikus",
            "Estado: Novo"
        ],
        condicao: "Novo",
        categoria: "esportivo"
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
        vendedor: "Moda Circular",
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Silicone",
            "Cor: Preto e vermelho",
            "Funções: Cronômetro, calendário",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "feminino"
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
        vendedor: "Brechó Elegante",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Elegante",
        informacoes: [
            "Material: Couro legítimo",
            "Cor: Marrom",
            "Forro: Algodão",
            "Estado: Usado - Bom estado"
        ],
        condicao: "Usado - Bom estado",
        categoria: "masculino"
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
        vendedor: "Moda Circular",
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Seda 100%",
            "Cor: Verde água",
            "Lavagem: Limpeza a seco",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "feminino"
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
        vendedor: "Moda Circular",
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Couro sintético",
            "Cor: Preto",
            "Altura do salto: 10cm",
            "Estado: Usado - Bom estado"
        ],
        condicao: "Usado - Bom estado",
        categoria: "feminino"
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
        vendedor: "Moda Circular",
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Couro legítimo",
            "Cor: Marrom",
            "Compartimentos: 3",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "feminino"
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
        vendedor: "Moda Circular",
        vendedorLink: "perfilvendedor.html?vendedor=Moda Circular",
        informacoes: [
            "Material: Viscose",
            "Cor: Azul marinho",
            "Estilo: Midi",
            "Estado: Novo"
        ],
        condicao: "Novo",
        categoria: "feminino"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Algodão",
            "Cor: Rosa e branco",
            "Idade: 5-7 anos",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "infantil"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Têxtil e sintético",
            "Cor: Azul e verde",
            "Luzes LED: Sim",
            "Estado: Novo"
        ],
        condicao: "Novo",
        categoria: "infantil"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Plástico",
            "Cor: Vermelho",
            "Idade: 3+ anos",
            "Estado: Usado"
        ],
        condicao: "Usado",
        categoria: "infantil"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Tule e algodão",
            "Cor: Rosa",
            "Detalhes: Laços e rendas",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "infantil"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Dry Fit",
            "Cor: Cinza",
            "Tecnologia: Secagem rápida",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "esportivo"
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
        vendedor: "Brechó Sustentável",
        vendedorLink: "perfilvendedor.html?vendedor=Brechó Sustentável",
        informacoes: [
            "Material: Poliéster",
            "Cor: Preto",
            "Bolsos: 2",
            "Estado: Usado - Bom estado"
        ],
        condicao: "Usado - Bom estado",
        categoria: "esportivo"
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
        vendedor: "Casa Usada",
        vendedorLink: "perfilvendedor.html?vendedor=Casa Usada",
        informacoes: [
            "Material: Aço inoxidável",
            "Cor: Azul",
            "Manutenção de temperatura: 12h",
            "Estado: Novo"
        ],
        condicao: "Novo",
        categoria: "casa-cozinha"
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
        vendedor: "Casa Usada",
        vendedorLink: "perfilvendedor.html?vendedor=Casa Usada",
        informacoes: [
            "Material: Alumínio",
            "Cor: Prata",
            "Válvula de segurança: Sim",
            "Estado: Usado - Bom estado"
        ],
        condicao: "Usado - Bom estado",
        categoria: "casa-cozinha"
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
        vendedor: "Casa Usada",
        vendedorLink: "perfilvendedor.html?vendedor=Casa Usada",
        informacoes: [
            "Material: Couro sintético",
            "Cor: Preto",
            "Ajustes: Altura e inclinação",
            "Estado: Semi-novo"
        ],
        condicao: "Semi-novo",
        categoria: "casa-cozinha"
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
        vendedor: "Casa Usada",
        vendedorLink: "perfilvendedor.html?vendedor=Casa Usada",
        informacoes: [
            "Material: Alumínio com antiaderente",
            "Cor: Preto",
            "Peças: 5",
            "Estado: Novo"
        ],
        condicao: "Novo",
        categoria: "casa-cozinha"
    }
};

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
    return favorites.includes(productId);
}

// Função para adicionar produto aos favoritos
function addToFavorites(productId) {
    const favorites = getFavorites();
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Função para remover produto dos favoritos
function removeFromFavorites(productId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        saveFavorites(favorites);
        return true;
    }
    return false;
}

// Função para alternar estado de favorito
function toggleFavorite(productId, button) {
    const wasFavorite = isFavorite(productId);
    let success;
    
    if (wasFavorite) {
        success = removeFromFavorites(productId);
        if (success) {
            updateFavoriteButtonState(productId, false);
            showFavoriteFeedback(false);
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

// Função para atualizar o estado visual dos botões de favorito
function updateFavoriteButtonState(productId, isFavorite) {
    document.querySelectorAll(`[data-id="${productId}"]`).forEach(btn => {
        if (isFavorite) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            }
        } else {
            btn.classList.remove('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
        }
    });
}

// Função para mostrar feedback visual
function showFavoriteFeedback(isAdded) {
    // Remover feedback anterior se existir
    const existingFeedback = document.querySelector('.favorite-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Criar o elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = `favorite-feedback ${isAdded ? 'added' : 'removed'}`;
    
    // Definir o conteúdo do feedback
    feedback.innerHTML = `
        <i class="bi ${isAdded ? 'bi-heart-fill' : 'bi-heart'}"></i>
        ${isAdded ? 'Adicionado aos favoritos' : 'Removido dos favoritos'}
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(feedback);
    
    // Remover após 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Função para inicializar o sistema de favoritos em uma página
function initializeFavorites() {
    // Usar event delegation para todos os botões de favorito
    document.addEventListener('click', function(e) {
        const favoriteBtn = e.target.closest('.favorite-btn, .favorite-btn-bottom');
        if (favoriteBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = favoriteBtn.getAttribute('data-id');
            toggleFavorite(productId, favoriteBtn);
        }
    });
    
    // Inicializar estado dos botões
    const favorites = getFavorites();
    document.querySelectorAll('.favorite-btn, .favorite-btn-bottom').forEach(btn => {
        const productId = btn.getAttribute('data-id');
        if (favorites.includes(productId)) {
            btn.classList.add('active');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            }
        }
    });
}

// Inicializar quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFavorites);
} else {
    initializeFavorites();
}