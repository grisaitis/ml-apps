import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
// import {RNCamera} from 'react-native-camera';


const RNAveragePixelEmitter = NativeModules.RNAveragePixelEmitter;
console.log(RNAveragePixelEmitter);
const eventEmitter = new NativeEventEmitter(RNAveragePixelEmitter);
const subscription = eventEmitter.addListener('video-progress', (data) => console.log(data));


class AveragePixel extends Component {
  constructor(props) {
      console.log("in constructor()");
      super(props);
  }
  componentWillUnmount() {
      subscription.remove();
  }
  render() {
      console.log(subscription);
      return (
          <Text>{subscription}</Text>
      )
  }
}


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>The average pixel value of the camera is: {this.averagePixelValue}</Text>
        {/* <RNCamera
          ref={ref => {this.camera = ref;}}
          style={styles.camera}
        /> */}
        <AveragePixel/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#AAA',
  },
  welcome: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
