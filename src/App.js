import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import ProfileForm from './components/ProfileForm';
import Profile from './components/Profile';
import Spotify from './components/Spotify'; // Replace with the correct path to the Spotify module
import Dropdown from './components/Dropdown'; // Import the Dropdown component
import './App.scss';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [profile, setProfile] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken().then((accessToken) => {
      // Use the access token for API requests or other operations
      console.log('Access Token:', accessToken);
    });
  }, []);

  const addTrackToPlaylist = (track) => {
    if (selectedPlaylist) {
      const playlistIndex = createdPlaylists.findIndex(
        (playlist) => playlist.name === selectedPlaylist.name
      );
      if (playlistIndex !== -1) {
        const playlistToUpdate = createdPlaylists[playlistIndex];
        const isTrackInPlaylist = playlistToUpdate.tracks.some(
          (playlistTrack) => playlistTrack.uri === track.uri
        );
  
        if (!isTrackInPlaylist) {
          const updatedPlaylist = {
            ...playlistToUpdate,
            tracks: [...playlistToUpdate.tracks, track],
          };
  
          const updatedPlaylists = [...createdPlaylists];
          updatedPlaylists[playlistIndex] = updatedPlaylist;
  
          setCreatedPlaylists(updatedPlaylists);
          setSelectedPlaylist(updatedPlaylist);
        }
      }
    } else {
      const isTrackInPlaylist = playlistTracks.some(
        (playlistTrack) => playlistTrack.uri === track.uri
      );
  
      if (!isTrackInPlaylist) {
        setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      }
    }
  };
  



  const removeTrackFromPlaylist = (track) => {
    if (selectedPlaylist) {
      const updatedPlaylist = {
        ...selectedPlaylist,
        tracks: selectedPlaylist.tracks.filter((playlistTrack) => playlistTrack.uri !== track.uri),
      };
      setSelectedPlaylist(updatedPlaylist);
    } else {
      setPlaylistTracks((prevTracks) => prevTracks.filter((prevTrack) => prevTrack.uri !== track.uri));
    }
  };

  const createProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    // Call the Spotify API to save the playlist
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      console.log('Playlist saved to Spotify!');
      setPlaylistTracks([]); // Reset the playlist in the app
    });
  };

  const handleRenamePlaylist = (newName) => {
    setPlaylistName(newName);
  };

  const handleSelectPlaylist = (playlistIndex) => {
    const playlist = createdPlaylists[playlistIndex];
    setSelectedPlaylist(playlist);
    setSearchResults([]); // Reset the search results
  };

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      name: `Playlist ${createdPlaylists.length + 1}`,
      tracks: [],
    };
    setCreatedPlaylists([...createdPlaylists, newPlaylist]);
    setSelectedPlaylist(newPlaylist);
    setSearchResults([]);
  };

  return (
    <>
      <header className="header">
        <div className="search">
          <SearchBar setSearchResults={setSearchResults} />
        </div>

        <div className="user">
          <div className="user_info">
            {profile ? (
              <Profile name={profile.name} last_name={profile.last_name} />
            ) : (
              <ProfileForm createProfile={createProfile} />
            )}
          </div>
        </div>
      </header>
      <section className="content">
        <div className="content__left">
          <div className="navigation">
            <div className='navigation__list'>
              <div class="navigation__list__header"
                role="button"
                data-toggle="collapse"
                href="#main"
                aria-expanded="true"
                aria-controls="main">
                Main
              </div>
              <div class="collapse in" id="main">
                <span className="navigation__list__item" onClick={handleCreatePlaylist}>
                  Create Playlist
                </span>
                {createdPlaylists.map((playlist, index) => (
                  <span
                    key={index}
                    className="navigation__list__item"
                    onClick={() => handleSelectPlaylist(index)}
                  >
                    {playlist.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div class="content__middl">

          <div class="artist">

            <div>
              {searchResults.length > 0 ? (
                <div className='playlist'>
                  <SearchResults
                    searchResults={searchResults}
                    onAddTrack={(track, playlistIndex) => addTrackToPlaylist(track, playlistIndex)}
                  />
                </div>
              ) : (
                <div class="playlist">
                  {selectedPlaylist ? (
                    <Playlist
                      playlistName={selectedPlaylist.name}
                      playlistTracks={selectedPlaylist.tracks}
                      onRemove={removeTrackFromPlaylist}
                      onRenamePlaylist={handleRenamePlaylist}
                      onSavePlaylist={savePlaylist}
                    />
                  ) : (
                    <Playlist
                      playlistName={playlistName}
                      playlistTracks={playlistTracks}
                      onRemove={removeTrackFromPlaylist}
                      onRenamePlaylist={handleRenamePlaylist}
                      onSavePlaylist={savePlaylist}
                    />
                  )}
                </div>


              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
