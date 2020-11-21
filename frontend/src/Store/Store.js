import React from 'react';
import Axios from 'axios';
import './Store.css';

export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Store Items',
            storeItems: []
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