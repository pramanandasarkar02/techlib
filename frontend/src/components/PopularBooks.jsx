import React from 'react';
import { Link } from 'react-router-dom';

const books = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Cormen, Leiserson, Rivest, Stein",
    cover: "/book-covers/clrs.jpg",
    rating: 4.8,
    notesCount: 42
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/book-covers/clean-code.jpg",
    rating: 4.7,
    notesCount: 35
  },
  {
    id: 3,
    title: "Design Patterns",
    author: "Gamma, Helm, Johnson, Vlissides",
    cover: "/book-covers/gof.jpg",
    rating: 4.6,
    notesCount: 28
  },
  {
    id: 4,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    cover: "/book-covers/tanenbaum.jpg",
    rating: 4.5,
    notesCount: 19
  }
];

const PopularBooks = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <img
              className="w-full h-48 object-contain mb-4"
              src={book.cover}
              alt={book.title}
            />
            <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`h-5 w-5 ${rating < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {book.rating} ({book.notesCount} notes)
              </span>
            </div>
            <div className="mt-4">
              <Link
                to={`/books/${book.id}`}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Notes →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularBooks;