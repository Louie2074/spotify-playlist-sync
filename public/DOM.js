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
    th.setAttribute('scope', 'row');
    th.textContent = this.position;
    button.textContent = this.name;
    td.appendChild(button);
    tr.appendChild(th);
    tr.appendChild(td)
    return tr;
  }
}

function appendPlaylists(data) {
  const table = document.getElementById('playlists')
  for(let i  = 0; i< data.items.length; i++){
  const item = new tableItem(i + 1, data.items[i]['name'], data.items[i]['id']);
  table.appendChild(item.toTableItem())
  }
}

function renderUser(name, pic){
      return `<h1 id = "loggedinDesc">Logged in as ${name}</h1> <div class="media"><div class="pull-left"><img class="media-object" width="150" src="${pic}"/></div><table class="table table-hover" id = "data"><thead class="thead-dark"><tr><th scope="col">#</th><th scope="col">Playlist</th></tr></thead><tbody id = "playlists"> </tbody></table></div>`
}
