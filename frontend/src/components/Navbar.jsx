import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const profileInfo = {
    name: "Pramananda Sarkar",
    img_url: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
    profile_id: "pramanandasarkar02"
};

const Navbar = () => {
    const [isLogin, setIsLogIn] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close menu when pressing Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            TechLib
                        </h2>
                    </Link>

                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/explore"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Explore
                        </Link>
                        <Link
                            to="/trending"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Trend
                        </Link>
                        <Link
                            to="/collection"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Collections
                        </Link>
                        <Link
                            to="/workspace"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            WorkSpace
                        </Link>
                        <Link
                            to="/help"
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Help
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center space-x-4" ref={profileRef}>
                        {isLogin ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center focus:outline-none"
                                >
                                    <img
                                        src={profileInfo.img_url}
                                        alt="Profile"
                                        className="h-10 w-10 rounded-full object-cover border-2 border-blue-100 cursor-pointer hover:border-blue-200 transition-colors"
                                    />
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-medium text-gray-900">{profileInfo.name}</p>
                                            <p className="text-xs text-gray-500">@{profileInfo.profile_id}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Show Profile
                                        </Link>
                                        <Link
                                            to="/profile/edit"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Edit Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsLogIn(false);
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;