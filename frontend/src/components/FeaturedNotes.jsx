import React from 'react';
import { Link } from 'react-router-dom';

const notes = [
  {
    id: 1,
    title: "Dynamic Programming Summary",
    book: "Introduction to Algorithms",
    author: "Jane Doe",
    date: "2 days ago",
    downloads: 124,
    rating: 4.9
  },
  {
    id: 2,
    title: "SOLID Principles Explained",
    book: "Clean Code",
    author: "John Smith",
    date: "1 week ago",
    downloads: 98,
    rating: 4.7
  },
  {
    id: 3,
    title: "Observer Pattern Examples",
    book: "Design Patterns",
    author: "Alex Johnson",
    date: "3 days ago",
    downloads: 76,
    rating: 4.5
  },
  {
    id: 4,
    title: "TCP/IP Protocol Stack",
    book: "Computer Networks",
    author: "Sam Wilson",
    date: "5 days ago",
    downloads: 65,
    rating: 4.6
  }
];

const FeaturedNotes = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {note.title}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {note.rating}/5.0
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {note.book}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      by {note.author}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {note.date} • {note.downloads} downloads
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-4 py-4 sm:px-6 text-center">
        <Link
          to="/notes"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          View All Notes →
        </Link>
      </div>
    </div>
  );
};

export default FeaturedNotes;