// ========== MODAIS ATUALIZADOS PARA SOS FELINO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const donationModal = document.getElementById('donation-modal');
    const volunteerModal = document.getElementById('volunteer-modal');
    const successOverlay = document.getElementById('success-overlay');
    
    // Botões de abertura
    const donateButtons = document.querySelectorAll('.donate-button');
    const volunteerButtons = document.querySelectorAll('.Voluntário-button');
    
    // Botões de fechamento
    const closeDonationModal = document.getElementById('close-donation-modal');
    const closeVolunteerModal = document.getElementById('close-volunteer-modal');
    const closeSuccessModal = document.getElementById('close-success-modal');
    
    // Formulários
    const donationForm = document.getElementById('donation-form');
    const volunteerForm = document.getElementById('volunteer-form');
    
    // Elementos do formulário de doação
    const fileInput = document.getElementById('photos');
    const selectedFiles = document.getElementById('selected-files');
    
    // Elementos do formulário de voluntário
    const experienceGroup = document.getElementById('experienceGroup');
    const volunteerBeforeRadios = document.querySelectorAll('input[name="volunteerBefore"]');

    // ========== FUNÇÕES DE CONTROLE DOS MODAIS ==========
    
    window.openDonationModal = function() {
        openModal(donationModal);
    }
    
    window.openVolunteerModal = function() {
        openModal(volunteerModal);
    }
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showSuccessMessage() {
        successOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSuccessMessage() {
        successOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // ========== EVENT LISTENERS ==========
    
    // Fechar modais
    if (closeDonationModal) {
        closeDonationModal.addEventListener('click', () => closeModal(donationModal));
    }
    
    if (closeVolunteerModal) {
        closeVolunteerModal.addEventListener('click', () => closeModal(volunteerModal));
    }
    
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', closeSuccessMessage);
    }
    
    // Fechar modais clicando fora
    donationModal.addEventListener('click', function(e) {
        if (e.target === donationModal) closeModal(donationModal);
    });
    
    volunteerModal.addEventListener('click', function(e) {
        if (e.target === volunteerModal) closeModal(volunteerModal);
    });
    
    successOverlay.addEventListener('click', function(e) {
        if (e.target === successOverlay) closeSuccessMessage();
    });
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (donationModal.classList.contains('active')) closeModal(donationModal);
            if (volunteerModal.classList.contains('active')) closeModal(volunteerModal);
            if (successOverlay.classList.contains('active')) closeSuccessMessage();
        }
    });

    // ========== FORMULÁRIO DE DOAÇÃO ==========
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDonationSubmission();
        });
    }
    
    // Upload de arquivos
    if (fileInput) {
        fileInput.addEventListener('change', updateSelectedFiles);
        
        const fileUploadArea = fileInput.closest('.file-upload-area');
        if (fileUploadArea) {
            setupDragAndDrop(fileUploadArea);
        }
    }

    // ========== FORMULÁRIO DE VOLUNTÁRIO ==========
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVolunteerSubmission();
        });
    }
    
    // Mostrar/ocultar campo de experiência
    volunteerBeforeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'sim') {
                experienceGroup.style.display = 'block';
            } else {
                experienceGroup.style.display = 'none';
            }
        });
    });
    
    // Buscar CEP
    const cepInput = document.getElementById('cep');
    const cepButton = document.getElementById('cep-button');
    
    if (cepInput && cepButton) {
        cepInput.addEventListener('input', function(e) {
            this.value = formatarCEP(this.value);
        });
        
        cepButton.addEventListener('click', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                buscarEnderecoPorCEP(cep);
            } else {
                alert('CEP inválido. Digite um CEP com 8 dígitos.');
            }
        });
    }
    
    // Calcular idade automaticamente
    const birthDateInput = document.getElementById('birthDate');
    const ageInput = document.getElementById('age');
    
    if (birthDateInput && ageInput) {
        birthDateInput.addEventListener('change', function() {
            const idade = calcularIdade(this.value);
            ageInput.value = idade;
        });
    }

    // ========== FUNÇÕES DE PROCESSAMENTO ==========
    
    function handleDonationSubmission() {
        if (validateDonationForm()) {
            const submitButton = donationForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                closeModal(donationModal);
                showSuccessMessage();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                donationForm.reset();
                selectedFiles.innerHTML = '';
            }, 1500);
        }
    }
    
    function handleVolunteerSubmission() {
        if (validateVolunteerForm()) {
            const submitButton = volunteerForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                closeModal(volunteerModal);
                showSuccessMessage();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                volunteerForm.reset();
                experienceGroup.style.display = 'none';
            }, 1500);
        }
    }

    // ========== FUNÇÕES DE VALIDAÇÃO ==========
    
    function validateDonationForm() {
        let isValid = true;
        removeErrorMessages(donationForm);
        
        const requiredFields = donationForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                markFieldAsInvalid(field, 'Este campo é obrigatório');
                isValid = false;
            }
        });
        
        const radioGroups = donationForm.querySelectorAll('.radio-group');
        radioGroups.forEach(group => {
            const radioName = group.querySelector('input[type="radio"]').name;
            const checkedRadio = donationForm.querySelector(`input[name="${radioName}"]:checked`);
            if (!checkedRadio) {
                markRadioGroupAsInvalid(group, 'Selecione uma opção');
                isValid = false;
            }
        });
        
        if (fileInput.files.length === 0) {
            markFieldAsInvalid(fileInput, 'Pelo menos uma foto é obrigatória');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateVolunteerForm() {
        let isValid = true;
        removeErrorMessages(volunteerForm);
        
        const requiredFields = volunteerForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                markFieldAsInvalid(field, 'Este campo é obrigatório');
                isValid = false;
            }
        });
        
        // Validar idade mínima
        const age = parseInt(ageInput.value);
        if (age < 16) {
            markFieldAsInvalid(ageInput, 'Idade mínima é 16 anos');
            isValid = false;
        }
        
        // Validar CEP
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            markFieldAsInvalid(cepInput, 'CEP inválido');
            isValid = false;
        }
        
        // Validar email
        const email = document.getElementById('email').value;
        if (!validarEmail(email)) {
            markFieldAsInvalid(document.getElementById('email'), 'Email inválido');
            isValid = false;
        }
        
        return isValid;
    }

    // ========== FUNÇÕES AUXILIARES ==========
    
    function updateSelectedFiles() {
        selectedFiles.innerHTML = '';
        
        if (fileInput.files.length > 0) {
            const fileList = document.createElement('ul');
            
            Array.from(fileInput.files).forEach((file, index) => {
                const listItem = createFileListItem(file, index);
                fileList.appendChild(listItem);
            });
            
            selectedFiles.appendChild(fileList);
        }
    }
    
    function createFileListItem(file, index) {
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
        
        return listItem;
    }
    
    function setupDragAndDrop(uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
        });
        
        uploadArea.addEventListener('drop', handleDrop, false);
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function handleDrop(e) {
            const files = e.dataTransfer.files;
            fileInput.files = files;
            updateSelectedFiles();
        }
    }
    
    function removeFile(index) {
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (i !== index) dt.items.add(files[i]);
        }
        
        fileInput.files = dt.files;
        updateSelectedFiles();
    }
    
    function markFieldAsInvalid(field, message) {
        field.style.borderColor = '#e74c3c';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function markRadioGroupAsInvalid(group, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        group.parentNode.appendChild(errorDiv);
    }
    
    function removeErrorMessages(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const fields = form.querySelectorAll('.input-field, .select-field, .textarea-field');
        fields.forEach(field => field.style.borderColor = '#e1e5e9');
    }
    
    function formatarCEP(cep) {
        cep = cep.replace(/\D/g, '');
        cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
        return cep;
    }
    
    function buscarEnderecoPorCEP(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('address').value = data.logradouro || '';
                    document.getElementById('neighborhood').value = data.bairro || '';
                    document.getElementById('city').value = data.localidade || '';
                    document.getElementById('state').value = data.uf || '';
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP. Tente novamente.');
            });
    }
    
    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});

// Adicionar estilo para animação de spin
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .institution-info-small {
        display: flex;
        align-items: center;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 2px solid #e9ecef;
    }
    
    .modal-success {
        background: white;
        border-radius: 16px;
        padding: 40px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: bounceIn 0.6s ease;
    }
    
    .success-icon {
        font-size: 64px;
        color: #4CAF50;
        margin-bottom: 20px;
    }
    
    .success-title {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .success-text {
        color: #666;
        margin-bottom: 25px;
        line-height: 1.5;
    }
    
    .btn-success {
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
    }
    
    .btn-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
    }
`;
document.head.appendChild(style);