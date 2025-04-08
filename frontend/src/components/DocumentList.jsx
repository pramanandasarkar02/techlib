import React from 'react';
import DocumentCard from './DocumentCard';

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

const DocumentList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Document Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
};

export default DocumentList;