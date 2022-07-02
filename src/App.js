import { useEffect, useState } from 'react';
import Loggedin from './components/loggedin';
import Login from './components/login';

function App() {
  const CLIENT_ID = 'a037f933664a4c1fa2fbe84333695bea';
  const REDIRECT_URI = 'http://localhost:3000/callback/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const ONE_HOUR = 3600000;
    const hash = window.location.hash;
    let tokenObj = JSON.parse(window.localStorage.getItem('token'));

    const tokenValid = (token) => {
      if (!token) return false;
      const now = Date.now();
      const expiry = token.created_at + token.expires_in;
      return now < expiry;
    };

    if (!tokenValid(tokenObj) && !hash) {
      setLoggedin(false);
      return;
    } else {
      let access_token = hash
        ? hash
            .substring(1)
            .split('&')
            .find((elem) => elem.startsWith('access_token'))
            .split('=')[1]
        : tokenObj.access_token;
      let tokenObjStore = {
        access_token: access_token,
        created_at: Date.now(),
        expires_in: ONE_HOUR,
      };
      window.location.hash = '';
      window.localStorage.setItem('token', JSON.stringify(tokenObjStore));

      const getStuff = async () => {
        const headers = {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        };
        const [user, playlists] = await Promise.all([
          fetch('https://api.spotify.com/v1/me', headers),
          fetch('https://api.spotify.com/v1/me/playlists', headers),
        ]).then((results) => Promise.all(results.map((r) => r.json())));
        // console.log(user);
        // console.log(playlists.items);
        setToken(access_token);
        setUser(user);
        setPlaylists(playlists.items);
        setLoggedin(true);
      };
      getStuff();
    }
  }, [token]);

  return (
    <div className="container">
      {loggedin ? (
        <Loggedin
          setToken={setToken}
          user={user}
          playlists={playlists}
          setLoggedin={setLoggedin}
        />
      ) : (
        <Login
          AUTH_ENDPOINT={AUTH_ENDPOINT}
          CLIENT_ID={CLIENT_ID}
          REDIRECT_URI={REDIRECT_URI}
          RESPONSE_TYPE={RESPONSE_TYPE}
        />
      )}
    </div>
  );
}

// let body = document.querySelector('body');
// body.addEventListener('click', (event) => {
//   let target = event.target;
//   if (target.id == 'continue' && playlistParams.length == 2) {
//     location.assign(
//       '/compare.html' +
//         '?playlist1=' +
//         playlistParams[0] +
//         '&' +
//         'playlist2=' +
//         playlistParams[1] +
//         '&' +
//         'access_token=' +
//         access_token
//     );
//   }
// });

export default App;
