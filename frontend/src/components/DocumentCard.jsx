import React from 'react';
import { Link } from 'react-router-dom';

const DocumentCard = ({ document }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={document.cover_image_url} 
        alt={document.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{document.title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {document.type.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{document.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>📄 {document.size}</span>
          <span>📅 {document.release_date}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <span className="text-green-600">👍 {document.like}</span>
            <span className="text-red-600">👎 {document.dislike}</span>
            <span className="text-blue-600">⬇️ {document.download}</span>
          </div>
          <Link 
            to={`/documents/${document.id}`} 
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;