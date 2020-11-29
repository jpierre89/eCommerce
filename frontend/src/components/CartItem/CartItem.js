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
            <tr>
                <td>{this.props.cartItem.storeItem.name}</td>
                <td>{this.props.cartItem.storeItem.price}</td>
                <td>{this.props.cartItem.quantity}</td>
                <td>{parseInt(this.props.cartItem.quantity) * parseFloat(this.props.cartItem.storeItem.price)}</td>
                <td><button onClick={() => this.onRemoveCartItem()}>X</button></td>                
            </tr>
        )
    }
}