// vendedor-doacoes.js - Gerenciamento de doações do vendedor

class VendedorDoacoes {
    constructor() {
        this.NOTIFICATION_DURATION = 3000;
        this.doacoes = [];
        this.init();
    }

    init() {
        this.carregarElementos();
        this.configurarEventListeners();
        this.carregarDadosIniciais();
        this.atualizarFiltroInstituicoes();
    }

    carregarElementos() {
        // Elementos principais
        this.donationFormSection = document.getElementById('donationFormSection');
        this.donationForm = document.getElementById('donationForm');
        this.emptyState = document.getElementById('emptyState');
        this.tableBody = document.getElementById('donationsTableBody');
        
        // Botões
        this.btnFazerDoacao = document.getElementById('btnFazerDoacao');
        this.btnPrimeiraDoacao = document.getElementById('btnPrimeiraDoacao');
        this.btnCancelarDoacao = document.getElementById('btnCancelarDoacao');
        this.btnExportarHistorico = document.getElementById('btnExportarHistorico');
        
        // Modais
        this.confirmModal = document.getElementById('confirmDonationModal');
        this.detailsModal = document.getElementById('donationDetailsModal');
        
        // Filtros
        this.filtroPeriodo = document.getElementById('filtroPeriodo');
        this.filtroInstituicao = document.getElementById('filtroInstituicao');
        
        // Elementos do modal de confirmação
        this.confirmValor = document.getElementById('confirmValor');
        this.confirmInstituicao = document.getElementById('confirmInstituicao');
        this.confirmCategoria = document.getElementById('confirmCategoria');
        this.confirmPagamento = document.getElementById('confirmPagamento');
        this.confirmMensagem = document.getElementById('confirmMensagem');
    }

    configurarEventListeners() {
        // Botões de abrir formulário
        if (this.btnFazerDoacao) {
            this.btnFazerDoacao.addEventListener('click', () => this.abrirFormularioDoacao());
        }
        
        if (this.btnPrimeiraDoacao) {
            this.btnPrimeiraDoacao.addEventListener('click', () => this.abrirFormularioDoacao());
        }
        
        // Botão de cancelar
        if (this.btnCancelarDoacao) {
            this.btnCancelarDoacao.addEventListener('click', () => this.fecharFormularioDoacao());
        }
        
        // Formulário de doação
        if (this.donationForm) {
            this.donationForm.addEventListener('submit', (e) => this.handleSubmitDoacao(e));
        }
        
        // Botão de exportar histórico
        if (this.btnExportarHistorico) {
            this.btnExportarHistorico.addEventListener('click', () => this.exportarHistorico());
        }
        
        // Filtros
        if (this.filtroPeriodo) {
            this.filtroPeriodo.addEventListener('change', () => this.aplicarFiltros());
        }
        
        if (this.filtroInstituicao) {
            this.filtroInstituicao.addEventListener('change', () => this.aplicarFiltros());
        }
        
        // Modais
        this.configurarModais();
        
        // Botões de ação do vendedor-inicio.js (integração)
        this.configurarMenuNavegacao();
    }

    configurarModais() {
        // Modal de confirmação
        const closeConfirmModal = document.getElementById('closeConfirmModal');
        const cancelConfirmModal = document.getElementById('cancelConfirmModal');
        const confirmDonationBtn = document.getElementById('confirmDonationBtn');
        
        if (closeConfirmModal) {
            closeConfirmModal.addEventListener('click', () => this.fecharModal(this.confirmModal));
        }
        
        if (cancelConfirmModal) {
            cancelConfirmModal.addEventListener('click', () => this.fecharModal(this.confirmModal));
        }
        
        if (confirmDonationBtn) {
            confirmDonationBtn.addEventListener('click', () => this.confirmarDoacao());
        }
        
        // Modal de detalhes
        const closeDetailsModal = document.getElementById('closeDetailsModal');
        const closeDetailsBtn = document.getElementById('closeDetailsBtn');
        const reciboDoacaoBtn = document.getElementById('reciboDoacaoBtn');
        
        if (closeDetailsModal) {
            closeDetailsModal.addEventListener('click', () => this.fecharModal(this.detailsModal));
        }
        
        if (closeDetailsBtn) {
            closeDetailsBtn.addEventListener('click', () => this.fecharModal(this.detailsModal));
        }
        
        if (reciboDoacaoBtn) {
            reciboDoacaoBtn.addEventListener('click', () => this.gerarRecibo());
        }
        
        // Fechar modais clicando fora
        window.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) {
                this.fecharModal(this.confirmModal);
            }
            if (e.target === this.detailsModal) {
                this.fecharModal(this.detailsModal);
            }
        });
    }

    configurarMenuNavegacao() {
        // Integração com os botões do menu do vendedor
        const menuButtons = document.querySelectorAll('.seller-menu-btn');
        menuButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const text = button.textContent.trim();
                if (text.includes('Dashboard')) {
                    window.location.href = 'vendedor-inicio.html';
                } else if (text.includes('Meus Produtos')) {
                    window.location.href = 'vendedor-produtos.html';
                } else if (text.includes('Estatísticas')) {
                    window.location.href = 'vendedor-estatisticas.html';
                } else if (text.includes('Configurações')) {
                    this.showNotification('Página em desenvolvimento', 'info');
                }
            });
        });
    }

    carregarDadosIniciais() {
        // Carregar doações do localStorage
        this.doacoes = JSON.parse(localStorage.getItem('reuse_vendedor_doacoes')) || [];
        
        // Se não houver dados, carregar dados de exemplo
        if (this.doacoes.length === 0) {
            this.carregarDadosExemplo();
        }
        
        this.atualizarInterface();
    }

    carregarDadosExemplo() {
        const doacoesExemplo = [
            {
                id: 'DOA-001',
                data: '2025-02-10',
                instituicao: 'Lar dos Idosos Esperança',
                categoria: 'assistencia-social',
                valor: 350.00,
                forma_pagamento: 'credito',
                status: 'concluida',
                anonima: false,
                mensagem: 'Espero ajudar no cuidado com os idosos!'
            },
            {
                id: 'DOA-002',
                data: '2025-02-05',
                instituicao: 'Instituto Criança Feliz',
                categoria: 'educacao',
                valor: 180.00,
                forma_pagamento: 'pix',
                status: 'concluida',
                anonima: false,
                mensagem: 'Para compra de material escolar'
            },
            {
                id: 'DOA-003',
                data: '2025-01-28',
                instituicao: 'ONG Animais Sem Lar',
                categoria: 'animais',
                valor: 75.50,
                forma_pagamento: 'debito',
                status: 'concluida',
                anonima: true,
                mensagem: ''
            },
            {
                id: 'DOA-004',
                data: '2025-01-15',
                instituicao: 'Projeto Meio Ambiente',
                categoria: 'meio-ambiente',
                valor: 120.00,
                forma_pagamento: 'boleto',
                status: 'processando',
                anonima: false,
                mensagem: 'Pelo futuro do planeta!'
            },
            {
                id: 'DOA-005',
                data: '2024-12-20',
                instituicao: 'Associação de Catadores',
                categoria: 'assistencia-social',
                valor: 200.00,
                forma_pagamento: 'saldo',
                status: 'concluida',
                anonima: false,
                mensagem: 'Apoio ao trabalho dos catadores'
            }
        ];
        
        this.doacoes = doacoesExemplo;
        localStorage.setItem('reuse_vendedor_doacoes', JSON.stringify(this.doacoes));
    }

    atualizarInterface() {
        this.atualizarCardsImpacto();
        this.renderizarTabelaDoacoes();
        this.verificarEmptyState();
    }

    atualizarCardsImpacto() {
        const totalDoado = this.doacoes
            .filter(d => d.status === 'concluida')
            .reduce((acc, d) => acc + d.valor, 0);
        
        const totalDoacoes = this.doacoes.length;
        
        const instituicoesApoiadas = [...new Set(this.doacoes.map(d => d.instituicao))].length;
        
        const totalDoadoElement = document.getElementById('totalDoado');
        const totalDoacoesElement = document.getElementById('totalDoacoes');
        const totalInstituicoesElement = document.getElementById('totalInstituicoes');
        
        if (totalDoadoElement) totalDoadoElement.textContent = `R$ ${totalDoado.toFixed(2).replace('.', ',')}`;
        if (totalDoacoesElement) totalDoacoesElement.textContent = totalDoacoes;
        if (totalInstituicoesElement) totalInstituicoesElement.textContent = instituicoesApoiadas;
    }

    atualizarFiltroInstituicoes() {
        if (!this.filtroInstituicao) return;
        
        // Limpar opções existentes (exceto "Todas")
        while (this.filtroInstituicao.options.length > 1) {
            this.filtroInstituicao.remove(1);
        }
        
        // Adicionar instituições únicas
        const instituicoes = [...new Set(this.doacoes.map(d => d.instituicao))];
        instituicoes.sort().forEach(inst => {
            const option = document.createElement('option');
            option.value = inst;
            option.textContent = inst;
            this.filtroInstituicao.appendChild(option);
        });
    }

    renderizarTabelaDoacoes(filtradas = null) {
        if (!this.tableBody) return;
        
        const doacoesParaRenderizar = filtradas || this.doacoes;
        
        if (doacoesParaRenderizar.length === 0) {
            this.tableBody.innerHTML = '';
            return;
        }
        
        this.tableBody.innerHTML = doacoesParaRenderizar
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .map(doacao => this.criarLinhaTabela(doacao))
            .join('');
        
        // Adicionar event listeners aos botões de ação
        this.configurarBotoesAcao();
    }

    criarLinhaTabela(doacao) {
        const dataFormatada = new Date(doacao.data).toLocaleDateString('pt-BR');
        const valorFormatado = `R$ ${doacao.valor.toFixed(2).replace('.', ',')}`;
        
        const statusClass = {
            'concluida': 'completed',
            'processando': 'processing',
            'pendente': 'pending',
            'cancelada': 'cancelled'
        }[doacao.status] || 'neutral';
        
        const statusText = {
            'concluida': 'Concluída',
            'processando': 'Processando',
            'pendente': 'Pendente',
            'cancelada': 'Cancelada'
        }[doacao.status] || doacao.status;
        
        const categoriaTexto = this.getCategoriaTexto(doacao.categoria);
        const pagamentoTexto = this.getFormaPagamentoTexto(doacao.forma_pagamento);
        const anonimoIcon = doacao.anonima ? '<i class="bi bi-incognito" title="Doação anônima"></i>' : '';
        
        return `
            <tr data-id="${doacao.id}">
                <td>${dataFormatada}</td>
                <td>
                    ${doacao.instituicao}
                    ${anonimoIcon}
                </td>
                <td>${categoriaTexto}</td>
                <td class="valor-destaque">${valorFormatado}</td>
                <td>${pagamentoTexto}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-icon btn-detalhes" title="Ver detalhes" data-id="${doacao.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn-icon btn-recibo" title="Gerar recibo" data-id="${doacao.id}">
                        <i class="bi bi-file-pdf"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    configurarBotoesAcao() {
        // Botões de detalhes
        document.querySelectorAll('.btn-detalhes').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.abrirDetalhesDoacao(id);
            });
        });
        
        // Botões de recibo
        document.querySelectorAll('.btn-recibo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.gerarRecibo(id);
            });
        });
    }

    abrirFormularioDoacao() {
        if (this.donationFormSection) {
            this.donationFormSection.style.display = 'block';
            this.donationFormSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    fecharFormularioDoacao() {
        if (this.donationFormSection) {
            this.donationFormSection.style.display = 'none';
            this.donationForm.reset();
        }
    }

    handleSubmitDoacao(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(this.donationForm);
        
        const instituicaoSelect = document.getElementById('instituicao');
        const instituicao = instituicaoSelect.options[instituicaoSelect.selectedIndex]?.text || '';
        
        const doacao = {
            id: `DOA-${String(this.doacoes.length + 1).padStart(3, '0')}`,
            data: new Date().toISOString().split('T')[0],
            instituicao: instituicao,
            categoria: formData.get('categoria'),
            valor: parseFloat(formData.get('valor')),
            forma_pagamento: formData.get('forma_pagamento'),
            anonima: formData.get('anonima') === 'on',
            mensagem: formData.get('mensagem'),
            status: 'processando'
        };
        
        // Validar valor
        if (!doacao.valor || doacao.valor <= 0) {
            this.showNotification('Por favor, insira um valor válido', 'error');
            return;
        }
        
        // Salvar dados para confirmação
        this.doacaoPendente = doacao;
        
        // Atualizar modal de confirmação
        this.confirmValor.textContent = `R$ ${doacao.valor.toFixed(2).replace('.', ',')}`;
        this.confirmInstituicao.textContent = doacao.instituicao;
        this.confirmCategoria.textContent = this.getCategoriaTexto(doacao.categoria) || 'Não especificada';
        this.confirmPagamento.textContent = this.getFormaPagamentoTexto(doacao.forma_pagamento);
        this.confirmMensagem.textContent = doacao.mensagem || '-';
        
        // Abrir modal de confirmação
        this.abrirModal(this.confirmModal);
    }

    confirmarDoacao() {
        if (!this.doacaoPendente) return;
        
        // Adicionar doação à lista
        this.doacoes.push(this.doacaoPendente);
        
        // Salvar no localStorage
        localStorage.setItem('reuse_vendedor_doacoes', JSON.stringify(this.doacoes));
        
        // Fechar modal e formulário
        this.fecharModal(this.confirmModal);
        this.fecharFormularioDoacao();
        
        // Atualizar interface
        this.atualizarInterface();
        this.atualizarFiltroInstituicoes();
        
        // Mostrar notificação de sucesso
        this.showNotification('Doação realizada com sucesso! Obrigado por contribuir.', 'success');
        
        // Limpar doação pendente
        this.doacaoPendente = null;
    }

    abrirDetalhesDoacao(id) {
        const doacao = this.doacoes.find(d => d.id === id);
        if (!doacao) return;
        
        const modalBody = document.getElementById('donationDetailsBody');
        if (!modalBody) return;
        
        const dataFormatada = new Date(doacao.data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusText = {
            'concluida': 'Concluída',
            'processando': 'Processando',
            'pendente': 'Pendente',
            'cancelada': 'Cancelada'
        }[doacao.status] || doacao.status;
        
        const statusClass = {
            'concluida': 'success',
            'processando': 'info',
            'pendente': 'warning',
            'cancelada': 'danger'
        }[doacao.status] || 'secondary';
        
        const categoriaTexto = this.getCategoriaTexto(doacao.categoria) || 'Não especificada';
        const pagamentoTexto = this.getFormaPagamentoTexto(doacao.forma_pagamento);
        const mensagem = doacao.mensagem || 'Sem mensagem';
        const anonima = doacao.anonima ? 'Sim (doação anônima)' : 'Não';
        
        modalBody.innerHTML = `
            <div class="donation-detail-card">
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-hash"></i> ID da Doação:</span>
                    <span class="detail-value">${doacao.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-calendar"></i> Data:</span>
                    <span class="detail-value">${dataFormatada}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-building"></i> Instituição:</span>
                    <span class="detail-value">${doacao.instituicao}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-tag"></i> Categoria:</span>
                    <span class="detail-value">${categoriaTexto}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-cash"></i> Valor:</span>
                    <span class="detail-value valor">R$ ${doacao.valor.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-credit-card"></i> Forma de Pagamento:</span>
                    <span class="detail-value">${pagamentoTexto}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-incognito"></i> Doação Anônima:</span>
                    <span class="detail-value">${anonima}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-chat"></i> Mensagem:</span>
                    <span class="detail-value mensagem">${mensagem}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label"><i class="bi bi-check-circle"></i> Status:</span>
                    <span class="detail-value"><span class="status-badge ${statusClass}">${statusText}</span></span>
                </div>
            </div>
        `;
        
        this.abrirModal(this.detailsModal);
        
        // Guardar ID da doação para o recibo
        this.doacaoReciboId = id;
    }

    gerarRecibo(id = null) {
        const doacaoId = id || this.doacaoReciboId;
        const doacao = this.doacoes.find(d => d.id === doacaoId);
        
        if (!doacao) {
            this.showNotification('Doação não encontrada', 'error');
            return;
        }
        
        // Simular geração de recibo
        this.showNotification(`Recibo da doação ${doacao.id} gerado com sucesso!`, 'success');
        
        // Aqui você pode implementar a geração real de PDF
        console.log('Gerando recibo para:', doacao);
    }

    exportarHistorico() {
        if (this.doacoes.length === 0) {
            this.showNotification('Nenhuma doação para exportar', 'warning');
            return;
        }
        
        // Criar CSV
        const headers = ['ID', 'Data', 'Instituição', 'Categoria', 'Valor', 'Forma de Pagamento', 'Status', 'Anônima', 'Mensagem'];
        const rows = this.doacoes.map(d => [
            d.id,
            d.data,
            d.instituicao,
            this.getCategoriaTexto(d.categoria),
            d.valor.toFixed(2).replace('.', ','),
            this.getFormaPagamentoTexto(d.forma_pagamento),
            d.status,
            d.anonima ? 'Sim' : 'Não',
            d.mensagem || ''
        ]);
        
        const csvContent = [headers.join(';'), ...rows.map(row => row.join(';'))].join('\n');
        
        // Criar link de download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `historico_doacoes_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Histórico exportado com sucesso!', 'success');
    }

    aplicarFiltros() {
        const periodo = this.filtroPeriodo?.value || 'todos';
        const instituicao = this.filtroInstituicao?.value || 'todas';
        
        let doacoesFiltradas = [...this.doacoes];
        
        // Filtrar por período
        if (periodo !== 'todos') {
            const hoje = new Date();
            let dataLimite = new Date();
            
            if (periodo === 'mes') {
                dataLimite.setMonth(hoje.getMonth() - 1);
            } else if (periodo === 'trimestre') {
                dataLimite.setMonth(hoje.getMonth() - 3);
            } else if (periodo === 'ano') {
                dataLimite.setFullYear(hoje.getFullYear() - 1);
            }
            
            doacoesFiltradas = doacoesFiltradas.filter(d => new Date(d.data) >= dataLimite);
        }
        
        // Filtrar por instituição
        if (instituicao !== 'todas') {
            doacoesFiltradas = doacoesFiltradas.filter(d => d.instituicao === instituicao);
        }
        
        this.renderizarTabelaDoacoes(doacoesFiltradas);
    }

    verificarEmptyState() {
        if (this.emptyState) {
            if (this.doacoes.length === 0) {
                this.emptyState.style.display = 'block';
                if (this.tableBody) this.tableBody.parentElement.style.display = 'none';
            } else {
                this.emptyState.style.display = 'none';
                if (this.tableBody) this.tableBody.parentElement.style.display = 'block';
            }
        }
    }

    abrirModal(modal) {
        if (modal) {
            modal.classList.add('active');
        }
    }

    fecharModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    getCategoriaTexto(categoria) {
        const categorias = {
            'alimentos': 'Alimentos',
            'educacao': 'Educação',
            'saude': 'Saúde',
            'animais': 'Animais',
            'meio-ambiente': 'Meio Ambiente',
            'assistencia-social': 'Assistência Social'
        };
        return categorias[categoria] || categoria || 'Não especificada';
    }

    getFormaPagamentoTexto(forma) {
        const formas = {
            'credito': 'Cartão de Crédito',
            'debito': 'Cartão de Débito',
            'pix': 'PIX',
            'boleto': 'Boleto Bancário',
            'saldo': 'Saldo em Conta ReUse'
        };
        return formas[forma] || forma;
    }

    showNotification(message, type = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        if (type === 'warning') iconClass = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : 
                       type === 'warning' ? '#ffa502' : '#0066cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '10000',
            animation: 'slideInRight 3s ease',
            fontWeight: '500',
            maxWidth: '400px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.NOTIFICATION_DURATION);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.vendedorDoacoes = new VendedorDoacoes();
});