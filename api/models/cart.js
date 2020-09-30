// Temporary
let carts = [];

class Cart {
    constructor(userId) {
        this.id = Cart.NextCartId++;
        this.userId = userId;
        this.cartItems = [];
        carts.push(this);
    };

    getExtendedPrice() {
        let extendedPrice = 0;
        this.cartItems.forEach((item) => {
            if (!item.price) {console.log('A cart item has no price')};
            extendedPrice += item.price;
        });
        return extendedPrice;
    };
};

Cart.NextCartId = 0;

module.exports = {
    Cart: Cart,
    carts: carts
};