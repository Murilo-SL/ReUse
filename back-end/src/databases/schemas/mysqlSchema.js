
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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,

        `CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
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


        ];

        for (const query of queries) {
            await dbStrategy.execute(query);
        }
    }
}

module.exports = { DatabaseSchemaMysql }