const faker = require('faker');

const { User } = require('./models/User');
const { StoreItem } = require('./models/StoreItem');
const { CartItem } = require('./models/CartItem');

const ITEM_COUNT = 50;  // Num StoreItems to create
const USER_COUNT = 10; // Num Users to create


const populate = async (app) => {
    console.log("Populating Data");

    await User.deleteMany({});
    await StoreItem.deleteMany({});
    await CartItem.deleteMany({});
    
    for (let i = 0; i < ITEM_COUNT; i++) {
        const newStoreItem = new StoreItem({
            name : faker.commerce.productName(),
            price : faker.commerce.price()
        });
        newStoreItem.save();
    }

    for (let i = 0; i < USER_COUNT; i++) {
        let newUser = null;
        if (i === 0) {
            // Create a single non-random user for testing / development

            newUser = new User({
                email: 'jp@gmail.com',
                password: 'password',   
                firstName: 'jon',
                lastName: 'pierre',    
            });
        }
        else {
            const first = faker.name.firstName();
            const last = faker.name.lastName();
            newUser = new User({
                email: first.concat(last).concat('@gmail.com'),
                password: 'password',   
                firstName: first,
                lastName: last,    
            });
        }


        // Give Each User random CartItems
        const cartItemCount = 1 + Math.floor(Math.random() * Math.floor(3));
        for(let j = 0; j < cartItemCount; j++) {
            const random = Math.floor(Math.random() * ITEM_COUNT);
            const randomQuantity = 1 + Math.floor(Math.random() * 2);
            
            const storeItem = await StoreItem.findOne().skip(random)

            // first storeItem was null for some reason: this is prevention check
            if (storeItem) {
                const newCartItem = new CartItem({
                    storeItem : storeItem,
                    quantity: randomQuantity
                })
    
                newCartItem.save();
    
                newUser.cart.push(newCartItem);
            }
        }
        newUser.save();
    }
};



module.exports = populate
