import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Algorithms", icon: "🧮", count: 128 },
  { name: "Data Structures", icon: "📊", count: 95 },
  { name: "Artificial Intelligence", icon: "🤖", count: 87 },
  { name: "Database Systems", icon: "🗄️", count: 76 },
  { name: "Operating Systems", icon: "💻", count: 68 },
  { name: "Computer Networks", icon: "🌐", count: 59 },
  { name: "Software Engineering", icon: "🛠️", count: 52 },
  { name: "Web Development", icon: "🕸️", count: 48 }
];

const Categories = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
            className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{category.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} resources</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;