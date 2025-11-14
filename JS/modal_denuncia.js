// modal_denuncia.js - Funcionalidades do modal de denúncia

// Função para abrir o modal de denúncia
function abrirModalDenuncia() {
    const modal = document.getElementById('modal-denuncia');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focar no primeiro campo
        setTimeout(() => {
            const primeiroCampo = document.getElementById('motivo-denuncia');
            if (primeiroCampo) {
                primeiroCampo.focus();
            }
        }, 100);
    }
}

// Função para fechar o modal de denúncia
function fecharModalDenuncia() {
    const modal = document.getElementById('modal-denuncia');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetarFormularioDenuncia();
    }
}

// Função para mostrar/ocultar erro em um campo específico
function mostrarErro(campoId, mensagemId, mostrar) {
    const campo = document.getElementById(campoId);
    const mensagemErro = document.getElementById(mensagemId);
    
    if (campo && mensagemErro) {
        if (mostrar) {
            campo.classList.add('campo-invalido');
            mensagemErro.style.display = 'block';
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', mensagemId);
        } else {
            campo.classList.remove('campo-invalido');
            mensagemErro.style.display = 'none';
            campo.removeAttribute('aria-invalid');
            campo.removeAttribute('aria-describedby');
        }
    }
}

// Função para validar e-mail
function validarEmail(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar formulário
function validarFormularioDenuncia() {
    let valido = true;
    
    const motivo = document.getElementById('motivo-denuncia');
    const descricao = document.getElementById('descricao-denuncia');
    const email = document.getElementById('email-denuncia');
    
    if (!motivo || !descricao || !email) return false;
    
    const motivoValor = motivo.value;
    const descricaoValor = descricao.value.trim();
    const emailValor = email.value.trim();
    
    // Validar motivo
    if (!motivoValor) {
        mostrarErro('motivo-denuncia', 'erro-motivo', true);
        valido = false;
    } else {
        mostrarErro('motivo-denuncia', 'erro-motivo', false);
    }
    
    // Validar descrição
    if (!descricaoValor) {
        mostrarErro('descricao-denuncia', 'erro-descricao', true);
        valido = false;
    } else if (descricaoValor.length < 10) {
        mostrarErro('descricao-denuncia', 'erro-descricao', true);
        document.getElementById('erro-descricao').innerHTML = '<i class="bi bi-exclamation-circle"></i> A descrição deve ter pelo menos 10 caracteres.';
        valido = false;
    } else {
        mostrarErro('descricao-denuncia', 'erro-descricao', false);
    }
    
    // Validar e-mail (se preenchido)
    if (emailValor && !validarEmail(emailValor)) {
        mostrarErro('email-denuncia', 'erro-email', true);
        valido = false;
    } else {
        mostrarErro('email-denuncia', 'erro-email', false);
    }
    
    return valido;
}

// Função para mostrar loading no botão
function mostrarLoading(mostrar) {
    const btnEnviar = document.getElementById('btn-enviar-denuncia');
    if (btnEnviar) {
        if (mostrar) {
            btnEnviar.classList.add('carregando');
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '';
        } else {
            btnEnviar.classList.remove('carregando');
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="bi bi-send"></i> Enviar Denúncia';
        }
    }
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    const form = document.getElementById('form-denuncia');
    
    if (mensagemSucesso && form) {
        form.style.display = 'none';
        mensagemSucesso.style.display = 'flex';
        mensagemSucesso.setAttribute('tabindex', '-1');
        mensagemSucesso.focus();
        
        setTimeout(() => {
            fecharModalDenuncia();
        }, 3000);
    }
}

// Função para resetar o formulário
function resetarFormularioDenuncia() {
    const form = document.getElementById('form-denuncia');
    if (form) {
        form.reset();
        form.style.display = 'block';
        
        mostrarErro('motivo-denuncia', 'erro-motivo', false);
        mostrarErro('descricao-denuncia', 'erro-descricao', false);
        mostrarErro('email-denuncia', 'erro-email', false);
        
        const erroDescricao = document.getElementById('erro-descricao');
        if (erroDescricao) {
            erroDescricao.innerHTML = '<i class="bi bi-exclamation-circle"></i> Por favor, forneça uma descrição detalhada da denúncia.';
        }
    }
    
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    if (mensagemSucesso) {
        mensagemSucesso.style.display = 'none';
    }
    
    mostrarLoading(false);
}

// Função para obter dados do produto atual
function obterDadosProduto() {
    const produtoId = new URLSearchParams(window.location.search).get('id');
    const produtoNome = document.getElementById('produto-nome');
    const produtoVendedor = document.getElementById('produto-vendedor');
    
    return {
        produtoId: produtoId,
        produtoNome: produtoNome ? produtoNome.textContent : 'Produto não encontrado',
        vendedor: produtoVendedor ? produtoVendedor.textContent : 'Vendedor não encontrado'
    };
}

// Função para enviar a denúncia
function enviarDenuncia(event) {
    event.preventDefault();
    
    if (!validarFormularioDenuncia()) {
        const modalConteudo = document.querySelector('.modal-conteudo');
        if (modalConteudo) {
            modalConteudo.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                modalConteudo.style.animation = '';
            }, 500);
        }
        
        const primeiroCampoInvalido = document.querySelector('.campo-invalido');
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }
        
        return;
    }
    
    mostrarLoading(true);
    
    const motivo = document.getElementById('motivo-denuncia').value;
    const descricao = document.getElementById('descricao-denuncia').value;
    const email = document.getElementById('email-denuncia').value;
    const dadosProduto = obterDadosProduto();
    
    // Simulação do envio da denúncia
    setTimeout(() => {
        const dadosDenuncia = {
            produtoId: dadosProduto.produtoId,
            produtoNome: dadosProduto.produtoNome,
            vendedor: dadosProduto.vendedor,
            motivo: motivo,
            descricao: descricao,
            email: email || 'Não informado',
            timestamp: new Date().toISOString(),
            dataFormatada: new Date().toLocaleString('pt-BR')
        };
        
        console.log('Denúncia enviada com sucesso:', dadosDenuncia);
        mostrarMensagemSucesso();
        
    }, 1500);
}

// Validação em tempo real para os campos
function configurarValidacaoTempoReal() {
    const motivoDenuncia = document.getElementById('motivo-denuncia');
    const descricaoDenuncia = document.getElementById('descricao-denuncia');
    const emailDenuncia = document.getElementById('email-denuncia');
    
    // Validação do motivo
    if (motivoDenuncia) {
        motivoDenuncia.addEventListener('change', function() {
            if (this.value) {
                mostrarErro('motivo-denuncia', 'erro-motivo', false);
            }
        });
    }
    
    // Validação da descrição
    if (descricaoDenuncia) {
        descricaoDenuncia.addEventListener('input', function() {
            const descricao = this.value.trim();
            if (descricao.length >= 10) {
                mostrarErro('descricao-denuncia', 'erro-descricao', false);
            }
        });
        
        descricaoDenuncia.addEventListener('blur', function() {
            const valor = this.value.trim();
            if (valor && valor.length < 10) {
                mostrarErro('descricao-denuncia', 'erro-descricao', true);
                document.getElementById('erro-descricao').innerHTML = '<i class="bi bi-exclamation-circle"></i> A descrição deve ter pelo menos 10 caracteres.';
            }
        });
    }
    
    // Validação do email
    if (emailDenuncia) {
        emailDenuncia.addEventListener('input', function() {
            const email = this.value.trim();
            if (email && validarEmail(email)) {
                mostrarErro('email-denuncia', 'erro-email', false);
            }
        });
        
        emailDenuncia.addEventListener('blur', function() {
            const valor = this.value.trim();
            if (valor && !validarEmail(valor)) {
                mostrarErro('email-denuncia', 'erro-email', true);
            }
        });
    }
}

// Configurar eventos do modal
function configurarEventosModal() {
    const abrirModalBtn = document.getElementById('abrir-modal-denuncia');
    const modal = document.getElementById('modal-denuncia');
    const fecharModalBtn = document.querySelector('.fechar-modal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formDenuncia = document.getElementById('form-denuncia');
    
    if (!abrirModalBtn || !modal) {
        console.warn('Elementos do modal de denúncia não encontrados');
        return;
    }
    
    // Evento para abrir modal
    abrirModalBtn.addEventListener('click', abrirModalDenuncia);
    
    // Eventos para fechar modal
    if (fecharModalBtn) {
        fecharModalBtn.addEventListener('click', fecharModalDenuncia);
    }
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharModalDenuncia);
    }
    
    // Evento de submit do formulário
    if (formDenuncia) {
        formDenuncia.addEventListener('submit', enviarDenuncia);
    }
    
    // Fechar modal clicando fora
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModalDenuncia();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            fecharModalDenuncia();
        }
    });
}

// Função para inicializar o modal de denúncia
function inicializarModalDenuncia() {
    configurarEventosModal();
    configurarValidacaoTempoReal();
    console.log('Modal de denúncia inicializado com sucesso');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    inicializarModalDenuncia();
});

// Exportar funções para uso global
if (typeof window !== 'undefined') {
    window.modalDenuncia = {
        abrir: abrirModalDenuncia,
        fechar: fecharModalDenuncia,
        enviar: enviarDenuncia,
        validar: validarFormularioDenuncia
    };
}