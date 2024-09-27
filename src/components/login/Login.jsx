import React, { useState } from 'react';
import { loginUser } from '../service/api.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../static/logo.svg';
import { useAuth } from '../middleware/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful',
      });
      login(response.access_token, response.refresh_token);
      navigate('/chat');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='button__login' type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p className="register-link">
        Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>.
      </p>
    </div>
  );
};

export default Login;