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
  SCOPE:string
};

type playlistProps = {
  position: number;
  name: string;
  id: number;
  playlistParams: number[];
  setPlaylistParams: Function
};

type Playlist = {
  name: string;
  id: number;
  tracks:TrackObj
};
type TrackObj = {
  items:string[]
}

type Track = {
  name:string
  id: string
};

export type {
  TokenOBJ,
  LoggedInProp,
  LoginProp,
  playlistProps,
  Track,
  Playlist,
};
