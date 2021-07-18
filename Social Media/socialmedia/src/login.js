import React from "react";
import sendApiData from "./sendApiData.js";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Email: '',
        Password:""};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleEmailChange(event) {
              this.setState({Email: event.target.value});  
    }
    handlePasswordChange(event) {
        this.setState({Password: event.target.value});  
}
    handleSubmit(event) {
        sendApiData("login",this.state)
        alert(`A sign-in was attempted:\n EMAIL:${this.state.Email}\n PASSWORD:${this.state.Password}`);
        console.log(`A sign-in was attempted:\n EMAIL:${this.state.Email}\n PASSWORD:${this.state.Password}`)
        event.preventDefault();
      }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <label>
                <input type="text" placeholder="Your Email" value={this.state.Email} onChange={this.handleEmailChange} />
                <input type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}

export default LoginPage;