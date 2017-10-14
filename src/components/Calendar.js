import React, { Component } from 'react';

/* Third party libraries */
import moment from 'moment';
import 'moment/locale/sv';
import { extendMoment } from 'moment-range';
import { fromJS, Map, List } from 'immutable';

/* Components */
import Month from './Month';
import Header from './Header';
import CalendarModal from './CalendarModal';
import AddEventForm from './AddEventForm';

/* Styling */
import './Calendar.css';

/* Extend moment with range functionality */
const Moment = extendMoment(moment);

/** 
 * Setup moment with custom locale that combines swedish calendar locale
 * (e.g. rules for which day is first day of week and which week is the
 * first of the year) with the needed English strings taken from en English locale.
 */
Moment.locale('en');
Moment.defineLocale('sv-en-strings', {
  'months': Moment.months(),
  'parentLocale': 'sv',
  'weekdays': Moment.weekdays()
});
Moment.locale('sv-en-strings');

/**
 * Calendar component, base component that keeps track of the state for the whole calendar,
 * and thus also has all the state changing functions.
*/
class Calendar extends Component {

  /** 
   * These static get functions is the closest you get to constants in ES6 classes.
   * This is the key used to store and retreive the Calendar state from localstorage.
   */
  static get STORAGE_KEY() {
    return 'photoWallCalendarState';
  }

  /** 
   * Initialize the state of the Calender app. As this component hols the whole 
   * Calendar state this constructor sets up this state, either from localstorage or 
   * from a predefined intial state.
   */
  constructor() {
    super();

    /* Explicitly bind class functions to 'this' i.e. the class object */
    this.handleSelectDay = this.handleSelectDay.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addEvent = this.addEvent.bind(this);

    try {

      /* 
       * Try to get state from localstorage,
       * as localstorage only stores string values the state in localstorage
       * is serialized to a JSON string and must be parsed on retreival and 
       * the correct typ of objects must be recreated from the primitive objects.
       */
      const storedState = JSON.parse(localStorage.getItem(Calendar.STORAGE_KEY));

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
        // Ignore stored state for modal. Never show it on page load.
        'modalVisible': false,
        'selectedDay': Moment(storedState.selectedDay)
      };
    } catch (error) {

      /* If there is no stored state present or reterival fails set an inital state */
      this.state = {
        'currentMonth': null,
        'currentYear': null,
        'events': Map(),
        'modalVisible': false,
        'selectedDay': null
      };
    }
  }

  /**
   * Select day and show event modal.
   * @param {Moment} newMoment a moment object defining currently selected day.
   * @returns {void}
   */
  handleSelectDay(newMoment) {
    this.setState({
      'modalVisible': true,
      'selectedDay': newMoment
    });
  }

  /**
   * Hide modal
   * @returns {void}
   */
  closeModal() {
    this.setState({ 'modalVisible': false });
  }

  /**
   * Switch month, and possibly year for Calendar.
   * @param {Moment} month moment object to switch to, or if direction is set to step from.
   * @param {-1 | 1} direction defines if function should add or subtract a month.
   * @returns {void}
   */
  handleMonthChange(month, direction = null) {
    const newMonth = direction
      ? month.clone().add(direction, 'month')
      : month;
    this.setState({
      'currentMonth': newMonth.month(),
      'currentYear': newMonth.year()
     });
  }

  /**
   * Serialize and store state in local storage as JSON on state change.
   * Built-in Component lifecycle method called as component props or state changes.
   * @param {Object} prevProps Component props before last update
   * @param {Object} prevState Component state before last update
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    // Update localStorage copy of state only if state has changed.
    if (prevState !== this.state) {
      localStorage.setItem(Calendar.STORAGE_KEY, JSON.stringify(this.state));
    }
  }

  /**
   * Add event to date.
   * @param {String} event user inputed string containing event information.
   * @param {Moment} day moment Object for the day which the event should be added to.
   * @returns {void}
   */
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
    const { currentMonth, currentYear, selectedDay, events, modalVisible } = this.state;

    const shownMoment = Moment({
      'month': currentMonth,
      'year': currentYear
    });

    const today = Moment()
      .hour(0)
      .minute(0)
      .second(0);

    return (
      <section className="Calendar">
          <Header
            onMonthChange={this.handleMonthChange}
            shownMoment={shownMoment}/>
          <Month
            events={events}
            today={today}
            onMonthChange={this.handleMonthChange}
            localeData={Moment.localeData()}
            shownMoment={shownMoment}
            selectedDay={selectedDay}
            onSelectDay={this.handleSelectDay}
            onChangeDay={this.handleChangeDay} />
          {modalVisible
          ? <CalendarModal
              onClose={this.closeModal}>
              <AddEventForm
                onAddEvent={this.addEvent}
                events={events}
                selectedDay={selectedDay} />
            </CalendarModal>
          : null}
      </section>
    );
  }
}

export default Calendar;
