// External
const faker = require('faker');

// Internal
const { User, users } = require('./models/user');
const { StoreItem, storeItems } = require('./models/storeItem');
const { Cart, carts } = require('./models/cart');
const user = require('./models/user');

const USER_COUNT = 10;
const ITEM_COUNT = 25;

const populate = (app) => {
    console.log("Populating Data");
    
    for (let i = 0; i < ITEM_COUNT; i++) {
        new StoreItem(
            name=faker.commerce.productName(),
            price=faker.commerce.price()
        );
    };
    for (let i = 0; i < USER_COUNT; i++) {
        const first = faker.name.firstName();
        const last = faker.name.lastName();
        const newUser = new User(   
            firstName=first,
            lastName=last,
            email=first.concat('@gmail.com'),
        );

        const itemCount = Math.floor(Math.random() * Math.floor(7));
        for(let i = 0; i < itemCount; i++) {
            const itemIdx = Math.floor(Math.random() * Math.floor(ITEM_COUNT));
            newUser.cart.cartItems.push(
                storeItems[itemIdx]
            );
        };
    } ;
};

module.exports = populate