var UserForm = React.createClass({
  render: function() {
    return (
      <div id='user-form'>
        <input ref="username" id="user-input" placeholder="Enter your name"  /><br />
        <button onClick={ this.saveUser } id="go-to-room">Go to Chatroom</button>
      </div>
    );
  },
  saveUser: function() {
    this.props.onSave(this.refs.username.getDOMNode().value);
  }
});