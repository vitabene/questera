import React, { PropTypes } from 'react'

class MapObject extends React.Component {
  render () {
    return (
      <div className={this.props.object.type}>
        {this.props.object.type}
      </div>
    );
  }
}
export default MapObject
