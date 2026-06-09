document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (!usuario) {
        console.log("Nenhum usuário logado.");
        return;
    }

    console.log("Usuário carregado:", usuario);

    // Dropdown superior
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");

    if (userName) {
        userName.textContent =
            usuario.nome ||
            usuario.name ||
            "Usuário";
    }

    if (userEmail) {
        userEmail.textContent =
            usuario.email ||
            "";
    }

    // Menu expandido
    const profileTitle =
        document.getElementById("profileExpandedTitle");

    if (profileTitle) {
        profileTitle.textContent =
            usuario.nome ||
            usuario.name ||
            "Usuário";
    }

    const profileEmail =
        document.querySelector(
            ".profile-user-details p"
        );

    if (profileEmail) {
        profileEmail.textContent =
            usuario.email ||
            "";
    }

    // Avatar (iniciais)
    const iniciais = (
        usuario.nome ||
        usuario.name ||
        "U"
    )
        .split(" ")
        .map(nome => nome[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    document
        .querySelectorAll(".profile-avatar")
        .forEach(el => {
            el.textContent = iniciais;
        });

});