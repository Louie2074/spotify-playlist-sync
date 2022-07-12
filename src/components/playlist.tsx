import { useState } from 'react';
import { playlistProps } from '../data/types';
import '../assets/styles.css';

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

export default PlaylistItem;
