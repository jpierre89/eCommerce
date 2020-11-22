import React from 'react';
import Title from '../Title/Title';
import Login from '../Login/Login';
import Recent from '../Recent/Recent';
import Cart from '../Cart/Cart';
import Store from '../Store/Store';
import './Container.css';
import url from '../../url';
import axios from 'axios';

// user and jwt state exist on this parent container.
// This has change handlers which are passed to it's children.
// To change this lifted state, the children must call these change handlers.
// The children will see the changes in state after this call.

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            jwt: '',
            cartItems: []
        }

        this.setUser = this.setUser.bind(this);
        this.setJWT = this.setJWT.bind(this);
        this.setCartItems = this.setCartItems.bind(this);
    }

    setUser(user_to_set) {
        this.setState({user: user_to_set})
    }

    setJWT(jwt_to_set) {
        this.setState({jwt: jwt_to_set})
    }

    async setCartItems() {
        if (this.state.user) {
            const config = {
                params: {
                    userId: this.state.user._id
                },
                headers: {
                    'Authorization': `Bearer: ${this.state.jwt}`
                }
            }

            try {
                const res = await axios.get(url.cart, config)

                this.setState(
                    {
                        cartItems: res.data
                    }
                )
            }
            catch (err) {
                alert("Cart Items Unavailable")
            }
        }
    }

    render() {
        return (
            <div>
                <Title></Title>
                <Login user={this.state.user} setUser={this.setUser}
                       jwt={this.state.jwt}  setJWT={this.setJWT}>
                </Login>
                <Recent user={this.state.user} jwt={this.state.jwt}></Recent>
                <Cart user={this.state.user}
                      jwt={this.state.jwt}
                      cartItems={this.state.cartItems} setCartItems={this.setCartItems}
                ></Cart>
                <Store user={this.state.user}
                       jwt={this.state.jwt}
                       setCartItems={this.setCartItems}
                ></Store>
            </div>
        )
    }
}
