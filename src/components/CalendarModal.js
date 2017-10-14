import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* Styling */
import './CalendarModal.css';

/**
 * General use modal which creates a centered fixed position modal with greyed out backdrop
 * and populates the modal with its JSX children.
 */
class CalendarModal extends PureComponent {

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

CalendarModal.propTypes = { 'onClose': PropTypes.func.isRequired };

export default CalendarModal;
