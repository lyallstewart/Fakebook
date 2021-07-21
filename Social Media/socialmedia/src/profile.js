import React, { Component } from 'react'
import { Cookies, getCookieConsentValue } from "react-cookie-consent";
import Switch from "react-switch";



export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={cookie:getCookieConsentValue()}
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(checked) {
        this.setState({cookie:checked})
        Cookies.set("CookieConsent",Boolean(checked),{expires:7})
        console.log(getCookieConsentValue())
        if (checked) {
            Cookies.set("username",this.props.globals.userDetails.username,{expires:7})
            Cookies.set("authHash",this.props.globals.userDetails.authHash,{expires:7})
        } else {
            Cookies.remove("username")
            Cookies.remove("authHash")
        }
    }
    render() {
        if (this.props.globals.userDetails.firstName === "") {
            return (
                <h1>You are not logged in!</h1>
            )
        } else {
            console.log(this.props.globals.userDetails)
            return (
                <div>
                    <h1>{this.props.globals.userDetails.firstName}'s Profile:</h1>
                    <img src={this.props.globals.userDetails.profilePictureUrl} alt={this.props.globals.userDetails.firstName+"'s Profile Picture"}/>
                    <p>Use cookies:</p><Switch onChange={this.handleChange} checked={this.state.cookie} />
                    <button onClick={this.toggleQRCode}></button>
                </div>
            )
        } 
    }
}


export default Profile;
