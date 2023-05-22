import React from 'react';
import Spotify from './Spotify';  

const ProfileForm = () => {
  const handleLoginWithSpotify = () => {
    Spotify.login();
  };

  return (
    <div>
      <button onClick={handleLoginWithSpotify}>Login with Spotify</button>
      {/* Rest of the form */}
    </div>
  );
};

export default ProfileForm;
