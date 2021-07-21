import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import getApiData from './getApiData.js';

class Post extends Component {
    renderSwitch(tocheck,videotype,mediaLink) {
        switch(tocheck) {
            case "text":
                return <></>
            case "image":
                return <img className="post-media" src={mediaLink} alt="an amazing pic"/>
            case "video":
                if (videotype==="youtube") {
                    return <div className="video-container"><iframe title={"Youtube embedded video. id="+mediaLink} src={"https://www.youtube.com/embed/"+mediaLink} frameBorder="0" allowFullScreen></iframe></div>
                } else {
                    return <div className="video-container"><video controls className="post-media"><source src={mediaLink} type={"video/"+videotype} /></video></div>
                }
            default:
                return <></>
                }
        }
    constructor() {
        super()
        this.state={type:"",videoType:"",mediaLink:"",content:""}
    }
    componentDidMount() {
        getApiData("post/"+this.props.id).then(json => this.setState({ type: json.contentType , videoType: json.videoType, mediaLink: json.mediaSource, content: json.textContent}));
    }
    render() {
        return (
            <div className="post-container">    
              {this.renderSwitch(this.state.type,this.state.videoType,this.state.mediaLink)}
              <p>{this.state.content}</p>
            </div>
        )
    }
}

export default Post;