// ========== MODAIS UNIFICADOS PARA SOS FELINO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modais SOS Felino carregados - Versão Unificada');
    
    // ========== ELEMENTOS DOS MODAIS ==========
    const donationModal = document.getElementById('donation-modal');
    const volunteerModal = document.getElementById('volunteer-modal');
    const specificDonationModal = document.getElementById('specific-donation-modal');
    const successOverlay = document.getElementById('success-overlay');
    
    // ========== INICIALIZAÇÃO ==========
    initializeAllModals();

    function initializeAllModals() {
        console.log('Inicializando todos os modais SOS Felino...');
        
        setupGlobalEventListeners();
        setupDonationModal();
        setupVolunteerModal();
        setupSpecificDonationModal();
    }

    // ========== CONFIGURAÇÕES GLOBAIS ==========
    function setupGlobalEventListeners() {
        // Fechar modais com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });

        // Fechar modal de sucesso
        const closeSuccessModal = document.getElementById('close-success-modal');
        if (closeSuccessModal) {
            closeSuccessModal.addEventListener('click', closeSuccessMessage);
        }
        
        if (successOverlay) {
            successOverlay.addEventListener('click', function(e) {
                if (e.target === successOverlay) closeSuccessMessage();
            });
        }
    }

    // ========== MODAL DE DOAÇÃO GERAL ==========
    function setupDonationModal() {
        const closeDonationModal = document.getElementById('close-donation-modal');
        const donationForm = document.getElementById('donation-form');
        const fileInput = document.getElementById('photos');
        const selectedFiles = document.getElementById('selected-files');

        // Event Listeners
        if (closeDonationModal) {
            closeDonationModal.addEventListener('click', () => closeModal(donationModal));
        }
        
        if (donationModal) {
            donationModal.addEventListener('click', function(e) {
                if (e.target === donationModal) closeModal(donationModal);
            });
        }

        if (donationForm) {
            donationForm.addEventListener('submit', handleDonationSubmit);
            setupRealTimeValidation(donationForm, validateDonationField);
        }

        // Upload de arquivos
        if (fileInput) {
            setupFileUpload(fileInput, selectedFiles);
        }
    }

    // ========== MODAL DE VOLUNTÁRIO ==========
    function setupVolunteerModal() {
        const closeVolunteerModal = document.getElementById('close-volunteer-modal');
        const volunteerForm = document.getElementById('volunteer-form');
        const experienceGroup = document.getElementById('experienceGroup');
        const volunteerBeforeRadios = document.querySelectorAll('input[name="volunteerBefore"]');
        const birthDateInput = document.getElementById('birthDate');
        const ageInput = document.getElementById('age');
        const cepInput = document.getElementById('cep');
        const cepButton = document.getElementById('cep-button');

        // Event Listeners
        if (closeVolunteerModal) {
            closeVolunteerModal.addEventListener('click', () => closeModal(volunteerModal));
        }
        
        if (volunteerModal) {
            volunteerModal.addEventListener('click', function(e) {
                if (e.target === volunteerModal) closeModal(volunteerModal);
            });
        }

        if (volunteerForm) {
            volunteerForm.addEventListener('submit', handleVolunteerSubmit);
            setupRealTimeValidation(volunteerForm, validateVolunteerField);
        }

        // Configurações específicas do voluntário
        if (volunteerBeforeRadios.length > 0) {
            volunteerBeforeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (experienceGroup) {
                        experienceGroup.style.display = this.value === 'sim' ? 'block' : 'none';
                    }
                });
            });
        }

        if (birthDateInput && ageInput) {
            birthDateInput.addEventListener('change', function() {
                const idade = calcularIdade(this.value);
                if (idade !== '') {
                    ageInput.value = idade;
                }
            });
        }

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

    // ========== MODAL DE DOAÇÃO ESPECÍFICA ==========
    function setupSpecificDonationModal() {
        const closeSpecificDonationModal = document.getElementById('close-specific-donation-modal');
        const specificDonationForm = document.getElementById('specific-donation-form');
        const specificFileInput = document.getElementById('specific-photos');
        const specificSelectedFiles = document.getElementById('specific-selected-files');

        // Event Listeners
        if (closeSpecificDonationModal) {
            closeSpecificDonationModal.addEventListener('click', () => closeModal(specificDonationModal));
        }
        
        if (specificDonationModal) {
            specificDonationModal.addEventListener('click', function(e) {
                if (e.target === specificDonationModal) closeModal(specificDonationModal);
            });
        }

        if (specificDonationForm) {
            specificDonationForm.addEventListener('submit', handleSpecificDonationSubmit);
            setupRealTimeValidation(specificDonationForm, validateSpecificDonationField);
        }

        // Upload de arquivos
        if (specificFileInput) {
            setupFileUpload(specificFileInput, specificSelectedFiles);
        }
    }

    // ========== VALIDAÇÃO EM TEMPO REAL ==========
    function setupRealTimeValidation(form, validationFunction) {
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                validationFunction(this);
            });
            
            field.addEventListener('input', function() {
                clearFieldError(this);
                
                // Formatações específicas
                if (this.id === 'cep' || this.name === 'cep') {
                    this.value = formatarCEP(this.value);
                }
                
                if (this.id === 'phone' || this.name === 'phone') {
                    this.value = formatarTelefone(this.value);
                }
            });
        });

        // Validação específica para radio groups
        const radioGroups = form.querySelectorAll('.radio-group');
        radioGroups.forEach(group => {
            const radios = group.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.addEventListener('change', function() {
                    const groupName = this.name;
                    validateRadioGroup(groupName, 'Por favor, selecione uma opção');
                });
            });
        });
    }

    // ========== VALIDAÇÕES ESPECÍFICAS POR FORMULÁRIO ==========
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
        }
        
        clearFieldError(field);
        return true;
    }

    function validateSpecificDonationField(field) {
        switch (field.name) {
            case 'specific-description':
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

    // ========== VALIDAÇÕES COMPLETAS DOS FORMULÁRIOS ==========
    function validateDonationForm() {
        const form = document.getElementById('donation-form');
        if (!form) return { isValid: false, errors: [] };
        
        const fields = [
            { name: 'item-name', validator: validateDonationField },
            { name: 'category', validator: validateDonationField },
            { name: 'description', validator: validateDonationField }
        ];
        
        let isValid = true;
        const errors = [];
        
        fields.forEach(fieldInfo => {
            const field = form.querySelector(`[name="${fieldInfo.name}"]`);
            if (field && !fieldInfo.validator(field)) {
                isValid = false;
                errors.push(fieldInfo.name);
            }
        });
        
        // Validar radio groups
        const qualityValid = validateRadioGroup('quality', 'Por favor, selecione a qualidade do item');
        const conditionValid = validateRadioGroup('condition', 'Por favor, selecione o estado do item');
        
        if (!qualityValid || !conditionValid) {
            isValid = false;
        }
        
        return { isValid, errors };
    }

    function validateVolunteerForm() {
        const form = document.getElementById('volunteer-form');
        if (!form) return { isValid: false, errors: [] };
        
        const fields = [
            { id: 'fullName', validator: validateVolunteerField },
            { id: 'birthDate', validator: validateVolunteerField },
            { id: 'gender', validator: (field) => {
                if (!field.value) {
                    showFieldError(field, 'Por favor, selecione seu gênero');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'cep', validator: validateVolunteerField },
            { id: 'address', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seu endereço');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'neighborhood', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seu bairro');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'city', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe sua cidade');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'state', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seu estado');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'phone', validator: validateVolunteerField },
            { id: 'email', validator: validateVolunteerField },
            { id: 'availableDays', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seus dias disponíveis');
                    return false;
                }
                clearFieldError(field);
                return true;
            }},
            { id: 'availableHours', validator: (field) => {
                if (!field.value.trim()) {
                    showFieldError(field, 'Por favor, informe seus horários disponíveis');
                    return false;
                }
                clearFieldError(field);
                return true;
            }}
        ];
        
        let isValid = true;
        const errors = [];
        
        fields.forEach(fieldInfo => {
            const field = document.getElementById(fieldInfo.id);
            if (field && !fieldInfo.validator(field)) {
                isValid = false;
                errors.push(fieldInfo.id);
            }
        });
        
        // Validar radio groups
        const volunteerBeforeValid = validateRadioGroup('volunteerBefore', 'Por favor, informe se já foi voluntário antes');
        
        if (!volunteerBeforeValid) {
            isValid = false;
        }
        
        return { isValid, errors };
    }

    function validateSpecificDonationForm() {
        const form = document.getElementById('specific-donation-form');
        if (!form) return { isValid: false, errors: [] };
        
        const fields = [
            { name: 'specific-description', validator: validateSpecificDonationField }
        ];
        
        let isValid = true;
        const errors = [];
        
        fields.forEach(fieldInfo => {
            const field = form.querySelector(`[name="${fieldInfo.name}"]`);
            if (field && !fieldInfo.validator(field)) {
                isValid = false;
                errors.push(fieldInfo.name);
            }
        });
        
        // Validar radio groups
        const qualityValid = validateRadioGroup('specific-quality', 'Por favor, selecione a qualidade do item');
        const conditionValid = validateRadioGroup('specific-condition', 'Por favor, selecione o estado do item');
        
        if (!qualityValid || !conditionValid) {
            isValid = false;
        }
        
        return { isValid, errors };
    }

    // ========== FUNÇÕES AUXILIARES DE VALIDAÇÃO ==========
    function validateRadioGroup(groupName, errorMessage) {
        const radios = document.querySelectorAll(`input[name="${groupName}"]`);
        const checked = Array.from(radios).some(radio => radio.checked);
        
        if (!checked) {
            // Encontrar o primeiro radio para mostrar o erro
            const firstRadio = radios[0];
            if (firstRadio) {
                const radioGroup = firstRadio.closest('.form-field');
                if (radioGroup) {
                    showFieldError(radioGroup, errorMessage);
                }
            }
            return false;
        }
        
        // Limpar erro se existir
        const firstRadio = radios[0];
        if (firstRadio) {
            const radioGroup = firstRadio.closest('.form-field');
            if (radioGroup) {
                clearFieldError(radioGroup);
            }
        }
        
        return true;
    }

    function showFieldError(field, message) {
        // Remover erro anterior se existir
        clearFieldError(field);
        
        // Adicionar classe de erro ao campo
        field.classList.add('field-error');
        
        // Criar elemento de mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error-message';
        errorElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${message}`;
        
        // Inserir após o campo
        if (field.type === 'radio' || field.type === 'checkbox') {
            // Para radio groups, inserir após o grupo
            const radioGroup = field.closest('.form-field');
            if (radioGroup) {
                radioGroup.appendChild(errorElement);
            }
        } else {
            field.parentNode.appendChild(errorElement);
        }
    }

    function clearFieldError(field) {
        // Remover classe de erro
        field.classList.remove('field-error');
        
        // Remover mensagem de erro
        let errorElement;
        if (field.type === 'radio' || field.type === 'checkbox') {
            // Para radio groups, procurar no container do grupo
            const radioGroup = field.closest('.form-field');
            if (radioGroup) {
                errorElement = radioGroup.querySelector('.field-error-message');
            }
        } else {
            errorElement = field.parentNode.querySelector('.field-error-message');
        }
        
        if (errorElement) {
            errorElement.remove();
        }
    }

    // ========== HANDLERS DE SUBMIT ==========
    function handleDonationSubmit(e) {
        e.preventDefault();
        const validation = validateDonationForm();
        if (!validation.isValid) {
            const firstError = e.target.querySelector('.field-error');
            if (firstError && firstError.focus) firstError.focus();
            return;
        }
        processFormSubmission(e.target, 'Doação');
    }

    function handleVolunteerSubmit(e) {
        e.preventDefault();
        const validation = validateVolunteerForm();
        if (!validation.isValid) {
            const firstError = e.target.querySelector('.field-error');
            if (firstError && firstError.focus) firstError.focus();
            return;
        }
        processFormSubmission(e.target, 'Cadastro de Voluntário');
    }

    function handleSpecificDonationSubmit(e) {
        e.preventDefault();
        const validation = validateSpecificDonationForm();
        if (!validation.isValid) {
            const firstError = e.target.querySelector('.field-error');
            if (firstError && firstError.focus) firstError.focus();
            return;
        }
        processFormSubmission(e.target, 'Doação Específica');
    }

    // ========== PROCESSAMENTO DE FORMULÁRIOS ==========
    function processFormSubmission(form, formType) {
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Estado de carregamento
        submitButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Processando...';
        submitButton.disabled = true;
        
        // Simular processamento
        setTimeout(() => {
            const modal = form.closest('.modal-overlay');
            if (modal) closeModal(modal);
            
            showSuccessMessage(formType);
            resetForm(form);
            
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    function resetForm(form) {
        form.reset();
        
        // Limpar todos os erros
        const errorMessages = form.querySelectorAll('.field-error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.field-error');
        errorFields.forEach(field => field.classList.remove('field-error'));
        
        // Limpar arquivos selecionados
        const fileContainers = form.querySelectorAll('.selected-files');
        fileContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // Resetar experiência de voluntário
        const experienceGroup = document.getElementById('experienceGroup');
        if (experienceGroup) {
            experienceGroup.style.display = 'none';
        }
    }

    // ========== FUNÇÕES AUXILIARES ==========
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

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => closeModal(modal));
        closeSuccessMessage();
    }

    function showSuccessMessage(formType = '') {
        if (successOverlay) {
            // Personalizar mensagem baseada no tipo de formulário
            const successTitle = successOverlay.querySelector('.success-title');
            const successText = successOverlay.querySelector('.success-text');
            
            if (successTitle && successText) {
                const messages = {
                    'Doação': {
                        title: 'Doação Realizada com Sucesso!',
                        text: 'Obrigado por sua doação! A SOS Felino agradece sua contribuição.'
                    },
                    'Cadastro de Voluntário': {
                        title: 'Cadastro Realizado com Sucesso!',
                        text: 'Obrigado por seu interesse em fazer a diferença! Entraremos em contato em breve.'
                    },
                    'Doação Específica': {
                        title: 'Doação Específica Realizada!',
                        text: 'Obrigado por sua doação específica! A SOS Felino agradece seu apoio direto às nossas necessidades.'
                    }
                };
                
                const message = messages[formType] || {
                    title: 'Sucesso!',
                    text: 'Sua ação foi realizada com sucesso!'
                };
                
                successTitle.textContent = message.title;
                successText.textContent = message.text;
            }
            
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            createConfetti();
        }
    }
    
    function closeSuccessMessage() {
        if (successOverlay) {
            successOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========== FUNÇÕES DE FORMATAÇÃO E VALIDAÇÃO ==========
    function formatarCEP(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 5) {
            cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
        }
        return cep;
    }

    function formatarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        if (telefone.length === 11) {
            telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (telefone.length === 10) {
            telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return telefone;
    }

    function validarCEP(cep) {
        cep = cep.replace(/\D/g, '');
        return cep.length === 8;
    }

    function validarTelefone(telefone) {
        telefone = telefone.replace(/\D/g, '');
        return telefone.length === 10 || telefone.length === 11;
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        return idade >= 0 ? idade : '';
    }

    function buscarEnderecoPorCEP(cep) {
        const cepButton = document.getElementById('cep-button');
        const originalText = cepButton.innerHTML;
        
        cepButton.innerHTML = '<i class="bi bi-arrow-repeat spin"></i>';
        cepButton.disabled = true;
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('address').value = data.logradouro || '';
                    document.getElementById('neighborhood').value = data.bairro || '';
                    document.getElementById('city').value = data.localidade || '';
                    document.getElementById('state').value = data.uf || '';
                    showNotification('Endereço encontrado com sucesso!', 'success');
                } else {
                    showNotification('CEP não encontrado.', 'error');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                showNotification('Erro ao buscar CEP. Tente novamente.', 'error');
            })
            .finally(() => {
                cepButton.innerHTML = originalText;
                cepButton.disabled = false;
            });
    }

    function setupFileUpload(fileInput, selectedFilesContainer) {
        fileInput.addEventListener('change', function() {
            updateSelectedFiles(this, selectedFilesContainer);
        });
        
        // Drag and drop
        const uploadArea = fileInput.parentElement;
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            fileInput.files = e.dataTransfer.files;
            updateSelectedFiles(fileInput, selectedFilesContainer);
        });
    }

    function updateSelectedFiles(fileInput, container) {
        container.innerHTML = '';
        
        if (fileInput.files.length > 0) {
            const fileList = document.createElement('ul');
            fileList.className = 'file-list';
            
            Array.from(fileInput.files).forEach((file, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'file-list-item';
                
                listItem.innerHTML = `
                    <div class="file-info">
                        <i class="bi bi-file-image file-icon"></i>
                        <div class="file-details">
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">${formatFileSize(file.size)}</span>
                        </div>
                    </div>
                    <button type="button" class="file-remove" data-index="${index}">
                        <i class="bi bi-x"></i>
                    </button>
                `;
                
                fileList.appendChild(listItem);
            });
            
            container.appendChild(fileList);
            
            // Adicionar event listeners para remover arquivos
            container.querySelectorAll('.file-remove').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeFile(fileInput, index);
                    updateSelectedFiles(fileInput, container);
                });
            });
        }
    }

    function removeFile(fileInput, index) {
        const files = Array.from(fileInput.files);
        files.splice(index, 1);
        
        const newFileList = new DataTransfer();
        files.forEach(file => newFileList.items.add(file));
        fileInput.files = newFileList.files;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function showNotification(message, type = 'info') {
        // Implementação básica de notificação
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Aqui você pode implementar um sistema de notificação mais elaborado
        alert(`${type.toUpperCase()}: ${message}`);
    }

    function createConfetti() {
        // Implementação básica de confetti
        console.log('🎉 Confetti!');
    }
});

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

window.openSpecificDonationModal = function(itemName, category, description, imageUrl, progress) {
    console.log('Abrindo modal de doação específica para:', itemName);
    
    // Preencher informações do item selecionado
    const elements = {
        itemName: document.getElementById('selected-item-name'),
        itemDescription: document.getElementById('selected-item-description'),
        itemImage: document.getElementById('selected-item-image'),
        progress: document.getElementById('selected-item-progress'),
        specificItemName: document.getElementById('specific-item-name'),
        specificCategory: document.getElementById('specific-category'),
        specificDescription: document.getElementById('specific-description')
    };
    
    // Atualizar informações visuais
    if (elements.itemName) elements.itemName.textContent = itemName;
    if (elements.itemDescription) elements.itemDescription.textContent = description;
    if (elements.itemImage) {
        elements.itemImage.src = imageUrl;
        elements.itemImage.alt = itemName;
    }
    if (elements.progress) elements.progress.style.width = progress + '%';
    
    // Preencher campos do formulário
    if (elements.specificItemName) elements.specificItemName.value = itemName;
    if (elements.specificCategory) {
        elements.specificCategory.value = category;
        // Criar uma opção se não existir
        if (!elements.specificCategory.querySelector(`option[value="${category}"]`)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            elements.specificCategory.appendChild(option);
        }
        elements.specificCategory.value = category;
    }
    if (elements.specificDescription) {
        elements.specificDescription.placeholder = `Descreva detalhes sobre ${itemName.toLowerCase()} (marca, quantidade, validade, etc.)`;
    }
    
    // Abrir o modal
    const specificDonationModal = document.getElementById('specific-donation-modal');
    if (specificDonationModal) {
        specificDonationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};