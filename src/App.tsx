import { useEffect, useState } from 'react';
import Loggedin from './components/loggedin';
import Login from './components/login';
import { TokenOBJ } from './types';
import { Route, Routes } from 'react-router-dom';
import Compare from "./pages/compare"
import * as Compute from "./Compute"

function App() {
  const CLIENT_ID = 'a037f933664a4c1fa2fbe84333695bea';
  const REDIRECT_URI = 'http://localhost:3000/callback/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const scope = 'user-read-private user-read-email user-library-read user-read-private';
  const RESPONSE_TYPE = 'token';
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const ONE_HOUR = 3600000;
    const hash = window.location.hash;
    const storage = window.localStorage.getItem('token') || '{}';

    let tokenObj = JSON.parse(storage);

    const tokenValid = (token: TokenOBJ): boolean => {
      if (!token) return false;
      const now = Date.now();
      const expiry = token.created_at + token.expires_in;
      return now < expiry;
    };


    if (!tokenValid(tokenObj) && !hash) {
      setLoggedin(false);
      return;
    } else {
      let access_token = hash
        ? Compute.getHashParams(hash)
        : tokenObj.access_token;
      let tokenObjStore = {
        access_token: access_token,
        created_at: Date.now(),
        expires_in: ONE_HOUR,
      };
      window.location.hash = '';
      window.localStorage.setItem('token', JSON.stringify(tokenObjStore));
      

      const getStuff = async () => {
   
        
        const headers = {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        };
        const [user, playlists]: any = await Promise.all([
          fetch('https://api.spotify.com/v1/me', headers),
          fetch('https://api.spotify.com/v1/me/playlists', headers),
        ]).then((results) => {
          if (!results[0].ok || !results[1].ok) {

            
            setLoggedin(false);
            return;
          }

          return Promise.all(results.map((r) => r.json()));
        });
        
        setToken(access_token);
        setUser(user);
        setPlaylists(playlists.items);
        setLoggedin(true);
      };
      getStuff();
    }
  }, [token]);

  return (
    <div className="container">
      <Routes>
        {['/', '/callback'].map((path, index) => (
          <Route
            key={index}
            path={path}
            element={
              loggedin ? (
                <Loggedin
                  setToken={setToken}
                  token={token}
                  user={user}
                  playlists={playlists}
                  setLoggedin={setLoggedin}
                />
              ) : (
                <Login
                  AUTH_ENDPOINT={AUTH_ENDPOINT}
                  CLIENT_ID={CLIENT_ID}
                  REDIRECT_URI={REDIRECT_URI}
                  RESPONSE_TYPE={RESPONSE_TYPE}
                  SCOPE={scope}
                />
              )
            }
          />
        ))}
        <Route path='/compare' element = {<Compare/>}/>
      </Routes>
    </div>
  );
}
export default App;
