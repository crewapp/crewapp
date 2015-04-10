'use strict';

var React = require('react-native');
var MOCKED_CHAT_DATA;

var name = name || 'anonymous';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  NavigatorIOS,
  AlertIOS
} = React;

var io = require('react-native-sockets-io');

var app = React.createClass({
  getInitialState: function() {
    return {io: io('http://localhost:5000', {jsonp: false})};
  },
  componentDidMount: function() {
    this.state.io.emit('chat message', {name: name, chat: 'hello'});
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ChatList socket={this.state.io} />
        <Name />
        <Submit socket={this.state.io} />
      </View>
    );
  }
});

var Nav = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.nav}
        initialRoute={{
          title: 'Crew',
          component: app
        }}
      ></NavigatorIOS>
    );
  }
});

var ChatList = React.createClass({
  getInitialState:function(){
    return {messages: []}
  },
  componentDidMount: function(){
  //Must specifiy 'jsonp: false' since react native doesn't provide the dom
  //and thus wouldn't support creating an iframe/script tag
    this.props.socket.on('chat message', (msg) =>{
      this.state.messages.push(msg);
      this.forceUpdate();
    });
  },
  render: function(){
    return (
      <View>
        {
          this.state.messages.map(m => {
            return <Text>{m.name}: {m.chat}</Text>
          })
        }
      </View>
    );
  }
});

var Chat = React.createClass({
  render: function() {
    return (
      <Text style={styles.text}>
      {this.props.author}: {this.props.children}
      </Text>
    );
  }
});

var Name = React.createClass({
  handleSubmit: function(e){
    name = e.nativeEvent.text;
  },
  render: function() {
    return (
      <View>
        <TextInput
          placeholder="Please type in name"
          onSubmitEditing={(text) => this.handleSubmit(text)}
          style={styles.input} />
      </View>
    );
  }
});

var Submit = React.createClass({
  handleSubmit: function(e) {
    var chat = e.nativeEvent.text;
    this.send(chat);
  },
  send: function(message) {
    this.props.socket.emit('chat message', {name: name, chat: message});
  },
  render: function() {
    this.send('hello');
    return (
    <View>
      <TextInput
        onSubmitEditing={this.handleSubmit}
        style={styles.input} />
    </View>
    );
  }
});

var styles = StyleSheet.create({
  input: {
    height: 36,
    width:  200,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  nav: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 20
  }
});

AppRegistry.registerComponent('app', () => app);
