var Reflux = require('reflux');
var Immutable = require('immutable-js');

var NotificationActions = require('../actions/NotificationActions');

var NotificationStore = Reflux.createStore({
  _notifications: [],
  listenables: NotificationActions,
  init() {
    this.create({message: "This is a test!"});
  },
  create(notification) {
    this._notifications.push(notification);
    this.trigger("create", this._notifications);

    // Use config/notification options for timeout
    setTimeout( ()=> {
      this.destroy(notification);
    }, 500);
  },
  destroy() {
    this._notifications.shift();
    this.trigger("destroy", this._notifications);
  }
})

module.exports = NotificationStore;
