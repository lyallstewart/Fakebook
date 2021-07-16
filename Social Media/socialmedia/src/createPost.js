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
        
        
        return false
    }
    render() {
        return (
            <div>
                <h1>Create Post:</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.content||""} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} e="submit" value="Submit Post" >Submit</button>
                </form>
                <p>{this.state.displayText?this.state.toDisplay:""}</p>
            </div>
        )
    }
}


export default CreatePost