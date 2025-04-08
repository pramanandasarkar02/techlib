import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PopularBooks from '../components/PopularBooks';
import FeaturedNotes from '../components/FeaturedNotes';
import TopContributors from '../components/TopContributors';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">CS BookNotes</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/upload" className="px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                Upload Notes
              </Link>
              <Link to="/books" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Browse Books
              </Link>
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero 
          title="Share & Discover Computer Science Knowledge"
          subtitle="A collaborative platform for CS students and professionals to share book notes and resources"
          ctaText="Upload Your Notes"
          ctaLink="/upload"
        />
        
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <SearchBar />
        </div>
        
        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <Categories />
        </div>
        
        {/* Popular Books */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Computer Science Books</h2>
          <PopularBooks />
        </div>
        
        {/* Featured Notes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added Notes</h2>
          <FeaturedNotes />
        </div>
        
        {/* Top Contributors */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Contributors</h2>
          <TopContributors />
          <div className="mt-6 text-center">
            <Link 
              to="/contributors" 
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View All Contributors →
            </Link>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-indigo-700 mt-12">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to share your knowledge?
                </h2>
                <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                  Join our community of computer science enthusiasts and help others learn by sharing your book notes and summaries.
                </p>
              </div>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:justify-end">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;