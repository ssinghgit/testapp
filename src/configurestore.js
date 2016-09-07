import { fromJS } from 'immutable';
import { createStore ,applyMiddleware} from 'redux';
import { Effects, loop, install } from 'redux-loop';
import AppReducer from './reducers'
import {AppActions} from './actions'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

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

const initialState = fromJS(
  {
    search: { 
        loading:false,
        films:null,
        searchText:null,        
        },
    auth:{
      username:null,
      password:null,
      isAuthorized:false,
      base64Token:null
    }
    
  }
);
export  const store = createStore(AppReducer,initialState,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
//install())
