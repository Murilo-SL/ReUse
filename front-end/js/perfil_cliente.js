// perfil-cliente.js - Gerenciamento completo e otimizado da página de perfil

document.addEventListener("DOMContentLoaded", async () => {
    await carregarPerfilUsuario();
    await carregarCartoesUsuario();
    await carregarEnderecosUsuario();
});

async function carregarPerfilUsuario() {

    try {

        const usuario = JSON.parse(
            localStorage.getItem("usuario")
        );

        if (!usuario || !usuario.id) {

            console.error(
                "Usuário não encontrado no localStorage"
            );

            return;
        }

        const response = await fetch(
            `http://localhost:3600/users/${usuario.id}`
        );

        const result = await response.json();

        console.log(
            "Dados do usuário:",
            result
        );

        if (
            !result.data ||
            result.data.length === 0
        ) {

            console.error(
                "Usuário não encontrado no banco"
            );

            return;
        }

        const dadosUsuario =
            result.data[0];

        preencherPerfil(
            dadosUsuario
        );

        // FOTO DE PERFIL

        const avatarContainer =
            document.querySelector(
                ".profile-avatar-large"
            );

        const avatarTexto =
            avatarContainer?.querySelector(
                "span"
            );

        if (
            dadosUsuario.profile_image &&
            avatarTexto
        ) {

            avatarTexto.innerHTML = `
                <img
                    src="http://localhost:3600/${dadosUsuario.profile_image}"
                    alt="Foto de Perfil"
                    style="
                        width:100%;
                        height:100%;
                        border-radius:50%;
                        object-fit:cover;
                    "
                >
            `;
        }

    } catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );

    }
}

async function carregarCartoesUsuario() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuario || !usuario.id) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:3600/cards/user/${usuario.id}`
        );

        const result = await response.json();

        const cardsList =
            document.getElementById("cardsList");

        if (!cardsList) return;

        cardsList.innerHTML = "";

        if (!result.data || result.data.length === 0) {

            cardsList.innerHTML = `
                <div class="empty-cards">
                    <div class="empty-icon">
                        <i class="bi bi-credit-card"></i>
                    </div>

                    <h3>Nenhum cartão cadastrado</h3>

                    <p>
                        Você ainda não possui cartões cadastrados.
                    </p>
                </div>
            `;

            return;
        }

        result.data.forEach(card => {

            cardsList.innerHTML += `
                <div class="card-item ${card.is_primary ? "primary" : ""}">

                    <div class="card-icon">
                        <i class="bi bi-credit-card-2-front"></i>
                    </div>

                    <div class="card-details">
                        <h3>
                            ${card.is_primary
                    ? "Cartão Principal"
                    : "Cartão"
                }
                        </h3>

                        <p class="card-number">
                            **** **** **** ${card.card_last_digits}
                        </p>

                        <p class="card-info">
                            ${card.card_brand}
                            •
                            Válido até
                            ${card.expiry_date}
                        </p>
                    </div>

                    <div class="card-actions">

                        <button
                            type="button"
                            class="card-action edit-card-btn"
                            data-id="${card.id}"
                            data-holder="${card.card_holder}"
                            data-brand="${card.card_brand}"
                            data-expiry="${card.expiry_date}"
                            data-primary="${card.is_primary}"
                            title="Editar"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="card-action delete-card-btn"
                            data-id="${card.id}"
                            title="Remover"
                        >
                            <i class="bi bi-trash"></i>
                        </button>

                    </div>

                </div>
            `;

        });

    } catch (erro) {

        console.error("Erro ao carregar cartões:", erro);

    }
}

async function buscarCep() {

    const cepInput =
        document.getElementById("zipCode");

    if (!cepInput) return;

    const cep =
        cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        mostrarMensagem(
            "CEP inválido. Digite 8 números.",
            "error"
        );
        return;
    }

    try {

        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const data = await response.json();

        if (data.erro) {
            mostrarMensagem(
                "CEP não encontrado.",
                "error"
            );
            return;
        }

        document.getElementById("street").value =
            data.logradouro || "";

        document.getElementById("neighborhood").value =
            data.bairro || "";

        document.getElementById("city").value =
            data.localidade || "";

        document.getElementById("state").value =
            data.uf || "";

        mostrarMensagem(
            "CEP encontrado!",
            "success"
        );

    } catch (error) {

        console.error("Erro ao buscar CEP:", error);

        mostrarMensagem(
            "Erro ao consultar CEP.",
            "error"
        );
    }
}

async function salvarCartao(event) {

    event.preventDefault();

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuario || !usuario.id) {
        mostrarMensagem("Usuário não encontrado.", "error");
        return;
    }

    const form = document.getElementById("newCardForm");

    const editando =
        form.dataset.editing === "true";

    const cardNumber = document
        .getElementById("cardNumber")
        .value
        .replace(/\D/g, "");

    if (!editando && cardNumber.length < 4) {
        mostrarMensagem("Informe o número do cartão.", "error");
        return;
    }

    const payload = {
        user_id: usuario.id,
        card_holder: document.getElementById("cardHolder").value.trim(),
        card_last_digits: cardNumber
            ? cardNumber.slice(-4)
            : "0000",
        card_brand: document.getElementById("cardType").value,
        expiry_date: document.getElementById("expiryDate").value.trim(),
        is_primary: document.getElementById("setAsPrimary").checked
    };

    const url = editando
        ? `http://localhost:3600/cards/${form.dataset.cardId}`
        : "http://localhost:3600/cards";

    const method = editando ? "PUT" : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    console.log("Cartão salvo:", result);

    form.reset();

    delete form.dataset.editing;
    delete form.dataset.cardId;

    document.getElementById("addCardForm").style.display = "none";

    const titulo =
        document.querySelector("#addCardForm h3");

    if (titulo) {
        titulo.innerHTML =
            `<i class="bi bi-plus-circle"></i> Adicionar Cartão`;
    }

    const botaoSalvar =
        form.querySelector('button[type="submit"]');

    if (botaoSalvar) {
        botaoSalvar.innerHTML =
            `<i class="bi bi-check-lg"></i> Adicionar Cartão`;
    }

    await carregarCartoesUsuario();

    mostrarMensagem(
        editando
            ? "Cartão atualizado com sucesso!"
            : "Cartão cadastrado com sucesso!",
        "success"
    );
}

async function excluirCartao(id) {

    if (!confirm("Deseja excluir este cartão?")) return;

    await fetch(`http://localhost:3600/cards/${id}`, {
        method: "DELETE"
    });

    await carregarCartoesUsuario();
}

function editarCartao(botao) {

    const id = botao.dataset.id;
    const holder = botao.dataset.holder;
    const brand = botao.dataset.brand;
    const expiry = botao.dataset.expiry;
    const primary = botao.dataset.primary;

    document.getElementById("cardHolder").value = holder;
    document.getElementById("cardType").value = brand;
    document.getElementById("expiryDate").value = expiry;
    document.getElementById("setAsPrimary").checked =
        primary == 1 || primary === "true";

    document.getElementById("cardNumber").value = "";

    const form = document.getElementById("newCardForm");

    form.dataset.editing = "true";
    form.dataset.cardId = id;

    document.getElementById("addCardForm").style.display = "block";

    const titulo =
        document.querySelector("#addCardForm h3");

    if (titulo) {
        titulo.innerHTML =
            `<i class="bi bi-pencil"></i> Editar Cartão`;
    }

    const botaoSalvar =
        form.querySelector('button[type="submit"]');

    if (botaoSalvar) {
        botaoSalvar.innerHTML =
            `<i class="bi bi-check-lg"></i> Salvar Alterações`;
    }
}

async function carregarEnderecosUsuario() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.id) return;

    try {

        const response = await fetch(
            `http://localhost:3600/addresses/user/${usuario.id}`
        );

        const result = await response.json();

        const addressesList =
            document.getElementById("addressesList");

        if (!addressesList) return;

        addressesList.innerHTML = "";

        if (!result.data || result.data.length === 0) {

            addressesList.innerHTML = `
                <div class="empty-addresses">
                    <div class="empty-icon">
                        <i class="bi bi-geo-alt"></i>
                    </div>
                    <h3>Nenhum endereço cadastrado</h3>
                    <p>Você ainda não possui endereços cadastrados.</p>
                </div>
            `;

            return;
        }

        result.data.forEach(address => {

            addressesList.innerHTML += `
                <div class="address-card ${address.is_primary ? "primary" : ""}">
                    <div class="address-header">
                        <h3>
                            <i class="bi ${address.is_primary ? "bi-house-check" : "bi-geo-alt"}"></i>
                            ${address.address_name || "Endereço"}
                        </h3>

                        ${address.is_primary
                    ? `<span class="address-tag">Principal</span>`
                    : ""
                }
                    </div>

                    <div class="address-body">
                        <p class="address-line">
                            ${address.street}, ${address.number}
                        </p>

                        <p class="address-line">
                            ${address.complement || ""}
                        </p>

                        <p class="address-line">
                            ${address.neighborhood || ""}
                        </p>

                        <p class="address-line">
                            ${address.city} - ${address.state}
                        </p>

                        <p class="address-line">
                            CEP: ${address.zip_code || ""}
                        </p>

                        <p class="address-contact">
                            Telefone: ${address.phone || ""}
                        </p>
                    </div>

                    <div class="address-actions">
                        <button
    type="button"
    class="address-action edit-address-btn"
    data-id="${address.id}"
    data-name="${address.address_name || ""}"
    data-street="${address.street || ""}"
    data-number="${address.number || ""}"
    data-complement="${address.complement || ""}"
    data-neighborhood="${address.neighborhood || ""}"
    data-city="${address.city || ""}"
    data-state="${address.state || ""}"
    data-zip="${address.zip_code || ""}"
    data-phone="${address.phone || ""}"
    data-primary="${address.is_primary}"
>
    <i class="bi bi-pencil"></i>
    Editar
</button>

<button
    type="button"
    class="address-action delete-address-btn"
    data-id="${address.id}"
>
    <i class="bi bi-trash"></i>
    Remover
</button>
                    </div>
                </div>
            `;

        });

    } catch (error) {

        console.error("Erro ao carregar endereços:", error);
    }
}

function editarEndereco(botao) {

    const form =
        document.getElementById("addressForm");

    document.getElementById("addressName").value =
        botao.dataset.name || "";

    document.getElementById("street").value =
        botao.dataset.street || "";

    document.getElementById("number").value =
        botao.dataset.number || "";

    document.getElementById("complement").value =
        botao.dataset.complement || "";

    document.getElementById("neighborhood").value =
        botao.dataset.neighborhood || "";

    document.getElementById("city").value =
        botao.dataset.city || "";

    document.getElementById("state").value =
        botao.dataset.state || "";

    document.getElementById("zipCode").value =
        botao.dataset.zip || "";

    document.getElementById("addressPhone").value =
        botao.dataset.phone || "";

    document.getElementById("setAsPrimaryAddress").checked =
        botao.dataset.primary == 1 ||
        botao.dataset.primary === "true";

    form.dataset.editing = "true";
    form.dataset.addressId = botao.dataset.id;

    document.getElementById("addressFormContainer").style.display = "block";

    const submitBtn =
        form.querySelector('button[type="submit"]');

    if (submitBtn) {
        submitBtn.innerHTML =
            `<i class="bi bi-check-lg"></i> Salvar Alterações`;
    }
}

async function salvarEndereco(event) {

    event.preventDefault();

    const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

    const form =
        document.getElementById("addressForm");

    const editando =
        form.dataset.editing === "true";

    if (!usuario || !usuario.id) {
        mostrarMensagem("Usuário não encontrado.", "error");
        return;
    }

    const payload = {
        user_id: usuario.id,

        address_name:
            document.getElementById("addressName")?.value.trim() || "",

        street:
            document.getElementById("street")?.value.trim() || "",

        number:
            document.getElementById("number")?.value.trim() || "",

        complement:
            document.getElementById("complement")?.value.trim() || "",

        neighborhood:
            document.getElementById("neighborhood")?.value.trim() || "",

        city:
            document.getElementById("city")?.value.trim() || "",

        state:
            document.getElementById("state")?.value.trim() || "",

        zip_code:
            document.getElementById("zipCode")?.value.trim() || "",

        phone:
            document.getElementById("addressPhone")?.value.trim() || "",

        is_primary:
            document.getElementById("setAsPrimaryAddress")?.checked || false
    };

    console.log("Payload endereço:", payload);

    try {

        const url = editando
            ? `http://localhost:3600/addresses/${form.dataset.addressId}`
            : "http://localhost:3600/addresses";

        const method = editando ? "PUT" : "POST";

        const response = await fetch(
            url,
            {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const text = await response.text();

        console.log("Resposta bruta:", text);

        let result;

        try {
            result = JSON.parse(text);
        } catch {
            throw new Error(text);
        }

        if (!response.ok) {
            throw new Error(
                result.message || "Erro ao salvar endereço"
            );
        }

        console.log("Endereço salvo:", result);

        document.getElementById("addressForm").reset();

        delete form.dataset.editing;
        delete form.dataset.addressId;

        const submitBtn =
            form.querySelector('button[type="submit"]');

        if (submitBtn) {
            submitBtn.innerHTML =
                `<i class="bi bi-check-lg"></i> Salvar Endereço`;
        }

        document.getElementById("addressFormContainer").style.display = "none";

        await carregarEnderecosUsuario();

        mostrarMensagem(
            editando
                ? "Endereço atualizado com sucesso!"
                : "Endereço cadastrado com sucesso!",
            "success"
        );

    } catch (error) {

        console.error("Erro ao salvar endereço:", error);

        mostrarMensagem("Erro ao salvar endereço. Veja o console do servidor.", "error");
    }
}

async function excluirEndereco(id) {

    if (!confirm("Deseja excluir este endereço?")) return;

    await fetch(`http://localhost:3600/addresses/${id}`, {
        method: "DELETE"
    });

    await carregarEnderecosUsuario();
}

function preencherPerfil(dados) {

    const nomeCompleto =
        `${dados.first_name || ""} ${dados.last_name || ""}`.trim();

    // Cabeçalho do perfil
    const profileName =
        document.querySelector(".profile-name");

    const profileEmail =
        document.querySelector(".profile-email");

    if (profileName)
        profileName.textContent = nomeCompleto;

    if (profileEmail)
        profileEmail.textContent = dados.email;

    // Avatar
    const avatar =
        document.querySelector(".profile-avatar-large span");

    if (avatar) {

        avatar.textContent = nomeCompleto
            .split(" ")
            .map(nome => nome[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    // Formulário
    const nomeInput =
        document.getElementById("nomeCompleto");

    const cpfInput =
        document.getElementById("cpf");

    const nascimentoInput =
        document.getElementById("dataNascimento");

    const telefoneInput =
        document.getElementById("telefone");

    const emailInput =
        document.getElementById("email");

    if (nomeInput)
        nomeInput.value = nomeCompleto;

    if (cpfInput)
        cpfInput.value = dados.cpf || "";

    if (nascimentoInput && dados.birth_date) {

        nascimentoInput.value =
            new Date(dados.birth_date)
                .toISOString()
                .split("T")[0];

    }

    if (telefoneInput)
        telefoneInput.value = dados.phone || "";

    if (emailInput)
        emailInput.value = dados.email || "";
}

class PerfilCliente {
    constructor() {
        this.currentSection = null;
        this.notificationDuration = 4000;
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        this.isTouch = 'ontouchstart' in window;
        this.userData = null;
        this.modalQueue = [];
        this.isSubmitting = false;
        this.elements = {};
        this.init();
    }

    async init() {
        try {
            await this.cacheElements();
            this.setupObservers();
            this.bindEvents();
            await this.loadUserData();
            this.setupSectionNavigation();
            this.setupFormHandlers();
            this.setupModalSystem();
            this.setupImageHandling();
            this.setupPerformanceOptimizations();
            this.setupAccessibility();
            this.showWelcomeMessage();
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.showNotification('Erro ao carregar perfil', 'error');
        }

        window.addEventListener(
            "usuarioAtualizado",
            () => {
                carregarPerfilUsuario();
            }
        );

    }

    async cacheElements() {
        // Cache principal de elementos
        this.elements = {
            // Header
            profileHeader: document.querySelector('.profile-header-section'),
            profileCover: document.querySelector('.profile-cover'),
            profileAvatar: document.querySelector('.profile-avatar-large'),
            avatarEditBtn: document.getElementById('editAvatarBtn'),
            profileName: document.querySelector('.profile-name'),
            profileEmail: document.querySelector('.profile-email'),

            // Navegação
            navItems: document.querySelectorAll('.nav-item'),
            profileSections: document.querySelectorAll('.profile-section'),

            // Formulários
            personalDataForm: document.getElementById('personalDataForm'),
            passwordForm: document.getElementById('passwordForm'),
            newCardForm: document.getElementById('newCardForm'),
            addressForm: document.getElementById('addressForm'),

            // Botões
            addCardBtn: document.getElementById('addCardBtn'),
            addAddressBtn: document.getElementById('addAddressBtn'),
            helpBtn: document.getElementById('helpBtn'),
            cancelPersonalBtn: document.getElementById('cancelPersonalBtn'),

            // Modais
            confirmationModal: document.getElementById('confirmationModal'),
            confirmationTitle: document.getElementById('confirmationTitle'),
            confirmationMessage: document.getElementById('confirmationMessage'),
            closeConfirmationModal: document.getElementById('closeConfirmationModal'),
            cancelAction: document.getElementById('cancelAction'),
            confirmAction: document.getElementById('confirmAction'),

            // Seções específicas
            changePasswordForm: document.getElementById('changePasswordForm'),
            addCardForm: document.getElementById('addCardForm'),
            addressFormContainer: document.getElementById('addressFormContainer'),

            // Preferências
            themeOptions: document.querySelectorAll('.theme-option'),
            configureColorblindBtn: document.getElementById('configureColorblind'),
            exportDataBtn: document.getElementById('exportDataBtn'),
            deleteAccountBtn: document.getElementById('deleteAccountBtn'),

            // Estatísticas
            statsCards: document.querySelectorAll('.stat-card')
        };

        // Garantir que elementos críticos existam
        this.ensureCriticalElements();
    }

    ensureCriticalElements() {
        // Garantir que a imagem do perfil sempre exista e seja visível
        if (!this.elements.profileAvatar) {
            const avatarHtml = `
                <div class="profile-avatar-large" style="display: flex !important; visibility: visible !important; opacity: 1 !important;">
                    <span>${this.getInitials()}</span>
                    <button class="avatar-edit-btn" id="editAvatarBtn" title="Alterar foto">
                        <i class="bi bi-camera"></i>
                    </button>
                </div>
            `;

            const overlay = document.querySelector('.profile-info-overlay');
            if (overlay) {
                overlay.insertAdjacentHTML('afterbegin', avatarHtml);
                this.elements.profileAvatar = overlay.querySelector('.profile-avatar-large');
                this.elements.avatarEditBtn = overlay.querySelector('#editAvatarBtn');
            }
        }

        // Forçar visibilidade do avatar
        if (this.elements.profileAvatar) {
            this.elements.profileAvatar.style.display = 'flex';
            this.elements.profileAvatar.style.visibility = 'visible';
            this.elements.profileAvatar.style.opacity = '1';
            this.elements.profileAvatar.style.position = 'relative';
            this.elements.profileAvatar.style.zIndex = '1000';
        }
    }

    setupObservers() {
        // Observer para mudanças no DOM
        this.domObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Verificar se o avatar foi removido
                    if (mutation.removedNodes.length > 0) {
                        mutation.removedNodes.forEach(node => {
                            if (node.classList && node.classList.contains('profile-avatar-large')) {
                                this.ensureCriticalElements();
                            }
                        });
                    }
                }
            });
        });

        // Observar o container do avatar
        const avatarContainer = this.elements.profileAvatar?.parentElement;
        if (avatarContainer) {
            this.domObserver.observe(avatarContainer, { childList: true, subtree: true });
        }

        // Intersection Observer para lazy loading
        if ('IntersectionObserver' in window) {
            this.lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        this.lazyObserver.unobserve(img);
                    }
                });
            }, { threshold: 0.1, rootMargin: '100px' });

            // Observar todas as imagens
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.lazyObserver.observe(img);
            });
        }

        // Observer para mudanças de preferências do sistema
        if (window.matchMedia) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeMediaQuery.addEventListener('change', (e) => {
                const theme = document.querySelector('.theme-option.active')?.dataset.theme;
                if (theme === 'auto') {
                    this.applyTheme('auto');
                }
            });
        }
    }

    bindEvents() {
        // Event delegation para melhor performance
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('submit', this.handleGlobalSubmit.bind(this));
        document.addEventListener('input', this.handleGlobalInput.bind(this));
        document.addEventListener('change', this.handleGlobalChange.bind(this));

        // Eventos específicos
        if (this.elements.avatarEditBtn) {
            this.elements.avatarEditBtn.addEventListener('click', this.handleAvatarEdit.bind(this));
        }

        if (this.elements.cancelPersonalBtn) {
            this.elements.cancelPersonalBtn.addEventListener('click', this.resetPersonalDataForm.bind(this));
        }

        if (this.elements.helpBtn) {
            this.elements.helpBtn.addEventListener('click', this.handleHelpClick.bind(this));
        }

        if (this.elements.exportDataBtn) {
            this.elements.exportDataBtn.addEventListener('click', this.exportUserData.bind(this));
        }

        if (this.elements.deleteAccountBtn) {
            this.elements.deleteAccountBtn.addEventListener('click', this.handleDeleteAccount.bind(this));
        }

        if (this.elements.configureColorblindBtn) {
            this.elements.configureColorblindBtn.addEventListener('click', this.configureColorblind.bind(this));
        }

        // Eventos de teclado
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Eventos de resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Eventos de touch
        if (this.isTouch) {
            this.setupTouchEvents();
        }

        // Eventos de foco para acessibilidade
        this.setupFocusEvents();
    }

    handleGlobalClick(e) {
        const target = e.target;

        // Navegação
        if (target.closest('.nav-item')) {
            e.preventDefault();
            const item = target.closest('.nav-item');
            this.switchSection(item.dataset.section);
            return;
        }

        // Botões de ação
        if (target.closest('.security-action')) {
            const action = target.closest('.security-action');
            this.handleSecurityAction(action.dataset.action);
            return;
        }

        if (target.closest('#addressesList .edit-address-btn')) {
            e.preventDefault();

            const button =
                target.closest('.edit-address-btn');

            editarEndereco(button);

            return;
        }

        if (target.closest('#addressesList .delete-address-btn')) {
            e.preventDefault();

            const button =
                target.closest('.delete-address-btn');

            excluirEndereco(button.dataset.id);

            return;
        }

        if (target.closest('#cardsList .edit-card-btn')) {
            e.preventDefault();

            const button = target.closest('.edit-card-btn');

            editarCartao(button);

            return;
        }

        if (target.closest('#cardsList .delete-card-btn')) {
            e.preventDefault();

            const button = target.closest('.delete-card-btn');

            excluirCartao(button.dataset.id);

            return;
        }

        // Botões de formulário
        if (target.closest('.add-card-btn')) {
            e.preventDefault();
            this.toggleForm('addCardForm');
            return;
        }

        if (target.closest('.add-address-btn')) {
            e.preventDefault();
            this.toggleForm('addressFormContainer');
            return;
        }

        // Botões de cancelar
        if (target.closest('.cancel-password')) {
            e.preventDefault();
            this.toggleForm('changePasswordForm', false);
            return;
        }

        if (target.closest('.cancel-add-card')) {
            e.preventDefault();
            this.toggleForm('addCardForm', false);
            return;
        }

        if (target.closest('.cancel-address')) {
            e.preventDefault();
            this.toggleForm('addressFormContainer', false);
            return;
        }

        // Tema
        if (target.closest('.theme-option')) {
            const option = target.closest('.theme-option');
            this.selectTheme(option.dataset.theme);
            return;
        }

        // Switch toggles
        if (target.closest('.switch input[type="checkbox"]')) {
            const checkbox = target.closest('.switch input[type="checkbox"]');
            this.handleToggleChange(checkbox);
            return;
        }
    }

    handleGlobalSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (this.isSubmitting) {
            return;
        }

        this.isSubmitting = true;

        try {
            switch (form.id) {
                case 'personalDataForm':
                    this.handlePersonalDataSubmit(form);
                    break;

                case 'passwordForm':
                    this.handlePasswordChange(form);
                    break;

                case 'newCardForm':
                    return;

                case 'addressForm':
                    return;

                default:
                    console.warn('Formulário não reconhecido:', form.id);
            }
        } catch (error) {
            console.error('Erro ao processar formulário:', error);
            this.showNotification('Erro ao processar formulário', 'error');
        } finally {
            setTimeout(() => {
                this.isSubmitting = false;
            }, 1000);
        }
    }

    handleGlobalInput(e) {
        const target = e.target;

        // Validação em tempo real
        if (target.matches('#newPassword, #confirmPassword')) {
            this.updatePasswordStrength();
        }

        if (target.matches('#cardNumber')) {
            this.formatCardNumber(target);
        }

        if (target.matches('#expiryDate')) {
            this.formatExpiryDate(target);
        }

        if (target.matches('#zipCode')) {
            this.formatZipCode(target);
        }

        if (target.matches('#telefone, #addressPhone')) {
            this.formatPhoneNumber(target);
        }
    }

    handleGlobalChange(e) {
        const target = e.target;

        // Atualizar preferências
        if (target.matches('#language, #currency, #timezone, #itemsPerPage, #sortPreference')) {
            this.updatePreference(target.id, target.value);
        }
    }

    async loadUserData() {

        try {

            const usuario = JSON.parse(
                localStorage.getItem("usuario")
            );

            if (!usuario) {

                console.error("Usuário não encontrado");

                return;
            }

            this.userData = {
                id: usuario.id,
                nome: usuario.nomeCompleto ||
                    `${usuario.first_name || ""} ${usuario.last_name || ""}`.trim(),
                email: usuario.email,
                telefone: usuario.phone || "",
                cpf: usuario.cpf || "",
                dataNascimento: usuario.birth_date || "",
                genero: usuario.genero || ""
            };

            this.updateProfileDisplay();
            this.populateForms();

        } catch (error) {

            console.error(
                "Erro ao carregar usuário:",
                error
            );

        }
    }

    async fetchDefaultUserData() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    nome: 'João Silva',
                    email: 'joao.silva@email.com',
                    telefone: '(11) 99999-8888',
                    dataNascimento: '1990-05-15',
                    genero: 'masculino',
                    cpf: '123.456.789-00',
                    enderecos: [
                        {
                            id: 1,
                            addressName: 'Casa',
                            street: 'Rua das Flores',
                            number: '123',
                            complement: 'Apto 45',
                            neighborhood: 'Centro',
                            city: 'São Paulo',
                            state: 'SP',
                            zipCode: '01234-567',
                            addressPhone: '(11) 99999-8888',
                            principal: true
                        },
                        {
                            id: 2,
                            addressName: 'Trabalho',
                            street: 'Av. Paulista',
                            number: '1000',
                            complement: '10º andar',
                            neighborhood: 'Bela Vista',
                            city: 'São Paulo',
                            state: 'SP',
                            zipCode: '01310-100',
                            addressPhone: '(11) 3333-4444',
                            principal: false
                        }
                    ],
                    cartoes: [
                        {
                            id: 1,
                            cardNumber: '4321',
                            cardHolder: 'JOÃO SILVA',
                            expiryDate: '12/25',
                            cvv: '123',
                            cardType: 'visa',
                            principal: true
                        },
                        {
                            id: 2,
                            cardNumber: '8765',
                            cardHolder: 'JOÃO SILVA',
                            expiryDate: '08/24',
                            cvv: '456',
                            cardType: 'mastercard',
                            principal: false
                        }
                    ],
                    compras: 15,
                    favoritos: 8,
                    doacoes: 42,
                    preferencias: {
                        tema: 'auto',
                        language: 'pt-br',
                        currency: 'BRL',
                        timezone: 'America/Sao_Paulo',
                        itemsPerPage: '24',
                        sortPreference: 'price_desc'
                    },
                    configuracoes: {
                        perfilPublico: true,
                        mostrarCompras: false,
                        mostrarDoacoes: true,
                        permitirMensagens: false,
                        mostrarLocalizacao: false,
                        recomendacoes: true,
                        autenticacao2Fatores: true,
                        leitorTela: true,
                        reduzirAnimações: false
                    }
                });
            }, 100);
        });
    }

    getDefaultUserData() {
        return {
            nome: 'Usuário',
            email: 'usuario@email.com',
            telefone: '',
            dataNascimento: '',
            genero: '',
            cpf: '',
            enderecos: [],
            cartoes: [],
            compras: 0,
            favoritos: 0,
            doacoes: 0,
            preferencias: {},
            configuracoes: {}
        };
    }

    getInitials() {
        if (!this.userData?.nome) return 'US';
        return this.userData.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    updateProfileDisplay() {

        if (!this.userData) return;

        const nome =
            this.userData.nome || "Usuário";

        const email =
            this.userData.email || "";

        // Cabeçalho
        const profileName =
            document.querySelector(".profile-name");

        const profileEmail =
            document.querySelector(".profile-email");

        if (profileName)
            profileName.textContent = nome;

        if (profileEmail)
            profileEmail.textContent = email;

        // Avatar
        const avatar =
            document.querySelector(".profile-avatar-large span");

        if (avatar) {

            avatar.textContent = nome
                .split(" ")
                .map(p => p[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
        }
    }

    populateForms() {

        if (!this.userData) return;

        const nomeCompleto =
            document.getElementById("nomeCompleto");

        const email =
            document.getElementById("email");

        const telefone =
            document.getElementById("telefone");

        const cpf =
            document.getElementById("cpf");

        const dataNascimento =
            document.getElementById("dataNascimento");

        if (nomeCompleto)
            nomeCompleto.value = this.userData.nome || "";

        if (email)
            email.value = this.userData.email || "";

        if (telefone)
            telefone.value = this.userData.telefone || "";

        if (cpf)
            cpf.value = this.userData.cpf || "";

        if (dataNascimento)
            dataNascimento.value =
                this.userData.dataNascimento || "";
    }

    loadPreferences() {
        if (!this.userData?.preferencias) return;

        // Tema
        const theme = this.userData.preferencias.tema || 'auto';
        this.selectTheme(theme);

        // Outras preferências
        Object.entries(this.userData.preferencias).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element && value) {
                element.value = value;
            }
        });

        // Configurações (toggles)
        if (this.userData.configuracoes) {
            Object.entries(this.userData.configuracoes).forEach(([key, value]) => {
                const element = document.querySelector(`input[name="${key}"]`);
                if (element) {
                    element.checked = value;
                }
            });
        }
    }

    setupSectionNavigation() {
        // Verificar hash da URL
        const hash = window.location.hash.substring(1);
        const validSections = [
            'dados-pessoais', 'seguranca', 'cartoes',
            'enderecos', 'privacidade', 'notificacoes', 'preferencias'
        ];

        if (hash && validSections.includes(hash)) {
            this.switchSection(hash);
        } else {
            this.switchSection('dados-pessoais');
        }

        // Adicionar listener para hash changes
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.substring(1);
            if (validSections.includes(newHash)) {
                this.switchSection(newHash);
            }
        });
    }

    switchSection(sectionId) {
        if (this.currentSection === sectionId) return;

        // Animar transição
        const currentSection = this.currentSection
            ? document.getElementById(this.currentSection)
            : null;
        const targetSection = document.getElementById(sectionId);
        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);

        if (!targetSection || !targetNavItem) return;

        // Esconder seção atual
        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('fading-out');

            setTimeout(() => {
                currentSection.classList.remove('fading-out');
            }, 300);
        }

        // Atualizar navegação
        this.elements.navItems.forEach(item => item.classList.remove('active'));
        targetNavItem.classList.add('active');
        targetNavItem.focus();

        // Atualizar URL sem recarregar a página
        history.pushState(null, '', `#${sectionId}`);

        // Mostrar nova seção
        setTimeout(() => {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Scroll para a seção
            if (!this.isMobile) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: targetSection.offsetTop - 20, behavior: 'smooth' });
            }

            // Fechar formulários abertos em mobile
            if (this.isMobile) {
                this.closeAllForms();
            }
        }, 50);
    }

    setupFormHandlers() {
        // Prevenir múltiplas submissões
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                if (this.isSubmitting) {
                    e.preventDefault();
                    return;
                }
            });
        });

        // Configurar máscaras
        this.setupInputMasks();
    }

    setupInputMasks() {
        // Máscara para CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.substring(0, 11);

                if (value.length > 9) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (value.length > 3) {
                    value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
                }

                e.target.value = value;
            });
        }

        // Máscara para CEP
        const zipCodeInput = document.getElementById('zipCode');
        if (zipCodeInput) {
            zipCodeInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 8) value = value.substring(0, 8);

                if (value.length > 5) {
                    value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
                }

                e.target.value = value;
            });
        }
    }

    async handlePersonalDataSubmit(form) {

        try {

            const usuario = JSON.parse(
                localStorage.getItem("usuario")
            );

            if (!usuario || !usuario.id) {
                this.showNotification("Usuário não encontrado.", "error");
                return;
            }

            const nomeCompleto =
                document.getElementById("nomeCompleto").value.trim();

            const partesNome = nomeCompleto.split(" ");

            const first_name = partesNome[0] || "";

            const last_name =
                partesNome.slice(1).join(" ");

            const payload = {
                first_name,
                last_name,
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("telefone").value.trim(),
                birth_date: document.getElementById("dataNascimento").value,
                cpf: document.getElementById("cpf").value.trim()
            };

            const submitBtn =
                form.querySelector('button[type="submit"]');

            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML =
                '<i class="bi bi-hourglass"></i> Salvando...';

            submitBtn.disabled = true;

            const response = await fetch(
                `http://localhost:3600/users/${usuario.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();

            console.log("Perfil atualizado:", result);

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            usuario.first_name = first_name;
            usuario.last_name = last_name;
            usuario.nomeCompleto = nomeCompleto;
            usuario.email = payload.email;
            usuario.phone = payload.phone;
            usuario.birth_date = payload.birth_date;
            usuario.cpf = payload.cpf;

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            this.userData = {
                ...this.userData,
                nome: nomeCompleto,
                email: payload.email,
                telefone: payload.phone,
                dataNascimento: payload.birth_date,
                cpf: payload.cpf
            };

            preencherPerfil({
                first_name,
                last_name,
                email: payload.email,
                phone: payload.phone,
                birth_date: payload.birth_date,
                cpf: payload.cpf
            });

            window.dispatchEvent(
                new Event("usuarioAtualizado")
            );

            this.showNotification(
                "Dados pessoais atualizados com sucesso!",
                "success"
            );

        } catch (error) {

            console.error("Erro ao salvar perfil:", error);

            this.showNotification(
                "Erro ao salvar dados pessoais.",
                "error"
            );
        }
    }

    validatePersonalData(data) {
        const errors = [];

        if (!data.nome || data.nome.trim().length < 3) {
            errors.push('Nome deve ter pelo menos 3 caracteres');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push('Por favor, insira um e-mail válido');
        }

        if (data.telefone) {
            const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            if (!phoneRegex.test(data.telefone)) {
                errors.push('Formato de telefone inválido. Use (99) 99999-9999');
            }
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    resetPersonalDataForm() {
        if (this.elements.personalDataForm) {
            this.elements.personalDataForm.reset();
            this.populateForms();
            this.showNotification('Alterações canceladas', 'info');
        }
    }

    async handlePasswordChange(form) {

        try {

            const usuario = JSON.parse(
                localStorage.getItem("usuario")
            );

            if (!usuario || !usuario.id) {
                this.showNotification(
                    "Usuário não encontrado.",
                    "error"
                );
                return;
            }

            const currentPassword =
                document.getElementById("currentPassword").value.trim();

            const newPassword =
                document.getElementById("newPassword").value.trim();

            const confirmPassword =
                document.getElementById("confirmPassword").value.trim();

            if (!currentPassword || !newPassword || !confirmPassword) {
                this.showNotification(
                    "Preencha todos os campos de senha.",
                    "error"
                );
                return;
            }

            if (newPassword !== confirmPassword) {
                this.showNotification(
                    "A nova senha e a confirmação não coincidem.",
                    "error"
                );
                return;
            }

            if (newPassword.length < 8) {
                this.showNotification(
                    "A nova senha deve ter pelo menos 8 caracteres.",
                    "error"
                );
                return;
            }

            const submitBtn =
                form.querySelector('button[type="submit"]');

            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML =
                '<i class="bi bi-hourglass"></i> Atualizando...';

            submitBtn.disabled = true;

            const response = await fetch(
                `http://localhost:3600/users/${usuario.id}/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword
                    })
                }
            );

            const result = await response.json();

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            if (!result.success) {
                this.showNotification(
                    result.message || "Erro ao alterar senha.",
                    "error"
                );
                return;
            }

            form.reset();

            document.getElementById("changePasswordForm").style.display = "none";

            this.showNotification(
                "Senha alterada com sucesso!",
                "success"
            );

        } catch (error) {

            console.error("Erro ao alterar senha:", error);

            this.showNotification(
                "Erro ao conectar com o servidor.",
                "error"
            );
        }
    }



    validatePasswordData(data) {
        const errors = [];

        if (!data.currentPassword) {
            errors.push('Digite sua senha atual');
        }

        if (!data.newPassword || data.newPassword.length < 8) {
            errors.push('A nova senha deve ter pelo menos 8 caracteres');
        }

        if (data.newPassword !== data.confirmPassword) {
            errors.push('As senhas não coincidem');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    updatePasswordStrength() {
        const password = document.getElementById('newPassword')?.value || '';
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text strong');

        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let color = '#ff4757';
        let text = 'Fraca';

        // Verificar comprimento
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;

        // Verificar complexidade
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;

        // Ajustar para máximo 100%
        strength = Math.min(strength, 100);

        // Determinar cor e texto
        if (strength >= 75) {
            color = '#00cc99';
            text = 'Forte';
        } else if (strength >= 50) {
            color = '#ffa502';
            text = 'Média';
        } else if (strength >= 25) {
            color = '#ffa502';
            text = 'Média';
        }

        // Atualizar display
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }

    handleSecurityAction(action) {
        switch (action) {
            case 'change-password':
                this.toggleForm('changePasswordForm');
                break;
            case 'manage-sessions':
                this.manageActiveSessions();
                break;
            case 'view-login-history':
                this.viewLoginHistory();
                break;
            default:
                console.warn('Ação de segurança desconhecida:', action);
        }
    }

    manageActiveSessions() {
        this.showNotification('Funcionalidade em desenvolvimento', 'info');
    }

    viewLoginHistory() {
        this.showNotification('Funcionalidade em desenvolvimento', 'info');
    }

    async handleNewCardSubmit(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validateCardData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Adicionando...';
            submitBtn.disabled = true;

            // Adicionar cartão
            if (!this.userData.cartoes) this.userData.cartoes = [];

            const novoCartao = {
                id: Date.now(),
                ...data,
                numeroMascarado: '**** **** **** ' + data.cardNumber.slice(-4),
                principal: data.setAsPrimary === 'on'
            };

            this.userData.cartoes.push(novoCartao);

            // Salvar
            await this.saveUserData();

            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Fechar formulário
            this.toggleForm('addCardForm', false);
            form.reset();

            // Atualizar lista
            this.updateCardsList();

            // Notificar sucesso
            this.showNotification('Cartão adicionado com sucesso!', 'success');

        } catch (error) {
            console.error('Erro ao adicionar cartão:', error);
            this.showNotification('Erro ao adicionar cartão', 'error');

            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Adicionar Cartão';
            submitBtn.disabled = false;
        }
    }



    validateCardData(data) {
        const errors = [];

        // Validar número do cartão
        const cardNumber = data.cardNumber.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumber)) {
            errors.push('Número do cartão inválido (16 dígitos necessários)');
        }

        // Validar nome
        if (!data.cardHolder || data.cardHolder.trim().length < 3) {
            errors.push('Nome no cartão muito curto');
        }

        // Validar validade
        const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryRegex.test(data.expiryDate)) {
            errors.push('Data de validade inválida. Use MM/AA');
        }

        // Validar CVV
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(data.cvv)) {
            errors.push('CVV inválido (3 ou 4 dígitos)');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 16) value = value.substring(0, 16);

        value = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = value;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substring(0, 4);

        if (value.length >= 2) {
            value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
        }

        input.value = value;
    }

    async handleAddressSubmit(form) {
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validar
            if (!this.validateAddressData(data)) {
                return;
            }

            // Mostrar indicador de carregamento
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass"></i> Salvando...';
            submitBtn.disabled = true;

            // Adicionar endereço
            if (!this.userData.enderecos) this.userData.enderecos = [];

            const novoEndereco = {
                id: Date.now(),
                ...data,
                principal: data.setAsPrimaryAddress === 'on'
            };

            this.userData.enderecos.push(novoEndereco);

            // Salvar
            await this.saveUserData();

            // Restaurar botão
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Fechar formulário
            this.toggleForm('addressFormContainer', false);
            form.reset();

            // Atualizar lista
            this.updateAddressList();

            // Notificar sucesso
            this.showNotification('Endereço salvo com sucesso!', 'success');

        } catch (error) {
            console.error('Erro ao salvar endereço:', error);
            this.showNotification('Erro ao salvar endereço', 'error');

            // Restaurar botão em caso de erro
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Salvar Endereço';
            submitBtn.disabled = false;
        }
    }

    validateAddressData(data) {
        const errors = [];

        if (!data.street || data.street.trim().length < 3) {
            errors.push('Rua/Avenida é obrigatória');
        }

        if (!data.number) {
            errors.push('Número é obrigatório');
        }

        if (!data.city || data.city.trim().length < 3) {
            errors.push('Cidade é obrigatória');
        }

        if (data.zipCode) {
            const zipCodeRegex = /^[0-9]{5}-?[0-9]{3}$/;
            if (!zipCodeRegex.test(data.zipCode)) {
                errors.push('CEP inválido. Use 00000-000');
            }
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    formatZipCode(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 8) value = value.substring(0, 8);

        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }

        input.value = value;
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);

        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/(\d{2})/, '($1) ');
        }

        input.value = value;
    }

    toggleForm(formId, show = null) {
        const form = document.getElementById(formId);
        if (!form) return;

        const shouldShow = show !== null ? show : form.style.display === 'none';

        if (shouldShow) {
            form.style.display = 'block';
            setTimeout(() => {
                form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Focar no primeiro campo
                const firstInput = form.querySelector('input, select, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        } else {
            form.style.display = 'none';
        }
    }

    closeAllForms() {
        const forms = [
            'changePasswordForm',
            'addCardForm',
            'addressFormContainer'
        ];

        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                form.style.display = 'none';
            }
        });
    }

    handleAddressAction(button) {
        const action = button.dataset.action;
        const addressCard = button.closest('.address-card');
        const addressId = addressCard?.dataset?.id;

        switch (action) {
            case 'edit':
                this.editAddress(addressId);
                break;
            case 'remove':
                this.removeAddress(addressId, addressCard);
                break;
            case 'set-primary':
                this.setPrimaryAddress(addressId);
                break;
        }
    }

    async editAddress(addressId) {
        const endereco = this.userData.enderecos?.find(a => a.id == addressId);
        if (!endereco) return;

        // Preencher formulário
        Object.entries(endereco).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });

        // Mostrar formulário
        this.toggleForm('addressFormContainer', true);
    }

    async removeAddress(addressId, addressCard) {
        this.showConfirmationModal(
            'Remover Endereço',
            'Tem certeza que deseja remover este endereço? Esta ação não pode ser desfeita.',
            async () => {
                try {
                    // Remover do array
                    this.userData.enderecos = this.userData.enderecos?.filter(a => a.id != addressId) || [];

                    // Salvar
                    await this.saveUserData();

                    // Remover do DOM
                    if (addressCard) {
                        addressCard.remove();
                    }

                    // Notificar sucesso
                    this.showNotification('Endereço removido com sucesso!', 'success');

                } catch (error) {
                    console.error('Erro ao remover endereço:', error);
                    this.showNotification('Erro ao remover endereço', 'error');
                }
            }
        );
    }

    async setPrimaryAddress(addressId) {
        try {
            // Marcar todos como não principais
            this.userData.enderecos?.forEach(endereco => {
                endereco.principal = endereco.id == addressId;
            });

            // Salvar
            await this.saveUserData();

            // Atualizar interface
            this.updateAddressList();

            // Notificar sucesso
            this.showNotification('Endereço definido como principal!', 'success');

        } catch (error) {
            console.error('Erro ao definir endereço principal:', error);
            this.showNotification('Erro ao definir endereço principal', 'error');
        }
    }

    handleCardAction(button) {
        const cardItem = button.closest('.card-item');
        const cardId = cardItem?.dataset?.id;
        const isRemove = button.querySelector('.bi-trash');

        if (isRemove) {
            this.removeCard(cardId, cardItem);
        } else {
            this.editCard(cardId);
        }
    }

    async removeCard(cardId, cardItem) {
        this.showConfirmationModal(
            'Remover Cartão',
            'Tem certeza que deseja remover este cartão? Esta ação não pode ser desfeita.',
            async () => {
                try {
                    // Remover do array
                    this.userData.cartoes = this.userData.cartoes?.filter(c => c.id != cardId) || [];

                    // Salvar
                    await this.saveUserData();

                    // Remover do DOM
                    if (cardItem) {
                        cardItem.remove();
                    }

                    // Notificar sucesso
                    this.showNotification('Cartão removido com sucesso!', 'success');

                } catch (error) {
                    console.error('Erro ao remover cartão:', error);
                    this.showNotification('Erro ao remover cartão', 'error');
                }
            }
        );
    }

    editCard(cardId) {
        const cartao = this.userData.cartoes?.find(c => c.id == cardId);
        if (!cartao) return;

        // Preencher formulário
        Object.entries(cartao).forEach(([key, value]) => {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        });

        // Mostrar formulário
        this.toggleForm('addCardForm', true);
    }

    updateAddressList() {
        const addressesList = document.querySelector('.addresses-list');
        if (!addressesList || !this.userData?.enderecos) return;

        // Limpar lista existente
        addressesList.innerHTML = '';

        // Adicionar endereços
        this.userData.enderecos.forEach(endereco => {
            const addressCard = document.createElement('div');
            addressCard.className = `address-card ${endereco.principal ? 'primary' : ''}`;
            addressCard.dataset.id = endereco.id;

            addressCard.innerHTML = `
                <div class="address-header">
                    <h3><i class="bi ${endereco.principal ? 'bi-house-check' : 'bi-building'}"></i> ${endereco.addressName}</h3>
                    ${endereco.principal ? '<span class="address-tag">Principal</span>' : ''}
                </div>
                <div class="address-body">
                    <p class="address-line">${endereco.street}, ${endereco.number}</p>
                    <p class="address-line">${endereco.complement}</p>
                    <p class="address-line">${endereco.neighborhood}</p>
                    <p class="address-line">${endereco.city} - ${endereco.state}</p>
                    <p class="address-line">CEP: ${endereco.zipCode}</p>
                    <p class="address-contact">Telefone: ${endereco.addressPhone}</p>
                </div>
                <div class="address-actions">
                    ${!endereco.principal ? `
                        <button class="address-action" data-action="set-primary">
                            <i class="bi bi-star"></i>
                            Tornar Principal
                        </button>
                    ` : ''}
                    <button class="address-action" data-action="edit">
                        <i class="bi bi-pencil"></i>
                        Editar
                    </button>
                    <button class="address-action" data-action="remove">
                        <i class="bi bi-trash"></i>
                        Remover
                    </button>
                </div>
            `;

            addressesList.appendChild(addressCard);
        });

        // Adicionar botão de adicionar endereço
        const addButton = document.querySelector('.add-address-btn');
        if (addButton) {
            addressesList.appendChild(addButton.cloneNode(true));
            const newButton = addressesList.querySelector('.add-address-btn:last-child');
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForm('addressFormContainer');
            });
        }
    }

    updateCardsList() {
        const cardsList = document.querySelector('.cards-list');
        if (!cardsList || !this.userData?.cartoes) return;

        // Limpar lista existente
        cardsList.innerHTML = '';

        // Adicionar cartões
        this.userData.cartoes.forEach(cartao => {
            const cardItem = document.createElement('div');
            cardItem.className = `card-item ${cartao.principal ? 'primary' : ''}`;
            cardItem.dataset.id = cartao.id;

            cardItem.innerHTML = `
                <div class="card-icon">
                    <i class="bi bi-credit-card${cartao.principal ? '-2-front' : ''}"></i>
                </div>
                <div class="card-details">
                    <h3>Cartão ${cartao.principal ? 'Principal' : 'Secundário'}</h3>
                    <p class="card-number">${cartao.numeroMascarado || '**** **** **** ' + cartao.cardNumber.slice(-4)}</p>
                    <p class="card-info">${this.getCardTypeName(cartao.cardType)} • Válido até ${cartao.expiryDate}</p>
                </div>
                <div class="card-actions">
                    <button class="card-action" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="card-action" title="Remover">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;

            cardsList.appendChild(cardItem);
        });

        // Adicionar botão de adicionar cartão
        const addButton = document.querySelector('.add-card-btn');
        if (addButton) {
            cardsList.appendChild(addButton.cloneNode(true));
            const newButton = cardsList.querySelector('.add-card-btn:last-child');
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForm('addCardForm');
            });
        }
    }

    getCardTypeName(type) {
        const types = {
            'visa': 'Visa',
            'mastercard': 'Mastercard',
            'amex': 'American Express',
            'elo': 'Elo'
        };
        return types[type] || type;
    }

    async selectTheme(theme) {
        try {
            // Atualizar opções
            this.elements.themeOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.theme === theme);
            });

            // Aplicar tema
            this.applyTheme(theme);

            // Salvar preferência
            if (!this.userData.preferencias) this.userData.preferencias = {};
            this.userData.preferencias.tema = theme;
            await this.saveUserData();

            // Notificar
            this.showNotification(`Tema ${this.getThemeName(theme)} aplicado!`, 'success');

        } catch (error) {
            console.error('Erro ao aplicar tema:', error);
            this.showNotification('Erro ao aplicar tema', 'error');
        }
    }

    applyTheme(theme) {
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark-mode', prefersDark);
        } else {
            document.body.classList.toggle('dark-mode', theme === 'dark');
        }
    }

    getThemeName(theme) {
        const themes = {
            'light': 'Claro',
            'dark': 'Escuro',
            'auto': 'Automático'
        };
        return themes[theme] || theme;
    }

    updatePreference(key, value) {
        if (!this.userData.preferencias) this.userData.preferencias = {};
        this.userData.preferencias[key] = value;
        this.saveUserData();
    }

    handleToggleChange(checkbox) {
        const name = checkbox.name || checkbox.id;
        const value = checkbox.checked;

        if (!this.userData.configuracoes) this.userData.configuracoes = {};
        this.userData.configuracoes[name] = value;

        this.saveUserData();

        // Feedback visual
        const settingName = this.getSettingName(name);
        const status = value ? 'ativada' : 'desativada';
        this.showNotification(`${settingName} ${status}`, 'info');
    }

    getSettingName(name) {
        const settings = {
            'perfilPublico': 'Perfil público',
            'mostrarCompras': 'Histórico de compras',
            'mostrarDoacoes': 'Doações realizadas',
            'permitirMensagens': 'Mensagens de estranhos',
            'mostrarLocalizacao': 'Localização',
            'recomendacoes': 'Recomendações personalizadas',
            'autenticacao2Fatores': 'Autenticação de dois fatores',
            'leitorTela': 'Otimização para leitor de tela',
            'reduzirAnimações': 'Redução de animações'
        };
        return settings[name] || name;
    }

    handleAvatarEdit() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                // Validar arquivo
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error('A imagem deve ter no máximo 5MB');
                }

                if (!file.type.startsWith('image/')) {
                    throw new Error('Por favor, selecione uma imagem válida');
                }

                // Mostrar indicador de carregamento
                this.showNotification('Enviando imagem...', 'info');

                // Simular upload
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Atualizar avatar (em produção, você faria upload para servidor)
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Em produção, você salvaria a URL da imagem
                    this.showNotification('Foto de perfil atualizada com sucesso!', 'success');

                    // Aqui você atualizaria a imagem real
                    // this.elements.profileAvatar.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);

            } catch (error) {
                this.showNotification(error.message, 'error');
            }
        };

        document.body.appendChild(input);
        input.click();
        setTimeout(() => document.body.removeChild(input), 100);
    }

    handleHelpClick() {
        this.showNotification('Em breve você poderá falar com nosso suporte!', 'info');
    }

    async exportUserData() {
        try {
            this.showNotification('Preparando seus dados para exportação...', 'info');

            await new Promise(resolve => setTimeout(resolve, 1500));

            // Criar blob com os dados
            const dataStr = JSON.stringify(this.userData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            // Criar link para download
            const downloadUrl = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `reuse-dados-${Date.now()}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(downloadUrl);

            this.showNotification('Dados exportados com sucesso!', 'success');

        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            this.showNotification('Erro ao exportar dados', 'error');
        }
    }

    handleDeleteAccount() {
        this.showConfirmationModal(
            'Excluir Conta',
            'Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão permanentemente removidos.',
            async () => {
                try {
                    this.showNotification('Solicitação de exclusão enviada!', 'success');
                    // Em produção, você faria uma requisição para a API
                } catch (error) {
                    console.error('Erro ao solicitar exclusão:', error);
                    this.showNotification('Erro ao solicitar exclusão', 'error');
                }
            }
        );
    }

    configureColorblind() {
        this.showNotification('Configurações de daltonismo em desenvolvimento!', 'info');
    }

    setupModalSystem() {
        if (!this.elements.confirmationModal) return;

        // Fechar modal
        const closeModal = () => {
            this.elements.confirmationModal.classList.remove('active');
            this.modalQueue.shift();
            this.processNextModal();
        };

        // Event listeners
        if (this.elements.closeConfirmationModal) {
            this.elements.closeConfirmationModal.onclick = closeModal;
        }

        if (this.elements.cancelAction) {
            this.elements.cancelAction.onclick = closeModal;
        }

        // Fechar ao clicar fora
        this.elements.confirmationModal.onclick = (e) => {
            if (e.target === this.elements.confirmationModal) {
                closeModal();
            }
        };

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.confirmationModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    showConfirmationModal(title, message, onConfirm) {
        this.modalQueue.push({ title, message, onConfirm });
        this.processNextModal();
    }

    processNextModal() {
        if (this.modalQueue.length === 0 || !this.elements.confirmationModal) return;

        const modal = this.modalQueue[0];
        const isActive = this.elements.confirmationModal.classList.contains('active');

        if (!isActive) {
            // Atualizar conteúdo
            if (this.elements.confirmationTitle) {
                this.elements.confirmationTitle.textContent = modal.title;
            }

            if (this.elements.confirmationMessage) {
                this.elements.confirmationMessage.textContent = modal.message;
            }

            // Configurar botão de confirmação
            if (this.elements.confirmAction) {
                const confirmHandler = () => {
                    modal.onConfirm();
                    this.elements.confirmationModal.classList.remove('active');
                    this.modalQueue.shift();
                    this.elements.confirmAction.onclick = null;
                    this.processNextModal();
                };

                this.elements.confirmAction.onclick = confirmHandler;
            }

            // Mostrar modal
            this.elements.confirmationModal.classList.add('active');
            this.elements.confirmAction.focus();
        }
    }

    showNotification(message, type = 'info') {
        // Remover notificações antigas
        const oldNotifications = document.querySelectorAll('.profile-notification');
        oldNotifications.forEach(n => n.remove());

        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `profile-notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Ícone
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-circle-fill',
            info: 'bi-info-circle-fill'
        };

        notification.innerHTML = `
            <i class="bi ${icons[type] || icons.info}" aria-hidden="true"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Fechar notificação">
                <i class="bi bi-x" aria-hidden="true"></i>
            </button>
        `;

        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: this.isMobile ? '10px' : '20px',
            right: this.isMobile ? '10px' : '20px',
            left: this.isMobile ? '10px' : 'auto',
            background: this.getNotificationColor(type),
            color: 'white',
            padding: this.isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
            borderRadius: 'var(--border-radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            maxWidth: this.isMobile ? 'calc(100% - 20px)' : '400px',
            wordBreak: 'break-word'
        });

        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.onclick = () => {
            notification.remove();
        };

        // Adicionar ao DOM
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        document.body.appendChild(notification);

        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });

        // Auto-remover
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, this.notificationDuration);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#00cc99',
            error: '#ff4757',
            warning: '#ff9500',
            info: '#0066cc'
        };
        return colors[type] || colors.info;
    }

    updateStats() {
        if (!this.elements.statsCards || !this.userData) return;

        const stats = [
            { value: this.userData.compras || 15, label: 'Compras' },
            { value: this.userData.favoritos || 8, label: 'Favoritos' },
            { value: this.userData.doacoes || 42, label: 'Doações' }
        ];

        this.elements.statsCards.forEach((card, index) => {
            const stat = stats[index];
            if (stat) {
                const h4 = card.querySelector('h4');
                const p = card.querySelector('p');
                if (h4) h4.textContent = stat.value;
                if (p) p.textContent = stat.label;
            }
        });
    }

    updateSettings() {
        // Atualizar configurações baseadas nos dados do usuário
        if (!this.userData?.configuracoes) return;

        Object.entries(this.userData.configuracoes).forEach(([key, value]) => {
            const checkbox = document.querySelector(`input[name="${key}"]`);
            if (checkbox) {
                checkbox.checked = value;
            }
        });
    }

    async saveUserData() {
        try {
            localStorage.setItem('reuse_user_data', JSON.stringify(this.userData));

            // Disparar evento customizado
            window.dispatchEvent(new CustomEvent('userDataUpdated', {
                detail: this.userData
            }));

            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            throw error;
        }
    }

    setupPerformanceOptimizations() {
        // Debounce para eventos pesados
        this.debouncedFunctions = new Map();

        // Otimizar animações
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.preloadAssets();
            });
        }

        // Usar requestAnimationFrame para animações
        this.animationFrame = null;
    }

    preloadAssets() {
        // Precarregar assets importantes
        const assets = [
            // Ícones, imagens, etc.
        ];

        assets.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    setupTouchEvents() {
        // Melhorar experiência touch
        document.querySelectorAll('button, .nav-item, .card-action, .address-action').forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
        });

        // Prevenir zoom em inputs
        document.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                e.target.style.fontSize = '16px';
            }
        }, { passive: true });

        // Melhorar scroll em mobile
        if (this.isMobile) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    setupAccessibility() {
        // Adicionar labels ARIA
        document.querySelectorAll('.nav-item').forEach((item, index) => {
            item.setAttribute('aria-label', `Navegar para ${item.textContent.trim()}`);
            item.setAttribute('aria-current', item.classList.contains('active') ? 'page' : 'false');
        });

        // Melhorar navegação por teclado
        document.querySelectorAll('button, input, select, textarea').forEach(el => {
            el.setAttribute('tabindex', '0');
        });

        // Adicionar skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ir para o conteúdo principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            z-index: 10000;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.id = 'main-content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }
    }

    setupFocusEvents() {
        // Melhorar foco para acessibilidade
        document.addEventListener('focusin', (e) => {
            const target = e.target;
            if (target.matches('.nav-item, .btn-primary, .btn-secondary, .security-action')) {
                target.style.outline = '2px solid var(--primary-blue)';
                target.style.outlineOffset = '2px';
            }
        });

        document.addEventListener('focusout', (e) => {
            const target = e.target;
            if (target.matches('.nav-item, .btn-primary, .btn-secondary, .security-action')) {
                target.style.outline = 'none';
            }
        });
    }

    handleResize() {
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;

        // Ajustar layout baseado no tamanho da tela
        if (this.isMobile) {
            this.closeAllForms();
        }
    }

    handleKeyboard(e) {
        // Navegação por teclado
        if (e.key === 'Escape') {
            this.closeAllForms();
            if (this.elements.confirmationModal?.classList.contains('active')) {
                this.elements.confirmationModal.classList.remove('active');
            }
        }

        // Atalhos
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const activeForm = document.querySelector('form:not([style*="display: none"])');
            if (activeForm) {
                activeForm.requestSubmit();
            }
        }

        // Navegação entre seções com teclado
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const activeNav = document.querySelector('.nav-item.active');
            if (activeNav) {
                const allNavs = Array.from(this.elements.navItems);
                const currentIndex = allNavs.indexOf(activeNav);
                let nextIndex;

                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % allNavs.length;
                } else {
                    nextIndex = (currentIndex - 1 + allNavs.length) % allNavs.length;
                }

                allNavs[nextIndex].click();
                allNavs[nextIndex].focus();
                e.preventDefault();
            }
        }
    }

    showWelcomeMessage() {
        // Mostrar mensagem de boas-vindas apenas na primeira visita
        const hasSeenWelcome = sessionStorage.getItem('hasSeenProfileWelcome');

        if (!hasSeenWelcome && this.userData?.nome) {
            setTimeout(() => {
                const firstName = this.userData.nome.split(' ')[0];
                this.showNotification(`Bem-vindo de volta, ${firstName}!`, 'info');
                sessionStorage.setItem('hasSeenProfileWelcome', 'true');
            }, 1000);
        }
    }

    setupImageHandling() {
        // Garantir que o avatar nunca desapareça
        const ensureAvatarVisibility = () => {
            const avatar = document.querySelector('.profile-avatar-large');
            if (avatar) {
                avatar.style.display = 'flex';
                avatar.style.visibility = 'visible';
                avatar.style.opacity = '1';
                avatar.style.position = 'relative';
                avatar.style.zIndex = '1000';
            }
        };

        // Verificar periodicamente
        setInterval(ensureAvatarVisibility, 1000);

        // Verificar inicialmente
        ensureAvatarVisibility();
    }

    // Métodos utilitários
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Getters e setters
    getUserData() {
        return { ...this.userData };
    }

    setUserData(data) {
        this.userData = { ...this.userData, ...data };
        this.updateProfileDisplay();
        this.saveUserData();
    }

    // Cleanup
    destroy() {
        // Remover observers
        if (this.domObserver) {
            this.domObserver.disconnect();
        }

        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }

        // Remover event listeners
        document.removeEventListener('click', this.handleGlobalClick);
        document.removeEventListener('submit', this.handleGlobalSubmit);
        document.removeEventListener('input', this.handleGlobalInput);
        document.removeEventListener('change', this.handleGlobalChange);
        document.removeEventListener('keydown', this.handleKeyboard);
        window.removeEventListener('resize', this.debounce(this.handleResize, 250));

        // Limpar timeouts e intervals
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos dinâmicos
    const styles = document.createElement('style');
    styles.textContent = `
        .profile-notification {
            animation: notificationSlideIn 0.3s ease;
        }
        
        @keyframes notificationSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .profile-notification .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .profile-notification .notification-close:hover {
            opacity: 1;
        }
        
        .fading-out {
            animation: fadeOut 0.3s ease;
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(10px);
            }
        }
        
        /* Garantir que o avatar nunca desapareça */
        .profile-avatar-large {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
            z-index: 1000 !important;
        }
        
        /* Estados de carregamento */
        .loading {
            position: relative;
            opacity: 0.7;
            pointer-events: none;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Melhorias para acessibilidade */
        .nav-item:focus,
        .btn-primary:focus,
        .btn-secondary:focus,
        .security-action:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
        
        /* Responsividade adicional */
        @media (max-width: 768px) {
            .profile-avatar-large {
                width: 100px !important;
                height: 100px !important;
                font-size: 2.2rem !important;
            }
            
            .profile-notification {
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .profile-avatar-large {
                width: 80px !important;
                height: 80px !important;
                font-size: 1.8rem !important;
            }
        }
    `;
    document.head.appendChild(styles);

    // Inicializar
    try {
        window.perfilCliente = new PerfilCliente();
    } catch (error) {
        console.error('Erro ao inicializar PerfilCliente:', error);
        // Fallback básico
        const fallbackInit = () => {
            const avatar = document.querySelector('.profile-avatar-large');
            if (avatar) {
                avatar.style.display = 'flex';
                avatar.style.visibility = 'visible';
                avatar.style.opacity = '1';
            }

            // Garantir navegação básica
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function () {
                    const sectionId = this.dataset.section;
                    document.querySelectorAll('.profile-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-item').forEach(navItem => {
                        navItem.classList.remove('active');
                    });

                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        this.classList.add('active');
                    }
                });
            });
        };
        fallbackInit();
    }

    // Integração com outros módulos
    setupProfileIntegration();
});

function setupProfileIntegration() {
    // Atualizar dados em outros lugares da aplicação
    const updateGlobalUserData = (data) => {
        // Atualizar header
        const headerElements = {
            '.user-details h4': data?.nome,
            '.user-details p': data?.email
        };

        Object.entries(headerElements).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element && value) {
                element.textContent = value;
            }
        });

        // Atualizar iniciais
        if (data?.nome) {
            const initials = data.nome
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .substring(0, 2);

            document.querySelectorAll('.profile-avatar span').forEach(el => {
                el.textContent = initials;
            });
        }
    };

    // Escutar mudanças
    window.addEventListener('userDataUpdated', (e) => {
        updateGlobalUserData(e.detail);
    });

    // Carregar dados iniciais
    const savedData = localStorage.getItem('reuse_user_data');
    if (savedData) {
        try {
            updateGlobalUserData(JSON.parse(savedData));
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerfilCliente;
}

document.addEventListener("DOMContentLoaded", () => {

    const changePhotoBtn = document.getElementById("changePhotoBtn");
    const editAvatarBtn = document.getElementById("editAvatarBtn");

    if (changePhotoBtn) {
        changePhotoBtn.addEventListener("click", selecionarFoto);
    }

    if (editAvatarBtn) {
        editAvatarBtn.addEventListener("click", selecionarFoto);
    }
});

function selecionarFoto() {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp";

    input.onchange = () => {
        const file = input.files[0];

        if (!file) return;

        enviarFoto(file);
    };

    input.click();
}

async function enviarFoto(file) {

    try {

        const usuario = JSON.parse(
            localStorage.getItem("usuario")
        );

        if (!usuario || !usuario.id) {
            mostrarMensagem("Usuário não encontrado.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("photo", file);

        const response = await fetch(
            `http://localhost:3600/users/${usuario.id}/photo`,
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (!result.success) {
            mostrarMensagem("Erro ao salvar foto.", "error");
            return;
        }

        usuario.profile_image = result.image;

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        const fotoUrl =
            `http://localhost:3600/${result.image}?t=${Date.now()}`;

        document.querySelectorAll(".profile-avatar-large").forEach(avatar => {
            avatar.innerHTML = `
                <img
                    src="${fotoUrl}"
                    alt="Foto de Perfil"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        border-radius:50%;
                    "
                >

                <button
                    class="avatar-edit-btn"
                    id="editAvatarBtn"
                    title="Alterar foto"
                >
                    <i class="bi bi-camera"></i>
                </button>
            `;
        });

        document.querySelectorAll("#userAvatar").forEach(avatar => {
            avatar.innerHTML = `
                <img
                    src="${fotoUrl}"
                    alt="Perfil"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        border-radius:50%;
                    "
                >
            `;
        });

        const novoBotao = document.getElementById("editAvatarBtn");

        if (novoBotao) {
            novoBotao.addEventListener("click", selecionarFoto);
        }

        window.dispatchEvent(
            new Event("usuarioAtualizado")
        );

        mostrarMensagem("Foto atualizada com sucesso!", "success");

    } catch (erro) {

        console.error(erro);
        mostrarMensagem("Erro ao enviar foto.", "error");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    carregarCartoesUsuario();

    const newCardForm = document.getElementById("newCardForm");

    if (newCardForm) {
        newCardForm.addEventListener("submit", salvarCartao);
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const addressForm =
        document.getElementById("addressForm");

    if (addressForm) {
        addressForm.addEventListener("submit", salvarEndereco);
    }

});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".toggle-password").forEach(button => {

        button.addEventListener("click", () => {

            const inputId = button.dataset.target;
            const input = document.getElementById(inputId);
            const icon = button.querySelector("i");

            if (!input || !icon) return;

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("bi-eye");
                icon.classList.add("bi-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");
            }

        });

    });

});


function mostrarMensagem(texto, tipo = "info") {

    const antiga = document.querySelector(".custom-message");

    if (antiga) antiga.remove();

    const mensagem = document.createElement("div");

    mensagem.className = `custom-message ${tipo}`;

    mensagem.innerHTML = `
        <i class="bi ${tipo === "success"
            ? "bi-check-circle-fill"
            : tipo === "error"
                ? "bi-x-circle-fill"
                : "bi-info-circle-fill"
        }"></i>
        <span>${texto}</span>
    `;

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.classList.add("show");
    }, 10);

    setTimeout(() => {
        mensagem.classList.remove("show");

        setTimeout(() => {
            mensagem.remove();
        }, 300);
    }, 3000);
}


document.addEventListener("DOMContentLoaded", () => {

    const zipCode =
        document.getElementById("zipCode");

    if (zipCode) {
        zipCode.addEventListener("blur", buscarCep);
    }

});


document.addEventListener("DOMContentLoaded", () => {
    carregarResumoPerfil();
});

async function carregarResumoPerfil() {

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuario || !usuario.id) {
        return;
    }

    try {

        // Favoritos
        const favResponse = await fetch(
            `http://localhost:3600/favorites/user/${usuario.id}`
        );

        const favResult = await favResponse.json();

        const favoritos =
            favResult.data ? favResult.data.length : 0;

        document.getElementById("profileFavoritesCount").textContent =
            favoritos;

        // Compras
        // Por enquanto ainda não temos tabela de pedidos.
        document.getElementById("profilePurchasesCount").textContent =
            0;

        // Doações
        // Por enquanto ainda não temos tabela de doações.
        document.getElementById("profileDonationsCount").textContent =
            0;

    } catch (error) {

        console.error(
            "Erro ao carregar resumo do perfil:",
            error
        );
    }
}