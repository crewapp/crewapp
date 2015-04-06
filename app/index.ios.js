'use strict';

var React = require('react-native');

var MOCKED_CHAT_DATA = [
  {member: 'Richard', message: 'To the apple store!'},
]
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AlertIOS,
} = React;

var app = React.createClass({
  render: function() {
    var chat = MOCKED_CHAT_DATA[0];
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          {chat.member + ': ' + chat.message}
        </Text>
        <Submit />
      </View>
    );
  }
});

var Submit = React.createClass({
  render: function() {
    return (
    <View>
      <TextInput
        onSubmitEditing={function(){AlertIOS.alert('Pavan')}}
        style={styles.input} />
    </View>
    );
  }
})

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
  },
});

AppRegistry.registerComponent('app', () => app);
