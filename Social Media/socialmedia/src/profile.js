import React, { Component } from 'react'
import { Cookies, getCookieConsentValue } from "react-cookie-consent";
import Switch from "react-switch";
import QRCode from "qrcode.react"
import "./profile.css"
import sendApiData from './sendApiData';

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state={cookie:getCookieConsentValue(),tfa:props.globals.userDetails.useTwoFactor}
        this.handleCookieChange=this.handleCookieChange.bind(this)
        this.handle2FAChange=this.handle2FAChange.bind(this)
    }
    handleCookieChange(checked) {
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
    async handle2FAChange(checked) {
        let result = await sendApiData("2FAchange/"+checked,{Username:this.props.globals.userDetails.username,authHash:this.props.globals.userDetails.authHash})
        this.setState({tfa:result.newState})
    }
    render() {
        if (this.props.globals.userDetails.firstName === "") {
            return (
                <h1>You are not logged in!</h1>
            )
        } else {
            console.log(this.props.globals.userDetails)
            return (
                <div className="profile-page">
                    <img className="profile-pic" src={this.props.globals.userDetails.profilePictureUrl} alt={this.props.globals.userDetails.firstName+"'s Profile Picture"}/><br/>
                    <h1 className="profile-title">{this.props.globals.userDetails.firstName}'s Profile:</h1>
                    <div><p>Use cookies</p><Switch onChange={this.handleCookieChange} checked={this.state.cookie} /></div>
                    <div><p>Use 2FactorAuthentication</p><Switch onChange={this.handle2FAChange} checked={this.state.tfa} /></div>
                    <p>This is your 2FA code. scan it with any authenticator app.</p>
                    <QRCode value={this.props.globals.userDetails.twoFactor.uri}/>
                </div>
            )
        } 
    }
}


export default Profile;
