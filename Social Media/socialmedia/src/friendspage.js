import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import "./friends.css";
import getApiData from './getApiData.js';
import sendApiData from './sendApiData';
import Friend from './friends';
import "./friendspage.css";

class FriendsList extends React.Component {
    constructor(props) {
      super(props)
      this.state={friends:this.props.friends}
  }
    render() {
      return (
        <div>
          <h2 id="Friends">Friends:</h2>
          {this.state.friends.map(id=><Friend id={id} key={id}/>)}
        </div>
      );
    }
  };
  
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
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state.friendToRequest)
        sendApiData("sendfriendrequest/"+this.state.friendToRequest,this.props.userDetails)
    }
    render() {
        return (
            <>
            <h2>Friend Requests:</h2>
            <form onSubmit={this.handleSubmit} className="RequestForm">
                <input type="text" placeholder="Friend Username Here" value={this.state.friendToRequest} onChange={this.handleFriendRequestChange}/>
                <input type="submit" value="Send Request" />
            </form>
            <FriendsList friends={this.props.globals.userDetails.friends}/>
            </>
    
        )
    }
}

export default FriendsPage;

