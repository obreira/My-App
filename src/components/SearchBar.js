import React, { useState } from 'react';
import Spotify from './Spotify';

function SearchBar({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const tracks = await Spotify.search(searchQuery, 'track');
      setSearchResults(tracks);
    } catch (error) {
      console.error('Error searching:', error);
      setSearchResults([]);
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
