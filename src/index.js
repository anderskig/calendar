import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/**
 * This file is a boilerplate file form create-react-app that initializes the app
 * and register service worker (on production build).
 */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
