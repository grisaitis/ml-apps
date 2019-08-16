/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// console.log("Hellooooo");
const { RNHelloWorldEmitter } = NativeModules;
// console.log(RNHelloWorldEmitter);
const eventEmitter = new NativeEventEmitter(RNHelloWorldEmitter);
// console.log(eventEmitter);
const onEventReceived = (event) => {
  console.log("Receiving an event in onEventReceived() (callback for the listener)");
  console.log(event);
}
const subscription = eventEmitter.addListener('hello-world', onEventReceived);
// console.log(subscription);

console.log("Asking for event");
console.log(RNHelloWorldEmitter);
console.log(RNHelloWorldEmitter.getEvent);
RNHelloWorldEmitter.getEvent();

// while(true) { RNHelloWorldEmitter.getEvent() }  // prevents app from loading!!!


// Don't forget to unsubscribe, typically in `componentWillUnmount`
// subscription.remove()


const App = () => {
  RNHelloWorldEmitter.getEvent();
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <Button
              onPress={(buttonStuff) => {console.log(buttonStuff); RNHelloWorldEmitter.getEvent()}}
              title="Get event"
              color="#841584"
              // accessibilityLabel="Learn more about this purple button"
            />
            {/* <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
