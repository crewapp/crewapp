var styles = require('./styles.js');
var React = require('react-native');

var t = require('tcomb-form-native');
var Form = t.form.Form;

var ChatRoom = require('../ChatRoom');

var {
  Text,
  View,
  TouchableHighlight
} = React;

var LoginFields = t.struct({
  username: t.Str,
  password: t.Str
});

var options = {
  fields: {
    username: {
      placeholder: 'Your username',
      error: 'You have to enter a username!'
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholder: 'Enter your password',
      error: 'You have to enter your password!'
    }
  }
};

var SignUp = React.createClass({
  onPress: function() {
    this.props.navigator.push({
      title: 'Chat Room',
      component: ChatRoom
    });
  },
  propTypes: {
    navigator: React.PropTypes.any
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.formBox}>
          <Form
            ref="form"
            type={LoginFields}
            options={options} />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SignUp;
