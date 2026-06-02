// ong-relatorios.js - Gerenciamento da página de relatórios com exportação e filtros funcionais

class OngRelatorios {
    constructor() {
        this.currentPeriodo = 'mes';
        this.dataInicio = null;
        this.dataFim = null;
        this.dadosTabela = [];
        this.dadosFiltrados = [];
        this.paginaAtual = 1;
        this.itensPorPagina = 5;
        this.colunaOrdenacao = null;
        this.ordenacaoAscendente = true;
        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.carregarDadosIniciais();
        this.renderizarTabela();
    }

    initializeElements() {
        // Período
        this.periodoBtns = document.querySelectorAll('.periodo-btn');
        this.dataInicioInput = document.getElementById('dataInicio');
        this.dataFimInput = document.getElementById('dataFim');
        this.aplicarPeriodoBtn = document.getElementById('aplicarPeriodo');
        this.periodoInfo = document.querySelector('.periodo-info span');

        // Exportação
        this.exportPdfBtn = document.getElementById('exportPdf');
        this.exportExcelBtn = document.getElementById('exportExcel');
        this.exportCsvBtn = document.getElementById('exportCsv');

        // Filtros da tabela
        this.filtroBusca = document.querySelector('.tabela-filters input[type="text"]');
        this.filtroCategoria = document.querySelector('.tabela-filters select:first-of-type');
        this.filtroStatus = document.querySelector('.tabela-filters select:last-of-type');
        this.filtrarBtn = document.querySelector('.tabela-filters button');
        
        // Elementos da tabela
        this.tabelaBody = document.querySelector('.tabela-dados tbody');
        this.paginationInfo = document.querySelector('.pagination-info');
        this.paginationNumbers = document.querySelector('.pagination-numbers');
        this.prevPageBtn = document.querySelector('.pagination-btn:first-child');
        this.nextPageBtn = document.querySelector('.pagination-btn:last-child');

        // Modal de logout
        this.logoutModal = document.getElementById('logoutModal');
        this.closeModal = document.getElementById('closeModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogout = document.getElementById('confirmLogout');
        this.logoutBtn = document.getElementById('logoutBtn');

        // Botões de ação rápida (apenas navegação)
        this.campanhasBtn = document.getElementById('campanhasBtn');
        this.doacoesBtn = document.getElementById('doacoesBtn');
    }

    setupEventListeners() {
        // Período
        this.periodoBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handlePeriodoClick(btn));
        });

        if (this.aplicarPeriodoBtn) {
            this.aplicarPeriodoBtn.addEventListener('click', () => this.aplicarPeriodoCustom());
        }

        // Exportação
        if (this.exportPdfBtn) {
            this.exportPdfBtn.addEventListener('click', () => this.exportarRelatorio('pdf'));
        }
        if (this.exportExcelBtn) {
            this.exportExcelBtn.addEventListener('click', () => this.exportarRelatorio('excel'));
        }
        if (this.exportCsvBtn) {
            this.exportCsvBtn.addEventListener('click', () => this.exportarRelatorio('csv'));
        }

        // Botões de exportação nos cards (agora são os únicos clicáveis)
        document.querySelectorAll('.relatorio-card .relatorio-meta span:last-child').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.relatorio-card');
                this.exportarRelatorioCard(card);
            });
        });

        // Filtros da tabela
        if (this.filtrarBtn) {
            this.filtrarBtn.addEventListener('click', () => this.aplicarFiltros());
        }

        // Busca com debounce
        if (this.filtroBusca) {
            this.filtroBusca.addEventListener('input', this.debounce(() => this.aplicarFiltros(), 300));
        }

        // Filtros por select
        if (this.filtroCategoria) {
            this.filtroCategoria.addEventListener('change', () => this.aplicarFiltros());
        }
        if (this.filtroStatus) {
            this.filtroStatus.addEventListener('change', () => this.aplicarFiltros());
        }

        // Ordenação da tabela
        document.querySelectorAll('.tabela-dados th').forEach((th, index) => {
            th.addEventListener('click', () => this.ordenarTabela(index));
        });

        // Paginação
        if (this.prevPageBtn) {
            this.prevPageBtn.addEventListener('click', () => this.paginaAnterior());
        }
        if (this.nextPageBtn) {
            this.nextPageBtn.addEventListener('click', () => this.proximaPagina());
        }

        // Navegação rápida
        if (this.campanhasBtn) {
            this.campanhasBtn.addEventListener('click', () => {
                window.location.href = 'ong-inicio.html';
            });
        }

        if (this.doacoesBtn) {
            this.doacoesBtn.addEventListener('click', () => {
                window.location.href = 'ong-inicio.html';
            });
        }

        // Logout
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.abrirModalLogout();
            });
        }

        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.fecharModalLogout());
        }

        if (this.cancelLogout) {
            this.cancelLogout.addEventListener('click', () => this.fecharModalLogout());
        }

        if (this.confirmLogout) {
            this.confirmLogout.addEventListener('click', () => this.performLogout());
        }

        // Fechar modal de logout ao clicar fora
        if (this.logoutModal) {
            this.logoutModal.addEventListener('click', (e) => {
                if (e.target === this.logoutModal) {
                    this.fecharModalLogout();
                }
            });
        }

        // Botões de atualizar gráfico (apenas visual)
        document.querySelectorAll('.grafico-actions button:first-child').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.mostrarNotificacao('Gráfico atualizado', 'success');
            });
        });

        // Botões de expandir gráfico (apenas visual)
        document.querySelectorAll('.grafico-actions button:last-child').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.mostrarNotificacao('Visualização expandida', 'info');
            });
        });
    }

    carregarDadosIniciais() {
        // Dados mockados da tabela
        this.dadosTabela = [
            { doador: 'Maria Clara', email: 'maria.c@email.com', itens: 5, categoria: 'Roupas, Alimentos', data: '12/02/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'João Pedro', email: 'joao.p@email.com', itens: 8, categoria: 'Brinquedos, Livros', data: '10/02/2025', status: 'pendente', statusText: 'Pendente' },
            { doador: 'Ana Silva', email: 'ana.s@email.com', itens: 15, categoria: 'Livros, Móveis', data: '08/02/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'Carlos Santos', email: 'carlos.s@email.com', itens: 3, categoria: 'Medicamentos', data: '05/02/2025', status: 'ativo', statusText: 'Agendado' },
            { doador: 'Fernanda Lima', email: 'fernanda.l@email.com', itens: 12, categoria: 'Roupas, Calçados', data: '03/02/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'Roberto Alves', email: 'roberto.a@email.com', itens: 7, categoria: 'Alimentos', data: '01/02/2025', status: 'pendente', statusText: 'Pendente' },
            { doador: 'Patrícia Souza', email: 'patricia.s@email.com', itens: 4, categoria: 'Brinquedos', data: '28/01/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'Lucas Mendes', email: 'lucas.m@email.com', itens: 9, categoria: 'Roupas', data: '25/01/2025', status: 'ativo', statusText: 'Agendado' },
            { doador: 'Juliana Costa', email: 'juliana.c@email.com', itens: 6, categoria: 'Medicamentos, Alimentos', data: '22/01/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'Marcos Oliveira', email: 'marcos.o@email.com', itens: 10, categoria: 'Livros', data: '20/01/2025', status: 'pendente', statusText: 'Pendente' },
            { doador: 'Beatriz Santos', email: 'beatriz.s@email.com', itens: 2, categoria: 'Roupas', data: '18/01/2025', status: 'concluido', statusText: 'Concluído' },
            { doador: 'Ricardo Pereira', email: 'ricardo.p@email.com', itens: 11, categoria: 'Móveis, Eletrônicos', data: '15/01/2025', status: 'ativo', statusText: 'Agendado' }
        ];

        this.dadosFiltrados = [...this.dadosTabela];
        this.atualizarPaginacao();
    }

    handlePeriodoClick(btn) {
        // Remove active de todos
        this.periodoBtns.forEach(b => b.classList.remove('active'));
        
        // Adiciona active no clicado
        btn.classList.add('active');
        
        // Atualiza período
        this.currentPeriodo = btn.dataset.periodo;
        
        // Atualiza as datas baseado no período
        this.atualizarPeriodo(this.currentPeriodo);
        
        // Recarrega dados
        this.mostrarNotificacao(`Período alterado para: ${btn.textContent}`, 'info');
    }

    atualizarPeriodo(periodo) {
        const hoje = new Date();
        let dataInicio = new Date();
        let dataFim = new Date();

        switch(periodo) {
            case 'hoje':
                dataInicio = hoje;
                dataFim = hoje;
                break;
            case 'semana':
                dataInicio.setDate(hoje.getDate() - 7);
                break;
            case 'mes':
                dataInicio.setMonth(hoje.getMonth() - 1);
                break;
            case 'trimestre':
                dataInicio.setMonth(hoje.getMonth() - 3);
                break;
            case 'ano':
                dataInicio.setFullYear(hoje.getFullYear() - 1);
                break;
            case 'total':
                dataInicio = new Date(2024, 0, 1);
                break;
        }

        this.dataInicio = dataInicio;
        this.dataFim = dataFim;

        // Atualiza inputs se existirem
        if (this.dataInicioInput) {
            this.dataInicioInput.value = this.formatDateForInput(dataInicio);
        }
        if (this.dataFimInput) {
            this.dataFimInput.value = this.formatDateForInput(dataFim);
        }

        // Atualiza info do período
        this.atualizarInfoPeriodo();
    }

    aplicarPeriodoCustom() {
        if (!this.dataInicioInput || !this.dataFimInput) return;

        const dataInicio = new Date(this.dataInicioInput.value);
        const dataFim = new Date(this.dataFimInput.value);

        if (dataInicio > dataFim) {
            this.mostrarNotificacao('Data inicial não pode ser maior que a data final', 'error');
            return;
        }

        this.dataInicio = dataInicio;
        this.dataFim = dataFim;

        // Remove active dos botões de período
        this.periodoBtns.forEach(b => b.classList.remove('active'));

        // Atualiza info
        this.atualizarInfoPeriodo();

        this.mostrarNotificacao('Período personalizado aplicado', 'success');
    }

    atualizarInfoPeriodo() {
        if (!this.periodoInfo) return;

        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const dataInicioStr = this.dataInicio ? this.dataInicio.toLocaleDateString('pt-BR', options) : '01/01/2025';
        const dataFimStr = this.dataFim ? this.dataFim.toLocaleDateString('pt-BR', options) : '13/02/2025';

        this.periodoInfo.innerHTML = `Período atual: <strong>${dataInicioStr}</strong> até <strong>dataFimStr</strong>`;
    }

    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // ===== FUNÇÕES DE EXPORTAÇÃO =====

    exportarRelatorio(tipo) {
        const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
        const nomeArquivo = `relatorio-reuse-${dataAtual}`;

        // Mostra loading no botão
        const btn = this[`export${tipo.toUpperCase()}Btn`];
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="loading-spinner"></span> Exportando...';
        btn.disabled = true;

        setTimeout(() => {
            let conteudo = '';
            let mimeType = '';
            let extensao = '';

            switch(tipo) {
                case 'pdf':
                    this.exportarPDF(nomeArquivo);
                    break;
                case 'excel':
                    conteudo = this.gerarConteudoExcel();
                    mimeType = 'application/vnd.ms-excel';
                    extensao = 'xls';
                    this.downloadArquivo(conteudo, `${nomeArquivo}.${extensao}`, mimeType);
                    break;
                case 'csv':
                    conteudo = this.gerarConteudoCSV();
                    mimeType = 'text/csv';
                    extensao = 'csv';
                    this.downloadArquivo(conteudo, `${nomeArquivo}.${extensao}`, mimeType);
                    break;
            }

            // Restaura o botão
            btn.innerHTML = originalText;
            btn.disabled = false;

            this.mostrarNotificacao(`Relatório exportado como ${tipo.toUpperCase()} com sucesso!`, 'success');
        }, 1500);
    }

    exportarPDF(nomeArquivo) {
        // Simula exportação PDF
        this.mostrarNotificacao('Preparando PDF...', 'info');
        
        // Em produção, aqui você usaria uma biblioteca como jsPDF
        setTimeout(() => {
            const win = window.open('about:blank', '_blank');
            win.document.write(`
                <html>
                    <head>
                        <title>Relatório ReUse</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #9933cc; }
                            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
                            th { background: #9933cc; color: white; padding: 10px; text-align: left; }
                            td { padding: 8px; border-bottom: 1px solid #ddd; }
                        </style>
                    </head>
                    <body>
                        <h1>Relatório de Doações - ReUse</h1>
                        <p>Período: ${this.periodoInfo ? this.periodoInfo.innerText : 'Todo período'}</p>
                        ${this.gerarTabelaHTML()}
                        <p><small>Gerado em: ${new Date().toLocaleString('pt-BR')}</small></p>
                    </body>
                </html>
            `);
            win.document.close();
            win.print();
        }, 1000);
    }

    gerarConteudoExcel() {
        let conteudo = 'Doador\tEmail\tItens\tCategoria\tData\tStatus\n';
        
        this.dadosFiltrados.forEach(item => {
            conteudo += `${item.doador}\t${item.email}\t${item.itens}\t${item.categoria}\t${item.data}\t${item.statusText}\n`;
        });

        return conteudo;
    }

    gerarConteudoCSV() {
        let conteudo = 'Doador,Email,Itens,Categoria,Data,Status\n';
        
        this.dadosFiltrados.forEach(item => {
            conteudo += `"${item.doador}","${item.email}",${item.itens},"${item.categoria}",${item.data},"${item.statusText}"\n`;
        });

        return conteudo;
    }

    gerarTabelaHTML() {
        let html = '<table>';
        html += '<tr><th>Doador</th><th>Email</th><th>Itens</th><th>Categoria</th><th>Data</th><th>Status</th></tr>';
        
        this.dadosFiltrados.forEach(item => {
            html += `<tr>
                <td>${item.doador}</td>
                <td>${item.email}</td>
                <td>${item.itens}</td>
                <td>${item.categoria}</td>
                <td>${item.data}</td>
                <td>${item.statusText}</td>
            </tr>`;
        });
        
        html += '</table>';
        return html;
    }

    downloadArquivo(conteudo, nomeArquivo, mimeType) {
        const blob = new Blob([conteudo], { type: `${mimeType};charset=utf-8;` });
        const link = document.createElement('a');
        
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, nomeArquivo);
        } else {
            link.href = URL.createObjectURL(blob);
            link.download = nomeArquivo;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }

    exportarRelatorioCard(card) {
        const titulo = card.querySelector('.relatorio-titulo').textContent;
        const tipo = card.dataset.type || 'relatorio';
        
        this.mostrarNotificacao(`Preparando ${titulo} para exportação...`, 'info');
        
        setTimeout(() => {
            const conteudo = this.gerarConteudoRelatorioCard(card);
            this.downloadArquivo(conteudo, `${tipo}-${Date.now()}.csv`, 'text/csv');
            this.mostrarNotificacao(`${titulo} exportado com sucesso!`, 'success');
        }, 800);
    }

    gerarConteudoRelatorioCard(card) {
        const titulo = card.querySelector('.relatorio-titulo').textContent;
        const descricao = card.querySelector('.relatorio-descricao').textContent;
        const meta = card.querySelector('.relatorio-meta span:first-child').textContent;
        
        return `Relatório: ${titulo}\nDescrição: ${descricao}\nMétrica: ${meta}\nGerado em: ${new Date().toLocaleString('pt-BR')}`;
    }

    // ===== FUNÇÕES DE FILTRO E TABELA =====

    aplicarFiltros() {
        const busca = this.filtroBusca ? this.filtroBusca.value.toLowerCase() : '';
        const categoria = this.filtroCategoria ? this.filtroCategoria.value : '';
        const status = this.filtroStatus ? this.filtroStatus.value : '';

        this.dadosFiltrados = this.dadosTabela.filter(item => {
            // Filtro de busca
            const matchBusca = !busca || 
                item.doador.toLowerCase().includes(busca) || 
                item.email.toLowerCase().includes(busca) ||
                item.categoria.toLowerCase().includes(busca);

            // Filtro de categoria
            const matchCategoria = !categoria || 
                item.categoria.toLowerCase().includes(categoria.toLowerCase());

            // Filtro de status
            const matchStatus = !status || item.status === status;

            return matchBusca && matchCategoria && matchStatus;
        });

        // Aplica ordenação se houver
        if (this.colunaOrdenacao !== null) {
            this.ordenarDados();
        }

        this.paginaAtual = 1;
        this.atualizarPaginacao();
        this.renderizarTabela();
        
        this.mostrarNotificacao(`${this.dadosFiltrados.length} resultados encontrados`, 'info');
    }

    ordenarTabela(colunaIndex) {
        // Define a coluna de ordenação
        const colunas = ['doador', 'itens', 'categoria', 'data', 'status'];
        
        if (colunaIndex >= colunas.length) return;
        
        const coluna = colunas[colunaIndex];
        
        // Alterna direção se mesma coluna
        if (this.colunaOrdenacao === coluna) {
            this.ordenacaoAscendente = !this.ordenacaoAscendente;
        } else {
            this.colunaOrdenacao = coluna;
            this.ordenacaoAscendente = true;
        }

        // Atualiza ícones
        document.querySelectorAll('.tabela-dados th i').forEach((icon, index) => {
            if (index === colunaIndex) {
                icon.className = this.ordenacaoAscendente ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
            } else {
                icon.className = 'bi bi-arrow-down-up';
            }
        });

        // Ordena os dados
        this.ordenarDados();
        
        // Re-renderiza
        this.paginaAtual = 1;
        this.renderizarTabela();
        
        this.mostrarNotificacao(`Ordenado por ${coluna}`, 'info');
    }

    ordenarDados() {
        if (!this.colunaOrdenacao) return;

        this.dadosFiltrados.sort((a, b) => {
            let valorA = a[this.colunaOrdenacao];
            let valorB = b[this.colunaOrdenacao];

            // Tratamento especial para números
            if (this.colunaOrdenacao === 'itens') {
                valorA = parseInt(valorA);
                valorB = parseInt(valorB);
            }

            if (valorA < valorB) return this.ordenacaoAscendente ? -1 : 1;
            if (valorA > valorB) return this.ordenacaoAscendente ? 1 : -1;
            return 0;
        });
    }

    renderizarTabela() {
        if (!this.tabelaBody) return;

        const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        const dadosPagina = this.dadosFiltrados.slice(inicio, fim);

        if (dadosPagina.length === 0) {
            this.tabelaBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        <div class="no-results">
                            <i class="bi bi-search"></i>
                            <p>Nenhum resultado encontrado</p>
                            <small>Tente ajustar os filtros</small>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            let html = '';
            const busca = this.filtroBusca ? this.filtroBusca.value.toLowerCase() : '';

            dadosPagina.forEach(item => {
                // Destaca o termo buscado se existir
                let doadorDisplay = item.doador;
                let emailDisplay = item.email;
                
                if (busca) {
                    doadorDisplay = this.highlightText(item.doador, busca);
                    emailDisplay = this.highlightText(item.email, busca);
                }

                html += `
                    <tr>
                        <td>
                            <strong>${doadorDisplay}</strong><br>
                            <small style="color: var(--text-light);">${emailDisplay}</small>
                        </td>
                        <td>${item.itens} itens</td>
                        <td>${item.categoria}</td>
                        <td>${item.data}</td>
                        <td><span class="tabela-status ${item.status}">${item.statusText}</span></td>
                        <td>
                            <div class="tabela-acoes">
                                <button title="Visualizar" onclick="window.ongRelatorios.visualizarDetalhes('${item.email}')">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button title="Exportar" onclick="window.ongRelatorios.exportarLinha('${item.email}')">
                                    <i class="bi bi-download"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });

            this.tabelaBody.innerHTML = html;
        }

        this.atualizarInfoPaginacao();
        this.renderizarPaginacao();
    }

    highlightText(text, search) {
        if (!search) return text;
        
        const regex = new RegExp(`(${search})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    atualizarPaginacao() {
        const totalPaginas = Math.ceil(this.dadosFiltrados.length / this.itensPorPagina);
        
        if (this.paginaAtual > totalPaginas) {
            this.paginaAtual = Math.max(1, totalPaginas);
        }

        this.atualizarInfoPaginacao();
        this.renderizarPaginacao();
    }

    atualizarInfoPaginacao() {
        if (!this.paginationInfo) return;

        const inicio = (this.paginaAtual - 1) * this.itensPorPagina + 1;
        const fim = Math.min(this.paginaAtual * this.itensPorPagina, this.dadosFiltrados.length);
        const total = this.dadosFiltrados.length;

        this.paginationInfo.textContent = total === 0 
            ? 'Nenhum registro encontrado'
            : `Mostrando ${inicio} a ${fim} de ${total} registros`;
    }

    renderizarPaginacao() {
        if (!this.paginationNumbers) return;

        const totalPaginas = Math.ceil(this.dadosFiltrados.length / this.itensPorPagina);
        
        if (totalPaginas <= 1) {
            this.paginationNumbers.innerHTML = '';
            return;
        }

        let html = '';
        const maxBotoes = 5;
        let inicio = Math.max(1, this.paginaAtual - Math.floor(maxBotoes / 2));
        let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);

        if (fim - inicio + 1 < maxBotoes) {
            inicio = Math.max(1, fim - maxBotoes + 1);
        }

        for (let i = inicio; i <= fim; i++) {
            html += `<span class="pagination-number ${i === this.paginaAtual ? 'active' : ''}" data-page="${i}">${i}</span>`;
        }

        this.paginationNumbers.innerHTML = html;

        // Adiciona eventos aos novos botões
        document.querySelectorAll('.pagination-number').forEach(num => {
            num.addEventListener('click', () => {
                this.paginaAtual = parseInt(num.dataset.page);
                this.renderizarTabela();
            });
        });

        // Atualiza botões anterior/próximo
        if (this.prevPageBtn) {
            this.prevPageBtn.disabled = this.paginaAtual === 1;
        }
        if (this.nextPageBtn) {
            this.nextPageBtn.disabled = this.paginaAtual === totalPaginas;
        }
    }

    paginaAnterior() {
        if (this.paginaAtual > 1) {
            this.paginaAtual--;
            this.renderizarTabela();
        }
    }

    proximaPagina() {
        const totalPaginas = Math.ceil(this.dadosFiltrados.length / this.itensPorPagina);
        if (this.paginaAtual < totalPaginas) {
            this.paginaAtual++;
            this.renderizarTabela();
        }
    }

    // Ações da tabela
    visualizarDetalhes(email) {
        const item = this.dadosTabela.find(d => d.email === email);
        if (item) {
            this.mostrarNotificacao(`Visualizando doação de ${item.doador}`, 'info');
            // Aqui você pode abrir um modal com detalhes
        }
    }

    exportarLinha(email) {
        const item = this.dadosTabela.find(d => d.email === email);
        if (item) {
            const conteudo = `Doador: ${item.doador}\nEmail: ${item.email}\nItens: ${item.itens}\nCategoria: ${item.categoria}\nData: ${item.data}\nStatus: ${item.statusText}`;
            this.downloadArquivo(conteudo, `doacao-${item.doador.replace(' ', '-')}.txt`, 'text/plain');
            this.mostrarNotificacao(`Doação de ${item.doador} exportada`, 'success');
        }
    }

    // ===== FUNÇÕES DE LOGOUT =====

    abrirModalLogout() {
        if (this.logoutModal) {
            this.logoutModal.classList.add('active');
        }
    }

    fecharModalLogout() {
        if (this.logoutModal) {
            this.logoutModal.classList.remove('active');
        }
    }

    performLogout() {
        // Limpa dados da sessão
        localStorage.removeItem('user_session');
        sessionStorage.clear();
        
        this.fecharModalLogout();
        
        this.mostrarNotificacao('Saindo da conta...', 'info');
        
        setTimeout(() => {
            window.location.href = 'cadastro-ong.html';
        }, 500);
    }

    // ===== FUNÇÕES UTILITÁRIAS =====

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    mostrarNotificacao(mensagem, tipo = 'info') {
        // Remove notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${tipo}`;
        
        let icone = 'bi-info-circle';
        if (tipo === 'success') icone = 'bi-check-circle';
        if (tipo === 'error') icone = 'bi-x-circle';
        if (tipo === 'warning') icone = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${icone}"></i>
            <span>${mensagem}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: tipo === 'success' ? '#00cc99' : 
                       tipo === 'error' ? '#ff4757' : 
                       tipo === 'warning' ? '#ffa502' : '#9933cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500',
            maxWidth: '400px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona estilos de animação se não existirem
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
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
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
                margin-right: 0.5rem;
            }

            .highlight {
                background-color: rgba(255, 215, 0, 0.3);
                padding: 0 2px;
                border-radius: 3px;
                font-weight: 600;
            }

            .no-results {
                text-align: center;
                padding: 3rem;
                color: var(--text-light);
                font-size: 1.1rem;
            }

            .no-results i {
                font-size: 3rem;
                color: var(--text-lighter);
                margin-bottom: 1rem;
                display: block;
            }

            .relatorio-card {
                cursor: default;
            }

            .relatorio-card .relatorio-meta span:last-child {
                cursor: pointer;
            }

            .relatorio-card .relatorio-meta span:last-child:hover {
                color: var(--primary-purple);
                transform: translateX(2px);
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Inicializa a página de relatórios
    window.ongRelatorios = new OngRelatorios();
});