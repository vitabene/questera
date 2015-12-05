import React, { PropTypes } from 'react'
const OBJECTS = ['camp'];
class MapObject extends React.Component {
  render() {
    let o = this.props.object;
    let visited = o.visited != undefined ? o.visited : "not-visited";
    let type = o.type != undefined ? o.type : "";
    type = typeof type == "string" ? type = type.toLowerCase() : type;
    let bgi = o.avatarUrl != undefined ? o.avatarUrl : `./build/assets/${type}.png`;
    let tileClass = `map-object ${visited} ${OBJECTS[type]} ${type}`;
    let styles = {backgroundImage: `url("${bgi}")`};
    return (
      <div style={styles} className={tileClass}></div>
    );
  }
}
export default MapObject
