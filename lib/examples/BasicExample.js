var React = require('react');
var NoteSource = require('../components/NoteSource');
var NotificationActions = require('../actions/NotificationActions');

var TestComponent = React.createClass({
  render: function() {
    return (
      <div className="TestComponent">
        <h1>Notes {this.props.notifications.length}</h1>
        {JSON.stringify(this.props.notifications)}
        <h1>Archived {this.props.archived.length}</h1>
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
        <button onClick={() => { NotificationActions.clearNotifications()} }>
          Clear Notes
        </button>
      </div>
    );
  },
  addNote() {
    var message = this.refs.note.getDOMNode().value;
    NotificationActions.create({message: message, timeout: false});
  }
});

module.exports = BasicExample;
