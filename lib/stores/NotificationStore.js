var Reflux = require('reflux');
var NotificationActions = require('../actions/NotificationActions');
var _ = require('underscore');

function getDefaults() {
  return {
    createdAt: Date.now(),
    type: "info"
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
    notification.type = "success";
    this.create(notification);
  },
  info(notification) {
    notification.type = "info";
    this.create(notification);
  },
  error(notification) {
    notification.type = "error";
    this.create(notification);
  },
  create(notification) {
    this._notifications.push(format(notification));
    this.trigger("create", this.getNotes());

    setTimeout(function() {
      this.destroy(notification);
    }.bind(this), 5000);
  },
  destroy() {
    var oldNote = this._notifications.shift();
    this.archive(oldNote);
    this.trigger("destroy", this.getNotes());
  },
  archive(notification) {
    this._archived.push(notification);
  },
  getNotes() {
    return this._notifications;
  },
  getArchived() {
    return this._archived;
  }
});

module.exports = NotificationStore;
