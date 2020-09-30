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

    delete() {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id == this.id) {
                carts.splice(i, 1);
                break;
            }
        };
    }
};

Cart.NextCartId = 0;

module.exports = {
    Cart: Cart,
    carts: carts
};