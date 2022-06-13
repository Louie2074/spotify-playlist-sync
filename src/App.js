import { useEffect, useState } from 'react';
import * as DOM from './DOM';
import Loggedin from './components/loggedin';
import Login from './components/login';
function App() {
  const CLIENT_ID = '+++++++++++++++++++++++++++++';
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  useEffect(() => {
    var params = DOM.getHashParams();

    var access_token = params.access_token,
      error = params.error;

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            document.getElementById('login').style.display = 'none';
            const user = DOM.renderUser(res.display_name, res.images[0].url);
            document
              .querySelector('body')
              .insertAdjacentHTML('beforeend', user);

            document.getElementById('loggedin').style.display = 'block';
            fetch('https://api.spotify.com/v1/me/playlists', {
              headers: { Authorization: 'Bearer ' + access_token },
              json: true,
            })
              .then((response) => response.json())
              .then((res) => {
                DOM.appendPlaylists(res);
              });
          });
      } else {
        // render initial screen
        document.getElementById('login').style.display = 'block'; // show
        document.getElementById('loggedin').style.display = 'none';
      }
    }
  }, []);
  return (
    <div className="container">
      <div id="login">
        <h1>Welcome to spotify playlist checker</h1>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          className="btn btn-primary"
        >
          Log in with Spotify
        </a>
      </div>
      <Loggedin />
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
