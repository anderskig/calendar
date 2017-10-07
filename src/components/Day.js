import React, { Component } from 'react';

/* Thrid party libraries */
import cx from 'classnames';

/* Styling */
import './Day.css';

class Day extends Component {
    render() {
        const { isToday, weekDay, inMonth, onSelectDay, selected } = this.props;
        const classnames = cx({
            'Day': true,
            'calendar-cell': true,
            'outside-month': !inMonth,
            selected,
            'today': isToday
        });
        const events = [];

        return (
            <li onClick={() => onSelectDay(weekDay)} className={classnames}>
                <div className="valueWrapper">
                    <div className="value">{weekDay.format('D')}</div>
                    <div className="currentBar"></div>
                    <div className="eventDots">
                        {events.map(() => <span className="eventDot">.</span>)}
                    </div>
                </div>
            </li>
        );
    }
}

export default Day;
