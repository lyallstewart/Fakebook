import React, { Component } from 'react';
import "./createPost.css";
import sendApiData from './sendApiData.js';

export class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {textContent: '', contentType:"text", videoType:"", mediaSource:"", userDetails:this.props.globals.userDetails};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onContentTypeChange = this.onContentTypeChange.bind(this);
        this.onVideoTypeChange = this.onVideoTypeChange.bind(this);
        this.handleMediaSourceChange = this.handleMediaSourceChange.bind(this);

      }
    
    handleChange(event) {
              this.setState({textContent: event.target.value});  
    }
    handleMediaSourceChange(event) {
      this.setState({mediaSource: event.target.value});  
}

    async handleSubmit(event) {
        event.preventDefault();
        await sendApiData("create",this.state)
        console.log("Post submitted" , this.state)
        
      }
      onContentTypeChange(event) {
        this.setState({
          contentType: event.target.value
        });
      }
      onVideoTypeChange(event) {
        console.log("CHANGED")
        this.setState({
          videoType: event.target.value
        });
      }
    render() {
        return (
          <div className="wrapper">
              <form onSubmit={this.handleSubmit} id="createForm">
                  <h2>Enter text content in the box below:</h2>
                    <label id="contentbox">
                      Enter text content:<br />
                    <input className="textContentInput" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.textContent} onChange={this.handleChange} />
                    </label>
                    <div className="radioHolder">
                        <input type="radio" id="text" value="text" checked={this.state.contentType === "text"} onChange={this.onContentTypeChange} />
                        <input type="radio" id="image" value="image" checked={this.state.contentType === "image"} onChange={this.onContentTypeChange} />
                        <input type="radio" id="video" value="video" checked={this.state.contentType === "video"} onChange={this.onContentTypeChange} />
                        <label htmlFor="text" className="option text">Create text post</label>
                        <label htmlFor="image" className="option image">Create image post</label>
                        <label htmlFor="video" className="option video">Create video post</label>
                    </div>
                    {this.state.contentType==="video"?<div id="videoType" className="ratioHolder">
                        <input type="radio" id="youtube" value="youtube" checked={this.state.videoType === "youtube"} onChange={this.onVideoTypeChange} />
                        <input type="radio" id="mp4" value="mp4" checked={this.state.videoType === "mp4"} onChange={this.onVideoTypeChange} />
                        <label htmlFor="youtube" className="option youtube">Upload youtube post</label>
                        <label htmlFor="mp4" className="option mp4">Upload MP4 post</label>
                    </div>:<></>}
                    {this.state.contentType==="text"?<></>:<input className="textContentInput" placeholder="Place Link here!" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.mediaSource} onChange={this.handleMediaSourceChange} />}
              <input type="submit" value="Submit" />
            </form>
          </div>
        );
    }
}


export default CreatePost