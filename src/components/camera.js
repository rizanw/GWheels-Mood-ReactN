import React, { Component } from 'react';
import { Camera } from 'expo-camera';

class CameraComp extends Component {
    constructor() {
        const { status } = await Camera.requestPermissionsAsync();
        console.log(status);
    }

    render() {
        <Camera
            ref={ref => {
                this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}>
        </Camera>
    }
}

export default CameraComp;