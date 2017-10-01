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

  render() {
    const { shownMoment, onSelectDay, selectedDay, localeData } = this.props;
    const weekRange = this.createWeekRange(shownMoment);

    return (
      <ul className="Month">
        <li>
          <ul className="weekday-names">
            <li className="week-number">V.</li>
            {localeData.weekdays().map(
              weekDay => <li key={weekDay} className="weekday-name">{weekDay}</li>)
            }
          </ul>
        </li>
        { weekRange.keySeq().map(
            key => <Week
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
