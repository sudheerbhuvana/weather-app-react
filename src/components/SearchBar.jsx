import React, { useState } from 'react';

// SearchBar component for city input and search functionality with enhanced UX

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🔍 SearchBar: Form submitted with term:', searchTerm);
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('🔍 SearchBar: Enter key pressed with term:', searchTerm);
      handleSubmit(e);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;