// ong-configuracoes.js - Gerenciamento da página de configurações da ONG

class OngConfiguracoes {
    constructor() {
        this.NOTIFICATION_DURATION = 3000;
        this.init();
    }

    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.restoreDarkMode();
        this.loadConfigData();
        this.setupPasswordValidation();
        this.setupGlobalEventListeners();
    }

    initializeComponents() {
        // Elementos principais
        this.darkModeBtn = document.getElementById('darkModeBtn');
        this.colorblindBtn = document.getElementById('colorblindBtn');
        
        // Modals
        this.logoutModal = document.getElementById('logoutModal');
        this.successModal = document.getElementById('successModal');
        this.closeModal = document.getElementById('closeModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogoutBtn = document.getElementById('confirmLogout');
        this.closeSuccessModal = document.getElementById('closeSuccessModal');
        this.okSuccessBtn = document.getElementById('okSuccessBtn');

        // Botões principais
        this.salvarBtn = document.getElementById('salvarBtn');
        this.cancelarBtn = document.getElementById('cancelarBtn');
        this.alterarSenhaBtn = document.getElementById('alterarSenhaBtn');
        this.buscarCoordenadas = document.getElementById('buscarCoordenadas');
        this.addZonaBtn = document.getElementById('addZonaBtn');

        // Elementos de validação de senha
        this.senhaAtual = document.getElementById('senhaAtual');
        this.novaSenha = document.getElementById('novaSenha');
        this.confirmarSenha = document.getElementById('confirmarSenha');
        this.reqLength = document.getElementById('reqLength');
        this.reqNumber = document.getElementById('reqNumber');
        this.reqUpper = document.getElementById('reqUpper');
        this.reqSpecial = document.getElementById('reqSpecial');

        // Estado
        this.isDarkMode = localStorage.getItem('reuse_dark_mode') === 'true';
        this.configData = {};
    }

    setupEventListeners() {
        // Modo noturno
        if (this.darkModeBtn) {
            this.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
        }

        // Botões principais
        if (this.salvarBtn) {
            this.salvarBtn.addEventListener('click', () => this.salvarConfiguracoes());
        }

        if (this.cancelarBtn) {
            this.cancelarBtn.addEventListener('click', () => this.cancelarEdicao());
        }

        if (this.alterarSenhaBtn) {
            this.alterarSenhaBtn.addEventListener('click', () => this.alterarSenha());
        }

        if (this.buscarCoordenadas) {
            this.buscarCoordenadas.addEventListener('click', () => this.buscarCoordenadasPorCep());
        }

        if (this.addZonaBtn) {
            this.addZonaBtn.addEventListener('click', () => this.adicionarZonaColeta());
        }

        // Logout modal
        if (this.closeModal) {
            this.closeModal.addEventListener('click', () => this.closeLogoutModal());
        }

        if (this.cancelLogout) {
            this.cancelLogout.addEventListener('click', () => this.closeLogoutModal());
        }

        if (this.confirmLogoutBtn) {
            this.confirmLogoutBtn.addEventListener('click', () => this.performLogout());
        }

        // Success modal
        if (this.closeSuccessModal) {
            this.closeSuccessModal.addEventListener('click', () => this.closeSuccessModal());
        }

        if (this.okSuccessBtn) {
            this.okSuccessBtn.addEventListener('click', () => this.closeSuccessModal());
        }

        // Fechar modais ao clicar fora
        if (this.logoutModal) {
            this.logoutModal.addEventListener('click', (e) => {
                if (e.target === this.logoutModal) {
                    this.closeLogoutModal();
                }
            });
        }

        if (this.successModal) {
            this.successModal.addEventListener('click', (e) => {
                if (e.target === this.successModal) {
                    this.closeSuccessModal();
                }
            });
        }

        // Validação de senha em tempo real
        if (this.novaSenha) {
            this.novaSenha.addEventListener('input', () => this.validatePassword());
        }

        // Tema automático
        const temaSelect = document.getElementById('temaInterface');
        if (temaSelect) {
            temaSelect.addEventListener('change', (e) => this.changeTheme(e.target.value));
        }

        // Fonte maior
        const fonteMaior = document.getElementById('fonteMaior');
        if (fonteMaior) {
            fonteMaior.addEventListener('change', (e) => this.toggleFonteMaior(e.target.checked));
        }
    }

    setupGlobalEventListeners() {
        document.addEventListener('click', (e) => {
            // Modo daltonismo
            if (e.target.closest('#colorblindBtn')) {
                this.handleColorblindMode();
            }

            // Logout no dropdown
            if (e.target.closest('#logoutBtn')) {
                e.preventDefault();
                this.openLogoutModal();
            }

            // Logout no menu expandido
            if (e.target.closest('#profileLogout')) {
                e.preventDefault();
                this.openLogoutModal();
            }
        });
    }

    loadConfigData() {
        // Simular carregamento de dados salvos
        console.log('Carregando configurações...');
        
        // Em produção, isso viria de uma API
        setTimeout(() => {
            this.showNotification('Configurações carregadas', 'success');
        }, 500);
    }

    salvarConfiguracoes() {
        // Coletar todos os dados do formulário
        const configData = {
            // Perfil
            nome: document.getElementById('ongNome')?.value,
            descricao: document.getElementById('ongDescricao')?.value,
            email: document.getElementById('ongEmail')?.value,
            email2: document.getElementById('ongEmail2')?.value,
            telefone: document.getElementById('ongTelefone')?.value,
            whatsapp: document.getElementById('ongWhatsapp')?.value,
            site: document.getElementById('ongSite')?.value,
            
            // Endereço
            cep: document.getElementById('ongCep')?.value,
            logradouro: document.getElementById('ongLogradouro')?.value,
            numero: document.getElementById('ongNumero')?.value,
            complemento: document.getElementById('ongComplemento')?.value,
            bairro: document.getElementById('ongBairro')?.value,
            cidade: document.getElementById('ongCidade')?.value,
            uf: document.getElementById('ongUf')?.value,
            
            // Redes sociais
            facebook: document.getElementById('socialFacebook')?.value,
            instagram: document.getElementById('socialInstagram')?.value,
            twitter: document.getElementById('socialTwitter')?.value,
            linkedin: document.getElementById('socialLinkedin')?.value,
            youtube: document.getElementById('socialYoutube')?.value,
            tiktok: document.getElementById('socialTiktok')?.value,
            
            // Preferências
            tema: document.getElementById('temaInterface')?.value,
            idioma: document.getElementById('idioma')?.value,
            itensPorPagina: document.getElementById('itensPorPagina')?.value,
            
            // Switches (checkboxes)
            feriadosAtivo: document.getElementById('feriadosAtivo')?.checked,
            coletaGratuita: document.getElementById('coletaGratuita')?.checked,
            raioColeta: document.getElementById('raioColeta')?.value,
            perfilPrivado: document.getElementById('perfilPrivado')?.checked,
            compartilharDados: document.getElementById('compartilharDados')?.checked,
            dadosRelatorios: document.getElementById('dadosRelatorios')?.checked,
            fonteMaior: document.getElementById('fonteMaior')?.checked,
            modoCompacto: document.getElementById('modoCompacto')?.checked,
            mostrarGraficos: document.getElementById('mostrarGraficos')?.checked,
            destacarCampanhas: document.getElementById('destacarCampanhas')?.checked
        };

        // Salvar no localStorage para simulação
        localStorage.setItem('ong_configuracoes', JSON.stringify(configData));
        
        // Mostrar modal de sucesso
        this.showSuccessModal('Configurações salvas com sucesso!');
        
        console.log('Configurações salvas:', configData);
    }

    cancelarEdicao() {
        if (confirm('Tem certeza que deseja cancelar? As alterações não salvas serão perdidas.')) {
            window.location.reload();
        }
    }

    alterarSenha() {
        const senhaAtual = this.senhaAtual?.value;
        const novaSenha = this.novaSenha?.value;
        const confirmarSenha = this.confirmarSenha?.value;

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            this.showNotification('Preencha todos os campos de senha', 'error');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            this.showNotification('As senhas não coincidem', 'error');
            return;
        }

        if (!this.isPasswordValid(novaSenha)) {
            this.showNotification('A senha não atende aos requisitos de segurança', 'error');
            return;
        }

        // Simular alteração de senha
        this.showNotification('Senha alterada com sucesso!', 'success');
        
        // Limpar campos
        this.senhaAtual.value = '';
        this.novaSenha.value = '';
        this.confirmarSenha.value = '';
    }

    setupPasswordValidation() {
        this.passwordRequirements = {
            length: false,
            number: false,
            upper: false,
            special: false
        };
    }

    validatePassword() {
        const password = this.novaSenha?.value || '';
        
        // Verificar requisitos
        const length = password.length >= 8;
        const number = /\d/.test(password);
        const upper = /[A-Z]/.test(password);
        const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        // Atualizar indicadores visuais
        this.updateRequirement(this.reqLength, length);
        this.updateRequirement(this.reqNumber, number);
        this.updateRequirement(this.reqUpper, upper);
        this.updateRequirement(this.reqSpecial, special);

        return length && number && upper && special;
    }

    isPasswordValid(password) {
        return password.length >= 8 && 
               /\d/.test(password) && 
               /[A-Z]/.test(password) && 
               /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }

    updateRequirement(element, isValid) {
        if (element) {
            element.classList.remove('valid', 'invalid');
            element.classList.add(isValid ? 'valid' : 'invalid');
            element.innerHTML = isValid ? 
                '<i class="bi bi-check-circle-fill" style="color: var(--primary-green);"></i> ' + element.innerText.replace('✓', '') :
                '<i class="bi bi-x-circle-fill" style="color: var(--primary-red);"></i> ' + element.innerText.replace('✓', '');
        }
    }

    buscarCoordenadasPorCep() {
        const cep = document.getElementById('ongCep')?.value.replace(/\D/g, '');
        
        if (!cep || cep.length !== 8) {
            this.showNotification('CEP inválido', 'error');
            return;
        }

        this.showNotification('Buscando coordenadas...', 'info');

        // Simular busca de coordenadas
        setTimeout(() => {
            document.getElementById('ongLatitude').value = '-23.550520';
            document.getElementById('ongLongitude').value = '-46.633308';
            this.showNotification('Coordenadas encontradas!', 'success');
        }, 1500);
    }

    adicionarZonaColeta() {
        const container = document.getElementById('zonasEntregaContainer');
        const zonas = container.querySelectorAll('.zona-entrega');
        const novaZonaNum = zonas.length + 1;

        const novaZona = document.createElement('div');
        novaZona.className = 'zona-entrega';
        novaZona.innerHTML = `
            <div class="zona-entrega-header">
                <h4>Zona ${novaZonaNum}</h4>
                <button class="btn-remove" onclick="window.ongConfiguracoes.removerZona(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <select class="config-select" style="margin-bottom: 0.5rem;">
                <option value="centro">Centro</option>
                <option value="zona-norte">Zona Norte</option>
                <option value="zona-sul">Zona Sul</option>
                <option value="zona-leste">Zona Leste</option>
                <option value="zona-oeste">Zona Oeste</option>
            </select>
            <input type="text" class="config-input" placeholder="Bairros (separados por vírgula)">
        `;

        container.appendChild(novaZona);
        this.showNotification('Nova zona de coleta adicionada', 'success');
    }

    removerZona(btn) {
        const zona = btn.closest('.zona-entrega');
        if (zona) {
            if (confirm('Remover esta zona de coleta?')) {
                zona.remove();
                this.renumerarZonas();
                this.showNotification('Zona removida', 'info');
            }
        }
    }

    renumerarZonas() {
        const container = document.getElementById('zonasEntregaContainer');
        const zonas = container.querySelectorAll('.zona-entrega');
        
        zonas.forEach((zona, index) => {
            const header = zona.querySelector('.zona-entrega-header h4');
            if (header) {
                header.textContent = `Zona ${index + 1}`;
            }
        });
    }

    changeTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            localStorage.setItem('reuse_dark_mode', 'true');
        } else if (theme === 'light') {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('reuse_dark_mode', 'false');
        } else {
            // Auto - seguir sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    }

    toggleFonteMaior(ativo) {
        if (ativo) {
            document.body.classList.add('fonte-maior');
            document.documentElement.style.fontSize = '18px';
        } else {
            document.body.classList.remove('fonte-maior');
            document.documentElement.style.fontSize = '';
        }
    }

    toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('reuse_dark_mode', isDarkMode.toString());
        
        const icon = this.darkModeBtn?.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-moon', 'bi-sun');
            icon.classList.add(isDarkMode ? 'bi-sun' : 'bi-moon');
            this.darkModeBtn.title = isDarkMode ? 'Modo Claro' : 'Modo Noturno';
        }
        
        this.showNotification(`Modo ${isDarkMode ? 'Escuro' : 'Claro'} ativado`, 'info');
    }

    restoreDarkMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            const icon = this.darkModeBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('bi-moon');
                icon.classList.add('bi-sun');
                this.darkModeBtn.title = 'Modo Claro';
            }
        }

        // Verificar preferência de tema
        const temaSelect = document.getElementById('temaInterface');
        if (temaSelect) {
            const savedTheme = localStorage.getItem('ong_tema') || 'auto';
            temaSelect.value = savedTheme;
        }
    }

    handleColorblindMode() {
        document.body.classList.toggle('colorblind-mode');
        const isActive = document.body.classList.contains('colorblind-mode');
        
        const icon = this.colorblindBtn?.querySelector('i');
        if (icon) {
            icon.classList.remove('bi-eye', 'bi-eye-fill');
            icon.classList.add(isActive ? 'bi-eye-fill' : 'bi-eye');
            this.colorblindBtn.title = isActive ? 'Modo Daltonismo: Ativo' : 'Modo Daltonismo';
        }
        
        this.showNotification(`Modo Daltonismo ${isActive ? 'ativado' : 'desativado'}`, 'info');
    }

    // Modal methods
    openLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.add('active');
        }
    }

    closeLogoutModal() {
        if (this.logoutModal) {
            this.logoutModal.classList.remove('active');
        }
    }

    showSuccessModal(message) {
        const msgElement = document.getElementById('successMessage');
        if (msgElement) {
            msgElement.textContent = message;
        }
        if (this.successModal) {
            this.successModal.classList.add('active');
        }
    }

    closeSuccessModal() {
        if (this.successModal) {
            this.successModal.classList.remove('active');
        }
    }

    performLogout() {
        localStorage.removeItem('user_session');
        sessionStorage.clear();
        
        this.closeLogoutModal();
        
        setTimeout(() => {
            window.location.href = 'cadastro-ong.html';
        }, 300);
    }

    // Notification system
    showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let iconClass = 'bi-info-circle';
        if (type === 'success') iconClass = 'bi-check-circle';
        if (type === 'error') iconClass = 'bi-x-circle';
        if (type === 'warning') iconClass = 'bi-exclamation-circle';
        
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : 
                       type === 'error' ? '#ff4757' : 
                       type === 'warning' ? '#ffa502' : '#9933cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            fontWeight: '500',
            maxWidth: '400px',
            wordBreak: 'break-word'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, this.NOTIFICATION_DURATION);
    }

    // Utility methods
    formatCNPJ(value) {
        return value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    formatPhone(value) {
        return value.replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.ongConfiguracoes = new OngConfiguracoes();

    // Configurar integração com outros módulos
    setupModuleIntegration();
});

// Função para integrar os módulos
function setupModuleIntegration() {
    // Configurar botão de logout no dropdown
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const profileMenu = document.getElementById('profileMenu');
            if (profileMenu) {
                profileMenu.classList.remove('active');
            }
            
            if (window.ongConfiguracoes) {
                window.ongConfiguracoes.openLogoutModal();
            }
        });
    }

    // Configurar dropdown toggle
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileMenu');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Menu de perfil expandido
    const profileBtn = document.querySelector('.dropdown-item i.bi-building')?.parentElement;
    const profileMenuExpanded = document.getElementById('profileMenuExpanded');
    const closeProfile = document.getElementById('closeProfile');

    if (profileBtn && profileMenuExpanded) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            profileMenuExpanded.classList.add('active');
        });
    }

    if (closeProfile && profileMenuExpanded) {
        closeProfile.addEventListener('click', () => {
            profileMenuExpanded.classList.remove('active');
        });

        profileMenuExpanded.addEventListener('click', (e) => {
            if (e.target.classList.contains('profile-overlay')) {
                profileMenuExpanded.classList.remove('active');
            }
        });
    }

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
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

        .fonte-maior {
            font-size: 18px;
        }

        .fonte-maior .btn,
        .fonte-maior .config-input,
        .fonte-maior .config-select {
            font-size: 1rem;
        }

        .valid i {
            color: var(--primary-green);
        }

        .invalid i {
            color: var(--primary-red);
        }
    `;
    document.head.appendChild(style);
}

// Expor funções globais
window.removerZona = function(btn) {
    if (window.ongConfiguracoes) {
        window.ongConfiguracoes.removerZona(btn);
    }
};

window.showConfigNotification = function(message, type = 'info') {
    if (window.ongConfiguracoes) {
        window.ongConfiguracoes.showNotification(message, type);
    }
};