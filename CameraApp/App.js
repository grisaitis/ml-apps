/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import RNCamera from "react-native-camera";


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      openCamera: false,
    };
  }

  takePicture() {
    try {
      this.setState({ openCamera: false, photoPath: data.path.replace("file://", "") });
      const data = this.camera.takePicture();
      console.log('Path to image: ' + data.uri);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.openCamera
          ? <RNCamera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
          >
            <View>
              <TouchableOpacity onPress={this.takePicture}>
                <Text>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </RNCamera>
          : <View>
            <Button
              title="Open the camera!"
              onPress={() => this.setState({ openCamera: true })}
            />
          </View>
          }
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
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  }
});
