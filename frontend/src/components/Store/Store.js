import React from 'react';
import axios from 'axios';
import ScrollArea from 'react-scrollbar';
import url from '../../url';
import './Store.css';

export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Store Items',
            storeItems: ''
        }

        this.onItemClicked = this.onItemClicked.bind(this);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.showStoreItems = this.showStoreItems.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await axios.get(url.storeItem);
            const items = new Set();
            res.data.forEach(item => {
                items.add(
                    <li className="item" key={item._id}>
                        <button className="item-name" onClick={() => this.onItemClicked(item)}>{item.name}</button>
                        <span className="item-price">${item.price}</span>
                        <button className="item-add" onClick={() => this.onAddToCart(item)}>Add</button>
                    </li>
                )
            })
            this.setState({storeItems: items})
        }
        catch (err) {
            console.log(err);
            alert("Store Items not available")
        }
    }

    async onItemClicked(item) {
        try {
            const res = await axios.get(url.storeItem, {
                headers: {
                    'Authorization': `Bearer: ${this.props.jwt}`
                },
                params: {
                    id: item._id
                }
            });

            this.props.setRecentlyViewedItems();
        }
        catch (err) {
            console.log(err);
        }
    }

    async onAddToCart(item) {
        if (this.props.user) {
            const config = {
                headers: {
                    'Authorization': `Bearer: ${this.props.jwt}`
                },
                params: {
                    userId: this.props.user._id,
                    storeItemId: item._id,
                    quantity: 1
                }
            }
            try {
                const res = await axios.post(url.cart, null, config)
                this.props.setCart();  // Refresh cart items
                this.props.setRecentlyViewedItems();
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            alert("Please Log In")
        }

    }

    showStoreItems() {
        return this.state.storeItems
    }


    render() {
        return (
            <div id="store-component">
                <h2 id="store-title">{this.state.title}</h2>
                <ScrollArea stopScrollPropagation={true} smoothScrolling={true} className="store-scroll-area">
                    <ul id="item-list">{ this.showStoreItems() }</ul>
                </ScrollArea>
            </div>
        )
    }

}