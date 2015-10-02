// questera

var HERO = {
  name: "Vita", craft: "Mage", avatar: "assets/hero.png"
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

var Map = React.createClass({
  componentWillMount: function() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var map = JSON.parse(httpRequest.responseText);
          console.log(map);
        } else {
          console.error('There was a problem with the request.');
        }
      }
    };
    httpRequest.open('GET', 'assets/map.json', true);
    httpRequest.send(null);
  },
  render: function() {
    var rows = [];
    // this.props.quests.forEach(function(quest) {
    //     rows.push(<MapQuest quest={quest} key={quest.name}/>);
    // });
    // this.props.mapobjects.forEach(function(object) {
    //     rows.push(<MapObject object={object} key={object.name}/>);
    // });
    return (
      <table className="map" id="map">
        {rows}
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

var MapQuest = React.createClass({
  render: function() {
    return (
      <div className="map-quest">
        <img className={this.props.quest.type} alt={this.props.quest.name}/>
      </div>
    );
  }
});

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
    var rows = [];
    this.props.quests.forEach(function(quest) {
        rows.push(<Quest quest={quest} key={quest.name}/>);
    });
    return (
      <div className="questboard" id="questboard">
      <QuestField />
        {rows}
      </div>
    );
  }
});

var Game = React.createClass({
  render: function(){
    return (
      <div>
        <Heroboard hero={this.props.hero} />
        <Map quests={this.props.quests} mapobjects={this.props.mapobjects}/>
        <Questboard quests={this.props.quests} />
      </div>
    );
  }
});

React.render(<Game quests={QUESTS} mapobjects={MAPOBJECTS} hero={HERO} />, document.getElementById('game'));
