import React, { Component } from 'react';

/* Components */
import Calendar from './components/Calendar';

import './App.css';

/**
 * The base App component, delivered by the create-react-app boilerplate.
 */
class App extends Component {
  render() {
    return (
      <section className="App">
          <Calendar />
      </section>
    );
  }
}

export default App;
