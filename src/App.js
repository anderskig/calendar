import React, { Component } from 'react';

/* Components */
import Calendar from './components/Calendar';

import './App.css';

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
