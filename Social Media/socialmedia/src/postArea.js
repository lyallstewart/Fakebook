import React, { Component } from 'react';
import getApiData from './getApiData';
import Post from './post';
import "./App.css";
import"./post.css";

class PostArea extends Component {
    constructor(props) {
        super(props)
        this.state={posts:[]}
    }
    componentDidMount() {
        console.log("GETTING POST DATA","postsToDisplay/"+this.props.globals.userDetails.username+"/10")
        getApiData("postsToDisplay/"+this.props.globals.userDetails.username+"/10").then(json => this.setState({posts:json}));

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