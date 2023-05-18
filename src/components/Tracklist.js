import React from 'react';
import Track from './Track';

function Tracklist({ tracks = [], onAdd, onRemove }) {
  return (
    <div>
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAddTrack={onAdd}
          onRemove={onRemove}
          isRemoval={true}
        />
      ))}
    </div>
  );
}

export default Tracklist;
