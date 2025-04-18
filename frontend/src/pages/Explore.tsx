import React, { useState, useEffect } from 'react'
import { FiHeart, FiClock, FiTrendingUp, FiStar, FiCalendar, FiEye } from 'react-icons/fi'
import { FaHeart, FaRegClock, FaFire, FaRegStar, FaCalendarAlt } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { RiErrorWarningLine } from 'react-icons/ri'
import { ImSpinner8 } from 'react-icons/im'

type Document = {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
    likes: number;
    views?: number;
    // add other properties as needed
}

const fetchRecommendedDocuments = async (userId: string): Promise<Document[]> => {
    const res = await fetch(`http://localhost:5000/api/v1/recommendations/${userId}`)
    return await res.json()
} 

const fetchTrendingDocuments = async (): Promise<Document[]> => {
    const res = await fetch(`http://localhost:5000/api/v1/trending/`)
    return await res.json()
}

const fetchNewDocuments = async (userId: string): Promise<Document[]> => {
    const res = await fetch(`http://localhost:5000/api/v1/new/${userId}`)
    return await res.json()
}

const Explore = () => {
    const userId = "4ave3g";
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'recommended' | 'trending' | 'new'>('recommended');
    const [timeRange, setTimeRange] = useState<'all' | 'week' | 'month'>('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let data;
                
                if (filter === 'recommended') {
                    data = await fetchRecommendedDocuments(userId);
                } else if (filter === 'trending') {
                    data = await fetchTrendingDocuments();
                } else {
                    data = await fetchNewDocuments(userId);
                }

                if (timeRange !== 'all') {
                    const now = new Date();
                    data = data.filter((doc: Document) => {
                        const docDate = new Date(doc.createdAt);
                        const diffTime = now.getTime() - docDate.getTime();
                        const diffDays = diffTime / (1000 * 60 * 60 * 24);
                        
                        return timeRange === 'week' ? diffDays <= 7 : diffDays <= 30;
                    });
                }

                setDocuments(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch documents. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filter, timeRange]);

    const getFilterIcon = () => {
        switch (filter) {
            case 'recommended': return <FiStar className="inline mr-2" />;
            case 'trending': return <FiTrendingUp className="inline mr-2" />;
            case 'new': return <FiClock className="inline mr-2" />;
            default: return <FiStar className="inline mr-2" />;
        }
    };

    const getTimeRangeIcon = () => {
        switch (timeRange) {
            case 'week': return <IoMdTime className="inline mr-2" />;
            case 'month': return <FiCalendar className="inline mr-2" />;
            default: return <FaCalendarAlt className="inline mr-2" />;
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
                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                        >
                            <option value="recommended"><FiStar className="inline mr-2" /> Recommended</option>
                            <option value="trending"><FiTrendingUp className="inline mr-2" /> Trending</option>
                            <option value="new"><FiClock className="inline mr-2" /> New</option>
                        </select>
                    </div>
                    
                    <div className="w-full md:w-1/3">
                        <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
                            {getTimeRangeIcon()} Time Range
                        </label>
                        <select
                            id="timeRange"
                            className="w-full p-2 pl-8 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as any)}
                        >
                            <option value="all"><FaCalendarAlt className="inline mr-2" /> All Time</option>
                            <option value="week"><IoMdTime className="inline mr-2" /> Last Week</option>
                            <option value="month"><FiCalendar className="inline mr-2" /> Last Month</option>
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
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {documents.map((doc) => (
                            <div key={doc.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{doc.title}</h2>
                                        <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            <FiClock className="mr-1" /> {new Date(doc.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{doc.description}</p>
                                    
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500 font-medium">@{doc.author}</span>
                                        
                                        <div className="flex items-center space-x-3">
                                            <span className="flex items-center text-sm text-gray-500">
                                                {doc.likes > 0 ? (
                                                    <FaHeart className="mr-1 text-red-500" />
                                                ) : (
                                                    <FiHeart className="mr-1" />
                                                )}
                                                {doc.likes}
                                            </span>
                                            {doc.views && (
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
    )
}

export default Explore