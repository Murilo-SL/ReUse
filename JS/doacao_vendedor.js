document.addEventListener('DOMContentLoaded', function () {
    // Definir data mínima como hoje
    const dataRetiradaInput = document.getElementById('date');
    const hoje = new Date().toISOString().split('T')[0];
    dataRetiradaInput.min = hoje;
    
    // Carregar produtos do localStorage
    const produtos = JSON.parse(localStorage.getItem('produtosVendedor')) || [];
    const selectProduto = document.getElementById('product');

    // Limpar options padrão, mantendo a primeira
    while (selectProduto.options.length > 1) {
        selectProduto.remove(1);
    }

    // Adicionar produtos disponíveis
    produtos.forEach(produto => {
        if (produto.status === 'Disponível') {
            const option = document.createElement('option');
            option.value = produto.id;
            option.textContent = `${produto.nome} - R$ ${produto.preco}`;
            option.dataset.descricao = produto.descricao || 'Sem descrição';
            option.dataset.condicao = produto.condicao || 'Não especificada';
            selectProduto.appendChild(option);
        }
    });

    // Mostrar detalhes do produto selecionado
    selectProduto.addEventListener('change', function() {
        const productDetails = document.getElementById('product-details');
        const productName = document.getElementById('product-name');
        const productDescription = document.getElementById('product-description');
        const productCondition = document.getElementById('product-condition');
        
        if (this.value) {
            const selectedOption = this.options[this.selectedIndex];
            productName.textContent = `Nome: ${selectedOption.textContent.split(' - ')[0]}`;
            productDescription.textContent = `Descrição: ${selectedOption.dataset.descricao}`;
            productCondition.textContent = `Condição: ${selectedOption.dataset.condicao}`;
            productDetails.style.display = 'block';
        } else {
            productDetails.style.display = 'none';
        }
    });

    // Atualizar informações da ONG quando selecionada
    document.getElementById('ong').addEventListener('change', function () {
        const ongInfo = {
            'ong1': { 
                contact: 'Maria Silva', 
                address: 'Rua das Flores, 123 - Centro, Rio de Janeiro - RJ', 
                phone: '(21) 9999-8888' 
            },
            'ong2': { 
                contact: 'João Santos', 
                address: 'Av. Principal, 456 - Jardins, Rio de Janeiro - RJ', 
                phone: '(21) 7777-6666' 
            },
            'ong3': { 
                contact: 'Ana Oliveira', 
                address: 'Rua das Palmeiras, 789 - Vila Nova, Rio de Janeiro - RJ', 
                phone: '(21) 5555-4444' 
            },
            'ong4': { 
                contact: 'Pedro Costa', 
                address: 'Alameda Santos, 1001 - Consolação, Rio de Janeiro - RJ', 
                phone: '(21) 3333-2222' 
            },
            'ong5': { 
                contact: 'Carla Mendes', 
                address: 'Rua Augusta, 2000 - Copacabana, Rio de Janeiro - RJ', 
                phone: '(21) 1111-0000' 
            }
        };

        const selectedOng = this.value;
        if (selectedOng && ongInfo[selectedOng]) {
            document.getElementById('contact').value = ongInfo[selectedOng].contact;
            document.getElementById('address').value = ongInfo[selectedOng].address;
            document.getElementById('phone').value = ongInfo[selectedOng].phone;
        } else {
            document.getElementById('contact').value = '';
            document.getElementById('address').value = '';
            document.getElementById('phone').value = '';
        }
    });

    // Função para mostrar erro
    function mostrarErro(campoId, mensagem) {
        const campo = document.getElementById(campoId);
        const erroElemento = document.getElementById(`${campoId}-error`);
        
        campo.classList.add('campo-erro');
        erroElemento.textContent = mensagem;
        erroElemento.style.display = 'block';
    }

    // Função para limpar erro
    function limparErro(campoId) {
        const campo = document.getElementById(campoId);
        const erroElemento = document.getElementById(`${campoId}-error`);
        
        campo.classList.remove('campo-erro');
        erroElemento.textContent = '';
        erroElemento.style.display = 'none';
    }

    // Adicionar event listeners para limpar erros quando o usuário começar a digitar/selecionar
    document.getElementById('product').addEventListener('change', function() {
        limparErro('product');
    });

    document.getElementById('ong').addEventListener('change', function() {
        limparErro('ong');
    });

    document.getElementById('date').addEventListener('change', function() {
        limparErro('date');
    });

    // Função de validação
    function validarFormulario() {
        let valido = true;
        
        // Validar produto
        const productId = document.getElementById('product').value;
        if (!productId) {
            mostrarErro('product', 'Por favor, selecione um produto para doação.');
            valido = false;
        }

        // Validar ONG
        const ong = document.getElementById('ong').value;
        if (!ong) {
            mostrarErro('ong', 'Por favor, selecione uma ONG beneficiada.');
            valido = false;
        }

        // Validar data
        const date = document.getElementById('date').value;
        if (!date) {
            mostrarErro('date', 'Por favor, selecione uma data de retirada.');
            valido = false;
        } else {
            const dataSelecionada = new Date(date);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            
            if (dataSelecionada < hoje) {
                mostrarErro('date', 'A data de retirada não pode ser anterior ao dia atual.');
                valido = false;
            }
        }

        return valido;
    }

    // Manipular envio do formulário
    document.getElementById('donationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Limpar todos os erros antes da validação
        limparErro('product');
        limparErro('ong');
        limparErro('date');

        // Validar formulário
        if (!validarFormulario()) {
            return;
        }

        // Obter dados do formulário
        const productId = document.getElementById('product').value;
        const ong = document.getElementById('ong').value;
        const date = document.getElementById('date').value;

        // Atualizar status do produto para "Doado"
        const produtos = JSON.parse(localStorage.getItem('produtosVendedor')) || [];
        const produtoIndex = produtos.findIndex(p => p.id === productId);

        if (produtoIndex !== -1) {
            produtos[produtoIndex].status = 'Doado';
            localStorage.setItem('produtosVendedor', JSON.stringify(produtos));

            // Registrar a doação
            const doacoes = JSON.parse(localStorage.getItem('doacoesVendedor')) || [];
            doacoes.push({
                id: Date.now().toString(),
                productId: productId,
                productName: document.getElementById('product').options[document.getElementById('product').selectedIndex].text,
                ong: document.getElementById('ong').options[document.getElementById('ong').selectedIndex].text,
                date: date,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('doacoesVendedor', JSON.stringify(doacoes));

            // Atualizar estatísticas
            atualizarEstatisticasDoacoes();

            // Mostrar animação de confirmação
            document.getElementById('confirmationModal').style.display = 'flex';
            
            // Limpar formulário
            document.getElementById('donationForm').reset();
            document.getElementById('product-details').style.display = 'none';
        } else {
            alert('Erro: Produto não encontrado.');
        }
    });
});

function fecharModalConfirmacao() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function atualizarEstatisticasDoacoes() {
    // Atualizar contador de doações no localStorage
    let estatisticas = JSON.parse(localStorage.getItem('estatisticasVendedor')) || {
        totalProdutos: 0,
        totalVendas: 89,
        totalDoacoes: 0,
        avaliacaoMedia: 4.3
    };
    
    estatisticas.totalDoacoes += 1;
    localStorage.setItem('estatisticasVendedor', JSON.stringify(estatisticas));
}