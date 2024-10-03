import React, { useState } from 'react';
import { registerUser } from '../service/api.jsx';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './registration.css';
import logo from '../../static/logo.svg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Username must contain only English letters and numbers';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/.test(password)) {
      newErrors.password = 'Password must be 6-20 characters long and contain at least one letter, one number, and one special character';
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        toast.error(errors[key], {
          position: 'bottom-right',
          autoClose: 3000,
        });
      });
    } else {
      try {
        const response = await registerUser({ username, email, password });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message,
        });
        navigate('/login');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed',
        });
      }
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='button__submit' type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <p className="login-link">
        Есть аккаунт? <a href="/login">Авторизуйтесь</a>.
      </p>
    </div>
  );
};

export default Register;