var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  formBox: {
    flex: 1
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
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
    flex: 3
  },
  horizontalScrollView: {
    height: 120,
  }
});

module.exports = styles;
