import React, { Component } from 'react'
import "./post.css";
import "./App.css";
import "./friends.css";
import sendApiData from './sendApiData';
import getApiData from './getApiData';
import Popup from 'reactjs-popup';

class Friend extends Component {
    constructor() {
        super()
        this.state={surName:"",firstName:"",profilePicture:"", username:"",open:false}
        this.removeUser = this.removeUser.bind(this)
        this.acceptFriend = this.acceptFriend.bind(this)
        this.changeOpen = this.changeOpen.bind(this)
        this.changeClose = this.changeClose.bind(this)
    }
    async componentDidMount() {
        await getApiData("friend/"+this.props.id).then(json => this.setState({ surName:json.surName, firstName:json.firstName, profilePicture:json.profilePictureUrl,username:json.username}));
    }
    async acceptFriend() {
        await sendApiData("acceptfriendrequest/"+this.state.username,this.props.globals.userDetails)
        let success = await sendApiData("cookielogin",{Username:this.props.globals.userDetails.username,authHash:this.props.globals.userDetails.authHash})
          if (success.validLogin) {
            await this.props.callback({isLoggedIn:true,userDetails:success.userDetails})
          }
    }
    async removeUser(close) {
        console.log("removing")
        await sendApiData("removefriend/"+this.state.username,this.props.globals.userDetails)
        this.changeClose()
        let success = await sendApiData("cookielogin",{Username:this.props.globals.userDetails.username,authHash:this.props.globals.userDetails.authHash})
          if (success.validLogin) {
            await this.props.callback({userDetails:success.userDetails})
          }
    }
    changeOpen() {
        this.setState({open:true})
    }
    changeClose() {
        this.setState({open:false})
    }
    render() {
        return (
            
            <div className="friend-container">
                    <img className="profilePicture" src={this.state.profilePicture} alt="an amazing pic"/>
                    <div className="friendNameContainer">
                        <p className="friendName">{this.state.firstName+" "+this.state.surName}</p>
                        <p className="friendUsername">{this.state.username}</p>
                    </div>
                    {this.props.accept?<button className="acceptFriend" onClick={this.acceptFriend}>✓</button>:<></>}
                    {this.props.deny?<><button className="denyFriend" onClick={this.changeOpen}>X</button><Popup open={this.state.open} overlayStyle={{backdropFilter: "blur(5px)"}} modal>{close => {return <div className="sureForm"><h1>Are you sure?</h1><p>This action is irreversible.</p><button onClick={this.changeClose} className="Cancel">No, Don't remove user.</button><button className="remove" onClick={this.removeUser}>Yes, remove user.</button></div>}}</Popup></>:<></>}
            </div>
        )
    }
}

export default Friend;
//export getFriendData;
//export getFriendsToDisplay; 