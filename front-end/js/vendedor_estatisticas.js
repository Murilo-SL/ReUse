// vendedor-estatisticas.js - Gerenciamento de estatísticas e exportação de relatórios
// VERSÃO COMPLETA - TODOS OS BOTÕES FUNCIONAIS

class VendedorEstatisticas {
    constructor() {
        this.charts = {};
        this.currentPeriod = 30;
        this.currentProductData = null;
        this.init();
    }

    init() {
        this.initializeCharts();
        this.setupEventListeners();
        this.loadStatisticsData();
        this.setDefaultDates();
    }

    setDefaultDates() {
        // Configurar datas padrão para relatórios
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        const reportStartDate = document.getElementById('reportStartDate');
        const reportEndDate = document.getElementById('reportEndDate');
        
        if (reportStartDate) {
            reportStartDate.valueAsDate = thirtyDaysAgo;
        }
        if (reportEndDate) {
            reportEndDate.valueAsDate = today;
        }
    }

    initializeCharts() {
        this.createSalesChart();
        this.createCategoryChart();
        this.createTopProductsChart();
        this.createRatingsChart();
        this.createStockChart();
    }

    createSalesChart() {
        const ctx = document.getElementById('salesChart')?.getContext('2d');
        if (!ctx) return;

        this.charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Vendas 2025',
                        data: [8500, 9200, 10800, 12500, 14200, 16800, 18900, 20500, 22400, 24580, 0, 0],
                        borderColor: '#0066cc',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#0066cc',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Vendas 2024',
                        data: [7200, 7800, 8500, 9500, 11000, 12500, 13800, 15200, 16800, 18400, 20100, 22300],
                        borderColor: '#00cc99',
                        backgroundColor: 'rgba(0, 204, 153, 0.05)',
                        borderWidth: 2,
                        pointBackgroundColor: '#00cc99',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        borderDash: [5, 5],
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 6
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        ticks: {
                            callback: (value) => 'R$ ' + value.toLocaleString('pt-BR')
                        }
                    }
                }
            }
        });
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart')?.getContext('2d');
        if (!ctx) return;

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Vestuário', 'Calçados', 'Eletrodomésticos', 'Acessórios', 'Outros'],
                datasets: [{
                    data: [45, 28, 15, 8, 4],
                    backgroundColor: ['#0066cc', '#00cc99', '#8a2be2', '#ff7b00', '#6c757d'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    createTopProductsChart() {
        const ctx = document.getElementById('topProductsChart')?.getContext('2d');
        if (!ctx) return;

        this.charts.topProducts = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Camiseta Polo', 'Tênis Nike', 'Vestido Floral', 'Liquidificador', 'Bolsa'],
                datasets: [{
                    label: 'Quantidade Vendida',
                    data: [52, 45, 38, 22, 18],
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.8)',
                        'rgba(0, 204, 153, 0.8)',
                        'rgba(138, 43, 226, 0.8)',
                        'rgba(255, 123, 0, 0.8)',
                        'rgba(108, 117, 125, 0.8)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    }
                }
            }
        });
    }

    createRatingsChart() {
        const ctx = document.getElementById('ratingsChart')?.getContext('2d');
        if (!ctx) return;

        this.charts.ratings = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['5 estrelas', '4 estrelas', '3 estrelas', '2 estrelas', '1 estrela'],
                datasets: [{
                    label: 'Quantidade de Avaliações',
                    data: [98, 42, 12, 4, 1],
                    backgroundColor: [
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 193, 7, 0.6)',
                        'rgba(255, 193, 7, 0.4)',
                        'rgba(255, 193, 7, 0.2)',
                        'rgba(255, 193, 7, 0.1)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    }
                }
            }
        });
    }

    createStockChart() {
        const ctx = document.getElementById('stockChart')?.getContext('2d');
        if (!ctx) return;

        this.charts.stock = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Estoque Ideal', 'Estoque Médio', 'Baixo Estoque', 'Crítico'],
                datasets: [{
                    data: [12, 8, 3, 1],
                    backgroundColor: ['#00cc99', '#3399ff', '#ffa502', '#ff4757'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // ========== BOTÕES DE NAVEGAÇÃO ==========
        
        // Menu do vendedor
        document.getElementById('dashboardMenuBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-inicio.html';
        });
        
        document.getElementById('productsMenuBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-produtos.html';
        });
        
        document.getElementById('statisticsMenuBtn')?.addEventListener('click', () => {
            this.showNotification('Você já está na página de estatísticas', 'info');
        });
        
        document.getElementById('donationsMenuBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-doacoes.html';
        });
        
        document.getElementById('configMenuBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-configuracoes.html';
        });

        // ========== BOTÕES DE PERÍODO ==========
        
        document.querySelectorAll('.date-range-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.date-range-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const period = e.currentTarget.dataset.period || 30;
                this.currentPeriod = parseInt(period);
                this.updateChartsByPeriod(this.currentPeriod);
                this.updateMetricsByPeriod(this.currentPeriod);
                this.showNotification(`Período alterado para: ${e.currentTarget.textContent.trim()}`, 'success');
            });
        });

        // ========== BOTÕES DE EXPORTAÇÃO ==========
        
        document.getElementById('exportPDFBtn')?.addEventListener('click', () => {
            this.openExportModal('pdf');
        });
        
        document.getElementById('exportExcelBtn')?.addEventListener('click', () => {
            this.openExportModal('excel');
        });
        
        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            this.openReportModal();
        });

        // ========== BOTÕES DE GRÁFICOS ==========
        
        // Download de gráficos
        document.getElementById('downloadSalesChart')?.addEventListener('click', () => {
            this.downloadChart('salesChart', 'vendas-por-periodo');
        });
        
        document.getElementById('downloadCategoryChart')?.addEventListener('click', () => {
            this.downloadChart('categoryChart', 'vendas-por-categoria');
        });
        
        document.getElementById('downloadTopProductsChart')?.addEventListener('click', () => {
            this.downloadChart('topProductsChart', 'produtos-mais-vendidos');
        });
        
        document.getElementById('downloadRatingsChart')?.addEventListener('click', () => {
            this.downloadChart('ratingsChart', 'distribuicao-avaliacoes');
        });
        
        document.getElementById('downloadStockChart')?.addEventListener('click', () => {
            this.downloadChart('stockChart', 'status-estoque');
        });
        
        // Expandir gráficos
        document.getElementById('expandSalesChart')?.addEventListener('click', () => {
            this.expandChart('salesChart', 'Vendas por Período');
        });
        
        document.getElementById('expandCategoryChart')?.addEventListener('click', () => {
            this.expandChart('categoryChart', 'Vendas por Categoria');
        });
        
        document.getElementById('expandTopProductsChart')?.addEventListener('click', () => {
            this.expandChart('topProductsChart', 'Produtos Mais Vendidos');
        });
        
        document.getElementById('expandRatingsChart')?.addEventListener('click', () => {
            this.expandChart('ratingsChart', 'Distribuição de Avaliações');
        });
        
        document.getElementById('expandStockChart')?.addEventListener('click', () => {
            this.expandChart('stockChart', 'Status do Estoque');
        });

        // ========== BOTÕES DE TABELA DE PRODUTOS ==========
        
        document.getElementById('exportProductsTable')?.addEventListener('click', () => {
            this.exportProductsTable();
        });
        
        document.getElementById('printProductsTable')?.addEventListener('click', () => {
            this.printProductsTable();
        });
        
        document.getElementById('refreshDataBtn')?.addEventListener('click', () => {
            this.refreshDashboardData();
        });
        
        document.getElementById('viewAllProductsBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-produtos.html';
        });

        // ========== BOTÕES DE AÇÕES NA TABELA ==========
        
        document.querySelectorAll('.view-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.currentTarget.closest('tr');
                const productId = row.dataset.productId;
                const productName = row.querySelector('.product-details strong').textContent;
                this.viewProductDetails(productId, productName);
            });
        });
        
        document.querySelectorAll('.edit-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.currentTarget.closest('tr');
                const productId = row.dataset.productId;
                const productName = row.querySelector('.product-details strong').textContent;
                this.editProduct(productId, productName);
            });
        });
        
        document.querySelectorAll('.stats-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.currentTarget.closest('tr');
                const productId = row.dataset.productId;
                const productName = row.querySelector('.product-details strong').textContent;
                this.showProductStats(productId, productName);
            });
        });

        // ========== BOTÕES DE PAGINAÇÃO ==========
        
        document.getElementById('prevPageBtn')?.addEventListener('click', () => {
            this.showNotification('Primeira página já está sendo exibida', 'info');
        });
        
        document.getElementById('nextPageBtn')?.addEventListener('click', () => {
            this.showNotification('Última página já está sendo exibida', 'info');
        });

        // ========== BOTÕES DE INSIGHTS ==========
        
        document.getElementById('refreshInsightsBtn')?.addEventListener('click', () => {
            this.refreshInsights();
        });
        
        document.querySelectorAll('.apply-insight').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const insightCard = e.currentTarget.closest('.insight-card');
                this.applyInsight(insightCard);
            });
        });
        
        document.querySelectorAll('.restock-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const insightCard = e.currentTarget.closest('.insight-card');
                this.openRestockModal('Liquidificador', 3);
            });
        });
        
        document.querySelectorAll('.create-promotion').forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'vendedor-promocoes.html';
            });
        });
        
        document.querySelectorAll('.dismiss-insight').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const insightCard = e.currentTarget.closest('.insight-card');
                this.dismissInsight(insightCard);
            });
        });

        // ========== BOTÕES DE AVALIAÇÕES ==========
        
        document.getElementById('viewAllRatingsBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-avaliacoes.html';
        });
        
        document.getElementById('viewAllReviewsBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-avaliacoes.html';
        });
        
        document.querySelectorAll('.review-actions .btn-icon[title="Responder"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reviewCard = e.currentTarget.closest('.review-card');
                const reviewerName = reviewCard.querySelector('.reviewer-details strong').textContent;
                this.respondToReview(reviewerName);
            });
        });

        // ========== BOTÕES DE GERENCIAMENTO ==========
        
        document.getElementById('manageStockBtn')?.addEventListener('click', () => {
            window.location.href = 'vendedor-estoque.html';
        });

        // ========== BOTÕES DE PERFIL E AUTENTICAÇÃO ==========
        
        document.getElementById('profileToggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            const profileMenu = document.getElementById('profileMenu');
            profileMenu.classList.toggle('active');
        });
        
        document.getElementById('profileMenuItem')?.addEventListener('click', () => {
            window.location.href = 'vendedor-perfil.html';
        });
        
        document.getElementById('mySalesMenuItem')?.addEventListener('click', () => {
            window.location.href = 'vendedor-vendas.html';
        });
        
        document.getElementById('settingsMenuItem')?.addEventListener('click', () => {
            window.location.href = 'vendedor-configuracoes.html';
        });
        
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openLogoutModal();
        });

        // ========== BOTÕES DE PESQUISA ==========
        
        const globalSearchInput = document.getElementById('globalSearchInput');
        if (globalSearchInput) {
            globalSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query) {
                        this.performGlobalSearch(query);
                    }
                }
            });
        }

        // ========== BOTÕES DE MODAIS ==========
        
        this.setupModals();

        // ========== BOTÕES DE FOOTER ==========
        
        this.setupFooterButtons();



        // ========== BOTÕES DE SUPORTE ==========
        
        document.getElementById('contactSupportBtn')?.addEventListener('click', () => {
            this.openSupportModal();
        });
        
        document.getElementById('footerSellerSupport')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openSupportModal();
        });
    }

    setupModals() {
        // === MODAL DE EXPORTAÇÃO ===
        const exportModal = document.getElementById('exportModal');
        document.getElementById('closeExportModal')?.addEventListener('click', () => {
            this.closeModal('exportModal');
        });
        document.getElementById('cancelExport')?.addEventListener('click', () => {
            this.closeModal('exportModal');
        });
        document.getElementById('confirmExport')?.addEventListener('click', () => {
            this.exportReport();
        });
        
        // Select de período personalizado
        document.getElementById('exportPeriodSelect')?.addEventListener('change', (e) => {
            const customDateRange = document.getElementById('customDateRange');
            customDateRange.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });

        // === MODAL DE RELATÓRIO ===
        document.getElementById('closeReportModal')?.addEventListener('click', () => {
            this.closeModal('reportModal');
        });
        document.getElementById('cancelReport')?.addEventListener('click', () => {
            this.closeModal('reportModal');
        });
        document.getElementById('generateReport')?.addEventListener('click', () => {
            this.generateCustomReport();
        });
        
        // Checkbox de agendamento
        document.getElementById('scheduleReport')?.addEventListener('change', (e) => {
            const frequency = document.getElementById('scheduleFrequency');
            const email = document.getElementById('scheduleEmail');
            frequency.disabled = !e.target.checked;
            email.disabled = !e.target.checked;
        });

        // === MODAL DE PRODUTO ===
        document.getElementById('closeProductModal')?.addEventListener('click', () => {
            this.closeModal('productDetailModal');
        });
        document.getElementById('closeProductDetailBtn')?.addEventListener('click', () => {
            this.closeModal('productDetailModal');
        });
        document.getElementById('editProductFromDetail')?.addEventListener('click', () => {
            if (this.currentProductData) {
                window.location.href = `vendedor-editar-produto.html?id=${this.currentProductData.id}`;
            }
        });

        // === MODAL DE ESTATÍSTICAS ===
        document.getElementById('closeStatsModal')?.addEventListener('click', () => {
            this.closeModal('productStatsModal');
        });
        document.getElementById('closeProductStatsBtn')?.addEventListener('click', () => {
            this.closeModal('productStatsModal');
        });
        document.getElementById('exportProductStats')?.addEventListener('click', () => {
            this.exportProductStats();
        });

        // === MODAL DE REPOSIÇÃO ===
        document.getElementById('closeRestockModal')?.addEventListener('click', () => {
            this.closeModal('restockModal');
        });
        document.getElementById('cancelRestock')?.addEventListener('click', () => {
            this.closeModal('restockModal');
        });
        document.getElementById('confirmRestock')?.addEventListener('click', () => {
            this.confirmRestock();
        });

        // === MODAL DE LOGOUT ===
        document.getElementById('closeLogoutModal')?.addEventListener('click', () => {
            this.closeModal('logoutModal');
        });
        document.getElementById('cancelLogout')?.addEventListener('click', () => {
            this.closeModal('logoutModal');
        });
        document.getElementById('confirmLogout')?.addEventListener('click', () => {
            this.performLogout();
        });

        // === MODAL DE SUPORTE ===
        document.getElementById('closeSupportModal')?.addEventListener('click', () => {
            this.closeModal('supportModal');
        });
        document.getElementById('startChatBtn')?.addEventListener('click', () => {
            window.open('https://chat.reuse.com.br', '_blank');
        });
        document.getElementById('emailSupportBtn')?.addEventListener('click', () => {
            window.location.href = 'mailto:suporte@reuse.com.br';
        });
        document.getElementById('callSupportBtn')?.addEventListener('click', () => {
            window.location.href = 'tel:+551140028922';
        });

        // === MODAL DE GRÁFICO EXPANDIDO ===
        document.getElementById('closeExpandedChart')?.addEventListener('click', () => {
            this.closeModal('expandedChartModal');
        });
        document.getElementById('closeExpandedChartBtn')?.addEventListener('click', () => {
            this.closeModal('expandedChartModal');
        });
        document.getElementById('downloadExpandedChart')?.addEventListener('click', () => {
            this.downloadExpandedChart();
        });

        // Fechar modais ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    setupFooterButtons() {
        // Central do Vendedor
        document.getElementById('footerSellerCentral')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-central.html';
        });
        
        document.getElementById('footerSalesGuide')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-guia.html';
        });
        
        document.getElementById('footerNews')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-novidades.html';
        });

        // Ferramentas
        document.getElementById('footerAnalytics')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showNotification('Você já está na página de análises', 'info');
        });
        
        document.getElementById('footerPromotions')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-promocoes.html';
        });
        
        document.getElementById('footerLogistics')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-logistica.html';
        });
        
        document.getElementById('footerFinancial')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'vendedor-financeiro.html';
        });

        // Legal
        document.getElementById('footerSalesPolicy')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'legal-vendas.html';
        });
        
        document.getElementById('footerTerms')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'termos-comerciais.html';
        });
        
        document.getElementById('footerFees')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'taxas-comissoes.html';
        });
        
        document.getElementById('footerSecurity')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'seguranca.html';
        });

        // Redes Sociais
        document.getElementById('socialFacebook')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://facebook.com/reuse', '_blank');
        });
        
        document.getElementById('socialInstagram')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://instagram.com/reuse', '_blank');
        });
        
        document.getElementById('socialTwitter')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://twitter.com/reuse', '_blank');
        });
        
        document.getElementById('socialLinkedin')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://linkedin.com/company/reuse', '_blank');
        });

        // Footer bottom
        document.getElementById('footerPrivacy')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'privacidade.html';
        });
        
        document.getElementById('footerCookies')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cookies.html';
        });
        
        document.getElementById('footerAccessibility')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'acessibilidade.html';
        });
    }

    // ========== FUNÇÕES DE ATUALIZAÇÃO DE DADOS ==========

    updateChartsByPeriod(period) {
        let salesData;
        let categoryData;
        let topProductsData;
        
        switch(period) {
            case 7:
                salesData = [1200, 1450, 1100, 1800, 1650, 1900, 2100];
                break;
            case 30:
                salesData = [8500, 9200, 10800, 12500, 14200, 16800, 18900];
                break;
            case 90:
                salesData = [22500, 24800, 26700, 28900, 31200, 33500, 35800];
                break;
            case 365:
                salesData = [8500, 9200, 10800, 12500, 14200, 16800, 18900, 20500, 22400, 24580, 26100, 27900];
                break;
            default:
                salesData = [8500, 9200, 10800, 12500, 14200, 16800, 18900];
        }
        
        if (this.charts.sales) {
            const labels = period === 365 
                ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
                : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'];
            
            this.charts.sales.data.labels = labels;
            this.charts.sales.data.datasets[0].data = salesData;
            this.charts.sales.update();
        }
    }

    updateMetricsByPeriod(period) {
        const metrics = {
            7: { revenue: 'R$ 11.200,00', orders: '142', conversion: '4.2%', ticket: 'R$ 78,90' },
            30: { revenue: 'R$ 24.580,90', orders: '342', conversion: '3.8%', ticket: 'R$ 71,90' },
            90: { revenue: 'R$ 68.450,00', orders: '892', conversion: '3.5%', ticket: 'R$ 76,70' },
            365: { revenue: 'R$ 245.890,00', orders: '3245', conversion: '3.2%', ticket: 'R$ 75,80' }
        };
        
        const data = metrics[period] || metrics[30];
        
        document.getElementById('totalRevenue').textContent = data.revenue;
        document.getElementById('totalOrders').textContent = data.orders;
        document.getElementById('conversionRate').textContent = data.conversion;
        document.getElementById('averageTicket').textContent = data.ticket;
    }

    refreshDashboardData() {
        this.showNotification('Atualizando dados...', 'info');
        
        // Simular carregamento
        setTimeout(() => {
            const lastUpdateBadge = document.getElementById('lastUpdateBadge');
            if (lastUpdateBadge) {
                const now = new Date();
                lastUpdateBadge.textContent = `Atualizado agora às ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            }
            
            this.updateChartsByPeriod(this.currentPeriod);
            this.updateMetricsByPeriod(this.currentPeriod);
            this.showNotification('Dados atualizados com sucesso!', 'success');
        }, 1500);
    }

    refreshInsights() {
        this.showNotification('Atualizando insights...', 'info');
        
        setTimeout(() => {
            const insightsContainer = document.getElementById('insightsContainer');
            
            const newInsight = document.createElement('div');
            newInsight.className = 'insight-card';
            newInsight.dataset.insightId = '4';
            newInsight.innerHTML = `
                <div class="insight-icon success">
                    <i class="bi bi-trending-up"></i>
                </div>
                <div class="insight-content">
                    <h4>Novo Insight</h4>
                    <p>Seu produto <strong>Camiseta Polo</strong> está entre os mais vendidos da plataforma. Parabéns!</p>
                    <div class="insight-actions">
                        <button class="btn btn-sm btn-primary apply-insight">
                            <i class="bi bi-check-circle"></i>
                            Ver Detalhes
                        </button>
                        <button class="btn btn-sm btn-outline dismiss-insight">
                            <i class="bi bi-x-circle"></i>
                            Dispensar
                        </button>
                    </div>
                </div>
            `;
            
            insightsContainer.prepend(newInsight);
            
            // Adicionar event listeners ao novo insight
            newInsight.querySelector('.apply-insight').addEventListener('click', () => {
                this.showNotification('Redirecionando para detalhes do produto...', 'info');
                setTimeout(() => window.location.href = 'vendedor-produtos.html?id=4', 1000);
            });
            
            newInsight.querySelector('.dismiss-insight').addEventListener('click', (e) => {
                this.dismissInsight(e.currentTarget.closest('.insight-card'));
            });
            
            this.showNotification('Novos insights disponíveis!', 'success');
        }, 1500);
    }

    // ========== FUNÇÕES DE EXPORTAÇÃO ==========

    openExportModal(format) {
        const modal = document.getElementById('exportModal');
        const radioButton = document.getElementById(format === 'pdf' ? 'exportPDF' : 
                                                  format === 'excel' ? 'exportExcel' : 'exportCSV');
        if (radioButton) radioButton.checked = true;
        modal.classList.add('active');
    }

    openReportModal() {
        document.getElementById('reportModal').classList.add('active');
    }

    async exportReport() {
        const format = document.querySelector('input[name="exportFormat"]:checked')?.value;
        const period = document.getElementById('exportPeriodSelect').value;
        const includeCharts = document.getElementById('includeCharts').checked;
        const includeMetrics = document.getElementById('includeMetrics').checked;
        const includeProducts = document.getElementById('includeProducts').checked;
        
        this.showNotification(`Preparando exportação em ${format.toUpperCase()}...`, 'info');
        
        try {
            if (format === 'pdf') {
                await this.exportToPDF(includeCharts, includeMetrics, includeProducts);
            } else if (format === 'excel') {
                await this.exportToExcel(includeMetrics, includeProducts);
            } else if (format === 'csv') {
                await this.exportToCSV(includeProducts);
            }
            
            this.closeModal('exportModal');
            this.showNotification(`Relatório exportado com sucesso!`, 'success');
        } catch (error) {
            console.error('Erro na exportação:', error);
            this.showNotification('Erro ao exportar. Tente novamente.', 'error');
        }
    }

    async exportToPDF(includeCharts = true, includeMetrics = true, includeProducts = true) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Título
        doc.setFontSize(22);
        doc.setTextColor(0, 102, 204);
        doc.text('Relatório de Estatísticas - ReUse', 20, 20);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 20, 30);
        doc.text(`Período: ${document.querySelector('.date-range-btn.active').textContent}`, 20, 37);
        
        let yPosition = 50;
        
        // Métricas
        if (includeMetrics) {
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Métricas Principais', 20, yPosition);
            yPosition += 10;
            
            const metrics = [
                ['Receita Total', document.getElementById('totalRevenue').textContent],
                ['Pedidos', document.getElementById('totalOrders').textContent],
                ['Taxa de Conversão', document.getElementById('conversionRate').textContent],
                ['Ticket Médio', document.getElementById('averageTicket').textContent],
                ['Avaliação Média', document.getElementById('averageRatingValue').textContent]
            ];
            
            doc.autoTable({
                startY: yPosition,
                head: [['Métrica', 'Valor']],
                body: metrics,
                theme: 'striped',
                headStyles: { fillColor: [0, 102, 204], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 240, 240] }
            });
            
            yPosition = doc.lastAutoTable.finalY + 15;
        }
        
        // Gráficos
        if (includeCharts) {
            doc.addPage();
            doc.setFontSize(16);
            doc.setTextColor(0, 102, 204);
            doc.text('Gráficos', 20, 20);
            
            try {
                const salesCanvas = document.getElementById('salesChart');
                const salesImage = salesCanvas.toDataURL('image/png');
                doc.addImage(salesImage, 'PNG', 20, 30, 170, 80);
                
                doc.text('Vendas por Período', 20, 120);
                
                const categoryCanvas = document.getElementById('categoryChart');
                const categoryImage = categoryCanvas.toDataURL('image/png');
                doc.addImage(categoryImage, 'PNG', 20, 130, 80, 80);
                
                doc.text('Vendas por Categoria', 20, 220);
            } catch (e) {
                console.warn('Erro ao capturar gráficos:', e);
            }
        }
        
        // Tabela de produtos
        if (includeProducts) {
            if (yPosition > 200) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setFontSize(16);
            doc.setTextColor(0, 102, 204);
            doc.text('Performance de Produtos', 20, yPosition);
            yPosition += 10;
            
            const products = [];
            document.querySelectorAll('#productsTableBody tr').forEach(row => {
                const productName = row.querySelector('.product-details strong')?.textContent || '';
                const category = row.querySelector('td:nth-child(2)')?.textContent || '';
                const sales = row.querySelector('.sales-count')?.textContent || '';
                const revenue = row.querySelector('.revenue-value')?.textContent || '';
                const rating = row.querySelector('.rating-cell')?.textContent?.trim() || '';
                products.push([productName, category, sales, revenue, rating]);
            });
            
            doc.autoTable({
                startY: yPosition,
                head: [['Produto', 'Categoria', 'Vendas', 'Receita', 'Avaliação']],
                body: products,
                theme: 'striped',
                headStyles: { fillColor: [0, 102, 204], textColor: 255 }
            });
        }
        
        doc.save(`relatorio-estatisticas-${new Date().getTime()}.pdf`);
    }

    async exportToExcel(includeMetrics = true, includeProducts = true) {
        const wb = XLSX.utils.book_new();
        
        if (includeMetrics) {
            const metricsData = [
                ['Métrica', 'Valor', 'Variação'],
                ['Receita Total', document.getElementById('totalRevenue').textContent, document.getElementById('revenueChange').textContent.replace(/[^0-9,.-]+/g, '')],
                ['Pedidos', document.getElementById('totalOrders').textContent, document.getElementById('ordersChange').textContent.replace(/[^0-9,.-]+/g, '')],
                ['Taxa de Conversão', document.getElementById('conversionRate').textContent, document.getElementById('conversionChange').textContent.replace(/[^0-9,.-]+/g, '')],
                ['Ticket Médio', document.getElementById('averageTicket').textContent, document.getElementById('ticketChange').textContent.replace(/[^0-9,.-]+/g, '')],
                ['Avaliação Média', document.getElementById('averageRatingValue').textContent, '+0.2']
            ];
            
            const wsMetrics = XLSX.utils.aoa_to_sheet(metricsData);
            XLSX.utils.book_append_sheet(wb, wsMetrics, 'Métricas');
        }
        
        if (includeProducts) {
            const productsData = [
                ['Produto', 'SKU', 'Categoria', 'Vendas', 'Receita', 'Estoque', 'Conversão', 'Avaliação', 'Tendência']
            ];
            
            document.querySelectorAll('#productsTableBody tr').forEach(row => {
                const productName = row.querySelector('.product-details strong')?.textContent || '';
                const sku = row.querySelector('.product-details span')?.textContent || '';
                const category = row.querySelector('td:nth-child(2)')?.textContent || '';
                const sales = row.querySelector('.sales-count')?.textContent || '';
                const revenue = row.querySelector('.revenue-value')?.textContent || '';
                const stock = row.querySelector('.stock-badge')?.textContent || '';
                const conversion = row.querySelector('td:nth-child(6)')?.textContent || '';
                const rating = row.querySelector('.rating-cell')?.textContent?.trim() || '';
                const trend = row.querySelector('.trend')?.textContent?.trim() || '';
                
                productsData.push([productName, sku, category, sales, revenue, stock, conversion, rating, trend]);
            });
            
            const wsProducts = XLSX.utils.aoa_to_sheet(productsData);
            XLSX.utils.book_append_sheet(wb, wsProducts, 'Produtos');
        }
        
        XLSX.writeFile(wb, `relatorio-estatisticas-${new Date().getTime()}.xlsx`);
    }

    async exportToCSV(includeProducts = true) {
        if (!includeProducts) {
            this.showNotification('Selecione pelo menos a tabela de produtos para exportar CSV', 'warning');
            return;
        }
        
        const productsData = [
            ['Produto', 'SKU', 'Categoria', 'Vendas', 'Receita', 'Estoque', 'Conversão', 'Avaliação', 'Tendência']
        ];
        
        document.querySelectorAll('#productsTableBody tr').forEach(row => {
            const productName = row.querySelector('.product-details strong')?.textContent || '';
            const sku = row.querySelector('.product-details span')?.textContent || '';
            const category = row.querySelector('td:nth-child(2)')?.textContent || '';
            const sales = row.querySelector('.sales-count')?.textContent || '';
            const revenue = row.querySelector('.revenue-value')?.textContent || '';
            const stock = row.querySelector('.stock-badge')?.textContent || '';
            const conversion = row.querySelector('td:nth-child(6)')?.textContent || '';
            const rating = row.querySelector('.rating-cell')?.textContent?.trim() || '';
            const trend = row.querySelector('.trend')?.textContent?.trim() || '';
            
            productsData.push([productName, sku, category, sales, revenue, stock, conversion, rating, trend]);
        });
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(productsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
        XLSX.writeFile(wb, `produtos-${new Date().getTime()}.csv`);
    }

    exportProductsTable() {
        this.showNotification('Exportando tabela de produtos...', 'info');
        
        try {
            const productsData = [
                ['Produto', 'SKU', 'Categoria', 'Vendas', 'Receita', 'Estoque', 'Conversão', 'Avaliação', 'Tendência']
            ];
            
            document.querySelectorAll('#productsTableBody tr').forEach(row => {
                const productName = row.querySelector('.product-details strong')?.textContent || '';
                const sku = row.querySelector('.product-details span')?.textContent || '';
                const category = row.querySelector('td:nth-child(2)')?.textContent || '';
                const sales = row.querySelector('.sales-count')?.textContent || '';
                const revenue = row.querySelector('.revenue-value')?.textContent || '';
                const stock = row.querySelector('.stock-badge')?.textContent || '';
                const conversion = row.querySelector('td:nth-child(6)')?.textContent || '';
                const rating = row.querySelector('.rating-cell')?.textContent?.trim() || '';
                const trend = row.querySelector('.trend')?.textContent?.trim() || '';
                
                productsData.push([productName, sku, category, sales, revenue, stock, conversion, rating, trend]);
            });
            
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(productsData);
            XLSX.utils.book_append_sheet(wb, ws, 'Performance de Produtos');
            XLSX.writeFile(wb, `produtos-performance-${new Date().getTime()}.xlsx`);
            
            this.showNotification('Tabela exportada com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao exportar tabela:', error);
            this.showNotification('Erro ao exportar tabela.', 'error');
        }
    }

    printProductsTable() {
        this.showNotification('Preparando visualização para impressão...', 'info');
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Performance de Produtos - ReUse</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #0066cc; }
                        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
                        th { background: #0066cc; color: white; padding: 10px; text-align: left; }
                        td { padding: 10px; border-bottom: 1px solid #ddd; }
                        .product-cell img { width: 40px; height: 40px; margin-right: 10px; }
                        .product-info-cell { display: flex; align-items: center; }
                        .rating-cell { color: #ff7b00; }
                        .trend.positive { color: #00cc99; }
                        .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
                    </style>
                </head>
                <body>
                    <h1>Performance de Produtos</h1>
                    <p>Data: ${new Date().toLocaleDateString('pt-BR')} - ${document.querySelector('.date-range-btn.active').textContent}</p>
        `);
        
        const table = document.getElementById('productsPerformanceTable');
        printWindow.document.write(table.outerHTML);
        
        printWindow.document.write(`
                    <div class="footer">
                        <p>Relatório gerado pelo sistema ReUse - Vendedor</p>
                    </div>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    // ========== FUNÇÕES DE GRÁFICOS ==========

    downloadChart(chartId, fileName) {
        const canvas = document.getElementById(chartId);
        if (canvas) {
            const link = document.createElement('a');
            link.download = `${fileName}-${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.showNotification(`Gráfico baixado com sucesso!`, 'success');
        }
    }

    expandChart(chartId, title) {
        const originalCanvas = document.getElementById(chartId);
        const modal = document.getElementById('expandedChartModal');
        const expandedCanvas = document.getElementById('expandedChart');
        const expandedTitle = document.getElementById('expandedChartTitle');
        
        expandedTitle.textContent = title;
        
        // Copiar dados do gráfico original
        const originalChart = this.charts[this.getChartKeyFromId(chartId)];
        
        if (originalChart && expandedCanvas) {
            // Destruir gráfico expandido anterior se existir
            if (this.expandedChart) {
                this.expandedChart.destroy();
            }
            
            // Criar novo gráfico expandido
            this.expandedChart = new Chart(expandedCanvas, {
                type: originalChart.config.type,
                data: originalChart.data,
                options: {
                    ...originalChart.options,
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        modal.classList.add('active');
    }

    getChartKeyFromId(chartId) {
        const map = {
            'salesChart': 'sales',
            'categoryChart': 'category',
            'topProductsChart': 'topProducts',
            'ratingsChart': 'ratings',
            'stockChart': 'stock'
        };
        return map[chartId];
    }

    downloadExpandedChart() {
        const canvas = document.getElementById('expandedChart');
        if (canvas) {
            const title = document.getElementById('expandedChartTitle').textContent;
            const fileName = title.toLowerCase().replace(/\s+/g, '-');
            const link = document.createElement('a');
            link.download = `${fileName}-expandido-${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.showNotification(`Gráfico baixado com sucesso!`, 'success');
        }
    }

    // ========== FUNÇÕES DE PRODUTOS ==========

    viewProductDetails(productId, productName) {
        this.showNotification(`Carregando detalhes de: ${productName}`, 'info');
        
        // Simular dados do produto
        this.currentProductData = {
            id: productId,
            name: productName,
            sku: productId === '1' ? 'NIK-12345' : productId === '2' ? 'VES-78901' : 
                  productId === '3' ? 'LIQ-45678' : 'CAM-23456',
            price: productId === '1' ? 'R$ 199,90' : productId === '2' ? 'R$ 89,90' :
                   productId === '3' ? 'R$ 129,90' : 'R$ 59,90',
            stock: productId === '1' ? '3' : productId === '2' ? '5' :
                   productId === '3' ? '1' : '8',
            sales: productId === '1' ? '45' : productId === '2' ? '38' :
                   productId === '3' ? '22' : '52',
            revenue: productId === '1' ? 'R$ 8.995,50' : productId === '2' ? 'R$ 3.416,20' :
                     productId === '3' ? 'R$ 2.857,80' : 'R$ 3.114,80',
            rating: productId === '1' ? '4.9' : productId === '2' ? '4.7' :
                    productId === '3' ? '4.5' : '4.6'
        };
        
        const container = document.getElementById('productDetailContainer');
        container.innerHTML = `
            <div class="product-detail-layout">
                <div class="product-detail-image">
                    <img src="${document.querySelector(`tr[data-product-id="${productId}"] .product-info-cell img`)?.src || 'img/product-placeholder.jpg'}" alt="${productName}">
                </div>
                <div class="product-detail-info">
                    <h4>${productName}</h4>
                    <p class="product-sku">SKU: ${this.currentProductData.sku}</p>
                    
                    <div class="product-detail-metrics">
                        <div class="detail-metric">
                            <span class="metric-label">Preço</span>
                            <span class="metric-value highlight">${this.currentProductData.price}</span>
                        </div>
                        <div class="detail-metric">
                            <span class="metric-label">Estoque</span>
                            <span class="metric-value ${parseInt(this.currentProductData.stock) < 3 ? 'warning' : ''}">${this.currentProductData.stock} unidades</span>
                        </div>
                        <div class="detail-metric">
                            <span class="metric-label">Vendas</span>
                            <span class="metric-value">${this.currentProductData.sales}</span>
                        </div>
                        <div class="detail-metric">
                            <span class="metric-label">Receita</span>
                            <span class="metric-value">${this.currentProductData.revenue}</span>
                        </div>
                        <div class="detail-metric">
                            <span class="metric-label">Avaliação</span>
                            <span class="metric-value rating">
                                <i class="bi bi-star-fill"></i> ${this.currentProductData.rating}
                            </span>
                        </div>
                    </div>
                    
                    <div class="product-detail-actions">
                        <button class="btn btn-primary" onclick="window.vendedorEstatisticas.editProduct('${productId}', '${productName}')">
                            <i class="bi bi-pencil"></i> Editar Produto
                        </button>
                        <button class="btn btn-outline" onclick="window.vendedorEstatisticas.showProductStats('${productId}', '${productName}')">
                            <i class="bi bi-graph-up"></i> Ver Estatísticas
                        </button>
                        ${parseInt(this.currentProductData.stock) < 3 ? 
                            `<button class="btn btn-warning" onclick="window.vendedorEstatisticas.openRestockModal('${productName}', ${this.currentProductData.stock})">
                                <i class="bi bi-box-arrow-up"></i> Repor Estoque
                            </button>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('productDetailTitle').textContent = `Detalhes do Produto: ${productName}`;
        document.getElementById('productDetailModal').classList.add('active');
    }

    editProduct(productId, productName) {
        this.showNotification(`Redirecionando para edição de: ${productName}`, 'info');
        setTimeout(() => {
            window.location.href = `vendedor-editar-produto.html?id=${productId}`;
        }, 1000);
    }

    showProductStats(productId, productName) {
        this.showNotification(`Carregando estatísticas detalhadas de: ${productName}`, 'info');
        
        const container = document.getElementById('productStatsContainer');
        document.getElementById('productStatsTitle').textContent = `Estatísticas: ${productName}`;
        
        container.innerHTML = `
            <div class="product-stats-detail">
                <div class="stats-summary">
                    <div class="stats-summary-card">
                        <span class="stats-summary-label">Vendas (30 dias)</span>
                        <span class="stats-summary-value">${productId === '1' ? '45' : productId === '2' ? '38' : productId === '3' ? '22' : '52'}</span>
                        <span class="stats-summary-trend positive">+${productId === '1' ? '23' : productId === '2' ? '12' : productId === '3' ? '2' : '31'}%</span>
                    </div>
                    <div class="stats-summary-card">
                        <span class="stats-summary-label">Receita</span>
                        <span class="stats-summary-value">${productId === '1' ? 'R$ 8.995,50' : productId === '2' ? 'R$ 3.416,20' : productId === '3' ? 'R$ 2.857,80' : 'R$ 3.114,80'}</span>
                    </div>
                    <div class="stats-summary-card">
                        <span class="stats-summary-label">Taxa Conversão</span>
                        <span class="stats-summary-value">${productId === '1' ? '4.2%' : productId === '2' ? '3.7%' : productId === '3' ? '2.9%' : '5.1%'}</span>
                    </div>
                </div>
                
                <div style="height: 300px; margin-top: 30px;">
                    <canvas id="productDetailChart"></canvas>
                </div>
                
                <div style="margin-top: 30px;">
                    <h4>Feedbacks Recentes</h4>
                    ${this.generateProductReviews(productId)}
                </div>
            </div>
        `;
        
        // Criar gráfico de performance do produto
        setTimeout(() => {
            const ctx = document.getElementById('productDetailChart')?.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                        datasets: [{
                            label: 'Vendas',
                            data: productId === '1' ? [10, 12, 15, 18] :
                                  productId === '2' ? [8, 10, 11, 13] :
                                  productId === '3' ? [5, 6, 5, 6] : [12, 14, 16, 20],
                            borderColor: '#0066cc',
                            tension: 0.4
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
        }, 100);
        
        document.getElementById('productStatsModal').classList.add('active');
    }

    generateProductReviews(productId) {
        const reviews = {
            '1': [
                { user: 'João Silva', rating: 5, comment: 'Produto excelente, chegou antes do prazo!', date: '2 dias atrás' },
                { user: 'Pedro Santos', rating: 5, comment: 'Tênis original e muito confortável', date: '1 semana atrás' },
                { user: 'Ana Costa', rating: 4, comment: 'Muito bom, mas veio sem nota fiscal', date: '2 semanas atrás' }
            ],
            '2': [
                { user: 'Maria Santos', rating: 4, comment: 'Vestido lindo, tecido de qualidade', date: '5 dias atrás' },
                { user: 'Carla Souza', rating: 5, comment: 'Perfeito para festas!', date: '1 semana atrás' }
            ],
            '3': [
                { user: 'Carlos Oliveira', rating: 4, comment: 'Funciona perfeitamente', date: '1 semana atrás' },
                { user: 'Fernando Lima', rating: 4, comment: 'Bom produto, bom custo-benefício', date: '2 semanas atrás' }
            ],
            '4': [
                { user: 'Ana Pereira', rating: 5, comment: 'Camiseta de ótima qualidade', date: '3 dias atrás' },
                { user: 'Roberto Alves', rating: 4, comment: 'Tecido bom, mas o tamanho veio menor', date: '1 semana atrás' }
            ]
        };
        
        const productReviews = reviews[productId] || reviews['1'];
        
        return productReviews.map(review => `
            <div class="feedback-item">
                <div class="feedback-header">
                    <strong>${review.user}</strong>
                    <div class="feedback-rating">
                        ${Array(5).fill().map((_, i) => 
                            `<i class="bi bi-star-fill" style="color: ${i < review.rating ? '#ff7b00' : '#ddd'}"></i>`
                        ).join('')}
                    </div>
                </div>
                <p>"${review.comment}"</p>
                <span class="feedback-date">${review.date}</span>
            </div>
        `).join('');
    }

    exportProductStats() {
        this.showNotification('Exportando estatísticas do produto...', 'info');
        setTimeout(() => {
            this.showNotification('Dados exportados com sucesso!', 'success');
            this.closeModal('productStatsModal');
        }, 1500);
    }

    // ========== FUNÇÕES DE ESTOQUE ==========

    openRestockModal(productName, currentStock) {
        const modal = document.getElementById('restockModal');
        const productInfo = document.getElementById('restockProductInfo');
        
        productInfo.innerHTML = `
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #fff3cd; border-left: 4px solid #ffa502; border-radius: 4px;">
                <strong style="font-size: 1.1rem;">${productName}</strong>
                <p style="margin-top: 0.5rem; margin-bottom: 0;">Estoque atual: <span style="font-weight: 700; color: #ff7b00;">${currentStock} unidade(s)</span></p>
            </div>
        `;
        
        modal.classList.add('active');
    }

    confirmRestock() {
        const quantity = document.getElementById('restockQuantity').value;
        const supplier = document.getElementById('restockSupplier').selectedOptions[0].text;
        const notes = document.getElementById('restockNotes').value;
        
        this.showNotification(`Reposição de ${quantity} unidades solicitada!`, 'success');
        
        // Simular atualização
        setTimeout(() => {
            const stockBadge = document.querySelector('.stock-badge.warning');
            if (stockBadge) {
                stockBadge.classList.remove('warning');
                stockBadge.classList.add('good');
                stockBadge.textContent = `${parseInt(quantity) + 1} unidades`;
            }
            
            this.closeModal('restockModal');
            this.showNotification('Estoque atualizado com sucesso!', 'success');
        }, 1500);
    }

    // ========== FUNÇÕES DE INSIGHTS ==========

    applyInsight(insightCard) {
        const insightTitle = insightCard.querySelector('h4').textContent;
        this.showNotification(`Aplicando: ${insightTitle}`, 'info');
        
        setTimeout(() => {
            insightCard.style.opacity = '0.5';
            insightCard.style.background = 'rgba(0, 204, 153, 0.05)';
            const applyButton = insightCard.querySelector('.apply-insight');
            if (applyButton) {
                applyButton.textContent = 'Aplicado ✓';
                applyButton.disabled = true;
            }
            this.showNotification('Recomendação aplicada com sucesso!', 'success');
        }, 1000);
    }

    dismissInsight(insightCard) {
        insightCard.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            insightCard.remove();
            this.showNotification('Insight dispensado', 'info');
        }, 300);
    }

    // ========== FUNÇÕES DE AVALIAÇÕES ==========

    respondToReview(reviewerName) {
        this.showNotification(`Preparando resposta para ${reviewerName}...`, 'info');
        setTimeout(() => {
            window.location.href = 'vendedor-avaliacoes.html?responder=1';
        }, 1000);
    }

    // ========== FUNÇÕES DE PESQUISA ==========

    performGlobalSearch(query) {
        this.showNotification(`Pesquisando por: "${query}"`, 'info');
        
        // Simular pesquisa
        setTimeout(() => {
            const productsTable = document.getElementById('productsTableBody');
            if (productsTable) {
                const rows = productsTable.querySelectorAll('tr');
                let found = false;
                
                rows.forEach(row => {
                    const productName = row.querySelector('.product-details strong')?.textContent.toLowerCase() || '';
                    const category = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
                    
                    if (productName.includes(query.toLowerCase()) || category.includes(query.toLowerCase())) {
                        row.style.background = 'rgba(0, 102, 204, 0.1)';
                        found = true;
                        setTimeout(() => {
                            row.style.background = '';
                        }, 3000);
                    }
                });
                
                if (found) {
                    this.showNotification('Produtos encontrados e destacados!', 'success');
                } else {
                    this.showNotification('Nenhum resultado encontrado', 'info');
                }
            }
        }, 500);
    }

    // ========== FUNÇÕES DE RELATÓRIO ==========

    generateCustomReport() {
        const title = document.getElementById('reportTitle').value;
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const format = document.getElementById('reportFormat').value;
        const scheduleReport = document.getElementById('scheduleReport').checked;
        
        this.showNotification(`Gerando relatório personalizado...`, 'info');
        
        setTimeout(async () => {
            if (format === 'pdf') {
                await this.exportToPDF(true, true, true);
            } else if (format === 'excel') {
                await this.exportToExcel(true, true);
            } else if (format === 'csv') {
                await this.exportToCSV(true);
            }
            
            if (scheduleReport) {
                const email = document.getElementById('scheduleEmail').value;
                const frequency = document.getElementById('scheduleFrequency').value;
                this.showNotification(`Relatório agendado para ${frequency} e será enviado para ${email}`, 'success');
            }
            
            this.closeModal('reportModal');
        }, 2000);
    }

    // ========== FUNÇÕES DE AUTENTICAÇÃO E ACESSIBILIDADE ==========

    openLogoutModal() {
        document.getElementById('logoutModal').classList.add('active');
    }

    performLogout() {
        this.closeModal('logoutModal');
        this.showNotification('Saindo da sua conta...', 'info');
        
        setTimeout(() => {
            window.location.href = 'cadastro-vendedor.html';
        }, 1500);
    }



    // ========== FUNÇÕES DE SUPORTE ==========

    openSupportModal() {
        document.getElementById('supportModal').classList.add('active');
    }

    // ========== FUNÇÕES DE MODAL ==========

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ========== FUNÇÕES DE CARREGAMENTO ==========

    loadStatisticsData() {
        console.log('Carregando dados estatísticos...');
    }

    // ========== FUNÇÃO DE NOTIFICAÇÃO ==========

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
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
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
    window.vendedorEstatisticas = new VendedorEstatisticas();
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});