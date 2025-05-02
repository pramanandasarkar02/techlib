import React from 'react';
import { FiHeart, FiDownload, FiStar, FiMoreVertical } from 'react-icons/fi';
import { Document } from './types';


type DocumentCardProps = {
  document: Document;
  isSelected: boolean;
  onClick: () => void;
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 truncate">{document.title}</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-3">{document.author}</p>
        
        <div className="flex items-center mb-3">
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
          <span className="ml-1 text-xs text-gray-500">{document.rating}</span>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <FiHeart className="mr-1" /> {document.likes}
          </span>
          <span className="flex items-center">
            <FiDownload className="mr-1" /> {document.downloads}
          </span>
          <span className="capitalize">{document.type}</span>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-1">
          {/* {document.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;