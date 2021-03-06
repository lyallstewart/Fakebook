//imports

import React from 'react';
import './index.css';
import HomePage from './homepage';
import Navbar from "./navbar";
import {Router, Switch, Route} from "react-router-dom";
import CreatePost from "./createPost.js";
import LoginPage from "./login.js";
import history from "./history.js";
import SignUpPage from './signup.js';
import Profile from './profile.js';
import { Cookies, getCookieConsentValue } from "react-cookie-consent";
import Logout from "./logout.js";
import FriendsPage from './friendspage';

//Here we could add potentially support for storing login details in cookies


class App extends React.Component {
    constructor() {//standard constructor stuff
        super()
        this.state={isLoggedIn:false,refresh:0,userDetails:{}}
        this.changeLoginDetails = this.changeLoginDetails.bind(this)
    }
    async changeLoginDetails(toChange) {
        await this.setState(toChange)
        await this.setState({refresh:this.state.refresh+1})
        console.log("test")
        if (toChange.isLoggedIn) {
            if (getCookieConsentValue()) {
                Cookies.set('username', toChange.userDetails.username, { expires: 7 })
                Cookies.set("authHash", toChange.userDetails.authHash, { expires: 7 })
            }
        }
        this.forceUpdate()
      }
    render(){
        console.log("RENDER APP")
        console.log(this.state.refresh)
        console.log(this.state.userDetails)
        if (this.state.isLoggedIn) {//if logged in
            return(
                <>
                <Navbar globals={this.state}/>
                <Router history={history}>
                <Switch>
                    <Route exact path="/"><HomePage globals={this.state}/></Route> {/*Provide access to the normal homepage */}
                    <Route path="/profile"><Profile globals={this.state}/></Route> {/*Provide access to the profile page. */}
                    <Route path="/logout"><Logout globals={this.state}/></Route> {/*Provide access to the profile page. */}
                    <Route path="/post"><CreatePost globals={this.state}/></Route> {/*Provide access to the posts page. */}
                    <Route path="/friends"><FriendsPage  globals={this.state} callback={this.changeLoginDetails}/></Route>
                </Switch>
                </Router>
                </>
            )
        } else {//not logged in
            return(
                <>
                <Router history={history}>
                <Switch>
                    <Route exact path="/"><LoginPage globals={this.state} loginCallback={this.changeLoginDetails}/></Route> {/*Homepage is login page */}
                    <Route path="/login"><LoginPage globals={this.state} loginCallback={this.changeLoginDetails}/></Route> {/* login page is login page */}
                    <Route path="/signup"><SignUpPage globals={this.state} /></Route> {/*signup page */}
                    <Route path="/"><LoginPage globals={this.state} loginCallback={this.changeLoginDetails}/></Route>
                </Switch>
                </Router>
                </>
            )
        }
        }
}

export default App;