import React from 'react';

function Track({ id, cover, name, artist, album, duration, uri, onAddTrack, onRemoveTrack, isRemoval }) {
  const handleAddTrack = () => {
    // Call the add track method in the parent component
    onAddTrack({ id, name, artist, album, duration, uri });
  };

  const handleRemoveTrack = () => {
    // Call the remove track method in the parent component
    onRemoveTrack({ id, name, artist, album, duration, uri });
  };

  // Render the component with the appropriate button based on the isRemoval prop
  return (
    <div className="track artist__info">
      <div>
        <h3 className="artist__info__name">{name}</h3>
        <p className="artist__info__details">{artist} | {album}</p>
        <img src={cover} alt="Cover" className="track__cover" />
      </div>
      <div className="track_added artist__info__actions">
        {isRemoval ? (
          <button className="artist__info__actions__button" onClick={handleRemoveTrack}>-</button>
        ) : (
          <button className="artist__info__actions__button" onClick={handleAddTrack}>+</button>
        )}
      </div>
    </div>
  );
}

export default Track;
