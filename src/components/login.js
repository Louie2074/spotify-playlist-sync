import * as DOM from '../DOM';
import { useEffect, useState } from 'react';

function Login() {
  return (
    <div id="login">
      <h1>Welcome to spotify playlist checker</h1>
      <a href="/login" className="btn btn-primary">
        Log in with Spotify
      </a>
    </div>
  );
}

export default Login