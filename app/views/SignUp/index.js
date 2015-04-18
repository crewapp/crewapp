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
      placeholder: 'Choose a username',
      error: 'You have to enter a username!'
    },
    password: {
      password: true,
      secureTextEntry: true,
      placeholder: 'Choose a password',
      error: 'You have to enter your password!'
    }
  }
};

var SignUp = React.createClass({
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
        console.log(typeof request.responseText);

        console.log('res', res.status);
        if (res.status === 'user exists') {
          AlertIOS.alert(
            'This username is already taken'
          );
        } else if (res.status === 'credentials not supplied'){
          AlertIOS.alert('Nothing was provided!');
        } else {
          this.setState({password: null, token: res.token, group: res.group});
          this.navigateTo();
        }

      } else {
        AlertIOS.alert('Sorry, an error has occured');
      }
    };

    request.open('POST', 'http://trycrewapp.com/api/auth/signup');
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
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

module.exports = SignUp;
