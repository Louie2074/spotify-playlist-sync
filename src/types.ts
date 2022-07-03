type TokenOBJ = {
  access_token: string;
  created_at: number;
  expires_in: number;
};

type LoggedInProp = {
  setToken: Function;
  user: any;
  playlists: any;
  setLoggedin: Function;
  token:string
};

type LoginProp = {
  AUTH_ENDPOINT: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
};

type playlistProps = {
  position: number;
  name: string;
  id: number;
  playlistParams: number[];
  setPlaylistParams: Function
};

export type { TokenOBJ, LoggedInProp, LoginProp, playlistProps };
