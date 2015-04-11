var styles = require('./styles.js');
var React = require('react-native');

var ChatRoom = require('./views/ChatRoom.js');

var {
  AppRegistry,
  NavigatorIOS,
} = React;

// App container (top of the tree)
var app = React.createClass({
  render: function(){
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor="#FF6600"
        initialRoute={{
          title: 'Chat Room',
          component: ChatRoom
        }} />
    );
  }
});


AppRegistry.registerComponent('app', () => app);

module.exports = app;
