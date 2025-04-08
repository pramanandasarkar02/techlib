import React from 'react';
import { Link } from 'react-router-dom';

const contributors = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    contributions: 42,
    followers: 128
  },
  {
    id: 2,
    name: "Sam Wilson",
    avatar: "/avatars/sam.jpg",
    contributions: 38,
    followers: 95
  },
  {
    id: 3,
    name: "Taylor Swift",
    avatar: "/avatars/taylor.jpg",
    contributions: 31,
    followers: 87
  },
  {
    id: 4,
    name: "Jordan Smith",
    avatar: "/avatars/jordan.jpg",
    contributions: 28,
    followers: 76
  }
];

const TopContributors = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {contributors.map((contributor) => (
        <div key={contributor.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={contributor.avatar}
                alt={contributor.name}
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{contributor.name}</h3>
                <p className="text-sm text-gray-500">
                  {contributor.contributions} contributions
                </p>
                <p className="text-sm text-gray-500">
                  {contributor.followers} followers
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to={`/contributors/${contributor.id}`}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopContributors;