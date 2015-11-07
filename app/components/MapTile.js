import React, { PropTypes } from 'react'

class MapTile extends React.Component {
  render () {
    let object = this.props.tileObject;
    let type = "",
        bgi = "";
    if (!!object) type = object.type;
    if (!!object &&object.type === "hero") bgi = "url(" + object.avatar + ")";
    const TERRAINS = {
      0: "ocean", 1: "grass", 2: "forest",
      3: "mountains", 4: "field", 5: "moor",
      6: "pond", 7: "road", 8: "river",
    };
    return (
      <td tid={this.props.tid} style={{backgroundImage: bgi, backgroundRepeat: "no-repeat", backgroundSize: "contain"}} className={"map-tile " + TERRAINS[this.props.tid] + " " + type}></td>
    );
  }
}

export default MapTile