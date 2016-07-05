import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Month from './Month';
import moment from 'moment';
import range from 'lodash/range';
import debounce from 'lodash/debounce';
import {
    getMonth,
    getMonthsForYear,
    parseDate
} from './utils';

export default class Calendar extends Component {
    static defaultProps = {
        min: {year: 1980, month: 0, day: 0},
		minDate: {year: 1980, month: 0, day: 0},
		max: {year: 2050, month: 11, day: 31},
		maxDate: {year: 2050, month: 11, day: 31},
        selectedDate: new Date(),
        showOverlay: true,
        rowHeight: 36
    };
    constructor(props) {
        super(props);

        let min = this._min = moment(props.min);
		let max = this._max = moment(props.max);
		this._minDate = moment(props.minDate);
		this._maxDate = moment(props.maxDate);
        this._today = parseDate(moment());
        this.years = range(min.year(), max.year() + 1).map((year) => getMonthsForYear(year, min, max));
		this.months = [].concat.apply([], this.years);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.months)
        };
    }
    _renderRow = (rowData, sectionID, rowID) => {
        let {disabledDates, disabledDays, locale, months, maxDate, minDate, onDaySelect, rowHeight, selectedDate, showOverlay, theme} = this.props;
        let {scrolling} = this.state;
        let {date, rows} = getMonth(rowData);

        return (
            <Month
				selectedDate={selectedDate}
				displayDate={rowData}
				disabledDates={disabledDates}
				disabledDays={disabledDays}
				maxDate={maxDate}
				minDate={minDate}
				onDaySelect={onDaySelect}
				rows={rows}
				rowHeight={rowHeight}
				showOverlay={false}
				today={this._today}
				theme={theme}
				locale={locale}
                index={rowID}
                isScrolling={scrolling}
            />
        );
    };
    _handleScroll = debounce(() => {
        this.setState({
            scrolling: !this.state.scrolling
        });
    }, 250, {leading: true})
    getDateOffset = (date) => {
		let {rowHeight} = this.props;
		let weeks = date.clone().startOf('month').diff(this._min.clone().startOf('month'), 'weeks')

		return weeks * rowHeight;
	};
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    ref={(ListView) => {this._listView = ListView}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onScroll={this._handleScroll}
                    // contentOffset={{y: this.getDateOffset(this._today.date)}}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 40
    }
});
