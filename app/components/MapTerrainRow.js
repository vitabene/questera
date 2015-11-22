import MapTerrainTile from './MapTerrainTile'
import React, { PropTypes } from 'react'

class MapTerrainRow extends React.Component {
  render () {
    let tiles = [];
    this.props.tiles.forEach(function(trrnId, i) {
      tiles.push(
        <MapTerrainTile tid={trrnId}/>
      );
    });
    return (
      <div className="map-row">
        {tiles}
      </div>
    );
  }
}
export default MapTerrainRow
