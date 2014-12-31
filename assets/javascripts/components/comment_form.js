var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.refs.chatText.getDOMNode().value.trim()) {
      var _this = this;
      $.ajax({
        type: 'POST',
        data: $(_this.getDOMNode()).serialize() + '&username=' + localStorage.username,
        url: '/new_message'
      }).success(function() {
        _this.refs.chatText.getDOMNode().value = '';
      });
    }
  },

  render: function() {
    return (
      <form method="post" onSubmit={ this.handleSubmit }>
        <CommentBox name="chat" ref="chatText" />
        <SendButton />
      </form>
    );
  }
});