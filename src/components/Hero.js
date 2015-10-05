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
