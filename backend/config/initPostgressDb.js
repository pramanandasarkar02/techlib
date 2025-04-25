import {pool} from "./postgresdb.js";

const initializePostgresDb = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Drop tables in reverse order of dependency
        await client.query(`
            DROP TABLE IF EXISTS review_table CASCADE;
            DROP TABLE IF EXISTS doc_info CASCADE;
            DROP TABLE IF EXISTS document_categories CASCADE;
            DROP TABLE IF EXISTS documents CASCADE;
            DROP TABLE IF EXISTS categories CASCADE;
            DROP TABLE IF EXISTS document_types CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);

        // Create tables in proper order
        await client.query(`
            CREATE TABLE users (
                _id SERIAL PRIMARY KEY,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                join_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE document_types (
                _id SERIAL PRIMARY KEY,
                document_type VARCHAR(255) NOT NULL
            );

            CREATE TABLE categories (
                _id SERIAL PRIMARY KEY,
                category VARCHAR(255) NOT NULL
            );
        `);

        // Insert basic data
        await client.query(`
            INSERT INTO users (firstname, lastname, email, password) VALUES
            ('John', 'Doe', 'john.doe@example.com', 'hashed_password_1'),
            ('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2'),
            ('Alice', 'Johnson', 'alice.j@example.com', 'hashed_password_3'),
            ('Michael', 'Brown', 'michael.b@example.com', 'hashed_password_4'),
            ('Sarah', 'Wilson', 'sarah.w@example.com', 'hashed_password_5'),
            ('David', 'Lee', 'david.lee@example.com', 'hashed_password_6'),
            ('Emily', 'Davis', 'emily.d@example.com', 'hashed_password_7'),
            ('Robert', 'Taylor', 'robert.t@example.com', 'hashed_password_8'),
            ('Jennifer', 'Anderson', 'jennifer.a@example.com', 'hashed_password_9'),
            ('Thomas', 'Clark', 'thomas.c@example.com', 'hashed_password_10');

            INSERT INTO document_types (document_type) VALUES
            ('md'), ('pdf'), ('txt'), ('png'), ('jpg'),
            ('odt'), ('docx'), ('ppt'), ('xlsx'), ('json');

            INSERT INTO categories (category) VALUES
            ('java'), ('C++'), ('spring-boot'), ('nest-js'), ('js'),
            ('ts'), ('python'), ('react'), ('docker'), ('kubernetes');
        `);

        // Create documents table
        await client.query(`
            CREATE TABLE documents (
                _id SERIAL PRIMARY KEY,
                author_id INTEGER NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                file_path VARCHAR(255) NOT NULL,
                document_type_id INTEGER NOT NULL,
                is_public BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (author_id) REFERENCES users(_id) ON DELETE CASCADE,
                FOREIGN KEY (document_type_id) REFERENCES document_types(_id) ON DELETE RESTRICT
            );
        `);

        // Insert documents
        await client.query(`
            INSERT INTO documents (author_id, title, description, file_path, document_type_id, is_public) VALUES
            (1, 'Java Basics', 'Introduction to Java programming', '/docs/java_basics.pdf', 2, TRUE),
            (2, 'Spring Boot Guide', 'Complete Spring Boot tutorial', '/docs/spring_guide.md', 1, TRUE),
            (3, 'TypeScript Handbook', 'TypeScript comprehensive guide', '/docs/typescript_handbook.pdf', 2, TRUE),
            (4, 'Docker for Beginners', 'Getting started with Docker', '/docs/docker_guide.txt', 3, FALSE),
            (5, 'React Hooks', 'Mastering React Hooks', '/docs/react_hooks.md', 1, TRUE),
            (6, 'Python Data Science', 'Data science with Python', '/docs/python_ds.pdf', 2, TRUE),
            (7, 'Kubernetes Patterns', 'Common Kubernetes patterns', '/docs/k8s_patterns.odt', 6, FALSE),
            (8, 'C++ Optimization', 'Performance optimization in C++', '/docs/cpp_optimization.pdf', 2, TRUE),
            (9, 'NestJS Authentication', 'Auth in NestJS applications', '/docs/nest_auth.md', 1, TRUE),
            (10, 'JavaScript ES6+', 'Modern JavaScript features', '/docs/js_es6.pdf', 2, TRUE);
        `);

        // Create junction tables
        await client.query(`
            CREATE TABLE document_categories (
                document_id INTEGER NOT NULL,
                category_id INTEGER NOT NULL,
                PRIMARY KEY (document_id, category_id),
                FOREIGN KEY (document_id) REFERENCES documents(_id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categories(_id) ON DELETE RESTRICT
            );

            CREATE TABLE doc_info (
                document_id INTEGER PRIMARY KEY,
                view_count INTEGER DEFAULT 0,
                like_count INTEGER DEFAULT 0,
                dislike_count INTEGER DEFAULT 0,
                upvote_count INTEGER DEFAULT 0,
                downvote_count INTEGER DEFAULT 0,
                FOREIGN KEY (document_id) REFERENCES documents(_id) ON DELETE CASCADE
            );

            CREATE TABLE review_table (
                _id SERIAL PRIMARY KEY,
                document_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                comment TEXT NOT NULL,
                rating INTEGER CHECK (rating BETWEEN 1 AND 5),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (document_id) REFERENCES documents(_id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE
            );
        `);

        // Insert junction data
        await client.query(`
            INSERT INTO document_categories (document_id, category_id) VALUES
            (1, 1), (1, 5), (2, 1), (2, 3), (3, 6),
            (4, 9), (5, 5), (5, 8), (6, 7), (7, 10),
            (8, 2), (9, 4), (9, 6), (10, 5);

            INSERT INTO doc_info (document_id, view_count, like_count, dislike_count, upvote_count, downvote_count) VALUES
            (1, 150, 45, 2, 38, 1), (2, 320, 89, 5, 76, 3),
            (3, 210, 67, 1, 59, 0), (4, 80, 12, 0, 10, 0),
            (5, 275, 78, 4, 65, 2), (6, 190, 53, 3, 47, 1),
            (7, 65, 18, 1, 15, 0), (8, 110, 34, 2, 29, 1),
            (9, 95, 27, 0, 23, 0), (10, 230, 71, 3, 62, 1);

            INSERT INTO review_table (document_id, user_id, comment, rating) VALUES
            (1, 2, 'Great introduction to Java!', 5),
            (1, 3, 'Could use more examples', 3),
            (2, 1, 'Very comprehensive guide', 5),
            (2, 4, 'Helped me understand Spring Boot better', 4),
            (3, 5, 'Excellent TypeScript resource', 5),
            (4, 6, 'Good for beginners', 4),
            (5, 7, 'React Hooks explained well', 5),
            (6, 8, 'Python examples were very helpful', 4),
            (7, 9, 'Needs more real-world scenarios', 3),
            (8, 10, 'Advanced C++ techniques explained clearly', 5),
            (9, 1, 'Great NestJS authentication guide', 5),
            (10, 2, 'Perfect for learning modern JS', 5);
        `);

        // Create trigger
        await client.query(`
            CREATE OR REPLACE FUNCTION update_modified_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE 'plpgsql';

            CREATE TRIGGER update_documents_modtime
            BEFORE UPDATE ON documents
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
        `);

        await client.query('COMMIT');
        console.log("PostgreSQL database initialized successfully with sample data");
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error initializing PostgreSQL database:", error);
        throw error;
    } finally {
        client.release();
    }
};

export default initializePostgresDb;