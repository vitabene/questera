import actions from '../actions'
import QuestStore from '../stores/questStore'
import HeroStore from '../stores/heroStore'
import HeroBoard from './HeroBoard'
import Map from './Map'
import QuestBoard from './QuestBoard'
import React, { PropTypes } from 'react'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      quests: QuestStore.all(),
      hero: HeroStore.getHero()
    };
    this.onChange = this.onChange.bind(this);
    this.moveHero = this.moveHero.bind(this);
  }
  saveQuest(text) {
      actions.createQuest(text);
  }
  componentDidMount() {
    QuestStore.addChangeListener(this.onChange);
    HeroStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    QuestStore.removeChangeListener(this.onChange);
    HeroStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      quests: QuestStore.all(),
      hero: HeroStore.getHero()
    });
  }
  moveHero(coords) {
    this.state.hero.coords.x += coords.x
    this.state.hero.coords.y += coords.y
    this.setState({
      hero: this.state.hero
    });
  }
  render () {
    return (
      <div>
        <HeroBoard hero={this.state.hero}/>
        <Map moveHero={this.moveHero} hero={this.state.hero}/>
        <QuestBoard addQuest={this.saveQuest} quests={this.state.quests}/>
      </div>
    );
  }
}
export default Home
