import React, {Component} from 'react';
import {NativeModules, StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const { RNAveragePixelLib } = NativeModules;

console.log(3);
console.log(RNAveragePixelLib);
console.log(4);
console.log(RNAveragePixelLib.addEvent("william", "orlando"));
console.log(5);

export default class App extends Component {
  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    
    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
      >
        <View style={StyleSheet.absoluteFill}>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 0.5,
            height: 72,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> FLIP </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
              <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
              <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ bottom: 0 }}>
          <View
            style={{
              height: 20,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <Slider
              style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
              onValueChange={this.setFocusDepth.bind(this)}
              step={0.1}
              disabled={this.state.autoFocus === 'on'}
            />
          </View>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={[
                styles.flipButton,
                {
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  backgroundColor: this.state.isRecording ? 'white' : 'darkred',
                },
              ]}
              onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}
            >
              {this.state.isRecording ? (
                <Text style={styles.flipText}> ☕ </Text>
              ) : (
                <Text style={styles.flipText}> REC </Text>
              )}
            </TouchableOpacity>
          </View>
          {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomIn.bind(this)}
            >
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomOut.bind(this)}
            >
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
              onPress={this.toggleFocus.bind(this)}
            >
              <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!!canDetectFaces && this.renderFaces()}
        {!!canDetectFaces && this.renderLandmarks()}
        {!!canDetectText && this.renderTextBlocks()}
        {!!canDetectBarcode && this.renderBarcodes()}
      </RNCamera>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text>The average pixel value of the camera is: {this.averagePixelValue}</Text>
        {this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
