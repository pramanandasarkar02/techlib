import pool from "./postgresdb.js"

const initializePostgresDb = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS books (
                _id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                author VARCHAR(255),
                description TEXT,
                cover_image VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                documentType VARCHAR(255),
                genre VARCHAR(255),
                isbn VARCHAR(255),
                published_year INT,
                publisher VARCHAR(255),
                downloads INT DEFAULT 0,
                likes INT DEFAULT 0,
                price INT
            )`
        )
        console.log("PostgreSQL database initialized successfully.")
    } catch (error) {
        console.error("Error initializing PostgreSQL database:", error)
        throw error
    }
    
}

export default initializePostgresDb