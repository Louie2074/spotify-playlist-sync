import { useState } from 'react';
import PlaylistItem from './playlist';
import { playlistProps } from '../types';
import { useNavigate } from 'react-router-dom';

function Playlists(props: any) {
  let i = 0;
  const renderPlaylists = () => {
    return props.playlists.map((playlist: playlistProps) => {
      i++;
      return (
        <PlaylistItem
          playlistParams={props.playlistParams}
          setPlaylistParams={props.setPlaylistParams}
          key={i}
          position={i}
          name={playlist.name}
          id={playlist.id}
        />
      );
    });
  };
  return (
    <table className="table table-hover" id="data">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Playlist</th>
        </tr>
      </thead>
      <tbody id="playlists">{renderPlaylists()}</tbody>
    </table>
  );
}

function User(props: any) {
  const user = props.user;
  const images = props.user.images;
  const [playlistParams, setPlaylistParams] = useState([]);
  const navigate = useNavigate();

  const sendPlaylist = () => {
    if (playlistParams.length === 2) {
      navigate(
        '/compare' +
          '?playlist1=' +
          playlistParams[0] +
          '&' +
          'playlist2=' +
          playlistParams[1] +
          '&' +
          'access_token=' +
          props.token
      );
    }
  };

  return (
    <>
      <h1 id="loggedinDesc">Logged in as {user?.display_name}</h1>
      <div className="media">
        <div className="pull-left">
          <img
            alt="rip"
            className="media-object"
            width="150"
            src={images ? images[0].url : ''}
          />
        </div>
        {props.playlists.length ? (
          <Playlists
            playlistParams={playlistParams}
            playlists={props.playlists}
            setPlaylistParams={setPlaylistParams}
          />
        ) : (
          <h1>You either don't have any playlists, or they're all private</h1>
        )}
      </div>
      <button id="continue" onClick={sendPlaylist}>
        Continue
      </button>
    </>
  );
}

export default User;
