var React = require('react');
var Reflux = require('reflux');

var NotificationStore = require('../stores/NotificationStore');
var _ = require('underscore');

function getStoreState(tag) {
  return {
    notifications: NotificationStore.getNotes(tag),
    archived: NotificationStore.getArchived(tag),
  };
}

var NoteSource = React.createClass({
  propTypes: {
    tag: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.string,
    wrapper: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      tag: 'general',
      wrapper: 'div',
    };
  },
  mixins: [ Reflux.ListenerMixin ],
  getInitialState() {
    return getStoreState(this.props.tag);
  },
  componentDidMount() {
    this.listenTo(NotificationStore, this.onStoreChange);
  },
  onStoreChange(type, payload) {
    this.setState(getStoreState(this.props.tag));
  },
  render() {
    var Wrapper = this.props.wrapper;
    var children = this._cloneWithProps(this._buildProps());
    return (
      <Wrapper className={this.props.className}>
        { children }
      </Wrapper>
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
  },
});

module.exports = NoteSource;
