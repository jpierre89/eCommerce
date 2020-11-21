import React from 'react';
import axios from 'axios';
import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Login',
            username: '',
            password: '',
            jwt: '',
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
            </div>
        )
    }
}