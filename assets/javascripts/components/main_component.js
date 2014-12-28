var MainContainer = React.createClass({
  render: function() {
    return (
      <div id="container">
        <h3> React Chat Room </h3>
        <CommentForm />
        <ChatList ref="chatList" />
      </div>
    );
  },

  componentDidMount: function() {
    var pusher = new Pusher('bfc4c00a003c45623df2'),
        channel = pusher.subscribe('chat')
        _this = this;

    channel.bind('new_message', function(data) {
      var chats = _this.refs.chatList.state.chats
      chats = chats.concat(data.message)
      _this.refs.chatList.setState({chats: chats})
    });
  }
});

React.render(
  <MainContainer />,
  $('body')[0]
);