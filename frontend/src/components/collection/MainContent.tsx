import React from 'react';

import DocumentList from './DocumentList';
import UploadWindow from './UploadWindow';
import { TabType } from './types';

type MainContentProps = {
  activeTab: TabType;
  userId: string;
  searchQuery: string;
};

const MainContent: React.FC<MainContentProps> = ({ activeTab, userId, searchQuery }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'saved': return 'Saved Documents';
      case 'liked': return 'Liked Documents';
      case 'downloaded': return 'Downloaded Documents';
      case 'upload': return 'Upload Documents';
      default: return 'Documents';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {getTitle()}
        </h2>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === 'upload' ? (
          <UploadWindow />
        ) : (
          <DocumentList 
            type={activeTab} 
            userId={userId} 
            searchQuery={searchQuery} 
          />
        )}
      </main>
    </div>
  );
};

export default MainContent;