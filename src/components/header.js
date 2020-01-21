import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Header extends Component {
    render() {
        <View
          style={{
            flex: 1 / 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}>
          <Text style={{ color: 'green', fontSize: 24, fontWeight: 'bold' }} > GrabMood for GrabWheels </Text>
          <Text style={{ color: 'green', fontSize: 18 }} > Be Happy and Healthy on The Wheels </Text>
        </View>
    }
}

export default Header;