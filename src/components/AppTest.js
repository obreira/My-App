import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import ProfileForm from './components/ProfileForm';
import Profile from './components/Profile';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [profile, setProfile] = useState(null);

  const addTrackToPlaylist = (track) => {
    if (!playlist.find((playlistTrack) => playlistTrack.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylist(playlist.filter((playlistTrack) => playlistTrack.id !== track.id));
  };

  const createProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="App">
      {profile ? (
        <Profile
          name={profile.name}
          age={profile.age}
          email={profile.email}
        />
      ) : (
        <ProfileForm createProfile={createProfile} />
      )}
      <SearchBar setSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist} />
      <Playlist playlist={playlist} onRemoveTrack={removeTrackFromPlaylist} />
    </div>
  );
}

export default App;