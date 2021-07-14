import React, { Component } from 'react';
import getPostsToDisplay from './getPostsToDisplay';
import Post from './post';

class PostArea extends Component {
    render() {
        console.log("test")
        let postsToDisplay=getPostsToDisplay()
        return (
            <>
                {postsToDisplay.map(post=><Post id={post} />)}
            </>
        )
    }
}
export default PostArea;