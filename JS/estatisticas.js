        // Sistema de Estatísticas para Casa Usada
        let estatisticasCharts = {};

        // Função para obter produtos do localStorage
        function obterProdutos() {
            const produtosSalvos = localStorage.getItem('produtosCasaUsada');
            return produtosSalvos ? JSON.parse(produtosSalvos) : {};
        }

        // Função para calcular estatísticas
        function calcularEstatisticas() {
            const produtos = obterProdutos();
            const produtosArray = Object.values(produtos);
            
            // Filtrar apenas produtos ativos (não excluídos)
            const produtosAtivos = produtosArray.filter(p => p.status !== 'excluido');
            
            // Estatísticas básicas
            const totalProdutos = produtosAtivos.length;
            const produtosDisponiveis = produtosAtivos.filter(p => p.status === 'Disponível').length;
            const produtosVendidos = produtosAtivos.filter(p => p.status === 'Vendido').length;
            const produtosDoados = produtosAtivos.filter(p => p.status === 'Doado').length;
            
            // Receita total (apenas produtos vendidos)
            const receitaTotal = produtosAtivos
                .filter(p => p.status === 'Vendido')
                .reduce((total, produto) => total + produto.precoVista, 0);
            
            // Estatísticas por categoria
            const categorias = {};
            produtosAtivos.forEach(produto => {
                if (!categorias[produto.categoria]) {
                    categorias[produto.categoria] = {
                        total: 0,
                        vendidos: 0,
                        receita: 0
                    };
                }
                
                categorias[produto.categoria].total++;
                if (produto.status === 'Vendido') {
                    categorias[produto.categoria].vendidos++;
                    categorias[produto.categoria].receita += produto.precoVista;
                }
            });
            
            // Produtos mais vendidos (simulação)
            const produtosMaisVendidos = produtosAtivos
                .filter(p => p.status === 'Vendido')
                .sort((a, b) => b.precoVista - a.precoVista)
                .slice(0, 5);
            
            return {
                totalProdutos,
                produtosDisponiveis,
                produtosVendidos,
                produtosDoados,
                receitaTotal,
                categorias,
                produtosMaisVendidos
            };
        }

        // Função para atualizar cards de estatísticas
        function atualizarCardsEstatisticas() {
            const estatisticas = calcularEstatisticas();
            
            // Atualizar cards
            document.getElementById('receita-total').textContent = `R$ ${estatisticas.receitaTotal.toFixed(2)}`;
            document.getElementById('total-vendas').textContent = estatisticas.produtosVendidos;
            document.getElementById('produtos-disponiveis').textContent = estatisticas.produtosDisponiveis;
            
            // Simular visualizações (dados fictícios baseados no total de produtos)
            const visualizacoes = Math.floor(estatisticas.totalProdutos * 25);
            document.getElementById('total-visualizacoes').textContent = visualizacoes.toLocaleString();
            
            // Atualizar variações (simulação)
            atualizarVariacoes();
        }

        // Função para atualizar variações (simulação)
        function atualizarVariacoes() {
            const variacoes = [
                { id: 'variacao-receita', valor: Math.random() * 20 - 5 },
                { id: 'variacao-vendas', valor: Math.random() * 15 - 3 },
                { id: 'variacao-visualizacoes', valor: Math.random() * 25 - 5 },
                { id: 'variacao-estoque', valor: Math.random() * 10 - 2 }
            ];
            
            variacoes.forEach(variacao => {
                const elemento = document.getElementById(variacao.id);
                const valor = variacao.valor;
                const isPositive = valor >= 0;
                
                elemento.innerHTML = `
                    <i class="bi bi-arrow-${isPositive ? 'up' : 'down'}"></i> ${Math.abs(valor).toFixed(1)}%
                `;
                elemento.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
            });
        }

        // Função para atualizar tabela de produtos mais vendidos
        function atualizarTabelaProdutos() {
            const estatisticas = calcularEstatisticas();
            const tbody = document.getElementById('produtos-mais-vendidos');
            
            if (estatisticas.produtosMaisVendidos.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="no-products">
                            <div class="empty-state">
                                <i class="bi bi-graph-down"></i>
                                <h3>Nenhuma venda realizada</h3>
                                <p>Seus produtos vendidos aparecerão aqui.</p>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = estatisticas.produtosMaisVendidos.map((produto, index) => {
                // Simular dados adicionais para a tabela
                const visualizacoes = Math.floor(Math.random() * 100) + 50;
                const taxaConversao = ((1 / visualizacoes) * 100).toFixed(1);
                
                return `
                    <tr>
                        <td>
                            <div class="produto-info">
                                <img src="${produto.imagem}" alt="${produto.nome}" class="produto-thumb" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgyMFYzMEgzMFYyMFpNMzIgMzJIMThWMTguMDAwMUgzMlYzMlpNMzIgMzJIMThWMTguMDAwMUgzMlYzMloiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'">
                                <div class="produto-detalhes">
                                    <strong>${produto.nome}</strong>
                                    <small>${produto.descricao}</small>
                                </div>
                            </div>
                        </td>
                        <td>1</td>
                        <td>0</td>
                        <td>R$ ${produto.precoVista.toFixed(2)}</td>
                        <td>${taxaConversao}%</td>
                    </tr>
                `;
            }).join('');
        }

        // Função para inicializar gráficos
        function initCharts() {
            const estatisticas = calcularEstatisticas();
            
            // Destruir gráficos existentes
            Object.values(estatisticasCharts).forEach(chart => {
                if (chart) chart.destroy();
            });
            
            // Gráfico de Receita
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            estatisticasCharts.revenue = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
                    datasets: [{
                        label: 'Receita (R$)',
                        data: [120, 190, 300, 500, 200, 300, 450],
                        backgroundColor: 'rgba(33, 150, 243, 0.2)',
                        borderColor: 'rgba(33, 150, 243, 1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Gráfico de Categorias
            const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
            const categoriasData = Object.entries(estatisticas.categorias).map(([categoria, dados]) => ({
                categoria,
                vendidos: dados.vendidos
            }));
            
            estatisticasCharts.categories = new Chart(categoriesCtx, {
                type: 'doughnut',
                data: {
                    labels: categoriasData.map(item => item.categoria),
                    datasets: [{
                        data: categoriasData.map(item => item.vendidos || 1),
                        backgroundColor: [
                            'rgba(76, 175, 80, 0.7)',
                            'rgba(33, 150, 243, 0.7)',
                            'rgba(255, 152, 0, 0.7)',
                            'rgba(156, 39, 176, 0.7)',
                            'rgba(233, 30, 99, 0.7)'
                        ],
                        borderColor: [
                            'rgba(76, 175, 80, 1)',
                            'rgba(33, 150, 243, 1)',
                            'rgba(255, 152, 0, 1)',
                            'rgba(156, 39, 176, 1)',
                            'rgba(233, 30, 99, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        }
                    }
                }
            });

            // Gráfico de Desempenho de Vendas
            const salesCtx = document.getElementById('salesChart').getContext('2d');
            estatisticasCharts.sales = new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(estatisticas.categorias),
                    datasets: [
                        {
                            label: 'Visualizações',
                            data: Object.values(estatisticas.categorias).map(() => Math.floor(Math.random() * 100) + 50),
                            backgroundColor: 'rgba(33, 150, 243, 0.5)',
                            borderColor: 'rgba(33, 150, 243, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Vendas',
                            data: Object.values(estatisticas.categorias).map(cat => cat.vendidos),
                            backgroundColor: 'rgba(76, 175, 80, 0.5)',
                            borderColor: 'rgba(76, 175, 80, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Função para atualizar todas as estatísticas
        function atualizarEstatisticas() {
            atualizarCardsEstatisticas();
            atualizarTabelaProdutos();
            initCharts();
        }

        // Inicialização quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function () {
            // Configurar breadcrumbs
            if (typeof updateBreadcrumbs === 'function') {
                updateBreadcrumbs('Estatísticas');
            }

            // Mostrar/ocultar datas personalizadas
            document.getElementById('periodo').addEventListener('change', function () {
                const customDates = document.querySelector('.custom-dates');
                customDates.style.display = this.value === 'custom' ? 'flex' : 'none';
            });

            // Botão aplicar filtros
            document.getElementById('aplicar-filtros').addEventListener('click', function() {
                this.classList.add('loading');
                setTimeout(() => {
                    atualizarEstatisticas();
                    this.classList.remove('loading');
                    mostrarNotificacao('Filtros aplicados com sucesso!', 'success');
                }, 1000);
            });

            // Botão atualizar estatísticas
            document.getElementById('btn-refresh-estatisticas').addEventListener('click', function() {
                this.classList.add('loading');
                setTimeout(() => {
                    atualizarEstatisticas();
                    this.classList.remove('loading');
                    mostrarNotificacao('Estatísticas atualizadas!', 'success');
                }, 1000);
            });

            // Inicializar estatísticas
            atualizarEstatisticas();

            // Sincronizar com mudanças no localStorage
            window.addEventListener('storage', function(e) {
                if (e.key === 'produtosCasaUsada') {
                    atualizarEstatisticas();
                }
            });

            window.addEventListener('produtosAtualizados', function() {
                atualizarEstatisticas();
            });
        });

        // Função para mostrar notificações
        function mostrarNotificacao(mensagem, tipo = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert-notification alert-${tipo}`;
            notification.innerHTML = `
                <i class="bi bi-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                ${mensagem}
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
                notification.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }