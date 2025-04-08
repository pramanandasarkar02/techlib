import React from 'react'
import { FaDownload, FaSave } from 'react-icons/fa'

const resList = [
    {
        "img_url": "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "title": "A Beautiful Day",
        "id": "bdsjhbajsdba1",
    },
    {
        "img_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlfGVufDB8fDB8fHww",
        "title": "Mountain Landscape",
        "id": "bdsjhbajsdba2",
    },
    {
        "img_url": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9yZXN0fGVufDB8fDB8fHww",
        "title": "Forest Path",
        "id": "bdsjhbajsdba3",
    },
]

const Recent = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Recent Visited Resources</h1>
        <ul className="space-y-4">
            {resList.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    {/* Image thumbnail */}
                    <div className="flex-shrink-0">
                        <img 
                            src={item.img_url} 
                            alt={item.title} 
                            className="w-16 h-16 object-cover rounded"
                        />
                    </div>
                    
                    {/* Title */}
                    <div className="flex-grow">
                        <h2 className="font-medium text-gray-800">{item.title}</h2>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <FaSave className="w-5 h-5"/>
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                            <FaDownload className="w-5 h-5"/>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Recent