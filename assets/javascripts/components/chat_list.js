var ChatList = React.createClass({
  getInitialState: function() {
    return { chats: [] }
  },
  render: function() {
    var chats = this.state.chats.map(function(chat) {
      return(<Chat text={ chat } />);
    });

    return (
      <div id='chat-list'>
        { chats }
      </div>
    );
  }
});