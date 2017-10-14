import React, { PureComponent } from 'react'; 
import PropTypes from 'prop-types';
import Moment from 'moment';


/* Styling */
import './Header.css';

/**
 * Header component, displays current, next and previous months and
 * facilitates month switching.
*/
class Header extends PureComponent {

  render() {
    const { shownMoment, onMonthChange } = this.props;
    const prevMonth = shownMoment.clone().subtract(1, 'month');
    const nextMonth = shownMoment.clone().add(1, 'month');

    return (
      <section className="Header">
        <div className="prevMonth">
          <div className="changeMonthWrapper" onClick={() => onMonthChange(nextMonth)}>
            <span className="arrow">⟨</span>
            <span className="monthName">{prevMonth.format('MMMM')}</span>
          </div>
        </div>
        <div className="currentMonth">
          {shownMoment.format('MMMM YYYY')}
        </div>
        <div className="nextMonth">
          <div className="changeMonthWrapper" onClick={() => onMonthChange(nextMonth)}>
            <span className="monthName">{nextMonth.format('MMMM')}</span>
            <span className="arrow">⟩</span>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  'onMonthChange': PropTypes.func.isRequired,
  'shownMoment': PropTypes.instanceOf(Moment).isRequired
};


export default Header;
