import MapTile from './MapTile'
import React, { PropTypes } from 'react'

class MapRow extends React.Component {
  render () {
    let tiles = [];
    this.props.tiles.forEach(function(ti, i) {
      let object = {}
      tiles.push(
        <MapTile tileObject={object} tid={ti}/>
      );
    });
    return (
      <div className="map-row">{tiles}</div>
    );
  }
}
export default MapRow
