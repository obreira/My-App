import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import ProfileForm from './components/ProfileForm';
import Profile from './components/Profile';
import Spotify from './components/Spotify'; // Replace with the correct path to the Spotify module

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    Spotify.getAccessToken().then((accessToken) => {
      // Use the access token for API requests or other operations
      console.log('Access Token:', accessToken);
    });
  }, []);

  const addTrackToPlaylist = (track) => {
    const isTrackInPlaylist = playlistTracks.some((playlistTrack) => playlistTrack.uri === track.uri);
    if (!isTrackInPlaylist) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((prevTrack) => prevTrack.uri !== track.uri));
  };

  const createProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return (
    <div className="App">
      {profile ? (
        <Profile name={profile.name} age={profile.age} email={profile.email} />
      ) : (
        <ProfileForm createProfile={createProfile} />
      )}
      <SearchBar setSearchResults={setSearchResults} />
      <SearchResults searchResults={searchResults} onAddTrack={addTrackToPlaylist} />
      <Playlist
        playlistName="My Playlist"
        playlistTracks={playlistTracks}
        onRemove={removeTrackFromPlaylist}
      />
    </div>
  );
}

export default App;
