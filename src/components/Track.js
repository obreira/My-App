import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Track = ({ id, cover, name, artist, album, duration, uri, onAddTrack, onRemoveTrack, onPlayTrack, isRemoval }) => {
  const handleAddTrack = () => {
    onAddTrack({ id, name, artist, album, duration, uri });
  };

  const handleRemoveTrack = () => {
    onRemoveTrack({ id, name, artist, album, duration, uri });
  };

  const handlePlayTrack = () => {
    onPlayTrack({ id, name, artist, album, duration, uri });
  };

  return (
    <div className="track artist__info">
      <div>
     
        <p className="artist__info__details"><h3 className="artist__info__name">{name}</h3>{artist} | {album} | {duration} </p> <img src={cover} alt="Cover" className="img" />
        
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
};

export default Track;
