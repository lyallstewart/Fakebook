import React, { Component } from 'react'
import './nav.css';
import './index.css'

class Navbar extends Component {
    constructor() {
        this.profileClicked=this.profileClicked.bind(this)
    }
    profileClicked() {
        
    }
    render() {
        return (
            <div className="navbar">
                <a href="#home" class="active" onClick={this.profileClicked}> <img src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="a"/></a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        )
    }
}

export default Navbar;
// comment