import * as DOM from "../DOM"
import { useEffect, useState } from 'react';
import User from "../components/user"


function Loggedin(props){
    const logout = () => {
      props.setToken('');
      window.localStorage.removeItem('token');

      document.location.reload(true);
    };

    return (
      <div id="loggedin">
        <User user = {props.user} playlists = {props.playlists}/>
        <div id="oauth"></div>
        <button onClick={logout}>Logout</button>
      </div>
    );

}

export default Loggedin