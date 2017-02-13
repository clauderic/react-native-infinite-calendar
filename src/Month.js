import React, {PureComponent, PropTypes} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {getMonth} from './utils';
import format from 'date-fns/format';
import isSameMonth from 'date-fns/is_same_month';
import Day from './Day';

export default class Month extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    isScrolling: PropTypes.bool
  };
  opacity = new Animated.Value(Number(this.props.isScrolling));
  componentWillReceiveProps(nextProps) {
    if (nextProps.isScrolling !== this.props.isScrolling) {
      Animated.timing(this.opacity, {
        toValue: Number(nextProps.isScrolling)
      }).start();
    }
  }
  render() {
    const {item, rowHeight, onSelect, selectedDate} = this.props;
    let {year, month, layout} = item;
    let {rows, date} = getMonth(year, month);
    let monthRows = [];
    let day = 0;
    let row, days;
    let isSelectedMonth = isSameMonth(selectedDate, date);
    let selectedDay = isSelectedMonth ? selectedDate.getDate() : null;

    // Oh the things we do in the name of performance...
    for (let i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      let isFirstRow = Boolean(i === 0);
      let isPartialFirstRow = Boolean(isFirstRow && row.length !== 7);

      for (let k = 0, len = row.length; k < len; k++) {
        day = row[k];

        days[k] = (
          <Day
            key={day}
            index={day}
            monthDate={date}
            isFirstRow={isFirstRow}
            rowHeight={rowHeight}
            onPress={onSelect}
            isSelected={
              isSelectedMonth && selectedDay !== null && selectedDay === day
            }
          />
        );
      }

      monthRows[i] = (
        <View
          style={[
            styles.row,
            isFirstRow && styles.firstRow,
            isPartialFirstRow && styles.partialFirstRow,
            {height: rowHeight}
          ]}
          key={`Row-${i}`}
          pointerEvents="box-none"
        >
          {days}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.root,
          {top: layout.offset, height: monthRows * rowHeight}
        ]}
        pointerEvents="box-none"
      >
        <Image
          source={require('./assets/gradient.png')}
          style={[
            styles.gradient,
            {
              top: rowHeight,
              width: 7 * rowHeight,
              height: monthRows * rowHeight
            }
          ]}
          pointerEvents="none"
          shouldRasterizeIOS={true}
        />
        {monthRows}
        <Animated.View
          style={[styles.overlay, {opacity: this.opacity}]}
          pointerEvents="none"
          shouldRasterizeIOS={true}
        >
          <Text style={styles.overlayText}>{format(date, 'MMMM YYYY')}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  firstRow: {
    justifyContent: 'flex-end'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'stretch'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayText: {
    fontSize: 26
  }
});
