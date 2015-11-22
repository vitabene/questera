import MapTerrainRow from './MapTerrainRow'
import React, { PropTypes } from 'react'

class MapTerrainLayer extends React.Component {
  render () {
    var grid = [];
    if (this.props.map != undefined && this.props.map.map != undefined) {
      this.props.map.map.forEach(function(rowNumArr, i) {
        grid.push(
          <MapTerrainRow tiles={rowNumArr} key={i} kid={i}/>
        );
      });
    }
    return (
      <div id="terrainLayer" className="terrain-layer">
        {grid}
      </div>
    );
  }
}
export default MapTerrainLayer
