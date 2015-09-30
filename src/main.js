// questera

var HERO = {
  name: "Vita", profession: "Mage", avatar: "assets/me0.png"
};

var QUESTS = [
  {name: 'Build questera', type: 'Building', done: false, created: '1443601842862'},
  {name: 'Learn More About React', type: 'Exploration', done: false, created: '1443601842863'},
  {name: 'Angularize Learn', type: 'Building', done: false, created: '1443601842864'},
  {name: 'Learn More About Wordpress', type: 'Exploration', done: false, created: '1443601842865'},
  {name: 'Improve Mapper Script', type: 'Building', done: false, created: '1443601842866'},
  {name: 'Learn More About Laravel', type: 'Exploration', done: false, created: '1443601842867'}
];

var Map = React.createClass({
  render: function() {
    var rows = [];
    this.props.quests.forEach(function(quest) {
        rows.push(<Quest quest={quest} key={quest.name}/>);
    });
    return (
      <div className="map" id="map">
        {rows}
      </div>
    );
  }
});

var Hero = React.createClass({
  render: function() {
    return (
      <div className="hero" id="hero">
        <h1>{this.props.hero.name}</h1>
        <h2>{this.props.hero.profession}</h2>
        <img src={this.props.hero.avatar} alt="Hero"/>
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
        <p>{this.props.quest.name}</p>
        <p>{this.props.quest.type}</p>
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
        <Map quests={this.props.quests} />
        <Questboard quests={this.props.quests} />
      </div>
    );
  }
});

React.render(<Game quests={QUESTS} quests={QUESTS} hero={HERO} />, document.getElementById('game'));
