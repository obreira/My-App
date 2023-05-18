import React from 'react';
import Track from './Track';

const Playlist = ({ playlistName = 'Playlist Name', playlistTracks = [], onRemove = () => {} }) => {
  if (!playlistTracks || !Array.isArray(playlistTracks)) {
    playlistTracks = [];
  }

  return (
    <div className="playlist">
      <h2>{playlistName}</h2>
      <div className="tracklist">
        {playlistTracks.map((track) => (
          <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            duration={track.duration}
            uri={track.uri}
            onRemoveTrack={onRemove}
            isRemoval={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Playlist;
