// avaliacoes.js - Sistema de Gerenciamento de Avaliações

// ============ SISTEMA DE ARMAZENAMENTO ============

// Função para obter avaliações do localStorage
function obterAvaliacoes() {
    const avaliacoesSalvas = localStorage.getItem('avaliacoesCasaUsada');
    return avaliacoesSalvas ? JSON.parse(avaliacoesSalvas) : [];
}

// Função para salvar avaliações no localStorage
function salvarAvaliacoes(avaliacoes) {
    localStorage.setItem('avaliacoesCasaUsada', JSON.stringify(avaliacoes));
}

// ============ INICIALIZAÇÃO DE DADOS ============

// Função para inicializar avaliações padrão
function inicializarAvaliacoesPadrao() {
    let avaliacoes = obterAvaliacoes();
    
    if (avaliacoes.length === 0) {
        console.log('Inicializando avaliações padrão...');
        
        avaliacoes = [
            {
                id: 1,
                cliente: "Maria Silva",
                rating: 5,
                titulo: "Produto excelente!",
                comentario: "A camiseta chegou em perfeito estado, exatamente como nas fotos. O vendedor foi muito atencioso e o envio foi super rápido. Com certeza comprarei novamente!",
                data: "2025-01-15",
                produto: "Camiseta Básica",
                respostaVendedor: "",
                respondida: false
            },
            {
                id: 2,
                cliente: "João Santos",
                rating: 4,
                titulo: "Bom produto",
                comentario: "A calça jeans é de boa qualidade, mas achei que o tamanho ficou um pouco diferente do que eu esperava. No geral, satisfeito com a compra.",
                data: "2025-01-12",
                produto: "Calça Jeans",
                respostaVendedor: "",
                respondida: false
            },
            {
                id: 3,
                cliente: "Ana Costa",
                rating: 5,
                titulo: "Superou expectativas",
                comentario: "Comprei o vestido floral e amei! A qualidade do tecido é excelente e o caimento ficou perfeito. A entrega foi antes do prazo. Recomendo!",
                data: "2025-01-08",
                produto: "Vestido Floral",
                respostaVendedor: "Obrigada pela avaliação, Ana! Ficamos felizes que gostou do vestido. Esperamos vê-la novamente em nossa loja!",
                respondida: true
            },
            {
                id: 4,
                cliente: "Pedro Almeida",
                rating: 3,
                titulo: "Produto com pequeno defeito",
                comentario: "O tênis é confortável, mas veio com um pequeno defeito no cadarço. Entrei em contato com o vendedor que se prontificou a resolver.",
                data: "2025-01-05",
                produto: "Tênis Esportivo",
                respostaVendedor: "Prezado Pedro, lamentamos pelo ocorrido. Já enviamos um novo cadarço para o endereço cadastrado. Obrigado pela compreensão!",
                respondida: true
            },
            {
                id: 5,
                cliente: "Carla Mendes",
                rating: 4.5,
                titulo: "Boa experiência de compra",
                comentario: "A bolsa é linda e de boa qualidade. A comunicação com o vendedor foi eficiente e a entrega ocorreu dentro do prazo.",
                data: "2025-01-02",
                produto: "Bolsa de Couro",
                respostaVendedor: "",
                respondida: false
            },
            {
                id: 6,
                cliente: "Roberto Lima",
                rating: 5,
                titulo: "Excelente atendimento",
                comentario: "Produto de ótima qualidade e o vendedor foi extremamente prestativo. Recomendo a todos!",
                data: "2024-12-28",
                produto: "Liquidificador Philips",
                respostaVendedor: "Muito obrigado, Roberto! Ficamos felizes em saber que teve uma boa experiência conosco.",
                respondida: true
            },
            {
                id: 7,
                cliente: "Fernanda Oliveira",
                rating: 4,
                titulo: "Bom custo-benefício",
                comentario: "O produto atendeu minhas expectativas. A entrega foi rápida e a embalagem bem cuidada.",
                data: "2024-12-25",
                produto: "Jogo de Panelas",
                respostaVendedor: "",
                respondida: false
            },
            {
                id: 8,
                cliente: "Ricardo Souza",
                rating: 2,
                titulo: "Produto não corresponde à descrição",
                comentario: "Infelizmente o produto recebido não era exatamente como descrito na página. A cor era diferente.",
                data: "2024-12-20",
                produto: "Cadeira de Escritório",
                respostaVendedor: "Prezado Ricardo, lamentamos pela falha. Entraremos em contato para resolver esta situação. A cor correta está sendo enviada.",
                respondida: true
            }
        ];
        
        salvarAvaliacoes(avaliacoes);
    }
    
    return avaliacoes;
}

// ============ SISTEMA DE ESTATÍSTICAS ============

// Função para calcular estatísticas das avaliações
function calcularEstatisticasAvaliacoes(avaliacoes) {
    if (avaliacoes.length === 0) {
        return {
            media: 0,
            total: 0,
            distribuicao: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0},
            respondidas: 0,
            naoRespondidas: 0
        };
    }
    
    const soma = avaliacoes.reduce((acc, av) => acc + av.rating, 0);
    const media = soma / avaliacoes.length;
    
    const distribuicao = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    avaliacoes.forEach(av => {
        const ratingInt = Math.floor(av.rating);
        distribuicao[ratingInt]++;
    });
    
    const respondidas = avaliacoes.filter(av => av.respondida).length;
    const naoRespondidas = avaliacoes.length - respondidas;
    
    return {
        media: parseFloat(media.toFixed(1)),
        total: avaliacoes.length,
        distribuicao,
        respondidas,
        naoRespondidas
    };
}

// ============ SISTEMA DE RENDERIZAÇÃO ============

// Função para renderizar o resumo de avaliações
function renderizarResumoAvaliacoes(estatisticas) {
    const ratingSummary = document.querySelector('.rating-summary');
    if (!ratingSummary) return;
    
    ratingSummary.innerHTML = `
        <div class="average-rating">${estatisticas.media}</div>
        <div class="rating-stars">
            ${gerarEstrelas(estatisticas.media)}
        </div>
        <div class="total-ratings">Baseado em ${estatisticas.total} avaliações</div>
        
        ${Object.entries(estatisticas.distribuicao).reverse().map(([estrelas, quantidade]) => `
            <div class="rating-bar">
                <span>${estrelas} estrela${estrelas > 1 ? 's' : ''}</span>
                <progress value="${quantidade}" max="${estatisticas.total}"></progress>
                <span>${quantidade}</span>
            </div>
        `).join('')}
        
        <div class="rating-stats">
            <div class="stat-item">
                <span class="stat-value">${estatisticas.respondidas}</span>
                <span class="stat-label">Respondidas</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${estatisticas.naoRespondidas}</span>
                <span class="stat-label">Pendentes</span>
            </div>
        </div>
    `;
}

// Função para gerar estrelas baseadas na avaliação
function gerarEstrelas(rating) {
    const estrelasCheias = Math.floor(rating);
    const temMeiaEstrela = rating % 1 >= 0.5;
    const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);
    
    let html = '';
    
    // Estrelas cheias
    for (let i = 0; i < estrelasCheias; i++) {
        html += '<i class="bi bi-star-fill"></i>';
    }
    
    // Meia estrela
    if (temMeiaEstrela) {
        html += '<i class="bi bi-star-half"></i>';
    }
    
    // Estrelas vazias
    for (let i = 0; i < estrelasVazias; i++) {
        html += '<i class="bi bi-star"></i>';
    }
    
    return html;
}

// Função para renderizar a lista de avaliações
function renderizarListaAvaliacoes(avaliacoes, pagina = 1, itensPorPagina = 5) {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (!reviewsContainer) return;
    
    // Calcular índices para paginação
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const avaliacoesPagina = avaliacoes.slice(inicio, fim);
    
    // Encontrar ou criar a seção de lista de avaliações
    let listaSection = reviewsContainer.querySelector('.avaliacoes-lista');
    if (!listaSection) {
        listaSection = document.createElement('div');
        listaSection.className = 'avaliacoes-lista';
        reviewsContainer.appendChild(listaSection);
    }
    
    if (avaliacoesPagina.length === 0) {
        listaSection.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-chat-square-text"></i>
                <h3>Nenhuma avaliação encontrada</h3>
                <p>Seus clientes ainda não deixaram avaliações.</p>
            </div>
        `;
        return;
    }
    
    listaSection.innerHTML = avaliacoesPagina.map(avaliacao => `
        <div class="review-item" data-avaliacao-id="${avaliacao.id}">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-name">${avaliacao.cliente}</div>
                    <div class="review-product">Produto: ${avaliacao.produto}</div>
                </div>
                <div class="review-rating">
                    ${gerarEstrelas(avaliacao.rating)}
                </div>
                <div class="review-date">${formatarData(avaliacao.data)}</div>
            </div>
            <div class="review-title">${avaliacao.titulo}</div>
            <div class="review-content">
                ${avaliacao.comentario}
            </div>
            ${avaliacao.respondida && avaliacao.respostaVendedor ? `
                <div class="seller-response">
                    <div class="response-header">
                        <strong>Resposta da Casa Usada:</strong>
                    </div>
                    <div class="response-content">
                        ${avaliacao.respostaVendedor}
                    </div>
                </div>
            ` : `
                <div class="response-actions">
                    <button class="action-btn respond-btn" data-id="${avaliacao.id}">
                        <i class="bi bi-reply"></i> Responder
                    </button>
                </div>
            `}
        </div>
    `).join('');
    
    // Renderizar paginação
    renderizarPaginacao(avaliacoes.length, pagina, itensPorPagina);
    
    // Inicializar eventos dos botões
    inicializarEventosAvaliacoes();
}

// Função para renderizar a paginação
function renderizarPaginacao(totalItens, paginaAtual, itensPorPagina) {
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    const paginacaoContainer = document.querySelector('.pagination');
    
    if (!paginacaoContainer || totalPaginas <= 1) {
        if (paginacaoContainer) {
            paginacaoContainer.style.display = 'none';
        }
        return;
    }
    
    paginacaoContainer.style.display = 'flex';
    
    let html = '';
    
    // Botão anterior
    if (paginaAtual > 1) {
        html += `<button class="pagination-btn" data-page="${paginaAtual - 1}"><</button>`;
    }
    
    // Páginas
    for (let i = 1; i <= totalPaginas; i++) {
        if (i === paginaAtual) {
            html += `<button class="pagination-btn active" data-page="${i}">${i}</button>`;
        } else {
            html += `<button class="pagination-btn" data-page="${i}">${i}</button>`;
        }
    }
    
    // Botão próximo
    if (paginaAtual < totalPaginas) {
        html += `<button class="pagination-btn" data-page="${paginaAtual + 1}">></button>`;
    }
    
    paginacaoContainer.innerHTML = html;
    
    // Adicionar eventos de paginação
    paginacaoContainer.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const novaPagina = parseInt(this.getAttribute('data-page'));
            carregarAvaliacoes(novaPagina);
        });
    });
}

// ============ SISTEMA DE RESPOSTAS ============

// Função para abrir modal de resposta
function abrirModalResposta(avaliacaoId) {
    const avaliacoes = obterAvaliacoes();
    const avaliacao = avaliacoes.find(av => av.id === avaliacaoId);
    
    if (!avaliacao) {
        mostrarNotificacao('Avaliação não encontrada', 'error');
        return;
    }
    
    // Criar modal de resposta
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-resposta';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="modal-title">Responder Avaliação</h2>
            <div class="avaliacao-original">
                <strong>${avaliacao.cliente}</strong> - ${avaliacao.titulo}
                <div class="rating-stars">${gerarEstrelas(avaliacao.rating)}</div>
                <p>${avaliacao.comentario}</p>
            </div>
            <form id="form-resposta">
                <input type="hidden" id="avaliacao-id" value="${avaliacao.id}">
                <div class="form-group">
                    <label for="resposta-texto">Sua Resposta:</label>
                    <textarea id="resposta-texto" placeholder="Digite sua resposta aqui..." required></textarea>
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn modal-btn-cancel">Cancelar</button>
                    <button type="submit" class="modal-btn modal-btn-confirm">Enviar Resposta</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Configurar eventos do modal
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.modal-btn-cancel');
    const form = document.getElementById('form-resposta');
    
    function fecharModal() {
        modal.style.display = 'none';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', fecharModal);
    cancelBtn.addEventListener('click', fecharModal);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const resposta = document.getElementById('resposta-texto').value.trim();
        
        if (resposta) {
            responderAvaliacao(avaliacaoId, resposta);
            fecharModal();
        }
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });
}

// Função para responder uma avaliação
function responderAvaliacao(avaliacaoId, resposta) {
    try {
        const avaliacoes = obterAvaliacoes();
        const avaliacaoIndex = avaliacoes.findIndex(av => av.id === avaliacaoId);
        
        if (avaliacaoIndex === -1) {
            mostrarNotificacao('Avaliação não encontrada', 'error');
            return;
        }
        
        avaliacoes[avaliacaoIndex].respostaVendedor = resposta;
        avaliacoes[avaliacaoIndex].respondida = true;
        
        salvarAvaliacoes(avaliacoes);
        
        // Recarregar avaliações
        const paginaAtual = parseInt(localStorage.getItem('paginaAvaliacoesAtual') || '1');
        carregarAvaliacoes(paginaAtual);
        
        mostrarNotificacao('Resposta enviada com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao responder avaliação:', error);
        mostrarNotificacao('Erro ao enviar resposta', 'error');
    }
}

// ============ SISTEMA DE FILTROS ============

// Função para inicializar filtros
function inicializarFiltros() {
    const filtrosContainer = document.querySelector('.filters-container');
    if (!filtrosContainer) return;
    
    filtrosContainer.innerHTML = `
        <div class="filter-group">
            <label for="filtro-ordenacao">Ordenar por:</label>
            <select id="filtro-ordenacao">
                <option value="recentes">Mais Recentes</option>
                <option value="antigas">Mais Antigas</option>
                <option value="melhores">Melhores Avaliações</option>
                <option value="piores">Piores Avaliações</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label for="filtro-status">Status:</label>
            <select id="filtro-status">
                <option value="todas">Todas</option>
                <option value="respondidas">Respondidas</option>
                <option value="pendentes">Pendentes</option>
            </select>
        </div>
        
        <div class="filter-group">
            <label for="filtro-avaliacao">Avaliação:</label>
            <select id="filtro-avaliacao">
                <option value="todas">Todas</option>
                <option value="5">5 Estrelas</option>
                <option value="4">4 Estrelas</option>
                <option value="3">3 Estrelas</option>
                <option value="2">2 Estrelas</option>
                <option value="1">1 Estrela</option>
            </select>
        </div>
        
        <button class="filter-btn" id="aplicar-filtros">
            <i class="bi bi-funnel"></i> Aplicar Filtros
        </button>
        
        <button class="btn-refresh" id="btn-refresh-avaliacoes">
            <i class="bi bi-arrow-clockwise"></i> Atualizar
        </button>
    `;
    
    // Configurar eventos dos filtros
    document.getElementById('aplicar-filtros').addEventListener('click', aplicarFiltrosAvaliacoes);
    document.getElementById('btn-refresh-avaliacoes').addEventListener('click', function() {
        this.classList.add('loading');
        carregarAvaliacoes();
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
}

// Função para aplicar filtros
function aplicarFiltrosAvaliacoes() {
    const avaliacoes = obterAvaliacoes();
    let avaliacoesFiltradas = [...avaliacoes];
    
    // Aplicar ordenação
    const ordenacao = document.getElementById('filtro-ordenacao').value;
    switch (ordenacao) {
        case 'recentes':
            avaliacoesFiltradas.sort((a, b) => new Date(b.data) - new Date(a.data));
            break;
        case 'antigas':
            avaliacoesFiltradas.sort((a, b) => new Date(a.data) - new Date(b.data));
            break;
        case 'melhores':
            avaliacoesFiltradas.sort((a, b) => b.rating - a.rating);
            break;
        case 'piores':
            avaliacoesFiltradas.sort((a, b) => a.rating - b.rating);
            break;
    }
    
    // Aplicar filtro de status
    const status = document.getElementById('filtro-status').value;
    if (status === 'respondidas') {
        avaliacoesFiltradas = avaliacoesFiltradas.filter(av => av.respondida);
    } else if (status === 'pendentes') {
        avaliacoesFiltradas = avaliacoesFiltradas.filter(av => !av.respondida);
    }
    
    // Aplicar filtro de avaliação
    const avaliacao = document.getElementById('filtro-avaliacao').value;
    if (avaliacao !== 'todas') {
        const rating = parseInt(avaliacao);
        avaliacoesFiltradas = avaliacoesFiltradas.filter(av => Math.floor(av.rating) === rating);
    }
    
    // Renderizar com filtros aplicados
    const estatisticas = calcularEstatisticasAvaliacoes(avaliacoesFiltradas);
    renderizarResumoAvaliacoes(estatisticas);
    renderizarListaAvaliacoes(avaliacoesFiltradas, 1);
}

// ============ SISTEMA DE EVENTOS ============

// Função para inicializar eventos
function inicializarEventosAvaliacoes() {
    // Botões de resposta
    document.querySelectorAll('.respond-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const avaliacaoId = parseInt(this.getAttribute('data-id'));
            abrirModalResposta(avaliacaoId);
        });
    });
}

// ============ FUNÇÃO PRINCIPAL ============

// Função principal para carregar avaliações
function carregarAvaliacoes(pagina = 1) {
    try {
        // Salvar página atual
        localStorage.setItem('paginaAvaliacoesAtual', pagina.toString());
        
        const avaliacoes = inicializarAvaliacoesPadrao();
        const estatisticas = calcularEstatisticasAvaliacoes(avaliacoes);
        
        // Renderizar componentes
        renderizarResumoAvaliacoes(estatisticas);
        renderizarListaAvaliacoes(avaliacoes, pagina);
        
        // Inicializar filtros se necessário
        if (!document.querySelector('.filters-container')) {
            const reviewsContainer = document.querySelector('.reviews-container');
            if (reviewsContainer) {
                const filtersContainer = document.createElement('div');
                filtersContainer.className = 'filters-container';
                reviewsContainer.insertBefore(filtersContainer, reviewsContainer.firstChild);
                inicializarFiltros();
            }
        }
        
    } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        mostrarNotificacao('Erro ao carregar avaliações', 'error');
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
            month: 'long',
            year: 'numeric'
        });
    } catch (error) {
        return 'Data inválida';
    }
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    try {
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
        
    } catch (error) {
        console.error('Erro ao mostrar notificação:', error);
    }
}

// ============ INICIALIZAÇÃO ============

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de avaliações...');
    
    // Carregar avaliações
    const paginaInicial = parseInt(localStorage.getItem('paginaAvaliacoesAtual') || '1');
    carregarAvaliacoes(paginaInicial);
    
    console.log('Sistema de avaliações inicializado com sucesso!');
});