// ong_doacoes_necessarias.js - Sistema completo e sincronizado com validação customizada

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
        // Doações padrão da SOS Felino
        doacoes = {
            "1": {
                id: "1",
                name: "Ração para Gatos",
                description: "Precisamos de ração seca e úmida para alimentar nossos resgatados",
                category: "Alimentação",
                priority: "Alta",
                target: 50,
                collected: 22.5,
                image: "IMG/racao.jpg",
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
                image: "IMG/cobertor.jpg",
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
                image: "IMG/medicamentos.jpg",
                status: "Ativo",
                date: "01/05/2025",
                created: "2025-01-01"
            },
            "4": {
                id: "4",
                name: "Brinquedos",
                description: "Para enriquecimento ambiental dos gatos",
                category: "Brinquedos",
                priority: "Baixa",
                target: 30,
                collected: 18,
                image: "IMG/brinquedos.jpg",
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
                <i class="fas fa-spinner fa-spin"></i>
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
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoriaSelecionada = document.getElementById('categoryFilter')?.value || '';
    const prioridadeSelecionada = document.getElementById('priorityFilter')?.value || '';
    const statusSelecionado = document.getElementById('statusFilter')?.value || '';
    
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
            return false;
        }
        
        // Atualizar dados
        doacao.name = document.getElementById('itemName').value.trim();
        doacao.description = document.getElementById('itemDescription').value.trim();
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
        
        // Atualizar cards se existirem na página
        const elementosEstatisticas = {
            'totalDoacoes': totalDoacoes,
            'doacoesAtivas': doacoesAtivas,
            'doacoesAtendidas': doacoesAtendidas,
            'prioridadeAlta': prioridadeAlta
        };
        
        for (const [id, valor] of Object.entries(elementosEstatisticas)) {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = valor;
            }
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
        'Ativo': 'ativo',
        'Inativo': 'inativo',
        'Atendido': 'atendido'
    };
    return statusMap[status] || 'ativo';
}

// Função para obter ícone da categoria
function getCategoryIcon(category) {
    const icons = {
        'Alimentação': 'utensils',
        'Higiene': 'soap',
        'Brinquedos': 'gamepad',
        'Medicamentos': 'pills',
        'Roupas': 'tshirt',
        'Outros': 'gift'
    };
    return icons[category] || 'gift';
}

// Função para obter cor do progresso
function getProgressColor(collected, target) {
    const percentage = (collected / target) * 100;
    return percentage < 30 ? '#F44336' : percentage < 70 ? '#FF9800' : '#4CAF50';
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    try {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `alert-notification alert-${tipo}`;
        notification.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${mensagem}
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${tipo === 'success' ? '#4CAF50' : tipo === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
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
        const modal = document.getElementById('deleteModal');
        const message = modal.querySelector('p');
        
        if (!modal) {
            console.error('Modal de exclusão não encontrado');
            return;
        }
        
        message.textContent = `Tem certeza que deseja excluir a doação "${nome}"? Esta ação não pode ser desfeita.`;
        modal.style.display = 'block';
        
        // Configurar eventos do modal
        const confirmarBtn = document.getElementById('confirmDeleteButton');
        const cancelarBtn = document.getElementById('cancelDeleteButton');
        const closeBtn = modal.querySelector('.close');
        
        // Remover eventos anteriores para evitar duplicação
        confirmarBtn.replaceWith(confirmarBtn.cloneNode(true));
        cancelarBtn.replaceWith(cancelarBtn.cloneNode(true));
        
        const novaConfirmarBtn = document.getElementById('confirmDeleteButton');
        const novaCancelarBtn = document.getElementById('cancelDeleteButton');
        
        // Novo evento de confirmação
        novaConfirmarBtn.addEventListener('click', function() {
            excluirDoacao(id);
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

// ============ SISTEMA DE IMAGENS ============

// Função para lidar com upload de imagem
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        removeImage();
        return;
    }

    const errorElement = document.getElementById('itemImageError');
    clearError(errorElement);

    // Validações
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!allowedFileTypes.includes(file.type)) {
        showError('itemImageError', 'Selecione uma imagem válida (JPG, PNG, GIF ou WebP).');
        removeImage();
        return;
    }

    if (file.size > maxFileSize) {
        showError('itemImageError', 'A imagem deve ter no máximo 5MB.');
        removeImage();
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        updateImagePreview(e.target.result, file.name);
    };
    
    reader.onerror = function() {
        showError('itemImageError', 'Erro ao carregar a imagem. Tente novamente.');
    };
    
    reader.readAsDataURL(file);
}

function updateImagePreview(imageData, fileName) {
    const preview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const fileNameDisplay = document.getElementById('fileName');
    const removeBtn = document.getElementById('removeImage');

    previewImage.src = imageData;
    preview.classList.add('has-image');
    removeBtn.style.display = 'block';

    if (fileNameDisplay) {
        fileNameDisplay.querySelector('span').textContent = fileName;
        fileNameDisplay.style.display = 'flex';
    }

    // Salvar temporariamente
    const doacaoId = document.getElementById('donationId').value;
    const tempKey = doacaoId ? `tempImage_${doacaoId}` : 'tempImage_new';
    const fileNameKey = doacaoId ? `tempFileName_${doacaoId}` : 'tempFileName_new';
    
    localStorage.setItem(tempKey, imageData);
    localStorage.setItem(fileNameKey, fileName);
}

function removeImage() {
    const preview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const fileNameDisplay = document.getElementById('fileName');
    const fileInput = document.getElementById('itemImage');
    const removeBtn = document.getElementById('removeImage');
    const errorElement = document.getElementById('itemImageError');

    previewImage.src = '';
    preview.classList.remove('has-image');
    removeBtn.style.display = 'none';
    fileInput.value = '';

    if (fileNameDisplay) {
        fileNameDisplay.querySelector('span').textContent = '';
        fileNameDisplay.style.display = 'none';
    }

    clearError(errorElement);

    // Limpar storage
    const doacaoId = document.getElementById('donationId').value;
    const tempKey = doacaoId ? `tempImage_${doacaoId}` : 'tempImage_new';
    const fileNameKey = doacaoId ? `tempFileName_${doacaoId}` : 'tempFileName_new';
    
    localStorage.removeItem(tempKey);
    localStorage.removeItem(fileNameKey);
    document.getElementById('currentImage').value = '';
}

function loadExistingImage(imageUrl, doacaoId) {
    const preview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const fileNameDisplay = document.getElementById('fileName');
    const removeBtn = document.getElementById('removeImage');

    if (imageUrl) {
        if (imageUrl.startsWith('data:image')) {
            previewImage.src = imageUrl;
            preview.classList.add('has-image');
            removeBtn.style.display = 'block';

            const fileNameKey = doacaoId ? `tempFileName_${doacaoId}` : 'tempFileName_new';
            const fileName = localStorage.getItem(fileNameKey);
            if (fileName && fileNameDisplay) {
                fileNameDisplay.querySelector('span').textContent = fileName;
                fileNameDisplay.style.display = 'flex';
            }
        } else {
            preview.classList.remove('has-image');
            if (fileNameDisplay) {
                fileNameDisplay.querySelector('span').textContent = imageUrl;
                fileNameDisplay.style.display = 'flex';
            }
        }
        document.getElementById('currentImage').value = imageUrl;
    } else {
        removeImage();
    }
}

function getCurrentImage() {
    const doacaoId = document.getElementById('donationId').value;
    const tempKey = doacaoId ? `tempImage_${doacaoId}` : 'tempImage_new';
    return localStorage.getItem(tempKey) || document.getElementById('currentImage').value || '';
}

function cleanupTempStorage(doacaoId) {
    const tempKey = doacaoId ? `tempImage_${doacaoId}` : 'tempImage_new';
    const fileNameKey = doacaoId ? `tempFileName_${doacaoId}` : 'tempFileName_new';
    localStorage.removeItem(tempKey);
    localStorage.removeItem(fileNameKey);
}

// ============ VALIDAÇÃO DE FORMULÁRIOS ============

function validateForm() {
    let isValid = true;
    clearAllErrors();

    // Nome
    const name = document.getElementById('itemName').value.trim();
    if (!name) {
        showError('itemNameError', 'Informe o nome do item.');
        highlightField('itemName', true);
        isValid = false;
    } else if (name.length < 3) {
        showError('itemNameError', 'O nome deve ter pelo menos 3 caracteres.');
        highlightField('itemName', true);
        isValid = false;
    } else {
        highlightField('itemName', false);
    }

    // Descrição
    const description = document.getElementById('itemDescription').value.trim();
    if (!description) {
        showError('itemDescriptionError', 'Informe a descrição do item.');
        highlightField('itemDescription', true);
        isValid = false;
    } else if (description.length < 10) {
        showError('itemDescriptionError', 'A descrição deve ter pelo menos 10 caracteres.');
        highlightField('itemDescription', true);
        isValid = false;
    } else {
        highlightField('itemDescription', false);
    }

    // Categoria
    const category = document.getElementById('itemCategory').value;
    if (!category) {
        showError('itemCategoryError', 'Selecione uma categoria.');
        highlightField('itemCategory', true);
        isValid = false;
    } else {
        highlightField('itemCategory', false);
    }

    // Prioridade
    const priority = document.getElementById('itemPriority').value;
    if (!priority) {
        showError('itemPriorityError', 'Selecione uma prioridade.');
        highlightField('itemPriority', true);
        isValid = false;
    } else {
        highlightField('itemPriority', false);
    }

    // Quantidade
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    if (!quantity || quantity <= 0) {
        showError('itemQuantityError', 'Informe uma quantidade válida (maior que zero).');
        highlightField('itemQuantity', true);
        isValid = false;
    } else {
        highlightField('itemQuantity', false);
    }

    // Quantidade arrecadada
    const collected = parseInt(document.getElementById('itemCollected').value) || 0;
    if (collected < 0) {
        showError('itemCollectedError', 'A quantidade arrecadada não pode ser negativa.');
        highlightField('itemCollected', true);
        isValid = false;
    } else if (collected > quantity) {
        showError('itemCollectedError', 'A quantidade arrecadada não pode ser maior que a necessária.');
        highlightField('itemCollected', true);
        isValid = false;
    } else {
        highlightField('itemCollected', false);
    }

    // Status
    const status = document.getElementById('itemStatus').value;
    if (!status) {
        showError('itemStatusError', 'Selecione um status.');
        highlightField('itemStatus', true);
        isValid = false;
    } else {
        highlightField('itemStatus', false);
    }

    return isValid;
}

// Função para destacar campo com erro
function highlightField(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (hasError) {
            field.style.borderColor = '#f44336';
            field.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.1)';
        } else {
            field.style.borderColor = '#4CAF50';
            field.style.boxShadow = '0 0 0 2px rgba(76, 175, 80, 0.1)';
        }
    }
}

// Função para remover destaque dos campos
function clearFieldHighlights() {
    const fields = [
        'itemName', 'itemDescription', 'itemCategory', 'itemPriority',
        'itemQuantity', 'itemCollected', 'itemStatus'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    });
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = '#f44336';
        element.style.fontSize = '12px';
        element.style.marginTop = '5px';
        element.style.fontWeight = '500';
    }
}

function clearError(element) {
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(clearError);
    clearFieldHighlights();
}

// Adicionar eventos de validação em tempo real
function initializeRealTimeValidation() {
    const fields = [
        'itemName', 'itemDescription', 'itemCategory', 'itemPriority',
        'itemQuantity', 'itemCollected', 'itemStatus'
    ];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(fieldId);
            });
            
            field.addEventListener('input', function() {
                // Limpar erro quando o usuário começar a digitar
                const errorElement = document.getElementById(fieldId + 'Error');
                if (errorElement && errorElement.style.display !== 'none') {
                    clearError(errorElement);
                    highlightField(fieldId, false);
                }
            });
        }
    });
}

// Validar campo individual
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (!errorElement) return;
    
    clearError(errorElement);
    highlightField(fieldId, false);
    
    switch (fieldId) {
        case 'itemName':
            if (!value) {
                showError('itemNameError', 'Informe o nome do item.');
                highlightField(fieldId, true);
            } else if (value.length < 3) {
                showError('itemNameError', 'O nome deve ter pelo menos 3 caracteres.');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemDescription':
            if (!value) {
                showError('itemDescriptionError', 'Informe a descrição do item.');
                highlightField(fieldId, true);
            } else if (value.length < 10) {
                showError('itemDescriptionError', 'A descrição deve ter pelo menos 10 caracteres.');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemCategory':
            if (!value) {
                showError('itemCategoryError', 'Selecione uma categoria.');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemPriority':
            if (!value) {
                showError('itemPriorityError', 'Selecione uma prioridade.');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemQuantity':
            const quantity = parseInt(value);
            if (!quantity || quantity <= 0) {
                showError('itemQuantityError', 'Informe uma quantidade válida (maior que zero).');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemCollected':
            const collected = parseInt(value) || 0;
            const targetQuantity = parseInt(document.getElementById('itemQuantity').value) || 0;
            
            if (collected < 0) {
                showError('itemCollectedError', 'A quantidade arrecadada não pode ser negativa.');
                highlightField(fieldId, true);
            } else if (targetQuantity > 0 && collected > targetQuantity) {
                showError('itemCollectedError', 'A quantidade arrecadada não pode ser maior que a necessária.');
                highlightField(fieldId, true);
            }
            break;
            
        case 'itemStatus':
            if (!value) {
                showError('itemStatusError', 'Selecione um status.');
                highlightField(fieldId, true);
            }
            break;
    }
}

function getFormData() {
    const doacaoId = document.getElementById('donationId').value;
    
    return {
        id: doacaoId ? doacaoId : gerarIdUnico(),
        name: document.getElementById('itemName').value.trim(),
        description: document.getElementById('itemDescription').value.trim(),
        category: document.getElementById('itemCategory').value,
        priority: document.getElementById('itemPriority').value,
        target: parseInt(document.getElementById('itemQuantity').value),
        collected: parseInt(document.getElementById('itemCollected').value) || 0,
        image: getCurrentImage(),
        status: document.getElementById('itemStatus').value,
        date: new Date().toLocaleDateString('pt-BR'),
        created: new Date().toISOString().split('T')[0]
    };
}

function gerarIdUnico() {
    return Date.now().toString();
}

// ============ INICIALIZAÇÃO ============

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de doações necessárias...');
    
    // Inicializar armazenamento
    inicializarLixeira();
    inicializarDoacoesPadrao();
    
    // Inicializar sistema de sincronização
    inicializarSincronizacao();
    
    // Carregar interface
    carregarDoacoes();
    atualizarEstatisticas();
    
    // Inicializar eventos
    inicializarEventosFiltro();
    inicializarEventosDoacoes();
    initializeRealTimeValidation(); // Nova função de validação em tempo real
    
    // Configurar eventos do modal
    document.getElementById('addDonationBtn').addEventListener('click', openAddModal);
    
    // Configurar formulário
    document.getElementById('donationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) {
            // Rolagem para o primeiro erro
            const firstError = document.querySelector('.error-message[style*="display: block"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const doacaoId = document.getElementById('donationId').value;
        let sucesso = false;

        if (doacaoId) {
            sucesso = salvarEdicaoDoacao(doacaoId);
        } else {
            sucesso = salvarNovaDoacao();
        }

        if (sucesso) {
            closeAllModals();
            carregarDoacoes();
            atualizarEstatisticas();
        }
    });

    // Configurar upload de imagem
    document.getElementById('itemImage').addEventListener('change', handleImageUpload);
    document.getElementById('removeImage').addEventListener('click', removeImage);

    // Configurar fechamento de modais
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    document.getElementById('cancelButton').addEventListener('click', closeAllModals);

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) closeAllModals();
        });
    });

    console.log('Sistema de doações necessárias inicializado com sucesso!');
});

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });

    const doacaoId = document.getElementById('donationId').value;
    cleanupTempStorage(doacaoId);
    
    // Limpar erros ao fechar modal
    clearAllErrors();
}