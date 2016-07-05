import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const Day = (props) => {
    let {date, index, isFloating, isSelected, rowHeight} = props;

    return (
        <View style={[styles.day, {height: rowHeight, width: rowHeight}, isFloating && styles.floating, isFloating && index === 0 && styles.first]}>
            <TouchableOpacity style={[isSelected && styles.selected]}>
                <Text>{date.date.date()}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Day;



const styles = StyleSheet.create({
    day: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    selected: {
        backgroundColor: '#559fff'
    },
    floating: {
        backgroundColor: '#FFF',
        borderTopWidth: 0.5,
        borderTopColor: '#e9e9e9'
    },
    first: {
        borderLeftWidth: 0.5,
        borderLeftColor: '#e9e9e9'
    }
});
