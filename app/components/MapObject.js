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
    if (objType != undefined) type = objType;
    if (objVisited != undefined) visited = objVisited;
    if (objUrl != undefined) bgi = objUrl;
    let tileClass = `map-object ${visited} ${OBJECTS[type]}`;
    let styles = {backgroundImage: `url(${bgi})`};
    return (
      <div style={styles} id={this.props.object.id} className={tileClass}></div>
    );
  }
}
export default MapObject
