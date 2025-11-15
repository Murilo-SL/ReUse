// translate.js - Sistema de tradução para páginas de autenticação
const authTranslations = {
    'pt': {
        // Títulos das páginas
        'cadastro_title': 'Cadastrar - ReUse',
        'login_title': 'Entrar - ReUse',
        'recovery_title': 'Recuperar Senha - ReUse',
        
        // Cabeçalhos dos formulários
        'cadastro_heading': 'Criar conta',
        'login_heading': 'Entrar na conta',
        'recovery_heading': 'Recuperar Senha',
        
        // Tipos de usuário
        'customer': 'Cliente',
        'seller': 'Vendedor',
        'institution': 'Instituição',
        
        // Campos de formulário
        'first_name': 'Nome',
        'last_name': 'Sobrenome',
        'business_name': 'Nome da Empresa/Loja',
        'institution_name': 'Nome da Instituição',
        'email': 'Email',
        'phone': 'Telefone',
        'address': 'Endereço',
        'cnpj': 'CNPJ',
        'cnpj_placeholder': '00.000.000/0000-00',
        'description': 'Descrição da Instituição',
        'password': 'Senha',
        'confirm_password': 'Confirmar Senha',
        'verification_code': 'Código de Verificação (3 dígitos)',
        'new_password': 'Nova Senha',
        'confirm_new_password': 'Confirmar Nova Senha',
        
        // Termos e condições
        'terms_text': 'Concordo com os Termos de Uso e Política de Privacidade',
        'terms_of_use': 'Termos de Uso',
        'privacy_policy': 'Política de Privacidade',
        
        // Botões
        'signup_button': 'Criar Conta',
        'login_button': 'Entrar',
        'send_code_button': 'Enviar Código',
        'reset_password_button': 'Redefinir Senha',
        
        // Links
        'has_account': 'Já tem uma conta?',
        'no_account': 'Não tem uma conta?',
        'login_here': 'Faça login aqui',
        'signup_here': 'Cadastre-se aqui',
        'forgot_password': 'Esqueceu a Senha?',
        'remembered_password': 'Lembrou sua senha?',
        'resend_code': 'Reenviar código',
        'code_not_received': 'Não recebeu o código?',
        
        // Mensagens de sucesso
        'success_title': 'Cadastro Concluído!',
        'success_text': 'Sua conta foi criada com sucesso. Você será redirecionado para a página de login em instantes.',
        'countdown': 'Redirecionando em {0} segundos...',
        'recovery_success': 'Sucesso!',
        'password_reset_success': 'Sua senha foi redefinida com sucesso.',
        
        // Recuperação de senha
        'recovery_method': 'Método',
        'recovery_destination': 'Destino',
        'recovery_time': 'Horário',
        'registered_email': 'Email cadastrado',
        'registered_phone': 'Telefone cadastrado',
        'email_option': 'Email',
        'phone_option': 'Telefone',
        
        // Textos específicos do login
        'institution_password': 'Senha da Instituição',
        'institution_cnpj': 'CNPJ da Instituição',
        'seller_account': 'conta de vendedor',
        'institutional_account': 'conta institucional',
        
        // Força da senha
        'weak_password': 'Senha fraca',
        'medium_password': 'Senha média',
        'strong_password': 'Senha forte',
        
        // Placeholders
        'code_placeholder': 'ABC',
        'phone_placeholder': '(00) 00000-0000'
    },
    'en': {
        // Page titles
        'cadastro_title': 'Sign Up - ReUse',
        'login_title': 'Login - ReUse',
        'recovery_title': 'Recover Password - ReUse',
        
        // Form headers
        'cadastro_heading': 'Create account',
        'login_heading': 'Login to account',
        'recovery_heading': 'Recover Password',
        
        // User types
        'customer': 'Customer',
        'seller': 'Seller',
        'institution': 'Institution',
        
        // Form fields
        'first_name': 'First Name',
        'last_name': 'Last Name',
        'business_name': 'Business Name',
        'institution_name': 'Institution Name',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'cnpj': 'CNPJ',
        'cnpj_placeholder': '00.000.000/0000-00',
        'description': 'Institution Description',
        'password': 'Password',
        'confirm_password': 'Confirm Password',
        'verification_code': 'Verification Code (3 digits)',
        'new_password': 'New Password',
        'confirm_new_password': 'Confirm New Password',
        
        // Terms and conditions
        'terms_text': 'I agree with the Terms of Use and Privacy Policy',
        'terms_of_use': 'Terms of Use',
        'privacy_policy': 'Privacy Policy',
        
        // Buttons
        'signup_button': 'Create Account',
        'login_button': 'Login',
        'send_code_button': 'Send Code',
        'reset_password_button': 'Reset Password',
        
        // Links
        'has_account': 'Already have an account?',
        'no_account': 'Don\'t have an account?',
        'login_here': 'Login here',
        'signup_here': 'Sign up here',
        'forgot_password': 'Forgot Password?',
        'remembered_password': 'Remembered your password?',
        'resend_code': 'Resend code',
        'code_not_received': 'Didn\'t receive the code?',
        
        // Success messages
        'success_title': 'Registration Completed!',
        'success_text': 'Your account has been created successfully. You will be redirected to the login page shortly.',
        'countdown': 'Redirecting in {0} seconds...',
        'recovery_success': 'Success!',
        'password_reset_success': 'Your password has been reset successfully.',
        
        // Password recovery
        'recovery_method': 'Method',
        'recovery_destination': 'Destination',
        'recovery_time': 'Time',
        'registered_email': 'Registered email',
        'registered_phone': 'Registered phone',
        'email_option': 'Email',
        'phone_option': 'Phone',
        
        // Login specific texts
        'institution_password': 'Institution Password',
        'institution_cnpj': 'Institution CNPJ',
        'seller_account': 'seller account',
        'institutional_account': 'institutional account',
        
        // Password strength
        'weak_password': 'Weak password',
        'medium_password': 'Medium password',
        'strong_password': 'Strong password',
        
        // Placeholders
        'code_placeholder': 'ABC',
        'phone_placeholder': '(00) 00000-0000'
    },
    'es': {
        // Títulos de páginas
        'cadastro_title': 'Registrarse - ReUse',
        'login_title': 'Iniciar Sesión - ReUse',
        'recovery_title': 'Recuperar Contraseña - ReUse',
        
        // Encabezados de formularios
        'cadastro_heading': 'Crear cuenta',
        'login_heading': 'Iniciar sesión',
        'recovery_heading': 'Recuperar Contraseña',
        
        // Tipos de usuario
        'customer': 'Cliente',
        'seller': 'Vendedor',
        'institution': 'Institución',
        
        // Campos de formulario
        'first_name': 'Nombre',
        'last_name': 'Apellido',
        'business_name': 'Nombre de la Empresa/Tienda',
        'institution_name': 'Nombre de la Institución',
        'email': 'Correo Electrónico',
        'phone': 'Teléfono',
        'address': 'Dirección',
        'cnpj': 'CNPJ',
        'cnpj_placeholder': '00.000.000/0000-00',
        'description': 'Descripción de la Institución',
        'password': 'Contraseña',
        'confirm_password': 'Confirmar Contraseña',
        'verification_code': 'Código de Verificación (3 dígitos)',
        'new_password': 'Nueva Contraseña',
        'confirm_new_password': 'Confirmar Nueva Contraseña',
        
        // Términos y condiciones
        'terms_text': 'Acepto los Términos de Uso y la Política de Privacidad',
        'terms_of_use': 'Términos de Uso',
        'privacy_policy': 'Política de Privacidad',
        
        // Botones
        'signup_button': 'Crear Cuenta',
        'login_button': 'Iniciar Sesión',
        'send_code_button': 'Enviar Código',
        'reset_password_button': 'Restablecer Contraseña',
        
        // Enlaces
        'has_account': '¿Ya tienes una cuenta?',
        'no_account': '¿No tienes una cuenta?',
        'login_here': 'Inicia sesión aquí',
        'signup_here': 'Regístrate aquí',
        'forgot_password': '¿Olvidaste tu Contraseña?',
        'remembered_password': '¿Recordaste tu contraseña?',
        'resend_code': 'Reenviar código',
        'code_not_received': '¿No recibiste el código?',
        
        // Mensajes de éxito
        'success_title': '¡Registro Completado!',
        'success_text': 'Tu cuenta ha sido creada exitosamente. Serás redirigido a la página de inicio de sesión en breve.',
        'countdown': 'Redirigiendo en {0} segundos...',
        'recovery_success': '¡Éxito!',
        'password_reset_success': 'Tu contraseña ha sido restablecida con éxito.',
        
        // Recuperación de contraseña
        'recovery_method': 'Método',
        'recovery_destination': 'Destino',
        'recovery_time': 'Hora',
        'registered_email': 'Correo registrado',
        'registered_phone': 'Teléfono registrado',
        'email_option': 'Correo',
        'phone_option': 'Teléfono',
        
        // Textos específicos del login
        'institution_password': 'Contraseña de la Institución',
        'institution_cnpj': 'CNPJ de la Institución',
        'seller_account': 'cuenta de vendedor',
        'institutional_account': 'cuenta institucional',
        
        // Fortaleza de contraseña
        'weak_password': 'Contraseña débil',
        'medium_password': 'Contraseña media',
        'strong_password': 'Contraseña fuerte',
        
        // Placeholders
        'code_placeholder': 'ABC',
        'phone_placeholder': '(00) 00000-0000'
    },
    'fr': {
        // Titres des pages
        'cadastro_title': 'S\'inscrire - ReUse',
        'login_title': 'Se connecter - ReUse',
        'recovery_title': 'Récupérer le mot de passe - ReUse',
        
        // En-têtes des formulaires
        'cadastro_heading': 'Créer un compte',
        'login_heading': 'Se connecter',
        'recovery_heading': 'Récupérer le mot de passe',
        
        // Types d'utilisateur
        'customer': 'Client',
        'seller': 'Vendeur',
        'institution': 'Institution',
        
        // Champs de formulaire
        'first_name': 'Prénom',
        'last_name': 'Nom',
        'business_name': 'Nom de l\'Entreprise/Boutique',
        'institution_name': 'Nom de l\'Institution',
        'email': 'Email',
        'phone': 'Téléphone',
        'address': 'Adresse',
        'cnpj': 'CNPJ',
        'cnpj_placeholder': '00.000.000/0000-00',
        'description': 'Description de l\'Institution',
        'password': 'Mot de passe',
        'confirm_password': 'Confirmer le mot de passe',
        'verification_code': 'Code de Vérification (3 chiffres)',
        'new_password': 'Nouveau mot de passe',
        'confirm_new_password': 'Confirmer le nouveau mot de passe',
        
        // Termes et conditions
        'terms_text': 'J\'accepte les Conditions d\'Utilisation et la Politique de Confidentialité',
        'terms_of_use': 'Conditions d\'Utilisation',
        'privacy_policy': 'Politique de Confidentialité',
        
        // Boutons
        'signup_button': 'Créer un Compte',
        'login_button': 'Se Connecter',
        'send_code_button': 'Envoyer le Code',
        'reset_password_button': 'Réinitialiser le Mot de Passe',
        
        // Liens
        'has_account': 'Vous avez déjà un compte?',
        'no_account': 'Vous n\'avez pas de compte?',
        'login_here': 'Connectez-vous ici',
        'signup_here': 'Inscrivez-vous ici',
        'forgot_password': 'Mot de passe oublié?',
        'remembered_password': 'Vous vous souvenez de votre mot de passe?',
        'resend_code': 'Renvoyer le code',
        'code_not_received': 'Vous n\'avez pas reçu le code?',
        
        // Messages de succès
        'success_title': 'Inscription Terminée!',
        'success_text': 'Votre compte a été créé avec succès. Vous serez redirigé vers la page de connexion sous peu.',
        'countdown': 'Redirection dans {0} secondes...',
        'recovery_success': 'Succès!',
        'password_reset_success': 'Votre mot de passe a été réinitialisé avec succès.',
        
        // Récupération de mot de passe
        'recovery_method': 'Méthode',
        'recovery_destination': 'Destination',
        'recovery_time': 'Heure',
        'registered_email': 'Email enregistré',
        'registered_phone': 'Téléphone enregistré',
        'email_option': 'Email',
        'phone_option': 'Téléphone',
        
        // Textes spécifiques de connexion
        'institution_password': 'Mot de passe de l\'Institution',
        'institution_cnpj': 'CNPJ de l\'Institution',
        'seller_account': 'compte vendeur',
        'institutional_account': 'compte institutionnel',
        
        // Force du mot de passe
        'weak_password': 'Mot de passe faible',
        'medium_password': 'Mot de passe moyen',
        'strong_password': 'Mot de passe fort',
        
        // Placeholders
        'code_placeholder': 'ABC',
        'phone_placeholder': '(00) 00000-0000'
    }
};

// Sistema de tradução para páginas de autenticação
function translateAuthPage(lang = 'pt') {
    const translation = authTranslations[lang] || authTranslations['pt'];
    
    // Traduz elementos com data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translation[key]) {
            if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = translation[key];
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation[key];
            } else if (element.tagName === 'LABEL') {
                element.textContent = translation[key];
            } else {
                element.textContent = translation[key];
            }
        }
    });
    
    // Traduz elementos específicos que não usam data-translate
    translateSpecificElements(translation);
}

// Função para traduzir elementos específicos
function translateSpecificElements(translation) {
    // Títulos das páginas
    const pageTitle = document.querySelector('title');
    if (pageTitle && pageTitle.getAttribute('data-translate') === 'cadastro_title') {
        pageTitle.textContent = translation.cadastro_title;
    }
    
    // Botões de tipo de usuário
    const customerBtn = document.getElementById('customer-button');
    const sellerBtn = document.getElementById('seller-button');
    const institutionBtn = document.getElementById('institution-button');
    
    if (customerBtn) customerBtn.textContent = translation.customer;
    if (sellerBtn) sellerBtn.textContent = translation.seller;
    if (institutionBtn) institutionBtn.textContent = translation.institution;
    
    // Links de recuperação de senha
    const recoveryOptions = document.querySelectorAll('.recovery-option');
    if (recoveryOptions.length > 0) {
        recoveryOptions[0].textContent = translation.email_option;
        recoveryOptions[1].textContent = translation.phone_option;
    }
    
    // Textos de força da senha
    const strengthElements = document.querySelectorAll('.password-strength');
    strengthElements.forEach(element => {
        if (element.textContent.includes('fraca')) element.textContent = translation.weak_password;
        else if (element.textContent.includes('média')) element.textContent = translation.medium_password;
        else if (element.textContent.includes('forte')) element.textContent = translation.strong_password;
    });
}

// Função para obter tradução programaticamente
function getAuthTranslation(key, placeholders = []) {
    const currentLang = localStorage.getItem('preferred-language') || 'pt';
    const translation = authTranslations[currentLang]?.[key] || authTranslations['pt'][key] || key;
    
    if (placeholders.length > 0) {
        return translation.replace(/\{(\d+)\}/g, (match, index) => {
            return placeholders[parseInt(index)] || match;
        });
    }
    
    return translation;
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aplica tradução para páginas de autenticação
    if (document.querySelector('[data-translate]')) {
        const savedLang = localStorage.getItem('preferred-language') || 'pt';
        translateAuthPage(savedLang);
    }
    
    // Escuta mudanças de idioma
    window.addEventListener('languageChanged', function(event) {
        translateAuthPage(event.detail.language);
    });
});

// Compatibilidade com Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'pt,en,es,fr,de,it,ja,zh-CN,ru,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}