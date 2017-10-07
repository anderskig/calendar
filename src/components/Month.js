import React, { Component } from 'react';

/* Components */
import Week from './Week';
import { Map, List } from 'immutable';

/* Styling */
import './Month.css';

class Month extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.createWeekRange = this.createWeekRange.bind(this);
    this.getWeekDayNames = this.getWeekDayNames.bind(this);
  }

  createWeekRange(shownMoment) {
    const dateRange = shownMoment.range('month');
    const dateArray = Array.from(dateRange.by('day'));
    const weeks = dateArray.reduce((map, day) => {
      const weekNumber = day.week().toString();
      if (!map.has(weekNumber)) {
        return map.set(weekNumber,
          List([
            {
              'inMonth': true,
              'moment': day
            }
          ]));
      }

      return map.update(weekNumber, list => list.push({
        'inMonth': true,
        'moment': day
      }));
    }, Map());

    return weeks;
  }

  getWeekDayNames(localeData) {
    const weekDays = localeData.weekdays();
    const firstDayofWeek = localeData.firstDayOfWeek();
    if (firstDayofWeek === 0) {
      return weekDays;
    }
    const shiftedWeekDays = weekDays.map((value, index) => {
      const shifted = index + firstDayofWeek;
      if (shifted < 7) {
        return weekDays[shifted];
      }

      return weekDays[shifted - 7];
    });

    return shiftedWeekDays;
  }

  render() {
    const { today, shownMoment, onSelectDay, selectedDay, localeData } = this.props;
    const weekRange = this.createWeekRange(shownMoment);
    const weekDayNames = this.getWeekDayNames(localeData);

    return (
      <ul className="Month">
        <li>
          <ul className="weekday-names">
            <li className="weekday-name calendar-cell left-col">V.</li>
            {weekDayNames.map(
              weekDay => <li key={weekDay} className="calendar-cell weekday-name">{weekDay.toUpperCase()}</li>)
            }
          </ul>
        </li>
        { weekRange.keySeq().map(
            key => <Week
              today={today}
              selectedDay={selectedDay}
              onSelectDay={onSelectDay}
              key={key}
              weekNumber={key}
              weekDays={weekRange.get(key)} />
          )
        }
      </ul>
    );
  }
}

export default Month;
