import { useEffect, useState } from 'react';
import '../styles.css';
import TrackTable from '../components/TrackTable';
import { Playlist } from '../types';

function Compare() {
  const [p1, setP1] = useState<Playlist>({name:"",
  id: 0})
    const [p2, setP2] = useState<Playlist>({name:"",
  id: 0})

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let playlists: string[] = [
      urlParams.get('playlist1')!,
      urlParams.get('playlist2')!,
    ];
    getPlaylistData(playlists, urlParams.get('access_token')!);
  },[]);
  const getPlaylistData = async (arr: string[], token: string) => {
    const headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const [playlist1, playlist2]: Playlist[] = await Promise.all([
      fetch(`https://api.spotify.com/v1/playlists/${arr[0]}`, headers),
      fetch(`https://api.spotify.com/v1/playlists/${arr[1]}`, headers),
    ]).then((results) => Promise.all(results.map((r) => r.json())));
    console.log(playlist1);
    console.log(playlist2);
    setP1(playlist1)
    setP2(playlist2)
  };

  return (
    <>
      <TrackTable name={p1.name} id={p1.id} />
      <TrackTable name={p2.name} id={p2.id} />
      {/* <TrackTable /> */}
      <button id="intersection">Intersection</button>
      <button id="A-B">A-B</button>
      <button id="B-A">B-A</button>
      <button id="back">Back</button>
    </>
  );
}

export default Compare;
