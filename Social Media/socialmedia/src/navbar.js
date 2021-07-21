import React, { Component } from 'react'
import './nav.css';
import './index.css'
import history from './history.js';
import FakeBookLink from "./fakeBookLink.js";

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.props = props;
    }
    linkClicked(e,toRedirect) {
        e.preventDefault()
        console.log(e)
        history.push(toRedirect)
    }
    render() {
        console.log("RENDERING")
        console.log(this.props.globals.isLoggedIn)
        return (
            <><div className="navbar">
                <FakeBookLink href="./profile" className="active"> <img id="logo" src={this.props.globals.isLoggedIn?this.props.globals.userDetails.profilePictureUrl:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} alt="a"/></FakeBookLink>
                <FakeBookLink href="./post">New Post</FakeBookLink>
                <FakeBookLink href="./">Posts</FakeBookLink>
                <FakeBookLink href="./">Friends</FakeBookLink>
                <FakeBookLink href={this.props.globals.isLoggedIn ?"./logout":"./login"}>{ this.props.globals.isLoggedIn ? <p>Sign out</p>:<p>Log in</p>}</FakeBookLink>
            </div></>
        )
    }
}

export default Navbar;
// comment