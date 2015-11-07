import React from 'react'

const occupations = ['Mage'];

class Hero extends React.Component {
  render () {
    return (
      <div className="hero" id="hero">
        <img src={this.props.hero.AvatarUrl} className="hero__avatar" alt="Hero"/>
        <h1 className="hero__name">{this.props.hero.Name}</h1>
        <h2 className="hero__craft">{occupations[this.props.hero.Occupation]}</h2>
      </div>
    );
  }
}
export default Hero
