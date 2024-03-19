import React, { useState } from 'react';
import axios from 'axios';
import isAuth from "../lib/isAuth";
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setloginDetails] = useState({
    email: '',
    password: '',
  });

  const { email, password} = loginDetails;
//   const history = useHistory();
  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };
  const onChange = e =>
    setloginDetails({ ...loginDetails, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      const token = res.data.token;
      const type = res.data.type
      console.log("token"+token)
      // localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoggedin(isAuth());
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
