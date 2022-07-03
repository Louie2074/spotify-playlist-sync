import { LoggedInProp } from '../types';
import User from './user';

function Loggedin(props: LoggedInProp) {
  const logout = () => {
    props.setToken('');
    props.setLoggedin(false);
    window.localStorage.removeItem('token');

    document.location.reload();
  };

  return (
    <div id="loggedin">
      <User token = {props.token} user={props.user} playlists={props.playlists} />
      <div id="oauth"></div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Loggedin;
