import Hero from './Hero'
import React, { PropTypes } from 'react'

class HeroBoard extends React.Component {
  render () {
    return (
      <div className="heroboard" id="heroboard">
        <Hero hero={this.props.hero} key={this.props.hero.name}/>
      </div>
    );
  }
}
export default HeroBoard
