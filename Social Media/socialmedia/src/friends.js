import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import getApiData from './getApiData';


class Friend extends Component {
    constructor() {
        super()
        this.state={fullName:"",profilePicture:""}
    }
    componentDidMount() {
        getApiData("friend/"+this.props.id).then(json => this.setState({ fullName:json.fullName, profilePicture:json.profilePicture}));
    }
    render() {
        return (
            
            <div className="friend-container">
                    <img className="profilePicture" src={this.state.profilePicture} alt="an amazing pic"/>
                    <p className="friendName">{this.state.fullName}</p>
            </div>
        )
    }
}

export default Friend;
//export getFriendData;
//export getFriendsToDisplay;