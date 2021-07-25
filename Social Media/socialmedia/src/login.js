import React from "react";
import sendApiData from "./sendApiData.js"; 
import './login.css'
import FakeBookLink from "./fakeBookLink.js";
import { Cookies, getCookieConsentValue } from "react-cookie-consent";
import VerificationInput from 'react-verification-input';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Username: '',
        Password:"",twoFactor:""};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.changeTwoFactor = this.changeTwoFactor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleUsernameChange(event) {
              this.setState({Username: event.target.value});  
    }
    handlePasswordChange(event) {
        this.setState({Password: event.target.value});  
}
    async handleSubmit(event) {
      event.preventDefault();
        let success = await sendApiData("login",this.state)
        console.log(success)
        if (success.validLogin) {
          if (success.skip2FA) {
            console.log(success.userDetails)
            this.props.loginCallback({isLoggedIn:true,userDetails:success.userDetails})
            console.log(this.props.loginCallback)
          } else {
            document.getElementById("phase1").style.display = "none"
            document.getElementById("phase2").style.display = "block"
          }
        } else {
          alert("Credentials Invalid :(")
        }
        
      }
    async componentDidMount() {
      if (getCookieConsentValue()) {
        let Username=Cookies.get("username")
        let authHash=Cookies.get("authHash")
        if (Username && authHash) {
          let success = await sendApiData("cookielogin",{Username:Username,authHash:authHash})
          if (success.validLogin) {
            console.log(success.userDetails)
            this.props.loginCallback({isLoggedIn:true,userDetails:success.userDetails})
            console.log(this.props.loginCallback)
          }
        }
      }
    }
    async changeTwoFactor(e) {
      if (e.length===6) {
        if (!isNaN(e)) {
          let success = await sendApiData("login",this.state)
        console.log(success)
        if (success.validLogin) {
          console.log(success.userDetails)
          this.props.loginCallback({isLoggedIn:true,userDetails:success.userDetails})
          console.log(this.props.loginCallback) 
        } else {
          alert("Credentials Invalid :(")
        }
        }
      }
    }
    render() {
        return (
          <div className="wrapper">
            <h1>Log In:</h1>
            <div id="phase1">
            <form onSubmit={this.handleSubmit} className="loginBox">
                <label className="loginForm">
                  <input id="username" type="text" placeholder="Your Username" value={this.state.Username} onChange={this.handleUsernameChange} />
                  <input id="password" type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
                  <input id="submit" type="submit" value="Submit" />
              </label>
            </form>
            <FakeBookLink href="./signup">Don't have an account? Sign up.</FakeBookLink>
            <p  className="pwrdreset">Forgot your password? Have a good think and try to remember!</p>
            </div>
            <div id="phase2" style={{display:"none"}}>
              <VerificationInput onChange={this.changeTwoFactor} placeholder="" removeDefaultStyles classNames={{container: "TWOFAcontainer",character: "TWOFAcharacter",characterInactive: "TWOFAcharacter--inactive",characterSelected: "TWOFAcharacter--selected"}}/>
            </div>
          </div>
        );
    }
}

export default LoginPage;