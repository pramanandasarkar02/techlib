import { pgClient } from "../config/postgresdb.js";
import { createDocument, getAllDocumentTypes } from "../models/Document.js";


const createDocumentController = async (req, res) => {
  const { author_id, title, description, file_path, document_type_id, is_public } = req.body;

  try {
    const newDocument = await createDocument({
      author_id,
      title,
      description,
      file_path,
      document_type_id,
      is_public,
    });
    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(400).json({ error: error.message }); // Use 400 for validation errors
  }
};

const getAllDocumentTypeController = async (req, res) => {
  const result = await getAllDocumentTypes();
  res.status(200).json(result);
}


export {
    createDocumentController,
    getAllDocumentTypeController
}