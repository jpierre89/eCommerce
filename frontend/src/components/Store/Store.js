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
            storeItems: [],
            listItems: [], // JSX list made from storeItems
            sort_asc: true
        }

        this.onItemClicked = this.onItemClicked.bind(this);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.showlistItems = this.showlistItems.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await axios.get(url.storeItem);
            this.setState(
                {storeItems: res.data},
                this.createItems
            )
            
        }
        catch (err) {
            console.log(err);
            alert("Store Items not available")
        }
    }

    createItems() {
        // Creates array of JSX list elements from local state

        const newListItems = [];
        this.state.storeItems.forEach(item => {
            newListItems.push(
                <li className="item" key={item._id} name={item.name}>
                    <button className="item-name" onClick={() => this.onItemClicked(item)}>{item.name}</button>
                    <span className="item-price money-color">${item.price}</span>
                    <button className="item-add" onClick={() => this.onAddToCart(item)}>Add</button>
                </li>
            )
        })
        this.setState({listItems: newListItems})
    }

    async onItemClicked(item) {
        // Fires when user clicks on a store item

        try {
            await axios.get(url.storeItem, {
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
        // Fires when user adds a store item to the cart

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

    showlistItems() {
        return this.state.listItems
    }

    onSort(e) {
        // Sort executed locally

        this.setState({sort_asc: !this.state.sort_asc})

        const sortedItems = [...this.state.listItems].sort((a, b) => {
            // note: a, b are <li> that have been assigned a name property
            if (a.props.name > b.props.name) {
                return this.state.sort_asc ? -1 : 1;
            }
            if (a.props.name < b.props.name) {
                return this.state.sort_asc ? 1 : -1;
            }
            return 0;
        });
        this.setState({listItems: sortedItems})
        e.preventDefault();
    }

    async onSearch(e) {
        // Seach executed by API

        const searchInput = document.getElementById("item-search-input").value;
        
        const res = await axios.get(url.storeItem, {
            params: {
                expr: searchInput
            }
        }); 

        this.setState({storeItems: res.data}, this.createItems)
        e.preventDefault();
    }

    render() {
        return (
            <div id="store-component">   
                <h2 id="store-title">{this.state.title}</h2>
                <input id="item-search-input" onChange={this.onSearch} placeholder="search..."></input>
                <button id="sort-btn" onClick={this.onSort}>Sort</button>            
                <ScrollArea stopScrollPropagation={true} smoothScrolling={true} className="store-scroll-area">
                    <ul id="item-list">{ this.showlistItems() }</ul>
                </ScrollArea>
            </div>
        )
    }

}