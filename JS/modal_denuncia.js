// modal_denuncia.js - Funcionalidades do modal de denúncia

// Função para abrir o modal de denúncia
function abrirModalDenuncia() {
    const modal = document.getElementById('modal-denuncia');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previne scroll do body
        
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
        document.body.style.overflow = 'auto'; // Restaura scroll do body
        resetarFormularioDenuncia();
    }
}

// Função para mostrar erro em um campo específico
function mostrarErro(campoId, mensagemId, mostrar) {
    const campo = document.getElementById(campoId);
    const mensagemErro = document.getElementById(mensagemId);
    
    if (campo && mensagemErro) {
        if (mostrar) {
            campo.classList.add('campo-invalido');
            mensagemErro.classList.add('mostrar');
            
            // Adicionar aria-invalid para acessibilidade
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', mensagemId);
        } else {
            campo.classList.remove('campo-invalido');
            mensagemErro.classList.remove('mostrar');
            
            // Remover atributos de acessibilidade
            campo.removeAttribute('aria-invalid');
            campo.removeAttribute('aria-describedby');
        }
    }
}

// Função para validar e-mail
function validarEmail(email) {
    if (!email) return true; // E-mail é opcional
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
        // Esconder formulário e mostrar mensagem de sucesso
        form.style.display = 'none';
        mensagemSucesso.classList.add('mostrar');
        
        // Focar na mensagem de sucesso para acessibilidade
        mensagemSucesso.setAttribute('tabindex', '-1');
        mensagemSucesso.focus();
        
        // Fechar modal após 3 segundos
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
        
        // Limpar mensagens de erro
        mostrarErro('motivo-denuncia', 'erro-motivo', false);
        mostrarErro('descricao-denuncia', 'erro-descricao', false);
        mostrarErro('email-denuncia', 'erro-email', false);
        
        // Resetar mensagem de descrição
        const erroDescricao = document.getElementById('erro-descricao');
        if (erroDescricao) {
            erroDescricao.innerHTML = '<i class="bi bi-exclamation-circle"></i> Por favor, forneça uma descrição detalhada da denúncia.';
        }
    }
    
    // Esconder mensagem de sucesso
    const mensagemSucesso = document.getElementById('mensagem-sucesso');
    if (mensagemSucesso) {
        mensagemSucesso.classList.remove('mostrar');
    }
    
    // Parar loading
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
    
    // Validar formulário
    if (!validarFormularioDenuncia()) {
        // Animar o modal para chamar atenção para os erros
        const modalConteudo = document.querySelector('.modal-conteudo');
        if (modalConteudo) {
            modalConteudo.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                modalConteudo.style.animation = '';
            }, 500);
        }
        
        // Focar no primeiro campo com erro
        const primeiroCampoInvalido = document.querySelector('.campo-invalido');
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }
        
        return;
    }
    
    // Mostrar loading
    mostrarLoading(true);
    
    const motivo = document.getElementById('motivo-denuncia').value;
    const descricao = document.getElementById('descricao-denuncia').value;
    const email = document.getElementById('email-denuncia').value;
    const dadosProduto = obterDadosProduto();
    
    // Simulação do envio da denúncia (substitua por chamada AJAX real)
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
        
        // Aqui você pode adicionar uma chamada AJAX real:
        /*
        fetch('/api/denuncias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDenuncia)
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensagemSucesso();
        })
        .catch(error => {
            console.error('Erro ao enviar denúncia:', error);
            mostrarLoading(false);
            // Mostrar mensagem de erro
        });
        */
        
        // Mostrar mensagem de sucesso (simulação)
        mostrarMensagemSucesso();
        
    }, 1500); // Simula delay de rede
}

// Função para inicializar o modal de denúncia
function inicializarModalDenuncia() {
    const abrirModalBtn = document.getElementById('abrir-modal-denuncia');
    const modal = document.getElementById('modal-denuncia');
    const fecharModalBtn = document.querySelector('.fechar-modal');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const formDenuncia = document.getElementById('form-denuncia');
    
    // Verificar se os elementos existem
    if (!abrirModalBtn || !modal) {
        console.warn('Elementos do modal de denúncia não encontrados');
        return;
    }
    
    // Configurar evento de abrir modal
    abrirModalBtn.addEventListener('click', abrirModalDenuncia);
    
    // Configurar evento de fechar modal
    if (fecharModalBtn) {
        fecharModalBtn.addEventListener('click', fecharModalDenuncia);
    }
    
    // Configurar evento do botão cancelar
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharModalDenuncia);
    }
    
    // Configurar envio do formulário
    if (formDenuncia) {
        formDenuncia.addEventListener('submit', enviarDenuncia);
    }
    
    // Validação em tempo real para remover erros quando o usuário corrigir
    const campos = ['motivo-denuncia', 'descricao-denuncia', 'email-denuncia'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', function() {
                const erroId = 'erro-' + campoId.split('-')[0];
                mostrarErro(campoId, erroId, false);
            });
            
            campo.addEventListener('change', function() {
                const erroId = 'erro-' + campoId.split('-')[0];
                mostrarErro(campoId, erroId, false);
            });
            
            // Validação específica para descrição (mínimo de caracteres)
            if (campoId === 'descricao-denuncia') {
                campo.addEventListener('blur', function() {
                    const valor = this.value.trim();
                    if (valor && valor.length < 10) {
                        mostrarErro('descricao-denuncia', 'erro-descricao', true);
                        document.getElementById('erro-descricao').innerHTML = '<i class="bi bi-exclamation-circle"></i> A descrição deve ter pelo menos 10 caracteres.';
                    }
                });
            }
        }
    });
    
    // Fechar modal clicando fora dele
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModalDenuncia();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            fecharModalDenuncia();
        }
        
        // Navegação por tab no modal
        if (event.key === 'Tab' && modal.style.display === 'block') {
            const elementosFocaveis = modal.querySelectorAll('button, input, select, textarea, [href]');
            const primeiroElemento = elementosFocaveis[0];
            const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];
            
            if (event.shiftKey) {
                if (document.activeElement === primeiroElemento) {
                    ultimoElemento.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === ultimoElemento) {
                    primeiroElemento.focus();
                    event.preventDefault();
                }
            }
        }
    });
    
    // Log de inicialização bem-sucedida
    console.log('Modal de denúncia inicializado com sucesso');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    inicializarModalDenuncia();
});

// Exportar funções para uso global (se necessário)
if (typeof window !== 'undefined') {
    window.modalDenuncia = {
        abrir: abrirModalDenuncia,
        fechar: fecharModalDenuncia,
        enviar: enviarDenuncia,
        validar: validarFormularioDenuncia
    };
}