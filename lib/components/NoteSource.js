var React = require('react');
var Reflux = require('reflux');

var NotificationStore = require('../stores/NotificationStore');
var _ = require('underscore');

function getStoreState() {
  return {
    notifications: NotificationStore.getNotes(),
    archived: NotificationStore.getArchived()
  };
}

var NoteSource = React.createClass({
  mixins: [ Reflux.ListenerMixin ],
  getInitialState() {
    return getStoreState();
  },
  componentDidMount() {
    this.listenTo(NotificationStore, this.onStoreChange);
  },
  onStoreChange(type, payload) {
    this.setState(getStoreState());
  },
  render() {
    var children = this._cloneWithProps(this._buildProps());
    return (
      <div className={this.props.className}>
        { children }
      </div>
    );
  },
  /**
   * Modifies props for children components
   * @return {object} Formatted Props
   */
  _buildProps() {
    var props = _.clone(this.props);
    var {notifications, archived} = this.state;
    delete props.className;

    return _.extend(props, {notifications, archived});
  },
  /**
   * Clones children with given props
   * @param  {object} props Props to give to children
   * @return {array} Array of child components with new props
   */
  _cloneWithProps(props) {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, props);
    }, this.context);
  }
});

module.exports = NoteSource;
