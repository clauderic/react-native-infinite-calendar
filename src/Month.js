import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Day from './Day';

export default class Month extends Component {
	renderRows() {
		let {disabledDates, disabledDays, displayDate, locale, maxDate, minDate, onDaySelect, rowHeight, rows, selectedDate, today, theme} = this.props;
		let currentYear = today.date.year();
		let monthShort = displayDate.format('MMM');
		let monthRows = [];
		let day = 0;
		let isDisabled = false;
		let isSelected = false;
		let isToday = false;
		let row, date, days;

		// Oh the things we do in the name of performance...
		for (let i = 0, len = rows.length; i < len; i++) {
			row = rows[i];
			days = [];

            let isFirstRow = Boolean(i === 0);
            let isPartialFirstRow = Boolean(isFirstRow && row.length !== 7);

			for (let k = 0, len = row.length; k < len; k++) {
				date = row[k];
				day++;

				isSelected = (selectedDate && date.yyyymmdd == selectedDate.yyyymmdd);
				isToday = (today && date.yyyymmdd == today.yyyymmdd);
				isDisabled = (
					minDate && date.yyyymmdd < minDate.yyyymmdd ||
					maxDate && date.yyyymmdd > maxDate.yyyymmdd ||
					disabledDays && disabledDays.length && disabledDays.indexOf(date.date.day()) !== -1 ||
					disabledDates && disabledDates.length && disabledDates.indexOf(date.yyyymmdd) !== -1
				);

				days[k] = (
					<Day
						key={`day-${day}`}
						currentYear={currentYear}
						date={date}
						day={day}
						handleDayClick={onDaySelect}
						isDisabled={isDisabled}
						isToday={isToday}
						isSelected={isSelected}
						locale={locale}
						monthShort={monthShort}
						theme={theme}
                        index={k}
                        isFloating={isPartialFirstRow}
                        rowHeight={rowHeight}
					/>
				);
			}
			monthRows[i] = (
				<View key={`Row-${i}`} style={[styles.row, {height: rowHeight}, isFirstRow && styles.firstRow, isPartialFirstRow && styles.partialFirstRow, isPartialFirstRow && {top: -rowHeight}]}>
                    {days}
				</View>
			);
		}

		return monthRows;
	}
	render() {
		let {displayDate, index, isScrolling, today, showOverlay, theme, rows, rowHeight} = this.props;

		return (
			<View style={[styles.root, {height: (rows[0].length == 7) ? rows.length * rowHeight : (rows.length - 1) * rowHeight}, index == 0 && {marginTop: rowHeight}]}>
                <Image source={require('./assets/gradient.png')} style={styles.gradient} />
				{this.renderRows()}

                {(isScrolling && showOverlay) ?
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>{`${displayDate.format('MMMM')}${(!displayDate.isSame(today.date, 'year')) ? ' ' + displayDate.year() : ''}`}</Text>
                    </View>
                : null}
			</View>
		);
	}
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        borderTopWidth: 0.5,
        borderTopColor: '#e9e9e9'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    firstRow: {
        justifyContent: 'flex-end'
    },
    partialFirstRow: {
        position: 'absolute',
        left: 0,
        right: 0
    },
    gradient: {
        position: 'absolute',
        width: 350,
        height: 300,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: 'stretch'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)'
    },
    overlayText: {
        fontSize: 18,
        fontWeight: '600'
    }
});
