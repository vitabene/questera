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
      hero: HeroStore.currentHero
    };
    this.onChange = this.onChange.bind(this)
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
      hero: HeroStore.currentHero
    });
  }
  render () {
    return (
      <div>
        <HeroBoard hero={this.state.hero}/>
        <Map />
        <QuestBoard addQuest={this.saveQuest} quests={this.state.quests}/>
      </div>
    );
  }
}
export default Home
