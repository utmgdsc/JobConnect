import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const { name, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
    <form onSubmit={onSubmit}>
      <input
        type='text'
        placeholder='username'
        name='name'
        value={name}
        onChange={onChange}
        required
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
        required
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={onChange}
        minLength='6'
      />
      <button type='submit'>Register</button>
    </form>
    {message && <p>{message}</p>} 
    </div>
  );
};

export default Register;
