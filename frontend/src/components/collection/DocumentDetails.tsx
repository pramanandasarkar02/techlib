import React from 'react';
import { FiBook, FiHeart, FiDownload, FiX, FiStar } from 'react-icons/fi';
import { Document } from './types';


type DocumentDetailsProps = {
  document: Document;
  onClose: () => void;
};

const DocumentDetails: React.FC<DocumentDetailsProps> = ({ document, onClose }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Document Details</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <FiX />
        </button>
      </div>
      
      <div className="p-4">
        <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg mb-4">
          <FiBook className="text-5xl text-gray-400" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">{document.title}</h2>
        <p className="text-sm text-gray-500 mb-4">by {document.author}</p>
        
        {document.description && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
            <p className="text-sm text-gray-600">{document.description}</p>
          </div>
        )}
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(document.rating) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">
            {document.rating.toFixed(1)} ({document.downloads} downloads)
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-1">
            {document.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Download
          </button>
          <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center">
            <FiHeart className="mr-2" /> Like ({document.likes})
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;