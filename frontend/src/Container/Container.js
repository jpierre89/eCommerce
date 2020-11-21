import React from 'react';
import Title from '../Title/Title';
import Login from '../Login/Login';
import Recent from '../Recent/Recent';
import Cart from '../Cart/Cart';
import Store from '../Store/Store';
import './Container.css';

// user and jwt state exist on this parent container.
// This has change handlers which are passed to it's children.
// To change this lifted state, the children must call these change handlers.
// The children will see the changes in state after this call.

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            jwt: ''
        }

        this.setUser = this.setUser.bind(this);
        this.setJWT = this.setJWT.bind(this);
    }

    setUser(user_to_set) {this.setState({user: user_to_set})}
    setJWT(jwt_to_set) {this.setState({jwt: jwt_to_set})}

    render() {
        return (
            <div>
                <Title></Title>
                <Login user={this.state.user} setUser={this.setUser}
                       jwt={this.jwt}  setJWT={this.setJWT}>
                </Login>
                <Recent user={this.state.user} jwt={this.jwt}></Recent>
                <Cart user={this.state.user} jwt={this.jwt}></Cart>
                <Store></Store>
            </div>
        )
    }
}
