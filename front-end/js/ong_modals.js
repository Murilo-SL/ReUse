// ong-modals.js - Script para controlar os modais na página de detalhes da ONG
document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let currentOngId = '';
    let currentOngData = null;
    let uploadedImages = [];
    let selectedAreas = [];

    // Inicializar quando os dados da ONG forem carregados
    function initModals() {
        const ongId = getUrlParam('id');
        currentOngId = ongId;
        
        // Pegar dados da ONG do objeto ONG_DATA (do ong-detail.js)
        if (window.ONG_DATA && window.ONG_DATA[ongId]) {
            currentOngData = window.ONG_DATA[ongId];
            setupModalData();
        }
        
        setupEventListeners();
        setupImageUpload();
        setupCEP();
        setupAreasSelection();
        setupCharCounters();
    }

    function getUrlParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    function setupModalData() {
        if (!currentOngData) return;
        
        // Atualizar nomes da ONG nos modais
        document.querySelectorAll('#modalOngName, #modalOngNameDisplay, #volunteerOngName').forEach(el => {
            el.textContent = currentOngData.name;
        });
        
        // Atualizar imagem
        const modalImage = document.getElementById('modalOngImage');
        if (modalImage) {
            modalImage.src = currentOngData.image;
            modalImage.alt = currentOngData.name;
        }
        
        // Atualizar descrição
        const modalDescription = document.getElementById('modalOngDescription');
        if (modalDescription) {
            modalDescription.textContent = currentOngData.description.substring(0, 100) + '...';
        }
        
        // Atualizar tags
        const modalTags = document.getElementById('modalOngTags');
        if (modalTags && currentOngData.tags) {
            modalTags.innerHTML = '';
            currentOngData.tags.slice(0, 3).forEach(tag => {
                const span = document.createElement('span');
                span.className = 'ong-selector-tag';
                span.textContent = tag;
                modalTags.appendChild(span);
            });
        }
        
        // Preencher campo oculto com ID da ONG
        const selectedOngId = document.getElementById('selectedOngId');
        if (selectedOngId) {
            selectedOngId.value = currentOngId;
        }
    }

    function setupEventListeners() {
        // Botão de doar
        const donateBtn = document.getElementById('donateBtn');
        if (donateBtn) {
            donateBtn.addEventListener('click', openDonationModal);
        }
        
        // Botão de voluntariado
        const volunteerBtn = document.getElementById('volunteerBtn');
        if (volunteerBtn) {
            volunteerBtn.addEventListener('click', openVolunteerModal);
        }
        
        // Fechar modais
        document.getElementById('closeOngDonationModal').addEventListener('click', closeDonationModal);
        document.getElementById('ongCancelDonation').addEventListener('click', closeDonationModal);
        document.getElementById('ongCloseSuccessModal').addEventListener('click', closeDonationModal);
        
        document.getElementById('closeVolunteerModal').addEventListener('click', closeVolunteerModal);
        document.getElementById('volunteerCancel').addEventListener('click', closeVolunteerModal);
        document.getElementById('volunteerCloseSuccessModal').addEventListener('click', closeVolunteerModal);
        
        // Novas inscrições
        document.getElementById('ongNewDonation').addEventListener('click', resetDonationForm);
        document.getElementById('volunteerNewApplication').addEventListener('click', resetVolunteerForm);
        
        // Envio de formulários
        document.getElementById('ongSubmitDonation').addEventListener('click', submitDonation);
        document.getElementById('volunteerSubmit').addEventListener('click', submitVolunteer);
        
        // Fechar modal ao clicar fora
        document.querySelectorAll('.donation-modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    if (this.id === 'ongDonationModal') closeDonationModal();
                    if (this.id === 'volunteerModal') closeVolunteerModal();
                }
            });
        });
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('ongDonationModal').classList.contains('active')) {
                    closeDonationModal();
                }
                if (document.getElementById('volunteerModal').classList.contains('active')) {
                    closeVolunteerModal();
                }
            }
        });
    }

    function setupImageUpload() {
        const uploadArea = document.getElementById('ongImageUploadArea');
        const fileInput = document.getElementById('ongProductImages');
        const uploadBtn = document.getElementById('ongUploadImageBtn');
        const previewContainer = document.getElementById('ongImagePreviewContainer');

        uploadBtn.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleImageUpload(files);
        });

        fileInput.addEventListener('change', (e) => {
            handleImageUpload(e.target.files);
        });
    }

    function handleImageUpload(files) {
        const maxFiles = 5;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024;

        Array.from(files).slice(0, maxFiles - uploadedImages.length).forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                showError('Apenas imagens JPG, PNG, GIF ou WebP são permitidas');
                return;
            }

            if (file.size > maxSize) {
                showError('A imagem deve ter no máximo 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImages.push({
                    name: file.name,
                    data: e.target.result
                });
                updateImagePreview();
            };
            reader.readAsDataURL(file);
        });
    }

    function updateImagePreview() {
        const previewContainer = document.getElementById('ongImagePreviewContainer');
        previewContainer.innerHTML = '';

        uploadedImages.forEach((image, index) => {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            
            preview.innerHTML = `
                <img src="${image.data}" alt="Preview ${index + 1}">
                <button type="button" class="image-preview-remove" data-index="${index}">
                    <i class="bi bi-x"></i>
                </button>
            `;

            preview.querySelector('.image-preview-remove').addEventListener('click', (e) => {
                e.stopPropagation();
                uploadedImages.splice(index, 1);
                updateImagePreview();
            });

            previewContainer.appendChild(preview);
        });
    }

    function setupCEP() {
        const cepField = document.getElementById('ongCollectionCEP');
        const searchBtn = document.getElementById('ongSearchCEP');
        const personalDelivery = document.getElementById('ongPersonalDelivery');

        // Formatar CEP
        cepField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });

        // Buscar CEP
        searchBtn.addEventListener('click', async () => {
            const cep = cepField.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                showFieldError('ongCepError', 'ongCollectionCEP');
                return;
            }

            searchBtn.disabled = true;
            searchBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Buscando...';

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    throw new Error('CEP não encontrado');
                }

                document.getElementById('ongCollectionStreet').value = data.logradouro || '';
                document.getElementById('ongCollectionNeighborhood').value = data.bairro || '';
                document.getElementById('ongCollectionCity').value = data.localidade || '';
                document.getElementById('ongCollectionState').value = data.uf || '';
                document.getElementById('ongCollectionNumber').focus();

                showFieldSuccess('ongCollectionCEP');
                document.getElementById('ongCepError').style.display = 'none';

            } catch (error) {
                showFieldError('ongCepError', 'ongCollectionCEP');
                showError('Erro ao buscar CEP. Tente novamente.');
            } finally {
                searchBtn.disabled = false;
                searchBtn.innerHTML = '<i class="bi bi-search"></i> Buscar CEP';
            }
        });

        // Toggle entrega pessoal
        personalDelivery.addEventListener('change', (e) => {
            const addressFields = [
                'ongCollectionCEP',
                'ongCollectionStreet',
                'ongCollectionNeighborhood',
                'ongCollectionCity',
                'ongCollectionState',
                'ongCollectionNumber',
                'ongCollectionComplement'
            ];

            if (e.target.checked) {
                addressFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.disabled = true;
                        field.classList.add('disabled');
                    }
                });
                searchBtn.disabled = true;
                searchBtn.classList.add('disabled');
            } else {
                addressFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.disabled = false;
                        field.classList.remove('disabled');
                    }
                });
                searchBtn.disabled = false;
                searchBtn.classList.remove('disabled');
            }
        });
    }

    function setupAreasSelection() {
        const areaCheckboxes = document.querySelectorAll('.area-checkbox input[type="checkbox"]');
        
        areaCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedAreas.push(e.target.value);
                } else {
                    selectedAreas = selectedAreas.filter(area => area !== e.target.value);
                }
            });
        });
    }

    function setupCharCounters() {
        // Contador para descrição de doação
        const donationDescription = document.getElementById('ongProductDescription');
        const donationCounter = document.getElementById('ongDescriptionCounter');
        
        if (donationDescription && donationCounter) {
            donationDescription.addEventListener('input', () => {
                const length = donationDescription.value.length;
                donationCounter.textContent = `${length}/500 caracteres`;
                updateCounterStyle(donationCounter, length, 500);
            });
        }
        
        // Contador para motivação de voluntariado
        const motivationField = document.getElementById('volunteerMotivation');
        const motivationCounter = document.getElementById('motivationCounter');
        
        if (motivationField && motivationCounter) {
            motivationField.addEventListener('input', () => {
                const length = motivationField.value.length;
                motivationCounter.textContent = `${length}/300 caracteres`;
                updateCounterStyle(motivationCounter, length, 300);
            });
        }
        
        // Contador para habilidades
        const skillsField = document.getElementById('volunteerSkills');
        const skillsCounter = document.getElementById('skillsCounter');
        
        if (skillsField && skillsCounter) {
            skillsField.addEventListener('input', () => {
                const length = skillsField.value.length;
                skillsCounter.textContent = `${length}/200 caracteres`;
                updateCounterStyle(skillsCounter, length, 200);
            });
        }
    }

    function updateCounterStyle(counterElement, length, maxLength) {
        counterElement.classList.remove('near-limit', 'over-limit');
        
        if (length > maxLength) {
            counterElement.classList.add('over-limit');
        } else if (length > maxLength * 0.9) {
            counterElement.classList.add('near-limit');
        }
    }

    function validateDonationForm() {
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('#ongDonationForm .error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll('#ongDonationForm .form-control').forEach(el => {
            el.classList.remove('error', 'success');
        });

        // Validar campos obrigatórios
        const requiredFields = [
            { id: 'ongProductName', errorId: 'ongProductNameError' },
            { id: 'ongProductCategory', errorId: 'ongCategoryError' },
            { id: 'ongProductCondition', errorId: 'ongConditionError' },
            { id: 'ongProductDescription', errorId: 'ongDescriptionError', minLength: 20 },
            { id: 'ongContactPhone', errorId: 'ongPhoneError' }
        ];

        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            
            if (!element || !errorElement) return;
            
            let value = element.value.trim();
            
            if (field.id === 'ongProductDescription' && field.minLength) {
                if (!value || value.length < field.minLength) {
                    showFieldError(field.errorId, field.id);
                    isValid = false;
                } else {
                    showFieldSuccess(field.id);
                }
            } else if (!value) {
                showFieldError(field.errorId, field.id);
                isValid = false;
            } else {
                showFieldSuccess(field.id);
            }
        });

        // Validar telefone (formato brasileiro)
        const phone = document.getElementById('ongContactPhone').value.trim();
        const phoneDigits = phone.replace(/\D/g, '');
        if (!phone || phoneDigits.length !== 11) {
            showFieldError('ongPhoneError', 'ongContactPhone');
            isValid = false;
        }

        // Validar endereço se não for entrega pessoal
        const personalDelivery = document.getElementById('ongPersonalDelivery').checked;
        if (!personalDelivery) {
            const addressFields = [
                { id: 'ongCollectionCEP', errorId: 'ongCepError', minLength: 9 },
                { id: 'ongCollectionStreet', errorId: 'ongStreetError' },
                { id: 'ongCollectionNumber', errorId: 'ongNumberError' },
                { id: 'ongCollectionNeighborhood', errorId: 'ongNeighborhoodError' },
                { id: 'ongCollectionCity', errorId: 'ongCityError' },
                { id: 'ongCollectionState', errorId: 'ongStateError', minLength: 2 }
            ];

            addressFields.forEach(field => {
                const element = document.getElementById(field.id);
                const errorElement = document.getElementById(field.errorId);
                
                if (!element || !errorElement) return;
                
                let value = element.value.trim();
                
                if (field.minLength && value.length !== field.minLength) {
                    showFieldError(field.errorId, field.id);
                    isValid = false;
                } else if (!value) {
                    showFieldError(field.errorId, field.id);
                    isValid = false;
                } else {
                    showFieldSuccess(field.id);
                }
            });
        }

        // Validar termos
        const terms = document.getElementById('ongDonationTerms').checked;
        if (!terms) {
            showFieldError('ongTermsError', 'ongDonationTerms');
            isValid = false;
        }

        return isValid;
    }

    function validateVolunteerForm() {
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('#volunteerForm .error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll('#volunteerForm .form-control').forEach(el => {
            el.classList.remove('error', 'success');
        });

        // Validar campos obrigatórios
        const requiredFields = [
            { id: 'volunteerName', errorId: 'volunteerNameError' },
            { id: 'volunteerEmail', errorId: 'volunteerEmailError', type: 'email' },
            { id: 'volunteerAvailability', errorId: 'availabilityError' },
            { id: 'volunteerExperience', errorId: 'experienceError' },
            { id: 'volunteerMotivation', errorId: 'motivationError', minLength: 50 },
            { id: 'volunteerPhone', errorId: 'volunteerPhoneError' }
        ];

        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            const errorElement = document.getElementById(field.errorId);
            
            if (!element || !errorElement) return;
            
            let value = element.value.trim();
            
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    showFieldError(field.errorId, field.id);
                    isValid = false;
                } else {
                    showFieldSuccess(field.id);
                }
            } else if (field.minLength) {
                if (!value || value.length < field.minLength) {
                    showFieldError(field.errorId, field.id);
                    isValid = false;
                } else {
                    showFieldSuccess(field.id);
                }
            } else if (!value) {
                showFieldError(field.errorId, field.id);
                isValid = false;
            } else {
                showFieldSuccess(field.id);
            }
        });

        // Validar áreas de interesse
        if (selectedAreas.length === 0) {
            document.getElementById('areasError').style.display = 'flex';
            isValid = false;
        }

        // Validar telefone
        const phone = document.getElementById('volunteerPhone').value.trim();
        const phoneDigits = phone.replace(/\D/g, '');
        if (!phone || phoneDigits.length !== 11) {
            showFieldError('volunteerPhoneError', 'volunteerPhone');
            isValid = false;
        }

        // Validar termos
        const terms = document.getElementById('volunteerTerms').checked;
        if (!terms) {
            showFieldError('volunteerTermsError', 'volunteerTerms');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(errorId, fieldId) {
        const errorElement = document.getElementById(errorId);
        const fieldElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.style.display = 'flex';
        }
        
        if (fieldElement) {
            fieldElement.classList.add('error');
            fieldElement.classList.add('shake');
            setTimeout(() => {
                fieldElement.classList.remove('shake');
            }, 600);
        }
    }

    function showFieldSuccess(fieldId) {
        const fieldElement = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (fieldElement) {
            fieldElement.classList.remove('error');
            fieldElement.classList.add('success');
        }
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function showError(message) {
        alert(message); // Você pode substituir por um sistema de notificação mais sofisticado
    }

    async function submitDonation() {
        if (!validateDonationForm()) {
            return;
        }

        const submitBtn = document.getElementById('ongSubmitDonation');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

        try {
            // Preparar dados
            const formData = {
                ongId: currentOngId,
                ongName: currentOngData.name,
                productName: document.getElementById('ongProductName').value.trim(),
                category: document.getElementById('ongProductCategory').value,
                condition: document.getElementById('ongProductCondition').value,
                description: document.getElementById('ongProductDescription').value.trim(),
                personalDelivery: document.getElementById('ongPersonalDelivery').checked,
                phone: document.getElementById('ongContactPhone').value.trim(),
                images: uploadedImages.length,
                timestamp: new Date().toISOString()
            };

            if (!formData.personalDelivery) {
                formData.address = {
                    cep: document.getElementById('ongCollectionCEP').value.trim(),
                    street: document.getElementById('ongCollectionStreet').value.trim(),
                    number: document.getElementById('ongCollectionNumber').value.trim(),
                    neighborhood: document.getElementById('ongCollectionNeighborhood').value.trim(),
                    city: document.getElementById('ongCollectionCity').value.trim(),
                    state: document.getElementById('ongCollectionState').value.trim(),
                    complement: document.getElementById('ongCollectionComplement').value.trim()
                };
            }

            // Simular envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mostrar sucesso
            document.getElementById('ongDonationForm').style.display = 'none';
            document.querySelector('#ongDonationModal .donation-modal-footer').style.display = 'none';
            document.getElementById('successOngName').textContent = currentOngData.name;
            document.getElementById('ongDonationSuccess').style.display = 'block';

        } catch (error) {
            showError('Erro ao enviar doação. Tente novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Enviar Doação';
        }
    }

    async function submitVolunteer() {
        if (!validateVolunteerForm()) {
            return;
        }

        const submitBtn = document.getElementById('volunteerSubmit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

        try {
            // Preparar dados
            const formData = {
                ongId: currentOngId,
                ongName: currentOngData.name,
                name: document.getElementById('volunteerName').value.trim(),
                email: document.getElementById('volunteerEmail').value.trim(),
                areas: selectedAreas,
                availability: document.getElementById('volunteerAvailability').value,
                experience: document.getElementById('volunteerExperience').value,
                motivation: document.getElementById('volunteerMotivation').value.trim(),
                skills: document.getElementById('volunteerSkills').value.trim(),
                phone: document.getElementById('volunteerPhone').value.trim(),
                timestamp: new Date().toISOString()
            };

            // Simular envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mostrar sucesso
            document.getElementById('volunteerForm').style.display = 'none';
            document.querySelector('#volunteerModal .donation-modal-footer').style.display = 'none';
            document.getElementById('successVolunteerOngName').textContent = currentOngData.name;
            document.getElementById('volunteerSuccess').style.display = 'block';

        } catch (error) {
            showError('Erro ao enviar inscrição. Tente novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-person-badge"></i> Enviar Inscrição';
        }
    }

    function openDonationModal() {
        if (!currentOngData) {
            showError('Erro ao carregar informações da ONG.');
            return;
        }
        
        document.getElementById('ongDonationModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openVolunteerModal() {
        if (!currentOngData) {
            showError('Erro ao carregar informações da ONG.');
            return;
        }
        
        document.getElementById('volunteerModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDonationModal() {
        document.getElementById('ongDonationModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeVolunteerModal() {
        document.getElementById('volunteerModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function resetDonationForm() {
        // Resetar formulário
        document.getElementById('ongDonationForm').reset();
        document.getElementById('ongDonationForm').style.display = 'block';
        document.querySelector('#ongDonationModal .donation-modal-footer').style.display = 'flex';
        document.getElementById('ongDonationSuccess').style.display = 'none';
        
        // Resetar variáveis
        uploadedImages = [];
        document.getElementById('ongImagePreviewContainer').innerHTML = '';
        
        // Resetar campos de endereço
        const addressFields = [
            'ongCollectionCEP',
            'ongCollectionStreet',
            'ongCollectionNeighborhood',
            'ongCollectionCity',
            'ongCollectionState',
            'ongCollectionNumber',
            'ongCollectionComplement'
        ];
        
        addressFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
                field.disabled = false;
                field.classList.remove('error', 'success', 'disabled');
            }
        });
        
        // Resetar botão CEP
        const searchBtn = document.getElementById('ongSearchCEP');
        if (searchBtn) {
            searchBtn.disabled = false;
            searchBtn.classList.remove('disabled');
        }
        
        // Resetar checkbox
        document.getElementById('ongPersonalDelivery').checked = false;
        
        // Resetar contador
        document.getElementById('ongDescriptionCounter').textContent = '0/500 caracteres';
    }

    function resetVolunteerForm() {
        // Resetar formulário
        document.getElementById('volunteerForm').reset();
        document.getElementById('volunteerForm').style.display = 'block';
        document.querySelector('#volunteerModal .donation-modal-footer').style.display = 'flex';
        document.getElementById('volunteerSuccess').style.display = 'none';
        
        // Resetar variáveis
        selectedAreas = [];
        document.querySelectorAll('.area-checkbox input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Resetar contadores
        document.getElementById('motivationCounter').textContent = '0/300 caracteres';
        document.getElementById('skillsCounter').textContent = '0/200 caracteres';
        
        // Resetar estilos de erro
        document.querySelectorAll('#volunteerForm .error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll('#volunteerForm .form-control').forEach(el => {
            el.classList.remove('error', 'success');
        });
    }

    // Inicializar modais quando a página carregar
    // Aguardar um pouco para garantir que ong-detail.js já carregou os dados
    setTimeout(initModals, 500);
});