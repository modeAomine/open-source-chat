import React, { useState, useEffect } from 'react';
import './searchBar.css';
import { search_user } from '../../../service/api';

const SearchBar = ({ setSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {
            const delayDebounceFn = setTimeout(() => {
                search_user(searchTerm)
                    .then(data => setSearchResults(data))
                    .catch(err => console.error(err));
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
        </div>
    );
};

export default SearchBar;
