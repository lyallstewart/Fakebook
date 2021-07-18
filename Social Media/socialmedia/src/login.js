import React from "react";
import sendApiData from "./sendApiData.js";

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
          alert("Valid Credentials!")
        } else {
          alert("Credentials Invalid :(")
        }
        
      }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <label>
                <input type="text" placeholder="Your Username" value={this.state.Username} onChange={this.handleUsernameChange} />
                <input type="password" placeholder="Password" value={this.state.Password} onChange={this.handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}

export default LoginPage;