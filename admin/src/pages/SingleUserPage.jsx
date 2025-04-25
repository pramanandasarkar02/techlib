import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleUserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:4040/api/v1/admin/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Extract the first user from the array if data.user is an array
        const userData = Array.isArray(data.user) ? data.user[0] : data.user || data;
        if (!userData) {
          throw new Error('No user data found');
        }
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700">Details</h3>
            <p><strong>ID:</strong> {user._id}</p>
            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            {user.role && <p><strong>Role:</strong> {user.role}</p>}
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Activity</h3>
            {user.join_at && (
              <p><strong>Joined:</strong> {new Date(user.join_at).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/users"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;