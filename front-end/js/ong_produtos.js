// ong-produtos-admin.js - Gerenciamento de produtos para administrador da ONG

class OngProdutosAdmin {
    constructor() {
        this.currentProductId = null;
        this.products = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadProducts();
    }

    initializeElements() {
        // Elementos principais
        this.productsGrid = document.getElementById('productsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.searchInput = document.querySelector('.search-wrapper .search-input');
        
        // Botões de ação
        this.novoProdutoBtn = document.getElementById('novoProdutoBtn');
        this.exportarBtn = document.getElementById('exportarBtn');
        
        // Botões de navegação
        this.campanhasBtn = document.getElementById('campanhasBtn');
        this.doacoesBtn = document.getElementById('doacoesBtn');
        
        // Quick actions
        this.estoqueBaixoBtn = document.getElementById('estoqueBaixoBtn');
        this.maisVendidosBtn = document.getElementById('maisVendidosBtn');
        this.categoriasBtn = document.getElementById('categoriasBtn');
        this.promocoesBtn = document.getElementById('promocoesBtn');
        
        // Modal de produto
        this.produtoModal = document.getElementById('produtoModal');
        this.modalTitle = document.getElementById('modalTitle').querySelector('span');
        this.closeModal = document.getElementById('closeModal');
        this.cancelProduto = document.getElementById('cancelProduto');
        this.salvarProduto = document.getElementById('salvarProduto');
        
        // Form elements
        this.produtoNome = document.getElementById('produtoNome');
        this.produtoDescricao = document.getElementById('produtoDescricao');
        this.produtoCategoria = document.getElementById('produtoCategoria');
        this.produtoPreco = document.getElementById('produtoPreco');
        this.produtoEstoque = document.getElementById('produtoEstoque');
        this.produtoStatus = document.getElementById('produtoStatus');
        
        // Variações
        this.variationsContainer = document.getElementById('variationsContainer');
        this.addVariationBtn = document.getElementById('addVariation');
        
        // Upload de imagem
        this.imageUpload = document.getElementById('productImageUpload');
        this.fileInput = document.getElementById('produtoImagem');
        
        // Modal de exclusão
        this.deleteModal = document.getElementById('deleteModal');
        this.closeDeleteModal = document.getElementById('closeDeleteModal');
        this.cancelDelete = document.getElementById('cancelDelete');
        this.confirmDelete = document.getElementById('confirmDelete');
    }

    setupEventListeners() {
        // Filtros
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });

        // Ordenação
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', () => this.filterAndSortProducts());
        }

        // Busca
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => this.filterAndSortProducts());
        }

        // Novo produto
        if (this.novoProdutoBtn) {
            this.novoProdutoBtn.addEventListener('click', () => this.openNewProductModal());
        }

        // Navegação para ong-inicio.html
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

        // Exportar
        if (this.exportarBtn) {
            this.exportarBtn.addEventListener('click', () => this.exportReport());
        }

        // Quick actions
        if (this.estoqueBaixoBtn) {
            this.estoqueBaixoBtn.addEventListener('click', () => this.filterLowStock());
        }

        if (this.maisVendidosBtn) {
            this.maisVendidosBtn.addEventListener('click', () => this.filterBestSellers());
        }

        // Modal de produto
        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeProductModal());
        }

        if (this.cancelProduto) {
            this.cancelProduto.addEventListener('click', () => this.closeProductModal());
        }

        if (this.salvarProduto) {
            this.salvarProduto.addEventListener('click', () => this.saveProduct());
        }

        // Fechar modal ao clicar fora
        if (this.produtoModal) {
            this.produtoModal.addEventListener('click', (e) => {
                if (e.target === this.produtoModal) {
                    this.closeProductModal();
                }
            });
        }

        // Upload de imagem
        if (this.imageUpload && this.fileInput) {
            this.imageUpload.addEventListener('click', () => this.fileInput.click());
            
            this.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0]);
                }
            });

            this.imageUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.imageUpload.style.borderColor = 'var(--primary-purple)';
            });

            this.imageUpload.addEventListener('dragleave', () => {
                this.imageUpload.style.borderColor = 'var(--light-gray-2)';
            });

            this.imageUpload.addEventListener('drop', (e) => {
                e.preventDefault();
                this.imageUpload.style.borderColor = 'var(--light-gray-2)';
                
                if (e.dataTransfer.files.length > 0) {
                    this.handleImageUpload(e.dataTransfer.files[0]);
                }
            });
        }

        // Variações
        if (this.addVariationBtn) {
            this.addVariationBtn.addEventListener('click', () => this.addVariation());
        }

        // Delegação de eventos para botões de ação nos cards
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const productCard = target.closest('.product-card');
            if (!productCard) return;

            if (target.classList.contains('edit-product')) {
                this.editProduct(productCard);
            } else if (target.classList.contains('delete-product')) {
                this.deleteProduct(productCard);
            } else if (target.classList.contains('duplicate-product')) {
                this.duplicateProduct(productCard);
            }
        });

        // Delegação para remover variação
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-variation')) {
                const variationItem = e.target.closest('.variation-item');
                if (variationItem && this.variationsContainer.children.length > 1) {
                    variationItem.remove();
                }
            }
        });

        // Modal de exclusão
        if (this.closeDeleteModal) {
            this.closeDeleteModal.addEventListener('click', () => this.closeDeleteModalFn());
        }

        if (this.cancelDelete) {
            this.cancelDelete.addEventListener('click', () => this.closeDeleteModalFn());
        }

        if (this.confirmDelete) {
            this.confirmDelete.addEventListener('click', () => this.confirmDeleteProduct());
        }

        if (this.deleteModal) {
            this.deleteModal.addEventListener('click', (e) => {
                if (e.target === this.deleteModal) {
                    this.closeDeleteModalFn();
                }
            });
        }
    }

    loadProducts() {
        // Em produção, isso viria de uma API
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const id = card.dataset.id;
            const status = card.querySelector('.product-status').classList.contains('ativo') ? 'ativo' : 'inativo';
            const category = card.querySelector('.detail-item:nth-child(2) .detail-value')?.textContent.toLowerCase() || 'outros';
            
            this.products.push({
                id: id,
                element: card,
                status: status,
                category: category
            });
        });
    }

    handleFilter(btn) {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.filterAndSortProducts();
    }

    filterAndSortProducts() {
        const searchTerm = this.searchInput?.value.toLowerCase() || '';
        
        this.products.forEach(product => {
            let show = true;

            // Filtro por categoria
            if (this.currentFilter !== 'all') {
                if (product.category !== this.currentFilter) {
                    show = false;
                }
            }

            // Filtro por busca
            if (show && searchTerm) {
                const title = product.element.querySelector('.product-title').textContent.toLowerCase();
                if (!title.includes(searchTerm)) {
                    show = false;
                }
            }

            product.element.style.display = show ? 'block' : 'none';
        });
    }

    filterLowStock() {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        this.currentFilter = 'all';
        
        this.products.forEach(product => {
            const stockElement = product.element.querySelector('.stock-info');
            if (stockElement && stockElement.classList.contains('stock-warning')) {
                product.element.style.display = 'block';
            } else {
                product.element.style.display = 'none';
            }
        });
    }

    filterBestSellers() {
        // Implementar lógica de mais vendidos
        this.showNotification('Mostrando produtos mais vendidos', 'info');
    }

    openNewProductModal() {
        this.currentProductId = null;
        this.modalTitle.textContent = 'Novo Produto';
        this.resetProductForm();
        this.produtoModal.classList.add('active');
    }

    editProduct(productCard) {
        this.currentProductId = productCard.dataset.id;
        this.modalTitle.textContent = 'Editar Produto';
        
        // Preencher formulário com dados do produto
        const title = productCard.querySelector('.product-title').textContent;
        const description = productCard.querySelector('.product-description').textContent;
        const price = productCard.querySelector('.price')?.textContent.replace('R$ ', '') || '0,00';
        const stock = productCard.querySelector('.stock-info span')?.textContent.split(':')[1]?.trim() || '0';
        
        this.produtoNome.value = title;
        this.produtoDescricao.value = description;
        this.produtoPreco.value = price;
        this.produtoEstoque.value = stock;
        
        this.produtoModal.classList.add('active');
    }

    deleteProduct(productCard) {
        this.currentProductId = productCard.dataset.id;
        this.deleteModal.classList.add('active');
    }

    duplicateProduct(productCard) {
        const title = productCard.querySelector('.product-title').textContent;
        this.showNotification(`Produto "${title}" duplicado com sucesso!`, 'success');
    }

    closeProductModal() {
        this.produtoModal.classList.remove('active');
        this.resetProductForm();
    }

    resetProductForm() {
        document.getElementById('produtoForm').reset();
        this.variationsContainer.innerHTML = `
            <div class="variation-item">
                <input type="text" class="form-control" placeholder="Tamanho (ex: P)">
                <input type="number" class="form-control" placeholder="Estoque">
                <button class="btn btn-outline btn-sm remove-variation">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        
        this.imageUpload.innerHTML = `
            <div class="image-upload-icon">
                <i class="bi bi-cloud-arrow-up"></i>
            </div>
            <div class="image-upload-text">
                <h4>Arraste uma imagem aqui</h4>
                <p>ou clique para selecionar</p>
            </div>
        `;
    }

    saveProduct() {
        // Validar campos obrigatórios
        if (!this.produtoNome.value || !this.produtoDescricao.value || !this.produtoCategoria.value || !this.produtoPreco.value) {
            this.showNotification('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        // Simular salvamento
        this.showNotification(
            this.currentProductId ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!',
            'success'
        );
        
        this.closeProductModal();
    }

    addVariation() {
        const variationItem = document.createElement('div');
        variationItem.className = 'variation-item';
        variationItem.innerHTML = `
            <input type="text" class="form-control" placeholder="Tamanho (ex: P)">
            <input type="number" class="form-control" placeholder="Estoque">
            <button class="btn btn-outline btn-sm remove-variation">
                <i class="bi bi-trash"></i>
            </button>
        `;
        this.variationsContainer.appendChild(variationItem);
    }

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecione uma imagem válida', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('A imagem deve ter no máximo 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.imageUpload.innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: var(--border-radius-md);">
                <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-light);">
                    ${file.name} (${(file.size / 1024).toFixed(1)} KB)
                </p>
            `;
        };
        reader.readAsDataURL(file);
    }

    closeDeleteModalFn() {
        this.deleteModal.classList.remove('active');
        this.currentProductId = null;
    }

    confirmDeleteProduct() {
        if (this.currentProductId) {
            const productCard = document.querySelector(`[data-id="${this.currentProductId}"]`);
            if (productCard) {
                productCard.remove();
                this.showNotification('Produto excluído com sucesso!', 'success');
            }
        }
        this.closeDeleteModalFn();
    }

    exportReport() {
        // Simular exportação
        this.showNotification('Relatório exportado com sucesso!', 'success');
    }

    showNotification(message, type = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : '#9933cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos de animação
    const styles = document.createElement('style');
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
    `;
    document.head.appendChild(styles);
    
    window.ongProdutosAdmin = new OngProdutosAdmin();
});