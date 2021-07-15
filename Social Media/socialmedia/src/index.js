import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './homepage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./navbar.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login"></Route>{/* If at login page, do nothing */}
        <Route path="/"><Navbar /></Route>{/* If not login, load navbar */}
      </Switch>
    </BrowserRouter>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

