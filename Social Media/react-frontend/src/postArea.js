import React, { Component } from 'react';
import getPostsToDisplay from './getPostsToDisplay';
import Post from './post';
import "./App.css";
import"./post.css";

class PostArea extends Component {
    render() {
        let postsToDisplay=getPostsToDisplay();
        return (
            <div>
                <h1 className="postHeader">Posts for You:</h1>
                {postsToDisplay.map(post=><Post id={post} />)}
            </div>
        )
    }
}
export default PostArea;