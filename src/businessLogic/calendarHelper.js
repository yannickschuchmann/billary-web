import moment from 'moment';
moment.locale('de');

const createCalendar = (year, month, timeEntriesByDay, dayOffset = 1) => {
	var results = [];

	// find out first and last days of the month
	var firstDate = new Date(year, month, 1);
	var lastDate = new Date(year, month + 1, 0)

  // calculate first sunday and last saturday
  var firstDay = getFirstDay(firstDate, dayOffset);
  var lastDay = getLastDay(lastDate, dayOffset);

	// iterate days starting from first sunday
	var iterator = new Date(firstDay);
  var i = 0;

  // ..until last saturday
  while (iterator <= lastDay) {
		if (i++ % 7 === 0) {
    	// start new week when sunday
    	var week = [];
			results.push(week);
		}

		const _moment = moment(new Date(iterator));
		const timeEntries = timeEntriesByDay[_moment.toDate().toString()] || [];
    // push day to week
		week.push({
    	moment: _moment,
			containsTimeEntries: !!timeEntries.length,
			timeEntries: timeEntries,
			today: _moment.isSame(moment(), 'day'),
      before: iterator < firstDate, // add indicator if before current month
      after: iterator > lastDate // add indicator if after current month
    });

		// iterate to next day
		iterator.setDate(iterator.getDate() + 1);
	}

  return results;
}

function getFirstDay (firstDate, dayOffset) {
	var offset = firstDate.getDay() - dayOffset;

	var result = new Date(firstDate);
  result.setDate(firstDate.getDate() - offset);

  return result;
}

function getLastDay (lastDate, dayOffset) {
	var offset = 6 - lastDate.getDay() + dayOffset;

  var result = new Date(lastDate);
  result.setDate(lastDate.getDate() + offset);

	return result;
}

const secondsToCounterString = (time) => {
	const hours   = Math.floor(time / 3600);
	const minutes = Math.floor((time - (hours * 3600)) / 60);
	const seconds = time - (hours * 3600) - (minutes * 60);

	const prefix = "0";
	const hours_s = hours < 10 ? prefix + hours : "" + hours;
	const minutes_s = minutes < 10 ? prefix + minutes : "" + minutes;
	const seconds_s = seconds < 10 ? prefix + seconds : "" + seconds;
	return `${hours_s}:${minutes_s}:${seconds_s}`;
}

export {moment, createCalendar, secondsToCounterString}
