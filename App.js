import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const uriBase = 'https://<My Endpoint String>.com/face/v1.0/detect';
const subscriptionKey = '<Subscription Key>';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: undefined,
    height: undefined,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default class GWheelsMood extends Component {
  state = {
    isSnapped: false,
    snappedPict: undefined,
    emotion: null,
    faceHeight: null,
    faceWidth: null,
    faceTop: null,
    faceLeft: null,
  };

  render() {
    const buttonSnap = (
      <TouchableOpacity
        onPress={this.takePicture.bind(this)}
        style={styles.capture}>
        <Text style={{ fontSize: 14, color: 'white' }}> SNAP </Text>
      </TouchableOpacity>
    );
    const buttonRetake = (
      <TouchableOpacity
        onPress={this.retakePicture.bind(this)}
        style={styles.capture}>
        <Text style={{ fontSize: 14, color: 'white' }}> RETAKE </Text>
      </TouchableOpacity>
    );

    const imageSnapped = (
      <Image
        style={styles.image}
        source={this.state.snappedPict}
        resizeMode="stretch"
      />
    );

    const cameraCompt = (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    );

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1/5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}>
            <Text style={{color: 'green', fontSize: 24, fontWeight: 'bold'}} > GWheels Mood </Text>
            <Text style={{color: 'green', fontSize: 18}} > Be Happy and Healthy on The Wheels </Text>
        </View>
        {this.state.isSnapped ? imageSnapped : cameraCompt}
        <View style={{ position: 'absolute', top: this.state.faceTop + this.state.faceHeight, left: this.state.faceLeft, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color: "yellow"}}>{this.state.emotion}</Text>
        </View>
        <View style={{
          height: this.state.faceHeight,
          width: this.state.faceWidth,
          top: this.state.faceTop,
          left: this.state.faceLeft,
          position: 'absolute',
          zIndex: 99,
          borderColor: 'green',
          borderWidth: 2,
        }}></View>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          {this.state.isSnapped ? buttonRetake : buttonSnap}
        </View>
      </View>
    );
  }

  retakePicture = async () => {
    this.setState({
      isSnapped: false,
      emotion: null,
      faceHeight: null,
      faceWidth: null,
      faceTop: null,
      faceLeft: null,
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: false };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
      this.setState({
        isSnapped: true,
        snappedPict: data,
      });
      this.postData(uriBase + '?returnFaceAttributes=emotion', data)
        .then(
          res => {
            console.log(res[0].faceAttributes.emotion);
            this.setState({
              emotion:
                "contempt: " + res[0].faceAttributes.emotion.contempt + "\t\t" +
                "anger: " + res[0].faceAttributes.emotion.anger + "\n" +
                "disgust: " + res[0].faceAttributes.emotion.disgust + "\t\t\t" +
                "fear: " + res[0].faceAttributes.emotion.fear + "\n" +
                "happiness: " + res[0].faceAttributes.emotion.happiness + "\t\t" +
                "neutral: " + res[0].faceAttributes.emotion.neutral + "\n" +
                "sadness: " + res[0].faceAttributes.emotion.sadness + "\t\t" +
                "surprise: " + res[0].faceAttributes.emotion.surprise + "\n",
              faceHeight: res[0].faceRectangle.height / 4,
              faceWidth: res[0].faceRectangle.width / 4,
              faceTop: res[0].faceRectangle.top / 6,
              faceLeft: res[0].faceRectangle.left / 8,
            });
          },
        );
    }
  };

  postData = async (url = '', data = null) => {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/octet-stream',
      },
      body: data,
    });
    console.log(response);
    return await response.json();
  };
}
