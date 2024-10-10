import React, { useState, useEffect } from 'react';
import './searchBar.css';
import { search_user } from '../../../service/api'; // Предполагается, что этот API запрос возвращает список найденных пользователей

const SearchBar = ({ setSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length > 1) {  // Начинать поиск только если более 1 символа
            setIsLoading(true);
            const delayDebounceFn = setTimeout(() => {
                search_user(searchTerm)
                    .then(data => {
                        setSearchResults(data);
                        setIsLoading(false);  // Убираем индикатор загрузки
                    })
                    .catch(err => {
                        console.error(err);
                        setIsLoading(false);  // Убираем индикатор загрузки при ошибке
                    });
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, setSearchResults]);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {isLoading && <div className="loading-spinner">Загрузка...</div>} {/* Индикатор загрузки */}
        </div>
    );
};

export default SearchBar;
