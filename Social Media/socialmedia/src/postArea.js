import React, { Component } from 'react';
import getPostsToDisplay from './getPostsToDisplay';
import Post from './post';
import "./App.css";

class PostArea extends Component {
    render() {
        let postsToDisplay=getPostsToDisplay()
        return (
            <>
                {postsToDisplay.map(post=><Post id={post} />)}
            </>
        )
    }
}
export default PostArea;