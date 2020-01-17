# GWheels-Mood-ReactN 

An implemented facial recognition on GWheels-Mood with React Native.

### Prerequisites

-   React Native development environment
-   [Node.js](https://nodejs.org/en/) 
-   [Microsoft Azure Account](https://azure.microsoft.com/en-in/free/) - set up Face API on Cognitive Services (free tier is plenty). 

## Getting Started

1.  Clone the repo:

```
git clone https://github.com/rizanw/GWheels-Mood-ReactN.git
cd GWheels-Mood-ReactN 
```

2.  Install the app dependencies:

```
npm install
```

3. Re-Link native dependencies:

```
react-native link react-native-camera 
```

4. Update `App.js` with your Cognitive Services API Key:

```
const uriBase = 'https://<My Endpoint String>.com/face/v1.0/detect';
const subscriptionKey = '<YOUR COGNITIVE SERVICES API KEY>'; 
```

## Built With
-   [React Native](http://facebook.github.io/react-native/)
-   [Microsoft Cognitive Services: Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/)
