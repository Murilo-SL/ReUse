// breadcrumbs-unified.js - Sistema Completo com Segmentação Definida
class UnifiedBreadcrumbs {
  constructor() {
    this.config = {
      maxHistory: 20,
      maxBreadcrumbs: 8,
      resetPages: ['cliente.html', 'vendedor.html', 'ong.html', 'ong-2.html', 'index.html'],
      storageKey: 'unifiedBreadcrumbsHistory',
      enableAnimations: true,
      showIcons: true,
      showContext: true
    };

    // DEFINIÇÃO DAS CATEGORIAS CONFORME SUA SEGMENTAÇÃO
    this.pageCategories = {
      // Página Inicial e Autenticação
      'inicial': [
        'cadastro.html', 'esqueceu_a_senha.html', 'index.html', 'login.html', 'saiba_mais.html'
      ],
      
      // Páginas do Cliente
      'cliente': [
        'carrinho.html', 'categoria.html', 'cliente.html', 'configuracoes_clientes.html',
        'favorito.html', 'finalizar_compra.html', 'pagina_ong_usuario.html',
        'pagina_ong_usuario-2.html', 'pedidos.html', 'perfil.html', 'perfilvendedor.html',
        'produto.html', 'produtos_usuarios_ong.html', 'produtos_usuarios_ong-2.html'
      ],
      
      // Páginas do Vendedor
      'vendedor': [
        'add_produto_v.html', 'avaliacoes.html', 'configuracoes.html', 'doacao.vendedor.html',
        'estatisticas.html', 'lixeira.html', 'meus_produtos.html', 'vendedor.html'
      ],
      
      // Páginas das ONGs
      'ong': [
        'ong.html', 'ong-2.html', 'ong_beneficiarios.html', 'ong_beneficiarios-2.html',
        'ong_configuracoes.html', 'ong_configuracoes-2.html', 'ong_contato.html',
        'ong_contato-2.html', 'ong_doacoes.html', 'ong_doacoes-2.html',
        'ong_doacoes_necessarias.html', 'ong_doacoes_necessarias-2.html',
        'ong_produto.html', 'ong_produto-2.html', 'ong_relatorios.html', 'ong_relatorios-2.html'
      ],
      
      // Páginas Compartilhadas (Rodapé)
      'compartilhadas': [
        'contato.html', 'equipe.html', 'missao.html', 'notificacao.html',
        'privacidade.html', 'pagamento.html'
      ]
    };

    // Mapeamento completo de títulos
    this.pageTitles = {
      // Página Inicial
      'index.html': 'Página Inicial',
      'login.html': 'Login',
      'cadastro.html': 'Cadastro',
      'esqueceu_a_senha.html': 'Recuperar Senha',
      'saiba_mais.html': 'Saiba Mais',

      // Cliente
      'cliente.html': 'Página Inicial',
      'carrinho.html': 'Carrinho de Compras',
      'categoria.html': () => this.getCategoryTitle(),
      'configuracoes_clientes.html': 'Configurações',
      'favorito.html': 'Meus Favoritos',
      'finalizar_compra.html': 'Finalizar Compra',
      'pagina_ong_usuario.html': 'SOS Felino',
      'pagina_ong_usuario-2.html': 'Patas Conscientes',
      'pedidos.html': 'Meus Pedidos',
      'perfil.html': 'Meu Perfil',
      'perfilvendedor.html': 'Perfil do Vendedor',
      'produto.html': () => this.getProductTitle(),
      'produtos_usuarios_ong.html': 'Produtos - SOS Felino',
      'produtos_usuarios_ong-2.html': 'Produtos - Patas Conscientes',

      // Vendedor
      'vendedor.html': 'Painel do Vendedor',
      'add_produto_v.html': 'Adicionar Produto',
      'avaliacoes.html': 'Avaliações',
      'configuracoes.html': 'Configurações',
      'doacao.vendedor.html': 'Fazer Doação',
      'estatisticas.html': 'Estatísticas',
      'lixeira.html': 'Lixeira',
      'meus_produtos.html': 'Meus Produtos',

      // ONGs
      'ong.html': 'Painel - SOS Felino',
      'ong-2.html': 'Painel - Patas Conscientes',
      'ong_beneficiarios.html': 'Beneficiários - SOS Felino',
      'ong_beneficiarios-2.html': 'Beneficiários - Patas Conscientes',
      'ong_configuracoes.html': 'Configurações - SOS Felino',
      'ong_configuracoes-2.html': 'Configurações - Patas Conscientes',
      'ong_contato.html': 'Contato - SOS Felino',
      'ong_contato-2.html': 'Contato - Patas Conscientes',
      'ong_doacoes.html': 'Doações - SOS Felino',
      'ong_doacoes-2.html': 'Doações - Patas Conscientes',
      'ong_doacoes_necessarias.html': 'Doações Necessárias - SOS Felino',
      'ong_doacoes_necessarias-2.html': 'Doações Necessárias - Patas Conscientes',
      'ong_produto.html': 'Produto - SOS Felino',
      'ong_produto-2.html': 'Produto - Patas Conscientes',
      'ong_relatorios.html': 'Relatórios - SOS Felino',
      'ong_relatorios-2.html': 'Relatórios - Patas Conscientes',

      // Compartilhadas
      'contato.html': 'Contato',
      'equipe.html': 'Nossa Equipe',
      'missao.html': 'Nossa Missão',
      'notificacao.html': 'Notificações',
      'privacidade.html': 'Privacidade',
      'pagamento.html': 'Pagamentos'
    };

    // Mapeamento de ícones
    this.pageIcons = {
      // Página Inicial
      'index.html': '<i class="bi bi-house-door"></i> ',
      'login.html': '<i class="bi bi-box-arrow-in-right"></i> ',
      'cadastro.html': '<i class="bi bi-person-plus"></i> ',
      'esqueceu_a_senha.html': '<i class="bi bi-key"></i> ',
      'saiba_mais.html': '<i class="bi bi-info-circle"></i> ',

      // Cliente
      'cliente.html': '<i class="bi bi-house"></i> ',
      'carrinho.html': '<i class="bi bi-cart3"></i> ',
      'categoria.html': '<i class="bi bi-grid-3x3"></i> ',
      'configuracoes_clientes.html': '<i class="bi bi-gear"></i> ',
      'favorito.html': '<i class="bi bi-heart"></i> ',
      'finalizar_compra.html': '<i class="bi bi-credit-card"></i> ',
      'pagina_ong_usuario.html': '<i class="bi bi-buildings"></i> ',
      'pagina_ong_usuario-2.html': '<i class="bi bi-paw"></i> ',
      'pedidos.html': '<i class="bi bi-box-seam"></i> ',
      'perfil.html': '<i class="bi bi-person"></i> ',
      'perfilvendedor.html': '<i class="bi bi-person-badge"></i> ',
      'produto.html': '<i class="bi bi-tag"></i> ',
      'produtos_usuarios_ong.html': '<i class="bi bi-box-seam"></i> ',
      'produtos_usuarios_ong-2.html': '<i class="bi bi-box-seam"></i> ',

      // Vendedor
      'vendedor.html': '<i class="bi bi-person-workspace"></i> ',
      'add_produto_v.html': '<i class="bi bi-plus-circle"></i> ',
      'avaliacoes.html': '<i class="bi bi-star"></i> ',
      'configuracoes.html': '<i class="bi bi-gear"></i> ',
      'doacao.vendedor.html': '<i class="bi bi-gift"></i> ',
      'estatisticas.html': '<i class="bi bi-bar-chart"></i> ',
      'lixeira.html': '<i class="bi bi-trash"></i> ',
      'meus_produtos.html': '<i class="bi bi-box-seam"></i> ',

      // ONGs
      'ong.html': '<i class="bi bi-buildings"></i> ',
      'ong-2.html': '<i class="bi bi-paw"></i> ',
      'ong_beneficiarios.html': '<i class="bi bi-people"></i> ',
      'ong_beneficiarios-2.html': '<i class="bi bi-people"></i> ',
      'ong_configuracoes.html': '<i class="bi bi-gear"></i> ',
      'ong_configuracoes-2.html': '<i class="bi bi-gear"></i> ',
      'ong_contato.html': '<i class="bi bi-telephone"></i> ',
      'ong_contato-2.html': '<i class="bi bi-telephone"></i> ',
      'ong_doacoes.html': '<i class="bi bi-gift"></i> ',
      'ong_doacoes-2.html': '<i class="bi bi-gift"></i> ',
      'ong_doacoes_necessarias.html': '<i class="bi bi-exclamation-circle"></i> ',
      'ong_doacoes_necessarias-2.html': '<i class="bi bi-exclamation-circle"></i> ',
      'ong_produto.html': '<i class="bi bi-box"></i> ',
      'ong_produto-2.html': '<i class="bi bi-box"></i> ',
      'ong_relatorios.html': '<i class="bi bi-clipboard-data"></i> ',
      'ong_relatorios-2.html': '<i class="bi bi-clipboard-data"></i> ',

      // Compartilhadas
      'contato.html': '<i class="bi bi-envelope"></i> ',
      'equipe.html': '<i class="bi bi-people"></i> ',
      'missao.html': '<i class="bi bi-bullseye"></i> ',
      'notificacao.html': '<i class="bi bi-bell"></i> ',
      'privacidade.html': '<i class="bi bi-shield-lock"></i> ',
      'pagamento.html': '<i class="bi bi-credit-card"></i> '
    };

    this.init();
  }

  init() {
    this.loadHistory();
    this.currentPage = this.getCurrentPage();
    this.currentCategory = this.getPageCategory(this.currentPage);
    this.updateHistory();
    this.render();
    this.setupEventListeners();
    
    console.log(`Breadcrumbs Unificado - Página: ${this.currentPage}, Categoria: ${this.currentCategory}`);
  }

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  getPageCategory(page) {
    for (const [category, pages] of Object.entries(this.pageCategories)) {
      if (pages.includes(page)) {
        return category;
      }
    }
    return 'compartilhadas'; // Default para páginas não mapeadas
  }

  getHomePageForCategory() {
    switch (this.currentCategory) {
      case 'inicial': return 'index.html';
      case 'cliente': return 'cliente.html';
      case 'vendedor': return 'vendedor.html';
      case 'ong': 
        // Determina qual ONG baseado na página atual
        return this.currentPage.includes('2.html') ? 'ong-2.html' : 'ong.html';
      case 'compartilhadas':
        // Para páginas compartilhadas, tenta determinar o contexto
        const lastContext = sessionStorage.getItem('lastContext') || 'cliente';
        return this.getHomePageByContext(lastContext);
      default: return 'index.html';
    }
  }

  getHomePageByContext(context) {
    switch (context) {
      case 'vendedor': return 'vendedor.html';
      case 'ong': return 'ong.html';
      default: return 'cliente.html';
    }
  }

  getProductTitle() {
    const titleElement = document.querySelector('.product-title, .produto-detalhes h1, h1');
    return titleElement?.textContent?.trim() || 'Produto';
  }

  getCategoryTitle() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || params.get('cat');
    return category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Categoria';
  }

  loadHistory() {
    try {
      const stored = sessionStorage.getItem(this.config.storageKey);
      this.history = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Erro ao carregar histórico:', error);
      this.history = [];
    }
  }

  saveHistory() {
    try {
      sessionStorage.setItem(this.config.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.warn('Erro ao salvar histórico:', error);
    }
  }

  shouldResetHistory(page) {
    return this.config.resetPages.includes(page);
  }

  updateHistory() {
    const currentPage = this.currentPage;
    
    // Reseta histórico se for uma página de reset
    if (this.shouldResetHistory(currentPage)) {
      this.history = [];
    }

    // Não adiciona duplicatas consecutivas
    const lastItem = this.history[this.history.length - 1];
    if (this.history.length === 0 || (lastItem && lastItem.page !== currentPage)) {
      
      this.history.push({
        page: currentPage,
        title: this.getPageTitle(currentPage),
        url: window.location.href,
        timestamp: Date.now(),
        icon: this.getPageIcon(currentPage),
        category: this.currentCategory
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
    return this.pageIcons[page] || '<i class="bi bi-file-text"></i> ';
  }

  formatTitle(page) {
    return page.replace('.html', '')
               .replace(/_/g, ' ')
               .replace(/(^|\s)\S/g, l => l.toUpperCase());
  }

  getBreadcrumbPath() {
    const currentPage = this.currentPage;
    const homePage = this.getHomePageForCategory();
    
    // Para páginas compartilhadas, mostra apenas a home page do contexto
    if (this.currentCategory === 'compartilhadas') {
      return [{
        page: homePage,
        title: this.getPageTitle(homePage),
        url: this.generateUrl(homePage),
        icon: this.getPageIcon(homePage)
      }];
    }

    // Hierarquias específicas para cada categoria
    const categoryPaths = {
      'cliente': {
        'carrinho.html': ['cliente.html'],
        'categoria.html': ['cliente.html'],
        'configuracoes_clientes.html': ['cliente.html'],
        'favorito.html': ['cliente.html'],
        'finalizar_compra.html': ['cliente.html', 'carrinho.html'],
        'pagina_ong_usuario.html': ['cliente.html'],
        'pagina_ong_usuario-2.html': ['cliente.html'],
        'pedidos.html': ['cliente.html'],
        'perfil.html': ['cliente.html'],
        'perfilvendedor.html': ['cliente.html'],
        'produto.html': ['cliente.html', 'categoria.html'],
        'produtos_usuarios_ong.html': ['cliente.html', 'pagina_ong_usuario.html'],
        'produtos_usuarios_ong-2.html': ['cliente.html', 'pagina_ong_usuario-2.html']
      },
      
      'vendedor': {
        'add_produto_v.html': ['vendedor.html'],
        'avaliacoes.html': ['vendedor.html'],
        'configuracoes.html': ['vendedor.html'],
        'doacao.vendedor.html': ['vendedor.html'],
        'estatisticas.html': ['vendedor.html'],
        'lixeira.html': ['vendedor.html'],
        'meus_produtos.html': ['vendedor.html']
      },
      
      'ong': {
        'ong_beneficiarios.html': ['ong.html'],
        'ong_beneficiarios-2.html': ['ong-2.html'],
        'ong_configuracoes.html': ['ong.html'],
        'ong_configuracoes-2.html': ['ong-2.html'],
        'ong_contato.html': ['ong.html'],
        'ong_contato-2.html': ['ong-2.html'],
        'ong_doacoes.html': ['ong.html'],
        'ong_doacoes-2.html': ['ong-2.html'],
        'ong_doacoes_necessarias.html': ['ong.html'],
        'ong_doacoes_necessarias-2.html': ['ong-2.html'],
        'ong_produto.html': ['ong.html'],
        'ong_produto-2.html': ['ong-2.html'],
        'ong_relatorios.html': ['ong.html'],
        'ong_relatorios-2.html': ['ong-2.html']
      },
      
      'inicial': {
        'login.html': ['index.html'],
        'cadastro.html': ['index.html'],
        'esqueceu_a_senha.html': ['index.html', 'login.html'],
        'saiba_mais.html': ['index.html']
      }
    };

    // Verifica se há um caminho específico definido
    if (categoryPaths[this.currentCategory] && categoryPaths[this.currentCategory][currentPage]) {
      return categoryPaths[this.currentCategory][currentPage].map(page => ({
        page,
        title: this.getPageTitle(page),
        url: this.generateUrl(page),
        icon: this.getPageIcon(page)
      }));
    }

    // Para outras páginas, usa o histórico filtrado por categoria
    return this.history
      .filter(item => item.page !== currentPage && item.category === this.currentCategory)
      .slice(-(this.config.maxBreadcrumbs - 1));
  }

  generateUrl(page) {
    const basePath = window.location.pathname.replace(this.currentPage, '');
    return `${window.location.origin}${basePath}${page}`;
  }

  generateHTML() {
    const path = this.getBreadcrumbPath();
    let html = '<div class="smart-breadcrumbs-inner">';

    // Página inicial da categoria
    const homePage = this.getHomePageForCategory();
    const homeIcon = this.config.showIcons ? this.getPageIcon(homePage) : '';
    const homeTitle = this.getPageTitle(homePage);
    
    html += `<a href="${homePage}" class="breadcrumb-link" data-page="${homePage}">`;
    if (this.config.showIcons) {
      html += `<span class="breadcrumb-icon">${homeIcon}</span>`;
    }
    html += `<span class="breadcrumb-text">${homeTitle}</span>`;
    
    // Indicador de categoria
    if (this.config.showContext && this.currentCategory !== 'compartilhadas') {
      html += `<span class="breadcrumb-context context-${this.currentCategory}">${this.currentCategory}</span>`;
    }
    
    html += `</a>`;

    // Adiciona o caminho
    path.forEach((item) => {
      html += ` <span class="separator">›</span> `;
      html += `<a href="${item.url}" class="breadcrumb-link" data-page="${item.page}">`;
      if (this.config.showIcons) {
        html += `<span class="breadcrumb-icon">${item.icon}</span>`;
      }
      html += `<span class="breadcrumb-text">${item.title}</span>`;
      html += `</a>`;
    });

    // Página atual
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

  addCategoryClass(breadcrumbs) {
    breadcrumbs.classList.add(`context-${this.currentCategory}`);
    
    // Classes específicas para temas visuais
    if (this.currentCategory === 'vendedor') {
      breadcrumbs.classList.add('vendedor-theme');
    } else if (this.currentCategory === 'ong') {
      breadcrumbs.classList.add('ong-theme');
    } else if (this.currentCategory === 'cliente') {
      breadcrumbs.classList.add('cliente-theme');
    } else if (this.currentCategory === 'inicial') {
      breadcrumbs.classList.add('inicial-theme');
    }
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
    breadcrumbs.className = 'smart-breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Navegação estrutural');
    breadcrumbs.setAttribute('role', 'navigation');
    
    // Adiciona classe de categoria
    this.addCategoryClass(breadcrumbs);
    
    // Adiciona conteúdo
    breadcrumbs.innerHTML = this.generateHTML();
    
    // Adiciona barra de progresso
    const progressBar = this.createProgressBar();
    breadcrumbs.appendChild(progressBar);
    
    // Insere no DOM
    this.insertBreadcrumb(container, breadcrumbs);
    
    // Configura interações
    this.setupBreadcrumbInteractions();
    
    // Anima entrada
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
    this.currentCategory = this.getPageCategory(this.currentPage);
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

    // Salva contexto para páginas compartilhadas
    if (this.currentCategory !== 'compartilhadas') {
      sessionStorage.setItem('lastContext', this.currentCategory);
    }

    window.updateUnifiedBreadcrumbs = () => {
      this.updateBreadcrumb();
    };
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

  getCurrentCategory() {
    return this.currentCategory;
  }

  debug() {
    console.log('Breadcrumbs Unificado Debug:');
    console.log('Página:', this.currentPage);
    console.log('Categoria:', this.currentCategory);
    console.log('Home Page:', this.getHomePageForCategory());
    console.log('Histórico:', this.history);
    console.log('Caminho:', this.getBreadcrumbPath());
  }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.unifiedBreadcrumbs = new UnifiedBreadcrumbs();
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.breadcrumbsDebug = () => window.unifiedBreadcrumbs.debug();
    }
  } catch (error) {
    console.error('Erro ao inicializar breadcrumbs unificado:', error);
  }
});

// Suporte para SPAs
if (typeof window !== 'undefined') {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(() => {
      if (window.unifiedBreadcrumbs) {
        window.unifiedBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };

  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(() => {
      if (window.unifiedBreadcrumbs) {
        window.unifiedBreadcrumbs.updateBreadcrumb();
      }
    }, 50);
  };
}

// Fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.unifiedBreadcrumbs = new UnifiedBreadcrumbs();
  });
} else {
  window.unifiedBreadcrumbs = new UnifiedBreadcrumbs();
}