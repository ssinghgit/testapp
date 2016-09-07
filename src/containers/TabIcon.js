import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  icontype:PropTypes.string
};

const TabIcon = (props) => { 
  let colorPick = props.selected ? 'blue' : 'grey'
  return (<Icon name={props.iconType} size={20} color={colorPick} />)
  }
;

TabIcon.propTypes = propTypes;

export default TabIcon;