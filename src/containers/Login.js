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

 class Login extends Component {
  
  constructor(props) {
    super(props);        
    
    
  }

  componentWillMount() {        
    //Reusing the loginRequest action type to see if Keychain already has stored credentials
    this.props.actions.loginRequest({}) 
  }

   componentWillReceiveProps(nextProps) {      
      if (nextProps.auth.isAuthorized)
        Actions.tabbar()
   }
  

  onChange(value) {    
    this.props.auth.username=value.username
    this.props.auth.password=value.password
    if (this.props.auth.showPassword !=value.showPassword  ) {
      this.props.actions.loginShowPassword()
    }
     
  }

   onPress() {
       this.props.actions.loginRequest(this.props.auth)    
   }


  onLoginButtonPressed(loginType) {
    
  }
 

  render() {
   
       let password = {
      label: null,
      minLength:5,
      maxLength: 12,
      secureTextEntry: !this.props.auth.showPassword,
      autoCapitalize:'none',   
      hasError:this.props.auth.error != null,
      error:this.props.auth.error
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
//options.fields['password'].autoCapitalize = 'none';    
options.fields['username'] = username;
options.fields['username'].autoCapitalize = 'none';

let submitComponent = null;
 if ( this.props.auth.isAuthorizing )
      submitComponent=<Text></Text>
 else 
      submitComponent=(<Button
        style={styles.button}
        textStyle={styles.buttonText} onPress={()=>  this.onPress()  }>
        Login
      </Button> )
      
 let Form = t.form.Form;
      let Person = t.struct({
        username:t.String,              // a required string
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
          value={this.props.auth}
          onChange={(value)=>this.onChange(value) }
        />
        </View>
      {submitComponent} 
        
        
                
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
  let prop = {auth: state.auth};
  //prop.auth.showPassword=false
  return prop
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

    


export default connect(mapStateToProps ,mapDispatchToProps)(Login);