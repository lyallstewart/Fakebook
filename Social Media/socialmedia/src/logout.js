import React, { Component } from 'react'
import { Cookies } from "react-cookie-consent";
import "./logout.css"

class Logout extends Component {
    render() {
        Cookies.remove("username");
        Cookies.remove("authHash");

    
        return(
            <div className="logoutWrapper">
                <h1 className="logoutH1">Confirm log out:</h1>
                <a href="./" className="logoutButton">Yes, please! Log me out</a>
            </div>
        )

    }
}

export default Logout;