var CommentBox = React.createClass({
  render: function() {
    return (
      <textarea className="comment-box" name={ this.props.name } placeholder="Type your message.." />
    );
  }
});