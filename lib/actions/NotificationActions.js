var Reflux = require('reflux');

function NotificationActions() {
  return Reflux.createActions([
    "create",
    "error",
    "info",
    "success",
    "destroy"
  ]);
}

module.exports = new NotificationActions();
