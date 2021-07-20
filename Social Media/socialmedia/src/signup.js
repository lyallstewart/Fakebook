import React, { Component } from 'react'
import sendApiData from './sendApiData';
import FakeBookLink from './fakeBookLink';
import "./signup.css";

export class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password:"",
            Password2:"",
            firstName:"",
            surName:"",
            error:null,
            submiterror:null
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurNameChange = this.handleSurNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkForErrors = this.checkForErrors.bind(this);
      }
    checkForErrors(submit) {
        console.log(this.state)
        if (this.state.Username==="" || (this.state.Username===null && submit)) {
            this.setState({error:"Username required"})
            return false
        }
        if (this.state.Password==="" || (this.state.Password===null && submit)) {
            this.setState({error:"Password required"})
            return false
        }
        if (this.state.Password!==this.state.Password2) {
            this.setState({error:"Passwords do not match"})
            return false
        }
        if (this.state.firstName==="" || (this.state.firstName===null && submit)) {
            this.setState({error:"First name required"})
            return false
        }
        if (this.state.surName==="" || (this.state.surName===null && submit)) {
            this.setState({error:"surname required"})
            return false
        } else {
            this.setState({error:""})
            return true
        }
        //Check for problems with the form before sending it
    }
    handleUsernameChange(event) {
        this.setState({Username: event.target.value},()=>this.checkForErrors(false));
    }
    handlePasswordChange(event) {
        this.setState({Password: event.target.value},()=>this.checkForErrors(false));  
    }
    handlePassword2Change(event) {
        this.setState({Password2: event.target.value},()=>this.checkForErrors(false));  
    }
    handleSurNameChange(event) {
        this.setState({surName: event.target.value},()=>this.checkForErrors(false));  
    }
    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value},()=>this.checkForErrors(false));  
    }
    async handleSubmit(event) {
      event.preventDefault();
        let success = await sendApiData("signup",this.state)
        console.log(success)
        if (success.validLogin) {
          alert("Account not taken!")
        } else {
          this.setState({submiterror:success.error})
        }
        
      }
    
    render() {
        return (
          <div class="wrapper">
            <h1>Sign Up:</h1>
            <form onSubmit={this.handleSubmit} class="signupBox">
                <label class="signupForm">
                  <div id="error">{this.state.error}</div>
                  <input id="username" type="text" placeholder="Your Username" value={this.state.Username} onChange={this.handleUsernameChange} />
                  <div id="fullName">
                    <input id="firstName" type="text" placeholder="First name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
                    <div id="nameSpacer"></div>
                    <input id="surName" type="text" placeholder="Last name" value={this.state.surName} onChange={this.handleSurNameChange} />
                  </div>
                  <input id="password" type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
                  <input id="password2" type="password" placeholder="Re-type Password" value={this.state.Password2} onChange={this.handlePassword2Change} />
                  <div id="submiterror">{this.state.submiterror}</div>
                  <input id="submit" type="submit" value="Submit" />
              </label>
            </form>
            <FakeBookLink href="./login">Already have an account? Log in.</FakeBookLink>
          </div>
        );
    }
}

export default SignUpPage
