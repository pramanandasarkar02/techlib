import { pgClient } from "../config/postgresdb.js"




async function getAllUsers () {
    const query = `
            SELECT * FROM users;
    `
    const result = await pgClient.query(query)
    return result.rows
}   

async function getUserById (id) {
    const query = `
            SELECT * FROM users WHERE _id = ${id};
    `
    const result = await pgClient.query(query)
    return result.rows
}



export{

    getAllUsers,
    getUserById
}