import React, { useState, useEffect } from 'react';
import { 
  FaFolder, 
  FaFolderOpen, 
  FaFilePdf, 
  FaFileAlt, 
  FaFileImage, 
  FaSearch, 
  FaUpload, 
  FaPlus, 
  FaBookOpen,
  FaEllipsisV 
} from 'react-icons/fa';

const Workspace = () => {
  // Sample directory structure
  const [workspace, setWorkspace] = useState({
    name: "My Workspace",
    items: [
      {
        id: '1',
        name: "Research Papers",
        type: "folder",
        items: [
          {
            id: '1-1',
            name: "AI Ethics.pdf",
            type: "pdf",
            lastOpened: "2023-10-15",
            content: "This is the content of AI Ethics paper..."
          },
          {
            id: '1-2',
            name: "Blockchain Applications.pdf",
            type: "pdf",
            lastOpened: "2023-09-22"
          }
        ]
      },
      {
        id: '2',
        name: "Lecture Notes",
        type: "folder",
        items: [
          {
            id: '2-1',
            name: "Computer Science.md",
            type: "document",
            lastOpened: "2023-11-05"
          }
        ]
      },
      {
        id: '3',
        name: "Quick Notes.txt",
        type: "document",
        lastOpened: "2023-11-10"
      }
    ]
  });

  const [currentPath, setCurrentPath] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  // Get current directory items
  const getCurrentItems = () => {
    let current = workspace;
    for (const folderId of currentPath) {
      current = current.items.find(item => item.id === folderId);
    }
    return current.items || [];
  };

  // Filter items based on search query
  const filteredItems = getCurrentItems().filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate into folder
  const navigateToFolder = (folderId) => {
    setCurrentPath([...currentPath, folderId]);
    setCurrentDoc(null);
  };

  // Navigate up
  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setCurrentDoc(null);
    }
  };

  // Open document
  const openDocument = (doc) => {
    setCurrentDoc(doc);
  };

  // Create new folder
  const createNewFolder = () => {
    if (!newFolderName.trim()) return;
    
    const newFolder = {
      id: `new-${Date.now()}`,
      name: newFolderName,
      type: "folder",
      items: []
    };

    // Update workspace state
    const updatedWorkspace = { ...workspace };
    let current = updatedWorkspace;
    
    for (const folderId of currentPath) {
      current = current.items.find(item => item.id === folderId);
    }

    current.items = [...current.items, newFolder];
    setWorkspace(updatedWorkspace);
    setNewFolderName('');
    setShowNewFolderInput(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Workspace</h2>
        <div className="space-y-2">
          <button 
            onClick={() => setCurrentPath([])}
            className={`w-full text-left px-3 py-2 rounded-lg ${currentPath.length === 0 ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
          >
            All Documents
          </button>
          
          {/* Recursive folder rendering would go here in a full implementation */}
          <div className="pl-4">
            {workspace.items.filter(item => item.type === "folder").map(folder => (
              <button
                key={folder.id}
                onClick={() => navigateToFolder(folder.id)}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${currentPath.includes(folder.id) ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              >
                {currentPath.includes(folder.id) ? <FaFolderOpen className="mr-2" /> : <FaFolder className="mr-2" />}
                {folder.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {currentPath.length > 0 && (
              <button 
                onClick={navigateUp}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ← Up
              </button>
            )}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search in workspace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowNewFolderInput(true)}
              className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <FaPlus className="mr-2" /> New Folder
            </button>
            <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <FaUpload className="mr-2" /> Upload
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {showNewFolderInput && (
            <div className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="New folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
                autoFocus
              />
              <button 
                onClick={createNewFolder}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create
              </button>
              <button 
                onClick={() => setShowNewFolderInput(false)}
                className="px-3 py-2 ml-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          )}

          {currentDoc ? (
            // Document viewer
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <FaBookOpen className="mr-2 text-indigo-500" />
                  {currentDoc.name}
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <FaEllipsisV />
                  </button>
                </div>
              </div>
              <div className="border-t pt-4">
                {currentDoc.type === 'pdf' ? (
                  <div className="h-[calc(100vh-200px)]">
                    <iframe 
                      src={`/pdf-viewer?file=${encodeURIComponent(currentDoc.name)}`} 
                      className="w-full h-full border"
                      title={currentDoc.name}
                    />
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {currentDoc.content || `This is the content of ${currentDoc.name}. In a real app, this would display the actual document content.`}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // File browser
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => item.type === 'folder' ? navigateToFolder(item.id) : openDocument(item)}
                    className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center mb-2">
                      {item.type === 'folder' ? (
                        <FaFolder className="text-yellow-500 text-2xl mr-2" />
                      ) : item.type === 'pdf' ? (
                        <FaFilePdf className="text-red-500 text-2xl mr-2" />
                      ) : item.type === 'document' ? (
                        <FaFileAlt className="text-blue-500 text-2xl mr-2" />
                      ) : (
                        <FaFileImage className="text-green-500 text-2xl mr-2" />
                      )}
                      <span className="font-medium truncate">{item.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last opened: {item.lastOpened || 'Never'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  {searchQuery ? 'No matching documents found' : 'This folder is empty'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;