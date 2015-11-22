import MapObjectTile from './MapObjectTile'
import React, { PropTypes } from 'react'

class MapObjectRow extends React.Component {
  render () {
    let tiles = [];
    for (var i = 0; i < this.props.l; i++) {
      let object = {};
      let objs = this.props.objects;
      if (objs != undefined && objs[i] != undefined) object = objs[i];
      tiles.push(
        <MapObjectTile object={object}/>
      );
    }
    return (
      <div className="map-row">
        {tiles}
      </div>
    );
  }
}
export default MapObjectRow
