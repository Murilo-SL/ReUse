// ong-profile-menu.js
// Gerencia o menu de perfil e painel expandido para páginas de ONG
class OngProfileMenu {
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
        if (this.profileToggle) {
            this.profileToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openExpandedMenu();
            });
        }

        // close header dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.headerDropdown && !e.target.closest('#profileMenu') && !e.target.closest('#profileToggle')) {
                this.headerDropdown.classList.remove('active');
            }
        });

        // handle dropdown items (if present)
        document.addEventListener('click', (e) => {
            const dropdownItem = e.target.closest('.dropdown-item');
            if (!dropdownItem) return;

            const text = dropdownItem.textContent.trim().toLowerCase();
            if (dropdownItem.classList.contains('logout')) {
                this.openLogoutModal();
                return;
            }

            if (text.includes('campanh')) {
                this.scrollToSection('.campanhas-section');
                return;
            }

            if (text.includes('doa')) {
                this.scrollToSection('.doacoes-recentes-section');
                return;
            }

            if (text.includes('perfil')) {
                window.location.href = 'ong-configuracao.html';
                return;
            }

            if (text.includes('configura')) {
                window.location.href = 'ong-configuracao.html';
                return;
            }
        });

        // expanded menu delegation
        if (this.profileMenuExpanded) {
            this.profileMenuExpanded.addEventListener('click', (e) => {
                const item = e.target.closest('.profile-nav-item');
                if (!item) return;

                if (item.classList.contains('logout')) {
                    this.openLogoutModal();
                    return;
                }

                const label = item.textContent.trim().toLowerCase();
                if (label.includes('campanh')) {
                    this.scrollToSection('.campanhas-section');
                } else if (label.includes('doa')) {
                    this.scrollToSection('.doacoes-recentes-section');
                } else if (label.includes('perfil')) {
                    window.location.href = 'ong-configuracao.html';
                } else if (label.includes('relat')) {
                    this.showNotification('Abrindo relatórios...', 'info');
                    window.location.href = 'ong-relatorios.html';
                } else if (label.includes('configura')) {
                    window.location.href = 'ong-configuracao.html';
                }
            });

            // close when clicking overlay
            this.profileMenuExpanded.addEventListener('click', (e) => {
                if (e.target.classList.contains('profile-overlay')) {
                    this.closeExpandedMenu();
                }
            });
        }

        if (this.closeProfileBtn) {
            this.closeProfileBtn.addEventListener('click', () => this.closeExpandedMenu());
        }

        // keyboard
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

        if (this.confirmLogoutBtn) {
            this.confirmLogoutBtn.addEventListener('click', () => this.performLogout());
        }
        if (this.cancelLogoutBtn) {
            this.cancelLogoutBtn.addEventListener('click', () => this.closeModal('logoutModal'));
        }
    }

    openExpandedMenu() {
        if (!this.profileMenuExpanded) return;
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
            window.location.href = 'cadastro-instituicao.html';
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
            window.location.href = 'cadastro-instituicao.html';
        }, 800);
    }

    scrollToSection(selector) {
        const el = document.querySelector(selector);
        if (el) {
            this.closeExpandedMenu();
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showNotification(message, type = 'info') {
        document.querySelectorAll('.ong-notification').forEach(n => n.remove());
        const n = document.createElement('div');
        n.className = `notification ong-notification ${type}`;
        n.innerHTML = `<i class="bi bi-info-circle"></i><span>${message}</span>`;
        Object.assign(n.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00cc99' : type === 'error' ? '#ff4757' : '#9933cc',
            color: 'white',
            padding: '0.8rem 1.2rem',
            borderRadius: '8px',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
        });
        document.body.appendChild(n);
        setTimeout(() => n.remove(), this.NOTIFICATION_DURATION);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.ongProfileMenu = new OngProfileMenu();
});
