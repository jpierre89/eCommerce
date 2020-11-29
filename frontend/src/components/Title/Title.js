import React from 'react';
import './Title.css';

export default class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Web Store'
        }
    }

    render() {
        return (
            <div id="component">
                <h1>{this.state.title}</h1>
            </div>
        )
    }
}