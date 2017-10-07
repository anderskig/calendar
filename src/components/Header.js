import React, { PureComponent } from 'react'; 

/* Styling */
import './Header.css';

class Header extends PureComponent {

  render() {
    const { shownMoment, onMonthChange } = this.props;
    const prevMonth = shownMoment.clone().subtract(1, 'month');
    const nextMonth = shownMoment.clone().add(1, 'month');

    return (
      <section className="Header">
        <div onClick={() => onMonthChange(prevMonth)} className="prevMonth">
          <span>{prevMonth.format('MMMM')}</span>
        </div>
        <div className="currentMonth">
          {shownMoment.format('MMMM YYYY')}
        </div>
        <div onClick={() => onMonthChange(nextMonth)} className="nextMonth">
          <span>{nextMonth.format('MMMM')}</span>
        </div>
      </section>
    );
  }
}

export default Header;
