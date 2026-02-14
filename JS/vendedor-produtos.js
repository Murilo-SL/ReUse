class MeusProdutos {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentSort = { field: 'name', direction: 'asc' };
        this.filters = {
            status: '',
            category: '',
            stock: '',
            search: ''
        };
        this.editingProductId = null;
        this.productToDeleteId = null;
        this.uploadedImages = [];
        this.init();
    }

    init() {
        this.initializeElements();
        this.setupEventListeners();
        this.loadProducts();
        this.setupFormValidation();
        this.initializeSortIndicators();
    }

    initializeElements() {
        // Elementos principais
        this.productsTableBody = document.getElementById('productsTableBody');
        this.productModal = document.getElementById('productModal');
        this.deleteConfirmModal = document.getElementById('deleteConfirmModal');
        this.productForm = document.getElementById('productForm');
        
        // Botões
        this.addProductBtn = document.getElementById('addProductBtn');
        this.saveProductBtn = document.getElementById('saveProduct');
        this.cancelProductBtn = document.getElementById('cancelProduct');
        this.closeProductModalBtn = document.getElementById('closeProductModal');
        this.cancelDeleteBtn = document.getElementById('cancelDelete');
        this.confirmDeleteBtn = document.getElementById('confirmDelete');
        
        // Filtros
        this.filterStatus = document.getElementById('filterStatus');
        this.filterCategory = document.getElementById('filterCategory');
        this.filterStock = document.getElementById('filterStock');
        this.filterSearch = document.getElementById('filterSearch');
        this.applyFiltersBtn = document.getElementById('applyFilters');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        
        // Campos do formulário
        this.productName = document.getElementById('productName');
        this.productCategory = document.getElementById('productCategory');
        this.productCondition = document.getElementById('productCondition');
        this.productPrice = document.getElementById('productPrice');
        this.productStock = document.getElementById('productStock');
        this.productDescription = document.getElementById('productDescription');
        this.productStatus = document.getElementById('productStatus');
        this.productImages = document.getElementById('productImages');
        this.imageUploadArea = document.getElementById('imageUploadArea');
        this.imagePreview = document.getElementById('imagePreview');
        this.charCount = document.getElementById('charCount');
        
        // Campos opcionais
        this.productBrand = document.getElementById('productBrand');
        this.productSize = document.getElementById('productSize');
        this.productColor = document.getElementById('productColor');
        this.productWeight = document.getElementById('productWeight');
        
        // Status badges
        this.statusBadges = document.querySelectorAll('.status-badge-option');
        
        // Paginação
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.startItem = document.getElementById('startItem');
        this.endItem = document.getElementById('endItem');
        this.totalItems = document.getElementById('totalItems');
        
        // Elementos de erro
        this.errorElements = {
            name: document.getElementById('nameError'),
            category: document.getElementById('categoryError'),
            condition: document.getElementById('conditionError'),
            price: document.getElementById('priceError'),
            stock: document.getElementById('stockError'),
            description: document.getElementById('descriptionError'),
            images: document.getElementById('imagesError')
        };
    }

    initializeSortIndicators() {
        // Inicializar indicadores de ordenação
        const sortableHeaders = document.querySelectorAll('.sortable');
        sortableHeaders.forEach(header => {
            if (header.dataset.sort === this.currentSort.field) {
                header.classList.add(`sorted-${this.currentSort.direction}`);
            }
        });
    }

    setupEventListeners() {
        // Botão de adicionar produto
        if (this.addProductBtn) {
            this.addProductBtn.addEventListener('click', () => this.openProductModal());
        }

        // Botões do modal de produto
        if (this.saveProductBtn) {
            this.saveProductBtn.addEventListener('click', (e) => this.saveProduct(e));
        }

        if (this.cancelProductBtn) {
            this.cancelProductBtn.addEventListener('click', () => this.closeProductModal());
        }

        if (this.closeProductModalBtn) {
            this.closeProductModalBtn.addEventListener('click', () => this.closeProductModal());
        }

        // Fechar modal ao clicar fora
        if (this.productModal) {
            this.productModal.addEventListener('click', (e) => {
                if (e.target === this.productModal) {
                    this.closeProductModal();
                }
            });
        }

        // Botões de exclusão
        if (this.cancelDeleteBtn) {
            this.cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
        }

        if (this.confirmDeleteBtn) {
            this.confirmDeleteBtn.addEventListener('click', () => this.deleteProduct());
        }

        // Filtros
        if (this.applyFiltersBtn) {
            this.applyFiltersBtn.addEventListener('click', () => this.applyFilters());
        }

        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        if (this.filterSearch) {
            this.filterSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyFilters();
                }
            });
        }

        // Ordenação da tabela
        const sortableHeaders = document.querySelectorAll('.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const field = header.dataset.sort;
                this.sortProducts(field);
            });
        });

        // Upload de imagens
        this.setupImageUpload();

        // Contador de caracteres
        if (this.productDescription) {
            this.productDescription.addEventListener('input', () => {
                this.updateCharCount();
            });
        }

        // Botões de status
        this.statusBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.selectStatusBadge(badge);
            });
        });

        // Paginação
        this.setupPagination();

        // Validação em tempo real
        this.setupRealTimeValidation();

        // Fechar modais com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.productModal.classList.contains('active')) {
                    this.closeProductModal();
                }
                if (this.deleteConfirmModal.classList.contains('active')) {
                    this.closeDeleteModal();
                }
            }
        });
    }

    setupImageUpload() {
        if (this.imageUploadArea && this.productImages) {
            // Clique para selecionar arquivos
            this.imageUploadArea.addEventListener('click', () => this.productImages.click());
            
            // Arrastar e soltar
            this.imageUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.imageUploadArea.classList.add('dragover');
            });

            this.imageUploadArea.addEventListener('dragleave', () => {
                this.imageUploadArea.classList.remove('dragover');
            });

            this.imageUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                this.imageUploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                this.handleImageUpload(files);
            });

            // Mudança no input de arquivo
            this.productImages.addEventListener('change', (e) => {
                this.handleImageUpload(e.target.files);
            });
        }
    }

    setupPagination() {
        const paginationContainer = document.querySelector('.pagination-controls');
        if (!paginationContainer) return;

        // Configurar botões de página existentes
        const paginationBtns = paginationContainer.querySelectorAll('.pagination-btn:not(.pagination-prev):not(.pagination-next)');
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.goToPage(parseInt(btn.textContent));
            });
        });

        // Botões anterior/próximo
        if (this.prevPageBtn) {
            this.prevPageBtn.addEventListener('click', () => this.prevPage());
        }

        if (this.nextPageBtn) {
            this.nextPageBtn.addEventListener('click', () => this.nextPage());
        }
    }

    setupFormValidation() {
        // Validação básica dos campos obrigatórios
        const requiredFields = [
            this.productName,
            this.productCategory,
            this.productCondition,
            this.productPrice,
            this.productStock,
            this.productDescription
        ];

        requiredFields.forEach(field => {
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => {
                    // Limpar erro enquanto digita
                    const errorElement = this.errorElements[field.id.replace('product', '').toLowerCase()];
                    if (errorElement && field.value.trim()) {
                        errorElement.style.display = 'none';
                        field.classList.remove('has-error');
                    }
                });
            }
        });
    }

    setupRealTimeValidation() {
        // Validação de preço
        if (this.productPrice) {
            this.productPrice.addEventListener('input', () => {
                const value = parseFloat(this.productPrice.value);
                if (value < 0) {
                    this.productPrice.value = '';
                }
            });
        }

        // Validação de estoque
        if (this.productStock) {
            this.productStock.addEventListener('input', () => {
                const value = parseInt(this.productStock.value);
                if (value < 0) {
                    this.productStock.value = '';
                }
            });
        }

        // Formatação de preço
        if (this.productPrice) {
            this.productPrice.addEventListener('blur', () => {
                const value = parseFloat(this.productPrice.value);
                if (!isNaN(value)) {
                    this.productPrice.value = value.toFixed(2);
                }
            });
        }
    }

    async loadProducts() {
        try {
            // Simulação de carregamento
            this.showLoading(true);
            
            setTimeout(() => {
                this.products = this.getSampleProducts();
                this.applyFilters();
                this.renderProducts();
                this.updatePagination();
                this.updateProductCount();
                this.showLoading(false);
            }, 500);

        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            this.showNotification('Erro ao carregar produtos. Tente novamente.', 'error');
            this.showLoading(false);
        }
    }

    getSampleProducts() {
        return [
            {
                id: 1,
                name: 'Tênis Nike Air Max',
                category: 'moda',
                condition: 'seminovo',
                price: 199.90,
                stock: 3,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center',
                description: 'Tênis esportivo em ótimo estado, pouco usado',
                brand: 'Nike',
                size: '42',
                color: 'Branco/Vermelho',
                weight: 0.8,
                createdAt: '2025-01-15',
                updatedAt: '2025-02-10',
                views: 145,
                sales: 2
            },
            {
                id: 2,
                name: 'Vestido Floral Verão',
                category: 'moda',
                condition: 'novo',
                price: 129.90,
                stock: 5,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop&crop=center',
                description: 'Vestido floral estampado, tamanho M, com etiqueta',
                brand: 'Zara',
                size: 'M',
                color: 'Floral Multicolor',
                weight: 0.3,
                createdAt: '2025-01-20',
                updatedAt: '2025-02-09',
                views: 89,
                sales: 3
            },
            {
                id: 3,
                name: 'Liquidificador Philips Walita',
                category: 'casa',
                condition: 'usado',
                price: 129.90,
                stock: 1,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
                description: 'Liquidificador 6 velocidades, funciona perfeitamente',
                brand: 'Philips',
                size: 'Standard',
                color: 'Preto',
                weight: 2.5,
                createdAt: '2025-01-25',
                updatedAt: '2025-02-10',
                views: 67,
                sales: 1
            },
            {
                id: 4,
                name: 'Camiseta Polo Lacoste',
                category: 'moda',
                condition: 'seminovo',
                price: 159.90,
                stock: 8,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop&crop=center',
                description: 'Camiseta polo azul marinho, algodão pima, original',
                brand: 'Lacoste',
                size: 'M',
                color: 'Azul Marinho',
                weight: 0.2,
                createdAt: '2025-01-30',
                updatedAt: '2025-02-08',
                views: 123,
                sales: 5
            },
            {
                id: 5,
                name: 'Smartphone Samsung Galaxy S20',
                category: 'eletronicos',
                condition: 'usado',
                price: 1899.90,
                stock: 2,
                status: 'draft',
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center',
                description: 'Smartphone Galaxy S20, 128GB, 8GB RAM, em perfeito estado',
                brand: 'Samsung',
                size: '6.2"',
                color: 'Preto',
                weight: 0.17,
                createdAt: '2025-02-01',
                updatedAt: '2025-02-05',
                views: 45,
                sales: 0
            },
            {
                id: 6,
                name: 'Livro: O Hobbit - Edição Ilustrada',
                category: 'livros',
                condition: 'usado',
                price: 49.90,
                stock: 0,
                status: 'sold',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop&crop=center',
                description: 'Livro em bom estado, capa dura, edição ilustrada por Alan Lee',
                brand: 'HarperCollins',
                size: '23x16cm',
                color: 'Verde',
                weight: 0.4,
                createdAt: '2025-01-10',
                updatedAt: '2025-02-03',
                views: 78,
                sales: 1
            },
            {
                id: 7,
                name: 'Bola de Futebol Oficial Nike',
                category: 'esportes',
                condition: 'novo',
                price: 89.90,
                stock: 12,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=300&h=300&fit=crop&crop=center',
                description: 'Bola de futebol oficial tamanho 5, couro sintético de alta qualidade',
                brand: 'Nike',
                size: 'Tamanho 5',
                color: 'Branco/Preto',
                weight: 0.45,
                createdAt: '2025-02-05',
                updatedAt: '2025-02-10',
                views: 34,
                sales: 8
            },
            {
                id: 8,
                name: 'Cadeira Gamer Profissional',
                category: 'outros',
                condition: 'seminovo',
                price: 799.90,
                stock: 1,
                status: 'inactive',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center',
                description: 'Cadeira gamer com ajuste de altura, reclinável, apoio lombar',
                brand: 'DX Racer',
                size: '80x70x130cm',
                color: 'Preto/Vermelho',
                weight: 18.5,
                createdAt: '2025-01-18',
                updatedAt: '2025-02-01',
                views: 156,
                sales: 0
            },
            {
                id: 9,
                name: 'Fone de Ouvido Bluetooth Sony WH-1000XM4',
                category: 'eletronicos',
                condition: 'novo',
                price: 1299.90,
                stock: 15,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop&crop=center',
                description: 'Fone sem fio com cancelamento de ruído ativo, 30h de bateria',
                brand: 'Sony',
                size: 'Ajustável',
                color: 'Preto',
                weight: 0.25,
                createdAt: '2025-02-08',
                updatedAt: '2025-02-10',
                views: 234,
                sales: 12
            },
            {
                id: 10,
                name: 'Relógio Casio Edifício',
                category: 'moda',
                condition: 'usado',
                price: 299.90,
                stock: 1,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop&crop=center',
                description: 'Relógio analógico em aço inoxidável, à prova d\'água 100m',
                brand: 'Casio',
                size: '42mm',
                color: 'Prata',
                weight: 0.1,
                createdAt: '2025-02-03',
                updatedAt: '2025-02-09',
                views: 67,
                sales: 2
            },
            {
                id: 11,
                name: 'Mochila Executiva Targus',
                category: 'moda',
                condition: 'novo',
                price: 179.90,
                stock: 7,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
                description: 'Mochila para notebook até 15.6", compartimento à prova d\'água',
                brand: 'Targus',
                size: '45x30x15cm',
                color: 'Cinza',
                weight: 0.8,
                createdAt: '2025-02-12',
                updatedAt: '2025-02-12',
                views: 45,
                sales: 3
            },
            {
                id: 12,
                name: 'Tablet Apple iPad 9ª Geração',
                category: 'eletronicos',
                condition: 'seminovo',
                price: 2499.90,
                stock: 3,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center',
                description: 'Tablet com tela de 10.2", 64GB, Wi-Fi, em perfeito estado',
                brand: 'Apple',
                size: '10.2"',
                color: 'Prata',
                weight: 0.49,
                createdAt: '2025-02-01',
                updatedAt: '2025-02-11',
                views: 189,
                sales: 6
            },
            {
                id: 13,
                name: 'Kit Panelas Tramontina 10 Peças',
                category: 'casa',
                condition: 'novo',
                price: 399.90,
                stock: 4,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
                description: 'Kit completo de panelas antiaderentes, presente de casamento',
                brand: 'Tramontina',
                size: 'Vários tamanhos',
                color: 'Preto',
                weight: 8.2,
                createdAt: '2025-01-28',
                updatedAt: '2025-02-07',
                views: 56,
                sales: 2
            },
            {
                id: 14,
                name: 'Tênis Adidas Ultraboost',
                category: 'moda',
                condition: 'seminovo',
                price: 299.90,
                stock: 2,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop&crop=center',
                description: 'Tênis de corrida, tecnologia Boost, pouco usado',
                brand: 'Adidas',
                size: '41',
                color: 'Preto/Branco',
                weight: 0.7,
                createdAt: '2025-02-02',
                updatedAt: '2025-02-09',
                views: 98,
                sales: 1
            },
            {
                id: 15,
                name: 'Câmera DSLR Canon EOS Rebel T7',
                category: 'eletronicos',
                condition: 'usado',
                price: 1899.90,
                stock: 1,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop&crop=center',
                description: 'Câmera DSLR com lente 18-55mm, kit completo',
                brand: 'Canon',
                size: '129 x 101 x 78 mm',
                color: 'Preto',
                weight: 1.2,
                createdAt: '2025-01-15',
                updatedAt: '2025-02-04',
                views: 145,
                sales: 0
            },
            {
                id: 16,
                name: 'Jogo de Tabuleiro Catan',
                category: 'outros',
                condition: 'novo',
                price: 159.90,
                stock: 6,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1585506936724-fa0c19c7b3c5?w=300&h=300&fit=crop&crop=center',
                description: 'Jogo de estratégia, edição em português, lacrado',
                brand: 'Devir',
                size: '30x30x8cm',
                color: 'Multicolor',
                weight: 1.1,
                createdAt: '2025-02-06',
                updatedAt: '2025-02-10',
                views: 23,
                sales: 4
            },
            {
                id: 17,
                name: 'Violão Acústico Giannini',
                category: 'outros',
                condition: 'usado',
                price: 349.90,
                stock: 1,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
                description: 'Violão clássico, cordas de nylon, com case',
                brand: 'Giannini',
                size: 'Tamanho normal',
                color: 'Natural',
                weight: 2.3,
                createdAt: '2025-01-22',
                updatedAt: '2025-02-03',
                views: 67,
                sales: 0
            },
            {
                id: 18,
                name: 'Monitor Gamer 24" ASUS',
                category: 'eletronicos',
                condition: 'seminovo',
                price: 899.90,
                stock: 2,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop&crop=center',
                description: 'Monitor 144Hz, 1ms, Full HD, com suporte VESA',
                brand: 'ASUS',
                size: '24"',
                color: 'Preto/Vermelho',
                weight: 3.8,
                createdAt: '2025-01-30',
                updatedAt: '2025-02-08',
                views: 89,
                sales: 1
            },
            {
                id: 19,
                name: 'Kit Maquiagem Profissional',
                category: 'outros',
                condition: 'novo',
                price: 129.90,
                stock: 9,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
                description: 'Kit com 24 cores de sombra, pincéis e espelho',
                brand: 'Ruby Rose',
                size: '25x15x5cm',
                color: 'Rosa',
                weight: 0.6,
                createdAt: '2025-02-07',
                updatedAt: '2025-02-10',
                views: 45,
                sales: 7
            },
            {
                id: 20,
                name: 'Bicicleta Mountain Bike',
                category: 'esportes',
                condition: 'usado',
                price: 799.90,
                stock: 1,
                status: 'published',
                image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop&crop=center',
                description: 'Bicicleta aro 29, 21 marchas, suspensão dianteira',
                brand: 'Caloi',
                size: '19"',
                color: 'Vermelho',
                weight: 14.5,
                createdAt: '2025-01-18',
                updatedAt: '2025-02-02',
                views: 123,
                sales: 0
            }
        ];
    }

    applyFilters() {
        this.filters = {
            status: this.filterStatus.value,
            category: this.filterCategory.value,
            stock: this.filterStock.value,
            search: this.filterSearch.value.toLowerCase()
        };

        this.filteredProducts = this.products.filter(product => {
            // Filtro por status
            if (this.filters.status && product.status !== this.filters.status) {
                return false;
            }

            // Filtro por categoria
            if (this.filters.category && product.category !== this.filters.category) {
                return false;
            }

            // Filtro por estoque
            if (this.filters.stock) {
                const stock = product.stock;
                switch (this.filters.stock) {
                    case 'high':
                        if (stock < 10) return false;
                        break;
                    case 'medium':
                        if (stock < 3 || stock > 9) return false;
                        break;
                    case 'low':
                        if (stock < 1 || stock > 2) return false;
                        break;
                    case 'zero':
                        if (stock > 0) return false;
                        break;
                }
            }

            // Filtro por busca
            if (this.filters.search) {
                const searchTerm = this.filters.search;
                const searchableText = [
                    product.name,
                    product.description,
                    product.brand,
                    product.color,
                    this.getCategoryText(product.category)
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            return true;
        });

        this.currentPage = 1;
        this.sortProducts(this.currentSort.field);
        this.updatePagination();
        this.updateProductCount();
    }

    clearFilters() {
        this.filterStatus.value = '';
        this.filterCategory.value = '';
        this.filterStock.value = '';
        this.filterSearch.value = '';
        this.applyFilters();
        this.showNotification('Filtros limpos com sucesso', 'info');
    }

    sortProducts(field) {
        // Alternar direção se clicar no mesmo campo
        if (field === this.currentSort.field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }

        // Atualizar indicadores visuais
        document.querySelectorAll('.sortable').forEach(header => {
            header.classList.remove('sorted-asc', 'sorted-desc');
            if (header.dataset.sort === field) {
                header.classList.add(`sorted-${this.currentSort.direction}`);
            }
        });

        // Ordenar produtos
        this.filteredProducts.sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            // Tratamento especial para alguns campos
            switch (field) {
                case 'price':
                case 'stock':
                case 'views':
                case 'sales':
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                    break;
                case 'name':
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                    break;
                case 'category':
                    aValue = this.getCategoryText(aValue);
                    bValue = this.getCategoryText(bValue);
                    break;
                case 'status':
                    aValue = this.getStatusText(aValue);
                    bValue = this.getStatusText(bValue);
                    break;
            }

            if (aValue < bValue) {
                return this.currentSort.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return this.currentSort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        this.renderProducts();
    }

    renderProducts() {
        if (!this.productsTableBody) return;

        // Calcular índices para paginação
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        // Limpar tabela
        this.productsTableBody.innerHTML = '';

        if (productsToShow.length === 0) {
            this.productsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-products">
                        <div class="empty-icon">
                            <i class="bi bi-search"></i>
                        </div>
                        <h3 class="empty-title">Nenhum produto encontrado</h3>
                        <p class="empty-description">
                            ${this.hasActiveFilters() 
                                ? 'Nenhum produto corresponde aos filtros aplicados. Tente ajustar os critérios de busca.' 
                                : 'Você ainda não tem produtos cadastrados. Comece adicionando seu primeiro produto!'}
                        </p>
                        ${!this.hasActiveFilters() ? `
                            <button class="btn btn-primary mt-2" id="addFirstProduct">
                                <i class="bi bi-plus-circle"></i>
                                Adicionar Primeiro Produto
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;

            // Adicionar evento ao botão se existir
            const addFirstProductBtn = document.getElementById('addFirstProduct');
            if (addFirstProductBtn) {
                addFirstProductBtn.addEventListener('click', () => this.openProductModal());
            }

            return;
        }

        // Renderizar produtos
        productsToShow.forEach(product => {
            const row = this.createProductRow(product);
            this.productsTableBody.appendChild(row);
        });
    }

    hasActiveFilters() {
        return this.filters.status || this.filters.category || this.filters.stock || this.filters.search;
    }

    createProductRow(product) {
        const row = document.createElement('tr');
        
        // Determinar classe de estoque
        let stockClass = 'stock-high';
        let stockText = product.stock.toString();
        
        if (product.stock >= 10) {
            stockClass = 'stock-high';
            stockText = `${product.stock}+`;
        } else if (product.stock >= 3) {
            stockClass = 'stock-medium';
        } else if (product.stock >= 1) {
            stockClass = 'stock-low';
        } else {
            stockClass = 'stock-zero';
            stockText = '0';
        }
        
        // Determinar classe de status
        const statusClass = `status-${product.status}`;
        const statusText = this.getStatusText(product.status);
        const categoryText = this.getCategoryText(product.category);

        row.innerHTML = `
            <td class="product-cell-image">
                <div class="product-image-small">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik0zMCAyMEMyNy43OTEgMjAgMjYgMjEuNzkxIDI2IDI0QzI2IDI2LjIwOSAyNy43OTEgMjggMzAgMjhDMzIuMjA5IDI4IDM0IDI2LjIwOSAzNCAyNEMzNCAyMS43OTEgMzIuMjA5IDIwIDMwIDIwWk0zMCAzMEMyNi42ODYgMzAgMjQgMzIuNjg2IDI0IDM2VjQwSDM2VjM2QzM2IDMyLjY4NiAzMy4zMTQgMzAgMzAgMzBaIiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4K';">` : 
                        `<i class="bi bi-image"></i>`
                    }
                </div>
            </td>
            <td class="product-cell-info">
                <span class="product-name" title="${product.name}">${product.name}</span>
                <div class="product-category" data-category="${product.category}">
                    <i class="bi bi-tag"></i>
                    ${categoryText}
                </div>
            </td>
            <td class="product-cell-price">
                R$ ${product.price.toFixed(2).replace('.', ',')}
            </td>
            <td class="product-cell-stock">
                <span class="stock-indicator ${stockClass}">
                    ${stockText}
                </span>
            </td>
            <td>
                <span class="product-category-badge">
                    <i class="bi bi-tag"></i>
                    ${categoryText}
                </span>
            </td>
            <td>
                <span class="product-status-badge ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td class="product-cell-actions">
                <div class="action-buttons">
                    <button class="btn-table-action btn-edit" data-id="${product.id}" title="Editar">
                        <i class="bi bi-pencil"></i>
                        <div class="action-tooltip">Editar</div>
                    </button>
                    <button class="btn-table-action btn-view" data-id="${product.id}" title="Visualizar">
                        <i class="bi bi-eye"></i>
                        <div class="action-tooltip">Visualizar</div>
                    </button>
                    <button class="btn-table-action btn-stats" data-id="${product.id}" title="Estatísticas">
                        <i class="bi bi-bar-chart"></i>
                        <div class="action-tooltip">Estatísticas</div>
                    </button>
                    <button class="btn-table-action btn-delete" data-id="${product.id}" title="Excluir">
                        <i class="bi bi-trash"></i>
                        <div class="action-tooltip">Excluir</div>
                    </button>
                </div>
            </td>
        `;

        // Adicionar eventos aos botões
        const editBtn = row.querySelector('.btn-edit');
        const viewBtn = row.querySelector('.btn-view');
        const statsBtn = row.querySelector('.btn-stats');
        const deleteBtn = row.querySelector('.btn-delete');

        if (editBtn) {
            editBtn.addEventListener('click', () => this.editProduct(product.id));
        }

        if (viewBtn) {
            viewBtn.addEventListener('click', () => this.viewProduct(product.id));
        }

        if (statsBtn) {
            statsBtn.addEventListener('click', () => this.viewStats(product.id));
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.confirmDelete(product.id, product.name));
        }

        return row;
    }

    getStatusText(status) {
        const statusMap = {
            'published': 'Publicado',
            'draft': 'Rascunho',
            'sold': 'Vendido',
            'inactive': 'Inativo'
        };
        return statusMap[status] || status;
    }

    getCategoryText(category) {
        const categoryMap = {
            'moda': 'Moda',
            'eletronicos': 'Eletrônicos',
            'casa': 'Casa e Jardim',
            'esportes': 'Esportes',
            'livros': 'Livros',
            'outros': 'Outros'
        };
        return categoryMap[category] || category;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        
        // Atualizar informações
        if (this.totalItems) {
            this.totalItems.textContent = this.filteredProducts.length;
        }
        
        if (this.startItem && this.endItem) {
            const start = (this.currentPage - 1) * this.itemsPerPage + 1;
            const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
            this.startItem.textContent = start;
            this.endItem.textContent = end;
        }

        // Atualizar botões de paginação
        if (this.prevPageBtn) {
            this.prevPageBtn.disabled = this.currentPage === 1;
        }

        if (this.nextPageBtn) {
            this.nextPageBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        }

        // Atualizar números de página
        const paginationContainer = document.querySelector('.pagination-controls');
        if (paginationContainer) {
            // Remover botões de página antigos (exceto anterior/próximo)
            const oldPageBtns = paginationContainer.querySelectorAll('.pagination-btn:not(.pagination-prev):not(.pagination-next)');
            oldPageBtns.forEach(btn => btn.remove());

            // Não mostrar paginação se não houver produtos
            if (totalPages <= 1) return;

            // Calcular páginas para mostrar (máximo 5 páginas)
            let startPage = Math.max(1, this.currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            
            // Ajustar se estiver no início
            if (endPage - startPage < 4 && startPage > 1) {
                startPage = Math.max(1, endPage - 4);
            }

            // Criar botões de página
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-btn ${i === this.currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => this.goToPage(i));
                
                // Inserir antes do botão "next"
                paginationContainer.insertBefore(pageBtn, this.nextPageBtn);
            }
        }
    }

    updateProductCount() {
        const countElement = document.querySelector('.products-count .count-badge');
        if (countElement) {
            const activeProducts = this.products.filter(p => p.status === 'published').length;
            const totalProducts = this.products.length;
            countElement.textContent = `${activeProducts} ativos • ${totalProducts} total`;
        }
    }

    goToPage(page) {
        if (page < 1 || page > Math.ceil(this.filteredProducts.length / this.itemsPerPage)) {
            return;
        }
        
        this.currentPage = page;
        this.renderProducts();
        this.updatePagination();
        
        // Scroll suave para o topo da tabela
        const tableContainer = document.querySelector('.products-table-container');
        if (tableContainer) {
            tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    openProductModal(productId = null) {
        this.editingProductId = productId;
        
        // Limpar formulário se for um novo produto
        if (!productId) {
            this.resetForm();
            document.getElementById('modalProductTitle').innerHTML = `
                <i class="bi bi-plus-circle"></i>
                Adicionar Novo Produto
            `;
        } else {
            // Carregar dados do produto
            const product = this.products.find(p => p.id === productId);
            if (product) {
                this.loadProductIntoForm(product);
                document.getElementById('modalProductTitle').innerHTML = `
                    <i class="bi bi-pencil"></i>
                    Editar Produto
                `;
            }
        }

        // Mostrar modal
        this.productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focar no primeiro campo
        setTimeout(() => {
            this.productName.focus();
        }, 100);
    }

    closeProductModal() {
        this.productModal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    resetForm() {
        if (this.productForm) {
            this.productForm.reset();
        }
        
        // Limpar preview de imagens
        if (this.imagePreview) {
            this.imagePreview.innerHTML = '';
        }
        
        // Resetar status para "published"
        if (this.statusBadges.length > 0) {
            this.selectStatusBadge(this.statusBadges[0]);
        }
        
        // Limpar erros
        Object.values(this.errorElements).forEach(el => {
            if (el) {
                el.textContent = '';
                el.style.display = 'none';
            }
        });
        
        // Resetar contador de caracteres
        if (this.charCount) {
            this.charCount.textContent = '0';
            this.charCount.style.color = '';
        }
        
        // Limpar campos opcionais
        if (this.productBrand) this.productBrand.value = '';
        if (this.productSize) this.productSize.value = '';
        if (this.productColor) this.productColor.value = '';
        if (this.productWeight) this.productWeight.value = '';
        
        this.editingProductId = null;
        this.uploadedImages = [];
        
        // Limpar input de arquivo
        if (this.productImages) {
            this.productImages.value = '';
        }
    }

    loadProductIntoForm(product) {
        // Preencher campos do formulário
        this.productName.value = product.name || '';
        this.productCategory.value = product.category || '';
        this.productCondition.value = product.condition || '';
        this.productPrice.value = product.price || '';
        this.productStock.value = product.stock || '';
        this.productDescription.value = product.description || '';
        this.productStatus.value = product.status || 'published';
        
        // Selecionar badge de status correto
        const targetBadge = Array.from(this.statusBadges).find(badge => 
            badge.dataset.status === product.status
        );
        if (targetBadge) {
            this.selectStatusBadge(targetBadge);
        }
        
        // Preencher campos opcionais
        if (this.productBrand) this.productBrand.value = product.brand || '';
        if (this.productSize) this.productSize.value = product.size || '';
        if (this.productColor) this.productColor.value = product.color || '';
        if (this.productWeight) this.productWeight.value = product.weight || '';
        
        // Atualizar contador de caracteres
        this.updateCharCount();
        
        // Carregar imagem se existir
        if (product.image) {
            this.imagePreview.innerHTML = `
                <div class="image-preview-item">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0C'">
                    <button type="button" class="remove-image">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            `;
            
            // Adicionar evento de remoção
            const removeBtn = this.imagePreview.querySelector('.remove-image');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    this.imagePreview.innerHTML = '';
                });
            }
        }
    }

    selectStatusBadge(badge) {
        // Remover seleção de todos
        this.statusBadges.forEach(b => b.classList.remove('selected'));
        
        // Selecionar o clicado
        badge.classList.add('selected');
        
        // Atualizar campo oculto
        const status = badge.dataset.status;
        this.productStatus.value = status;
    }

    handleImageUpload(files) {
        if (!files || files.length === 0) return;

        // Limitar a 5 imagens
        const remainingSlots = 5 - this.imagePreview.children.length;
        if (remainingSlots <= 0) {
            this.showNotification('Máximo de 5 imagens atingido', 'warning');
            return;
        }

        const filesToUpload = Array.from(files).slice(0, remainingSlots);
        let validFiles = 0;

        filesToUpload.forEach(file => {
            // Validar tipo de arquivo
            if (!file.type.startsWith('image/')) {
                this.showNotification(`Arquivo "${file.name}" não é uma imagem válida`, 'error');
                return;
            }

            // Validar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification(`Imagem "${file.name}" muito grande (máximo 5MB)`, 'error');
                return;
            }

            validFiles++;

            // Criar preview
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-image" data-filename="${file.name}">
                        <i class="bi bi-x"></i>
                    </button>
                `;
                
                // Adicionar evento de remoção
                const removeBtn = previewItem.querySelector('.remove-image');
                removeBtn.addEventListener('click', () => {
                    previewItem.remove();
                    this.uploadedImages = this.uploadedImages.filter(img => img.name !== file.name);
                });
                
                this.imagePreview.appendChild(previewItem);
                this.uploadedImages.push({
                    name: file.name,
                    data: e.target.result
                });
            };
            reader.readAsDataURL(file);
        });

        // Limpar input de arquivo
        this.productImages.value = '';
        
        // Limpar erro de imagens
        if (this.errorElements.images) {
            this.errorElements.images.style.display = 'none';
        }
        
        // Feedback
        if (validFiles > 0) {
            this.showNotification(`${validFiles} imagem(ns) carregada(s) com sucesso`, 'success');
        }
    }

    updateCharCount() {
        if (this.productDescription && this.charCount) {
            const length = this.productDescription.value.length;
            this.charCount.textContent = length;
            
            // Adicionar classe de aviso se estiver perto do limite
            if (length > 1900) {
                this.charCount.style.color = 'var(--status-warning)';
            } else if (length > 1950) {
                this.charCount.style.color = 'var(--status-error)';
            } else {
                this.charCount.style.color = '';
            }
        }
    }

    validateField(field) {
        let isValid = true;
        let errorMessage = '';

        switch (field.id) {
            case 'productName':
                if (!field.value.trim()) {
                    errorMessage = 'O nome do produto é obrigatório';
                    isValid = false;
                } else if (field.value.length > 100) {
                    errorMessage = 'O nome deve ter no máximo 100 caracteres';
                    isValid = false;
                }
                break;

            case 'productCategory':
                if (!field.value) {
                    errorMessage = 'Selecione uma categoria';
                    isValid = false;
                }
                break;

            case 'productCondition':
                if (!field.value) {
                    errorMessage = 'Selecione a condição do produto';
                    isValid = false;
                }
                break;

            case 'productPrice':
                if (!field.value) {
                    errorMessage = 'O preço é obrigatório';
                    isValid = false;
                } else {
                    const price = parseFloat(field.value);
                    if (isNaN(price) || price <= 0) {
                        errorMessage = 'O preço deve ser maior que zero';
                        isValid = false;
                    } else if (price > 1000000) {
                        errorMessage = 'O preço não pode exceder R$ 1.000.000,00';
                        isValid = false;
                    }
                }
                break;

            case 'productStock':
                if (field.value === '' || field.value === null) {
                    errorMessage = 'A quantidade em estoque é obrigatória';
                    isValid = false;
                } else {
                    const stock = parseInt(field.value);
                    if (isNaN(stock) || stock < 0) {
                        errorMessage = 'O estoque não pode ser negativo';
                        isValid = false;
                    } else if (stock > 9999) {
                        errorMessage = 'O estoque máximo é 9999 unidades';
                        isValid = false;
                    }
                }
                break;

            case 'productDescription':
                if (!field.value.trim()) {
                    errorMessage = 'A descrição é obrigatória';
                    isValid = false;
                } else if (field.value.length > 2000) {
                    errorMessage = 'A descrição deve ter no máximo 2000 caracteres';
                    isValid = false;
                }
                break;
        }

        // Atualizar mensagem de erro
        const fieldName = field.id.replace('product', '').toLowerCase();
        const errorElement = this.errorElements[fieldName];
        if (errorElement) {
            if (errorMessage) {
                errorElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${errorMessage}`;
                errorElement.style.display = 'flex';
                field.classList.add('has-error');
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                field.classList.remove('has-error');
            }
        }

        return isValid;
    }

    validateForm() {
        let isValid = true;

        // Validar campos obrigatórios
        const requiredFields = [
            this.productName,
            this.productCategory,
            this.productCondition,
            this.productPrice,
            this.productStock,
            this.productDescription
        ];

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Validar imagens (pelo menos uma)
        if (this.imagePreview.children.length === 0) {
            this.errorElements.images.innerHTML = `<i class="bi bi-exclamation-circle"></i> Adicione pelo menos uma imagem do produto`;
            this.errorElements.images.style.display = 'flex';
            isValid = false;
        } else {
            this.errorElements.images.style.display = 'none';
        }

        return isValid;
    }

    async saveProduct(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            
            // Scroll para o primeiro erro
            const firstError = document.querySelector('.form-error[style*="display: flex"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return;
        }

        try {
            // Mostrar loading
            this.saveProductBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Salvando...';
            this.saveProductBtn.disabled = true;

            // Coletar dados do formulário
            const productData = {
                name: this.productName.value.trim(),
                category: this.productCategory.value,
                condition: this.productCondition.value,
                price: parseFloat(this.productPrice.value),
                stock: parseInt(this.productStock.value),
                description: this.productDescription.value.trim(),
                status: this.productStatus.value,
                brand: this.productBrand.value.trim(),
                size: this.productSize.value.trim(),
                color: this.productColor.value.trim(),
                weight: this.productWeight.value ? parseFloat(this.productWeight.value) : null,
                updatedAt: new Date().toISOString().split('T')[0],
                views: 0,
                sales: 0
            };

            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (this.editingProductId) {
                // Atualizar produto existente
                const index = this.products.findIndex(p => p.id === this.editingProductId);
                if (index !== -1) {
                    // Preservar dados existentes
                    this.products[index] = { 
                        ...this.products[index], 
                        ...productData 
                    };
                    this.showNotification('Produto atualizado com sucesso!', 'success');
                }
            } else {
                // Criar novo produto
                const newProduct = {
                    id: Math.max(...this.products.map(p => p.id)) + 1,
                    ...productData,
                    image: this.uploadedImages.length > 0 ? this.uploadedImages[0].data : null,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                this.products.unshift(newProduct);
                this.showNotification('Produto adicionado com sucesso!', 'success');
            }

            // Fechar modal
            this.closeProductModal();

            // Atualizar lista
            this.applyFilters();
            this.renderProducts();
            this.updatePagination();
            this.updateProductCount();

        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            this.showNotification('Erro ao salvar produto. Tente novamente.', 'error');
        } finally {
            // Restaurar botão
            if (this.saveProductBtn) {
                this.saveProductBtn.innerHTML = '<i class="bi bi-check-circle"></i> Salvar Produto';
                this.saveProductBtn.disabled = false;
            }
        }
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    viewProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showNotification(`Visualizando: ${product.name}`, 'info');
            // Em uma implementação real, isso abriria uma modal ou redirecionaria
        }
    }

    viewStats(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showNotification(`Estatísticas de: ${product.name} - ${product.views} visualizações, ${product.sales} vendas`, 'info');
        }
    }

    confirmDelete(productId, productName) {
        this.productToDeleteId = productId;
        document.getElementById('productToDeleteName').textContent = productName;
        this.deleteConfirmModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDeleteModal() {
        this.deleteConfirmModal.classList.remove('active');
        document.body.style.overflow = '';
        this.productToDeleteId = null;
    }

    async deleteProduct() {
        try {
            // Mostrar loading
            this.confirmDeleteBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Excluindo...';
            this.confirmDeleteBtn.disabled = true;

            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 800));

            // Remover produto da lista
            const index = this.products.findIndex(p => p.id === this.productToDeleteId);
            if (index !== -1) {
                const productName = this.products[index].name;
                this.products.splice(index, 1);
                this.showNotification(`Produto "${productName}" excluído com sucesso!`, 'success');
            }

            // Fechar modal
            this.closeDeleteModal();

            // Atualizar lista
            this.applyFilters();
            this.renderProducts();
            this.updatePagination();
            this.updateProductCount();

        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            this.showNotification('Erro ao excluir produto. Tente novamente.', 'error');
        } finally {
            // Restaurar botão
            if (this.confirmDeleteBtn) {
                this.confirmDeleteBtn.innerHTML = '<i class="bi bi-trash"></i> Excluir';
                this.confirmDeleteBtn.disabled = false;
            }
        }
    }

    showLoading(show) {
        const loadingElement = document.getElementById('productsLoading');
        if (!loadingElement && show) {
            const loading = document.createElement('div');
            loading.id = 'productsLoading';
            loading.innerHTML = `
                <div class="vp-loading-overlay">
                    <div class="vp-loading-spinner">
                        <i class="bi bi-arrow-repeat"></i>
                        <span>Carregando produtos...</span>
                    </div>
                </div>
            `;
            
            // Estilos
            Object.assign(loading.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '9999',
                backdropFilter: 'blur(2px)'
            });
            
            document.body.appendChild(loading);
        } else if (loadingElement) {
            loadingElement.remove();
        }
    }

    showNotification(message, type = 'info') {
        // Reutilizar a função do vendedor-inicio.js se disponível
        if (window.vendedorInicio && typeof window.vendedorInicio.showNotification === 'function') {
            window.vendedorInicio.showNotification(message, type);
            return;
        }

        // Implementação alternativa (namespace: vp-notification)
        const notification = document.createElement('div');
        notification.className = `notification vp-notification ${type}`;
        notification.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 
                         type === 'error' ? 'bi-x-circle' : 
                         type === 'warning' ? 'bi-exclamation-circle' : 'bi-info-circle'}"></i>
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
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'vp-slideInRight 0.3s ease'
        });

        // Remover apenas notificações deste módulo
        document.querySelectorAll('.vp-notification').forEach(n => n.remove());

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'vp-slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    notification.parentNode.removeChild(notification);
                }, 300);
            }
        }, 3000);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.meusProdutos = new MeusProdutos();
    
    // Adicionar estilos CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes vp-slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes vp-slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .vp-loading-overlay {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
        
        .vp-loading-spinner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            font-size: 1.1rem;
            color: var(--seller-blue);
        }
        
        .vp-loading-spinner i {
            font-size: 2.5rem;
            animation: vp-spin 1s linear infinite;
        }
        
        @keyframes vp-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .mt-2 {
            margin-top: 0.5rem;
        }
        
        /* Estilos para imagens quebradas */
        .product-image-small img:before {
            content: "Imagem não disponível";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--light-gray-2);
            color: var(--text-light);
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0.5rem;
        }
    `;
    document.head.appendChild(style);
});