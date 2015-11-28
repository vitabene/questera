import React, { PropTypes } from 'react'

class MapTerrainTile extends React.Component {
  render () {
    let type = "",
        bgi = "";
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

export default MapTerrainTile
