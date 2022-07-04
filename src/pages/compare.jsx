import { useEffect, useMemo, useState } from 'react';
import '../styles.css';
import TrackTable from '../components/TrackTable';
import { Playlist } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import * as Compute from '../Compute';

function Compare() {
  const [p1, setP1] = useState({});
  const [p2, setP2] = useState({});
  const [output, setOutput] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let playlists = [urlParams.get('playlist1'), urlParams.get('playlist2')];
    getPlaylistData(playlists, urlParams.get('access_token'));
  }, []);

  const getPlaylistData = async (arr, token) => {
    const headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const [playlist1, playlist2] = await Promise.all([
      fetch(`https://api.spotify.com/v1/playlists/${arr[0]}`, headers),
      fetch(`https://api.spotify.com/v1/playlists/${arr[1]}`, headers),
    ]).then((results) => {
      if (!results[0].ok || !results[1].ok) {
        window.localStorage.removeItem('token');
        navigate('/');
        return;
      }

      return Promise.all(results.map((r) => r.json()));
    });

    const tracksP1 = playlist1.tracks.items.map((a) => a.track);
    const tracksP2 = playlist2.tracks.items.map((a) => a.track);
    tracksP1.forEach((element) => {
      if (!element.id) element.id = Compute.hashCode(element.name);
    });
    tracksP2.forEach((element) => {
      if (!element.id) element.id = Compute.hashCode(element.name);
    });
    console.log(tracksP1);
    setP1({ name: playlist1.name, id: playlist1.id, tracks: tracksP1 });
    setP2({ name: playlist2.name, id: playlist2.id, tracks: tracksP2 });
    setOutput({ name: 'Output', tracks: [] });
  };
  const intersection = () => {
    const inBoth = Compute.inBoth(p1.tracks, p2.tracks);
    setOutput((prev) => ({ ...prev, tracks: inBoth }));
  };
  const diffB = () => {
    const inFirstOnly = Compute.inFirstOnly(p1.tracks, p2.tracks);
    setOutput((prev) => ({ ...prev, tracks: inFirstOnly }));
  };
  const diffA = () => {
    const inSecondOnly = Compute.inSecondOnly(p1.tracks, p2.tracks);
    setOutput((prev) => ({ ...prev, tracks: inSecondOnly }));
  };

  return (
    <>
      <TrackTable playlist={p1} />
      <TrackTable playlist={p2} />
      <TrackTable playlist={output} />
      <button onClick={intersection}>inBoth</button>
      <button onClick={diffB}>inFirstOnly</button>
      <button onClick={diffA}>inSecondOnly</button>
      <Link to={'/'}>Back</Link>
    </>
  );
}

export default Compare;
