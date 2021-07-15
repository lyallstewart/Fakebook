import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <>
                <nav>
                    <ul>
                        <li><img id="logo" src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="A profile"/></li>
                        
                        <li><button id="MenuBar">Menu</button></li>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navbar;
