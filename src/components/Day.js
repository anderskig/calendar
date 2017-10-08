import React, { Component } from 'react';

/* Thrid party libraries */
import cx from 'classnames';

/* Styling */
import './Day.css';

class Day extends Component {
    render() {
        const { events, isToday, weekDay, inMonth, onSelectDay, selected } = this.props;
        const dayNumber = weekDay.format('D');
        const classnames = cx({
            'Day': true,
            'calendar-cell': true,
            'first-of-month': dayNumber === '1',
            'outside-month': !inMonth,
            selected,
            'sunday': weekDay.day() === 0,
            'today': isToday
        });

        return (
            <li onClick={() => onSelectDay(weekDay)} className={classnames}>
                <div className="value-col">
                    <div className="valueWrapper">
                        <div className="value">{dayNumber}</div>
                        <div className="currentBar"></div>
                    </div>
                </div>
                <div className="day-name">
                    {weekDay.format('dddd').toUpperCase()}
                </div>
                <div className="eventDots">
                    {events
                        ? events.map(() => <span className="eventDot">.</span>)
                        : null}
                </div>
            </li>
        );
    }
}

export default Day;
