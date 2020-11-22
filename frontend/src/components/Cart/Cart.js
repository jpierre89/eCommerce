import React from 'react';
import Axios from 'axios';
import ScrollArea from 'react-scrollbar';
import './Cart.css'

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Cart',
            cartItems: ''
        }

        this.onRemoveCartItem = this.onRemoveCartItem.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.cartItems !== prevProps.cartItems) {
            // this check prevents infinite recursion

            console.log("updating items")
            this.updateCartItems();
        }
    }

    updateCartItems() {
        try {
            const items = new Set();
            this.props.cartItems.forEach(item => {
                console.log(item)
                items.add(
                    <li key={item._id}>
                        name: {item.storeItem.name} Price: ${item.storeItem.price}
                        <button onClick={() => this.onRemoveCartItem(item)}>Remove Item</button>: 
                    </li>
                )
            })
            this.setState(
                {
                    cartItems: items
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    onRemoveCartItem(item) {
        console.log(`onRemoveCartItem: ${item.name}`)
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ScrollArea>
                    <ol>
                        {this.state.cartItems}
                    </ol>            
                </ScrollArea>
            </div>

        )
    }
}