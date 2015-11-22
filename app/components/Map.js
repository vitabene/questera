import React, { PropTypes } from 'react'
import MapTerrainLayer from './MapTerrainLayer'
import MapObjectLayer from './MapObjectLayer'
import MapStore from '../stores/mapStore'

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      map: MapStore.currentMap()
    };
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    MapStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    MapStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      map: MapStore.currentMap()
    });
  }
  render () {
    return (
      <div className="map" id="map">
        <MapTerrainLayer map={this.state.map}/>
        <MapObjectLayer map={this.state.map} hero={this.props.hero}/>
      </div>
    );
  }
}
export default Map
