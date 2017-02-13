import React, {PropTypes, PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import format from 'date-fns/format';

export default class Day extends PureComponent {
  static propTypes = {
    day: PropTypes.number,
    rowHeight: PropTypes.number,
    monthDate: PropTypes.instanceOf(Date),
    index: PropTypes.number,
    isFirstRow: PropTypes.bool,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func
  };
  handlePress = () => {
    const {index, onPress, monthDate} = this.props;

    onPress(new Date(monthDate.setDate(index)));
  };
  render() {
    const {monthDate, index, isFirstRow, isSelected, rowHeight} = this.props;
    let isFirstDay = index === 1;
    let text = (
      <Text
        style={[
          styles.day,
          {width: rowHeight, lineHeight: rowHeight},
          isFirstRow && styles.firstRow,
          isFirstDay && styles.first,
          isSelected && styles.selectedText
        ]}
        onPress={this.handlePress}
        suppressHighlighting={true}
      >
        {isFirstDay
          ? <Text>
              <Text style={styles.small}>{format(monthDate, 'MMM')}</Text>
              {`\n${index}`}
            </Text>
          : index
        }
      </Text>
    );

    return !isSelected
      ? text
      : <View style={isFirstRow && styles.firstRow}>
          <View style={[styles.selected, {borderRadius: rowHeight}]}>
            {text}
          </View>
        </View>;
  }
}

const styles = StyleSheet.create({
  day: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: '300',
    color: '#333'
  },
  first: {
    lineHeight: 18
  },
  small: {
    fontSize: 12
  },
  firstRow: {
    backgroundColor: '#FFF'
  },
  selected: {
    backgroundColor: '#559fff',
    flex: 1
  },
  selectedText: {
    color: '#FFF',
    backgroundColor: 'transparent',
    fontWeight: '500'
  }
});
