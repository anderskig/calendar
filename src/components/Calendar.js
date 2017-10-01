import React, { Component } from 'react';

/* Third party libararies */
import Moment from 'moment';
import 'moment/locale/sv';
import { extendMoment } from 'moment-range';

/* Components */
import Month from './Month';
import Header from './Header';

/* Styles */
import './Calendar.css';

const moment = extendMoment(Moment);
moment.locale('sv');

class Calendar extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);

    /* Set initial state */
    this.state = {
      'currentMonth': 2,
      'currentYear': 2017,
      'events': [],
      'selectedDay': null
    };
  }

  handleSelectDay(newMoment) {
    this.setState({ 'selectedDay': newMoment });
  }

  handleMonthChange(newMonth) {
    this.setState({
      'currentMonth': newMonth.month(),
      'currentYear': newMonth.year()
     });
  }

  render () {
    const { currentMonth, currentYear, selectedDay } = this.state;

    const shownMoment = moment({
      'month': currentMonth,
      'year': currentYear
    });

    return (
      <section className="Calendar">
          <Header
            onMonthChange={this.handleMonthChange}
            shownMoment={shownMoment}/>
          <Month
            localeData={moment.localeData()}
            shownMoment={shownMoment}
            selectedDay={selectedDay}
            onSelectDay={this.handleSelectDay}
            onChangeDay={this.handleChangeDay} />
      </section>
    );
  }
}


Calendar.defaultProps = {
  'startDate': '2017-01-01',
  'stopDate': '2020-01-01'
};

export default Calendar;
