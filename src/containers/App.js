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
} from 'react-native'

const API = 'http://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

class App extends Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount() {        
    this.props.actions.loginRequest('foo','bar');
    //this.props.actions.requestCache();
    /*fetch(`${API}/films/`).then(res => res.json()).then(json => {    
      const { results: films } = json;        
      this.setState({ films });           
    }); */
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

  render() {
    let  query  = this.props.search.searchText;
    const films = this._findFilm(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    return (
      <View style={styles.container}>
        {this._renderFilm(films)}
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          defaultValue={this.props.search.searchText}
          onChangeText={text => this.props.actions.changeSearchText(text)}
          placeholder="Search Here"
          renderItem={({ title, release_date }) => (
            <TouchableOpacity onPress={() => this.setState({ query: title })}>
              <Text style={styles.itemText}>
                {title} ({release_date.split('-')[0]})
              </Text>  
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 20
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
  let stateProp = state? state.toJS().search :{};
  return {
    search:stateProp
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(AppActions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);