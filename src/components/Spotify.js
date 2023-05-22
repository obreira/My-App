const Spotify = {
  accessToken: '',
  expiresIn: '',
  clientId: 'a6849bcb3885469da1fe2751c6926f6e',

  login() {
    const redirectUri = 'http://localhost:3000/';
    const scope = 'playlist-modify-public';
    window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
  },

  getAccessToken() {
    if (this.accessToken) {
      return Promise.resolve(this.accessToken);
    }

    const token = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (token && expiresIn) {
      this.accessToken = token[1];
      this.expiresIn = expiresIn[1];

      window.setTimeout(() => {
        this.accessToken = '';
        this.expiresIn = '';
      }, expiresIn[1] * 1000);

      window.history.pushState('Access Token', null, '/');
      return Promise.resolve(this.accessToken);
    } else {
      const redirectUri = 'http://localhost:3000/';
      const scope = 'playlist-modify-public';
      window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      return new Promise(() => {}); // Return a pending promise
    }
  },

 search(query, type) {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    headers: { Authorization: `Bearer ${this.accessToken}` },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .then((jsonResponse) => {
      if (jsonResponse[type + 's']) {
        return jsonResponse[type + 's'].items.map((item) => ({
          id: item.id,
          name: item.name,
          artists: item.artists,
          album: item.album,
          uri: item.uri,
          previewUrl: item.preview_url, // Add previewUrl property
        }));
      } else {
        return [];
      }
    })
    .catch((error) => console.log(error));
},

  createPlaylist(playlistName) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      })
      .then((jsonResponse) => {
        const userId = jsonResponse.id;

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: playlistName }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed!');
          })
          .then((jsonResponse) => {
            return jsonResponse.id;
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  },

  addTracksToPlaylist(playlistId, trackUris) {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: trackUris }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      })
      .catch((error) => console.log(error));
  },
};

export default Spotify;
