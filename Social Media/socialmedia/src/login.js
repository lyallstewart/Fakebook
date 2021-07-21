import React from "react";
import sendApiData from "./sendApiData.js"; 
import './login.css'
import FakeBookLink from "./fakeBookLink.js";
import { Cookies, getCookieConsentValue } from "react-cookie-consent";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Username: '',
        Password:""};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
          console.log(success.userDetails)
          this.props.loginCallback({isLoggedIn:true,userDetails:success.userDetails})
          console.log(this.props.loginCallback)
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
    render() {
        return (
          <div class="wrapper">
            <h1>Log In:</h1>
            <form onSubmit={this.handleSubmit} class="loginBox">
                <label class="loginForm">
                  <input id="username" type="text" placeholder="Your Username" value={this.state.Username} onChange={this.handleUsernameChange} />
                  <input id="password" type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
                  <input id="submit" type="submit" value="Submit" />
              </label>
            </form>
            <FakeBookLink href="./signup">Don't have an account? Sign up.</FakeBookLink>
          </div>
        );
    }
}

export default LoginPage;