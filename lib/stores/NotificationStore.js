var Reflux = require('reflux');

var NotificationActions = require('../actions/NotificationActions');

var NotificationStore = Reflux.createStore({
  _notifications: [],
  _archived: [],
  listenables: NotificationActions,
  init() {
    this.create({message: "This is a test!"});
  },
  create(notification) {
    // Add timestamp support
    this._notifications.push(notification);
    this.trigger("create", this.getNotes());

    // Use config/notification options for timeout
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
})

module.exports = NotificationStore;
