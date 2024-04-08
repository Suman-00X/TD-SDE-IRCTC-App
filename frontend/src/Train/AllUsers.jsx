import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/users/users', config);
        setUsers(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
