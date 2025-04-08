import React from 'react';
import { useParams } from 'react-router-dom';

const demoComments = [
  { id: 1, user: "Alice", text: "This book helped me pass my exams!", date: "2023-05-10" },
  { id: 2, user: "Bob", text: "The MIPS section is particularly well-explained.", date: "2023-04-22" },
  { id: 3, user: "Charlie", text: "A must-read for computer science students.", date: "2023-03-15" },
];

const demoDocuments = [
  {
    id: 1,
    cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1679630905i/123675222.jpg",
    title: "Computer Architecture by R. Patterson",
    type: ["computer architecture", "MIPS"],
    description: "A comprehensive guide to modern computer architecture.",
    size: "2MB",
    release_date: "March 2022",
    doc_url: "#",
    like: 25,
    dislike: 4,
    download: 55,
  },
  {
    id: 2,
    cover_image_url: "https://images-na.ssl-images-amazon.com/images/I/71eJk7GtUOL._AC_UL600_SR600,600_.jpg",
    title: "Operating Systems: Three Easy Pieces",
    type: ["OS", "Kernel", "Systems"],
    description: "A modern approach to understanding operating systems.",
    size: "3.5MB",
    release_date: "January 2021",
    doc_url: "#",
    like: 42,
    dislike: 2,
    download: 120,
  },
  {
    id: 3,
    cover_image_url: "https://img.freepik.com/free-vector/gradient-ai-template-design_23-2150380016.jpg",
    title: "Artificial Intelligence: A Modern Approach",
    type: ["AI", "Machine Learning"],
    description: "The standard textbook on artificial intelligence.",
    size: "5MB",
    release_date: "November 2020",
    doc_url: "#",
    like: 89,
    dislike: 7,
    download: 210,
  },
];

const SingleDocumentPage = () => {
  const { id } = useParams();
  const document = demoDocuments.find(doc => doc.id === parseInt(id));

  if (!document) {
    return <div>Document not found!</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <img 
            src={document.cover_image_url} 
            alt={document.title} 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-2">{document.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {document.type.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-4">{document.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">File Size</p>
              <p className="font-medium">{document.size}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Release Date</p>
              <p className="font-medium">{document.release_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
              👍 Like ({document.like})
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center gap-2">
              👎 Dislike ({document.dislike})
            </button>
            <a 
              href={document.doc_url} 
              download
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ⬇️ Download ({document.download})
            </a>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Comments ({demoComments.length})</h2>
        <div className="space-y-4">
          {demoComments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.user}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <textarea 
            placeholder="Add a comment..." 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleDocumentPage;