        // Função para mostrar/ocultar abas
        function showTab(tabName) {
            // Esconder todos os conteúdos de abas
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active-tab');
            });

            // Desativar todas as abas
            document.querySelectorAll('.institution-tab').forEach(tab => {
                tab.classList.remove('active');
            });

            // Ativar a aba clicada
            document.querySelector(`.institution-tab:nth-child(${getTabIndex(tabName)})`).classList.add('active');

            // Mostrar o conteúdo da aba correspondente
            document.getElementById(`${tabName}-tab`).classList.add('active-tab');

            // Atualizar o breadcrumb
            document.getElementById('current-breadcrumb').textContent =
                document.querySelector(`.institution-tab:nth-child(${getTabIndex(tabName)})`).textContent.trim();
        }

        function getTabIndex(tabName) {
            const tabMap = {
                'donations': 1,
                'beneficiaries': 2,
                'reports': 3,
                'settings': 4,
                'contact': 5
            };
            return tabMap[tabName] || 1;
        }

        // Alternar opções de relatório
        function toggleReportOptions() {
            const reportType = document.getElementById('report-type').value;

            document.getElementById('month-selection').style.display = 'none';
            document.getElementById('quarter-selection').style.display = 'none';
            document.getElementById('annual-selection').style.display = 'none';
            document.getElementById('custom-range').style.display = 'none';

            if (reportType === 'monthly') {
                document.getElementById('month-selection').style.display = 'block';
            } else if (reportType === 'quarterly') {
                document.getElementById('quarter-selection').style.display = 'block';
            } else if (reportType === 'annual') {
                document.getElementById('annual-selection').style.display = 'block';
            } else if (reportType === 'custom') {
                document.getElementById('custom-range').style.display = 'block';
            }
        }

        // Gerar relatório
        function generateReport() {
            alert('Relatório gerado com sucesso! Em uma implementação real, isso baixaria um PDF ou planilha.');
        }

        // Modal de adicionar pet
        function openBeneficiaryModal() {
            document.getElementById('beneficiary-modal').style.display = 'block';
        }

        function closeBeneficiaryModal() {
            document.getElementById('beneficiary-modal').style.display = 'none';
        }

        // Modal de suporte
        function openSupportModal() {
            document.getElementById('support-modal').style.display = 'block';
        }

        function closeSupportModal() {
            document.getElementById('support-modal').style.display = 'none';
        }

        // Salvar configurações
        function saveSettings() {
            alert('Configurações salvas com sucesso!');
        }

        // Copiar para área de transferência
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Copiado para a área de transferência: ' + text);
            });
        }

        // Inicializar gráficos quando a página carregar
        window.onload = function () {
            // Gráfico de adoções
            const donationsCtx = document.getElementById('donationsChart').getContext('2d');
            new Chart(donationsCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Adoções Realizadas',
                        data: [12, 19, 15, 22, 18, 24],
                        backgroundColor: '#4CAF50'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Gráfico de tipos de pets
            const beneficiariesCtx = document.getElementById('beneficiariesChart').getContext('2d');
            new Chart(beneficiariesCtx, {
                type: 'pie',
                data: {
                    labels: ['Cachorros', 'Gatos', 'Outros'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800']
                    }]
                },
                options: {
                    responsive: true
                }
            });

            // Prevenir envio de formulários (apenas para demonstração)
            document.getElementById('beneficiary-form').addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Pet adicionado com sucesso!');
                closeBeneficiaryModal();
            });

            document.getElementById('support-form').addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Chamado de suporte enviado com sucesso!');
                closeSupportModal();
            });
        };