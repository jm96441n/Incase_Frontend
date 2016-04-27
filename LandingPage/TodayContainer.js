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

import PlaceContainer from '../PlacePage/PlaceContainer';
import ItemContainer from '../LandingPage/ItemContainer';
import SearchContainer from './SearchContainer';

//var RefreshableListView = require('react-native-refreshable-listview');


const API_URL = 'http://localhost:3000/places/today';
//'http://localhost:3000/places/today';
// 'http://boiling-refuge-94422.herokuapp.com/places/today'



class TodayContainer extends Component {
  setNativeProps (nativeProps) {
    this._root.setNativeProps(nativeProps);
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      today: this.ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.fetchTodayData();
  }


  fetchTodayData() {
    fetch(API_URL)
    .then((response) => response.json())
    .then((responseData) => {
      // console.log('responseData', responseData);
      this.setState({
        todayData: responseData,
        today: this.ds.cloneWithRows(responseData)
      });
    })
    .done();
  }

  reloadContainer() {
    // returns a Promise of reload completion
    // for a Promise-free version see ControlledRefreshableListView below
     this.fetchTodayData()
  }

  pressSearch(){
    console.log(this.state.todayData)
    this.props.navigator.push({
      title: 'Search',
      component: <SearchContainer
      todayData={this.state.todayData}
      navigator={this.props.navigator}
      />
    })
  }

//
  pressItem(id, place) {
      this.props.navigator.push({
        title: 'Today List',
        component: <PlaceContainer
        place={place}
          />
      })
  }

  renderOne(place) {
    return(
      <View >
      <TouchableHighlight onPress={this.pressItem.bind(this, place.id, place)}>
        <ItemContainer style={styles.button} key={place.id} place={place}/>
      </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this.pressSearch.bind(this)}
            style={styles.touchable}>
            <View style={styles.button}>
              <Text style={styles.welcome}> Filter Results </Text>
            </View>
          </TouchableHighlight>
        </View>
        <ListView
           dataSource={this.state.today}
           renderRow={this.renderOne.bind(this)}
        />
      </View>

    );
  }
}
// {/*loadData={this.reloadContainer}*/}
// {/*minDisplayTime={4}*/}

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },

    filterText: {
      fontWeight:'bold',
      color:'#fff',
      textAlign:'left',
      fontSize:20,
      marginBottom:10,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      textAlign: 'center',
    },

    button: {
      paddingTop: 2,
      marginTop: 10,
      borderRadius: 5,
      alignItems: "center",
      alignSelf: "center",
      width: 120,
      height: 20,
      backgroundColor: "#35d37c",
    }
  })



module.exports = TodayContainer
// style={styles.container}
// AppRegistry.registerComponent('InCaseFrontend', () => InCaseFrontend);
