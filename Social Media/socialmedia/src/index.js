import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.js";

ReactDOM.render(
  <React.StrictMode>
    <App location={window.history}/>{/* This passes location only so that it re-renders the App on URL change*/}
  </React.StrictMode>,
  document.getElementById('root')
);