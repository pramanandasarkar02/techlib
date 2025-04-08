import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaBook, FaGlobe, FaCamera, FaSave } from 'react-icons/fa';

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


  const onSave = (updatedUser) => {
    console.log('Updated user:', updatedUser);
    // Typically you would send this to your backend API
    alert('Profile saved successfully!');
  };

const EditProfilePage = () => {
    const user = sampleUser;
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    website: user.website || '',
    interests: user.interests?.join(', ') || '',
    avatar: user.avatar || ''
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(user.avatar || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedUser = {
        ...formData,
        interests: formData.interests.split(',').map(item => item.trim()).filter(item => item)
      };
      onSave(updatedUser);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={previewImage || '/default-avatar.png'} 
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700"
              >
                <FaCamera className="text-sm" />
                <input 
                  id="avatar-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-sm text-gray-500">Recommended size: 200x200 pixels</p>
              <p className="text-sm text-gray-500">JPG, PNG, or GIF (max 2MB)</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaUser className="text-indigo-500" /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaEnvelope className="text-indigo-500" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="bio" className="block text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Tell others about yourself..."
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="website" className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaGlobe className="text-indigo-500" /> Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-gray-700 mb-1 flex items-center gap-2">
              <FaBook className="text-indigo-500" /> Interests (comma separated)
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="e.g. Education, Technology, Open Access"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

// Example usage with the sample user from previous example
const EditProfileWrapper = () => {
  const handleSave = (updatedUser) => {
    console.log('Updated user:', updatedUser);
    // Typically you would send this to your backend API
    alert('Profile saved successfully!');
  };

  return <EditProfilePage 
    user={{
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Digital librarian and open knowledge advocate. Sharing resources to democratize education.",
      website: "https://alexjohnson.dev",
      interests: ["Open Educational Resources", "Digital Humanities"]
    }} 
    onSave={handleSave} 
  />;
};

export default EditProfilePage;