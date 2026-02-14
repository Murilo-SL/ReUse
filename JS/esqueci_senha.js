// Sistema de Tradução para Páginas de Autenticação
const AuthTranslationManager = {
    translations: {
        pt: {
            // Títulos gerais
            backToHome: "Voltar para a página inicial",
            login: "Login",
            register: "Cadastro",
            
            // Cliente
            clientArea: "Área do Cliente",
            clientSubtitle: "Compre com consciência, doe com propósito",
            clientBenefits: "Vantagens de ser cliente ReUse",
            clientLogin: "Entrar na Minha Conta",
            clientRegister: "Criar Minha Conta",
            
            // Vendedor
            sellerArea: "Área do Vendedor",
            sellerSubtitle: "Transforme itens em oportunidades e faça parte da economia circular",
            sellerBenefits: "Vantagens de vender na ReUse",
            sellerLogin: "Acessar Minha Loja",
            sellerRegister: "Começar a Vender",
            
            // Instituição
            institutionArea: "Área da Instituição",
            institutionSubtitle: "Amplie seu impacto social e faça a diferença na comunidade",
            institutionBenefits: "Vantagens para instituições",
            institutionLogin: "Acessar Painel",
            institutionRegister: "Cadastrar Instituição",
            
            // Campos de formulário comuns
            email: "E-mail",
            password: "Senha",
            confirmPassword: "Confirmar Senha",
            name: "Nome",
            surname: "Sobrenome",
            age: "Idade",
            phone: "Telefone",
            address: "Endereço",
            rememberMe: "Lembrar-me",
            forgotPassword: "Esqueci minha senha",
            orLoginWith: "ou entre com",
            
            // Benefícios
            smartSavings: "Economia Inteligente",
            smartSavingsDesc: "Economize até 70% em compras sustentáveis",
            purposeDonations: "Doações com Propósito",
            purposeDonationsDesc: "Doe para instituições verificadas e confiáveis",
            totalSecurity: "Segurança Total",
            totalSecurityDesc: "Compras 100% seguras com garantia ReUse",
            sustainableDelivery: "Entregas Sustentáveis",
            sustainableDeliveryDesc: "Entregas ecológicas em toda região",
            
            extraIncome: "Renda Extra",
            extraIncomeDesc: "Ganhe dinheiro com itens que não usa mais",
            consciousAudience: "Público Consciente",
            consciousAudienceDesc: "Alcance milhares de clientes engajados",
            lowCost: "Baixo Custo",
            lowCostDesc: "Taxa de apenas 10% e suporte gratuito",
            reputation: "Reputação",
            reputationDesc: "Sistema de avaliações e credibilidade",
            
            directDonations: "Doações Diretas",
            directDonationsDesc: "Receba doações diretas da comunidade ReUse",
            fundraising: "Arrecadação",
            fundraisingDesc: "Venda produtos para arrecadar fundos",
            visibility: "Visibilidade",
            visibilityDesc: "Divulgue sua causa para milhares de pessoas",
            verification: "Verificação",
            verificationDesc: "Certificado de instituição verificada",
            
            // Campos específicos do vendedor
            sellerType: "Tipo de Vendedor",
            ephemeralSeller: "Vendedor Efêmero",
            ephemeralSellerDesc: "Venda itens usados ocasionalmente",
            storeSeller: "Brechó/Loja",
            storeSellerDesc: "Venda produtos de forma profissional",
            noFixedFee: "Sem Taxa Fixa",
            storeFee: "Taxa 10%",
            cnpj: "CNPJ",
            cnpjInfo: "Apenas para brechós e lojas cadastradas",
            storeName: "Nome da Loja",
            
            // Campos específicos da instituição
            institutionName: "Nome da Instituição",
            institutionType: "Tipo de Instituição",
            selectType: "Selecione o tipo",
            ong: "ONG / OSCIP",
            foundation: "Fundação",
            association: "Associação",
            institute: "Instituto",
            other: "Outro",
            location: "Endereço Completo",
            locationInfo: "Inclua rua, número, cidade e estado",
            website: "Site (Opcional)",
            description: "Descrição da Instituição",
            descriptionInfo: "Esta descrição será exibida para os doadores",
            causes: "Causas Apoiadas",
            education: "Educação",
            environment: "Meio Ambiente",
            health: "Saúde",
            socialAssistance: "Assistência Social",
            culture: "Cultura",
            animalProtection: "Proteção Animal",
            
            // Termos e condições
            agreeTerms: "Eu concordo com os",
            termsOfUse: "Termos de Uso",
            privacyPolicy: "Política de Privacidade",
            salesPolicy: "Política de Vendas",
            and: "e",
            declareTruth: "Declaro que as informações fornecidas são verdadeiras e concordo com os",
            ofReUse: "da ReUse",
            
            // Acessibilidade
            darkMode: "Modo Escuro",
            lightMode: "Modo Claro",
            colorblindMode: "Modo Daltonismo",
            language: "Idioma",

            // Recuperação de Senha
            recoverPassword: "Recuperar Senha",
            recoverySubtitle: "Vamos ajudá-lo a recuperar o acesso à sua conta",
            stepEmail: "E-mail",
            stepVerification: "Verificação",
            stepNewPassword: "Nova Senha",
            stepCompleted: "Concluído",
            accountEmail: "E-mail da conta",
            sendCodeInfo: "Enviaremos um código de verificação para este e-mail",
            sendCode: "Enviar Código",
            verificationCode: "Código de Verificação",
            enterCodeInfo: "Insira o código de 6 dígitos enviado para o seu e-mail",
            verifyCode: "Verificar Código",
            didntReceiveCode: "Não recebeu o código?",
            resendCode: "Reenviar código",
            newPassword: "Nova Senha",
            confirmNewPassword: "Confirmar Nova Senha",
            resetPassword: "Redefinir Senha",
            passwordResetSuccess: "Senha Redefinida com Sucesso!",
            passwordResetMessage: "Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.",
            loginNow: "Fazer Login",
            passwordRequirements: {
                length: "Pelo menos 8 caracteres",
                uppercase: "Pelo menos 1 letra maiúscula",
                lowercase: "Pelo menos 1 letra minúscula",
                number: "Pelo menos 1 número"
            }
        },
        
        en: {
            // General titles
            backToHome: "Back to home page",
            login: "Login",
            register: "Register",
            
            // Client
            clientArea: "Client Area",
            clientSubtitle: "Shop consciously, donate with purpose",
            clientBenefits: "Advantages of being a ReUse client",
            clientLogin: "Enter My Account",
            clientRegister: "Create My Account",
            
            // Seller
            sellerArea: "Seller Area",
            sellerSubtitle: "Transform items into opportunities and be part of the circular economy",
            sellerBenefits: "Advantages of selling on ReUse",
            sellerLogin: "Access My Store",
            sellerRegister: "Start Selling",
            
            // Institution
            institutionArea: "Institution Area",
            institutionSubtitle: "Expand your social impact and make a difference in the community",
            institutionBenefits: "Advantages for institutions",
            institutionLogin: "Access Panel",
            institutionRegister: "Register Institution",
            
            // Common form fields
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            name: "Name",
            surname: "Surname",
            age: "Age",
            phone: "Phone",
            address: "Address",
            rememberMe: "Remember me",
            forgotPassword: "Forgot my password",
            orLoginWith: "or login with",
            
            // Benefits
            smartSavings: "Smart Savings",
            smartSavingsDesc: "Save up to 70% on sustainable purchases",
            purposeDonations: "Purpose Donations",
            purposeDonationsDesc: "Donate to verified and reliable institutions",
            totalSecurity: "Total Security",
            totalSecurityDesc: "100% secure purchases with ReUse guarantee",
            sustainableDelivery: "Sustainable Deliveries",
            sustainableDeliveryDesc: "Eco-friendly deliveries throughout the region",
            
            extraIncome: "Extra Income",
            extraIncomeDesc: "Earn money with items you no longer use",
            consciousAudience: "Conscious Audience",
            consciousAudienceDesc: "Reach thousands of engaged customers",
            lowCost: "Low Cost",
            lowCostDesc: "Only 10% fee and free support",
            reputation: "Reputation",
            reputationDesc: "Rating system and credibility",
            
            directDonations: "Direct Donations",
            directDonationsDesc: "Receive direct donations from the ReUse community",
            fundraising: "Fundraising",
            fundraisingDesc: "Sell products to raise funds",
            visibility: "Visibility",
            visibilityDesc: "Promote your cause to thousands of people",
            verification: "Verification",
            verificationDesc: "Verified institution certificate",
            
            // Seller specific fields
            sellerType: "Seller Type",
            ephemeralSeller: "Ephemeral Seller",
            ephemeralSellerDesc: "Sell used items occasionally",
            storeSeller: "Thrift Store/Shop",
            storeSellerDesc: "Sell products professionally",
            noFixedFee: "No Fixed Fee",
            storeFee: "10% Fee",
            cnpj: "CNPJ",
            cnpjInfo: "Only for registered thrift stores and shops",
            storeName: "Store Name",
            
            // Institution specific fields
            institutionName: "Institution Name",
            institutionType: "Institution Type",
            selectType: "Select type",
            ong: "NGO / OSCIP",
            foundation: "Foundation",
            association: "Association",
            institute: "Institute",
            other: "Other",
            location: "Complete Address",
            locationInfo: "Include street, number, city and state",
            website: "Website (Optional)",
            description: "Institution Description",
            descriptionInfo: "This description will be displayed to donors",
            causes: "Supported Causes",
            education: "Education",
            environment: "Environment",
            health: "Health",
            socialAssistance: "Social Assistance",
            culture: "Culture",
            animalProtection: "Animal Protection",
            
            // Terms and conditions
            agreeTerms: "I agree with the",
            termsOfUse: "Terms of Use",
            privacyPolicy: "Privacy Policy",
            salesPolicy: "Sales Policy",
            and: "and",
            declareTruth: "I declare that the information provided is true and I agree with the",
            ofReUse: "of ReUse",
            
            // Accessibility
            darkMode: "Dark Mode",
            lightMode: "Light Mode",
            colorblindMode: "Colorblind Mode",
            language: "Language",

            // Password Recovery
            recoverPassword: "Recover Password",
            recoverySubtitle: "We'll help you regain access to your account",
            stepEmail: "Email",
            stepVerification: "Verification",
            stepNewPassword: "New Password",
            stepCompleted: "Completed",
            accountEmail: "Account Email",
            sendCodeInfo: "We'll send a verification code to this email",
            sendCode: "Send Code",
            verificationCode: "Verification Code",
            enterCodeInfo: "Enter the 6-digit code sent to your email",
            verifyCode: "Verify Code",
            didntReceiveCode: "Didn't receive the code?",
            resendCode: "Resend code",
            newPassword: "New Password",
            confirmNewPassword: "Confirm New Password",
            resetPassword: "Reset Password",
            passwordResetSuccess: "Password Reset Successfully!",
            passwordResetMessage: "Your password has been successfully reset. You can now login with your new password.",
            loginNow: "Login Now",
            passwordRequirements: {
                length: "At least 8 characters",
                uppercase: "At least 1 uppercase letter",
                lowercase: "At least 1 lowercase letter",
                number: "At least 1 number"
            }
        },
        
        es: {
            // Títulos generales
            backToHome: "Volver a la página principal",
            login: "Iniciar Sesión",
            register: "Registro",
            
            // Cliente
            clientArea: "Área del Cliente",
            clientSubtitle: "Compra con conciencia, dona con propósito",
            clientBenefits: "Ventajas de ser cliente ReUse",
            clientLogin: "Entrar a Mi Cuenta",
            clientRegister: "Crear Mi Cuenta",
            
            // Vendedor
            sellerArea: "Área del Vendedor",
            sellerSubtitle: "Transforma artículos en oportunidades y sé parte de la economía circular",
            sellerBenefits: "Ventajas de vender en ReUse",
            sellerLogin: "Acceder a Mi Tienda",
            sellerRegister: "Comenzar a Vender",
            
            // Institución
            institutionArea: "Área de la Institución",
            institutionSubtitle: "Amplía tu impacto social y marca la diferencia en la comunidad",
            institutionBenefits: "Ventajas para instituciones",
            institutionLogin: "Acceder al Panel",
            institutionRegister: "Registrar Institución",
            
            // Campos de formulario comunes
            email: "Correo Electrónico",
            password: "Contraseña",
            confirmPassword: "Confirmar Contraseña",
            name: "Nombre",
            surname: "Apellido",
            age: "Edad",
            phone: "Teléfono",
            address: "Dirección",
            rememberMe: "Recordarme",
            forgotPassword: "Olvidé mi contraseña",
            orLoginWith: "o inicia sesión con",
            
            // Beneficios
            smartSavings: "Ahorro Inteligente",
            smartSavingsDesc: "Ahorra hasta 70% en compras sostenibles",
            purposeDonations: "Donaciones con Propósito",
            purposeDonationsDesc: "Dona a instituciones verificadas y confiables",
            totalSecurity: "Seguridad Total",
            totalSecurityDesc: "Compras 100% seguras con garantía ReUse",
            sustainableDelivery: "Entregas Sostenibles",
            sustainableDeliveryDesc: "Entregas ecológicas en toda la región",
            
            extraIncome: "Ingreso Extra",
            extraIncomeDesc: "Gana dinero con artículos que ya no usas",
            consciousAudience: "Público Consciente",
            consciousAudienceDesc: "Alcanza miles de clientes comprometidos",
            lowCost: "Bajo Costo",
            lowCostDesc: "Solo 10% de comisión y soporte gratuito",
            reputation: "Reputación",
            reputationDesc: "Sistema de calificaciones y credibilidad",
            
            directDonations: "Donaciones Directas",
            directDonationsDesc: "Recibe donaciones directas de la comunidad ReUse",
            fundraising: "Recaudación de Fondos",
            fundraisingDesc: "Vende productos para recaudar fondos",
            visibility: "Visibilidad",
            visibilityDesc: "Promociona tu causa a miles de personas",
            verification: "Verificación",
            verificationDesc: "Certificado de institución verificada",
            
            // Campos específicos del vendedor
            sellerType: "Tipo de Vendedor",
            ephemeralSeller: "Vendedor Efímero",
            ephemeralSellerDesc: "Vende artículos usados ocasionalmente",
            storeSeller: "Tienda de Segunda Mano",
            storeSellerDesc: "Vende productos de forma profesional",
            noFixedFee: "Sin Tarifa Fija",
            storeFee: "Tarifa 10%",
            cnpj: "CNPJ",
            cnpjInfo: "Solo para tiendas de segunda mano registradas",
            storeName: "Nombre de la Tienda",
            
            // Campos específicos de la institución
            institutionName: "Nombre de la Institución",
            institutionType: "Tipo de Instituición",
            selectType: "Seleccione el tipo",
            ong: "ONG / OSCIP",
            foundation: "Fundación",
            association: "Asociación",
            institute: "Instituto",
            other: "Otro",
            location: "Dirección Completa",
            locationInfo: "Incluya calle, número, ciudad y estado",
            website: "Sitio Web (Opcional)",
            description: "Descripción de la Institución",
            descriptionInfo: "Esta descripción se mostrará a los donantes",
            causes: "Causas Apoyadas",
            education: "Educación",
            environment: "Medio Ambiente",
            health: "Salud",
            socialAssistance: "Asistencia Social",
            culture: "Cultura",
            animalProtection: "Protección Animal",
            
            // Términos y condiciones
            agreeTerms: "Estoy de acuerdo con los",
            termsOfUse: "Términos de Uso",
            privacyPolicy: "Política de Privacidad",
            salesPolicy: "Política de Ventas",
            and: "y",
            declareTruth: "Declaro que la información proporcionada es verdadera y estoy de acuerdo con los",
            ofReUse: "de ReUse",
            
            // Accesibilidad
            darkMode: "Modo Oscuro",
            lightMode: "Modo Claro",
            colorblindMode: "Modo Daltonismo",
            language: "Idioma",

            // Recuperación de Contraseña
            recoverPassword: "Recuperar Contraseña",
            recoverySubtitle: "Te ayudaremos a recuperar el acceso a tu cuenta",
            stepEmail: "Correo",
            stepVerification: "Verificación",
            stepNewPassword: "Nueva Contraseña",
            stepCompleted: "Completado",
            accountEmail: "Correo de la Cuenta",
            sendCodeInfo: "Enviaremos un código de verificación a este correo",
            sendCode: "Enviar Código",
            verificationCode: "Código de Verificación",
            enterCodeInfo: "Ingresa el código de 6 dígitos enviado a tu correo",
            verifyCode: "Verificar Código",
            didntReceiveCode: "¿No recibiste el código?",
            resendCode: "Reenviar código",
            newPassword: "Nueva Contraseña",
            confirmNewPassword: "Confirmar Nueva Contraseña",
            resetPassword: "Restablecer Contraseña",
            passwordResetSuccess: "¡Contraseña Restablecida con Éxito!",
            passwordResetMessage: "Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.",
            loginNow: "Iniciar Sesión",
            passwordRequirements: {
                length: "Al menos 8 caracteres",
                uppercase: "Al menos 1 letra mayúscula",
                lowercase: "Al menos 1 letra minúscula",
                number: "Al menos 1 número"
            }
        }
    },

    applyTranslation(lang) {
        const t = this.translations[lang];
        if (!t) return;

        // Aplicar traduções gerais
        this.applyGeneralTranslations(t);
        
        // Aplicar traduções específicas por página
        this.applyPageSpecificTranslations(t);
        
        // Atualizar atributos de acessibilidade
        this.updateAccessibilityLabels(t);
    },

    applyGeneralTranslations(t) {
        // Link voltar
        const backLink = document.querySelector('.back-link');
        if (backLink) {
            backLink.innerHTML = `<i class="bi bi-arrow-left"></i> ${t.backToHome}`;
        }

        // Tabs
        const loginTab = document.querySelector('[data-tab="login"]');
        const registerTab = document.querySelector('[data-tab="cadastro"]');
        
        if (loginTab) {
            loginTab.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> ${t.login}`;
        }
        if (registerTab) {
            registerTab.innerHTML = `<i class="bi bi-person-plus"></i> ${t.register}`;
        }

        // Campos de formulário comuns
        this.translateFormFields(t);
    },

    translateFormFields(t) {
        // Email
        const emailLabels = document.querySelectorAll('.form-label:has(i.bi-envelope)');
        emailLabels.forEach(label => {
            if (label.textContent.includes('E-mail') || label.textContent.includes('Email') || label.textContent.includes('Correo')) {
                label.innerHTML = `<i class="bi bi-envelope"></i> ${t.email}`;
            }
        });

        // Senha
        const passwordLabels = document.querySelectorAll('.form-label:has(i.bi-lock)');
        passwordLabels.forEach(label => {
            if (label.textContent.includes('Senha') || label.textContent.includes('Password') || label.textContent.includes('Contraseña')) {
                label.innerHTML = `<i class="bi bi-lock"></i> ${t.password}`;
            }
        });

        // Confirmar Senha
        const confirmPasswordLabels = document.querySelectorAll('.form-label:has(i.bi-lock-fill)');
        confirmPasswordLabels.forEach(label => {
            if (label.textContent.includes('Confirmar') || label.textContent.includes('Confirm') || label.textContent.includes('Confirmar')) {
                label.innerHTML = `<i class="bi bi-lock-fill"></i> ${t.confirmPassword}`;
            }
        });

        // Nome
        const nameLabels = document.querySelectorAll('.form-label:has(i.bi-person)');
        nameLabels.forEach(label => {
            if (label.textContent.includes('Nome') || label.textContent.includes('Name') || label.textContent.includes('Nombre')) {
                label.innerHTML = `<i class="bi bi-person"></i> ${t.name}`;
            }
        });

        // Sobrenome
        const surnameLabels = document.querySelectorAll('label[for="sobrenome"]');
        surnameLabels.forEach(label => {
            label.innerHTML = `<i class="bi bi-person"></i> ${t.surname}`;
        });

        // Idade
        const ageLabels = document.querySelectorAll('.form-label:has(i.bi-calendar)');
        ageLabels.forEach(label => {
            if (label.textContent.includes('Idade') || label.textContent.includes('Age') || label.textContent.includes('Edad')) {
                label.innerHTML = `<i class="bi bi-calendar"></i> ${t.age}`;
            }
        });

        // Telefone
        const phoneLabels = document.querySelectorAll('.form-label:has(i.bi-telephone)');
        phoneLabels.forEach(label => {
            if (label.textContent.includes('Telefone') || label.textContent.includes('Phone') || label.textContent.includes('Teléfono')) {
                label.innerHTML = `<i class="bi bi-telephone"></i> ${t.phone}`;
            }
        });

        // Endereço
        const addressLabels = document.querySelectorAll('.form-label:has(i.bi-geo-alt)');
        addressLabels.forEach(label => {
            if (label.textContent.includes('Endereço') || label.textContent.includes('Address') || label.textContent.includes('Dirección')) {
                label.innerHTML = `<i class="bi bi-geo-alt"></i> ${t.address}`;
            }
        });

        // Lembrar-me e Esqueci senha
        const rememberMe = document.querySelector('.remember-me label');
        if (rememberMe) rememberMe.textContent = t.rememberMe;

        const forgotPassword = document.querySelector('.forgot-password');
        if (forgotPassword) forgotPassword.textContent = t.forgotPassword;

        // Divider
        const divider = document.querySelector('.divider span');
        if (divider) divider.textContent = t.orLoginWith;

        // Placeholders
        this.translatePlaceholders(t);
    },

    translatePlaceholders(t) {
        // Email placeholders
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.placeholder.includes('@')) {
                input.placeholder = t.email.toLowerCase();
            }
        });

        // Password placeholders
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            if (input.placeholder.includes('senha') || input.placeholder.includes('password')) {
                if (input.id === 'confirmarSenha' || input.id === 'confirmPassword') {
                    input.placeholder = t.confirmPassword;
                } else {
                    input.placeholder = t.password;
                }
            }
        });
    },

    applyPageSpecificTranslations(t) {
        const currentPage = this.getCurrentPage();
        
        switch(currentPage) {
            case 'client':
                this.applyClientTranslations(t);
                break;
            case 'seller':
                this.applySellerTranslations(t);
                break;
            case 'institution':
                this.applyInstitutionTranslations(t);
                break;
            case 'password-recovery':
                this.applyPasswordRecoveryTranslations(t);
                break;
        }
    },

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('cadastro-cliente')) return 'client';
        if (path.includes('cadastro-vendedor')) return 'seller';
        if (path.includes('cadastro-instituicao')) return 'institution';
        if (path.includes('esqueci-senha')) return 'password-recovery';
        return 'client'; // padrão
    },

    applyClientTranslations(t) {
        // Header
        const authTitle = document.querySelector('.auth-title');
        const authSubtitle = document.querySelector('.auth-subtitle');
        if (authTitle) authTitle.textContent = t.clientArea;
        if (authSubtitle) authSubtitle.textContent = t.clientSubtitle;

        // Benefícios
        const benefitsTitle = document.querySelector('.benefits-title');
        if (benefitsTitle) {
            benefitsTitle.innerHTML = `<i class="bi bi-stars"></i> ${t.clientBenefits}`;
        }

        // Botões de submit
        const loginBtn = document.querySelector('#loginForm .submit-btn');
        const registerBtn = document.querySelector('#cadastroForm .submit-btn');
        if (loginBtn) loginBtn.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> ${t.clientLogin}`;
        if (registerBtn) registerBtn.innerHTML = `<i class="bi bi-person-plus"></i> ${t.clientRegister}`;

        // Benefícios específicos
        this.translateBenefitCards(t, [
            t.smartSavings, t.purposeDonations, t.totalSecurity, t.sustainableDelivery
        ], [
            t.smartSavingsDesc, t.purposeDonationsDesc, t.totalSecurityDesc, t.sustainableDeliveryDesc
        ]);

        // Termos e condições
        this.translateClientTerms(t);
    },

    applySellerTranslations(t) {
        // Header
        const authTitle = document.querySelector('.auth-title');
        const authSubtitle = document.querySelector('.auth-subtitle');
        if (authTitle) authTitle.textContent = t.sellerArea;
        if (authSubtitle) authSubtitle.textContent = t.sellerSubtitle;

        // Benefícios
        const benefitsTitle = document.querySelector('.benefits-title');
        if (benefitsTitle) {
            benefitsTitle.innerHTML = `<i class="bi bi-graph-up-arrow"></i> ${t.sellerBenefits}`;
        }

        // Botões de submit
        const loginBtn = document.querySelector('#loginForm .submit-btn');
        const registerBtn = document.querySelector('#cadastroForm .submit-btn');
        if (loginBtn) loginBtn.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> ${t.sellerLogin}`;
        if (registerBtn) registerBtn.innerHTML = `<i class="bi bi-rocket-takeoff"></i> ${t.sellerRegister}`;

        // Benefícios específicos
        this.translateBenefitCards(t, [
            t.extraIncome, t.consciousAudience, t.lowCost, t.reputation
        ], [
            t.extraIncomeDesc, t.consciousAudienceDesc, t.lowCostDesc, t.reputationDesc
        ]);

        // Campos específicos do vendedor
        this.translateSellerSpecificFields(t);

        // Termos e condições
        this.translateSellerTerms(t);
    },

    applyInstitutionTranslations(t) {
        // Header
        const authTitle = document.querySelector('.auth-title');
        const authSubtitle = document.querySelector('.auth-subtitle');
        if (authTitle) authTitle.textContent = t.institutionArea;
        if (authSubtitle) authSubtitle.textContent = t.institutionSubtitle;

        // Benefícios
        const benefitsTitle = document.querySelector('.benefits-title');
        if (benefitsTitle) {
            benefitsTitle.innerHTML = `<i class="bi bi-award"></i> ${t.institutionBenefits}`;
        }

        // Botões de submit
        const loginBtn = document.querySelector('#loginForm .submit-btn');
        const registerBtn = document.querySelector('#cadastroForm .submit-btn');
        if (loginBtn) loginBtn.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> ${t.institutionLogin}`;
        if (registerBtn) registerBtn.innerHTML = `<i class="bi bi-building-check"></i> ${t.institutionRegister}`;

        // Benefícios específicos
        this.translateBenefitCards(t, [
            t.directDonations, t.fundraising, t.visibility, t.verification
        ], [
            t.directDonationsDesc, t.fundraisingDesc, t.visibilityDesc, t.verificationDesc
        ]);

        // Campos específicos da instituição
        this.translateInstitutionSpecificFields(t);

        // Termos e condições
        this.translateInstitutionTerms(t);
    },

    applyPasswordRecoveryTranslations(t) {
        // Título principal
        const authTitle = document.querySelector('.auth-title');
        const authSubtitle = document.querySelector('.auth-subtitle');
        if (authTitle) authTitle.textContent = t.recoverPassword;
        if (authSubtitle) authSubtitle.textContent = t.recoverySubtitle;

        // Etapas
        const steps = document.querySelectorAll('.step-label');
        if (steps.length >= 4) {
            steps[0].textContent = t.stepEmail;
            steps[1].textContent = t.stepVerification;
            steps[2].textContent = t.stepNewPassword;
            steps[3].textContent = t.stepCompleted;
        }

        // Formulário de E-mail
        const emailLabel = document.querySelector('#emailForm .form-label');
        if (emailLabel) {
            emailLabel.innerHTML = `<i class="bi bi-envelope"></i> ${t.accountEmail}`;
        }

        const emailInfo = document.querySelector('#emailForm .info-text');
        if (emailInfo) emailInfo.textContent = t.sendCodeInfo;

        const emailButton = document.querySelector('#emailForm .submit-btn');
        if (emailButton) {
            emailButton.innerHTML = `<i class="bi bi-send"></i> ${t.sendCode}`;
        }

        // Formulário de Verificação
        const verificationLabel = document.querySelector('#verificationForm .form-label');
        if (verificationLabel) {
            verificationLabel.innerHTML = `<i class="bi bi-shield-check"></i> ${t.verificationCode}`;
        }

        const verificationInfo = document.querySelector('#verificationForm .info-text');
        if (verificationInfo) verificationInfo.textContent = t.enterCodeInfo;

        const verificationButton = document.querySelector('#verificationForm .submit-btn');
        if (verificationButton) {
            verificationButton.innerHTML = `<i class="bi bi-check-circle"></i> ${t.verifyCode}`;
        }

        // Texto de reenvio
        const resendText = document.querySelector('.resend-code');
        if (resendText) {
            const link = resendText.querySelector('.resend-link');
            if (link) {
                resendText.innerHTML = `${t.didntReceiveCode} `;
                const newLink = document.createElement('a');
                newLink.href = '#';
                newLink.className = 'resend-link';
                newLink.id = 'resendCode';
                newLink.textContent = t.resendCode;
                resendText.appendChild(newLink);
                
                const countdown = document.createElement('span');
                countdown.id = 'countdown';
                countdown.style.display = 'none';
                resendText.appendChild(countdown);
            }
        }

        // Formulário de Nova Senha
        const newPasswordLabel = document.querySelector('#passwordForm .form-label:has(i.bi-lock)');
        if (newPasswordLabel) {
            newPasswordLabel.innerHTML = `<i class="bi bi-lock"></i> ${t.newPassword}`;
        }

        const confirmPasswordLabel = document.querySelector('#passwordForm .form-label:has(i.bi-lock-fill)');
        if (confirmPasswordLabel) {
            confirmPasswordLabel.innerHTML = `<i class="bi bi-lock-fill"></i> ${t.confirmNewPassword}`;
        }

        const passwordButton = document.querySelector('#passwordForm .submit-btn');
        if (passwordButton) {
            passwordButton.innerHTML = `<i class="bi bi-key-fill"></i> ${t.resetPassword}`;
        }

        // Requisitos de senha
        const requirements = document.querySelectorAll('.requirement');
        if (requirements.length >= 4) {
            requirements[0].innerHTML = `<i class="bi bi-dash-circle"></i> ${t.passwordRequirements.length}`;
            requirements[1].innerHTML = `<i class="bi bi-dash-circle"></i> ${t.passwordRequirements.uppercase}`;
            requirements[2].innerHTML = `<i class="bi bi-dash-circle"></i> ${t.passwordRequirements.lowercase}`;
            requirements[3].innerHTML = `<i class="bi bi-dash-circle"></i> ${t.passwordRequirements.number}`;
        }

        // Tela de sucesso
        const successTitle = document.querySelector('#successScreen h2');
        const successMessage = document.querySelector('#successScreen p');
        const successButton = document.querySelector('#successScreen .submit-btn');

        if (successTitle) successTitle.textContent = t.passwordResetSuccess;
        if (successMessage) successMessage.textContent = t.passwordResetMessage;
        if (successButton) {
            successButton.innerHTML = `<i class="bi bi-box-arrow-in-right"></i> ${t.loginNow}`;
        }

        // Placeholders
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.placeholder = t.accountEmail;

        const newPasswordInput = document.getElementById('newPassword');
        if (newPasswordInput) newPasswordInput.placeholder = t.newPassword;

        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) confirmPasswordInput.placeholder = t.confirmNewPassword;
    },

    translateBenefitCards(t, titles, descriptions) {
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach((card, index) => {
            if (titles[index]) {
                const titleElement = card.querySelector('h4');
                if (titleElement) titleElement.textContent = titles[index];
            }
            if (descriptions[index]) {
                const descElement = card.querySelector('p');
                if (descElement) descElement.textContent = descriptions[index];
            }
        });
    },

    translateSellerSpecificFields(t) {
        // Tipo de vendedor
        const sellerTypeLabel = document.querySelector('.form-label:has(i.bi-shop-window)');
        if (sellerTypeLabel) {
            sellerTypeLabel.innerHTML = `<i class="bi bi-shop-window"></i> ${t.sellerType}`;
        }

        // Opções de tipo
        const ephemeralOption = document.querySelector('[data-tipo="efemero"]');
        const storeOption = document.querySelector('[data-tipo="brecho"]');
        
        if (ephemeralOption) {
            ephemeralOption.querySelector('.tipo-name').textContent = t.ephemeralSeller;
            ephemeralOption.querySelector('.tipo-desc').textContent = t.ephemeralSellerDesc;
            const badge = ephemeralOption.querySelector('.tipo-badge');
            if (badge) badge.textContent = t.noFixedFee;
        }
        
        if (storeOption) {
            storeOption.querySelector('.tipo-name').textContent = t.storeSeller;
            storeOption.querySelector('.tipo-desc').textContent = t.storeSellerDesc;
            const badge = storeOption.querySelector('.tipo-badge');
            if (badge) badge.textContent = t.storeFee;
        }

        // CNPJ
        const cnpjLabel = document.querySelector('#cnpjField .form-label');
        if (cnpjLabel) {
            cnpjLabel.innerHTML = `<i class="bi bi-building"></i> ${t.cnpj}`;
        }

        const cnpjInfo = document.querySelector('#cnpjField .info-text');
        if (cnpjInfo) cnpjInfo.textContent = t.cnpjInfo;

        // Nome da loja
        const storeNameLabel = document.querySelector('label[for="nomeLoja"]');
        if (storeNameLabel) {
            storeNameLabel.innerHTML = `<i class="bi bi-shop"></i> ${t.storeName}`;
        }
    },

    translateInstitutionSpecificFields(t) {
        // Nome da instituição
        const nameLabel = document.querySelector('label[for="nomeInstituicao"]');
        if (nameLabel) {
            nameLabel.innerHTML = `<i class="bi bi-building"></i> ${t.institutionName}`;
        }

        // Tipo de instituição
        const typeLabel = document.querySelector('label[for="tipoInstituicao"]');
        if (typeLabel) {
            typeLabel.innerHTML = `<i class="bi bi-diagram-3"></i> ${t.institutionType}`;
        }

        const typeSelect = document.querySelector('#tipoInstituicao');
        if (typeSelect) {
            typeSelect.innerHTML = `
                <option value="">${t.selectType}</option>
                <option value="ong">${t.ong}</option>
                <option value="fundacao">${t.foundation}</option>
                <option value="associacao">${t.association}</option>
                <option value="instituto">${t.institute}</option>
                <option value="outro">${t.other}</option>
            `;
        }

        // Localização
        const locationLabel = document.querySelector('label[for="localizacao"]');
        if (locationLabel) {
            locationLabel.innerHTML = `<i class="bi bi-geo-alt"></i> ${t.location}`;
        }

        const locationInput = document.querySelector('#localizacao');
        if (locationInput) {
            const locationInfo = locationInput.nextElementSibling;
            if (locationInfo && locationInfo.classList.contains('info-text')) {
                locationInfo.textContent = t.locationInfo;
            }
        }

        // Site
        const websiteLabel = document.querySelector('label[for="site"]');
        if (websiteLabel) {
            websiteLabel.innerHTML = `<i class="bi bi-globe"></i> ${t.website}`;
        }

        // Descrição
        const descLabel = document.querySelector('label[for="descricao"]');
        if (descLabel) {
            descLabel.innerHTML = `<i class="bi bi-text-paragraph"></i> ${t.description}`;
        }

        const descInput = document.querySelector('#descricao');
        if (descInput) {
            const descInfo = descInput.nextElementSibling;
            if (descInfo && descInfo.classList.contains('info-text')) {
                descInfo.textContent = t.descriptionInfo;
            }
        }

        // Causas
        const causesLabel = document.querySelector('label[for="causas"]');
        if (causesLabel) {
            causesLabel.innerHTML = `<i class="bi bi-heart"></i> ${t.causes}`;
        }

        // Traduzir opções de causas
        const causeOptions = {
            'educacao': t.education,
            'meio-ambiente': t.environment,
            'saude': t.health,
            'assistencia-social': t.socialAssistance,
            'cultura': t.culture,
            'animais': t.animalProtection
        };

        document.querySelectorAll('.causa-option').forEach(option => {
            const input = option.querySelector('input');
            const span = option.querySelector('.causa-label');
            if (input && span && causeOptions[input.value]) {
                span.textContent = causeOptions[input.value];
            }
        });
    },

    translateClientTerms(t) {
        const termsText = document.querySelector('.terms-text');
        if (!termsText) return;

        const termsHTML = `
            ${t.agreeTerms} <a href="#" class="terms-link">${t.termsOfUse}</a> ${t.and} 
            <a href="#" class="terms-link">${t.privacyPolicy}</a> ${t.ofReUse}
        `;

        termsText.innerHTML = termsHTML;
    },

    translateSellerTerms(t) {
        const termsText = document.querySelector('.terms-text');
        if (!termsText) return;

        const termsHTML = `
            ${t.agreeTerms} <a href="#" class="terms-link">${t.termsOfUse}</a>, 
            <a href="#" class="terms-link">${t.salesPolicy}</a> ${t.and} 
            <a href="#" class="terms-link">${t.privacyPolicy}</a> ${t.ofReUse}
        `;

        termsText.innerHTML = termsHTML;
    },

    translateInstitutionTerms(t) {
        const termsText = document.querySelector('.terms-text');
        if (!termsText) return;

        const termsHTML = `
            ${t.declareTruth} <a href="#" class="terms-link">${t.termsOfUse}</a> ${t.and} 
            <a href="#" class="terms-link">${t.privacyPolicy}</a> ${t.ofReUse}
        `;

        termsText.innerHTML = termsHTML;
    },

    updateAccessibilityLabels(t) {
        const darkModeBtn = document.getElementById('darkModeToggle');
        const colorblindBtn = document.getElementById('colorblindToggle');
        const languageBtn = document.getElementById('languageToggle');

        if (darkModeBtn) {
            const isDark = document.body.classList.contains('dark-mode');
            darkModeBtn.setAttribute('title', isDark ? t.lightMode : t.darkMode);
            
            // Atualizar ícone
            const icon = darkModeBtn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'bi bi-sun' : 'bi bi-moon';
            }
        }
        if (colorblindBtn) colorblindBtn.setAttribute('title', t.colorblindMode);
        if (languageBtn) languageBtn.setAttribute('title', t.language);
    }
};

// Sistema de Gerenciamento de Estado para Acessibilidade
const AuthAccessibilityState = {
    currentMode: 'light',
    colorblindMode: null,
    currentLanguage: 'pt',
    
    init() {
        this.loadFromStorage();
        this.applyCurrentState();
        this.setupEventListeners();
    },
    
    loadFromStorage() {
        this.currentMode = localStorage.getItem('currentMode') || 'light';
        this.colorblindMode = localStorage.getItem('colorblindMode');
        this.currentLanguage = localStorage.getItem('language') || 'pt';
    },
    
    saveToStorage() {
        localStorage.setItem('currentMode', this.currentMode);
        if (this.colorblindMode) {
            localStorage.setItem('colorblindMode', this.colorblindMode);
        } else {
            localStorage.removeItem('colorblindMode');
        }
        localStorage.setItem('language', this.currentLanguage);
    },
    
    applyCurrentState() {
        // Aplicar modo de tema
        this.applyThemeMode(this.currentMode);
        
        // Aplicar modo daltonismo
        if (this.colorblindMode) {
            this.applyColorblindMode(this.colorblindMode);
        }
        
        // Aplicar idioma
        this.applyLanguage(this.currentLanguage);
    },
    
    setupEventListeners() {
        // Modo de Tema
        const themeToggle = document.getElementById('darkModeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleThemeMode();
            });
        }
        
        // Menu Daltonismo
        const colorblindToggle = document.getElementById('colorblindToggle');
        if (colorblindToggle) {
            colorblindToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) dropdown.classList.toggle('show');
            });
        }
        
        // Opções de Daltonismo
        document.querySelectorAll('.colorblind-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setColorblindMode(mode);
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) dropdown.classList.remove('show');
            });
        });
        
        // Reset Daltonismo
        const colorblindReset = document.getElementById('colorblindReset');
        if (colorblindReset) {
            colorblindReset.addEventListener('click', () => {
                this.removeColorblindMode();
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) dropdown.classList.remove('show');
            });
        }
        
        // Menu de Idioma
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) dropdown.classList.toggle('show');
            });
        }
        
        // Opções de Idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.changeLanguage(lang);
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) dropdown.classList.remove('show');
            });
        });
        
        // Fechar menus ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.colorblind-menu')) {
                const dropdown = document.getElementById('colorblindDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
            if (!e.target.closest('.language-menu')) {
                const dropdown = document.getElementById('languageDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        });
    },
    
    toggleThemeMode() {
        this.currentMode = this.currentMode === 'dark' ? 'light' : 'dark';
        this.applyThemeMode(this.currentMode);
        this.showIndicator(`${this.currentMode === 'dark' ? 'Modo Escuro' : 'Modo Claro'} Ativado`);
        this.saveToStorage();
    },
    
    applyThemeMode(mode) {
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(`${mode}-mode`);
        this.updateThemeIcon();
        AuthTranslationManager.updateAccessibilityLabels(AuthTranslationManager.translations[this.currentLanguage]);
    },
    
    updateThemeIcon() {
        const icon = document.getElementById('darkModeToggle')?.querySelector('i');
        if (icon) {
            icon.className = this.currentMode === 'light' ? 'bi bi-moon' : 'bi bi-sun';
        }
    },
    
    setColorblindMode(mode) {
        this.removeColorblindMode();
        this.colorblindMode = mode;
        this.applyColorblindMode(mode);
        this.updateColorblindMenu();
        this.showIndicator(`Modo Daltonismo: ${this.getColorblindModeName(mode)}`);
        this.saveToStorage();
    },
    
    applyColorblindMode(mode) {
        document.body.classList.add(`colorblind-${mode}`);
    },
    
    removeColorblindMode() {
        const classes = document.body.className.split(' ').filter(className => 
            !className.startsWith('colorblind-')
        );
        document.body.className = classes.join(' ');
        this.colorblindMode = null;
        this.updateColorblindMenu();
        this.showIndicator('Filtro Daltonismo Removido');
        this.saveToStorage();
    },
    
    getColorblindModeName(mode) {
        const names = {
            protanopia: 'Protanopia',
            deuteranopia: 'Deuteranopia',
            tritanopia: 'Tritanopia',
            achromatopsia: 'Acromatopsia'
        };
        return names[mode] || mode;
    },
    
    updateColorblindMenu() {
        document.querySelectorAll('.colorblind-option').forEach(option => {
            option.classList.remove('active');
        });
        
        if (this.colorblindMode) {
            const activeOption = document.querySelector(`[data-mode="${this.colorblindMode}"]`);
            if (activeOption) activeOption.classList.add('active');
        }
    },
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.applyLanguage(lang);
        this.showIndicator(`Idioma alterado para: ${this.getLanguageName(lang)}`);
        this.saveToStorage();
    },
    
    applyLanguage(lang) {
        AuthTranslationManager.applyTranslation(lang);
        this.updateLanguageMenu();
        document.documentElement.lang = lang;
    },
    
    getLanguageName(lang) {
        const names = { pt: 'Português', en: 'English', es: 'Español' };
        return names[lang] || lang;
    },
    
    updateLanguageMenu() {
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
        });
        
        const activeOption = document.querySelector(`[data-lang="${this.currentLanguage}"]`);
        if (activeOption) activeOption.classList.add('active');
    },
    
    showIndicator(message) {
        const indicator = document.getElementById('modeIndicator');
        if (!indicator) return;
        
        indicator.textContent = message;
        indicator.classList.add('show');
        
        setTimeout(() => {
            indicator.classList.remove('show');
        }, 3000);
    }
};

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de acessibilidade
    if (typeof AuthAccessibilityState !== 'undefined') {
        AuthAccessibilityState.init();
    }
    
    // Aplicar tradução inicial
    if (typeof AuthTranslationManager !== 'undefined') {
        const currentLang = localStorage.getItem('language') || 'pt';
        AuthTranslationManager.applyTranslation(currentLang);
    }
});