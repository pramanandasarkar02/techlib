import pg from "pg"

const { Pool } = pg




const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "techlib",
    password: "postgres",
    port: 5432
})


const pgClient = await pool.connect();

export {
    pool,
    pgClient
}



