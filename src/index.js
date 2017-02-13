import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import FlatList from 'react-native/Libraries/Experimental/FlatList';
import Month from './Month';
import Header from './Header';

import {getWeeksInMonth} from './utils';
import differenceInWeeks from 'date-fns/difference_in_weeks';
import differenceInMonths from 'date-fns/difference_in_months';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import parse from 'date-fns/parse';
import startOfMonth from 'date-fns/start_of_month';
import startOfDay from 'date-fns/start_of_day';

export default class Calendar extends Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    selectedDate: PropTypes.instanceOf(Date),
    rowHeight: PropTypes.number,
    displayOptions: PropTypes.object
  };
  static defaultProps = {
    min: new Date(1980, 0, 1),
    minDate: new Date(1980, 0, 1),
    max: new Date(2050, 11, 31),
    maxDate: new Date(2050, 11, 31),
    selectedDate: new Date(),
    rowHeight: 50,
    displayOptions: {
      showOverlay: true
    }
  };
  constructor(props) {
    super(props);

    this.updateYears(props);

    this.state = {
      isScrolling: false,
      selectedDate: this.parseSelectedDate(props.selectedDate)
    };
  }
  updateYears(props = this.props) {
    this._min = parse(props.min);
    this._max = parse(props.max);
    this._minDate = parse(props.minDate);
    this._maxDate = parse(props.maxDate);

    let min = this._min.getFullYear();
    let max = this._max.getFullYear();

    const months = [];
    let i = 0;
    let previousOffset = 0;

    for (let year = min; year <= max; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        const height = getWeeksInMonth(month, year) * props.rowHeight;

        const layout = {
          length: height,
          offset: previousOffset,
          index: i
        };
        previousOffset += height;

        months.push({year, month, date, layout});
        i++;
      }
    }

    this.months = months;
  }
  parseSelectedDate(selectedDate) {
    if (selectedDate) {
      selectedDate = parse(selectedDate);

      // Selected Date should not be before min date or after max date
      if (isBefore(selectedDate, this._minDate)) {
        return this._minDate;
      } else if (isAfter(selectedDate, this._maxDate)) {
        return this._maxDate;
      }
    }

    return startOfDay(new Date(selectedDate));
  }
  getDateOffset = (date) => {
    const {rowHeight} = this.props;
    const weeks = Math.abs(differenceInWeeks(
      startOfMonth(date),
      startOfMonth(this._min)
    ));

    return weeks * rowHeight;
  };
  getDateIndex(date) {
    return Math.abs(differenceInMonths(
      startOfMonth(date),
      startOfMonth(this._min)
    ))
  }
  getItemLayout = (items, index) => {
    const {layout} = items[index];

    return layout;
  };
  handleScroll = () => {
    if (!this.state.isScrolling) {
      this.setState({
        isScrolling: true
      });
    }
  }
  handleScrollEnd = () => {
    this.setState({
      isScrolling: false
    });
  }
  handleSelect = (selectedDate) => {
    this.setState({selectedDate});
  }
  _getComponent = (item, index) => {
    const {rowHeight} = this.props;
    const {isScrolling, selectedDate} = this.state;

    return (
      <Month
        item={item}
        index={index}
        rowHeight={rowHeight}
        onSelect={this.handleSelect}
        isScrolling={isScrolling}
        selectedDate={selectedDate}
      />
    );
  };
  render() {
    const {rowHeight} = this.props;
    const {isScrolling, selectedDate} = this.state;

    return (
      <View style={styles.root}>
        <Header selectedDate={selectedDate} />
        <FlatList
          ref={instance => {
            this._list = instance;
          }}
          contentContainerStyle={{width: 7 * rowHeight}}
          data={this.months}
          ItemComponent={this._getComponent}
          getItemLayout={this.getItemLayout}
          shouldItemUpdate={({parentProps}, {parentProps: nextParentProps}) => (
            parentProps.isScrolling !== nextParentProps.isScrolling ||
            parentProps.selectedDate !== nextParentProps.selectedDate
          )}
          keyExtractor={({year, month}) => `${year}:${month}`}
          initialNumToRender={3}
          windowSize={3}
          onEndReachedThreshold={1}
          onScroll={this.handleScroll}
          onMomentumScrollEnd={this.handleScrollEnd}
          isScrolling={isScrolling}
          canCancelContentTouches={true}
          selectedDate={+selectedDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 45,
    marginHorizontal: 0,
    backgroundColor: '#FFF'
  }
});
