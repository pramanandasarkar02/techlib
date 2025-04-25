import React, { useState } from 'react';

const User = () => {
    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/v1/admin/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users || data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    
    return (
      <div className="container mx-auto p-4">
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
          onClick={fetchUsers}
        >
          Fetch Users
        </button>
        <div className="mt-4">
          {users.length > 0 ? (
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user._id} className="p-4 border rounded hover:bg-gray-50">
                  <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <a 
                    href={`/users/${user._id}`} 
                    className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
                  >
                    View Details
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No users fetched yet. Click the button to fetch users.</p>
          )}
        </div>
      </div>
    );
}

export default User;