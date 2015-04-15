var styles = require('./styles.js');
var React = require('react-native');

var t = require('tcomb-form-native');
var Form = t.form.Form;

var io = require('react-native-sockets-io');

var name = name || 'anonymous';

var request = new XMLHttpRequest();

var {
  Text,
  View,
  TouchableHighlight
} = React;

var Message = t.struct({
  message: t.Str
});

var options = {
  fields: {
    message: {
      placeholder: 'Enter a message',
      error: 'You have to enter a message!',
      multiline: true
    }
  }
};

var ChatRoom = React.createClass({
  getInitialState: function() {
    return {
      io: io('http://localhost:5000', {jsonp: false}),
      room: null
    };
  },

  componentDidMount: function() {
    this.state.io.emit('chat message', {name: name, chat: 'hello'});
    this.getRoom();
  },

  getRoom: function() {

    request.onreadystatechange = (e) => {
      
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        
        this.setState({room: request.responseText});
        var that = this;
        this.state.io.on('connect', function() {
          that.state.io.emit('join room', that.state.room);
        });
        console.log(this.state.room);
        this.forceUpdate();

      } else {
        console.warn('error');
      }
    };

    request.open('GET', 'http://localhost:5000/api/rooms');
    request.send();

  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.chatBox}>
          <ChatList socket={this.state.io} />
        </View>
        <View style={styles.formBox}>
          <MessageForm socket={this.state.io} />
        </View>
      </View>
    );
  }
});

// List of messages
var ChatList = React.createClass({
  getInitialState: function(){
    return {messages: []};
  },
  propTypes: {
    socket: React.PropTypes.any
  },
  componentDidMount: function(){
  //Must specifiy 'jsonp: false' since react native doesn't provide the dom
  //and thus wouldn't support creating an iframe/script tag
    this.props.socket.on('message', (msg) =>{
      this.state.messages.push(msg);
      this.forceUpdate();
    });
  },
  render: function(){
    return (
      <View>
        {
          this.state.messages.map(m => {
            return <Text>{m.name}: {m.chat}</Text>;
          })
        }
      </View>
    );
  }
});

// Unified Input Field

var MessageForm = React.createClass({
  onPress: function() {
    var value = this.refs.form.getValue();
    if (value) {
      this.send(value);
    }
  },
  propTypes: {
    socket: React.PropTypes.any
  },
  send: function(message) {
    // Name is still being referenced here because of line 9 above
    // will be needed after we bring in authentication too.
    this.props.socket.emit('message', message);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Message}
          option={options} />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = ChatRoom;
