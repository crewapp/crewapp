var styles = require('./styles.js');
var React = require('react-native');

var SignUp = require('../SignUp');
var Login = require('../Login');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var SplashPage = React.createClass({
  navLogin: function() {
    this.props.navigator.push({
      title: 'Log In',
      component: Login
    });
  },
  navSignup: function() {
    this.props.navigator.push({
      title: 'Create Account',
      component: SignUp
    });
  },
  propTypes: {
    navigator: React.PropTypes.any
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.navLogin} underlayColor="#99d9f4">
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.grayButton} onPress={this.navSignup} underlayColor="#cccccc">
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = SplashPage;
