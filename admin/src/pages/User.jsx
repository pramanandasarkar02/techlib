import React, { useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4040/api/v1/admin/users');
        const data = await response.json();
        console.log(data);
        
        setUsers(data.users || data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    
    return (
      <div>
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
                <li key={user._id} className="p-2 border rounded">
                  <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No users fetched yet. Click the button to fetch users.</p>
          )}
        </div>
      </div>
    )
}

export default User;