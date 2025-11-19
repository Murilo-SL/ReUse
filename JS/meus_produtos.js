        // Controle do menu hamburguer - Versão Corrigida
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.getElementById('menuToggle');
            const menuClose = document.getElementById('menuClose');
            const sidebar = document.getElementById('sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');

            // Função para abrir o menu
            function openMenu() {
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.classList.add('menu-open');
            }

            // Função para fechar o menu
            function closeMenu() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }

            // Alternar menu - Botão Hamburguer
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openMenu();
                });
            }

            // Fechar menu - Botão X
            if (menuClose) {
                menuClose.addEventListener('click', function(e) {
                    e.stopPropagation();
                    closeMenu();
                });
            }

            // Fechar menu ao clicar no overlay
            if (sidebarOverlay) {
                sidebarOverlay.addEventListener('click', function() {
                    closeMenu();
                });
            }

            // Fechar menu ao clicar em um link do menu
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 1080) {
                        closeMenu();
                    }
                });
            });

            // Fechar menu ao redimensionar acima de 1080px
            window.addEventListener('resize', function() {
                if (window.innerWidth > 1080) {
                    closeMenu();
                }
            });

            // Fechar menu ao pressionar ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            });

            // Fechar menu ao clicar fora (em telas maiores)
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 1080 && 
                    sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    e.target !== menuToggle) {
                    closeMenu();
                }
            });

            // Controle do menu de acessibilidade
            const accessibilityBtn = document.getElementById('accessibilityBtn');
            const accessibilityDropdown = document.getElementById('accessibilityDropdown');
            const resetAccessibility = document.getElementById('resetAccessibility');
            const accessibilityOptions = document.querySelectorAll('.accessibility-option');

            if (accessibilityBtn && accessibilityDropdown) {
                accessibilityBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    accessibilityDropdown.classList.toggle('active');
                });

                // Fechar dropdown ao clicar fora
                document.addEventListener('click', function() {
                    accessibilityDropdown.classList.remove('active');
                });

                // Prevenir fechamento ao clicar dentro do dropdown
                accessibilityDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }

            // Aplicar filtros de acessibilidade
            accessibilityOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Remover classes anteriores
                    document.body.classList.remove(
                        'protanopia', 'protanomalia', 'deuteranopia', 'deuteranomalia',
                        'tritanopia', 'tritanomalia', 'acromatopsia', 'acromatomalia'
                    );
                    
                    // Aplicar nova classe
                    if (filter !== 'normal') {
                        document.body.classList.add(filter);
                    }
                    
                    // Marcar opção ativa
                    accessibilityOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Resetar acessibilidade
            if (resetAccessibility) {
                resetAccessibility.addEventListener('click', function() {
                    document.body.classList.remove(
                        'protanopia', 'protanomalia', 'deuteranopia', 'deuteranomalia',
                        'tritanopia', 'tritanomalia', 'acromatopsia', 'acromatomalia'
                    );
                    
                    accessibilityOptions.forEach(opt => opt.classList.remove('active'));
                    document.querySelector('.accessibility-option[data-filter="normal"]').classList.add('active');
                });
            }

            // Controle do modo noturno
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = document.getElementById('themeIcon');

            if (themeToggle && themeIcon) {
                themeToggle.addEventListener('click', function() {
                    document.body.classList.toggle('night-mode');
                    
                    if (document.body.classList.contains('night-mode')) {
                        themeIcon.classList.remove('bi-sun-fill');
                        themeIcon.classList.add('bi-moon-fill');
                    } else {
                        themeIcon.classList.remove('bi-moon-fill');
                        themeIcon.classList.add('bi-sun-fill');
                    }
                });
            }

            // Event listeners para filtros
            const buscarInput = document.getElementById('buscar-produtos');
            const btnBuscar = document.getElementById('btn-buscar');
            const filtroCategoria = document.getElementById('filtro-categoria');
            const filtroStatus = document.getElementById('filtro-status');

            if (buscarInput && btnBuscar) {
                // Busca ao digitar (com debounce)
                let timeoutBusca;
                buscarInput.addEventListener('input', function() {
                    clearTimeout(timeoutBusca);
                    timeoutBusca = setTimeout(function() {
                        if (typeof aplicarFiltros === 'function') {
                            aplicarFiltros();
                        }
                    }, 300);
                });
                
                // Busca ao clicar no botão
                btnBuscar.addEventListener('click', function() {
                    if (typeof aplicarFiltros === 'function') {
                        aplicarFiltros();
                    }
                });
                
                // Busca ao pressionar Enter
                buscarInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        if (typeof aplicarFiltros === 'function') {
                            aplicarFiltros();
                        }
                    }
                });
            }
            
            if (filtroCategoria) {
                filtroCategoria.addEventListener('change', function() {
                    if (typeof aplicarFiltros === 'function') {
                        aplicarFiltros();
                    }
                });
            }
            
            if (filtroStatus) {
                filtroStatus.addEventListener('change', function() {
                    if (typeof aplicarFiltros === 'function') {
                        aplicarFiltros();
                    }
                });
            }

            // Event listeners para modais
            document.querySelectorAll('.close-modal').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });

            // Fechar modais ao clicar fora
            window.addEventListener('click', function(e) {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            });

            // Botão de atualizar
            const btnRefresh = document.getElementById('btn-refresh-produtos');
            if (btnRefresh) {
                btnRefresh.addEventListener('click', function() {
                    this.classList.add('loading');
                    if (typeof carregarProdutos === 'function') {
                        carregarProdutos();
                    }
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 1000);
                });
            }
        });
