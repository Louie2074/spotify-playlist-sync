import { LoginProp } from '../types';

function Login(props: LoginProp) {
  return (
    <div id="login">
      <h1>Welcome to spotify playlist checker</h1>
      <a
        href={`${props.AUTH_ENDPOINT}?client_id=${
          props.CLIENT_ID
        }&redirect_uri=${props.REDIRECT_URI}&response_type=${
          props.RESPONSE_TYPE
        }&show_dialog=${true}`}
        className="btn btn-primary"
      >
        Log in with Spotify
      </a>
    </div>
  );
}

export default Login;
