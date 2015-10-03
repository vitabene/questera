// questera

var HERO = {
  name: "Vita", craft: "Mage", avatar: "assets/hero.png"
};

var TERRAINS = {
  0: "ocean",
  1: "grass",
  2: "forest",
  3: "mountains",
  4: "field",
  5: "moor",
  6: "pond",
  7: "road",
  8: "river",
};

var QUESTS = [
  {name: 'Build questera', type: 'Building', done: false, created: '1443601842862'},
  {name: 'Learn More About React', type: 'Exploration', done: false, created: '1443601842863'},
  {name: 'Angularize Learn', type: 'Building', done: false, created: '1443601842864'},
  {name: 'Learn More About Wordpress', type: 'Exploration', done: false, created: '1443601842865'},
  {name: 'Improve Mapper Script', type: 'Building', done: false, created: '1443601842866'},
  {name: 'Learn More About Laravel', type: 'Exploration', done: false, created: '1443601842867'}
];

var MAPOBJECTS = [
  {id: '1', type: 'Camp', visited: false, created: '1443601842862'}
];

var MAP = {
	"map":[
		[0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1],
		[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1],
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
		[1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
		[1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
		[1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
		[0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
	]
};


function getMap(callback) {
  var map = {};
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        map = JSON.parse(httpRequest.responseText);
        console.log("Map fetched successfully.");
      } else {
        console.error('There was a problem with the request.');
      }
    }
  };
  httpRequest.open('GET', 'assets/map.json', true);
  httpRequest.send(null);
  callback.call();
}

var MapTile = React.createClass({
  render: function() {
    return (
      <td tid={this.props.tid} className={"map-tile " + TERRAINS[this.props.tid]}></td>
    );
  }
});

var MapRow = React.createClass({
  render: function() {
    var tiles = [];
    this.props.tiles.forEach(function(tid) {
      tiles.push(<MapTile tid={tid}/>)
    });
    return (
      <tr>{tiles}</tr>
    );
  }
});

var Map = React.createClass({
  render: function() {
    var grid = [];
    this.props.map.map.forEach(function(row, i) {
      grid.push(<MapRow tiles={row} key={i}/>)
    });
    return (
      <table className="map" id="map">
        {grid}
      </table>
    );
  }
});

var MapObject = React.createClass({
  render: function() {
    return (
      <div className={this.props.object.type}>
        {this.props.object.type}
      </div>
    );
  }
});

var Hero = React.createClass({
  render: function() {
    return (
      <div className="hero" id="hero">
        <img src={this.props.hero.avatar} className="hero__avatar" alt="Hero"/>
        <h1 className="hero__name">{this.props.hero.name}</h1>
        <h2 className="hero__craft">{this.props.hero.craft}</h2>
      </div>
    );
  }
});

var Heroboard = React.createClass({
  render: function() {
    return (
      <div className="heroboard" id="heroboard">
        <Hero hero={this.props.hero} key={this.props.hero.name}/>
      </div>
    );
  }
});

var Quest = React.createClass({
  render: function() {
    return (
      <div className="quest">
        <img className="quest__image image" src={"assets/" + this.props.quest.type.toLowerCase() + ".png"} />
        <span className="quest__name">{this.props.quest.name}</span>
      </div>
    );
  }
});

// var MapQuest = React.createClass({
//   render: function() {
//     return (
//       <div className="map-quest">
//         <img className={this.props.quest.type} alt={this.props.quest.name}/>
//       </div>
//     );
//   }
// });

var QuestField = React.createClass({
  render: function() {
    return (
      <div className="quest-field-box">
        <input className="quest-field" id="questField"/>
      </div>
    );
  }
});

var Questboard = React.createClass({
  render: function() {
    var quests = [];
    this.props.quests.forEach(function(quest) {
        quests.push(<Quest quest={quest} key={quest.name}/>);
    });
    return (
      <div className="questboard" id="questboard">
      <QuestField />
        {quests}
      </div>
    );
  }
});

var Game = React.createClass({
  render: function(){
    return (
      <div>
        <Heroboard hero={this.props.hero} />
        <Map map={this.props.map} quests={this.props.quests} mapobjects={this.props.mapobjects}/>
        <Questboard quests={this.props.quests} />
      </div>
    );
  }
});

React.render(<Game quests={QUESTS} mapobjects={MAPOBJECTS} map={MAP} hero={HERO} />, document.getElementById('game'));
