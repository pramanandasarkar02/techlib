import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:4040/api/v1/admin/documents');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setDocuments(data.documents || data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    }

    // Optionally fetch documents automatically on component mount
    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
                onClick={fetchDocuments}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch Documents'}
            </button>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    Error: {error}
                </div>
            )}

            <ul className="space-y-4">
                {documents.map(document => (
                    <li key={document._id} className="p-4 border rounded shadow hover:bg-gray-50">
                        <Link to={`/documents/${document._id}`} className="block">
                            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                                {document.title}
                            </h2>
                            <p className="text-gray-600">{document.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>Author ID: {document.author_id}</span>
                                <span className="ml-4">Type: {document.document_type_id}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;