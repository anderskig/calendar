import React, { Component } from 'react';

/* Third party libararies */
import Moment from 'moment';
import 'moment/locale/sv';
import { extendMoment } from 'moment-range';
import { fromJS, Map, List } from 'immutable';

/* Components */
import Month from './Month';
import Header from './Header';
import CalendarModal from './CalendarModal';
import AddEventForm from './AddEventForm';

/* Styles */
import './Calendar.css';

/* Extend moment with range functionality */
const moment = extendMoment(Moment);

/* Setup moment with custom locale that combines swedish calendar with the needed English strings */
moment.locale('en');
moment.defineLocale('sv-en-strings', {
  'months': moment.months(),
  'parentLocale': 'sv',
  'weekdays': moment.weekdays()
});
moment.locale('sv-en-strings');

class Calendar extends Component {

  static get STORAGE_ITEM_STR() {
    return 'photoWallCalendarState';
  }

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addEvent = this.addEvent.bind(this);

    try {

      /* Try to get state from localstorage */
      const storedState = JSON.parse(localStorage.getItem(Calendar.STORAGE_ITEM_STR));

      this.state = {
        'currentMonth': storedState.currentMonth
          ? parseInt(storedState.currentMonth, 10)
          : null,
        'currentYear': storedState.currentYear
          ? parseInt(storedState.currentYear, 10)
          : null,
        'events': storedState.events
          ? fromJS(storedState.events)
          : Map(),
        'modalVisible': storedState.modalVisible,
        'selectedDay': moment(storedState.selectedDay)
      };
    } catch (error) {

      /* Set initial state */
      this.state = {
        'currentMonth': null,
        'currentYear': null,
        'events': Map(),
        'modalVisible': false,
        'selectedDay': null
      };
    }
  }

  handleSelectDay(newMoment) {
    this.setState({
      'modalVisible': true,
      'selectedDay': newMoment
    });
  }

  closeModal() {
    this.setState({ 'modalVisible': false });
  }

  handleMonthChange(month, direction = null) {
    const newMonth = direction
      ? month.clone().add(direction, 'month')
      : month;
    this.setState({
      'currentMonth': newMonth.month(),
      'currentYear': newMonth.year()
     });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem(Calendar.STORAGE_ITEM_STR, JSON.stringify(this.state));
    }
  }

  addEvent(event, day) {
    const currentEvents = this.state.events.getIn([
      day.format('YYYY'),
      day.format('M'),
      day.format('w'),
      day.format('D')
    ]);

    const newEvents = currentEvents
      ? currentEvents.push(event)
      : List([event]);

    this.setState({
      'events': this.state.events.setIn([
        day.format('YYYY'),
        day.format('M'),
        day.format('w'),
        day.format('D')
      ], newEvents)
    });
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
            events={this.state.events}
            today={today}
            onMonthChange={this.handleMonthChange}
            localeData={moment.localeData()}
            shownMoment={shownMoment}
            selectedDay={selectedDay}
            onSelectDay={this.handleSelectDay}
            onChangeDay={this.handleChangeDay} />
          {this.state.modalVisible
          ? <CalendarModal
              onClose={this.closeModal}>
              <AddEventForm
                onAddEvent={this.addEvent}
                events={this.state.events}
                selectedDay={selectedDay} />
            </CalendarModal>
          : null}
      </section>
    );
  }
}

export default Calendar;
