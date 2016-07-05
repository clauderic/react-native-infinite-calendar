/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Calendar from './src/Calendar';


class RCTInfiniteCalendar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Calendar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('RCTInfiniteCalendar', () => RCTInfiniteCalendar);
