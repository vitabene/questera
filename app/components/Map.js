import React, { PropTypes } from 'react'
import MapRow from './MapRow'
import MapStore from '../stores/mapStore'
import MapObjectStore from '../stores/mapObjectStore'
import HeroStore from '../stores/heroStore'

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      map: MapStore.currentMap(),
      hero: HeroStore.currentHero,
      objects: MapObjectStore.all()
    };
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    MapStore.addChangeListener(this.onChange);
    HeroStore.addChangeListener(this.onChange);
    MapObjectStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    MapStore.removeChangeListener(this.onChange);
    HeroStore.removeChangeListener(this.onChange);
    MapObjectStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      map: MapStore.currentMap(),
      hero: HeroStore.currentHero,
      objects: MapObjectStore.all()
    });
  }
  render () {
    var grid = [];
    if (this.state.map != undefined && this.state.map.map != undefined) {
      this.state.map.map.forEach(function(row, i) {
        grid.push(
          <MapRow tiles={row} key={i} tid={i}/>
        );
      });
    }
    return (
      <div className="map" id="map">
        <div id="terrainLayer" className="terrain-layer">
          {grid}
        </div>
        <div id="objectLayer" className="object-layer">
          objectLayer
        </div>
      </div>
    );
  }
}
export default Map
