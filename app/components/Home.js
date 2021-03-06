import actions from '../actions'
import QuestStore from '../stores/questStore'
import HeroStore from '../stores/heroStore'
import HeroBoard from './HeroBoard'
import Map from './map/Map'
import QuestBoard from './QuestBoard'
import update from 'react-addons-update'
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
    this.updateQuest = this.updateQuest.bind(this);
  }
  saveQuest(text) {
      actions.createQuest(text);
  }
  updateQuest(id, text, completed) {
      actions.updateQuest({id: id, text: text, completed: completed});
      if (completed) {
        var index = -1;
        for (var i = 0; i < this.state.quests.length; i++) {
          var q = this.state.quests[i];
          if (id == q.id) index = this.state.quests.indexOf(q)
        }
        if (index !== -1)
        this.setState({
          quests: update(this.state.quests, {$splice: [[index, 1]]})
        })
      }
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
        <Map moveHero={this.moveHero}
              hero={this.state.hero}
              quests={this.state.quests}/>
        <QuestBoard addQuest={this.saveQuest}
                    updateQuest={this.updateQuest}
                    quests={this.state.quests}/>
      </div>
    );
  }
}
export default Home
