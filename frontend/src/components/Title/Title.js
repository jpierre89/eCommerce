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
            <div>
                <h1 id="title-header">{this.state.title}</h1>
            </div>
        )
    }
}