import React, { useState } from 'react';
import Sidebar from '../components/collection/Sidebar';
import MainContent from '../components/collection/MainContent';
import { TabType } from '../components/collection/types';


const Collection: React.FC = () => {
  const userId = '1'; // In a real app, this would come from auth context
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        searchQuery={searchQuery}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
      />
      
      <MainContent
        activeTab={activeTab}
        userId={userId}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Collection;