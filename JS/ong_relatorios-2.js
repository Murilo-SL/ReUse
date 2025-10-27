// Dados de exemplo para demonstração - ATUALIZADO
const dadosDoacoes = [
    { data: '2025-01-15', doador: 'Maria Silva', categoria: 'Roupas', item: 'Camisetas', quantidade: 20, status: 'Distribuída', valorEstimado: 400 },
    { data: '2025-01-18', doador: 'João Santos', categoria: 'Alimentos', item: 'Arroz', quantidade: 50, status: 'Distribuída', valorEstimado: 250 },
    { data: '2025-01-20', doador: 'Ana Costa', categoria: 'Higiene', item: 'Sabonetes', quantidade: 100, status: 'Processamento', valorEstimado: 200 },
    { data: '2025-01-22', doador: 'Pedro Alves', categoria: 'Roupas', item: 'Calças', quantidade: 15, status: 'Recebida', valorEstimado: 450 },
    { data: '2025-01-25', doador: 'Carla Mendes', categoria: 'Alimentos', item: 'Feijão', quantidade: 30, status: 'Distribuída', valorEstimado: 150 },
    { data: '2025-01-28', doador: 'Roberto Lima', categoria: 'Livros', item: 'Livros Infantis', quantidade: 45, status: 'Recebida', valorEstimado: 675 },
    { data: '2025-02-01', doador: 'Fernanda Oliveira', categoria: 'Brinquedos', item: 'Bonecas', quantidade: 12, status: 'Processamento', valorEstimado: 240 },
    { data: '2025-02-05', doador: 'Ricardo Souza', categoria: 'Alimentos', item: 'Macarrão', quantidade: 40, status: 'Distribuída', valorEstimado: 120 },
    { data: '2025-02-08', doador: 'Amanda Rocha', categoria: 'Roupas', item: 'Casacos', quantidade: 8, status: 'Distribuída', valorEstimado: 320 },
    { data: '2025-02-12', doador: 'Marcos Ferreira', categoria: 'Higiene', item: 'Pasta de Dente', quantidade: 60, status: 'Recebida', valorEstimado: 180 },
    { data: '2025-02-15', doador: 'Patrícia Nunes', categoria: 'Brinquedos', item: 'Carrinhos', quantidade: 18, status: 'Processamento', valorEstimado: 360 },
    { data: '2025-02-18', doador: 'José Carvalho', categoria: 'Alimentos', item: 'Óleo de Cozinha', quantidade: 25, status: 'Distribuída', valorEstimado: 125 },
    { data: '2025-02-22', doador: 'Tatiana Dias', categoria: 'Livros', item: 'Livros Didáticos', quantidade: 30, status: 'Recebida', valorEstimado: 450 },
    { data: '2025-02-25', doador: 'Luiz Gonçalves', categoria: 'Roupas', item: 'Bermudas', quantidade: 22, status: 'Distribuída', valorEstimado: 440 },
    { data: '2025-02-28', doador: 'Sandra Martins', categoria: 'Higiene', item: 'Escovas de Dente', quantidade: 45, status: 'Processamento', valorEstimado: 225 }
];

// Configurações de paginação
let currentPage = 1;
const itemsPerPage = 5;
let filteredData = [...dadosDoacoes];
let charts = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página de relatórios...');
    
    // Inicializar gráficos
    inicializarGraficos();
    
    // Inicializar tabela
    renderizarTabela();
    
    // Inicializar resumo estatístico
    atualizarResumoEstatistico();
    
    // Configurar eventos
    configurarEventos();
    
    // Atualizar breadcrumb
    atualizarBreadcrumb();
});

// Inicializar gráficos - ATUALIZADO
function inicializarGraficos() {
    console.log('Inicializando gráficos...');
    
    // Dados calculados dinamicamente
    const dadosMensais = calcularDoacoesPorMes();
    const dadosCategorias = calcularItensPorCategoria();
    const dadosBeneficiarios = calcularDistribuicaoBeneficiarios();
    const dadosEvolucao = calcularEvolucaoDistribuicao();

    // Gráfico de Doações por Mês
    const ctxDoacoes = document.getElementById('doacoesChart');
    if (ctxDoacoes) {
        if (charts.doacoes) charts.doacoes.destroy();
        
        charts.doacoes = new Chart(ctxDoacoes, {
            type: 'bar',
            data: {
                labels: dadosMensais.meses,
                datasets: [{
                    label: 'Doações Recebidas',
                    data: dadosMensais.valores,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Doações Mensais'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade de Doações'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Itens por Categoria
    const ctxCategorias = document.getElementById('categoriasChart');
    if (ctxCategorias) {
        if (charts.categorias) charts.categorias.destroy();
        
        charts.categorias = new Chart(ctxCategorias, {
            type: 'pie',
            data: {
                labels: dadosCategorias.categorias,
                datasets: [{
                    data: dadosCategorias.quantidades,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Distribuição por Categoria'
                    }
                }
            }
        });
    }

    // Gráfico de Distribuição por Beneficiários
    const ctxBeneficiarios = document.getElementById('beneficiariosChart');
    if (ctxBeneficiarios) {
        if (charts.beneficiarios) charts.beneficiarios.destroy();
        
        charts.beneficiarios = new Chart(ctxBeneficiarios, {
            type: 'doughnut',
            data: {
                labels: dadosBeneficiarios.beneficiarios,
                datasets: [{
                    data: dadosBeneficiarios.percentuais,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Distribuição por Beneficiários'
                    }
                }
            }
        });
    }

    // Gráfico de Evolução de Distribuição
    const ctxDistribuicao = document.getElementById('distribuicaoChart');
    if (ctxDistribuicao) {
        if (charts.distribuicao) charts.distribuicao.destroy();
        
        charts.distribuicao = new Chart(ctxDistribuicao, {
            type: 'line',
            data: {
                labels: dadosEvolucao.meses,
                datasets: [{
                    label: 'Itens Distribuídos',
                    data: dadosEvolucao.valores,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Evolução Mensal de Distribuição'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade de Itens'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Meses'
                        }
                    }
                }
            }
        });
    }
}

// Funções de cálculo de dados para gráficos
function calcularDoacoesPorMes() {
    const doacoesPorMes = {};
    
    filteredData.forEach(doacao => {
        const mes = new Date(doacao.data).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
        if (!doacoesPorMes[mes]) {
            doacoesPorMes[mes] = 0;
        }
        doacoesPorMes[mes]++;
    });
    
    return {
        meses: Object.keys(doacoesPorMes),
        valores: Object.values(doacoesPorMes)
    };
}

function calcularItensPorCategoria() {
    const itensPorCategoria = {};
    
    filteredData.forEach(doacao => {
        if (!itensPorCategoria[doacao.categoria]) {
            itensPorCategoria[doacao.categoria] = 0;
        }
        itensPorCategoria[doacao.categoria] += doacao.quantidade;
    });
    
    return {
        categorias: Object.keys(itensPorCategoria),
        quantidades: Object.values(itensPorCategoria)
    };
}

function calcularDistribuicaoBeneficiarios() {
    // Simulação de dados de beneficiários
    const beneficiarios = ['Lar Infantil', 'Asilo São Francisco', 'Comunidade Carente', 'Abrigo de Animais', 'Outros'];
    const percentuais = [35, 25, 20, 15, 5];
    
    return {
        beneficiarios: beneficiarios,
        percentuais: percentuais
    };
}

function calcularEvolucaoDistribuicao() {
    const distribuicaoPorMes = {};
    
    filteredData
        .filter(doacao => doacao.status === 'Distribuída')
        .forEach(doacao => {
            const mes = new Date(doacao.data).toLocaleDateString('pt-BR', { month: 'short' });
            if (!distribuicaoPorMes[mes]) {
                distribuicaoPorMes[mes] = 0;
            }
            distribuicaoPorMes[mes] += doacao.quantidade;
        });
    
    const mesesOrdenados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const valoresOrdenados = mesesOrdenados.map(mes => distribuicaoPorMes[mes] || 0);
    
    return {
        meses: mesesOrdenados,
        valores: valoresOrdenados
    };
}

// Renderizar tabela com paginação - ATUALIZADO
function renderizarTabela() {
    const tableBody = document.getElementById('table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    if (paginatedData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="bi bi-search" style="font-size: 48px; color: #dee2e6;"></i>
                        <h3 style="color: #6c757d; margin: 15px 0;">Nenhum dado encontrado</h3>
                        <p style="color: #adb5bd;">Tente ajustar os filtros para ver os resultados.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    paginatedData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-item-id', startIndex + index);
        
        // Formatar a data para exibição
        const dataFormatada = new Date(item.data).toLocaleDateString('pt-BR');
        
        // Determinar a classe CSS com base no status
        let statusClass = '';
        let statusIcon = '';
        if (item.status === 'Recebida') {
            statusClass = 'recebida';
            statusIcon = 'bi-box-seam';
        } else if (item.status === 'Processamento') {
            statusClass = 'processamento';
            statusIcon = 'bi-gear';
        } else if (item.status === 'Distribuída') {
            statusClass = 'distribuida';
            statusIcon = 'bi-check-circle';
        }
        
        row.innerHTML = `
            <td>${dataFormatada}</td>
            <td>
                <div class="doador-info">
                    <i class="bi bi-person-circle"></i>
                    <span>${item.doador}</span>
                </div>
            </td>
            <td>
                <span class="categoria-badge">${item.categoria}</span>
            </td>
            <td>${item.item}</td>
            <td>
                <span class="quantidade">${item.quantidade}</span>
            </td>
            <td>
                <span class="valor-estimado">R$ ${item.valorEstimado || 0}</span>
            </td>
            <td>
                <span class="status-badge ${statusClass}">
                    <i class="bi ${statusIcon}"></i>
                    ${item.status}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    atualizarControlesPaginacao();
}

// Atualizar controles de paginação - ATUALIZADO
function atualizarControlesPaginacao() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageNumbers = document.getElementById('page-numbers');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    if (!pageNumbers || !prevButton || !nextButton) return;
    
    // Atualizar botões de navegação
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    
    // Atualizar números de página
    pageNumbers.innerHTML = '';
    
    // Mostrar máximo 5 páginas
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageElement = document.createElement('div');
        pageElement.className = `pagination-page ${i === currentPage ? 'active' : ''}`;
        pageElement.textContent = i;
        pageElement.addEventListener('click', () => {
            currentPage = i;
            renderizarTabela();
            scrollToTable();
        });
        
        pageNumbers.appendChild(pageElement);
    }
    
    // Atualizar informações de página
    const pageInfo = document.getElementById('page-info');
    if (!pageInfo) {
        const paginationContainer = document.getElementById('pagination-controls');
        if (paginationContainer) {
            const infoElement = document.createElement('div');
            infoElement.id = 'page-info';
            infoElement.className = 'pagination-info';
            infoElement.textContent = `Página ${currentPage} de ${totalPages} - ${filteredData.length} registros`;
            paginationContainer.appendChild(infoElement);
        }
    } else {
        pageInfo.textContent = `Página ${currentPage} de ${totalPages} - ${filteredData.length} registros`;
    }
}

// Atualizar resumo estatístico - ATUALIZADO
function atualizarResumoEstatistico() {
    // Calcular totais
    const totalDoacoes = filteredData.length;
    const totalItens = filteredData.reduce((acc, item) => acc + item.quantidade, 0);
    const valorTotal = filteredData.reduce((acc, item) => acc + (item.valorEstimado || 0), 0);
    
    // Calcular itens distribuídos (apenas os com status "Distribuída")
    const itensDistribuidos = filteredData
        .filter(item => item.status === 'Distribuída')
        .reduce((acc, item) => acc + item.quantidade, 0);
    
    // Calcular taxa de distribuição
    const taxaDistribuicao = totalItens > 0 ? Math.round((itensDistribuidos / totalItens) * 100) : 0;
    
    // Calcular categorias únicas
    const categoriasUnicas = new Set(filteredData.map(item => item.categoria)).size;
    
    // Atualizar elementos na página
    atualizarElementoTexto('total-doacoes', totalDoacoes.toLocaleString('pt-BR'));
    atualizarElementoTexto('total-itens', totalItens.toLocaleString('pt-BR'));
    atualizarElementoTexto('itens-distribuidos', itensDistribuidos.toLocaleString('pt-BR'));
    atualizarElementoTexto('taxa-distribuicao', `${taxaDistribuicao}%`);
    atualizarElementoTexto('valor-total', `R$ ${valorTotal.toLocaleString('pt-BR')}`);
    atualizarElementoTexto('categorias-unicas', categoriasUnicas.toLocaleString('pt-BR'));
}

function atualizarElementoTexto(id, texto) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = texto;
    }
}

// Configurar eventos - ATUALIZADO
function configurarEventos() {
    // Evento para o seletor de período
    const periodoSelect = document.getElementById('periodo');
    if (periodoSelect) {
        periodoSelect.addEventListener('change', function() {
            const customDateGroups = document.querySelectorAll('.custom-date');
            if (this.value === 'custom') {
                customDateGroups.forEach(group => {
                    group.style.display = 'flex';
                });
                
                // Definir datas padrão para o período personalizado
                const hoje = new Date();
                const umaSemanaAtras = new Date(hoje);
                umaSemanaAtras.setDate(hoje.getDate() - 7);
                
                document.getElementById('data-inicio').value = formatarDataInput(umaSemanaAtras);
                document.getElementById('data-fim').value = formatarDataInput(hoje);
            } else {
                customDateGroups.forEach(group => {
                    group.style.display = 'none';
                });
            }
        });
    }
    
    // Evento para o botão de gerar relatório
    const gerarRelatorioBtn = document.getElementById('gerar-relatorio');
    if (gerarRelatorioBtn) {
        gerarRelatorioBtn.addEventListener('click', function() {
            gerarRelatorio();
        });
    }
    
    // Evento para o botão de exportar PDF
    const exportarPdfBtn = document.getElementById('exportar-pdf');
    if (exportarPdfBtn) {
        exportarPdfBtn.addEventListener('click', function() {
            exportarPDF();
        });
    }
    
    // Evento para o botão de exportar Excel
    const exportarExcelBtn = document.getElementById('exportar-excel');
    if (exportarExcelBtn) {
        exportarExcelBtn.addEventListener('click', function() {
            exportarExcel();
        });
    }
    
    // Eventos de paginação
    const prevPageBtn = document.getElementById('prev-page');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderizarTabela();
                scrollToTable();
            }
        });
    }
    
    const nextPageBtn = document.getElementById('next-page');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderizarTabela();
                scrollToTable();
            }
        });
    }
    
    // Evento para atualizar automaticamente ao alterar tipo de relatório
    const tipoRelatorioSelect = document.getElementById('tipo-relatorio');
    if (tipoRelatorioSelect) {
        tipoRelatorioSelect.addEventListener('change', function() {
            aplicarFiltros();
            atualizarVisualizacoes();
        });
    }
}

// Função principal para gerar relatório
function gerarRelatorio() {
    mostrarLoading(true);
    
    // Simular processamento
    setTimeout(() => {
        try {
            // Aplicar filtros
            aplicarFiltros();
            
            // Atualizar visualizações
            atualizarVisualizacoes();
            
            // Mostrar notificação de sucesso
            mostrarNotificacao('Relatório gerado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            mostrarNotificacao('Erro ao gerar relatório. Tente novamente.', 'error');
        } finally {
            mostrarLoading(false);
        }
    }, 1000);
}

// Aplicar filtros aos dados - ATUALIZADO
function aplicarFiltros() {
    const periodo = document.getElementById('periodo').value;
    const tipoRelatorio = document.getElementById('tipo-relatorio').value;
    
    let dadosFiltrados = [...dadosDoacoes];
    
    // Aplicar filtro de período
    if (periodo !== 'all') {
        const hoje = new Date();
        let dataLimite = new Date();
        
        if (periodo === 'custom') {
            const dataInicio = document.getElementById('data-inicio').value;
            const dataFim = document.getElementById('data-fim').value;
            
            if (dataInicio && dataFim) {
                dadosFiltrados = dadosFiltrados.filter(item => {
                    const dataItem = new Date(item.data);
                    const inicio = new Date(dataInicio);
                    const fim = new Date(dataFim);
                    fim.setHours(23, 59, 59, 999); // Fim do dia
                    
                    return dataItem >= inicio && dataItem <= fim;
                });
            }
        } else {
            const dias = parseInt(periodo);
            dataLimite.setDate(hoje.getDate() - dias);
            
            dadosFiltrados = dadosFiltrados.filter(item => {
                const dataItem = new Date(item.data);
                return dataItem >= dataLimite;
            });
        }
    }
    
    // Aplicar filtro por tipo de relatório
    if (tipoRelatorio === 'distribuicao') {
        dadosFiltrados = dadosFiltrados.filter(item => item.status === 'Distribuída');
    } else if (tipoRelatorio === 'categorias') {
        // Para relatório de categorias, agrupar por categoria
        dadosFiltrados = agruparPorCategoria(dadosFiltrados);
    } else if (tipoRelatorio === 'doadores') {
        // Para relatório de doadores, agrupar por doador
        dadosFiltrados = agruparPorDoador(dadosFiltrados);
    }
    
    filteredData = dadosFiltrados;
    currentPage = 1; // Resetar para primeira página
}

// Agrupar dados por categoria
function agruparPorCategoria(dados) {
    const agrupados = {};
    
    dados.forEach(item => {
        if (!agrupados[item.categoria]) {
            agrupados[item.categoria] = {
                categoria: item.categoria,
                quantidade: 0,
                valorEstimado: 0
            };
        }
        agrupados[item.categoria].quantidade += item.quantidade;
        agrupados[item.categoria].valorEstimado += item.valorEstimado;
    });
    
    return Object.values(agrupados).map(item => ({
        data: 'Agrupado',
        doador: 'Vários',
        categoria: item.categoria,
        item: `${item.categoria} (Agrupado)`,
        quantidade: item.quantidade,
        valorEstimado: item.valorEstimado,
        status: 'Agrupado'
    }));
}

// Agrupar dados por doador
function agruparPorDoador(dados) {
    const agrupados = {};
    
    dados.forEach(item => {
        if (!agrupados[item.doador]) {
            agrupados[item.doador] = {
                doador: item.doador,
                quantidade: 0,
                valorEstimado: 0,
                doacoes: 0
            };
        }
        agrupados[item.doador].quantidade += item.quantidade;
        agrupados[item.doador].valorEstimado += item.valorEstimado;
        agrupados[item.doador].doacoes++;
    });
    
    return Object.values(agrupados)
        .sort((a, b) => b.quantidade - a.quantidade)
        .map(item => ({
            data: 'Agrupado',
            doador: item.doador,
            categoria: 'Várias',
            item: `Doações de ${item.doador}`,
            quantidade: item.quantidade,
            valorEstimado: item.valorEstimado,
            status: `Total: ${item.doacoes} doações`
        }));
}

// Atualizar todas as visualizações
function atualizarVisualizacoes() {
    atualizarResumoEstatistico();
    inicializarGraficos();
    renderizarTabela();
}

// Exportar para PDF - ATUALIZADO
function exportarPDF() {
    mostrarLoading(true);
    
    setTimeout(() => {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Adicionar título
            doc.setFontSize(20);
            doc.text('Relatório de Doações - Patas Conscientes', 20, 20);
            
            // Adicionar data de geração
            doc.setFontSize(10);
            doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 30);
            
            // Adicionar resumo estatístico
            doc.setFontSize(14);
            doc.text('Resumo Estatístico', 20, 50);
            
            const resumo = [
                ['Total de Doações', document.getElementById('total-doacoes').textContent],
                ['Itens Recebidos', document.getElementById('total-itens').textContent],
                ['Itens Distribuídos', document.getElementById('itens-distribuidos').textContent],
                ['Taxa de Distribuição', document.getElementById('taxa-distribuicao').textContent],
                ['Valor Total Estimado', document.getElementById('valor-total').textContent]
            ];
            
            doc.autoTable({
                startY: 60,
                head: [['Métrica', 'Valor']],
                body: resumo,
                theme: 'grid',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [54, 162, 235] }
            });
            
            // Adicionar tabela de detalhamento (primeira página)
            let finalY = doc.lastAutoTable.finalY + 10;
            
            doc.setFontSize(14);
            doc.text('Detalhamento de Doações', 20, finalY);
            
            const dadosTabela = filteredData.map(item => [
                new Date(item.data).toLocaleDateString('pt-BR'),
                item.doador,
                item.categoria,
                item.item,
                item.quantidade.toString(),
                `R$ ${item.valorEstimado}`,
                item.status
            ]);
            
            doc.autoTable({
                startY: finalY + 5,
                head: [['Data', 'Doador', 'Categoria', 'Item', 'Quantidade', 'Valor', 'Status']],
                body: dadosTabela,
                theme: 'grid',
                styles: { fontSize: 8 },
                headStyles: { fillColor: [54, 162, 235] },
                pageBreak: 'auto'
            });
            
            // Salvar o PDF
            doc.save(`relatorio-doacoes-${new Date().toISOString().split('T')[0]}.pdf`);
            
            mostrarNotificacao('PDF exportado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
            mostrarNotificacao('Erro ao exportar PDF. Tente novamente.', 'error');
        } finally {
            mostrarLoading(false);
        }
    }, 500);
}

// Exportar para Excel - ATUALIZADO
function exportarExcel() {
    mostrarLoading(true);
    
    setTimeout(() => {
        try {
            // Preparar dados para exportação
            const dadosExportacao = filteredData.map(item => ({
                'Data': new Date(item.data).toLocaleDateString('pt-BR'),
                'Doador': item.doador,
                'Categoria': item.categoria,
                'Item': item.item,
                'Quantidade': item.quantidade,
                'Valor Estimado': item.valorEstimado,
                'Status': item.status
            }));
            
            // Criar planilha
            const ws = XLSX.utils.json_to_sheet(dadosExportacao);
            
            // Criar workbook e adicionar a planilha
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Doações');
            
            // Adicionar resumo como segunda aba
            const resumoData = [
                ['Métrica', 'Valor'],
                ['Total de Doações', document.getElementById('total-doacoes').textContent],
                ['Itens Recebidos', document.getElementById('total-itens').textContent],
                ['Itens Distribuídos', document.getElementById('itens-distribuidos').textContent],
                ['Taxa de Distribuição', document.getElementById('taxa-distribuicao').textContent],
                ['Valor Total Estimado', document.getElementById('valor-total').textContent],
                ['Categorias Diferentes', document.getElementById('categorias-unicas').textContent]
            ];
            
            const wsResumo = XLSX.utils.aoa_to_sheet(resumoData);
            XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo');
            
            // Gerar arquivo e fazer download
            XLSX.writeFile(wb, `relatorio-doacoes-${new Date().toISOString().split('T')[0]}.xlsx`);
            
            mostrarNotificacao('Excel exportado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar Excel:', error);
            mostrarNotificacao('Erro ao exportar Excel. Tente novamente.', 'error');
        } finally {
            mostrarLoading(false);
        }
    }, 500);
}

// Funções auxiliares
function mostrarLoading(mostrar) {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = mostrar ? 'flex' : 'none';
    }
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remover notificação anterior se existir
    const notificacaoAnterior = document.querySelector('.notification');
    if (notificacaoAnterior) {
        notificacaoAnterior.remove();
    }
    
    const notificacao = document.createElement('div');
    notificacao.className = `notification ${tipo}`;
    notificacao.innerHTML = `
        <div class="notification-content">
            <i class="bi ${tipo === 'success' ? 'bi-check-circle' : tipo === 'error' ? 'bi-exclamation-circle' : 'bi-info-circle'}"></i>
            <span>${mensagem}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="bi bi-x"></i>
        </button>
    `;
    
    document.body.appendChild(notificacao);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notificacao.parentElement) {
            notificacao.remove();
        }
    }, 5000);
}

function formatarDataInput(data) {
    return data.toISOString().split('T')[0];
}

function scrollToTable() {
    const tabelaContainer = document.getElementById('tabela-container');
    if (tabelaContainer) {
        tabelaContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function atualizarBreadcrumb() {
    const tipoRelatorio = document.getElementById('tipo-relatorio');
    const breadcrumb = document.getElementById('current-breadcrumb');
    
    if (tipoRelatorio && breadcrumb) {
        const opcaoSelecionada = tipoRelatorio.options[tipoRelatorio.selectedIndex];
        breadcrumb.textContent = `Relatórios - ${opcaoSelecionada.text}`;
    }
}

// Adicionar estilos CSS para notificações
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification.success {
        background-color: #28a745;
    }
    
    .notification.error {
        background-color: #dc3545;
    }
    
    .notification.info {
        background-color: #17a2b8;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);