// modal_denuncia-2.js - Funcionalidades do modal de denúncia para perfil do vendedor (Design Melhorado com Scroll)

// Função para adicionar estilos CSS dinamicamente para o modal do perfil
function adicionarEstilosModalPerfil() {
    const estilos = `
        /* ================ MODAL DE DENÚNCIA DO PERFIL - DESIGN MELHORADO ================ */
        .modal-denuncia-perfil {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            animation: fadeInModal 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            overflow-y: auto;
            padding: 20px 0;
        }

        .modal-denuncia-perfil .modal-conteudo {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            margin: 2% auto;
            padding: 0;
            border-radius: 20px;
            width: 90%;
            max-width: 520px;
            box-shadow: 
                0 20px 60px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1);
            animation: slideUpModal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            position: relative;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }

        /* Efeito de brilho no topo */
        .modal-denuncia-perfil .modal-conteudo::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b6b, #ff8e8e, #ff6b6b);
            background-size: 200% 100%;
            animation: shimmer 3s infinite linear;
            z-index: 2;
        }

        .modal-denuncia-perfil .modal-cabecalho {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 30px 20px;
            background: linear-gradient(135deg, #fff5f5 0%, #ffeaea 100%);
            border-bottom: 1px solid #ffebee;
            position: relative;
            flex-shrink: 0;
        }

        .modal-denuncia-perfil .modal-cabecalho h2 {
            margin: 0;
            color: #d32f2f;
            font-size: 1.6em;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .modal-denuncia-perfil .modal-cabecalho h2::before {
            content: '🚩';
            font-size: 1.3em;
        }

        .modal-denuncia-perfil .fechar-modal {
            background: rgba(211, 47, 47, 0.1);
            border: none;
            font-size: 22px;
            cursor: pointer;
            color: #d32f2f;
            padding: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: bold;
            flex-shrink: 0;
        }

        .modal-denuncia-perfil .fechar-modal:hover {
            background: #d32f2f;
            color: white;
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
        }

        .modal-denuncia-perfil .modal-corpo {
            padding: 30px;
            overflow-y: auto;
            flex: 1;
            max-height: calc(90vh - 140px);
        }

        /* Custom scrollbar para o modal */
        .modal-denuncia-perfil .modal-corpo::-webkit-scrollbar {
            width: 6px;
        }

        .modal-denuncia-perfil .modal-corpo::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        .modal-denuncia-perfil .modal-corpo::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #ff6b6b, #d32f2f);
            border-radius: 10px;
            transition: background 0.3s ease;
        }

        .modal-denuncia-perfil .modal-corpo::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #d32f2f, #b71c1c);
        }

        /* Indicador de scroll */
        .scroll-indicator {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 107, 107, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8em;
            display: none;
            align-items: center;
            gap: 8px;
            animation: bounce 2s infinite;
            z-index: 1;
        }

        .scroll-indicator.show {
            display: flex;
        }

        .scroll-indicator i {
            font-size: 1.1em;
        }

        /* Informações do vendedor sendo denunciado */
        .vendedor-info-denuncia {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 25px;
            border: 1px solid #e0e0e0;
            position: relative;
            overflow: hidden;
        }

        .vendedor-info-denuncia::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(180deg, #ff6b6b, #d32f2f);
        }

        .vendedor-info-denuncia h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 1.1em;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .vendedor-info-denuncia h3::before {
            content: '👤';
            font-size: 1.1em;
        }

        .vendedor-detalhes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 12px;
        }

        .vendedor-detalhe-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9em;
            color: #666;
        }

        .vendedor-detalhe-item i {
            color: #ff6b6b;
            font-size: 1.1em;
        }

        /* Campos do formulário */
        .campo-formulario {
            margin-bottom: 24px;
            position: relative;
        }

        .campo-formulario label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #333;
            font-size: 0.95em;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .campo-formulario label::after {
            content: '*';
            color: #d32f2f;
            font-weight: bold;
            margin-left: 2px;
        }

        .campo-formulario.optional label::after {
            content: '';
        }

        .campo-formulario select,
        .campo-formulario textarea,
        .campo-formulario input {
            width: 100%;
            padding: 16px 18px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-sizing: border-box;
            background: white;
            font-family: inherit;
        }

        .campo-formulario select:focus,
        .campo-formulario textarea:focus,
        .campo-formulario input:focus {
            outline: none;
            border-color: #ff6b6b;
            box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
            transform: translateY(-2px);
        }

        .campo-formulario select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 16px center;
            background-size: 16px;
            padding-right: 50px;
        }

        .campo-formulario textarea {
            height: 120px;
            resize: vertical;
            line-height: 1.5;
            min-height: 120px;
            max-height: 200px;
        }

        .contador-caracteres {
            text-align: right;
            font-size: 0.8em;
            color: #999;
            margin-top: 6px;
        }

        .contador-caracteres.aviso {
            color: #ff6b6b;
            font-weight: 600;
        }

        /* Mensagens de erro - INICIALMENTE OCULTAS */
        .mensagem-erro {
            color: #d32f2f;
            font-size: 0.85em;
            margin-top: 8px;
            display: none;
            animation: shakeError 0.5s ease-in-out;
            background: rgba(211, 47, 47, 0.05);
            padding: 10px 12px;
            border-radius: 8px;
            border-left: 3px solid #d32f2f;
            align-items: center;
            gap: 8px;
        }

        .mensagem-erro.mostrar {
            display: flex;
        }

        .campo-invalido {
            border-color: #d32f2f !important;
            box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1) !important;
            animation: pulseError 0.5s ease-in-out;
        }

        /* Ações do modal */
        .acoes-modal {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #f0f0f0;
            flex-shrink: 0;
        }

        .btn-cancelar {
            background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.2);
        }

        .btn-cancelar:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3);
            background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
        }

        .btn-enviar {
            background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3);
            position: relative;
            overflow: hidden;
        }

        .btn-enviar::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .btn-enviar:hover::before {
            left: 100%;
        }

        .btn-enviar:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(211, 47, 47, 0.4);
            background: linear-gradient(135deg, #b71c1c 0%, #8b0000 100%);
        }

        .btn-enviar:disabled {
            background: linear-gradient(135deg, #cccccc 0%, #aaaaaa 100%);
            cursor: not-allowed;
            transform: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-enviar.carregando {
            color: transparent;
        }

        .btn-enviar.carregando::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin-left: -10px;
            margin-top: -10px;
            border: 2px solid transparent;
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* Mensagem de sucesso PERSONALIZADA */
        .mensagem-sucesso {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            padding: 30px;
            border-radius: 16px;
            margin: 20px 0;
            border: 1px solid #c3e6cb;
            display: none;
            align-items: center;
            gap: 15px;
            animation: slideDownSuccess 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            text-align: center;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.15);
        }

        .mensagem-sucesso::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #28a745, #20c997, #28a745);
            background-size: 200% 100%;
            animation: shimmer 2s infinite linear;
        }

        .mensagem-sucesso.mostrar {
            display: flex;
        }

        .icone-sucesso {
            color: #28a745;
            font-size: 3.5em;
            animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            margin-bottom: 10px;
        }

        .mensagem-sucesso-conteudo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .mensagem-sucesso-conteudo strong {
            font-size: 1.3em;
            margin-bottom: 5px;
            color: #155724;
        }

        .mensagem-sucesso-conteudo .subtitulo {
            font-size: 1em;
            opacity: 0.9;
            margin-bottom: 5px;
        }

        .mensagem-sucesso-conteudo .detalhe {
            font-size: 0.9em;
            opacity: 0.8;
            line-height: 1.4;
        }

        .badge-sucesso {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: 600;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
        }

        /* Botão de denúncia na página */
        .btn-denuncia {
            background: linear-gradient(135deg, #ff6b6b 0%, #d32f2f 100%);
            color: white;
            border: none;
            padding: 14px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            font-size: 14px;
            position: relative;
            overflow: hidden;
        }

        .btn-denuncia::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .btn-denuncia:hover::before {
            left: 100%;
        }

        .btn-denuncia:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
            background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
        }

        .vendedor-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        /* Animações */
        @keyframes fadeInModal {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUpModal {
            from { 
                opacity: 0;
                transform: translateY(50px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes shakeError {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        @keyframes pulseError {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }

        @keyframes slideDownSuccess {
            0% {
                opacity: 0;
                transform: translateY(-20px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-5px);
            }
            60% {
                transform: translateX(-50%) translateY(-3px);
            }
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .modal-denuncia-perfil {
                padding: 10px 0;
            }

            .modal-denuncia-perfil .modal-conteudo {
                margin: 5% auto;
                width: 95%;
                border-radius: 16px;
                max-height: 85vh;
            }

            .modal-denuncia-perfil .modal-cabecalho {
                padding: 20px 20px 15px;
            }

            .modal-denuncia-perfil .modal-corpo {
                padding: 20px;
                max-height: calc(85vh - 120px);
            }

            .vendedor-detalhes {
                grid-template-columns: 1fr;
            }

            .acoes-modal {
                flex-direction: column;
            }

            .btn-cancelar,
            .btn-enviar {
                width: 100%;
                justify-content: center;
            }

            .vendedor-actions {
                flex-direction: column;
            }

            .btn-denuncia {
                width: 100%;
                justify-content: center;
            }

            .scroll-indicator {
                display: none !important;
            }

            .mensagem-sucesso {
                padding: 25px 20px;
            }

            .icone-sucesso {
                font-size: 3em;
            }
        }

        @media (max-width: 480px) {
            .modal-denuncia-perfil .modal-conteudo {
                margin: 10% auto;
            }

            .campo-formulario select,
            .campo-formulario textarea,
            .campo-formulario input {
                padding: 14px 16px;
            }

            .modal-denuncia-perfil .modal-corpo {
                max-height: calc(80vh - 120px);
            }

            .mensagem-sucesso {
                padding: 20px 15px;
            }

            .icone-sucesso {
                font-size: 2.5em;
            }
        }

        @media (max-height: 700px) {
            .modal-denuncia-perfil .modal-conteudo {
                max-height: 85vh;
            }

            .modal-denuncia-perfil .modal-corpo {
                max-height: calc(85vh - 140px);
            }

            .campo-formulario textarea {
                height: 100px;
                min-height: 100px;
            }
        }

        @media (max-height: 600px) {
            .modal-denuncia-perfil .modal-conteudo {
                max-height: 80vh;
            }

            .modal-denuncia-perfil .modal-corpo {
                max-height: calc(80vh - 140px);
            }

            .campo-formulario {
                margin-bottom: 18px;
            }

            .campo-formulario textarea {
                height: 80px;
                min-height: 80px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);
}

// Função para criar o HTML do modal de denúncia do perfil
function criarModalDenunciaPerfil() {
    const modalHTML = `
        <div id="modal-denuncia-perfil" class="modal-denuncia-perfil">
            <div class="modal-conteudo">
                <div class="modal-cabecalho">
                    <h2>Denunciar Vendedor</h2>
                    <button class="fechar-modal" aria-label="Fechar modal">&times;</button>
                </div>
                <div class="modal-corpo">
                    <!-- Indicador de scroll -->
                    <div class="scroll-indicator" id="scroll-indicator">
                        <i class="bi bi-chevron-down"></i>
                        Role para ver mais
                    </div>

                    <!-- Informações do vendedor -->
                    <div class="vendedor-info-denuncia">
                        <h3>Você está denunciando:</h3>
                        <div class="vendedor-detalhes">
                            <div class="vendedor-detalhe-item">
                                <i class="bi bi-person"></i>
                                <span id="vendedor-nome-denuncia">Carregando...</span>
                            </div>
                            <div class="vendedor-detalhe-item">
                                <i class="bi bi-geo-alt"></i>
                                <span id="vendedor-localizacao-denuncia">Carregando...</span>
                            </div>
                            <div class="vendedor-detalhe-item">
                                <i class="bi bi-star"></i>
                                <span id="vendedor-avaliacao-denuncia">Carregando...</span>
                            </div>
                            <div class="vendedor-detalhe-item">
                                <i class="bi bi-bag"></i>
                                <span id="vendedor-vendas-denuncia">Carregando...</span>
                            </div>
                        </div>
                    </div>

                    <!-- MENSAGEM DE SUCESSO PERSONALIZADA -->
                    <div id="mensagem-sucesso-perfil" class="mensagem-sucesso">
                        <i class="bi bi-check-circle-fill icone-sucesso"></i>
                        <div class="mensagem-sucesso-conteudo">
                            <strong>Denúncia Registrada com Sucesso!</strong>
                            <div class="subtitulo">Obrigado por contribuir com a segurança da nossa comunidade</div>
                            <div class="detalhe">
                                Nossa equipe de moderação analisará sua denúncia em até <strong>24 horas</strong> e tomará as medidas necessárias.
                            </div>
                            <div class="badge-sucesso">
                                <i class="bi bi-shield-check"></i> Protegendo Nossa Comunidade
                            </div>
                        </div>
                    </div>

                    <form id="form-denuncia-perfil">
                        <div class="campo-formulario">
                            <label for="motivo-denuncia-perfil">
                                <i class="bi bi-exclamation-triangle"></i>
                                Motivo da Denúncia
                            </label>
                            <select id="motivo-denuncia-perfil" required>
                                <option value="">Selecione o motivo principal</option>
                                <option value="vendedor_ilegal">🔒 Vendedor Ilegal ou Fraudulento</option>
                                <option value="atendimento_ruim">💬 Mau Atendimento ao Cliente</option>
                                <option value="produtos_falsos">❌ Produtos Falsos ou Enganosos</option>
                                <option value="entregas_atrasadas">📦 Problemas com Entregas</option>
                                <option value="comportamento_improprio">🚫 Comportamento Impróprio</option>
                                <option value="precos_abusivos">💸 Preços Abusivos</option>
                                <option value="outro">📝 Outro Motivo</option>
                            </select>
                            <div id="erro-motivo-perfil" class="mensagem-erro">
                                <i class="bi bi-exclamation-circle"></i> 
                                Por favor, selecione um motivo para a denúncia.
                            </div>
                        </div>
                        
                        <div class="campo-formulario">
                            <label for="descricao-denuncia-perfil">
                                <i class="bi bi-chat-text"></i>
                                Descrição Detalhada
                            </label>
                            <textarea 
                                id="descricao-denuncia-perfil" 
                                placeholder="Descreva com detalhes o que aconteceu... 
• Qual foi o problema?
• Quando ocorreu?
• Como podemos ajudar?
                                
Se possível, inclua provas como prints ou documentos." 
                                required
                                maxlength="1000"
                            ></textarea>
                            <div class="contador-caracteres" id="contador-descricao-perfil">
                                <span id="contador-atual">0</span>/1000 caracteres
                            </div>
                            <div id="erro-descricao-perfil" class="mensagem-erro">
                                <i class="bi bi-exclamation-circle"></i> 
                                Por favor, forneça uma descrição detalhada da denúncia (mínimo 10 caracteres).
                            </div>
                        </div>
                        
                        <div class="campo-formulario optional">
                            <label for="email-denuncia-perfil">
                                <i class="bi bi-envelope"></i>
                                Seu E-mail (para contato)
                            </label>
                            <input 
                                type="email" 
                                id="email-denuncia-perfil" 
                                placeholder="seu@email.com (opcional)"
                            >
                            <div id="erro-email-perfil" class="mensagem-erro">
                                <i class="bi bi-exclamation-circle"></i> 
                                Por favor, insira um e-mail válido.
                            </div>
                        </div>
                        
                        <div class="acoes-modal">
                            <button type="button" class="btn-cancelar">
                                <i class="bi bi-x-circle"></i> Cancelar
                            </button>
                            <button type="submit" class="btn-enviar" id="btn-enviar-denuncia-perfil">
                                <i class="bi bi-send"></i> Enviar Denúncia
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Função para gerenciar o scroll do modal
function gerenciarScrollModal() {
    const modalCorpo = document.querySelector('.modal-denuncia-perfil .modal-corpo');
    const scrollIndicator = document.getElementById('scroll-indicator');
    
    if (!modalCorpo || !scrollIndicator) return;
    
    const verificarScroll = () => {
        const scrollTop = modalCorpo.scrollTop;
        const scrollHeight = modalCorpo.scrollHeight;
        const clientHeight = modalCorpo.clientHeight;
        
        // Mostrar indicador apenas se houver conteúdo para scroll
        if (scrollHeight > clientHeight + 50) {
            // Esconder indicador quando o usuário chegar perto do final
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                scrollIndicator.classList.remove('show');
            } else {
                scrollIndicator.classList.add('show');
            }
        } else {
            scrollIndicator.classList.remove('show');
        }
    };
    
    // Verificar scroll inicial
    verificarScroll();
    
    // Adicionar event listener para scroll
    modalCorpo.addEventListener('scroll', verificarScroll);
    
    // Verificar também quando o modal for redimensionado
    const observer = new ResizeObserver(verificarScroll);
    observer.observe(modalCorpo);
}

// Função para abrir o modal de denúncia do perfil
function abrirModalDenunciaPerfil() {
    const modal = document.getElementById('modal-denuncia-perfil');
    if (modal) {
        // Atualizar informações do vendedor no modal
        atualizarInformacoesVendedor();
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Inicializar gerenciamento de scroll
        setTimeout(() => {
            gerenciarScrollModal();
        }, 100);
        
        // Focar no primeiro campo
        setTimeout(() => {
            const primeiroCampo = document.getElementById('motivo-denuncia-perfil');
            if (primeiroCampo) {
                primeiroCampo.focus();
            }
        }, 200);
    }
}

// Função para atualizar informações do vendedor no modal
function atualizarInformacoesVendedor() {
    const vendedorNome = document.getElementById('vendedor-nome');
    const vendedorLocalizacao = document.getElementById('vendedor-localizacao');
    const vendedorNota = document.getElementById('vendedor-nota');
    const vendedorVendas = document.getElementById('vendedor-vendas');
    
    if (vendedorNome) {
        document.getElementById('vendedor-nome-denuncia').textContent = vendedorNome.textContent;
    }
    if (vendedorLocalizacao) {
        document.getElementById('vendedor-localizacao-denuncia').textContent = vendedorLocalizacao.textContent;
    }
    if (vendedorNota) {
        document.getElementById('vendedor-avaliacao-denuncia').textContent = `${vendedorNota.textContent}/5.0`;
    }
    if (vendedorVendas) {
        document.getElementById('vendedor-vendas-denuncia').textContent = `${vendedorVendas.textContent} vendas`;
    }
}

// Função para fechar o modal de denúncia do perfil
function fecharModalDenunciaPerfil() {
    const modal = document.getElementById('modal-denuncia-perfil');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetarFormularioDenunciaPerfil();
    }
}

// Função para mostrar erro em um campo específico (APENAS QUANDO HOUVER ERRO)
function mostrarErroPerfil(campoId, mensagemId, mostrar) {
    const campo = document.getElementById(campoId);
    const mensagemErro = document.getElementById(mensagemId);
    
    if (campo && mensagemErro) {
        if (mostrar) {
            campo.classList.add('campo-invalido');
            mensagemErro.classList.add('mostrar');
            
            campo.setAttribute('aria-invalid', 'true');
            campo.setAttribute('aria-describedby', mensagemId);
        } else {
            campo.classList.remove('campo-invalido');
            mensagemErro.classList.remove('mostrar');
            
            campo.removeAttribute('aria-invalid');
            campo.removeAttribute('aria-describedby');
        }
    }
}

// Função para validar e-mail
function validarEmailPerfil(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar formulário de denúncia do perfil
function validarFormularioDenunciaPerfil() {
    let valido = true;
    
    const motivo = document.getElementById('motivo-denuncia-perfil');
    const descricao = document.getElementById('descricao-denuncia-perfil');
    const email = document.getElementById('email-denuncia-perfil');
    
    if (!motivo || !descricao || !email) return false;
    
    const motivoValor = motivo.value;
    const descricaoValor = descricao.value.trim();
    const emailValor = email.value.trim();
    
    // VALIDAÇÃO DO MOTIVO - Mostrar erro apenas se estiver vazio
    if (!motivoValor) {
        mostrarErroPerfil('motivo-denuncia-perfil', 'erro-motivo-perfil', true);
        valido = false;
    } else {
        mostrarErroPerfil('motivo-denuncia-perfil', 'erro-motivo-perfil', false);
    }
    
    // VALIDAÇÃO DA DESCRIÇÃO - Mostrar erro apenas se estiver vazia ou muito curta
    if (!descricaoValor) {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', true);
        valido = false;
    } else if (descricaoValor.length < 10) {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', true);
        document.getElementById('erro-descricao-perfil').innerHTML = '<i class="bi bi-exclamation-circle"></i> A descrição deve ter pelo menos 10 caracteres.';
        valido = false;
    } else {
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', false);
    }
    
    // VALIDAÇÃO DO EMAIL - Mostrar erro apenas se estiver preenchido e for inválido
    if (emailValor && !validarEmailPerfil(emailValor)) {
        mostrarErroPerfil('email-denuncia-perfil', 'erro-email-perfil', true);
        valido = false;
    } else {
        mostrarErroPerfil('email-denuncia-perfil', 'erro-email-perfil', false);
    }
    
    return valido;
}

// Função para mostrar loading no botão
function mostrarLoadingPerfil(mostrar) {
    const btnEnviar = document.getElementById('btn-enviar-denuncia-perfil');
    if (btnEnviar) {
        if (mostrar) {
            btnEnviar.classList.add('carregando');
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '';
        } else {
            btnEnviar.classList.remove('carregando');
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = '<i class="bi bi-send"></i> Enviar Denúncia';
        }
    }
}

// Função para mostrar mensagem de sucesso PERSONALIZADA
function mostrarMensagemSucessoPerfil() {
    const mensagemSucesso = document.getElementById('mensagem-sucesso-perfil');
    const form = document.getElementById('form-denuncia-perfil');
    
    if (mensagemSucesso && form) {
        form.style.display = 'none';
        mensagemSucesso.classList.add('mostrar');
        
        mensagemSucesso.setAttribute('tabindex', '-1');
        mensagemSucesso.focus();
        
        // Fechar automaticamente após 4 segundos
        setTimeout(() => {
            fecharModalDenunciaPerfil();
        }, 4000);
    }
}

// Função para resetar o formulário (OCULTAR TODAS AS MENSAGENS DE ERRO)
function resetarFormularioDenunciaPerfil() {
    const form = document.getElementById('form-denuncia-perfil');
    if (form) {
        form.reset();
        form.style.display = 'block';
        
        const contador = document.getElementById('contador-atual');
        const contadorElement = document.getElementById('contador-descricao-perfil');
        if (contador) contador.textContent = '0';
        if (contadorElement) contadorElement.classList.remove('aviso');
        
        // OCULTAR TODAS AS MENSAGENS DE ERRO AO RESETAR
        mostrarErroPerfil('motivo-denuncia-perfil', 'erro-motivo-perfil', false);
        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', false);
        mostrarErroPerfil('email-denuncia-perfil', 'erro-email-perfil', false);
        
        const erroDescricao = document.getElementById('erro-descricao-perfil');
        if (erroDescricao) {
            erroDescricao.innerHTML = '<i class="bi bi-exclamation-circle"></i> Por favor, forneça uma descrição detalhada da denúncia (mínimo 10 caracteres).';
        }
    }
    
    const mensagemSucesso = document.getElementById('mensagem-sucesso-perfil');
    if (mensagemSucesso) {
        mensagemSucesso.classList.remove('mostrar');
    }
    
    mostrarLoadingPerfil(false);
}

// Função para obter dados do vendedor atual
function obterDadosVendedor() {
    const vendedorNome = document.getElementById('vendedor-nome');
    const vendedorLocalizacao = document.getElementById('vendedor-localizacao');
    const vendedorAvaliacao = document.getElementById('vendedor-nota');
    const vendedorVendas = document.getElementById('vendedor-vendas');
    
    return {
        vendedorNome: vendedorNome ? vendedorNome.textContent : 'Vendedor não encontrado',
        vendedorLocalizacao: vendedorLocalizacao ? vendedorLocalizacao.textContent : 'Localização não encontrada',
        vendedorAvaliacao: vendedorAvaliacao ? vendedorAvaliacao.textContent : 'N/A',
        vendedorVendas: vendedorVendas ? vendedorVendas.textContent : 'N/A',
        perfilUrl: window.location.href,
        timestamp: new Date().toISOString()
    };
}

// Função para atualizar contador de caracteres
function atualizarContadorCaracteres() {
    const textarea = document.getElementById('descricao-denuncia-perfil');
    const contador = document.getElementById('contador-atual');
    const contadorElement = document.getElementById('contador-descricao-perfil');
    
    if (textarea && contador && contadorElement) {
        const comprimento = textarea.value.length;
        contador.textContent = comprimento;
        
        if (comprimento > 800) {
            contadorElement.classList.add('aviso');
        } else {
            contadorElement.classList.remove('aviso');
        }
    }
}

// Função para enviar a denúncia do perfil
function enviarDenunciaPerfil(event) {
    event.preventDefault();
    
    if (!validarFormularioDenunciaPerfil()) {
        const modalConteudo = document.querySelector('#modal-denuncia-perfil .modal-conteudo');
        if (modalConteudo) {
            modalConteudo.style.animation = 'shakeError 0.5s ease-in-out';
            setTimeout(() => {
                modalConteudo.style.animation = '';
            }, 500);
        }
        
        const primeiroCampoInvalido = document.querySelector('#modal-denuncia-perfil .campo-invalido');
        if (primeiroCampoInvalido) {
            primeiroCampoInvalido.focus();
        }
        
        return;
    }
    
    mostrarLoadingPerfil(true);
    
    const motivo = document.getElementById('motivo-denuncia-perfil').value;
    const descricao = document.getElementById('descricao-denuncia-perfil').value;
    const email = document.getElementById('email-denuncia-perfil').value;
    const dadosVendedor = obterDadosVendedor();
    
    setTimeout(() => {
        const dadosDenuncia = {
            tipo: 'denuncia_vendedor',
            vendedor: dadosVendedor.vendedorNome,
            localizacao: dadosVendedor.vendedorLocalizacao,
            avaliacao: dadosVendedor.vendedorAvaliacao,
            vendas: dadosVendedor.vendedorVendas,
            motivo: motivo,
            descricao: descricao,
            email: email || 'Não informado',
            perfilUrl: dadosVendedor.perfilUrl,
            timestamp: dadosVendedor.timestamp,
            dataFormatada: new Date().toLocaleString('pt-BR')
        };
        
        console.log('Denúncia de vendedor enviada com sucesso:', dadosDenuncia);
        salvarDenunciaNoHistorico(dadosDenuncia);
        mostrarMensagemSucessoPerfil();
        
    }, 1500);
}

// Função para salvar denúncia no histórico (localStorage)
function salvarDenunciaNoHistorico(dadosDenuncia) {
    try {
        const historicoDenuncias = JSON.parse(localStorage.getItem('historicoDenunciasVendedores')) || [];
        historicoDenuncias.unshift({
            id: 'denuncia_' + Date.now(),
            ...dadosDenuncia
        });
        
        if (historicoDenuncias.length > 50) {
            historicoDenuncias.splice(50);
        }
        
        localStorage.setItem('historicoDenunciasVendedores', JSON.stringify(historicoDenuncias));
        console.log('Denúncia salva no histórico local');
    } catch (error) {
        console.warn('Não foi possível salvar a denúncia no histórico local:', error);
    }
}

// Função para inicializar os event listeners
function inicializarEventListenersPerfil() {
    const abrirModalBtn = document.getElementById('abrir-modal-denuncia-perfil');
    const modal = document.getElementById('modal-denuncia-perfil');
    const fecharModalBtn = modal?.querySelector('.fechar-modal');
    const btnCancelar = modal?.querySelector('.btn-cancelar');
    const formDenuncia = document.getElementById('form-denuncia-perfil');
    const textareaDescricao = document.getElementById('descricao-denuncia-perfil');
    
    if (!abrirModalBtn || !modal) {
        console.warn('Elementos do modal de denúncia do perfil não encontrados');
        return;
    }
    
    abrirModalBtn.addEventListener('click', abrirModalDenunciaPerfil);
    
    if (fecharModalBtn) {
        fecharModalBtn.addEventListener('click', fecharModalDenunciaPerfil);
    }
    
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharModalDenunciaPerfil);
    }
    
    if (formDenuncia) {
        formDenuncia.addEventListener('submit', enviarDenunciaPerfil);
    }
    
    if (textareaDescricao) {
        textareaDescricao.addEventListener('input', atualizarContadorCaracteres);
    }
    
    const campos = ['motivo-denuncia-perfil', 'descricao-denuncia-perfil', 'email-denuncia-perfil'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', function() {
                const erroId = 'erro-' + campoId.split('-')[0] + '-perfil';
                mostrarErroPerfil(campoId, erroId, false);
            });
            
            campo.addEventListener('change', function() {
                const erroId = 'erro-' + campoId.split('-')[0] + '-perfil';
                mostrarErroPerfil(campoId, erroId, false);
            });
            
            if (campoId === 'descricao-denuncia-perfil') {
                campo.addEventListener('blur', function() {
                    const valor = this.value.trim();
                    if (valor && valor.length < 10) {
                        mostrarErroPerfil('descricao-denuncia-perfil', 'erro-descricao-perfil', true);
                        document.getElementById('erro-descricao-perfil').innerHTML = '<i class="bi bi-exclamation-circle"></i> A descrição deve ter pelo menos 10 caracteres.';
                    }
                });
            }
        }
    });
    
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            fecharModalDenunciaPerfil();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            fecharModalDenunciaPerfil();
        }
        
        if (event.key === 'Tab' && modal.style.display === 'block') {
            const elementosFocaveis = modal.querySelectorAll('button, input, select, textarea, [href]');
            const primeiroElemento = elementosFocaveis[0];
            const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];
            
            if (event.shiftKey) {
                if (document.activeElement === primeiroElemento) {
                    ultimoElemento.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === ultimoElemento) {
                    primeiroElemento.focus();
                    event.preventDefault();
                }
            }
        }
    });
    
    console.log('Modal de denúncia do perfil inicializado com sucesso');
}

// Função para inicializar o modal de denúncia do perfil
function inicializarModalDenunciaPerfil() {
    adicionarEstilosModalPerfil();
    criarModalDenunciaPerfil();
    inicializarEventListenersPerfil();
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        inicializarModalDenunciaPerfil();
    }, 500);
});

// Exportar funções para uso global
if (typeof window !== 'undefined') {
    window.modalDenunciaPerfil = {
        abrir: abrirModalDenunciaPerfil,
        fechar: fecharModalDenunciaPerfil,
        enviar: enviarDenunciaPerfil,
        validar: validarFormularioDenunciaPerfil
    };
}