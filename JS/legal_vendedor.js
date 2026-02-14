// legal-vendedor.js - Gerenciamento da página legal do vendedor

class LegalVendedor {
    constructor() {
        this.init();
    }

    init() {
        this.addStyles();
        this.initializeElements();
        this.restoreDarkMode();
        this.setupEventListeners();
        this.setupNavigation();
        this.setupPrintFunctionality();
    }

    initializeElements() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.legalSections = document.querySelectorAll('.legal-section');
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.searchInput = document.querySelector('.search-input');
        this.printButtons = document.querySelectorAll('.btn-print');
        this.printButtons = Array.from(document.querySelectorAll('[class*="print"]'));
    }

    setupEventListeners() {
        // Navegação entre seções
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('href').substring(1);
                this.switchSection(targetSection);
                this.updateActiveNav(item);
            });
        });

        // Busca nos documentos
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchInContent(e.target.value);
            });
        }

        // Dark mode é gerenciado por dark-mode.js (gerenciador global)
        // Não gerenciar aqui para evitar conflitos

        // Botões de impressão
        this.printButtons.forEach(button => {
            button.addEventListener('click', () => this.printSection());
        });
    }

    setupNavigation() {
        // Verificar se há hash na URL
        const hash = window.location.hash.substring(1);
        if (hash && this.isValidSection(hash)) {
            this.switchSection(hash);
            this.updateActiveNavForSection(hash);
        }
    }

    isValidSection(sectionId) {
        const validSections = ['politicas-vendas', 'termos-comerciais', 'taxas-comissoes', 'seguranca'];
        return validSections.includes(sectionId);
    }

    switchSection(sectionId) {
        // Esconder todas as seções
        this.legalSections.forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar a seção selecionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Atualizar URL sem recarregar a página
            history.pushState(null, null, `#${sectionId}`);
            
            // Rolar para o topo da seção
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNav(clickedItem) {
        // Remover classe active de todos os itens
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });

        // Adicionar classe active ao item clicado
        clickedItem.classList.add('active');
    }

    updateActiveNavForSection(sectionId) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }

    searchInContent(query) {
        if (!query.trim()) {
            this.clearSearchHighlights();
            return;
        }

        const searchTerm = query.toLowerCase();
        const activeSection = document.querySelector('.legal-section.active');
        
        if (!activeSection) return;

        // Limpar highlights anteriores
        this.clearSearchHighlights(activeSection);

        // Buscar em todo o conteúdo da seção
        const elements = activeSection.querySelectorAll('h3, h4, p, li, td');
        let foundCount = 0;

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                this.highlightText(element, searchTerm);
                foundCount++;
                
                // Se for um elemento pai, rolar para ele
                if (element.tagName === 'H3' || element.tagName === 'H4') {
                    const card = element.closest('.policy-card');
                    if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });

        // Mostrar contador de resultados
        this.showSearchResults(foundCount);
    }

    highlightText(element, searchTerm) {
        const innerHTML = element.innerHTML;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlighted = innerHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
        element.innerHTML = highlighted;
    }

    clearSearchHighlights(section = null) {
        const highlights = section 
            ? section.querySelectorAll('.search-highlight')
            : document.querySelectorAll('.search-highlight');
        
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    showSearchResults(count) {
        // Remover notificação anterior se existir
        const existingNotification = document.querySelector('.search-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        if (count === 0) return;

        const notification = document.createElement('div');
        notification.className = 'search-notification';
        notification.innerHTML = `
            <i class="bi bi-search"></i>
            <span>${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}</span>
        `;

        // Estilos para a notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--seller-blue)',
            color: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '1000',
            animation: 'slideInRight 0.3s ease'
        });

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    toggleDarkMode() {
        // Dark mode é gerenciado por dark-mode.js
        if (window.darkModeManager) {
            window.darkModeManager.toggleDarkMode();
        }
    }

    restoreDarkMode() {
        // Dark mode é restaurado por dark-mode.js na inicialização
    }

    printSection() {
        const activeSection = document.querySelector('.legal-section.active');
        if (!activeSection) return;

        // Criar uma nova janela para impressão
        const printWindow = window.open('', '', 'width=800,height=600');
        const sectionTitle = document.querySelector('.section-title');
        const printContent = activeSection.innerHTML;
        const isDarkMode = document.body.classList.contains('dark-mode');

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>ReUse - Documentação Legal</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        padding: 40px;
                        line-height: 1.6;
                        color: ${isDarkMode ? '#e0e0e0' : '#333'};
                        background-color: ${isDarkMode ? '#121212' : '#ffffff'};
                    }
                    
                    h1, h2, h3, h4, h5, h6 {
                        color: ${isDarkMode ? '#ffffff' : '#000'};
                        margin-top: 1.5rem;
                        margin-bottom: 1rem;
                    }
                    
                    h1 { font-size: 2em; }
                    h2 { font-size: 1.5em; }
                    h3 { font-size: 1.2em; }
                    
                    .policy-card {
                        border: 1px solid ${isDarkMode ? '#333' : '#ddd'};
                        padding: 20px;
                        margin-bottom: 20px;
                        border-radius: 8px;
                        background-color: ${isDarkMode ? '#1e1e1e' : '#fff'};
                        page-break-inside: avoid;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 1.5rem 0;
                    }
                    
                    th, td {
                        border: 1px solid ${isDarkMode ? '#333' : '#ddd'};
                        padding: 12px;
                        text-align: left;
                    }
                    
                    th {
                        background-color: ${isDarkMode ? '#0066cc' : '#f5f5f5'};
                        color: ${isDarkMode ? '#fff' : '#000'};
                        font-weight: 600;
                    }
                    
                    td {
                        background-color: ${isDarkMode ? '#1e1e1e' : '#fff'};
                    }
                    
                    ul, ol {
                        margin: 1rem 0 1rem 2rem;
                    }
                    
                    li {
                        margin-bottom: 0.5rem;
                    }
                    
                    p {
                        margin-bottom: 1rem;
                    }
                    
                    .policy-warning,
                    .policy-note,
                    .alert {
                        padding: 15px;
                        margin: 1.5rem 0;
                        border-left: 4px solid;
                        border-radius: 4px;
                        page-break-inside: avoid;
                    }
                    
                    .policy-warning {
                        border-left-color: #ffa502;
                        background-color: ${isDarkMode ? 'rgba(255, 165, 2, 0.15)' : 'rgba(255, 165, 2, 0.1)'};
                    }
                    
                    .policy-note {
                        border-left-color: #0066cc;
                        background-color: ${isDarkMode ? 'rgba(0, 102, 204, 0.15)' : 'rgba(0, 102, 204, 0.1)'};
                    }
                    
                    .alert {
                        border-left-color: #ff4757;
                        background-color: ${isDarkMode ? 'rgba(255, 71, 87, 0.15)' : 'rgba(255, 71, 87, 0.1)'};
                    }
                    
                    mark {
                        background-color: #ffeb3b;
                        color: #000;
                    }
                    
                    @media print {
                        body {
                            padding: 20px;
                            background-color: #fff;
                            color: #000;
                        }
                        
                        .policy-card {
                            border: 1px solid #ddd;
                            background-color: #fff;
                        }
                        
                        h1, h2, h3, h4, h5, h6 {
                            color: #000;
                        }
                        
                        th {
                            background-color: #f5f5f5;
                            color: #000;
                        }
                        
                        td {
                            background-color: #fff;
                            color: #000;
                        }
                        
                        .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Aguardar o carregamento do conteúdo e depois imprimir
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
                // Não fechar automaticamente para permitir que o usuário verifique antes
            }, 250);
        };
    }

    // Adicionar estilos CSS dinamicamente
    addStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .search-highlight {
                background-color: #ffeb3b;
                color: #000;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: bold;
            }
            
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
            
            .btn-print {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: var(--light-gray-2);
                border: 1px solid var(--light-gray-3);
                border-radius: var(--border-radius-md);
                color: var(--text-medium);
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            
            .btn-print:hover {
                background: var(--seller-blue);
                color: white;
                border-color: var(--seller-blue);
            }
            
            body.dark-mode .btn-print {
                background: var(--light-gray-3);
                border-color: var(--light-gray-4);
            }
        `;
        document.head.appendChild(styles);
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const legalPage = new LegalVendedor();
    window.legalVendedor = legalPage;
});