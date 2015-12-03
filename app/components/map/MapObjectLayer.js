import MapObjectRow from './MapObjectRow'
import React, { PropTypes } from 'react'
import MapObjectStore from '../../stores/mapObjectStore'
import HeroStore from '../../stores/heroStore'

class MapObjectLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      objects: MapObjectStore.all()
    };
    this.onChange = this.onChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
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
  handleKeypress(e) {
    if (this.props != undefined && this.props.moveHero != undefined) {
      switch (e.keyCode) {
        case 37:
          this.props.moveHero({x: -1, y: 0});
          break;
        case 38:
          this.props.moveHero({x: 0, y: -1});
          break;
        case 39:
          this.props.moveHero({x: 1, y: 0});
          break;
        case 40:
          this.props.moveHero({x: 0, y: 1});
          break;
        default:
          break;
      }
    }
  }
  render () {
    var grid = [], objectGridArr = [];
    if (this.state.objects != undefined) {
      this.state.objects.forEach(function(obj, i) {
        var row = objectGridArr[obj.coords.y];
        if (row == undefined) row = [];
        var tile = row[obj.coords.x];
        if (tile == undefined) tile = [];
        tile.push(obj);
        row[obj.coords.x] = tile;
        objectGridArr[obj.coords.y] = row;
      });
    }
    if (this.props.quests != undefined) {
      this.props.quests.forEach(function(quest, i) {
        var row = objectGridArr[quest.coords.y];
        if (row == undefined) row = [];
        var tile = row[quest.coords.x];
        if (tile == undefined) tile = [];
        tile.push(quest);
        row[quest.coords.x] = tile;
        objectGridArr[quest.coords.y] = row;
      });
    }
    var hero = this.props.hero;
    if (hero != undefined && hero.coords != undefined) {
      var row = objectGridArr[hero.coords.y];
      if (row == undefined) row = [];
      var tile = row[hero.coords.x];
      if (tile == undefined) tile = [];
      tile.push(hero);
      row[hero.coords.x] = tile;
      objectGridArr[hero.coords.y] = row;
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
