
class DatabaseSchemaMysql {
    static async initialize(dbStrategy) {
        console.log("Verificando estrutura do banco de dados...");

        const queries = [
            `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_type VARCHAR(32) NOT NULL CHECK (user_type IN ('client', 'seller', 'institution')),
            first_name VARCHAR(128) NULL,
            last_name VARCHAR(128) NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(32) NULL,
            cpf VARCHAR(20) NULL,
            birth_date DATE NULL,
            profile_image VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,

            `CREATE TABLE IF NOT EXISTS addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address_name VARCHAR(100),
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(20),
    phone VARCHAR(32),
    is_primary BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

            `CREATE TABLE IF NOT EXISTS payment_methods (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
)`,

            `CREATE TABLE IF NOT EXISTS sellers (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
)`,

            `CREATE TABLE IF NOT EXISTS institutions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
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
)`,

            `CREATE TABLE IF NOT EXISTS cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_holder VARCHAR(255) NOT NULL,
    card_last_digits VARCHAR(4) NOT NULL,
    card_brand VARCHAR(50),
    expiry_date VARCHAR(10),
    is_primary BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

            `CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    condition_status VARCHAR(50),
    image_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'ativo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

            `CREATE TABLE IF NOT EXISTS favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)`,

            `CREATE TABLE IF NOT EXISTS cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)`,

            `CREATE TABLE IF NOT EXISTS seller_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_name VARCHAR(255),
    cnpj VARCHAR(30),
    state_registration VARCHAR(50),
    phone VARCHAR(30),
    website VARCHAR(255),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

`CREATE TABLE IF NOT EXISTS seller_addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    zipcode VARCHAR(20),
    street VARCHAR(255),
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

`CREATE TABLE IF NOT EXISTS seller_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    monday_friday_open VARCHAR(10),
    monday_friday_close VARCHAR(10),
    monday_friday_closed BOOLEAN DEFAULT FALSE,
    saturday_open VARCHAR(10),
    saturday_close VARCHAR(10),
    saturday_closed BOOLEAN DEFAULT FALSE,
    sunday_closed BOOLEAN DEFAULT TRUE,
    holidays_closed BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

`CREATE TABLE IF NOT EXISTS seller_payment_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pix BOOLEAN DEFAULT FALSE,
    credit_card BOOLEAN DEFAULT FALSE,
    debit_card BOOLEAN DEFAULT FALSE,
    boleto BOOLEAN DEFAULT FALSE,
    cash BOOLEAN DEFAULT FALSE,
    bank_transfer BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

`CREATE TABLE IF NOT EXISTS seller_shipping_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pickup BOOLEAN DEFAULT FALSE,
    local_delivery BOOLEAN DEFAULT FALSE,
    correios BOOLEAN DEFAULT FALSE,
    carrier BOOLEAN DEFAULT FALSE,
    free_shipping BOOLEAN DEFAULT FALSE,
    free_shipping_min_value DECIMAL(10,2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`,

`CREATE TABLE IF NOT EXISTS seller_pickup_locations (
    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    name VARCHAR(255),
    street VARCHAR(255),
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(10),
    zipcode VARCHAR(20),

    active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
)`,


        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaMysql }