// colorblind-mode.js - Sistema de Acessibilidade para Daltonismo
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    const accessibilityOptions = document.querySelectorAll('.accessibility-option');
    
    // Se não encontrar os elementos, sair
    if (!accessibilityToggle || !accessibilityMenu) return;
    
    // Verificar preferência salva
    const savedColorMode = localStorage.getItem('colorMode') || 'normal';
    
    // Aplicar modo salvo
    applyColorMode(savedColorMode);
    
    // Alternar menu
    accessibilityToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        accessibilityMenu.classList.toggle('active');
        
        // Fechar outros menus abertos
        closeOtherMenus();
    });
    
    // Selecionar opção de acessibilidade
    accessibilityOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            applyColorMode(mode);
            updateActiveOption(mode);
            accessibilityMenu.classList.remove('active');
            
            // Mostrar notificação
            showColorModeNotification(mode);
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!accessibilityMenu.contains(e.target) && !accessibilityToggle.contains(e.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            accessibilityMenu.classList.remove('active');
        }
    });
    
    // Função para aplicar modo de cor
    function applyColorMode(mode) {
        // Remover classes anteriores
        document.body.classList.remove(
            'colorblind-protanopia',
            'colorblind-deuteranopia',
            'colorblind-tritanopia'
        );
        
        // Aplicar nova classe
        if (mode !== 'normal') {
            document.body.classList.add(`colorblind-${mode}`);
        }
        
        // Salvar preferência
        localStorage.setItem('colorMode', mode);
        
        // Atualizar ícone do botão baseado no modo
        updateToggleIcon(mode);
    }
    
    // Função para atualizar opção ativa
    function updateActiveOption(mode) {
        accessibilityOptions.forEach(option => {
            const optionMode = option.getAttribute('data-mode');
            if (optionMode === mode) {
                option.classList.add('active');
                option.querySelector('i').style.opacity = '1';
            } else {
                option.classList.remove('active');
                option.querySelector('i').style.opacity = '0';
            }
        });
    }
    
    // Função para atualizar ícone do botão
    function updateToggleIcon(mode) {
        const icon = accessibilityToggle.querySelector('i');
        
        switch(mode) {
            case 'protanopia':
                icon.className = 'bi bi-eye-fill';
                icon.style.color = '#FF6B6B';
                break;
            case 'deuteranopia':
                icon.className = 'bi bi-eye-fill';
                icon.style.color = '#4ECDC4';
                break;
            case 'tritanopia':
                icon.className = 'bi bi-eye-fill';
                icon.style.color = '#45B7D1';
                break;
            default:
                icon.className = 'bi bi-universal-access';
                icon.style.color = '';
        }
        
        accessibilityToggle.setAttribute('aria-label', 
            mode === 'normal' ? 'Opções de acessibilidade' : `Modo ${mode} ativo - Opções de acessibilidade`
        );
    }
    
    // Função para mostrar notificação
    function showColorModeNotification(mode) {
        // Remover notificação anterior se existir
        const existingIndicator = document.querySelector('.accessibility-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const modeNames = {
            'normal': 'Visão Normal',
            'protanopia': 'Modo Protanopia',
            'deuteranopia': 'Modo Deuteranopia',
            'tritanopia': 'Modo Tritanopia'
        };
        
        const indicator = document.createElement('div');
        indicator.className = 'accessibility-indicator';
        indicator.textContent = `🎨 ${modeNames[mode]}`;
        
        document.body.appendChild(indicator);
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 3000);
    }
    
    // Função para fechar outros menus
    function closeOtherMenus() {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.classList.remove('active');
        }
    }
    
    // Inicializar opção ativa
    updateActiveOption(savedColorMode);
    updateToggleIcon(savedColorMode);
    
    // Adicionar suporte para atalhos de teclado
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + A para abrir menu de acessibilidade
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            e.preventDefault();
            accessibilityMenu.classList.toggle('active');
        }
        
        // Ctrl + Alt + 1-4 para selecionar modos rapidamente
        if (e.ctrlKey && e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    applyColorMode('normal');
                    updateActiveOption('normal');
                    showColorModeNotification('normal');
                    break;
                case '2':
                    e.preventDefault();
                    applyColorMode('protanopia');
                    updateActiveOption('protanopia');
                    showColorModeNotification('protanopia');
                    break;
                case '3':
                    e.preventDefault();
                    applyColorMode('deuteranopia');
                    updateActiveOption('deuteranopia');
                    showColorModeNotification('deuteranopia');
                    break;
                case '4':
                    e.preventDefault();
                    applyColorMode('tritanopia');
                    updateActiveOption('tritanopia');
                    showColorModeNotification('tritanopia');
                    break;
            }
        }
    });
    
    // Adicionar informações de acessibilidade para leitores de tela
    accessibilityToggle.setAttribute('role', 'button');
    accessibilityToggle.setAttribute('aria-haspopup', 'true');
    accessibilityToggle.setAttribute('aria-expanded', 'false');
    
    accessibilityToggle.addEventListener('click', function() {
        const isExpanded = accessibilityMenu.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    console.log('Sistema de acessibilidade para daltonismo inicializado');
});

// Integração com o sistema de modo noturno existente
window.addEventListener('themeChanged', function() {
    // Reaplicar o modo de cor quando o tema mudar
    const currentColorMode = localStorage.getItem('colorMode') || 'normal';
    document.body.classList.remove(
        'colorblind-protanopia',
        'colorblind-deuteranopia',
        'colorblind-tritanopia'
    );
    
    if (currentColorMode !== 'normal') {
        setTimeout(() => {
            document.body.classList.add(`colorblind-${currentColorMode}`);
        }, 100);
    }
});