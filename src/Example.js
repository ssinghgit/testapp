import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {store} from './configurestore'
import App from './containers/App'
import Login from './containers/Login'
import NavigationDrawer from './containers/NavigationDrawer'
import TabView from './containers/TabView'
import TabIcon from './containers/TabIcon'

import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst
} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);
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
  


  render() {
    //console.log(store.getState())
    //Actions.tab2_2
                
   return(
     <Provider store={store}>
       <RouterWithRedux>
          <Scene key="root" hideNavBar hideTabBar  >
            
                  
            <Scene key="login" direction="vertical" hideNavBar hideTabBar>
              <Scene key="loginModal" initial hideNavBar component={Login} schema="modal" title="Login"/>
            </Scene> 
                            
            <Scene key="tabbar">
              <Scene
                key="main"
                tabs
               
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene
                  key="tab1"
                  title="People"
                  iconType="users"
                  icon={TabIcon}                  
                  titleStyle={{ color: 'white' }}
                >
                  <Scene
                    key="peopleSearch"
                    component={App}
                    hideNavBar
                    title="Search By Name"
                    onRight={() => alert('Right button')}
                    rightTitle="Right"
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
                    component={Login}                    
                    title="Search"
                    hideNavBar
                    renderRightButton={() => <Text>Right</Text>}
                  />
                  <Scene
                    key="tab2_2"
                    component={TabView}
                    title="Tab #2_2"
                    hideBackImage
                    onBack={() => alert('Left button!')}
                    backTitle="Left"
                    duration={1}
                    panHandlers={null}
                  />
                </Scene>
                  <Scene key="tab3" iconType="calendar"   navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}}
                    component={TabView} title="Meeting"  icon={TabIcon}  navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}} />
                <Scene key="tab4" iconType="life-saver" component={TabView} title="Apps"  icon={TabIcon}   navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}}/>
                <Scene key="tab5" iconType="cog"  component={TabView} title="Settings"  icon={TabIcon}  navigationBarStyle={{ backgroundColor: '#003768' }}  
                      titleStyle={{color:'white'}} />
              </Scene>
            </Scene>
         </Scene>
       </RouterWithRedux>
     
       </Provider>
   )
 }
   
}
const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};
export default AutocompleteExample;