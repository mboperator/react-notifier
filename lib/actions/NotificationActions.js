var Reflux = require('reflux');

function NotificationActions() {
  return Reflux.createActions([
    "add",
    "destroy"
  ]);
}

module.exports = new NotificationActions();
