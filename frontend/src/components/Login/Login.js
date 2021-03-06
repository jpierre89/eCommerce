import React, { Fragment } from 'react';
import axios from 'axios';
import './Login.css';
import url from '../../url';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Login',
        }

        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();

        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    async loginHandler() {
        // Log the User in

        if (this.usernameInput.current.value && this.passwordInput.current.value) {
            const body = {
                email: this.usernameInput.current.value,
                password: this.passwordInput.current.value
            }

            try {
                const res = await axios.post(url.login, body)
                this.props.setUser(res.data.user);
                this.props.setJWT(res.data.jwt);
                this.props.setCart();
            }
            catch (err) {
                console.log(err)
                alert("Log In Failed");             
            }
        }
        else {
            alert("Please enter a username and password")
        }
    }

    logoutHandler() {
        // Log the User out

        this.props.logout()
    }

    showLogin() {
        // JSX Login/Logout

        if (this.props.user) {
            return (
                <div>
                    <h2>Welcome, {this.props.user.firstName}</h2>
                    <button onClick={this.logoutHandler}>Log Out</button>
                </div>
            )
        }
        else {
            return (
                <div id="login-component">
                    <h2>Log In</h2>
                    <input id="inputUsername" className="login-group" placeholder="username" ref={this.usernameInput}></input>
                    <input id="inputPassword" className="login-group" placeholder="password" ref={this.passwordInput}></input>
                    <button className="login-group" onClick={this.loginHandler}>Submit</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Fragment>{this.showLogin()}</Fragment>
            </div>
        )
    }
}