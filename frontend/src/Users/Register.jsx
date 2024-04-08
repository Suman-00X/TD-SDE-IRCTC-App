import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Assuming there are two types of users: "User" and "Admin"
const Register = () => {

  const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'User'
  });

  const { name, email, password, userType } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(res);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
      <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
      <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" />
      <select name="userType" value={userType} onChange={onChange}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

