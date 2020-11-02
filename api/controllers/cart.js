var router = require('express').Router();
const { CartItem } = require('../models/CartItem');
const { StoreItem } = require('../models/StoreItem');
const { User } = require('../models/User');


/* @desc    Create CartItem for User.cart
 *
 * @param   req.query.userId
 * @param   req.query.storeItemId
 * @param   req.query.quantity
*/
router.post('/', async (req, res) => {

    const item = await addCartItem(
        req.query.userId,
        req.query.storeItemId,
        parseInt(req.query.quantity)
    )

    return res.status(201).json(item)

});

async function addCartItem(userId, storeItemId, quantity) {
    const user = await User.findById(userId).populate({ path: 'cart', model: CartItem}).exec();
    const storeItem = await StoreItem.findById(storeItemId)

    let cartItem = user.cart.find(elem => 
        String(elem.storeItem._id) == String(storeItem._id)
    )

    if (cartItem) {
        cartItem = await _addQuantityToCartItem(quantity, cartItem);     
    }
    else {  
        cartItem = await _createNewCartItem(quantity, user, storeItem);
    }

    return cartItem

}

async function _addQuantityToCartItem(quantity, cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
    return cartItem;
}

async function _createNewCartItem(quantity, user, storeItem) {
    let cartItem = new CartItem({
        storeItem : storeItem._id,
        quantity : quantity
    });
    await cartItem.save();
    user.cart.push(cartItem);
    await user.save();
    return cartItem;
}

/* @desc    Get User.cart
 *
 * @param   req.query.userId
*/
router.get('/', async (req, res) => {
    try {
        const cart = await getUserCart(req.query.userId);
        res.status(200).json(cart);
    }
    catch(err) {
        res.status(400).json(err);
    }
});

async function getUserCart(userId) {
    const user = await User.findById(userId).populate({path: 'cart', model: CartItem});
    return user.cart;
}

/* @desc    Remove quantity of CartItem from User.cart
 *          Remove all CartItems from User.cart
 *
 * @param   req.query.userId
 * @param   req.query.cartItemId
 * @param   req.query.quantity
*/
router.delete('/', async (req, res) => {

    if (req.query.cartItemId) {
        const cartItem = await deleteCartItemQuantity(
            req.query.cartItemId,
            parseInt(req.query.quantity)
        );
        res.status(200).json(cartItem);
    }
    else {
        await deleteAllCartItems(req.query.userId);
        res.status(200).json();
    }
});

async function deleteCartItemQuantity(cartItemId, quantity) {
    const cartItem = await CartItem.findById(cartItemId);
    if (cartItem.quantity >= quantity) {
        cartItem.quantity -= quantity;
    }
    else {
        cartItem.quantity = 0;
    }

    await cartItem.save();
    return cartItem;
}

async function deleteAllCartItems(userId) {
    const user = await User.findById(userId);
    user.cart = [];
    user.save();
}


module.exports = {
    router : router,
    addCartItem : addCartItem,
    getUserCart : getUserCart,
    deleteCartItemQuantity : deleteCartItemQuantity,
    deleteAllCartItems : deleteAllCartItems
}