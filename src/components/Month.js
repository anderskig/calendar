import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* Third party libraries */
import Swipe from 'react-easy-swipe';
import Moment from 'moment';
import { Map, List } from 'immutable';

/* Components */
import Week from './Week';

/* Styling */
import './Month.css';

/**
 * Component responsible for rendering the month board (or list in mobile)
 */ 
class Month extends PureComponent {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.createWeekRange = this.createWeekRange.bind(this);
    this.getWeekDayNames = this.getWeekDayNames.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
  }

  /**
   * Create a Map with all days within a month, split by week.
   * @param {Moment} shownMoment Moment object defining the year and month currently shown in Calendar
   * @returns {Map} Immutable Map with days for current year and month split into a key for each week.
   */
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

  /**
   * Get the weekday name strings.
   * @param {Object} localeData a Moment localeData Object
   * @return {Array} of weekday names as strings, in correct order.
   */
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

  /**
   * Handle swipe event.
   * @param {Object} position Position object defining user swipe x and y lenghts.
   * @returns {void}
   */
  onSwipeMove(position) {
    if (Math.abs(position.x) < 100) {
      return;
    }
    const direction = position.x > 0
      ? -1
      : 1;
    this.props.onMonthChange(this.props.shownMoment, direction);
  }

  render() {
    const { events, today, shownMoment, onSelectDay, selectedDay, localeData } = this.props;
    const weekRange = this.createWeekRange(shownMoment);
    const weekDayNames = this.getWeekDayNames(localeData);

    return (
      <Swipe onSwipeMove={this.onSwipeMove}>
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
                events={events}
                today={today}
                selectedDay={selectedDay}
                onSelectDay={onSelectDay}
                key={key}
                weekNumber={key}
                weekDays={weekRange.get(key)} />
            )
          }
        </ul>
      </Swipe>
    );
  }
}

Month.propTypes = {
  'events': PropTypes.instanceOf(Map).isRequired,
  // Moment localeData object.
  'localeData': PropTypes.object.isRequired,
  'onMonthChange': PropTypes.func.isRequired,
  'onSelectDay': PropTypes.func.isRequired,
  'selectedDay': PropTypes.instanceOf(Moment),
  'today': PropTypes.instanceOf(Moment).isRequired
};

export default Month;
