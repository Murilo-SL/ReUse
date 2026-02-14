// profile-menu-vendedor.js
// Gerencia o menu de perfil e o painel expandido para páginas do vendedor
class ProfileMenuVendedor {
    constructor() {
        this.NOTIFICATION_DURATION = 3000;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
    }

    cacheElements() {
        this.profileToggle = document.getElementById('profileToggle');
        this.headerDropdown = document.getElementById('profileMenu');
        this.profileMenuExpanded = document.getElementById('profileMenuExpanded');
        this.closeProfileBtn = document.getElementById('closeProfile');
        this.logoutModal = document.getElementById('logoutModal');
        this.confirmLogoutBtn = document.getElementById('confirmLogout');
        this.cancelLogoutBtn = document.getElementById('cancelLogout');
    }

    bindEvents() {
        // Toggle header profile button to open expanded profile panel
        if (this.profileToggle) {
            this.profileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openExpandedMenu();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.headerDropdown && !e.target.closest('#profileMenu') && !e.target.closest('#profileToggle')) {
                this.headerDropdown.classList.remove('active');
            }
        });

        // Open expanded profile panel from header dropdown or toggle button
        document.addEventListener('click', (e) => {
            const dropdownItem = e.target.closest('.dropdown-item');
            if (!dropdownItem) return;

            // If user clicked the profile item, open expanded menu
            const text = dropdownItem.textContent.trim().toLowerCase();
            if (text.includes('perfil') || text.includes('meu perfil')) {
                this.openExpandedMenu();
            }

            // If clicked logout in dropdown
            if (dropdownItem.classList.contains('logout')) {
                this.openLogoutModal();
            }
        });

        // Delegation for expanded profile nav items
        if (this.profileMenuExpanded) {
            this.profileMenuExpanded.addEventListener('click', (e) => {
                const item = e.target.closest('.profile-nav-item');
                if (!item) return;

                if (item.classList.contains('logout')) {
                    this.openLogoutModal();
                    // Redirect to seller products when clicking "minhas vendas" or "vendas"
                    if (text.includes('minhas vendas') || text.includes('vendas')) {
                        window.location.href = 'vendedor-produtos.html';
                        return;
                    }

                    // Redirect to seller settings when clicking "configurações"
                    if (text.includes('configura') || text.includes('configurações')) {
                        window.location.href = 'vendedor-configuracoes.html';
                        return;
                    }
                    return;
                }

                const label = item.textContent.trim().toLowerCase();
                if (label.includes('meus produtos') || label.includes('produtos')) {
                    window.location.href = 'vendedor-produtos.html';
                } else if (label.includes('estatísticas') || label.includes('estatisticas')) {
                    window.location.href = 'vendedor-estatisticas.html';
                } else if (label.includes('financeiro')) {
                    window.location.href = 'ferramentas.html';
                } else if (label.includes('configura')) {
                    window.location.href = 'vendedor-configuracoes.html';
                } else if (label.includes('perfil')) {
                    window.location.href = 'vendedor-configuracoes.html';
                }
            });
        }

        // Close expanded menu
        if (this.closeProfileBtn) {
            this.closeProfileBtn.addEventListener('click', () => this.closeExpandedMenu());
        }

        // Close expanded panel when clicking overlay
        if (this.profileMenuExpanded) {
            this.profileMenuExpanded.addEventListener('click', (e) => {
                if (e.target.classList.contains('profile-overlay')) {
                    this.closeExpandedMenu();
                }
            });
        }

        // Keyboard: ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.profileMenuExpanded && this.profileMenuExpanded.classList.contains('active')) {
                    this.closeExpandedMenu();
                }
                if (this.headerDropdown && this.headerDropdown.classList.contains('active')) {
                    this.headerDropdown.classList.remove('active');
                }
            }
        });

        // Logout modal controls
        if (this.confirmLogoutBtn) {
            this.confirmLogoutBtn.addEventListener('click', () => {
                this.performLogout();
            });
        }
        if (this.cancelLogoutBtn) {
            this.cancelLogoutBtn.addEventListener('click', () => {
                this.closeModal('logoutModal');
            });
        }
    }

    openExpandedMenu() {
        if (!this.profileMenuExpanded) return;
        // close header dropdown if open
        if (this.headerDropdown) this.headerDropdown.classList.remove('active');
        this.profileMenuExpanded.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeExpandedMenu() {
        if (!this.profileMenuExpanded) return;
        this.profileMenuExpanded.classList.remove('active');
        document.body.style.overflow = '';
    }

    openLogoutModal() {
        const modal = document.getElementById('logoutModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // fallback: redirect to login
            window.location.href = 'cadastro-vendedor.html';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    performLogout() {
        this.closeModal('logoutModal');
        this.showNotification('Saindo da sua conta...', 'info');
        setTimeout(() => {
            window.location.href = 'cadastro-vendedor.html';
        }, 800);
    }

    showNotification(message, type = 'info') {
        const existing = document.querySelectorAll('.pm-v-notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification pm-v-notification ${type}`;
        let icon = 'bi-info-circle';
        if (type === 'success') icon = 'bi-check-circle';
        if (type === 'error') icon = 'bi-x-circle';
        if (type === 'warning') icon = 'bi-exclamation-circle';

        notification.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : type === 'error' ? '#ff4757' : type === 'warning' ? '#ffa502' : '#0066cc',
            color: 'white',
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
        });

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), this.NOTIFICATION_DURATION);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.profileMenuVendedor = new ProfileMenuVendedor();
});
