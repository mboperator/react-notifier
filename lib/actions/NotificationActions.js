var Reflux = require('reflux');

function NotificationActions() {
  return Reflux.createActions([
    'clearNotifications',
    'create',
    'destroy',
    'error',
    'info',
    'success',
  ]);
}

module.exports = window.NotificationActions = new NotificationActions();
