// donation-modal.js
class DonationModal {
    constructor() {
        this.modal = document.getElementById('donationModal');
        this.form = document.getElementById('donationForm');
        this.successState = document.getElementById('donationSuccess');
        this.selectedONG = null;
        this.uploadedImages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupImageUpload();
        this.setupONGSelectors();
        this.setupAddressCEP();
    }

    setupEventListeners() {
        // Botões de abrir/fechar
        document.querySelectorAll('.action-card.doar').forEach(card => {
            card.addEventListener('click', () => this.open());
        });

        document.getElementById('closeDonationModal').addEventListener('click', () => this.close());
        document.getElementById('cancelDonation').addEventListener('click', () => this.close());
        document.getElementById('closeSuccessModal').addEventListener('click', () => this.close());
        document.getElementById('newDonation').addEventListener('click', () => this.resetForm());

        // Envio do formulário
        document.getElementById('submitDonation').addEventListener('click', () => this.validateAndSubmit());

        // Contador de caracteres
        const description = document.getElementById('productDescription');
        const counter = document.getElementById('descriptionCounter');
        
        description.addEventListener('input', () => {
            const length = description.value.length;
            counter.textContent = `${length}/500 caracteres`;
            
            if (length > 450) {
                counter.classList.add('near-limit');
            } else {
                counter.classList.remove('near-limit');
            }
            
            if (length > 500) {
                counter.classList.add('over-limit');
                description.value = description.value.substring(0, 500);
                counter.textContent = '500/500 caracteres (limite atingido)';
            } else {
                counter.classList.remove('over-limit');
            }
        });

        // Limitar e formatar telefone para 11 dígitos (formato brasileiro)
        const phoneField = document.getElementById('contactPhone');
        phoneField.addEventListener('input', (e) => {
            // Remove tudo que não é número
            let digits = e.target.value.replace(/\D/g, '');
            
            // Limita a 11 dígitos
            if (digits.length > 11) {
                digits = digits.substring(0, 11);
            }
            
            // Formata o telefone
            let formatted = '';
            if (digits.length > 0) {
                // Adiciona DDD entre parênteses
                formatted = '(' + digits.substring(0, Math.min(2, digits.length));
                
                if (digits.length > 2) {
                    // Adiciona o espaço após DDD
                    formatted += ') ';
                    
                    if (digits.length <= 7) {
                        // Formato antigo: (11) 9999-9999
                        formatted += digits.substring(2, 6);
                        if (digits.length > 6) {
                            formatted += '-' + digits.substring(6, Math.min(10, digits.length));
                        }
                    } else {
                        // Formato novo: (11) 99999-9999
                        formatted += digits.substring(2, 7);
                        if (digits.length > 7) {
                            formatted += '-' + digits.substring(7, Math.min(11, digits.length));
                        }
                    }
                } else {
                    formatted += ')';
                }
            }
            
            e.target.value = formatted;
        });

        // Permitir apagar com Backspace/Delete
        phoneField.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                // Permitir apagar normalmente
                return;
            }
            
            // Impedir entrada de mais caracteres quando já tem 11 dígitos
            const digits = e.target.value.replace(/\D/g, '');
            if (digits.length >= 11 && !['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                e.preventDefault();
            }
        });

        // Fechar modal ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        // Fechar modal ao clicar fora
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    setupAddressCEP() {
        const cepField = document.getElementById('collectionCEP');
        const searchCEPButton = document.getElementById('searchCEP');
        const personalDeliveryCheckbox = document.getElementById('personalDelivery');
        const addressFields = [
            'collectionStreet',
            'collectionNeighborhood',
            'collectionCity',
            'collectionState',
            'collectionNumber',
            'collectionComplement'
        ];

        // Formatar CEP automaticamente
        cepField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });

        // Buscar CEP via API
        searchCEPButton.addEventListener('click', async () => {
            const cep = cepField.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                this.showErrorField('cepError', 'collectionCEP');
                this.showError('CEP inválido. Digite 8 números.');
                return;
            }

            this.showLoadingCEP(true);
            
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                if (!response.ok) throw new Error('Erro na requisição');
                
                const data = await response.json();
                
                if (data.erro) {
                    this.showError('CEP não encontrado. Verifique o número digitado.');
                    this.showErrorField('cepError', 'collectionCEP');
                    return;
                }

                // Preencher os campos automaticamente
                document.getElementById('collectionStreet').value = data.logradouro || '';
                document.getElementById('collectionNeighborhood').value = data.bairro || '';
                document.getElementById('collectionCity').value = data.localidade || '';
                document.getElementById('collectionState').value = data.uf || '';
                
                // Focar no campo número
                document.getElementById('collectionNumber').focus();
                
                // Mostrar sucesso
                this.showSuccessField('collectionCEP');
                document.getElementById('cepError').style.display = 'none';
                
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                this.showError('Erro ao buscar CEP. Tente novamente ou preencha manualmente.');
                this.showErrorField('cepError', 'collectionCEP');
            } finally {
                this.showLoadingCEP(false);
            }
        });

        // Permitir Enter no campo CEP para buscar
        cepField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCEPButton.click();
            }
        });

        // Toggle entrega pessoal
        personalDeliveryCheckbox.addEventListener('change', (e) => {
            const isPersonalDelivery = e.target.checked;
            
            if (isPersonalDelivery) {
                // Desabilitar campos de endereço
                addressFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.disabled = true;
                        field.classList.add('disabled');
                        field.placeholder = 'Não necessário para entrega pessoal';
                    }
                });
                cepField.disabled = true;
                cepField.classList.add('disabled');
                searchCEPButton.disabled = true;
                searchCEPButton.classList.add('disabled');
            } else {
                // Reabilitar campos de endereço
                addressFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.disabled = false;
                        field.classList.remove('disabled');
                        field.placeholder = fieldId === 'collectionStreet' ? 'Rua/Avenida' : 
                                           fieldId === 'collectionNeighborhood' ? 'Bairro' :
                                           fieldId === 'collectionNumber' ? 'Número' :
                                           fieldId === 'collectionCity' ? 'Cidade' :
                                           fieldId === 'collectionState' ? 'Estado' :
                                           'Complemento (opcional)';
                    }
                });
                cepField.disabled = false;
                cepField.classList.remove('disabled');
                searchCEPButton.disabled = false;
                searchCEPButton.classList.remove('disabled');
            }
        });

        // Atualizar endereço completo quando campos mudarem
        addressFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', () => this.updateFullAddress());
            }
        });
    }

    updateFullAddress() {
        const street = document.getElementById('collectionStreet').value.trim();
        const number = document.getElementById('collectionNumber').value.trim();
        const neighborhood = document.getElementById('collectionNeighborhood').value.trim();
        const city = document.getElementById('collectionCity').value.trim();
        const state = document.getElementById('collectionState').value.trim();
        const complement = document.getElementById('collectionComplement').value.trim();

        let fullAddress = '';
        
        if (street) fullAddress += street;
        if (number) fullAddress += ', ' + number;
        if (complement) fullAddress += ' - ' + complement;
        if (neighborhood) fullAddress += ', ' + neighborhood;
        if (city) fullAddress += ' - ' + city;
        if (state) fullAddress += '/' + state;

        document.getElementById('collectionAddressFull').value = fullAddress;
    }

    showLoadingCEP(show) {
        const searchBtn = document.getElementById('searchCEP');
        if (show) {
            searchBtn.disabled = true;
            searchBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Buscando...';
            searchBtn.classList.add('loading');
        } else {
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="bi bi-search"></i> Buscar CEP';
            searchBtn.classList.remove('loading');
        }
    }

    setupImageUpload() {
        const uploadArea = document.getElementById('imageUploadArea');
        const fileInput = document.getElementById('productImages');
        const uploadBtn = document.getElementById('uploadImageBtn');
        const previewContainer = document.getElementById('imagePreviewContainer');

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
            this.handleImageUpload(files);
        });

        fileInput.addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });
    }

    handleImageUpload(files) {
        const maxFiles = 5;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        Array.from(files).slice(0, maxFiles - this.uploadedImages.length).forEach(file => {
            // Validar tipo
            if (!allowedTypes.includes(file.type)) {
                this.showError('Apenas imagens JPG, PNG, GIF ou WebP são permitidas');
                return;
            }

            // Validar tamanho
            if (file.size > maxSize) {
                this.showError('A imagem deve ter no máximo 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: e.target.result
                };

                this.uploadedImages.push(imageData);
                this.updateImagePreview();
            };
            reader.readAsDataURL(file);
        });
    }

    updateImagePreview() {
        const previewContainer = document.getElementById('imagePreviewContainer');
        previewContainer.innerHTML = '';

        this.uploadedImages.forEach((image, index) => {
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
                this.uploadedImages.splice(index, 1);
                this.updateImagePreview();
            });

            previewContainer.appendChild(preview);
        });
    }

    setupONGSelectors() {
        document.querySelectorAll('.ong-selector').forEach(selector => {
            selector.addEventListener('click', () => {
                // Remover seleção anterior
                document.querySelectorAll('.ong-selector').forEach(s => {
                    s.classList.remove('selected');
                });

                // Adicionar seleção atual
                selector.classList.add('selected');
                this.selectedONG = selector.getAttribute('data-ong');
            });
        });
    }

    validateForm() {
        let isValid = true;

        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('error', 'success');
        });

        // Validar nome do produto
        const productName = document.getElementById('productName').value.trim();
        if (!productName) {
            this.showErrorField('productNameError', 'productName');
            isValid = false;
        } else {
            this.showSuccessField('productName');
        }

        // Validar categoria
        const category = document.getElementById('productCategory').value;
        if (!category) {
            this.showErrorField('categoryError', 'productCategory');
            isValid = false;
        } else {
            this.showSuccessField('productCategory');
        }

        // Validar condição
        const condition = document.getElementById('productCondition').value;
        if (!condition) {
            this.showErrorField('conditionError', 'productCondition');
            isValid = false;
        } else {
            this.showSuccessField('productCondition');
        }

        // Validar ONG
        if (!this.selectedONG) {
            this.showErrorField('ongError', 'ongSelector');
            isValid = false;
        }

        // Validar descrição
        const description = document.getElementById('productDescription').value.trim();
        if (!description || description.length < 20) {
            this.showErrorField('descriptionError', 'productDescription');
            isValid = false;
        } else {
            this.showSuccessField('productDescription');
        }

        // Validar endereço (com ou sem entrega pessoal)
        const personalDelivery = document.getElementById('personalDelivery').checked;
        
        if (!personalDelivery) {
            // Validação para coleta em domicílio
            const cep = document.getElementById('collectionCEP').value.trim().replace(/\D/g, '');
            const street = document.getElementById('collectionStreet').value.trim();
            const number = document.getElementById('collectionNumber').value.trim();
            const neighborhood = document.getElementById('collectionNeighborhood').value.trim();
            const city = document.getElementById('collectionCity').value.trim();
            const state = document.getElementById('collectionState').value.trim().toUpperCase();

            // Validar CEP
            if (!cep || cep.length !== 8) {
                this.showErrorField('cepError', 'collectionCEP');
                isValid = false;
            } else {
                this.showSuccessField('collectionCEP');
            }

            // Validar rua
            if (!street) {
                this.showErrorField('streetError', 'collectionStreet');
                isValid = false;
            } else {
                this.showSuccessField('collectionStreet');
            }

            // Validar número
            if (!number) {
                this.showErrorField('numberError', 'collectionNumber');
                isValid = false;
            } else {
                this.showSuccessField('collectionNumber');
            }

            // Validar bairro
            if (!neighborhood) {
                this.showErrorField('neighborhoodError', 'collectionNeighborhood');
                isValid = false;
            } else {
                this.showSuccessField('collectionNeighborhood');
            }

            // Validar cidade
            if (!city) {
                this.showErrorField('cityError', 'collectionCity');
                isValid = false;
            } else {
                this.showSuccessField('collectionCity');
            }

            // Validar estado
            if (!state || state.length !== 2) {
                this.showErrorField('stateError', 'collectionState');
                isValid = false;
            } else {
                this.showSuccessField('collectionState');
            }
        } else {
            // Para entrega pessoal, apenas garantir que a opção está marcada
            // Endereço não é necessário
            this.updateFullAddress(); // Atualiza endereço vazio
        }

        // Validar telefone - FORMATO BRASILEIRO (11 dígitos)
        const phone = document.getElementById('contactPhone').value.trim();
        // Remove formatação para contar apenas dígitos
        const phoneDigits = phone.replace(/\D/g, '');
        
        // Verifica se tem 11 dígitos
        if (!phone || phoneDigits.length !== 11) {
            this.showErrorField('phoneError', 'contactPhone');
            isValid = false;
        } else {
            // Valida o formato: (XX) XXXXX-XXXX
            const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
            if (!phoneRegex.test(phone)) {
                this.showErrorField('phoneError', 'contactPhone');
                isValid = false;
            } else {
                this.showSuccessField('contactPhone');
            }
        }

        // Validar termos
        const terms = document.getElementById('donationTerms').checked;
        if (!terms) {
            this.showErrorField('termsError', 'donationTerms');
            isValid = false;
        }

        return isValid;
    }

    showErrorField(errorId, fieldId) {
        const errorElement = document.getElementById(errorId);
        const fieldElement = fieldId === 'ongSelector' 
            ? document.querySelector('.ong-selector')
            : document.getElementById(fieldId);
        
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

    showSuccessField(fieldId) {
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

    showError(message) {
        // Implementar sistema de notificação existente
        if (window.clienteInicio && window.clienteInicio.showNotification) {
            window.clienteInicio.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }

    async validateAndSubmit() {
        if (!this.validateForm()) {
            return;
        }

        // Simular envio (substituir por chamada real à API)
        this.showLoading(true);
        
        try {
            // Preparar dados para envio
            const formData = {
                productName: document.getElementById('productName').value.trim(),
                productCategory: document.getElementById('productCategory').value,
                productCondition: document.getElementById('productCondition').value,
                selectedONG: this.selectedONG,
                productDescription: document.getElementById('productDescription').value.trim(),
                personalDelivery: document.getElementById('personalDelivery').checked,
                contactPhone: document.getElementById('contactPhone').value.trim(),
                donationTerms: document.getElementById('donationTerms').checked,
                uploadedImages: this.uploadedImages.length,
                submittedAt: new Date().toISOString()
            };

            // Adicionar endereço se não for entrega pessoal
            if (!formData.personalDelivery) {
                formData.address = {
                    cep: document.getElementById('collectionCEP').value.trim(),
                    street: document.getElementById('collectionStreet').value.trim(),
                    number: document.getElementById('collectionNumber').value.trim(),
                    neighborhood: document.getElementById('collectionNeighborhood').value.trim(),
                    city: document.getElementById('collectionCity').value.trim(),
                    state: document.getElementById('collectionState').value.trim(),
                    complement: document.getElementById('collectionComplement').value.trim(),
                    fullAddress: document.getElementById('collectionAddressFull').value
                };
            }

            // Aqui você faria a chamada AJAX real para o backend
            console.log('Dados da doação:', formData);
            
            // Simula delay de envio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showSuccess();
            
        } catch (error) {
            console.error('Erro ao enviar doação:', error);
            this.showError('Erro ao enviar doação. Tente novamente.');
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const submitBtn = document.getElementById('submitDonation');
        if (show) {
            this.modal.classList.add('donation-loading');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
        } else {
            this.modal.classList.remove('donation-loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-heart-fill"></i> Enviar Doação';
        }
    }

    showSuccess() {
        this.form.style.display = 'none';
        document.querySelector('.donation-modal-footer').style.display = 'none';
        this.successState.style.display = 'block';
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    resetForm() {
        // Resetar formulário
        this.form.reset();
        this.form.style.display = 'block';
        this.successState.style.display = 'none';
        document.querySelector('.donation-modal-footer').style.display = 'flex';
        
        // Resetar estado
        this.selectedONG = null;
        this.uploadedImages = [];
        
        // Resetar UI
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Resetar campos de endereço
        const addressFields = [
            'collectionCEP',
            'collectionStreet',
            'collectionNeighborhood',
            'collectionCity',
            'collectionState',
            'collectionNumber',
            'collectionComplement'
        ];
        
        addressFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
                field.classList.remove('error', 'success', 'disabled');
                field.disabled = false;
            }
        });
        
        // Resetar botão de busca CEP
        const searchBtn = document.getElementById('searchCEP');
        if (searchBtn) {
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="bi bi-search"></i> Buscar CEP';
            searchBtn.classList.remove('disabled', 'loading');
        }
        
        // Resetar checkbox de entrega pessoal
        const personalDelivery = document.getElementById('personalDelivery');
        if (personalDelivery) {
            personalDelivery.checked = false;
        }
        
        // Resetar outros campos
        document.querySelectorAll('.form-control').forEach(el => {
            el.classList.remove('error', 'success', 'disabled');
            el.disabled = false;
        });
        
        document.querySelectorAll('.ong-selector').forEach(el => {
            el.classList.remove('selected');
        });
        
        document.getElementById('imagePreviewContainer').innerHTML = '';
        document.getElementById('descriptionCounter').textContent = '0/500 caracteres';
        document.getElementById('collectionAddressFull').value = '';
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.donationModal = new DonationModal();
});