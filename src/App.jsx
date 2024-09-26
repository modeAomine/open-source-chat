import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/middleware/AuthContext';
import Register from './components/registration/Register';
import Login from './components/login/Login';
import Chat from './components/chat/Chat';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Chat />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './components/middleware/AuthContext';
// import Register from './components/registration/Register';
// import Login from './components/login/Login';
// import Chat from './components/chat/Chat';

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute>
//                 <Chat />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/" element={<Navigate to="/chat" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;