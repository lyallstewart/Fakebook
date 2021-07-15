import React, { Component } from 'react'
import getPostData from "./getPostData";
import "./post.css";

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
    render() {
        let postData=getPostData(this.props.id);//Get data about this post
        return (
            <div className="post-container">
              {this.renderSwitch(postData.type,postData.videoType,postData.mediaLink)}
              <p>{postData.content}</p>
            </div>
        )
    }
}

export default Post;