import React from "react";
import { FaBook, FaHeart, FaLink, FaPenAlt, FaUserFriends, FaEdit } from "react-icons/fa";


const sampleUser = {
  name: "Alex Johnson",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Digital librarian and open knowledge advocate. Sharing resources to democratize education.",
  uploadCount: 47,
  followers: 128,
  likesReceived: 356,
  interests: [
    "Open Educational Resources",
    "Digital Humanities",
    "Information Science",
    "Creative Commons",
    "Academic Publishing"
  ],
  documents: [
    {
      id: 1,
      title: "Guide to Open Access Publishing",
      category: "Education",
      likes: 89,
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Digital Preservation Techniques",
      category: "Technology",
      likes: 64,
      date: "2023-08-22"
    },
    {
      id: 3,
      title: "Building Community Archives",
      category: "Community",
      likes: 42,
      date: "2023-05-30"
    },
    {
      id: 4,
      title: "Copyright for Educators",
      category: "Law",
      likes: 37,
      date: "2023-03-12"
    }
  ],
  posts: [
    {
      id: 1,
      title: "Why Open Access Matters in 2024",
      content: "The open access movement continues to transform how knowledge circulates globally. In this post, I explore the latest trends and challenges facing OA advocates...",
      likes: 24,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "My Favorite Resource Sharing Platforms",
      content: "After years of collecting and sharing educational materials, here are my top 5 platforms for discovering and distributing open resources...",
      likes: 18,
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Upcoming Webinar on Digital Libraries",
      content: "Join me next Thursday for a discussion about sustainable models for community-driven digital archives...",
      likes: 12,
      date: "2 weeks ago"
    }
  ]
};

const Profile = () => {
  const user = sampleUser;
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img 
            src={user.avatar || "/default-avatar.png"} 
            alt={`${user.name}'s profile`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-100 shadow-md"
          />
          <button className="mt-3 flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            <FaEdit className="text-sm" /> Edit Profile
          </button>
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600 mt-2">{user.bio || "Book enthusiast and knowledge sharer"}</p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FaBook className="text-indigo-500" />
              <span>{user.uploadCount || 0} Resources</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaUserFriends className="text-indigo-500" />
              <span>{user.followers || 0} Followers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaHeart className="text-indigo-500" />
              <span>{user.likesReceived || 0} Likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaHeart className="text-indigo-500" /> Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.interests?.length > 0 ? (
            user.interests.map((interest, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {interest}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No interests added yet</p>
          )}
        </div>
      </div>

      {/* Connectivity Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaLink className="text-indigo-500" /> Connect
        </h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Follow
          </button>
          <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
            Message
          </button>
        </div>
      </div>

      {/* Published Documents Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaBook className="text-indigo-500" /> Published Resources
        </h2>
        {user.documents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.documents.slice(0, 4).map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">{doc.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{doc.category}</p>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                  <FaHeart className="text-red-400" /> {doc.likes} likes
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No resources published yet</p>
        )}
        {user.documents?.length > 4 && (
          <button className="mt-4 text-indigo-600 hover:underline">
            View all {user.documents.length} resources
          </button>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <FaPenAlt className="text-indigo-500" /> Recent Posts
        </h2>
        {user.posts?.length > 0 ? (
          <div className="space-y-4">
            {user.posts.slice(0, 3).map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-400" /> {post.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet</p>
        )}
        {user.posts?.length > 3 && (
          <button className="mt-4 text-indigo-600 hover:underline">
            View all {user.posts.length} posts
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;