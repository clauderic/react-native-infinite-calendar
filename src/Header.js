import React, {PropTypes, PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import format from 'date-fns/format';

export default class Header extends PureComponent {
  static propTypes = {
    selectedDate: PropTypes.instanceOf(Date)
  };
  render() {
    const {selectedDate} = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.wrapper}>
          <Text style={styles.year}>{selectedDate.getFullYear()}</Text>
          <Text style={styles.date}>{format(selectedDate, 'ddd, MMM Do')}</Text>
        </View>
        <View style={styles.weekdays}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(weekday => (
            <Text key={weekday} style={styles.weekday}>{weekday}</Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#448aff',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  wrapper: {
    padding: 15
  },
  year: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  date: {
    color: '#FFF',
    fontSize: 30
  },
  weekdays: {
    flexDirection: 'row',
    backgroundColor: '#559fff'
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    lineHeight: 40,
    fontWeight: '600'
  }
});
