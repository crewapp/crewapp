'use strict';

var React = require('react-native');
var MOCKED_CHAT_DATA = [
  {member: 'Richard', message: 'To the apple store!'}
];

var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP 
    channel : 'CrewAppChannel',
    publish_key   : "pub-c-ed3f13a5-4e20-4ea5-8760-1fce2f13b370",
    subscribe_key : "sub-c-b92b6ee8-dd46-11e4-bb6f-0619f8945a4f"
});

var name;

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AlertIOS
} = React;

var app = React.createClass({
  render: function() {
    var chatNodes = MOCKED_CHAT_DATA.map(function (message) {
      return (
        <Chat member={message.member}>
          {message.message}
        </Chat>
      );
    });
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {chatNodes}
        </Text>
        <Name />
        <Submit />
      </View>
    );
  }
});

var Chat = React.createClass({
  render: function() {
    return (
      <Text style={styles.instructions}>
        {this.props.children}
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
    PUBNUB_obj.publish({
      channel: 'CrewAppChannel',
      member: name, 
      message: chat
      });
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
