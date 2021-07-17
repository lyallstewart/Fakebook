import React, { Component } from 'react'

export class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
              this.setState({value: event.target.value});  
    }

    handleSubmit(event) {
        alert('A post was submitted: ' + this.state.value);
        console.log("Post submitted" + this.state.value)
        event.preventDefault();
      }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <label>
                Enter post content:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}


export default CreatePost