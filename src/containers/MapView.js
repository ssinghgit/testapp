import React from 'react';
import { requireNativeComponent } from 'react-native';

class MapView extends React.Component {
  render() {
    
    return <RCTMap2 {...this.props} />;
  }
}

MapView.propTypes = {
  pitchEnabled: React.PropTypes.bool,
};

var RCTMap2 = requireNativeComponent('RCTMap2', MapView);

module.exports = MapView;