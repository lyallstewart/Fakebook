import React, { Component } from 'react'

export class Profile extends Component {
    render() {
        if (this.props.globals.userDetails.firstName === "") {
            return (
                <h1>You are not logged in!</h1>
            )
        } else {
            return (
                <div>
                    <h1>{this.props.globals.userDetails.firstName}'s Profile:</h1>
                    <img scr={this.props.globals.userDetails.ProfilePictureUrl}/>
                </div>
            )
        } 
    }
}


export default Profile;
