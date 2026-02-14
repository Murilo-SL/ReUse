// js/notifications-menu.js
class NotificationsMenu {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.isOpen = false;
        this.initialize();
    }

    initialize() {
        this.createMenuStructure();
        this.loadNotifications();
        this.setupEventListeners();
        this.render();
    }

    createMenuStructure() {
        // Criar estrutura do menu de notificações
        const menuHTML = `
            <div class="notifications-menu" id="notificationsMenu">
                <button class="accessibility-btn" id="notificationsToggle" title="Notificações">
                    <i class="bi bi-bell"></i>
                    <span class="notification-count" id="notificationCount"></span>
                </button>
                <div class="notifications-dropdown" id="notificationsDropdown">
                    <div class="notifications-header">
                        <h4>Notificações</h4>
                        <div class="notifications-actions">
                            <button class="notifications-action" id="markAllRead" title="Marcar todas como lidas">
                                <i class="bi bi-check-all"></i>
                            </button>
                            <button class="notifications-action" id="settingsBtn" title="Configurações">
                                <i class="bi bi-gear"></i>
                            </button>
                        </div>
                    </div>
                    <div class="notifications-list" id="notificationsList">
                        <!-- Notificações serão carregadas aqui -->
                    </div>
                    <div class="notifications-footer">
                        <a href="#" class="view-all-link" id="viewAllNotifications">
                            <i class="bi bi-arrow-right-circle"></i>
                            Ver todas as notificações
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Adicionar ao DOM se não existir
        if (!document.getElementById('notificationsMenu')) {
            const accessibilityControls = document.querySelector('.accessibility-controls');
            if (accessibilityControls) {
                accessibilityControls.insertAdjacentHTML('beforebegin', menuHTML);
            } else {
                // Adicionar no header se não houver controles de acessibilidade
                const header = document.querySelector('.user-actions');
                if (header) {
                    header.insertAdjacentHTML('afterbegin', menuHTML);
                }
            }
        }

        // Adicionar estilos
        this.addStyles();
    }

    addStyles() {
        const styles = `
            .notifications-menu {
                position: relative;
                display: inline-block;
            }

            .notifications-menu .accessibility-btn {
                position: relative;
                background: none;
                border: 1px solid var(--seller-border, #e2e8f0);
                border-radius: 8px;
                padding: 0.5rem;
                color: var(--seller-text, #334155);
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
            }

            .notifications-menu .accessibility-btn:hover {
                background-color: var(--seller-primary-light, #34d399);
                color: white;
                border-color: var(--seller-primary, #10b981);
            }

            .notification-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: #ef4444;
                color: white;
                font-size: 0.75rem;
                font-weight: 600;
                padding: 0.1rem 0.4rem;
                border-radius: 50%;
                min-width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .notifications-dropdown {
                position: absolute;
                top: calc(100% + 0.5rem);
                right: 0;
                width: 380px;
                max-width: 90vw;
                background: var(--seller-card-bg, #ffffff);
                border: 1px solid var(--seller-border, #e2e8f0);
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                display: none;
                flex-direction: column;
                max-height: 500px;
                overflow: hidden;
            }

            .notifications-dropdown.show {
                display: flex;
                animation: slideDown 0.2s ease-out;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .notifications-header {
                padding: 1.25rem 1.5rem;
                border-bottom: 1px solid var(--seller-border, #e2e8f0);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--seller-bg, #f8fafc);
            }

            .notifications-header h4 {
                margin: 0;
                font-size: 1.1rem;
                color: var(--seller-text, #334155);
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .notifications-header h4 i {
                color: var(--seller-primary, #10b981);
            }

            .notifications-actions {
                display: flex;
                gap: 0.5rem;
            }

            .notifications-action {
                background: none;
                border: 1px solid var(--seller-border, #e2e8f0);
                border-radius: 6px;
                padding: 0.5rem;
                color: var(--seller-text-light, #64748b);
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
            }

            .notifications-action:hover {
                background-color: var(--seller-primary-light, #34d399);
                color: white;
                border-color: var(--seller-primary, #10b981);
            }

            .notifications-list {
                flex: 1;
                overflow-y: auto;
                max-height: 350px;
                padding: 0.5rem 0;
            }

            .notification-item {
                padding: 1rem 1.5rem;
                display: flex;
                gap: 1rem;
                align-items: flex-start;
                cursor: pointer;
                transition: all 0.2s;
                border-bottom: 1px solid var(--seller-border, #e2e8f0);
            }

            .notification-item:last-child {
                border-bottom: none;
            }

            .notification-item:hover {
                background-color: rgba(16, 185, 129, 0.05);
            }

            .notification-item.unread {
                background-color: rgba(59, 130, 246, 0.05);
                border-left: 3px solid #3b82f6;
            }

            .notification-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                flex-shrink: 0;
                margin-top: 0.25rem;
            }

            .notification-icon.order {
                background-color: #dbeafe;
                color: #1d4ed8;
            }

            .notification-icon.message {
                background-color: #e0e7ff;
                color: #4f46e5;
            }

            .notification-icon.review {
                background-color: #dcfce7;
                color: #15803d;
            }

            .notification-icon.payment {
                background-color: #fef3c7;
                color: #d97706;
            }

            .notification-icon.system {
                background-color: #f3e8ff;
                color: #7c3aed;
            }

            .notification-content {
                flex: 1;
                min-width: 0;
            }

            .notification-title {
                margin: 0 0 0.25rem;
                font-size: 0.95rem;
                font-weight: 600;
                color: var(--seller-text, #334155);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .notification-message {
                margin: 0 0 0.5rem;
                font-size: 0.875rem;
                color: var(--seller-text-light, #64748b);
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .notification-time {
                font-size: 0.75rem;
                color: var(--seller-text-light, #64748b);
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .notification-time i {
                font-size: 0.875rem;
            }

            .notification-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }

            .notification-action-btn {
                background: none;
                border: 1px solid var(--seller-border, #e2e8f0);
                border-radius: 4px;
                padding: 0.25rem 0.75rem;
                font-size: 0.75rem;
                color: var(--seller-text-light, #64748b);
                cursor: pointer;
                transition: all 0.2s;
            }

            .notification-action-btn:hover {
                background-color: var(--seller-primary-light, #34d399);
                color: white;
                border-color: var(--seller-primary, #10b981);
            }

            .notifications-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid var(--seller-border, #e2e8f0);
                text-align: center;
                background: var(--seller-bg, #f8fafc);
            }

            .view-all-link {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--seller-primary, #10b981);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: all 0.2s;
                padding: 0.5rem 1rem;
                border-radius: 6px;
            }

            .view-all-link:hover {
                background-color: rgba(16, 185, 129, 0.1);
                text-decoration: none;
            }

            .view-all-link i {
                transition: transform 0.2s;
            }

            .view-all-link:hover i {
                transform: translateX(3px);
            }

            .empty-notifications {
                padding: 3rem 2rem;
                text-align: center;
                color: var(--seller-text-light, #64748b);
            }

            .empty-notifications i {
                font-size: 3rem;
                margin-bottom: 1rem;
                color: var(--seller-border, #e2e8f0);
            }

            .empty-notifications h4 {
                margin: 0 0 0.5rem;
                font-size: 1.1rem;
                color: var(--seller-text, #334155);
            }

            .empty-notifications p {
                margin: 0;
                font-size: 0.9rem;
            }

            /* Dark mode styles */
            .dark-mode .notifications-dropdown {
                background: var(--seller-card-bg, #334155);
                border-color: var(--seller-border, #475569);
            }

            .dark-mode .notifications-header {
                background: var(--seller-bg, #1e293b);
            }

            .dark-mode .notification-item:hover {
                background-color: rgba(16, 185, 129, 0.1);
            }

            .dark-mode .notification-item.unread {
                background-color: rgba(59, 130, 246, 0.1);
            }

            /* Responsividade */
            @media (max-width: 768px) {
                .notifications-dropdown {
                    width: 320px;
                    right: -50%;
                    transform: translateX(50%);
                }
            }

            @media (max-width: 480px) {
                .notifications-dropdown {
                    width: 280px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    loadNotifications() {
        // Carregar notificações do localStorage ou API
        const savedNotifications = localStorage.getItem('sellerNotifications');
        
        if (savedNotifications) {
            this.notifications = JSON.parse(savedNotifications);
        } else {
            // Notificações de exemplo
            this.notifications = [
                {
                    id: 1,
                    type: 'order',
                    title: 'Novo pedido recebido!',
                    message: 'Pedido #ORD-00124 de Ana Silva no valor de R$ 249,90',
                    time: 'Há 5 minutos',
                    read: false,
                    link: '/pedidos/ORD-00124'
                },
                {
                    id: 2,
                    type: 'message',
                    title: 'Nova mensagem',
                    message: 'Carlos Santos perguntou sobre o tamanho do vestido',
                    time: 'Há 25 minutos',
                    read: false,
                    link: '/mensagens/chat-123'
                },
                {
                    id: 3,
                    type: 'review',
                    title: 'Avaliação 5 estrelas',
                    message: 'Maria Oliveira avaliou seu produto com 5 estrelas!',
                    time: 'Há 2 horas',
                    read: true,
                    link: '/avaliacoes/review-456'
                },
                {
                    id: 4,
                    type: 'payment',
                    title: 'Pagamento confirmado',
                    message: 'Pagamento do pedido #ORD-00122 confirmado',
                    time: 'Há 6 horas',
                    read: true,
                    link: '/financeiro/pagamento-789'
                },
                {
                    id: 5,
                    type: 'system',
                    title: 'Atualização do sistema',
                    message: 'Nova funcionalidade disponível: relatórios avançados',
                    time: 'Ontem, 14:30',
                    read: true,
                    link: '/ajuda/atualizacoes'
                }
            ];
        }

        this.calculateUnreadCount();
    }

    calculateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('notificationsToggle');
        const dropdown = document.getElementById('notificationsDropdown');
        const markAllReadBtn = document.getElementById('markAllRead');
        const settingsBtn = document.getElementById('settingsBtn');
        const viewAllLink = document.getElementById('viewAllNotifications');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.markAllAsRead();
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openSettings();
            });
        }

        if (viewAllLink) {
            viewAllLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.viewAllNotifications();
            });
        }

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !dropdown.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdown = document.getElementById('notificationsDropdown');
        
        if (this.isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        const dropdown = document.getElementById('notificationsDropdown');
        const toggleBtn = document.getElementById('notificationsToggle');
        
        if (!dropdown || !toggleBtn) return;
        
        dropdown.classList.add('show');
        this.isOpen = true;
        toggleBtn.classList.add('active');
        
        // Marcar todas como lidas ao abrir (opcional)
        // this.markAllAsRead();
    }

    closeDropdown() {
        const dropdown = document.getElementById('notificationsDropdown');
        const toggleBtn = document.getElementById('notificationsToggle');
        
        if (!dropdown || !toggleBtn) return;
        
        dropdown.classList.remove('show');
        this.isOpen = false;
        toggleBtn.classList.remove('active');
    }

    render() {
        this.updateNotificationCount();
        this.renderNotificationsList();
    }

    updateNotificationCount() {
        const countElement = document.getElementById('notificationCount');
        const toggleBtn = document.getElementById('notificationsToggle');
        
        if (countElement) {
            if (this.unreadCount > 0) {
                countElement.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                countElement.style.display = 'flex';
                
                // Adicionar animação para novas notificações
                if (toggleBtn) {
                    toggleBtn.classList.add('has-notifications');
                }
            } else {
                countElement.style.display = 'none';
                if (toggleBtn) {
                    toggleBtn.classList.remove('has-notifications');
                }
            }
        }
    }

    renderNotificationsList() {
        const listElement = document.getElementById('notificationsList');
        if (!listElement) return;

        if (this.notifications.length === 0) {
            listElement.innerHTML = `
                <div class="empty-notifications">
                    <i class="bi bi-bell-slash"></i>
                    <h4>Nenhuma notificação</h4>
                    <p>Você não tem notificações no momento</p>
                </div>
            `;
            return;
        }

        listElement.innerHTML = this.notifications.map(notification => {
            const iconClass = this.getIconClass(notification.type);
            const timeIcon = this.getTimeIcon(notification.time);
            
            return `
                <div class="notification-item ${notification.read ? '' : 'unread'}" 
                     data-id="${notification.id}">
                    <div class="notification-icon ${notification.type}">
                        <i class="bi ${iconClass}"></i>
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">
                            <span>${notification.title}</span>
                        </div>
                        <p class="notification-message">${notification.message}</p>
                        <div class="notification-time">
                            <i class="bi ${timeIcon}"></i>
                            ${notification.time}
                        </div>
                        ${notification.link ? `
                            <div class="notification-actions">
                                <button class="notification-action-btn view-btn" 
                                        data-link="${notification.link}">
                                    Ver detalhes
                                </button>
                                ${!notification.read ? `
                                    <button class="notification-action-btn mark-read-btn">
                                        Marcar como lida
                                    </button>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Adicionar event listeners para as notificações
        this.addNotificationEventListeners();
    }

    getIconClass(type) {
        switch(type) {
            case 'order': return 'bi-cart-check';
            case 'message': return 'bi-chat-left-text';
            case 'review': return 'bi-star';
            case 'payment': return 'bi-currency-dollar';
            case 'system': return 'bi-info-circle';
            default: return 'bi-bell';
        }
    }

    getTimeIcon(time) {
        if (time.includes('agora') || time.includes('minutos')) {
            return 'bi-clock';
        } else if (time.includes('hora')) {
            return 'bi-clock-history';
        } else if (time.includes('Ontem')) {
            return 'bi-calendar-day';
        } else {
            return 'bi-calendar';
        }
    }

    addNotificationEventListeners() {
        const notificationItems = document.querySelectorAll('.notification-item');
        const viewButtons = document.querySelectorAll('.view-btn');
        const markReadButtons = document.querySelectorAll('.mark-read-btn');

        notificationItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('notification-action-btn')) {
                    const id = parseInt(item.dataset.id);
                    this.openNotification(id);
                }
            });
        });

        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const link = btn.dataset.link;
                this.openNotificationLink(link);
            });
        });

        markReadButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const notificationItem = btn.closest('.notification-item');
                const id = parseInt(notificationItem.dataset.id);
                this.markAsRead(id);
            });
        });
    }

    openNotification(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;

        this.markAsRead(id);
        
        if (notification.link) {
            this.openNotificationLink(notification.link);
        } else {
            console.log('Abrindo notificação:', notification);
            // Mostrar modal com detalhes da notificação
            this.showNotificationDetails(notification);
        }
    }

    openNotificationLink(link) {
        // Navegar para o link da notificação
        window.location.href = link;
    }

    showNotificationDetails(notification) {
        // Criar modal de detalhes da notificação
        const modalHTML = `
            <div class="modal notification-details-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <i class="bi ${this.getIconClass(notification.type)}"></i>
                            Detalhes da Notificação
                        </h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="notification-detail">
                            <h4>${notification.title}</h4>
                            <p class="notification-detail-message">${notification.message}</p>
                            <div class="notification-detail-time">
                                <i class="bi ${this.getTimeIcon(notification.time)}"></i>
                                ${notification.time}
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary close-modal">Fechar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.notification-details-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const closeModalBtn = modal.querySelector('.close-modal');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.saveNotifications();
            this.calculateUnreadCount();
            this.updateNotificationCount();
            
            // Atualizar a notificação na lista
            const notificationItem = document.querySelector(`.notification-item[data-id="${id}"]`);
            if (notificationItem) {
                notificationItem.classList.remove('unread');
                
                // Remover botão "Marcar como lida"
                const markReadBtn = notificationItem.querySelector('.mark-read-btn');
                if (markReadBtn) {
                    markReadBtn.remove();
                }
            }
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        
        this.saveNotifications();
        this.calculateUnreadCount();
        this.updateNotificationCount();
        this.renderNotificationsList();
        
        // Mostrar feedback
        this.showToast('Todas as notificações foram marcadas como lidas');
    }

    addNotification(notification) {
        notification.id = Date.now();
        notification.read = false;
        notification.time = 'Agora';
        
        this.notifications.unshift(notification); // Adicionar no início
        this.saveNotifications();
        this.calculateUnreadCount();
        this.render();
        
        // Mostrar notificação toast
        this.showNotificationToast(notification);
    }

    showNotificationToast(notification) {
        const toastHTML = `
            <div class="notification-toast">
                <div class="toast-icon ${notification.type}">
                    <i class="bi ${this.getIconClass(notification.type)}"></i>
                </div>
                <div class="toast-content">
                    <h5>${notification.title}</h5>
                    <p>${notification.message}</p>
                </div>
                <button class="toast-close">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;

        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = toastContainer.lastElementChild;
        const closeBtn = toast.querySelector('.toast-close');
        
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto-remove após 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
        
        // Animar entrada
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 350px;
        `;
        document.body.appendChild(container);
        return container;
    }

    showToast(message) {
        const toastHTML = `
            <div class="simple-toast">
                <i class="bi bi-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = toastContainer.lastElementChild;
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    openSettings() {
        // Abrir modal de configurações de notificações
        const modalHTML = `
            <div class="modal notifications-settings-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">
                            <i class="bi bi-gear"></i>
                            Configurações de Notificações
                        </h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="notifications-settings-form">
                            <div class="form-group">
                                <h4>Tipos de Notificação</h4>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="orderNotifications" checked>
                                    <label for="orderNotifications">
                                        <i class="bi bi-cart-check"></i>
                                        Novos pedidos
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="messageNotifications" checked>
                                    <label for="messageNotifications">
                                        <i class="bi bi-chat-left-text"></i>
                                        Mensagens
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="reviewNotifications" checked>
                                    <label for="reviewNotifications">
                                        <i class="bi bi-star"></i>
                                        Avaliações
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="paymentNotifications" checked>
                                    <label for="paymentNotifications">
                                        <i class="bi bi-currency-dollar"></i>
                                        Pagamentos
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="systemNotifications" checked>
                                    <label for="systemNotifications">
                                        <i class="bi bi-info-circle"></i>
                                        Atualizações do sistema
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <h4>Preferências</h4>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="soundEnabled" checked>
                                    <label for="soundEnabled">
                                        <i class="bi bi-volume-up"></i>
                                        Som de notificação
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="desktopNotifications" checked>
                                    <label for="desktopNotifications">
                                        <i class="bi bi-bell"></i>
                                        Notificações na área de trabalho
                                    </label>
                                </div>
                                <div class="settings-checkbox">
                                    <input type="checkbox" id="emailNotifications">
                                    <label for="emailNotifications">
                                        <i class="bi bi-envelope"></i>
                                        Notificações por e-mail
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <h4>Frequência</h4>
                                <select class="form-control" id="notificationFrequency">
                                    <option value="immediate">Imediato</option>
                                    <option value="hourly">A cada hora</option>
                                    <option value="daily">Resumo diário</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary close-modal">Cancelar</button>
                        <button class="btn btn-primary save-settings">Salvar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.querySelector('.notifications-settings-modal');
        const closeBtn = modal.querySelector('.modal-close');
        const closeModalBtn = modal.querySelector('.close-modal');
        const saveBtn = modal.querySelector('.save-settings');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        saveBtn.addEventListener('click', () => {
            // Salvar configurações
            this.saveNotificationSettings();
            closeModal();
            this.showToast('Configurações salvas com sucesso!');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    saveNotificationSettings() {
        // Implementar salvamento das configurações
        const settings = {
            orderNotifications: document.getElementById('orderNotifications').checked,
            messageNotifications: document.getElementById('messageNotifications').checked,
            reviewNotifications: document.getElementById('reviewNotifications').checked,
            paymentNotifications: document.getElementById('paymentNotifications').checked,
            systemNotifications: document.getElementById('systemNotifications').checked,
            soundEnabled: document.getElementById('soundEnabled').checked,
            desktopNotifications: document.getElementById('desktopNotifications').checked,
            emailNotifications: document.getElementById('emailNotifications').checked,
            frequency: document.getElementById('notificationFrequency').value
        };

        localStorage.setItem('notificationSettings', JSON.stringify(settings));
    }

    viewAllNotifications() {
        // Navegar para página de todas as notificações
        window.location.href = '/vendedor/notificacoes';
    }

    saveNotifications() {
        localStorage.setItem('sellerNotifications', JSON.stringify(this.notifications));
    }

    // Métodos públicos para integração com outros sistemas
    getUnreadCount() {
        return this.unreadCount;
    }

    clearAll() {
        this.notifications = [];
        this.saveNotifications();
        this.calculateUnreadCount();
        this.render();
    }

    simulateNewNotification(type = 'order') {
        const notifications = {
            order: {
                title: 'Novo pedido recebido!',
                message: 'Você recebeu um novo pedido #ORD-' + (10000 + Math.floor(Math.random() * 1000)),
                type: 'order'
            },
            message: {
                title: 'Nova mensagem',
                message: 'Um cliente enviou uma nova mensagem',
                type: 'message'
            },
            review: {
                title: 'Nova avaliação',
                message: 'Seu produto recebeu uma nova avaliação',
                type: 'review'
            },
            payment: {
                title: 'Pagamento confirmado',
                message: 'Um pagamento foi confirmado',
                type: 'payment'
            }
        };

        this.addNotification(notifications[type] || notifications.order);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.notificationsMenu = new NotificationsMenu();
    
    // Expor métodos globais para teste
    window.simulateNotification = (type) => {
        window.notificationsMenu.simulateNewNotification(type);
    };
});