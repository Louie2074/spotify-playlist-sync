window.addEventListener(
  'load',
  function () {
    const urlParams = new URLSearchParams(window.location.search);
    let playlist = [urlParams.get('playlist1'), urlParams.get('playlist2')];
    renderPlaylists(playlist, urlParams.get('access_token'));
  },
  false
);
