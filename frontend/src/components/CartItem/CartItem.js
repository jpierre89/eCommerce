import axios from 'axios';
import React from 'react';
import url from '../../url';

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);

        this.onRemoveCartItem = this.onRemoveCartItem.bind(this);
    }

    async onRemoveCartItem() {
        try {
            await axios.delete(url.cart, {
                headers: {
                    'Authorization': `Bearer: ${this.props.jwt}`
                },
                params: {
                    userId: this.props.user._id,
                    cartItemId: this.props.cartItem._id,
                    quantity: this.props.cartItem.quantity
                }
            });

            this.props.setCart();
        }
        catch (err) {
            console.log(err);
            alert("Request failed")
        }
    }

    render() {
        return (
            <li>
                <p>
                    {this.props.cartItem.storeItem.name} | 
                    Quantity: {this.props.cartItem.quantity} |
                    Price: ${this.props.cartItem.storeItem.price}
                    <button onClick={() => this.onRemoveCartItem()}>Remove Item</button>: 
                </p>
            </li>
        )
    }
}