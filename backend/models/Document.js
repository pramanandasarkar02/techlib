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

// Validate input data
const validateDocument = (document) => {
    const errors = [];
  
    if (!document.author_id || !Number.isInteger(document.author_id)) {
      errors.push('author_id must be a valid integer');
    }
    if (!document.title || typeof document.title !== 'string' || document.title.length > 255) {
      errors.push('title must be a string (max 255 characters)');
    }
    if (document.description && typeof document.description !== 'string') {
      errors.push('description must be a string');
    }
    if (!document.file_path || typeof document.file_path !== 'string' || document.file_path.length > 255) {
      errors.push('file_path must be a string (max 255 characters)');
    }
    if (!document.document_type_id || !Number.isInteger(document.document_type_id)) {
      errors.push('document_type_id must be a valid integer');
    }
    if (document.is_public !== undefined && typeof document.is_public !== 'boolean') {
      errors.push('is_public must be a boolean');
    }
  
    return errors;
  };
  
  // Create a new document
  const createDocument = async (document) => {
    const {
      author_id,
      title,
      description,
      file_path,
      document_type_id,
      is_public = false, // Default to false if not provided
    } = document;
  
    // Validate input
    const errors = validateDocument(document);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
  
    const query = `
      INSERT INTO documents (author_id, title, description, file_path, document_type_id, is_public)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [author_id, title, description || null, file_path, document_type_id, is_public];
  
    try {
      const result = await pgClient.query(query, values);
      return result.rows[0]; // Return the inserted document
    } catch (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  };




  const getAllDocumentTypes = async () => {
    const query = `
            SELECT * FROM document_types;
    `
    const result = await pgClient.query(query)
    return result.rows
}

export {
    getAllDocuments,
    getDocumentById,
    createDocument,
    getAllDocumentTypes
}
