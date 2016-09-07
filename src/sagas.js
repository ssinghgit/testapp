import { takeEvery, delay} from 'redux-saga'
import {call, put,fork,select } from 'redux-saga/effects'
import {AuthApi } from './Api'
import {getAuth} from './reducers'

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
   console.log(loginResult)   
   if ( loginResult.result) {
     const keyChainSetResult=  yield call( AuthApi.setCredentials, loginDetails.username,loginDetails.password)
     //console.log(keyChainSetResult)
     yield put ({type:'LOGIN_SUCCESS'})
   }
   
     
   
   
}

export function* watchLoginRequest() {
  yield* takeEvery('LOGIN_REQUEST', handleLogin)
}

export default function* root() {
	yield fork(watchCacheRequest)  
	yield fork(watchLoginRequest)
}