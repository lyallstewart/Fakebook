import React, { Component } from 'react';
import getApiData from './getApiData';
import Post from './post';
import "./App.css";
import"./post.css";

class PostArea extends Component {
    constructor() {
        super()
        this.state={posts:[]}
    }
    componentDidMount() {
        getApiData("postsToDisplay").then(json => this.setState({posts:json}));

    }
    render() {
        return (
            <div>
                <h1 className="postHeader">Posts for You:</h1>
                {this.state.posts.map(post=><Post id={post} />)}
            </div>
        )
    }
}
export default PostArea;