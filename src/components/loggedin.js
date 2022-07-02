
import User from "./user"


function Loggedin(props){
  
    const logout = () => {
      props.setToken('');
      props.setLoggedin(false)
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