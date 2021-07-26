import React, { Component } from 'react'
import Friend from "./friends"

export class FriendsList extends Component {
      render() {
          console.log()
        return (
          <div>
            {this.props.friends.map(id=><Friend id={id} key={id} globals={this.props.globals} callback={this.props.callback} accept={Boolean(this.props.accept)} deny={Boolean(this.props.deny)}/>)}
          </div>
        );
      }
}

export default FriendsList
