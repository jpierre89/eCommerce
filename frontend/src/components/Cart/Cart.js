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
        this.showCartTotal = this.showCartTotal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cartItems !== prevProps.cartItems) {
            // this check prevents infinite recursion

            this.showCartItems();
        }
    }

    getCartTotal() {

    }

    showCartItems() {
        const cartItemList = this.props.cartItems.map((item) => 
            <CartItem key={item._id} setCart={this.props.setCart} cartItem={item} user={this.props.user} jwt={this.props.jwt}/>
        );

        if (this.props.user) {
            if (cartItemList && cartItemList.length > 0) {
                return (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItemList}
                            </tbody>              
                        </table>
                    </div>
                )
            }
            else {
                return (
                    <h4 id="empty">Empty</h4>
                )
            }
        }
    }

    showCartTotal() {
        if (this.props.user && this.props.cartItems && this.props.cartItems.length > 0) {
            const cartSumReducer = (acc, item) => acc + parseInt(item.quantity) * parseInt(item.storeItem.price)
            const cartSum = this.props.cartItems.reduce(cartSumReducer, 0);
            return (
                <h4>Total: ${cartSum}</h4>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ScrollArea stopScrollPropagation={true} smoothScrolling={true} className="small-scroll-area">
                    {this.showCartItems}   
                </ScrollArea>
                {this.showCartTotal}
            </div>

        )
    }

}