// vendedor-produtos.js - Sistema completo e sincronizado

// ============ SISTEMA DE ARMAZENAMENTO ============

// Função para obter produtos do localStorage (fonte única da verdade)
function obterProdutos() {
    const produtosSalvos = localStorage.getItem('produtosCasaUsada');
    return produtosSalvos ? JSON.parse(produtosSalvos) : {};
}

// Função para salvar produtos no localStorage
function salvarProdutos(produtos) {
    localStorage.setItem('produtosCasaUsada', JSON.stringify(produtos));
    // Disparar evento personalizado para sincronização
    window.dispatchEvent(new Event('produtosAtualizados'));
}

// Função para inicializar produtos padrão se não existirem
function inicializarProdutosPadrao() {
    let produtos = obterProdutos();
    
    if (Object.keys(produtos).length === 0) {
        console.log('Inicializando produtos padrão...');
        // Produtos padrão da Casa Usada
        produtos = {
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
                categoria: "Eletrodomésticos",
                informacoes: [
                    "Potência: 500W",
                    "Cor: Vermelho",
                    "Acessórios: 2 copos medidores",
                    "Estado: Excelente"
                ],
                condicao: "Usado - Excelente estado",
                status: "Disponível",
                dataCadastro: new Date().toISOString()
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
                categoria: "Utensílios",
                informacoes: [
                    "Material: Aço inoxidável",
                    "Cor: Azul",
                    "Manutenção de temperatura: 12h",
                    "Estado: Novo"
                ],
                condicao: "Novo",
                status: "Disponível",
                dataCadastro: new Date().toISOString()
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
                categoria: "Utensílios",
                informacoes: [
                    "Material: Alumínio",
                    "Cor: Prata",
                    "Válvula de segurança: Sim",
                    "Estado: Usado - Bom estado"
                ],
                condicao: "Usado - Bom estado",
                status: "Vendido",
                dataCadastro: new Date().toISOString()
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
                categoria: "Móveis",
                informacoes: [
                    "Material: Couro sintético",
                    "Cor: Preto",
                    "Ajustes: Altura e inclinação",
                    "Estado: Semi-novo"
                ],
                condicao: "Semi-novo",
                status: "Disponível",
                dataCadastro: new Date().toISOString()
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
                categoria: "Utensílios",
                informacoes: [
                    "Material: Alumínio com antiaderente",
                    "Cor: Preto",
                    "Peças: 5",
                    "Estado: Novo"
                ],
                condicao: "Novo",
                status: "Disponível",
                dataCadastro: new Date().toISOString()
            }
        };
        
        salvarProdutos(produtos);
    }
    
    return produtos;
}

// Inicializar lixeira se não existir
function inicializarLixeira() {
    if (!localStorage.getItem('lixeiraCasaUsada')) {
        localStorage.setItem('lixeiraCasaUsada', JSON.stringify([]));
    }
}

// ============ SISTEMA DE SINCRONIZAÇÃO ============

function inicializarSincronizacao() {
    // Ouvir mudanças no localStorage de outras abas/páginas
    window.addEventListener('storage', function(e) {
        if (e.key === 'produtosCasaUsada' || e.key === 'lixeiraCasaUsada') {
            console.log('Mudança detectada no localStorage, atualizando interface...');
            carregarProdutos();
            atualizarEstatisticas();
            mostrarNotificacao('Dados atualizados automaticamente', 'info');
        }
    });
    
    // Ouvir eventos personalizados
    window.addEventListener('produtosAtualizados', function() {
        console.log('Evento produtosAtualizados disparado, recarregando...');
        carregarProdutos();
        atualizarEstatisticas();
    });
    
    // Recarregar quando a página ganhar foco
    window.addEventListener('focus', function() {
        console.log('Página em foco, verificando atualizações...');
        carregarProdutos();
        atualizarEstatisticas();
    });
    
    // Recarregar a cada 30 segundos para garantir sincronização
    setInterval(function() {
        carregarProdutos();
        atualizarEstatisticas();
    }, 30000);
}

// ============ SISTEMA DE PRODUTOS ============

// Função para carregar produtos
function carregarProdutos() {
    const produtosBody = document.getElementById('produtos-body');
    if (!produtosBody) return; // Elemento não existe nesta página
    
    const totalProdutos = document.getElementById('total-produtos');
    const produtosCount = document.getElementById('produtos-count');
    
    // Mostrar loading
    produtosBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-row">
                <div class="loading-spinner">
                    <i class="bi bi-arrow-repeat"></i>
                    <span>Carregando produtos...</span>
                </div>
            </td>
        </tr>
    `;
    
    // Simular carregamento assíncrono
    setTimeout(() => {
        try {
            const produtos = obterProdutos();
            const produtosArray = Object.values(produtos);
            
            // Verificar se há elementos de filtro na página
            const temFiltros = document.getElementById('buscar-produtos') !== null;
            
            let produtosParaExibir = produtosArray.filter(p => p.status !== 'excluido');
            
            if (temFiltros) {
                // Página com filtros (meus_produtos.html) - aplicar filtros
                produtosParaExibir = filtrarProdutos(produtosArray);
            }
            
            // Atualizar contadores
            if (totalProdutos) {
                totalProdutos.textContent = produtosParaExibir.length;
            }
            if (produtosCount) {
                produtosCount.textContent = `${produtosParaExibir.length} produtos encontrados`;
            }
            
            // Gerar HTML dos produtos
            if (produtosParaExibir.length === 0) {
                produtosBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="no-products">
                            <div class="empty-state">
                                <i class="bi bi-inbox"></i>
                                <h3>Nenhum produto cadastrado</h3>
                                <p>Comece adicionando seu primeiro produto!</p>
                                <a href="add_produto_v.html" class="btn-add-first">Adicionar Produto</a>
                            </div>
                        </td>
                    </tr>
                `;
            } else {
                produtosBody.innerHTML = produtosParaExibir.map(produto => `
                    <tr data-produto-id="${produto.id}">
                        <td>
                            <div class="produto-info">
                                <img src="${produto.imagem}" alt="${produto.nome}" class="produto-thumb" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgyMFYzMEgzMFYyMFpNMzIgMzJIMThWMTguMDAwMUgzMlYzMlpNMzIgMzJIMThWMTguMDAwMUgzMlYzMloiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'">
                                <div class="produto-detalhes">
                                    <strong>${produto.nome}</strong>
                                    <small>${produto.descricao}</small>
                                    <div class="produto-meta">
                                        <span class="condicao">${produto.condicao}</span>
                                        <span class="data-cadastro">Adicionado em ${formatarData(produto.dataCadastro)}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span class="categoria-badge">${produto.categoria}</span>
                        </td>
                        <td>
                            <div class="preco-info">
                                <span class="preco-vista">R$ ${produto.precoVista.toFixed(2)}</span>
                                ${produto.parcelas > 1 ? 
                                    `<small>ou ${produto.parcelas}x R$ ${produto.precoParcelado.toFixed(2)}</small>` : 
                                    ''
                                }
                            </div>
                        </td>
                        <td>
                            <span class="status status-${getStatusClass(produto.status)}">
                                ${produto.status}
                            </span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="action-btn edit-btn" data-id="${produto.id}">
                                    <i class="bi bi-pencil"></i> Editar
                                </button>
                                <button class="action-btn delete-btn" data-id="${produto.id}">
                                    <i class="bi bi-trash"></i> Excluir
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
            
            // Re-inicializar eventos dos botões
            inicializarEventosProdutos();
            
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            produtosBody.innerHTML = `
                <tr>
                    <td colspan="5" class="no-products">
                        <div class="empty-state">
                            <i class="bi bi-exclamation-triangle"></i>
                            <h3>Erro ao carregar produtos</h3>
                            <p>Recarregue a página e tente novamente.</p>
                            <button onclick="location.reload()" class="btn-add-first">Recarregar Página</button>
                        </div>
                    </td>
                </tr>
            `;
        }
    }, 500);
}

// Função para filtrar produtos
function filtrarProdutos(produtosArray) {
    const termoBusca = document.getElementById('buscar-produtos').value.toLowerCase();
    const categoriaSelecionada = document.getElementById('filtro-categoria').value;
    const statusSelecionado = document.getElementById('filtro-status').value;
    
    return produtosArray.filter(produto => {
        const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca) || 
                               produto.descricao.toLowerCase().includes(termoBusca);
        const correspondeCategoria = !categoriaSelecionada || produto.categoria === categoriaSelecionada;
        const correspondeStatus = !statusSelecionado || produto.status === statusSelecionado;
        
        return correspondeBusca && correspondeCategoria && correspondeStatus && produto.status !== 'excluido';
    });
}

// Função para aplicar filtros e atualizar a tabela
function aplicarFiltros() {
    try {
        const produtos = obterProdutos();
        const produtosArray = Object.values(produtos);
        const produtosFiltrados = filtrarProdutos(produtosArray);
        
        const produtosBody = document.getElementById('produtos-body');
        const produtosCount = document.getElementById('produtos-count');
        
        if (!produtosBody) return;
        
        // Atualizar contador
        produtosCount.textContent = `${produtosFiltrados.length} produtos encontrados`;
        
        // Gerar HTML dos produtos filtrados
        if (produtosFiltrados.length === 0) {
            produtosBody.innerHTML = `
                <tr>
                    <td colspan="5" class="no-products">
                        <div class="empty-state">
                            <i class="bi bi-search"></i>
                            <h3>Nenhum produto encontrado</h3>
                            <p>Tente ajustar os filtros de busca.</p>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            produtosBody.innerHTML = produtosFiltrados.map(produto => `
                <tr data-produto-id="${produto.id}">
                    <td>
                        <div class="produto-info">
                            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-thumb" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgyMFYzMEgzMFYyMFpNMzIgMzJIMThWMTguMDAwMUgzMlYzMlpNMzIgMzJIMThWMTguMDAwMUgzMlYzMloiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'">
                            <div class="produto-detalhes">
                                <strong>${produto.nome}</strong>
                                <small>${produto.descricao}</small>
                                <div class="produto-meta">
                                    <span class="condicao">${produto.condicao}</span>
                                    <span class="data-cadastro">Adicionado em ${formatarData(produto.dataCadastro)}</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="categoria-badge">${produto.categoria}</span>
                    </td>
                    <td>
                        <div class="preco-info">
                            <span class="preco-vista">R$ ${produto.precoVista.toFixed(2)}</span>
                            ${produto.parcelas > 1 ? 
                                `<small>ou ${produto.parcelas}x R$ ${produto.precoParcelado.toFixed(2)}</small>` : 
                                ''
                            }
                        </div>
                    </td>
                    <td>
                        <span class="status status-${getStatusClass(produto.status)}">
                            ${produto.status}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit-btn" data-id="${produto.id}">
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button class="action-btn delete-btn" data-id="${produto.id}">
                                <i class="bi bi-trash"></i> Excluir
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
        
        // Re-inicializar eventos dos botões
        inicializarEventosProdutos();
        
    } catch (error) {
        console.error('Erro ao aplicar filtros:', error);
        mostrarNotificacao('Erro ao filtrar produtos', 'error');
    }
}

// ============ SISTEMA DE EXCLUSÃO ============

// Função para excluir produto (mover para lixeira)
function excluirProduto(id) {
    try {
        const produtos = obterProdutos();
        const produto = produtos[id];
        
        if (!produto) {
            mostrarNotificacao('Produto não encontrado', 'error');
            return;
        }
        
        // Adicionar data de exclusão
        produto.dataExclusao = new Date().toISOString();
        
        // Mover para lixeira
        const lixeira = JSON.parse(localStorage.getItem('lixeiraCasaUsada')) || [];
        lixeira.push(produto);
        localStorage.setItem('lixeiraCasaUsada', JSON.stringify(lixeira));
        
        // Remover dos produtos ativos
        delete produtos[id];
        salvarProdutos(produtos);
        
        // Mostrar notificação
        mostrarNotificacao(`"${produto.nome}" movido para a lixeira`, 'success');
        
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        mostrarNotificacao('Erro ao excluir produto', 'error');
    }
}

// ============ SISTEMA DE EDIÇÃO ============

// Função para abrir modal de edição
function abrirModalEdicao(id) {
    try {
        const produtos = obterProdutos();
        const produto = produtos[id];
        
        if (!produto) {
            mostrarNotificacao('Produto não encontrado', 'error');
            return;
        }
        
        const modal = document.getElementById('modal-editar');
        const form = document.getElementById('form-editar-produto');
        
        if (!modal || !form) {
            console.error('Modal de edição não encontrado');
            return;
        }
        
        // Preencher formulário
        document.getElementById('edit-produto-id').value = produto.id;
        document.getElementById('edit-nome').value = produto.nome;
        document.getElementById('edit-categoria').value = produto.categoria;
        document.getElementById('edit-preco').value = produto.precoVista.toFixed(2);
        document.getElementById('edit-status').value = produto.status;
        document.getElementById('edit-descricao').value = produto.descricao;
        
        modal.style.display = 'block';
        
        // Configurar eventos do modal
        const cancelarBtn = document.getElementById('cancelar-edicao');
        const closeBtn = modal.querySelector('.close-modal');
        
        // Evento de submit do formulário
        form.onsubmit = function(e) {
            e.preventDefault();
            salvarEdicaoProduto(id);
            modal.style.display = 'none';
        };
        
        // Eventos para fechar modal
        cancelarBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error);
        mostrarNotificacao('Erro ao abrir edição', 'error');
    }
}

// Função para salvar edição do produto
function salvarEdicaoProduto(id) {
    try {
        const produtos = obterProdutos();
        const produto = produtos[id];
        
        if (!produto) {
            mostrarNotificacao('Produto não encontrado', 'error');
            return;
        }
        
        // Atualizar dados
        produto.nome = document.getElementById('edit-nome').value;
        produto.categoria = document.getElementById('edit-categoria').value;
        produto.precoVista = parseFloat(document.getElementById('edit-preco').value);
        produto.status = document.getElementById('edit-status').value;
        produto.descricao = document.getElementById('edit-descricao').value;
        
        // Recalcular parcelas se necessário
        if (produto.parcelas > 1) {
            produto.precoParcelado = produto.precoVista / produto.parcelas;
        }
        
        // Salvar alterações
        salvarProdutos(produtos);
        
        // Mostrar notificação
        mostrarNotificacao('Produto atualizado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
        mostrarNotificacao('Erro ao salvar alterações', 'error');
    }
}

// ============ SISTEMA DE EVENTOS ============

// Função para inicializar eventos dos produtos
function inicializarEventosProdutos() {
    // Botão de atualizar
    const btnRefresh = document.getElementById('btn-refresh-produtos');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            this.classList.add('loading');
            carregarProdutos();
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    }
    
    // Eventos dos botões de edição
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const produtoId = this.getAttribute('data-id');
            abrirModalEdicao(produtoId);
        });
    });
    
    // Eventos dos botões de exclusão
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const produtoId = this.getAttribute('data-id');
            const produtos = obterProdutos();
            const produto = produtos[produtoId];
            if (produto) {
                abrirModalExclusao(produtoId, produto.nome);
            }
        });
    });
}

// Função para inicializar eventos de filtro
function inicializarEventosFiltro() {
    const buscaInput = document.getElementById('buscar-produtos');
    const btnBuscar = document.getElementById('btn-buscar');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroStatus = document.getElementById('filtro-status');
    
    if (buscaInput && btnBuscar) {
        // Busca ao digitar (com debounce)
        let timeoutBusca;
        buscaInput.addEventListener('input', function() {
            clearTimeout(timeoutBusca);
            timeoutBusca = setTimeout(aplicarFiltros, 300);
        });
        
        // Busca ao clicar no botão
        btnBuscar.addEventListener('click', aplicarFiltros);
        
        // Busca ao pressionar Enter
        buscaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                aplicarFiltros();
            }
        });
    }
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', aplicarFiltros);
    }
    
    if (filtroStatus) {
        filtroStatus.addEventListener('change', aplicarFiltros);
    }
}

// ============ SISTEMA DE ESTATÍSTICAS ============

// Função para obter estatísticas dos produtos
function atualizarEstatisticas() {
    try {
        const produtos = obterProdutos();
        const produtosArray = Object.values(produtos);
        const produtosAtivos = produtosArray.filter(p => p.status !== 'excluido');
        
        const totalDisponiveis = produtosAtivos.filter(p => p.status === 'Disponível').length;
        const totalVendidos = produtosAtivos.filter(p => p.status === 'Vendido').length;
        const totalDoados = produtosAtivos.filter(p => p.status === 'Doado').length;
        
        // Atualizar cards se existirem na página
        const totalProdutos = document.getElementById('total-produtos');
        if (totalProdutos) {
            totalProdutos.textContent = produtosAtivos.length;
        }
        
        const totalVendas = document.getElementById('total-vendas');
        if (totalVendas) {
            totalVendas.textContent = totalVendidos;
        }
        
        const totalDoacoes = document.getElementById('total-doacoes');
        if (totalDoacoes) {
            totalDoacoes.textContent = totalDoados;
        }
        
    } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
    }
}

// ============ UTILITÁRIOS ============

// Função para formatar data
function formatarData(dataString) {
    if (!dataString) return 'Data não disponível';
    
    try {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        return 'Data inválida';
    }
}

// Função auxiliar para obter classe CSS do status
function getStatusClass(status) {
    const statusMap = {
        'Disponível': 'available',
        'Vendido': 'sold', 
        'Doado': 'donated',
        'excluido': 'excluido'
    };
    return statusMap[status] || 'available';
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    try {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `alert-notification alert-${tipo}`;
        notification.innerHTML = `
            <i class="bi bi-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${mensagem}
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao mostrar notificação:', error);
    }
}

// ============ MODAIS ============

// Função para abrir modal de exclusão
function abrirModalExclusao(id, nome) {
    try {
        const modal = document.getElementById('modal-excluir');
        const nomeProduto = document.getElementById('nome-produto-excluir');
        
        if (!modal || !nomeProduto) {
            console.error('Modal de exclusão não encontrado');
            return;
        }
        
        nomeProduto.textContent = nome;
        modal.style.display = 'block';
        
        // Configurar eventos do modal
        const confirmarBtn = document.getElementById('confirmar-exclusao');
        const cancelarBtn = document.getElementById('cancelar-exclusao');
        const closeBtn = modal.querySelector('.close-modal');
        
        // Remover eventos anteriores para evitar duplicação
        confirmarBtn.replaceWith(confirmarBtn.cloneNode(true));
        cancelarBtn.replaceWith(cancelarBtn.cloneNode(true));
        
        const novaConfirmarBtn = document.getElementById('confirmar-exclusao');
        const novaCancelarBtn = document.getElementById('cancelar-exclusao');
        
        // Novo evento de confirmação
        novaConfirmarBtn.addEventListener('click', function() {
            excluirProduto(id);
            modal.style.display = 'none';
        });
        
        // Eventos para fechar modal
        novaCancelarBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
    } catch (error) {
        console.error('Erro ao abrir modal de exclusão:', error);
        mostrarNotificacao('Erro ao abrir confirmação', 'error');
    }
}

// ============ INICIALIZAÇÃO ============

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de produtos...');
    
    // Inicializar armazenamento
    inicializarLixeira();
    inicializarProdutosPadrao();
    
    // Inicializar sistema de sincronização
    inicializarSincronizacao();
    
    // Carregar interface
    carregarProdutos();
    atualizarEstatisticas();
    
    // Inicializar eventos de filtro (se existirem na página)
    inicializarEventosFiltro();
    
    // Configurar gráfico (apenas se existir na página)
    const ctx = document.getElementById('salesChart');
    if (ctx) {
        try {
            const salesChart = new Chart(ctx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        {
                            label: 'Vendas',
                            data: [15, 12, 18, 14, 16, 14],
                            backgroundColor: '#2196F3',
                        },
                        {
                            label: 'Doações',
                            data: [2, 1, 3, 2, 2, 2],
                            backgroundColor: '#FF9800',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao inicializar gráfico:', error);
        }
    }
    
    console.log('Sistema de produtos inicializado com sucesso!');
});