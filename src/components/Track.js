import React from 'react';

function Track({ id, name, artist, album, duration, uri, onAddTrack, onRemoveTrack, isRemoval }) {

  // Render the component with the props
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
      <div className="Track-action">
        {isRemoval ? (
          <button onClick={() => onRemoveTrack({ id, name, artist, album, duration, uri })}>-</button>
        ) : (
          <button onClick={() => onAddTrack({ id ,name, artist, album, duration, uri })}>+</button>
        )}
      </div>
    </div>
  );
}

export default Track;