import React from 'react';
import Title from '../Title/Title';
import Login from '../Login/Login';
import Recent from '../Recent/Recent';
import Cart from '../Cart/Cart';
import Store from '../Store/Store';
import Footer from '../Footer/Footer';
import './Container.css';
import url from '../../url';
import axios from 'axios';


export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            jwt: '',
            cartItems: [],
            recentStoreItemsViewed: []
        }

        this.setUser = this.setUser.bind(this);
        this.setJWT = this.setJWT.bind(this);
        this.setCart = this.setCart.bind(this);
        this.setRecentlyViewedItems = this.setRecentlyViewedItems.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setRecentlyViewedItems();
    }

    logout() {
        this.setState({
            user: null,
            jwt: '',
            cartItems: []
        })
    }

    setUser(user_to_set) {
        this.setState({user: user_to_set})
    }

    setJWT(jwt_to_set) {
        this.setState({jwt: jwt_to_set})
    }

    async setCart() {
        if (this.state.user) {
            const config = {
                headers: {
                    'Authorization': `Bearer: ${this.state.jwt}`
                },
                params: {
                    userId: this.state.user._id
                }
            }

            try {
                const res = await axios.get(url.cart, config)

                this.setState({cartItems: res.data})
            }
            catch (err) {
                alert("Cart Items Unavailable")
            }
        }
    }

    async setRecentlyViewedItems(num=10) {
        try {
            const res = await axios.get(url.storeItem, {
                headers: {
                    'Authorization': `Bearer: ${this.state.jwt}`
                },
                params: {
                    'recent': num
                }
            });
    
            this.setState({recentStoreItemsViewed: res.data})
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div id="container">
                <div id="title" className="component">
                    <Title ></Title>
                </div>
                <div id="login" className="component">
                    <Login  user={this.state.user} setUser={this.setUser}
                            jwt={this.state.jwt}  setJWT={this.setJWT}
                            setCart={this.setCart} logout={this.logout}>
                    </Login>
                </div>
                <section id="user-section">
                    <div id="recent" className="component">
                        <Recent user={this.state.user}
                                jwt={this.state.jwt}
                                recentStoreItemsViewed={this.state.recentStoreItemsViewed}
                                setRecentlyViewedItems={this.setRecentlyViewedItems}>
                        </Recent>
                    </div>
                    <div id="cart" className="component">
                        <Cart  user={this.state.user}
                            jwt={this.state.jwt}
                            cartItems={this.state.cartItems} setCart={this.setCart}>
                        </Cart>
                    </div>
                </section>
                <div id="store" className="component">
                    <Store  user={this.state.user}
                            jwt={this.state.jwt}
                            setCart={this.setCart}
                            setRecentlyViewedItems={this.setRecentlyViewedItems}>
                    </Store>
                </div>
                <div id="footer" className="component">
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}
