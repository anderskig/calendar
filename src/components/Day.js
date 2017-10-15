import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* Thrid party libraries */
import cx from 'classnames';
import { Map } from 'immutable';
import Moment from 'moment';

/* Styling */
import './Day.css';

/**
 * Component responsible for rendering the individual day cells.
 */
class Day extends PureComponent {
    render() {
        const { events, isToday, weekDay, inMonth, onSelectDay, isSelected } = this.props;
        const dayNumber = weekDay.format('D');
        const classnames = cx({
            'Day': true,
            'calendar-cell': true,
            'first-of-month': dayNumber === '1',
            'outside-month': !inMonth,
            'selected': isSelected,
            'sunday': weekDay.day() === 0,
            'today': isToday
        });

        const dayEvents = events.getIn([
            weekDay.format('YYYY'),
            weekDay.format('M'),
            weekDay.format('w'),
            weekDay.format('D')
        ]);

        const maxNoEventDots = 6;

        const toManyEvents = dayEvents
            ? dayEvents.size > maxNoEventDots
            : false;

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
                    {dayEvents && !toManyEvents
                        ? dayEvents.keySeq().map(key => <span key={key} className="eventDot">.</span>)
                        : null}
                    {toManyEvents
                        ? <span className="toManyEvents">> {maxNoEventDots}</span>
                        : null}
                </div>
            </li>
        );
    }
}

Day.propTypes = {
    'events': PropTypes.instanceOf(Map).isRequired,
    'inMonth': PropTypes.bool,
    'isRequired': PropTypes.bool,
    'isSelected': PropTypes.bool,
    'onSelectDay': PropTypes.func.isRequired,
    'weekDay': PropTypes.instanceOf(Moment).isRequired
};

export default Day;
