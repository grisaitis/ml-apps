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
  TouchableOpacity,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      openCamera: false,
    };
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
      console.log(data.uri);
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
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={styles.picButton}
              >
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  preview: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
});
