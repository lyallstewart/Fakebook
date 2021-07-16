import React, { Component } from 'react'
import './nav.css';
import './index.css'



class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <a href="./profile" className="active"> <img id="logo" src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="a"/></a>
                <a href="./#news">New Post</a>
                <a href="./">Posts</a>
                <a href="./#about">Friends</a>
            </div>
        )
    }
}

export default Navbar;
// comment