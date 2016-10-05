import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
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

const Settings = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle ]}>
      <Text>Tab {props.title}</Text>
      {props.name === 'tab1_1' &&
        <Button onPress={Actions.tab1_2}>next screen for tab1_1</Button>
      }
      {props.name === 'tab2_1' &&
        <Button onPress={Actions.tab2_2}>Profile View </Button>
      }
      <Button onPress={Actions.pop}>Settings page Back</Button>
  
    </View>
  );
};

Settings.contextTypes = contextTypes;
Settings.propTypes = propTypes;

export default Settings;