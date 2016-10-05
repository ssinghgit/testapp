import {AppActions} from './actions'
//import Buffer from 'Buffer'
import {AsyncStorage} from 'react-native'
import Keychain from 'react-native-keychain'
//noderestapp-ssinghgit.c9users.io
const API = 'https://noderestapp-ssinghgit.c9users.io/myblackrock'
const MYBLKSERVER='www.myblackrockdummyserver.com'
const MYBLKKEY="@MYBLKKEY:key"

/*const oldfetch = fetch;
fetch = function(input, opts) {
    return new Promise((resolve, reject) => {
        setTimeout(reject, opts.deadline);
        oldfetch(input, opts).then(resolve, reject);
    });
}
*/
function getHeader(token){
  //let token=new Buffer(`${user}:${pass}` ).toString('base64')
  return {headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + token
  },deadline:10000}
}
export const AuthApi={
  
  whoami: (token)=>{ 
   let header=getHeader(token)   
   let url = `${API}/services/search/whoami`
   return fetch(url,header)
    .then(  
     response => {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
        return "Error:Invalid User or Password";  
      }
      // Examine the text in the response  
     return response.json().then(data => {  
        console.log(data);  
        return JSON.stringify(data)
      });  
    }  
  )  
  .catch( (err)=> {  
    console.log('Fetch Error :-S', err);  
    return "Error:" + err.message
  })
    
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
      