import React, { useState } from 'react'


const Document = () => {
    const [documents, setDocuments] = useState([]);
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/v1/documents');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
  return (
    <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={fetchDocuments}>Fetch Documents</button>
        <ul>
          {documents.map((document) => (
            <li key={document._id}>{document.title}</li>
          ))}
        </ul>

    </div>
  )
}

export default Document