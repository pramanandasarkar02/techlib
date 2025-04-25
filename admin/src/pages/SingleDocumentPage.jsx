import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleDocumentPage = () => {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const fetchDocument = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:4040/api/v1/admin/documents/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data);
            setDocument(data.document || data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching document:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocument();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link 
                    to="/documents" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Back to Documents
                </Link>
            </div>

            <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
                onClick={fetchDocument}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Refresh Document'}
            </button>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    Error: {error}
                </div>
            )}
                
            {document && (
                <div>{console.log(document)}</div>
            )}

            {document && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">{document.title}</h1>
                    <div className="space-y-2">
                        <p><strong>Description:</strong> {document.description}</p>
                        <p><strong>Author ID:</strong> {document.author_id}</p>
                        <p><strong>Document Type:</strong> {document.document_type_id}</p>
                        <p><strong>File Path:</strong> {document.file_path}</p>
                        <p><strong>Visibility:</strong> {document.is_public ? 'Public' : 'Private'}</p>
                        <p><strong>Created:</strong> {new Date(document.created_at).toLocaleString()}</p>
                        <p><strong>Last Updated:</strong> {new Date(document.updated_at).toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleDocumentPage;