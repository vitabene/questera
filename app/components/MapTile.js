import React, { PropTypes } from 'react'

class MapTile extends React.Component {
  render () {
    // let object = this.props.tileObject;
    let type = "",
        bgi = "";
    // if (!!object) type = object.type;
    // if (!!object &&object.type === "hero") bgi = "url(" + object.avatar + ")";
    const styles = {
      backgroundImage: bgi,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain"
    }
    let tileClass = "map-tile " + TERRAINS[this.props.tid] + " " + type;
    return (
      <div tid={this.props.tid} style={styles} className={tileClass}></div>
    );
  }
}

export default MapTile
