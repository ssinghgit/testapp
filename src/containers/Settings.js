import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {AppActions} from '../actions'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView
} from 'react-native'
import {Actions} from  'react-native-router-flux';
import  Button from 'apsl-react-native-button'
import t from 'tcomb-form-native';
import Row from '../components/Row'
import SectionHeader from '../components/SectionHeader'


const API = 'http://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

 class Settings extends Component {
  
  constructor(props) {
    super(props);        
    
    
  }
  render() {
   
   
     const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });
    
    let dataBlob = {};
    //let sectionIds = [1,2,3,4]
    
    let sectionIds = ["Corporate Security","Employee support hotline", "iSOS","Other Contact Information"];
    let rowIds = [];
    let arr= [ {type:"Corporate Security",img: 'Policeman.png', label:'Dial 4444'}, {type:"iSOS",img:'',label:'row 2'}]
    arr.forEach(elem =>{
      if ( !dataBlob[elem.type])
       {
          dataBlob[elem.type]=[];
      }
      dataBlob[elem.type].push(elem)
    })
    let  dataSource= ds.cloneWithRows(dataBlob)
   
       
    return (
      
     
      <View style={styles.container}>   
       <ListView
        style={styles.container}
        dataSource={dataSource}
        renderRow={(data) => <Row {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderSectionHeader={(sectionData,sectionId) => <SectionHeader {...sectionData} />}
      />
        
                
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
      width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    marginTop: 40,
    padding: 10,
    backgroundColor: 'white',
  },  
  openingText: {
    textAlign: 'center'
  },
 
 separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
function mapStateToProps(state) {
  let prop = {auth: state.auth};
  //prop.auth.showPassword=false
  return prop
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

    


export default Settings