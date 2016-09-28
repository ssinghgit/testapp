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
        case 'LOGIN_REQUEST':
          let token=null
          if ( action.payload.username && action.payload.username != null ) 
            token=btoa(`${action.payload.username}:${action.payload.password}` )//.toString('base64')
          return { ...state,
                  auth:{
                    username:action.payload.username,
                    password:action.payload.password,
                    isAuthorized:false,
                    base64Token:token,
                    error:null
                  }
                }
         case 'LOGIN_ERROR':          
          let newState= { ...state,auth:{
                    ...state.auth,
                    password:null,
                    isAuthorized:false,
                    base64Token:null,
                    error:action.payload
                  } }
        console.log(newState)
        return newState
        case 'LOGIN_SUCCESS':
         token=btoa(`${action.payload.username}:${action.payload.password}` )       
         return { ...state,
                  auth:{
                    username:action.payload.username,
                    password:action.payload.password,
                    isAuthorized:true,
                    base64Token:token,
                    error:null
                  }
                }
        case 'CACHE_REQUEST_SUCCESS':            
         return { ...state,
                  search:{
                 ...state.search,
                    loading:false,
                    loadMessage:"Loaded " + action.payload + " records"
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
