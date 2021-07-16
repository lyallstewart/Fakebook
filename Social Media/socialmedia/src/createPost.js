import React, { Component } from 'react'

export class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleChange.bind(this)
        this.state = {
            content:"Type your amazing post here!",
            displayText:true,
            toDisplay: "",
        }
    }
    handleChange(event) {
        this.setState({content: event.target.value});
    }
    handleSubmit(event) {
        //submitting code here!
        alert(this.state.content)
        this.setState({displayText:true});
        this.setState({toDisplay: this.state.content})
        
    }
    render() {
        return (
            <div>
                <h1>Create Post:</h1>
                    <textarea name="Content" cols="40" rows="5"  value={this.state.content||""} onChange={this.handleChange} ></textarea>
                    <button onClick={this.handleSubmit}>Submit</button>
                <p>{this.state.displayText?this.state.content:""}</p>
                
            </div>
        )
    }
}


export default CreatePost