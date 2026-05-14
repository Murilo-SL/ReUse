-- ========================================
-- BANCO DE DADOS - ReUse (Economia Circular)
CREATE DATABASE ReUse;

USE ReUse;
-- ========================================
-- Sistema de compra, venda e doação de itens usados
-- Plataforma com Clientes, Vendedores e ONGs

-- ========================================
-- 1. TABELAS PRINCIPAIS DE USUÁRIOS
-- ========================================

-- Tabela base de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_type ENUM('cliente', 'vendedor', 'ong') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    status ENUM('ativo', 'inativo', 'suspenso', 'pendente_verificacao') DEFAULT 'pendente_verificacao',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_token_expiry TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_created_at (created_at)
);

-- Tokens de redefinição de senha (esqueceu a senha)
CREATE TABLE password_reset_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    token_type ENUM('email', 'sms', 'app') DEFAULT 'email',
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_used (is_used)
);

-- ========================================
-- 2. PERFIS ESPECÍFICOS DE USUÁRIOS
-- ========================================

-- Perfil de Cliente
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    cpf VARCHAR(14),
    date_of_birth DATE,
    preferred_address_id INT,
    notification_preferences JSON,
    account_credits DECIMAL(10, 2) DEFAULT 0.00,
    account_credits_used DECIMAL(10, 2) DEFAULT 0.00,
    total_purchases DECIMAL(12, 2) DEFAULT 0.00,
    total_orders INT DEFAULT 0,
    average_rating DECIMAL(3, 2),
    total_reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (preferred_address_id) REFERENCES shipping_addresses(id),
    INDEX idx_cpf (cpf),
    INDEX idx_total_orders (total_orders)
);

-- Perfil de Vendedor
CREATE TABLE sellers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    seller_type ENUM('pessoa_fisica', 'brecho') DEFAULT 'pessoa_fisica',
    store_name VARCHAR(255) NOT NULL,
    store_description TEXT,
    store_image_url VARCHAR(500),
    cpf_or_cnpj VARCHAR(18),
    ie_or_rg VARCHAR(20),
    website VARCHAR(255),
    store_address_id INT,
    phone_comercial VARCHAR(20),
    notification_preferences JSON,
    total_sales INT DEFAULT 0,
    total_revenue DECIMAL(15, 2) DEFAULT 0.00,
    average_rating DECIMAL(3, 2),
    rating_count INT DEFAULT 0,
    total_products INT DEFAULT 0,
    active_products INT DEFAULT 0,
    total_reviews INT DEFAULT 0,
    account_balance DECIMAL(15, 2) DEFAULT 0.00,
    account_balance_pending DECIMAL(15, 2) DEFAULT 0.00,
    joined_date DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_badge ENUM('nenhum', 'ouro', 'prata', 'bronze') DEFAULT 'nenhum',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_address_id) REFERENCES shipping_addresses(id),
    INDEX idx_seller_type (seller_type),
    INDEX idx_total_sales (total_sales),
    INDEX idx_is_verified (is_verified),
    INDEX idx_average_rating (average_rating)
);

-- Perfil de ONG (Organização)
CREATE TABLE organizations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_description TEXT,
    logo_url VARCHAR(500),
    website VARCHAR(255),
    foundation_date DATE,
    address_id INT,
    phone_comercial VARCHAR(20),
    cause_areas JSON, -- Ex: ["educacao", "saude", "ambiente"]
    notification_preferences JSON,
    total_donations_received DECIMAL(15, 2) DEFAULT 0.00,
    total_items_received INT DEFAULT 0,
    total_campaigns INT DEFAULT 0,
    active_campaigns INT DEFAULT 0,
    followers INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_badge ENUM('nenhum', 'ouro', 'prata', 'bronze') DEFAULT 'nenhum',
    average_impact_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES shipping_addresses(id),
    INDEX idx_cnpj (cnpj),
    INDEX idx_is_verified (is_verified),
    INDEX idx_total_donations_received (total_donations_received)
);

-- ========================================
-- 3. TABELAS DE ENDEREÇO
-- ========================================

-- Endereços de Envio/Entrega
CREATE TABLE shipping_addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_type ENUM('residencial', 'comercial', 'outro') DEFAULT 'residencial',
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(255),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    country VARCHAR(100) DEFAULT 'Brasil',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_zipcode (zipcode),
    INDEX idx_city (city)
);

-- ========================================
-- 4. TABELAS DE PRODUTOS E CATEGORIAS
-- ========================================

-- Categorias de Produtos
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    parent_category_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_name (name),
    INDEX idx_is_active (is_active),
    INDEX idx_parent_category_id (parent_category_id)
);

-- Produtos
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    category_id INT NOT NULL,
    condition ENUM('novo', 'novo_com_etiqueta', 'semi_novo', 'pouco_usado', 'usado', 'bem_cuidado') NOT NULL,
    brand VARCHAR(100),
    color VARCHAR(100),
    size VARCHAR(50),
    material VARCHAR(100),
    weight DECIMAL(5, 2), -- em kg
    weight_unit VARCHAR(10) DEFAULT 'kg',
    dimensions_length DECIMAL(7, 2), -- em cm
    dimensions_width DECIMAL(7, 2),
    dimensions_height DECIMAL(7, 2),
    status ENUM('ativo', 'inativo', 'vendido', 'removido', 'aguardando_aprovacao') DEFAULT 'aguardando_aprovacao',
    stock_quantity INT DEFAULT 1,
    stock_reserved INT DEFAULT 0,
    available_quantity INT GENERATED ALWAYS AS (stock_quantity - stock_reserved) STORED,
    average_rating DECIMAL(3, 2),
    rating_count INT DEFAULT 0,
    review_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    purchase_count INT DEFAULT 0,
    favorite_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_promoted BOOLEAN DEFAULT FALSE,
    promotion_start_date TIMESTAMP,
    promotion_end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    sold_at TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_seller_id (seller_id),
    INDEX idx_category_id (category_id),
    INDEX idx_status (status),
    INDEX idx_price (price),
    INDEX idx_created_at (created_at),
    INDEX idx_average_rating (average_rating),
    INDEX idx_condition (condition),
    FULLTEXT INDEX ft_title_description (title, description)
);

-- Imagens de Produtos
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    image_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_is_primary (is_primary)
);

-- ========================================
-- 5. TABELAS DE CARRINHO
-- ========================================

-- Carrinhos
CREATE TABLE carts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL UNIQUE,
    subtotal DECIMAL(12, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    discount_code VARCHAR(50),
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(12, 2) DEFAULT 0.00,
    item_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id)
);

-- Itens do Carrinho
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_add DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * price_at_add) STORED,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_cart_id (cart_id),
    INDEX idx_product_id (product_id),
    UNIQUE KEY unique_cart_product (cart_id, product_id)
);

-- ========================================
-- 6. TABELAS DE FAVORITOS
-- ========================================

-- Favoritos
CREATE TABLE favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_customer_product (customer_id, product_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_product_id (product_id),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 7. TABELAS DE PEDIDOS
-- ========================================

-- Pedidos
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    order_status ENUM('aguardando_pagamento', 'pagamento_confirmado', 'preparando', 'enviado', 'entregue', 'cancelado', 'devolvido') DEFAULT 'aguardando_pagamento',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method_id INT,
    shipping_address_id INT NOT NULL,
    billing_address_id INT NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    discount_code VARCHAR(50),
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_status ENUM('pendente', 'processando', 'aprovado', 'falhou', 'reembolsado') DEFAULT 'pendente',
    payment_date TIMESTAMP,
    tracking_number VARCHAR(100),
    estimated_delivery_date DATE,
    actual_delivery_date DATE,
    customer_notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
    FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(id),
    FOREIGN KEY (billing_address_id) REFERENCES shipping_addresses(id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_order_status (order_status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_date (order_date),
    INDEX idx_order_number (order_number)
);

-- Itens do Pedido
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    seller_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * price_at_purchase) STORED,
    product_condition VARCHAR(100),
    item_status ENUM('aguardando_envio', 'enviado', 'entregue', 'reclamacao', 'devolvido') DEFAULT 'aguardando_envio',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_seller_id (seller_id),
    INDEX idx_product_id (product_id),
    INDEX idx_item_status (item_status)
);

-- ========================================
-- 8. TABELAS DE AVALIAÇÕES E REVIEWS
-- ========================================

-- Avaliações de Produtos
CREATE TABLE product_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    order_item_id INT NOT NULL,
    customer_id INT NOT NULL,
    seller_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    response_from_seller TEXT,
    response_date TIMESTAMP,
    review_status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_seller_id (seller_id),
    INDEX idx_rating (rating),
    INDEX idx_verified_purchase (verified_purchase),
    INDEX idx_review_status (review_status)
);

-- Avaliações de Vendedor
CREATE TABLE seller_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    customer_id INT NOT NULL,
    order_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    communication_rating INT CHECK (communication_rating >= 1 AND communication_rating <= 5),
    delivery_rating INT CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
    review_text TEXT,
    title VARCHAR(255),
    verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    review_status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_seller_id (seller_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 9. TABELAS DE DOAÇÕES
-- ========================================

-- Doações
CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donation_id VARCHAR(20) UNIQUE NOT NULL,
    donor_id INT NOT NULL, -- seller_id ou customer_id (para simplificar, user_id)
    organization_id INT,
    donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donation_type ENUM('item', 'dinheiro', 'misto') NOT NULL,
    amount DECIMAL(12, 2), -- para doações em dinheiro
    description TEXT,
    collection_date DATE,
    collection_status ENUM('agendada', 'coletada', 'cancelada', 'pendente') DEFAULT 'pendente',
    collection_address_id INT,
    donation_status ENUM('pendente', 'confirmada', 'coletada', 'entregue', 'cancelada') DEFAULT 'pendente',
    impact_category VARCHAR(100), -- Ex: "educacao", "saude", "ambiente"
    is_anonymous BOOLEAN DEFAULT FALSE,
    message_to_organization TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL,
    FOREIGN KEY (collection_address_id) REFERENCES shipping_addresses(id),
    INDEX idx_organization_id (organization_id),
    INDEX idx_donation_date (donation_date),
    INDEX idx_donation_status (donation_status),
    INDEX idx_collection_status (collection_status)
);

-- Itens Doados
CREATE TABLE donation_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donation_id INT NOT NULL,
    product_id INT,
    item_description VARCHAR(255), -- caso não tenha product_id
    quantity INT DEFAULT 1,
    condition VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_donation_id (donation_id)
);

-- ========================================
-- 10. TABELAS DE CAMPANHAS (ONGs)
-- ========================================

-- Campanhas
CREATE TABLE campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id VARCHAR(20) UNIQUE NOT NULL,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    goal_description TEXT,
    campaign_image_url VARCHAR(500),
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    campaign_type ENUM('arrecadacao', 'coleta', 'divulgacao') DEFAULT 'arrecadacao',
    status ENUM('planejando', 'ativa', 'pausada', 'encerrada', 'cancelada') DEFAULT 'planejando',
    goal_amount DECIMAL(15, 2),
    current_amount DECIMAL(15, 2) DEFAULT 0.00,
    target_items INT,
    collected_items INT DEFAULT 0,
    views INT DEFAULT 0,
    shares INT DEFAULT 0,
    followers INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    INDEX idx_organization_id (organization_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Atualizações de Campanha
CREATE TABLE campaign_updates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    campaign_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
    INDEX idx_campaign_id (campaign_id),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 11. TABELAS DE TRANSAÇÕES E PAGAMENTOS
-- ========================================

-- Métodos de Pagamento
CREATE TABLE payment_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    payment_type ENUM('cartao_credito', 'cartao_debito', 'boleto', 'pix', 'dinheiro', 'outro') NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    status ENUM('ativo', 'inativo', 'expirado') DEFAULT 'ativo',
    
    -- Para cartão
    card_last_four VARCHAR(4),
    card_brand VARCHAR(50),
    card_holder_name VARCHAR(255),
    card_expiry_month INT,
    card_expiry_year INT,
    
    -- Para PIX
    pix_key_type ENUM('cpf', 'cnpj', 'email', 'telefone', 'chave_aleatoria'),
    pix_key VARCHAR(255),
    
    -- Para Boleto
    boleto_cpf_cnpj VARCHAR(18),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_default (is_default),
    UNIQUE KEY unique_user_default (user_id, is_default)
);

-- Transações
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    order_id INT,
    seller_id INT,
    payer_id INT NOT NULL,
    payee_id INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    transaction_type ENUM('pagamento', 'reembolso', 'credito', 'debito') DEFAULT 'pagamento',
    transaction_status ENUM('pendente', 'processando', 'aprovado', 'falhou', 'cancelado', 'reembolsado') DEFAULT 'pendente',
    payment_method_id INT,
    gateway_id VARCHAR(100), -- ID do gateway de pagamento (Stripe, PayPal, etc)
    gateway_response JSON,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL,
    FOREIGN KEY (payer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (payee_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
    INDEX idx_order_id (order_id),
    INDEX idx_seller_id (seller_id),
    INDEX idx_payer_id (payer_id),
    INDEX idx_transaction_status (transaction_status),
    INDEX idx_created_at (created_at)
);

-- Histórico de Pagamentos de Vendedor
CREATE TABLE seller_payouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payout_id VARCHAR(20) UNIQUE NOT NULL,
    seller_id INT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    total_orders INT,
    total_fee_commission DECIMAL(15, 2) DEFAULT 0.00, -- 10% padrão
    total_fee_other DECIMAL(10, 2) DEFAULT 0.00,
    net_amount DECIMAL(15, 2) GENERATED ALWAYS AS (total_amount - total_fee_commission - total_fee_other) STORED,
    status ENUM('pendente', 'processando', 'pago', 'cancelado') DEFAULT 'pendente',
    payment_method ENUM('transferencia_bancaria', 'conta_reuse') DEFAULT 'transferencia_bancaria',
    bank_account_id INT,
    transaction_id VARCHAR(100),
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    INDEX idx_seller_id (seller_id),
    INDEX idx_status (status),
    INDEX idx_period (period_start, period_end)
);

-- ========================================
-- 12. TABELAS DE CONFIGURAÇÕES E PREFERÊNCIAS
-- ========================================

-- Configurações de Loja (Vendedor)
CREATE TABLE store_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL UNIQUE,
    notification_settings JSON,
    payment_settings JSON,
    shipping_settings JSON,
    sales_settings JSON,
    auto_response_enabled BOOLEAN DEFAULT FALSE,
    auto_response_message TEXT,
    store_hours JSON,
    store_policy TEXT,
    return_policy TEXT,
    quality_checklist JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);

-- Preferências de Notificações
CREATE TABLE notification_preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    
    -- Tipos de notificações para Cliente
    order_updates BOOLEAN DEFAULT TRUE,
    product_recommendations BOOLEAN DEFAULT TRUE,
    new_arrivals_favorite_categories BOOLEAN DEFAULT TRUE,
    promotions_discounts BOOLEAN DEFAULT TRUE,
    seller_messages BOOLEAN DEFAULT TRUE,
    review_requests BOOLEAN DEFAULT TRUE,
    
    -- Tipos de notificações para Vendedor
    new_orders BOOLEAN DEFAULT TRUE,
    order_updates_seller BOOLEAN DEFAULT TRUE,
    product_reviews BOOLEAN DEFAULT TRUE,
    low_stock_alerts BOOLEAN DEFAULT TRUE,
    payout_notifications BOOLEAN DEFAULT TRUE,
    policy_updates BOOLEAN DEFAULT TRUE,
    
    -- Tipos de notificações para ONG
    new_donations BOOLEAN DEFAULT TRUE,
    campaign_updates BOOLEAN DEFAULT TRUE,
    donor_messages BOOLEAN DEFAULT TRUE,
    impact_reports BOOLEAN DEFAULT TRUE,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================================
-- 13. TABELAS DE NOTIFICAÇÕES
-- ========================================

-- Notificações
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- Ex: 'order_shipped', 'new_review', 'donation_received'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50), -- Ex: 'order', 'product', 'donation', 'campaign'
    related_entity_id INT,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at),
    INDEX idx_notification_type (notification_type)
);

-- ========================================
-- 14. TABELAS AUXILIARES
-- ========================================

-- Códigos de Desconto
CREATE TABLE discount_codes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_type ENUM('percentual', 'fixo') DEFAULT 'percentual',
    discount_value DECIMAL(10, 2) NOT NULL,
    min_purchase_amount DECIMAL(10, 2),
    max_uses INT,
    current_uses INT DEFAULT 0,
    usage_per_customer INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    created_by INT, -- admin user_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_is_active (is_active),
    INDEX idx_end_date (end_date)
);

-- Histórico de Uso de Desconto
CREATE TABLE discount_code_usage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code_id INT NOT NULL,
    customer_id INT NOT NULL,
    order_id INT NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (code_id) REFERENCES discount_codes(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_customer_id (customer_id),
    INDEX idx_order_id (order_id)
);

-- Opções de Envio
CREATE TABLE shipping_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT,
    shipping_method VARCHAR(100) NOT NULL, -- PAC, Sedex, Local, Pickup, etc
    carrier_name VARCHAR(100),
    base_price DECIMAL(10, 2) NOT NULL,
    estimated_days INT,
    max_weight DECIMAL(5, 2), -- em kg
    min_weight DECIMAL(5, 2),
    regions_supported JSON, -- Estados atendidos
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    INDEX idx_seller_id (seller_id),
    INDEX idx_is_active (is_active)
);

-- Regras de Frete Customizadas
CREATE TABLE shipping_rules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    rule_name VARCHAR(100),
    min_value DECIMAL(10, 2),
    max_value DECIMAL(10, 2),
    shipping_cost DECIMAL(10, 2),
    is_free_shipping BOOLEAN DEFAULT FALSE,
    applies_to_all_products BOOLEAN DEFAULT FALSE,
    specific_categories JSON,
    regions JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    INDEX idx_seller_id (seller_id)
);

-- Banco de Dados de Contas Bancárias
CREATE TABLE bank_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    agency_number VARCHAR(20) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    account_type ENUM('corrente', 'poupanca') DEFAULT 'corrente',
    account_holder_name VARCHAR(255) NOT NULL,
    account_holder_document VARCHAR(18) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_verified (is_verified)
);

-- Histórico de Alterações
CREATE TABLE change_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    entity_type VARCHAR(50), -- Ex: 'product', 'order', 'user'
    entity_id INT,
    action VARCHAR(50), -- Ex: 'create', 'update', 'delete'
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Reclamações e Suporte
CREATE TABLE support_tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    category VARCHAR(100), -- Ex: 'produto', 'entrega', 'pagamento', 'outro'
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    related_order_id INT,
    related_product_id INT,
    priority ENUM('baixa', 'media', 'alta', 'urgente') DEFAULT 'media',
    status ENUM('aberto', 'em_progresso', 'aguardando_cliente', 'resolvido', 'fechado') DEFAULT 'aberto',
    assigned_to_admin INT,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_order_id) REFERENCES orders(id) ON DELETE SET NULL,
    FOREIGN KEY (related_product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_ticket_number (ticket_number)
);

-- Mensagens de Suporte
CREATE TABLE support_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    attachment_url VARCHAR(500),
    is_admin_message BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ticket_id (ticket_id)
);

-- ========================================
-- 15. TABELAS DE ANÁLÍTICA E RELATÓRIOS
-- ========================================

-- Estatísticas de Produto
CREATE TABLE product_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL UNIQUE,
    daily_views INT DEFAULT 0,
    weekly_views INT DEFAULT 0,
    monthly_views INT DEFAULT 0,
    daily_clicks INT DEFAULT 0,
    weekly_clicks INT DEFAULT 0,
    monthly_clicks INT DEFAULT 0,
    daily_favorites INT DEFAULT 0,
    total_conversion_rate DECIMAL(5, 2),
    last_updated DATE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Estatísticas de Vendedor
CREATE TABLE seller_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    statistics_date DATE NOT NULL,
    daily_sales_count INT DEFAULT 0,
    daily_revenue DECIMAL(12, 2) DEFAULT 0.00,
    daily_visitors INT DEFAULT 0,
    weekly_sales_count INT DEFAULT 0,
    weekly_revenue DECIMAL(12, 2) DEFAULT 0.00,
    monthly_sales_count INT DEFAULT 0,
    monthly_revenue DECIMAL(12, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    average_rating DECIMAL(3, 2),
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
    UNIQUE KEY unique_seller_date (seller_id, statistics_date),
    INDEX idx_seller_id (seller_id),
    INDEX idx_statistics_date (statistics_date)
);

-- Estatísticas de ONG
CREATE TABLE organization_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organization_id INT NOT NULL,
    statistics_date DATE NOT NULL,
    daily_donations INT DEFAULT 0,
    daily_donation_value DECIMAL(12, 2) DEFAULT 0.00,
    weekly_donations INT DEFAULT 0,
    weekly_donation_value DECIMAL(12, 2) DEFAULT 0.00,
    monthly_donations INT DEFAULT 0,
    monthly_donation_value DECIMAL(12, 2) DEFAULT 0.00,
    total_campaigns INT DEFAULT 0,
    active_campaigns INT DEFAULT 0,
    followers INT DEFAULT 0,
    total_impact_score DECIMAL(5, 2),
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_org_date (organization_id, statistics_date),
    INDEX idx_organization_id (organization_id),
    INDEX idx_statistics_date (statistics_date)
);

-- ========================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ========================================

-- Índices para pesquisa full-text e filtros comuns
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_products_status_seller ON products(status, seller_id);
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX idx_favorites_created ON favorites(created_at);

-- ========================================
-- FIM DO BANCO DE DADOS
-- ========================================
