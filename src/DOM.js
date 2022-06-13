/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

var params = getHashParams();
var access_token = params.access_token,
  refresh_token = params.refresh_token,
  error = params.error;

const playlistParams = [];
class tableItem {
  constructor(position, name, id) {
    this.position = position;
    this.name = name;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  getid() {
    return this.id;
  }
  getPosition() {
    return this.position;
  }
  toTableItem() {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    const button = document.createElement('button');
    button.setAttribute('class', 'playlist');
    th.setAttribute('scope', 'row');
    th.textContent = this.position;
    button.textContent = this.name;
    button.addEventListener('click', () => {
      if (playlistParams.includes(this.id)) {
        const index = playlistParams.indexOf(this.id);
        if (index > -1) {
          playlistParams.splice(index, 1);
        }
        button.style.color = 'black';
      } else if (playlistParams.length < 2) {
        playlistParams.push(this.id);
        button.style.color = 'green';
      }
    });
    td.appendChild(button);
    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
  }
}
function appendPlaylists(data) {
  const table = document.getElementById('playlists');
  for (let i = 0; i < data.items.length; i++) {
    const item = new tableItem(
      i + 1,
      data.items[i]['name'],
      data.items[i]['id']
    );
    table.appendChild(item.toTableItem());
  }
}

function renderUser(name, pic) {
  return `<h1 id = "loggedinDesc">Logged in as ${name}</h1> <div class="media"><div class="pull-left"><img class="media-object" width="150" src="${pic}"/></div><table class="table table-hover" id = "data"><thead class="thead-dark"><tr><th scope="col">#</th><th scope="col">Playlist</th></tr></thead><tbody id = "playlists"> </tbody></table></div><button id = 'continue'>Continue</button>`;
}

export {appendPlaylists, getHashParams, renderUser}