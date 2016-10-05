import { fromJS } from 'immutable';
import { createStore ,applyMiddleware} from 'redux';
import AppReducer from './reducers'
import {AppActions} from './actions'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import {AuthApi } from './Api'
import Keychain from 'react-native-keychain'

const sagaMiddleware = createSagaMiddleware()

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString();
  };
}

const initialState = 
  { scene:{}
    ,search: { 
        loading:true,
        films:null,
        searchText:null,  
        loadMessage:null,
        realtime:false
        },
    auth:{
      username:'foo',
      password:'foobar',
      isAuthorized:false,                                                                                          
      base64Token:null,
      error:null,
      showPassword:true,
      isAuthorizing:false
    }
    
  }
;
let storeStatus = false
async function getCred() {
  return Keychain.getInternetCredentials(MYBLKSERVER) 
  .then(function(credentials) {
    return credentials
  })
}

export  function getPlainStore() { 
  storeStatus=true
  let store=startStore();
  return store
  }
export  function getStore(oncomplete) { 
  let store=null
  //let credentials = await getCred()
   /*initialState.auth = { username:credentials.username,
                          password:credentials.password,isAuthorized:true,
                        base64Token:btoa(credentials.username+":"+credentials.password)}
   */
   //return startStore()
  
AuthApi.getCredentials()
  .then(function(credentials) {
    console.log('Credentials successfully loaded for user ' + credentials.username);
     initialState.auth = { username:credentials.username,
                          password:credentials.password,isAuthorized:false,
                        base64Token:btoa(credentials.username+":"+credentials.password)}
     storeStatus= true
     let store = startStore()
      oncomplete(store)                
  })
  .catch(  error =>   {storeStatus= true
   let store = startStore()
      oncomplete(store) 
                      }  )
  
  //return startStore()      
  
}

 function startStore(){
   if ( ! storeStatus) 
      return null
   store = createStore(AppReducer,initialState,applyMiddleware(sagaMiddleware))
   sagaMiddleware.run(rootSaga)
   return store
}//install())
