var OnlineUsersList = React.createClass({
  render: function() {
    var users = this.props.users.map(function(user) {
      return(<div>{ user }</div>)
    });

    return (
      <div id="online-users">
        <h4>Online Users</h4>
        { users }
      </div>
    );
  }
});