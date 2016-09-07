import {AppActions} from './actions'
//import Buffer from 'Buffer'
import {AsyncStorage} from 'react-native'
import Keychain from 'react-native-keychain'
const API = 'https://noderestapp-ssinghgit.c9users.io/myblackrock'
const MYBLKSERVER='www.myblackrockdummyserver.com'

function getHeader(token){
  //let token=new Buffer(`${user}:${pass}` ).toString('base64')
  return {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + token
  }}
}
export const AuthApi={
  
  whoami: (token)=>{ 
   let header=getHeader(token)   
   return fetch(`${API}/services/search/whoami`,header)
    .then(res => res.text() )
    .then(json => { return json})
    .catch( (error)=>'Error while validating password ' + error )
   },
  
 getCache: (maxtimestamp,user,pass)=>{ 
   //let header= {'headers': {'Authorization': }}
   return fetch(`${API}/api/v1/Person/basicchanges?ts=${maxtimestamp}`,getHeader(user,pass))
    .then(res => res.json() )
    .then(json => { return json})
    .catch( (error)=>'Error while fetching Cache' )
   }
,
 getCredentials: () => {  
  Keychain.getInternetCredentials(MYBLKSERVER)
  .then(function(credentials) {
    console.log('Credentials successfully loaded for user ' + credentials.username);
     return { user:credentials.username,pass:credentials.password};
  })
  .catch(  error =>   {user:null}  )

  
}
,setCredentials: (user,pass) => {
   Keychain.setInternetCredentials(MYBLKSERVER,user,pass)
  .then(function(credentials) {
    console.log('Credentials successfully saved for user ' + credentials.username);
     return { user:credentials.username,pass:credentials.password};
  })
}
  
}
      