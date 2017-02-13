import getDaysInMonth from 'date-fns/get_days_in_month';
import getDay from 'date-fns/get_day';

export function getMonth(year, month, weekStartsOn = 0) {
  let rows = [];
  let monthDate = new Date(year, month, 1);
  let daysInMonth = getDaysInMonth(monthDate);
  let dow = getDay(new Date(year, month, 1));
  let weekEndsOn = weekStartsOn === 1 ? 0 : 6; // TODO: Change this 😅

  let week = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    if (!rows[week]) {
      rows[week] = [];
    }

    rows[week].push(day);

    if (dow === weekEndsOn) {
      week++;
    }

    dow = dow < 6 ? dow + 1 : 0;
  }

  return {
    date: monthDate,
    rows
  };
}

function getWeek(year, date, weekStartsOn) {
  var yearStart = new Date(year, 0, 1); // 1st Jan of the Year

  return Math.ceil(
    ((date - yearStart) / 86400000 + yearStart.getDay() + 1 - weekStartsOn) / 7
  );
}

export function getWeeksInMonth(
  month,
  year = new Date().getFullYear(),
  weekStartsOn = 0
) {
  let weekEndsOn = weekStartsOn === 1 ? 0 : 6; // TODO: Change this 😅

  var first_day_of_month = new Date(year, month, 1);
  var first_week_number = getWeek(year, first_day_of_month, weekStartsOn);

  var last_day_of_month = new Date(year, month + 1, 0); // Last date of the Month
  var last_week_number = getWeek(year, last_day_of_month, weekStartsOn);

  let rowCount = last_week_number - first_week_number;

  // If the last week contains 7 days, we need to add an extra row
  if (last_day_of_month.getDay() === weekEndsOn) {
    rowCount++;
  }

  return rowCount;
}
