import React, { useState, useEffect, useCallback } from "react";
import { FiClock, FiStar, FiEye, FiFilter } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { RiErrorWarningLine } from "react-icons/ri";
import { useUser } from "../contexts/userContext";

// Align with updated backend response
type Document = {
  document_id: number;
  author_id: number;
  author_firstname: string;
  author_lastname: string;
  title: string;
  description: string;
  file_path: string;
  document_type_id: number;
  document_type: string;
  is_public: boolean;
  view_count: number;
  like_count: number;
  avg_rating: number;
  created_at: string;
  updated_at: string;
};

// Fetch all documents
const fetchAllDocuments = async (userId: string): Promise<Document[]> => {
  try {
    const res = await fetch(`http://localhost:4040/api/v1/recommendations/${userId}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.documents) ? data.documents : [];
  } catch (error) {
    console.error("Error fetching all documents:", error);
    return [];
  }
};

const Explore: React.FC = () => {
  const { user } = useUser();
  const userId = user?.usedId|| "2"; // Fixed typo from usedId to userId
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"created_at" | "view_count" | "avg_rating">(
    "created_at"
  );

  // Fetch documents and apply filters
  const fetchAndFilterDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAllDocuments(userId);
      let filtered = data;

      // Apply visibility filter
      if (filter === "public") {
        filtered = filtered.filter((doc) => doc.is_public);
      } else if (filter === "private" && userId) {
        filtered = filtered.filter((doc) => !doc.is_public && doc.author_id === parseInt(userId));
      }

      // Apply document type filter
      if (documentTypeFilter !== "all") {
        filtered = filtered.filter(
          (doc) => doc.document_type === documentTypeFilter
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        if (sortBy === "view_count") {
          return b.view_count - a.view_count;
        } else if (sortBy === "avg_rating") {
          return b.avg_rating - a.avg_rating;
        } else {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      });

      setDocuments(data);
      setFilteredDocuments(filtered);
    } catch (err) {
      setError("Failed to fetch documents. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, documentTypeFilter, sortBy, userId]);

  useEffect(() => {
    fetchAndFilterDocuments();
  }, [fetchAndFilterDocuments]);

  // Get unique document types for filter dropdown
  const documentTypes = [
    "all",
    ...new Set(documents.map((doc) => doc.document_type)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Explore All Documents</h1>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {filteredDocuments.length} found
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="w-full md:w-1/4">
            <label
              htmlFor="visibility"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiFilter className="inline mr-2" />
              Visibility
            </label>
            <select
              id="visibility"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "public" | "private")
              }
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              {userId && <option value="private">My Private Documents</option>}
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiFilter className="inline mr-2" />
              Document Type
            </label>
            <select
              id="documentType"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={documentTypeFilter}
              onChange={(e) => setDocumentTypeFilter(e.target.value)}
            >
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4">
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              <FiFilter className="inline mr-2" />
              Sort By
            </label>
            <select
              id="sortBy"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "created_at" | "view_count" | "avg_rating"
                )
              }
            >
              <option value="created_at">Newest First</option>
              <option value="view_count">Most Viewed</option>
              <option value="avg_rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Document Grid */}
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
                <h3 className="text-sm font-medium text-red-800">
                  Error loading documents
                </h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <RiErrorWarningLine className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  No documents found
                </h3>
                <p className="text-sm text-blue-700">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.document_id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {doc.title}
                    </h2>
                    <span className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <FiClock className="mr-1" />
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {doc.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{doc.document_type.toUpperCase()}</span>
                    <span className={doc.is_public ? "text-green-500" : "text-red-500"}>
                      {doc.is_public ? "Public" : "Private"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 font-medium">
                      @{doc.author_firstname} {doc.author_lastname}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-sm text-gray-500">
                        <FiStar className="mr-1 text-yellow-400" />
                        {/* {doc.avg_rating.toFixed(1)} */}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <FiEye className="mr-1" />
                        {doc.view_count}
                      </span>
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