import React, { PropTypes } from 'react'

class MapActionButton extends React.Component {
  render () {
    return (
      <div className="map-action-button">
        {this.props.action}
      </div>
    );
  }
}

export default MapActionButton
