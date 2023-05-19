import React from 'react';
import Track from './Track';

function SearchResults({ searchResults, onAddTrack }) {
  // Check if searchResults is falsy or has length 0
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div>
      <div>Search Results</div>

      {searchResults.map((track) => (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artists?.[0]?.name || ''}
          album={track.album.name}
          duration={track.duration_ms}
          cover={track.album.images?.[0]?.url}
          uri={track.uri}
          onAddTrack={onAddTrack}
          isRemoval={false} // Set isRemoval prop to false since it's not a removal operation
        />
      ))}
    </div>
  );
}

export default SearchResults;
