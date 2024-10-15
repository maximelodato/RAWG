import React from 'react';
import './SearchBar.scss';

const SearchBar = ({ query, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Find a game..."
      value={query}
      onChange={e => onSearch(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
