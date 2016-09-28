import {AppActions} from './actions'
//import Buffer from 'Buffer'
import {AsyncStorage} from 'react-native'
import Keychain from 'react-native-keychain'
const API = 'https://noderestapp-ssinghgit.c9users.io/myblackrock'
const MYBLKSERVER='www.myblackrockdummyserver.com'
const MYBLKKEY="@MYBLKKEY:key"

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
  
 getCache: (maxtimestamp,token)=>{ 
   let header=getHeader(token)   
   return fetch(`${API}/api/v1/Person/basicchanges?ts=${maxtimestamp}`,header)
    .then(res => res.json() )
    .then(json => { console.log('Wow success') ;return json})
    .catch( (error)=>'Error while fetching Cache ' )
   }
,
 getCredentials: () => {  
  return Keychain.getInternetCredentials(MYBLKSERVER)    
}
,getCredFromKC: () => {
  
  return  Keychain
  .getInternetCredentials(MYBLKSERVER)
  .then(function(credentials) {
    console.log('Credentials well successfully loaded for user ' + credentials.username);
       return credentials        
  }).catch(function(error) {
      return null
  })
  
}
,setCredentials: (user,pass) => {
 return  Keychain.setInternetCredentials(MYBLKSERVER,user,pass)
  .then( () =>{
    console.log('Credentials successfully saved for user ' + user);
     return { result:'Success'};
  })
  .catch ( (error) => 
          {console.log(error) 
           return 'Error while setting Credentials ' + error;
          
                      })
}
  ,storeObject: (val)=>{
    return AsyncStorage.mergeItem(MYBLKKEY, JSON.stringify(val))
           .then ( ()=> 'success')
           .catch ( (e)=> 'error' )
  } 
  ,retrieveObject:() => {
    return AsyncStorage.getItem(MYBLKKEY)
           .then ( (val)=>JSON.parse(val))
            .catch ( (error)=>null )
  }
}
      