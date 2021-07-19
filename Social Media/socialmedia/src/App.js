import React from 'react';
import './index.css';
import HomePage from './homepage';
import Navbar from "./navbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CreatePost from "./createPost.js";
import LoginPage from "./login.js";

//Here we could add potentially support for storing login details in cookies


class App extends React.Component {
    constructor() {
        super()
        this.state={isLoggedIn:false}
        this.changeLoginDetails = this.changeLoginDetails.bind(this)
    }
    changeLoginDetails(toChange) {
        this.setState(toChange)
      }
    render(){return(
        <>
        <Navbar globals={this.state}/>
        <BrowserRouter>
        <Switch>
            <Route exact path="/"><HomePage globals={this.state}/></Route>
            <Route path="/profile"><h1>Profile</h1></Route>
            <Route path="/post"><CreatePost globals={this.state}/></Route>
            <Route path="/login"><LoginPage globals={this.state} loginCallback={this.changeLoginDetails}/></Route>
        </Switch>
        </BrowserRouter>
        </>
    )}
}

export default App;