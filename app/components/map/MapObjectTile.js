import React, { PropTypes } from 'react'
import MapObject from './MapObject'

class MapObjectTile extends React.Component {
  render () {
    let objects = [];
    this.props.objects.forEach(function(o, i) {
      objects.push(
        <MapObject object={o}/>
      );
    })
    let tileClass = `map-tile`;
    return (
      <div className={tileClass}>
        {objects}
      </div>
    );
  }
}

export default MapObjectTile
