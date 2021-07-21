import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import "./friends.css";
import getApiData from './getApiData.js';


class Friend extends Component {
    constructor() {
        super()
        this.state={surName:"",firstName:"",profilePicture:"", username:""}
    }
    componentDidMount() {
        getApiData("friend/"+this.props.id).then(json => this.setState({ surName:json.surName, firstName:json.firstName, profilePicture:json.profilePictureUrl,username:json.username}));
    }
    render() {
        return (
            
            <div className="friend-container">
                    <img className="profilePicture" src={this.state.profilePicture} alt="an amazing pic"/>
                    <div className="friendNameContainer">
                        <p className="friendName">{this.state.firstName+" "+this.state.surName}</p>
                        <p className="friendUsername">{this.state.username}</p>
                    </div>
            </div>
        )
    }
}

export default Friend;
//export getFriendData;
//export getFriendsToDisplay; 