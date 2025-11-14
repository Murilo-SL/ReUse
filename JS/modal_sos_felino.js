// ========== MODAIS ATUALIZADOS PARA SOS FELINO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal SOS Felino carregado - Com Validação Completa');
    
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
    const birthDateInput = document.getElementById('birthDate');
    const ageInput = document.getElementById('age');
    const cepInput = document.getElementById('cep');
    const cepButton = document.getElementById('cep-button');

    // ========== INICIALIZAÇÃO ==========
    initializeModals();

    function initializeModals() {
        console.log('Inicializando modais SOS Felino...');
        
        setupEventListeners();
        setupFileUpload();
        setupVolunteerForm();
        setupCEPHandler();
        setupAgeCalculator();
        setupRealTimeValidation();
    }
    
    function setupEventListeners() {
        // Abrir modal de doação
        donateButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Abrindo modal de doação SOS Felino');
                openModal(donationModal);
            });
        });
        
        // Abrir modal de voluntário
        volunteerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Abrindo modal de voluntário SOS Felino');
                openModal(volunteerModal);
            });
        });
        
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
        if (donationModal) {
            donationModal.addEventListener('click', function(e) {
                if (e.target === donationModal) closeModal(donationModal);
            });
        }
        
        if (volunteerModal) {
            volunteerModal.addEventListener('click', function(e) {
                if (e.target === volunteerModal) closeModal(volunteerModal);
            });
        }
        
        if (successOverlay) {
            successOverlay.addEventListener('click', function(e) {
                if (e.target === successOverlay) closeSuccessMessage();
            });
        }
        
        // Fechar com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (donationModal && donationModal.classList.contains('active')) closeModal(donationModal);
                if (volunteerModal && volunteerModal.classList.contains('active')) closeModal(volunteerModal);
                if (successOverlay && successOverlay.classList.contains('active')) closeSuccessMessage();
            }
        });

        // Formulários
        if (donationForm) {
            donationForm.addEventListener('submit', handleDonationSubmit);
        }
        
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', handleVolunteerSubmit);
        }
    }

    // ========== VALIDAÇÃO EM TEMPO REAL ==========
    function setupRealTimeValidation() {
        // Validação para formulário de doação
        if (donationForm) {
            const donationFields = donationForm.querySelectorAll('input, select, textarea');
            donationFields.forEach(field => {
                field.addEventListener('blur', function() {
                    validateDonationField(this);
                });
                
                field.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        }

        // Validação para formulário de voluntário
        if (volunteerForm) {
            const volunteerFields = volunteerForm.querySelectorAll('input, select, textarea');
            volunteerFields.forEach(field => {
                field.addEventListener('blur', function() {
                    validateVolunteerField(this);
                });
                
                field.addEventListener('input', function() {
                    clearFieldError(this);
                    
                    // Validação específica para alguns campos
                    if (this.id === 'cep') {
                        this.value = formatarCEP(this.value);
                    }
                    
                    if (this.id === 'phone') {
                        this.value = formatarTelefone(this.value);
                    }
                });
            });

            // Validação específica para data de nascimento
            if (birthDateInput) {
                birthDateInput.addEventListener('change', function() {
                    validateBirthDate(this);
                });
            }

            // Validação específica para email
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.addEventListener('blur', function() {
                    validateEmail(this);
                });
            }
        }
    }

    // ========== VALIDAÇÃO DO FORMULÁRIO DE DOAÇÃO ==========
    function validateDonationForm() {
        let isValid = true;
        const errors = [];

        // Nome do item
        const itemName = document.getElementById('item-name');
        if (!itemName.value.trim()) {
            showFieldError(itemName, 'Por favor, informe o nome do item');
            isValid = false;
            errors.push('Nome do item é obrigatório');
        } else if (itemName.value.trim().length < 3) {
            showFieldError(itemName, 'O nome do item deve ter pelo menos 3 caracteres');
            isValid = false;
            errors.push('Nome do item muito curto');
        }

        // Categoria
        const category = document.getElementById('category');
        if (!category.value) {
            showFieldError(category, 'Por favor, selecione uma categoria');
            isValid = false;
            errors.push('Categoria é obrigatória');
        }

        // Qualidade
        const qualitySelected = document.querySelector('input[name="quality"]:checked');
        if (!qualitySelected) {
            showFieldError(document.querySelector('.radio-group'), 'Por favor, selecione a qualidade do item');
            isValid = false;
            errors.push('Qualidade do item é obrigatória');
        }

        // Estado
        const conditionSelected = document.querySelector('input[name="condition"]:checked');
        if (!conditionSelected) {
            showFieldError(document.querySelectorAll('.radio-group')[1], 'Por favor, selecione o estado do item');
            isValid = false;
            errors.push('Estado do item é obrigatório');
        }

        // Descrição
        const description = document.getElementById('description');
        if (!description.value.trim()) {
            showFieldError(description, 'Por favor, descreva o item');
            isValid = false;
            errors.push('Descrição é obrigatória');
        } else if (description.value.trim().length < 10) {
            showFieldError(description, 'A descrição deve ter pelo menos 10 caracteres');
            isValid = false;
            errors.push('Descrição muito curta');
        }

        // Fotos (opcional, mas valida se enviadas)
        if (fileInput && fileInput.files.length > 0) {
            const files = Array.from(fileInput.files);
            for (let file of files) {
                // Validar tipo de arquivo
                if (!file.type.startsWith('image/')) {
                    showFieldError(fileInput, 'Apenas imagens são permitidas');
                    isValid = false;
                    errors.push('Tipo de arquivo inválido');
                    break;
                }
                
                // Validar tamanho do arquivo (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showFieldError(fileInput, 'Cada arquivo deve ter no máximo 5MB');
                    isValid = false;
                    errors.push('Arquivo muito grande');
                    break;
                }
            }
        }

        return { isValid, errors };
    }

    function validateDonationField(field) {
        switch (field.name) {
            case 'item-name':
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe o nome do item');
                    return false;
                } else if (field.value.trim().length < 3) {
                    showFieldError(field, 'O nome do item deve ter pelo menos 3 caracteres');
                    return false;
                }
                break;
                
            case 'category':
                if (!field.value) {
                    showFieldError(field, 'Por favor, selecione uma categoria');
                    return false;
                }
                break;
                
            case 'description':
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, descreva o item');
                    return false;
                } else if (field.value.trim().length < 10) {
                    showFieldError(field, 'A descrição deve ter pelo menos 10 caracteres');
                    return false;
                }
                break;
        }
        
        clearFieldError(field);
        return true;
    }

    // ========== VALIDAÇÃO DO FORMULÁRIO DE VOLUNTÁRIO ==========
    function validateVolunteerForm() {
        let isValid = true;
        const errors = [];

        // Nome completo
        const fullName = document.getElementById('fullName');
        if (!fullName.value.trim()) {
            showFieldError(fullName, 'Por favor, informe seu nome completo');
            isValid = false;
            errors.push('Nome completo é obrigatório');
        } else if (fullName.value.trim().split(' ').length < 2) {
            showFieldError(fullName, 'Por favor, informe nome e sobrenome');
            isValid = false;
            errors.push('Nome completo deve conter sobrenome');
        }

        // Data de nascimento
        const birthDate = document.getElementById('birthDate');
        if (!birthDate.value) {
            showFieldError(birthDate, 'Por favor, informe sua data de nascimento');
            isValid = false;
            errors.push('Data de nascimento é obrigatória');
        } else {
            const age = calcularIdade(birthDate.value);
            if (age < 16) {
                showFieldError(birthDate, 'Você deve ter pelo menos 16 anos para ser voluntário');
                isValid = false;
                errors.push('Idade mínima não atingida');
            }
        }

        // Gênero
        const gender = document.getElementById('gender');
        if (!gender.value) {
            showFieldError(gender, 'Por favor, selecione seu gênero');
            isValid = false;
            errors.push('Gênero é obrigatório');
        }

        // CEP
        const cep = document.getElementById('cep');
        if (!cep.value) {
            showFieldError(cep, 'Por favor, informe seu CEP');
            isValid = false;
            errors.push('CEP é obrigatório');
        } else if (!validarCEP(cep.value)) {
            showFieldError(cep, 'Por favor, informe um CEP válido');
            isValid = false;
            errors.push('CEP inválido');
        }

        // Telefone
        const phone = document.getElementById('phone');
        if (!phone.value) {
            showFieldError(phone, 'Por favor, informe seu telefone');
            isValid = false;
            errors.push('Telefone é obrigatório');
        } else if (!validarTelefone(phone.value)) {
            showFieldError(phone, 'Por favor, informe um telefone válido');
            isValid = false;
            errors.push('Telefone inválido');
        }

        // Endereço
        const address = document.getElementById('address');
        if (!address.value.trim()) {
            showFieldError(address, 'Por favor, informe seu endereço');
            isValid = false;
            errors.push('Endereço é obrigatório');
        }

        // Bairro
        const neighborhood = document.getElementById('neighborhood');
        if (!neighborhood.value.trim()) {
            showFieldError(neighborhood, 'Por favor, informe seu bairro');
            isValid = false;
            errors.push('Bairro é obrigatório');
        }

        // Cidade
        const city = document.getElementById('city');
        if (!city.value.trim()) {
            showFieldError(city, 'Por favor, informe sua cidade');
            isValid = false;
            errors.push('Cidade é obrigatória');
        }

        // Estado
        const state = document.getElementById('state');
        if (!state.value.trim()) {
            showFieldError(state, 'Por favor, informe seu estado');
            isValid = false;
            errors.push('Estado é obrigatório');
        }

        // Email
        const email = document.getElementById('email');
        if (!email.value) {
            showFieldError(email, 'Por favor, informe seu e-mail');
            isValid = false;
            errors.push('E-mail é obrigatório');
        } else if (!validarEmail(email.value)) {
            showFieldError(email, 'Por favor, informe um e-mail válido');
            isValid = false;
            errors.push('E-mail inválido');
        }

        // Experiência voluntária
        const volunteerBefore = document.querySelector('input[name="volunteerBefore"]:checked');
        if (!volunteerBefore) {
            showFieldError(document.querySelector('.radio-group'), 'Por favor, informe se já teve experiência voluntária');
            isValid = false;
            errors.push('Experiência voluntária é obrigatória');
        } else if (volunteerBefore.value === 'sim') {
            const experience = document.getElementById('experience');
            if (!experience.value.trim()) {
                showFieldError(experience, 'Por favor, descreva sua experiência anterior');
                isValid = false;
                errors.push('Descrição da experiência é obrigatória');
            }
        }

        // Disponibilidade
        const availableDays = document.getElementById('availableDays');
        if (!availableDays.value.trim()) {
            showFieldError(availableDays, 'Por favor, informe os dias disponíveis');
            isValid = false;
            errors.push('Dias disponíveis são obrigatórios');
        }

        const availableHours = document.getElementById('availableHours');
        if (!availableHours.value.trim()) {
            showFieldError(availableHours, 'Por favor, informe os horários disponíveis');
            isValid = false;
            errors.push('Horários disponíveis são obrigatórios');
        }

        return { isValid, errors };
    }

    function validateVolunteerField(field) {
        switch (field.id) {
            case 'fullName':
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seu nome completo');
                    return false;
                } else if (field.value.trim().split(' ').length < 2) {
                    showFieldError(field, 'Por favor, informe nome e sobrenome');
                    return false;
                }
                break;
                
            case 'birthDate':
                if (!field.value) {
                    showFieldError(field, 'Por favor, informe sua data de nascimento');
                    return false;
                } else {
                    const age = calcularIdade(field.value);
                    if (age < 16) {
                        showFieldError(field, 'Você deve ter pelo menos 16 anos para ser voluntário');
                        return false;
                    }
                }
                break;
                
            case 'cep':
                if (!field.value) {
                    showFieldError(field, 'Por favor, informe seu CEP');
                    return false;
                } else if (!validarCEP(field.value)) {
                    showFieldError(field, 'Por favor, informe um CEP válido');
                    return false;
                }
                break;
                
            case 'phone':
                if (!field.value) {
                    showFieldError(field, 'Por favor, informe seu telefone');
                    return false;
                } else if (!validarTelefone(field.value)) {
                    showFieldError(field, 'Por favor, informe um telefone válido');
                    return false;
                }
                break;
                
            case 'email':
                if (!field.value) {
                    showFieldError(field, 'Por favor, informe seu e-mail');
                    return false;
                } else if (!validarEmail(field.value)) {
                    showFieldError(field, 'Por favor, informe um e-mail válido');
                    return false;
                }
                break;
                
            case 'availableDays':
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe os dias disponíveis');
                    return false;
                }
                break;
                
            case 'availableHours':
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe os horários disponíveis');
                    return false;
                }
                break;
        }
        
        clearFieldError(field);
        return true;
    }

    function validateBirthDate(field) {
        if (field.value) {
            const age = calcularIdade(field.value);
            if (age < 16) {
                showFieldError(field, 'Você deve ter pelo menos 16 anos para ser voluntário');
                return false;
            } else {
                clearFieldError(field);
                return true;
            }
        }
        return false;
    }

    function validateEmail(field) {
        if (field.value && !validarEmail(field.value)) {
            showFieldError(field, 'Por favor, informe um e-mail válido');
            return false;
        }
        return true;
    }

    // ========== FUNÇÕES AUXILIARES DE VALIDAÇÃO ==========
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarCEP(cep) {
        const regex = /^\d{5}-?\d{3}$/;
        return regex.test(cep);
    }

    function validarTelefone(telefone) {
        const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
        return regex.test(telefone);
    }

    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length === 11) {
            return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telefone.length === 10) {
            return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    }

    // ========== MANIPULAÇÃO DE ERROS ==========
    function showFieldError(field, message) {
        clearFieldError(field);
        
        // Adiciona classe de erro ao campo
        field.classList.add('field-error');
        
        // Cria elemento de erro
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
        
        // Insere após o campo
        if (field.parentNode) {
            field.parentNode.appendChild(errorElement);
        }
    }

    function clearFieldError(field) {
        field.classList.remove('field-error');
        
        // Remove mensagem de erro existente
        const existingError = field.parentNode.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // ========== HANDLERS DE FORMULÁRIOS ==========
    function handleDonationSubmit(e) {
        e.preventDefault();
        
        const validation = validateDonationForm();
        if (!validation.isValid) {
            // Highlight first invalid field and focus it
            const firstError = donationForm.querySelector('.field-error');
            if (firstError && typeof firstError.focus === 'function') firstError.focus();
            return;
        }
        
        processDonationForm();
    }
    
    function handleVolunteerSubmit(e) {
        e.preventDefault();
        
        const validation = validateVolunteerForm();
        if (!validation.isValid) {
            // Highlight first invalid field and focus it
            const firstError = volunteerForm.querySelector('.field-error');
            if (firstError && typeof firstError.focus === 'function') firstError.focus();
            return;
        }
        
        processVolunteerForm();
    }

    // ========== PROCESSAMENTO DE FORMULÁRIOS ==========
    function processDonationForm() {
        const submitButton = donationForm ? donationForm.querySelector('.submit-button') : null;
        if (!submitButton) return;
        
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carregamento
        submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
        submitButton.disabled = true;
        
        // Simular processamento
        setTimeout(() => {
            closeModal(donationModal);
            showSuccessMessage();
            resetDonationForm();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
    
    function processVolunteerForm() {
        const submitButton = volunteerForm ? volunteerForm.querySelector('.submit-button') : null;
        if (!submitButton) return;
        
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carregamento
        submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simular processamento
        setTimeout(() => {
            closeModal(volunteerModal);
            showSuccessMessage();
            resetVolunteerForm();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    // ========== MENSAGEM DE SUCESSO ANIMADA ==========
    function showSuccessMessage() {
        if (successOverlay) {
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Adicionar animação de confete
            createConfetti();
        }
    }
    
    function closeSuccessMessage() {
        if (successOverlay) {
            successOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========== ANIMAÇÃO DE CONFETES ==========
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
            
            // Animação
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
            
            // Remover após animação
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

    // ========== FUNÇÕES AUXILIARES ==========
    function setupFileUpload() {
        if (fileInput) {
            fileInput.addEventListener('change', updateSelectedFiles);
            
            const fileUploadArea = fileInput.closest('.file-upload-area');
            if (fileUploadArea) {
                setupDragAndDrop(fileUploadArea);
            }
        }
    }
    
    function setupVolunteerForm() {
        if (volunteerBeforeRadios.length > 0) {
            volunteerBeforeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (experienceGroup) {
                        if (this.value === 'sim') {
                            experienceGroup.style.display = 'block';
                        } else {
                            experienceGroup.style.display = 'none';
                        }
                    }
                });
            });
        }
    }
    
    function setupCEPHandler() {
        if (cepInput && cepButton) {
            cepInput.addEventListener('input', function(e) {
                this.value = formatarCEP(this.value);
            });
            
            cepButton.addEventListener('click', function() {
                const cep = cepInput.value.replace(/\D/g, '');
                if (cep.length === 8) {
                    buscarEnderecoPorCEP(cep);
                } else {
                    showNotification('CEP inválido. Digite um CEP com 8 dígitos.', 'error');
                }
            });
        }
    }
    
    function setupAgeCalculator() {
        if (birthDateInput && ageInput) {
            birthDateInput.addEventListener('change', function() {
                const idade = calcularIdade(this.value);
                if (idade !== '') {
                    ageInput.value = idade;
                }
            });
        }
    }

    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    function resetDonationForm() {
        if (donationForm) {
            donationForm.reset();
        }
        if (selectedFiles) {
            selectedFiles.innerHTML = '';
        }
        
        // Limpar erros
        const errorMessages = donationForm.querySelectorAll('.field-error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = donationForm.querySelectorAll('.field-error');
        errorFields.forEach(field => field.classList.remove('field-error'));
    }
    
    function resetVolunteerForm() {
        if (volunteerForm) {
            volunteerForm.reset();
        }
        if (experienceGroup) {
            experienceGroup.style.display = 'none';
        }
        
        // Limpar erros
        const errorMessages = volunteerForm.querySelectorAll('.field-error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = volunteerForm.querySelectorAll('.field-error');
        errorFields.forEach(field => field.classList.remove('field-error'));
    }

    function updateSelectedFiles() {
        if (!selectedFiles) return;
        
        selectedFiles.innerHTML = '';
        
        if (fileInput && fileInput.files.length > 0) {
            const fileList = document.createElement('ul');
            fileList.className = 'file-list';
            
            Array.from(fileInput.files).forEach((file, index) => {
                const listItem = createFileListItem(file, index);
                fileList.appendChild(listItem);
            });
            
            selectedFiles.appendChild(fileList);
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
            if (fileInput) {
                fileInput.files = files;
                updateSelectedFiles();
            }
        }
    }
    
    function removeFile(index) {
        if (!fileInput) return;
        
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (i !== index) dt.items.add(files[i]);
        }
        
        fileInput.files = dt.files;
        updateSelectedFiles();
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
                    showNotification('CEP não encontrado.', 'error');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                showNotification('Erro ao buscar CEP. Tente novamente.', 'error');
            });
    }
    
    function calcularIdade(dataNascimento) {
        if (!dataNascimento) return '';
        
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        
        if (isNaN(nascimento.getTime())) return '';
        
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    }
    
    function formatFileSize(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function showNotification(message, type = 'info') {
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

// ========== ESTILOS PARA ANIMAÇÕES E VALIDAÇÃO ==========
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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

    /* Estilos para validação */
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

    /* Animações para o modal de sucesso */
    .success-overlay.active {
        display: flex;
        animation: fadeIn 0.3s ease;
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
        position: relative;
        z-index: 10001;
    }
    
    .success-icon {
        font-size: 64px;
        color: #4CAF50;
        margin-bottom: 20px;
        animation: pulse 2s infinite;
    }
    
    .success-title {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 1.5rem;
        animation: slideInUp 0.5s ease 0.2s both;
    }
    
    .success-text {
        color: #666;
        margin-bottom: 25px;
        line-height: 1.5;
        animation: slideInUp 0.5s ease 0.4s both;
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
        animation: slideInUp 0.5s ease 0.6s both;
    }
    
    .btn-success:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
    }

    /* Animações */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes bounceIn {
        0% { 
            transform: scale(0.3); 
            opacity: 0; 
        }
        50% { 
            transform: scale(1.05); 
        }
        70% { 
            transform: scale(0.9); 
        }
        100% { 
            transform: scale(1); 
            opacity: 1; 
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Confetti animation */
    .confetti {
        animation: confettiFall linear forwards;
    }
    
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    /* Melhorias visuais para os modais */
    .modal-overlay.active .modal-donation {
        transform: scale(1);
        opacity: 1;
    }

    .modal-donation {
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .institution-info-small {
        display: flex;
        align-items: center;
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 2px solid #e9ecef;
    }

    /* Notifications */
    .notification {
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
    }
`;
document.head.appendChild(modalStyles);

// ========== FUNÇÕES GLOBAIS PARA ABRIR MODAIS ==========
window.openDonationModal = function() {
    const donationModal = document.getElementById('donation-modal');
    if (donationModal) {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.openVolunteerModal = function() {
    const volunteerModal = document.getElementById('volunteer-modal');
    if (volunteerModal) {
        volunteerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}