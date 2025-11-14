// ========== MODAL DE DOAÇÕES NECESSÁRIAS - SOS FELINO ==========
// Arquivo: JS/modal_doacoes_necessarias.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal de Doações Necessárias carregado - SOS Felino');
    
    // Elementos do modal
    const specificDonationModal = document.getElementById('specific-donation-modal');
    const closeSpecificDonationModal = document.getElementById('close-specific-donation-modal');
    const specificDonationForm = document.getElementById('specific-donation-form');
    
    // Elementos do formulário
    const specificFileInput = document.getElementById('specific-photos');
    const specificSelectedFiles = document.getElementById('specific-selected-files');

    // ========== INICIALIZAÇÃO ==========
    initializeSpecificDonationModal();

    function initializeSpecificDonationModal() {
        console.log('Inicializando modal de doações necessárias...');
        
        setupEventListeners();
        setupFileUpload();
        setupRealTimeValidation();
    }

    function setupEventListeners() {
        // Fechar modal
        if (closeSpecificDonationModal) {
            closeSpecificDonationModal.addEventListener('click', () => closeSpecificModal());
        }

        // Fechar modal clicando fora
        if (specificDonationModal) {
            specificDonationModal.addEventListener('click', function(e) {
                if (e.target === specificDonationModal) closeSpecificModal();
            });
        }

        // Fechar com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && specificDonationModal.classList.contains('active')) {
                closeSpecificModal();
            }
        });

        // Formulário
        if (specificDonationForm) {
            specificDonationForm.addEventListener('submit', handleSpecificDonationSubmit);
        }
    }

    // ========== VALIDAÇÃO EM TEMPO REAL ==========
    function setupRealTimeValidation() {
        if (specificDonationForm) {
            const specificFields = specificDonationForm.querySelectorAll('input, textarea');
            specificFields.forEach(field => {
                field.addEventListener('blur', function() {
                    validateSpecificField(this);
                });
                
                field.addEventListener('input', function() {
                    clearSpecificFieldError(this);
                });
            });

            // Validação específica para radio buttons
            const qualityRadios = document.querySelectorAll('input[name="specific-quality"]');
            const conditionRadios = document.querySelectorAll('input[name="specific-condition"]');
            
            qualityRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    validateRadioGroup('specific-quality', 'Por favor, selecione a qualidade do item');
                });
            });
            
            conditionRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    validateRadioGroup('specific-condition', 'Por favor, selecione o estado do item');
                });
            });
        }
    }

    function validateSpecificField(field) {
        switch (field.name) {
            case 'specific-description':
                if (!field.value.trim()) {
                    showSpecificFieldError(field, 'Por favor, descreva o item');
                    return false;
                } else if (field.value.trim().length < 10) {
                    showSpecificFieldError(field, 'A descrição deve ter pelo menos 10 caracteres');
                    return false;
                }
                break;
        }
        
        clearSpecificFieldError(field);
        return true;
    }

    function validateRadioGroup(radioName, errorMessage) {
        const radioSelected = document.querySelector(`input[name="${radioName}"]:checked`);
        const radioGroup = document.querySelector(`input[name="${radioName}"]`).closest('.radio-group');
        
        if (!radioSelected) {
            showSpecificFieldError(radioGroup, errorMessage);
            return false;
        } else {
            clearSpecificFieldError(radioGroup);
            return true;
        }
    }

    // ========== VALIDAÇÃO DO FORMULÁRIO ==========
    function validateSpecificDonationForm() {
        let isValid = true;
        const errors = [];

        // Qualidade
        const qualitySelected = document.querySelector('input[name="specific-quality"]:checked');
        if (!qualitySelected) {
            showSpecificFieldError(document.querySelectorAll('.radio-group')[0], 'Por favor, selecione a qualidade do item');
            isValid = false;
            errors.push('Qualidade do item é obrigatória');
        }

        // Estado
        const conditionSelected = document.querySelector('input[name="specific-condition"]:checked');
        if (!conditionSelected) {
            showSpecificFieldError(document.querySelectorAll('.radio-group')[1], 'Por favor, selecione o estado do item');
            isValid = false;
            errors.push('Estado do item é obrigatório');
        }

        // Descrição
        const description = document.getElementById('specific-description');
        if (!description.value.trim()) {
            showSpecificFieldError(description, 'Por favor, descreva o item');
            isValid = false;
            errors.push('Descrição é obrigatória');
        } else if (description.value.trim().length < 10) {
            showSpecificFieldError(description, 'A descrição deve ter pelo menos 10 caracteres');
            isValid = false;
            errors.push('Descrição muito curta');
        }

        // Fotos (opcional, mas valida se enviadas)
        if (specificFileInput && specificFileInput.files.length > 0) {
            const files = Array.from(specificFileInput.files);
            for (let file of files) {
                if (!file.type.startsWith('image/')) {
                    showSpecificFieldError(specificFileInput, 'Apenas imagens são permitidas');
                    isValid = false;
                    errors.push('Tipo de arquivo inválido');
                    break;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    showSpecificFieldError(specificFileInput, 'Cada arquivo deve ter no máximo 5MB');
                    isValid = false;
                    errors.push('Arquivo muito grande');
                    break;
                }
            }
        }

        return { isValid, errors };
    }

    // ========== MANIPULAÇÃO DE ERROS ==========
    function showSpecificFieldError(field, message) {
        clearSpecificFieldError(field);
        
        field.classList.add('field-error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #d32f2f;
            font-size: 12px;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        `;
        
        if (field.parentNode) {
            field.parentNode.appendChild(errorElement);
        }
    }

    function clearSpecificFieldError(field) {
        field.classList.remove('field-error');
        
        const existingError = field.parentNode.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // ========== HANDLER DO FORMULÁRIO ==========
    function handleSpecificDonationSubmit(e) {
        e.preventDefault();
        
        const validation = validateSpecificDonationForm();
        if (!validation.isValid) {
            const firstError = specificDonationForm.querySelector('.field-error');
            if (firstError && typeof firstError.focus === 'function') firstError.focus();
            return;
        }
        
        processSpecificDonationForm();
    }

    function processSpecificDonationForm() {
        const submitButton = specificDonationForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carregamento
        submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando Doação...';
        submitButton.disabled = true;
        
        // Coletar dados do formulário
        const formData = {
            itemName: document.getElementById('specific-item-name').value,
            category: document.getElementById('specific-category').value,
            quality: document.querySelector('input[name="specific-quality"]:checked').value,
            condition: document.querySelector('input[name="specific-condition"]:checked').value,
            description: document.getElementById('specific-description').value,
            photos: specificFileInput.files.length,
            institution: 'SOS Felino',
            timestamp: new Date().toISOString()
        };
        
        console.log('Dados da doação específica:', formData);
        
        // Simular processamento
        setTimeout(() => {
            closeSpecificModal();
            showSpecificSuccessMessage();
            resetSpecificDonationForm();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Mostrar notificação de sucesso
            showNotification('Doação específica realizada com sucesso! A SOS Felino agradece sua contribuição.', 'success');
        }, 1500);
    }

    // ========== UPLOAD DE ARQUIVOS ==========
    function setupFileUpload() {
        if (specificFileInput) {
            specificFileInput.addEventListener('change', updateSpecificSelectedFiles);
            
            const fileUploadArea = specificFileInput.closest('.file-upload-area');
            if (fileUploadArea) {
                setupDragAndDrop(fileUploadArea);
            }
        }
    }

    function updateSpecificSelectedFiles() {
        if (!specificSelectedFiles) return;
        
        specificSelectedFiles.innerHTML = '';
        
        if (specificFileInput && specificFileInput.files.length > 0) {
            const fileList = document.createElement('ul');
            fileList.className = 'file-list';
            
            Array.from(specificFileInput.files).forEach((file, index) => {
                const listItem = createFileListItem(file, index);
                fileList.appendChild(listItem);
            });
            
            specificSelectedFiles.appendChild(fileList);
        }
    }

    function createFileListItem(file, index) {
        const listItem = document.createElement('li');
        listItem.className = 'file-list-item';
        
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
        fileRemove.type = 'button';
        fileRemove.className = 'file-remove';
        fileRemove.innerHTML = '<i class="bi bi-x"></i>';
        fileRemove.title = 'Remover arquivo';
        fileRemove.addEventListener('click', (e) => {
            e.preventDefault();
            removeSpecificFile(index);
        });
        
        fileInfo.appendChild(fileIcon);
        fileInfo.appendChild(fileDetails);
        
        listItem.appendChild(fileInfo);
        listItem.appendChild(fileRemove);
        
        return listItem;
    }

    function setupDragAndDrop(uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function highlight() {
            uploadArea.classList.add('dragover');
        }
        
        function unhighlight() {
            uploadArea.classList.remove('dragover');
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        uploadArea.addEventListener('drop', handleDrop, false);
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            specificFileInput.files = files;
            updateSpecificSelectedFiles();
        }
    }

    function removeSpecificFile(index) {
        if (!specificFileInput) return;
        
        const dt = new DataTransfer();
        const files = specificFileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (i !== index) dt.items.add(files[i]);
        }
        
        specificFileInput.files = dt.files;
        updateSpecificSelectedFiles();
    }

    // ========== FUNÇÕES AUXILIARES ==========
    function openSpecificModal() {
        if (specificDonationModal) {
            specificDonationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSpecificModal() {
        if (specificDonationModal) {
            specificDonationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    function resetSpecificDonationForm() {
        if (specificDonationForm) {
            // Não resetar nome e categoria (são pré-preenchidos)
            const description = document.getElementById('specific-description');
            if (description) description.value = '';
            
            // Resetar radio buttons
            const qualityRadios = document.querySelectorAll('input[name="specific-quality"]');
            const conditionRadios = document.querySelectorAll('input[name="specific-condition"]');
            
            qualityRadios.forEach(radio => radio.checked = false);
            conditionRadios.forEach(radio => radio.checked = false);
            
            // Resetar arquivos
            if (specificFileInput) {
                specificFileInput.value = '';
            }
            if (specificSelectedFiles) {
                specificSelectedFiles.innerHTML = '';
            }
        }
        
        // Limpar erros
        const errorMessages = specificDonationForm.querySelectorAll('.field-error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = specificDonationForm.querySelectorAll('.field-error');
        errorFields.forEach(field => field.classList.remove('field-error'));
    }

    function showSpecificSuccessMessage() {
        const successOverlay = document.getElementById('success-overlay');
        if (successOverlay) {
            const successTitle = successOverlay.querySelector('.success-title');
            const successText = successOverlay.querySelector('.success-text');
            
            if (successTitle) successTitle.textContent = 'Doação Específica Realizada!';
            if (successText) successText.textContent = 'Obrigado por sua doação específica! A SOS Felino agradece seu apoio direto às nossas necessidades.';
            
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            createConfetti();
        }
    }

    function formatFileSize(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function createConfetti() {
        const colors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0', '#00BCD4'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.5};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
                delay: Math.random() * 500
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const iconClass = getNotificationIcon(type);
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="bi ${iconClass}"></i>
            <span>${message}</span>
        `;

        const baseStyle = `
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            ${getNotificationStyle(type)}
        `;

        notification.style.cssText = baseStyle + 'position: fixed; top: 20px; right: 20px; transform: translateX(100%);';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) notification.parentNode.removeChild(notification);
            }, 300);
        }, 5000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-exclamation-circle-fill',
            info: 'bi-info-circle-fill',
            warning: 'bi-exclamation-triangle-fill'
        };
        return icons[type] || 'bi-info-circle-fill';
    }

    function getNotificationStyle(type) {
        const styles = {
            success: 'background-color: #4CAF50;',
            error: 'background-color: #f44336;',
            info: 'background-color: #2196F3;',
            warning: 'background-color: #ff9800;'
        };
        return styles[type] || styles.info;
    }
});

// ========== FUNÇÃO GLOBAL PARA ABRIR MODAL ==========
window.openSpecificDonationModal = function(itemName, category, description, imageUrl, progress) {
    console.log('Abrindo modal de doação específica para:', itemName);
    
    // Preencher informações do item selecionado
    const itemNameElement = document.getElementById('selected-item-name');
    const itemDescriptionElement = document.getElementById('selected-item-description');
    const itemImageElement = document.getElementById('selected-item-image');
    const progressElement = document.getElementById('selected-item-progress');
    const progressTextElement = document.getElementById('selected-item-progress-text');
    
    if (itemNameElement) itemNameElement.textContent = itemName;
    if (itemDescriptionElement) itemDescriptionElement.textContent = description;
    if (itemImageElement) {
        itemImageElement.src = imageUrl;
        itemImageElement.alt = itemName;
    }
    if (progressElement) progressElement.style.width = progress + '%';
    if (progressTextElement) progressTextElement.textContent = progress + '%';
    
    // Preencher campos do formulário
    const specificItemName = document.getElementById('specific-item-name');
    const specificCategory = document.getElementById('specific-category');
    const specificDescription = document.getElementById('specific-description');
    
    if (specificItemName) specificItemName.value = itemName;
    if (specificCategory) specificCategory.value = category;
    if (specificDescription) {
        specificDescription.placeholder = `Descreva detalhes sobre ${itemName.toLowerCase()} (marca, quantidade, validade, etc.)`;
    }
    
    // Abrir o modal
    const specificDonationModal = document.getElementById('specific-donation-modal');
    if (specificDonationModal) {
        specificDonationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// ========== ESTILOS ADICIONAIS ==========
const specificModalStyles = document.createElement('style');
specificModalStyles.textContent = `
    .selected-item-info {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 25px;
        border-left: 4px solid #4CAF50;
    }

    .item-header {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .item-header img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
        border: 3px solid #4CAF50;
    }

    .item-details h3 {
        color: #2c3e50;
        margin-bottom: 8px;
        font-size: 1.3rem;
    }

    .item-details p {
        color: #666;
        margin-bottom: 15px;
        line-height: 1.4;
    }

    .progress-info {
        margin-top: 10px;
    }

    .progress-info small {
        color: #666;
        font-size: 12px;
        display: block;
        margin-top: 5px;
    }

    .input-field[readonly],
    .select-field[disabled] {
        background-color: #f8f9fa;
        border-color: #e9ecef;
        color: #666;
        cursor: not-allowed;
    }

    .select-field[disabled] {
        opacity: 0.7;
    }

    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .field-error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2;
    }
    
    .field-error-message {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .file-list {
        list-style: none;
        padding: 0;
        margin: 10px 0 0 0;
    }
    
    .file-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 6px;
        margin-bottom: 8px;
    }
    
    .file-info {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .file-icon {
        font-size: 20px;
        color: #666;
    }
    
    .file-details {
        display: flex;
        flex-direction: column;
    }
    
    .file-name {
        font-weight: 500;
        color: #333;
    }
    
    .file-size {
        font-size: 12px;
        color: #666;
    }
    
    .file-remove {
        background: none;
        border: none;
        color: #f44336;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background-color 0.3s;
    }
    
    .file-remove:hover {
        background-color: #ffebee;
    }
    
    .file-upload-area.dragover {
        border-color: #4CAF50;
        background-color: #f8fff8;
    }
    
    .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .submit-button:disabled:hover {
        transform: none;
        box-shadow: none;
    }
`;
document.head.appendChild(specificModalStyles);