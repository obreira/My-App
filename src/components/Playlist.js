import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Track from './Track';

const Playlist = ({ playlistName, playlistTracks, onRemove, onRenamePlaylist, onRemoveTrack, onPlayTrack }) => {
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

  const handlePlayTrack = (track) => {
    onPlayTrack(track);
  };

  const handleBlur = () => {
    if (newPlaylistName.trim() === '') {
      setNewPlaylistName(playlistName); // Revert to the original name if it's empty
    }
    handlePlaylistNameSave();
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newPlaylistName}
          onChange={handlePlaylistNameChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span onClick={handlePlaylistNameEdit}>
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          {playlistName}
        </span>
      )}

      <ol>
        {playlistTracks.map((track) => (
          <li key={track.id}>
            <Track
              name={track.name}
              artist={track.artist}
              album={track.album}
              duration={track.duration}
              cover={track.album.images?.[0]?.url}
              uri={track.uri}
              previewUrl={track.preview_url}
              onAddTrack={() => {}} // Not needed in the Playlist component
              onRemoveTrack={onRemove} // Pass the function as a prop
              onPlayTrack={() => handlePlayTrack(track)} // Pass the function as a prop
              isRemoval={true}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Playlist;
