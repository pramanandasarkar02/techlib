import React, { useState, useEffect } from 'react';

import DocumentCard from './DocumentCard';
import { fetchDocuments } from './api';
import { Document } from './types';
import DocumentDetails from './DocumentDetails';


type DocumentListProps = {
  type: 'saved' | 'liked' | 'downloaded';
  userId: string;
  searchQuery: string;
};

const DocumentList: React.FC<DocumentListProps> = ({ type, userId, searchQuery }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        const data = await fetchDocuments(type, userId);
        setDocuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [type, userId]);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const sortedDocuments = filteredDocuments.sort((a, b) => {
    if (type === 'liked') return b.likes - a.likes;
    if (type === 'downloaded') return b.downloads - a.downloads;
    return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
  });

  if (loading) return <div className="text-center py-8">Loading documents...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            isSelected={selectedDocument?.id === doc.id}
            onClick={() => setSelectedDocument(doc)}
          />
        ))}
      </div>
      
      {selectedDocument && (
        <DocumentDetails 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </>
  );
};

export default DocumentList;