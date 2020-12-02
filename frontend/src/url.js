const { REACT_APP_API_URL } = process.env;

const url = {
    login: REACT_APP_API_URL + '/user/login',
    storeItem: REACT_APP_API_URL + '/storeItem',
    cart: REACT_APP_API_URL + '/cart',
}

module.exports = url;