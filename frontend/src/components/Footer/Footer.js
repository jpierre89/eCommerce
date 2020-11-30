import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Created 2020',
            author: 'Jon Pierre'
        }
    }

    render() {
        return (
            <div>
                <p className="footer-text">{this.state.text}</p>
                <p className="footer-text">{this.state.author}</p>
            </div>
        )
    }
}