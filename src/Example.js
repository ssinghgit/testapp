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
  ActionConst,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#F7F7F7',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#D1EEFC',
  },
});
 class AutocompleteExample extends Component {
  

  render() {
    console.log(store.getState())
   return(
     <Provider store={store}>
       <Router>
          <Scene key="root" hideNavBar hideTabBar>
                
            <Scene key="tabbar">
              <Scene
                key="main"
                tabs
                initial
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene
                  key="tab1"
                
                  title="People"
                  iconType="users"
                  icon={TabIcon}
                  navigationBarStyle={{ backgroundColor: 'red' }}
                  titleStyle={{ color: 'white' }}
                >
                  <Scene
                    key="tab1_1"
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
                    titleStyle={{ color: 'black' }}
                  />
                </Scene>
                <Scene key="tab2" iconType="search"  title="Search" icon={TabIcon}>
                  <Scene
                    key="tab2_1"
                    component={TabView}                    
                    title="Search"
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
                  <Scene key="tab3" iconType="calendar" component={TabView} title="Meeting"  icon={TabIcon} />
                <Scene key="tab4" iconType="life-saver" component={TabView} title="Apps"  icon={TabIcon} />
                <Scene key="tab5" iconType="cog"  component={TabView} title="Settings"  icon={TabIcon} />
              </Scene>
            </Scene>
         </Scene>
       </Router>
     
       </Provider>
   )
 }
}

export default AutocompleteExample;