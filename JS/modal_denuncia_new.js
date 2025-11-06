// modal_denuncia_new.js - Funcionalidades do modal de denúncia para perfil do vendedor

// Função para validar e-mail
function validarEmailPerfil(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para mostrar erro em um campo específico
function mostrarErroPerfil(campoId, mensagemId, mostrar) {
    const campo = document.getElementById(campoId);
    const mensagemErro = document.getElementById(mensagemId);
    
    if (campo && mensagemErro) {
        if (mostrar) {
            campo.classList.add('campo-invalido');
            mensagemErro.classList.add('mostrar');
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', mensagemId);
        } else {
            campo.classList.remove('campo-invalido');
            mensagemErro.classList.remove('mostrar');
            campo.removeAttribute('aria-invalid');
            campo.removeAttribute('aria-describedby');
        }
    }
}

// Função para validar formulário
function validarFormularioDenunciaPerfil() {
    let valido = true;
    
    const motivo = document.getElementById('motivo-denuncia-perfil');
    const descricao = document.getElementById('descricao-denuncia-perfil');
    const email = document.getElementById('email-denuncia-perfil');
    
    // Validar motivo
    if (!motivo.value) {
        mostrarErroPerfil('motivo-denuncia-perfil', 'erro-motivo-perfil', true);
        valido = false;
    } else {
        mostrarErroPerfil('motivo-denuncia-perfil', 'erro-motivo-perfil', false);
    }
    
    // Validar descrição
    const descricaoValor = descricao.value.trim();
    if (!descricaoValor) {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', true);
        valido = false;
    } else if (descricaoValor.length < 10) {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', true);
        valido = false;
    } else {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', false);
    }
    
    // Validar email (opcional)
    const emailValor = email.value.trim();
    if (emailValor && !validarEmailPerfil(emailValor)) {
        mostrarErroPerfil('email-denuncia-perfil', 'erro-email-perfil', true);
        valido = false;
    } else {
        mostrarErroPerfil('email-denuncia-perfil', 'erro-email-perfil', false);
    }
    
    return valido;
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucessoPerfil() {
    const form = document.getElementById('form-denuncia-perfil');
    const mensagemSucesso = document.getElementById('mensagem-sucesso-perfil');
    
    if (form && mensagemSucesso) {
        form.style.display = 'none';
        mensagemSucesso.style.display = 'flex';
        
        setTimeout(() => {
            fecharModalDenunciaPerfil();
        }, 3000);
    }
}

// Função para fechar o modal
function fecharModalDenunciaPerfil() {
    const modal = document.getElementById('modal-denuncia-perfil');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Resetar o formulário
        const form = document.getElementById('form-denuncia-perfil');
        const mensagemSucesso = document.getElementById('mensagem-sucesso-perfil');
        if (form) {
            form.reset();
            form.style.display = 'block';
        }
        if (mensagemSucesso) {
            mensagemSucesso.style.display = 'none';
        }
        
        // Limpar mensagens de erro
        const mensagensErro = document.querySelectorAll('.mensagem-erro');
        mensagensErro.forEach(msg => msg.classList.remove('mostrar'));
        
        const camposInvalidos = document.querySelectorAll('.campo-invalido');
        camposInvalidos.forEach(campo => campo.classList.remove('campo-invalido'));
    }
}

// Função para abrir o modal
function abrirModalDenunciaPerfil() {
    const modal = document.getElementById('modal-denuncia-perfil');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Função para enviar a denúncia
function enviarDenunciaPerfil(event) {
    event.preventDefault();
    
    if (!validarFormularioDenunciaPerfil()) {
        const modalConteudo = document.querySelector('#modal-denuncia-perfil .modal-conteudo');
        if (modalConteudo) {
            modalConteudo.style.animation = 'shakeError 0.5s ease-in-out';
            setTimeout(() => {
                modalConteudo.style.animation = '';
            }, 500);
        }
        
        const primeiroCampoInvalido = document.querySelector('#modal-denuncia-perfil .campo-invalido');
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }
        
        return;
    }
    
    const motivo = document.getElementById('motivo-denuncia-perfil').value;
    const descricao = document.getElementById('descricao-denuncia-perfil').value;
    const email = document.getElementById('email-denuncia-perfil').value;
    
    // Simular envio para o servidor
    console.log('Denúncia enviada:', { motivo, descricao, email });
    
    // Mostrar mensagem de sucesso
    mostrarMensagemSucessoPerfil();
}

// Inicializar os event listeners quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Botões
    const btnAbrirModal = document.getElementById('abrir-modal-denuncia-perfil');
    const modal = document.getElementById('modal-denuncia-perfil');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formDenuncia = document.getElementById('form-denuncia-perfil');
    
    // Event Listeners
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', abrirModalDenunciaPerfil);
    }
    
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModalDenunciaPerfil);
    }
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharModalDenunciaPerfil);
    }
    
    if (formDenuncia) {
        formDenuncia.addEventListener('submit', enviarDenunciaPerfil);
    }
    
    // Fechar modal ao clicar fora
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                fecharModalDenunciaPerfil();
            }
        });
    }
    
    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            fecharModalDenunciaPerfil();
        }
    });
});