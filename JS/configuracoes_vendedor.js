        // Dados iniciais atualizados para Casa Usada
        const userData = {
            nome: "Maria Silva",
            email: "casausada@email.com",
            telefone: "(21) 98888-8888",
            cpfCnpj: "12.345.678/0001-90",
            nomeLoja: "Casa Usada",
            descricaoLoja: "Oferecemos eletrodomésticos e utensílios domésticos em ótimo estado, com garantia de funcionamento. Todos os produtos passam por uma avaliação criteriosa antes de serem disponibilizados.",
            categoriaPrincipal: "eletrodomesticos",
            tempoResposta: "2",
            politicaTrocas: "Aceitamos trocas em até 7 dias para produtos com defeito. Produtos em perfeito estado não são passíveis de troca.",
            fotoPerfil: "IMG/vendedor-casa-usada.jpg",
            privacidade: {
                perfilPublico: true,
                mostrarEmail: false,
                mostrarEstatisticas: true,
                mostrarVendas: true,
                autenticacao2Fatores: false
            },
            notificacoes: {
                emailVendas: true,
                emailEstoque: true,
                emailAvaliacoes: true,
                emailPromocoes: true,
                emailMensagens: true,
                siteVendas: true,
                siteMensagens: true,
                siteAtualizacoes: true,
                sitePromocoes: true,
                smsVendas: false,
                smsSuporte: false
            },
            pagamentos: {
                contaPagamento: "Conta Corrente ••• 5678",
                frequenciaPagamento: "Quinzenal"
            }
        };

        // Elementos DOM
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        const profilePreview = document.getElementById('logo-preview');
        const fotoPerfilInput = document.getElementById('foto-perfil');
        const toast = document.getElementById('toast');
        const paymentModal = document.getElementById('payment-modal');
        const dangerModal = document.getElementById('danger-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const cancelPaymentBtn = document.getElementById('cancel-payment');
        const paymentForm = document.getElementById('payment-form');
        const tipoPagamentoSelect = document.getElementById('tipo-pagamento');
        const addPaymentBtn = document.getElementById('add-payment-btn');
        const editPaymentBtns = document.querySelectorAll('.edit-payment-btn');
        const paymentMethodsList = document.getElementById('payment-methods-list');
        const savePagamentosBtn = document.getElementById('save-pagamentos');
        
        // Botões da zona de perigo
        const btnExportData = document.getElementById('btn-export-data');
        const btnDisableStore = document.getElementById('btn-disable-store');
        const btnDeleteAccount = document.getElementById('btn-delete-account');
        const cancelDangerBtn = document.getElementById('cancel-danger');
        const confirmDangerBtn = document.getElementById('confirm-danger');

        // Inicializar a página
        document.addEventListener('DOMContentLoaded', function () {
            // Carregar dados do usuário
            loadUserData();

            // Configurar eventos
            setupEventListeners();
            
            // Atualizar contador de notificações
            updateNotificationCount();
        });

        // Carregar dados do usuário nos formulários
        function loadUserData() {
            // Dados da conta
            document.getElementById('nome').value = userData.nome;
            document.getElementById('email').value = userData.email;
            document.getElementById('telefone').value = userData.telefone;
            document.getElementById('cpf-cnpj').value = userData.cpfCnpj;

            // Dados da loja
            document.getElementById('nome-loja').value = userData.nomeLoja;
            document.getElementById('descricao-loja').value = userData.descricaoLoja;
            document.getElementById('categoria-principal').value = userData.categoriaPrincipal;
            document.getElementById('tempo-resposta').value = userData.tempoResposta;
            document.getElementById('politica-trocas').value = userData.politicaTrocas;
            profilePreview.src = userData.fotoPerfil;

            // Dados de privacidade
            document.getElementById('perfil-publico').checked = userData.privacidade.perfilPublico;
            document.getElementById('mostrar-email').checked = userData.privacidade.mostrarEmail;
            document.getElementById('mostrar-estatisticas').checked = userData.privacidade.mostrarEstatisticas;
            document.getElementById('mostrar-vendas').checked = userData.privacidade.mostrarVendas;
            document.getElementById('autenticacao-2fatores').checked = userData.privacidade.autenticacao2Fatores;

            // Dados de notificações
            document.getElementById('email-vendas').checked = userData.notificacoes.emailVendas;
            document.getElementById('email-estoque').checked = userData.notificacoes.emailEstoque;
            document.getElementById('email-avaliacoes').checked = userData.notificacoes.emailAvaliacoes;
            document.getElementById('email-promocoes').checked = userData.notificacoes.emailPromocoes;
            document.getElementById('email-mensagens').checked = userData.notificacoes.emailMensagens;
            document.getElementById('site-vendas').checked = userData.notificacoes.siteVendas;
            document.getElementById('site-mensagens').checked = userData.notificacoes.siteMensagens;
            document.getElementById('site-atualizacoes').checked = userData.notificacoes.siteAtualizacoes;
            document.getElementById('site-promocoes').checked = userData.notificacoes.sitePromocoes;
            document.getElementById('sms-vendas').checked = userData.notificacoes.smsVendas;
            document.getElementById('sms-suporte').checked = userData.notificacoes.smsSuporte;

            // Dados de pagamentos
            document.getElementById('conta-pagamento').value = userData.pagamentos.contaPagamento;
            document.getElementById('frequencia-pagamento').value = userData.pagamentos.frequenciaPagamento;
        }

        // Configurar event listeners
        function setupEventListeners() {
            // Sistema de abas
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    activateTab(tabId);
                });
            });

            // Preview da imagem de perfil
            fotoPerfilInput.addEventListener('change', function () {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        profilePreview.src = e.target.result;
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });

            // Formulários
            document.getElementById('conta-form').addEventListener('submit', handleContaSubmit);
            document.getElementById('loja-form').addEventListener('submit', handleLojaSubmit);
            document.getElementById('privacidade-form').addEventListener('submit', handlePrivacidadeSubmit);
            document.getElementById('notificacoes-form').addEventListener('submit', handleNotificacoesSubmit);

            // Botões de cancelar
            document.getElementById('cancel-conta').addEventListener('click', resetContaForm);
            document.getElementById('cancel-loja').addEventListener('click', resetLojaForm);
            document.getElementById('cancel-privacidade').addEventListener('click', resetPrivacidadeForm);
            document.getElementById('cancel-notificacoes').addEventListener('click', resetNotificacoesForm);
            document.getElementById('cancel-pagamentos').addEventListener('click', resetPagamentosForm);

            // Modal de pagamentos
            addPaymentBtn.addEventListener('click', openAddPaymentModal);
            editPaymentBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const type = this.getAttribute('data-type');
                    const id = this.getAttribute('data-id');
                    openEditPaymentModal(type, id);
                });
            });

            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    closeModal(modal);
                });
            });

            cancelPaymentBtn.addEventListener('click', () => closeModal(paymentModal));
            paymentForm.addEventListener('submit', handlePaymentSubmit);
            tipoPagamentoSelect.addEventListener('change', togglePaymentFields);
            savePagamentosBtn.addEventListener('click', handlePagamentosSubmit);

            // Modal de ações perigosas
            btnExportData.addEventListener('click', () => openDangerModal('export'));
            btnDisableStore.addEventListener('click', () => openDangerModal('disable'));
            btnDeleteAccount.addEventListener('click', () => openDangerModal('delete'));
            cancelDangerBtn.addEventListener('click', () => closeModal(dangerModal));
            confirmDangerBtn.addEventListener('click', handleDangerAction);

            // Fechar modal ao clicar fora
            window.addEventListener('click', function (event) {
                if (event.target.classList.contains('modal')) {
                    closeModal(event.target);
                }
            });
        }

        // Funções do sistema de abas
        function activateTab(tabId) {
            // Remover classe ativa de todas as abas e conteúdos
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ativar aba e conteúdo correspondente
            const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
            const activeContent = document.getElementById(`${tabId}-tab`);
            
            if (activeBtn && activeContent) {
                activeBtn.classList.add('active');
                activeContent.classList.add('active');
            }
        }

        // Handlers dos formulários
        function handleContaSubmit(e) {
            e.preventDefault();
            // Simular salvamento
            showToast('Informações da conta atualizadas com sucesso!', 'success');
        }

        function handleLojaSubmit(e) {
            e.preventDefault();
            showToast('Configurações da loja atualizadas com sucesso!', 'success');
        }

        function handlePrivacidadeSubmit(e) {
            e.preventDefault();
            const senhaAtual = document.getElementById('senha-atual').value;
            const novaSenha = document.getElementById('nova-senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if (novaSenha && novaSenha !== confirmarSenha) {
                showToast('As senhas não coincidem!', 'error');
                return;
            }

            showToast('Configurações de privacidade atualizadas com sucesso!', 'success');
        }

        function handleNotificacoesSubmit(e) {
            e.preventDefault();
            showToast('Preferências de notificação atualizadas com sucesso!', 'success');
        }

        function handlePagamentosSubmit() {
            showToast('Configurações de pagamento atualizadas com sucesso!', 'success');
        }

        // Funções de reset dos formulários
        function resetContaForm() {
            document.getElementById('nome').value = userData.nome;
            document.getElementById('email').value = userData.email;
            document.getElementById('telefone').value = userData.telefone;
            document.getElementById('cpf-cnpj').value = userData.cpfCnpj;
            showToast('Alterações descartadas', 'info');
        }

        function resetLojaForm() {
            document.getElementById('nome-loja').value = userData.nomeLoja;
            document.getElementById('descricao-loja').value = userData.descricaoLoja;
            document.getElementById('categoria-principal').value = userData.categoriaPrincipal;
            document.getElementById('tempo-resposta').value = userData.tempoResposta;
            document.getElementById('politica-trocas').value = userData.politicaTrocas;
            profilePreview.src = userData.fotoPerfil;
            showToast('Alterações descartadas', 'info');
        }

        function resetPrivacidadeForm() {
            document.getElementById('senha-atual').value = '';
            document.getElementById('nova-senha').value = '';
            document.getElementById('confirmar-senha').value = '';
            document.getElementById('perfil-publico').checked = userData.privacidade.perfilPublico;
            document.getElementById('mostrar-email').checked = userData.privacidade.mostrarEmail;
            document.getElementById('mostrar-estatisticas').checked = userData.privacidade.mostrarEstatisticas;
            document.getElementById('mostrar-vendas').checked = userData.privacidade.mostrarVendas;
            document.getElementById('autenticacao-2fatores').checked = userData.privacidade.autenticacao2Fatores;
            showToast('Alterações descartadas', 'info');
        }

        function resetNotificacoesForm() {
            document.getElementById('email-vendas').checked = userData.notificacoes.emailVendas;
            document.getElementById('email-estoque').checked = userData.notificacoes.emailEstoque;
            document.getElementById('email-avaliacoes').checked = userData.notificacoes.emailAvaliacoes;
            document.getElementById('email-promocoes').checked = userData.notificacoes.emailPromocoes;
            document.getElementById('email-mensagens').checked = userData.notificacoes.emailMensagens;
            document.getElementById('site-vendas').checked = userData.notificacoes.siteVendas;
            document.getElementById('site-mensagens').checked = userData.notificacoes.siteMensagens;
            document.getElementById('site-atualizacoes').checked = userData.notificacoes.siteAtualizacoes;
            document.getElementById('site-promocoes').checked = userData.notificacoes.sitePromocoes;
            document.getElementById('sms-vendas').checked = userData.notificacoes.smsVendas;
            document.getElementById('sms-suporte').checked = userData.notificacoes.smsSuporte;
            showToast('Alterações descartadas', 'info');
        }

        function resetPagamentosForm() {
            document.getElementById('conta-pagamento').value = userData.pagamentos.contaPagamento;
            document.getElementById('frequencia-pagamento').value = userData.pagamentos.frequenciaPagamento;
            showToast('Alterações descartadas', 'info');
        }

        // Funções do modal de pagamentos
        function openAddPaymentModal() {
            document.getElementById('payment-modal-title').textContent = 'Adicionar Método de Pagamento';
            paymentForm.reset();
            togglePaymentFields();
            paymentModal.style.display = 'block';
        }

        function openEditPaymentModal(type, id) {
            document.getElementById('payment-modal-title').textContent = 'Editar Método de Pagamento';
            tipoPagamentoSelect.value = type;
            togglePaymentFields();
            
            // Preencher com dados existentes (simulação)
            if (type === 'cartao') {
                document.getElementById('numero-cartao').value = '1234 5678 9012 3456';
                document.getElementById('nome-cartao').value = 'Maria Silva';
                document.getElementById('validade-cartao').value = '12/25';
                document.getElementById('cvv-cartao').value = '123';
            } else if (type === 'paypal') {
                document.getElementById('email-paypal').value = 'casausada@email.com';
            } else if (type === 'conta') {
                document.getElementById('banco').value = 'Banco do Brasil';
                document.getElementById('tipo-conta').value = 'corrente';
                document.getElementById('agencia').value = '1234';
                document.getElementById('conta-bancaria').value = '56789-0';
            }
            
            paymentModal.style.display = 'block';
        }

        function togglePaymentFields() {
            const tipo = tipoPagamentoSelect.value;
            
            // Esconder todos os campos
            document.getElementById('cartao-fields').classList.add('hidden');
            document.getElementById('paypal-fields').classList.add('hidden');
            document.getElementById('conta-fields').classList.add('hidden');
            
            // Mostrar campos correspondentes
            document.getElementById(`${tipo}-fields`).classList.remove('hidden');
        }

        function handlePaymentSubmit(e) {
            e.preventDefault();
            showToast('Método de pagamento salvo com sucesso!', 'success');
            closeModal(paymentModal);
        }

        // Funções do modal de ações perigosas
        function openDangerModal(action) {
            const modalTitle = document.getElementById('danger-modal-title');
            const modalMessage = document.getElementById('danger-modal-message');
            const confirmBtn = document.getElementById('confirm-danger');
            
            switch(action) {
                case 'export':
                    modalTitle.textContent = 'Exportar Dados';
                    modalMessage.textContent = 'Tem certeza que deseja exportar todos os dados da sua loja? Um arquivo CSV será gerado com todas as informações.';
                    confirmBtn.textContent = 'Exportar';
                    confirmBtn.className = 'modal-btn modal-btn-confirm';
                    break;
                case 'disable':
                    modalTitle.textContent = 'Desativar Loja';
                    modalMessage.textContent = 'Tem certeza que deseja desativar sua loja temporariamente? Seus produtos não serão exibidos até que você reative a loja.';
                    confirmBtn.textContent = 'Desativar';
                    confirmBtn.className = 'modal-btn modal-btn-warning';
                    break;
                case 'delete':
                    modalTitle.textContent = 'Excluir Conta';
                    modalMessage.textContent = 'ATENÇÃO: Esta ação é irreversível! Todos os seus dados, produtos e histórico serão permanentemente excluídos. Tem certeza que deseja continuar?';
                    confirmBtn.textContent = 'Excluir Conta';
                    confirmBtn.className = 'modal-btn modal-btn-danger';
                    break;
            }
            
            confirmBtn.setAttribute('data-action', action);
            dangerModal.style.display = 'block';
        }

        function handleDangerAction() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'export':
                    showToast('Dados exportados com sucesso! Verifique seu e-mail.', 'success');
                    break;
                case 'disable':
                    showToast('Loja desativada temporariamente.', 'warning');
                    break;
                case 'delete':
                    showToast('Conta excluída com sucesso. Redirecionando...', 'error');
                    // Simular redirecionamento
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                    break;
            }
            
            closeModal(dangerModal);
        }

        // Funções utilitárias
        function closeModal(modal) {
            modal.style.display = 'none';
        }

        function showToast(message, type = 'info') {
            toast.textContent = message;
            toast.className = 'toast show ' + type;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function updateNotificationCount() {
            // Simular contagem de notificações pendentes
            const count = Math.floor(Math.random() * 5);
            document.getElementById('notificacoes-pendentes').textContent = count;
        }