import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
            navigate('/chat')
        } else {
            setIsAuthenticated(false);
            navigate('/login')
        }
    }, [navigate]);

    const login = (token) => {
        localStorage.setItem('access_token', token);
        setIsAuthenticated(true);
    };

    const logout = (token) => {
        localStorage.setItem('access_token');
        localStorage.setItem('refresh_token')
        setIsAuthenticated(false);
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider> 
    );
};

export const useAuth = () => useContext(AuthContext);