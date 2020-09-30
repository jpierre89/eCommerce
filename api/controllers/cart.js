// External Dependencies
var router = require('express').Router();

// Internal Dependencies
const { Cart, carts } = require('../models/cart');
const { StoreItem, storeItems } = require('../models/storeItem');
const { User, users } = require('../models/user');


router.post('/', (req, res) => {
    // Add a storeItem to a Cart
    // Returns the storeItem
    const query = req.query;
    const cart = carts.find(cart => {
        return cart.id == query.cartId;
    });
    if (!cart) {
        res.status(404).json({
            "error": "Cart id not found"
        });
        return;
    };
    const storeItem = storeItems.find(item => {
        return item.id == query.itemId;
    });
    if (!storeItem) {
        res.status(404).json({
            "error": "Item id not found"
        });
        return;
    }
    const quantity = parseInt(query.quantity);
    for (let i = 0; i < quantity; ++i) {
        cart.cartItems.push(storeItem);
    };
    const trans = Object.assign({}, storeItem);
    trans.quantity = quantity; 
    res.status(200).json(trans);
});

router.delete('/', (req, res) => {
    const query = req.query;
    // Delete a quantity of storeItem from Cart
    // Returns the storeItem and quantity deleted
    if (query.itemId) {
        const cart = carts.find(cart => {
            return cart.id == query.cartId;
        });
        if (!cart) {
            res.status(404).json({
                "error": "Cart id not found"
            });
            return;
        };
        const storeItem = storeItems.find(item => {
            return item.id == query.itemId;
        });
        if (!storeItem) {
            res.status(404).json({
                "error": "Item id not found"
            });
            return;
        }
        const quantity = parseInt(query.quantity);
        const idx = [];
        cart.cartItems.forEach((item) => {
            if (item.id == storeItem.id) {
                idx.push(item.id);
            };
        });
        if (idx.length >= quantity) {
            for (let i = 0; i < quantity; i++) {
                cart.cartItems.splice(idx[i], 1);
            }; 
            let trans = Object.assign({}, storeItem);
            trans.quantity = quantity;
            res.status(200).json(trans);
        } else {
            res.status(404).json({
                "error": "quantity does not exist"
            });
        };
    // Delete all items from cart
    // returns all deleted items
    } else {
        const cart = carts.find(cart => {
            return cart.id == query.cartId;
        });
        items = cart.cartItems;
        cart.cartItems = [];
        res.status(200).json(items)
    };
});

router.get('/', (req, res) => {
    // Returns user's Cart
    const query = req.query;
    const cart = carts.find(cart => {
        return cart.id == query.cartId;
    });
    res.status(200).json(cart);
});

module.exports = router;