import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import Track from './Track';

const Playlist = ({ playlistName, playlistTracks, onRemove, onRenamePlaylist, onRemoveTrack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState(playlistName);

  const handlePlaylistNameChange = (e) => {
    setNewPlaylistName(e.target.value);
  };

  const handlePlaylistNameEdit = () => {
    setIsEditing(true);
  };

  const handlePlaylistNameSave = () => {
    setIsEditing(false);
    // Pass the new playlist name to the parent component
    onRenamePlaylist(newPlaylistName);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newPlaylistName}
          onChange={handlePlaylistNameChange}
          onBlur={handlePlaylistNameSave}
          autoFocus
        />
      ) : (
        <span onClick={handlePlaylistNameEdit}>
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          {playlistName}
        </span>
      )}

      <div className="section_main">
        {playlistTracks.map((track) => (
          <Track
            key={track.id}
            name={track.name}
            artist={track.artist}
            album={track.album}
            duration={track.duration}
            cover={track.album.images?.[0]?.url}
            uri={track.uri}
            onRemoveTrack={onRemove} // Pass the function as a prop
            isRemoval={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
