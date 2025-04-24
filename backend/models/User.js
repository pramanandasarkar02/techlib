import { pgClient } from "../config/postgresdb.js"

async function createUser (firstname, lastname, email, password ) {
    const query = `
            INSERT INTO users (firstname, lastname, email, password) VALUES
            (${firstname},${lastname}, ${email}, ${password} );
    `
    const result = await pgClient.query(query)
}


async function getAllUsers () {
    const query = `
            SELECT * FROM users;
    `
    const result = await pgClient.query(query)
    return result.rows
}   

async function getUserById (id) {
    const query = `
            SELECT * FROM users WHERE id = ${id};
    `
    const result = await pgClient.query(query)
    return result.rows
}



export{
    createUser,
    getAllUsers,
    getUserById
}