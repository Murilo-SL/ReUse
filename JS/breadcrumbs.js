// breadcrumbs.js - Sistema Completo de Navegação com Design Aprimorado
class SmartBreadcrumbs {
  constructor() {
    this.config = {
      maxHistory: 15,
      maxBreadcrumbs: 6,
      resetPages: ['cliente.html', 'vendedor.html', 'ong.html', 'ong-2.html'],
      storageKey: 'unifiedBreadcrumbsHistory',
      enableAnimations: true,
      showIcons: true
    };

    // Mapeamento completo de todas as páginas
    this.pageTitles = {
      // Páginas gerais
      'cliente.html': 'Página Inicial',
      'Login.html': 'Login',
      'cadastro.html': 'Cadastro',

      // Páginas de produtos
      'produto.html': () => this.getProductTitle(),
      'categoria.html': () => this.getCategoryTitle(),

      // Páginas de vendedor
      'vendedor.html': 'Painel do Vendedor',
      'cadastro_produto.html': 'Cadastrar Produto',
      'estatisticas.html': 'Estatísticas',
      'avaliacoes.html': 'Avaliações',

      // Páginas de ONG
      'ong.html': 'Painel da ONG',
      'ong_produto.html': () => this.getProductTitle(),
      'adicionar_produto_ong.html': 'Adicionar Produto',
      'todas_doacoes.html': 'Histórico de Doações',
      'doacao_espesifico.html': 'Doação Específica',
      'Produtos_Usuario_ONG.html': 'Produtos da ONG',

      // Páginas Patas Conscientes
      'ong-2.html': 'Página Inicial',
      'PatasConcientes_Produtos_Clientes.html': 'Produtos Patas Conscientes',
      'todas_adocoes.html': 'Animais para Adoção'
    };

    // Mapeamento de ícones para páginas
    this.pageIcons = {
      // Páginas gerais
      'cliente.html': '🏠',
      'Login.html': '🔐',
      'cadastro.html': '📝',

      // Páginas de produtos
      'produto.html': '📦',
      'categoria.html': '📁',
      'ong_produto.html': '📦',

      // Páginas de vendedor
      'vendedor.html': '👨‍💼',
      'cadastro_produto.html': '➕',
      'estatisticas.html': '📊',
      'avaliacoes.html': '⭐',

      // Páginas de ONG
      'ong.html': '🤝',
      'adicionar_produto_ong.html': '➕',
      'todas_doacoes.html': '📋',
      'doacao_espesifico.html': '❤️',
      'Produtos_Usuario_ONG.html': '📦',

      // Páginas Patas Conscientes
      'ong-2.html': '🐾',
      'PatasConcientes_Produtos_Clientes.html': '🛍️',
      'todas_adocoes.html': '🐕'
    };

    this.init();
  }

  init() {
    this.loadHistory();
    this.currentPage = this.getCurrentPage();
    this.updateHistory();
    this.render();
    this.setupEventListeners();
    this.setupIntersectionObserver();
  }

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  getProductTitle() {
    const titleElement = document.querySelector('.product-title, .produto-detalhes h1, h1');
    return titleElement?.textContent?.trim() || 'Produto';
  }

  getCategoryTitle() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    return category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Categoria';
  }

  loadHistory() {
    try {
      this.history = JSON.parse(sessionStorage.getItem(this.config.storageKey)) || [];
    } catch (error) {
      console.warn('Erro ao carregar histórico do breadcrumb:', error);
      this.history = [];
    }
  }

  saveHistory() {
    try {
      sessionStorage.setItem(this.config.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.warn('Erro ao salvar histórico do breadcrumb:', error);
    }
  }

  shouldResetHistory(page) {
    return this.config.resetPages.includes(page);
  }

  updateHistory() {
    if (this.shouldResetHistory(this.currentPage)) {
      this.history = [];
    }

    // Não adiciona duplicatas consecutivas
    const lastItem = this.history[this.history.length - 1];
    if (this.history.length === 0 || 
        (lastItem && lastItem.page !== this.currentPage)) {
      
      this.history.push({
        page: this.currentPage,
        title: this.getPageTitle(this.currentPage),
        url: window.location.href,
        timestamp: Date.now(),
        icon: this.getPageIcon(this.currentPage)
      });

      // Mantém histórico dentro do limite
      if (this.history.length > this.config.maxHistory) {
        this.history.shift();
      }

      this.saveHistory();
    }
  }

  getPageTitle(page) {
    if (this.pageTitles[page]) {
      return typeof this.pageTitles[page] === 'function' 
        ? this.pageTitles[page]() 
        : this.pageTitles[page];
    }
    return this.formatTitle(page);
  }

  getPageIcon(page) {
    return this.pageIcons[page] || '📄';
  }

  formatTitle(page) {
    return page.replace('.html', '')
               .replace(/_/g, ' ')
               .replace(/(^|\s)\S/g, l => l.toUpperCase());
  }

  getBreadcrumbPath() {
    // Páginas especiais com hierarquia definida
    const specialPaths = {
      'doacao_espesifico.html': ['ong.html', 'Produtos_Usuario_ONG.html'],
      'PatasConcientes_Produtos_Clientes.html': ['ong-2.html'],
      'todas_adocoes.html': ['ong-2.html'],
      'cadastro_produto.html': ['vendedor.html'],
      'estatisticas.html': ['vendedor.html'],
      'avaliacoes.html': ['vendedor.html']
    };

    if (specialPaths[this.currentPage]) {
      return specialPaths[this.currentPage].map(page => ({
        page,
        title: this.getPageTitle(page),
        url: this.generateUrl(page),
        icon: this.getPageIcon(page)
      }));
    }

    // Para outras páginas, usa o histórico
    return this.history
      .filter(item => item.page !== this.currentPage)
      .slice(-(this.config.maxBreadcrumbs - 1));
  }

  generateUrl(page) {
    // Gera URL relativa para a página
    return `${window.location.origin}${window.location.pathname.replace(this.currentPage, '')}${page}`;
  }

  generateHTML() {
    const path = this.getBreadcrumbPath();
    let html = '<div class="smart-breadcrumbs-inner">';

    // Determina a página inicial correta
    const homePage = this.determineHomePage();
    const homeIcon = this.config.showIcons ? this.getPageIcon(homePage) : '';
    const homeTitle = this.getPageTitle(homePage);
    
    html += `<a href="${homePage}" class="breadcrumb-link" data-page="${homePage}">`;
    if (this.config.showIcons) {
      html += `<span class="breadcrumb-icon">${homeIcon}</span>`;
    }
    html += `<span class="breadcrumb-text">${homeTitle}</span>`;
    html += `</a>`;

    // Adiciona o caminho
    path.forEach((item, index) => {
      html += ` <span class="separator">›</span> `;
      html += `<a href="${item.url}" class="breadcrumb-link" data-page="${item.page}">`;
      if (this.config.showIcons) {
        html += `<span class="breadcrumb-icon">${item.icon}</span>`;
      }
      html += `<span class="breadcrumb-text">${item.title}</span>`;
      html += `</a>`;
    });

    // Adiciona página atual
    const currentIcon = this.config.showIcons ? this.getPageIcon(this.currentPage) : '';
    html += ` <span class="separator">›</span> `;
    html += `<span class="current-page" data-page="${this.currentPage}">`;
    if (this.config.showIcons) {
      html += `<span class="breadcrumb-icon">${currentIcon}</span>`;
    }
    html += `<span class="breadcrumb-text">${this.getPageTitle(this.currentPage)}</span>`;
    html += `</span>`;

    html += '</div>';
    return html;
  }

  determineHomePage() {
    if (this.currentPage.includes('ong') || this.currentPage.includes('ONG')) {
      return this.currentPage.includes('Patas') ? 'ong-2.html' : 'ong.html';
    }
    if (this.currentPage.includes('vendedor') || this.currentPage.includes('Vendedor')) {
      return 'vendedor.html';
    }
    return 'cliente.html';
  }

  calculateProgress() {
    const path = this.getBreadcrumbPath();
    const totalSteps = path.length + 1; // +1 para a página atual
    const currentStep = path.length; // A página atual é o último passo
    return Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'breadcrumb-progress';
    
    // Adiciona animação suave para a barra de progresso
    setTimeout(() => {
      progressBar.style.width = this.calculateProgress() + '%';
    }, 100);
    
    return progressBar;
  }

  addThemeClass(breadcrumbs) {
    if (this.currentPage.includes('ong') || this.currentPage.includes('ONG')) {
      breadcrumbs.classList.add('ong-theme');
    } else if (this.currentPage.includes('patas') || this.currentPage.includes('Patas')) {
      breadcrumbs.classList.add('patas-theme');
    } else if (this.currentPage.includes('vendedor') || this.currentPage.includes('Vendedor')) {
      breadcrumbs.classList.add('vendedor-theme');
    }
  }

  setupBreadcrumbInteractions() {
    const breadcrumbLinks = document.querySelectorAll('.smart-breadcrumbs .breadcrumb-link');
    
    breadcrumbLinks.forEach(link => {
      // Efeito de hover com delay
      link.addEventListener('mouseenter', () => {
        if (this.config.enableAnimations) {
          link.style.transform = 'translateY(-2px)';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        if (this.config.enableAnimations) {
          link.style.transform = 'translateY(0)';
        }
      });

      // Prevenir clique rápido duplicado
      link.addEventListener('click', (e) => {
        if (link.classList.contains('clicked')) {
          e.preventDefault();
          return;
        }
        
        link.classList.add('clicked');
        setTimeout(() => {
          link.classList.remove('clicked');
        }, 1000);
      });
    });
  }

  setupIntersectionObserver() {
    // Observa quando o breadcrumb entra/sai da viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        } else {
          entry.target.classList.remove('in-viewport');
        }
      });
    }, { threshold: 0.1 });

    // Aplica o observer após a renderização
    setTimeout(() => {
      const breadcrumbs = document.querySelector('.smart-breadcrumbs');
      if (breadcrumbs) {
        observer.observe(breadcrumbs);
      }
    }, 500);
  }

  render() {
    const container = document.querySelector('.breadcrumbs-container') || 
                     document.querySelector('main') || 
                     document.querySelector('.content-container') ||
                     document.querySelector('.container') ||
                     document.body;

    // Remove breadcrumbs existentes
    const existing = container.querySelector('.smart-breadcrumbs');
    if (existing) existing.remove();

    // Cria novo breadcrumb com estrutura aprimorada
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'smart-breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Navegação estrutural');
    breadcrumbs.setAttribute('role', 'navigation');
    
    // Adiciona classe de tema
    this.addThemeClass(breadcrumbs);
    
    // Adiciona conteúdo
    breadcrumbs.innerHTML = this.generateHTML();
    
    // Adiciona barra de progresso
    const progressBar = this.createProgressBar();
    breadcrumbs.appendChild(progressBar);
    
    // Insere no DOM
    this.insertBreadcrumb(container, breadcrumbs);
    
    // Configura interações
    this.setupBreadcrumbInteractions();
    
    // Anima entrada se habilitado
    if (this.config.enableAnimations) {
      this.animateBreadcrumbEntry(breadcrumbs);
    }
  }

  insertBreadcrumb(container, breadcrumbs) {
    if (container === document.body) {
      const firstChild = container.firstChild;
      if (firstChild) {
        container.insertBefore(breadcrumbs, firstChild);
      } else {
        container.appendChild(breadcrumbs);
      }
    } else {
      // Tenta inserir após o header ou no topo do container
      const header = container.querySelector('header');
      if (header) {
        header.after(breadcrumbs);
      } else {
        container.prepend(breadcrumbs);
      }
    }
  }

  animateBreadcrumbEntry(breadcrumbs) {
    breadcrumbs.style.opacity = '0';
    breadcrumbs.style.transform = 'translateY(-20px)';
    
    requestAnimationFrame(() => {
      breadcrumbs.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      breadcrumbs.style.opacity = '1';
      breadcrumbs.style.transform = 'translateY(0)';
    });
  }

  updateBreadcrumb() {
    this.currentPage = this.getCurrentPage();
    this.updateHistory();
    this.render();
  }

  setupEventListeners() {
    // Atualiza breadcrumb antes de sair da página
    window.addEventListener('beforeunload', () => {
      this.updateHistory();
    });

    // Atualiza breadcrumb quando o histórico muda (navegação SPA)
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.updateBreadcrumb();
      }, 100);
    });

    // Observa mudanças no título da página
    this.setupTitleObserver();

    // Adiciona suporte para atualização manual
    window.updateBreadcrumbs = () => {
      this.updateBreadcrumb();
    };
  }

  setupTitleObserver() {
    // Observa mudanças no título da página para atualizar dinamicamente
    const titleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const currentPageElement = document.querySelector('.smart-breadcrumbs .current-page .breadcrumb-text');
          if (currentPageElement) {
            const newTitle = this.getPageTitle(this.currentPage);
            if (currentPageElement.textContent !== newTitle) {
              currentPageElement.textContent = newTitle;
            }
          }
        }
      });
    });

    // Inicia a observação quando o DOM estiver pronto
    if (document.title) {
      titleObserver.observe(document.querySelector('title'), {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  // Métodos públicos para controle externo
  setConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.render();
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.render();
  }

  // Debug helper
  debug() {
    console.log('Breadcrumbs Debug:');
    console.log('Current Page:', this.currentPage);
    console.log('History:', this.history);
    console.log('Breadcrumb Path:', this.getBreadcrumbPath());
    console.log('Progress:', this.calculateProgress() + '%');
  }
}

// Inicialização automática com tratamento de erro
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Aguarda um frame para garantir que o DOM esteja completamente pronto
    requestAnimationFrame(() => {
      window.smartBreadcrumbs = new SmartBreadcrumbs();
      
      // Expose para debug (apenas em desenvolvimento)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.breadcrumbsDebug = () => window.smartBreadcrumbs.debug();
      }
    });
  } catch (error) {
    console.error('Erro ao inicializar breadcrumbs:', error);
  }
});

// Suporte para Single Page Applications (SPA)
if (typeof window !== 'undefined') {
  // Detecta navegação SPA (se aplicável)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(() => {
      if (window.smartBreadcrumbs) {
        window.smartBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(() => {
      if (window.smartBreadcrumbs) {
        window.smartBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };
}

// Fallback para casos onde DOMContentLoaded já ocorreu
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.smartBreadcrumbs = new SmartBreadcrumbs();
  });
} else {
  window.smartBreadcrumbs = new SmartBreadcrumbs();
}