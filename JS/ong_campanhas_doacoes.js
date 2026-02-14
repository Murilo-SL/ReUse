// ong-campanhas-doacoes.js - Gerenciamento avançado de campanhas e doações

class OngCampanhasDoacoes {
    constructor() {
        this.API_BASE_URL = 'https://api.reuse.com/v1'; // Simulado
        this.campanhas = [];
        this.doacoes = {
            pendentes: [],
            agendadas: [],
            concluidas: []
        };
        
        this.init();
    }

    init() {
        this.loadElements();
        this.setupEventListeners();
        this.loadInitialData();
        this.setupDragAndDrop();
        this.setupRealTimeUpdates();
    }

    loadElements() {
        // Container de campanhas
        this.campanhasGrid = document.querySelector('.campanhas-grid');
        this.btnCriarCampanha = document.querySelector('.btn-criar-campanha');
        
        // Container de doações
        this.doacoesContainer = document.querySelector('.doacoes-list');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        
        // Modais
        this.modalNovaCampanha = document.getElementById('novaCampanhaModal');
        this.modalDetalhesDoacao = document.getElementById('detalhesDoacaoModal');
        this.modalEditarCampanha = this.createEditCampanhaModal();
        
        // Formulários
        this.campanhaForm = document.getElementById('campanhaForm');
        this.filtrosContainer = this.createFiltrosUI();
    }

    setupEventListeners() {
        // Botão de nova campanha
        if (this.btnCriarCampanha) {
            this.btnCriarCampanha.addEventListener('click', () => this.abrirModalNovaCampanha());
        }

        // Tabs de doações
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.mudarTabDoacoes(e.target));
        });

        // Filtros
        this.setupFiltros();

        // Botões de ação nas campanhas (delegação)
        document.addEventListener('click', (e) => {
            // Botão de compartilhar campanha
            if (e.target.closest('.btn-share-campanha')) {
                const campanhaCard = e.target.closest('.campanha-card');
                this.compartilharCampanha(campanhaCard);
            }
            
            // Botão de editar campanha
            if (e.target.closest('.btn-edit-campanha')) {
                const campanhaCard = e.target.closest('.campanha-card');
                this.editarCampanha(campanhaCard);
            }
            
            // Botão de ver detalhes da doação
            if (e.target.closest('.btn-view-doacao')) {
                const doacaoItem = e.target.closest('.doacao-item');
                this.verDetalhesDoacao(doacaoItem);
            }
            
            // Botão de confirmar coleta
            if (e.target.closest('.btn-confirmar-coleta')) {
                const doacaoItem = e.target.closest('.doacao-item');
                this.confirmarColeta(doacaoItem);
            }
            
            // Botão de reagendar
            if (e.target.closest('.btn-reagendar')) {
                const doacaoItem = e.target.closest('.doacao-item');
                this.reagendarColeta(doacaoItem);
            }
            
            // Botão de entrar em contato
            if (e.target.closest('.btn-contato-doacao')) {
                const doacaoItem = e.target.closest('.doacao-item');
                this.entrarContatoDoador(doacaoItem);
            }
        });

        // Atualizações em tempo real (simulado)
        setInterval(() => this.verificarAtualizacoes(), 30000); // A cada 30 segundos
    }

    setupFiltros() {
        // Criar barra de filtros para campanhas
        const filtrosHTML = `
            <div class="filtros-campanhas">
                <div class="filtros-group">
                    <select class="filtro-status" id="filtroStatusCampanha">
                        <option value="todas">Todas as campanhas</option>
                        <option value="ativas">Ativas</option>
                        <option value="pendentes">Pendentes</option>
                        <option value="finalizadas">Finalizadas</option>
                    </select>
                    
                    <select class="filtro-tipo" id="filtroTipoCampanha">
                        <option value="todos">Todos os tipos</option>
                        <option value="itens">Arrecadação de Itens</option>
                        <option value="financeira">Arrecadação Financeira</option>
                        <option value="voluntarios">Voluntários</option>
                        <option value="evento">Evento</option>
                    </select>
                    
                    <input type="text" class="filtro-busca" id="buscaCampanha" placeholder="Buscar campanha...">
                    
                    <button class="btn-filtro-aplicar" id="aplicarFiltrosCampanha">
                        <i class="bi bi-funnel"></i> Filtrar
                    </button>
                </div>
                
                <div class="filtros-ordenacao">
                    <span>Ordenar por:</span>
                    <button class="ordenacao-btn active" data-ordem="recentes">Mais recentes</button>
                    <button class="ordenacao-btn" data-ordem="progresso">Progresso</button>
                    <button class="ordenacao-btn" data-ordem="dias">Dias restantes</button>
                </div>
            </div>
        `;

        // Inserir filtros antes do grid de campanhas
        const campanhasSection = document.querySelector('.campanhas-section');
        if (campanhasSection && !document.querySelector('.filtros-campanhas')) {
            campanhasSection.insertAdjacentHTML('afterbegin', filtrosHTML);

            // Event listeners dos filtros
            document.getElementById('aplicarFiltrosCampanha')?.addEventListener('click', () => this.aplicarFiltrosCampanhas());
            document.getElementById('filtroStatusCampanha')?.addEventListener('change', () => this.aplicarFiltrosCampanhas());
            document.getElementById('filtroTipoCampanha')?.addEventListener('change', () => this.aplicarFiltrosCampanhas());
            document.getElementById('buscaCampanha')?.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') this.aplicarFiltrosCampanhas();
            });

            // Ordenação
            document.querySelectorAll('.ordenacao-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.ordenacao-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.ordenarCampanhas(e.target.dataset.ordem);
                });
            });
        }
    }

    loadInitialData() {
        this.carregarCampanhas();
        this.carregarDoacoes();
    }

    async carregarCampanhas() {
        // Simular carregamento de dados de uma API
        this.showLoading('.campanhas-grid');
        
        setTimeout(() => {
            this.campanhas = [
                {
                    id: 1,
                    titulo: 'Arrecadação de Rações',
                    descricao: 'Ajude-nos a alimentar os gatinhos resgatados. Precisamos de rações de todas as marcas.',
                    status: 'ativa',
                    tipo: 'itens',
                    meta: 500,
                    metaTipo: 'itens',
                    arrecadado: 120,
                    doadores: 45,
                    diasRestantes: 15,
                    corGradiente: 'linear-gradient(135deg, #0066cc, #00cc99)',
                    dataCriacao: '2025-01-15',
                    dataFim: '2025-02-28'
                },
                {
                    id: 2,
                    titulo: 'Medicamentos e Castração',
                    descricao: 'Campanha para arrecadar fundos para medicamentos e procedimentos de castração.',
                    status: 'ativa',
                    tipo: 'financeira',
                    meta: 3000,
                    metaTipo: 'financeira',
                    arrecadado: 1250,
                    doadores: 28,
                    diasRestantes: 30,
                    corGradiente: 'linear-gradient(135deg, #9933cc, #cc66ff)',
                    dataCriacao: '2025-01-20',
                    dataFim: '2025-03-15'
                },
                {
                    id: 3,
                    titulo: 'Feira de Adoção',
                    descricao: 'Organização de feira de adoção no Parque da Cidade. Precisamos de voluntários e materiais.',
                    status: 'pendente',
                    tipo: 'evento',
                    meta: null,
                    metaTipo: null,
                    voluntarios: 8,
                    dataPrevista: '15/03/2025',
                    corGradiente: 'linear-gradient(135deg, #ffa502, #ffd32a)',
                    dataCriacao: '2025-02-01'
                },
                {
                    id: 4,
                    titulo: 'Roupinhas e Cobertores',
                    descricao: 'Inverno chegando! Precisamos de roupinhas e cobertores para os animais.',
                    status: 'ativa',
                    tipo: 'itens',
                    meta: 200,
                    metaTipo: 'itens',
                    arrecadado: 85,
                    doadores: 23,
                    diasRestantes: 45,
                    corGradiente: 'linear-gradient(135deg, #00cc99, #33ffcc)',
                    dataCriacao: '2025-02-05',
                    dataFim: '2025-04-01'
                },
                {
                    id: 5,
                    titulo: 'Voluntários para Eventos',
                    descricao: 'Precisamos de voluntários para ajudar nos eventos de adoção aos finais de semana.',
                    status: 'ativa',
                    tipo: 'voluntarios',
                    meta: 15,
                    metaTipo: 'voluntarios',
                    arrecadado: 8,
                    doadores: 8,
                    diasRestantes: 60,
                    corGradiente: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                    dataCriacao: '2025-02-10',
                    dataFim: '2025-04-15'
                }
            ];

            this.renderizarCampanhas(this.campanhas);
            this.hideLoading('.campanhas-grid');
        }, 800);
    }

    renderizarCampanhas(campanhas) {
        if (!this.campanhasGrid) return;

        if (campanhas.length === 0) {
            this.campanhasGrid.innerHTML = `
                <div class="nenhuma-campanha">
                    <i class="bi bi-megaphone"></i>
                    <h3>Nenhuma campanha encontrada</h3>
                    <p>Que tal criar sua primeira campanha?</p>
                    <button class="btn btn-primary" onclick="window.campanhasDoacoes.abrirModalNovaCampanha()">
                        <i class="bi bi-plus-circle"></i> Criar Campanha
                    </button>
                </div>
            `;
            return;
        }

        let html = '';
        campanhas.forEach(campanha => {
            const progresso = this.calcularProgresso(campanha);
            const metaDisplay = this.formatarMeta(campanha);
            const arrecadadoDisplay = this.formatarArrecadado(campanha);
            
            html += `
                <div class="campanha-card" data-id="${campanha.id}" data-status="${campanha.status}" data-tipo="${campanha.tipo}">
                    <div class="campanha-header" style="background: ${campanha.corGradiente};">
                        <span class="campanha-status ${campanha.status}">${this.getStatusText(campanha.status)}</span>
                        <span class="campanha-dias">${this.getDiasTexto(campanha)}</span>
                    </div>
                    <div class="campanha-body">
                        <div class="campanha-tipo-badge tipo-${campanha.tipo}">
                            ${this.getTipoIcon(campanha.tipo)} ${this.getTipoText(campanha.tipo)}
                        </div>
                        
                        <h3 class="campanha-titulo">${campanha.titulo}</h3>
                        <p class="campanha-descricao">${campanha.descricao}</p>
                        
                        <div class="campanha-meta">
                            ${this.renderizarMetaCampanha(campanha)}
                        </div>

                        ${campanha.status === 'ativa' ? this.renderizarBarraProgresso(campanha, progresso) : ''}
                        ${campanha.status === 'pendente' ? this.renderizarInfoPendente() : ''}

                        <div class="campanha-acoes">
                            <button class="btn btn-outline btn-edit-campanha">
                                <i class="bi bi-pencil"></i>
                                Editar
                            </button>
                            <button class="btn btn-primary btn-share-campanha">
                                <i class="bi bi-share"></i>
                                Compartilhar
                            </button>
                            ${campanha.status === 'pendente' ? `
                                <button class="btn btn-secondary btn-historico">
                                    <i class="bi bi-clock-history"></i>
                                    Histórico
                                </button>
                            ` : ''}
                        </div>
                        
                        ${campanha.status === 'ativa' ? `
                            <div class="campanha-footer">
                                <button class="btn-link btn-encerrar" onclick="window.campanhasDoacoes.encerrarCampanha(${campanha.id})">
                                    <i class="bi bi-x-circle"></i> Encerrar campanha
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        this.campanhasGrid.innerHTML = html;
    }

    renderizarMetaCampanha(campanha) {
        if (campanha.tipo === 'itens') {
            return `
                <div class="meta-item">
                    <i class="bi bi-box"></i>
                    <span><strong>${campanha.arrecadado}</strong> de ${campanha.meta} itens</span>
                </div>
                <div class="meta-item">
                    <i class="bi bi-people"></i>
                    <span><strong>${campanha.doadores}</strong> doadores</span>
                </div>
            `;
        } else if (campanha.tipo === 'financeira') {
            return `
                <div class="meta-item">
                    <i class="bi bi-cash-coin"></i>
                    <span><strong>R$ ${campanha.arrecadado}</strong> de R$ ${campanha.meta}</span>
                </div>
                <div class="meta-item">
                    <i class="bi bi-people"></i>
                    <span><strong>${campanha.doadores}</strong> doadores</span>
                </div>
            `;
        } else if (campanha.tipo === 'voluntarios') {
            return `
                <div class="meta-item">
                    <i class="bi bi-person-workspace"></i>
                    <span><strong>${campanha.arrecadado}</strong> de ${campanha.meta} voluntários</span>
                </div>
            `;
        } else if (campanha.tipo === 'evento') {
            return `
                <div class="meta-item">
                    <i class="bi bi-calendar"></i>
                    <span><strong>${campanha.dataPrevista}</strong> data prevista</span>
                </div>
                <div class="meta-item">
                    <i class="bi bi-person-workspace"></i>
                    <span><strong>${campanha.voluntarios || 0}</strong> voluntários</span>
                </div>
            `;
        }
        return '';
    }

    renderizarBarraProgresso(campanha, progresso) {
        return `
            <div class="progresso-container">
                <div class="progresso-label">
                    <span>Meta: ${this.formatarMeta(campanha)}</span>
                    <span>${progresso}%</span>
                </div>
                <div class="progresso-bar">
                    <div class="progresso-fill" style="width: ${progresso}%;"></div>
                </div>
            </div>
        `;
    }

    renderizarInfoPendente() {
        return `
            <div class="info-box">
                <i class="bi bi-info-circle"></i>
                <span>Aguardando análise da equipe ReUse</span>
            </div>
        `;
    }

    calcularProgresso(campanha) {
        if (!campanha.meta || campanha.meta === 0) return 0;
        return Math.round((campanha.arrecadado / campanha.meta) * 100);
    }

    formatarMeta(campanha) {
        if (campanha.tipo === 'financeira') {
            return `R$ ${campanha.meta}`;
        } else if (campanha.tipo === 'itens') {
            return `${campanha.meta} itens`;
        } else if (campanha.tipo === 'voluntarios') {
            return `${campanha.meta} voluntários`;
        }
        return '-';
    }

    formatarArrecadado(campanha) {
        if (campanha.tipo === 'financeira') {
            return `R$ ${campanha.arrecadado}`;
        } else if (campanha.tipo === 'itens') {
            return `${campanha.arrecadado} itens`;
        } else if (campanha.tipo === 'voluntarios') {
            return `${campanha.arrecadado} voluntários`;
        }
        return '-';
    }

    getStatusText(status) {
        const statusMap = {
            'ativa': 'Ativa',
            'pendente': 'Pendente',
            'finalizada': 'Finalizada'
        };
        return statusMap[status] || status;
    }

    getDiasTexto(campanha) {
        if (campanha.status === 'pendente') {
            return 'Aguardando aprovação';
        }
        if (campanha.diasRestantes) {
            return `${campanha.diasRestantes} dias restantes`;
        }
        return 'Sem prazo definido';
    }

    getTipoIcon(tipo) {
        const icons = {
            'itens': '<i class="bi bi-box"></i>',
            'financeira': '<i class="bi bi-cash-coin"></i>',
            'voluntarios': '<i class="bi bi-person-workspace"></i>',
            'evento': '<i class="bi bi-calendar-event"></i>'
        };
        return icons[tipo] || '<i class="bi bi-megaphone"></i>';
    }

    getTipoText(tipo) {
        const textos = {
            'itens': 'Itens',
            'financeira': 'Financeira',
            'voluntarios': 'Voluntários',
            'evento': 'Evento'
        };
        return textos[tipo] || tipo;
    }

    aplicarFiltrosCampanhas() {
        const status = document.getElementById('filtroStatusCampanha')?.value || 'todas';
        const tipo = document.getElementById('filtroTipoCampanha')?.value || 'todos';
        const busca = document.getElementById('buscaCampanha')?.value.toLowerCase() || '';

        let campanhasFiltradas = [...this.campanhas];

        // Filtrar por status
        if (status !== 'todas') {
            campanhasFiltradas = campanhasFiltradas.filter(c => c.status === status);
        }

        // Filtrar por tipo
        if (tipo !== 'todos') {
            campanhasFiltradas = campanhasFiltradas.filter(c => c.tipo === tipo);
        }

        // Filtrar por busca
        if (busca) {
            campanhasFiltradas = campanhasFiltradas.filter(c => 
                c.titulo.toLowerCase().includes(busca) || 
                c.descricao.toLowerCase().includes(busca)
            );
        }

        this.renderizarCampanhas(campanhasFiltradas);
        this.mostrarNotificacao(`${campanhasFiltradas.length} campanhas encontradas`, 'info');
    }

    ordenarCampanhas(ordem) {
        let campanhasOrdenadas = [...this.campanhas];

        switch(ordem) {
            case 'recentes':
                campanhasOrdenadas.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
                break;
            case 'progresso':
                campanhasOrdenadas.sort((a, b) => {
                    const progressoA = this.calcularProgresso(a);
                    const progressoB = this.calcularProgresso(b);
                    return progressoB - progressoA;
                });
                break;
            case 'dias':
                campanhasOrdenadas.sort((a, b) => (a.diasRestantes || 0) - (b.diasRestantes || 0));
                break;
        }

        this.renderizarCampanhas(campanhasOrdenadas);
    }

    async carregarDoacoes() {
        // Simular carregamento de doações
        setTimeout(() => {
            this.doacoes = {
                pendentes: [
                    {
                        id: 1,
                        doador: 'Maria Clara',
                        contato: 'maria.c@email.com',
                        telefone: '(11) 98765-4321',
                        produtos: ['Rações (5kg)', 'Cobertores (3)', 'Medicamentos (2)'],
                        endereco: 'Rua das Flores, 123 - Jardim América, São Paulo/SP',
                        complemento: 'Apartamento 45, bloco B',
                        observacoes: 'Doador prefere coleta no período da tarde',
                        dataSolicitacao: '2025-02-15'
                    },
                    {
                        id: 2,
                        doador: 'João Pedro',
                        contato: 'joao.p@email.com',
                        telefone: '(11) 97654-3210',
                        produtos: ['Brinquedos (8)', 'Camas (2)', 'Roupinhas (5)'],
                        endereco: 'Av. Paulista, 1500 - Bela Vista, São Paulo/SP',
                        complemento: 'Sala 1205',
                        observacoes: 'Disponível apenas aos sábados',
                        dataSolicitacao: '2025-02-16'
                    },
                    {
                        id: 3,
                        doador: 'Ana Beatriz',
                        contato: 'ana.b@email.com',
                        telefone: '(11) 96543-2109',
                        produtos: ['Livros infantis (10)', 'Material escolar (15)'],
                        endereco: 'Rua Augusta, 500 - Consolação, São Paulo/SP',
                        dataSolicitacao: '2025-02-17'
                    }
                ],
                agendadas: [
                    {
                        id: 4,
                        doador: 'Carlos Eduardo',
                        contato: 'carlos.e@email.com',
                        telefone: '(11) 95432-1098',
                        produtos: ['Ração para cães (10kg)', 'Cobertores (5)'],
                        endereco: 'Rua Oscar Freire, 900 - Jardins, São Paulo/SP',
                        dataAgendada: '2025-02-20',
                        horario: '14:00 - 16:00'
                    },
                    {
                        id: 5,
                        doador: 'Fernanda Lima',
                        contato: 'fernanda.l@email.com',
                        telefone: '(11) 94321-0987',
                        produtos: ['Medicamentos (3 caixas)', 'Produtos de limpeza (8)'],
                        endereco: 'Alameda Santos, 1500 - Cerqueira César, São Paulo/SP',
                        dataAgendada: '2025-02-22',
                        horario: '10:00 - 12:00'
                    }
                ],
                concluidas: [
                    {
                        id: 6,
                        doador: 'Ana Silva',
                        contato: 'ana.s@email.com',
                        telefone: '(11) 99876-5432',
                        produtos: ['Livros (15)', 'Móveis (3)', 'Eletrônicos (2)'],
                        dataColeta: '2025-02-10',
                        avaliacao: 5
                    },
                    {
                        id: 7,
                        doador: 'Roberto Carlos',
                        contato: 'roberto.c@email.com',
                        telefone: '(11) 98765-1234',
                        produtos: ['Brinquedos (12)', 'Roupas (20)'],
                        dataColeta: '2025-02-08',
                        avaliacao: 4
                    },
                    {
                        id: 8,
                        doador: 'Patrícia Gomes',
                        contato: 'patricia.g@email.com',
                        telefone: '(11) 97654-5678',
                        produtos: ['Rações (15kg)', 'Areia sanitária (10kg)'],
                        dataColeta: '2025-02-05',
                        avaliacao: 5
                    }
                ]
            };

            this.renderizarDoacoes('pendentes');
        }, 500);
    }

    renderizarDoacoes(tab) {
        if (!this.doacoesContainer) return;

        const doacoes = this.doacoes[tab] || [];
        
        if (doacoes.length === 0) {
            this.doacoesContainer.innerHTML = `
                <div class="nenhuma-doacao">
                    <i class="bi bi-gift"></i>
                    <h3>Nenhuma doação ${tab}</h3>
                    <p>Novas doações aparecerão aqui quando disponíveis</p>
                </div>
            `;
            return;
        }

        let html = '';
        doacoes.forEach(doacao => {
            if (tab === 'pendentes') {
                html += this.renderizarDoacaoPendente(doacao);
            } else if (tab === 'agendadas') {
                html += this.renderizarDoacaoAgendada(doacao);
            } else if (tab === 'concluidas') {
                html += this.renderizarDoacaoConcluida(doacao);
            }
        });

        this.doacoesContainer.innerHTML = html;
    }

    renderizarDoacaoPendente(doacao) {
        return `
            <div class="doacao-item" data-id="${doacao.id}" data-status="pendente">
                <div class="doacao-info">
                    <div class="doador-info">
                        <div class="doador-avatar">${this.getIniciais(doacao.doador)}</div>
                        <div>
                            <h4>${doacao.doador}</h4>
                            <p class="doador-contato">
                                <i class="bi bi-envelope"></i> ${doacao.contato} 
                                <i class="bi bi-telephone"></i> ${doacao.telefone}
                            </p>
                        </div>
                    </div>
                    <div class="doacao-status pendente">
                        <i class="bi bi-hourglass-split"></i> Aguardando Coleta
                    </div>
                </div>

                <div class="doacao-produtos">
                    ${doacao.produtos.map(p => `<span class="produto-tag">${p}</span>`).join('')}
                </div>

                <div class="doacao-endereco">
                    <i class="bi bi-geo-alt"></i>
                    <span>${doacao.endereco}</span>
                    ${doacao.complemento ? `<small>${doacao.complemento}</small>` : ''}
                </div>

                <div class="doacao-acoes">
                    <button class="btn btn-outline btn-contato-doacao">
                        <i class="bi bi-telephone"></i>
                        Entrar em Contato
                    </button>
                    <button class="btn btn-primary btn-confirmar-coleta">
                        <i class="bi bi-check-circle"></i>
                        Confirmar Coleta
                    </button>
                    <button class="btn btn-secondary btn-reagendar">
                        <i class="bi bi-calendar-check"></i>
                        Reagendar
                    </button>
                    <button class="btn btn-link btn-view-doacao">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderizarDoacaoAgendada(doacao) {
        return `
            <div class="doacao-item" data-id="${doacao.id}" data-status="agendada">
                <div class="doacao-info">
                    <div class="doador-info">
                        <div class="doador-avatar">${this.getIniciais(doacao.doador)}</div>
                        <div>
                            <h4>${doacao.doador}</h4>
                            <p class="doador-contato">
                                <i class="bi bi-envelope"></i> ${doacao.contato}
                            </p>
                        </div>
                    </div>
                    <div class="doacao-status agendada">
                        <i class="bi bi-calendar-check"></i> Coleta Agendada
                    </div>
                </div>

                <div class="doacao-produtos">
                    ${doacao.produtos.map(p => `<span class="produto-tag">${p}</span>`).join('')}
                </div>

                <div class="doacao-data">
                    <i class="bi bi-calendar"></i>
                    <span>Data: ${this.formatarData(doacao.dataAgendada)} - ${doacao.horario}</span>
                </div>

                <div class="doacao-endereco">
                    <i class="bi bi-geo-alt"></i>
                    <span>${doacao.endereco}</span>
                </div>

                <div class="doacao-acoes">
                    <button class="btn btn-outline btn-contato-doacao">
                        <i class="bi bi-telephone"></i>
                        Confirmar Presença
                    </button>
                    <button class="btn btn-secondary btn-reagendar">
                        <i class="bi bi-calendar-check"></i>
                        Reagendar
                    </button>
                    <button class="btn btn-link btn-view-doacao">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderizarDoacaoConcluida(doacao) {
        return `
            <div class="doacao-item" data-id="${doacao.id}" data-status="concluida">
                <div class="doacao-info">
                    <div class="doador-info">
                        <div class="doador-avatar">${this.getIniciais(doacao.doador)}</div>
                        <div>
                            <h4>${doacao.doador}</h4>
                            <p class="doador-contato">${doacao.contato}</p>
                        </div>
                    </div>
                    <div class="doacao-status concluida">
                        <i class="bi bi-check-circle"></i> Coleta Realizada
                    </div>
                </div>

                <div class="doacao-produtos">
                    ${doacao.produtos.map(p => `<span class="produto-tag">${p}</span>`).join('')}
                </div>

                <div class="doacao-data">
                    <i class="bi bi-calendar"></i>
                    <span>Coletado em: ${this.formatarData(doacao.dataColeta)}</span>
                </div>

                ${doacao.avaliacao ? `
                    <div class="doacao-avaliacao">
                        <i class="bi bi-star-fill"></i> ${'★'.repeat(doacao.avaliacao)}${'☆'.repeat(5-doacao.avaliacao)}
                    </div>
                ` : ''}

                <div class="doacao-acoes">
                    <button class="btn btn-outline">
                        <i class="bi bi-star"></i>
                        Avaliar Doador
                    </button>
                    <button class="btn btn-secondary btn-view-doacao">
                        <i class="bi bi-file-text"></i>
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
    }

    mudarTabDoacoes(tabBtn) {
        // Remover active de todas as tabs
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar active à tab clicada
        tabBtn.classList.add('active');
        
        const tab = tabBtn.getAttribute('data-tab');
        this.renderizarDoacoes(tab);
    }

    abrirModalNovaCampanha() {
        if (this.modalNovaCampanha) {
            this.modalNovaCampanha.classList.add('active');
            
            // Configurar o formulário
            this.setupFormularioCampanha();
        }
    }

    setupFormularioCampanha() {
        const form = document.getElementById('campanhaForm');
        if (!form) return;

        // Limpar formulário
        form.reset();

        // Configurar upload de imagem
        const uploadArea = document.getElementById('campanhaImageUpload');
        const fileInput = document.getElementById('campanhaImagem');
        
        if (uploadArea && fileInput) {
            // Remover listeners antigos clonando o elemento
            const newUploadArea = uploadArea.cloneNode(true);
            uploadArea.parentNode.replaceChild(newUploadArea, uploadArea);
            
            const newFileInput = fileInput.cloneNode(true);
            fileInput.parentNode.replaceChild(newFileInput, fileInput);
            
            // Adicionar novos listeners
            newUploadArea.addEventListener('click', () => newFileInput.click());
            
            newFileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0]);
                }
            });

            newUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                newUploadArea.style.borderColor = 'var(--primary-purple)';
            });

            newUploadArea.addEventListener('dragleave', () => {
                newUploadArea.style.borderColor = 'var(--light-gray-2)';
            });

            newUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                newUploadArea.style.borderColor = 'var(--light-gray-2)';
                
                if (e.dataTransfer.files.length > 0) {
                    this.handleImageUpload(e.dataTransfer.files[0]);
                }
            });
        }

        // Configurar botão de criar campanha
        const btnCriar = document.getElementById('criarCampanha');
        if (btnCriar) {
            const newBtnCriar = btnCriar.cloneNode(true);
            btnCriar.parentNode.replaceChild(newBtnCriar, btnCriar);
            
            newBtnCriar.addEventListener('click', () => this.criarNovaCampanha());
        }

        // Configurar botões de cancelar
        const closeBtn = document.getElementById('closeCampanhaModal');
        const cancelBtn = document.getElementById('cancelCampanha');
        
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            newCloseBtn.addEventListener('click', () => this.fecharModalNovaCampanha());
        }
        
        if (cancelBtn) {
            const newCancelBtn = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
            newCancelBtn.addEventListener('click', () => this.fecharModalNovaCampanha());
        }

        // Fechar ao clicar fora
        this.modalNovaCampanha.addEventListener('click', (e) => {
            if (e.target === this.modalNovaCampanha) {
                this.fecharModalNovaCampanha();
            }
        });

        // Mostrar/esconder campo de meta baseado no tipo
        const tipoSelect = document.getElementById('campanhaTipo');
        const metaGroup = tipoSelect?.closest('.form-row')?.querySelector('.form-group:last-child');
        
        if (tipoSelect && metaGroup) {
            const newTipoSelect = tipoSelect.cloneNode(true);
            tipoSelect.parentNode.replaceChild(newTipoSelect, tipoSelect);
            
            newTipoSelect.addEventListener('change', () => {
                const tipo = newTipoSelect.value;
                const metaInput = document.getElementById('campanhaMeta');
                
                if (metaInput) {
                    if (tipo === 'itens') {
                        metaInput.placeholder = 'Ex: 500 itens';
                    } else if (tipo === 'financeira') {
                        metaInput.placeholder = 'Ex: R$ 3.000';
                    } else if (tipo === 'voluntarios') {
                        metaInput.placeholder = 'Ex: 15 voluntários';
                    } else if (tipo === 'evento') {
                        metaInput.placeholder = 'Ex: 100 participantes';
                        metaGroup.style.display = 'block';
                    }
                }
            });
        }
    }

    criarNovaCampanha() {
        const titulo = document.getElementById('campanhaTitulo');
        const descricao = document.getElementById('campanhaDescricao');
        const tipo = document.getElementById('campanhaTipo');
        const meta = document.getElementById('campanhaMeta');
        const dataInicio = document.getElementById('campanhaDataInicio');
        const dataFim = document.getElementById('campanhaDataFim');
        const termos = document.getElementById('campanhaTermos');

        // Validações
        if (!titulo.value.trim()) {
            this.mostrarNotificacao('Por favor, insira um título para a campanha', 'error');
            titulo.focus();
            return;
        }

        if (!descricao.value.trim()) {
            this.mostrarNotificacao('Por favor, insira uma descrição para a campanha', 'error');
            descricao.focus();
            return;
        }

        if (!tipo.value) {
            this.mostrarNotificacao('Selecione o tipo da campanha', 'error');
            tipo.focus();
            return;
        }

        if (tipo.value !== 'evento' && !meta.value.trim()) {
            this.mostrarNotificacao('Por favor, insira a meta da campanha', 'error');
            meta.focus();
            return;
        }

        if (!dataInicio.value) {
            this.mostrarNotificacao('Selecione a data de início', 'error');
            dataInicio.focus();
            return;
        }

        if (!dataFim.value) {
            this.mostrarNotificacao('Selecione a data de término', 'error');
            dataFim.focus();
            return;
        }

        if (new Date(dataFim.value) <= new Date(dataInicio.value)) {
            this.mostrarNotificacao('A data de término deve ser posterior à data de início', 'error');
            dataFim.focus();
            return;
        }

        if (!termos.checked) {
            this.mostrarNotificacao('Você precisa aceitar os termos para criar a campanha', 'error');
            return;
        }

        // Criar objeto da campanha
        const novaCampanha = {
            id: this.campanhas.length + 1,
            titulo: titulo.value,
            descricao: descricao.value,
            tipo: tipo.value,
            status: 'pendente',
            meta: tipo.value !== 'evento' ? this.extrairNumeroMeta(meta.value) : null,
            metaTipo: tipo.value,
            arrecadado: 0,
            doadores: 0,
            dataCriacao: new Date().toISOString().split('T')[0],
            dataInicio: dataInicio.value,
            dataFim: dataFim.value,
            corGradiente: this.getGradientePorTipo(tipo.value)
        };

        // Simular envio para API
        this.mostrarNotificacao('Criando campanha...', 'info');
        
        setTimeout(() => {
            this.campanhas.unshift(novaCampanha);
            this.renderizarCampanhas(this.campanhas);
            this.fecharModalNovaCampanha();
            this.mostrarNotificacao('Campanha criada com sucesso! Aguardando aprovação.', 'success');
            
            // Rolagem suave para a seção de campanhas
            document.querySelector('.campanhas-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    }

    fecharModalNovaCampanha() {
        if (this.modalNovaCampanha) {
            this.modalNovaCampanha.classList.remove('active');
        }
    }

    editarCampanha(campanhaCard) {
        const campanhaId = campanhaCard?.dataset.id;
        if (!campanhaId) return;

        const campanha = this.campanhas.find(c => c.id == campanhaId);
        if (!campanha) return;

        // Criar modal de edição se não existir
        if (!this.modalEditarCampanha) {
            this.modalEditarCampanha = this.createEditCampanhaModal();
        }

        // Preencher formulário com dados da campanha
        document.getElementById('editCampanhaId').value = campanha.id;
        document.getElementById('editCampanhaTitulo').value = campanha.titulo;
        document.getElementById('editCampanhaDescricao').value = campanha.descricao;
        document.getElementById('editCampanhaTipo').value = campanha.tipo;
        document.getElementById('editCampanhaMeta').value = campanha.meta || '';
        document.getElementById('editCampanhaDataInicio').value = campanha.dataInicio || '';
        document.getElementById('editCampanhaDataFim').value = campanha.dataFim || '';
        document.getElementById('editCampanhaStatus').value = campanha.status;

        this.modalEditarCampanha.classList.add('active');
    }

    createEditCampanhaModal() {
        // Verificar se já existe
        if (document.getElementById('editCampanhaModal')) {
            return document.getElementById('editCampanhaModal');
        }

        const modalHTML = `
            <div class="modal" id="editCampanhaModal">
                <div class="modal-content modal-lg">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <i class="bi bi-pencil-square"></i>
                            Editar Campanha
                        </h3>
                        <button class="modal-close" id="closeEditModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="editCampanhaForm">
                            <input type="hidden" id="editCampanhaId">
                            
                            <div class="form-group">
                                <label for="editCampanhaTitulo">Título da Campanha</label>
                                <input type="text" id="editCampanhaTitulo" class="form-control">
                            </div>

                            <div class="form-group">
                                <label for="editCampanhaDescricao">Descrição</label>
                                <textarea id="editCampanhaDescricao" class="form-control" rows="4"></textarea>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editCampanhaTipo">Tipo de Campanha</label>
                                    <select id="editCampanhaTipo" class="form-control">
                                        <option value="itens">Arrecadação de Itens</option>
                                        <option value="financeira">Arrecadação Financeira</option>
                                        <option value="voluntarios">Voluntários</option>
                                        <option value="evento">Evento</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="editCampanhaMeta">Meta</label>
                                    <input type="text" id="editCampanhaMeta" class="form-control">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editCampanhaDataInicio">Data de Início</label>
                                    <input type="date" id="editCampanhaDataInicio" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label for="editCampanhaDataFim">Data de Término</label>
                                    <input type="date" id="editCampanhaDataFim" class="form-control">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="editCampanhaStatus">Status</label>
                                <select id="editCampanhaStatus" class="form-control">
                                    <option value="ativa">Ativa</option>
                                    <option value="pendente">Pendente</option>
                                    <option value="finalizada">Finalizada</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="cancelEditCampanha">Cancelar</button>
                        <button class="btn btn-primary" id="salvarEditCampanha">
                            <i class="bi bi-check-lg"></i>
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('editCampanhaModal');
        
        // Configurar eventos
        document.getElementById('closeEditModal')?.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        document.getElementById('cancelEditCampanha')?.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        document.getElementById('salvarEditCampanha')?.addEventListener('click', () => {
            this.salvarEdicaoCampanha();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        return modal;
    }

    salvarEdicaoCampanha() {
        const id = document.getElementById('editCampanhaId').value;
        const titulo = document.getElementById('editCampanhaTitulo').value;
        const descricao = document.getElementById('editCampanhaDescricao').value;
        const tipo = document.getElementById('editCampanhaTipo').value;
        const meta = document.getElementById('editCampanhaMeta').value;
        const dataInicio = document.getElementById('editCampanhaDataInicio').value;
        const dataFim = document.getElementById('editCampanhaDataFim').value;
        const status = document.getElementById('editCampanhaStatus').value;

        if (!titulo || !descricao) {
            this.mostrarNotificacao('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        const index = this.campanhas.findIndex(c => c.id == id);
        if (index !== -1) {
            this.campanhas[index] = {
                ...this.campanhas[index],
                titulo,
                descricao,
                tipo,
                meta: meta ? this.extrairNumeroMeta(meta) : null,
                dataInicio,
                dataFim,
                status
            };

            this.renderizarCampanhas(this.campanhas);
            this.modalEditarCampanha.classList.remove('active');
            this.mostrarNotificacao('Campanha atualizada com sucesso!', 'success');
        }
    }

    compartilharCampanha(campanhaCard) {
        const campanhaId = campanhaCard?.dataset.id;
        const campanha = this.campanhas.find(c => c.id == campanhaId);
        
        if (!campanha) return;

        // Simular compartilhamento
        if (navigator.share) {
            navigator.share({
                title: campanha.titulo,
                text: campanha.descricao,
                url: window.location.href
            }).catch(() => {
                this.mostrarOpcoesCompartilhamento(campanha);
            });
        } else {
            this.mostrarOpcoesCompartilhamento(campanha);
        }
    }

    mostrarOpcoesCompartilhamento(campanha) {
        const urlCompartilhamento = `${window.location.origin}/campanha/${campanha.id}`;
        
        const modalHTML = `
            <div class="modal" id="compartilharModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <i class="bi bi-share"></i>
                            Compartilhar Campanha
                        </h3>
                        <button class="modal-close" id="closeCompartilhar">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Compartilhe esta campanha para alcançar mais doadores:</p>
                        
                        <div class="compartilhar-link">
                            <input type="text" value="${urlCompartilhamento}" readonly id="linkCampanha">
                            <button class="btn btn-outline" onclick="navigator.clipboard.writeText('${urlCompartilhamento}')">
                                <i class="bi bi-files"></i> Copiar
                            </button>
                        </div>
                        
                        <div class="compartilhar-redes">
                            <button class="social-share whatsapp" onclick="window.open('https://wa.me/?text=${encodeURIComponent(campanha.titulo + ' - ' + urlCompartilhamento)}')">
                                <i class="bi bi-whatsapp"></i>
                            </button>
                            <button class="social-share facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlCompartilhamento)}')">
                                <i class="bi bi-facebook"></i>
                            </button>
                            <button class="social-share twitter" onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(campanha.titulo)}&url=${encodeURIComponent(urlCompartilhamento)}')">
                                <i class="bi bi-twitter"></i>
                            </button>
                            <button class="social-share linkedin" onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlCompartilhamento)}')">
                                <i class="bi bi-linkedin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remover modal anterior se existir
        const oldModal = document.getElementById('compartilharModal');
        if (oldModal) oldModal.remove();

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('compartilharModal');
        modal.classList.add('active');

        document.getElementById('closeCompartilhar')?.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    encerrarCampanha(campanhaId) {
        if (!confirm('Tem certeza que deseja encerrar esta campanha? Esta ação não pode ser desfeita.')) {
            return;
        }

        const index = this.campanhas.findIndex(c => c.id == campanhaId);
        if (index !== -1) {
            this.campanhas[index].status = 'finalizada';
            this.renderizarCampanhas(this.campanhas);
            this.mostrarNotificacao('Campanha encerrada com sucesso!', 'success');
        }
    }

    verDetalhesDoacao(doacaoItem) {
        const doacaoId = doacaoItem?.dataset.id;
        if (!doacaoId) return;

        // Encontrar a doação em qualquer categoria
        let doacao = null;
        let categoria = null;
        
        for (const [cat, lista] of Object.entries(this.doacoes)) {
            const encontrada = lista.find(d => d.id == doacaoId);
            if (encontrada) {
                doacao = encontrada;
                categoria = cat;
                break;
            }
        }

        if (!doacao) return;

        // Preencher modal com detalhes
        const modal = document.getElementById('detalhesDoacaoModal');
        if (!modal) return;

        const modalBody = modal.querySelector('.modal-body');
        if (!modalBody) return;

        const produtosList = doacao.produtos.map(p => `<li>${p}</li>`).join('');

        modalBody.innerHTML = `
            <div class="detalhes-doador">
                <h4><i class="bi bi-person-circle"></i> Informações do Doador</h4>
                <p><strong>Nome:</strong> ${doacao.doador}</p>
                <p><strong>Email:</strong> ${doacao.contato}</p>
                <p><strong>Telefone:</strong> ${doacao.telefone || 'Não informado'}</p>
            </div>

            <div class="detalhes-produtos">
                <h4><i class="bi bi-box-seam"></i> Itens Doados</h4>
                <ul>
                    ${produtosList}
                </ul>
            </div>

            <div class="detalhes-endereco">
                <h4><i class="bi bi-geo-alt"></i> Endereço para Coleta</h4>
                <p>${doacao.endereco}</p>
                ${doacao.complemento ? `<p><strong>Complemento:</strong> ${doacao.complemento}</p>` : ''}
            </div>

            ${doacao.observacoes ? `
                <div class="detalhes-observacoes">
                    <h4><i class="bi bi-chat-dots"></i> Observações</h4>
                    <p>${doacao.observacoes}</p>
                </div>
            ` : ''}

            ${doacao.dataAgendada ? `
                <div class="detalhes-agendamento">
                    <h4><i class="bi bi-calendar-check"></i> Coleta Agendada</h4>
                    <p><strong>Data:</strong> ${this.formatarData(doacao.dataAgendada)}</p>
                    <p><strong>Horário:</strong> ${doacao.horario || 'A combinar'}</p>
                </div>
            ` : ''}
        `;

        // Configurar botões de ação
        const modalActions = modal.querySelector('.modal-actions');
        if (modalActions) {
            if (categoria === 'pendentes') {
                modalActions.innerHTML = `
                    <button class="btn btn-outline btn-contato-doacao" data-id="${doacao.id}">
                        <i class="bi bi-telephone"></i>
                        Entrar em Contato
                    </button>
                    <button class="btn btn-primary btn-confirmar-coleta" data-id="${doacao.id}">
                        <i class="bi bi-check-circle"></i>
                        Confirmar Coleta
                    </button>
                `;
            } else if (categoria === 'agendadas') {
                modalActions.innerHTML = `
                    <button class="btn btn-outline btn-contato-doacao" data-id="${doacao.id}">
                        <i class="bi bi-telephone"></i>
                        Confirmar Presença
                    </button>
                    <button class="btn btn-secondary btn-reagendar" data-id="${doacao.id}">
                        <i class="bi bi-calendar-check"></i>
                        Reagendar
                    </button>
                `;
            } else {
                modalActions.innerHTML = `
                    <button class="btn btn-outline">
                        <i class="bi bi-star"></i>
                        Avaliar Doador
                    </button>
                    <button class="btn btn-secondary" onclick="window.campanhasDoacoes.fecharModalDetalhes()">
                        Fechar
                    </button>
                `;
            }
        }

        modal.classList.add('active');

        // Configurar fechamento
        const closeBtn = document.getElementById('closeDetalhesModal');
        if (closeBtn) {
            closeBtn.onclick = () => this.fecharModalDetalhes();
        }

        modal.onclick = (e) => {
            if (e.target === modal) {
                this.fecharModalDetalhes();
            }
        };
    }

    fecharModalDetalhes() {
        const modal = document.getElementById('detalhesDoacaoModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    confirmarColeta(doacaoItem) {
        const doacaoId = doacaoItem?.dataset.id;
        if (!doacaoId) return;

        // Encontrar a doação pendente
        const index = this.doacoes.pendentes.findIndex(d => d.id == doacaoId);
        if (index === -1) return;

        const doacao = this.doacoes.pendentes[index];

        // Mostrar modal de agendamento
        this.mostrarModalAgendamento(doacao);
    }

    mostrarModalAgendamento(doacao) {
        const hoje = new Date().toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal" id="agendamentoModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <i class="bi bi-calendar-check"></i>
                            Agendar Coleta
                        </h3>
                        <button class="modal-close" id="closeAgendamento">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Agende a coleta com <strong>${doacao.doador}</strong></p>
                        
                        <div class="form-group">
                            <label for="dataColeta">Data da Coleta</label>
                            <input type="date" id="dataColeta" class="form-control" min="${hoje}">
                        </div>

                        <div class="form-group">
                            <label for="horarioColeta">Horário</label>
                            <select id="horarioColeta" class="form-control">
                                <option value="manha">Manhã (09:00 - 12:00)</option>
                                <option value="tarde">Tarde (14:00 - 17:00)</option>
                                <option value="noite">Noite (18:00 - 20:00)</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="observacoesColeta">Observações</label>
                            <textarea id="observacoesColeta" class="form-control" rows="3" placeholder="Instruções adicionais para o doador..."></textarea>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="cancelarAgendamento">Cancelar</button>
                        <button class="btn btn-primary" id="confirmarAgendamento">
                            <i class="bi bi-check-circle"></i>
                            Confirmar Agendamento
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Remover modal anterior se existir
        const oldModal = document.getElementById('agendamentoModal');
        if (oldModal) oldModal.remove();

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('agendamentoModal');
        modal.classList.add('active');

        // Configurar eventos
        document.getElementById('closeAgendamento')?.addEventListener('click', () => {
            modal.remove();
        });

        document.getElementById('cancelarAgendamento')?.addEventListener('click', () => {
            modal.remove();
        });

        document.getElementById('confirmarAgendamento')?.addEventListener('click', () => {
            const data = document.getElementById('dataColeta').value;
            const horario = document.getElementById('horarioColeta').value;
            const observacoes = document.getElementById('observacoesColeta').value;

            if (!data) {
                this.mostrarNotificacao('Selecione uma data para a coleta', 'error');
                return;
            }

            // Mover doação de pendente para agendada
            const index = this.doacoes.pendentes.findIndex(d => d.id == doacao.id);
            if (index !== -1) {
                const [doacaoAgendada] = this.doacoes.pendentes.splice(index, 1);
                
                const horarioTexto = {
                    'manha': '09:00 - 12:00',
                    'tarde': '14:00 - 17:00',
                    'noite': '18:00 - 20:00'
                };

                this.doacoes.agendadas.push({
                    ...doacaoAgendada,
                    dataAgendada: data,
                    horario: horarioTexto[horario],
                    observacoesColeta: observacoes
                });

                // Atualizar UI
                const tabAtiva = document.querySelector('.tab-btn.active');
                const tab = tabAtiva?.getAttribute('data-tab') || 'pendentes';
                this.renderizarDoacoes(tab);
                
                modal.remove();
                this.mostrarNotificacao('Coleta agendada com sucesso!', 'success');
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    reagendarColeta(doacaoItem) {
        const doacaoId = doacaoItem?.dataset.id;
        if (!doacaoId) return;

        // Encontrar a doação agendada
        const index = this.doacoes.agendadas.findIndex(d => d.id == doacaoId);
        if (index === -1) return;

        const doacao = this.doacoes.agendadas[index];
        
        // Reutilizar o modal de agendamento com dados pré-preenchidos
        this.mostrarModalAgendamento(doacao, true);
    }

    entrarContatoDoador(doacaoItem) {
        const doacaoId = doacaoItem?.dataset.id;
        if (!doacaoId) return;

        // Encontrar a doação
        let doacao = null;
        for (const lista of Object.values(this.doacoes)) {
            doacao = lista.find(d => d.id == doacaoId);
            if (doacao) break;
        }

        if (!doacao || !doacao.telefone) {
            this.mostrarNotificacao('Telefone do doador não disponível', 'warning');
            return;
        }

        // Simular contato via WhatsApp
        const mensagem = encodeURIComponent(`Olá ${doacao.doador}! Sou da ONG ReUse e gostaria de confirmar os detalhes da sua doação.`);
        window.open(`https://wa.me/55${doacao.telefone.replace(/\D/g, '')}?text=${mensagem}`);
    }

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            this.mostrarNotificacao('Por favor, selecione uma imagem válida', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.mostrarNotificacao('A imagem deve ter no máximo 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadArea = document.getElementById('campanhaImageUpload');
            if (uploadArea) {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: var(--border-radius-md);">
                    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-light);">
                        ${file.name} (${(file.size / 1024).toFixed(1)} KB)
                    </p>
                    <button type="button" class="btn btn-sm btn-outline" onclick="this.closest('#campanhaImageUpload').innerHTML = \`
                        <div class='image-upload-icon'><i class='bi bi-cloud-arrow-up'></i></div>
                        <div class='image-upload-text'><h4>Arraste uma imagem aqui</h4><p>ou clique para selecionar</p></div>
                    \`">
                        <i class="bi bi-arrow-repeat"></i> Trocar imagem
                    </button>
                `;
            }
        };
        reader.readAsDataURL(file);
    }

    setupDragAndDrop() {
        // Implementar drag and drop para reordenar campanhas (opcional)
        // Pode ser implementado com SortableJS ou similar
    }

    setupRealTimeUpdates() {
        // Simular atualizações em tempo real
        setInterval(() => {
            this.verificarAtualizacoes();
        }, 30000);
    }

    verificarAtualizacoes() {
        // Simular novas doações
        if (Math.random() > 0.7) {
            this.mostrarNotificacao('Nova doação recebida!', 'info');
            this.carregarDoacoes();
        }

        // Simular progresso em campanhas
        if (Math.random() > 0.8) {
            this.carregarCampanhas();
        }
    }

    // Utilitários
    getIniciais(nome) {
        return nome.split(' ')
            .map(p => p[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    getGradientePorTipo(tipo) {
        const gradientes = {
            'itens': 'linear-gradient(135deg, #0066cc, #00cc99)',
            'financeira': 'linear-gradient(135deg, #9933cc, #cc66ff)',
            'voluntarios': 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
            'evento': 'linear-gradient(135deg, #ffa502, #ffd32a)'
        };
        return gradientes[tipo] || 'linear-gradient(135deg, #0066cc, #00cc99)';
    }

    extrairNumeroMeta(metaString) {
        const numeros = metaString.match(/\d+/g);
        return numeros ? parseInt(numeros.join('')) : 0;
    }

    formatarData(dataString) {
        if (!dataString) return '';
        const [ano, mes, dia] = dataString.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    mostrarNotificacao(mensagem, tipo = 'info') {
        // Usar a função global ou criar uma notificação simples
        if (window.showOngNotification) {
            window.showOngNotification(mensagem, tipo);
        } else {
            alert(mensagem);
        }
    }

    showLoading(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
            element.classList.add('loading');
        }
    }

    hideLoading(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
            element.classList.remove('loading');
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.campanhasDoacoes = new OngCampanhasDoacoes();
});

// Estilos adicionais para os novos componentes
const styles = `
    /* Filtros de Campanhas */
    .filtros-campanhas {
        background: var(--card-bg);
        border-radius: var(--border-radius-lg);
        padding: 1.5rem;
        margin-bottom: 2rem;
        border: 1px solid var(--light-gray-2);
        box-shadow: var(--shadow-sm);
    }

    .filtros-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }

    .filtros-group select,
    .filtros-group input {
        padding: 0.75rem 1rem;
        border: 2px solid var(--light-gray-2);
        border-radius: var(--border-radius-md);
        background: var(--card-bg);
        color: var(--text-dark);
        font-size: 0.95rem;
        flex: 1;
        min-width: 180px;
    }

    .btn-filtro-aplicar {
        padding: 0.75rem 1.5rem;
        background: var(--primary-purple);
        color: white;
        border: none;
        border-radius: var(--border-radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all var(--transition-fast);
    }

    .btn-filtro-aplicar:hover {
        background: var(--primary-purple-light);
        transform: translateY(-2px);
    }

    .filtros-ordenacao {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        padding-top: 1rem;
        border-top: 1px solid var(--light-gray-2);
    }

    .filtros-ordenacao span {
        color: var(--text-light);
        font-size: 0.9rem;
    }

    .ordenacao-btn {
        padding: 0.5rem 1rem;
        background: none;
        border: 1px solid var(--light-gray-2);
        border-radius: var(--border-radius-md);
        color: var(--text-medium);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-size: 0.9rem;
    }

    .ordenacao-btn:hover {
        border-color: var(--primary-purple);
        color: var(--primary-purple);
    }

    .ordenacao-btn.active {
        background: var(--primary-purple);
        border-color: var(--primary-purple);
        color: white;
    }

    /* Badge de tipo de campanha */
    .campanha-tipo-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 1rem;
        border-radius: var(--border-radius-round);
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .campanha-tipo-badge.tipo-itens {
        background: rgba(0, 102, 204, 0.1);
        color: #0066cc;
    }

    .campanha-tipo-badge.tipo-financeira {
        background: rgba(153, 51, 204, 0.1);
        color: #9933cc;
    }

    .campanha-tipo-badge.tipo-voluntarios {
        background: rgba(255, 107, 107, 0.1);
        color: #ff6b6b;
    }

    .campanha-tipo-badge.tipo-evento {
        background: rgba(255, 165, 2, 0.1);
        color: #ffa502;
    }

    /* Footer da campanha */
    .campanha-footer {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--light-gray-2);
        text-align: right;
    }

    .btn-link {
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 0.85rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: color var(--transition-fast);
    }

    .btn-link:hover {
        color: var(--primary-red);
    }

    /* Estado vazio */
    .nenhuma-campanha,
    .nenhuma-doacao {
        text-align: center;
        padding: 4rem 2rem;
        background: var(--card-bg);
        border-radius: var(--border-radius-lg);
        border: 2px dashed var(--light-gray-2);
    }

    .nenhuma-campanha i,
    .nenhuma-doacao i {
        font-size: 4rem;
        color: var(--text-lighter);
        margin-bottom: 1rem;
    }

    .nenhuma-campanha h3,
    .nenhuma-doacao h3 {
        color: var(--text-medium);
        margin-bottom: 0.5rem;
    }

    .nenhuma-campanha p,
    .nenhuma-doacao p {
        color: var(--text-light);
        margin-bottom: 1.5rem;
    }

    /* Compartilhamento */
    .compartilhar-link {
        display: flex;
        gap: 0.5rem;
        margin: 1.5rem 0;
    }

    .compartilhar-link input {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid var(--light-gray-2);
        border-radius: var(--border-radius-md);
        background: var(--light-gray);
        color: var(--text-dark);
        font-size: 0.9rem;
    }

    .compartilhar-redes {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
    }

    .social-share {
        width: 48px;
        height: 48px;
        border-radius: var(--border-radius-round);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-fast);
    }

    .social-share.whatsapp {
        background: #25D366;
    }

    .social-share.facebook {
        background: #1877F2;
    }

    .social-share.twitter {
        background: #1DA1F2;
    }

    .social-share.linkedin {
        background: #0077B5;
    }

    .social-share:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: var(--shadow-md);
    }

    /* Avaliação */
    .doacao-avaliacao {
        margin: 0.75rem 0;
        color: #ffc107;
        font-size: 1rem;
    }

    .doacao-avaliacao i {
        color: #ffc107;
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .filtros-group {
            flex-direction: column;
        }
        
        .filtros-group select,
        .filtros-group input,
        .btn-filtro-aplicar {
            width: 100%;
        }
        
        .filtros-ordenacao {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .compartilhar-link {
            flex-direction: column;
        }
        
        .social-share {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }
    }
`;

// Adicionar estilos ao documento
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);