        // ============ SISTEMA DE ARMAZENAMENTO COMPATÍVEL ============
        
        // Função para obter produtos do localStorage (compatível com vendedor-produtos.js)
        function obterProdutos() {
            const produtosSalvos = localStorage.getItem('produtosCasaUsada');
            return produtosSalvos ? JSON.parse(produtosSalvos) : {};
        }

        // Função para salvar produtos no localStorage
        function salvarProdutos(produtos) {
            localStorage.setItem('produtosCasaUsada', JSON.stringify(produtos));
            // Disparar evento personalizado para sincronização
            window.dispatchEvent(new Event('produtosAtualizados'));
        }

        // Função para gerar ID único para o produto
        function gerarIdUnico() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        // Função para mostrar notificações
        function mostrarNotificacao(mensagem, tipo = 'info') {
            try {
                // Criar elemento de notificação
                const notification = document.createElement('div');
                notification.className = `alert-notification alert-${tipo}`;
                notification.innerHTML = `
                    <i class="bi bi-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    ${mensagem}
                `;
                
                document.body.appendChild(notification);
                
                // Animação de entrada
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                    notification.style.opacity = '1';
                }, 100);
                
                // Remover após 3 segundos
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
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

        // ============ VALIDAÇÃO E PROCESSAMENTO DO FORMULÁRIO ============

        // Função para exibir mensagem de erro abaixo do campo
        function mostrarErro(campoId, mensagem) {
            const errorElement = document.getElementById(`${campoId}-error`);
            if (errorElement) {
                errorElement.textContent = mensagem;
                errorElement.style.display = 'block';
                
                // Adicionar classe de erro ao campo
                const campo = document.getElementById(campoId);
                if (campo) {
                    campo.classList.add('campo-erro');
                }
            }
        }

        // Função para limpar mensagem de erro
        function limparErro(campoId) {
            const errorElement = document.getElementById(`${campoId}-error`);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                
                // Remover classe de erro do campo
                const campo = document.getElementById(campoId);
                if (campo) {
                    campo.classList.remove('campo-erro');
                }
            }
        }

        // Função para validar um campo específico
        function validarCampo(campoId, tipoValidacao) {
            const campo = document.getElementById(campoId);
            const valor = campo.value.trim();
            
            // Limpar erro anterior
            limparErro(campoId);
            
            // Validações específicas por tipo
            switch(tipoValidacao) {
                case 'obrigatorio':
                    if (!valor) {
                        mostrarErro(campoId, 'Este campo é obrigatório');
                        return false;
                    }
                    break;
                    
                case 'numero':
                    if (!valor) {
                        mostrarErro(campoId, 'Este campo é obrigatório');
                        return false;
                    }
                    if (isNaN(valor) || parseFloat(valor) <= 0) {
                        mostrarErro(campoId, 'Digite um valor válido maior que zero');
                        return false;
                    }
                    break;
                    
                case 'quantidade':
                    if (!valor) {
                        mostrarErro(campoId, 'Este campo é obrigatório');
                        return false;
                    }
                    if (isNaN(valor) || parseInt(valor) < 1) {
                        mostrarErro(campoId, 'Digite uma quantidade válida (mínimo 1)');
                        return false;
                    }
                    break;
                    
                case 'select':
                    if (!valor) {
                        mostrarErro(campoId, 'Selecione uma opção');
                        return false;
                    }
                    break;
                    
                case 'imagem':
                    const arquivo = campo.files[0];
                    if (!arquivo) {
                        mostrarErro(campoId, 'A imagem principal é obrigatória');
                        return false;
                    }
                    // Validar tipo de arquivo
                    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                    if (!tiposPermitidos.includes(arquivo.type)) {
                        mostrarErro(campoId, 'Formato de imagem não suportado. Use JPG, PNG, GIF ou WebP');
                        return false;
                    }
                    // Validar tamanho do arquivo (máximo 5MB)
                    if (arquivo.size > 5 * 1024 * 1024) {
                        mostrarErro(campoId, 'A imagem deve ter no máximo 5MB');
                        return false;
                    }
                    break;
            }
            
            return true;
        }

        // Função para validar todo o formulário
        function validarFormulario() {
            let valido = true;
            
            // Validar campos obrigatórios
            const camposObrigatorios = [
                { id: 'nome-produto', tipo: 'obrigatorio' },
                { id: 'descricao-produto', tipo: 'obrigatorio' },
                { id: 'categoria-produto', tipo: 'select' },
                { id: 'condicao-produto', tipo: 'select' },
                { id: 'preco-produto', tipo: 'numero' },
                { id: 'quantidade-produto', tipo: 'quantidade' },
                { id: 'imagem-principal', tipo: 'imagem' }
            ];
            
            camposObrigatorios.forEach(campo => {
                if (!validarCampo(campo.id, campo.tipo)) {
                    valido = false;
                }
            });
            
            return valido;
        }

        // Validação em tempo real para campos obrigatórios
        document.addEventListener('DOMContentLoaded', function() {
            // Adicionar eventos de validação em tempo real
            const camposValidacao = [
                'nome-produto', 'descricao-produto', 'categoria-produto', 
                'condicao-produto', 'preco-produto', 'quantidade-produto'
            ];
            
            camposValidacao.forEach(campoId => {
                const campo = document.getElementById(campoId);
                if (campo) {
                    campo.addEventListener('blur', function() {
                        // Determinar tipo de validação baseado no campo
                        let tipo = 'obrigatorio';
                        if (campoId === 'preco-produto') tipo = 'numero';
                        if (campoId === 'quantidade-produto') tipo = 'quantidade';
                        if (campoId.includes('categoria') || campoId.includes('condicao')) tipo = 'select';
                        
                        validarCampo(campoId, tipo);
                    });
                    
                    // Limpar erro ao começar a digitar
                    campo.addEventListener('input', function() {
                        limparErro(campoId);
                    });
                }
            });
            
            // Validação especial para imagem
            const imagemPrincipal = document.getElementById('imagem-principal');
            if (imagemPrincipal) {
                imagemPrincipal.addEventListener('change', function() {
                    validarCampo('imagem-principal', 'imagem');
                });
            }
        });

        // Validação do formulário
        document.getElementById('produto-form').addEventListener('submit', function (e) {
            e.preventDefault();

            // Validar formulário
            if (!validarFormulario()) {
                mostrarNotificacao('Por favor, corrija os erros no formulário.', 'error');
                return;
            }

            // Processar informações adicionais
            const informacoes = document.getElementById('informacoes-produto').value;
            const informacoesArray = informacoes ? informacoes.split('\n').filter(info => info.trim() !== '') : [];

            // Processar medidas
            const medidas = document.getElementById('medidas-produto').value;
            const medidasArray = medidas ? medidas.split(',').map(medida => medida.trim()) : [];

            // Calcular preço parcelado
            const parcelas = parseInt(document.getElementById('parcelas-produto').value);
            const precoParcelado = parcelas > 1 ? parseFloat(document.getElementById('preco-produto').value) / parcelas : parseFloat(document.getElementById('preco-produto').value);

            // Criar objeto do produto com estrutura compatível
            const novoProduto = {
                id: gerarIdUnico(),
                nome: document.getElementById('nome-produto').value,
                descricao: document.getElementById('descricao-produto').value,
                categoria: document.getElementById('categoria-produto').value,
                condicao: document.getElementById('condicao-produto').value,
                precoVista: parseFloat(document.getElementById('preco-produto').value),
                precoParcelado: precoParcelado,
                parcelas: parcelas,
                quantidade: parseInt(document.getElementById('quantidade-produto').value),
                marca: document.getElementById('marca-produto').value || 'Sem marca',
                medidas: medidasArray,
                informacoes: informacoesArray,
                vendedor: "Casa Usada",
                status: "Disponível",
                dataCadastro: new Date().toISOString(),
                // Imagem padrão (será substituída quando implementar upload real)
                imagem: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgyMFYzMEgzMFYyMFpNMzIgMzJIMThWMTguMDAwMUgzMlYzMlpNMzIgMzJIMThWMTguMDAwMUgzMlYzMloiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+"
            };

            // Salvar produto no localStorage
            salvarProduto(novoProduto);

            // Mensagem de sucesso
            mostrarNotificacao('Produto cadastrado com sucesso!', 'success');

            // Redirecionar para a página de produtos após 1.5 segundos
            setTimeout(() => {
                window.location.href = 'meus_produtos.html';
            }, 1500);
        });

        // Função para salvar produto no localStorage (compatível)
        function salvarProduto(produto) {
            let produtos = obterProdutos();
            produtos[produto.id] = produto;
            salvarProdutos(produtos);
        }

        // Cancelar e voltar
        document.getElementById('cancelar-btn').addEventListener('click', function () {
            if (confirm('Tem certeza que deseja cancelar? Todas as informações não salvas serão perdidas.')) {
                window.location.href = 'vendedor.html';
            }
        });

        // Preview de imagem (funcionalidade básica)
        const imageInputs = document.querySelectorAll('input[type="file"]');
        imageInputs.forEach(input => {
            input.addEventListener('change', function () {
                const box = this.parentElement;
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        box.style.backgroundImage = `url(${e.target.result})`;
                        box.querySelector('i').style.display = 'none';
                        box.querySelector('p').style.display = 'none';
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });
        });

        // Inicializar quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Sistema de adição de produtos inicializado!');
        });