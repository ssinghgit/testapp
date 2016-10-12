import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View,requireNativeComponent,Dimensions} from "react-native";
import Button from 'apsl-react-native-button';
import { Actions } from 'react-native-router-flux';
import App from './App'

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 2,
    borderColor: 'red',
  },
});


const TabView = (props, context) => {
  this.propTypes = {
  pitchEnabled: React.PropTypes.bool,
};
  const drawer = context.drawer;
  let RCTMap2 = requireNativeComponent('RCTMap2',this)
  
  let {height, width} = Dimensions.get('window');
  return (
    <View style={styles.container}>
        <Text>
          Red one
        </Text>
    <RCTMap2 style={{width: width, justifyContent:'flex-start', height: (height),paddingTop:0}} pitchEnabled={false} />
    </View>
    );
    
  
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;