import React, { Component } from 'react';

import Day from './Day';

import { List } from 'immutable';

/* Styling */
import './Week.css';

class Week extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.getFullWeek = this.getFullWeek.bind(this);
  }

  getFullWeek (weekDays) {
    const daysDiff = 7 - weekDays.size;
    if (!daysDiff) {
      return weekDays;
    }
    const firstMoment = weekDays.first().moment;
    const weekRange = firstMoment.range('week');
    const filledWeek = Array.from(weekRange.by('day')).map(day => {
      if (day.month() === firstMoment.month()) {
        return {
          'inMonth': true,
          'moment': day
        };
      }

      return {
        'inMonth': false,
        'moment': day
      };
    });

    return List(filledWeek);
  }

  render () {
    const { weekDays, weekNumber, onSelectDay, selectedDay } = this.props;
    const filledWeek = this.getFullWeek(weekDays);

    return (
      <li>
        <ul className="Week">
          <li className="week-number">{weekNumber}</li>
          {filledWeek.map(
            day => <Day
              selected={selectedDay
                ? selectedDay.isSame(day.moment)
                : false}
              onSelectDay={onSelectDay}
              key={day.moment.format()}
              weekDay={ day.moment }
              inMonth={day.inMonth} />)}
        </ul>
      </li>
    );
  }
}

export default Week;
