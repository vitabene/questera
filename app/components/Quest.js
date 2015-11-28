import React, { PropTypes } from 'react'

const questTypes = ['Monster'];

class Quest extends React.Component {
  constructor() {
    super();
    this.state = {
      edited: false
    };
    this.complete = this.complete.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
  }
  edit() {
    this.setState({
      edited: true
    });
  }
  complete() {
    console.log("complete");
  }
  cancelEdit() {
    this.setState({
      edited: false
    });
  }
  completeEdit() {
    console.log("completeEdit");
  }
  render () {
    var contentEditable = "";
    var buttons = (
      <div className="quest__buttons">
        <img className="quest__edit-button"
              src={"./build/assets/quill-s.png"}
              onClick={this.edit}/>
      </div>
    );
    if (this.state.edited) {
      contentEditable = "contenteditable";
      buttons = (
        <div className="quest__buttons">
          <img className="quest__cancel-edit-button"
                src={"./build/assets/quill-s-cancel.png"}
                onClick={this.cancelEdit}/>
          <img className="quest__complete-edit-button"
                src={"./build/assets/quill-s-complete.png"}
                onClick={this.completeEdit}/>
        </div>
      );
    }
    return (
      <div className="quest">
        <img className="quest__image image" src={"./build/assets/" + this.props.quest.type.toLowerCase() + ".png"} />
        <span className="quest__name" contenteditable={this.state.edited}>{this.props.quest.name}</span>
        {buttons}
      </div>
    );
  }
}
export default Quest
