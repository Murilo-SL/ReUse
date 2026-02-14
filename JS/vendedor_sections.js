// vendedor-produtos-vendas.js
// Funcionalidades específicas para as seções de Produtos Recentes e Vendas Recentes
// Autor: ReUse Team
// Versão: 1.0

class GerenciadorProdutosVendas {
    constructor() {
        this.init();
    }

    init() {
        this.carregarProdutos();
        this.carregarVendas();
        this.setupEventListeners();
        this.adicionarAcoesRapidas();
        this.inicializarModais();
    }

    // ========== PRODUTOS RECENTES ==========

    carregarProdutos() {
        // Simulação de dados dinâmicos dos produtos
        const produtos = [
            {
                id: 1,
                nome: "Tênis Nike Air Max",
                descricao: "Tênis esportivo em ótimo estado",
                preco: 199.90,
                estoque: 3,
                status: "active",
                imagem: "img/tenis-nike.avif",
                vendasHoje: 2,
                visualizacoes: 45
            },
            {
                id: 2,
                nome: "Vestido Floral",
                descricao: "Vestido floral estampado, tamanho M",
                preco: 89.90,
                estoque: 5,
                status: "active",
                imagem: "img/vestido-floral.jpg",
                vendasHoje: 1,
                visualizacoes: 32
            },
            {
                id: 3,
                nome: "Liquidificador",
                descricao: "Liquidificador 6 velocidades",
                preco: 129.90,
                estoque: 1,
                status: "warning",
                imagem: "img/liquidificador-phill.jpg",
                vendasHoje: 0,
                visualizacoes: 28
            },
            {
                id: 4,
                nome: "Camiseta Polo",
                descricao: "Camiseta polo azul marinho",
                preco: 59.90,
                estoque: 8,
                status: "active",
                imagem: "img/camiseta-polo.jpg",
                vendasHoje: 3,
                visualizacoes: 56
            }
        ];

        this.atualizarCardsProdutos(produtos);
    }

    atualizarCardsProdutos(produtos) {
        const productsGrid = document.querySelector('.recent-products-section .products-grid');
        if (!productsGrid) return;

        // Limpar grid atual
        productsGrid.innerHTML = '';

        // Renderizar produtos
        produtos.forEach(produto => {
            const card = this.criarCardProduto(produto);
            productsGrid.appendChild(card);
        });
    }

    criarCardProduto(produto) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = produto.id;
        
        const statusClass = produto.status === 'active' ? 'active' : 'warning';
        const statusText = produto.status === 'active' ? 'Ativo' : 'Baixo Estoque';
        const btnAction = produto.status === 'warning' 
            ? '<button class="btn btn-sm btn-warning btn-repor"><i class="bi bi-box-arrow-up"></i> Repor</button>'
            : '<button class="btn btn-sm btn-primary btn-estatisticas"><i class="bi bi-bar-chart"></i> Ver Estatísticas</button>';

        card.innerHTML = `
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <div class="product-status ${statusClass}">${statusText}</div>
                <button class="btn-favorito" title="Adicionar aos favoritos">
                    <i class="bi bi-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <p class="product-description">${produto.descricao}</p>
                
                <div class="product-stats">
                    <span class="stat-item">
                        <i class="bi bi-eye"></i> ${produto.visualizacoes} views
                    </span>
                    <span class="stat-item">
                        <i class="bi bi-cart"></i> ${produto.vendasHoje} vendas
                    </span>
                </div>
                
                <div class="product-meta">
                    <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
                    <span class="product-stock ${produto.estoque <= 3 ? 'low-stock' : ''}">
                        <i class="bi bi-box"></i> Estoque: ${produto.estoque}
                    </span>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-sm btn-outline btn-editar">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    ${btnAction}
                    <button class="btn btn-sm btn-outline btn-duplicar" title="Duplicar produto">
                        <i class="bi bi-files"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    // ========== VENDAS RECENTES ==========

    carregarVendas() {
        // Simulação de dados dinâmicos das vendas
        const vendas = [
            {
                id: "00123",
                cliente: "João Silva",
                produto: "Tênis Nike Air Max",
                valor: 199.90,
                status: "completed",
                data: "2024-01-25 14:30",
                pagamento: "Crédito",
                envio: "Correios"
            },
            {
                id: "00122",
                cliente: "Maria Santos",
                produto: "Vestido Floral",
                valor: 89.90,
                status: "shipped",
                data: "2024-01-25 11:15",
                pagamento: "PIX",
                envio: "Jadlog"
            },
            {
                id: "00121",
                cliente: "Carlos Oliveira",
                produto: "Camiseta Polo",
                valor: 59.90,
                status: "pending",
                data: "2024-01-25 09:45",
                pagamento: "Boleto",
                envio: "Aguardando"
            },
            {
                id: "00120",
                cliente: "Ana Pereira",
                produto: "Liquidificador",
                valor: 129.90,
                status: "processing",
                data: "2024-01-24 16:20",
                pagamento: "Débito",
                envio: "Preparando"
            },
            {
                id: "00119",
                cliente: "Pedro Costa",
                produto: "Camiseta Polo",
                valor: 59.90,
                status: "completed",
                data: "2024-01-24 14:10",
                pagamento: "Crédito",
                envio: "Entregue"
            }
        ];

        this.atualizarTabelaVendas(vendas);
        this.atualizarResumoVendas(vendas);
    }

    atualizarTabelaVendas(vendas) {
        const tableBody = document.querySelector('.sales-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        vendas.forEach(venda => {
            const row = this.criarLinhaVenda(venda);
            tableBody.appendChild(row);
        });
    }

    criarLinhaVenda(venda) {
        const row = document.createElement('tr');
        row.dataset.orderId = venda.id;

        const statusClasses = {
            'completed': 'completed',
            'shipped': 'shipped',
            'pending': 'pending',
            'processing': 'processing'
        };

        const statusTextos = {
            'completed': 'Concluído',
            'shipped': 'Enviado',
            'pending': 'Pendente',
            'processing': 'Processando'
        };

        const iconesAcao = {
            'completed': 'bi-eye',
            'shipped': 'bi-truck',
            'pending': 'bi-check-circle',
            'processing': 'bi-arrow-clockwise'
        };

        const titulosAcao = {
            'completed': 'Ver detalhes',
            'shipped': 'Rastrear',
            'pending': 'Processar',
            'processing': 'Atualizar'
        };

        row.innerHTML = `
            <td><span class="order-id">#${venda.id}</span></td>
            <td>
                <div class="cliente-info">
                    <strong>${venda.cliente}</strong>
                    <small>${venda.data}</small>
                </div>
            </td>
            <td>${venda.produto}</td>
            <td class="valor-destaque">R$ ${venda.valor.toFixed(2)}</td>
            <td>
                <span class="status-badge ${statusClasses[venda.status]}">
                    ${statusTextos[venda.status]}
                </span>
                <span class="pagamento-badge">${venda.pagamento}</span>
            </td>
            <td>
                <div class="acoes-venda">
                    <button class="btn-icon btn-ver-detalhes" title="${titulosAcao[venda.status]}" data-status="${venda.status}">
                        <i class="bi ${iconesAcao[venda.status]}"></i>
                    </button>
                    <button class="btn-icon btn-imprimir" title="Imprimir nota">
                        <i class="bi bi-printer"></i>
                    </button>
                    <button class="btn-icon btn-comunicar" title="Comunicar comprador">
                        <i class="bi bi-chat"></i>
                    </button>
                </div>
            </td>
        `;

        return row;
    }

    atualizarResumoVendas(vendas) {
        // Atualizar cards de resumo com dados reais
        const vendasHoje = vendas.filter(v => v.data.includes('2024-01-25')).length;
        const valorHoje = vendas
            .filter(v => v.data.includes('2024-01-25'))
            .reduce((acc, v) => acc + v.valor, 0);
        
        const pendentes = vendas.filter(v => v.status === 'pending' || v.status === 'processing').length;

        // Atualizar cards se existirem
        const cardVendas = document.querySelector('.summary-card .summary-value');
        if (cardVendas) {
            const cardVendasHoje = document.querySelector('.summary-icon.sales').parentElement.querySelector('.summary-value');
            if (cardVendasHoje) cardVendasHoje.textContent = `R$ ${valorHoje.toFixed(2)}`;
        }

        const cardPendentes = document.querySelectorAll('.summary-card')[2];
        if (cardPendentes) {
            const valorPendentes = cardPendentes.querySelector('.summary-value');
            if (valorPendentes) valorPendentes.textContent = pendentes;
        }
    }

    // ========== EVENT LISTENERS ==========

    setupEventListeners() {
        // Eventos para produtos (delegação)
        document.addEventListener('click', (e) => {
            // Botão Editar
            if (e.target.closest('.btn-editar')) {
                const card = e.target.closest('.product-card');
                this.abrirModalEdicao(card);
            }
            
            // Botão Estatísticas
            if (e.target.closest('.btn-estatisticas')) {
                const card = e.target.closest('.product-card');
                this.verEstatisticas(card);
            }
            
            // Botão Repor
            if (e.target.closest('.btn-repor')) {
                const card = e.target.closest('.product-card');
                this.abrirModalReposicao(card);
            }
            
            // Botão Duplicar
            if (e.target.closest('.btn-duplicar')) {
                const card = e.target.closest('.product-card');
                this.duplicarProduto(card);
            }
            
            // Botão Favorito
            if (e.target.closest('.btn-favorito')) {
                const btn = e.target.closest('.btn-favorito');
                this.toggleFavorito(btn);
            }
        });

        // Eventos para vendas (delegação)
        document.addEventListener('click', (e) => {
            // Botão Ver detalhes / Rastrear / Processar
            if (e.target.closest('.btn-ver-detalhes')) {
                const btn = e.target.closest('.btn-ver-detalhes');
                const row = btn.closest('tr');
                this.processarAcaoVenda(btn, row);
            }
            
            // Botão Imprimir
            if (e.target.closest('.btn-imprimir')) {
                const row = e.target.closest('tr');
                this.imprimirNota(row);
            }
            
            // Botão Comunicar
            if (e.target.closest('.btn-comunicar')) {
                const row = e.target.closest('tr');
                this.comunicarComprador(row);
            }
        });

        // Botão "Ver Histórico"
        const verHistorico = document.querySelector('.recent-sales-section .btn-outline');
        if (verHistorico) {
            verHistorico.addEventListener('click', () => {
                this.showNotification('📋 Carregando histórico completo de vendas...', 'info');
                setTimeout(() => {
                    window.location.href = 'vendedor-vendas.html';
                }, 800);
            });
        }
    }

    adicionarAcoesRapidas() {
        // Adicionar barra de ações rápidas na seção de produtos
        const sectionHeader = document.querySelector('.recent-products-section .section-header');
        if (sectionHeader) {
            const acoesRapidas = document.createElement('div');
            acoesRapidas.className = 'acoes-rapidas';
            acoesRapidas.style.display = 'flex';
            acoesRapidas.style.gap = '0.5rem';
            acoesRapidas.innerHTML = `
                <button class="btn btn-sm btn-outline btn-ordenar">
                    <i class="bi bi-arrow-down-up"></i> Ordenar
                </button>
                <button class="btn btn-sm btn-outline btn-filtrar">
                    <i class="bi bi-funnel"></i> Filtrar
                </button>
                <button class="btn btn-sm btn-success">
                    <i class="bi bi-plus-circle"></i> Novo
                </button>
            `;
            sectionHeader.appendChild(acoesRapidas);

            // Event listener para ordenar
            acoesRapidas.querySelector('.btn-ordenar').addEventListener('click', () => {
                this.mostrarOpcoesOrdenacao();
            });
        }
    }

    // ========== FUNÇÕES DOS PRODUTOS ==========

    abrirModalEdicao(card) {
        const titulo = card.querySelector('.product-title').textContent;
        const preco = card.querySelector('.product-price').textContent;
        const estoque = card.querySelector('.product-stock').textContent.replace(/\D/g, '');
        
        const modal = this.criarModal(
            'Editar Produto',
            'bi-pencil-square',
            `
            <form id="formEdicaoProduto">
                <div class="form-group">
                    <label><i class="bi bi-tag"></i> Nome do Produto</label>
                    <input type="text" class="form-control" value="${titulo}" placeholder="Digite o nome do produto">
                </div>
                
                <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                    <div class="form-group">
                        <label><i class="bi bi-currency-dollar"></i> Preço</label>
                        <div style="display: flex; align-items: center;">
                            <span style="margin-right: 0.5rem;">R$</span>
                            <input type="number" class="form-control" value="${preco.replace('R$', '').trim()}" step="0.01" min="0">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="bi bi-box"></i> Estoque</label>
                        <input type="number" class="form-control" value="${estoque}" min="0">
                    </div>
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label><i class="bi bi-card-text"></i> Descrição</label>
                    <textarea class="form-control" rows="3" placeholder="Descreva o produto...">${card.querySelector('.product-description').textContent}</textarea>
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label><i class="bi bi-tags"></i> Categoria</label>
                    <select class="form-control">
                        <option>Moda</option>
                        <option>Eletrônicos</option>
                        <option>Casa e Cozinha</option>
                        <option>Esportes</option>
                    </select>
                </div>
            </form>
            `,
            [
                { text: 'Cancelar', class: 'btn-secondary', action: 'close' },
                { text: 'Salvar Alterações', class: 'btn-primary', action: 'save' }
            ]
        );

        document.body.appendChild(modal);
        
        // Evento salvar
        const saveBtn = modal.querySelector('.btn-primary');
        saveBtn.addEventListener('click', () => {
            modal.remove();
            this.showNotification('✨ Produto atualizado com sucesso!', 'success');
            
            // Simular atualização visual
            setTimeout(() => {
                this.showNotification('🔄 Alterações publicadas na loja', 'success');
            }, 500);
        });
    }

    abrirModalReposicao(card) {
        const produto = card.querySelector('.product-title').textContent;
        const estoqueAtual = card.querySelector('.product-stock').textContent.replace(/\D/g, '');
        
        const modal = this.criarModal(
            'Repor Estoque',
            'bi-box-arrow-up',
            `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="background: rgba(255, 123, 0, 0.1); padding: 1rem; border-radius: var(--border-radius-md);">
                    <i class="bi bi-exclamation-triangle" style="color: var(--seller-orange); font-size: 2rem;"></i>
                    <p style="margin-top: 0.5rem; font-weight: 600;">${produto}</p>
                    <p style="color: var(--seller-orange); font-weight: 700;">Estoque atual: ${estoqueAtual} unidade(s)</p>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
                    <i class="bi bi-plus-circle"></i> Quantidade a adicionar:
                </label>
                
                <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <button type="button" class="btn btn-outline btn-quantidade" data-qty="5">+5</button>
                    <button type="button" class="btn btn-outline btn-quantidade" data-qty="10">+10</button>
                    <button type="button" class="btn btn-outline btn-quantidade" data-qty="20">+20</button>
                    <button type="button" class="btn btn-outline btn-quantidade" data-qty="50">+50</button>
                </div>
                
                <input type="number" id="quantidadeReposicao" class="form-control" value="10" min="1" style="width: 100%; padding: 0.75rem;">
            </div>
            
            <div style="background: var(--light-gray-2); padding: 1rem; border-radius: var(--border-radius-md);">
                <p style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="bi bi-info-circle"></i>
                    <small>Após a reposição, o produto será reativado imediatamente.</small>
                </p>
            </div>
            `,
            [
                { text: 'Cancelar', class: 'btn-secondary', action: 'close' },
                { text: 'Confirmar Reposição', class: 'btn-warning', action: 'confirm' }
            ]
        );

        document.body.appendChild(modal);
        
        // Botões de quantidade rápida
        modal.querySelectorAll('.btn-quantidade').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelector('#quantidadeReposicao').value = btn.dataset.qty;
            });
        });
        
        // Evento confirmar
        const confirmBtn = modal.querySelector('.btn-warning');
        confirmBtn.addEventListener('click', () => {
            const qty = modal.querySelector('#quantidadeReposicao').value;
            modal.remove();
            
            // Atualizar visual
            const stockSpan = card.querySelector('.product-stock');
            const newStock = parseInt(estoqueAtual) + parseInt(qty);
            stockSpan.innerHTML = `<i class="bi bi-box"></i> Estoque: ${newStock}`;
            
            // Remover status de warning se necessário
            if (newStock > 3) {
                const statusBadge = card.querySelector('.product-status');
                statusBadge.className = 'product-status active';
                statusBadge.textContent = 'Ativo';
                
                // Trocar botão de "Repor" por "Ver Estatísticas"
                const actionsDiv = card.querySelector('.product-actions');
                const reporBtn = actionsDiv.querySelector('.btn-repor');
                if (reporBtn) {
                    reporBtn.outerHTML = '<button class="btn btn-sm btn-primary btn-estatisticas"><i class="bi bi-bar-chart"></i> Ver Estatísticas</button>';
                }
            }
            
            this.showNotification(`✅ Estoque atualizado: +${qty} unidades`, 'success');
        });
    }

    duplicarProduto(card) {
        const nome = card.querySelector('.product-title').textContent;
        
        this.showConfirmacao(
            'Duplicar Produto',
            `Deseja criar uma cópia de "${nome}"?`,
            () => {
                // Clonar o card
                const novoCard = card.cloneNode(true);
                
                // Atualizar ID e título
                const title = novoCard.querySelector('.product-title');
                title.textContent = `${nome} (Cópia)`;
                
                // Zerar estatísticas
                novoCard.dataset.productId = Date.now();
                
                // Adicionar ao grid
                const grid = document.querySelector('.recent-products-section .products-grid');
                grid.appendChild(novoCard);
                
                this.showNotification('📋 Produto duplicado com sucesso!', 'success');
            }
        );
    }

    verEstatisticas(card) {
        const produto = card.querySelector('.product-title').textContent;
        
        const modal = this.criarModal(
            'Estatísticas do Produto',
            'bi-bar-chart',
            `
            <div style="display: grid; gap: 1rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, var(--seller-blue), var(--seller-blue-light)); color: white; padding: 1rem; border-radius: var(--border-radius-md);">
                        <i class="bi bi-eye" style="font-size: 1.5rem;"></i>
                        <h4 style="margin: 0.5rem 0 0; font-size: 1.8rem;">156</h4>
                        <p style="margin: 0; opacity: 0.9;">Visualizações</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, var(--seller-green), var(--seller-green-light)); color: white; padding: 1rem; border-radius: var(--border-radius-md);">
                        <i class="bi bi-cart" style="font-size: 1.5rem;"></i>
                        <h4 style="margin: 0.5rem 0 0; font-size: 1.8rem;">23</h4>
                        <p style="margin: 0; opacity: 0.9;">Vendas</p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background: linear-gradient(135deg, var(--seller-purple), var(--seller-purple-light)); color: white; padding: 1rem; border-radius: var(--border-radius-md);">
                        <i class="bi bi-star" style="font-size: 1.5rem;"></i>
                        <h4 style="margin: 0.5rem 0 0; font-size: 1.8rem;">4.8</h4>
                        <p style="margin: 0; opacity: 0.9;">Avaliação</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, var(--seller-orange), var(--seller-orange-light)); color: white; padding: 1rem; border-radius: var(--border-radius-md);">
                        <i class="bi bi-heart" style="font-size: 1.5rem;"></i>
                        <h4 style="margin: 0.5rem 0 0; font-size: 1.8rem;">12</h4>
                        <p style="margin: 0; opacity: 0.9;">Favoritos</p>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; padding: 1rem; background: var(--light-gray-2); border-radius: var(--border-radius-md);">
                    <p style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="bi bi-clock-history"></i>
                        <strong>Última venda:</strong> Hoje às 14:30
                    </p>
                </div>
            </div>
            `,
            [
                { text: 'Fechar', class: 'btn-secondary', action: 'close' },
                { text: 'Ver Relatório Completo', class: 'btn-primary', action: 'report' }
            ]
        );

        document.body.appendChild(modal);
        
        const reportBtn = modal.querySelector('.btn-primary');
        reportBtn.addEventListener('click', () => {
            modal.remove();
            this.showNotification('📊 Gerando relatório detalhado...', 'info');
            setTimeout(() => {
                window.location.href = `vendedor-estatisticas.html?produto=${encodeURIComponent(produto)}`;
            }, 800);
        });
    }

    toggleFavorito(btn) {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('bi-heart')) {
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
            btn.style.color = 'var(--primary-red)';
            this.showNotification('❤️ Adicionado aos favoritos', 'success');
        } else {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
            btn.style.color = '';
            this.showNotification('Removido dos favoritos', 'info');
        }
    }

    // ========== FUNÇÕES DAS VENDAS ==========

    processarAcaoVenda(btn, row) {
        const status = btn.dataset.status;
        const orderId = row.dataset.orderId;
        const cliente = row.querySelector('td:nth-child(2) strong').textContent;
        const produto = row.querySelector('td:nth-child(3)').textContent;
        
        switch(status) {
            case 'pending':
                this.processarPedido(row, orderId, cliente, produto);
                break;
            case 'processing':
                this.atualizarStatusEnvio(row, orderId);
                break;
            case 'shipped':
                this.rastrearEntrega(orderId);
                break;
            case 'completed':
                this.verDetalhesPedido(orderId);
                break;
        }
    }

    processarPedido(row, orderId, cliente, produto) {
        const modal = this.criarModal(
            'Processar Pedido',
            'bi-check-circle',
            `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="background: rgba(0, 102, 204, 0.1); padding: 1rem; border-radius: var(--border-radius-md);">
                    <p><strong>Pedido #${orderId}</strong></p>
                    <p>Cliente: ${cliente}</p>
                    <p>Produto: ${produto}</p>
                </div>
            </div>
            
            <div class="form-group">
                <label><i class="bi bi-truck"></i> Status do Envio</label>
                <select class="form-control" id="statusEnvio">
                    <option value="processing">Processando pagamento</option>
                    <option value="preparing">Preparando pedido</option>
                    <option value="shipped">Enviar para transportadora</option>
                </select>
            </div>
            
            <div class="form-group" style="margin-top: 1rem;">
                <label><i bi bi-chat"></i> Mensagem para o comprador (opcional)</label>
                <textarea class="form-control" rows="2" placeholder="Adicione uma mensagem..."></textarea>
            </div>
            `,
            [
                { text: 'Cancelar', class: 'btn-secondary', action: 'close' },
                { text: 'Confirmar Processamento', class: 'btn-primary', action: 'confirm' }
            ]
        );

        document.body.appendChild(modal);
        
        const confirmBtn = modal.querySelector('.btn-primary');
        confirmBtn.addEventListener('click', () => {
            const status = modal.querySelector('#statusEnvio').value;
            modal.remove();
            
            // Atualizar status na tabela
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge processing';
            statusBadge.textContent = 'Processando';
            
            // Atualizar botão de ação
            const acaoBtn = row.querySelector('.btn-ver-detalhes');
            acaoBtn.dataset.status = 'processing';
            acaoBtn.querySelector('i').className = 'bi bi-arrow-clockwise';
            acaoBtn.title = 'Atualizar';
            
            this.showNotification('✅ Pedido processado com sucesso!', 'success');
        });
    }

    atualizarStatusEnvio(row, orderId) {
        const modal = this.criarModal(
            'Atualizar Status de Envio',
            'bi-truck',
            `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; background: var(--seller-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="bi bi-box"></i>
                    </div>
                    <div>
                        <strong>Pedido #${orderId}</strong>
                        <p style="margin: 0; color: var(--text-light);">Atualize o status de entrega</p>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Status da Entrega</label>
                    <select class="form-control">
                        <option value="shipped">Enviado</option>
                        <option value="in_transit">Em trânsito</option>
                        <option value="out_for_delivery">Saiu para entrega</option>
                        <option value="delivered">Entregue</option>
                    </select>
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label>Código de Rastreio</label>
                    <input type="text" class="form-control" placeholder="Ex: BR123456789">
                </div>
                
                <div class="form-group" style="margin-top: 1rem;">
                    <label>Transportadora</label>
                    <select class="form-control">
                        <option>Correios</option>
                        <option>Jadlog</option>
                        <option>Total Express</option>
                        <option>Loggi</option>
                    </select>
                </div>
            </div>
            `,
            [
                { text: 'Cancelar', class: 'btn-secondary', action: 'close' },
                { text: 'Atualizar Envio', class: 'btn-primary', action: 'update' }
            ]
        );

        document.body.appendChild(modal);
        
        const updateBtn = modal.querySelector('.btn-primary');
        updateBtn.addEventListener('click', () => {
            modal.remove();
            
            // Atualizar status na tabela
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.className = 'status-badge shipped';
            statusBadge.textContent = 'Enviado';
            
            // Atualizar botão
            const acaoBtn = row.querySelector('.btn-ver-detalhes');
            acaoBtn.dataset.status = 'shipped';
            acaoBtn.querySelector('i').className = 'bi bi-truck';
            acaoBtn.title = 'Rastrear';
            
            this.showNotification('📦 Status de envio atualizado!', 'success');
        });
    }

    rastrearEntrega(orderId) {
        this.showNotification(`🔍 Rastreando pedido #${orderId}...`, 'info');
        
        // Simular janela de rastreamento
        setTimeout(() => {
            const modal = this.criarModal(
                'Rastrear Pedido',
                'bi-truck',
                `
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="background: linear-gradient(135deg, var(--seller-blue), var(--seller-purple)); color: white; padding: 1.5rem; border-radius: var(--border-radius-lg);">
                        <i class="bi bi-box-seam" style="font-size: 3rem;"></i>
                        <h4 style="margin: 0.5rem 0 0;">Pedido #${orderId}</h4>
                        <p style="margin: 0; opacity: 0.9;">BR123456789BR</p>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 10px; height: 10px; background: var(--seller-green); border-radius: 50%;"></div>
                        <div style="flex: 1;">
                            <strong>Pedido enviado</strong>
                            <p style="margin: 0; color: var(--text-light);">25/01/2024 14:30</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 10px; height: 10px; background: var(--seller-green); border-radius: 50%;"></div>
                        <div style="flex: 1;">
                            <strong>Em trânsito</strong>
                            <p style="margin: 0; color: var(--text-light);">25/01/2024 19:45</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <div style="width: 10px; height: 10px; background: var(--seller-blue); border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                        <div style="flex: 1;">
                            <strong>Saiu para entrega</strong>
                            <p style="margin: 0; color: var(--text-light);">26/01/2024 08:15</p>
                        </div>
                    </div>
                </div>
                `,
                [{ text: 'Fechar', class: 'btn-secondary', action: 'close' }]
            );
            
            document.body.appendChild(modal);
        }, 500);
    }

    verDetalhesPedido(orderId) {
        this.showNotification(`📋 Carregando detalhes do pedido #${orderId}...`, 'info');
        
        setTimeout(() => {
            window.location.href = `vendedor-pedido.html?id=${orderId}`;
        }, 800);
    }

    imprimirNota(row) {
        const orderId = row.dataset.orderId;
        const cliente = row.querySelector('td:nth-child(2) strong').textContent;
        const produto = row.querySelector('td:nth-child(3)').textContent;
        const valor = row.querySelector('td:nth-child(4)').textContent;
        
        this.showNotification('🖨️ Gerando nota fiscal...', 'info');
        
        // Simular impressão
        setTimeout(() => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Nota Fiscal - Pedido #${orderId}</title>
                        <style>
                            body { font-family: Arial; padding: 40px; }
                            .header { text-align: center; margin-bottom: 30px; }
                            .content { border: 1px solid #ccc; padding: 20px; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>ReUse - Nota Fiscal</h1>
                            <p>Pedido #${orderId}</p>
                        </div>
                        <div class="content">
                            <p><strong>Cliente:</strong> ${cliente}</p>
                            <p><strong>Produto:</strong> ${produto}</p>
                            <p><strong>Valor:</strong> ${valor}</p>
                            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
                        </div>
                    </body>
                </html>
            `);
            printWindow.print();
            
            this.showNotification('✅ Nota fiscal gerada com sucesso!', 'success');
        }, 1000);
    }

    comunicarComprador(row) {
        const cliente = row.querySelector('td:nth-child(2) strong').textContent;
        const produto = row.querySelector('td:nth-child(3)').textContent;
        
        const modal = this.criarModal(
            'Comunicar Comprador',
            'bi-chat',
            `
            <div style="margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--light-gray-2); border-radius: var(--border-radius-md);">
                    <i class="bi bi-person-circle" style="font-size: 2rem; color: var(--seller-blue);"></i>
                    <div>
                        <strong>${cliente}</strong>
                        <p style="margin: 0; color: var(--text-light);">${produto}</p>
                    </div>
                </div>
                
                <div style="margin-top: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Mensagem</label>
                    <textarea class="form-control" rows="4" placeholder="Digite sua mensagem para o comprador..."></textarea>
                </div>
                
                <div style="margin-top: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Tipo de mensagem</label>
                    <select class="form-control">
                        <option>Atualização do pedido</option>
                        <option>Dúvida sobre o produto</option>
                        <option>Problema com a entrega</option>
                        <option>Promoção especial</option>
                    </select>
                </div>
            </div>
            `,
            [
                { text: 'Cancelar', class: 'btn-secondary', action: 'close' },
                { text: 'Enviar Mensagem', class: 'btn-primary', action: 'send' }
            ]
        );

        document.body.appendChild(modal);
        
        const sendBtn = modal.querySelector('.btn-primary');
        sendBtn.addEventListener('click', () => {
            const mensagem = modal.querySelector('textarea').value;
            modal.remove();
            
            if (mensagem.trim()) {
                this.showNotification(`✉️ Mensagem enviada para ${cliente}!`, 'success');
            } else {
                this.showNotification('Por favor, digite uma mensagem', 'warning');
            }
        });
    }

    mostrarOpcoesOrdenacao() {
        const modal = this.criarModal(
            'Ordenar Produtos',
            'bi-arrow-down-up',
            `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <button class="btn btn-outline opcao-ordem" data-ordem="recentes" style="justify-content: flex-start;">
                    <i class="bi bi-clock"></i> Mais recentes
                </button>
                <button class="btn btn-outline opcao-ordem" data-ordem="preco-menor" style="justify-content: flex-start;">
                    <i class="bi bi-arrow-up"></i> Menor preço
                </button>
                <button class="btn btn-outline opcao-ordem" data-ordem="preco-maior" style="justify-content: flex-start;">
                    <i class="bi bi-arrow-down"></i> Maior preço
                </button>
                <button class="btn btn-outline opcao-ordem" data-ordem="estoque" style="justify-content: flex-start;">
                    <i class="bi bi-box"></i> Estoque
                </button>
                <button class="btn btn-outline opcao-ordem" data-ordem="vendas" style="justify-content: flex-start;">
                    <i class="bi bi-graph-up"></i> Mais vendidos
                </button>
            </div>
            `,
            [{ text: 'Cancelar', class: 'btn-secondary', action: 'close' }]
        );

        document.body.appendChild(modal);
        
        modal.querySelectorAll('.opcao-ordem').forEach(btn => {
            btn.addEventListener('click', () => {
                const ordem = btn.dataset.ordem;
                modal.remove();
                this.showNotification(`📊 Ordenando por: ${btn.textContent.trim()}`, 'info');
                
                // Simular ordenação
                setTimeout(() => {
                    this.carregarProdutos(); // Recarrega com nova ordenação
                }, 500);
            });
        });
    }

    // ========== UTILITÁRIOS ==========

    criarModal(titulo, icone, conteudo, botoes = []) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 550px; animation: slideInUp 0.3s ease;">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="bi ${icone}"></i> 
                        ${titulo}
                    </h3>
                    <button class="modal-close close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${conteudo}
                </div>
                <div class="modal-actions" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    ${botoes.map(btn => `
                        <button class="btn ${btn.class} ${btn.action}-modal-btn">${btn.text}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Event listeners para fechar
        modal.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
        
        botoes.forEach(btn => {
            if (btn.action === 'close') {
                modal.querySelectorAll(`.${btn.action}-modal-btn`).forEach(btnElement => {
                    btnElement.addEventListener('click', () => modal.remove());
                });
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        return modal;
    }

    showConfirmacao(titulo, mensagem, callbackConfirmar) {
        const modal = this.criarModal(
            titulo,
            'bi-question-circle',
            `<p style="font-size: 1.1rem; text-align: center; margin: 1rem 0;">${mensagem}</p>`,
            [
                { text: 'Não', class: 'btn-secondary', action: 'close' },
                { text: 'Sim', class: 'btn-primary', action: 'confirm' }
            ]
        );
        
        document.body.appendChild(modal);
        
        const confirmBtn = modal.querySelector('.confirm-modal-btn');
        confirmBtn.addEventListener('click', () => {
            modal.remove();
            callbackConfirmar();
        });
    }

    showNotification(mensagem, tipo = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.notification-dinamica').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification-dinamica ${tipo}`;
        
        const icones = {
            success: 'bi-check-circle',
            error: 'bi-x-circle',
            warning: 'bi-exclamation-circle',
            info: 'bi-info-circle'
        };
        
        notification.innerHTML = `
            <i class="bi ${icones[tipo]}"></i>
            <span>${mensagem}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: tipo === 'success' ? 'linear-gradient(135deg, #00cc99, #009973)' : 
                       tipo === 'error' ? 'linear-gradient(135deg, #ff4757, #ee3e4a)' : 
                       tipo === 'warning' ? 'linear-gradient(135deg, #ffa502, #ff8c00)' : 
                       'linear-gradient(135deg, #0066cc, #004d99)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    inicializarModais() {
        // Adicionar estilos CSS dinâmicos
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes slideInUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .product-stats {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.75rem;
                color: var(--text-light);
                font-size: 0.85rem;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .product-stock.low-stock {
                color: var(--seller-orange);
                font-weight: 700;
            }
            
            .btn-favorito {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: white;
                border: none;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-medium);
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                z-index: 10;
            }
            
            .btn-favorito:hover {
                transform: scale(1.1);
                color: var(--primary-red);
            }
            
            .btn-favorito i.bi-heart-fill {
                color: var(--primary-red);
            }
            
            .order-id {
                font-weight: 700;
                color: var(--seller-blue);
            }
            
            .cliente-info {
                display: flex;
                flex-direction: column;
            }
            
            .cliente-info small {
                color: var(--text-light);
                font-size: 0.8rem;
            }
            
            .valor-destaque {
                font-weight: 700;
                color: var(--seller-green);
            }
            
            .pagamento-badge {
                display: inline-block;
                margin-left: 0.5rem;
                padding: 0.15rem 0.5rem;
                background: var(--light-gray-2);
                border-radius: var(--border-radius-sm);
                font-size: 0.75rem;
                color: var(--text-medium);
            }
            
            .acoes-venda {
                display: flex;
                gap: 0.5rem;
            }
            
            .acoes-rapidas {
                display: flex;
                gap: 0.5rem;
                margin-left: 1rem;
            }
            
            .btn-success {
                background: var(--seller-green);
                color: white;
            }
            
            .btn-success:hover {
                background: var(--seller-green-dark);
                transform: translateY(-2px);
            }
            
            .form-control:focus {
                border-color: var(--seller-blue);
                outline: none;
                box-shadow: 0 0 0 3px rgba(0,102,204,0.1);
            }
            
            body.dark-mode .product-stats {
                color: var(--text-light);
            }
            
            body.dark-mode .btn-favorito {
                background: var(--dark-gray);
                color: white;
            }
            
            body.dark-mode .pagamento-badge {
                background: var(--light-gray-3);
                color: var(--text-medium);
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.gerenciadorProdutosVendas = new GerenciadorProdutosVendas();
});