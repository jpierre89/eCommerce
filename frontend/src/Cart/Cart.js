import React from 'react';
import Axios from 'axios';
import './Cart.css'

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Cart'
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