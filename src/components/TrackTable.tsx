import { Playlist } from '../types';

function TrackTable(props: Playlist) {
  const renderPlaylists = () => {
    //   let toAdd = [];
    //       for (let i of res.tracks.items) {
    //         let track = {
    //           name: i.track.name,
    //           id: i.track.id == null ? hashCode(i.track.name) : i.track.id,
    //         };
    //         toAdd.push(track);
    //       }
    //       renderPlaylists(toAdd, i);
  };
  return (
    <div className="fixTableHead">
      <table>
        <thead>
          <tr>
            <th>Playlist 1</th>
          </tr>
        </thead>

        <tbody id="table1"></tbody>
      </table>
    </div>
  );
}
export default TrackTable;
