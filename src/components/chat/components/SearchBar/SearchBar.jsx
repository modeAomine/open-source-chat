import React, { useState, useEffect } from 'react';
import './searchBar.css';
import { search_user } from '../../../service/api';

const SearchBar = ({ setSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length > 1) {
            setIsLoading(true);
            const delayDebounceFn = setTimeout(() => {
                search_user(searchTerm)
                    .then(data => {
                        setSearchResults(data);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.error(err);
                        setIsLoading(false);
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
                placeholder="Найти друга"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {isLoading && <div className="loading-spinner">Загрузка...</div>} {/* Индикатор загрузки */}
        </div>
    );
};

export default SearchBar;
