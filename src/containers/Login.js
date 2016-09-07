import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {AppActions} from '../actions'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native'
import  Button from 'apsl-react-native-button'
const API = 'http://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

class Login extends Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount() {        
    //this.props.actions.loginRequest('foo','bar');   
  }

  

  

  render() {
    return (
      <View style={styles.container}>   
      <Button
        style={{padding:10, height:45, width:160, overflow:'hidden', borderRadius:4, backgroundColor: '#0079cd'}}
        textStyle={{fontSize: 20, color: 'white'}} onPress={()=>this.props.actions.loginRequest('foo','bar')}>
        Press me!
      </Button>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 20
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 20
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  info: {
    paddingTop: 60,
    flex: 4
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});
function mapStateToProps(state) {
  let stateProp = state? state.toJS().auth :{};
  return {
    auth:stateProp
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);