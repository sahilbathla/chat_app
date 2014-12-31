var MainContainer = React.createClass({
  getInitialState: function() {
    return({ username: localStorage.username, users: [] })
  },

  render: function() {
    if (this.state.username) {
      return (
        <div id="container">
          <h3> React Chat Room </h3>
          <ChatList ref="chatList" />
          <CommentForm />
          <OnlineUsersList users={ this.state.users } />
        </div>
      );
    } else {
      return (<UserForm onSave={ this.sendUserName }/>)
    }
  },

  getOnlineUsers: function() {
    var _this = this;
    $.ajax({
      type: 'GET',
      url: '/online_users'
    }).success(function(users) {
      _this.setState({ users: users })
    });
  },

  sendUserName: function(username) {
    var _this = this;
    $.ajax({
      type: 'POST',
      data: { user: username },
      url: '/add_user'
    }).success(function() {
      _this.setState({ username: username })
      localStorage.username = username;
    });
  },

  bindEvents: function() {
    var _this = this;
    $(window).unload(function(event) {
      $.ajax({
        type: 'POST',
        data: { user: localStorage.username },
        url: '/remove_user',
        async: false
      });
      localStorage.clear();
      _this.username = null;
    });
  },

  componentDidMount: function() {
    //Get Online Users for each refresh
    this.getOnlineUsers();
    this.bindEvents();

    var pusher = new Pusher('bfc4c00a003c45623df2'),
        channel = pusher.subscribe('chat')
        _this = this;

    //Fetch new chat message
    channel.bind('new_message', function(data) {
      var chats = _this.refs.chatList.state.chats
      chats = chats.concat(data.message)
      _this.refs.chatList.setState({chats: chats})
    }); 

    //Fetch any change to online users
    channel.bind('users_change', function(data) {
      _this.setState({ users: JSON.parse(data.message) });
    });
  }
});

React.render(
  <MainContainer />,
  $('body')[0]
);