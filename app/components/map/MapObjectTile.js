import React, { PropTypes } from 'react'
import MapObject from './MapObject'
import MapActionBox from './MapActionBox'

class MapObjectTile extends React.Component {
  render () {
    let objects = [];
    let os = this.props.objects;
    let actionBox = os.length == 2 ? (<MapActionBox quest={os[1]}/>) : {};
    os.forEach(function(o, i) {
      objects.push(
        <MapObject object={o}/>
      );
    });
    if (os.length == 2) objects.push(actionBox);
    let tileClass = `map-tile`;
    return (
      <div className={tileClass}>
        {objects}
      </div>
    );
  }
}

export default MapObjectTile
