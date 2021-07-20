import React from 'react';
import './index.css';
import HomePage from './homepage';
import Navbar from "./navbar";
import {Router, Switch, Route} from "react-router-dom";
import CreatePost from "./createPost.js";
import LoginPage from "./login.js";
import history from "./history.js";

//Here we could add potentially support for storing login details in cookies


class App extends React.Component {
    constructor() {
        super()
        this.state={isLoggedIn:false,refresh:0}
        this.changeLoginDetails = this.changeLoginDetails.bind(this)
    }
    changeLoginDetails(toChange) {
        console.log(`CHANGING STATE`,toChange)
        this.setState(toChange)
        console.log(this.state)
      }
    componentDidUpdate() {
        console.log(this.props.location)
    }
    render(){
        console.log("RENDER APP")
        return(
        <>
        <Navbar globals={this.state}/>
        <Router history={history}>
        <Switch>
            <Route exact path="/"><HomePage globals={this.state}/></Route>
            <Route path="/profile"><h1>Profile</h1></Route>
            <Route path="/post"><CreatePost globals={this.state}/></Route>
            <Route path="/login"><LoginPage globals={this.state} loginCallback={this.changeLoginDetails}/></Route>
        </Switch>
        </Router>
        </>
    )}
}

export default App;