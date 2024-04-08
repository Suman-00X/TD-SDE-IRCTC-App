import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
     key:''
  });

  const { email, password, key } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    console.log(formData);
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const token = res.data.token; // Extract token from response data
      localStorage.setItem('token', token);
      localStorage.setItem('api-key', key)
      console.log(token);
      navigate('/availability');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="4" />
        <label htmlFor="key">Only for Admins</label>
        <input type="key" placeholder="key" name="key" value={key} onChange={onChange} minLength="6" />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
