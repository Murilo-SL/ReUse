// ong_doacoes-2_necessarias.js - Sistema completo e sincronizado

// ============ SISTEMA DE ARMAZENAMENTO ============

// Função para obter doações do localStorage (fonte única da verdade)
function obterDoacoes() {
    const doacoesSalvas = localStorage.getItem('doacoesNecessarias');
    return doacoesSalvas ? JSON.parse(doacoesSalvas) : {};
}

// Função para salvar doações no localStorage
function salvarDoacoes(doacoes) {
    localStorage.setItem('doacoesNecessarias', JSON.stringify(doacoes));
    // Disparar evento personalizado para sincronização
    window.dispatchEvent(new Event('doacoesAtualizadas'));
}

// Função para inicializar doações padrão se não existirem
function inicializarDoacoesPadrao() {
    let doacoes = obterDoacoes();
    
    if (Object.keys(doacoes).length === 0) {
        console.log('Inicializando doações padrão...');
        // Doações padrão da Patas Conscientes
        doacoes = {
            "1": {
                id: "1",
                name: "Ração para Gatos",
                description: "Precisamos de ração seca e úmida para alimentar nossos resgatados",
                category: "Alimentação",
                priority: "Alta",
                target: 50,
                collected: 22.5,
                image: "",
                status: "Ativo",
                date: "10/05/2025",
                created: "2025-01-10"
            },
            "2": {
                id: "2",
                name: "Cobertores",
                description: "Para manter os animais aquecidos no inverno",
                category: "Roupas",
                priority: "Média",
                target: 20,
                collected: 14,
                image: "",
                status: "Ativo",
                date: "05/05/2025",
                created: "2025-01-05"
            },
            "3": {
                id: "3",
                name: "Medicamentos",
                description: "Antipulgas, vermífugos e outros remédios básicos",
                category: "Medicamentos",
                priority: "Alta",
                target: 50,
                collected: 15,
                image: "",
                status: "Ativo",
                date: "01/05/2025",
                created: "2025-01-01"
            },
            "4": {
                id: "4",
                name: "Brinquedos",
                description: "Para enriquecimento ambiental dos animais",
                category: "Brinquedos",
                priority: "Baixa",
                target: 30,
                collected: 18,
                image: "",
                status: "Ativo",
                date: "28/04/2025",
                created: "2025-04-28"
            }
        };
        
        salvarDoacoes(doacoes);
    }
    
    return doacoes;
}

// Inicializar lixeira se não existir
function inicializarLixeira() {
    if (!localStorage.getItem('lixeiraDoacoes')) {
        localStorage.setItem('lixeiraDoacoes', JSON.stringify([]));
    }
}

// ============ SISTEMA DE SINCRONIZAÇÃO ============

function inicializarSincronizacao() {
    // Ouvir mudanças no localStorage de outras abas/páginas
    window.addEventListener('storage', function(e) {
        if (e.key === 'doacoesNecessarias' || e.key === 'lixeiraDoacoes') {
            console.log('Mudança detectada no localStorage, atualizando interface...');
            carregarDoacoes();
            atualizarEstatisticas();
            mostrarNotificacao('Dados atualizados automaticamente', 'info');
        }
    });
    
    // Ouvir eventos personalizados
    window.addEventListener('doacoesAtualizadas', function() {
        console.log('Evento doacoesAtualizadas disparado, recarregando...');
        carregarDoacoes();
        atualizarEstatisticas();
    });
    
    // Recarregar quando a página ganhar foco
    window.addEventListener('focus', function() {
        console.log('Página em foco, verificando atualizações...');
        carregarDoacoes();
        atualizarEstatisticas();
    });
    
    // Recarregar a cada 30 segundos para garantir sincronização
    setInterval(function() {
        carregarDoacoes();
        atualizarEstatisticas();
    }, 30000);
}

// ============ SISTEMA DE DOAÇÕES ============

// Função para carregar doações
function carregarDoacoes() {
    const container = document.getElementById('necessaryDonations');
    if (!container) return; // Elemento não existe nesta página
    
    // Mostrar loading
    container.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner">
                <i class="fas fa-spinner"></i>
            </div>
            <span>Carregando doações...</span>
        </div>
    `;
    
    // Simular carregamento assíncrono
    setTimeout(() => {
        try {
            const doacoes = obterDoacoes();
            const doacoesArray = Object.values(doacoes);
            
            // Aplicar filtros
            const doacoesFiltradas = filtrarDoacoes(doacoesArray);
            
            // Gerar HTML das doações
            if (doacoesFiltradas.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <h3>Nenhuma doação encontrada</h3>
                        <p>Tente ajustar os filtros ou termos de pesquisa.</p>
                        <button class="primary-button" onclick="openAddModal()">
                            <i class="fas fa-plus"></i> Nova Doação
                        </button>
                    </div>
                `;
            } else {
                container.innerHTML = doacoesFiltradas.map(doacao => criarCardDoacao(doacao)).join('');
            }
            
            // Re-inicializar eventos dos botões
            inicializarEventosDoacoes();
            
        } catch (error) {
            console.error('Erro ao carregar doações:', error);
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erro ao carregar doações</h3>
                    <p>Recarregue a página e tente novamente.</p>
                    <button onclick="location.reload()" class="primary-button">Recarregar Página</button>
                </div>
            `;
        }
    }, 500);
}

// Função para criar card de doação
function criarCardDoacao(doacao) {
    const progress = Math.min((doacao.collected / doacao.target) * 100, 100);
    const progressColor = getProgressColor(doacao.collected, doacao.target);
    const hasImage = doacao.image && doacao.image.startsWith('data:image');

    return `
        <div class="donation-card" data-id="${doacao.id}">
            <div class="donation-image">
                ${hasImage ? 
                    `<img src="${doacao.image}" alt="${doacao.name}">` :
                    `<div class="placeholder-image">
                        <i class="fas fa-${getCategoryIcon(doacao.category)}"></i>
                        <span>${doacao.category}</span>
                    </div>`
                }
            </div>
            
            <div class="donation-header">
                <h3 class="donation-title">${doacao.name}</h3>
                <span class="priority-badge priority-${doacao.priority.toLowerCase()}">
                    ${doacao.priority}
                </span>
            </div>
            
            <div class="donation-category">
                <i class="fas fa-tag"></i> ${doacao.category}
            </div>
            
            <p class="donation-description">${doacao.description}</p>
            
            <div class="progress-container">
                <div class="progress-info">
                    <span><i class="fas fa-box"></i> ${doacao.collected}/${doacao.target}</span>
                    <span>${Math.round(progress)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%; background-color: ${progressColor};"></div>
                </div>
            </div>
            
            <div class="card-details">
                <div class="detail-item">
                    <i class="fas fa-info-circle"></i>
                    <span class="status status-${doacao.status.toLowerCase()}">${doacao.status}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${doacao.date}</span>
                </div>
            </div>
            
            <div class="donation-actions">
                <button class="secondary-button small edit-btn" data-id="${doacao.id}" title="Editar doação">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="danger-button small delete-btn" data-id="${doacao.id}" title="Excluir doação">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `;
}

// Função para filtrar doações
function filtrarDoacoes(doacoesArray) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoriaSelecionada = document.getElementById('categoryFilter').value;
    const prioridadeSelecionada = document.getElementById('priorityFilter').value;
    const statusSelecionado = document.getElementById('statusFilter').value;
    
    return doacoesArray.filter(doacao => {
        const correspondeBusca = doacao.name.toLowerCase().includes(searchTerm) || 
                               doacao.description.toLowerCase().includes(searchTerm) ||
                               doacao.category.toLowerCase().includes(searchTerm);
        const correspondeCategoria = !categoriaSelecionada || doacao.category === categoriaSelecionada;
        const correspondePrioridade = !prioridadeSelecionada || doacao.priority === prioridadeSelecionada;
        const correspondeStatus = !statusSelecionado || doacao.status === statusSelecionado;
        
        return correspondeBusca && correspondeCategoria && correspondePrioridade && correspondeStatus;
    });
}

// Função para aplicar filtros e atualizar a lista
function aplicarFiltros() {
    try {
        carregarDoacoes();
        atualizarEstatisticas();
    } catch (error) {
        console.error('Erro ao aplicar filtros:', error);
        mostrarNotificacao('Erro ao filtrar doações', 'error');
    }
}

// ============ SISTEMA DE EXCLUSÃO ============

// Função para excluir doação (mover para lixeira)
function excluirDoacao(id) {
    try {
        const doacoes = obterDoacoes();
        const doacao = doacoes[id];
        
        if (!doacao) {
            mostrarNotificacao('Doação não encontrada', 'error');
            return;
        }
        
        // Adicionar data de exclusão
        doacao.dataExclusao = new Date().toISOString();
        
        // Mover para lixeira
        const lixeira = JSON.parse(localStorage.getItem('lixeiraDoacoes')) || [];
        lixeira.push(doacao);
        localStorage.setItem('lixeiraDoacoes', JSON.stringify(lixeira));
        
        // Remover das doações ativas
        delete doacoes[id];
        salvarDoacoes(doacoes);
        
        // Mostrar notificação
        mostrarNotificacao(`"${doacao.name}" movida para a lixeira`, 'success');
        
    } catch (error) {
        console.error('Erro ao excluir doação:', error);
        mostrarNotificacao('Erro ao excluir doação', 'error');
    }
}

// ============ SISTEMA DE EDIÇÃO ============

// Função para abrir modal de edição
function abrirModalEdicao(id) {
    try {
        const doacoes = obterDoacoes();
        const doacao = doacoes[id];
        
        if (!doacao) {
            mostrarNotificacao('Doação não encontrada', 'error');
            return;
        }
        
        document.getElementById('modalTitle').textContent = 'Editar Doação Necessária';
        document.getElementById('donationId').value = doacao.id;
        document.getElementById('itemName').value = doacao.name;
        document.getElementById('itemDescription').value = doacao.description;
        document.getElementById('itemCategory').value = doacao.category;
        document.getElementById('itemPriority').value = doacao.priority;
        document.getElementById('itemQuantity').value = doacao.target;
        document.getElementById('itemCollected').value = doacao.collected;
        document.getElementById('itemStatus').value = doacao.status;
        document.getElementById('currentImage').value = doacao.image || '';
        
        loadExistingImage(doacao.image, doacao.id);
        clearAllErrors();
        document.getElementById('donationModal').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error);
        mostrarNotificacao('Erro ao abrir edição', 'error');
    }
}

// Função para salvar edição da doação
function salvarEdicaoDoacao(id) {
    try {
        const doacoes = obterDoacoes();
        const doacao = doacoes[id];
        
        if (!doacao) {
            mostrarNotificacao('Doação não encontrada', 'error');
            return;
        }
        
        // Atualizar dados
        doacao.name = document.getElementById('itemName').value;
        doacao.description = document.getElementById('itemDescription').value;
        doacao.category = document.getElementById('itemCategory').value;
        doacao.priority = document.getElementById('itemPriority').value;
        doacao.target = parseInt(document.getElementById('itemQuantity').value);
        doacao.collected = parseInt(document.getElementById('itemCollected').value) || 0;
        doacao.status = document.getElementById('itemStatus').value;
        doacao.image = getCurrentImage();
        doacao.date = new Date().toLocaleDateString('pt-BR');
        
        // Salvar alterações
        salvarDoacoes(doacoes);
        
        // Mostrar notificação
        mostrarNotificacao('Doação atualizada com sucesso!', 'success');
        
        return true;
        
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
        mostrarNotificacao('Erro ao salvar alterações', 'error');
        return false;
    }
}

// ============ SISTEMA DE ADIÇÃO ============

// Função para abrir modal de adição
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Nova Doação Necessária';
    document.getElementById('donationForm').reset();
    document.getElementById('donationId').value = '';
    document.getElementById('itemCollected').value = '0';
    document.getElementById('itemStatus').value = 'Ativo';
    document.getElementById('currentImage').value = '';
    
    removeImage();
    clearAllErrors();
    document.getElementById('donationModal').style.display = 'block';
    
    setTimeout(() => document.getElementById('itemName').focus(), 100);
}

// Função para salvar nova doação
function salvarNovaDoacao() {
    try {
        const formData = getFormData();
        const doacoes = obterDoacoes();
        
        // Adicionar nova doação
        doacoes[formData.id] = formData;
        
        // Salvar alterações
        salvarDoacoes(doacoes);
        
        // Limpar storage temporário
        cleanupTempStorage(formData.id);
        
        // Mostrar notificação
        mostrarNotificacao('Doação adicionada com sucesso!', 'success');
        
        return true;
        
    } catch (error) {
        console.error('Erro ao salvar nova doação:', error);
        mostrarNotificacao('Erro ao salvar doação', 'error');
        return false;
    }
}

// ============ SISTEMA DE EVENTOS ============

// Função para inicializar eventos das doações
function inicializarEventosDoacoes() {
    // Eventos dos botões de edição
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doacaoId = this.getAttribute('data-id');
            abrirModalEdicao(doacaoId);
        });
    });
    
    // Eventos dos botões de exclusão
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const doacaoId = this.getAttribute('data-id');
            const doacoes = obterDoacoes();
            const doacao = doacoes[doacaoId];
            if (doacao) {
                abrirModalExclusao(doacaoId, doacao.name);
            }
        });
    });
}

// Função para inicializar eventos de filtro
function inicializarEventosFiltro() {
    const buscaInput = document.getElementById('searchInput');
    const btnBuscar = document.getElementById('searchButton');
    const filtroCategoria = document.getElementById('categoryFilter');
    const filtroPrioridade = document.getElementById('priorityFilter');
    const filtroStatus = document.getElementById('statusFilter');
    const btnAplicarFiltros = document.getElementById('applyFilters');
    const btnLimparFiltros = document.getElementById('clearFilters');
    
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
    
    if (filtroPrioridade) {
        filtroPrioridade.addEventListener('change', aplicarFiltros);
    }
    
    if (filtroStatus) {
        filtroStatus.addEventListener('change', aplicarFiltros);
    }
    
    if (btnAplicarFiltros) {
        btnAplicarFiltros.addEventListener('click', aplicarFiltros);
    }
    
    if (btnLimparFiltros) {
        btnLimparFiltros.addEventListener('click', function() {
            document.getElementById('categoryFilter').value = '';
            document.getElementById('priorityFilter').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('searchInput').value = '';
            aplicarFiltros();
        });
    }
}

// ============ SISTEMA DE ESTATÍSTICAS ============

// Função para obter estatísticas das doações
function atualizarEstatisticas() {
    try {
        const doacoes = obterDoacoes();
        const doacoesArray = Object.values(doacoes);
        
        const totalDoacoes = doacoesArray.length;
        const doacoesAtivas = doacoesArray.filter(d => d.status === 'Ativo').length;
        const doacoesAtendidas = doacoesArray.filter(d => d.status === 'Atendido').length;
        const prioridadeAlta = doacoesArray.filter(d => d.priority === 'Alta').length;
        
        // Atualizar elementos da interface
        const totalElement = document.getElementById('totalDoacoes');
        const ativasElement = document.getElementById('doacoesAtivas');
        const atendidasElement = document.getElementById('doacoesAtendidas');
        const prioridadeElement = document.getElementById('prioridadeAlta');
        
        if (totalElement) totalElement.textContent = totalDoacoes;
        if (ativasElement) ativasElement.textContent = doacoesAtivas;
        if (atendidasElement) atendidasElement.textContent = doacoesAtendidas;
        if (prioridadeElement) prioridadeElement.textContent = prioridadeAlta;
        
    } catch (error) {
        console.error('Erro ao atualizar estatísticas:', error);
    }
}

// ============ SISTEMA DE NOTIFICAÇÕES ============

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notification = document.getElementById('successMessage');
    const messageText = document.getElementById('successMessageText');
    
    if (!notification || !messageText) return;
    
    // Configurar estilo baseado no tipo
    notification.className = 'success-message';
    if (tipo === 'error') {
        notification.classList.add('error');
    } else if (tipo === 'warning') {
        notification.classList.add('warning');
    } else if (tipo === 'info') {
        notification.classList.add('info');
    }
    
    // Configurar ícone baseado no tipo
    let icon = 'fas fa-check-circle';
    if (tipo === 'error') icon = 'fas fa-exclamation-circle';
    if (tipo === 'warning') icon = 'fas fa-exclamation-triangle';
    if (tipo === 'info') icon = 'fas fa-info-circle';
    
    notification.querySelector('i').className = icon;
    messageText.textContent = mensagem;
    
    // Mostrar notificação
    notification.style.display = 'flex';
    
    // Auto-esconder após 5 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// ============ FUNÇÕES AUXILIARES ============

// Função para obter cor do progresso
function getProgressColor(collected, target) {
    const progress = (collected / target) * 100;
    if (progress >= 100) return '#28a745'; // Verde
    if (progress >= 75) return '#17a2b8';  // Azul
    if (progress >= 50) return '#ffc107';  // Amarelo
    if (progress >= 25) return '#fd7e14';  // Laranja
    return '#dc3545';                      // Vermelho
}

// Função para obter ícone da categoria
function getCategoryIcon(category) {
    const icons = {
        'Alimentação': 'utensils',
        'Higiene': 'soap',
        'Brinquedos': 'gamepad',
        'Medicamentos': 'pills',
        'Roupas': 'tshirt',
        'Outros': 'box'
    };
    return icons[category] || 'box';
}

// ============ INICIALIZAÇÃO ============

// Função principal de inicialização
function inicializarSistemaDoacoes() {
    try {
        console.log('Inicializando sistema de doações...');
        
        // Inicializar dados
        inicializarDoacoesPadrao();
        inicializarLixeira();
        
        // Carregar interface
        carregarDoacoes();
        atualizarEstatisticas();
        
        // Inicializar eventos
        inicializarEventosFiltro();
        inicializarSincronizacao();
        
        console.log('Sistema de doações inicializado com sucesso!');
        
    } catch (error) {
        console.error('Erro na inicialização do sistema:', error);
        mostrarNotificacao('Erro ao inicializar sistema', 'error');
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistemaDoacoes();
});

// ============ EXPORTAÇÕES PARA USO GLOBAL ============

// Exportar funções para uso global
window.openAddModal = openAddModal;
window.aplicarFiltros = aplicarFiltros;
window.excluirDoacao = excluirDoacao;