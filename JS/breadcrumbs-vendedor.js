// breadcrumbs-vendedor.js - Versão Aprimorada com Base no Sistema Unificado
class VendedorBreadcrumbs {
  constructor() {
    this.config = {
      maxHistory: 15,
      maxBreadcrumbs: 6,
      resetPages: ['vendedor.html'],
      storageKey: 'vendedorBreadcrumbsHistory',
      enableAnimations: true,
      showIcons: true
    };

    // Mapeamento completo de páginas do vendedor
    this.pageTitles = {
      // Páginas principais
      'vendedor.html': 'Painel do Vendedor',

      // Páginas de produtos
      'meus_produtos.html': () => this.getProductTitle(),
      'add_produto_v.html': 'Meus Produtos',

      
      // Páginas de análise
      'estatisticas.html': 'Estatísticas de Vendas',
      'avaliacoes.html': 'Avaliações dos Clientes',
      
      // Páginas de perfil
      'configuracoes.html': 'Configurações'
    };

    // Mapeamento de ícones para páginas do vendedor
    this.pageIcons = {
      'vendedor.html': '<i class="bi bi-person-workspace"></i> ',
      'add_produto_v.html': '<i class="bi bi-plus-circle-dotted"></i> ',
      'meus_produtos.html': '<i class="bi bi-box-seam"></i> ',
      'estatisticas.html': '<i class="bi bi-clipboard-data"></i> ',
      'avaliacoes.html': '<i class="bi bi-stars"></i> ',
      'configuracoes.html': '<i class="bi bi-gear"></i> ',
      'doacao.vendedor.html': '<i class="bi bi-box2-heart"></i> ',
      'lixeira.html': '<i class="bi bi-trash3"></i> ',
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
    return window.location.pathname.split('/').pop() || 'vendedor.html';
  }

  getProductTitle() {
    const titleElement = document.querySelector('.product-title, .produto-detalhes h1, h1');
    return titleElement?.textContent?.trim() || 'Produto';
  }

  loadHistory() {
    try {
      this.history = JSON.parse(sessionStorage.getItem(this.config.storageKey)) || [];
    } catch (error) {
      console.warn('Erro ao carregar histórico do vendedor:', error);
      this.history = [];
    }
  }

  saveHistory() {
    try {
      sessionStorage.setItem(this.config.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.warn('Erro ao salvar histórico do vendedor:', error);
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
    // Hierarquia específica para páginas do vendedor
    const vendedorPaths = {
      'produto.html': ['vendedor.html', 'Produtos_Cadastrados.html'],
      'estatisticas.html': ['vendedor.html'],
      'avaliacoes.html': ['vendedor.html'],
      'configuracoes.html': ['vendedor.html']
    };

    if (vendedorPaths[this.currentPage]) {
      return vendedorPaths[this.currentPage].map(page => ({
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
    return `${window.location.origin}${window.location.pathname.replace(this.currentPage, '')}${page}`;
  }

  generateHTML() {
    const path = this.getBreadcrumbPath();
    let html = '<div class="smart-breadcrumbs-inner">';

    // Página inicial do vendedor
    const homePage = 'vendedor.html';
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

  calculateProgress() {
    const path = this.getBreadcrumbPath();
    const totalSteps = path.length + 1;
    const currentStep = path.length;
    return Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'breadcrumb-progress';
    
    setTimeout(() => {
      progressBar.style.width = this.calculateProgress() + '%';
    }, 100);
    
    return progressBar;
  }

  setupBreadcrumbInteractions() {
    const breadcrumbLinks = document.querySelectorAll('.smart-breadcrumbs .breadcrumb-link');
    
    breadcrumbLinks.forEach(link => {
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        } else {
          entry.target.classList.remove('in-viewport');
        }
      });
    }, { threshold: 0.1 });

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

    // Cria novo breadcrumb
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'smart-breadcrumbs vendedor-theme';
    breadcrumbs.setAttribute('aria-label', 'Navegação do Vendedor');
    breadcrumbs.setAttribute('role', 'navigation');
    
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
    window.addEventListener('beforeunload', () => {
      this.updateHistory();
    });

    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.updateBreadcrumb();
      }, 100);
    });

    this.setupTitleObserver();

    window.updateVendedorBreadcrumbs = () => {
      this.updateBreadcrumb();
    };
  }

  setupTitleObserver() {
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

    if (document.title) {
      titleObserver.observe(document.querySelector('title'), {
        childList: true,
        characterData: true,
        subtree: true
      });
    }
  }

  // Métodos públicos
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

  debug() {
    console.log('Vendedor Breadcrumbs Debug:');
    console.log('Current Page:', this.currentPage);
    console.log('History:', this.history);
    console.log('Breadcrumb Path:', this.getBreadcrumbPath());
    console.log('Progress:', this.calculateProgress() + '%');
  }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
  try {
    requestAnimationFrame(() => {
      window.vendedorBreadcrumbs = new VendedorBreadcrumbs();
      
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.vendedorBreadcrumbsDebug = () => window.vendedorBreadcrumbs.debug();
      }
    });
  } catch (error) {
    console.error('Erro ao inicializar breadcrumbs do vendedor:', error);
  }
});

// Suporte para SPAs
if (typeof window !== 'undefined') {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(() => {
      if (window.vendedorBreadcrumbs) {
        window.vendedorBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(() => {
      if (window.vendedorBreadcrumbs) {
        window.vendedorBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };
}

// Fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.vendedorBreadcrumbs = new VendedorBreadcrumbs();
  });
} else {
  window.vendedorBreadcrumbs = new VendedorBreadcrumbs();
}