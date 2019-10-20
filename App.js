/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, PermissionsAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MapView from 'react-native-maps';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

type Props = {};
export default class App extends Component<Props> {
    state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      marginBottom: 1,
  };

  async componentDidMount() {
    console.log('hererere');
    await this.requestLocationPermission();

    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.watchID = navigator.geolocation.watchPosition((position) => {
    // Create the object to update this.state.mapRegion through the onRegionChange function
    console.log(position)
    let region = {
      latitude:       position.coords.latitude,
      longitude:      position.coords.longitude,
      latitudeDelta:  0.00922*1.5,
      longitudeDelta: 0.00421*1.5
    }
    this.onRegionChange(region, region.latitude, region.longitude);
  }, (error)=>console.log(error),
    {
      enableHighAccuracy: true,
      distanceFilter: 0
    }
  );

    SplashScreen.hide();
  }

  async requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      // alert("You can use the location");
    } else {
      console.log("location permission denied")
      // alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

  onRegionChange(region, lastLat, lastLong) {
  this.setState({
    mapRegion: region,
    // If there are no new values set the current ones
    lastLat: lastLat || this.state.lastLat,
    lastLong: lastLong || this.state.lastLong
  });
}

_onMapReady = () => this.setState({marginBottom: 0})

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          style={{flex: 1, marginBottom: this.state.marginBottom}}
          initialRegion={this.state.mapRegion}
          onMapReady={this._onMapReady}
          showsUserLocation={true}
          followUserLocation={false}
          showsMyLocationButton={true}
          >
          <MapView.Marker
            coordinate={{
              latitude: (this.state.lastLat) || -36.82339,
              longitude: (this.state.lastLong) || -73.03569,
            }}>
            <View>
              <Image
                source={require('./images/hat.png')}
              />
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const stylesee = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
