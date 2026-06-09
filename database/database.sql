CREATE DATABASE IF NOT EXISTS ReUse;
USE ReUse;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_type VARCHAR(32) NOT NULL CHECK (user_type IN ('client', 'seller', 'institution')),
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    cpf VARCHAR(20),
    birth_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    label VARCHAR(100),
    street VARCHAR(255),
    number VARCHAR(32),
    complement VARCHAR(128),
    neighborhood VARCHAR(128),
    city VARCHAR(128),
    state VARCHAR(32),
    zip_code VARCHAR(20),
    phone VARCHAR(32),
    is_primary BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    method_type VARCHAR(32) NOT NULL DEFAULT 'card',
    provider VARCHAR(64),
    cardholder_name VARCHAR(128),
    card_brand VARCHAR(64),
    last4 VARCHAR(4),
    expiry_month INTEGER,
    expiry_year INTEGER,
    details TEXT,
    is_primary BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_holder VARCHAR(255) NOT NULL,
    card_last_digits VARCHAR(4) NOT NULL,
    card_brand VARCHAR(50),
    expiry_date VARCHAR(10),
    is_primary BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sellers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    seller_type VARCHAR(32) NOT NULL CHECK (seller_type IN ('efemero', 'brecho')),
    shop_name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20),
    address VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_sales INTEGER DEFAULT 0,
    response_rate VARCHAR(16),
    location VARCHAR(255),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS institutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(64),
    cnpj VARCHAR(20),
    phone VARCHAR(32),
    address VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    causes TEXT,
    verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    campaign_type VARCHAR(64),
    goal_description TEXT,
    goal_amount DECIMAL(10,2),
    goal_units INTEGER,
    goal_unit_type VARCHAR(32),
    collected_amount DECIMAL(10,2) DEFAULT 0.0,
    collected_units INTEGER DEFAULT 0,
    contributors_count INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status VARCHAR(32) DEFAULT 'pending',
    image_url VARCHAR(255),
    terms_accepted BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER,
    institution_id INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(128),
    condition VARCHAR(64),
    brand VARCHAR(128),
    size VARCHAR(64),
    color VARCHAR(64),
    material VARCHAR(128),
    power VARCHAR(64),
    capacity VARCHAR(64),
    weight DECIMAL(10,2),
    price DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    badge VARCHAR(64),
    rating DECIMAL(3,2) DEFAULT 0.0,
    reviews INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    status VARCHAR(32) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE SET NULL,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    position INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE (user_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    payment_method_id INTEGER,
    shipping_address_id INTEGER,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE SET NULL,
    FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    institution_id INTEGER,
    campaign_id INTEGER,
    donation_type VARCHAR(32) DEFAULT 'item',
    item_name VARCHAR(255),
    amount DECIMAL(10,2),
    category VARCHAR(128),
    item_condition VARCHAR(64),
    description TEXT,
    message TEXT,
    payment_method VARCHAR(64),
    anonymous BOOLEAN DEFAULT 0,
    delivery_option VARCHAR(64),
    pickup_street VARCHAR(255),
    pickup_number VARCHAR(64),
    pickup_complement VARCHAR(128),
    pickup_neighborhood VARCHAR(128),
    pickup_city VARCHAR(128),
    pickup_state VARCHAR(32),
    pickup_zip VARCHAR(20),
    contact_phone VARCHAR(32),
    terms_accepted BOOLEAN DEFAULT 0,
    status VARCHAR(32) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS donation_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donation_id INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    position INTEGER DEFAULT 0,
    FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    institution_id INTEGER,
    user_id INTEGER,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    areas_of_interest TEXT,
    availability VARCHAR(64),
    experience VARCHAR(64),
    motivation TEXT,
    skills TEXT,
    terms_accepted BOOLEAN DEFAULT 0,
    status VARCHAR(32) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(128),
    message TEXT NOT NULL,
    source_page VARCHAR(128),
    copy_requested BOOLEAN DEFAULT 0,
    status VARCHAR(32) DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(128),
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
);

CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 