import React, { useState } from 'react';

import { 
  FiEdit, FiCheck, FiX, FiMessageSquare, 
  FiMapPin, FiLink, FiCalendar, FiUpload,

} from 'react-icons/fi';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useUser } from '../contexts/userContext';

type ProfileData = {
  name: string;
  bio: string;
  location: string;
  website: string;
  followers: number;
  following: number;
  documents: number;
  isFollowing?: boolean;
};

const Profile = ({ isPublic = false }: { isPublic?: boolean }) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Alex Johnson',
    bio: 'Building digital experiences | React enthusiast | Open source contributor',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    followers: 1242,
    following: 583,
    documents: 47,
    isFollowing: false
  });

  const toggleFollow = () => {
    setProfile(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => setIsEditing(false);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="relative">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover"
          />
          {!isPublic && user && isEditing && (
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-sm hover:bg-blue-600 transition">
              <FiEdit size={16} />
            </button>
          )}
        </div>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="text-2xl font-bold w-full p-2 border-b border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="text-gray-600 w-full p-2 border-b border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-gray-600 mt-2">{profile.bio}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            {!isPublic && user ? (
              isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                  >
                    <FiX size={16} /> Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <FiCheck size={16} /> Save
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <FiEdit size={16} /> Edit Profile
                </button>
              )
            ) : (
              <>
                <button 
                  onClick={toggleFollow}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-2 ${
                    profile.isFollowing 
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200' 
                      : 'text-white bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {profile.isFollowing ? (
                    <>
                      <FiCheck size={16} /> Following
                    </>
                  ) : (
                    'Follow'
                  )}
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                  <FiMessageSquare size={16} /> Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats and Info */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition cursor-pointer">
          <div className="text-2xl font-bold text-gray-800">{profile.documents}</div>
          <div className="text-sm text-gray-500 mt-1">Documents</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition cursor-pointer">
          <div className="text-2xl font-bold text-gray-800">{profile.followers}</div>
          <div className="text-sm text-gray-500 mt-1">Followers</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition cursor-pointer">
          <div className="text-2xl font-bold text-gray-800">{profile.following}</div>
          <div className="text-sm text-gray-500 mt-1">Following</div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                name="website"
                value={profile.website}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <FiMapPin className="text-gray-400" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiLink className="text-gray-400" />
              <a href={`https://${profile.website}`} className="text-blue-500 hover:underline">{profile.website}</a>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiCalendar className="text-gray-400" />
              <span>Joined June 2018</span>
            </div>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isPublic ? 'Public Documents' : 'My Documents'}
          </h3>
          {!isPublic && user && (
            <button className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-2">
              <FiUpload size={16} /> Upload New
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(doc => (
            <div key={doc} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">React Advanced Patterns {doc}</h4>
                <div className="flex items-center text-sm text-yellow-500">
                  {doc % 2 === 0 ? <FaStar /> : <FaRegStar />}
                  <span className="ml-1">4.{doc}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-1">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">React</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">TypeScript</span>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;