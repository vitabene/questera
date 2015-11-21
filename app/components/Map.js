import React, { PropTypes } from 'react'
import MapRow from './MapRow'
import MapStore from '../stores/mapStore'
import HeroStore from '../stores/heroStore'

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      map: MapStore.currentMap,
      hero: HeroStore.currentHero
    };
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    MapStore.addChangeListener(this.onChange);
    HeroStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    MapStore.removeChangeListener(this.onChange);
    HeroStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      map: MapStore.currentMap(),
      hero: HeroStore.currentHero
    });
  }
  render () {
    // var grid = [];
    // var hero = this.props.hero;
    // var heroY = this.props.map.map.length/2;
    // this.props.map.map.forEach(function(row, i) {
    //   var objects = [];
    //   if (i === heroY) objects = hero;
    //   grid.push(<MapRow tiles={row} rowObjects={objects} key={i}/>)
    // });
    return (
      <div className="map" id="map">
        <p>{JSON.stringify(this.state.map)}</p>
      </div>
    );
    // return (
    //   <table className="map" id="map">
    //     <tr>
    //     <td>{this.state.map }</td>
    //     </tr>
    //   </table>
    // );
  }
}
export default Map
