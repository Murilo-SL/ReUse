// colorblind-mode.js - Sistema de Acessibilidade para Daltonismo Expandido
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
    
    // Função para mapear nomes dos modos
    function getModeName(mode) {
        const modeNames = {
            'normal': 'Visão Normal',
            'protanopia': 'Modo Protanopia',
            'protanomalia': 'Modo Protanomalia',
            'deuteranopia': 'Modo Deuteranopia',
            'deuteranomalia': 'Modo Deuteranomalia',
            'tritanopia': 'Modo Tritanopia',
            'tritanomalia': 'Modo Tritanomalia',
            'acromatomia': 'Modo Acromatomia',
            'acromatopsia': 'Modo Acromatopsia'
        };
        return modeNames[mode] || mode;
    }
    
    // Função para aplicar modo de cor
    function applyColorMode(mode) {
        // Remover classes anteriores
        document.body.classList.remove(
            'colorblind-protanopia',
            'colorblind-protanomalia',
            'colorblind-deuteranopia',
            'colorblind-deuteranomalia',
            'colorblind-tritanopia',
            'colorblind-tritanomalia',
            'colorblind-acromatomia',
            'colorblind-acromatopsia'
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
        
        const iconConfig = {
            'protanopia': { className: 'bi bi-eye-fill', color: '#FF6B6B' },
            'protanomalia': { className: 'bi bi-eye-fill', color: '#FF8E8E' },
            'deuteranopia': { className: 'bi bi-eye-fill', color: '#4ECDC4' },
            'deuteranomalia': { className: 'bi bi-eye-fill', color: '#6ED9D2' },
            'tritanopia': { className: 'bi bi-eye-fill', color: '#45B7D1' },
            'tritanomalia': { className: 'bi bi-eye-fill', color: '#67C7E0' },
            'acromatomia': { className: 'bi bi-eye-fill', color: '#666666' },
            'acromatopsia': { className: 'bi bi-eye-fill', color: '#333333' }
        };
        
        if (iconConfig[mode]) {
            icon.className = iconConfig[mode].className;
            icon.style.color = iconConfig[mode].color;
        } else {
            icon.className = 'bi bi-universal-access';
            icon.style.color = '';
        }
        
        accessibilityToggle.setAttribute('aria-label', 
            mode === 'normal' ? 'Opções de acessibilidade' : `${getModeName(mode)} ativo - Opções de acessibilidade`
        );
    }
    
    // Função para mostrar notificação
    function showColorModeNotification(mode) {
        // Remover notificação anterior se existir
        const existingIndicator = document.querySelector('.accessibility-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        const indicator = document.createElement('div');
        indicator.className = 'accessibility-indicator';
        indicator.textContent = `🎨 ${getModeName(mode)}`;
        
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
        
        // Ctrl + Alt + 1-9 para selecionar modos rapidamente
        if (e.ctrlKey && e.altKey) {
            const modeMap = {
                '1': 'normal',
                '2': 'protanopia',
                '3': 'protanomalia',
                '4': 'deuteranopia',
                '5': 'deuteranomalia',
                '6': 'tritanopia',
                '7': 'tritanomalia',
                '8': 'acromatomia',
                '9': 'acromatopsia'
            };
            
            if (modeMap[e.key]) {
                e.preventDefault();
                const mode = modeMap[e.key];
                applyColorMode(mode);
                updateActiveOption(mode);
                showColorModeNotification(mode);
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
    
    // Adicionar navegação por teclado no menu
    accessibilityMenu.addEventListener('keydown', function(e) {
        const options = Array.from(this.querySelectorAll('.accessibility-option'));
        const currentIndex = options.indexOf(document.activeElement);
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % options.length;
                options[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + options.length) % options.length;
                options[prevIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                options[0].focus();
                break;
            case 'End':
                e.preventDefault();
                options[options.length - 1].focus();
                break;
            case 'Escape':
                e.preventDefault();
                accessibilityMenu.classList.remove('active');
                accessibilityToggle.focus();
                break;
        }
    });
    
    console.log('Sistema de acessibilidade para daltonismo expandido inicializado');
});

// Integração com o sistema de modo noturno existente
window.addEventListener('themeChanged', function() {
    // Reaplicar o modo de cor quando o tema mudar
    const currentColorMode = localStorage.getItem('colorMode') || 'normal';
    document.body.classList.remove(
        'colorblind-protanopia',
        'colorblind-protanomalia',
        'colorblind-deuteranopia',
        'colorblind-deuteranomalia',
        'colorblind-tritanopia',
        'colorblind-tritanomalia',
        'colorblind-acromatomia',
        'colorblind-acromatopsia'
    );
    
    if (currentColorMode !== 'normal') {
        setTimeout(() => {
            document.body.classList.add(`colorblind-${currentColorMode}`);
        }, 100);
    }
});

// Sistema de detecção automática de preferências do usuário
if (window.matchMedia) {
    // Detectar preferência de modo escuro do sistema
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Detectar preferência de contraste do sistema
    const highContrastMediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    // Detectar preferência de redução de movimento
    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Aplicar redução de movimento se preferido
    reducedMotionMediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    });
    
    // Verificar inicialmente
    if (reducedMotionMediaQuery.matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // Sugerir modos de alto contraste para usuários com preferência de alto contraste
    highContrastMediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            const currentMode = localStorage.getItem('colorMode');
            if (currentMode === 'normal') {
                // Sugerir acromatopsia para usuários de alto contraste
                showHighContrastSuggestion();
            }
        }
    });
}

// Função para sugerir modo de alto contraste
function showHighContrastSuggestion() {
    // Verificar se já mostramos a sugestão recentemente
    const lastSuggestion = localStorage.getItem('highContrastSuggestion');
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    if (!lastSuggestion || (now - parseInt(lastSuggestion)) > oneWeek) {
        setTimeout(() => {
            const suggestion = document.createElement('div');
            suggestion.className = 'accessibility-suggestion';
            suggestion.innerHTML = `
                <div class="suggestion-content">
                    <h4>💡 Sugestão de Acessibilidade</h4>
                    <p>Detectamos que você prefere alto contraste. Gostaria de experimentar o modo Acromatopsia?</p>
                    <div class="suggestion-buttons">
                        <button class="suggestion-btn primary" onclick="applyColorMode('acromatopsia')">Experimentar</button>
                        <button class="suggestion-btn secondary" onclick="this.parentElement.parentElement.parentElement.remove()">Agora não</button>
                    </div>
                </div>
            `;
            
            // Adicionar estilos para a sugestão
            if (!document.querySelector('.accessibility-suggestion')) {
                document.body.appendChild(suggestion);
                localStorage.setItem('highContrastSuggestion', now.toString());
            }
        }, 3000);
    }
}

// Adicionar estilos CSS para a sugestão dinamicamente
const suggestionStyles = `
.accessibility-suggestion {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #0066cc, #00cc99);
    color: white;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 400px;
    animation: slideInUp 0.5s ease;
}

.suggestion-content h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
}

.suggestion-content p {
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    opacity: 0.9;
}

.suggestion-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.suggestion-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.suggestion-btn.primary {
    background: white;
    color: #0066cc;
}

.suggestion-btn.secondary {
    background: transparent;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.suggestion-btn:hover {
    transform: translateY(-1px);
}

body.reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

@keyframes slideInUp {
    from {
        transform: translateX(-50%) translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}
`;

// Injetar estilos da sugestão
const styleSheet = document.createElement('style');
styleSheet.textContent = suggestionStyles;
document.head.appendChild(styleSheet);

// Exportar funções para uso global (se necessário)
window.applyColorMode = applyColorMode;
window.showColorModeNotification = showColorModeNotification;