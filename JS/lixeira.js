// lixeira.js - Sistema completo e sincronizado

// ============ SISTEMA DE ARMAZENAMENTO ============

// Função para obter produtos do localStorage
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

// Função para salvar lixeira
function salvarLixeira(lixeira) {
    localStorage.setItem('lixeiraCasaUsada', JSON.stringify(lixeira));
    // Disparar evento personalizado para sincronização
    window.dispatchEvent(new Event('lixeiraAtualizada'));
}

// ============ SISTEMA DE SINCRONIZAÇÃO ============

function inicializarSincronizacaoLixeira() {
    // Ouvir mudanças no localStorage de outras abas/páginas
    window.addEventListener('storage', function(e) {
        if (e.key === 'lixeiraCasaUsada' || e.key === 'produtosCasaUsada') {
            console.log('Mudança detectada na lixeira, atualizando...');
            carregarLixeira();
        }
    });
    
    // Ouvir eventos personalizados
    window.addEventListener('lixeiraAtualizada', function() {
        console.log('Lixeira atualizada, recarregando...');
        carregarLixeira();
    });
    
    window.addEventListener('produtosAtualizados', function() {
        console.log('Produtos atualizados, verificando lixeira...');
        carregarLixeira();
    });
    
    // Recarregar quando a página ganhar foco
    window.addEventListener('focus', function() {
        carregarLixeira();
    });
}

// ============ SISTEMA DE LIXEIRA ============

// Função para carregar lixeira
function carregarLixeira() {
    const lixeiraBody = document.getElementById('lixeira-body');
    const lixeiraStats = document.getElementById('lixeira-stats');
    
    if (!lixeiraBody) return;
    
    try {
        const lixeira = JSON.parse(localStorage.getItem('lixeiraCasaUsada')) || [];
        
        // Atualizar estatísticas
        lixeiraStats.textContent = `${lixeira.length} produtos na lixeira`;
        
        if (lixeira.length === 0) {
            lixeiraBody.innerHTML = `
                <tr>
                    <td colspan="3" class="no-products">
                        <div class="empty-state">
                            <i class="bi bi-trash"></i>
                            <h3>Lixeira vazia</h3>
                            <p>Nenhum produto foi excluído ainda.</p>
                            <a href="vendedor.html" class="btn-add-first">Voltar ao Dashboard</a>
                        </div>
                    </td>
                </tr>
            `;
            
            // Esconder botão de esvaziar lixeira
            const btnEsvaziar = document.getElementById('btn-esvaziar-lixeira');
            if (btnEsvaziar) {
                btnEsvaziar.style.display = 'none';
            }
        } else {
            lixeiraBody.innerHTML = lixeira.map(produto => `
                <tr data-produto-id="${produto.id}" class="produto-excluido">
                    <td>
                        <div class="produto-info">
                            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-thumb" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgyMFYzMEgzMFYyMFpNMzIgMzJIMThWMTguMDAwMUgzMlYzMlpNMzIgMzJIMThWMTguMDAwMUgzMlYzMloiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'">
                            <div class="produto-detalhes">
                                <strong>${produto.nome}</strong>
                                <small>${produto.descricao}</small>
                                <div class="produto-meta">
                                    <span class="categoria-badge">${produto.categoria}</span>
                                    <span class="preco-info">R$ ${produto.precoVista.toFixed(2)}</span>
                                    <span class="status status-excluido">Excluído</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="data-exclusao">${formatarData(produto.dataExclusao)}</span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn btn-recuperar" onclick="recuperarProduto('${produto.id}')">
                                <i class="bi bi-arrow-counterclockwise"></i> Restaurar
                            </button>
                            <button class="action-btn btn-excluir-permanentemente" onclick="excluirPermanentemente('${produto.id}')">
                                <i class="bi bi-trash-fill"></i> Excluir Permanentemente
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
            
            // Mostrar botão de esvaziar lixeira
            const btnEsvaziar = document.getElementById('btn-esvaziar-lixeira');
            if (btnEsvaziar) {
                btnEsvaziar.style.display = 'block';
            }
        }
        
    } catch (error) {
        console.error('Erro ao carregar lixeira:', error);
        lixeiraBody.innerHTML = `
            <tr>
                <td colspan="3" class="no-products">
                    <div class="empty-state">
                        <i class="bi bi-exclamation-triangle"></i>
                        <h3>Erro ao carregar lixeira</h3>
                        <p>Recarregue a página e tente novamente.</p>
                        <button onclick="location.reload()" class="btn-add-first">Recarregar Página</button>
                    </div>
                </td>
            </tr>
        `;
    }
}

// Função para recuperar produto da lixeira
function recuperarProduto(id) {
    try {
        const lixeira = JSON.parse(localStorage.getItem('lixeiraCasaUsada')) || [];
        const produtoIndex = lixeira.findIndex(p => p.id === id);
        
        if (produtoIndex !== -1) {
            const produto = lixeira[produtoIndex];
            
            // Remover da lixeira
            lixeira.splice(produtoIndex, 1);
            salvarLixeira(lixeira);
            
            // Adicionar aos produtos ativos
            const produtosAtivos = obterProdutos();
            produtosAtivos[id] = produto;
            salvarProdutos(produtosAtivos);
            
            // Mostrar notificação
            mostrarNotificacao(`"${produto.nome}" restaurado com sucesso!`, 'success');
            
        } else {
            mostrarNotificacao('Produto não encontrado na lixeira', 'error');
        }
        
    } catch (error) {
        console.error('Erro ao recuperar produto:', error);
        mostrarNotificacao('Erro ao restaurar produto', 'error');
    }
}

// Função para excluir permanentemente
function excluirPermanentemente(id) {
    if (confirm('Tem certeza que deseja excluir este produto permanentemente? Esta ação não pode ser desfeita!')) {
        try {
            const lixeira = JSON.parse(localStorage.getItem('lixeiraCasaUsada')) || [];
            const produtoIndex = lixeira.findIndex(p => p.id === id);
            
            if (produtoIndex !== -1) {
                const produto = lixeira[produtoIndex];
                
                // Remover da lixeira
                lixeira.splice(produtoIndex, 1);
                salvarLixeira(lixeira);
                
                // Mostrar notificação
                mostrarNotificacao(`"${produto.nome}" excluído permanentemente!`, 'success');
                
            } else {
                mostrarNotificacao('Produto não encontrado na lixeira', 'error');
            }
            
        } catch (error) {
            console.error('Erro ao excluir permanentemente:', error);
            mostrarNotificacao('Erro ao excluir produto', 'error');
        }
    }
}

// Função para esvaziar lixeira
function esvaziarLixeira() {
    const lixeira = JSON.parse(localStorage.getItem('lixeiraCasaUsada')) || [];
    
    if (lixeira.length === 0) {
        alert('A lixeira já está vazia!');
        return;
    }
    
    if (confirm(`Tem certeza que deseja esvaziar a lixeira? Todos os ${lixeira.length} produtos serão excluídos permanentemente!`)) {
        try {
            salvarLixeira([]);
            mostrarNotificacao('Lixeira esvaziada com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao esvaziar lixeira:', error);
            mostrarNotificacao('Erro ao esvaziar lixeira', 'error');
        }
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Data inválida';
    }
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

// ============ INICIALIZAÇÃO ============

// Inicializar lixeira
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de lixeira...');
    
    inicializarSincronizacaoLixeira();
    carregarLixeira();
    
    // Botão esvaziar lixeira
    const btnEsvaziar = document.getElementById('btn-esvaziar-lixeira');
    if (btnEsvaziar) {
        btnEsvaziar.addEventListener('click', esvaziarLixeira);
    }
    
    console.log('Sistema de lixeira inicializado com sucesso!');
});