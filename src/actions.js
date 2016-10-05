import {createAction} from 'redux-act'
export  const AppActions = {
   requestCache:createAction('CACHE_REQUEST'),
   cacheRequestSuccess:createAction('CACHE_REQUEST_SUCCESS'),
   cahceRequestFailed:createAction('CACHE_REQUEST_FAILED'),
   throwAwayAction:createAction('NO_OP'),
   changeSearchText:createAction('PEOPLE_SEARCH_CHANGED'),
   loginError:createAction('LOGIN_ERROR'),
   loginRequest:createAction('LOGIN_REQUEST' )  , 
   loginShowPassword:createAction('LOGIN_SHOWPASS')
};