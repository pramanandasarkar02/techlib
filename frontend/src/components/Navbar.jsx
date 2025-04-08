import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCompass, FiTrendingUp, FiFolder, FiUser, FiHelpCircle, FiUpload } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:relative md:border-t-0 md:border-b z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between md:justify-start">
          {/* Mobile/Tablet View - Horizontal */}
          <div className="flex w-full md:hidden">
            <Link to="/" className={`flex flex-col items-center py-2 px-4 flex-1 ${isActive('/')}`}>
              <FiHome className="text-xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/explore" className={`flex flex-col items-center py-2 px-4 flex-1 ${isActive('/explore')}`}>
              <FiCompass className="text-xl" />
              <span className="text-xs mt-1">Explore</span>
            </Link>
            <Link to="/trending" className={`flex flex-col items-center py-2 px-4 flex-1 ${isActive('/trending')}`}>
              <FiTrendingUp className="text-xl" />
              <span className="text-xs mt-1">Trending</span>
            </Link>
            <Link to="/collection" className={`flex flex-col items-center py-2 px-4 flex-1 ${isActive('/collection')}`}>
              <FiFolder className="text-xl" />
              <span className="text-xs mt-1">Collections</span>
            </Link>
            <Link to="/profile/me" className={`flex flex-col items-center py-2 px-4 flex-1 ${isActive('/profile')}`}>
              <FiUser className="text-xl" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>

          {/* Desktop View - Vertical */}
          <div className="hidden md:flex md:space-x-6 lg:space-x-8 w-full">
            <Link to="/" className={`flex items-center py-4 px-2 ${isActive('/')}`}>
              <FiHome className="text-xl mr-3" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/explore" className={`flex items-center py-4 px-2 ${isActive('/explore')}`}>
              <FiCompass className="text-xl mr-3" />
              <span className="font-medium">Explore</span>
            </Link>
            <Link to="/trending" className={`flex items-center py-4 px-2 ${isActive('/trending')}`}>
              <FiTrendingUp className="text-xl mr-3" />
              <span className="font-medium">Trending</span>
            </Link>
            <Link to="/collection" className={`flex items-center py-4 px-2 ${isActive('/collection')}`}>
              <FiFolder className="text-xl mr-3" />
              <span className="font-medium">Collections</span>
            </Link>
            <div className="flex-grow"></div>
            <Link to="/help" className={`flex items-center py-4 px-2 ${isActive('/help')}`}>
              <FiHelpCircle className="text-xl mr-3" />
              <span className="font-medium">Help</span>
            </Link>
            <Link 
              to="/workspace" 
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4"
            >
              <FiUpload className="mr-2" />
              <span>Upload</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;