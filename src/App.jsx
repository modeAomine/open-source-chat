import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/registration/Register';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
    </Routes>
  );
}

export default App;