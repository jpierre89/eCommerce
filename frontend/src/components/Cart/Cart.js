import React from 'react';
import Axios from 'axios';
import CartItem from '../CartItem/CartItem';
import ScrollArea from 'react-scrollbar';
import './Cart.css'

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Cart',
        }

        this.showCartItems = this.showCartItems.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cartItems !== prevProps.cartItems) {
            // this check prevents infinite recursion

            this.showCartItems();
        }
    }

    showCartItems() {
        const cartItemList = this.props.cartItems.map((item) => 
            <CartItem key={item._id} setCart={this.props.setCart} cartItem={item} user={this.props.user} jwt={this.props.jwt}/>
        );

        if (cartItemList && cartItemList.length > 0) {
            return (
                <table>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    {cartItemList}
                </table>
            )
        }
        else {
            return (
                <h4 id="empty">Empty</h4>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ScrollArea speed={0.8} horizontal={true}>
                    {this.showCartItems}         
                </ScrollArea>
            </div>

        )
    }

}