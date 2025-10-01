// pedidos.js - Gerenciamento e exibição de pedidos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos da página
    const ordersContainer = document.querySelector('.orders-container');
    const emptyOrdersElement = document.querySelector('.empty-orders');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchOrdersInput = document.querySelector('.search-orders input');

    // Carrega os pedidos do localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Inicializa a página
    function initOrdersPage() {
        if (orders.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
            renderOrders('Todos');
            setupFilterTabs();
            setupSearch();
        }
        
        updateNotificationBadge();
    }

    // Renderiza os pedidos com base no filtro
    function renderOrders(filter = 'Todos', searchTerm = '') {
        if (!ordersContainer) return;

        // Remove o estado vazio se existir
        hideEmptyState();

        // Filtra os pedidos
        let filteredOrders = orders;
        
        if (filter !== 'Todos') {
            filteredOrders = orders.filter(order => 
                getStatusText(order.status) === filter
            );
        }

        // Aplica busca se houver termo
        if (searchTerm) {
            filteredOrders = filteredOrders.filter(order => 
                order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.items.some(item => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Se não há pedidos após filtro, mostra estado vazio
        if (filteredOrders.length === 0) {
            showEmptyState(filter);
            return;
        }

        // Cria o container de lista de pedidos se não existir
        let ordersList = document.querySelector('.orders-list');
        if (!ordersList) {
            ordersList = document.createElement('div');
            ordersList.className = 'orders-list';
            ordersContainer.appendChild(ordersList);
        }

        // Renderiza os pedidos
        ordersList.innerHTML = '';
        filteredOrders.forEach(order => {
            const orderElement = createOrderElement(order);
            ordersList.appendChild(orderElement);
        });
    }

    // Cria o elemento HTML para um pedido
    function createOrderElement(order) {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('pt-BR');
        const formattedTime = orderDate.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <h3 class="order-number">Pedido #${order.trackingNumber}</h3>
                    <span class="order-date">${formattedDate} às ${formattedTime}</span>
                </div>
                <div class="order-status ${getStatusClass(order.status)}">
                    <span>${getStatusText(order.status)}</span>
                </div>
            </div>

            <div class="order-items-preview">
                ${order.items.slice(0, 2).map(item => `
                    <div class="preview-item">
                        <span class="item-quantity">${item.quantity}x</span>
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                `).join('')}
                ${order.items.length > 2 ? `
                    <div class="more-items">
                        +${order.items.length - 2} outro(s) item(ns)
                    </div>
                ` : ''}
            </div>

            <div class="order-footer">
                <div class="order-total">
                    <strong>Total: R$ ${order.total.toFixed(2).replace('.', ',')}</strong>
                </div>
                <div class="order-actions">
                    <button class="btn-order-action btn-view-details" data-order-id="${order.id}">
                        <i class="bi bi-eye"></i> Ver Detalhes
                    </button>
                    <button class="btn-order-action btn-track" data-order-id="${order.id}">
                        <i class="bi bi-geo-alt"></i> Acompanhar
                    </button>
                </div>
            </div>
        `;

        // Adiciona event listeners aos botões
        const viewDetailsBtn = orderElement.querySelector('.btn-view-details');
        const trackBtn = orderElement.querySelector('.btn-track');

        viewDetailsBtn.addEventListener('click', () => viewOrderDetails(order));
        trackBtn.addEventListener('click', () => trackOrder(order));

        return orderElement;
    }

    // Mostra detalhes do pedido
    function viewOrderDetails(order) {
        // Cria modal de detalhes do pedido
        const modal = document.createElement('div');
        modal.className = 'order-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Detalhes do Pedido #${order.trackingNumber}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-info-section">
                        <h3>Informações do Pedido</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <strong>Data do Pedido:</strong>
                                <span>${new Date(order.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div class="info-item">
                                <strong>Status:</strong>
                                <span class="status-badge ${getStatusClass(order.status)}">${getStatusText(order.status)}</span>
                            </div>
                            <div class="info-item">
                                <strong>Número de Rastreamento:</strong>
                                <span>${order.trackingNumber}</span>
                            </div>
                            <div class="info-item">
                                <strong>Total:</strong>
                                <span>R$ ${order.total.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </div>
                    </div>

                    <div class="order-items-section">
                        <h3>Itens do Pedido</h3>
                        <div class="items-list">
                            ${order.items.map(item => `
                                <div class="order-item-detail">
                                    <div class="item-info">
                                        <span class="item-quantity">${item.quantity}x</span>
                                        <span class="item-name">${item.name}</span>
                                        ${item.description ? `<span class="item-description">${item.description}</span>` : ''}
                                    </div>
                                    <div class="item-pricing">
                                        <span class="item-unit-price">R$ ${item.price.toFixed(2).replace('.', ',')} cada</span>
                                        <span class="item-total-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="order-summary-section">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>R$ ${(order.total - 10).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div class="summary-row">
                            <span>Frete:</span>
                            <span>R$ 10,00</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>R$ ${order.total.toFixed(2).replace('.', ',')}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary close-modal">Fechar</button>
                    <button class="btn btn-primary" onclick="printOrder(${order.id})">
                        <i class="bi bi-printer"></i> Imprimir
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners para fechar modal
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        // Fecha modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Acompanha pedido
    function trackOrder(order) {
        alert(`Acompanhamento do pedido #${order.trackingNumber}\n\nStatus atual: ${getStatusText(order.status)}\n\nEm breve implementaremos o rastreamento completo!`);
    }

    // Configura as abas de filtro
    function setupFilterTabs() {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove a classe ativa de todas as abas
                filterTabs.forEach(t => t.classList.remove('active'));
                
                // Adiciona a classe ativa à aba clicada
                this.classList.add('active');
                
                // Filtra os pedidos
                const filter = this.textContent;
                const searchTerm = searchOrdersInput ? searchOrdersInput.value : '';
                renderOrders(filter, searchTerm);
            });
        });
    }

    // Configura a busca
    function setupSearch() {
        if (searchOrdersInput) {
            searchOrdersInput.addEventListener('input', function() {
                const activeFilter = document.querySelector('.filter-tab.active').textContent;
                renderOrders(activeFilter, this.value);
            });
        }
    }

    // Mostra estado vazio
    function showEmptyState(filter = 'Todos') {
        if (!emptyOrdersElement) return;

        // Remove lista de pedidos se existir
        const ordersList = document.querySelector('.orders-list');
        if (ordersList) {
            ordersList.remove();
        }

        // Atualiza mensagem baseada no filtro
        const message = filter === 'Todos' 
            ? 'Você ainda não fez nenhum pedido'
            : `Nenhum pedido encontrado para "${filter}"`;

        const description = filter === 'Todos'
            ? 'Explore nossa seleção de produtos sustentáveis e comece a fazer a diferença hoje mesmo! Encontre itens incríveis com preços acessíveis e ajude a reduzir o desperdício.'
            : 'Não encontramos pedidos com esse status. Tente alterar o filtro.';

        emptyOrdersElement.querySelector('h2').textContent = message;
        emptyOrdersElement.querySelector('p').textContent = description;
        emptyOrdersElement.style.display = 'block';
    }

    // Esconde estado vazio
    function hideEmptyState() {
        if (emptyOrdersElement) {
            emptyOrdersElement.style.display = 'none';
        }
    }

    // Retorna a classe CSS baseada no status
    function getStatusClass(status) {
        const statusMap = {
            'Em processamento': 'status-processing',
            'A caminho': 'status-shipping',
            'Entregue': 'status-delivered',
            'Cancelado': 'status-cancelled'
        };
        return statusMap[status] || 'status-processing';
    }

    // Retorna o texto do status
    function getStatusText(status) {
        const statusMap = {
            'Em processamento': 'Em Processamento',
            'A caminho': 'A Caminho',
            'Entregue': 'Entregue',
            'Cancelado': 'Cancelado'
        };
        return statusMap[status] || status;
    }

    // Atualiza o badge de notificações
    function updateNotificationBadge() {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const unreadCount = notifications.filter(n => !n.read).length;
        const badgeElement = document.querySelector('.notification-badge');
        
        if (badgeElement) {
            badgeElement.textContent = unreadCount > 0 ? unreadCount : '';
            badgeElement.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }

    // Função global para impressão (acessível via onclick)
    window.printOrder = function(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Pedido #${order.trackingNumber}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .header { text-align: center; margin-bottom: 30px; }
                            .section { margin-bottom: 20px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f5f5f5; }
                            .total { font-weight: bold; font-size: 1.2em; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>ReUse - Comprovante de Pedido</h1>
                            <h2>Pedido #${order.trackingNumber}</h2>
                        </div>
                        <div class="section">
                            <h3>Informações do Pedido</h3>
                            <p><strong>Data:</strong> ${new Date(order.date).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Status:</strong> ${getStatusText(order.status)}</p>
                        </div>
                        <div class="section">
                            <h3>Itens do Pedido</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unitário</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${order.items.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td>${item.quantity}</td>
                                            <td>R$ ${item.price.toFixed(2).replace('.', ',')}</td>
                                            <td>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <div class="section">
                            <h3>Resumo do Pedido</h3>
                            <p><strong>Subtotal:</strong> R$ ${(order.total - 10).toFixed(2).replace('.', ',')}</p>
                            <p><strong>Frete:</strong> R$ 10,00</p>
                            <p class="total"><strong>Total:</strong> R$ ${order.total.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    // Inicializa a página
    initOrdersPage();
});