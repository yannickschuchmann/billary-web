import moment from 'moment';
moment.locale('de');

const createCalendar = (year, month) => {
	var results = [];

	// find out first and last days of the month
	var firstDate = new Date(year, month, 1);
	var lastDate = new Date(year, month + 1, 0)

  // calculate first sunday and last saturday
  var firstSunday = getFirstSunday(firstDate);
  var lastSaturday = getLastSaturday(lastDate);

	// iterate days starting from first sunday
	var iterator = new Date(firstSunday);
  var i = 0;

  // ..until last saturday
  while (iterator <= lastSaturday) {
		if (i++ % 7 === 0) {
    	// start new week when sunday
    	var week = [];
			results.push(week);
		}

    // push day to week
		week.push({
    	date: new Date(iterator),
      before: iterator < firstDate, // add indicator if before current month
      after: iterator > lastDate // add indicator if after current month
    });

		// iterate to next day
		iterator.setDate(iterator.getDate() + 1);
	}

  return results;
}

function getFirstSunday (firstDate) {
	var offset = firstDate.getDay();

	var result = new Date(firstDate);
  result.setDate(firstDate.getDate() - offset);

  return result;
}

function getLastSaturday (lastDate) {
	var offset = 6 - lastDate.getDay();

  var result = new Date(lastDate);
  result.setDate(lastDate.getDate() + offset);

	return result;
}

export {moment, createCalendar}
