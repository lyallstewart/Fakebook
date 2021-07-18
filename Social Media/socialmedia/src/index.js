import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './homepage';
import Navbar from "./navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePost from "./createPost.js";
import LoginPage from "./login.js";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route path="/profile"><h1>Profile</h1></Route>
        <Route path="/post"><CreatePost /></Route>
        <Route path="/login"><LoginPage /></Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

