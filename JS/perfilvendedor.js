
    // Banco de dados de vendedores (SIMPLIFICADO)
    const vendedores = {
        "Brechó Elegante": {
            nome: "Brechó Elegante",
            avatar: "IMG/vendedor-brecho-elegante.jpg",
            nota: 4.7,
            avaliacoes: 32,
            localizacao: "São Paulo, SP",
            vendas: 156,
            produtos: 3,
            tempo: "3 anos",
            email: "brechoelegante@email.com",
            telefone: "(11) 99999-9999",
            endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
            sobre: "Especializado em roupas masculinas de qualidade, com foco em peças clássicas e atemporais. Trabalhamos com produtos em bom estado, sempre priorizando a satisfação dos nossos clientes.",
            produtosIds: ["1", "5", "8"]
        },
        "Casa Usada": {
            nome: "Casa Usada",
            avatar: "IMG/vendedor-casa-usada.jpg",
            nota: 4.3,
            avaliacoes: 18,
            localizacao: "Rio de Janeiro, RJ",
            vendas: 89,
            produtos: 5,
            tempo: "2 anos",
            email: "casausada@email.com",
            telefone: "(21) 98888-8888",
            endereco: "Av. Brasil, 456 - Copacabana, Rio de Janeiro - RJ",
            sobre: "Oferecemos eletrodomésticos e utensílios domésticos em ótimo estado, com garantia de funcionamento. Todos os produtos passam por uma avaliação criteriosa antes de serem disponibilizados.",
            produtosIds: ["2", "19", "20", "21", "22"]
        },
        "Brechó Sustentável": {
            nome: "Brechó Sustentável",
            avatar: "IMG/vendedor-brecho-sustentavel.jpg",
            nota: 4.9,
            avaliacoes: 45,
            localizacao: "Belo Horizonte, MG",
            vendas: 203,
            produtos: 8,
            tempo: "4 anos",
            email: "brechosustentavel@email.com",
            telefone: "(31) 97777-7777",
            endereco: "Rua da Consciência, 789 - Savassi, Belo Horizonte - MG",
            sobre: "Nosso objetivo é promover o consumo consciente através da reutilização de roupas e acessórios. Trabalhamos com moda esportiva, infantil e casual. Acreditamos que moda e sustentabilidade podem andar juntas!",
            produtosIds: ["3", "6", "13", "14", "15", "16", "17", "18"]
        },
        "Moda Circular": {
            nome: "Moda Circular",
            avatar: "IMG/vendedor-moda-circular.jpg",
            nota: 4.5,
            avaliacoes: 27,
            localizacao: "Porto Alegre, RS",
            vendas: 112,
            produtos: 6,
            tempo: "2 anos",
            email: "modacircular@email.com",
            telefone: "(51) 96666-6666",
            endereco: "Av. Farrapos, 321 - Centro Histórico, Porto Alegre - RS",
            sobre: "Especializada em moda feminina com peças únicas e em ótimo estado. Trabalhamos com roupas, calçados e acessórios que contam histórias. Focada em elegância e sofisticação.",
            produtosIds: ["4", "7", "9", "10", "11", "12"]
        }
    };

    // Banco de dados de produtos (mesmo do produto.js)
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
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Algodão",
                "Cor: Azul",
                "Marca: Lacoste",
                "Estado: Bom (pequenos sinais de uso)"
            ],
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
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Potência: 500W",
                "Cor: Vermelho",
                "Acessórios: 2 copos medidores",
                "Estado: Excelente"
            ],
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
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: mistura de couro, tecido, espuma e borracha",
                "Cor: Azul marinho e Branco",
                "Origem: EUA"
            ],
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
            informacoes: [
                "Material: Viscose",
                "Cor: Floral (rosa, verde e branco)",
                "Estação: Verão",
                "Estado: Como novo"
            ],
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
            vendedor: "Brechó Elegante",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Jeans",
                "Cor: Azul escuro",
                "Marca: Levi's",
                "Estado: Usado - Bom estado"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Couro sintético",
                "Cor: Preto",
                "Marca: Olympikus",
                "Estado: Novo"
            ],
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
            vendedor: "Moda Circular",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Silicone",
                "Cor: Preto e vermelho",
                "Funções: Cronômetro, calendário",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Brechó Elegante",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Couro legítimo",
                "Cor: Marrom",
                "Forro: Algodão",
                "Estado: Usado - Bom estado"
            ],
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
            vendedor: "Moda Circular",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Seda 100%",
                "Cor: Verde água",
                "Lavagem: Limpeza a seco",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Moda Circular",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Couro sintético",
                "Cor: Preto",
                "Altura do salto: 10cm",
                "Estado: Usado - Bom estado"
            ],
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
            vendedor: "Moda Circular",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Couro legítimo",
                "Cor: Marrom",
                "Compartimentos: 3",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Moda Circular",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Viscose",
                "Cor: Azul marinho",
                "Estilo: Midi",
                "Estado: Novo"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Algodão",
                "Cor: Rosa e branco",
                "Idade: 5-7 anos",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Têxtil e sintético",
                "Cor: Azul e verde",
                "Luzes LED: Sim",
                "Estado: Novo"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Plástico",
                "Cor: Vermelho",
                "Idade: 3+ anos",
                "Estado: Usado"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Tule e algodão",
                "Cor: Rosa",
                "Detalhes: Laços e rendas",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Dry Fit",
                "Cor: Cinza",
                "Tecnologia: Secagem rápida",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Brechó Sustentável",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Poliéster",
                "Cor: Preto",
                "Bolsos: 2",
                "Estado: Usado - Bom estado"
            ],
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
            vendedor: "Casa Usada",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Aço inoxidável",
                "Cor: Azul",
                "Manutenção de temperatura: 12h",
                "Estado: Novo"
            ],
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
            vendedor: "Casa Usada",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Alumínio",
                "Cor: Prata",
                "Válvula de segurança: Sim",
                "Estado: Usado - Bom estado"
            ],
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
            vendedor: "Casa Usada",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Couro sintético",
                "Cor: Preto",
                "Ajustes: Altura e inclinação",
                "Estado: Semi-novo"
            ],
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
            vendedor: "Casa Usada",
            vendedorLink: "perfilvendedor.html",
            informacoes: [
                "Material: Alumínio com antiaderente",
                "Cor: Preto",
                "Peças: 5",
                "Estado: Novo"
            ],
            condicao: "Novo"
        }
    };

    // Avaliações de exemplo
    const avaliacoes = {
        "Brechó Elegante": [
            {
                cliente: "Carlos Silva",
                data: "15/03/2023",
                nota: 5,
                texto: "Produto exatamente como descrito. Entrega rápida e vendedor muito atencioso! A jaqueta de couro é de ótima qualidade."
            },
            {
                cliente: "João Santos",
                data: "22/02/2023",
                nota: 4,
                texto: "Boa qualidade do produto, apenas uma pequena mancha não mencionada. De resto, tudo perfeito."
            },
            {
                cliente: "Roberto Almeida",
                data: "10/01/2023",
                nota: 5,
                texto: "Excelente brechó! Roupas masculinas de qualidade e preço justo. Recomendo!"
            }
        ],
        "Casa Usada": [
            {
                cliente: "Ana Costa",
                data: "10/04/2023",
                nota: 5,
                texto: "Eletrodoméstico funcionando perfeitamente. Super recomendo este vendedor!"
            },
            {
                cliente: "Maria Oliveira",
                data: "28/03/2023",
                nota: 4,
                texto: "Produtos em bom estado, entrega dentro do prazo. Satisfeita com a compra."
            }
        ],
        "Brechó Sustentável": [
            {
                cliente: "Pedro Almeida",
                data: "05/05/2023",
                nota: 5,
                texto: "Excelente qualidade e atendimento! Com certeza comprarei novamente. Adorei os produtos infantis."
            },
            {
                cliente: "Tânia Mendes",
                data: "18/06/2023",
                nota: 5,
                texto: "Perfeito para o meu filho! Produtos em ótimo estado e preços acessíveis."
            },
            {
                cliente: "Ricardo Souza",
                data: "12/04/2023",
                nota: 4,
                texto: "Boa variedade de produtos esportivos. Tênis chegou em perfeito estado."
            }
        ],
        "Moda Circular": [
            {
                cliente: "Carla Mendes",
                data: "18/06/2023",
                nota: 5,
                texto: "Vestido lindo e em perfeito estado. A bolsa de couro também é maravilhosa! Recomendo!"
            },
            {
                cliente: "Fernanda Lima",
                data: "22/05/2023",
                nota: 5,
                texto: "Amei todos os produtos! Qualidade excelente e atendimento impecável."
            },
            {
                cliente: "Juliana Santos",
                data: "30/04/2023",
                nota: 4,
                texto: "Produtos muito elegantes e em bom estado. Só senti falta de mais informações sobre alguns itens."
            }
        ]
    };

    // Função para carregar os dados do vendedor
    function carregarVendedor() {
        const urlParams = new URLSearchParams(window.location.search);
        const vendedorNome = urlParams.get('vendedor');
        
        if (!vendedorNome || !vendedores[vendedorNome]) {
            window.location.href = 'cliente.html';
            return;
        }
        
        const vendedor = vendedores[vendedorNome];
        
        // Preencher informações do vendedor
        document.getElementById('vendedor-nome').textContent = vendedor.nome;
        document.getElementById('vendedor-nota').textContent = vendedor.nota;
        document.getElementById('vendedor-avaliacoes').textContent = vendedor.avaliacoes;
        document.getElementById('vendedor-localizacao').textContent = vendedor.localizacao;
        document.getElementById('vendedor-vendas').textContent = vendedor.vendas;
        document.getElementById('vendedor-produtos').textContent = vendedor.produtos;
        document.getElementById('vendedor-tempo').textContent = vendedor.tempo;
        document.getElementById('vendedor-email').textContent = vendedor.email;
        document.getElementById('vendedor-telefone').textContent = vendedor.telefone;
        document.getElementById('vendedor-endereco').textContent = vendedor.endereco;
        
        // Preencher seção "Sobre"
        document.getElementById('sobre-vendedor').textContent = vendedor.sobre;
        
        // Carregar produtos do vendedor
        carregarProdutosVendedor(vendedor.produtosIds);
        
        // Carregar avaliações do vendedor
        carregarAvaliacoesVendedor(vendedorNome);
        
        // Configurar avatar
        const avatarImg = document.querySelector('.vendedor-avatar');
        avatarImg.src = vendedor.avatar;
        avatarImg.alt = `Avatar de ${vendedor.nome}`;
    }

// Função para carregar produtos do vendedor (ATUALIZADA)
function carregarProdutosVendedor(produtosIds) {
    const produtosContainer = document.getElementById('produtos-vendedor');
    produtosContainer.innerHTML = '';
    
    if (produtosIds.length === 0) {
        produtosContainer.innerHTML = '<p class="no-products">Este vendedor ainda não possui produtos cadastrados.</p>';
        return;
    }
    
    produtosIds.forEach(produtoId => {
        const produto = produtos[produtoId];
        if (produto) {
            const isFav = isFavorite(produtoId);
            
            const produtoCard = document.createElement('div');
            produtoCard.className = 'product-card';
            produtoCard.innerHTML = `
                <a href="produto.html?id=${produto.id}">
                    <div class="product-image">
                        <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='IMG/placeholder.jpg'">
                        <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${produto.id}" aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
                        </button>
                    </div>
                    <div class="product-info">
                        <h3>${produto.nome}</h3>
                        <div class="product-price">
                            <span class="price">R$ ${produto.precoVista.toFixed(2)}</span>
                        </div>
                        <div class="product-category">${getProductCategory(produtoId)}</div>
                        <button class="favorite-btn-bottom ${isFav ? 'active' : ''}" data-id="${produto.id}">
                            <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i> 
                            ${isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        </button>
                    </div>
                </a>
            `;
            produtosContainer.appendChild(produtoCard);
        }
    });
}

// Função auxiliar para obter categoria do produto
function getProductCategory(productId) {
    const categoryMap = {
        '1': 'Masculino', '5': 'Masculino', '8': 'Masculino',
        '4': 'Feminino', '7': 'Feminino', '9': 'Feminino', '10': 'Feminino', '11': 'Feminino', '12': 'Feminino',
        '13': 'Infantil', '14': 'Infantil', '15': 'Infantil', '16': 'Infantil',
        '3': 'Esportivo', '6': 'Esportivo', '17': 'Esportivo', '18': 'Esportivo',
        '2': 'Casa/Cozinha', '19': 'Casa/Cozinha', '20': 'Casa/Cozinha', '21': 'Casa/Cozinha', '22': 'Casa/Cozinha'
    };
    
    return categoryMap[productId] || 'Geral';
}

    // Função para carregar avaliações do vendedor
    function carregarAvaliacoesVendedor(vendedorNome) {
        const avaliacoesContainer = document.getElementById('avaliacoes-lista');
        avaliacoesContainer.innerHTML = '';
        
        const vendedorAvaliacoes = avaliacoes[vendedorNome] || [];
        
        if (vendedorAvaliacoes.length === 0) {
            avaliacoesContainer.innerHTML = '<p>Este vendedor ainda não possui avaliações.</p>';
            return;
        }
        
        vendedorAvaliacoes.forEach(avaliacao => {
            const avaliacaoItem = document.createElement('div');
            avaliacaoItem.className = 'avaliacao-item';
            
            // Gerar estrelas baseadas na nota
            let estrelasHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= avaliacao.nota) {
                    estrelasHTML += '<i class="bi bi-star-fill"></i>';
                } else {
                    estrelasHTML += '<i class="bi bi-star"></i>';
                }
            }
            
            avaliacaoItem.innerHTML = `
                <div class="avaliacao-header">
                    <div class="avaliacao-cliente">${avaliacao.cliente}</div>
                    <div class="avaliacao-data">${avaliacao.data}</div>
                </div>
                <div class="estrelas">${estrelasHTML}</div>
                <div class="avaliacao-texto">${avaliacao.texto}</div>
            `;
            
            avaliacoesContainer.appendChild(avaliacaoItem);
        });
    }

    // Função para alternar entre as abas
    function configurarTabs() {
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover classe active de todas as tabs
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Adicionar classe active à tab clicada
                tab.classList.add('active');
                
                // Mostrar o conteúdo correspondente
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // Função para configurar o botão de chat
    function configurarChat() {
        document.getElementById('btn-chat').addEventListener('click', function() {
            const vendedorNome = document.getElementById('vendedor-nome').textContent;
            alert(`Iniciando conversa com ${vendedorNome}`);
            // Aqui você implementaria a lógica para abrir o chat
            // window.location.href = `chat_Com_Vendedor.html?vendedor=${encodeURIComponent(vendedorNome)}`;
        });
    }

    // ================ SISTEMA DE FAVORITOS ================

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
            // Atualizar todos os botões para este produto
            updateFavoriteButtonState(productId, false);
            showFavoriteFeedback(false);
        }
    } else {
        success = addToFavorites(productId);
        if (success) {
            // Atualizar todos os botões para este produto
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

// Função para configurar os event listeners dos favoritos
function configurarFavoritos() {
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
}

// Função para inicializar o estado dos botões de favorito
function inicializarEstadoFavoritos() {
    const favorites = getFavorites();
    
    // Atualizar todos os botões de favorito na página
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

// Inicializar a página quando carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarVendedor();
    configurarTabs();
    configurarChat();
    configurarFavoritos();
    inicializarEstadoFavoritos();
});