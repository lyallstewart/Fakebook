import React, { Component } from 'react'
import './nav.css';

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav>
                    <ul>
                        <li key="profilePic"><img id="logo" src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="A profile"/></li>
                        
                        <li><button key="menuButton" id="MenuBar">Menu</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
