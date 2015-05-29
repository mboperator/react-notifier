var React = require('react');

var App = React.createClass({
  render() {
    return (
      <div>
        <button onClick={this.toggleExamples}>
          RELOAD
        </button>

        { this.renderExamples() }
      </div>
    );
  },
  toggleExamples() {
    this.setState({mounted: !this.state.mounted});
  },
  renderExamples() {
    if (!this.state.mounted) return(<div>Unmounted</div>);
    return(
      <div>
        <BasicExample/>
      </div>
    );
  }
});

// Test function
window.renderApp = function() {
  React.render(<App/>, document.querySelector(".app"));
};
