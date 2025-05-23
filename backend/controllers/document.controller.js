import { pgClient } from "../config/postgresdb.js";
import { createDocument, getAllDocumentTypes, getDownloadedDocuments, getLikedDocuments, getSavedDocuments } from "../models/Document.js";


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


const getLikedDocumentsController = async (req, res) => {
  const { userId } = req.params;
  const result = await getLikedDocuments(userId);
  res.status(200).json(result);
}

const getSavedDocumentsController = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  const result = await getSavedDocuments(userId);
  res.status(200).json(result);
}

const getDownloadedDocumentsController = async (req, res) => {
  const { userId } = req.params;
  const result = await getDownloadedDocuments(userId);
  res.status(200).json(result);
}




export {
    createDocumentController,
    getAllDocumentTypeController,
    getLikedDocumentsController,
    getSavedDocumentsController,
    getDownloadedDocumentsController
}