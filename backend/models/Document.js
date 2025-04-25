import { pgClient } from "../config/postgresdb.js"



async function getAllDocuments () {
    const query = `
            SELECT * FROM documents;
    `
    const result = await pgClient.query(query)
    return result.rows
}



async function getDocumentById (id) {
    const query = `
            SELECT * FROM documents WHERE _id = ${id};
    `
    const result = await pgClient.query(query)
    return result.rows
}

export {
    getAllDocuments,
    getDocumentById
}
