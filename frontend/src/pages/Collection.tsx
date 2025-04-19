import React, { useState } from 'react';
import { FiBook, FiHeart, FiDownload, FiUpload, FiSearch, FiX, FiStar, FiMoreVertical } from 'react-icons/fi';

type Document = {
  id: string;
  title: string;
  author: string;
  type: 'pdf' | 'markdown' | 'word';
  likes: number;
  downloads: number;
  rating: number;
  tags: string[];
  thumbnail?: string;
  lastAccessed: Date;
};

type Props = {
  initialDocuments?: Document[];
};


const getSavedDocuments = () => {
    const savedDocuments = fetch('http://localhost:4040/api/v1/saved')
}


const getLikedDocuments = () => {
  
}


const uploadDocment = () => {
  
}


const Collection: React.FC<Props> = ({ initialDocuments = [] }) => {
  const userId: string = '1';
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'saved' | 'liked' | 'downloaded' | 'upload'>('saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  
  // Mock data - in a real app, this would come from an API
  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'React Hooks Guide',
      author: 'TechLib Team',
      type: 'pdf',
      likes: 42,
      downloads: 128,
      rating: 4.5,
      tags: ['react', 'frontend', 'hooks'],
      lastAccessed: new Date('2023-05-15')
    },
    {
      id: '2',
      title: 'TypeScript Advanced Patterns',
      author: 'Microsoft Docs',
      type: 'markdown',
      likes: 89,
      downloads: 256,
      rating: 4.8,
      tags: ['typescript', 'programming'],
      lastAccessed: new Date('2023-06-20')
    },
    {
      id: '3',
      title: 'Tailwind CSS Cheat Sheet',
      author: 'Tailwind Labs',
      type: 'pdf',
      likes: 156,
      downloads: 512,
      rating: 4.9,
      tags: ['css', 'frontend', 'tailwind'],
      lastAccessed: new Date('2023-07-10')
    },
  ];

  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDocumentsByTab = () => {
    switch (activeTab) {
      case 'liked':
        return filteredDocuments.sort((a, b) => b.likes - a.likes);
      case 'downloaded':
        return filteredDocuments.sort((a, b) => b.downloads - a.downloads);
      default:
        return filteredDocuments.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800 mb-6">TechLib Collections</h1>
        
        <div className="mb-6 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'saved' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiBook className="mr-3" />
                Saved Documents
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('liked')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'liked' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiHeart className="mr-3" />
                Liked Documents
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('downloaded')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'downloaded' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiDownload className="mr-3" />
                Downloaded Documents
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'upload' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FiUpload className="mr-3" />
                Upload Documents
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">TechLib v1.0.0</div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab === 'saved' && 'Saved Documents'}
            {activeTab === 'liked' && 'Liked Documents'}
            {activeTab === 'downloaded' && 'Downloaded Documents'}
            {activeTab === 'upload' && 'Upload Documents'}
          </h2>
        </header>
        
        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'upload' ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-8 text-center">
                <FiUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Documents</h3>
                <p className="text-gray-500 mb-6">Drag and drop files here or click to browse</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Select Files
                </button>
                <div className="mt-4 text-sm text-gray-400">
                  Supported formats: PDF, MD, DOCX (Max 20MB)
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDocumentsByTab().map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                    selectedDocument?.id === doc.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FiMoreVertical />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{doc.author}</p>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(doc.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">{doc.rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <FiHeart className="mr-1" /> {doc.likes}
                      </span>
                      <span className="flex items-center">
                        <FiDownload className="mr-1" /> {doc.downloads}
                      </span>
                      <span className="capitalize">{doc.type}</span>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      
      {/* Right sidebar - document preview */}
      {selectedDocument && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Document Details</h3>
            <button 
              onClick={() => setSelectedDocument(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg mb-4">
              <FiBook className="text-5xl text-gray-400" />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">{selectedDocument.title}</h2>
            <p className="text-sm text-gray-500 mb-4">by {selectedDocument.author}</p>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(selectedDocument.rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-500">
                {selectedDocument.rating.toFixed(1)} ({selectedDocument.downloads} downloads)
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {selectedDocument.tags.map(tag => (
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
                <FiHeart className="mr-2" /> Like ({selectedDocument.likes})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;