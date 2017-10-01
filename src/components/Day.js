import React, { Component } from 'react';

/* Thrid party libraries */
import cx from 'classnames';

/* Styling */
import './Day.css';

class Day extends Component {
    render() {
        const { weekDay, inMonth, onSelectDay, selected } = this.props;
        const classnames = cx({
            'Day': true,
            'outside-month': !inMonth,
            selected
        });

        return (
            <li onClick={() => onSelectDay(weekDay)} className={classnames}>
                {weekDay.format('D')}
            </li>
        );
    }
}

export default Day;
