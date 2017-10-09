import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import './AddEventForm.css';

class AddEventForm extends Component {

  constructor(props) {
    super(props);

    /* Explicitly bind class functions to 'this' */
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const eventText = event.currentTarget.querySelector('#event-text').value;
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
        <ul className="events">
          {dayEvents
          ? dayEvents.map((event, key) => <li key={key}>{event}</li>)
          : null}
        </ul>
        <input id="event-text" type="text"/>
        <div className="buttonRow">
          <button type="submit">Add Event</button>
        </div>
      </form>
    );
  }
}

AddEventForm.propTypes = { 'onAddEvent': PropTypes.func.isRequired }; 

export default AddEventForm;
