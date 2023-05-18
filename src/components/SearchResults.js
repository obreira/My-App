import React from 'react';
import Track from './Track';

function SearchResults({ searchResults, onAddTrack }) {
  // Check if searchResults is falsy or has length 0
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }

  // Render the component with searchResults
  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.map((track) => (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artists?.[0]?.name || ''}
          //artist={track.artists && track.artists.length > 0 ? track.artists[0].name : ''}
          album={track.album.name}
          duration={track.duration_ms}
          uri={track.uri}
          onAddTrack={onAddTrack}
        />
      ))}
    </div>
  );
}

export default SearchResults;
