import { getAllDocuments, getDocumentById } from "../../models/Document.js";

async function getAllDocumentsController(req, res){
    const documents = await getAllDocuments();
    res.status(200).json({ documents });
}


async function getDocumentByIdController(req, res){
    const { id } = req.params;
    const document = await getDocumentById(id);
    res.status(200).json({ document });
}


export {
    getAllDocumentsController,
    getDocumentByIdController
}