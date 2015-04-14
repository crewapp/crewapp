var styles = require('./styles.js');
var React = require('react-native');

var SplashPage = require('./views/SplashPage');

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
          title: 'Crew App',
          component: SplashPage
        }} />
    );
  }
});


AppRegistry.registerComponent('app', () => app);

module.exports = app;
