import { takeEvery, delay} from 'redux-saga'
import {call, put,fork,select } from 'redux-saga/effects'
import {AuthApi } from './Api'
import {getAuth} from './reducers'
import {Actions} from  'react-native-router-flux';

// Our worker Saga: will perform the async increment task
export function* handleCache() {
  
  const cred =  yield call (AuthApi.getCredentials)
  if ( cred.username == null ) {
     yield put({type:'LOGIN_ERROR'})
     return;
  }   
  const cache =yield call (AuthApi.getCache, 0,cred.username,cred.password)
  //console.log(films)
  
  //yield put({ type: 'CACHE_REQUEST_SUCCESS',payload:films })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchCacheRequest() {
//
  yield* takeEvery('CACHE_REQUEST', handleCache)
}

export function* handleLogin() {
   const loginDetails = yield select(getAuth)
   
   const loginResult= yield call (AuthApi.whoami,loginDetails.base64Token)
   //console.log(JSON.parse(loginResult))      
   
   if ( loginResult != null && loginResult.indexOf('Success') !=-1) {
     const keyChainSetResult=  yield call( AuthApi.setCredentials, loginDetails.username,loginDetails.password)
     console.log(keyChainSetResult)
     //if ( keyChainSetResult =='Success' ) {
        const cacheResult = yield call( AuthApi.getCache, 0,loginDetails.base64Token);
        if ( cacheResult instanceof Array ) {
          console.log( "data size is " + cacheResult.length)
          yield put ({type:'LOGIN_SUCCESS',payload:{username:loginDetails.username ,password:loginDetails.password}})
        }
     //}   
   }

     
   
   
}

export function* watchLoginRequest() {
  yield* takeEvery('LOGIN_REQUEST', handleLogin)
}

export default function* root() {
	yield fork(watchCacheRequest)  
	yield fork(watchLoginRequest)
}