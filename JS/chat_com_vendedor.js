// chat_com_vendedor.js

// Banco de dados de conversas (inicialmente vazio)
let conversas = JSON.parse(localStorage.getItem('conversas')) || [];

// Banco de dados de vendedores disponíveis
const vendedoresDisponiveis = {
    "Brechó Elegante": {
        nome: "Brechó Elegante",
        avatar: "IMG/vendedor-brecho-elegante.jpg",
        status: "Online"
    },
    "Casa dos Usados": {
        nome: "Casa dos Usados",
        avatar: "IMG/vendedor-casa-usada.jpg",
        status: "Online"
    },
    "Estilo Vintage": {
        nome: "Estilo Vintage",
        avatar: "IMG/brecho3.jpg",
        status: "Offline"
    },
    "Doação Amiga": {
        nome: "Doação Amiga",
        avatar: "IMG/ong1.jpg",
        status: "Online"
    }
};

// Mensagens iniciais para cada vendedor
const mensagensIniciais = {
    "Brechó Elegante": [
        { remetente: "vendedor", texto: "Olá, temos várias opções de roupas masculinas em ótimo estado! Como posso ajudar?", tempo: "10:42" }
    ],
    "Casa dos Usados": [
        { remetente: "vendedor", texto: "Sim, podemos negociar o preço do liquidificador. Qual seu orçamento?", tempo: "Ontem 15:30" }
    ],
    "Estilo Vintage": [
        { remetente: "usuario", texto: "O vestido ainda está disponível?", tempo: "Seg 09:15" }
    ],
    "Doação Amiga": [
        { remetente: "vendedor", texto: "Obrigado pela sua doação! Seus itens já estão ajudando muitas pessoas.", tempo: "12/12 14:20" }
    ]
};

// Função para inicializar o chat
function inicializarChat() {
    carregarListaConversas();
    configurarEventListeners();
    
    // Se não houver conversas, mostrar estado vazio
    if (conversas.length === 0) {
        mostrarEstadoVazio();
    } else {
        // Carregar primeira conversa se existir
        const primeiraConversa = conversas[0];
        carregarConversa(primeiraConversa.vendedor);
    }
}

// Função para mostrar estado vazio (quando não há conversas)
function mostrarEstadoVazio() {
    const chatMessages = document.getElementById('chat-messages-container');
    const chatConversation = document.querySelector('.chat-conversation');
    
    // Esconder informações do chat atual
    document.querySelector('.current-chat-info').style.display = 'none';
    document.querySelector('.chat-actions').style.display = 'none';
    
    // Mostrar mensagem de estado vazio
    chatMessages.innerHTML = `
        <div class="empty-chat-state">
            <div class="empty-chat-icon">
                <i class="bi bi-chat-dots"></i>
            </div>
            <h3>Nenhuma conversa iniciada</h3>
            <p>Inicie uma conversa com um vendedor para começar a negociar</p>
            <button class="btn-iniciar-conversa" id="btn-iniciar-conversa-modal">
                <i class="bi bi-plus-circle"></i> Iniciar Nova Conversa
            </button>
        </div>
    `;
    
    // Esconder input de mensagem
    document.querySelector('.chat-input').style.display = 'none';
    
    // Configurar evento do botão
    document.getElementById('btn-iniciar-conversa-modal').addEventListener('click', mostrarModalVendedores);
}

// Função para mostrar modal de seleção de vendedores
function mostrarModalVendedores() {
    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'modal-vendedores';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Escolha um vendedor</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="vendedores-lista">
                    ${Object.entries(vendedoresDisponiveis).map(([nome, info]) => `
                        <div class="vendedor-item" data-vendedor="${nome}">
                            <div class="vendedor-avatar">
                                <img src="${info.avatar}" alt="${nome}">
                                <span class="status ${info.status.toLowerCase()}"></span>
                            </div>
                            <div class="vendedor-info">
                                <h4>${nome}</h4>
                                <p>${info.status}</p>
                            </div>
                            <button class="btn-selecionar-vendedor">
                                <i class="bi bi-chat-dots"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Configurar eventos do modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Configurar seleção de vendedores
    modal.querySelectorAll('.vendedor-item, .btn-selecionar-vendedor').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const vendedorItem = e.target.closest('.vendedor-item');
            const nomeVendedor = vendedorItem.getAttribute('data-vendedor');
            iniciarNovaConversa(nomeVendedor);
            modal.remove();
        });
    });
}

// Função para iniciar nova conversa
// Atualize a função iniciarNovaConversa no chat_com_vendedor.js

function iniciarNovaConversa(nomeVendedor) {
    const conversas = JSON.parse(localStorage.getItem('conversas')) || [];
    const conversaExistente = conversas.find(conv => conv.vendedor === nomeVendedor);
    
    if (!conversaExistente) {
        const vendedorInfo = obterInfoVendedor(nomeVendedor);
        
        // Mensagem inicial baseada no tipo de vendedor
        let mensagemInicial = "Olá! Como posso ajudar?";
        if (nomeVendedor.includes('Brechó')) {
            mensagemInicial = "Olá! Tenho ótimas peças para você. Como posso ajudar?";
        } else if (nomeVendedor.includes('Casa')) {
            mensagemInicial = "Olá! Posso ajudar com produtos para casa. O que procura?";
        } else if (nomeVendedor.includes('Moda')) {
            mensagemInicial = "Olá! Trabalhamos com moda feminina. Posso ajudar?";
        }
        
        // Criar nova conversa
        const novaConversa = {
            id: gerarIdConversa(),
            vendedor: nomeVendedor,
            avatar: vendedorInfo.avatar,
            ultimaMensagem: mensagemInicial,
            tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            mensagens: [
                { 
                    remetente: "vendedor", 
                    texto: mensagemInicial, 
                    tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }
            ],
            naoLida: true,
            dataCriacao: new Date().toISOString()
        };
        
        conversas.unshift(novaConversa);
        salvarConversas();
    }
    
    // Recarregar lista e mostrar a conversa
    carregarListaConversas();
    carregarConversa(nomeVendedor);
}

// Função para gerar ID único para conversa
function gerarIdConversa() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Função para carregar lista de conversas
function carregarListaConversas() {
    const chatList = document.querySelector('.chat-list');
    
    if (conversas.length === 0) {
        chatList.innerHTML = `
            <div class="empty-conversations">
                <i class="bi bi-chat-square"></i>
                <p>Nenhuma conversa</p>
            </div>
        `;
        return;
    }
    
    chatList.innerHTML = conversas.map(conversa => {
        const vendedorInfo = vendedoresDisponiveis[conversa.vendedor];
        const ultimaMensagem = conversa.mensagens[conversa.mensagens.length - 1];
        
        return `
            <div class="chat-item" data-chat-id="${conversa.id}" data-vendedor="${conversa.vendedor}">
                <div class="chat-avatar">
                    <img src="${vendedorInfo.avatar}" alt="${conversa.vendedor}">
                    ${conversa.naoLida ? '<span class="notification-badge"></span>' : ''}
                </div>
                <div class="chat-info">
                    <h4>${conversa.vendedor}</h4>
                    <p>${ultimaMensagem.texto}</p>
                    <span class="chat-time">${conversa.tempo}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Função para carregar conversa específica
function carregarConversa(nomeVendedor) {
    const conversa = conversas.find(conv => conv.vendedor === nomeVendedor);
    if (!conversa) return;
    
    const vendedorInfo = vendedoresDisponiveis[nomeVendedor];
    
    // Atualizar header do chat
    document.getElementById('current-avatar').src = vendedorInfo.avatar;
    document.getElementById('current-avatar').alt = nomeVendedor;
    document.getElementById('current-chat-name').textContent = nomeVendedor;
    document.getElementById('current-chat-status').textContent = vendedorInfo.status;
    
    // Carregar mensagens
    carregarMensagens(conversa.mensagens);
    
    // Atualizar estado ativo na lista
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-vendedor') === nomeVendedor) {
            item.classList.add('active');
        }
    });
    
    // Marcar como lida
    conversa.naoLida = false;
    salvarConversas();
    carregarListaConversas();
}

// Função para carregar mensagens
function carregarMensagens(mensagens) {
    const chatMessages = document.getElementById('chat-messages-container');
    
    chatMessages.innerHTML = mensagens.map(msg => `
        <div class="message ${msg.remetente === 'usuario' ? 'sent' : 'received'}">
            <div class="message-content">
                <p>${msg.texto}</p>
                <span class="message-time">${msg.tempo}</span>
            </div>
        </div>
    `).join('');
    
    // Scroll para baixo
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para enviar mensagem
function enviarMensagem() {
    const input = document.getElementById('message-input');
    const mensagemTexto = input.value.trim();
    
    if (!mensagemTexto) return;
    
    const chatAtivo = document.querySelector('.chat-item.active');
    if (!chatAtivo) return;
    
    const nomeVendedor = chatAtivo.getAttribute('data-vendedor');
    const conversa = conversas.find(conv => conv.vendedor === nomeVendedor);
    
    if (!conversa) return;
    
    // Adicionar mensagem
    const novaMensagem = {
        remetente: "usuario",
        texto: mensagemTexto,
        tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    conversa.mensagens.push(novaMensagem);
    conversa.ultimaMensagem = mensagemTexto;
    conversa.tempo = novaMensagem.tempo;
    
    // Simular resposta automática após 2 segundos
    setTimeout(() => {
        const respostas = [
            "Obrigado pela mensagem! Retornarei em breve.",
            "Entendi sua dúvida. Deixe me verificar isso para você.",
            "Podemos combinar isso! Tem mais alguma pergunta?",
            "Excelente pergunta! Vou verificar as informações."
        ];
        
        const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];
        
        const resposta = {
            remetente: "vendedor",
            texto: respostaAleatoria,
            tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        conversa.mensagens.push(resposta);
        conversa.ultimaMensagem = resposta.texto;
        conversa.tempo = resposta.tempo;
        
        salvarConversas();
        carregarListaConversas();
        
        // Recarregar mensagens se esta conversa estiver ativa
        const chatAtual = document.querySelector('.chat-item.active');
        if (chatAtual && chatAtual.getAttribute('data-vendedor') === nomeVendedor) {
            carregarMensagens(conversa.mensagens);
        }
    }, 2000);
    
    salvarConversas();
    carregarListaConversas();
    carregarMensagens(conversa.mensagens);
    
    // Limpar input
    input.value = '';
}

// Função para salvar conversas no localStorage
function salvarConversas() {
    localStorage.setItem('conversas', JSON.stringify(conversas));
}

// Função para configurar event listeners
function configurarEventListeners() {
    // Buscar conversas
    document.querySelector('.chat-search input').addEventListener('input', function(e) {
        const termo = e.target.value.toLowerCase();
        document.querySelectorAll('.chat-item').forEach(item => {
            const nomeVendedor = item.querySelector('h4').textContent.toLowerCase();
            item.style.display = nomeVendedor.includes(termo) ? 'flex' : 'none';
        });
    });
    
    // Selecionar conversa
    document.querySelector('.chat-list').addEventListener('click', function(e) {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const nomeVendedor = chatItem.getAttribute('data-vendedor');
            carregarConversa(nomeVendedor);
            
            // Mostrar elementos do chat
            document.querySelector('.current-chat-info').style.display = 'flex';
            document.querySelector('.chat-actions').style.display = 'flex';
            document.querySelector('.chat-input').style.display = 'flex';
        }
    });
    
    // Enviar mensagem com botão
    document.getElementById('send-button').addEventListener('click', enviarMensagem);
    
    // Enviar mensagem com Enter
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    });
    
    // Botão de iniciar conversa no sidebar (se existir)
    const btnIniciarSidebar = document.querySelector('.btn-iniciar-conversa-sidebar');
    if (btnIniciarSidebar) {
        btnIniciarSidebar.addEventListener('click', mostrarModalVendedores);
    }
}

// Função para verificar se veio do perfil do vendedor
function verificarOrigemPerfil() {
    const urlParams = new URLSearchParams(window.location.search);
    const vendedorParam = urlParams.get('vendedor');
    
    if (vendedorParam) {
        // Iniciar conversa automaticamente com o vendedor do parâmetro
        iniciarNovaConversa(vendedorParam);
        
        // Limpar parâmetro da URL
        const novaUrl = window.location.pathname;
        window.history.replaceState({}, '', novaUrl);
    }
}

// Função para verificar se veio do perfil do vendedor
function verificarOrigemPerfil() {
    const urlParams = new URLSearchParams(window.location.search);
    const vendedorParam = urlParams.get('vendedor');
    
    if (vendedorParam) {
        // Verificar se a conversa já foi criada no perfil
        const conversas = JSON.parse(localStorage.getItem('conversas')) || [];
        const conversaExistente = conversas.find(conv => conv.vendedor === vendedorParam);
        
        if (conversaExistente) {
            // Se a conversa já existe (foi criada no perfil), apenas carregar
            console.log(`Carregando conversa existente com: ${vendedorParam}`);
            carregarConversa(vendedorParam);
        } else {
            // Se não existe, criar uma nova (fallback)
            console.log(`Criando nova conversa com: ${vendedorParam}`);
            iniciarNovaConversa(vendedorParam);
        }
        
        // Limpar parâmetro da URL (opcional - mantém o histórico limpo)
        setTimeout(() => {
            const novaUrl = window.location.pathname;
            window.history.replaceState({}, '', novaUrl);
        }, 1000);
    }
}

// Função para obter informações do vendedor (adicione esta função)
function obterInfoVendedor(nomeVendedor) {
    const vendedoresBase = {
        "Brechó Elegante": {
            nome: "Brechó Elegante",
            avatar: "IMG/vendedor-brecho-elegante.jpg",
            status: "Online"
        },
        "Casa Usada": {
            nome: "Casa Usada", 
            avatar: "IMG/vendedor-casa-usada.jpg",
            status: "Online"
        },
        "Brechó Sustentável": {
            nome: "Brechó Sustentável",
            avatar: "IMG/vendedor-brecho-sustentavel.jpg", 
            status: "Online"
        },
        "Moda Circular": {
            nome: "Moda Circular",
            avatar: "IMG/vendedor-moda-circular.jpg",
            status: "Online"
        }
    };
    
    return vendedoresBase[nomeVendedor] || {
        nome: nomeVendedor,
        avatar: "IMG/placeholder-vendedor.jpg",
        status: "Online"
    };
}

// Atualize a função carregarConversa para usar as informações do localStorage
function carregarConversa(nomeVendedor) {
    const conversas = JSON.parse(localStorage.getItem('conversas')) || [];
    const conversa = conversas.find(conv => conv.vendedor === nomeVendedor);
    
    if (!conversa) {
        console.log(`Conversa não encontrada para: ${nomeVendedor}`);
        return;
    }
    
    // Usar avatar da conversa salva ou obter das informações base
    const vendedorInfo = obterInfoVendedor(nomeVendedor);
    const avatar = conversa.avatar || vendedorInfo.avatar;
    
    // Atualizar header do chat
    document.getElementById('current-avatar').src = avatar;
    document.getElementById('current-avatar').alt = nomeVendedor;
    document.getElementById('current-chat-name').textContent = nomeVendedor;
    document.getElementById('current-chat-status').textContent = vendedorInfo.status;
    
    // Carregar mensagens
    carregarMensagens(conversa.mensagens);
    
    // Atualizar estado ativo na lista
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-vendedor') === nomeVendedor) {
            item.classList.add('active');
        }
    });
    
    // Marcar como lida
    conversa.naoLida = false;
    salvarConversas();
    carregarListaConversas();
    
    // Mostrar elementos do chat
    document.querySelector('.current-chat-info').style.display = 'flex';
    document.querySelector('.chat-actions').style.display = 'flex';
    document.querySelector('.chat-input').style.display = 'flex';
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarChat();
    verificarOrigemPerfil();
});