import React, { useState, useEffect, useCallback } from 'react';
import { FiHeart, FiClock, FiTrendingUp, FiStar, FiCalendar, FiEye } from 'react-icons/fi';
import { FaHeart, FaRegClock, FaFire, FaRegStar, FaCalendarAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';
import { ImSpinner8 } from 'react-icons/im';

type Document = {
  id: number;
  title: string;
  description: string;
  author: string;
  createdAt?: string;
  likes?: number;
  views?: number;
  isbn?: string;
  genre?: string;
  published_year?: number;
  publisher?: string;
  cover_image?: string;
  average_rating?: number;
};

const fetchRecommendedDocuments = async (userId: string): Promise<Document[]> => {
  try {
    const res = await fetch(`http://localhost:4040/api/v1/recommendations/${userId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    // Extract the recommendedBooks array, or return empty array if not present
    return Array.isArray(data.recommendedBooks) ? data.recommendedBooks : [];
  } catch (error) {
    console.error('Error fetching recommended documents:', error);
    return [];
  }
};

const fetchTrendingDocuments = async (): Promise<Document[]> => {
  try {
    const res = await fetch(`http://localhost:4040/api/v1/recommendations/trending/`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    // Extract the recommendedBooks array, or return empty array if not present
    return Array.isArray(data.recommendedBooks) ? data.recommendedBooks : [];
  } catch (error) {
    console.error('Error fetching trending documents:', error);
    return [];
  }
};

const fetchNewDocuments = async (userId: string): Promise<Document[]> => {
  try {
    const res = await fetch(`http://localhost:4040/api/v1/recommendations/new/${userId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    // Extract the recommendedBooks array, or return empty array if not present
    return Array.isArray(data.recommendedBooks) ? data.recommendedBooks : [];
  } catch (error) {
    console.error('Error fetching new documents:', error);
    return [];
  }
};

const Explore: React.FC = () => {
  const userId = '4ave3g';
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'recommended' | 'trending' | 'new'>('recommended');
  const [timeRange, setTimeRange] = useState<'all' | 'week' | 'month'>('all');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Document[];
      switch (filter) {
        case 'recommended':
          data = await fetchRecommendedDocuments(userId);
          break;
        case 'trending':
          data = await fetchTrendingDocuments();
          break;
        case 'new':
          data = await fetchNewDocuments(userId);
          break;
        default:
          data = await fetchRecommendedDocuments(userId);
      }

      if (timeRange !== 'all') {
        const now = new Date();
        data = data.filter((doc) => {
          if (!doc.createdAt) return true; // Skip filtering if no createdAt
          const docDate = new Date(doc.createdAt);
          if (isNaN(docDate.getTime())) return true; // Skip invalid dates
          const diffTime = now.getTime() - docDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return timeRange === 'week' ? diffDays <= 7 : diffDays <= 30;
        });
      }

      setDocuments(data);
    } catch (err) {
      setError('Failed to fetch documents. Please try again later.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, timeRange, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getFilterIcon = () => {
    switch (filter) {
      case 'recommended':
        return <FiStar className="inline mr-2" />;
      case 'trending':
        return <FiTrendingUp className="inline mr-2" />;
      case 'new':
        return <FiClock className="inline mr-2" />;
      default:
        return <FiStar className="inline mr-2" />;
    }
  };

  const getTimeRangeIcon = () => {
    switch (timeRange) {
      case 'week':
        return <IoMdTime className="inline mr-2" />;
      case 'month':
        return <FiCalendar className="inline mr-2" />;
      default:
        return <FaCalendarAlt className="inline mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Explore Documents</h1>
          <span className="ml-4 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {documents.length} found
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="w-full md:w-1/3">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              {getFilterIcon()} Content Type
            </label>
            <select
              id="filter"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'recommended' | 'trending' | 'new')}
            >
              <option value="recommended">Recommended</option>
              <option value="trending">Trending</option>
              <option value="new">New</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
              {getTimeRangeIcon()} Time Range
            </label>
            <select
              id="timeRange"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'all' | 'week' | 'month')}
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm">
            <ImSpinner8 className="animate-spin h-12 w-12 text-indigo-500 mb-4" />
            <p className="text-gray-600">Loading documents...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <RiErrorWarningLine className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error loading documents</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <RiErrorWarningLine className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">No documents found</h3>
                <p className="text-sm text-blue-700">Try adjusting your filters or check back later.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{doc.title}</h2>
                    <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <FiClock className="mr-1" />
                      {doc.createdAt
                        ? new Date(doc.createdAt).toLocaleDateString()
                        : doc.published_year || 'N/A'}
                    </span>
                  </div>
                  {doc.cover_image && (
                    <img
                      src={doc.cover_image}
                      alt={`Cover of ${doc.title}`}
                      className="w-full h-48 object-cover mb-4 rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <p className="text-gray-600 mb-4 line-clamp-3">{doc.description || 'No description available'}</p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">@{doc.author}</span>

                    <div className="flex items-center space-x-3">
                      {doc.average_rating !== undefined && (
                        <span className="flex items-center text-sm text-gray-500">
                          <FiStar className="mr-1 text-yellow-400" />
                          {doc.average_rating.toFixed(1)}
                        </span>
                      )}
                      {doc.views !== undefined && (
                        <span className="flex items-center text-sm text-gray-500">
                          <FiEye className="mr-1" />
                          {doc.views}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;