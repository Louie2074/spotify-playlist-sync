import React from "react";
import {tableItem} from "../DOM"

function Playlists(props){
    const renderPlaylists = () => {
      return props.playlists.map((playlist) => (
        <div key={playlist.id}>
          {playlist.name}
        </div>
      ));
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

function User(props) {
  const user = props.user
  const images = props.user.images
  return (
    <React.Fragment>
      <h1 id="loggedinDesc">Logged in as {user?.display_name}</h1>
      <div className="media">
        <div className="pull-left">
          <img alt="rip" className="media-object" width="150" src={images?images[0].url:""} />
        </div>
        <Playlists playlists={props.playlists} />
      </div>
      <button id="continue">Continue</button>
    </React.Fragment>
  );
}

export default User;
