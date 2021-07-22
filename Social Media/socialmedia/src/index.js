import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.js";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Popup from 'reactjs-popup';
import './index.css';
import "./themes.css";
import {Helmet} from "react-helmet";

console.log(getCookieConsentValue());
ReactDOM.render(
  <>
  <Helmet htmlAttributes={{ class : window.matchMedia('(prefers-color-scheme: dark)').matches?"darkmode":"lightmode" }}/>
    <CookieConsent setDeclineCookie declineButtonText="I'll login myself" buttonText="Accept cookies" enableDeclineButton overlay>We use cookies to keep you logged in.<Popup trigger={<button className="button" style={{marginLeft:"10px"}}> View our cookie policy </button>} modal>
    <div className="CookiePolicy"><h2> Cookie Policy </h2><p>We will not use cookies to track you. The only thing we will store using cookies are listed below. If this changes, the Cookie dialogue will re-appear and you can unconsent. We store in cookies:<ul><li>Your username</li><li>An Authentication hash derived from your username and password. your password CANNOT be found with this.</li></ul> You can change your preference at anytime in your profile.</p></div>
  </Popup></CookieConsent>
  <div>
    <App location={window.history}/>{/* This passes location only so that it re-renders the App on URL change*/}
  </div>
  </>,
  document.getElementById('root')
);