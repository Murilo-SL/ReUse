// profile-menu.js - Gerenciamento do menu de perfil expandido

class ProfileMenu {
    constructor() {
        this.NOTIFICATION_DURATION = 3000;
        this.init();
    }


    init() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupProfileIntegration();

        setTimeout(() => {
            this.carregarDadosUsuario();
        }, 100);
    }

    initializeComponents() {
        this.profileMenuExpanded = document.getElementById('profileMenuExpanded');
        this.closeProfile = document.getElementById('closeProfile');
        this.profileMyProfile = document.getElementById('profileMyProfile');
        this.profileSettings = document.getElementById('profileSettings');
        this.profileMyOrders = document.getElementById('profileMyOrders');
        this.profileLogout = document.getElementById('profileLogout');

        this.profileToggle = document.getElementById('profileToggle');
        this.profileDropdown = document.getElementById('profileMenu');
    }

    carregarDadosUsuario() {

        const usuario = JSON.parse(
            localStorage.getItem("usuario")
        );

        if (!usuario) {
            console.warn("Nenhum usuário logado encontrado.");
            return;
        }

        console.log("Usuário carregado:", usuario);

        const nome =
            usuario.nomeCompleto ||
            `${usuario.first_name || ""} ${usuario.last_name || ""}`.trim() ||
            usuario.name ||
            usuario.full_name ||
            usuario.nome ||
            usuario.username ||
            "Usuário";

        const email =
            usuario.email ||
            "Email não informado";

        // Atualiza TODOS os elementos de nome
        document.querySelectorAll("#userName").forEach(el => {
            el.textContent = nome;
        });

        document.querySelectorAll("#profileExpandedTitle").forEach(el => {
            el.textContent = nome;
        });

        // Atualiza TODOS os elementos de email
        document.querySelectorAll("#userEmail").forEach(el => {
            el.textContent = email;
        });

        document.querySelectorAll("#profileExpandedEmail").forEach(el => {
            el.textContent = email;
        });

        //avatar
const avatares = document.querySelectorAll(
    "#userAvatar, .profile-avatar-large"
);

avatares.forEach(avatar => {

    if (usuario.profile_image) {

        avatar.innerHTML = `
            <img
                src="http://localhost:3600/${usuario.profile_image}"
                alt="Perfil"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:50%;
                "
            >
        `;

    } else {

        const iniciais = nome
            .split(" ")
            .map(p => p.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

        avatar.innerHTML = `
            <span>${iniciais}</span>
        `;
    }

});
    }

    setupEventListeners() {

        if (this.profileToggle) {
            this.profileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openMenu();
            });
        }

        if (this.closeProfile) {
            this.closeProfile.addEventListener('click', () => this.closeMenu());
        }

        if (this.profileMyProfile) {
            this.profileMyProfile.addEventListener('click', () => this.navigateToProfile());
        }

        if (this.profileSettings) {
            this.profileSettings.addEventListener('click', () => this.navigateToSettings());
        }

        if (this.profileMyOrders) {
            this.profileMyOrders.addEventListener('click', () => this.navigateToOrders());
        }

        if (this.profileLogout) {
            this.profileLogout.addEventListener('click', () => this.openLogoutModal());
        }

        if (this.profileMenuExpanded) {
            this.profileMenuExpanded.addEventListener('click', (e) => {

                if (e.target.classList.contains('profile-overlay')) {
                    this.closeMenu();
                }

            });
        }

        document.addEventListener('keydown', (e) => {

            if (
                e.key === 'Escape' &&
                this.profileMenuExpanded.classList.contains('active')
            ) {
                this.closeMenu();
            }

        });
    }

    setupProfileIntegration() {

        document.addEventListener('click', (e) => {

            const dropdownItem =
                e.target.closest('.dropdown-item');

            if (
                dropdownItem &&
                dropdownItem.classList.contains('logout')
            ) {

                e.preventDefault();
                e.stopPropagation();

                this.openLogoutModal();

                if (this.profileDropdown) {
                    this.profileDropdown.classList.remove('active');
                }

                return;
            }

            if (dropdownItem) {

                e.preventDefault();
                e.stopPropagation();

                if (dropdownItem.querySelector('i.bi-person')) {

                    this.navigateToProfile();

                } else if (dropdownItem.querySelector('i.bi-gear')) {

                    this.navigateToSettings();

                } else if (dropdownItem.querySelector('i.bi-box-arrow-right')) {

                    this.navigateToOrders();

                } else if (dropdownItem.querySelector('i.bi-heart')) {

                    this.navigateToFavorites();
                }

                if (this.profileDropdown) {
                    this.profileDropdown.classList.remove('active');
                }
            }
        });
    }

    openMenu() {

        if (this.profileDropdown) {
            this.profileDropdown.classList.remove('active');
        }

        this.profileMenuExpanded.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {

        this.profileMenuExpanded.classList.add('closing');
        document.body.style.overflow = '';

        setTimeout(() => {

            this.profileMenuExpanded.classList.remove(
                'active',
                'closing'
            );

        }, 300);
    }

    navigateToProfile() {

        this.closeMenu();

        this.showNotification(
            'Redirecionando para Meu Perfil...',
            'info'
        );

        window.location.href = 'perfil.html';
    }

    navigateToSettings() {

        this.closeMenu();

        this.showNotification(
            'Redirecionando para Configurações...',
            'info'
        );

        window.location.href = 'configuracoes.html';
    }

    navigateToOrders() {

        this.closeMenu();

        this.showNotification(
            'Redirecionando para Meus Pedidos...',
            'info'
        );
    }

    navigateToFavorites() {

        this.closeMenu();

        if (window.favoritesMenu) {

            window.favoritesMenu.openMenu();

        } else {

            this.showNotification(
                'Redirecionando para Favoritos...',
                'info'
            );
        }
    }

    openLogoutModal() {

        this.closeMenu();

        if (
            window.clienteInicio &&
            typeof window.clienteInicio.openLogoutModal === 'function'
        ) {

            window.clienteInicio.openLogoutModal();

        } else {

            const logoutModal =
                document.getElementById('logoutModal');

            if (logoutModal) {

                logoutModal.classList.add('active');

            } else {

                this.showNotification(
                    'Função de logout não disponível',
                    'warning'
                );
            }
        }
    }

    showNotification(message, type = 'info') {

        document
            .querySelectorAll('.pm-notification')
            .forEach(n => n.remove());

        const notification =
            document.createElement('div');

        notification.className =
            `notification pm-notification ${type}`;

        let iconClass = 'bi-info-circle';

        if (type === 'success')
            iconClass = 'bi-check-circle';

        if (type === 'error')
            iconClass = 'bi-x-circle';

        if (type === 'warning')
            iconClass = 'bi-exclamation-circle';

        notification.innerHTML = `
        <i class="bi ${iconClass}"></i>
        <span>${message}</span>
    `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background:
                type === 'success'
                    ? '#00cc99'
                    : type === 'error'
                        ? '#ff4757'
                        : type === 'warning'
                            ? '#ffa502'
                            : '#0066cc',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000'
        });

        document.body.appendChild(notification);

        setTimeout(() => {

            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }

        }, this.NOTIFICATION_DURATION);
    }


}

document.addEventListener('DOMContentLoaded', () => {
    window.profileMenu = new ProfileMenu();
});
