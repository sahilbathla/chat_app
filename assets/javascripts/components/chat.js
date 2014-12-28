var Chat = React.createClass({
  render: function() {
    return(
      <div className="chat">
        { this.props.text }
      </div>
    );
  }
})