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
  ActivityIndicator,
} from 'react-native'

const API = 'http://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

class App extends Component {
  constructor(props) {
//    console.log(props)
    super(props);    
  }

  componentDidMount() {        
    this.props.actions.requestCache()
  }

  _findFilm(query) {
    if (query == null || query === '') {
      return [];
    }

    let films  = this.props.search.films;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  _renderFilm(films) {
    if (films.length > 0) {
      const { title, director, opening_crawl, episode_id } = films[0];
      const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;
      return (
        <View style={styles.info}>
          <Text style={styles.titleText}>{roman}. {title}</Text>
          <Text style={styles.directorText}>({director})</Text>
      
        </View>
      );
    }

    return (
      <View style={styles.info}>
        <Text style={styles.infoText}>Enter Title of a Star Wars movie</Text>
      </View>
    );
  }
  _renderActivity() {
    if ( this.props.search.loading)
      return (
        <ActivityIndicator
          style={[styles.centering, styles.gray]}
         animating={true}
          size="large"
          color="red"
        />    
        )
  }

  render() {
    
    
    return (
      <View style={styles.container}>
        {this._renderActivity()}
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 60
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 20
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  info: {
    paddingTop: 60,
    flex: 4
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});
function mapStateToProps(state) {
  let stateProp = state? state.search :{};
  return {
    search:stateProp
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(state=>state,mapDispatchToProps)(App);