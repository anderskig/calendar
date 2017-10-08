import React, { Component } from 'react';

/* Components */
import Week from './Week';
import { Map, List } from 'immutable';
import Swipe from 'react-easy-swipe';

/* Styling */
import './Month.css';

class Month extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.createWeekRange = this.createWeekRange.bind(this);
    this.getWeekDayNames = this.getWeekDayNames.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
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

  onSwipeMove(position, event) {
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
    const direction = position.x > 0
      ? 1
      : -1;
    this.props.onMonthChange(this.props.shownMoment, direction);
  }

  render() {
    const { today, shownMoment, onSelectDay, selectedDay, localeData } = this.props;
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
                events={this.props.events
                  ? this.props.events.get(key)
                  : null}
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

export default Month;
