import React from 'react';
import './index.css';
import Post from "./post.js";
import PostArea from './postArea.js';

class HomePage extends React.Component {
  render() {
    return (
      <>
        <div className="flex-container">
        <div className="flex-item verticalItem" id="friends"></div>
        <div className="flex-item verticalSpacer"></div>
        <div className="flex-item verticalItem" id="posts">
          <PostArea />
          </div>
        <div className="flex-item verticalSpacer"></div>
        <div className="flex-item verticalItem" id="SuggestedFriends"></div>
        </div>
      </>
    )
  }
}

export default HomePage;
