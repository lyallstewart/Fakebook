import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import "./friends.css";
import sendApiData from './sendApiData';
import "./friendspage.css";
import FriendsList from './friendslist';
  
export class FriendsPage extends Component {
    constructor(props) {
        super(props)
        this.state={friendToRequest:""}
        this.props=props
        this.handleFriendRequestChange = this.handleFriendRequestChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleFriendRequestChange(e) {
        this.setState({friendToRequest:e.target.value})
    }
    async handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.friendToRequest)
        await sendApiData("sendfriendrequest/"+this.state.friendToRequest,this.props.globals.userDetails)
        let success = await sendApiData("cookielogin",{Username:this.props.globals.userDetails.username,authHash:this.props.globals.userDetails.authHash})
          if (success.validLogin) {
            await this.props.callback({userDetails:success.userDetails})
          }
    }
    render() {
      console.log("RENDER FRIEND PAGE")
      console.log(this.props.globals.userDetails)
        return (
            <>
            <h2>Friend Requests:</h2>
            <form onSubmit={this.handleSubmit} className="RequestForm">
                <input type="text" placeholder="Friend Username Here" value={this.state.friendToRequest} onChange={this.handleFriendRequestChange}/>
                <input type="submit" value="Send Request" />
            </form>
            <h2 id="Friends">Recieved Friend requests:</h2>
            <FriendsList friends={this.props.globals.userDetails.incomingFriendRequests} globals={this.props.globals} callback={this.props.callback} accept deny/>
            <h2 id="Friends">Sent Friend requests:</h2>
            <FriendsList friends={this.props.globals.userDetails.outgoingFriendRequests} globals={this.props.globals} callback={this.props.callback} deny/>
            <h2 id="Friends">Friends:</h2>
            <FriendsList friends={this.props.globals.userDetails.friends} globals={this.props.globals} callback={this.props.callback} deny/>
            </>
    
        )
    }
}

export default FriendsPage;

