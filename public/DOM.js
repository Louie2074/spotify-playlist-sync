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
    tr.appendChild(th, td);
    return tr;
  }
}

function appendPlaylists(data) {
  const table = document.getElementById('playlists')
  const item = new tableItem(1, data['items'][0]['name'], data['items'][0]['id']);
  table.appendChild(item.toTableItem())
}

exports.appendPlaylists = appendPlaylists;
