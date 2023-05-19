const Spotify = {
  accessToken: '',
  expiresIn: '',
  clientId: 'a6849bcb3885469da1fe2751c6926f6e',
  
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
      const scope = 'user-read-private user-read-email';
      window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      return new Promise(() => {}); // Return a pending promise
    }
  },
  
    // Make a Spotify API request with the user's access token
    async search(query, type) {
      try {
        const accessToken = await this.getAccessToken(); // Await the getAccessToken promise
        const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=${type}`;
    
        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
    
        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse[type + 's']) {
            return jsonResponse[type + 's'].items.map((item) => ({
              id: item.id,
              name: item.name,
              artists: item.artists,
              album: item.album,
              uri: item.uri,
            }));
          } else {
            return [];
          }
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  export default Spotify;
  