import React from 'react';
import getFriendsToDisplay from './getFriendsToDisplay.js';
import './index.css';
import PostArea from './postArea.js';
import Friend from "./friends.js";

class FriendsList extends React.Component {
  render() {
    return (
      <div>
        <h2>Friends:</h2>
        {getFriendsToDisplay().map(id=><Friend id={id} />)}
      </div>
    );
  }
};

class FriendsSuggestions extends React.Component {
  render() {
    return (
      <h2>Suggested Friends:</h2>
    );
  }
};

class HomePage extends React.Component {
  render() {
    return (
      <div className='homepage'>
        <div className="flex-container">
          <div className="flex-item verticalItem friendsItemLeft" id="friends">
            <FriendsList />
          </div>
          <div className="flex-item verticalSpacer"></div>
          <div className="flex-item verticalItem" id="posts">
            <PostArea />
          </div>
          <div className="flex-item verticalSpacer"></div>
          <div className="flex-item verticalItem friendsItemRight" id="suggestedFriends">
            <FriendsSuggestions />
          </div>
      </div>
    </div>
    )
  }
}

export default HomePage;
