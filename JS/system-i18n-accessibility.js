// system-i18n-accessibility.js - Sistema de Tradução e Acessibilidade para Login/Cadastro/Esqueceu Senha
document.addEventListener('DOMContentLoaded', function() {
    initializeTranslation();
    initializeAccessibility();
    initializeMobileMenu();
});

// ================ SISTEMA DE TRADUÇÃO ================
function initializeTranslation() {
    const languageSelector = document.getElementById('languageSelector');
    const languageBtn = languageSelector?.querySelector('.language-btn');
    const languageOptions = document.querySelectorAll('.language-option');
    const controlButtonsContainer = document.getElementById('controlButtonsContainer');

    if (!languageSelector || !languageBtn) return;

    // Abrir/fechar dropdown
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageSelector.classList.toggle('active');
        closeOtherMenus(languageSelector);
    });

    // Selecionar idioma
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            selectLanguage(lang, this);
            languageSelector.classList.remove('active');
            
            // Fechar menu mobile após seleção
            if (controlButtonsContainer?.classList.contains('active')) {
                controlButtonsContainer.classList.remove('active');
            }
        });
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        const isInMobileContainer = controlButtonsContainer?.classList.contains('active') && 
                                   controlButtonsContainer.contains(e.target);
        
        if (!languageSelector.contains(e.target) && !isInMobileContainer) {
            languageSelector.classList.remove('active');
        }
    });

    // Prevenir fechamento ao clicar dentro do dropdown
    const languageDropdown = languageSelector.querySelector('.language-dropdown');
    if (languageDropdown) {
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Carregar idioma salvo
    const savedLang = localStorage.getItem('preferred-language') || 'pt';
    const savedOption = languageSelector.querySelector(`[data-lang="${savedLang}"]`);
    if (savedOption) {
        selectLanguage(savedLang, savedOption);
    }

    function selectLanguage(lang, optionElement) {
        // Remover classe active de todas as opções
        languageOptions.forEach(opt => {
            opt.classList.remove('active');
            const icon = opt.querySelector('i');
            if (icon) icon.style.opacity = '0';
        });

        // Adicionar classe active à opção selecionada
        optionElement.classList.add('active');
        const activeIcon = optionElement.querySelector('i');
        if (activeIcon) activeIcon.style.opacity = '1';

        // Atualizar texto do botão
        const langText = optionElement.querySelector('span').textContent;
        const currentLangText = languageSelector.querySelector('.language-btn span');
        currentLangText.textContent = langText;

        // Salvar preferência
        localStorage.setItem('preferred-language', lang);

        // Mudar o conteúdo da página
        changeLanguage(lang);
    }

    function changeLanguage(lang) {
        const translations = {
            'pt': {
                // Títulos das páginas
                'login_title': 'Entrar - ReUse',
                'cadastro_title': 'Cadastrar - ReUse',
                'forgot_password_title': 'Esqueceu a Senha - ReUse',

                // Títulos dos formulários
                'login_heading': 'Entrar na conta',
                'cadastro_heading': 'Criar conta',
                'forgot_password_heading': 'Recuperar Senha',
                'forgot_password_instruction': 'Digite seu email abaixo e enviaremos um link para redefinir sua senha.',

                // Tipos de usuário
                'customer': 'Cliente',
                'seller': 'Vendedor',
                'institution': 'Instituição',

                // Campos do formulário
                'first_name': 'Nome',
                'last_name': 'Sobrenome',
                'email': 'Email',
                'phone': 'Telefone',
                'password': 'Senha',
                'confirm_password': 'Confirmar Senha',
                'business_name': 'Nome da Empresa/Loja',
                'address': 'Endereço',
                'institution_name': 'Nome da Instituição',
                'cnpj': 'CNPJ',
                'description': 'Descrição da Instituição',
                'verification_code': 'Código de Verificação (3 dígitos)',

                // Placeholders
                'email_placeholder': 'seu@email.com',
                'cnpj_placeholder': '00.000.000/0000-00',
                'code_placeholder': 'ABC',

                // Termos e condições
                'terms_text': 'Concordo com os {0} e {1}',
                'terms_of_use': 'Termos de Uso',
                'privacy_policy': 'Política de Privacidade',

                // Botões
                'login_button': 'Entrar',
                'signup_button': 'Criar Conta',
                'send_reset_link': 'Enviar Link de Redefinição',
                'understand': 'Entendi',
                'sending': 'Enviando...',
                'toggle_theme': 'Alternar modo claro/escuro',
                'select_language': 'Selecionar idioma',
                'accessibility': 'Opções de acessibilidade',

                // Links
                'has_account': 'Já tem uma conta?',
                'no_account': 'Não tem uma conta?',
                'login_here': 'Faça login aqui',
                'signup_here': 'Cadastre-se aqui',
                'forgot_password': 'Esqueceu a Senha?',
                'no_seller_account': 'Não tem uma conta de vendedor?',
                'no_institution_account': 'Não tem uma conta institucional?',
                'back_to_login': 'Voltar para o Login',

                // Mensagens de validação
                'email_required': 'Email é obrigatório',
                'email_invalid': 'Por favor, insira um email válido',

                // Menu de Acessibilidade
                'accessibility_title': 'Acessibilidade',
                'normal_vision': 'Visão Normal',
                'protanopia': 'Protanopia (Vermelho)',
                'protanomalia': 'Protanomalia (Vermelho Leve)',
                'deuteranopia': 'Deuteranopia (Verde)',
                'deuteranomalia': 'Deuteranomalia (Verde Leve)',
                'tritanopia': 'Tritanopia (Azul)',
                'tritanomalia': 'Tritanomalia (Azul Leve)',
                'acromatomia': 'Acromatomia (Monocromático)',
                'acromatopsia': 'Acromatopsia (Total)',

                // Mensagens de sucesso
                'success_title': 'Cadastro Concluído!',
                'success_text': 'Sua conta foi criada com sucesso. Você será redirecionado para a página de login em instantes.',
                'countdown': 'Redirecionando em {0} segundos...',
                'reset_link_sent': 'Link de Redefinição Enviado!',
                'reset_link_instructions': 'Enviamos um link de redefinição de senha para o seu email. Verifique sua caixa de entrada.'
            },
            'en': {
                'login_title': 'Login - ReUse',
                'cadastro_title': 'Sign Up - ReUse',
                'forgot_password_title': 'Forgot Password - ReUse',
                'login_heading': 'Login to your account',
                'cadastro_heading': 'Create account',
                'forgot_password_heading': 'Recover Password',
                'forgot_password_instruction': 'Enter your email below and we will send you a link to reset your password.',
                'customer': 'Customer',
                'seller': 'Seller',
                'institution': 'Institution',
                'first_name': 'First Name',
                'last_name': 'Last Name',
                'email': 'Email',
                'phone': 'Phone',
                'password': 'Password',
                'confirm_password': 'Confirm Password',
                'business_name': 'Business/Store Name',
                'address': 'Address',
                'institution_name': 'Institution Name',
                'cnpj': 'CNPJ',
                'description': 'Institution Description',
                'verification_code': 'Verification Code (3 digits)',
                'email_placeholder': 'your@email.com',
                'cnpj_placeholder': '00.000.000/0000-00',
                'code_placeholder': 'ABC',
                'terms_text': 'I agree with the {0} and {1}',
                'terms_of_use': 'Terms of Use',
                'privacy_policy': 'Privacy Policy',
                'login_button': 'Login',
                'signup_button': 'Create Account',
                'send_reset_link': 'Send Reset Link',
                'understand': 'Understand',
                'sending': 'Sending...',
                'toggle_theme': 'Toggle light/dark mode',
                'select_language': 'Select language',
                'accessibility': 'Accessibility options',
                'has_account': 'Already have an account?',
                'no_account': "Don't have an account?",
                'login_here': 'Login here',
                'signup_here': 'Sign up here',
                'forgot_password': 'Forgot Password?',
                'no_seller_account': "Don't have a seller account?",
                'no_institution_account': "Don't have an institutional account?",
                'back_to_login': 'Back to Login',
                'email_required': 'Email is required',
                'email_invalid': 'Please enter a valid email',
                'accessibility_title': 'Accessibility',
                'normal_vision': 'Normal Vision',
                'protanopia': 'Protanopia (Red)',
                'protanomalia': 'Protanomalia (Mild Red)',
                'deuteranopia': 'Deuteranopia (Green)',
                'deuteranomalia': 'Deuteranomalia (Mild Green)',
                'tritanopia': 'Tritanopia (Blue)',
                'tritanomalia': 'Tritanomalia (Mild Blue)',
                'acromatomia': 'Acromatomia (Monochrome)',
                'acromatopsia': 'Acromatopsia (Total)',
                'success_title': 'Registration Completed!',
                'success_text': 'Your account has been created successfully. You will be redirected to the login page shortly.',
                'countdown': 'Redirecting in {0} seconds...',
                'reset_link_sent': 'Reset Link Sent!',
                'reset_link_instructions': 'We have sent a password reset link to your email. Check your inbox.'
            },
            'es': {
                'login_title': 'Iniciar Sesión - ReUse',
                'cadastro_title': 'Registrarse - ReUse',
                'forgot_password_title': 'Olvidó la Contraseña - ReUse',
                'login_heading': 'Iniciar sesión en tu cuenta',
                'cadastro_heading': 'Crear cuenta',
                'forgot_password_heading': 'Recuperar Contraseña',
                'forgot_password_instruction': 'Ingrese su email a continuación y le enviaremos un enlace para restablecer su contraseña.',
                'customer': 'Cliente',
                'seller': 'Vendedor',
                'institution': 'Institución',
                'first_name': 'Nombre',
                'last_name': 'Apellido',
                'email': 'Email',
                'phone': 'Teléfono',
                'password': 'Contraseña',
                'confirm_password': 'Confirmar Contraseña',
                'business_name': 'Nombre de la Empresa/Tienda',
                'address': 'Dirección',
                'institution_name': 'Nombre de la Institución',
                'cnpj': 'CNPJ',
                'description': 'Descripción de la Institución',
                'verification_code': 'Código de Verificación (3 dígitos)',
                'email_placeholder': 'su@email.com',
                'cnpj_placeholder': '00.000.000/0000-00',
                'code_placeholder': 'ABC',
                'terms_text': 'Acepto los {0} y la {1}',
                'terms_of_use': 'Términos de Uso',
                'privacy_policy': 'Política de Privacidad',
                'login_button': 'Iniciar Sesión',
                'signup_button': 'Crear Cuenta',
                'send_reset_link': 'Enviar Enlace de Restablecimiento',
                'understand': 'Entendido',
                'sending': 'Enviando...',
                'toggle_theme': 'Alternar modo claro/oscuro',
                'select_language': 'Seleccionar idioma',
                'accessibility': 'Opciones de accesibilidad',
                'has_account': '¿Ya tienes una cuenta?',
                'no_account': '¿No tienes uma conta?',
                'login_here': 'Inicia sesión aquí',
                'signup_here': 'Regístrate aquí',
                'forgot_password': '¿Olvidaste la Contraseña?',
                'no_seller_account': '¿No tienes una cuenta de vendedor?',
                'no_institution_account': '¿No tienes una cuenta institucional?',
                'back_to_login': 'Volver al Inicio de Sesión',
                'email_required': 'El email es obligatorio',
                'email_invalid': 'Por favor, ingrese un email válido',
                'accessibility_title': 'Accesibilidad',
                'normal_vision': 'Visión Normal',
                'protanopia': 'Protanopia (Rojo)',
                'protanomalia': 'Protanomalia (Rojo Leve)',
                'deuteranopia': 'Deuteranopia (Verde)',
                'deuteranomalia': 'Deuteranomalia (Verde Leve)',
                'tritanopia': 'Tritanopia (Azul)',
                'tritanomalia': 'Tritanomalia (Azul Leve)',
                'acromatomia': 'Acromatomia (Monocromático)',
                'acromatopsia': 'Acromatopsia (Total)',
                'success_title': '¡Registro Completado!',
                'success_text': 'Tu cuenta ha sido creada con éxito. Serás redirigido a la página de inicio de sesión en breve.',
                'countdown': 'Redirigiendo en {0} segundos...',
                'reset_link_sent': '¡Enlace de Restablecimiento Enviado!',
                'reset_link_instructions': 'Hemos enviado un enlace de restablecimiento de contraseña a su email. Revise su bandeja de entrada.'
            },
            'fr': {
                'login_title': 'Connexion - ReUse',
                'cadastro_title': 'Inscription - ReUse',
                'forgot_password_title': 'Mot de Passe Oublié - ReUse',
                'login_heading': 'Se connecter au compte',
                'cadastro_heading': 'Créer un compte',
                'forgot_password_heading': 'Récupérer le Mot de Passe',
                'forgot_password_instruction': 'Entrez votre email ci-dessous et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
                'customer': 'Client',
                'seller': 'Vendeur',
                'institution': 'Institution',
                'first_name': 'Prénom',
                'last_name': 'Nom',
                'email': 'Email',
                'phone': 'Téléphone',
                'password': 'Mot de passe',
                'confirm_password': 'Confirmer le mot de passe',
                'business_name': 'Nom de l\'Entreprise/Boutique',
                'address': 'Adresse',
                'institution_name': 'Nom de l\'Institution',
                'cnpj': 'CNPJ',
                'description': 'Description de l\'Institution',
                'verification_code': 'Code de Vérification (3 chiffres)',
                'email_placeholder': 'votre@email.com',
                'cnpj_placeholder': '00.000.000/0000-00',
                'code_placeholder': 'ABC',
                'terms_text': 'J\'accepte les {0} et la {1}',
                'terms_of_use': 'Conditions d\'Utilisation',
                'privacy_policy': 'Politique de Confidentialité',
                'login_button': 'Se connecter',
                'signup_button': 'Créer un compte',
                'send_reset_link': 'Envoyer le Lien de Réinitialisation',
                'understand': 'Compris',
                'sending': 'Envoi en cours...',
                'toggle_theme': 'Basculer mode clair/sombre',
                'select_language': 'Sélectionner la langue',
                'accessibility': 'Options d\'accessibilité',
                'has_account': 'Vous avez déjà un compte?',
                'no_account': 'Vous n\'avez pas de compte?',
                'login_here': 'Connectez-vous ici',
                'signup_here': 'Inscrivez-vous ici',
                'forgot_password': 'Mot de passe oublié?',
                'no_seller_account': 'Vous n\'avez pas de compte vendeur?',
                'no_institution_account': 'Vous n\'avez pas de compte institutionnel?',
                'back_to_login': 'Retour à la Connexion',
                'email_required': 'L\'email est obligatoire',
                'email_invalid': 'Veuillez entrer un email valide',
                'accessibility_title': 'Accessibilité',
                'normal_vision': 'Vision Normale',
                'protanopia': 'Protanopie (Rouge)',
                'protanomalia': 'Protanomalie (Rouge Léger)',
                'deuteranopia': 'Deutéranopie (Vert)',
                'deuteranomalia': 'Deutéranomalie (Vert Léger)',
                'tritanopia': 'Tritanopie (Bleu)',
                'tritanomalia': 'Tritanomalie (Bleu Léger)',
                'acromatomia': 'Acromatomie (Monochrome)',
                'acromatopsia': 'Acromatopsie (Total)',
                'success_title': 'Inscription Terminée!',
                'success_text': 'Votre compte a été créé avec succès. Vous serez redirigé vers la page de connexion sous peu.',
                'countdown': 'Redirection dans {0} secondes...',
                'reset_link_sent': 'Lien de Réinitialisation Envoyé!',
                'reset_link_instructions': 'Nous avons envoyé un lien de réinitialisation de mot de passe à votre email. Vérifiez votre boîte de réception.'
            }
        };

        if (translations[lang]) {
            const translation = translations[lang];
            
            // Atualizar título da página
            if (document.title.includes('Entrar') || document.title.includes('Login')) {
                document.title = translation.login_title;
            } else if (document.title.includes('Cadastrar') || document.title.includes('Sign Up')) {
                document.title = translation.cadastro_title;
            } else if (document.title.includes('Esqueceu') || document.title.includes('Forgot') || document.title.includes('Olvidó') || document.title.includes('Oublié')) {
                document.title = translation.forgot_password_title;
            }
            
            // Atualizar elementos com data-translate
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translation[key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        if (element.hasAttribute('placeholder')) {
                            element.setAttribute('placeholder', translation[key]);
                        }
                    } else if (element.hasAttribute('aria-label')) {
                        element.setAttribute('aria-label', translation[key]);
                    } else {
                        element.textContent = translation[key];
                    }
                }
            });

            // Atualizar elementos específicos
            updateSpecificElements(translation);
            
            document.documentElement.lang = lang;
        }
    }

    function updateSpecificElements(translation) {
        // Título do formulário
        const formTitle = document.querySelector('.form-title');
        if (formTitle) {
            if (formTitle.textContent.includes('Entrar') || formTitle.textContent.includes('Login')) {
                formTitle.textContent = translation.login_heading;
            } else if (formTitle.textContent.includes('Cadastrar') || formTitle.textContent.includes('Create')) {
                formTitle.textContent = translation.cadastro_heading;
            } else if (formTitle.textContent.includes('Recuperar') || formTitle.textContent.includes('Recover') || formTitle.textContent.includes('Olvidó')) {
                formTitle.textContent = translation.forgot_password_heading;
            }
        }

        // Instruções do formulário de recuperação
        const formInstruction = document.querySelector('.form-instruction');
        if (formInstruction && translation.forgot_password_instruction) {
            formInstruction.textContent = translation.forgot_password_instruction;
        }

        // Botões de tipo de usuário (para login/cadastro)
        const typeButtons = document.querySelectorAll('.type-button');
        typeButtons.forEach(button => {
            const text = button.textContent.trim();
            if (text.includes('Cliente') || text.includes('Customer')) {
                button.textContent = translation.customer;
            } else if (text.includes('Vendedor') || text.includes('Seller')) {
                button.textContent = translation.seller;
            } else if (text.includes('Instituição') || text.includes('Institution')) {
                button.textContent = translation.institution;
            }
        });

        // BOTÕES DE SUBMIT
        const submitButtons = document.querySelectorAll('.submit-btn');
        submitButtons.forEach(button => {
            const text = button.textContent.trim();
            if (text.includes('Entrar') || text.includes('Login')) {
                button.textContent = translation.login_button;
            } else if (text.includes('Criar Conta') || text.includes('Create Account')) {
                button.textContent = translation.signup_button;
            } else if (text.includes('Enviar Link') || text.includes('Send Reset')) {
                button.textContent = translation.send_reset_link;
            }
        });

        // Links
        const signupLinks = document.querySelectorAll('.signup-link');
        signupLinks.forEach(link => {
            let html = link.innerHTML;
            html = html.replace(/Já tem uma conta\?/g, translation.has_account);
            html = html.replace(/Não tem uma conta\?/g, translation.no_account);
            html = html.replace(/Faça login aqui/g, translation.login_here);
            html = html.replace(/Cadastre-se aqui/g, translation.signup_here);
            html = html.replace(/Esqueceu a Senha \?/g, translation.forgot_password);
            html = html.replace(/Não tem uma conta de vendedor\?/g, translation.no_seller_account);
            html = html.replace(/Não tem uma conta institucional\?/g, translation.no_institution_account);
            link.innerHTML = html;
        });

        // Link de voltar para login
        const backToLoginLinks = document.querySelectorAll('.back-to-login span');
        backToLoginLinks.forEach(link => {
            if (translation.back_to_login) {
                link.textContent = translation.back_to_login;
            }
        });

        // Labels dos formulários
        const labels = {
            'Nome': translation.first_name,
            'Sobrenome': translation.last_name,
            'Email': translation.email,
            'Telefone': translation.phone,
            'Senha': translation.password,
            'Confirmar Senha': translation.confirm_password,
            'Nome da Empresa/Loja': translation.business_name,
            'Endereço': translation.address,
            'Nome da Instituição': translation.institution_name,
            'CNPJ': translation.cnpj,
            'Descrição da Instituição': translation.description,
            'Código de Verificação': translation.verification_code
        };
        
        document.querySelectorAll('label').forEach(label => {
            const originalText = label.textContent.trim();
            if (labels[originalText]) {
                label.textContent = labels[originalText];
            }
        });

        // Placeholders
        const placeholders = {
            '00.000.000/0000-00': translation.cnpj_placeholder,
            'ABC': translation.code_placeholder,
            'seu@email.com': translation.email_placeholder,
            'your@email.com': translation.email_placeholder,
            'su@email.com': translation.email_placeholder,
            'votre@email.com': translation.email_placeholder
        };
        
        document.querySelectorAll('input, textarea').forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder && placeholders[placeholder]) {
                input.setAttribute('placeholder', placeholders[placeholder]);
            }
        });

        // Termos e condições
        const termsContainers = document.querySelectorAll('.terms-container label');
        termsContainers.forEach(container => {
            let html = container.innerHTML;
            html = html.replace(/Concordo com os/g, translation.terms_text.split('{0}')[0])
                       .replace(/Termos de Uso/g, translation.terms_of_use)
                       .replace(/Política de Privacidade/g, translation.privacy_policy)
                       .replace(/ e /g, ` ${translation.terms_text.split('{0}')[1].split('{1}')[0]} `);
            container.innerHTML = html;
        });

        // Menu de acessibilidade
        const accessibilityTitle = document.querySelector('.accessibility-menu h3');
        if (accessibilityTitle) {
            accessibilityTitle.textContent = translation.accessibility_title;
        }
        
        const accessibilityOptions = document.querySelectorAll('.accessibility-option span');
        accessibilityOptions.forEach(option => {
            const text = option.textContent.trim();
            if (translation[text.replace(/ /g, '_').toLowerCase()]) {
                option.textContent = translation[text.replace(/ /g, '_').toLowerCase()];
            }
        });

        // Mensagens de sucesso
        const successTitle = document.querySelector('.success-title');
        const successText = document.querySelector('.success-text');
        const countdown = document.querySelector('.success-countdown');
        
        if (successTitle) successTitle.textContent = translation.reset_link_sent || translation.success_title;
        if (successText) successText.textContent = translation.reset_link_instructions || translation.success_text;
        if (countdown) {
            const seconds = countdown.textContent.match(/\d+/)?.[0] || '3';
            countdown.textContent = translation.countdown.replace('{0}', seconds);
        }

        // Botão do modal
        const modalCloseBtn = document.querySelector('.modal-close-btn');
        if (modalCloseBtn && translation.understand) {
            modalCloseBtn.textContent = translation.understand;
        }
    }
}

// ================ SISTEMA DE ACESSIBILIDADE ================
function initializeAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    const accessibilityOptions = document.querySelectorAll('.accessibility-option');
    const controlButtonsContainer = document.getElementById('controlButtonsContainer');

    if (!accessibilityToggle || !accessibilityMenu) return;

    // Verificar preferência salva
    const savedColorMode = localStorage.getItem('colorMode') || 'normal';
    applyColorMode(savedColorMode);
    updateActiveAccessibilityOption(savedColorMode);

    // Alternar menu de acessibilidade
    accessibilityToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        accessibilityMenu.classList.toggle('active');
        closeOtherMenus(accessibilityMenu);
    });

    // Selecionar opção de acessibilidade
    accessibilityOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            applyColorMode(mode);
            updateActiveAccessibilityOption(mode);
            accessibilityMenu.classList.remove('active');
            showColorModeNotification(mode);
            
            // Fechar menu mobile após seleção
            if (controlButtonsContainer?.classList.contains('active')) {
                controlButtonsContainer.classList.remove('active');
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        const isInMobileContainer = controlButtonsContainer?.classList.contains('active') && 
                                   controlButtonsContainer.contains(e.target);
        
        if (!accessibilityMenu.contains(e.target) && !accessibilityToggle.contains(e.target) && !isInMobileContainer) {
            accessibilityMenu.classList.remove('active');
        }
    });

    function applyColorMode(mode) {
        // Remover todas as classes de modo de cor
        document.body.classList.remove(
            'colorblind-protanopia', 'colorblind-protanomalia', 'colorblind-deuteranopia',
            'colorblind-deuteranomalia', 'colorblind-tritanopia', 'colorblind-tritanomalia',
            'colorblind-acromatomia', 'colorblind-acromatopsia'
        );
        
        if (mode !== 'normal') {
            document.body.classList.add(`colorblind-${mode}`);
        }
        
        localStorage.setItem('colorMode', mode);
    }

    function updateActiveAccessibilityOption(mode) {
        accessibilityOptions.forEach(option => {
            const optionMode = option.getAttribute('data-mode');
            const icon = option.querySelector('i');
            
            if (optionMode === mode) {
                option.classList.add('active');
                if (icon) icon.style.opacity = '1';
            } else {
                option.classList.remove('active');
                if (icon) icon.style.opacity = '0';
            }
        });
    }

    function showColorModeNotification(mode) {
        const modeNames = {
            'normal': 'Visão Normal',
            'protanopia': 'Modo Protanopia',
            'protanomalia': 'Modo Protanomalia',
            'deuteranopia': 'Modo Deuteranopia',
            'deuteranomalia': 'Modo Deuteranomalia',
            'tritanopia': 'Modo Tritanopia',
            'tritanomalia': 'Modo Tritanomalia',
            'acromatomia': 'Modo Acromatomia',
            'acromatopsia': 'Modo Acromatopsia'
        };

        const existingIndicator = document.querySelector('.accessibility-indicator');
        if (existingIndicator) existingIndicator.remove();

        const indicator = document.createElement('div');
        indicator.className = 'accessibility-indicator';
        
        // Obter tradução do nome do modo baseado no idioma atual
        const currentLang = localStorage.getItem('preferred-language') || 'pt';
        const modeTranslations = {
            'pt': modeNames,
            'en': {
                'normal': 'Normal Vision',
                'protanopia': 'Protanopia Mode',
                'protanomalia': 'Protanomalia Mode',
                'deuteranopia': 'Deuteranopia Mode',
                'deuteranomalia': 'Deuteranomalia Mode',
                'tritanopia': 'Tritanopia Mode',
                'tritanomalia': 'Tritanomalia Mode',
                'acromatomia': 'Acromatomia Mode',
                'acromatopsia': 'Acromatopsia Mode'
            },
            'es': {
                'normal': 'Visión Normal',
                'protanopia': 'Modo Protanopia',
                'protanomalia': 'Modo Protanomalia',
                'deuteranopia': 'Modo Deuteranopia',
                'deuteranomalia': 'Modo Deuteranomalia',
                'tritanopia': 'Modo Tritanopia',
                'tritanomalia': 'Modo Tritanomalia',
                'acromatomia': 'Modo Acromatomia',
                'acromatopsia': 'Modo Acromatopsia'
            },
            'fr': {
                'normal': 'Vision Normale',
                'protanopia': 'Mode Protanopie',
                'protanomalia': 'Mode Protanomalie',
                'deuteranopia': 'Mode Deutéranopie',
                'deuteranomalia': 'Mode Deutéranomalie',
                'tritanopia': 'Mode Tritanopie',
                'tritanomalia': 'Mode Tritanomalie',
                'acromatomia': 'Mode Acromatomie',
                'acromatopsia': 'Mode Acromatopsie'
            }
        };

        const modeName = modeTranslations[currentLang]?.[mode] || modeNames[mode] || mode;
        indicator.textContent = `🎨 ${modeName}`;
        
        Object.assign(indicator.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #0066cc, #00cc99)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            zIndex: '10000',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        });

        document.body.appendChild(indicator);
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 3000);
    }
}

// ================ MENU MOBILE ================
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const controlButtonsContainer = document.getElementById('controlButtonsContainer');

    if (!mobileMenuToggle || !controlButtonsContainer) return;

    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        controlButtonsContainer.classList.toggle('active');
        closeOtherMenus(controlButtonsContainer);
    });

    document.addEventListener('click', function(e) {
        // Não fechar se clicar em qualquer elemento dentro do container mobile
        if (!controlButtonsContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            controlButtonsContainer.classList.remove('active');
        }
    });

    // Prevenir que cliques nos menus dentro do container mobile fechem o container
    const languageSelector = document.getElementById('languageSelector');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    
    if (languageSelector) {
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (accessibilityMenu) {
        accessibilityMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// ================ FUNÇÕES AUXILIARES ================
function closeOtherMenus(exceptMenu) {
    const menus = [
        document.getElementById('controlButtonsContainer'),
        document.getElementById('accessibilityMenu'),
        document.getElementById('languageSelector')
    ].filter(menu => menu !== null);

    menus.forEach(menu => {
        if (menu && menu !== exceptMenu) {
            menu.classList.remove('active');
        }
    });
}