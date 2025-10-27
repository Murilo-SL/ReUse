// ong_produtos.js - Sistema completo com upload de fotos e modais funcionais

// ============ SISTEMA DE ARMAZENAMENTO ============

function obterProdutos() {
    const produtosSalvos = localStorage.getItem('produtosSOSFelino');
    return produtosSalvos ? JSON.parse(produtosSalvos) : [];
}

function salvarProdutos(produtos) {
    localStorage.setItem('produtosSOSFelino', JSON.stringify(produtos));
    window.dispatchEvent(new Event('produtosAtualizados'));
}

// ============ VARIÁVEIS GLOBAIS ============

let produtos = [];
let produtoAtualId = null;
let produtosFiltrados = [];
let proximoId = 5;

// ============ INICIALIZAÇÃO ============

function inicializarPagina() {
    console.log('🚀 Inicializando página de produtos da ONG...');
    
    // Adicionar CSS personalizado
    adicionarCSSPersonalizado();
    
    // Inicializar dados
    inicializarProdutosPadrao();
    
    // Configurar interface
    destacarPaginaAtiva();
    inicializarEventosModal();
    inicializarUploadImagens();
    inicializarSincronizacao();
    adicionarEventListeners();
    
    // Carregar dados
    carregarProdutos();
    atualizarEstatisticas();
    
    console.log('✅ Página inicializada com sucesso');
}

function adicionarCSSPersonalizado() {
    if (!document.querySelector('#custom-styles')) {
        const style = document.createElement('style');
        style.id = 'custom-styles';
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background-color: white;
                margin: 5% auto;
                padding: 0;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease;
                position: relative;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .modal-header {
                padding: 20px 25px;
                border-bottom: 1px solid #e9ecef;
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                color: #2c3e50;
                font-size: 1.5rem;
                font-weight: 600;
            }
            
            .close {
                color: #6c757d;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s ease;
                line-height: 1;
            }
            
            .close:hover {
                color: #2c3e50;
            }
            
            .modal-body {
                padding: 25px;
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .image-preview {
                margin: 15px 0;
                padding: 15px;
                border: 2px dashed #dee2e6;
                border-radius: 8px;
                text-align: center;
                background-color: #f8f9fa;
            }
            
            .image-preview img {
                max-width: 100%;
                max-height: 200px;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .error-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 5px;
                display: none;
            }
            
            .loading-spinner {
                text-align: center;
                padding: 40px 20px;
                color: #6c757d;
            }
            
            .loading-spinner i {
                font-size: 24px;
                animation: spin 1s linear infinite;
                margin-bottom: 10px;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .toast {
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: toastIn 0.3s ease;
            }
            
            .toast-success { background: linear-gradient(135deg, #28a745, #20c997); }
            .toast-error { background: linear-gradient(135deg, #dc3545, #e83e8c); }
            .toast-warning { background: linear-gradient(135deg, #ffc107, #fd7e14); }
            .toast-info { background: linear-gradient(135deg, #17a2b8, #6f42c1); }
            
            .toast-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: 15px;
                font-size: 18px;
            }
            
            @keyframes toastIn {
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
        document.head.appendChild(style);
    }
}

function inicializarProdutosPadrao() {
    const produtosExistentes = obterProdutos();
    
    if (produtosExistentes.length === 0) {
        console.log('📦 Criando produtos padrão...');
        
        const produtosPadrao = [
            {
                id: 1,
                nome: "Camisa SOS Felino",
                preco: 35.00,
                categoria: "roupas",
                descricao: "Camisa casual de algodão, confortável e com estampa da instituição.",
                imagem: "IMG/camiseta.sos.jpg",
                vendidos: 15,
                avaliacao: 4.9,
                dataCadastro: new Date().toISOString()
            },
            {
                id: 2,
                nome: "Broche SOS Felino",
                preco: 15.00,
                categoria: "acessorios",
                descricao: "Broche metálico com logo da instituição.",
                imagem: "IMG/broche.sos.jpg",
                vendidos: 10,
                avaliacao: 4.7,
                dataCadastro: new Date().toISOString()
            },
            {
                id: 3,
                nome: "Bolsa SOS Felino",
                preco: 45.00,
                categoria: "acessorios",
                descricao: "Bolsa de algodão ecologicamente correta.",
                imagem: "IMG/bolsa.sos.jpg",
                vendidos: 6,
                avaliacao: 4.5,
                dataCadastro: new Date().toISOString()
            },
            {
                id: 4,
                nome: "Caneca SOS Felino",
                preco: 20.00,
                categoria: "casa",
                descricao: "Caneca em cerâmica com estampa personalizada.",
                imagem: "IMG/caneca.sos.jpg",
                vendidos: 20,
                avaliacao: 4.8,
                dataCadastro: new Date().toISOString()
            }
        ];
        
        salvarProdutos(produtosPadrao);
    }
    
    produtos = obterProdutos();
    produtosFiltrados = [...produtos];
    proximoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 5;
}

function destacarPaginaAtiva() {
    const menuItems = document.querySelectorAll('.sidebar-nav a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === 'ong_produto.html') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ============ SISTEMA DE MODAIS ============

function inicializarEventosModal() {
    console.log('🔧 Configurando eventos dos modais...');
    
    // Botão adicionar produto
    const btnAdicionar = document.getElementById('btnAdicionarProduto');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', abrirModalAdicionar);
        console.log('✅ Botão adicionar configurado');
    } else {
        console.warn('⚠️ Botão adicionar não encontrado, tentando fallback...');
        const btnFallback = document.querySelector('.primary-button');
        if (btnFallback && !btnFallback.onclick) {
            btnFallback.id = 'btnAdicionarProduto';
            btnFallback.addEventListener('click', abrirModalAdicionar);
            console.log('✅ Botão adicionar configurado via fallback');
        }
    }

    // Eventos de fechar modais
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) fecharModal(modal.id);
        });
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            fecharModal(event.target.id);
        }
    });

    // Prevenir fechamento ao clicar dentro do modal
    document.querySelectorAll('.modal-content').forEach(modalContent => {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

function abrirModalAdicionar() {
    console.log('➕ Abrindo modal de adicionar produto');
    
    // Limpar formulário
    const form = document.getElementById('formAdicionarProduto');
    if (form) form.reset();
    
    // Limpar preview
    const previewNova = document.getElementById('previewNovaImagem');
    if (previewNova) previewNova.style.display = 'none';
    
    // Limpar erros
    const erroImagem = document.getElementById('erroImagem');
    if (erroImagem) erroImagem.style.display = 'none';
    
    abrirModal('modalAdicionar');
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log(`✅ Modal ${modalId} aberto`);
    }
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log(`❌ Modal ${modalId} fechado`);
        
        // Limpeza específica por modal
        switch(modalId) {
            case 'modalAdicionar':
                const formAdd = document.getElementById('formAdicionarProduto');
                if (formAdd) formAdd.reset();
                const previewAdd = document.getElementById('previewNovaImagem');
                if (previewAdd) previewAdd.style.display = 'none';
                break;
                
            case 'modalEditar':
                const inputImg = document.getElementById('imagemProduto');
                if (inputImg) inputImg.value = '';
                break;
        }
    }
}

// ============ SISTEMA DE UPLOAD DE IMAGENS ============

function inicializarUploadImagens() {
    console.log('🖼️ Configurando upload de imagens...');
    
    // Modal de adição
    const inputNovaImagem = document.getElementById('novaImagemProduto');
    const previewNova = document.getElementById('previewNovaImagem');
    const previewImgNova = document.getElementById('previewImgNova');
    const erroImagem = document.getElementById('erroImagem');

    if (inputNovaImagem && previewImgNova) {
        inputNovaImagem.addEventListener('change', function(e) {
            validarEExibirPreview(this, previewImgNova, previewNova, erroImagem);
        });
    }

    // Modal de edição
    const inputImagemEditar = document.getElementById('imagemProduto');
    const previewAtual = document.getElementById('previewImagemAtual');
    const previewImgAtual = document.getElementById('previewImgAtual');
    const erroImagemEditar = document.getElementById('erroImagemEditar');

    if (inputImagemEditar && previewImgAtual) {
        inputImagemEditar.addEventListener('change', function(e) {
            validarEExibirPreview(this, previewImgAtual, previewAtual, erroImagemEditar);
        });
    }
}

function validarEExibirPreview(input, imgElement, container, erroElement) {
    const file = input.files[0];
    
    if (!file) {
        if (container) container.style.display = 'none';
        if (erroElement) erroElement.style.display = 'none';
        return false;
    }

    // Validar tipo
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!tiposPermitidos.includes(file.type)) {
        if (erroElement) {
            erroElement.textContent = 'Formato não suportado. Use JPG, PNG, GIF ou WebP.';
            erroElement.style.display = 'block';
        }
        input.value = '';
        return false;
    }

    // Validar tamanho (2MB)
    const tamanhoMaximo = 2 * 1024 * 1024;
    if (file.size > tamanhoMaximo) {
        if (erroElement) {
            erroElement.textContent = 'Imagem muito grande. Tamanho máximo: 2MB.';
            erroElement.style.display = 'block';
        }
        input.value = '';
        return false;
    }

    // Limpar erros
    if (erroElement) erroElement.style.display = 'none';

    // Criar preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imgElement.src = e.target.result;
        if (container) container.style.display = 'block';
    };
    reader.onerror = function() {
        if (erroElement) {
            erroElement.textContent = 'Erro ao carregar imagem. Tente novamente.';
            erroElement.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);

    return true;
}

function imagemParaBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.onerror = function(error) {
        console.error('❌ Erro ao ler imagem:', error);
        callback(null);
    };
    reader.readAsDataURL(file);
}

// ============ SISTEMA DE SINCRONIZAÇÃO ============

function inicializarSincronizacao() {
    window.addEventListener('storage', function(e) {
        if (e.key === 'produtosSOSFelino') {
            console.log('🔄 Atualizando dados do localStorage...');
            produtos = obterProdutos();
            carregarProdutos();
            atualizarEstatisticas();
        }
    });
    
    window.addEventListener('produtosAtualizados', function() {
        produtos = obterProdutos();
        carregarProdutos();
        atualizarEstatisticas();
    });
}

// ============ SISTEMA DE INTERFACE ============

function adicionarEventListeners() {
    console.log('🎯 Configurando event listeners...');
    
    // Filtros
    const elementos = {
        categoria: document.getElementById('categoria'),
        ordenar: document.getElementById('ordenar'),
        busca: document.getElementById('busca'),
        formEditar: document.getElementById('formEditarProduto'),
        formAdicionar: document.getElementById('formAdicionarProduto')
    };
    
    // Eventos de filtro
    if (elementos.categoria) {
        elementos.categoria.addEventListener('change', filtrarEOrdenarProdutos);
    }
    if (elementos.ordenar) {
        elementos.ordenar.addEventListener('change', filtrarEOrdenarProdutos);
    }
    if (elementos.busca) {
        elementos.busca.addEventListener('input', filtrarEOrdenarProdutos);
    }
    
    // Eventos de formulário
    if (elementos.formEditar) {
        elementos.formEditar.addEventListener('submit', salvarEdicaoProduto);
    }
    if (elementos.formAdicionar) {
        elementos.formAdicionar.addEventListener('submit', adicionarNovoProduto);
    }
}

function carregarProdutos() {
    const productsGrid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!productsGrid) return;
    
    // Loading
    productsGrid.innerHTML = `
        <div class="loading-spinner">
            <i class="bi bi-arrow-repeat"></i>
            <span>Carregando produtos...</span>
        </div>
    `;
    
    setTimeout(() => {
        try {
            produtos = obterProdutos();
            filtrarEOrdenarProdutos();
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-exclamation-triangle"></i>
                    <h3>Erro ao carregar produtos</h3>
                    <p>Recarregue a página e tente novamente.</p>
                </div>
            `;
        }
    }, 500);
}

function filtrarEOrdenarProdutos() {
    const categoria = document.getElementById('categoria')?.value || 'todos';
    const busca = document.getElementById('busca')?.value.toLowerCase() || '';
    const ordenacao = document.getElementById('ordenar')?.value || 'recentes';
    
    // Filtrar
    produtosFiltrados = produtos.filter(produto => {
        const categoriaMatch = categoria === 'todos' || produto.categoria === categoria;
        const buscaMatch = produto.nome.toLowerCase().includes(busca) || 
                          produto.descricao.toLowerCase().includes(busca);
        return categoriaMatch && buscaMatch;
    });
    
    // Ordenar
    produtosFiltrados.sort((a, b) => {
        switch(ordenacao) {
            case 'recentes': return b.id - a.id;
            case 'vendidos': return b.vendidos - a.vendidos;
            case 'preco-menor': return a.preco - b.preco;
            case 'preco-maior': return b.preco - a.preco;
            default: return 0;
        }
    });
    
    renderizarProdutos();
}

function renderizarProdutos() {
    const productsGrid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!productsGrid) return;
    
    if (produtosFiltrados.length === 0) {
        productsGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    productsGrid.innerHTML = produtosFiltrados.map(produto => `
        <div class="product-card" data-categoria="${produto.categoria}" 
             data-vendidos="${produto.vendidos}" data-preco="${produto.preco}" 
             data-avaliacao="${produto.avaliacao}">
            <div class="product-image ${produto.categoria}">
                <img src="${produto.imagem}" alt="${produto.nome}" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGMEYwRjAiLz48cGF0aCBkPSJNODAgODBIMTIwVjEyMEg4MFY4MFpNMTQwIDE0MEg2MFY2MEgxNDBWMTQwWiIgZmlsbD0iI0NDQ0NDQyIvPjwvc3ZnPg=='">
            </div>
            <h3 class="product-name">${produto.nome}</h3>
            <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
            <p class="product-description">${produto.descricao}</p>
            <div class="product-stats">
                <span><i class="bi bi-cart"></i> ${produto.vendidos} vendidos</span>
                <span><i class="bi bi-star-fill"></i> ${produto.avaliacao} (${Math.round(produto.vendidos * 0.8)} avaliações)</span>
            </div>
            <div class="donation-actions">
                <button class="primary-button small" onclick="editarProduto(${produto.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="danger-button small" onclick="excluirProduto(${produto.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

function atualizarEstatisticas() {
    const produtosAtivos = produtos.length;
    const totalVendas = produtos.reduce((total, produto) => total + produto.vendidos, 0);
    const faturamentoTotal = produtos.reduce((total, produto) => total + (produto.preco * produto.vendidos), 0);
    const avaliacaoMedia = produtos.length > 0 ? 
        produtos.reduce((total, produto) => total + produto.avaliacao, 0) / produtos.length : 0;
    
    // Atualizar cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        statCards[0].querySelector('.stat-value').textContent = produtosAtivos;
        statCards[1].querySelector('.stat-value').textContent = totalVendas;
        statCards[2].querySelector('.stat-value').textContent = `R$ ${faturamentoTotal.toFixed(2)}`;
        statCards[3].querySelector('.stat-value').textContent = avaliacaoMedia.toFixed(1);
    }
}

// ============ SISTEMA DE CRUD ============

function editarProduto(id) {
    produtoAtualId = id;
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        document.getElementById('produtoId').value = produto.id;
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('precoProduto').value = produto.preco;
        document.getElementById('categoriaProduto').value = produto.categoria;
        document.getElementById('descricaoProduto').value = produto.descricao;
        
        // Mostrar imagem atual
        const previewImgAtual = document.getElementById('previewImgAtual');
        const previewImagemAtual = document.getElementById('previewImagemAtual');
        
        if (previewImgAtual && previewImagemAtual) {
            previewImgAtual.src = produto.imagem;
            previewImagemAtual.style.display = 'block';
        }
        
        // Limpar upload
        const inputImagem = document.getElementById('imagemProduto');
        if (inputImagem) inputImagem.value = '';
        
        const erroImagemEditar = document.getElementById('erroImagemEditar');
        if (erroImagemEditar) erroImagemEditar.style.display = 'none';
        
        abrirModal('modalEditar');
    }
}

function excluirProduto(id) {
    produtoAtualId = id;
    const produto = produtos.find(p => p.id === id);
    
    if (produto) {
        document.getElementById('nomeProdutoExcluir').textContent = produto.nome;
        abrirModal('modalExcluir');
    }
}

function adicionarNovoProduto(e) {
    e.preventDefault();
    
    const inputImagem = document.getElementById('novaImagemProduto');
    const erroImagem = document.getElementById('erroImagem');
    
    // Validar imagem
    if (!inputImagem || !inputImagem.files[0]) {
        if (erroImagem) {
            erroImagem.textContent = 'Selecione uma imagem para o produto.';
            erroImagem.style.display = 'block';
        }
        return;
    }

    // Converter imagem
    imagemParaBase64(inputImagem.files[0], function(imagemBase64) {
        if (!imagemBase64) {
            mostrarNotificacao('Erro ao processar imagem. Tente novamente.', 'error');
            return;
        }

        const novoProduto = {
            id: proximoId++,
            nome: document.getElementById('novoNomeProduto').value,
            preco: parseFloat(document.getElementById('novoPrecoProduto').value),
            categoria: document.getElementById('novoCategoriaProduto').value,
            descricao: document.getElementById('novaDescricaoProduto').value,
            imagem: imagemBase64,
            vendidos: 0,
            avaliacao: 0,
            dataCadastro: new Date().toISOString()
        };
        
        produtos.push(novoProduto);
        salvarProdutos(produtos);
        
        fecharModal('modalAdicionar');
        mostrarNotificacao('🎉 Produto adicionado com sucesso!', 'success');
    });
}

function salvarEdicaoProduto(e) {
    e.preventDefault();
    
    const produtoIndex = produtos.findIndex(p => p.id === produtoAtualId);
    const inputImagem = document.getElementById('imagemProduto');
    
    if (produtoIndex === -1) {
        mostrarNotificacao('Produto não encontrado', 'error');
        return;
    }

    if (inputImagem && inputImagem.files[0]) {
        imagemParaBase64(inputImagem.files[0], function(novaImagemBase64) {
            if (novaImagemBase64) {
                atualizarProdutoComImagem(produtoIndex, novaImagemBase64);
            } else {
                mostrarNotificacao('Erro ao processar imagem', 'error');
            }
        });
    } else {
        atualizarProdutoComImagem(produtoIndex, produtos[produtoIndex].imagem);
    }
}

function atualizarProdutoComImagem(produtoIndex, imagem) {
    produtos[produtoIndex].nome = document.getElementById('nomeProduto').value;
    produtos[produtoIndex].preco = parseFloat(document.getElementById('precoProduto').value);
    produtos[produtoIndex].categoria = document.getElementById('categoriaProduto').value;
    produtos[produtoIndex].descricao = document.getElementById('descricaoProduto').value;
    produtos[produtoIndex].imagem = imagem;
    
    salvarProdutos(produtos);
    fecharModal('modalEditar');
    mostrarNotificacao('✅ Produto atualizado com sucesso!', 'success');
}

function confirmarExclusao() {
    const produtoIndex = produtos.findIndex(p => p.id === produtoAtualId);
    
    if (produtoIndex !== -1) {
        const produtoExcluido = produtos[produtoIndex];
        produtos.splice(produtoIndex, 1);
        salvarProdutos(produtos);
        
        fecharModal('modalExcluir');
        mostrarNotificacao(`🗑️ "${produtoExcluido.nome}" excluído com sucesso!`, 'success');
    }
}

function limparFiltros() {
    const categoriaSelect = document.getElementById('categoria');
    const ordenarSelect = document.getElementById('ordenar');
    const buscaInput = document.getElementById('busca');
    
    if (categoriaSelect) categoriaSelect.value = 'todos';
    if (ordenarSelect) ordenarSelect.value = 'recentes';
    if (buscaInput) buscaInput.value = '';
    
    filtrarEOrdenarProdutos();
}

// ============ SISTEMA DE NOTIFICAÇÕES ============

function mostrarNotificacao(mensagem, tipo = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    
    const icons = {
        success: 'bi-check-circle-fill',
        error: 'bi-exclamation-circle-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill'
    };
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center;">
            <i class="bi ${icons[tipo] || icons.info}"></i>
            <span style="margin-left: 10px;">${mensagem}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="bi bi-x"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remover
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// ============ INICIALIZAÇÃO GLOBAL ============

document.addEventListener('DOMContentLoaded', function() {
    // Pequeno delay para garantir que o DOM esteja totalmente carregado
    setTimeout(() => {
        inicializarPagina();
    }, 100);
});

// Funções globais para uso nos botões HTML
window.abrirModalAdicionar = abrirModalAdicionar;
window.editarProduto = editarProduto;
window.excluirProduto = excluirProduto;
window.confirmarExclusao = confirmarExclusao;
window.limparFiltros = limparFiltros;
window.fecharModal = fecharModal;

// Debug helper
window.debugProdutos = function() {
    console.log('=== DEBUG PRODUTOS ===');
    console.log('Produtos:', produtos);
    console.log('Produtos filtrados:', produtosFiltrados);
    console.log('Próximo ID:', proximoId);
    console.log('Botão adicionar:', document.getElementById('btnAdicionarProduto'));
    console.log('Modal adicionar:', document.getElementById('modalAdicionar'));
};