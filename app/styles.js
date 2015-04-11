var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  chatBox: {
    borderBottomWidth: 1,
    // alignSelf: 'flex-start',
    position: 'relative'
  },
  formBox: {
    // alignSelf: 'flex-end',
    marginTop: 50,
    padding: 20,
    position: 'relative'
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  }
});

module.exports = styles;

