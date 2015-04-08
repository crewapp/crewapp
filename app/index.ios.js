'use strict';

var React = require('react-native');
var MOCKED_CHAT_DATA = [
  {member: 'Richard', message: 'To the apple stdore!'},
  {member: 'Pavan', message: 'HI'},
  {member: 'Arian', message: 'To the batmobile'}
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
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(MOCKED_CHAT_DATA)
    };
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Chat author={rowData.member}>{rowData.message}</Chat>}>
      </ListView>
    );
  },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 20
  }
});

AppRegistry.registerComponent('app', () => app);
