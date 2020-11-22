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
    }

    async componentDidMount() {
        try {
            const res = await axios.get(url.storeItem);
            const items = new Set();
            res.data.forEach(item => {
                items.add(
                    <li key={item._id}>
                        <button onClick={() => this.onItemClicked(item)}  >{item.name}</button>: 
                        ${item.price}
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
        if (this.props.user) {
            const config = {
                params: {
                    userId: this.props.user._id,
                    storeItemId: item._id,
                    quantity: 1
                },
                headers: {
                    'Authorization': `Bearer: ${this.props.jwt}`
                },
            }
            try {
                const res = await axios.post(url.cart, null, config)
                this.props.setCartItems() // Refresh cart items
            }
            catch (err) {
                console.log(err);
                alert("Cart not available")
            }
        }
        else {
            alert("Please Log In")
        }

    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ScrollArea>
                    <ol>{this.state.storeItems}</ol>
                </ScrollArea>
            </div>
        )
    }
}