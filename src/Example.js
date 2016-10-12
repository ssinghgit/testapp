import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
  ,requireNativeComponent
} from 'react-native';
import {getStore,getPlainStore} from './configurestore'
import App from './containers/App'
import Login from './containers/Login'
import NavigationDrawer from './containers/NavigationDrawer'
import TabView from './containers/TabView'
import TabIcon from './containers/TabIcon'
import Settings from './containers/Settings'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst
} from 'react-native-router-flux';
import MapView from './containers/MapView'
const RouterWithRedux = (Router);
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#003768',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#003768',
  },
});
class AutocompleteExample extends Component {
 constructor() {
    super();
    
  }

  onPress() {
    //console.log(Actions)
     Actions.ProfileView();
  }
  render() {
    //if (this.state.isLoading) {
      //return null;
    //
    //console.log(store.getState())
    //Actions.tab2_2
    /*
    this.state= {
      isLoading: true,
      store: null
    }
    getStore(
        (store1) => {          
          this.state.store=store1
          this.state.isLoading=false
         //this.setState({isLoading: false,store:store1})
         }
      )       
      */
    let plainStore=getPlainStore();
    //let mapComponent= <MapView pitchEnabled={false} />
   return(
     
     <Provider store={plainStore}>
       <RouterWithRedux>
          <Scene key="root" hideNavBar hideTabBar  >                              
            <Scene key="login" direction="vertical" hideNavBar hideTabBar>
              <Scene key="loginModal"  hideNavBar component={Login} schema="modal" title="Login"/>
            </Scene> 
                            
            <Scene key="tabbar" >
              <Scene
                key="main"
                tabs               
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                  <Scene key="tab3" iconType="calendar"  initial navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}}
                    component={TabView} title="Meeting"  icon={TabIcon}  navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}} />
                <Scene
                  key="tab1"
                  title="People"
                  iconType="home"
                  icon={TabIcon}                  
                  titleStyle={{ color: 'white' }}
                >
                  <Scene
                    key="peopleSearch"
                    component={App}                    
                    title="Home"
                    //onRight={() => this.onPress()}                    
                    navigationBarStyle={{ backgroundColor: '#003768' }}  
                    rightTitle="Search"
                    renderRightButton={() => (<TouchableOpacity onPress={this.onPress}>
                          <Icon name="search" size={20} color="white" />
                        </TouchableOpacity>)
                     }
                  />
                  <Scene
                    key="ProfileView"
                    component={TabView}
                    title="Profile"                    
                  />
                </Scene>
                <Scene key="tab2" iconType="search"  title="Search" icon={TabIcon}>
                  <Scene
                    key="tab2_1"
                    component={TabView}                    
                    title="Search"
                    type={ActionConst.REPLACE}
                    navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}}
                    backTitle="Back"
                    renderRightButton={() => <Text>Right</Text>}
                  />
                  <Scene
                    key="tab2_2"
                    component={TabView}
                    title="Tab #2_2"                    
                    onBack={() => alert('Left button!')}
                    
                    duration={1}
                    panHandlers={null}
                  />
                </Scene>
                
                <Scene key="tab4" iconType="life-saver" component={TabView} title="Apps"  icon={TabIcon}   navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}}/>
                <Scene key="tab5" iconType="cog"  component={Settings} title="Settings"  icon={TabIcon}  navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}} />
              </Scene>
            </Scene>
         </Scene>
       </RouterWithRedux>
     
       </Provider>
   )
 }
   
}

export default AutocompleteExample;