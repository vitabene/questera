import React, { PropTypes } from 'react'
import MapObject from './MapObject'

class MapObjectTile extends React.Component {
  render () {
    let object = "";
    if (this.props.object.id != undefined) {
      object = (
        <MapObject object={this.props.object}/>
      );
    }
    let tileClass = `map-tile`;
    return (
      <div className={tileClass}>
        {object}
      </div>
    );
  }
}

export default MapObjectTile
