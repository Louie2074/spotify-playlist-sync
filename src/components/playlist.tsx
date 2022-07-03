import { useState } from 'react';
import { playlistProps } from '../types';
import '../styles.css';

function PlaylistItem(props: playlistProps) {
  const [selected, setSelected] = useState(false);
  const clickHandler = () => {
    if (props.playlistParams.includes(props.id)) {
      const index = props.playlistParams.indexOf(props.id);
      if (index > -1) {
        props.playlistParams.splice(index, 1);
        let filteredArray = props.playlistParams.filter(
          (item) => item !== props.id
        );
        props.setPlaylistParams(filteredArray);
      }

      setSelected(false);
    } else if (props.playlistParams.length < 2) {
      props.setPlaylistParams((prevArray: number[]) => [
        ...prevArray,
        props.id,
      ]);
      setSelected(true);
    }
  };
  const btn = selected ? 'playlistSelected' : 'playlist';

  return (
    <tr>
      <th scope="row"> {props.position}</th>
      <td>
        <button className={btn} onClick={clickHandler}>
          {props.name}
        </button>
      </td>
    </tr>
  );
}

// class tableItem {
//   constructor(position, name, id) {
//     this.position = position;
//     this.name = name;
//     this.id = id;
//   }
//   getName() {
//     return this.name;
//   }
//   getid() {
//     return this.id;
//   }
//   getPosition() {
//     return this.position;
//   }
//   toTableItem() {
//     const tr = document.createElement('tr');
//     const th = document.createElement('th');
//     const td = document.createElement('td');
//     const button = document.createElement('button');
//     button.setAttribute('class', 'playlist');
//     th.setAttribute('scope', 'row');
//     th.textContent = this.position;
//     button.textContent = this.name;
//     button.addEventListener('click', () => {
//       if (playlistParams.includes(this.id)) {
//         const index = playlistParams.indexOf(this.id);
//         if (index > -1) {
//           playlistParams.splice(index, 1);
//         }
//         button.style.color = 'black';
//       } else if (playlistParams.length < 2) {
//         playlistParams.push(this.id);
//         button.style.color = 'green';
//       }
//     });
//     td.appendChild(button);
//     tr.appendChild(th);
//     tr.appendChild(td);
//     return tr;
//   }
// }

export default PlaylistItem;
