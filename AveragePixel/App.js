import React, {Component} from 'react';
import {NativeModules, StyleSheet, Text, View} from 'react-native';

const { RNAveragePixelLib } = NativeModules;

console.log(3);
console.log(RNAveragePixelLib);
console.log(4);
console.log(RNAveragePixelLib.addEvent("william", "orlando"));
console.log(5);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>The average pixel value of the camera is: {this.averagePixelValue}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
