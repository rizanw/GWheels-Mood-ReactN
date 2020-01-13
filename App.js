import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const URLAPI = "";
const key = "";

const base_instance_options = {
  baseURL: "https://lala/face/v1.0",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-key': key,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default class GWheelsMood extends Component {
  state = {isSnapped: false};

  render() {
    const buttonSnap = 
      <TouchableOpacity onPress={this.handleImage} style={styles.capture}>
        <Text style={{ fontSize: 14 }}> SNAP </Text>
      </TouchableOpacity>;
    const buttonRetake = 
      <TouchableOpacity onPress={this.handleImage} style={styles.capture}>
        <Text style={{ fontSize: 14 }}> RETAKE </Text>
      </TouchableOpacity>;

    return (
      <View style={styles.container}>
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
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          {this.state.isSnapped ? buttonRetake:buttonSnap}
        </View>
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  handleImage = async event => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: this.camera,
        })
      }

      const resp = await fetch('$(URLAPI)/detect', fetchOptions)
        const mood = await resp.json()
        console.log(mood.data)
        setData(mood.data)

    } catch (err) {
      console.error(err)
    }
  };
}
