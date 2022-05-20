window.addEventListener(
  'load',
  function () {
    const urlParams = new URLSearchParams(window.location.search);
    let playlist = [urlParams.get('playlist1'), urlParams.get('playlist2')];
    getPlaylistData(playlist, urlParams.get('access_token'));
  },
  false
);

function getPlaylistData(arr, token) {
  for (let i=0; i<arr.length; i++) {
    const res = fetch(`https://api.spotify.com/v1/playlists/${arr[i]}`, {
      headers: { Authorization: 'Bearer ' + token },
      json: true,
    })
    res.then((response) => response.json())
      .then((res) => {
        let toAdd = [];
        for (let i of res.tracks.items) {
          let track = {
            "name": i.track.name,
            "id": i.track.id == null ? hashCode(i.track.name) : i.track.id,
          };
          toAdd.push(track);
        }
        renderPlaylists(toAdd,i)
      });
  }
}

function renderPlaylists(arr,index) {
  dom = ''
  switch (index) {
    case 0:
      dom = 'table1';
      break;
    case 1:
      dom = 'table2';
      break;
    case 2:
      dom = 'output';
      break;
    default:
      dom = 'table1'
      break
  }
 let table = document.getElementById(dom)
  for (let i of arr) {
      let tr = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = i['name'];
      tr.appendChild(td);
      table.appendChild(tr);
  }
}

const operation = (list1, list2, isUnion = false) =>
  list1.filter(
    (
      (set) => (a) =>
        isUnion === set.has(a.id)
    )(new Set(list2.map((b) => b.id)))
  );


const intersection = (list1, list2) => operation(list1, list2, true),
  AdiffB = operation,
  BdiffA = (list1, list2) => inFirstOnly(list2, list1);

function hashCode(s) {
  for (var i = 0, h = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
