Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var pusher = new Pusher('bfc4c00a003c45623df2');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
  alert(data.message);
});