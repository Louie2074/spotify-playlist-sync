
(function () {
  var params = getHashParams();

  var access_token = params.access_token,
    refresh_token = params.refresh_token,
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
          $('#login').hide();
          const user = renderUser(res.display_name, res.images[0].url);
          document.querySelector('body').insertAdjacentHTML('beforeend', user);

          $('#loggedin').show();
          fetch('https://api.spotify.com/v1/me/playlists', {
            headers: { Authorization: 'Bearer ' + access_token },
            json: true,
          })
            .then((response) => response.json())
            .then((res) => {
              appendPlaylists(res);
            });
        });
    } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
    }
  }
})();

let body = document.querySelector('body');
body.addEventListener('click', (event) => {
  let target = event.target;
  if (target.id == 'continue' && playlistParams.length == 2) {
    location.assign(
      '/compare.html' +
        '?playlist1=' +
        playlistParams[0] +
        '&' +
        'playlist2=' +
        playlistParams[1] +
        '&' +
        'access_token=' +
        access_token
    );
  }
});
