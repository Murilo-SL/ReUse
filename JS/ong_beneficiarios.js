        // ============ SISTEMA DE ARMAZENAMENTO ============
        
        // Função para obter beneficiários do localStorage
        function obterBeneficiarios() {
            const beneficiariosSalvos = localStorage.getItem('beneficiariosSOSFelino');
            return beneficiariosSalvos ? JSON.parse(beneficiariosSalvos) : {};
        }
        
        // Função para salvar beneficiários no localStorage
        function salvarBeneficiarios(beneficiarios) {
            localStorage.setItem('beneficiariosSOSFelino', JSON.stringify(beneficiarios));
            // Disparar evento personalizado para sincronização
            window.dispatchEvent(new Event('beneficiariosAtualizados'));
        }
        
        // Função para inicializar beneficiários padrão se não existirem
        function inicializarBeneficiariosPadrao() {
            let beneficiarios = obterBeneficiarios();
            
            if (Object.keys(beneficiarios).length === 0) {
                console.log('Inicializando beneficiários padrão...');
                // Beneficiários padrão da SOS Felino
                beneficiarios = {
                    "1": {
                        id: "1",
                        name: "Maria Silva",
                        type: "individual",
                        email: "maria.silva@email.com",
                        phone: "(11) 99999-9999",
                        address: "Rua das Flores, 123",
                        city: "São Paulo",
                        state: "SP",
                        animals: 5,
                        status: "active",
                        lastDonation: "15/03/2025",
                        dataCadastro: new Date().toISOString()
                    },
                    "2": {
                        id: "2",
                        name: "Família Oliveira",
                        type: "family",
                        email: "familia.oliveira@email.com",
                        phone: "(11) 98888-8888",
                        address: "Av. Paulista, 456",
                        city: "São Paulo",
                        state: "SP",
                        animals: 12,
                        status: "active",
                        lastDonation: "10/03/2025",
                        dataCadastro: new Date().toISOString()
                    },
                    "3": {
                        id: "3",
                        name: "Lar Temporário Felino",
                        type: "institution",
                        email: "contato@lartemporario.com",
                        phone: "(11) 97777-7777",
                        address: "Rua dos Gatos, 789",
                        city: "São Paulo",
                        state: "SP",
                        animals: 25,
                        status: "active",
                        lastDonation: "05/03/2025",
                        dataCadastro: new Date().toISOString()
                    },
                    "4": {
                        id: "4",
                        name: "João Santos",
                        type: "individual",
                        email: "joao.santos@email.com",
                        phone: "(11) 96666-6666",
                        address: "Rua dos Cães, 321",
                        city: "São Paulo",
                        state: "SP",
                        animals: 3,
                        status: "inactive",
                        lastDonation: "20/02/2025",
                        dataCadastro: new Date().toISOString()
                    }
                };
                
                salvarBeneficiarios(beneficiarios);
            }
            
            return beneficiarios;
        }
        
        // Inicializar lixeira se não existir
        function inicializarLixeira() {
            if (!localStorage.getItem('lixeiraSOSFelino')) {
                localStorage.setItem('lixeiraSOSFelino', JSON.stringify([]));
            }
        }
        
        // ============ SISTEMA DE SINCRONIZAÇÃO ============
        
        function inicializarSincronizacao() {
            // Ouvir mudanças no localStorage de outras abas/páginas
            window.addEventListener('storage', function(e) {
                if (e.key === 'beneficiariosSOSFelino' || e.key === 'lixeiraSOSFelino') {
                    console.log('Mudança detectada no localStorage, atualizando interface...');
                    carregarBeneficiarios();
                    atualizarEstatisticas();
                    mostrarNotificacao('Dados atualizados automaticamente', 'info');
                }
            });
            
            // Ouvir eventos personalizados
            window.addEventListener('beneficiariosAtualizados', function() {
                console.log('Evento beneficiariosAtualizados disparado, recarregando...');
                carregarBeneficiarios();
                atualizarEstatisticas();
            });
            
            // Recarregar quando a página ganhar foco
            window.addEventListener('focus', function() {
                console.log('Página em foco, verificando atualizações...');
                carregarBeneficiarios();
                atualizarEstatisticas();
            });
            
            // Recarregar a cada 30 segundos para garantir sincronização
            setInterval(function() {
                carregarBeneficiarios();
                atualizarEstatisticas();
            }, 30000);
        }
        
        // ============ SISTEMA DE BENEFICIÁRIOS ============
        
        // Variáveis globais
        let currentPage = 1;
        const itemsPerPage = 6;
        let filteredBeneficiaries = [];
        let beneficiaryToDelete = null;
        
        // Função para carregar beneficiários
        function carregarBeneficiarios() {
            const container = document.getElementById('beneficiaries-container');
            if (!container) return; // Elemento não existe nesta página
            
            // Mostrar loading
            container.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner"></i>
                    <span>Carregando beneficiários...</span>
                </div>
            `;
            
            // Simular carregamento assíncrono
            setTimeout(() => {
                try {
                    const beneficiarios = obterBeneficiarios();
                    const beneficiariosArray = Object.values(beneficiarios);
                    
                    // Aplicar filtros
                    filteredBeneficiaries = filtrarBeneficiarios(beneficiariosArray);
                    
                    // Atualizar paginação
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const currentBeneficiaries = filteredBeneficiaries.slice(startIndex, endIndex);
                    
                    // Gerar HTML dos beneficiários
                    if (currentBeneficiaries.length === 0) {
                        container.innerHTML = `
                            <div class="no-beneficiaries">
                                <div class="empty-state">
                                    <i class="fas fa-users"></i>
                                    <h3>Nenhum beneficiário encontrado</h3>
                                    <p>Comece adicionando seu primeiro beneficiário!</p>
                                    <button class="primary-button" onclick="openAddBeneficiaryModal()">Adicionar Beneficiário</button>
                                </div>
                            </div>
                        `;
                    } else {
                        container.innerHTML = currentBeneficiaries.map(beneficiary => 
                            createBeneficiaryCard(beneficiary)
                        ).join('');
                    }
                    
                    updatePagination();
                    
                } catch (error) {
                    console.error('Erro ao carregar beneficiários:', error);
                    container.innerHTML = `
                        <div class="no-beneficiaries">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle"></i>
                                <h3>Erro ao carregar beneficiários</h3>
                                <p>Recarregue a página e tente novamente.</p>
                                <button onclick="location.reload()" class="primary-button">Recarregar Página</button>
                            </div>
                        </div>
                    `;
                }
            }, 500);
        }
        
        // Função para criar card de beneficiário
        function createBeneficiaryCard(beneficiary) {
            const typeLabels = {
                'individual': 'Indivíduo',
                'family': 'Família',
                'institution': 'Instituição'
            };
            
            const statusLabels = {
                'active': 'Ativo',
                'inactive': 'Inativo'
            };
            
            return `
                <div class="beneficiary-card" data-type="${beneficiary.type}">
                    <div class="beneficiary-header">
                        <h3>${beneficiary.name}</h3>
                        <span class="status-badge ${beneficiary.status}">${statusLabels[beneficiary.status]}</span>
                    </div>
                    <div class="beneficiary-details">
                        <p><i class="fas fa-user-tag"></i> <strong>Tipo:</strong> ${typeLabels[beneficiary.type]}</p>
                        <p><i class="fas fa-envelope"></i> <strong>E-mail:</strong> ${beneficiary.email}</p>
                        <p><i class="fas fa-phone"></i> <strong>Telefone:</strong> ${beneficiary.phone}</p>
                        <p><i class="fas fa-map-marker-alt"></i> <strong>Endereço:</strong> ${beneficiary.address}, ${beneficiary.city} - ${beneficiary.state}</p>
                        <p><i class="fas fa-paw"></i> <strong>Animais resgatados:</strong> ${beneficiary.animals}</p>
                    </div>
                    <div class="beneficiary-footer">
                        <span class="last-donation">Última doação: ${beneficiary.lastDonation}</span>
                        <div class="beneficiary-actions">
                            <button class="action-btn view" title="Visualizar" onclick="viewBeneficiaryDetail(${beneficiary.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" title="Editar" onclick="openEditBeneficiaryModal(${beneficiary.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" title="Excluir" onclick="confirmDelete(${beneficiary.id}, '${beneficiary.name}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // ============ SISTEMA DE FILTROS ============
        
        // Função para filtrar beneficiários
        function filtrarBeneficiarios(beneficiariosArray) {
            const statusFilter = document.getElementById('status-filter').value;
            const categoryFilter = document.getElementById('category-filter').value;
            const searchTerm = document.getElementById('beneficiary-search').value.toLowerCase();
            const stateFilter = document.getElementById('state-filter').value;
            const animalsFilter = document.getElementById('animals-filter').value;
            const dateFilter = document.getElementById('date-filter').value;
            
            return beneficiariosArray.filter(beneficiary => {
                // Filtro por status
                if (statusFilter !== 'all' && beneficiary.status !== statusFilter) {
                    return false;
                }
                
                // Filtro por categoria
                if (categoryFilter !== 'all' && beneficiary.type !== categoryFilter) {
                    return false;
                }
                
                // Filtro por busca
                if (searchTerm && !beneficiary.name.toLowerCase().includes(searchTerm) &&
                    !beneficiary.email.toLowerCase().includes(searchTerm) &&
                    !beneficiary.city.toLowerCase().includes(searchTerm)) {
                    return false;
                }
                
                // Filtro por estado
                if (stateFilter !== 'all' && beneficiary.state !== stateFilter) {
                    return false;
                }
                
                // Filtro por número de animais
                if (animalsFilter && beneficiary.animals < parseInt(animalsFilter)) {
                    return false;
                }
                
                // Filtro por data
                if (dateFilter) {
                    const filterDate = new Date(dateFilter);
                    const cadastroDate = new Date(beneficiary.dataCadastro);
                    
                    if (cadastroDate.toDateString() !== filterDate.toDateString()) {
                        return false;
                    }
                }
                
                return true;
            });
        }
        
        // Função para aplicar filtros
        function aplicarFiltros() {
            try {
                const beneficiarios = obterBeneficiarios();
                const beneficiariosArray = Object.values(beneficiarios);
                filteredBeneficiaries = filtrarBeneficiarios(beneficiariosArray);
                
                currentPage = 1;
                carregarBeneficiarios();
                mostrarNotificacao('Filtros aplicados com sucesso!', 'success');
                
            } catch (error) {
                console.error('Erro ao aplicar filtros:', error);
                mostrarNotificacao('Erro ao filtrar beneficiários', 'error');
            }
        }
        
        // Função para limpar filtros avançados
        function clearAdvancedFilters() {
            document.getElementById('state-filter').value = 'all';
            document.getElementById('animals-filter').value = '';
            document.getElementById('date-filter').value = '';
            aplicarFiltros();
            mostrarNotificacao('Filtros limpos com sucesso!', 'success');
        }
        
        // ============ SISTEMA DE PAGINAÇÃO ============
        
        // Atualizar controles de paginação
        function updatePagination() {
            const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage);
            const prevBtn = document.getElementById('prev-page');
            const nextBtn = document.getElementById('next-page');
            const pageInfo = document.getElementById('pagination-info');
            
            pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
            
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        // Navegar para a página anterior
        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                carregarBeneficiarios();
            }
        }
        
        // Navegar para a próxima página
        function goToNextPage() {
            const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                carregarBeneficiarios();
            }
        }
        
        // ============ SISTEMA DE MODAIS ============
        
        // Abrir modal para adicionar beneficiário
        function openAddBeneficiaryModal() {
            document.getElementById('modal-title').textContent = 'Adicionar Beneficiário';
            document.getElementById('beneficiary-form').reset();
            document.getElementById('beneficiary-id').value = '';
            document.getElementById('beneficiary-status').value = 'active';
            
            // Resetar contadores
            updateCharCounter('beneficiary-name', 'name-counter');
            updateCharCounter('beneficiary-email', 'email-counter');
            updateCharCounter('beneficiary-phone', 'phone-counter');
            updateCharCounter('beneficiary-address', 'address-counter');
            updateCharCounter('beneficiary-city', 'city-counter');
            
            const modal = document.getElementById('beneficiary-modal');
            modal.style.display = 'block';
        }
        
        // Fechar modal
        function closeModal() {
            const modal = document.getElementById('beneficiary-modal');
            modal.style.display = 'none';
        }
        
        // Fechar modal de confirmação
        function closeConfirmationModal() {
            const modal = document.getElementById('confirmation-modal');
            modal.style.display = 'none';
            beneficiaryToDelete = null;
        }
        
        // Fechar modal de detalhes
        function closeDetailModal() {
            document.getElementById('beneficiary-detail-modal').style.display = 'none';
        }
        
        // Fechar modal de edição
        function closeEditModal() {
            document.getElementById('beneficiary-edit-modal').style.display = 'none';
        }
        
        // ============ SISTEMA DE VALIDAÇÃO ============
        
        // Função para validar formulário
        function validarFormulario(formId) {
            const form = document.getElementById(formId);
            const inputs = form.querySelectorAll('input[required], select[required]');
            let isValid = true;
            
            // Resetar erros
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validar cada campo
            inputs.forEach(input => {
                const value = input.value.trim();
                const fieldName = input.id.replace('beneficiary-', '').replace('edit-beneficiary-', '');
                
                if (!value) {
                    markFieldAsError(input, `${getFieldLabel(fieldName)} é obrigatório`);
                    isValid = false;
                    return;
                }
                
                // Validações específicas por campo
                switch(fieldName) {
                    case 'email':
                        if (!isValidEmail(value)) {
                            markFieldAsError(input, 'E-mail inválido');
                            isValid = false;
                        }
                        break;
                    case 'phone':
                        if (!isValidPhone(value)) {
                            markFieldAsError(input, 'Telefone inválido');
                            isValid = false;
                        }
                        break;
                    case 'animals':
                        if (value < 1 || value > 999) {
                            markFieldAsError(input, 'Número de animais deve ser entre 1 e 999');
                            isValid = false;
                        }
                        break;
                }
            });
            
            return isValid;
        }
        
        // Marcar campo como erro
        function markFieldAsError(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
        
        // Obter label do campo
        function getFieldLabel(fieldName) {
            const labels = {
                'name': 'Nome',
                'type': 'Tipo',
                'email': 'E-mail',
                'phone': 'Telefone',
                'address': 'Endereço',
                'city': 'Cidade',
                'state': 'Estado',
                'animals': 'Número de animais',
                'status': 'Status'
            };
            return labels[fieldName] || fieldName;
        }
        
        // Validar e-mail
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Validar telefone
        function isValidPhone(phone) {
            const phoneRegex = /^[0-9\s\(\)\-]+$/;
            return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
        }
        
        // Atualizar contador de caracteres
        function updateCharCounter(inputId, counterId) {
            const input = document.getElementById(inputId);
            const counter = document.getElementById(counterId);
            
            if (input && counter) {
                const maxLength = input.getAttribute('maxlength');
                const currentLength = input.value.length;
                
                counter.textContent = `${currentLength}/${maxLength}`;
                
                // Aplicar classes de warning/error baseado no uso
                counter.classList.remove('warning', 'error');
                if (currentLength >= maxLength * 0.8) {
                    counter.classList.add('warning');
                }
                if (currentLength >= maxLength) {
                    counter.classList.add('error');
                }
            }
        }
        
        // ============ SISTEMA DE CRUD ============
        
        // Salvar beneficiário (adicionar ou editar)
        function saveBeneficiary(e) {
            e.preventDefault();
            
            if (!validarFormulario('beneficiary-form')) {
                mostrarNotificacao('Por favor, corrija os erros no formulário', 'error');
                return;
            }
            
            const id = document.getElementById('beneficiary-id').value;
            const name = document.getElementById('beneficiary-name').value;
            const type = document.getElementById('beneficiary-type').value;
            const email = document.getElementById('beneficiary-email').value;
            const phone = document.getElementById('beneficiary-phone').value;
            const address = document.getElementById('beneficiary-address').value;
            const city = document.getElementById('beneficiary-city').value;
            const state = document.getElementById('beneficiary-state').value;
            const animals = parseInt(document.getElementById('beneficiary-animals').value);
            const status = document.getElementById('beneficiary-status').value;
            
            const today = new Date();
            const lastDonation = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
            
            try {
                const beneficiarios = obterBeneficiarios();
                
                if (id) {
                    // Editar beneficiário existente
                    const index = beneficiarios.findIndex(b => b.id === parseInt(id));
                    if (index !== -1) {
                        beneficiarios[index] = {
                            ...beneficiarios[index],
                            name,
                            type,
                            email,
                            phone,
                            address,
                            city,
                            state,
                            animals,
                            status,
                            lastDonation
                        };
                    }
                } else {
                    // Adicionar novo beneficiário
                    const newId = Object.keys(beneficiarios).length > 0 ? 
                        Math.max(...Object.keys(beneficiarios).map(Number)) + 1 : 1;
                    
                    beneficiarios[newId] = {
                        id: newId.toString(),
                        name,
                        type,
                        email,
                        phone,
                        address,
                        city,
                        state,
                        animals,
                        status,
                        lastDonation,
                        dataCadastro: new Date().toISOString()
                    };
                }
                
                // Salvar alterações
                salvarBeneficiarios(beneficiarios);
                
                // Fechar o modal e recarregar a lista
                closeModal();
                carregarBeneficiarios();
                
                // Mostrar mensagem de sucesso
                mostrarNotificacao(`Beneficiário ${id ? 'atualizado' : 'adicionado'} com sucesso!`, 'success');
                
            } catch (error) {
                console.error('Erro ao salvar beneficiário:', error);
                mostrarNotificacao('Erro ao salvar beneficiário', 'error');
            }
        }
        
        // Visualizar beneficiário
        function viewBeneficiaryDetail(id) {
            const beneficiarios = obterBeneficiarios();
            const beneficiary = beneficiarios[id];
            
            if (beneficiary) {
                const typeLabels = {
                    'individual': 'Indivíduo',
                    'family': 'Família',
                    'institution': 'Instituição'
                };
                
                const statusLabels = {
                    'active': 'Ativo',
                    'inactive': 'Inativo'
                };
                
                document.getElementById('detail-modal-title').textContent = `Detalhes: ${beneficiary.name}`;
                
                document.getElementById('beneficiary-detail-content').innerHTML = `
                    <div class="detail-section">
                        <h3>Informações Pessoais</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">Nome</div>
                                <div class="detail-value">${beneficiary.name}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Tipo</div>
                                <div class="detail-value">${typeLabels[beneficiary.type]}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Status</div>
                                <div class="detail-value">${statusLabels[beneficiary.status]}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Animais Resgatados</div>
                                <div class="detail-value">${beneficiary.animals}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Informações de Contato</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">E-mail</div>
                                <div class="detail-value">${beneficiary.email}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Telefone</div>
                                <div class="detail-value">${beneficiary.phone}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Endereço</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">Endereço</div>
                                <div class="detail-value">${beneficiary.address}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Cidade</div>
                                <div class="detail-value">${beneficiary.city}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Estado</div>
                                <div class="detail-value">${beneficiary.state}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Histórico</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <div class="detail-label">Última Doação</div>
                                <div class="detail-value">${beneficiary.lastDonation}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Data de Cadastro</div>
                                <div class="detail-value">${formatarData(beneficiary.dataCadastro)}</div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.getElementById('beneficiary-detail-modal').style.display = 'block';
            }
        }
        
        // Abrir modal de edição
        function openEditBeneficiaryModal(id) {
            const beneficiarios = obterBeneficiarios();
            const beneficiary = beneficiarios[id];
            
            if (beneficiary) {
                // Preencher formulário
                document.getElementById('edit-beneficiary-id').value = beneficiary.id;
                document.getElementById('edit-beneficiary-name').value = beneficiary.name;
                document.getElementById('edit-beneficiary-type').value = beneficiary.type;
                document.getElementById('edit-beneficiary-email').value = beneficiary.email;
                document.getElementById('edit-beneficiary-phone').value = beneficiary.phone;
                document.getElementById('edit-beneficiary-address').value = beneficiary.address;
                document.getElementById('edit-beneficiary-city').value = beneficiary.city;
                document.getElementById('edit-beneficiary-state').value = beneficiary.state;
                document.getElementById('edit-beneficiary-animals').value = beneficiary.animals;
                document.getElementById('edit-beneficiary-status').value = beneficiary.status;
                
                // Atualizar contadores
                updateCharCounter('edit-beneficiary-name', 'edit-name-counter');
                updateCharCounter('edit-beneficiary-email', 'edit-email-counter');
                updateCharCounter('edit-beneficiary-phone', 'edit-phone-counter');
                updateCharCounter('edit-beneficiary-address', 'edit-address-counter');
                updateCharCounter('edit-beneficiary-city', 'edit-city-counter');
                
                document.getElementById('beneficiary-edit-modal').style.display = 'block';
            }
        }
        
        // Salvar edição do beneficiário
        function saveEditBeneficiary(e) {
            e.preventDefault();
            
            if (!validarFormulario('beneficiary-edit-form')) {
                mostrarNotificacao('Por favor, corrija os erros no formulário', 'error');
                return;
            }
            
            const id = document.getElementById('edit-beneficiary-id').value;
            const name = document.getElementById('edit-beneficiary-name').value;
            const type = document.getElementById('edit-beneficiary-type').value;
            const email = document.getElementById('edit-beneficiary-email').value;
            const phone = document.getElementById('edit-beneficiary-phone').value;
            const address = document.getElementById('edit-beneficiary-address').value;
            const city = document.getElementById('edit-beneficiary-city').value;
            const state = document.getElementById('edit-beneficiary-state').value;
            const animals = parseInt(document.getElementById('edit-beneficiary-animals').value);
            const status = document.getElementById('edit-beneficiary-status').value;
            
            try {
                const beneficiarios = obterBeneficiarios();
                const beneficiary = beneficiarios[id];
                
                if (beneficiary) {
                    // Atualizar dados
                    beneficiary.name = name;
                    beneficiary.type = type;
                    beneficiary.email = email;
                    beneficiary.phone = phone;
                    beneficiary.address = address;
                    beneficiary.city = city;
                    beneficiary.state = state;
                    beneficiary.animals = animals;
                    beneficiary.status = status;
                    
                    // Salvar alterações
                    salvarBeneficiarios(beneficiarios);
                    
                    // Fechar modal e recarregar
                    closeEditModal();
                    carregarBeneficiarios();
                    
                    // Mostrar notificação
                    mostrarNotificacao('Beneficiário atualizado com sucesso!', 'success');
                }
                
            } catch (error) {
                console.error('Erro ao salvar edição:', error);
                mostrarNotificacao('Erro ao salvar alterações', 'error');
            }
        }
        
        // Confirmar exclusão de beneficiário
        function confirmDelete(id, nome) {
            beneficiaryToDelete = id;
            document.getElementById('nome-beneficiario-excluir').textContent = nome;
            document.getElementById('confirmation-modal').style.display = 'block';
        }
        
        // Excluir beneficiário
        function deleteBeneficiary() {
            if (beneficiaryToDelete) {
                try {
                    const beneficiarios = obterBeneficiarios();
                    const beneficiary = beneficiarios[beneficiaryToDelete];
                    
                    if (beneficiary) {
                        // Adicionar data de exclusão
                        beneficiary.dataExclusao = new Date().toISOString();
                        
                        // Mover para lixeira
                        const lixeira = JSON.parse(localStorage.getItem('lixeiraSOSFelino')) || [];
                        lixeira.push(beneficiary);
                        localStorage.setItem('lixeiraSOSFelino', JSON.stringify(lixeira));
                        
                        // Remover dos beneficiários ativos
                        delete beneficiarios[beneficiaryToDelete];
                        salvarBeneficiarios(beneficiarios);
                        
                        // Mostrar notificação
                        mostrarNotificacao(`"${beneficiary.name}" movido para a lixeira`, 'success');
                    }
                    
                } catch (error) {
                    console.error('Erro ao excluir beneficiário:', error);
                    mostrarNotificacao('Erro ao excluir beneficiário', 'error');
                }
                
                closeConfirmationModal();
                carregarBeneficiarios();
            }
        }
        
        // ============ SISTEMA DE ESTATÍSTICAS ============
        
        // Carregar estatísticas rápidas
        function loadQuickStats() {
            const statsContainer = document.getElementById('quick-stats');
            const beneficiarios = obterBeneficiarios();
            const beneficiariosArray = Object.values(beneficiarios);
            
            const totalBeneficiarios = beneficiariosArray.length;
            const activeBeneficiarios = beneficiariosArray.filter(b => b.status === 'active').length;
            const totalAnimals = beneficiariosArray.reduce((sum, b) => sum + b.animals, 0);
            const avgAnimals = totalBeneficiarios > 0 ? Math.round(totalAnimals / totalBeneficiarios) : 0;
            
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="stat-value">${totalBeneficiarios}</div>
                    <div class="stat-label">Total de Beneficiários</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${activeBeneficiarios}</div>
                    <div class="stat-label">Beneficiários Ativos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${totalAnimals}</div>
                    <div class="stat-label">Animais Resgatados</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${avgAnimals}</div>
                    <div class="stat-label">Média por Beneficiário</div>
                </div>
            `;
        }
        
        // Atualizar estatísticas
        function atualizarEstatisticas() {
            loadQuickStats();
        }
        
        // ============ SISTEMA DE EXPORTAÇÃO ============
        
        // Exportar beneficiários
        function exportBeneficiaries() {
            const beneficiarios = obterBeneficiarios();
            const data = JSON.stringify(beneficiarios, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'beneficiarios_sos_felino.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            mostrarNotificacao('Lista de beneficiários exportada com sucesso!', 'success');
        }
        
        // ============ UTILITÁRIOS ============
        
        // Função para formatar data
        function formatarData(dataString) {
            if (!dataString) return 'Data não disponível';
            
            try {
                const data = new Date(dataString);
                return data.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } catch (error) {
                return 'Data inválida';
            }
        }
        
        // Função para mostrar notificações
        function mostrarNotificacao(mensagem, tipo = 'info') {
            try {
                // Criar elemento de notificação
                const notification = document.createElement('div');
                notification.className = `success-message alert-${tipo}`;
                notification.innerHTML = `
                    <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    ${mensagem}
                `;
                
                document.body.appendChild(notification);
                
                // Animação de entrada
                setTimeout(() => {
                    notification.classList.add('show');
                }, 100);
                
                // Remover após 3 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }, 3000);
                
            } catch (error) {
                console.error('Erro ao mostrar notificação:', error);
            }
        }
        
        // ============ INICIALIZAÇÃO ============
        
        // Inicializar quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Inicializando sistema de beneficiários...');
            
            // Inicializar armazenamento
            inicializarLixeira();
            inicializarBeneficiariosPadrao();
            
            // Inicializar sistema de sincronização
            inicializarSincronizacao();
            
            // Carregar interface
            carregarBeneficiarios();
            atualizarEstatisticas();
            
            // Configurar eventos
            document.getElementById('beneficiary-form').addEventListener('submit', saveBeneficiary);
            document.getElementById('beneficiary-edit-form').addEventListener('submit', saveEditBeneficiary);
            document.getElementById('confirm-delete').addEventListener('click', deleteBeneficiary);
            
            // Eventos de paginação
            document.getElementById('prev-page').addEventListener('click', goToPrevPage);
            document.getElementById('next-page').addEventListener('click', goToNextPage);
            
            // Eventos de filtro
            document.getElementById('status-filter').addEventListener('change', aplicarFiltros);
            document.getElementById('category-filter').addEventListener('change', aplicarFiltros);
            document.getElementById('beneficiary-search').addEventListener('input', aplicarFiltros);
            
            // Eventos de contador de caracteres
            document.querySelectorAll('input[maxlength]').forEach(input => {
                const counterId = input.id.replace('beneficiary-', '').replace('edit-beneficiary-', '') + '-counter';
                input.addEventListener('input', () => updateCharCounter(input.id, counterId));
            });
            
            // Evento para alternar filtros avançados
            document.getElementById('toggle-filters').addEventListener('click', function() {
                const advancedFilters = document.getElementById('advanced-filters');
                const chevron = document.getElementById('filters-chevron');
                
                advancedFilters.classList.toggle('show');
                
                if (advancedFilters.classList.contains('show')) {
                    chevron.className = 'fas fa-chevron-up';
                } else {
                    chevron.className = 'fas fa-chevron-down';
                }
            });
            
            // Evento para botão de atualizar
            document.getElementById('btn-refresh-beneficiarios').addEventListener('click', function() {
                this.classList.add('loading');
                carregarBeneficiarios();
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            });
            
            // Fechar modais ao clicar fora
            window.addEventListener('click', function(e) {
                const modals = ['beneficiary-modal', 'confirmation-modal', 'beneficiary-detail-modal', 'beneficiary-edit-modal'];
                modals.forEach(modalId => {
                    const modal = document.getElementById(modalId);
                    if (e.target === modal) {
                        if (modalId === 'beneficiary-modal') closeModal();
                        if (modalId === 'confirmation-modal') closeConfirmationModal();
                        if (modalId === 'beneficiary-detail-modal') closeDetailModal();
                        if (modalId === 'beneficiary-edit-modal') closeEditModal();
                    }
                });
            });
            
            console.log('Sistema de beneficiários inicializado com sucesso!');
        });