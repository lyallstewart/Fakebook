import React from 'react';
import './index.css';
import PostArea from './postArea.js';
import Friend from "./friends.js";
import getApiData from './getApiData';

class FriendsList extends React.Component {
  constructor() {
    super()
    this.state={friends:[]}
}
componentDidMount() {
    getApiData("friendsToDisplay").then(json => this.setState({friends:json}));
}
  render() {
    return (
      <div>
        <h2 id="Friends">Friends:</h2>
        {this.state.friends.map(id=><Friend id={id} key={id}/>)}
      </div>
    );
  }
};

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
            <FriendsList />
            <FriendsSuggestions />
          </div>
          <div className="flex-item verticalSpacer"></div>
          <div className="flex-item verticalItem" id="posts">
            <PostArea />
          </div>
      </div>
    </div>
    )
  }
}

export default HomePage;
