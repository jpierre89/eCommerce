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
        console.log(this.props.cartItems)

        const cartItemList = this.props.cartItems.map((item) => 
            <CartItem key={item._id} setCart={this.props.setCart} cartItem={item} user={this.props.user} jwt={this.props.jwt}/>
        );
        
        return (
            <ul>
                {cartItemList}
            </ul>
        )
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ScrollArea>
                    {this.showCartItems}         
                </ScrollArea>
            </div>

        )
    }

}