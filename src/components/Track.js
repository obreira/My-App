import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const Track = ({
  id,
  cover,
  name,
  artist,
  album,
  duration,
  uri,
  previewUrl,
  onAddTrack,
  onRemoveTrack,
  onPlayTrack,
  isRemoval
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleAddTrack = () => {
    onAddTrack({ id, name, artist, album, duration, uri });
  };

  const handleRemoveTrack = () => {
    onRemoveTrack({ id, name, artist, album, duration, uri });
  };

  const handlePlayTrack = () => {
    if (previewUrl) {
      setIsPlaying(true);
      onPlayTrack({ id, name, artist, album, duration, uri });
    }
  };

  const handlePauseTrack = () => {
    setIsPlaying(false);
  };

  return (
    <div className="track artist__info">
      <div>
        <p className="artist__info__details">
          <h3 className="artist__info__name">{name}</h3>
          {artist} | {album} | {duration}
        </p>
        <img src={cover} alt="Cover" className="img" />
      </div>
      <div className="track_added artist__info__actions">
        {isRemoval ? (
          <button className="artist__info__actions__button" onClick={handleRemoveTrack}>-</button>
        ) : (
          <>
            <button className="artist__info__actions__button" onClick={handleAddTrack}>+</button>
            {previewUrl && (
              <button
                className="artist__info__actions__button"
                onClick={isPlaying ? handlePauseTrack : handlePlayTrack}
              >
                {isPlaying ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </button>
            )}
          </>
        )}
      </div>
      {previewUrl && isPlaying && (
        <audio src={previewUrl} autoPlay onEnded={handlePauseTrack} />
      )}
    </div>
  );
};

export default Track;
