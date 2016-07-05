import moment from 'moment';
import 'moment-range';

export function getMonthsForYear(year, min, max) {
    let months;

    if (min && min.year() == year) {
        months = moment.range([min, (max && max.year() == year) ? max : moment(min).endOf('year')]);
    } else if (max && max.year() == year) {
        months = moment.range([(min && min.year() == year) ? min : moment(year, 'YYYY').startOf('year'), max]);
    } else if (year) {
        months = moment(year, 'YYYY').range('year');
    } else {
        months = moment().range('year');
    }

    return months.toArray('months');
}

export function parseDate (date) {
    if (date) {
        if (!date._isAMomentObject) date = moment(date);

        return {
            date,
            yyyymmdd: date.format('YYYYMMDD')
        }
    }
}

export function getMonth(monthDate) {
	let rows = {};
	let daysInMonth = monthDate.daysInMonth();
	let year = monthDate.year();
	let month = monthDate.month();

	let week, date, lastWeekVal;
	let weekIndex = -1;

	for (let i = 0; i < daysInMonth; i++) {
		date = moment(new Date(year,month,i+1));
		week = date.week();

		if (week !== lastWeekVal) {
			lastWeekVal = week;
			weekIndex++;
		}

		if (!rows[weekIndex]) {
			rows[weekIndex] = [];
		}

		rows[weekIndex].push({
			date,
			yyyymmdd: date.format('YYYYMMDD')
		});
	}

	return {
		date: monthDate,
		rows: Object.keys(rows).map((row) => rows[row])
	};
}
