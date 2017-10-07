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

const storageItemStr = 'photoWallCalendarState';

class Calendar extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);


    try {

      /* Try to get state from localstorage */
      const storedState = JSON.parse(localStorage.getItem(storageItemStr));
      this.state = {
        'currentMonth': parseInt(storedState.currentMonth, 10),
        'currentYear': parseInt(storedState.currentYear, 10),
        'events': storedState.events,
        'selectedDay': moment(storedState.selectedDay)
      };
    } catch (error) {

      /* Set initial state */
      this.state = {
        'currentMonth': null,
        'currentYear': null,
        'events': [],
        'selectedDay': null
      };
    }
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem(storageItemStr, JSON.stringify(this.state));
    }
  }

  render () {
    const { currentMonth, currentYear, selectedDay } = this.state;

    const shownMoment = moment({
      'month': currentMonth,
      'year': currentYear
    });

    const today = moment()
      .hour(0)
      .minute(0)
      .second(0);

    return (
      <section className="Calendar">
          <Header
            onMonthChange={this.handleMonthChange}
            shownMoment={shownMoment}/>
          <Month
            today={today}
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
