import React from 'react';
import axios from 'axios';
import './Recent.css';

export default class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Recently Viewed'
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