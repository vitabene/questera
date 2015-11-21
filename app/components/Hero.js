import React from 'react'

var occupations = ['Mage'];

class Hero extends React.Component {
  render () {
    return (
      <div className="hero" id="hero">
        <img src={this.props.hero.avatarUrl} className="hero__avatar" alt="Hero"/>
        <h1 className="hero__name">{this.props.hero.name}</h1>
        <h2 className="hero__craft">{occupations[this.props.hero.occupation]}</h2>
      </div>
    );
  }
}
export default Hero
