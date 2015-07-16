var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions');
var _ = require('underscore');

function getDefaults() {
  return {
    createdAt: Date.now(),
    type: 'info',
    tag: 'general',
    timeout: 3000,
    id: _.uniqueId('notification_'),
  };
}

function format(notification) {
  var formatted = _.defaults(notification, getDefaults());
  return formatted;
}

var NotificationStore = Reflux.createStore({
  _notifications: [],
  _archived: [],
  listenables: NotificationActions,
  success(notification) {
    notification.type = 'success';
    this.create(notification);
  },
  info(notification) {
    notification.type = 'info';
    this.create(notification);
  },
  error(notification) {
    notification.type = 'error';
    this.create(notification);
  },
  create(notification) {
    this._notifications.push(format(notification));
    this.trigger('create', this.getNotes());

    if (!notification.timeout) { return; }
    setTimeout(() => {
      this.destroy(notification);
    }.bind(this), notification.timeout);
  },
  destroy(oldNote) {
    this._notifications = _.without(this._notifications, oldNote);
    this.archive(oldNote);
    this.trigger('destroy', this.getNotes());
  },
  clearNotifications(tag='general') {
    var notesForTag = this.getNotes(tag);
    this._archived = this._archived.concat(notesForTag);
    this._notifications = _.difference(this._notifications, notesForTag);
    this.trigger('clearNotifications', this.getNotes());
  },
  archive(notification) {
    this._archived.push(notification);
  },
  getNotes(tag='general') {
    return _.where(this._notifications, {tag});
  },
  getArchived(tag='general') {
    return _.where(this._archived, {tag});
  },
});

module.exports = NotificationStore;
