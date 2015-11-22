import MapObjectRow from './MapObjectRow'
import React, { PropTypes } from 'react'
import MapObjectStore from '../stores/mapObjectStore'
import HeroStore from '../stores/heroStore'

class MapObjectLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      objects: MapObjectStore.all()
    };
    this.onChange = this.onChange.bind(this)
  }
  handleKeypress(e) {
    console.log(e.keyCode);
    // if(e.keyCode == 13){
    // }
  }
  componentDidMount() {
    MapObjectStore.addChangeListener(this.onChange);
    document.addEventListener("keydown", this.handleKeypress, false);
  }
  componentWillUnmount() {
    MapObjectStore.removeChangeListener(this.onChange);
    document.removeEventListener("keydown", this.handleKeypress);
  }
  onChange() {
    this.setState({
      objects: MapObjectStore.all()
    });
  }

  render () {
    var grid = [], objectGridArr = [];
    if (this.state.objects != undefined) {
      this.state.objects.forEach(function(obj, i) {
        objectGridArr[obj.coords.y] = [];
        objectGridArr[obj.coords.y][obj.coords.x] = obj;
      });
    }
    var hero = this.props.hero;
    if (hero != undefined && hero.coords != undefined) {
      objectGridArr[hero.coords.y] = [];
      objectGridArr[hero.coords.y][hero.coords.x] = hero;
    }
    if (this.props.map != undefined && this.props.map.map != undefined) {
      var rl = this.props.map.map[0].length
      this.props.map.map.forEach(function(rowNumArr, i) {
        grid.push(
          <MapObjectRow objects={objectGridArr[i]} l={rl} key={i} i={i}/>
        );
      });
    }
    return (
      <div id="objectLayer" className="object-layer" onKeyDown={this.handleKeypress}>
        {grid}
      </div>
    );
  }
}
export default MapObjectLayer
