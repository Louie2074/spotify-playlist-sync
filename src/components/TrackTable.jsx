

function TrackTable(props) {
  const renderPlaylists = () => {
    return props.playlist.tracks?.map((track, key) => {
      return (
        <li key={key} id="ss_elem_Np">
          {track.name}
        </li>
      );
    });
  };
  return (
    <div className="fixTableHead">
      <div className="listbox-area">
        <div>
          <span id="ss_elem" className="listbox-label">
            {props.playlist.name}:{props.playlist.tracks?.length}
          </span>
          <ul id="ss_elem_list" role="listbox" aria-labelledby="ss_elem">
            {renderPlaylists()}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default TrackTable;
