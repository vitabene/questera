import React, { PropTypes } from 'react'
import MapActionButton from './MapActionButton'
import QuestDataBox from './QuestDataBox'

class MapActionBox extends React.Component {
  render () {
    return (
      <div className="map-action-box">
        <QuestDataBox quest={this.props.quest}/>
        <MapActionButton object={this.props.quest} action="engage"/>
        <MapActionButton object={this.props.quest} action="notengage"/>
      </div>
    );
  }
}
export default MapActionBox
