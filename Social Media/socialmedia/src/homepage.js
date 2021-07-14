import React from 'react';
import './index.css'

class HomePage extends React.Component {
  render() {
    return (
      <>
        <nav>
          <ul>
            <li><img id="logo" src="https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg" alt="A profile"/></li>
            
            <li><button id="MenuBar">Menu</button></li>
          </ul>
        </nav>
        <div className="flex-container">
        <div className="flex-item verticalItem" id="friends"></div>
        <div className="flex-item verticalSpacer"></div>
        <div className="flex-item verticalItem" id="posts"></div>
        <div className="flex-item verticalSpacer"></div>
        <div className="flex-item verticalItem" id="SuggestedFriends"></div>
        </div>
      </>
    )
  }
}

export default HomePage;
