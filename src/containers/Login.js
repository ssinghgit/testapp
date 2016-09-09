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
import {Actions} from  'react-native-router-flux';
import  Button from 'apsl-react-native-button'
import t from 'tcomb-form-native';

const API = 'http://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default class Login extends Component {
  state={value: {
        user: 'foo',
        password: 'foobar',
        showPassword:true
      }};
  constructor(props) {
    super(props);        
  }

  componentDidMount() {        
    //this.props.actions.loginRequest('foo','bar');   
     //Actions.tab2_2
  }

  

  onChange(value) {
    console.log(value)
    this.setState(value);
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }

  onLoginButtonPressed(loginType) {
    
  }
 

  render() {
   // if ( this.props.auth && !this.props.auth.isAuthorized ) 
    //  Actions.tab2_2
    //onPress={Actions.tab2_2({auth:{username:'foo',password:'bar'}})}
       let password = {
      label: null,
      minLength:5,
      maxLength: 12,
      secureTextEntry: !this.state.value.showPassword,
      hasError:this.state.value.password !=null && this.state.value.password.length>=1 &&  this.state.value.password.length<5,
      error:'Password should be minimum 5 characters'
}
       let username = {
      label: null,
      maxLength: 12
       }
let options = {
      auto: 'placeholders',
      fields: {
        
      }
    };
options.fields['password'] = password;
options.fields['user'] = username;
options.fields['user'].autoCapitalize = 'none';
 
 let Form = t.form.Form;
      let Person = t.struct({
        user:t.String,              // a required string
        password: t.String
       ,showPassword: t.Boolean        // a boolean              
      });
    return (
     
      <Image style={styles.backgroundImage} source={require('../../images/blknyc.jpg')}>
      <View style={styles.container}>   
         <View style={styles.inputs}>
        <Form
          ref="form"
          type={Person}
          options={options}
          value={this.state.value}
          onChange={(value)=>this.setState({value}) }
        />
        </View>
      <Button
        style={styles.button}
        textStyle={styles.buttonText} onPress={()=>Actions.tabbar({authLoginPage:{username:this.state.value.user, password:this.state.value.password}})} >
        Login Cloud9 Fake API
      </Button>   
        
        
                
      </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
      width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'transparent',
  },  
  openingText: {
    textAlign: 'center'
  },
  inputs: {
    marginTop: 10,
    width:340,
    marginBottom: 10,
    marginLeft: 30,
    padding:20,
    marginRight: 30,
    backgroundColor: 'white'
  },  buttonText: {
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
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

    


//export default connect(mapStateToProps ,mapDispatchToProps)(Login);