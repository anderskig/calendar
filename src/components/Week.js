import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* Third party libraries */
import Moment from 'moment';
import { Map, List } from 'immutable';

/* Components */
import Day from './Day';

/* Styling */
import './Week.css';

/**
 * Component responsible for rendering a specific week
 */
class Week extends PureComponent {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.getFullWeek = this.getFullWeek.bind(this);
  }

  /**
   * Complete any week that doesn't contain 7 days within current month
   * with the days of the week outside of current month.
   * @param {List} weekDays with the days of the week in current month.
   * @returns {List} of 7 days.
   */
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
    const { events, today, weekDays, weekNumber, onSelectDay, selectedDay } = this.props;
    const filledWeek = this.getFullWeek(weekDays);

    return (
      <li>
        <ul className="Week">
          <li className="week-number left-col"><span className="value">{weekNumber}</span></li>
            {filledWeek.map(
              day => <Day
                events={events}
                isSelected={selectedDay
                  ? selectedDay.isSame(day.moment, 'day')
                  : false}
                isToday={today.isSame(day.moment, 'day')}
                onSelectDay={onSelectDay}
                key={day.moment.format()}
                weekDay={ day.moment }
                inMonth={day.inMonth} />)}
        </ul>
      </li>
    );
  }
}

Week.propTypes = {
  'events': PropTypes.instanceOf(Map).isRequired,
  'onSelectDay': PropTypes.func.isRequired,
  'selectedDay': PropTypes.instanceOf(Moment),
  'today': PropTypes.instanceOf(Moment).isRequired,
  'weekDays': PropTypes.instanceOf(List).isRequired,
  'weekNumber': PropTypes.string.isRequired
};

export default Week;
