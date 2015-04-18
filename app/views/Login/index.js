var styles = require('./styles.js');
var React = require('react-native');

var t = require('tcomb-form-native');
var Form = t.form.Form;
Form.stylesheet = require('./../bootstrap.js');
var ChatRoom = require('../ChatRoom');

var {
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} = React;

var LoginFields = t.struct({
  username: t.Str,
  password: t.Str
});

var options = {
  fields: {
    username: {
      placeholder: 'Your username',
      error: 'You have to enter your username!'
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholder: 'Enter your password',
      error: 'You have to enter your password!'
    }
  }
};

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      password: null,
      token: null,
      group: null
    };
  },
  checkValidity: function() {
    var request = new XMLHttpRequest();
    var str = 'username=' + this.state.username + '&password=' + this.state.password;

    request.onreadystatechange = (e) => {
      console.log(e);
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        var res = JSON.parse(request.responseText);

        if (res.response === 'failed') {
          if (res.status === 'user does not exist') {
            AlertIOS.alert(
              'This username does not exist'
            );
          } else if (res.status === 'invalid credentials') {
            AlertIOS.alert(
              'Your password is incorrect'
            );
          }
        } else if (res.response === 'success') {
          this.setState({password: null, token: res.token, group: res.group});
          this.navigateTo();
        }
      }
    };

    request.open('POST', 'http://trycrewapp.com/api/auth/signin');
    request.send(str);
  },
  onPress: function() {
    if(this.refs.form.getValue()){
      this.setState({
        username: this.refs.form.getValue().username,
        password: this.refs.form.getValue().password
      });
      this.checkValidity();
    }
  },
  navigateTo: function() {
    var obj = {username: this.state.username,
               token: this.state.token,
               group: this.state.group};
    this.props.navigator.push({
      title: 'Chat Room',
      component: ChatRoom,
      passProps: obj
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
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = Login;
