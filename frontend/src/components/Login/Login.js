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
        this.showGreeting = this.showGreeting.bind(this);
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

    showGreeting() {
        // JSX Greeting

        if (this.props.user) {
            return (<h3>Welcome, {this.props.user.firstName}</h3>)
        }
        else {
            return (<h3>Please Log In</h3>)
        }
    }

    showLogin() {
        // JSX Login/Logout

        if (this.props.user) {
            return (
                <Fragment>
                    <button onClick={this.logoutHandler}>Log Out</button>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <input id="inputUsername" placeholder="username" ref={this.usernameInput}></input>
                    <input id="inputPassword" placeholder="password" ref={this.passwordInput}></input>
                    <button onClick={this.loginHandler}>Submit</button>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <div>
                <Fragment>{this.showGreeting()}</Fragment>
                <Fragment>{this.showLogin()}</Fragment>
            </div>
        )
    }
}