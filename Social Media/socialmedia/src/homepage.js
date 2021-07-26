import React from 'react';
import './index.css';
import PostArea from './postArea.js';
import FriendsList from './friendslist';

class FriendsSuggestions extends React.Component {
  render() {
    return (
      <>
        <h2 id="SFriends">Suggested Friends:</h2>
        <p id="SFriendsList">(no suggested friends here. Wumpus is sad)</p>
      </>
    );
  }
};

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        <div className="flex-container">
          <div className="flex-item verticalItem friendsItemLeft" id="friends">
            <h2 id="Friends">Friends:</h2>
            <FriendsList friends={this.props.globals.userDetails.friends}/>
            <FriendsSuggestions />
          </div>
          <div className="flex-item verticalSpacer"></div>
          <div className="flex-item verticalItem" id="posts">
            <PostArea globals={this.props.globals}/>
          </div>
      </div>
    </div>
    )
  }
}

export default HomePage;
