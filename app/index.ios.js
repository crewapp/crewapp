'use strict';

var React = require('react-native');
var MOCKED_CHAT_DATA = [
  {member: 'Richard', message: 'To the apple stdore!'}
];

var name;

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  AlertIOS
} = React;

var app = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <ChatList />
        <Name />
        <Submit />
      </View>
    );
  }
});

var ChatList = React.createClass({
  render: function() {
    var chatNodes = MOCKED_CHAT_DATA.map(function (message) {
      return (
        <Chat member={message.member}>
          {message.message}
        </Chat>
      );
    });
    console.log(chatNodes)
    return (
      <View>
        {chatNodes}
      </View>
    );
  }
});

var Chat = React.createClass({
  render: function() {
    return (
      <Text style={styles.instructions}>
      </Text>
    );
  }
});

var Name = React.createClass({
  handleSubmit: function(e){
    name = e.nativeEvent.text;
    AlertIOS.alert('Got it, thanks!');
  },
  render: function() {
    return (
      <View>
        <TextInput
          value="Please type in name"
          onSubmitEditing={(text) => this.handleSubmit(text)}
          style={styles.input} />
      </View>
    );
  }
});

var Submit = React.createClass({
  handleSubmit: function(e) {
    var chat = e.nativeEvent.text;
    MOCKED_CHAT_DATA.push({member: name, message: chat});
    console.log(MOCKED_CHAT_DATA);
  },
  render: function() {
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
    height: 20,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('app', () => app);
