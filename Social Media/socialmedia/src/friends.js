import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import getFriendData from './getFriendData';



class Friend extends Component {
    render() {
        let data = getFriendData(this.props.id)
        return (
            
            <div className="friend-container">
                    <img className="profilePicture" src={data.profilePicture} alt="an amazing pic"/>
                    <p className="friendName">{data.fullName}</p>
            </div>
        )
    }
}

export default Friend;
//export getFriendData;
//export getFriendsToDisplay;