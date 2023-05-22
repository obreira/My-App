import React from 'react';
import Track from './Track';

function SearchResults({ searchResults, onAddTrack, onPlayTrack }) {
  // Check if searchResults is falsy or has length 0
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div>
      <h1>Search Results</h1>
  
      <ol>
        {searchResults.map((track) => (
          <li key={track.id}>
            <Track
              name={track.name}
              artist={track.artists?.[0]?.name || ''}
              album={track.album.name}
              duration={track.name.duration}
              cover={track.album.images?.[0]?.url}
              uri={track.uri}
              onAddTrack={onAddTrack}
              onPlayTrack={onPlayTrack}
              isRemoval={false} // Set isRemoval prop to false since it's not a removal operation
            />
          </li>
        ))}
      </ol>
    </div>
  );
  
}

export default SearchResults;
