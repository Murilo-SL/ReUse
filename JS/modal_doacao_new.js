// modal_doacao_new.js - Funcionalidades do modal de doação

// Função para validar formulário
function validarFormularioDoacao() {
    let isValid = true;
    removerMensagensErro();

    // Validar todos os campos do formulário
    const formFields = document.querySelectorAll('#donation-form input[type="text"], #donation-form textarea, #donation-form select');
    formFields.forEach(field => {
        if (!field.value.trim()) {
            mostrarErro(field, 'Este campo é obrigatório');
            isValid = false;
        }
    });

    // Validar radio buttons
    const radioGroups = document.querySelectorAll('#donation-form .radio-group');
    radioGroups.forEach(group => {
        const radioName = group.querySelector('input[type="radio"]').name;
        const checkedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (!checkedRadio) {
            mostrarErroGrupo(group, 'Por favor, selecione uma opção');
            isValid = false;
        }
    });

    // Validar fotos
    const fileInput = document.getElementById('photos');
    if (fileInput.files.length === 0) {
        mostrarErro(fileInput, 'Por favor, adicione pelo menos uma foto do item');
        isValid = false;
    } else if (fileInput.files.length > 5) {
        mostrarErro(fileInput, 'Máximo de 5 fotos permitidas');
        isValid = false;
    }

    return isValid;
}

// Função para mostrar erro em um campo
function mostrarErro(campo, mensagem) {
    campo.classList.add('campo-invalido');
    campo.style.borderColor = '#ff4444';
    
    let errorDiv = campo.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        campo.parentNode.insertBefore(errorDiv, campo.nextSibling);
    }
    
    errorDiv.textContent = mensagem;
    errorDiv.style.display = 'block';
    errorDiv.style.opacity = '1';
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    // Adiciona efeito de shake no campo
    campo.classList.add('shake');
    setTimeout(() => campo.classList.remove('shake'), 500);
}

// Função para mostrar erro em um grupo de radio buttons
function mostrarErroGrupo(grupo, mensagem) {
    let errorDiv = grupo.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        grupo.parentNode.insertBefore(errorDiv, grupo.nextSibling);
    }
    
    errorDiv.textContent = mensagem;
    errorDiv.style.display = 'block';
    errorDiv.style.opacity = '1';
}

// Função para remover mensagens de erro
function removerMensagensErro() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 300);
    });
    
    const invalidFields = document.querySelectorAll('.campo-invalido');
    invalidFields.forEach(field => {
        field.classList.remove('campo-invalido');
        field.style.borderColor = '';
    });
}

// Função para remover erro de um campo específico
function removerErro(campo) {
    campo.classList.remove('campo-invalido');
    campo.style.borderColor = '';
    
    const errorDiv = campo.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }
}

// Função para atualizar lista de arquivos selecionados
function atualizarArquivosSelecionados() {
    const fileInput = document.getElementById('photos');
    const selectedFiles = document.getElementById('selected-files');
    selectedFiles.innerHTML = '';
    
    if (fileInput.files.length > 0) {
        const fileList = document.createElement('ul');
        
        Array.from(fileInput.files).forEach((file, index) => {
            const li = document.createElement('li');
            li.className = 'selected-file';
            
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-info';
            
            const icon = document.createElement('i');
            icon.className = 'bi bi-file-image file-icon';
            
            const details = document.createElement('div');
            details.className = 'file-details';
            
            const name = document.createElement('div');
            name.className = 'file-name';
            name.textContent = file.name;
            
            const size = document.createElement('div');
            size.className = 'file-size';
            size.textContent = formatarTamanhoArquivo(file.size);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'file-remove';
            removeBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
            removeBtn.onclick = () => removerArquivo(index);
            
            details.appendChild(name);
            details.appendChild(size);
            fileInfo.appendChild(icon);
            fileInfo.appendChild(details);
            li.appendChild(fileInfo);
            li.appendChild(removeBtn);
            fileList.appendChild(li);
        });
        
        selectedFiles.appendChild(fileList);
    }
}

// Função para remover arquivo
function removerArquivo(index) {
    const fileInput = document.getElementById('photos');
    const dt = new DataTransfer();
    const { files } = fileInput;
    
    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dt.items.add(files[i]);
        }
    }
    
    fileInput.files = dt.files;
    atualizarArquivosSelecionados();
}

// Função para formatar tamanho do arquivo
function formatarTamanhoArquivo(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso() {
    const modal = document.getElementById('donation-modal');
    const successOverlay = document.getElementById('success-overlay');
    const countdownNumber = document.getElementById('countdown-number');
    
    modal.classList.remove('active');
    successOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    let segundos = 5;
    countdownNumber.textContent = segundos;
    
    const intervalo = setInterval(() => {
        segundos--;
        countdownNumber.textContent = segundos;
        
        if (segundos <= 0) {
            clearInterval(intervalo);
            fecharMensagemSucesso();
        }
    }, 1000);
}

// Função para fechar mensagem de sucesso
function fecharMensagemSucesso() {
    const successOverlay = document.getElementById('success-overlay');
    successOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Função para abrir modal
function abrirModalDoacao() {
    const modal = document.getElementById('donation-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Resetar formulário
    const form = document.getElementById('donation-form');
    if (form) {
        form.reset();
        document.getElementById('selected-files').innerHTML = '';
        removerMensagensErro();
    }
}

// Função para fechar modal
function fecharModalDoacao() {
    const modal = document.getElementById('donation-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Função para processar envio do formulário
function enviarFormularioDoacao(event) {
    event.preventDefault();
    
    if (!validarFormularioDoacao()) {
        return;
    }
    
    const submitButton = event.target.querySelector('.submit-button');
    submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
    submitButton.disabled = true;
    
    // Simular processamento
    setTimeout(() => {
        submitButton.innerHTML = 'Enviar Doação';
        submitButton.disabled = false;
        mostrarMensagemSucesso();
    }, 1500);
}

// Configurar drag and drop
function configurarDragAndDrop(uploadArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, prevenirPadrao, false);
    });

    function prevenirPadrao(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'));
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'));
    });

    uploadArea.addEventListener('drop', (e) => {
        const fileInput = document.getElementById('photos');
        fileInput.files = e.dataTransfer.files;
        atualizarArquivosSelecionados();
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Botões e elementos principais
    const openButton = document.getElementById('open-donation-modal');
    const closeButton = document.getElementById('close-donation-modal');
    const closeSuccessButton = document.getElementById('close-success-modal');
    const form = document.getElementById('donation-form');
    const modal = document.getElementById('donation-modal');
    const successOverlay = document.getElementById('success-overlay');
    const fileInput = document.getElementById('photos');
    
    // Event Listeners
    if (openButton) {
        openButton.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModalDoacao();
        });
    }

    // Adicionar validação em tempo real para todos os campos
    const formFields = document.querySelectorAll('#donation-form input[type="text"], #donation-form textarea, #donation-form select');
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            if (!field.value.trim()) {
                mostrarErro(field, 'Este campo é obrigatório');
            }
        });

        field.addEventListener('input', () => {
            if (field.value.trim()) {
                removerErro(field);
            }
        });
    });
    
    if (closeButton) {
        closeButton.addEventListener('click', fecharModalDoacao);
    }
    
    if (closeSuccessButton) {
        closeSuccessButton.addEventListener('click', fecharMensagemSucesso);
    }
    
    if (form) {
        form.addEventListener('submit', enviarFormularioDoacao);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', atualizarArquivosSelecionados);
        const uploadArea = fileInput.closest('.file-upload-area');
        if (uploadArea) {
            configurarDragAndDrop(uploadArea);
        }
    }
    
    // Fechar modais ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModalDoacao();
    });
    
    successOverlay.addEventListener('click', (e) => {
        if (e.target === successOverlay) fecharMensagemSucesso();
    });
    
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) fecharModalDoacao();
            if (successOverlay.classList.contains('active')) fecharMensagemSucesso();
        }
    });
});