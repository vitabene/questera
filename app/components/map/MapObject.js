import React, { PropTypes } from 'react'

class MapObject extends React.Component {
  render () {
    let type = "",
        bgi = "",
        visited = "not-visited";
    let [objType, objVisited, objUrl]  = [
      this.props.object.type,
      this.props.object.visited,
      this.props.object.avatarUrl
    ];
    if (objVisited != undefined) visited = objVisited;
    if (objUrl != undefined) bgi = objUrl;
    if (objType != undefined) type = objType;
    if (typeof type === "string") {
        type = type.toLowerCase()
        if (objUrl == undefined) {
          bgi = `./build/assets/${type}.png`
        } else {
          bgi = objUrl;
        }
    }
    let tileClass = `map-object ${visited} ${OBJECTS[type]} ${type}`;
    let styles = {backgroundImage: `url("${bgi}")`};
    return (
      <div style={styles} className={tileClass}></div>
    );
  }
}
export default MapObject
