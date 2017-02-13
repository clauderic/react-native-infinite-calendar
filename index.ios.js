import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import InfiniteCalendar from './src/index.js';

export default class Demo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <InfiniteCalendar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  }
});

AppRegistry.registerComponent('InfiniteCalendar', () => Demo);
