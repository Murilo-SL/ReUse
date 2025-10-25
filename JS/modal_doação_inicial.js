// JavaScript para o modal de doação
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do modal
    const donateButton = document.getElementById('open-donation-modal');
    const donationModal = document.getElementById('donation-modal');
    const closeModalButton = document.getElementById('close-donation-modal');
    const donationForm = document.getElementById('donation-form');
    const successOverlay = document.getElementById('success-overlay');
    const closeSuccessModal = document.getElementById('close-success-modal');
    const countdownNumber = document.getElementById('countdown-number');
    
    // Elementos do formulário
    const fileInput = document.getElementById('photos');
    const selectedFiles = document.getElementById('selected-files');

    // Abrir modal de doação
    if (donateButton) {
        donateButton.addEventListener('click', function(e) {
            e.preventDefault();
            openDonationModal();
        });
    }

    // Fechar modal de doação
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeDonationModal);
    }

    // Fechar modal de sucesso
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', closeSuccessMessage);
    }

    // Fechar modais clicando fora
    donationModal.addEventListener('click', function(e) {
        if (e.target === donationModal) {
            closeDonationModal();
        }
    });

    successOverlay.addEventListener('click', function(e) {
        if (e.target === successOverlay) {
            closeSuccessMessage();
        }
    });

    // Fechar modais com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (donationModal.classList.contains('active')) {
                closeDonationModal();
            }
            if (successOverlay.classList.contains('active')) {
                closeSuccessMessage();
            }
        }
    });

    // Manipular envio do formulário
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Mostrar arquivos selecionados
    if (fileInput) {
        fileInput.addEventListener('change', updateSelectedFiles);
        
        // Suporte para arrastar e soltar
        const fileUploadArea = fileInput.closest('.file-upload-area');
        if (fileUploadArea) {
            setupDragAndDrop(fileUploadArea);
        }
    }

    // Função para abrir modal de doação
    function openDonationModal() {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        donationForm.reset();
        selectedFiles.innerHTML = '';
        removeErrorMessages();
    }

    // Função para fechar modal de doação
    function closeDonationModal() {
        donationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Função para fechar mensagem de sucesso
    function closeSuccessMessage() {
        successOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
        }
    }

    // Função para lidar com envio do formulário
    function handleFormSubmission() {
        if (validateForm()) {
            // Simular processamento
            const submitButton = donationForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                closeDonationModal();
                showSuccessMessage();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        }
    }

    // Função para validar formulário
    function validateForm() {
        let isValid = true;
        removeErrorMessages();

        // Validar campos obrigatórios
        const requiredFields = donationForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                markFieldAsInvalid(field, 'Este campo é obrigatório');
                isValid = false;
            }
        });

        // Validar radio buttons
        const radioGroups = donationForm.querySelectorAll('.radio-group');
        radioGroups.forEach(group => {
            const radioName = group.querySelector('input[type="radio"]').name;
            const checkedRadio = donationForm.querySelector(`input[name="${radioName}"]:checked`);
            if (!checkedRadio) {
                markRadioGroupAsInvalid(group, 'Selecione uma opção');
                isValid = false;
            }
        });

        // Validar arquivos
        if (fileInput.files.length === 0) {
            markFieldAsInvalid(fileInput, 'Pelo menos uma foto é obrigatória');
            isValid = false;
        }

        return isValid;
    }

    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        let seconds = 5;
        countdownNumber.textContent = seconds;
        
        window.countdownInterval = setInterval(() => {
            seconds--;
            countdownNumber.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(window.countdownInterval);
                closeSuccessMessage();
            }
        }, 1000);
    }

    // Função para atualizar arquivos selecionados
    function updateSelectedFiles() {
        selectedFiles.innerHTML = '';
        
        if (fileInput.files.length > 0) {
            const fileList = document.createElement('ul');
            
            Array.from(fileInput.files).forEach((file, index) => {
                const listItem = document.createElement('li');
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'file-info';
                
                const fileIcon = document.createElement('i');
                fileIcon.className = 'bi bi-file-image file-icon';
                
                const fileDetails = document.createElement('div');
                fileDetails.className = 'file-details';
                
                const fileName = document.createElement('div');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('div');
                fileSize.className = 'file-size';
                fileSize.textContent = formatFileSize(file.size);
                
                fileDetails.appendChild(fileName);
                fileDetails.appendChild(fileSize);
                
                const fileRemove = document.createElement('button');
                fileRemove.className = 'file-remove';
                fileRemove.innerHTML = '<i class="bi bi-x"></i>';
                fileRemove.title = 'Remover arquivo';
                fileRemove.addEventListener('click', (e) => {
                    e.preventDefault();
                    removeFile(index);
                });
                
                fileInfo.appendChild(fileIcon);
                fileInfo.appendChild(fileDetails);
                
                listItem.appendChild(fileInfo);
                listItem.appendChild(fileRemove);
                
                fileList.appendChild(listItem);
            });
            
            selectedFiles.appendChild(fileList);
        }
    }

    // Função para configurar drag and drop
    function setupDragAndDrop(uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
        });

        uploadArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const files = e.dataTransfer.files;
            fileInput.files = files;
            updateSelectedFiles();
        }
    }

    // Função para remover arquivo
    function removeFile(index) {
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (i !== index) dt.items.add(files[i]);
        }
        
        fileInput.files = dt.files;
        updateSelectedFiles();
    }

    // Funções auxiliares
    function markFieldAsInvalid(field, message) {
        field.style.borderColor = '#e74c3c';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    function markRadioGroupAsInvalid(group, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        group.parentNode.insertBefore(errorDiv, group.nextSibling);
    }

    function removeErrorMessages() {
        const errorMessages = donationForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const fields = donationForm.querySelectorAll('.input-field, .select-field, .textarea-field');
        fields.forEach(field => field.style.borderColor = '#e1e5e9');
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});

// Adicionar estilo para spinner
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);