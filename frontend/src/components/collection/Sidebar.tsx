import React from 'react';
import { FiBook, FiHeart, FiDownload, FiUpload, FiSearch, FiX } from 'react-icons/fi';
import { TabType } from './types';


type SidebarProps = {
  activeTab: TabType;
  searchQuery: string;
  onTabChange: (tab: TabType) => void;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  searchQuery, 
  onTabChange, 
  onSearchChange,
  onClearSearch
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <h1 className="text-xl font-bold text-gray-800 mb-6">TechLib Collections</h1>
      
      <div className="mb-6 relative">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search collections..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={onClearSearch}
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
              onClick={() => onTabChange('saved')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'saved' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiBook className="mr-3" />
              Saved Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('liked')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'liked' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiHeart className="mr-3" />
              Liked Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('downloaded')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${activeTab === 'downloaded' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiDownload className="mr-3" />
              Downloaded Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('upload')}
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
  );
};

export default Sidebar;