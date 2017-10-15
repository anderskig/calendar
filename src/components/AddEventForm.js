import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import Moment from 'moment';

/* Styling */
import './AddEventForm.css';

/**
 * Form component, lets user add new events to selected day, and also displays the added
 * events for selected day.
*/
class AddEventForm extends PureComponent {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Catch submit of form and instead of postback call the state changing function to add event.
   * @param {SyntheticEvent} event the 'syntheic' event triggered by React on submit.
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    const textBox = event.currentTarget.querySelector('#event-text');
    const eventText = textBox.value;
    if (eventText === '') {
      return;
    }
    textBox.value = '';
    this.props.onAddEvent(eventText, this.props.selectedDay);
  }

  render() {
    const { events, selectedDay } = this.props;

    const dayEvents = events.getIn([
      selectedDay.format('YYYY'),
      selectedDay.format('M'),
      selectedDay.format('w'),
      selectedDay.format('D')
    ]);

    return (
      <form onSubmit={this.handleSubmit} className="AddEventForm">
        <div className="date">
          {selectedDay.format('D MMMM YYYY')}
        </div>
        <div className="events">
          {dayEvents
          ? [
            'Your Events',
            <ul key="eventList" className="eventList">
              {dayEvents.map((event, key) => <li key={key}>{event}</li>)}
            </ul>
            ]
          : <span className="noEvents">No events today.</span>}
        </div>
        <label htmlFor="event-text">
        {!dayEvents
          ? 'Add one!'
          : 'Another one?'
        }
        </label>
        <input autoFocus id="event-text" type="text"/>
        <div className="buttonRow">
          <button type="submit">Add</button>
        </div>
      </form>
    );
  }
}

AddEventForm.propTypes = {
  'events': PropTypes.instanceOf(Map).isRequired,
  'onAddEvent': PropTypes.func.isRequired,
  'selectedDay': PropTypes.instanceOf(Moment).isRequired
};

export default AddEventForm;
