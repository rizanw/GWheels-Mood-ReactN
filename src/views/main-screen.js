import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Header from 'components/header';
import AzureFaceAPI from 'services/azure-face-api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: undefined,
        height: undefined,
    },
});

class MainScreen extends Component {
    state = {
        isSnapped: false,
        snappedPict: undefined,
        emotion: null,
        faceHeight: null,
        faceWidth: null,
        faceTop: null,
        faceLeft: null,
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
            AzureFaceAPI.postData(data)
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

        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <View style={{ flex: 1 }}>
                    {this.state.isSnapped ? imageSnapped : cameraCompt}
                </View>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    {this.state.isSnapped ? buttonRetake : buttonSnap}
                </View>
            </SafeAreaView>
        );
    }
}

export default MainScreen;