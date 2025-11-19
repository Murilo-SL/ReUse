// Controle do menu de acessibilidade para daltonismo
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    const accessibilityDropdown = document.getElementById('accessibilityDropdown');
    const resetBtn = document.getElementById('resetAccessibility');
    const accessibilityOptions = document.querySelectorAll('.accessibility-option');
    
    // Alternar visibilidade do menu
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityDropdown.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function() {
        if (accessibilityDropdown) {
            accessibilityDropdown.classList.remove('active');
        }
    });
    
    // Prevenir fechamento ao clicar dentro do menu
    if (accessibilityDropdown) {
        accessibilityDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Aplicar filtro de daltonismo
    accessibilityOptions.forEach(option => {
        option.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            
            // Remover classes anteriores
            document.body.className = document.body.className.replace(/\b(protanopia|protanomalia|deuteranopia|deuteranomalia|tritanopia|tritanomalia|acromatopsia|acromatomalia)\b/g, '');
            
            // Aplicar nova classe
            if (filterType !== 'normal') {
                document.body.classList.add(filterType);
            }
            
            // Atualizar estado ativo
            accessibilityOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Salvar preferência
            localStorage.setItem('colorAccessibility', filterType);
            
            // Fechar menu
            accessibilityDropdown.classList.remove('active');
        });
    });
    
    // Restaurar cores padrão
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            document.body.className = document.body.className.replace(/\b(protanopia|protanomalia|deuteranopia|deuteranomalia|tritanopia|tritanomalia|acromatopsia|acromatomalia)\b/g, '');
            
            // Remover estado ativo
            accessibilityOptions.forEach(opt => opt.classList.remove('active'));
            
            // Restaurar opção normal como ativa
            const normalOption = document.querySelector('.accessibility-option[data-filter="normal"]');
            if (normalOption) {
                normalOption.classList.add('active');
            }
            
            // Remover preferência salva
            localStorage.removeItem('colorAccessibility');
            
            // Fechar menu
            accessibilityDropdown.classList.remove('active');
        });
    }
    
    // Carregar preferência salva
    const savedPreference = localStorage.getItem('colorAccessibility');
    if (savedPreference) {
        document.body.classList.add(savedPreference);
        const savedOption = document.querySelector(`.accessibility-option[data-filter="${savedPreference}"]`);
        if (savedOption) {
            savedOption.classList.add('active');
        }
    } else {
        const normalOption = document.querySelector('.accessibility-option[data-filter="normal"]');
        if (normalOption) {
            normalOption.classList.add('active');
        }
    }
});