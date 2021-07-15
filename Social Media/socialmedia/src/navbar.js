import React, { Component } from 'react'
import './css/nav.css';
import './css/index.css'

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <nav>
                    <ul>
                        <li><img id="logo" src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="A profile"/></li>
            
                        <li><button id="MenuBar">Menu</button></li>
                        <li><button id="DBAdmin">DB Admin Page (Temp)</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
