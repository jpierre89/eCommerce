import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Created 2020'
        }
    }

    render() {
        return (
            <div>
                <p id="footer-text">{this.state.text}</p>
            </div>
        )
    }
}