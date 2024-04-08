import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("token", localStorage.getItem('token'))
    const fetchProfile = async () => {
      try {
        // Fetch user profile data from the backend
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `${localStorage.getItem('token')}` 
          }
        });
        setUser(res.data); // Set the user profile data in the state
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Name: {user.name}</h2>
          <h2>Email: {user.email}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
