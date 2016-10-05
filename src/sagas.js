import { takeEvery, delay} from 'redux-saga'
import {call, put,fork,select } from 'redux-saga/effects'
import {AuthApi } from './Api'
import {getAuth} from './reducers'
import {Actions} from  'react-native-router-flux';

// Our worker Saga: will perform the async increment task
export function* handleCache() {
  let cacheMetdata = yield call (AuthApi.retrieveObject)
  console.log(cacheMetdata)
  let loginDetails = yield select(getAuth)  
  const cache =yield call (AuthApi.getCache, 0,loginDetails.base64Token)
  let cachMetaData={rows:cache.length,ts:new Date().getTime()}
  let result = yield call ( AuthApi.storeObject, cachMetaData)
  console.log(result)
  yield put({ type: 'CACHE_REQUEST_SUCCESS',payload:cache.length })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchCacheRequest() {
//
  yield* takeEvery('CACHE_REQUEST', handleCache)
}

export function* handleLogin() {
   let loginDetails = yield select(getAuth)
   let loginResult= null
   if ( loginDetails.base64Token != null ) {
     try { 
      loginResult= yield call (AuthApi.whoami,loginDetails.base64Token)
       console.log(loginResult)   
      if ( loginResult != null && loginResult.indexOf('Success') !=-1) {
          const keyChainSetResult=  yield call( AuthApi.setCredentials, loginDetails.username,loginDetails.password)          
          if ( keyChainSetResult.result =='Success')
            yield put ({type:'LOGIN_SUCCESS',payload:{username:loginDetails.username ,password:loginDetails.password}})     
      }else {
        let err=loginResult.replace("Error:")
        yield put ({type:'LOGIN_ERROR',payload: err})
        return
      }
     }catch (error ) {
       yield put ({type:'LOGIN_ERROR',payload:'Invalid user ID or password'})
       return
     }
   }else {
     loginDetails  = yield call ( AuthApi.getCredFromKC)
     if ( loginDetails != null)
      yield put ({type:'LOGIN_SUCCESS',payload:{username:loginDetails.username ,password:loginDetails.password}})     
   }
   
  

     
   
   
}

export function* watchLoginRequest() {
  yield* takeEvery('LOGIN_REQUEST', handleLogin)
}

export default function* root() {
	yield fork(watchCacheRequest)  
	yield fork(watchLoginRequest)
}