import React, { Component } from 'react';

/* Styling */
import './CalendarModal.css';

class CalendarModal extends Component {

  componentDidMount() {
    document.body.classList.add('noscroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('noscroll');
  }

  render() {
    const { onClose } = this.props;

    return (
      <div className="CalendarModal">
        <section className="modalContent">
          <div className="inner">
            <div onClick={onClose} className="close">✕</div>
            {this.props.children}
          </div>
        </section>
        <section onClick={onClose} className="backdrop">
        </section>
      </div>
    );
  }
}

export default CalendarModal;
