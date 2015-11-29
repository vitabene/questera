import React, { PropTypes } from 'react'

const questTypes = ['Monster'];

class Quest extends React.Component {
  constructor() {
    super();
    this.state = {
      edited: false,
      value: '',
      id: ''
    };
    this.updateValue = this.updateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.complete = this.complete.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
  }
  edit() {
    this.setState({edited: true});
  }
  handleChange(e){
    this.setState({value: e.target.value});
  }
  updateValue(text){
    this.setState({value: text});
  }
  complete() {
    this.props.update(this.state.id, this.state.value, 1);
  }
  cancelEdit() {
    this.setState({edited: false});
  }
  completeEdit() {
    this.props.update(this.state.id, this.state.value, 0)
    this.setState({
      edited: false
    });
  }
  componentDidMount() {
    this.setState({
      id: this.props.quest ? this.props.quest.id : '',
      value: this.props.quest ? this.props.quest.name : ''
    });
  }
  render () {
    var buttons = (
      <div className="quest__buttons">
        <img className="quest__edit-button"
              src={"./build/assets/quill-s.png"}
              onClick={this.edit}/>
      </div>
    );
    if (this.state.edited) {
      buttons = (
        <div className="quest__buttons">
          <img className="quest__cancel-edit-button"
                src={"./build/assets/quill-s-cancel.png"}
                onClick={this.cancelEdit}/>
          <img className="quest__complete-edit-button"
                src={"./build/assets/quill-s-complete.png"}
                onClick={this.completeEdit} />
        </div>
      );
    }
    return (
      <div className="quest">
        <img className="quest__image image"
              src={"./build/assets/monster.png"}
              onClick={this.complete}/>
        <input className="quest__name"
              disabled={!this.state.edited}
              onChange={this.handleChange}
              value={this.state.value}/>
        {buttons}
      </div>
    );
  }
}
export default Quest
