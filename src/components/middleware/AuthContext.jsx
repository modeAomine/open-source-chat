import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, current_user, refresh_token } from '../service/api.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(false);
    const [tokensChecked, setTokensChecked] = useState(false);
    const navigate = useNavigate();

    const logoutUser = useCallback(async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Ошибка выхода:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        }
    }, [navigate]);

    const handleTokenRefresh = useCallback(async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            return logoutUser();
        }
        try {
            const newTokens = await refresh_token(refreshToken);
            localStorage.setItem('access_token', newTokens.access_token);
            localStorage.setItem('refresh_token', newTokens.refresh_token);
            await fetchUser(newTokens.access_token);
        } catch (refreshError) {
            console.error('Ошибка обновления токена:', refreshError);
            logoutUser();
        }
    }, [logoutUser]);

    const fetchUser = useCallback(async (accessToken) => {
        if (isFetchingUser || user) return;
        setIsFetchingUser(true);
        try {
            const userData = await current_user(accessToken);
            setUser(userData);
            setIsAuthenticated(true);
            navigate('/chat');
        } catch (error) {
            console.error('Ошибка получения данных пользователя:', error);
            if (error.response && error.response.status === 401) {
                await handleTokenRefresh();
            } else {
                logoutUser();
            }
        } finally {
            setIsFetchingUser(false);
        }
    }, [isFetchingUser, user, navigate, logoutUser, handleTokenRefresh]);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (!tokensChecked && accessToken && refreshToken && !isAuthenticated) {
            fetchUser(accessToken);
            setTokensChecked(true);
        } else if (!accessToken && refreshToken) {
            handleTokenRefresh();
        } else {
            setTokensChecked(true);
        }
    }, [fetchUser, tokensChecked, isAuthenticated, handleTokenRefresh]);

    const login = async (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setIsAuthenticated(true);
        fetchUser(accessToken);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout: logoutUser, user, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);