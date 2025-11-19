       // Dados de exemplo para as doações
        const donationsData = [
            {
                id: 1,
                donor: "Maria Silva",
                date: "15/03/2025",
                items: [
                    { name: "Ração para gatos", quantity: 2, category: "food" },
                    { name: "Brinquedos para pets", quantity: 5, category: "toys" }
                ],
                status: "received",
                notes: "Doação em perfeito estado. Agradecemos muito!"
            },
            {
                id: 2,
                donor: "João Santos",
                date: "12/03/2025",
                items: [
                    { name: "Cobertores", quantity: 3, category: "blankets" },
                    { name: "Produtos de higiene", quantity: 2, category: "hygiene" }
                ],
                status: "pending",
                notes: "Precisa buscar até sexta-feira."
            },
            {
                id: 3,
                donor: "Ana Costa",
                date: "10/03/2025",
                items: [
                    { name: "Roupas para pets", quantity: 4, category: "clothing" },
                    { name: "Ração para cães", quantity: 1, category: "food" }
                ],
                status: "scheduled",
                notes: "Agendado para retirada no dia 18/03."
            },
            {
                id: 4,
                donor: "Pedro Almeida",
                date: "08/03/2025",
                items: [
                    { name: "Brinquedos para pets", quantity: 3, category: "toys" },
                    { name: "Produtos de higiene", quantity: 2, category: "hygiene" }
                ],
                status: "received",
                notes: "Muito obrigado pela contribuição!"
            },
            {
                id: 5,
                donor: "Carla Mendes",
                date: "05/03/2025",
                items: [
                    { name: "Ração para gatos", quantity: 3, category: "food" },
                    { name: "Cobertores", quantity: 2, category: "blankets" }
                ],
                status: "received",
                notes: "Doação em ótimo estado."
            },
            {
                id: 6,
                donor: "Roberto Lima",
                date: "02/03/2025",
                items: [
                    { name: "Roupas para pets", quantity: 5, category: "clothing" },
                    { name: "Brinquedos para pets", quantity: 2, category: "toys" }
                ],
                status: "pending",
                notes: "Aguardando confirmação de retirada."
            }
        ];

        // Variáveis globais
        let currentPage = 1;
        const itemsPerPage = 4;
        let filteredDonations = [...donationsData];

        // Inicialização quando a página carrega
        document.addEventListener('DOMContentLoaded', function () {
            renderDonations();
            setupEventListeners();
        });

        // Configurar event listeners
        function setupEventListeners() {
            // Filtros
            document.getElementById('filter-button').addEventListener('click', applyFilters);

            // Paginação
            document.getElementById('prev-page').addEventListener('click', goToPrevPage);
            document.getElementById('next-page').addEventListener('click', goToNextPage);

            // Modal
            document.querySelector('.close').addEventListener('click', closeModal);
            window.addEventListener('click', function (event) {
                const modal = document.getElementById('details-modal');
                if (event.target === modal) {
                    closeModal();
                }
            });
        }

        // Aplicar filtros
        function applyFilters() {
            const statusFilter = document.getElementById('status-filter').value;
            const categoryFilter = document.getElementById('category-filter').value;

            filteredDonations = donationsData.filter(donation => {
                // Filtro por status
                if (statusFilter !== 'all' && donation.status !== statusFilter) {
                    return false;
                }

                // Filtro por categoria
                if (categoryFilter !== 'all') {
                    const hasCategory = donation.items.some(item => item.category === categoryFilter);
                    if (!hasCategory) return false;
                }

                return true;
            });

            currentPage = 1;
            renderDonations();
        }

        // Renderizar doações
        function renderDonations() {
            const container = document.getElementById('donations-container');
            container.innerHTML = '';

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const donationsToShow = filteredDonations.slice(startIndex, endIndex);

            if (donationsToShow.length === 0) {
                container.innerHTML = '<p class="no-results">Nenhuma doação encontrada com os filtros aplicados.</p>';
                setupPagination();
                return;
            }

            donationsToShow.forEach(donation => {
                const donationCard = document.createElement('div');
                donationCard.className = 'donation-card';

                // Determinar classe de status
                let statusClass = '';
                let statusText = '';

                switch (donation.status) {
                    case 'received':
                        statusClass = 'status-received';
                        statusText = 'Recebida';
                        break;
                    case 'pending':
                        statusClass = 'status-pending';
                        statusText = 'Pendente';
                        break;
                    case 'scheduled':
                        statusClass = 'status-scheduled';
                        statusText = 'Agendada';
                        break;
                }

                donationCard.innerHTML = `
                    <div class="donation-header">
                        <div class="donation-donor">${donation.donor}</div>
                        <div class="donation-status ${statusClass}">${statusText}</div>
                    </div>
                    <div class="donation-details">
                        <div class="donation-item">
                            <span>Data:</span>
                            <span>${donation.date}</span>
                        </div>
                        <div class="donation-item">
                            <span>Itens:</span>
                            <span>${donation.items.length} tipos</span>
                        </div>
                    </div>
                    <div class="donation-actions">
                        <button class="primary-button small" onclick="viewDonationDetails(${donation.id})">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                    </div>
                `;

                container.appendChild(donationCard);
            });

            setupPagination();
        }

        // Configurar paginação
        function setupPagination() {
            const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
            const pageButtonsContainer = document.getElementById('page-buttons');
            pageButtonsContainer.innerHTML = '';

            // Botão anterior
            document.getElementById('prev-page').disabled = currentPage === 1;

            // Botões de página
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.className = 'page-button';
                if (i === currentPage) {
                    button.classList.add('active');
                }
                button.textContent = i;
                button.addEventListener('click', () => {
                    currentPage = i;
                    renderDonations();
                });
                pageButtonsContainer.appendChild(button);
            }

            // Botão próximo
            document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
        }

        // Navegar para página anterior
        function goToPrevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderDonations();
            }
        }

        // Navegar para próxima página
        function goToNextPage() {
            const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderDonations();
            }
        }

        // Visualizar detalhes da doação
        function viewDonationDetails(id) {
            const donation = donationsData.find(d => d.id === id);
            if (!donation) return;

            const modal = document.getElementById('details-modal');
            const detailsContainer = document.getElementById('donation-details');

            // Determinar texto de status
            let statusText = '';
            switch (donation.status) {
                case 'received':
                    statusText = 'Recebida';
                    break;
                case 'pending':
                    statusText = 'Pendente';
                    break;
                case 'scheduled':
                    statusText = 'Agendada';
                    break;
            }

            // Gerar HTML dos itens
            let itemsHTML = '';
            donation.items.forEach(item => {
                itemsHTML += `
                    <div class="donation-item">
                        <span>${item.name}:</span>
                        <span>${item.quantity} unid.</span>
                    </div>
                `;
            });

            detailsContainer.innerHTML = `
                <div class="donation-item">
                    <span><strong>Doador:</strong></span>
                    <span>${donation.donor}</span>
                </div>
                <div class="donation-item">
                    <span><strong>Data:</strong></span>
                    <span>${donation.date}</span>
                </div>
                <div class="donation-item">
                    <span><strong>Status:</strong></span>
                    <span>${statusText}</span>
                </div>
                <div style="margin-top: 15px;">
                    <strong>Itens doados:</strong>
                    ${itemsHTML}
                </div>
                <div style="margin-top: 15px;">
                    <strong>Observações:</strong>
                    <p>${donation.notes}</p>
                </div>
            `;

            modal.style.display = 'block';
        }

        // Fechar modal
        function closeModal() {
            const modal = document.getElementById('details-modal');
            modal.style.display = 'none';
        }

        // Mostrar toast de notificação
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = 'toast show';

            setTimeout(() => {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        }