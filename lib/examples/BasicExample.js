var React = require('react');
var NoteSource = require('../components/NoteSource');
var NotificationActions = require('../actions/NotificationActions');

var TestComponent = React.createClass({
  render: function() {
    debugger;
    return (
      <div className="TestComponent">
        {JSON.stringify(this.props.notifications)}
        {JSON.stringify(this.props.archived)}
      </div>
    );
  }
});

var BasicExample = React.createClass({

  render() {
    return (
      <div>
        <h2>Hello world</h2>
        <NoteSource>
          <TestComponent/>
        </NoteSource>
        <input ref="note"/>
        <button onClick={this.addNote}>SEND</button>
      </div>
    );
  },
  addNote() {
    var message = this.refs.note.getDOMNode().value;
    NotificationActions.create({message: message});
  }
});

module.exports = BasicExample;
