import {AuthApi } from './Api'
import {createReducer} from 'redux-act'
import {AppActions} from './actions'
import { Effects, loop} from 'redux-loop';
import {Actions,ActionConst} from  'react-native-router-flux';
//import Buffer from 'Buffer'
//var Buffer = require('buffer/').Buffer

export function getAuth(state) {
  return state.auth
}

export default function appReducer(state = initialState, action) {
	switch (action.type) {
       case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      }
        case 'CACHE_REQUEST':state.setIn(['search','loading'],true)
         case 'PEOPLE_SEARCH_CHANGED': console.log(action.payload)
          state.setIn(['search','searchText'],action.payload)
        case 'CACHE_REQUEST_SUCCESS':
        return state.setIn(['search','films'],action.payload)
             .setIn(['search','loading'],false)
        case 'LOGIN_REQUEST':
          let token=btoa(`${action.payload.username}:${action.payload.password}` )//.toString('base64')
          return { ...state,
                  auth:{
                    username:action.payload.username,
                    password:action.payload.password,
                    isAuthorized:false,
                    base64Token:token
                  }
                }
        /*return state.setIn(['auth','username'],action.payload.username)
                    .setIn(['auth','password'],action.payload.password)
                    .setIn(['auth','base64Token'],token)
                    .setIn(['auth','isAuthorized'],false)
        */
        case 'LOGIN_SUCCESS':
         token=btoa(`${action.payload.username}:${action.payload.password}` )       
         return { ...state,
                  auth:{
                    username:action.payload.username,
                    password:action.payload.password,
                    isAuthorized:true,
                    base64Token:token
                  }
                }
        default: return state
    }
}
  
/*export default AppReducer = 
  
  createReducer( {
  
   [AppActions.requestCache]: (state) => state.setIn(['search','loading'],true)
     ,
   [AppActions.cacheRequestSuccess]: (state,cacheData) => {
     state.setIn(['search','films'],cacheData)
   } 
  
});
*/
