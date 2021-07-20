import React, { Component } from 'react'
import sendApiData from './sendApiData';
import FakeBookLink from './fakeBookLink';
import "./signup.css";

export class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {Username: '',
        Password:"",Password2:""};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurNameChange = this.handleSurNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleUsernameChange(event) {
              this.setState({Username: event.target.value});  
    }
    handlePasswordChange(event) {
        this.setState({Password: event.target.value});  
    }
    handlePassword2Change(event) {
        this.setState({Password2: event.target.value});  
    }
    handleSurNameChange(event) {
        this.setState({surName: event.target.value});  
    }
    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});  
    }
    async handleSubmit(event) {
      event.preventDefault();
        let success = await sendApiData("signup",this.state)
        console.log(success)
        if (success.validLogin) {
          alert("Valid Credentials!")
          console.log("Calling Callback")
          this.props.loginCallback({isLoggedIn:true})
          console.log(this.props.loginCallback)
        } else {
          alert("Credentials Invalid :(")
        }
        
      }
    
    render() {
        return (
          <div class="wrapper">
            <h1>Log In:</h1>
            <form onSubmit={this.handleSubmit} class="signupBox">
                <label class="signupForm">
                  <input id="username" type="text" placeholder="Your Username" value={this.state.Username} onChange={this.handleUsernameChange} />
                  <div id="fullName">
                    <input id="firstName" type="text" placeholder="First name" value={this.state.firstName} onchange={this.handleFirstNameChange} />
                    <div id="nameSpacer"></div>
                    <input id="surName" type="text" placeholder="Last name" value={this.state.surName} onchange={this.handleSurNameChange} />
                  </div>
                  <input id="password" type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
                  <input id="password2" type="password" placeholder="Re-type Password" value={this.state.Password2} onChange={this.handlePassword2Change} />
                  <input id="submit" type="submit" value="Submit" />
              </label>
            </form>
            <FakeBookLink href="./signup">Don't have an account? Sign up.</FakeBookLink>
          </div>
        );
    }
}

export default SignUpPage
