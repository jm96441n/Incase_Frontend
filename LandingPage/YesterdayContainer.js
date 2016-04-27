import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ItemContainer from '../LandingPage/ItemContainer';
import SearchContainer from './SearchContainer'

//const API_URL = 'http://boiling-refuge-94422.herokuapp.com/places/yesterday';

const API_URL = 'http://localhost:3000/places/yesterday';


class YesterdayContainer extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      yesterday: this.ds.cloneWithRows([]),
      yesterdayData: []
    };
  }

  componentDidMount() {
      this.fetchYesterdayData();
  }

  fetchYesterdayData() {
    fetch(API_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        yesterday: this.ds.cloneWithRows(responseData),
        yesterdayData: responseData
      });
    })
    .done();
  }

  pressSearch(){
    this.props.navigator.push({
      title: 'Search',
      component: <SearchContainer
      todayData={this.state.yesterdayData}
      navigator={this.props.navigator}
      />
    })
  }

  renderOne(place) {
    return (
      <ItemContainer key={place.id} place={place} />
    )
  }

  render() {
    if(this.state.yesterdayData.length == 0){
      return(
        <View style={styles.emptyContainer}>
          <Text style={styles.bold}>Nothing to see here</Text>
          <Text style={styles.normal}>Keep on exploring and build up this page!</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>


          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={this.pressSearch.bind(this)}
              onPressIn={this._onPressIn}
              onPressOut={this._onPressOut}
              style={styles.touchable}>
              <View style={styles.button}>
                <Text style={styles.welcome}> Filter Results </Text>
              </View>
            </TouchableHighlight>
          </View>
          <ListView
              enableEmptySections={true}
             dataSource={this.state.yesterday}
             renderRow={this.renderOne}
             enableEmptySections={true}
          />
        </View>
      );
    }
  }
}

  var styles = StyleSheet.create({
    emptyContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },
    normal:{
      fontSize:15,
    },
    bold:{
      fontWeight: 'bold',
      fontSize:16,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },
    welcome: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
      color: '#FFFFFF'

    },
    buttonContainer:{
      marginTop:40,
      marginBottom:15,
    },
    button: {
      backgroundColor: '#35d37c',
      height: 40,
      width: 200,
      borderRadius:10,
      justifyContent: 'center'
    },
    touchable: {
      borderRadius: 10
    },
  })


module.exports = YesterdayContainer
// style={styles.container}
// AppRegistry.registerComponent('InCaseFrontend', () => InCaseFrontend);
